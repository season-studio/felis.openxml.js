import { readonly, error, genRandId } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart, OpenXmlPackage } from "../../basic";

const assert = error.assert;

const EMPTY_SHARESTRING_DOC_XML = '<?xml version="1.0" encoding="UTF-8" standalone="true"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"></sst>';

//#endregion

/**
 * Class of operating the share string part
 * @class ShareStringPart
 */
export const ShareStringPart = OpenXmlPart.register(class ShareStringPart extends OpenXmlPurePart {
    //#region override the shemas infomation and so on
    static SchemasURI = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
    static ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml";
    //#endregion

    /**
     * override for creating a new share string part
     * @param {OpenXmlPackage} _package the package store the new part
     * @param {String} _path the path of the share string part
     * @return {Promise<ShareStringPart>} the new part
     */
    static create(_package, _path) {
        assert(OpenXmlPackage.isPackage(_package), error.EXPECT_PARAM("_package must be an instance of OpenXmlPackage"));
        assert(_path, error.EXPECT_PARAM("_path"));

        _package.setFile(_path, EMPTY_SHARESTRING_DOC_XML, this.ContentFormat);
        return this.load(_package, _path);
    }

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        readonly(this, "table", this.primaryElement);
    }

    get items() {
        return this.table.items;
    }

    add(_text) {
        return this.table.add(_text);
    }
});