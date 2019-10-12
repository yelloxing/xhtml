
/*!
* xhtml.js - 🦑 常用的html操作集合。Common set of html operations.
* git+https://github.com/yelloxing/xhtml.js.git
*
* author 心叶
*
* version 0.1.4
*
* build Sat Oct 21 2019
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sat Oct 12 2019 14:28:48 GMT+0800 (GMT+08:00)
*/

(function () {
    'use strict';

    const MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * 判断是不是一个可以作为长度的整数（比如数组下标）
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isLength (value) {

        return typeof value == 'number' &&
            value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;

    }

    /**
     * 判断是不是一个类似数组的对象，是否可以通过length迭代
     *
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isArrayLike (value) {

        return value != null && typeof value != 'function' && isLength(value.length);

    }

    const toString = Object.prototype.toString;

    /**
     * 获取一个值的类型字符串[object type]
     *
     * @private
     * @param {*} value 需要返回类型的值
     * @returns {string} 返回类型字符串
     */
    function getType (value) {
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
    function isString (value) {
        const type = typeof value;
        return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]');
    }

    /**
     * 和isArrayLike类似，不过特别排除以下类型：
     *  1.字符串
     *
     * @private
     * @param {any} value 需要判断的值
     * @returns {boolean} 如果是返回true，否则返回false
     */

    function isArraySpec (value) {

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
    let concat = function (newArray, values) {
        for (let i = 0; i < values.length; i++) {
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

    function concat$1 (...values) {

        let newArray = [];
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

    function isPlainObject (value) {
        if (value === null || typeof value !== 'object' || getType(value) != '[object Object]') {
            return false;
        }

        // 如果原型为null
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }

        let proto = value;
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
    function isElement (value) {
        return value !== null && typeof value === 'object' &&
            (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) &&
            !isPlainObject(value);
    }

    let xhtml = function (...nodes) {
      return new xhtml.prototype.init(nodes);
    };

    xhtml.prototype.init = function (nodes) {

      nodes = concat$1(...nodes);
      this.length = 0;

      for (let i = 0; i < nodes.length; i++) {
        if (isElement(nodes[i])) {
          this[this.length] = nodes[i];
          this.length += 1;
        }  }
      return this;
    };

    // 扩展方法
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
      for (let key in source) {
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

    xhtml.prototype.init.prototype = xhtml.prototype;

    // 判断当前环境，如果不是浏览器环境
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = xhtml;
    }
    // 浏览器环境下
    // 因为浏览器下挂载到window对象上
    // 为了防止覆盖，额外提供一个noConflict方法，用以在覆盖的时候恢复
    else {
      let
        // 保存之前的xhtml，防止直接覆盖
        _xhtml = window.xhtml;

      xhtml.noConflict = function (deep) {

        // 如果当前的xhtml是被最新的xhtml覆盖的
        // 恢复之前的

        window.xhtml = _xhtml;

        // 返回当前xhtml
        // 因为调用这个方法以后
        // 全局window下的xhtml是什么
        // 已经不一定了
        return xhtml;

      };
      // 挂载库对象到根
      window.xhtml = xhtml;
    }

}());
