function _System() {

}

_System._success = "success";
_System._error = "error";

_System.xmlHttp = null;
_System.callbackFun = null;

_System._getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
};

_System.createXmlHttpRequest = function() {
	if (window.ActiveXObject) { // IE浏览器
		// IE浏览器（将_XmlHttpRequest对象作为ActiveX对象来创建）
		try {
			_System.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				_System.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}
	if (_System.xmlHttp == null) {
		alert("不能创建_XmlHttpRequest对象");
		return false;
	}
	return true;
};

// 用于发出异步请求的方法
_System._post = function(url, params, callback) {
	_System._sendAjaxRequest(url, params, callback);
	return;

	if (!_System.createXmlHttpRequest()) {
		return;
	}

	_System.callbackFun = callback;
	// 设置一个事件处理器，当_XmlHttp状态发生变化，就会出发该事件处理器，由他调用
	_System.xmlHttp.onreadystatechange = _System.callback;
	if (params == null) {
		_System.xmlHttp.open("GET", url, true);// true表示发出一个异步的请求。
		_System.xmlHttp.send(null);
	} else {
		_System.xmlHttp.open("POST", url, true);
		_System.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
		_System.xmlHttp.send(params);
	}
};

// 指定回调方法
_System.callback = function() {
	try {
		if (_System.xmlHttp.readyState == 4) {
			if (_System.xmlHttp.responseText != null && _System.xmlHttp.responseText != "") {
				if (_System.callbackFun != null) {
					_System.callbackFun(_System.xmlHttp.responseText, _System._success);
				}
			}
		} else if (_System.xmlHttp.readyState == 1) {
			// alert("正在加载连接对象......");
		} else if (_System.xmlHttp.readyState == 2) {
			// alert("连接对象加载完毕。");
		} else if (_System.xmlHttp.readyState == 3) {
			// alert("数据获取中......");
		} else {
			alert("_System.xmlHttp.readyState " + _System.xmlHttp.readyState);
		}
	} catch (e) {
		alert(e);
	}
};

_System._sendAjaxRequest = function(urlName, params, callback) {
	$.ajax({
		type : 'post',
		url : urlName,
		cache : false,
		data : params,
		dataType : 'json',
		success : function(result) {
			callback(result, _System._success);
		},
		error : function(result) {
			callback(result, _System._error);
		}
	});
};

_System._compileJson = function(_json) {
	var obj = null;
	if (_json != null || _json != "") {
		try {
			obj = eval("(" + _json + ")");
		} catch (e) {
		}
	} else {
	}

	return obj;
};

_System._UUID = function() {
	var s = [], itoh = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];
	for ( var i = 0; i < 32; i++)
		s[i] = Math.floor(Math.random() * 0x10);
	s[12] = 4;
	s[16] = (s[16] & 0x3) | 0x8;
	for ( var i = 0; i < 32; i++)
		s[i] = itoh[s[i]];
	return s.join('');
};

_System._fixLength = function(a) {
	a = a + "";
	if (a.length < 2)
		return "0" + a;
	else
		return a;
};

/* datetime */
_System._getCurrentDTL = function() {
	var now = new Date();
	return now.getTime();
};

_System._getDateTime = function(lDateTime) {
	var currentDateTime = "";
	try {
		var now = "";
		if (lDateTime != null && lDateTime != 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}

		currentDateTime = now.getFullYear() + "-" + _System._fixLength(now.getMonth() + 1) + "-" + _System._fixLength(now.getDate()) + " " + _System._fixLength(now.getHours()) + ":"
				+ _System._fixLength(now.getMinutes()) + ":" + _System._fixLength(now.getSeconds());
		return currentDateTime;
	} catch (e) {
		return currentDateTime;
	}
};

_System._getDate = function(lDateTime) {
	var currentDate = "";
	try {
		var now = "";
		if (lDateTime == null || parseInt(lDateTime) > 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}
		currentDate = now.getFullYear() + "-" + _System._fixLength(now.getMonth() + 1) + "-" + _System._fixLength(now.getDate());
		return currentDate;
	} catch (e) {
		return currentDate;
	}
};

_System._getTime = function(lDateTime) {
	var currentTime = "";
	try {
		var now = "";
		if (lDateTime == null || lDateTime == 0) {
			now = new Date(parseInt(lDateTime));
		} else {
			now = new Date();
		}
		currentTime = _System._fixLength(now.getHours()) + ":" + _System._fixLength(now.getMinutes()) + ":" + _System._fixLength(now.getSeconds());
		return currentTime;
	} catch (e) {
		return currentTime;
	}
};

