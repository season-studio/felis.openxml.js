import { error, readonly } from "../../common";
import { IDom } from "../../dependentInterface";
import { OpenXmlAttribute } from "./openXmlAttribute";

const assert = error.assert;

const $node = Symbol("OpenXmlElement.node");

/**
 * register map for subclass OpenXML elements
 */
const registedElements = {};

/**
 * basic class of all OpenXml Element
 */
export class OpenXmlElement {

    constructor (_node) {
        assert(_node, error.EXPECT_PARAM("_node"));
        readonly(this, {
            node: _node
        });
    }

    //#region members should be override by subclass

    /**
     * the local name of this kind of element's node
     */
    static LocalName = undefined;

    /**
     * the default prefix name of this kind of element's node
     */
    static DefaultPrefix = undefined;

    /**
     * the uri of this kind of element's namespace
     */
    static NamespaceUri = undefined;

    //#endregion

    //#region static members

    /**
     * register a subclass
     * @param {Class} _elementClass a subclass entends OpenXmlElement
     */
    static register(_elementClass) {
        assert(_elementClass && OpenXmlElement.isPrototypeOf(_elementClass), error.EXPECT_PARAM("_elementClass"));
        assert(_elementClass.NamespaceUri, error.EXPECT_PARAM(`${_elementClass.name}.NamespaceUri`));

        const key = `${_elementClass.NamespaceUri}::${_elementClass.LocalName}`;
        registedElements[key] = _elementClass;

        return _elementClass;
    }

    /**
     * get the prefix in the range of a element
     * this function is not getting the prefix name for the input element but for the invoker class
     * @param {OpenXmlElement} _element
     */
    static prefix(_element) {
        return ((_element instanceof OpenXmlElement) && _element.node.lookupPrefix(this.NamespaceUri)) || this.DefaultPrefix;
    }

    /**
     * get the qualified name in the range of a element
     * this function is not getting the qualified name for the input element but for the invoker class
     * @param {OpenXmlElement} _element
     */
    static qualifiedName(_element) {
        const singleTagName = this.LocalName;
        assert(singleTagName, error.NO_IMPLEMENT(`${this.name}.LocalName`));
        const prefixName = this.prefix(_element);
        return prefixName ? `${prefixName}:${singleTagName}` : singleTagName;
    }

    /**
     * instanced an OpenXMLElement object for the input node
     * @param {Element} _node
     */
    static instanced(_node) {
        if (_node && (1 === _node.nodeType)) {
            const key = `${_node.namespaceURI}::${_node.localName}`;
            const ctor = registedElements[key] || OpenXmlElement;
            return new ctor(_node);
        }
    }

    /**
     * check if the input node matched to the invoker class
     * @param {Element} _node
     */
    static isMatchedNode(_node) {
        return _node && (_node.namespaceURI === this.NamespaceUri) && (_node.localName === this.LocalName);
    }

    /**
     * create a new element of the invoker class
     * @param {IDOM|Document} _dom the isntance of the IDOM for creating element
     * @param {Element} _parentElement the parent element which will contain the new element
     */
    static createElement(_dom, _parentElement) {
        assert(_dom, error.EXPECT_PARAM("_dom"));

        const node = _dom.createElementNS(this.NamespaceUri, this.qualifiedName(_parentElement));
        if (node) {
            let element = new this(node);
            this.createDetail(element);
            return element;
        }
    }

    /**
     * the action for preparing the detail data of a new instance
     * @param {OpenXmlElement} _element 
     */
    static createDetail(_element) {
        assert(_element instanceof this, error.EXPECT_PARAM(`_element must be instance of ${this.name}`));
    }

    /**
     * generate a xpath part of this class
     * @param {String} _custom some custom expression part, can be ignored.
     */
    static xpath(_custom) {
        return `*[local-name(.)='${this.LocalName}' and namespace-uri(.)='${this.NamespaceUri}' ${_custom || ""}]`
    }

    /**
     * generate a xpath expression for searching
     * @param {String} _prefix the prefix expression, such as "./", ".//", and so on
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will take "*" by default if ignore this parameter.
     */
    static genXPath(_prefix, _arg) {
        return `${_prefix}${(((_arg instanceof OpenXmlAttribute) || OpenXmlElement.isPrototypeOf(_arg)) && _arg.xpath()) || _arg || "*"}`;
    }

