const { IDom, IZip, IApplication } = require("../../../.dist");
// const JSZip = require("jszip");

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
            type: "blob",
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
    const exp = document.createExpression(_expression);
    if (exp) {
        const result = exp.evaluate(this);
        if (result) {
            let list = undefined;
            let item;
            while (item = result.iterateNext()) {
                if (_isSingle) {
                    return item;
                }
                (list || (list = [])).push(item);
            }
            return list;
        }
    }
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

/**
 * serialize the node to XML string
 */
Node.prototype.toString = function () {
    return new XMLSerializer().serializeToString(this);
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
    
    static pickFile(_fileType) {
        return new Promise((resoleve, reject) => {
            try {
                const inputElement = document.createElement("input");
                inputElement.type = "file";
                _fileType && (inputElement.accept = _fileType);
                inputElement.addEventListener("change", () => { 
                    const files = inputElement.files;
                    if (files.length > 0) {
                        resoleve(files[0]);
                    } else {
                        reject(0);
                    }
                });
                inputElement.click();
            } catch (error) {
                reject(error);
            }
        });
    }

    static dynInvokeLink(_url, _opt) {
        if (_url) {
            const aElement = document.createElement("a");
            if (aElement) {
                aElement.href = _url;
                aElement.rel = "noopener";
                if (_opt) {
                    for (const name in _opt) {
                        aElement[name] = _opt[name];
                    }
                }
                aElement.click();
            }
        }
    }

    static saveToFile(_blob, _filter) {
        const url = URL.createObjectURL(_blob);
        this.dynInvokeLink(url, {download: `*.${_filter}`});
        URL.revokeObjectURL(url);
    }
}
//#endregion

module.exports = {
    Zip,
    Node,
    Application,
};
