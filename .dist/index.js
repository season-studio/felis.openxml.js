'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var regeneratorRuntime = _interopDefault(require('regenerator-runtime'));
var path = _interopDefault(require('path'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var $errorId = Symbol("OxjsError.errorId");
/**
 * 扩展的OXML JS处理自定义错误类
 */

var OxjsError = /*#__PURE__*/function (_Error) {
  _inherits(OxjsError, _Error);

  var _super = _createSuper(OxjsError);

  function OxjsError(_id, _msg) {
    var _this;

    _classCallCheck(this, OxjsError);

    _this = _super.call(this, _msg);
    _this[$errorId] = Number(_id);
    return _this;
  }
  /**
   * 错误ID号
   */


  _createClass(OxjsError, [{
    key: "errorId",
    get: function get() {
      return this[$errorId];
    }
  }]);

  return OxjsError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * 生成一个错误对象实例
 * @param {*} _id 错误ID号
 * @param {*} _message 错误描述
 */

function Exception(_id, _message) {
  return new OxjsError(_id, _message);
}
/**
 * 未实现
 */

function NO_IMPLEMENT(_tip) {
  return Exception(1, _tip ? "".concat(_tip, " has not been implemented") : "the action in this condition has not been implemented");
}
/**
 * 期待参数的异常
 * @param {*} _tip 异常提示细节信息
 */

function EXPECT_PARAM(_tip) {
  return Exception(2, _tip ? "expect param: ".concat(_tip) : "missing the valid parameters");
}
/**
 * XML解析失败的异常
 * @param {*} _tip 异常提示细节信息
 */

function XML_PARSE_FAIL(_tip) {
  return Exception(3, _tip ? "fail in parse xml for \"".concat(_tip, "\"") : "fail in parse XML");
}
/**
 * 没有足够的ID
 */

var NO_ENOUGH_ID = Exception(4, "no enough ID");
/**
 * 数据来自不同包的错误
 * @param {*} _tip 异常提示细节信息
 */

function FROM_OTHER_PACKAGE(_tip) {
  return Exception(5, _tip ? "resource(\"".concat(_tip, "\") is from a different package") : "resource is from a different package");
}
/**
 * 定位节点失败
 */

function LOCATE_NODE_FAIL(_tip) {
  return Exception(6, _tip ? "fail to locate the node(".concat(_tip, ") for operation") : "fail to locate the node for operation");
}
/**
 * 定位资源失败
 */

function LOCATE_RESOURCE_FAIL(_tip) {
  return Exception(7, _tip ? "fail to locate the resource for operation: ".concat(_tip) : "fail to locate the resource for operation");
}
/**
 * 请求资源失败
 * @param {String} _tip 细节提示信息
 */

function ACQUIRE_RESOURCE_FAIL(_tip) {
  return Exception(8, _tip ? "fail to acquire resource: ".concat(_tip) : "fail to acquire resource");
}
/**
 * 断言
 * @param {*} _cond 断言条件
 * @param {*} _error 条件不成立时抛出的异常
 */

function assert(_cond, _error) {
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

function NoImplemented(_tip) {
  throw NO_IMPLEMENT(tip);
}

var error = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OxjsError: OxjsError,
  Exception: Exception,
  NO_IMPLEMENT: NO_IMPLEMENT,
  EXPECT_PARAM: EXPECT_PARAM,
  XML_PARSE_FAIL: XML_PARSE_FAIL,
  NO_ENOUGH_ID: NO_ENOUGH_ID,
  FROM_OTHER_PACKAGE: FROM_OTHER_PACKAGE,
  LOCATE_NODE_FAIL: LOCATE_NODE_FAIL,
  LOCATE_RESOURCE_FAIL: LOCATE_RESOURCE_FAIL,
  ACQUIRE_RESOURCE_FAIL: ACQUIRE_RESOURCE_FAIL,
  assert: assert,
  NoImplemented: NoImplemented
});

/**
 * 用于存储对象关联的父对象的私有成员符号名称
 */
var $parent = Symbol(".parent");
/**
 * 用于存储对象关联的节点的私有成员符号名称
 */

var $node = Symbol(".node");

var constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $parent: $parent,
  $node: $node
});

/**
 * 为对象定义只读数据
 * @param {*} _obj 对象
 * @param {String|Symbol|Object} _keyOrMap 数据键名
 * @param {*} _value 数据
 */
function readonly(_obj, _keyOrMap, _value) {
  if (arguments.length > 2) {
    Object.defineProperty(_obj, _keyOrMap, {
      value: _value,
      writable: false
    });
  } else {
    for (var key in _keyOrMap) {
      Object.defineProperty(_obj, key, {
        value: _keyOrMap[key],
        writable: false
      });
    }
  }
}

/**
 * generate a random ID
 * @param {String} _prefix prefix of the destination id
 * @param {*} _radix 
 */
function genRandId(_prefix, _radix) {
  return "".concat(_prefix || "").concat(Date.now().toString(_radix)).concat(Math.random().toString(_radix).substr(2, 3));
}

var IDom = /*#__PURE__*/function () {
  function IDom() {
    _classCallCheck(this, IDom);
  }

  _createClass(IDom, [{
    key: "xpathSelect",
    value: function xpathSelect(_expression, _isSingle) {
      NoImplemented();
    }
  }, {
    key: "createElement",
    value: function createElement() {
      NoImplemented();
    }
  }, {
    key: "createElementNS",
    value: function createElementNS() {
      NoImplemented();
    }
  }, {
    key: "primaryNode",
    get: function get() {
      NoImplemented();
    }
  }], [{
    key: "parse",
    value: function parse(_xmlString) {
      NoImplemented();
    }
  }, {
    key: "isElementNode",
    value: function isElementNode(_obj) {
      NoImplemented();
    }
  }]);

  return IDom;
}();

var regenerator = regeneratorRuntime;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var IZip = /*#__PURE__*/function () {
  function IZip() {
    _classCallCheck(this, IZip);
  }

  _createClass(IZip, [{
    key: "getFile",
    value: function () {
      var _getFile = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_file, _format) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                NoImplemented();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getFile(_x, _x2) {
        return _getFile.apply(this, arguments);
      }

      return getFile;
    }()
  }, {
    key: "setFile",
    value: function setFile(_file, _content, _format) {
      NoImplemented();
    }
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_file) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                NoImplemented();

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function load(_x3) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                NoImplemented();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }]);

  return IZip;
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Interface of an application enviroment
 */

var IApplication = function IApplication() {
  _classCallCheck(this, IApplication);
}
/**
 * The interface IZip for operating zip package
 */
;

_defineProperty(IApplication, "ZIP", IZip);

_defineProperty(IApplication, "DOM", IDom);

var assert$1 = assert;
var CONTENTTYPE_PATH = "[Content_Types].xml";
var EMPTY_CONTENTTYPE_XML = '<?xml version="1.0" encoding="UTF-8" standalone="true"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>';
/**
 * class for operating the open xml package
 */

