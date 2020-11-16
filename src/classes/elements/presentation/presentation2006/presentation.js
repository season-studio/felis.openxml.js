import Presentations2006 from "./basic";
import { SlideIdList } from "./slideIdList";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the presetation, element with tag "presentation"
 */
export const Presentation = OpenXmlElement.register(class Presentation extends Presentations2006 {
    //#region override the key information
    static LocalName = "presentation";
    //#endregion

    constructor (_node) {
        super(_node);
    }

    /**
     * get the list of the slide's id
     */
    get slideIdList() {
        let list = this.children(SlideIdList);
        if (list.length <= 0) {
            list = this.createElement(SlideIdList);
            this.appendChild(list);
        } else {
            list = list[0];
        }
        return list;
    }
});