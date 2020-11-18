/**
 * convert the id of the column to the index of the column.
 * for example: "A" is converted to 1, "BA" is converted to 53
 * @param {String} _id the id of the column
 * @returns {Number} the index of the column
 */
export function columnIdToIndex(_id) {
    let index = 0;
    _id = String(_id).toUpperCase();
    for (let pos in _id) {
        let item = _id.charCodeAt(pos) - 64;
        index = index * 26 + item;
    }
    return index;
}

/**
 * convert the index of the column to the id of the column.
 * @param {Number} _index the index of the column
 * @returns {String} the id of the column
 */
export function columnIndexToId(_index) {
    _index = Number(_index);
    if (!isNaN(_index)) {
        let id = "";
        for (; _index > 0; _index = parseInt(_index / 26)) {
            let mod = (--_index) % 26;
            id = String.fromCharCode(65 + mod) + id;
        }
        return id;
    }
}

/**
 * check if the reference id is in correct format
 * @param {String} _id the reference id
 * @returns {Boolean}
 */
export function isValidReferenceId(_id) {
    return /^[A-Z]+\d+$/.test(_id);
}

/**
 * decompose the reference id of the cell to column's id and row's index
 * @param {String} _id the reference id of the cell
 * @returns {Object} { colId: <the id of the column>, rowIndex: <the index of the row> }
 */
export function decomposeReferenceId(_id) {
    const matched = /^([A-Z]+)(\d+)$/.exec(_id);
    return matched ? { colId: matched[1], rowIndex: Number(matched[2]) } : {};
}