var OpenXmlPackage = /*#__PURE__*/function () {
  /**
   * construct an OpenXmlPackage object
   * @param {IApplication} application the implementation of IApplication
   * @param {IZip} zip an instance of IZip contains the package
   * @param {String} _contentTypeXML the XML string of the "[Content_Types].xml"
   */
  function OpenXmlPackage(application, zip, _contentTypeXML) {
    _classCallCheck(this, OpenXmlPackage);

    readonly(this, {
      application: application,
      zip: zip,
      contentTypes: application.DOM.parse(_contentTypeXML || EMPTY_CONTENTTYPE_XML)
    });
  }
  /**
   * save the current package
   */


  _createClass(OpenXmlPackage, [{
    key: "save",
    value: function save() {
      var zip = this.zip;
      zip.setFile(CONTENTTYPE_PATH, this.contentTypes.toString());
      return zip.save();
    }
    /**
     * 设置包中一个文件的内容
     * @param {String} _path 文件在包中的路径
     * @param {*} _data 文件的数据
     * @param {String} _contentType 文件的内容类型，如果不传入该参数，则不更新文件的内容类型
     */

    /**
     * set a file into the package
     * if the file is already in the package, it will be replace
     * @param {String} _path the path of the file in the package
     * @param {*} _data the content of the file
     * @param {String} _format the format of the content, support "binary" and "text"
     * @param {String} _contentType the type of the content, see the stand of the OpenXML
     */

  }, {
    key: "setFile",
    value: function setFile(_path, _data, _format, _contentType) {
      this.zip.setFile(_path, _data, _format);

      if (_contentType) {
        var dom = this.contentTypes;
        var partName = "/".concat(_path).replace(/\\/ig, "/");
        var contentTypes = assert$1(dom.xpathSelect("//*[local-name(.)='Types']", true), LOCATE_NODE_FAIL("Types in [content types].xml"));
        var typeDesc = contentTypes.xpathSelect("./*[local-name(.)='Override' and @PartName='".concat(partName, "']"), true);

        if (typeDesc) {
          typeDesc.setAttribute("ContentType", _contentType);
        } else {
          var newItem = assert$1(dom.createElement("Override"), ACQUIRE_RESOURCE_FAIL('"Override" node in ContentType'));
          newItem.setAttribute("ContentType", _contentType);
          newItem.setAttribute("PartName", partName);
          contentTypes.appendChild(newItem);
        }
      }
    }
    /**
     * get a file from the package
     * @param {String} _path the path of the file in the package
     * @param {String} _format the format of the content, support "binary" and "text"
     */

  }, {
    key: "getFile",
    value: function getFile(_path, _format) {
      return this.zip.getFile(_path, _format);
    }
    /**
     * 设置一个扩展名对应的内容类型
     * @param {String} _extension 扩展名
     * @param {String} _type 扩展名对应的内容类型
     */

  }, {
    key: "setExtensionType",
    value: function setExtensionType(_extension, _type) {
      var dom = this.contentTypes;
      var contentTypes = assert$1(dom.xpathSelect("//*[local-name(.)='Types']", true), LOCATE_NODE_FAIL("Types in [content types].xml"));
      _extension = _extension.replace(/^\./, "");
      var typeDesc = contentTypes.xpathSelect("./*[local-name(.)='Default' and @Extension='".concat(_extension, "']"), true);

      if (typeDesc) {
        typeDesc.setAttribute("ContentType", _type);
      } else {
        var newItem = assert$1(dom.createElement("Default"), ACQUIRE_RESOURCE_FAIL('"Default" node in ContentType'));
        newItem.setAttribute("ContentType", _type);
        newItem.setAttribute("Extension", _extension);
        contentTypes.appendChild(newItem);
      }
    }
  }]);

  return OpenXmlPackage;
}();
/**
 * 
 */


var OpenPackage = {
  /**
   * Open a package, and return an instance of OpenXmlPackage
   * @param {IApplication} _app an implementation of IApplication
   * @param {*} _package any data of the package, the format dependent on the implementation of IZip
   * @return {Promise<OpenXmlPackage>} a promise that will be resolved with an object of OpenXmlPackage
   */
  open: function open(_app, _package) {
    return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var zip, contentTypeXML;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!IApplication.isPrototypeOf(_app)) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return new _app.ZIP().load(_package);

            case 3:
              zip = _context.sent;

              if (!(zip instanceof IZip)) {
                _context.next = 9;
                break;
              }

              _context.next = 7;
              return zip.getFile(CONTENTTYPE_PATH);

            case 7:
              contentTypeXML = _context.sent;
              return _context.abrupt("return", new OpenXmlPackage(_app, zip, contentTypeXML));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * check if the input object is an instance of OpenXmlPackage class
   * @param {*} _obj
   */
  isPackage: function isPackage(_obj) {
    return _obj instanceof OpenXmlPackage;
  },

  /**
   * extern the prototype of OpenXmlPackage class
   * @param {Object} _obj 
   */
  extern: function extern(_obj) {
    for (var item in _obj) {
      OpenXmlPackage.prototype[item] = _obj[item];
    }
  }
};

var assert$2 = assert; // registed table for subclassed part

var registedParts = {}; // XML for relationship file initialization

var EMPTY_RELATIONSHRIP_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';
/**
 * basic class of all OpenXML part
 */

var OpenXmlPart = /*#__PURE__*/function () {
  _createClass(OpenXmlPart, null, [{
    key: "getRelationshipPath",
    //#region static members

    /**
     * get the path of the relationship file from the path of the part file path
     * @param {*} _partPath the path of the part file
     */
    value: function getRelationshipPath(_partPath) {
      var partDir = path.dirname(_partPath);
      var partFileName = path.basename(_partPath);
      return path.join(partDir, "./_rels/".concat(partFileName, ".rels")).replace(/\\/ig, "/");
    }
    /**
     * load and instance a part from a package
     * @param {*} _package 
     * @param {*} _path 
     * @param {*} _opt 
     */

  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_package, _path, _opt) {
        var _path2, relationshipPath, content, relationshipXML, opt;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!OpenPackage.isPackage(_package)) {
                  _context.next = 13;
                  break;
                }

                _path2 = String(_path).replace(/\\/ig, "/").replace(/^\//, "");
                relationshipPath = OpenXmlPart.getRelationshipPath(_path2);
                _context.next = 5;
                return _package.getFile(_path2, this.ContentFormat);

              case 5:
                content = _context.sent;

                if (!content) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return _package.getFile(relationshipPath, "text");

              case 9:
                relationshipXML = _context.sent;
                opt = {
                  path: _path2,
                  content: content,
                  relationshipPath: relationshipPath,
                  relationshipXML: relationshipXML,
                  "package": _package
                };
                _opt && Object.assign(opt, _opt);
                return _context.abrupt("return", new this(opt));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x, _x2, _x3) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
    /**
     * convert the given part to the invoker class
     * @param {OpenXmlPart} _part part which will be converted
     * @param {*} _opt the extension options passed to the constructor of the invoker class
     */

  }, {
    key: "convert",
    value: function () {
      var _convert = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_part, _opt) {
        var path, relationshipPath, content, relationshipXML, opt;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                assert$2(_part instanceof OpenXmlPart, EXPECT_PARAM("_part must be instance of OpenXmlPart"));
                path = _part.path;
                relationshipPath = _part.relationshipPath;
                _context2.next = 5;
                return _part["package"].getFile(path, this.ContentFormat);

              case 5:
                content = _context2.sent;

                if (!content) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 9;
                return _part["package"].getFile(relationshipPath, "text");

              case 9:
                relationshipXML = _context2.sent;
                opt = {
                  path: path,
                  content: content,
                  relationshipPath: relationshipPath,
                  relationshipXML: relationshipXML,
                  "package": _part["package"]
                };
                _opt && Object.assign(opt, _opt);
                return _context2.abrupt("return", new this(opt));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function convert(_x4, _x5) {
        return _convert.apply(this, arguments);
      }

      return convert;
    }()
    /**
     * string of the content's type, may be override by the subclass
     */

  }, {
    key: "register",

    /**
     * register a subclass part
     * @param {Class} _partClass class extends OpenXmlPart
     */
    value: function register(_partClass) {
      assert$2(OpenXmlPart.isPrototypeOf(_partClass), EXPECT_PARAM("_partClass"));
      assert$2(_partClass.SchemasURI, EXPECT_PARAM("_partclass.schemasURI"));
      registedParts[_partClass.SchemasURI] = _partClass;
      return _partClass;
    } //#endregion

  }]);

  function OpenXmlPart(_opt) {
    _classCallCheck(this, OpenXmlPart);

    var opt = _opt || {};
    assert$2(opt.path && opt.content, EXPECT_PARAM("opt.partPath & opt.partXML"));
    assert$2(opt["package"], EXPECT_PARAM("opt.package"));
    var relationshipDom = opt.relationshipXML && opt["package"].application.DOM.parse(opt.relationshipXML);
    readonly(this, {
      "package": opt["package"],
      path: opt.path,
      relationshipPath: opt.relationshipPath
    });
    relationshipDom && readonly(this, {
      relationshipDom: relationshipDom
    });
  } //#region instance members

  /**
   * save this part into the package
   */


  _createClass(OpenXmlPart, [{
    key: "commit",
    value: function commit() {
      var pkg = this["package"];

      if (pkg) {
        var content = this.content;
        content && pkg.setFile(this.path, content, this.constructor.ContentType);
        var relationshipDom = this.relationshipDom;
        relationshipDom && pkg.setFile(this.relationshipPath, relationshipDom.toString(), "text");
      }
    }
    /**
     * check if two part in the same package
     * @param {OpenXmlPart} _part the part to be checked
     */

  }, {
    key: "inSamePackage",
    value: function inSamePackage(_part) {
      return _part && _part["package"] === this["package"];
    }
    /**
     * duplicate the part
     * @param {String} _path the path for the new part
     * @param {OpenXmlPackage} _package the package the save the new part, takes current package if this parameter is empty
     * @param {*} _opt the parameter passed to OpenXmlPart.load as the 3rd parameter
     */

  }, {
    key: "duplicate",
    value: function duplicate(_path, _package, _opt) {
      var targetPackage = _package || this["package"];
      var content = this.content; // this action is only valid when the content is not empty, and has a different path or in different package

      if (content && (targetPackage !== this["package"] || _path !== this.path)) {
        // copy the content and relationship content
        targetPackage.setFile(_path, content, this.ContentFormat, this.constructor.ContentType);
        var relationshipDom = this.relationshipDom;
        relationshipDom && targetPackage.setFile(OpenXmlPart.getRelationshipPath(_path), relationshipDom.toString(), "text"); // TODO: to correct the relationship parts
        // ...
        // instance the new part object

        return this.constructor.load(targetPackage, _path, _opt);
      }
    }
    /**
     * get a relation part
     * @param {String|Class} _idOrClass id of the relation part, or a class of the relation part
     */

  }, {
    key: "getRelationPart",
    value: function () {
      var _getRelationPart = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(_idOrClass) {
        var rels, nodeSel, typeAttr, targetPath, ctor, part;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                rels = this.relationshipDom;

                if (!rels) {
                  _context3.next = 13;
                  break;
                }

                nodeSel = OpenXmlPart.isPrototypeOf(_idOrClass) ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_idOrClass.SchemasURI, "']"), true) : rels.xpathSelect(".//*[local-name(.)='Relationship' and @Id='".concat(_idOrClass, "']"), true);

                if (!nodeSel) {
                  _context3.next = 13;
                  break;
                }

                typeAttr = nodeSel.getAttribute("Type");
                targetPath = String(nodeSel.getAttribute("Target")).replace(/\\/ig, "/");
                path.isAbsolute(targetPath) || (targetPath = path.join(path.dirname(this.path), targetPath));
                ctor = registedParts[typeAttr] || OpenXmlPart;
                _context3.next = 10;
                return ctor.load(this["package"], targetPath);

              case 10:
                part = _context3.sent;
                part && readonly(part, {
                  relationshipId: String(nodeSel.getAttribute("id"))
                });
                return _context3.abrupt("return", part);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRelationPart(_x6) {
        return _getRelationPart.apply(this, arguments);
      }

      return getRelationPart;
    }()
    /**
     * insert a part as the relation part of current part
     * @param {OpenXmlPart} _part the part will be inserted
     */

  }, {
    key: "insertRelationPart",
    value: function insertRelationPart(_part) {
      assert$2(_part instanceof OpenXmlPart, EXPECT_PARAM("_part"));
      var targetRelPath = path.relative(path.dirname(this.path), _part.path).replace(/\\/ig, "/");
      var rid = genRandId("R", 16);
      var rels = this.relationshipDom;

      if (!rels) {
        readonly(this, {
          relationshipDom: this["package"].application.DOM.parse(EMPTY_RELATIONSHRIP_XML)
        });
        rels = this.relationshipDom;
      }

      assert$2(rels, ACQUIRE_RESOURCE_FAIL("Relationship DOM"));
      var relNode = rels.createElement("Relationship");
      assert$2(relNode, ACQUIRE_RESOURCE_FAIL("Relationship Node"));
      relNode.setAttribute("Target", targetRelPath);
      relNode.setAttribute("Type", _part.constructor.SchemasURI);
      relNode.setAttribute("Id", rid);
      rels.primaryNode.appendChild(relNode);
      return rid;
    }
    /**
     * generate a iterator for relation parts
     * @param {String|Class|undefined} _class   class of the target part, 
     *                                          or the string of target part's type, 
     *                                          undefined for iterate all relation parts
     */

  }, {
    key: "relationParts",
    value: /*#__PURE__*/regenerator.mark(function relationParts(_class) {
      var rels, nodeList, curDir, index, node, relationshipId, type, target, ctor;
      return regenerator.wrap(function relationParts$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              rels = this.relationshipDom;

              if (!rels) {
                _context4.next = 18;
                break;
              }

              nodeList = OpenXmlPart.isPrototypeOf(_class) ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_class.SchemasURI, "']")) : typeof _class === "string" ? rels.xpathSelect(".//*[local-name(.)='Relationship' and @Type='".concat(_class, "']")) : rels.xpathSelect(".//*[local-name(.)='Relationship']");

              if (!nodeList) {
                _context4.next = 18;
                break;
              }

              curDir = path.dirname(this.path);
              _context4.t0 = regenerator.keys(nodeList);

            case 6:
              if ((_context4.t1 = _context4.t0()).done) {
                _context4.next = 18;
                break;
              }

              index = _context4.t1.value;
              node = nodeList[index];
              relationshipId = node.getAttribute("id");
              type = node.getAttribute("Type");
              target = String(node.getAttribute("Target")).replace(/\\/ig, "/");
              path.isAbsolute(target) || (target = path.join(curDir, target));
              ctor = registedParts[type] || OpenXmlPart;
              _context4.next = 16;
              return {
                index: index,
                relationshipId: relationshipId,
                target: target,
                "class": ctor,
                type: type,
                node: node
              };

            case 16:
              _context4.next = 6;
              break;

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, relationParts, this);
    }) //#endregion

  }]);

  return OpenXmlPart;
}();

