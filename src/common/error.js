const $errorId = Symbol("OxjsError.errorId");

/**
 * class of extension exception
 */
export class OxjsError extends Error {
    constructor(_id, _msg) {
        super(_msg);
        this[$errorId] = Number(_id);
    }

    /**
     * id of the exception
     */
    get errorId() {
        return this[$errorId];
    }
}

/**
 * generate a new exception instance
 * @param {*} _id the id
 * @param {*} _message the description
 */
export function Exception(_id, _message) {
    return new OxjsError(_id, _message);
}

/**
 * exception of no implementation
 */
export function NO_IMPLEMENT(_tip) {
    return Exception(1, _tip ? `${_tip} has not been implemented` : "the action in this condition has not been implemented");
}
/**
 * exception of expecting a parameter
 * @param {*} _tip tip of the parameter
 */
export function EXPECT_PARAM(_tip) {
    return Exception(2, _tip ? `expect param: ${_tip}` : "missing the valid parameters");
}

/**
 * exception of fail in parsing xml
 * @param {*} _tip message of the detail
 */
export function XML_PARSE_FAIL(_tip) {
    return Exception(3, _tip ? `fail in parse xml for "${_tip}"` : "fail in parse XML");
}

/**
 * exception of no enough id
 */
export const NO_ENOUGH_ID = Exception(4, "no enough ID");

/**
 * exception of data is not in the same package
 * @param {*} _tip message of the detail
 */
export function FROM_OTHER_PACKAGE(_tip) {
    return Exception(5, _tip ? `resource("${_tip}") is from a different package` : "resource is from a different package");
}

/**
 * exception of fail in locating node
 */
export function LOCATE_NODE_FAIL(_tip) {
    return Exception(6, _tip ? `fail to locate the node(${_tip}) for operation` : "fail to locate the node for operation");
}

/**
 * exception of fail in locating the resource
 */
export function LOCATE_RESOURCE_FAIL(_tip) {
   return Exception(7, _tip ? `fail to locate the resource for operation: ${_tip}` : "fail to locate the resource for operation");
}

/**
 * exception of acquiring the resource
 * @param {String} _tip message of the detail
 */
export function ACQUIRE_RESOURCE_FAIL(_tip) {
    return Exception(8, _tip ? `fail to acquire resource: ${_tip}` : "fail to acquire resource");
}

/**
 * assert
 * @param {*} _cond the expression of a condition to be checked
 * @param {*} _error the exception will be thrown if the condition is false
 * @returns {*} the result of the "_cond"
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
