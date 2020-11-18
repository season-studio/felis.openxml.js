import Wordprocessing2006 from "./basic";
import { OpenXmlElement, OpenXmlAttribute } from "../../../basic";
import { Text } from "./text";
import { StyleParagraphProperties } from "./styleParagraphProperties";

/**
 * class of the paragraph, element with tag "w:p"
 */
export const Paragraph = OpenXmlElement.register(class Paragraph extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "p";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get all text in the element
     */
    get textContent() {
        const items = this.descendants(Text).map(text => text.textContent);
        
        return items.join("");
    }

    /**
     * get the properties
     */
    get styleProperties() {
        let prop = this.childOne(StyleParagraphProperties);
        if (!prop) {
            prop = this.createElement(StyleParagraphProperties);
            prop && this.insertChild(prop, 0);
        }
        return prop;
    }
});