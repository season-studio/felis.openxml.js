import { GroupShapeBase } from "./groupShapeBase";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the shape's group, element with tag "grpSp"
 * @class GroupShape
 */
export const GroupShape = OpenXmlElement.register(class GroupShape extends GroupShapeBase {
    //#region override the key information
    static LocalName = "grpSp";
    //#endregion

    constructor (_node) {
        super(_node);
    }
    
});