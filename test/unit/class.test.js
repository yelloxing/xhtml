QUnit.test('dom / class', 6, function () {

  var xhtmlObj = xhtml(document.getElementById('class-frame'));

  // 判断
  equal(xhtmlObj.hasClass('cls1'), true);
  equal(xhtmlObj.hasClass('cls4'), false);

  // 删除
  xhtmlObj.removeClass('cls1');
  equal(xhtmlObj.hasClass('cls1'), false);

  // 添加
  xhtmlObj.addClass('cls1');
  equal(xhtmlObj.hasClass('cls1'), true);


  // 切换
  xhtmlObj.toggerClass('cls7');
  equal(xhtmlObj.hasClass('cls7'), true);

  xhtmlObj.toggerClass('cls7');
  equal(xhtmlObj.hasClass('cls7'), false);

});