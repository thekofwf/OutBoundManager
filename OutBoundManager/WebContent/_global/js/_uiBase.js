var _documentWidth = 0;
var _documentHeight = 0;

var _uib_Position_absolute = "absolute";

function _uibInitialize() {
	_documentWidth = _documentGetWidth();
	_documentHeight = _documentGetHeight();
}

/* global */
function _uibGetObjectById(id) {
	return document.getElementById(id);
}

/* document */
function _documentGetWidth() {
	if (document.documentElement.clientWidth > 0)
		return document.documentElement.clientWidth;
	else if (document.body.clientWidth > 0)
		return document.body.clientWidth;
	else if (document.documentElement.offsetWidth > 0)
		return document.documentElement.offsetWidth - 20;
	else {
		alert("获取界面宽度失败! 返回默认800");
		return 800;
	}
}

function _documentGetHeight() {
	if (document.documentElement.clientHeight > 0)
		return document.documentElement.clientHeight;
	else if (document.body.clientHeight > 0)
		return document.body.clientHeight;
	else if (document.documentElement.offsetHeight > 0)
		return document.documentElement.offsetHeight - 20;
	else {
		alert("获取界面高度失败! 返回默认600");
		return 600;
	}
}

function _uibFocus(id) {
	document.getElementById(id).focus();
}

/* div */
function _divCreate(idDiv, valueClass, sPosition, nLeft, nTop, nWidth, nHeight, colorBackGround, valueOverFlow) {
	var div = document.createElement('div');
	div.id = idDiv;
	div.className = valueClass;
	if (sPosition != "") {
		div.style.position = sPosition;
	}
	if (nLeft > 0) {
		div.style.left = nLeft + 'px';
	}
	if (nTop > 0) {
		div.style.top = nTop + 'px';
	}
	if (nWidth > 0) {
		div.style.width = nWidth;
	}
	if (nHeight > 0) {
		div.style.height = nHeight;
	}
	if (colorBackGround != "") {
		div.style.backgroundColor = colorBackGround;
	}
	if (valueOverFlow != "") {
		div.style.overflow = valueOverFlow;
	}
	return div;
}

function divCreateEx01(idDiv, nLeft, nTop, nWidth, nHeight, borderColor, textAlign) {
	var div = document.createElement('div');
	div.id = idDiv;
	div.style.position = "absolute";
	div.style.verticalAlign = "middle";
	if (nLeft > 0) {
		div.style.left = nLeft + 'px';
	}
	if (nTop > 0) {
		div.style.top = nTop + 'px';
	}
	if (nWidth > 0) {
		div.style.width = nWidth;
	}
	if (nHeight > 0) {
		div.style.height = nHeight;
	}
	if (textAlign != "") {
		div.style.textAlign = textAlign;
	}
	if (borderColor != "") {
		div.style.borderStyle = "solid";
		div.style.borderWidth = "1pt";
		div.style.borderColor = borderColor;
	}
	return div;
}

function _divGetWidth(idDiv) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return 0;

	return div.clientWidth;
}

function _divGetHeight(idDiv) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return 0;

	return div.clientHeight;
}

function _divSetSize(idDiv, width, height) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return;

	if (width != "")
		div.style.width = width + "px";
	if (height != "")
		div.style.height = height + "px";
}

function _divSetPosition(idDiv, position, left, top) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return;

	div.style.position = position;
	div.style.left = left + "px";
	div.style.top = top + "px";
}

function _divMove(idDiv, left, top) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return;

	div.style.position = "absolute";
	div.style.left = left + "px";
	div.style.top = top + "px";
}

function _divShow(idDiv) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return;

	div.style.display = "";
};

function _divHide(idDiv) {
	var div = _uibGetObjectById(idDiv);
	if (div == null)
		return;

	div.style.display = "none";
};

/* iframe */
function _iframeSetSize(idIframe, width, height) {
	var iframe = _uibGetObjectById(idIframe);
	if (iframe == null)
		return;

	iframe.style.width = width + "px";
	iframe.style.height = height + "px";
}

/* img */
function _imgSetSrc(idImg, srcValue) {
	var img = _uibGetObjectById(idImg);
	if (img == null)
		return;

	img.src = srcValue;
	img.style.filter = "";
}

function _imgGetSrc(idImg) {
	var img = _uibGetObjectById(idImg);
	if (img == null)
		return "";

	return img.src;
}

function _imgIsGray(idImg, srcValue) {
	var img = _uibGetObjectById(idImg);
	if (img == null)
		return false;

	if (img.style.filter == "gray" || img.src != srcValue)
		return true;

	return false;
}

function _imgSetGray(idImg) {
	var img = _uibGetObjectById(idImg);
	if (img == null)
		return;

	try {
		img.style.filter = "gray";
	} catch (e) {
	}
	try {
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		var imgW = img.width;
		var imgH = img.height;
		canvas.width = imgW;
		canvas.height = imgH;

		canvasContext.drawImage(img, 0, 0);
		var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

		for ( var y = 0; y < imgPixels.height; y++) {
			for ( var x = 0; x < imgPixels.width; x++) {
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		img.src = canvas.toDataURL();
	} catch (e) {
	}
}

/* checkbox */
function _checkboxIsChecked(idCheckBox) {
	var checkbox = _uibGetObjectById(idCheckBox);
	if (checkbox == null)
		return false;

	return checkbox.checked;
};

function _checkboxSetChecked(idCheckBox, bChecked) {
	var checkbox = _uibGetObjectById(idCheckBox);
	if (checkbox == null)
		return false;

	if (bChecked == "true" || bChecked == true)
		checkbox.checked = true;
	else
		checkbox.checked = false;
};

/* radio */
function _radioGetValue(idRadio) {
	var arr = document.all[idRadio];
	var value = "";
	for ( var i = 0; i < arr.length; i++) {
		if (arr[i].checked) {
			value = arr[i].value;
		}
	}
	return value;
};

/* td */
function _tdSetInnerHTML(idTd, value) {
	var td = _uibGetObjectById(idTd);
	if (td == null)
		return;

	td.innerHTML = value;
}

/* a */
function _aSetInnerHTML(idA, value) {
	var a = _uibGetObjectById(idA);
	if (a == null)
		return;

	a.innerHTML = value;
}
