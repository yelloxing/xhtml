import getStyle from './.inner/styles';

/**
 * 样式操作和class相关操作
 * @arguments(key):获取指定样式
 * @arguments(key,value):设置指定样式
 * @arguments():获取全部样式
 * @arguments(json):设置大量样式
 */
export default function () {

  // 获取样式
  if (arguments.length <= 1 && (arguments.length <= 0 || typeof arguments[0] !== 'object')) {
    if (this.length <= 0) return;

    // 为了获取非style定义的样式，需要使用特殊的方法获取
    return getStyle(this[0], arguments[0]);
  }

  // 设置样式
  for (let i = 0; i < this.length; i++) {
    if (arguments.length === 1) {
      for (let key in arguments[0])
        this[i].style[key] = arguments[0][key];
    } else this[i].style[arguments[0]] = arguments[1];
  }

  return this;
};
