export default {

  // targetClass中是否包含checkClass
  // 空格分割
  "has": function (targetClass, checkClass) {
    targetClass = " " + targetClass + " ";
    checkClass = " " + checkClass.trim() + " ";

    return targetClass.indexOf(checkClass) > -1;
  },

  "delete": function (targetClass, checkClass) {
    targetClass = " " + targetClass + " ";
    checkClass = " " + checkClass.trim() + " ";

    while (targetClass.indexOf(checkClass) > -1) {
      targetClass = targetClass.replace(checkClass, " ");
    }

    // 最后调整一下
    return targetClass.trim().replace(/ +/g, " ");
  }

};