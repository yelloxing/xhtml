
/*!
* xhtml.js - 🦑 常用的html操作集合。Common set of html operations.
* git+https://github.com/yelloxing/xhtml.js.git
*
* author 心叶
*
* version 1.0.0-alpha
*
* build Sat Oct 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sat Oct 19 2019 17:04:37 GMT+0800 (GMT+08:00)
*/

"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var MAX_SAFE_INTEGER = 9007199254740991;
  /**
   * 判断是不是一个可以作为长度的整数（比如数组下标）
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * 判断是不是一个类似数组的对象，是否可以通过length迭代
   *
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArrayLike(value) {
    return value != null && typeof value != 'function' && isLength(value.length);
  }

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 和isArrayLike类似，不过特别排除以下类型：
   *  1.字符串
   *
   * @private
   * @param {any} value 需要判断的值
   * @returns {boolean} 如果是返回true，否则返回false
   */


  function isArraySpec(value) {
    return isArrayLike(value) && !isString(value);
  }
  /**
   * 创建一个新数组，把传递的数组或值拼接起来。
   *
   * @since V0.2.2
   * @public
   * @param {*} value1 需要拼接的值1
   * @param {*} value2 需要拼接的值2
   * @param {*} value3 需要拼接的值3
   * ...
   * @returns {Array} 返回连接后的新数组。
   * @example
   *
   * concat(1, [2,3])
   * // => [1, 2, 3]
   *
   * concat([], [[1, 2], 3], false, '字符串')
   * // => [1, 2, 3, false, '字符串']
   *
   * concat()
   * // => []
   */


  var concat = function concat(newArray, values) {
    for (var i = 0; i < values.length; i++) {
      if (isArraySpec(values[i])) {
        if (values[i].length > 1) {
          concat(newArray, values[i]);
        } else if (values[i].length === 1) {
          newArray.push(values[i][0]);
        }
      } else {
        newArray.push(values[i]);
      }
    }
  };

  function concat$1() {
    var newArray = [];

    for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    concat(newArray, values);
    return newArray;
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }
  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */


  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }

  var xhtml = function xhtml() {
    for (var _len2 = arguments.length, nodes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nodes[_key2] = arguments[_key2];
    }

    return new xhtml.prototype.init(nodes);
  };

  xhtml.prototype.init = function (nodes) {
    nodes = concat$1.apply(void 0, _toConsumableArray(nodes));
    this.length = 0;

    for (var i = 0; i < nodes.length; i++) {
      if (isElement(nodes[i])) {
        this[this.length] = nodes[i];
        this.length += 1;
      }
    }

    return this;
  }; // 扩展方法
  // 在xhtml和xhtml.prototype上分别调用extend方法就可以在类和对象上扩展方法了


  xhtml.prototype.extend = xhtml.extend = function () {
    var target = arguments[0] || {};
    var source = arguments[1] || {};
    var length = arguments.length;
    /*
     * 确定复制目标和源
     */

    if (length === 1) {
      //如果只有一个参数，目标对象是自己
      source = target;
      target = this;
    }

    if (!isObject(target)) {
      //如果目标不是对象或函数，则初始化为空对象
      target = {};
    }
    /*
     * 复制属性到对象上面
     */


    for (var key in source) {
      try {
        target[key] = source[key];
      } catch (e) {
        // 为什么需要try{}catch(e){}？
        // 一些对象的特殊属性不允许覆盖，比如name
        // 执行：xhtml.extend({'name':'新名称'})
        // 会抛出TypeError
        throw new Error("Illegal property value！");
      }
    }

    return target;
  };

  xhtml.prototype.init.prototype = xhtml.prototype; // 把字符串变成结点

  var toNode = function toNode(template) {
    var frame = document.createElement("div");
    frame.innerHTML = template;
    var childNodes = frame.childNodes;

    for (var i = 0; i < childNodes.length; i++) {
      if (isElement(childNodes[i])) {
        return childNodes[i];
      }
    }

    return null;
  };

  function toNode$1(template) {
    if (isElement(template)) {
      return template;
    } else if (isString(template)) {
      return toNode(template);
    } else {
      throw new Error('Illegal template!');
    }
  }
  /**
   * 基本的DOM操作:增删改查
   */

  /*添加结点*/
  // 在被选元素内部的结尾插入内容


  function append(node) {
    if (this.length > 0) {
      this[0].appendChild(toNode$1(node));
    }

    return this;
  } // 在被选元素内部的开头插入内容


  function prepend(node) {
    if (this.length > 0) {
      this[0].insertBefore(toNode$1(node), this[0].childNodes[0]);
    }

    return this;
  } // 在被选元素之后插入内容


  function after(node) {
    if (this.length > 0) {
      this[0].parentNode.insertBefore(toNode$1(node), this[0].nextSibling);
    }

    return this;
  } // 在被选元素之前插入内容


  function before(node) {
    if (this.length > 0) {
      this[0].parentNode.insertBefore(toNode$1(node), this[0]);
    }

    return this;
  }
  /**
   * 属性操作
   */


  function attr(attr, val) {
    if (arguments.length < 2) {
      return this.length > 0 ? this[0].getAttribute(attr) : undefined;
    }

    for (var i = 0; i < this.length; i++) {
      this[i].setAttribute(attr, val);
    }

    return this;
  }
  /**
   * 返回渲染后的CSS样式值
   * @param {DOM} dom 目标结点
   * @param {String} name 属性名称（可选）
   * @return {String}
   */


  function getStyle(dom, name) {
    // 获取结点的全部样式
    var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle; // 如果没有指定属性名称，返回全部样式

    return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
  }
  /**
   * 样式操作和class相关操作
   * @arguments(key):获取指定样式
   * @arguments(key,value):设置指定样式
   * @arguments():获取全部样式
   * @arguments(json):设置大量样式
   */


  function css() {
    // 获取样式
    if (arguments.length <= 1 && (arguments.length <= 0 || _typeof(arguments[0]) !== 'object')) {
      if (this.length <= 0) return; // 为了获取非style定义的样式，需要使用特殊的方法获取

      return getStyle(this[0], arguments[0]);
    } // 设置样式


    for (var i = 0; i < this.length; i++) {
      if (arguments.length === 1) {
        for (var key in arguments[0]) {
          this[i].style[key] = arguments[0][key];
        }
      } else this[i].style[arguments[0]] = arguments[1];
    }

    return this;
  }
  /**
   * 事件操作
   */
  // 阻止冒泡


  function stopPropagation(event) {
    event = event || window.event;

    if (event.stopPropagation) {
      //这是其他非IE浏览器
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  } // 阻止默认事件


  function preventDefault(event) {
    event = event || window.event;

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  } // 绑定事件


  function bind(eventType, callback) {
    if (window.attachEvent) {
      for (var i = 0; i < this.length; i++) {
        this[i].attachEvent("on" + eventType, callback);
      } // 后绑定的先执行

    } else {
      for (var _i = 0; _i < this.length; _i++) {
        this[_i].addEventListener(eventType, callback, false);
      } // 捕获

    }

    return this;
  } // 解除绑定


  function unbind(eventType, handler) {
    if (window.detachEvent) {
      for (var i = 0; i < this.length; i++) {
        this[i].detachEvent("on" + eventType, handler);
      }
    } else {
      for (var _i2 = 0; _i2 < this.length; _i2++) {
        this[_i2].removeEventListener(eventType, handler, false);
      } // 捕获

    }

    return this;
  } // 触发事件


  function trigger(eventType) {
    var i, event; //创建event的对象实例。

    if (document.createEventObject) {
      // IE浏览器支持fireEvent方法
      event = document.createEventObject();

      for (i = 0; i < this.length; i++) {
        this[i].fireEvent('on' + eventType, event);
      }
    } // 其他标准浏览器使用dispatchEvent方法
    else {
        event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为

        event.initEvent(eventType, true, false);

        for (i = 0; i < this.length; i++) {
          this[i].dispatchEvent(event);
        }
      }

    return this;
  }

  xhtml.prototype.extend({
    // 追加结点
    append: append,
    prepend: prepend,
    after: after,
    before: before,
    // 属性和样式
    attr: attr,
    css: css,
    // DOM事件
    stopPropagation: stopPropagation,
    preventDefault: preventDefault,
    bind: bind,
    unbind: unbind,
    trigger: trigger
  }); // 判断当前环境，如果不是浏览器环境

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = xhtml;
  } // 浏览器环境下
  // 因为浏览器下挂载到window对象上
  // 为了防止覆盖，额外提供一个noConflict方法，用以在覆盖的时候恢复
  else {
      var // 保存之前的xhtml，防止直接覆盖
      _xhtml = window.xhtml;

      xhtml.noConflict = function (deep) {
        // 如果当前的xhtml是被最新的xhtml覆盖的
        // 恢复之前的
        window.xhtml = _xhtml; // 返回当前xhtml
        // 因为调用这个方法以后
        // 全局window下的xhtml是什么
        // 已经不一定了

        return xhtml;
      }; // 挂载库对象到根


      window.xhtml = xhtml;
    }
})();
