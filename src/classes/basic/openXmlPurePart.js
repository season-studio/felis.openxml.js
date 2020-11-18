import { readonly } from "../../common";
import { OpenXmlPart } from "./openXmlPart";
import { OpenXmlElement } from "./openXmlElement";
import { error } from "../../common";

const assert = error.assert;

/**
 * basic class of all OpenXML part which content is XML
 * @extends OpenXmlPart
 */
export class OpenXmlPurePart extends OpenXmlPart {

    constructor(_opt) {
        super(_opt);

        readonly(this, {
            contentDom: _opt.package.application.DOM.parse(_opt.content)
        });
    }

    /**
     * get the data of the content
     */
    get content() {
        return this.contentDom.toString();
    }

    /**
     * get the instance of OpenXmlElement for the primary element in the DOM
     */
    get primaryElement() {
        return OpenXmlElement.instanced(this.contentDom.documentElement);
    }

    /**
     * create a new element of the given class
     * @param {Class} _elementClass the class of the new element
     * @param {*} _options the options for the creation action
     */
    createElement(_elementClass, _options) {
        const root = this.primaryElement;
        if (root) {
            return root.createElement(_elementClass, _options);
        } else {
            return _elementClass.createElement && _elementClass.createElement(this.contentDom, null, _options);
        }
    }
}