QUnit.test('dom / 追加结点', 4, function () {

  var xhtmlObj = xhtml(document.getElementById('dom-add'));
  xhtmlObj.append("<em>append</em>");
  equal(document.getElementById('dom-add-frame').innerText.replace(/[\n\t\r\f\x20]/g, ''), '原始结点append');

  xhtmlObj.prepend("<em>prepend</em>");
  equal(document.getElementById('dom-add-frame').innerText.replace(/[\n\t\r\f\x20]/g, ''), 'prepend原始结点append');

  xhtmlObj.after("<em>after</em>");
  equal(document.getElementById('dom-add-frame').innerText.replace(/[\n\t\r\f\x20]/g, ''), 'prepend原始结点appendafter');

  xhtmlObj.before("<em>before</em>");
  equal(document.getElementById('dom-add-frame').innerText.replace(/[\n\t\r\f\x20]/g, ''), 'beforeprepend原始结点appendafter');

});
