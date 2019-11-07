QUnit.test('结点尺寸size', 4, function () {

  var xhtmlObj = xhtml(document.getElementById('size-frame'));

  equal(xhtmlObj.size('content').height, 70);
  equal(xhtmlObj.size('padding').height, 90);
  equal(xhtmlObj.size('border').height, 110);

  // 获取浏览器210，这里通不过（待思考）
  equal(xhtmlObj.size('scroll').height, 220);

});
