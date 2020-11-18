import Spreadsheet2006 from "./basic";
import { OpenXmlElement } from "../../../basic";

/**
 * class of the text for share string
 * @private
 */
class ShareStringText extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "t";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }
}

/**
 * class of the share string item, element with tag "si"
 */
export const ShareStringItem = OpenXmlElement.register(class ShareStringItem extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "si";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
    }

    get text() {
        const text = this.childOne(ShareStringText);
        return text && text.textContent;
    }

    set text(_val) {
        let text = this.childOne(ShareStringText);
        if (!text) {
            text = this.createElement(ShareStringText);
            text && this.appendChild(text);
        }
        text && (text.textContent = _val);
    }

    toString() {
        return this.text;
    }
});

const $sst = Symbol("ShareStringStable.sst");

/**
 * class of the share string table, element with tag "sst"
 */
export const ShareStringTable = OpenXmlElement.register(class ShareStringTable extends Spreadsheet2006 {
    //#region override the key information
    static LocalName = "sst";
    //#endregion

    constructor (_node, _options) {
        super(_node, _options);
        this.reload();
    }

    /**
     * get all items of the share strings
     */
    get items() {
        if (0 >= this[$sst].length) {
            this[$sst] = this.children(ShareStringItem);
        }
        return this[$sst];
    }

    /**
     * add a new share string item
     * if there is already a string with the same value, this function will return the old one instead of insert a new one
     * @param {String} _text the value of the string
     * @return {Number} the index of the string
     */
    add(_text) {
        // return if there is already a string with the same value
        _text = String(_text);
        const items = this.items();
        for (let index in items) {
            const item = items[index];
            if (String(item) === _text) {
                return index;
            }
        }
        // create a new string if the value is not in the table yet
        const item = this.createElement(ShareStringItem);
        if (item) {
            item.text = _text;
            this.appendChild(item);
            this[$sst].push(item);
            return this[$sst].length - 1;
        }
    }

    /**
     * reload all the share strings
     */
    reload() {
        this[$sst] = this.children(ShareStringItem);
    }
});