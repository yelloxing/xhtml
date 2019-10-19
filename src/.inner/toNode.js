import isElement from '@yelloxing/core.js/isElement';

// 把字符串变成结点
let toNode = function (template) {
  let frame = document.createElement("div");
  frame.innerHTML = template;
  let childNodes = frame.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    if (isElement(childNodes[i])) {
      return childNodes[i];
    }
  }
  return null;
};

import isString from '@yelloxing/core.js/isString';

export default function (template) {
  if (isElement(template)) {
    return template;
  } else if (isString(template)) {
    return toNode(template);
  } else {
    throw new Error('Illegal template!');
  }
};