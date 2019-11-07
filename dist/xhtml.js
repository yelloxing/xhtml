
/*!
* xhtml.js - 🦑 常用的html操作集合。Common set of html operations.
* git+https://github.com/yelloxing/xhtml.js.git
*
* author 心叶
*
* version 1.1.1
*
* build Sat Oct 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Thu Nov 07 2019 16:34:34 GMT+0800 (GMT+08:00)
*/

"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
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
  /*查找结点*/
  // 寻找后代结点


  function find(tagName, checkback) {
    if (isFunction(tagName) || arguments.length < 1) {
      checkback = tagName;
      tagName = "*";
    }

    var nodes = this[0].getElementsByTagName(tagName); // 如果没有传递筛选函数，全部通过

    if (!isFunction(checkback)) {
      return this["new"](nodes);
    }

    var xhtmlObj = this["new"]();

    for (var i = 0; i < nodes.length; i++) {
      if (checkback(nodes[i])) {
        xhtmlObj[xhtmlObj.length++] = nodes[i];
      }
    }

    return xhtmlObj;
  } // 寻找祖宗结点


  function parents(checkback, stopback) {
    var nodes = [],
        node = this[0].parentNode; // 如果当前面对的是结点，继续

    while (isElement(node)) {
      // 检测是否合格
      if (!isFunction(checkback) || checkback(node)) {
        nodes.push(node);
      } // 判断是否需要继续向上查找


      if (isFunction(stopback) && stopback(node)) {
        break;
      }

      node = node.parentNode;
    }

    return this["new"](nodes);
  } // 寻找孩子结点


  function children(checkback) {
    var nodes = this[0].childNodes,
        xhtmlObj = this["new"]();

    for (var i = 0; i < nodes.length; i++) {
      if (isElement(nodes[i]) && (!isFunction(checkback) || checkback(nodes[i]))) {
        xhtmlObj[xhtmlObj.length++] = nodes[i];
      }
    }

    return xhtmlObj;
  } // 获取当前指定序号的结点


  function eq(index) {
    var xhtmlObj = this["new"](); // 如果知道的序号存在

    if (this.length > index) {
      xhtmlObj[0] = this[index];
      xhtmlObj.length = 1;
    }

    return xhtmlObj;
  }
  /*删除结点*/
  // 删除当前结点


  function remove() {
    for (var i = 0; i < this.length; i++) {
      this[i].parentNode.removeChild(this[i]);
    }

    return this;
  }

  var classHelper = {
    // targetClass中是否包含checkClass
    // 空格分割
    "has": function has(targetClass, checkClass) {
      targetClass = " " + targetClass + " ";
      checkClass = " " + checkClass.trim() + " ";
      return targetClass.indexOf(checkClass) > -1;
    },
    "delete": function _delete(targetClass, checkClass) {
      targetClass = " " + targetClass + " ";
      checkClass = " " + checkClass.trim() + " ";

      while (targetClass.indexOf(checkClass) > -1) {
        targetClass = targetClass.replace(checkClass, " ");
      } // 最后调整一下


      return targetClass.trim().replace(/ +/g, " ");
    }
  };
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
   * 特殊属性
   * ---------------
   * class
   */
  // 判断是否有


  function hasClass(clazz) {
    var oldClazz = this[0].getAttribute('class');
    return classHelper.has(oldClazz, clazz);
  } // 删除


  function removeClass(clazz) {
    var oldClazz = this[0].getAttribute('class'); // 删除

    var newClazz = classHelper["delete"](oldClazz, clazz);
    this[0].setAttribute('class', newClazz);
    return this;
  } // 添加


  function addClass(clazz) {
    var oldClazz = this[0].getAttribute('class');

    if (!classHelper.has(oldClazz, clazz)) {
      this[0].setAttribute('class', oldClazz + " " + clazz);
    }

    return this;
  } // 添加或删除


  function toggerClass(clazz) {
    var oldClazz = this[0].getAttribute('class'); // 有就删除

    if (classHelper.has(oldClazz, clazz)) {
      var newClazz = classHelper["delete"](oldClazz, clazz);
      this[0].setAttribute('class', newClazz);
    } // 没有就添加
    else {
        this[0].setAttribute('class', oldClazz + " " + clazz);
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
   * 样式操作
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
  } // 获取元素大小


  function size(type) {
    var dom = this[0],
        elemHeight,
        elemWidth;

    if (type == 'content') {
      //内容
      elemWidth = dom.clientWidth - (getStyle(dom, 'padding-left') + "").replace('px', '') - (getStyle(dom, 'padding-right') + "").replace('px', '');
      elemHeight = dom.clientHeight - (getStyle(dom, 'padding-top') + "").replace('px', '') - (getStyle(dom, 'padding-bottom') + "").replace('px', '');
    } else if (type == 'padding') {
      //内容+内边距
      elemWidth = dom.clientWidth;
      elemHeight = dom.clientHeight;
    } else if (type == 'border') {
      //内容+内边距+边框
      elemWidth = dom.offsetWidth;
      elemHeight = dom.offsetHeight;
    } else if (type == 'scroll') {
      //滚动的宽（不包括border）
      elemWidth = dom.scrollWidth;
      elemHeight = dom.scrollHeight;
    } else {
      elemWidth = dom.offsetWidth;
      elemHeight = dom.offsetHeight;
    }

    return {
      width: elemWidth,
      height: elemHeight
    };
  } // 获取鼠标相对元素位置


  function mousePosition(event) {
    // 首先获取元素的位置
    // top、right、bottom和left
    var bounding = this[0].getBoundingClientRect();
    if (!event || !event.clientX) throw new Error('Event is necessary!');
    return {
      // 相减获得差值
      "x": event.clientX - bounding.left,
      "y": event.clientY - bounding.top
    };
  } // 获取元素位置


  function offsetPosition() {
    var left = 0,
        top = 0,
        dom = this[0];
    top = dom.offsetTop;
    left = dom.offsetLeft;
    dom = dom.offsetParent;

    while (dom) {
      top += dom.offsetTop;
      left += dom.offsetLeft;
      dom = dom.offsetParent;
    }

    return {
      "left": left,
      "top": top
    };
  }

  xhtml.prototype.extend({
    // 追加结点
    append: append,
    prepend: prepend,
    after: after,
    before: before,
    // 查找结点
    find: find,
    parents: parents,
    children: children,
    eq: eq,
    // 删除结点
    remove: remove,
    // 属性和样式
    attr: attr,
    css: css,
    // class
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggerClass: toggerClass,
    // DOM事件
    bind: bind,
    unbind: unbind,
    trigger: trigger,
    // 元素大小
    size: size,
    // 位置
    mousePosition: mousePosition,
    offsetPosition: offsetPosition
  });
  xhtml.extend({
    // DOM事件
    stopPropagation: stopPropagation,
    preventDefault: preventDefault
  }); // 用于内部建立对象方法

  xhtml.prototype["new"] = function () {
    for (var _len3 = arguments.length, nodes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      nodes[_key3] = arguments[_key3];
    }

    return _construct(xhtml, nodes);
  }; // 判断当前环境，如果不是浏览器环境


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