_defineProperty(OpenXmlPart, "ContentType", undefined);

_defineProperty(OpenXmlPart, "SchemasURI", undefined);

_defineProperty(OpenXmlPart, "ContentFormat", "text");

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of all OpenXML part which content is binary
 * @extends OpenXmlPart
 */

var OpenXmlBinaryPart = /*#__PURE__*/function (_OpenXmlPart) {
  _inherits(OpenXmlBinaryPart, _OpenXmlPart);

  var _super = _createSuper$1(OpenXmlBinaryPart);

  function OpenXmlBinaryPart(_opt) {
    var _this;

    _classCallCheck(this, OpenXmlBinaryPart);

    _this = _super.call(this, _opt);
    readonly(_assertThisInitialized(_this), {
      content: _opt.content
    });
    return _this;
  }

  return OpenXmlBinaryPart;
}(OpenXmlPart);

_defineProperty(OpenXmlBinaryPart, "ContentFormat", "binary");

/**
 * basic class of OpenXML attributes
 */

var OpenXmlAttribute = /*#__PURE__*/function () {
  /**
   * construct an Open XML attribute
   * @param {String} _localName the local name of the attribute
   * @param {String} _nsURI the uri of the name-space of the attribute
   * @param {String} _defPrefix the default prefix of the attribute's name-space
   * @param {Object} _opt the extend options, can be undefined
   *                      format is { default: default-value, checker: func-to-check-the-value }
   */
  function OpenXmlAttribute(_localName, _nsURI, _defPrefix, _opt) {
    _classCallCheck(this, OpenXmlAttribute);

    Object.defineProperties(this, {
      localName: {
        value: String(_localName),
        writable: false
      },
      defaultPrefix: {
        value: _defPrefix && String(_defPrefix),
        writable: false
      },
      namespaceUri: {
        value: String(_nsURI),
        writable: false
      },
      options: {
        value: _opt || {},
        writable: false
      }
    });
  }
  /**
   * get the qualified name of the attribute
   * it contains the prefix of the name-space and the local-name
   * @param {Node} _node 
   */


  _createClass(OpenXmlAttribute, [{
    key: "qualifiedName",
    value: function qualifiedName(_node) {
      var prefix = _node.lookupPrefix(this.namespaceUri) || this.defaultPrefix;
      return prefix ? "".concat(prefix, ":").concat(this.localName) : this.localName;
    }
    /**
     * adjust the input value of the attribute
     * @param {*} _val the input value
     */

  }, {
    key: "adjustValue",
    value: function adjustValue(_val) {
      arguments.length <= 0 && (_val = this.options["default"]);
      var fn = this.options.checker;
      return fn ? fn(_val) : _val;
    }
    /**
     * get the value of the attribute
     * @param {Node} _node
     */

  }, {
    key: "getValue",
    value: function getValue(_node) {
      var ns = this.namespaceUri;
      return ns ? _node.getAttributeNS(ns, this.localName) : _node.getAttribute(this.qualifiedName(_node));
    }
    /**
     * set the value of the attribute
     * @param {Node} _node 
     * @param {*} _val
     */

  }, {
    key: "setValue",
    value: function setValue(_node, _val) {
      _val = this.adjustValue(_val);
      var ns = this.namespaceUri;
      ns ? _node.setAttributeNS(ns, this.qualifiedName(_node), _val) : _node.setAttribute(this.localName, _val);
    }
    /**
     * delete the attribute
     * @param {Node} _node
     */

  }, {
    key: "remove",
    value: function remove(_node) {
      var ns = this.namespaceUri;
      ns ? _node.removeAttributeNS(ns, this.localName) : _node.removeAttribute(this.qualifiedName(_node));
    }
    /**
     * generate a xpath expression part
     * @param {*} _val value for select, can ignore this parameter
     */

  }, {
    key: "xpath",
    value: function xpath(_val) {
      return "@*[local-name(.)='".concat(this.localName, "' and namespace-uri(.)='").concat(this.namespaceUri, "' ").concat(arguments.length > 0 ? "and string(.)='".concat(_val, "'") : "", "]");
    }
    /**
     * generate a xpath expression part for searching any attribute with the val
     * @param {*} _val 
     */

  }], [{
    key: "xpathVal",
    value: function xpathVal(_val) {
      return "@*[string(.)='".concat(_val, "']");
    }
  }]);

  return OpenXmlAttribute;
}();

