import Wordprocessing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { Body } from "./body";

/**
 * class of the document, element with tag "document"
 */
export const Document = OpenXmlElement.register(class Document extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "document";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the body of the document
     */
    get body() {
        let element = this.childOne(Body);
        if (!element) {
            element = this.createElement(Body);
            element && this.appendChild(element);
        }
        return element;
    }
});