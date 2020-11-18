const { IDom, IZip, IApplication } = require("../../../.dist");
const JSZip = require("jszip");
const { DOMParser } = require("xmldom");
const { Node } = require("xmldom/lib/dom");
const xpath = require("xpath");

//#region Implementation of IZip
const $zip = Symbol("app.zip");

/**
 * Implementation of IZip using jzsip
 */
class Zip extends IZip {
    constructor () {
        super();
        this[$zip] = new JSZip();
    }

    async getFile(_file, _format) {
        const file = this[$zip].file(String(_file).replace(/\\/ig, "/").replace(/^\//, ""));
        return file && await file.async("binary" === _format ? "uint8array" : "text");
    }

    setFile(_file, _content, _format) {
        this[$zip].file(String(_file).replace(/\\/ig, "/").replace(/^\//, ""), _content, {
            binary: (_format == "binary")
        });
    }

    async load(_file) {
        await this[$zip].loadAsync(_file);
        return this;
    }

    save() {
        return this[$zip].generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        });
    }
}
//#endregion

//#region Implementation of IDom, implemented by Node in this situation

/**
 * select node by xpath expression in Node object
 * @param {String} _expression the xpath expression
 * @param {Boolean} _isSingle true for selecting the first matched node, false for selecting all matched node
 */
Node.prototype.xpathSelect = function (_expression, _isSingle) {
    return xpath.select(_expression, this, _isSingle);
}

/**
 * check if a node is an element
 * @param {Node} _node 
 */
Node.isElementNode = function (_node) {
    return (_node instanceof Node) && (_node.nodeType === 1);
}

/**
 * parse a XML string into an instance of DOM
 * @param {*} _xmlString 
 */
Node.parse = function (_xmlString) {
    return new DOMParser().parseFromString(String(_xmlString), "text/xml");
}

const Dom = Node;
//#endregion

//#region Implementation of IApplication
class Application extends IApplication {
    constructor() {
        super();
    }
    static ZIP = Zip;
    static DOM = Dom;
}
//#endregion

module.exports = {
    Zip,
    Node,
    Application,
};