var assert$3 = assert;
/**
 * register map for subclass OpenXML elements
 */

var registedElements = {};
/**
 * basic class of all OpenXml Element
 */

var OpenXmlElement = /*#__PURE__*/function () {
  function OpenXmlElement(_node) {
    _classCallCheck(this, OpenXmlElement);

    assert$3(_node, EXPECT_PARAM("_node"));
    readonly(this, {
      node: _node
    });
  } //#region members should be override by subclass

  /**
   * the local name of this kind of element's node
   */


  _createClass(OpenXmlElement, [{
    key: "children",
    //#endregion
    //#region instance methods

    /**
     * search all children matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any children by default if ignore this parameter.
     */
    value: function children(_arg) {
      var selectExp = this.constructor.genXPath("./", _arg);
      var nodes = this.node.xpathSelect(selectExp);
      return nodes ? nodes.map(function (node) {
        return OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node;
      }) : [];
    }
    /**
     * search all descendants matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any descendants by default if ignore this parameter.
     */

  }, {
    key: "descendants",
    value: function descendants(_arg) {
      var selectExp = this.constructor.genXPath(".//", _arg);
      var nodes = this.node.xpathSelect(selectExp);
      return nodes ? nodes.map(function (node) {
        return OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node;
      }) : [];
    }
    /**
     * search the first children matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any children by default if ignore this parameter.
     */

  }, {
    key: "childOne",
    value: function childOne(_arg) {
      var selectExp = this.constructor.genXPath("./", _arg);
      var node = this.node.xpathSelect(selectExp, true);
      return node && (OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node);
    }
    /**
     * search the first descendant matched the parameter
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will match any descendant by default if ignore this parameter.
     */

  }, {
    key: "descendantOne",
    value: function descendantOne(_class, _exSelector) {
      var selectExp = this.constructor.genXPath(".//", _arg);
      var node = this.node.xpathSelect(selectExp, true);
      return node && (OpenXmlElement.instanced(1 !== node.nodeType ? node.ownerElement : node) || node);
    }
    /**
     * append a element as the last child of the current element
     * @param {OpenXmlElement} _element the element will be append
     */

  }, {
    key: "appendChild",
    value: function appendChild(_element) {
      assert$3(_element instanceof OpenXmlElement, EXPECT_PARAM("_element"));
      this.node.appendChild(_element.node);
    }
    /**
     * insert a element as the sibling of the current element
     * @param {OpenXmlElement} _element the element will be inserted
     * @param {Boolean} _before true for insert before the current element, false for insert after the current element
     */

  }, {
    key: "insertAsSibling",
    value: function insertAsSibling(_element, _before) {
      assert$3(_element instanceof OpenXmlElement, EXPECT_PARAM("_element"));
      var refNode = this.node;
      var parent = refNode.parentNode;
      parent && parent.insertBefore(_element.node, _before ? refNode : refNode.nextSibling);
    }
    /**
     * create a new element of the given class
     * @param {Class} _elementClass the class of the new element
     */

  }, {
    key: "createElement",
    value: function createElement(_elementClass) {
      assert$3(OpenXmlElement.isPrototypeOf(_elementClass), EXPECT_PARAM("_elementClass"));
      return _elementClass.createElement(this.node.ownerDocument, this);
    }
    /**
     * remove the current from the DOM
     */

  }, {
    key: "remove",
    value: function remove() {
      var parent = this.node.parent;
      parent && parent.removeChild(this.node);
    }
    /**
     * set a attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     * @param {*} _val value of the attribute
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(_attr, _val) {
      _attr instanceof OpenXmlAttribute ? _attr.setValue(this.node, _val) : this.node.setAttribute(String(_attr), _val);
    }
    /**
     * get the value of the given attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(_attr) {
      return _attr instanceof OpenXmlAttribute ? _attr.getValue(this.node) : this.node.getAttribute(String(_attr));
    }
    /**
     * remove the given attribute
     * @param {OpenXmlAttribute|String} _attr attribute object or attribute's name
     */

  }, {
    key: "removeAttribute",
    value: function removeAttribute(_attr) {
      return _attr instanceof OpenXmlAttribute ? _attr.remove(this.node) : this.node.removeAttribute(String(_attr));
    } //#endregion

  }, {
    key: "prefix",
    //#endregion
    //#region instance properties

    /**
     * get the prefix name
     */
    get: function get() {
      return this.node.prefix;
    }
    /**
     * get the local name
     */

  }, {
    key: "localName",
    get: function get() {
      return this.node.localName;
    }
    /**
     * get the qualified name
     */

  }, {
    key: "qualifiedName",
    get: function get() {
      return this.node.nodeName;
    }
    /**
     * get the text content of this instance
     */

  }, {
    key: "textContent",
    get: function get() {
      return this.node.textContent;
    }
    /**
     * get the class name of this instance
     */

  }, {
    key: "className",
    get: function get() {
      return this.constructor.name;
    }
  }], [{
    key: "register",
    //#endregion
    //#region static members

    /**
     * register a subclass
     * @param {Class} _elementClass a subclass entends OpenXmlElement
     */
    value: function register(_elementClass) {
      assert$3(_elementClass && OpenXmlElement.isPrototypeOf(_elementClass), EXPECT_PARAM("_elementClass"));
      assert$3(_elementClass.NamespaceUri, EXPECT_PARAM("".concat(_elementClass.name, ".NamespaceUri")));
      var key = "".concat(_elementClass.NamespaceUri, "::").concat(_elementClass.LocalName);
      registedElements[key] = _elementClass;
      return _elementClass;
    }
    /**
     * get the prefix in the range of a element
     * this function is not getting the prefix name for the input element but for the invoker class
     * @param {OpenXmlElement} _element
     */

  }, {
    key: "prefix",
    value: function prefix(_element) {
      return _element instanceof OpenXmlElement && _element.node.lookupPrefix(this.NamespaceUri) || this.DefaultPrefix;
    }
    /**
     * get the qualified name in the range of a element
     * this function is not getting the qualified name for the input element but for the invoker class
     * @param {OpenXmlElement} _element
     */

  }, {
    key: "qualifiedName",
    value: function qualifiedName(_element) {
      var singleTagName = this.LocalName;
      assert$3(singleTagName, NO_IMPLEMENT("".concat(this.name, ".LocalName")));
      var prefixName = this.prefix(_element);
      return prefixName ? "".concat(prefixName, ":").concat(singleTagName) : singleTagName;
    }
    /**
     * instanced an OpenXMLElement object for the input node
     * @param {Element} _node
     */

  }, {
    key: "instanced",
    value: function instanced(_node) {
      if (_node && 1 === _node.nodeType) {
        var key = "".concat(_node.namespaceURI, "::").concat(_node.localName);
        var ctor = registedElements[key] || OpenXmlElement;
        return new ctor(_node);
      }
    }
    /**
     * check if the input node matched to the invoker class
     * @param {Element} _node
     */

  }, {
    key: "isMatchedNode",
    value: function isMatchedNode(_node) {
      return _node && _node.namespaceURI === this.NamespaceUri && _node.localName === this.LocalName;
    }
    /**
     * create a new element of the invoker class
     * @param {IDOM|Document} _dom the isntance of the IDOM for creating element
     * @param {Element} _parentElement the parent element which will contain the new element
     */

  }, {
    key: "createElement",
    value: function createElement(_dom, _parentElement) {
      assert$3(_dom, EXPECT_PARAM("_dom"));

      var node = _dom.createElementNS(this.NamespaceUri, this.qualifiedName(_parentElement));

      if (node) {
        var element = new this(node);
        this.createDetail(element);
        return element;
      }
    }
    /**
     * the action for preparing the detail data of a new instance
     * @param {OpenXmlElement} _element 
     */

  }, {
    key: "createDetail",
    value: function createDetail(_element) {
      assert$3(_element instanceof this, EXPECT_PARAM("_element must be instance of ".concat(this.name)));
    }
    /**
     * generate a xpath part of this class
     * @param {String} _custom some custom expression part, can be ignored.
     */

  }, {
    key: "xpath",
    value: function xpath(_custom) {
      return "*[local-name(.)='".concat(this.LocalName, "' and namespace-uri(.)='").concat(this.NamespaceUri, "' ").concat(_custom || "", "]");
    }
    /**
     * generate a xpath expression for searching
     * @param {String} _prefix the prefix expression, such as "./", ".//", and so on
     * @param {OpemXmlAttribute|Class|String|undefined} _arg the xpath part, can be insatnce of attribute, class, string.
     *                                                       function will take "*" by default if ignore this parameter.
     */

  }, {
    key: "genXPath",
    value: function genXPath(_prefix, _arg) {
      return "".concat(_prefix).concat((_arg instanceof OpenXmlAttribute || OpenXmlElement.isPrototypeOf(_arg)) && _arg.xpath() || _arg || "*");
    }
  }]);

  return OpenXmlElement;
}();

