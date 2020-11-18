import Wordprocessing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the text, element with tag "w:t"
 */
export const Text = OpenXmlElement.register(class Text extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "t";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    static createDetail(_text, _options) {
        _text.setAttribute("xml:space", "preserve");
        _options && _options.text && (_text.textContent = _options.text);
    }
});