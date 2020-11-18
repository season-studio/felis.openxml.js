import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";
import * as toolkit from "./toolkit";
import { error } from "../../../../common";

const assert = error.assert;

/**
 * declared type of the data for value of cell
 */
export const DataType = Object.freeze({
    Boolean: "b",
    Number: "n",
    Error: "e",
    SharedString: "s",
    String: "str",
    InlineString: "inlineStr",
    Date: "d"
});

/**
 * class of the value of the cell, element with tag "v"
 */
export const CellValue = OpenXmlElement.register(class CellValue extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "v";
    //#endregion
});

/**
 * class of the formula of the cell, element with tag "v"
 */
export const CellFormula = OpenXmlElement.register(class CellFormula extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "f";
    //#endregion
});

/**
 * class of the cell of the sheet, element with tag "c"
 */
export const Cell = OpenXmlElement.register(class Cell extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "c";
    //#endregion

    /**
     * get the index of the style
     */
    get styleIndex() {
        return Number(this.getAttribute("s"));
    }

    /**
     * set the index of the style
     */
    set styleIndex(_val) {
        if (typeof _val === "number") {
            this.setAttribute("s", _val);
        } else if (_val === undefined || _val === null) {
            this.removeAttribute("s");
        }
    }

    /**
     * get the reference name of the cell
     */
    get referenceId() {
        return this.getAttribute("r");
    }

    /**
     * set the reference name of the cell
     */
    set referenceId(_val) {
        _val && this.setAttribute("r", _val);
    }

    /**
     * get the type of the data
     */
    get dataType() {
        return this.getAttribute("t");
    }

    /**
     * set the type of the data
     */
    set dataType(_val) {
        this.setAttribute("t", _val);
    }

    /**
     * get the value of the cell
     */
    get value() {
        const val = this.childOne(CellValue);
        return val && val.textContent;
    }

    /**
     * set the value of the cell
     */
    set value(_val) {
        let element = this.childOne(CellValue);
        if (!element) {
            element = this.createElement(CellValue);
            element && this.appendChild(element);
        }
        element && (element.textContent = _val);
    }

    /**
     * get the formula of the cell
     */
    get formula() {
        const val = this.childOne(CellFormula);
        return val && val.textContent;
    }

    /**
     * set the formula of the cell
     */
    set formula(_val) {
        let element = this.childOne(CellFormula);
        if (!element) {
            element = this.createElement(CellFormula);
            element && this.appendChild(element);
        }
        element && (element = _val);
    }
});

/**
 * class of the Row of the sheet, element with tag "row"
 */
export const Row = OpenXmlElement.register(class Row extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "row";
    //#endregion

    /**
     * get the height of the row
     */
    get height() {
        const custom = this.getAttribute("customHeight");
        return custom && Number(this.getAttribute("ht"));
    }

    /**
     * set the height of the row.
     * set as undefined will clear the setting
     */
    set height(_val) {
        if (typeof _val === "number") {
            this.setAttribute("ht", _val);
            this.setAttribute("customHeight", 1);
        } else if (_val === undefined || _val === null){
            this.removeAttribute("ht");
            this.removeAttribute("customHeight");
        }
    }

    /**
     * get the reference index of the row
     */
    get referenceIndex() {
        return Number(this.getAttribute("r"));
    }

    /**
     * set the reference index of the row
     */
    set referenceIndex(_val) {
        (typeof _val === "number") && this.setAttribute("r", _val);
    }

    /**
     * get all cells in this row
     */
    get cells() {
        return this.children(Cell);
    }

    /**
     * acquire a cell with a special reference id.
     * this function will create a new object if the cell had not been set yet
     * @param {String} _colRefenceId the reference id of the column
     * @return {Cell} the instance of the target cell
     */
    acquireCell(_colRefenceId) {
        _colRefenceId = String(_colRefenceId).toUpperCase();
        let cell = this.childOne(Cell.xpath(`and @r='${_colRefenceId}${this.referenceIndex}'`));
        if (!cell) {
            cell = this.createElement(Cell);
            cell && (this.appendChild(cell), cell.referenceId = `${_colRefenceId}${this.referenceIndex}`);
        }
        return cell;
    }

    /**
     * get a cell with a special reference id.
     * @param {String} _colRefenceId the reference id of the column
     * @return {Cell} the instance of the target cell
     */
    getCell(_colRefenceId) {
        _colRefenceId = String(_colRefenceId).toUpperCase();
        return this.childOne(Cell.xpath(`and @r='${_colRefenceId}${this.referenceIndex}'`));
    }
});

/**
 * class of the data of the sheet, element with tag "sheetData"
 */
