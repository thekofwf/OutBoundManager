_Base._load();

function initialize() {
	_uibInitialize();

	_imgSetSrc("imgBackground", getHref(_Base._PathResourceImg + "1001.jpg"));

	_divSetSize("divBackground", _documentWidth, _documentHeight);
	_divSetPosition("divBackground", "absolute", 10, 0);
	_divSetPosition("divLogin", "absolute", (_documentWidth - _divGetWidth("divLogin")) / 2, (_documentHeight - _divGetHeight("divLogin")) / 2);
}

function doLogin() {
	var url = getHref("main/login" + "?userName=" + _uieTextboxGetValue("userName") + "&agentPwd=" + _uieTextboxGetValue("agentPwd"));
	_System._sendReq(url, "post", null, null, handleLogin, handleLogin, null, "");
}
function handleLogin(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null || jObj.result != _System._success) {
			_uieMessagerError("login", jObj.data);
			return;
		}

		_uieTextboxSetValue("agentId", jObj.agentId);

		document.loginForm.action = getHref("work/main");
		document.loginForm.submit();
	} catch (e) {
		alert(e.message);
	}
}
