import { readonly, error, genRandId } from "../../../common";
import { OpenXmlElement, OpenXmlPart, OpenXmlPurePart } from "../../basic";
import { ShareStringPart } from "./shareStringPart";

import path from "path";

const assert = error.assert;

//#endregion

/**
 * Class of operating the workbook part
 * @class WorkbookPart
 */
export const WorkbookPart = OpenXmlPart.register(class WorkbookPart extends OpenXmlPurePart {
    //#region override the shemas infomation and so on
    static SchemasURI = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
    static ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml";
    static DefaultPath = "xl/workbook.xml";
    //#endregion

    /**
     * constructor
     * @param {*} _opt 
     */
    constructor(_opt) {
        super(_opt);
        readonly(this, "data", this.primaryElement);
    }

    /**
     * get the share string part;
     */
    async getShareStringPart() {
        let part = await this.getRelationPart(ShareStringPart);
        if (!part) {
            part = await ShareStringPart.create(this.package, path.join(path.dirname(this.path), "sharedStrings.xml"));
            part && this.insertRelationPart(part);
        }
        return part;
    }

    /**
     * get a share string in the given position
     * @param {Number} _index the position of the string
     * @return {ShareStringItem}
     */
    async getShareString(_index) {
        const part = await this.getShareStringPart();
        const list = part && part.items;
        return list && list[_index];
    }

    /**
     * add a share string
     * @param {String} _text the value of the string
     */
    async addShareString(_text) {
        const part = await this.getShareStringPart();
        return part && part.add(_text);
    }

    /**
     * get a sheet part by the index of the sheet
     * @param {Number} _index the index of the sheet
     * @return {SheetPart}
     */
    async getSheetByIndex(_index) {
        const id = this.data.sheetList.getSheetId(Number(_index));
        return id && await this.getRelationPart(id.relationshipId);
    }

    /**
     * get a sheet part by the name of the sheet
     * @param {String} _name the name of the sheet
     * @return {SheetPart}
     */
    async getSheetByName(_name) {
        const id = this.data.sheetList.getSheetIdByName(_name);
        return id && await this.getRelationPart(id.relationshipId);
    }
});