export const SheetData = OpenXmlElement.register(class SheetData extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "sheetData";
    //#endregion

    /**
     * get all rows in the sheet
     */
    get rows() {
        return this.children(Row);
    }

    /**
     * acquire a row with a special reference index.
     * this function will create a new object if the row had not been set yet
     * @param {Number} _index the reference index
     * @return {Row} the instance of the target row
     */
    acquireRow(_index) {
        _index = Number(_index);
        if ((!isNaN(_index)) && (_index > 0)) {
            let row = this.childOne(Row.xpath(`and @r='${_index}'`));
            if (!row) {
                row = this.createElement(Row);
                row && (this.appendChild(row), row.referenceIndex = _index);
            }
            return row;
        }
    }

    /**
     * get a row with a special reference index
     * @param {Number} _index the reference index
     * @return {Row} the instance of the target row
     */
    getRow(_index) {
        _index = Number(_index);
        return (!isNaN(_index)) && (_index > 0) && this.childOne(Row.xpath(`and @r='${_index}'`));
    }

    /**
     * acquire a cell with a special reference id.
     * this function will create a new object if the cell had not been set yet
     * @param {String} _refenceId the reference id
     * @return {Cell} the instance of the target cell
     */
    acquireCell(_refenceId) {
        _refenceId = String(_refenceId).toUpperCase();
        let cell = this.descendantOne(Cell.xpath(`and @r='${_refenceId}'`));
        if (!cell) {
            const rowIndex = Number(String(_refenceId).replace(/[^\d]/, ""));
            if (!isNaN(rowIndex)) {
                let row = this.childOne(Row.xpath(`and @r='${rowIndex}'`));
                if (!row) {
                    row = this.createElement(Row);
                    row && (this.appendChild(row), row.referenceIndex = rowIndex);
                }
                if (row) {
                    cell = row.createElement(Cell);
                    cell && (row.appendChild(cell), cell.referenceId = _refenceId);
                }
            }
        }
        return cell;
    }

    /**
     * get a cell with a special reference id.
     * @param {String} _refenceId the reference id
     * @return {Cell} the instance of the target cell
     */
    getCell(_refenceId) {
        _refenceId = String(_refenceId).toUpperCase();
        return this.descendantOne(Cell.xpath(`and @r='${_refenceId}'`));
    }

    /**
     * fill a range with the data of a table
     * @param {String} _startReferenceId the reference id of the start cell
     * @param {Array|Object} _table the data of a table
     */
    fillRangeWithTable(_startReferenceId, _table) {
        assert(_table, error.EXPECT_PARAM("_table"));
        let { colId, rowIndex } = toolkit.decomposeReferenceId(_startReferenceId);
        assert(colId && (rowIndex !== undefined), error.EXPECT_PARAM("_startReferenceId in correct format"));
        const startColIndex = toolkit.columnIdToIndex(colId);
        for (let rowPos in _table) {
            const rowData = assert(_table[rowPos], error.ACQUIRE_RESOURCE_FAIL(`row data of _table[${rowPos}]`));
            const row = assert(this.acquireRow(rowIndex++), error.ACQUIRE_RESOURCE_FAIL(`row element in sheetData for _table[${rowPos}]`));
            let colIndex = startColIndex;
            for (let cellPos in rowData) {
                const cellData = rowData[cellPos];
                const cell = assert(row.acquireCell(toolkit.columnIndexToId(colIndex++)), 
                                    error.ACQUIRE_RESOURCE_FAIL(`cell element in sheetData for _table[${rowPos}][${cellPos}]`));
                cell.value = cellData;
                cell.dataType = (isNaN(Number(cellData)) ? DataType.String : DataType.Number);
            }
        }
    }

    /**
     * get a range of data if the SheetData and fill into a table
     * @param {String} _startReferenceId the reference id of the start cell
     * @param {Number} _rowCount the count of the rows
     * @param {Number} _colCount the count of the column
     * @param {ShareStringTable} _shareStringTable  the table of the share string of the workbook, 
     *                                              function will not translate the share string if this parameter is ignored
     * @returns {Array<Array>}
     */
    getRangeToTable(_startReferenceId, _rowCount, _colCount, _shareStringTable) {
        assert((_rowCount > 0) && (_colCount > 0), error.EXPECT_PARAM("_rowCount and _colCount"));
        let { colId, rowIndex } = toolkit.decomposeReferenceId(_startReferenceId);
        assert(colId && (rowIndex !== undefined), error.EXPECT_PARAM("_startReferenceId in correct format"));
        const startColIndex = toolkit.columnIdToIndex(colId);
        const maxRowIndex = rowIndex + _rowCount;
        const maxColIndex = startColIndex + _colCount;
        const table = [];
        for (; rowIndex < maxRowIndex; rowIndex++) {
            const row = this.getRow(rowIndex);
            const rowData = [];
            if (row) {
                for (let colIndex = startColIndex; colIndex < maxColIndex; colIndex++) {
                    let cellData = undefined;
                    const cell = row.getCell(toolkit.columnIndexToId(colIndex));
                    if (cell) {
                        cellData = cell.value;
                        if ((DataType.SharedString === cell.dataType) && _shareStringTable) {
                            cellData = _shareStringTable.items[cellData];
                        }
                    }
                    rowData.push(cellData);
                }
            }
            table.push(rowData);
        }
        return table;
    }
});