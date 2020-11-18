import { main as mainURI } from "./namespaceURI";
import Wordprocessing2006 from "./basic";
import { OpenXmlElement, OpenXmlAttribute } from "../../../basic";

export const AttrValue = new OpenXmlAttribute("val", mainURI, "w");

/**
 * class of the paragraph style id, element with tag "w:pStyle"
 */
export const ParagraphStyleId = OpenXmlElement.register(class ParagraphStyleId extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "pStyle";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the value
     */
    get value() {
        return this.getAttribute(AttrValue);
    }

    /**
     * set the relationship ID
     */
    set value(_val) {
        if (arguments.length > 0) {
            this.setAttribute(AttrValue, _val);
        } else {
            this.remove();
        }
    }
});