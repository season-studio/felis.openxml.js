import { readonly, error } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart } from "../../basic";
import { presentation, office, drawing }  from "../../elements";

/**
 * class of the slide part
 * @class SlidePart
 */
export const SlidePart = OpenXmlPart.register(class SlidePart extends OpenXmlPurePart {
    //#region override the key information
    static SchemasURI = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide";
    static ContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
    //#endregion

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        let slideElement = this.primaryElement;
        if (!(slideElement instanceof presentation.Slide)) {
            slideElement = presentation.Slide.createElement(this.dom);
            slideElement && this.dom.appendChild(slideElement.node);
        }
        readonly(this, "slide", slideElement);
    }

});