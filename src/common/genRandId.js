/**
 * generate a random ID
 * @param {String} _prefix prefix of the destination id
 * @param {*} _radix 
 */
export function genRandId(_prefix, _radix) {
    return `${_prefix || ""}${Date.now().toString(_radix)}${Math.random().toString(_radix).substr(2,3)}`; 
}