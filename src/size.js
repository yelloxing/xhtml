import getStyle from './.inner/styles';

// 获取元素大小
export default function (type) {
  let dom = this[0], elemHeight, elemWidth;
  if (type == 'content') { //内容
    elemWidth = dom.clientWidth - ((getStyle(dom, 'padding-left') + "").replace('px', '')) - ((getStyle(dom, 'padding-right') + "").replace('px', ''));
    elemHeight = dom.clientHeight - ((getStyle(dom, 'padding-top') + "").replace('px', '')) - ((getStyle(dom, 'padding-bottom') + "").replace('px', ''));
  } else if (type == 'padding') { //内容+内边距
    elemWidth = dom.clientWidth;
    elemHeight = dom.clientHeight;
  } else if (type == 'border') { //内容+内边距+边框
    elemWidth = dom.offsetWidth;
    elemHeight = dom.offsetHeight;
  } else if (type == 'scroll') { //滚动的宽（不包括border）
    elemWidth = dom.scrollWidth;
    elemHeight = dom.scrollHeight;
  } else {
    elemWidth = dom.offsetWidth;
    elemHeight = dom.offsetHeight;
  }
  return {
    width: elemWidth,
    height: elemHeight
  };
};