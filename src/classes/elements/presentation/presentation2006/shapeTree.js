import { GroupShapeBase } from "./groupShapeBase";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the tree of the shapes, element with tag "spTree"
 * @class ShapeTree
 */
export const ShapeTree = OpenXmlElement.register(class ShapeTree extends GroupShapeBase {
    //#region override the key information
    static LocalName = "spTree";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    
});