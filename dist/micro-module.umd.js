(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['micro-module'] = {}));
}(this, (function (exports) { 'use strict';

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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
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
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
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
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  var Core = /*#__PURE__*/function () {
    function Core() {
      var microOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Core);
      this.microOptions = microOptions;
      this.name = microOptions.name;
      this.options = microOptions.options;
      this.module = microOptions.module;
      this.customElement = null;
    }
    _createClass(Core, [{
      key: "init",
      value: function init() {
        this.defineCustomElement();
      }
    }, {
      key: "defineCustomElement",
      value: function defineCustomElement() {
        this.customElement = this.createCustomElement();
        customElements.define(this.name, this.customElement);
      }
    }, {
      key: "createCustomElement",
      value: function createCustomElement() {
        var options = this.options,
          module = this.module;
        var createWrapper = this.createWrapper.bind(this);
        return /*#__PURE__*/function (_HTMLElement) {
          _inherits(CustomElement, _HTMLElement);
          var _super = _createSuper(CustomElement);
          function CustomElement() {
            var _this;
            _classCallCheck(this, CustomElement);
            _this = _super.call(this);
            _this.webComponentsIns = options.shadow ? _this.attachShadow({
              mode: 'open'
            }) : _assertThisInitialized(_this);
            module.bootstrap && module.bootstrap(_assertThisInitialized(_this));
            return _this;
          }

          // 监听属性变化
          _createClass(CustomElement, [{
            key: "connectedCallback",
            value:
            // 首次被插入element调用
            function connectedCallback() {
              var contentWrapper = createWrapper();
              this.contentWrapper = contentWrapper;

              // 挂载
              module.mount(this.contentWrapper, this.attributesObj, this);
              this.webComponentsIns.appendChild(this.contentWrapper);
            }

            // 当 custom element被移动到新的文档时，被调用
          }, {
            key: "disconnectedCallback",
            value: function disconnectedCallback() {
              // 销毁
              module.unmount && module.unmount(this);
            }

            // 当 custom element增加、删除、修改自身属性时，被调用。
          }, {
            key: "attributeChangedCallback",
            value: function attributeChangedCallback(attributeName, _oldValue, newValue) {
              module.updated(attributeName, newValue, this.contentWrapper, this, _oldValue);
            }
          }], [{
            key: "observedAttributes",
            get: function get() {
              return Object.keys(options.propTypes || {});
            }
          }]);
          return CustomElement;
        }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
      }
    }, {
      key: "createWrapper",
      value: function createWrapper() {
        var fragment = document.createDocumentFragment();
        var contentWrapper = this.renderHtmlTagObjectToHtmlElement(this.createHtmlTagObject('div', {
          id: 'micro-wrapper',
          style: 'height: 100%; width: 100%;'
        }));
        fragment.appendChild(contentWrapper);
        return fragment;
      }
    }, {
      key: "renderHtmlTagObjectToHtmlElement",
      value: function renderHtmlTagObjectToHtmlElement(tagDefinition) {
        var tagElement = document.createElement(tagDefinition.tagName);
        Object.keys(tagDefinition.attributes || {}).forEach(function (attributeName) {
          var _tagDefinition$attrib;
          tagElement.setAttribute(attributeName, ((_tagDefinition$attrib = tagDefinition.attributes) === null || _tagDefinition$attrib === void 0 ? void 0 : _tagDefinition$attrib[attributeName]) || '');
        });
        return tagElement;
      }
    }, {
      key: "createHtmlTagObject",
      value: function createHtmlTagObject(tagName, attributes) {
        return {
          tagName: tagName,
          voidTag: voidTags.indexOf(tagName) !== -1,
          attributes: attributes
        };
      }
    }]);
    return Core;
  }();

  var define = function define(name, module) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!name) {
      return;
    }
    if (!module) {
      return;
    }
    var core = new Core({
      name: name,
      module: module,
      options: options
    });
    core.init();
  };

  exports.define = define;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