    //#endregion

    //#region instance properties

    /**
     * get the prefix name
     */
    get prefix() {
        return this.node.prefix;
    }

    /**
     * get the local name
     */
    get localName() {
        return this.node.localName;
    }

    /**
     * get the qualified name
     */
    get qualifiedName() {
        return this.node.nodeName;
    }

    /**
     * get the text content of this instance
     */
    get textContent() {
        return this.node.textContent;
    }

    /**
     * get the class name of this instance
     */
    get className() {
        return this.constructor.name;
    }

    //#endregion

    //#region instance methods

    /**
     * search all children matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any children by default if ignore this parameter.
     */
    children(_arg) {
        const selectExp = this.constructor.genXPath("./", _arg);
        const nodes = this.node.xpathSelect(selectExp);
        return nodes ? nodes.map(node => OpenXmlElement.instanced((1 !== node.nodeType) ? node.ownerElement : node) || node) : [];
    }

    /**
     * search all descendants matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any descendants by default if ignore this parameter.
     */
    descendants(_arg) {
        const selectExp = this.constructor.genXPath(".//", _arg);
        const nodes = this.node.xpathSelect(selectExp);
        return nodes ? nodes.map(node => OpenXmlElement.instanced((1 !== node.nodeType) ? node.ownerElement : node) || node) : [];
    }

    /**
     * search the first children matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any children by default if ignore this parameter.
     */
    childOne(_arg) {
        const selectExp = this.constructor.genXPath("./", _arg);
        const node = this.node.xpathSelect(selectExp, true);
        return node && (OpenXmlElement.instanced((1 !== node.nodeType) ? node.ownerElement : node) || node);
    }

    /**
     * search the first descendant matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any descendant by default if ignore this parameter.
     */
    descendantOne(_class, _exSelector) {
        const selectExp = this.constructor.genXPath(".//", _arg);
        const node = this.node.xpathSelect(selectExp, true);
        return node && (OpenXmlElement.instanced((1 !== node.nodeType) ? node.ownerElement : node) || node);
    }

    /**
     * append a element as the last child of the current element
     * @param {OpenXmlElement} _element the element will be append
     */
    appendChild(_element) {
        assert(_element instanceof OpenXmlElement, error.EXPECT_PARAM("_element"));

        this.node.appendChild(_element.node);
    }

    /**
     * insert a element as the sibling of the current element
     * @param {OpenXmlElement} _element the element will be inserted
     * @param {Boolean} _before true for insert before the current element, false for insert after the current element
     */
    insertAsSibling(_element, _before) {
        assert(_element instanceof OpenXmlElement, error.EXPECT_PARAM("_element"));

        const refNode = this.node;
        const parent = refNode.parentNode;
        parent && parent.insertBefore(_element.node, _before ? refNode : refNode.nextSibling);
    }

    /**
     * create a new element of the given class
     * @param {Class} _elementClass the class of the new element
     */
    createElement(_elementClass) {
        assert(OpenXmlElement.isPrototypeOf(_elementClass), error.EXPECT_PARAM("_elementClass"));

        return _elementClass.createElement(this.node.ownerDocument, this);
    }

    /**
     * remove the current from the DOM
     */
    remove() {
        const parent = this.node.parent;

        parent && parent.removeChild(this.node);
    }

    /**
     * set a attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     * @param {*} _val value of the attribute
     */
    setAttribute(_attr, _val) {
        (_attr instanceof OpenXmlAttribute)
            ? _attr.setValue(this.node, _val)
            : this.node.setAttribute(String(_attr), _val);
    }

    /**
     * get the value of the given attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     */
    getAttribute(_attr) {
        return (_attr instanceof OpenXmlAttribute)
                    ? _attr.getValue(this.node)
                    : this.node.getAttribute(String(_attr));
    }

    /**
     * remove the given attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     */
    removeAttribute(_attr) {
        return (_attr instanceof OpenXmlAttribute)
                    ? _attr.remove(this.node)
                    : this.node.removeAttribute(String(_attr));
    }

    //#endregion
}
