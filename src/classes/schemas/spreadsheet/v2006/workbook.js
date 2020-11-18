import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { SheetList } from "./sheetList";

/**
 * class of the workbook, element with tag "workbook"
 */
export const Workbook = OpenXmlElement.register(class Workbook extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "workbook";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    get sheetList() {
        let list = this.childOne(SheetList);
        if (!list) {
            list = this.createElement(SheetList);
            list && this.appendChild(list);
        }
        return list;
    }
});