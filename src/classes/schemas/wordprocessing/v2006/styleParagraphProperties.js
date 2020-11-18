import Wordprocessing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { ParagraphStyleId } from "./paragraphStyleId";

/**
 * class of the table style conditional formatting paragraph properties, element with tag "w:pPr"
 */
export const StyleParagraphProperties = OpenXmlElement.register(class StyleParagraphProperties extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "pPr";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the paragraph style id
     */
    get paragraphStyleId() {
        const element = this.childOne(ParagraphStyleId);
        return element && element.value;
    }

    /**
     * set the paragraph style id
     */
    set paragraphStyleId(_val) {
        let element = this.childOne(ParagraphStyleId);
        if ((!element) && (arguments.length > 0)) {
            element = this.createElement(ParagraphStyleId);
            element && this.appendChild(element);
        }
        element && (element.value = _val);
    }
});