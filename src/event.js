/**
 * 事件操作
 */

// 阻止冒泡
export function stopPropagation(event) {
  event = event || window.event;
  if (event.stopPropagation) { //这是其他非IE浏览器
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};

// 阻止默认事件
export function preventDefault(event) {
  event = event || window.event;
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};

// 绑定事件
export function bind(eventType, callback) {

  if (window.attachEvent) {
    for (let i = 0; i < this.length; i++)
      this[i].attachEvent("on" + eventType, callback); // 后绑定的先执行
  } else {
    for (let i = 0; i < this.length; i++)
      this[i].addEventListener(eventType, callback, false);// 捕获
  }

  return this;
};

// 解除绑定
export function unbind(eventType, handler) {
  if (window.detachEvent) {
    for (let i = 0; i < this.length; i++)
      this[i].detachEvent("on" + eventType, handler);
  } else {
    for (let i = 0; i < this.length; i++)
      this[i].removeEventListener(eventType, handler, false);// 捕获
  }

  return this;
};

// 触发事件
export function trigger(eventType) {
  let i, event;

  //创建event的对象实例。
  if (document.createEventObject) {
    // IE浏览器支持fireEvent方法
    event = document.createEventObject();
    for (i = 0; i < this.length; i++) {
      this[i].fireEvent('on' + eventType, event);
    }
  }

  // 其他标准浏览器使用dispatchEvent方法
  else {
    event = document.createEvent('HTMLEvents');
    // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
    event.initEvent(eventType, true, false);
    for (i = 0; i < this.length; i++) {
      this[i].dispatchEvent(event);
    }
  }

  return this;
};