import { error } from "../../common";

const assert = error.assert;

/**
 * basic class of OpenXML attributes
 */
export class OpenXmlAttribute {
    /**
     * construct an Open XML attribute
     * @param {String} _localName the local name of the attribute
     * @param {String} _nsURI the uri of the name-space of the attribute
     * @param {String} _defPrefix the default prefix of the attribute's name-space
     * @param {Object} _opt the extend options, can be undefined
     *                      format is { default: default-value, checker: func-to-check-the-value }
     */
    constructor (_localName, _nsURI, _defPrefix, _opt) {
        Object.defineProperties(this, {
            localName: {
                value: String(_localName),
                writable: false
            },
            defaultPrefix: {
                value: _defPrefix && String(_defPrefix),
                writable: false
            },
            namespaceUri: {
                value: String(_nsURI),
                writable: false
            },
            options: {
                value: _opt || {},
                writable: false
            }
        });
    }

    /**
     * get the qualified name of the attribute
     * it contains the prefix of the name-space and the local-name
     * @param {Node} _node 
     */
    qualifiedName(_node) {
        const prefix = _node.lookupPrefix(this.namespaceUri) || this.defaultPrefix;
        return prefix ? `${prefix}:${this.localName}` : this.localName;
    }

    /**
     * adjust the input value of the attribute
     * @param {*} _val the input value
     */
    adjustValue(_val) {
        (arguments.length <= 0) && (_val = this.options.default);
        const fn = this.options.checker;
        return fn ? fn(_val) : _val; 
    }

    /**
     * get the value of the attribute
     * @param {Node} _node
     */
    getValue(_node) {
        const ns = this.namespaceUri;

        return ns ? _node.getAttributeNS(ns, this.localName) : _node.getAttribute(this.qualifiedName(_node));
    }

    /**
     * set the value of the attribute
     * @param {Node} _node 
     * @param {*} _val
     */
    setValue(_node, _val) {
        _val = this.adjustValue(_val);

        const ns = this.namespaceUri;
        ns ? _node.setAttributeNS(ns, this.qualifiedName(_node), _val) : _node.setAttribute(this.localName, _val);
    }

    /**
     * delete the attribute
     * @param {Node} _node
     */
    remove(_node) {
        const ns = this.namespaceUri;
        ns ? _node.removeAttributeNS(ns, this.localName) : _node.removeAttribute(this.qualifiedName(_node));
    }

    /**
     * generate a xpath expression part
     * @param {*} _val value for select, can ignore this parameter
     */
    xpath(_val) {
        return `@*[local-name(.)='${this.localName}' and namespace-uri(.)='${this.namespaceUri}' ${(arguments.length > 0) ? `and string(.)='${_val}'` : ""}]`
    }

    /**
     * generate a xpath expression part for searching any attribute with the val
     * @param {*} _val 
     */
    static xpathVal(_val) {
        return `@*[string(.)='${_val}']`;
    }
}