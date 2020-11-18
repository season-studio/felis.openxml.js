import Wordprocessing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the document's body, element with tag "body"
 */
export const Body = OpenXmlElement.register(class Body extends Wordprocessing2006 {
    //#region override the key information
    static LocalName = "body";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
});