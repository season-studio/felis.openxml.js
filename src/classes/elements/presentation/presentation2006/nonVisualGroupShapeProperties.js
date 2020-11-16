import { OpenXmlElement } from "../../../basic";
import { NonVisualPropertiesBase } from "./nonVisualPropertiesBase";

/**
 * class of the nonvisual properties of the shape's group, element with tag "nvGrpSpPr"
 * @class NonVisualGroupShapeProperties
 */
export const NonVisualGroupShapeProperties = OpenXmlElement.register(class NonVisualGroupShapeProperties extends NonVisualPropertiesBase {
    //#region override the key information
    static LocalName = "nvGrpSpPr";
    //#endregion

    constructor (_node) {
        super(_node);
    }
});