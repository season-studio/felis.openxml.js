import Presentations2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { SlideId } from "./slideId";

/**
 * class of the list of the slide's ID, element with tag "sldIdLst"
 * @class SlideIdList
 */
export const SlideIdList = OpenXmlElement.register(class SlideIdList extends Presentations2006 {
    //#region override the key inforamtion
    static LocalName = "sldIdLst";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get count of the IDs
     */
    get count() {
        return this.children(SlideId).length;
    }

    /**
     * get an iterator for enumerating all SlideIds
     */
    *items() {
        const list = this.children(SlideId);
        for (let index in list) {
            yield {
                index,
                slideId: list[index]
            };
        }
    }

});