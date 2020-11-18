import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import { AttrRelationshipId } from "../../officeDocument";

/**
 * class of the sheet's id in sheet list, element with tag "sheet"
 */
export const SheetId = OpenXmlElement.register(class SheetList extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "sheet";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get the id
     */
    get id() {
        return this.getAttribute("sheetId");
    }

    /**
     * set the id
     */
    set id(_val) {
        this.setAttribute("sheetId", _val);
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
     * get the name of the sheet
     */
    get name() {
        return this.getAttribute("name");
    }

    /**
     * set the name of the sheet
     */
    set name(_val) {
        this.setAttribute("name", _val);
    }
});

/**
 * class of the list of sheet, element with tag "sheets"
 */
export const SheetList = OpenXmlElement.register(class SheetList extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "sheets";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    /**
     * get a sheet id in the given position
     * @param {Number} _pos the given position
     * @return {SheetId}
     */
    getSheetId(_pos) {
        const list = this.descendants(SheetId);
        return (_pos >= 0) && (_pos < list.length) && list[_pos];
    }

    /**
     * get a sheet id with the given name
     * @param {String} _name the name of the sheet
     * @returns {SheetId}
     */
    getSheetIdByName(_name) {
        for (let item of this.descendants(SheetId)) {
            if (_name === item.name) {
                return item;
            }
        }
    }

    /**
     * get an iterator for enumerating all sheet's ids
     */
    * iterator() {
        for (let item of this.descendants(SheetId)) {
            yield item;
        }
    }

    /**
     * create a new id in this list
     * @returns {SheetId}
     */
    createId() {
        const id = this.createElement(SheetId);
        id && this.appendChild(id);
        return id;
    }
});