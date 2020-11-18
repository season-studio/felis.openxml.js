import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of column information, element with tag "col"
 */
export const ColumnInformation = OpenXmlElement.register(class ColumnInformation extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "col";
    //#endregion

    /**
     * get the width information
     */
    get width() {
        const customWidth = this.getAttribute("customWidth");
        return customWidth && Number(this.getAttribute("width"));
    }

    /**
     * set the width information
     * set as undefined will clear the setting
     */
    set width(_val) {
        if (typeof _val === "number") {
            this.setAttribute("width", _val);
            this.setAttribute("customWidth", 1);
        } else if (_val === undefined || _val === null){
            this.removeAttribute("width");
            this.removeAttribute("customWidth");
        }
    }

    /**
     * get the max index of column affected by this information 
     */
    get maxIndex() {
        return Number(this.getAttribute("max"));
    }

    /**
     * set the max index of the column affected by this information 
     */
    set maxIndex(_val) {
        (typeof _val === "number") && this.setAttribute("max", _val);
    }

    /**
     * get the min index of column affected by this information 
     */
    get minIndex() {
        return Number(this.getAttribute("min"));
    }

    /**
     * set the min index of the column affected by this information 
     */
    set minIndex(_val) {
        (typeof _val === "number") && this.setAttribute("min", _val);
    }

    /**
     * get the index range of columns affected by this information
     */
    get index() {
        return [this.minIndex, this.maxIndex];
    }

    /**
     * set the index of colum affected by this information 
     * this function will set the maxIndex ans minIndex with a same value
     */
    set index(_val) {
        (typeof _val === "number") && (this.maxIndex = _val, this.minIndex = _val);
    }
});


/**
 * class of the set of column information, element with tag "cols"
 */
export const ColumnInformationSet = OpenXmlElement.register(class ColumnInformationSet extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "cols";
    //#endregion

    /**
     * get all informations
     */
    get items() {
        return this.children(ColumnInformation);
    }

    /**
     * get the informations of the column index by the given number
     * @param {Number} _index the index of the column
     * @return {ColumnInformation} the information object, return undefined if the information is net set.
     */
    getInforamtion(_index) {
        for (let item of this.items) {
            if ((_index >= item.minIndex) && (_index <= item.maxIndex)) {
                return item;
            }
        }
    }

    /**
     * get the informations of the column index by the given number.
     * different from getInformation, this function will create a new information object if the information had been not set.
     * @param {Number} _index the index of the column
     * @return {ColumnInformation} the information object
     */
    acquireInformation(_index) {
        let info = this.getInforamtion(_index);
        if (!info) {
            info = this.createElement(ColumnInformation);
            info && (this.appendChild(info), info.index = _index);
        }
        return info;
    }
});