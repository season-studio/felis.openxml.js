import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { CommonSlideData } from "./commonSlideData";

/**
 * class of element contains the nonvisual information, element with tag "cNvPr"
 * @class NonVisualDrawingProperties
 */
export const NonVisualDrawingProperties = OpenXmlElement.register(class NonVisualDrawingProperties extends Presentations2006 {
    //#region override the key information
    static LocalName = "cNvPr";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the name information
     */
    get name() {
        return this.getAttribute("name")
    }

    /**
     * set the name information
     */
    set name(_val) {
        this.setAttribute("name", _val);
    }

    /**
     * get the ID
     */
    get id() {
        return this.getAttribute("id");
    }

    /**
     * set the ID
     */
    set id(_val) {
        this.setAttribute("id", _val);
    }

    /**
     * get the description
     */
    get description() {
        return this.getAttribute("descr");
    }

    /**
     * set the description
     */
    set description(_val) {
        return this.setAttribute("descr", _val);
    }
});