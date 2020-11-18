import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { CommonSlideData } from "./commonSlideData";

/**
 * class of the slide, element with tag "sld"
 */
export const Slide = OpenXmlElement.register(class Slide extends Presentations2006 {
    //#region override the key information
    static LocalName = "sld";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the common data of the slide
     */
    get commonData() {
        let cSld = this.childOne(CommonSlideData);
        if (!cSld) {
            cSld = this.createElement(CommonSlideData);
            cSld && this.appendChild(cSld);
        }
        return cSld;
    }
});