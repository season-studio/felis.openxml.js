import { OpenXmlElement } from "../../../basic";
import { main as mainURI } from "./namespaceURI";

/**
 * basic class for elements defined in presentation2006
 */
export default class Presentation2006 extends OpenXmlElement {
    //#region override the key information
    static NamespaceUri = mainURI;
    static DefaultPrefix = "p";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
}