_defineProperty(OpenXmlElement, "LocalName", undefined);

_defineProperty(OpenXmlElement, "DefaultPrefix", undefined);

_defineProperty(OpenXmlElement, "NamespaceUri", undefined);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of all OpenXML part which content is XML
 * @extends OpenXmlPart
 */

var OpenXmlPurePart = /*#__PURE__*/function (_OpenXmlPart) {
  _inherits(OpenXmlPurePart, _OpenXmlPart);

  var _super = _createSuper$2(OpenXmlPurePart);

  function OpenXmlPurePart(_opt) {
    var _this;

    _classCallCheck(this, OpenXmlPurePart);

    _this = _super.call(this, _opt);
    readonly(_assertThisInitialized(_this), {
      contentDom: _opt["package"].application.DOM.parse(_opt.content)
    });
    return _this;
  }
  /**
   * get the data of the content
   */


  _createClass(OpenXmlPurePart, [{
    key: "content",
    get: function get() {
      return this.contentDom.toString();
    }
    /**
     * get the instance of OpenXmlElement for the primary element in the DOM
     */

  }, {
    key: "primaryElement",
    get: function get() {
      return OpenXmlElement.instanced(this.contentDom.primaryNode);
    }
  }]);

  return OpenXmlPurePart;
}(OpenXmlPart);

var relationship = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

var namespaceURI = /*#__PURE__*/Object.freeze({
  __proto__: null,
  relationship: relationship
});

var AttrRelationshipId = new OpenXmlAttribute("id", relationship, "r");

var AttrEmbed = new OpenXmlAttribute("embed", relationship, "r");

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AttrRelationshipId: AttrRelationshipId,
  AttrEmbed: AttrEmbed,
  namespaceURI: namespaceURI
});

var main = "http://schemas.openxmlformats.org/presentationml/2006/main";

var namespaceURI$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  main: main
});

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class for elements defined in presentation2006
 */

var Presentation2006 = /*#__PURE__*/function (_OpenXmlElement) {
  _inherits(Presentation2006, _OpenXmlElement);

  var _super = _createSuper$3(Presentation2006);

  //#region override the key information
  //#endregion
  function Presentation2006(_node) {
    _classCallCheck(this, Presentation2006);

    return _super.call(this, _node);
  }

  return Presentation2006;
}(OpenXmlElement);

_defineProperty(Presentation2006, "NamespaceUri", main);

_defineProperty(Presentation2006, "DefaultPrefix", "p");

var _class, _temp;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the slide's id, element with tag "sldId"
 * @class SlideId
 */

var SlideId = OpenXmlElement.register((_temp = _class = /*#__PURE__*/function (_Presentations) {
  _inherits(SlideId, _Presentations);

  var _super = _createSuper$4(SlideId);

  //#region override the key information
  //#endregion
  function SlideId(_node) {
    _classCallCheck(this, SlideId);

    return _super.call(this, _node);
  }
  /**
   * get the relationship ID
   */


  _createClass(SlideId, [{
    key: "relationshipId",
    get: function get() {
      var id = this.getAttribute(AttrRelationshipId);

      if (!id) {
        id = genRandId("R");
        this.setAttribute(AttrRelationshipId, id);
      }

      return id;
    }
    /**
     * set the relationship ID
     */
    ,
    set: function set(_val) {
      this.setAttribute(AttrRelationshipId, _val || utility.genRandId("R", 16));
    }
    /**
     * get the ID
     */

  }, {
    key: "id",
    get: function get() {
      return this.getAttribute("id");
    }
    /**
     * set the ID
     */
    ,
    set: function set(_val) {
      _val = Number(_val);
      isNaN(_val) || this.setAttribute("id", _val);
    }
  }]);

  return SlideId;
}(Presentation2006), _defineProperty(_class, "LocalName", "sldId"), _temp));

var _class$1, _temp$1;

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the list of the slide's ID, element with tag "sldIdLst"
 * @class SlideIdList
 */

var SlideIdList = OpenXmlElement.register((_temp$1 = _class$1 = /*#__PURE__*/function (_Presentations) {
  _inherits(SlideIdList, _Presentations);

  var _super = _createSuper$5(SlideIdList);

  //#region override the key inforamtion
  //#endregion
  function SlideIdList(_node) {
    _classCallCheck(this, SlideIdList);

    return _super.call(this, _node);
  }
  /**
   * get count of the IDs
   */


  _createClass(SlideIdList, [{
    key: "items",

    /**
     * get an iterator for enumerating all SlideIds
     */
    value: /*#__PURE__*/regenerator.mark(function items() {
      var list, index;
      return regenerator.wrap(function items$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              list = this.children(SlideId);
              _context.t0 = regenerator.keys(list);

            case 2:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 8;
                break;
              }

              index = _context.t1.value;
              _context.next = 6;
              return {
                index: index,
                slideId: list[index]
              };

            case 6:
              _context.next = 2;
              break;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, items, this);
    })
  }, {
    key: "count",
    get: function get() {
      return this.children(SlideId).length;
    }
  }]);

  return SlideIdList;
}(Presentation2006), _defineProperty(_class$1, "LocalName", "sldIdLst"), _temp$1));

var _class$2, _temp$2;

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the presetation, element with tag "presentation"
 */

var Presentation = OpenXmlElement.register((_temp$2 = _class$2 = /*#__PURE__*/function (_Presentations) {
  _inherits(Presentation, _Presentations);

  var _super = _createSuper$6(Presentation);

  //#region override the key information
  //#endregion
  function Presentation(_node) {
    _classCallCheck(this, Presentation);

    return _super.call(this, _node);
  }
  /**
   * get the list of the slide's id
   */


  _createClass(Presentation, [{
    key: "slideIdList",
    get: function get() {
      var list = this.children(SlideIdList);

      if (list.length <= 0) {
        list = this.createElement(SlideIdList);
        this.appendChild(list);
      } else {
        list = list[0];
      }

      return list;
    }
  }]);

  return Presentation;
}(Presentation2006), _defineProperty(_class$2, "LocalName", "presentation"), _temp$2));

var _class$3, _temp$3;

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of element contains the nonvisual information, element with tag "cNvPr"
 * @class NonVisualDrawingProperties
 */

var NonVisualDrawingProperties = OpenXmlElement.register((_temp$3 = _class$3 = /*#__PURE__*/function (_Presentations) {
  _inherits(NonVisualDrawingProperties, _Presentations);

  var _super = _createSuper$7(NonVisualDrawingProperties);

  //#region override the key information
  //#endregion
  function NonVisualDrawingProperties(_node) {
    _classCallCheck(this, NonVisualDrawingProperties);

    return _super.call(this, _node);
  }
  /**
   * get the name information
   */


  _createClass(NonVisualDrawingProperties, [{
    key: "name",
    get: function get() {
      return this.getAttribute("name");
    }
    /**
     * set the name information
     */
    ,
    set: function set(_val) {
      this.setAttribute("name", _val);
    }
    /**
     * get the ID
     */

  }, {
    key: "id",
    get: function get() {
      return this.getAttribute("id");
    }
    /**
     * set the ID
     */
    ,
    set: function set(_val) {
      this.setAttribute("id", _val);
    }
    /**
     * get the description
     */

  }, {
    key: "description",
    get: function get() {
      return this.getAttribute("descr");
    }
    /**
     * set the description
     */
    ,
    set: function set(_val) {
      return this.setAttribute("descr", _val);
    }
  }]);

  return NonVisualDrawingProperties;
}(Presentation2006), _defineProperty(_class$3, "LocalName", "cNvPr"), _temp$3));

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of the nonvisual properties
 * @class NonVisualPropertiesBase
 */

