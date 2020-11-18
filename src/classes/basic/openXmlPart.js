import { default as OpenPackage } from "./openXmlPackage";
import path from "path";
import { readonly, error, genRandId } from "../../common";

const assert = error.assert;

// registed table for subclassed part
const registedParts = {};

// XML for relationship file initialization
const EMPTY_RELATIONSHRIP_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';

/**
 * basic class of all OpenXML part
 */
export class OpenXmlPart {
    //#region static members

    /**
     * get the path of the relationship file from the path of the part file path
     * @param {*} _partPath the path of the part file
     */
    static getRelationshipPath(_partPath) {
        const partDir = path.dirname(_partPath);
        const partFileName = path.basename(_partPath);
        return path.join(partDir, `./_rels/${partFileName}.rels`).replace(/\\/ig, "/");
    }

    /**
     * load and instance a part from a package
     * @param {*} _package 
     * @param {*} _path 
     * @param {*} _opt 
     */
    static async load(_package, _path, _opt) {
        if (OpenPackage.isPackage(_package)) {
            const path = String(_path || this.DefaultPath).replace(/\\/ig, "/").replace(/^\//, "");
            const relationshipPath = OpenXmlPart.getRelationshipPath(path);
            const content = await _package.getFile(path, this.ContentFormat);
            if (content) {
                const relationshipXML = await _package.getFile(relationshipPath, "text");
                const opt = {
                    path,
                    content,
                    relationshipPath,
                    relationshipXML,
                    package: _package
                };
                _opt && Object.assign(opt, _opt);
                return new this(opt);
            }
        }
    }

    /**
     * convert the given part to the invoker class
     * @param {OpenXmlPart} _part part which will be converted
     * @param {*} _opt the extension options passed to the constructor of the invoker class
     */
    static async convert(_part, _opt) {
        assert(_part instanceof OpenXmlPart, error.EXPECT_PARAM("_part must be instance of OpenXmlPart"));

        const path = _part.path;
        const relationshipPath = _part.relationshipPath;
        const content = await _part.package.getFile(path, this.ContentFormat);
        if (content) {
            const relationshipXML = await _part.package.getFile(relationshipPath, "text");
            const opt = {
                path,
                content,
                relationshipPath,
                relationshipXML,
                package: _part.package
            };
            _opt && Object.assign(opt, _opt);
            return new this(opt);
        }
    }

    /**
     * create a new part
     * It should be override by the subclass if subclass needs this function
     * @param {OpenXmlPackage} _package the package store the new part
     * @param {String} _path the path in the package which the new part will save to
     * @returns {OpenXmlPart} the instance of the new part
     */
    static async create(_package, _path) {
        error.NoImplemented(`${this.name}.create`);
    }

    /**
     * string of the content's type, may be override by the subclass
     */
    static ContentType = undefined;

    /**
     * uri string of the part's schemas, must be override by the subclass
     */
    static SchemasURI = undefined;

    /**
     * format of the part's content, may be override by the subclass
     */
    static ContentFormat = "text";

    /**
     * the default path of the kind of part, mat be override by the subclass
     */
    static DefaultPath = "";

    /**
     * register a subclass part
     * @param {Class} _partClass class extends OpenXmlPart
     */
    static register(_partClass) {
        assert(OpenXmlPart.isPrototypeOf(_partClass), error.EXPECT_PARAM("_partClass"));
        assert(_partClass.SchemasURI, error.EXPECT_PARAM("_partclass.schemasURI"));

        registedParts[_partClass.SchemasURI] = _partClass;
        
        return _partClass;
    }

    //#endregion

    constructor(_opt) {
        const opt = _opt || {};

        assert(opt.path && opt.content, error.EXPECT_PARAM("opt.partPath & opt.partXML"));
        assert(opt.package, error.EXPECT_PARAM("opt.package"));
        const relationshipDom = opt.relationshipXML && opt.package.application.DOM.parse(opt.relationshipXML);

        readonly(this, {
            package: opt.package,
            path: opt.path,
            relationshipPath: opt.relationshipPath
        });
        relationshipDom && readonly(this, { relationshipDom });
    }

    //#region instance members

    /**
     * save this part into the package
     */
    commit() {
        const pkg = this.package;
        if (pkg) {
            const content = this.content;
            content && pkg.setFile(this.path, content, this.constructor.ContentType);
            const relationshipDom = this.relationshipDom;
            relationshipDom && pkg.setFile(this.relationshipPath, relationshipDom.toString(), "text");
        }
    }

    /**
     * check if two part in the same package
     * @param {OpenXmlPart} _part the part to be checked
     */
    inSamePackage(_part) {
        return _part && (_part.package === this.package);
    }

    /**
     * duplicate the part
     * @param {String} _path the path for the new part
     * @param {OpenXmlPackage} _package the package the save the new part, takes current package if this parameter is empty
     * @param {*} _opt the parameter passed to OpenXmlPart.load as the 3rd parameter
     */
    duplicate(_path, _package, _opt) {
        const targetPackage = _package || this.package;
        const content = this.content;
        // this action is only valid when the content is not empty, and has a different path or in different package
        if (content && ((targetPackage !== this.package) || (_path !== this.path))) {
            // copy the content and relationship content
            targetPackage.setFile(_path, content, this.ContentFormat, this.constructor.ContentType);
            const relationshipDom = this.relationshipDom;
            relationshipDom && targetPackage.setFile(OpenXmlPart.getRelationshipPath(_path), relationshipDom.toString(), "text");
            // TODO: to correct the relationship parts
            // ...
            // instance the new part object
            return this.constructor.load(targetPackage, _path, _opt);
        }
    }

    /**
     * get a relation part
     * @param {String|Class} _idOrClass id of the relation part, or a class of the relation part
     */
    async getRelationPart(_idOrClass) {
        const rels = this.relationshipDom;
        if (rels) {
            const nodeSel = OpenXmlPart.isPrototypeOf(_idOrClass)
                                ? rels.xpathSelect(`.//*[local-name(.)='Relationship' and @Type='${_idOrClass.SchemasURI}']`, true)
                                : rels.xpathSelect(`.//*[local-name(.)='Relationship' and @Id='${_idOrClass}']`, true);
            if (nodeSel) {
                const typeAttr = nodeSel.getAttribute("Type");
                let targetPath = String(nodeSel.getAttribute("Target")).replace(/\\/ig, "/");
                path.isAbsolute(targetPath) || (targetPath = path.join(path.dirname(this.path), targetPath));
                const ctor = registedParts[typeAttr] || OpenXmlPart;
                const part = await ctor.load(this.package, targetPath);
                part && readonly(part, { relationshipId: String(nodeSel.getAttribute("id")) });
                return part;
            }
        }
    }

    /**
     * insert a part as the relation part of current part
     * @param {OpenXmlPart} _part the part will be inserted
     */
    insertRelationPart(_part) {
        assert(_part instanceof OpenXmlPart, error.EXPECT_PARAM("_part"));
        
        const targetRelPath = path.relative(path.dirname(this.path), _part.path).replace(/\\/ig, "/");
        const rid = genRandId("R", 16);

        let rels = this.relationshipDom;
        if (!rels) {
            readonly(this, {relationshipDom: this.package.application.DOM.parse(EMPTY_RELATIONSHRIP_XML)});
            rels = this.relationshipDom;
        }

        assert(rels, error.ACQUIRE_RESOURCE_FAIL("Relationship DOM"));

        const relNode = rels.createElement("Relationship");
        assert(relNode, error.ACQUIRE_RESOURCE_FAIL("Relationship Node"));

        relNode.setAttribute("Target", targetRelPath);
        relNode.setAttribute("Type", _part.constructor.SchemasURI);
        relNode.setAttribute("Id", rid);
        rels.documentElement.appendChild(relNode);

        return rid;
    }

    /**
     * generate a iterator for relation parts
     * @param {String|Class|undefined} _class   class of the target part, 
     *                                          or the string of target part's type, 
     *                                          undefined for iterate all relation parts
     */
    * relationParts(_class) {
        const rels = this.relationshipDom;
        if (rels) {
            const nodeList = OpenXmlPart.isPrototypeOf(_class)
                                ? rels.xpathSelect(`.//*[local-name(.)='Relationship' and @Type='${_class.SchemasURI}']`)
                                : (typeof _class === "string"
                                    ? rels.xpathSelect(`.//*[local-name(.)='Relationship' and @Type='${_class}']`)
                                    : rels.xpathSelect(".//*[local-name(.)='Relationship']"));
            if (nodeList) {
                const curDir = path.dirname(this.path);
                for (let index in nodeList) {
                    const node = nodeList[index];
                    const relationshipId = node.getAttribute("id");
                    const type = node.getAttribute("Type");
                    let target = String(node.getAttribute("Target")).replace(/\\/ig, "/");
                    path.isAbsolute(target) || (target = path.join(curDir, target));
                    const ctor = registedParts[type] || OpenXmlPart;
                    yield {
                        index,
                        relationshipId,
                        target,
                        class: ctor,
                        type,
                        node
                    };
                }
            }
        }
    }

    //#endregion

}

