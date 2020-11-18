import Drawing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

//#region a:t
/**
 * class of the element with tag "a:t"
 * @class Text
 */
export const Text = OpenXmlElement.register(class Text extends Drawing2006 {
    //#region override the key information
    static LocalName = "t";
    //#endregion

    constructor (_node) {
        super(_node);
    }
});
//#endregion

//#region a:r
/**
 * class of the element with tag "a:r"
 * @class Run
 */
export const Run = OpenXmlElement.register(class Run extends Drawing2006 {
    //#region override the key information
    static LocalName = "r";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get all text in the element
     */
    get textContent() {
        const items = this.descendants(Text).map(text => text.textContent);
        
        return items.join("");
    }
});
//#endregion

//#region a:p
/**
 * class of element with tag "a:p"
 * @class Paragraph
 */
export const Paragraph = OpenXmlElement.register(class Paragraph extends Drawing2006 {
    //#region override the key information
    static LocalName = "p";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get all text in the element
     */
    get textContent() {
        const items = this.descendants(Text).map(text => text.textContent);
        
        return items.join("");
    }
});
//#endregion

//#region a:txBody
/**
 * class of element with tag "a:txBody"
 * @class TextBody
 */
export const TextBody = OpenXmlElement.register(class TextBody extends Drawing2006 {
    //#region override the key information
    static LocalName = "txBody";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get all text in the element
     */
    get textContent() {
        const items = this.descendants(Paragraph).map(p => p.textContent);
        
        return items.join("\r\n");
    }
});
//#endregion
