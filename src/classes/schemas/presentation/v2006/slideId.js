import Presentations2006 from "./basic";
import { AttrRelationshipId } from "../../officeDocument";
import { OpenXmlElement } from "../../../basic";
import { genRandId } from "../../../../common";

/**
 * class of the slide's id, element with tag "sldId"
 * @class SlideId
 */
export const SlideId = OpenXmlElement.register(class SlideId extends Presentations2006 {
    //#region override the key information
    static LocalName = "sldId";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the relationship ID
     */
    get relationshipId() {
        let id = this.getAttribute(AttrRelationshipId);
        if (!id) {
            id = genRandId("R");
            this.setAttribute(AttrRelationshipId, id);
        }
        return id;
    }

    /**
     * set the relationship ID
     */
    set relationshipId(_val) {
        this.setAttribute(AttrRelationshipId, _val || utility.genRandId("R", 16));
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
        _val = Number(_val);
        isNaN(_val) || this.setAttribute("id", _val);
    }
});