var NonVisualPropertiesBase = /*#__PURE__*/function (_Presentations) {
  _inherits(NonVisualPropertiesBase, _Presentations);

  var _super = _createSuper$8(NonVisualPropertiesBase);

  function NonVisualPropertiesBase(_node) {
    _classCallCheck(this, NonVisualPropertiesBase);

    return _super.call(this, _node);
  }
  /**
   * get the name information
   */


  _createClass(NonVisualPropertiesBase, [{
    key: "name",
    get: function get() {
      var pr = this.childOne(NonVisualDrawingProperties);
      return pr && pr.name;
    }
    /**
     * set the name information
     */
    ,
    set: function set(_val) {
      var pr = this.childOne(NonVisualDrawingProperties);
      pr && (pr.name = _val);
    }
    /**
     * get the ID information
     */

  }, {
    key: "id",
    get: function get() {
      var pr = this.childOne(NonVisualDrawingProperties);
      return pr && pr.id;
    }
    /**
     * set the ID information
     */
    ,
    set: function set(_val) {
      var pr = this.childOne(NonVisualDrawingProperties);
      pr && (pr.id = _val);
    }
    /**
     * get the description
     */

  }, {
    key: "description",
    get: function get() {
      var pr = this.childOne(NonVisualDrawingProperties);
      return pr && pr.description;
    }
    /**
     * set the description
     */
    ,
    set: function set(_val) {
      var pr = this.childOne(NonVisualDrawingProperties);
      pr && (pr.description = _val);
    }
  }]);

  return NonVisualPropertiesBase;
}(Presentation2006);

var _class$4, _temp$4;

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the nonvisual properties of the shape's group, element with tag "nvGrpSpPr"
 * @class NonVisualGroupShapeProperties
 */

var NonVisualGroupShapeProperties = OpenXmlElement.register((_temp$4 = _class$4 = /*#__PURE__*/function (_NonVisualPropertiesB) {
  _inherits(NonVisualGroupShapeProperties, _NonVisualPropertiesB);

  var _super = _createSuper$9(NonVisualGroupShapeProperties);

  //#region override the key information
  //#endregion
  function NonVisualGroupShapeProperties(_node) {
    _classCallCheck(this, NonVisualGroupShapeProperties);

    return _super.call(this, _node);
  }

  return NonVisualGroupShapeProperties;
}(NonVisualPropertiesBase), _defineProperty(_class$4, "LocalName", "nvGrpSpPr"), _temp$4));

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of all visual object in the slide
 */

var VisualSlideObject = /*#__PURE__*/function (_Presentations) {
  _inherits(VisualSlideObject, _Presentations);

  var _super = _createSuper$a(VisualSlideObject);

  function VisualSlideObject(_node) {
    _classCallCheck(this, VisualSlideObject);

    return _super.call(this, _node);
  }

  return VisualSlideObject;
}(Presentation2006);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of all element contain a group of shape
 * @class GroupShapeBase
 */

var GroupShapeBase = /*#__PURE__*/function (_VisualSlideObject) {
  _inherits(GroupShapeBase, _VisualSlideObject);

  var _super = _createSuper$b(GroupShapeBase);

  function GroupShapeBase(_node) {
    _classCallCheck(this, GroupShapeBase);

    return _super.call(this, _node);
  }
  /**
   * get the nonvisual properties
   */


  _createClass(GroupShapeBase, [{
    key: "visualChildren",

    /**
     * get an iterator for enumerating the visual elements
     */
    value: /*#__PURE__*/regenerator.mark(function visualChildren() {
      var list, idx, element;
      return regenerator.wrap(function visualChildren$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              list = this.children("*");
              _context.t0 = regenerator.keys(list);

            case 2:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 10;
                break;
              }

              idx = _context.t1.value;
              element = list[idx];

              if (!(element instanceof VisualSlideObject)) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return element;

            case 8:
              _context.next = 2;
              break;

            case 10:

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, visualChildren, this);
    })
  }, {
    key: "nonVisualProperties",
    get: function get() {
      var pr = this.childOne(NonVisualGroupShapeProperties);

      if (!pr) {
        pr = this.createElement(NonVisualGroupShapeProperties);
        pr && this.appendChild(pr);
      }

      return pr;
    }
  }]);

  return GroupShapeBase;
}(VisualSlideObject);

var _class$5, _temp$5;

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the tree of the shapes, element with tag "spTree"
 * @class ShapeTree
 */

var ShapeTree = OpenXmlElement.register((_temp$5 = _class$5 = /*#__PURE__*/function (_GroupShapeBase) {
  _inherits(ShapeTree, _GroupShapeBase);

  var _super = _createSuper$c(ShapeTree);

  //#region override the key information
  //#endregion
  function ShapeTree(_node) {
    _classCallCheck(this, ShapeTree);

    return _super.call(this, _node);
  }

  return ShapeTree;
}(GroupShapeBase), _defineProperty(_class$5, "LocalName", "spTree"), _temp$5));

var _class$6, _temp$6;

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the common data of the slide, element with tag "cSld"
 * @class CommonSlideDatas
 */

var CommonSlideData = OpenXmlElement.register((_temp$6 = _class$6 = /*#__PURE__*/function (_Presentations) {
  _inherits(CommonSlideData, _Presentations);

  var _super = _createSuper$d(CommonSlideData);

  //#region override the key information
  //#endregion
  function CommonSlideData(_node) {
    _classCallCheck(this, CommonSlideData);

    return _super.call(this, _node);
  }
  /**
   * get the tree of the shapes
   */


  _createClass(CommonSlideData, [{
    key: "shapeTree",
    get: function get() {
      var tree = this.childOne(ShapeTree);

      if (!tree) {
        tree = this.createElement(ShapeTree);
        tree && this.appendChild(tree);
      }

      return tree;
    }
  }]);

  return CommonSlideData;
}(Presentation2006), _defineProperty(_class$6, "LocalName", "cSld"), _temp$6));

var _class$7, _temp$7;

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the slide, element with tag "sld"
 */

var Slide = OpenXmlElement.register((_temp$7 = _class$7 = /*#__PURE__*/function (_Presentations) {
  _inherits(Slide, _Presentations);

  var _super = _createSuper$e(Slide);

  //#region override the key information
  //#endregion
  function Slide(_node) {
    _classCallCheck(this, Slide);

    return _super.call(this, _node);
  }
  /**
   * get the common data of the slide
   */


  _createClass(Slide, [{
    key: "commonData",
    get: function get() {
      var cSld = this.childOne(CommonSlideData);

      if (!cSld) {
        cSld = this.createElement(CommonSlideData);
        cSld && this.appendChild(cSld);
      }

      return cSld;
    }
  }]);

  return Slide;
}(Presentation2006), _defineProperty(_class$7, "LocalName", "sld"), _temp$7));

var _class$8, _temp$8;

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the nonvisual properties of the shape, element with tag "nvSpPr"
 * @class NonVisualShapeProperties
 */

var NonVisualShapeProperties = OpenXmlElement.register((_temp$8 = _class$8 = /*#__PURE__*/function (_NonVisualPropertiesB) {
  _inherits(NonVisualShapeProperties, _NonVisualPropertiesB);

  var _super = _createSuper$f(NonVisualShapeProperties);

  //#region override the key inforamtion
  //#endregion
  function NonVisualShapeProperties(_node) {
    _classCallCheck(this, NonVisualShapeProperties);

    return _super.call(this, _node);
  }

  return NonVisualShapeProperties;
}(NonVisualPropertiesBase), _defineProperty(_class$8, "LocalName", "nvSpPr"), _temp$8));

var _class$9, _temp$9;

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the nonvisual properties of the picture, element with tag "nvPicPr"
 * @class NonVisualPictureProperties
 */

var NonVisualPictureProperties = OpenXmlElement.register((_temp$9 = _class$9 = /*#__PURE__*/function (_NonVisualPropertiesB) {
  _inherits(NonVisualPictureProperties, _NonVisualPropertiesB);

  var _super = _createSuper$g(NonVisualPictureProperties);

  //#region override the key information
  //#endregion
  function NonVisualPictureProperties(_node) {
    _classCallCheck(this, NonVisualPictureProperties);

    return _super.call(this, _node);
  }

  return NonVisualPictureProperties;
}(NonVisualPropertiesBase), _defineProperty(_class$9, "LocalName", "nvPicPr"), _temp$9));

var _class$a, _temp$a;

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the shape's group, element with tag "grpSp"
 * @class GroupShape
 */

var GroupShape = OpenXmlElement.register((_temp$a = _class$a = /*#__PURE__*/function (_GroupShapeBase) {
  _inherits(GroupShape, _GroupShapeBase);

  var _super = _createSuper$h(GroupShape);

  //#region override the key information
  //#endregion
  function GroupShape(_node) {
    _classCallCheck(this, GroupShape);

    return _super.call(this, _node);
  }

  return GroupShape;
}(GroupShapeBase), _defineProperty(_class$a, "LocalName", "grpSp"), _temp$a));

var main$1 = "http://schemas.openxmlformats.org/drawingml/2006/main";

