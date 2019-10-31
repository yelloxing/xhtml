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

QUnit.test('dom / 查找结点', 7, function () {

  var xhtmlObj = xhtml(document.getElementById('dom-find-frame'));
  var xhtmlObj2 = xhtml(document.getElementById('dom-find'));

  // find
  equal(xhtmlObj.find().length, 8);
  equal(xhtmlObj.find("li").length, 5);
  equal(xhtmlObj.find(function (node) {
    return node.tagName == 'SPAN';
  }).length, 2);

  // parents
  equal(xhtmlObj2.parents(function (node) {
    return node.tagName == 'LI';
  }).length, 0);
  equal(xhtmlObj2.parents(null, function (node) {
    return node.getAttribute('id') == 'dom-find-frame';
  }).length, 2);

  // children
  equal(xhtmlObj.children().length, 2);
  equal(xhtmlObj.children(function (node) {
    return node.tagName == 'SPAN';
  }).length, 1);

});


