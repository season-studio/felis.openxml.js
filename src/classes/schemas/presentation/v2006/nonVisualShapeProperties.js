import { OpenXmlElement } from "../../../basic";
import { NonVisualPropertiesBase } from "./nonVisualPropertiesBase";

/**
 * class of the nonvisual properties of the shape, element with tag "nvSpPr"
 * @class NonVisualShapeProperties
 */
export const NonVisualShapeProperties = OpenXmlElement.register(class NonVisualShapeProperties extends NonVisualPropertiesBase {
    //#region override the key inforamtion
    static LocalName = "nvSpPr";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
});