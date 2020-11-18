import { OpenXmlElement } from "../../../basic";
import { main as mainURI } from "./namespaceURI";

/**
 * basic class for elements defined in wordprocessing2006
 */
export default class Wordprocessing2006 extends OpenXmlElement {
    //#region override the key information
    static NamespaceUri = mainURI;
    static DefaultPrefix = "w";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
}
