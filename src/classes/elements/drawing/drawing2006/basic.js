import { OpenXmlElement } from "../../../basic";
import { main as mainURI } from "./namespaceURI";

/**
 * basic class of all element defined in drawing2006
 */
export default class Drawing2006 extends OpenXmlElement {
    //#region override the key information
    static NamespaceUri = mainURI;
    static DefaultPrefix = "a";
    //#endregion

    constructor (_node) {
        super(_node);
    }
}
