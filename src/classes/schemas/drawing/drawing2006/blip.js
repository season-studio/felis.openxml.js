import Drawing2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { AttrEmbed } from "../../officeDocument";

/**
 * class of the element with tag "a:blip"
 * @class Blip
 */
export const Blip = OpenXmlElement.register(class Blip extends Drawing2006 {
    //#region override the key information
    static LocalName = "blip";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get the embed id
     */
    get EmbedId() {
        return this.getAttribute(AttrEmbed);
    }

    /**
     * set the embed id
     */
    set EmbedId(_val) {
        this.setAttribute(AttrEmbed, _val);
    }
});