/* api */
_System._getAgentId = function() {
	if (parent && parent.apiGetAgentId) {
		return parent.apiGetAgentId();
	} else if (apiGetAgentId) {
		return apiGetAgentId();
	}

	return "";
};

_System._getAgentNo = function() {
	if (parent && parent.apiGetAgentNo) {
		return parent.apiGetAgentNo();
	} else if (apiGetAgentNo) {
		return apiGetAgentNo();
	}

	return "";
};

_System._getAgentName = function() {
	if (parent && parent.apiGetAgentName) {
		return parent.apiGetAgentName();
	} else if (apiGetAgentName) {
		return apiGetAgentName();
	}

	return "";
};

_System._getExtNumber = function() {
	if (parent && parent.apiGetExtNumber) {
		return parent.apiGetExtNumber();
	} else if (apiGetExtNumber) {
		return apiGetExtNumber();
	}

	return "";
};

_System._getCallId = function() {
	if (parent && parent.apiGetCallId) {
		return parent.apiGetCallId();
	} else if (apiGetCallId) {
		return apiGetCallId();
	}

	return "";
};

_System._setCallId = function(callId) {
	if (parent && parent.apiSetCallId) {
		return parent.apiSetCallId(callId);
	} else if (apiSetCallId) {
		return apiSetCallId(callId);
	}

	return "";
};

_System._getRecordId = function() {
	if (parent && parent.apiGetRecordId) {
		return parent.apiGetRecordId();
	} else if (apiGetRecordId) {
		return apiGetRecordId();
	}

	return "";
};

_System._setRecordId = function(recordId) {
	if (parent && parent.apiSetRecordId) {
		return parent.apiSetRecordId(recordId);
	} else if (apiSetRecordId) {
		return apiSetRecordId(recordId);
	}

	return "";
};

_System._dialOut = function(dnis, uui, uei) {
	if (parent && parent.apiDialOut) {
		return parent.apiDialOut(dnis, uui, uei);
	} else if (apiDialOut) {
		return apiDialOut(dnis, uui, uei);
	}
	return "-1";
};

_System._addTab = function(id, title, action) {
	if (parent && parent.apiAddTab) {
		parent.apiAddTab(id, title, action);
	} else if (apiAddTab) {
		apiAddTab(id, title, action);
	}
};

_System._getIndexCasepaper = function() {
	if (parent && parent.apiGetIndexCasepaper) {
		return parent.apiGetIndexCasepaper();
	} else if (apiGetIndexCasepaper) {
		return apiGetIndexCasepaper();
	}
};

_System._createSetHeader = function(headers) {
	return function(xhr) {
		var header = null;
		if (headers) {
			for (header in headers) {
				if (headers.hasOwnProperty(header)) {
					xhr.setRequestHeader(header, headers[header]);
				}
			}
		}
	};
};

_System._createSuccessHandler = function(handler) {
	return function(data, statusText, xhr) {
		if (handler) {
			handler(_System._success, data, statusText, xhr);
		}
	};
};

_System._createErrorHandler = function(errHandler) {
	return function(xhr, statusText, err) {
		if (errHandler) {
			errHandler(_System._error, err, statusText, xhr);
		}
	};
};

_System._sendReq = function(url, method, headers, params, handler, errHandler, cache, xml) {
	var xhrArgs;
	if (method === "get" || method === "GET") {
		xhrArgs = {
			url : url,
			type : method,
			contentType : "application/xml",
			accept : "application/json;q=0.9,*/*;q=0.8",
			// added processData: false to not send data on url
			processData : false,
			beforeSend : _System._createSetHeader(headers),
			success : _System._createSuccessHandler(handler),
			error : _System._createErrorHandler(errHandler),
			cache : cache
		};
	} else {
		xhrArgs = {
			url : url,
			type : method,
			contentType : "application/xml",
			accept : "application/json;q=0.9,*/*;q=0.8",
			data : xml,
			// added processData: false to not send data on url
			processData : false,
			beforeSend : _System._createSetHeader(headers),
			success : _System._createSuccessHandler(handler),
			error : _System._createErrorHandler(errHandler),
			cache : cache
		};
	}

	jQuery.ajax(xhrArgs);
};
