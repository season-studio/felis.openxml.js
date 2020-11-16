const $errorId = Symbol("OxjsError.errorId");

/**
 * 扩展的OXML JS处理自定义错误类
 */
export class OxjsError extends Error {
    constructor(_id, _msg) {
        super(_msg);
        this[$errorId] = Number(_id);
    }

    /**
     * 错误ID号
     */
    get errorId() {
        return this[$errorId];
    }
}

/**
 * 生成一个错误对象实例
 * @param {*} _id 错误ID号
 * @param {*} _message 错误描述
 */
export function Exception(_id, _message) {
    return new OxjsError(_id, _message);
}

/**
 * 未实现
 */
export function NO_IMPLEMENT(_tip) {
    return Exception(1, _tip ? `${_tip} has not been implemented` : "the action in this condition has not been implemented");
}
/**
 * 期待参数的异常
 * @param {*} _tip 异常提示细节信息
 */
export function EXPECT_PARAM(_tip) {
    return Exception(2, _tip ? `expect param: ${_tip}` : "missing the valid parameters");
}

/**
 * XML解析失败的异常
 * @param {*} _tip 异常提示细节信息
 */
export function XML_PARSE_FAIL(_tip) {
    return Exception(3, _tip ? `fail in parse xml for "${_tip}"` : "fail in parse XML");
}

/**
 * 没有足够的ID
 */
export const NO_ENOUGH_ID = Exception(4, "no enough ID");

/**
 * 数据来自不同包的错误
 * @param {*} _tip 异常提示细节信息
 */
export function FROM_OTHER_PACKAGE(_tip) {
    return Exception(5, _tip ? `resource("${_tip}") is from a different package` : "resource is from a different package");
}

/**
 * 定位节点失败
 */
export function LOCATE_NODE_FAIL(_tip) {
    return Exception(6, _tip ? `fail to locate the node(${_tip}) for operation` : "fail to locate the node for operation");
}

/**
 * 定位资源失败
 */
export function LOCATE_RESOURCE_FAIL(_tip) {
   return Exception(7, _tip ? `fail to locate the resource for operation: ${_tip}` : "fail to locate the resource for operation");
}

/**
 * 请求资源失败
 * @param {String} _tip 细节提示信息
 */
export function ACQUIRE_RESOURCE_FAIL(_tip) {
    return Exception(8, _tip ? `fail to acquire resource: ${_tip}` : "fail to acquire resource");
}

/**
 * 断言
 * @param {*} _cond 断言条件
 * @param {*} _error 条件不成立时抛出的异常
 */
export function assert(_cond, _error) {
    if (!_cond) {
        throw _error || new OxjsError(NaN, "assert");
    }
    return _cond;
}

/**
 * throw an exception if something is not implemented.
 * uses for null interface
 * @param {String} _tip the name of the action which is not implemented
 */
export function NoImplemented(_tip) {
    throw NO_IMPLEMENT(tip);
}
