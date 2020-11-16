import { IApplication, IZip } from "../../dependentInterface";
import { error, readonly } from "../../common";

const assert = error.assert;

const CONTENTTYPE_PATH = "[Content_Types].xml";
const EMPTY_CONTENTTYPE_XML = '<?xml version="1.0" encoding="UTF-8" standalone="true"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>';

/**
 * class for operating the open xml package
 */
class OpenXmlPackage {
    /**
     * construct an OpenXmlPackage object
     * @param {IApplication} application the implementation of IApplication
     * @param {IZip} zip an instance of IZip contains the package
     * @param {String} _contentTypeXML the XML string of the "[Content_Types].xml"
     */
    constructor (application, zip, _contentTypeXML) {
        readonly(this, { 
            application,
            zip,
            contentTypes: application.DOM.parse(_contentTypeXML || EMPTY_CONTENTTYPE_XML)
        });
    }

    /**
     * save the current package
     */
    save() {
        const zip = this.zip;
        zip.setFile(CONTENTTYPE_PATH, this.contentTypes.toString());
        return zip.save();
    }

    /**
     * 设置包中一个文件的内容
     * @param {String} _path 文件在包中的路径
     * @param {*} _data 文件的数据
     * @param {String} _contentType 文件的内容类型，如果不传入该参数，则不更新文件的内容类型
     */
    /**
     * set a file into the package
     * if the file is already in the package, it will be replace
     * @param {String} _path the path of the file in the package
     * @param {*} _data the content of the file
     * @param {String} _format the format of the content, support "binary" and "text"
     * @param {String} _contentType the type of the content, see the stand of the OpenXML
     */
    setFile(_path, _data, _format, _contentType) {
        this.zip.setFile(_path, _data, _format);
        if (_contentType) {
            const dom = this.contentTypes;
            const partName = `/${_path}`.replace(/\\/ig, "/");
            const contentTypes = assert(dom.xpathSelect("//*[local-name(.)='Types']", true), 
                                        error.LOCATE_NODE_FAIL("Types in [content types].xml"));
            const typeDesc = contentTypes.xpathSelect(`./*[local-name(.)='Override' and @PartName='${partName}']`, true);
            if (typeDesc) {
                typeDesc.setAttribute("ContentType", _contentType);
            } else {
                const newItem = assert(dom.createElement("Override"), 
                                       error.ACQUIRE_RESOURCE_FAIL('"Override" node in ContentType'));
                newItem.setAttribute("ContentType", _contentType);
                newItem.setAttribute("PartName", partName);
                contentTypes.appendChild(newItem);
            }
        }
    }

    /**
     * get a file from the package
     * @param {String} _path the path of the file in the package
     * @param {String} _format the format of the content, support "binary" and "text"
     */
    getFile(_path, _format) {
        return this.zip.getFile(_path, _format);
    }

    /**
     * 设置一个扩展名对应的内容类型
     * @param {String} _extension 扩展名
     * @param {String} _type 扩展名对应的内容类型
     */
    setExtensionType(_extension, _type) {
        const dom = this.contentTypes;
        const contentTypes = assert(dom.xpathSelect("//*[local-name(.)='Types']", true), 
                                    error.LOCATE_NODE_FAIL("Types in [content types].xml"));
        _extension = _extension.replace(/^\./, "");
        const typeDesc = contentTypes.xpathSelect(`./*[local-name(.)='Default' and @Extension='${_extension}']`, true);
        if (typeDesc) {
            typeDesc.setAttribute("ContentType", _type);
        } else {
            const newItem = assert( dom.createElement("Default"),
                                    error.ACQUIRE_RESOURCE_FAIL('"Default" node in ContentType'));
            newItem.setAttribute("ContentType", _type);
            newItem.setAttribute("Extension", _extension);
            contentTypes.appendChild(newItem);
        }
    }
}

/**
 * 
 */
export default {
    /**
     * Open a package, and return an instance of OpenXmlPackage
     * @param {IApplication} _app an implementation of IApplication
     * @param {*} _package any data of the package, the format dependent on the implementation of IZip
     * @return {Promise<OpenXmlPackage>} a promise that will be resolved with an object of OpenXmlPackage
     */
    async open(_app, _package) {
        if (IApplication.isPrototypeOf(_app)) {
            const zip = await (new _app.ZIP()).load(_package);
            if (zip instanceof IZip) {
                const contentTypeXML = await zip.getFile(CONTENTTYPE_PATH);
                return new OpenXmlPackage(_app, zip, contentTypeXML);
            }
        }
    },

    /**
     * check if the input object is an instance of OpenXmlPackage class
     * @param {*} _obj
     */
    isPackage(_obj) {
        return _obj instanceof OpenXmlPackage;
    },

    /**
     * extern the prototype of OpenXmlPackage class
     * @param {Object} _obj 
     */
    extern(_obj) {
        for (let item in _obj) {
            OpenXmlPackage.prototype[item] = _obj[item];
        }
    }
}