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