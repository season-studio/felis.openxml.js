import { OpenXmlElement } from "../../../basic";
import { NonVisualPictureProperties } from "./nonVisualPictureProperties";
import { VisualSlideObject } from "./visualSlideObject";

/**
 * class of the picture, element with tag "pic"
 * @class Picture
 */
export const Picture = OpenXmlElement.register(class Picture extends VisualSlideObject {
    //#region override the key information
    static LocalName = "pic";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get the nonvisual properties
     */
    get nonVisualProperties() {
        let pr = this.childOne(NonVisualPictureProperties);
        if (!pr) {
            pr = this.createElement(NonVisualPictureProperties);
            pr && this.appendChild(pr);
        }
        return pr;
    }
});