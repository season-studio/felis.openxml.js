/**
 * declare readonly member(s) for an object
 * @param {*} _obj the object which will be modified
 * @param {String|Symbol|Object} _keyOrMap an object contains the members, or the name of the member
 * @param {*} _value the value of the member, this parameter is used only when the 2nd paramter is the name of the member
 */
export function readonly(_obj, _keyOrMap, _value) {
    if (arguments.length > 2) {
        Object.defineProperty(_obj, _keyOrMap, {
            value: _value,
            writable: false
        });
    } else {
        for(let key in _keyOrMap) {
            Object.defineProperty(_obj, key, {
                value: _keyOrMap[key],
                writable: false
            });
        }
    }
}
