import { OpenXmlElement } from "../../../basic";
import { main as mainURI } from "./namespaceURI";

/**
 * basic class for elements defined in spreadsheet2006
 */
export default class Spreadsheet2006 extends OpenXmlElement {
    //#region override the key information
    static NamespaceUri = mainURI;
    static DefaultPrefix = "x";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
}
