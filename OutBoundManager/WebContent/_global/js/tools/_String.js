function _String() {

}
// 补齐2位
_String._fixLength = function(a) {
	a = a + "";
	if (a.length < 2)
		return "0" + a;
	else
		return a;
};
// 字符串转换到整形
_String._toInt = function(s) {
	if (s == null || s == "")
		return 0;

	var n = 0;
	try {
		n = parseInt(s);
		return n;
	} catch (e) {
		return n;
	}
};
// 清除html标示
_String._clearStyle = function(s) {
	return s.replace(/<.*?>/g, "");
};
// 高亮关键字
_String._keyHighLight = function(s, keys, style) {
	var strReturn = "<a>" + s + "</a>";
	if (!style) {
		style = "background-color:#FF9632;font-weight:bold;color:black;font-size:16px;";
	}
	for ( var i = 0; i < keys.length; i++) {
		if (keys[i].length == 0) {
			continue;
		}
		var reg = new RegExp(keys[i] + "(?=[^<>]*<)", "ig");// 根据关键字动态生成正则表达式
		strReturn = strReturn.replace(reg, '<span style="' + style + '">' + keys[i] + '</span>');// 根据正则表达式替换
	}
	return strReturn;
};
// 比较字符串
_String._compare = function(s1, s2) {
	if (s1 == s2) {
		return true;
	}
	return false;
};
// 比较字符串,不区分大小写
_String._compareNoCase = function(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	if (s1 == s2) {
		return true;
	}
	return false;
};