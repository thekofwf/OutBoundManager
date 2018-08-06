function _Draw() {

}
// 获取X坐标
_Draw._getPositionX = function(div, event) {
	var oDiv = document.getElementById(div);
	var obj = oDiv;
	var parObj = obj;
	var left = obj.offsetLeft;
	while (parObj = parObj.offsetParent) {
		left += parObj.offsetLeft;
	}
	if (event == null)
		return left;
	else
		// return event.clientX - left + document.body.scrollLeft - 2;
		return event.clientX - left + oDiv.scrollLeft - 2;
};
// 获取Y坐标
_Draw._getPositionY = function(div, event) {
	var oDiv = document.getElementById(div);
	var obj = oDiv;
	var parObj = obj;
	var top = obj.offsetTop;
	while (parObj = parObj.offsetParent) {
		top += parObj.offsetTop;
	}
	if (event == null)
		return top;
	else
		// return event.clientY - top + document.body.scrollTop - 2;
		return event.clientY - top + oDiv.scrollTop - 2;
};
// 清空
_Draw._clean = function(div) {
	document.getElementById(div).innerHTML = "";
},
// 添加div
_Draw._addObject = function(div, obj) {
	document.getElementById(div).appendChild(obj);
};
// 移出div
_Draw._removeObject = function(div, id) {
	var obj = document.getElementById(id);
	if (obj != null) {
		document.getElementById(div).removeChild(obj);
	}
};
// 画点
_Draw._drawDot = function(div, x, y, color) {
	// alert("x y " + x + " " + y);
	var dot = document.createElement('div');
	dot.style.position = 'absolute';
	dot.style.left = x + 'px';
	dot.style.top = y + 'px';
	dot.style.fontSize = '1px';
	dot.style.height = 1;
	dot.style.width = 1;
	dot.style.backgroundColor = color;
	dot.style.overflow = "hidden";
	document.getElementById(div).appendChild(dot);
};
// 画线
_Draw._drawLine = function(div, x0, y0, x1, y1, color) {
	// 竖线
	if ((x1 - x0) == 0) {
		for ( var i = ((y1 > y0) ? y0 : y1); i < ((y1 > y0) ? y1 : y0); i++) {
			_Draw._drawDot(div, x1, i, color);
		}
		return;
	}
	// 横线
	if ((y1 - y0) == 0) {
		for ( var i = ((x1 > x0) ? x0 : x1); i < ((x1 > x0) ? x1 : x0); i++) {
			_Draw._drawDot(div, i, y1, color);
		}
		return;
	}
	// 斜线
	// k=斜率，直线方程为y=kx + b
	var k = (y1 - y0) / (x1 - x0);
	if (k <= 1) {
		for ( var i = ((x1 > x0) ? x0 : x1); i < ((x1 > x0) ? x1 : x0); i++) {
			_Draw._drawDot(div, i, k * i + y1 - k * x1, color);
		}
	} else {
		for ( var i = ((y1 > y0) ? y0 : y1); i < ((y1 > y0) ? y1 : y0); i++) {
			_Draw._drawDot(div, (i - y1 + k * x1) / k, i, color);
		}
	}
	return;
};
