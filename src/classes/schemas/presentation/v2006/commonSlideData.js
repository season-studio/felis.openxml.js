import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { ShapeTree } from "./shapeTree";

/**
 * class of the common data of the slide, element with tag "cSld"
 * @class CommonSlideDatas
 */
export const CommonSlideData = OpenXmlElement.register(class CommonSlideData extends Presentations2006 {
    //#region override the key information
    static LocalName = "cSld";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the tree of the shapes
     */
    get shapeTree() {
        let tree = this.childOne(ShapeTree);
        if (!tree) {
            tree = this.createElement(ShapeTree);
            tree && this.appendChild(tree);
        }
        return tree;
    }
});