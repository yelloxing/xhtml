/**
 * 属性操作
 */

export default function (attr, val) {
  if (arguments.length < 2) {
    return this.length > 0 ? this[0].getAttribute(attr) : undefined;
  }
  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(attr, val);
  }
  return this;
};

import classHelper from './.inner/class';

/**
 * 特殊属性
 * ---------------
 * class
 */

// 判断是否有
export function hasClass(clazz) {
  let oldClazz = this[0].getAttribute('class');
  return classHelper.has(oldClazz, clazz);
};

// 删除
export function removeClass(clazz) {
  let oldClazz = this[0].getAttribute('class');

  // 删除
  let newClazz = classHelper.delete(oldClazz, clazz);

  this[0].setAttribute('class', newClazz);
  return this;
};

// 添加
export function addClass(clazz) {
  let oldClazz = this[0].getAttribute('class');

  if (!classHelper.has(oldClazz, clazz)) {
    this[0].setAttribute('class', oldClazz + " " + clazz);
  }
  return this;
};

// 添加或删除
export function toggerClass(clazz) {
  let oldClazz = this[0].getAttribute('class');

  // 有就删除
  if (classHelper.has(oldClazz, clazz)) {

    let newClazz = classHelper.delete(oldClazz, clazz);
    this[0].setAttribute('class', newClazz);
  }
  // 没有就添加
  else {
    this[0].setAttribute('class', oldClazz + " " + clazz);
  }

  return this;
};