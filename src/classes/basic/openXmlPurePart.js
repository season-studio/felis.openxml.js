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
        return OpenXmlElement.instanced(this.contentDom.primaryNode);
    }
}