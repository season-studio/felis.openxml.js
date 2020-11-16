/**
 * 为对象定义只读数据
 * @param {*} _obj 对象
 * @param {String|Symbol|Object} _keyOrMap 数据键名
 * @param {*} _value 数据
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