var namespaceURI$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  main: main$1
});

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * basic class of all element defined in drawing2006
 */

var Drawing2006 = /*#__PURE__*/function (_OpenXmlElement) {
  _inherits(Drawing2006, _OpenXmlElement);

  var _super = _createSuper$i(Drawing2006);

  //#region override the key information
  //#endregion
  function Drawing2006(_node) {
    _classCallCheck(this, Drawing2006);

    return _super.call(this, _node);
  }

  return Drawing2006;
}(OpenXmlElement);

_defineProperty(Drawing2006, "NamespaceUri", main$1);

_defineProperty(Drawing2006, "DefaultPrefix", "a");

var _class$b, _temp$b, _class2, _temp2, _class3, _temp3, _class4, _temp4;

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * class of the element with tag "a:t"
 * @class Text
 */

var Text = OpenXmlElement.register((_temp$b = _class$b = /*#__PURE__*/function (_Drawing) {
  _inherits(Text, _Drawing);

  var _super = _createSuper$j(Text);

  //#region override the key information
  //#endregion
  function Text(_node) {
    _classCallCheck(this, Text);

    return _super.call(this, _node);
  }

  return Text;
}(Drawing2006), _defineProperty(_class$b, "LocalName", "t"), _temp$b)); //#endregion
//#region a:r

/**
 * class of the element with tag "a:r"
 * @class Run
 */

var Run = OpenXmlElement.register((_temp2 = _class2 = /*#__PURE__*/function (_Drawing2) {
  _inherits(Run, _Drawing2);

  var _super2 = _createSuper$j(Run);

  //#region override the key information
  //#endregion
  function Run(_node) {
    _classCallCheck(this, Run);

    return _super2.call(this, _node);
  }
  /**
   * get all text in the element
   */


  _createClass(Run, [{
    key: "textContent",
    get: function get() {
      var items = this.descendants(Text).map(function (text) {
        return text.textContent;
      });
      return items.join("");
    }
  }]);

  return Run;
}(Drawing2006), _defineProperty(_class2, "LocalName", "r"), _temp2)); //#endregion
//#region a:p

/**
 * class of element with tag "a:p"
 * @class Paragraph
 */

var Paragraph = OpenXmlElement.register((_temp3 = _class3 = /*#__PURE__*/function (_Drawing3) {
  _inherits(Paragraph, _Drawing3);

  var _super3 = _createSuper$j(Paragraph);

  //#region override the key information
  //#endregion
  function Paragraph(_node) {
    _classCallCheck(this, Paragraph);

    return _super3.call(this, _node);
  }
  /**
   * get all text in the element
   */


  _createClass(Paragraph, [{
    key: "textContent",
    get: function get() {
      var items = this.descendants(Text).map(function (text) {
        return text.textContent;
      });
      return items.join("");
    }
  }]);

  return Paragraph;
}(Drawing2006), _defineProperty(_class3, "LocalName", "p"), _temp3)); //#endregion
//#region a:txBody

/**
 * class of element with tag "a:txBody"
 * @class TextBody
 */

var TextBody = OpenXmlElement.register((_temp4 = _class4 = /*#__PURE__*/function (_Drawing4) {
  _inherits(TextBody, _Drawing4);

  var _super4 = _createSuper$j(TextBody);

  //#region override the key information
  //#endregion
  function TextBody(_node) {
    _classCallCheck(this, TextBody);

    return _super4.call(this, _node);
  }
  /**
   * get all text in the element
   */


  _createClass(TextBody, [{
    key: "textContent",
    get: function get() {
      var items = this.descendants(Paragraph).map(function (p) {
        return p.textContent;
      });
      return items.join("\r\n");
    }
  }]);

  return TextBody;
}(Drawing2006), _defineProperty(_class4, "LocalName", "txBody"), _temp4)); //#endregion

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Text: Text,
  Run: Run,
  Paragraph: Paragraph,
  TextBody: TextBody,
  namespaceURI: namespaceURI$2
});

var _class$c, _temp$c;

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the shape, element with tag "sp"
 */

var Shape = OpenXmlElement.register((_temp$c = _class$c = /*#__PURE__*/function (_VisualSlideObject) {
  _inherits(Shape, _VisualSlideObject);

  var _super = _createSuper$k(Shape);

  //#region override the key information
  //#endregion
  function Shape(_node) {
    _classCallCheck(this, Shape);

    return _super.call(this, _node);
  }
  /**
   * get the nonvisual properties
   */


  _createClass(Shape, [{
    key: "nonVisualProperties",
    get: function get() {
      var pr = this.childOne(NonVisualShapeProperties);

      if (!pr) {
        pr = this.createElement(NonVisualShapeProperties);
        pr && this.appendChild(pr);
      }

      return pr;
    }
    /**
     * get the text body object
     */

  }, {
    key: "textBody",
    get: function get() {
      return this.childOne(TextBody);
    }
  }]);

  return Shape;
}(VisualSlideObject), _defineProperty(_class$c, "LocalName", "sp"), _temp$c));

var _class$d, _temp$d;

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the picture, element with tag "pic"
 * @class Picture
 */

var Picture = OpenXmlElement.register((_temp$d = _class$d = /*#__PURE__*/function (_VisualSlideObject) {
  _inherits(Picture, _VisualSlideObject);

  var _super = _createSuper$l(Picture);

  //#region override the key information
  //#endregion
  function Picture(_node) {
    _classCallCheck(this, Picture);

    return _super.call(this, _node);
  }
  /**
   * get the nonvisual properties
   */


  _createClass(Picture, [{
    key: "nonVisualProperties",
    get: function get() {
      var pr = this.childOne(NonVisualPictureProperties);

      if (!pr) {
        pr = this.createElement(NonVisualPictureProperties);
        pr && this.appendChild(pr);
      }

      return pr;
    }
  }]);

  return Picture;
}(VisualSlideObject), _defineProperty(_class$d, "LocalName", "pic"), _temp$d));

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Presentation: Presentation,
  SlideIdList: SlideIdList,
  SlideId: SlideId,
  Slide: Slide,
  CommonSlideData: CommonSlideData,
  NonVisualGroupShapeProperties: NonVisualGroupShapeProperties,
  NonVisualShapeProperties: NonVisualShapeProperties,
  NonVisualPictureProperties: NonVisualPictureProperties,
  NonVisualDrawingProperties: NonVisualDrawingProperties,
  ShapeTree: ShapeTree,
  GroupShape: GroupShape,
  Shape: Shape,
  Picture: Picture,
  namespaceURI: namespaceURI$1
});

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  office: index,
  presentation: index$2,
  drawing: index$1
});

var _class$e, _temp$e;

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var assert$4 = assert; //#region inner class
//#region class of SlideSet

var $slideAvalidID = Symbol("SlideSet.avalidID");
/**
 * Class of operating the set of the slides
 */

