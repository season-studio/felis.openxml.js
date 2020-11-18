import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of element with tag "blipFill"
 * @class BlipFill
 */
export const BlipFill = OpenXmlElement.register(class BlipFill extends Presentations2006 {
    //#region override the key information
    static LocalName = "blipFill";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

});