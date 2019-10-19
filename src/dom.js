/**
 * 基本的DOM操作:增删改查
 */

import toNode from './.inner/toNode';

/*添加结点*/

// 在被选元素内部的结尾插入内容
export function append(node) {
  if (this.length > 0) {
    this[0].appendChild(toNode(node));
  }
  return this;
};

// 在被选元素内部的开头插入内容
export function prepend(node) {
  if (this.length > 0) {
    this[0].insertBefore(toNode(node), this[0].childNodes[0]);
  }
  return this;
};

// 在被选元素之后插入内容
export function after(node) {
  if (this.length > 0) {
    this[0].parentNode.insertBefore(toNode(node), this[0].nextSibling);
  }
  return this;
};

// 在被选元素之前插入内容
export function before(node) {
  if (this.length > 0) {
    this[0].parentNode.insertBefore(toNode(node), this[0]);
  }
  return this;
};