const { IDom, IZip, IApplication } = require("../../../.dist");
const JSZip = require("jszip");
const { DOMParser } = require("xmldom");
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

//#region Implementation of IDom

/**
 * select node by xpath expression in Node object
 * @param {String} _expression the xpath expression
 * @param {Boolean} _isSingle true for selecting the first matched node, false for selecting all matched node
 */
function xpathSelect(_expression, _isSingle) {
    return xpath.select(_expression, this, _isSingle);
}

// record the constructor of the Node
let elementCtor;

/**
 * extend the a prototype
 * @param {*} _proto the prototype object
 * @param {*} _map the map for extension members
 */
function protoExtended(_proto, _map) {
    for (let itemName in _map) {
        const itemValue = _map[itemName];
        (typeof itemValue === "function") 
            ? (_proto[itemName] = itemValue)
            : Object.defineProperty(_proto, itemName, itemValue)
    }
}

// extend the Node members
(function (nodeExtern) {
    const doc = new DOMParser().parseFromString("<a></a>", "text/xml");
    const node = doc.childNodes[0];
    elementCtor = node.constructor;
    protoExtended(elementCtor.prototype, nodeExtern);
})({
    xpathSelect
});

const $dom = Symbol("app.dom");

/**
 * Implementation of IDom using xmldom
 */
class Dom extends IDom {
    constructor (_dom) {
        super();
        this[$dom] = _dom;
    }

    get primaryNode() {
        const nodeList = this[$dom].childNodes;
        const count = nodeList.length;
        for (let i = 0; i < count; i++) {
            const item = nodeList[i];
            if (item.nodeType === 1) {
                return item;
            }
        }
    }

    xpathSelect(_expression, _isSingle) {
        return xpathSelect.call(this[$dom], _expression, _isSingle);
    }

    createElement() {
        return this[$dom].createElement.apply(this[$dom], Array.prototype.slice.call(arguments, 0));
    }

    createElementNS() {
        return this[$dom].createElementNS.apply(this[$dom], Array.prototype.slice.call(arguments, 0));
    }

    appendChild() {
        return this[$dom].appendChild.apply(this[$dom], Array.prototype.slice.call(arguments, 0));
    }

    toString() {
        return this[$dom].toString();
    }

    static parse(_xmlString) {
        return new Dom(new DOMParser().parseFromString(String(_xmlString), "text/xml"));
    }

    static isElementNode(_obj) {
        return _obj instanceof elementCtor;
    }
}
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
    Dom,
    Application,
};
