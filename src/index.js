import xhtml from './xhtml';

import { append, prepend, after, before, find, parents, children, eq, remove } from './dom';
import attr, { hasClass, addClass, removeClass, toggerClass } from './attribute';
import css from './style';
import { stopPropagation, preventDefault, bind, unbind, trigger } from './event';
import size from './size';
import { mousePosition, offsetPosition } from './position';

xhtml.prototype.extend({

  // 追加结点
  append, prepend, after, before,

  // 查找结点
  find, parents, children, eq,

  // 删除结点
  remove,

  // 属性和样式
  attr, css,

  // class
  hasClass, addClass, removeClass, toggerClass,

  // DOM事件
  bind, unbind, trigger,

  // 元素大小
  size,

  // 位置
  mousePosition, offsetPosition

});

xhtml.extend({

  // DOM事件
  stopPropagation, preventDefault

});

// 用于内部建立对象方法
xhtml.prototype.new = function (...nodes) {
  return new xhtml(...nodes);
};

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
