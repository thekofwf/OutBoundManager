function _Base() {
}

// 皮肤
_Base._Skin = "bootstrap";
_Base._Skin = "metro";
_Base._Skin = "gray";
_Base._Skin = "black";
_Base._Skin = "default";

_Base._PathResourceImg = "_global/resource/img/";
_Base._PathUploadFile = "upload/";

_Base._load = function() {
	_Base.loadCSS(getHref("_global/baseui/css/" + _Base._Skin + "/baseui.css"));

	_Base.loadCSS(getHref("easyui/themes/" + _Base._Skin + "/easyui.css"));
	_Base.loadCSS(getHref("easyui/themes/icon.css"));

	_Base.loadJS(getHref("easyui/jquery.min.js"));
	_Base.loadJS(getHref("easyui/jquery.easyui.min.js"));
	_Base.loadJS(getHref("easyui/locale/easyui-lang-zh_CN.js"));

	_Base.loadJS(getHref("_global/js/_System.js"));
	_Base.loadJS(getHref("_global/js/_uiBase.js"));
	_Base.loadJS(getHref("_global/js/_uiExtend.js"));
};

_Base.loadCSS = function(url) {
	document.write("<link rel='stylesheet' type='text/css' href='" + url + "' chartset='UTF-8' />");
};

_Base.loadJS = function(url) {
	document.write("<script type='text/javascript'  src='" + url + "' chartset='UTF-8'></script>");
};
