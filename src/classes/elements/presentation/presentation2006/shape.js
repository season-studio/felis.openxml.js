import { OpenXmlElement } from "../../../basic";
import { NonVisualShapeProperties } from "./nonVisualShapeProperties";
import { VisualSlideObject } from "./visualSlideObject";
import { TextBody } from "../../drawing";

/**
 * class of the shape, element with tag "sp"
 */
export const Shape = OpenXmlElement.register(class Shape extends VisualSlideObject {
    //#region override the key information
    static LocalName = "sp";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get the nonvisual properties
     */
    get nonVisualProperties() {
        let pr = this.childOne(NonVisualShapeProperties);
        if (!pr) {
            pr = this.createElement(NonVisualShapeProperties);
            pr && this.appendChild(pr);
        }
        return pr;
    }

    /**
     * get the text body object
     */
    get textBody() {
        return this.childOne(TextBody);
    }
});