var SlideSet = /*#__PURE__*/function () {
  /**
   * the minimum ID
   */

  /**
   * the maximum ID
   */

  /**
   * constructor
   * @param {Presentation} _presentation the presentation part
   */
  function SlideSet(_parent) {
    _classCallCheck(this, SlideSet);

    assert$4(_parent instanceof PresentationPart, "_parent(an instance of PresentationPart)");
    readonly(this, "selfElement", _parent.presentation.slideIdList);
    readonly(this, "parent", _parent);
    this.arrangeId();
  }
  /**
   * arrange the id of all slides
   * the new set of id will start from MIN_ID
   */


  _createClass(SlideSet, [{
    key: "arrangeId",
    value: function arrangeId() {
      var totalNode = this.parent.contentDom.primaryNode;
      var id = SlideSet.MIN_ID;

      var _iterator = _createForOfIteratorHelper(this.selfElement.items()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var slideId = _step.value.slideId;
          var oriId = slideId.id;
          var relElements = totalNode.xpathSelect(".//*[local-name(.)='sldId' and @id='".concat(oriId, "']"));

          for (var relIdx in relElements) {
            relElements[relIdx].setAttribute("id", id);
          }

          id++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this[$slideAvalidID] = id;
    }
    /**
     * the count of the slides
     */

  }, {
    key: "getByIndex",

    /**
     * get a slide by the index in the slide set
     * @param {Number} _index the index of the slide in the slide set
     */
    value: function getByIndex(_index) {
      var sldIdNode = this.selfElement.children(SlideId)[_index];

      if (sldIdNode) {
        return this.parent.getRelationPart(sldIdNode.relationshipId);
      }
    }
    /**
     * get an iterator of all slides
     */

  }, {
    key: "slides",
    value: /*#__PURE__*/regenerator.mark(function slides() {
      var parent, _iterator2, _step2, _step2$value, index, slideId;

      return regenerator.wrap(function slides$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parent = this.parent;
              _iterator2 = _createForOfIteratorHelper(this.selfElement.items());
              _context.prev = 2;

              _iterator2.s();

            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 10;
                break;
              }

              _step2$value = _step2.value, index = _step2$value.index, slideId = _step2$value.slideId;
              _context.next = 8;
              return {
                index: index,
                getter: parent.getRelationPart(slideId.relationshipId),
                id: slideId.id
              };

            case 8:
              _context.next = 4;
              break;

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);

              _iterator2.e(_context.t0);

            case 15:
              _context.prev = 15;

              _iterator2.f();

              return _context.finish(15);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, slides, this, [[2, 12, 15, 18]]);
    })
    /**
     * enumerate each slide and pass to the callback function to process
     * @param {Function} _cb the callback function
     */

  }, {
    key: "each",
    value: function () {
      var _each = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_cb) {
        var parent, _iterator3, _step3, _step3$value, index, slideId, slidePart, cbRet;

        return regenerator.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof _cb === "function")) {
                  _context2.next = 25;
                  break;
                }

                parent = this.parent;
                _iterator3 = _createForOfIteratorHelper(this.selfElement.items());
                _context2.prev = 3;

                _iterator3.s();

              case 5:
                if ((_step3 = _iterator3.n()).done) {
                  _context2.next = 17;
                  break;
                }

                _step3$value = _step3.value, index = _step3$value.index, slideId = _step3$value.slideId;
                _context2.next = 9;
                return parent.getRelationPart(slideId.relationshipId);

              case 9:
                slidePart = _context2.sent;
                cbRet = _cb(index, slidePart);
                _context2.t0 = cbRet instanceof Promise;

                if (!_context2.t0) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 15;
                return cbRet;

              case 15:
                _context2.next = 5;
                break;

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t1 = _context2["catch"](3);

                _iterator3.e(_context2.t1);

              case 22:
                _context2.prev = 22;

                _iterator3.f();

                return _context2.finish(22);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[3, 19, 22, 25]]);
      }));

      function each(_x) {
        return _each.apply(this, arguments);
      }

      return each;
    }()
    /**
     * insert a slide
     * @param {*} _positionSlide    表示插入位置的胶片，新胶片将插入到此胶片之后，可以是胶片顺序号、胶片关系ID、胶片部件
     *                              如果输入的是undefined，则将新胶片添加到最后
     *                              如果输入的是-1，则表示将新胶片添加到第一张
     * @param {*} _targetSlide      新胶片的部件，如果不输入该参数，则复制_positionSlide表示的胶片为新胶片
     */

  }, {
    key: "insert",
    value: function () {
      var _insert = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_positionSlide, _targetSlide) {
        var parent, useId, relSlideId, slideIdSet, refSlidePart, fileExtName, fileName, filePath, rid, newId;
        return regenerator.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parent = this.parent; // get a valid id for new slide.
                // if there is no valid id, try once after arranging.

                useId = this[$slideAvalidID];

                if (useId > SlideSet.MAX_ID) {
                  this.arrangeId();
                  useId = this[$slideAvalidID];
                }

                assert$4(useId <= SlideSet.MAX_ID, NO_ENOUGH_ID); // check the new slide must be in the same package of the slide set

                assert$4(!_targetSlide || parent.inSamePackage(_targetSlide), FROM_OTHER_PACKAGE("_targetSlide")); // looking for the relationship ID of the position slide

                relSlideId = undefined;

                if (typeof _positionSlide === "number") {
                  slideIdSet = this.selfElement.children(SlideId);
                  relSlideId = slideIdSet[_positionSlide < 0 ? 0 : _positionSlide >= slideIdSet.length ? slideIdSet.length - 1 : _positionSlide];
                } else if (typeof _positionSlide === "string") {
                  relSlideId = this.selfElement.childOne(AttrRelationshipId, "and string(.)='".concat(_positionSlide, "'"));
                } else if (parent.inSamePackage(_positionSlide)) {
                  relSlideId = this.selfElement.childOne(AttrRelationshipId, "and string(.)='".concat(_positionSlide.relationID, "'"));
                }

                if (_targetSlide) {
                  _context3.next = 21;
                  break;
                }

                if (!relSlideId) {
                  _context3.next = 20;
                  break;
                }

                _context3.next = 11;
                return parent.getRelationPart(relSlideId.relationshipId);

              case 11:
                refSlidePart = _context3.sent;
                fileExtName = path.extname(refSlidePart.path);
                fileName = path.basename(refSlidePart.path, fileExtName).replace(/\d$/, "") + genRandId() + fileExtName;
                filePath = path.dirname(refSlidePart.path);
                _context3.next = 17;
                return refSlidePart.duplicate(path.join(filePath, fileName));

              case 17:
                _targetSlide = _context3.sent;
                _context3.next = 21;
                break;

              case 20:
                throw NO_IMPLEMENT();

              case 21:
                assert$4(_targetSlide, LOCATE_RESOURCE_FAIL("target slide part")); // insert the target slide

                rid = parent.insertRelationPart(_targetSlide);
                newId = this.selfElement.createElement(SlideId);
                assert$4(newId, ACQUIRE_RESOURCE_FAIL("SlideId Node"));
                newId.id = useId;
                newId.relationshipId = rid;
                relSlideId ? relSlideId.insertAsSibling(newId, typeof _positionSlide === "number" && _positionSlide < 0) : this.selfElement.appendChild(newId);
                this[$slideAvalidID]++;
                parent.commit();
                return _context3.abrupt("return", rid);

              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function insert(_x2, _x3) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "count",
    get: function get() {
      return this.selfElement.count;
    }
  }]);

  return SlideSet;
}(); //#endregion
//#endregion

/**
 * Class of operating the presentation part
 * @class PresentationPart
 */


_defineProperty(SlideSet, "MIN_ID", 256);

_defineProperty(SlideSet, "MAX_ID", 0x0ffffffff);

var PresentationPart = OpenXmlPart.register((_temp$e = _class$e = /*#__PURE__*/function (_OpenXmlPurePart) {
  _inherits(PresentationPart, _OpenXmlPurePart);

  var _super = _createSuper$m(PresentationPart);

  //#region override the shemas infomation and so on
  //#endregion

  /**
   * constructor
   * @param {*} _opt 
   */
  function PresentationPart(_opt) {
    var _this;

    _classCallCheck(this, PresentationPart);

    _this = _super.call(this, _opt);
    readonly(_assertThisInitialized(_this), "presentation", _this.primaryElement);
    readonly(_assertThisInitialized(_this), "slideSet", new SlideSet(_assertThisInitialized(_this)));
    return _this;
  }

  return PresentationPart;
}(OpenXmlPurePart), _defineProperty(_class$e, "SchemasURI", "http://schemas.openxmlformats.org/presentationml/2006/main"), _defineProperty(_class$e, "ContentType", "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"), _temp$e));

var _class$f, _temp$f;

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * class of the slide part
 * @class SlidePart
 */

var SlidePart = OpenXmlPart.register((_temp$f = _class$f = /*#__PURE__*/function (_OpenXmlPurePart) {
  _inherits(SlidePart, _OpenXmlPurePart);

  var _super = _createSuper$n(SlidePart);

  //#region override the key information
  //#endregion

  /**
   * constructor
   * @param {*} _opt 
   */
  function SlidePart(_opt) {
    var _this;

    _classCallCheck(this, SlidePart);

    _this = _super.call(this, _opt);
    var slideElement = _this.primaryElement;

    if (!(slideElement instanceof Slide)) {
      slideElement = Slide.createElement(_this.dom);
      slideElement && _this.dom.appendChild(slideElement.node);
    }

    readonly(_assertThisInitialized(_this), "slide", slideElement);
    return _this;
  }

  return SlidePart;
}(OpenXmlPurePart), _defineProperty(_class$f, "SchemasURI", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"), _defineProperty(_class$f, "ContentType", "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"), _temp$f));

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PresentationPart: PresentationPart,
  SlidePart: SlidePart
});

var index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  presentation: index$4
});

exports.IApplication = IApplication;
exports.IDom = IDom;
exports.IZip = IZip;
exports.OpenXmlAttribute = OpenXmlAttribute;
exports.OpenXmlBinaryPart = OpenXmlBinaryPart;
exports.OpenXmlElement = OpenXmlElement;
exports.OpenXmlPackage = OpenPackage;
exports.OpenXmlPart = OpenXmlPart;
exports.OpenXmlPurePart = OpenXmlPurePart;
exports.constants = constants;
exports.elements = index$3;
exports.error = error;
exports.genRandId = genRandId;
exports.parts = index$5;
exports.readonly = readonly;
//# sourceMappingURL=index.js.map
