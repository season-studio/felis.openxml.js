import Wordprocessing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { Text } from "./text";

/**
 * class of the test run, element with tag "w:r"
 */
export const Run = OpenXmlElement.register(class Run extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "r";
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
});