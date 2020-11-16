import { OpenXmlElement } from "../../../basic";
import { NonVisualGroupShapeProperties } from "./nonVisualGroupShapeProperties";
import { VisualSlideObject } from "./visualSlideObject";

/**
 * basic class of all element contain a group of shape
 * @class GroupShapeBase
 */
export class GroupShapeBase extends VisualSlideObject {

    constructor (_node) {
        super(_node);
    }

    /**
     * get the nonvisual properties
     */
    get nonVisualProperties() {
        let pr = this.childOne(NonVisualGroupShapeProperties);
        if (!pr) {
            pr = this.createElement(NonVisualGroupShapeProperties);
            pr && this.appendChild(pr);
        }
        return pr;
    }

    /**
     * get an iterator for enumerating the visual elements
     */
    * visualChildren() {
        let list = this.children("*");
        for (let idx in list) {
            const element = list[idx];
            if (element instanceof VisualSlideObject) {
                yield element;
            }
        };
    }
};