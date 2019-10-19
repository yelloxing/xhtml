QUnit.test('event', 4, function () {

  var xhtmlObj = xhtml(document.getElementById('dom-event'));
  equal(document.getElementById('dom-event').innerText.replace(/[\n\t\r\f\x20]/g, ''), "");

  var doIt = function () {
    this.innerText = this.innerText + 'click';
  };

  xhtmlObj.bind('click', doIt);

  xhtmlObj.trigger('click');
  equal(document.getElementById('dom-event').innerText.replace(/[\n\t\r\f\x20]/g, ''), "click");
  xhtmlObj.trigger('click');
  equal(document.getElementById('dom-event').innerText.replace(/[\n\t\r\f\x20]/g, ''), "clickclick");

  xhtmlObj.unbind('click', doIt);

  xhtmlObj.trigger('click');
  equal(document.getElementById('dom-event').innerText.replace(/[\n\t\r\f\x20]/g, ''), "clickclick");


});
