import concat from '@yelloxing/core.js/concat';
import isElement from '@yelloxing/core.js/isElement';
import isObject from '@yelloxing/core.js/isObject';

let xhtml = function (...nodes) {
  return new xhtml.prototype.init(nodes);
};

xhtml.prototype.init = function (nodes) {

  nodes = concat(...nodes);
  this.length = 0;

  for (let i = 0; i < nodes.length; i++) {
    if (isElement(nodes[i])) {
      this[this.length] = nodes[i];
      this.length += 1;
    };
  }
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

export default xhtml;
