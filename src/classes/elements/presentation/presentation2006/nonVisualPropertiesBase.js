import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { NonVisualDrawingProperties } from "./cNvPr";

/**
 * basic class of the nonvisual properties
 * @class NonVisualPropertiesBase
 */
export class NonVisualPropertiesBase extends Presentations2006 {
    
    constructor (_node) {
        super(_node);
    }

    /**
     * get the name information
     */
    get name() {
        const pr = this.childOne(NonVisualDrawingProperties);
        return pr && pr.name;
    }

    /**
     * set the name information
     */
    set name(_val) {
        const pr = this.childOne(NonVisualDrawingProperties);
        pr && (pr.name = _val);
    }

    /**
     * get the ID information
     */
    get id() {
        const pr = this.childOne(NonVisualDrawingProperties);
        return pr && pr.id;
    }

    /**
     * set the ID information
     */
    set id(_val) {
        const pr = this.childOne(NonVisualDrawingProperties);
        pr && (pr.id = _val);
    }

    /**
     * get the description
     */
    get description() {
        const pr = this.childOne(NonVisualDrawingProperties);
        return pr && pr.description;
    }

    /**
     * set the description
     */
    set description(_val) {
        const pr = this.childOne(NonVisualDrawingProperties);
        pr && (pr.description = _val);
    }
}