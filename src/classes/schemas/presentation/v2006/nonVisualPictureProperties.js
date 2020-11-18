import { OpenXmlElement } from "../../../basic";
import { NonVisualPropertiesBase } from "./nonVisualPropertiesBase";

/**
 * class of the nonvisual properties of the picture, element with tag "nvPicPr"
 * @class NonVisualPictureProperties
 */
export const NonVisualPictureProperties = OpenXmlElement.register(class NonVisualPictureProperties extends NonVisualPropertiesBase {
    //#region override the key information
    static LocalName = "nvPicPr";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
});