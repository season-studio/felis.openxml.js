import { readonly, error, genRandId } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart } from "../../basic";

import { SheetData, ColumnInformationSet } from "../../schemas/spreadsheet";

const assert = error.assert;

//#endregion

/**
 * Class of operating the sheet part
 * @class SheetPart
 */
export const SheetPart = OpenXmlPart.register(class SheetPart extends OpenXmlPurePart {
    //#region override the shemas infomation and so on
    static SchemasURI = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";
    static ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml";
    //#endregion

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        readonly(this, "workSheet", this.primaryElement);
    }

    /**
     * get the data of the sheet
     */
    get data() {
        let data = this.workSheet.childOne(SheetData);
        if (!data) {
            data = this.workSheet.createElement(SheetData);
            data && this.workSheet.appendChild(data);
        }
        return data;
    }

    /**
     * get the informations of the column
     */
    get columnInformations() {
        let cols = this.workSheet.childOne(ColumnInformationSet);
        if (!cols) {
            cols = this.workSheet.createElement(ColumnInformationSet);
            cols && this.workSheet.appendChild(cols);
        }
        return cols;
    }
});