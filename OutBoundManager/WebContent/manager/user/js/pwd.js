_Base._load();

var IdDataGrid_Users = "tableDataGridUsers";

var IdWindow_UserAdd = "divWindowUserAdd";

var IdSelect_User = "";

function initialize() {
	// 整体初始化
	_uibInitialize();

	_divSetPosition("divChangePwd", "absolute", (_documentWidth - _divGetWidth("divChangePwd")) / 2, (_documentHeight - _divGetHeight("divChangePwd")) / 2);
}

// 重置用户密码
function doChangePwd() {
	var userPwdNew1 = _uieTextboxGetValue("userPwdNew1");
	var userPwdNew2 = _uieTextboxGetValue("userPwdNew2");
	if (userPwdNew1 == "" || userPwdNew2 == "" || userPwdNew1 != userPwdNew2) {
		_uieMessagerError("修改密码", "新密码不一致！");
		return;
	}
	_uieMessagerConfirm("修改密码确认", "确定修改密码？", funChangePwd);
}
function funChangePwd() {
	var agentId = parent.apiGetAgentId();
	var userPwdOld = _uieTextboxGetValue("userPwdOld");
	var userPwdNew = _uieTextboxGetValue("userPwdNew1");
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userPwdOld=" + encodeURIComponent(userPwdOld);
	params += "&userPwdNew=" + encodeURIComponent(userPwdNew);
	var url = getHref("user/changePwd" + "?" + params);
	_System._sendReq(url, "post", null, null, handleChangePwd, handleChangePwd, null, "");
}
function handleChangePwd(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("修改密码", "成功");
		} else {
			_uieMessagerError("修改密码", "失败 " + jObj.data);
		}

	} catch (e) {
		alert(e.message);
	}
}
