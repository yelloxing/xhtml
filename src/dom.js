/**
 * 基本的DOM操作:增删改查
 */

import toNode from './.inner/toNode';
import isFunction from '@yelloxing/core.js/isFunction';
import isElement from '@yelloxing/core.js/isElement';

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

/*查找结点*/

// 寻找后代结点
export function find(tagName, checkback) {
  if (isFunction(tagName) || arguments.length < 1) {
    checkback = tagName;
    tagName = "*";
  }

  let nodes = this[0].getElementsByTagName(tagName);

  // 如果没有传递筛选函数，全部通过
  if (!isFunction(checkback)) {
    return this.new(nodes);
  }
  let xhtmlObj = this.new();

  for (let i = 0; i < nodes.length; i++) {
    if (checkback(nodes[i])) {
      xhtmlObj[xhtmlObj.length++] = nodes[i];
    }
  }

  return xhtmlObj;
};

// 寻找祖宗结点
export function parents(checkback, stopback) {

  let nodes = [], node = this[0].parentNode;

  // 如果当前面对的是结点，继续
  while (isElement(node)) {

    // 检测是否合格
    if (!isFunction(checkback) || checkback(node)) {
      nodes.push(node);
    }

    // 判断是否需要继续向上查找
    if (isFunction(stopback) && stopback(node)) {
      break;
    }

    node = node.parentNode;
  }

  return this.new(nodes);
};

// 寻找孩子结点
export function children(checkback) {

  let nodes = this[0].childNodes, xhtmlObj = this.new();

  for (let i = 0; i < nodes.length; i++) {
    if (isElement(nodes[i]) && (!isFunction(checkback) || checkback(nodes[i]))) {
      xhtmlObj[xhtmlObj.length++] = nodes[i];
    }
  }

  return xhtmlObj;
};