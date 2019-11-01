// 获取鼠标相对元素位置
export function mousePosition(event) {

  // 首先获取元素的位置
  // top、right、bottom和left
  let bounding = this[0].getBoundingClientRect();

  if (!event || !event.clientX)
    throw new Error('Event is necessary!');
  return {

    // 相减获得差值
    "x": event.clientX - bounding.left,
    "y": event.clientY - bounding.top
  };
};

// 获取元素位置
export function offsetPosition() {
  let left = 0, top = 0, dom = this[0];
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
};