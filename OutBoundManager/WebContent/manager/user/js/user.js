_Base._load();

var IdDataGrid_Users = "tableDataGridUsers";
var IdDataGrid_Applications = "tableDataGridApplications";

var IdWindow_UserAdd = "divWindowUserAdd";
var IdWindow_UserEdit = "divWindowUserEdit";

var IdSelect_User = "";

function initialize() {
	// 整体初始化
	_uibInitialize();

	{
		// 列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		// frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 100, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryUsers);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("添加", "icon-add", showWinUserAdd);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("修改", "icon-edit", showWinUserEdit);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("重置密码", "icon-undo", doResetUserPwd);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("删除", "icon-remove", doDeleteUser);
		toolbarButtons[index++] = "-";

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("userName", "名称", false, 300, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("userLevel", "级别", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("maxConcurrent", "并发数量", false, 200, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Users, "", "icon-search", true, true, "userName", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Users, onClickRowUser);
		_uieDataGridPaginationInitialize(IdDataGrid_Users, doQueryUsers);

		_uieDataGridResize(IdDataGrid_Users);
	}

	{
		// 列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryApplications);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("更新", "icon-edit", doUpdateUserApplications);

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("name", "名称", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("status", "状态", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("description", "描述", false, 200, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Applications, "", "icon-search", false, true, "id", toolbarButtons, frozenColumns, columns);
		_uieDataGridPaginationInitialize(IdDataGrid_Applications, doQueryApplications);

		_uieDataGridResize(IdDataGrid_Applications);
	}

	doQueryApplications();
	doQueryUsers();
}

function onClickRowUser(rowIndex, rowData) {
	IdSelect_User = rowData["userName"];

	doQueryUserApplications();
}
function doQueryUserApplications() {
	_uieDataGridUnselectAllRows(IdDataGrid_Applications);

	if (IdSelect_User == "") {
		return;
	}

	var params = "userName=" + encodeURIComponent(IdSelect_User);
	var url = getHref("user/applications" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryUserApplications, handleQueryUserApplications, null, "");
}
function handleQueryUserApplications(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var list = listReturn[0];

			if (list && list.length) {
				for ( var i = 0; i < list.length; i++) {
					var userApplication = list[i];

					_uieDataGridSetRowSelect(IdDataGrid_Applications, userApplication.applicationId);
				}
			}
		} else {
			_uieMessagerError("查询用户应用信息异常", jObj.data);
		}
	} catch (e) {
		alert(e.message);
	}
}

function doQueryUsers() {
	IdSelect_User = "";
	_uieDataGridUnselectAllRows(IdDataGrid_Applications);

	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Users);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Users);

	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("user/users" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryUsers, handleQueryUsers, null, "");
}
function handleQueryUsers(result, data, statusText, xhr) {
	_uieDataGridDeleteAllRows(IdDataGrid_Users);

	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var map = listReturn[0];
			var list = listReturn[1];

			var first = map.first;
			var last = map.last;
			for ( var i = first; i <= last; i++) {
				var user = list[i - first];
				var row = new Array();
				row["no"] = i;
				row["userName"] = user.userName;
				if (user.userLevel == "0") {
					row["userLevel"] = "删除";
				} else if (user.userLevel == "11") {
					row["userLevel"] = "管理员";
				} else if (user.userLevel == "21") {
					row["userLevel"] = "用户";
				}
				row["maxConcurrent"] = user.maxConcurrent;

				_uieDataGridAppendRow(IdDataGrid_Users, row);
			}

			_uieDataGridPaginationRefresh(IdDataGrid_Users, parseInt(map.count), parseInt(map.pageNumber));
		} else {
			_uieMessagerError("查询用户异常", jObj.data);
		}
	} catch (e) {
		alert(e.message);
	}
}

// 显示增加用户窗口
function showWinUserAdd() {
	_uieTextboxSetValue("userNameNew", "");
	_uieComboboxSetSelectByIndex("userLevelNew", 1);
	_uieNumberboxSetValue("maxConcurrentNew", 0);
	_divShow(IdWindow_UserAdd);
	_uieWindowCreate(IdWindow_UserAdd, "添加用户", "icon-add", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_UserAdd);
}

// 增加用户
function doAddUser() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&userName=" + encodeURIComponent(_uieTextboxGetValue("userNameNew"));
	params += "&userLevel=" + encodeURIComponent(_uieComboboxGetValue("userLevelNew"));
	params += "&maxConcurrent=" + encodeURIComponent(_uieNumberboxGetValue("maxConcurrentNew"));
	var url = getHref("user/add" + "?" + params);
	_System._sendReq(url, "post", null, null, handleAddUser, handleAddUser, null, "");
}
function handleAddUser(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("添加用户", "成功");
		} else {
			_uieMessagerError("添加用户", "失败");
		}

		doQueryUsers();
	} catch (e) {
		alert(e.message);
	}
}

// 显示修改用户窗口
function showWinUserEdit() {
	if (IdSelect_User == "") {
		_uieMessagerAlert("修改", "请选择用户!");
		return;
	}

	_uieNumberboxSetValue("maxConcurrentEdit", _uieDataGridGetColumnValue(IdDataGrid_Users, IdSelect_User, "maxConcurrent"));
	_divShow(IdWindow_UserEdit);
	_uieWindowCreate(IdWindow_UserEdit, "修改用户", "icon-add", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_UserEdit);
}

// 修改用户
function doEditUser() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&userName=" + encodeURIComponent(IdSelect_User);
	params += "&maxConcurrent=" + encodeURIComponent(_uieNumberboxGetValue("maxConcurrentEdit"));
	var url = getHref("user/save" + "?" + params);
	_System._sendReq(url, "post", null, null, handleEditUser, handleEditUser, null, "");
}
function handleEditUser(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("修改用户", "成功");
		} else {
			_uieMessagerError("修改用户", "失败");
		}

		doQueryUsers();
	} catch (e) {
		alert(e.message);
	}
}

// 重置用户密码
function doResetUserPwd() {
	if (IdSelect_User == "") {
		_uieMessagerAlert("重置", "请选择用户!");
		return;
	}

	_uieMessagerConfirm("重置确认", "确定重置？" + IdSelect_User, funResetUserPwd);
}
function funResetUserPwd() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&userName=" + encodeURIComponent(IdSelect_User);
	var url = getHref("user/resetPwd" + "?" + params);
	_System._sendReq(url, "post", null, null, handleResetUserPwd, handleResetUserPwd, null, "");
}
function handleResetUserPwd(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("重置密码", "成功");
		} else {
			_uieMessagerError("重置密码", "失败");
		}

		doQueryUsers();
	} catch (e) {
		alert(e.message);
	}
}

// 删除用户
function doDeleteUser() {
	if (IdSelect_User == "") {
		_uieMessagerAlert("删除", "请选择用户!");
		return;
	}

	_uieMessagerConfirm("删除确认", "确定删除？" + IdSelect_User, funDeleteUser);
}
function funDeleteUser() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&userName=" + encodeURIComponent(IdSelect_User);
	var url = getHref("user/delete" + "?" + params);
	_System._sendReq(url, "post", null, null, handleDeleteUser, handleDeleteUser, null, "");
}
function handleDeleteUser(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("删除用户", "成功");
		} else {
			_uieMessagerError("删除用户", "失败");
		}

		doQueryUsers();
	} catch (e) {
		alert(e.message);
	}
}

function doQueryApplications() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Applications);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Applications);

	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("application/applications" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryApplications, handleQueryApplications, null, "");
}
function handleQueryApplications(result, data, statusText, xhr) {
	_uieDataGridDeleteAllRows(IdDataGrid_Applications);

	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var map = listReturn[0];
			var list = listReturn[1];

			var first = map.first;
			var last = map.last;
			for ( var i = first; i <= last; i++) {
				var application = list[i - first];
				var row = new Array();
				row["no"] = i;
				row["id"] = application.id;
				row["name"] = application.name;
				row["status"] = _Const_Application._getStatusName(application.status);
				row["description"] = application.description;

				_uieDataGridAppendRow(IdDataGrid_Applications, row);
			}

			_uieDataGridPaginationRefresh(IdDataGrid_Applications, parseInt(map.count), parseInt(map.pageNumber));

			doQueryUserApplications();
		} else {
			_uieMessagerError("查询应用异常", jObj.data);
		}
	} catch (e) {
		alert(e.message);
	}
}

function doUpdateUserApplications() {
	if (IdSelect_User == "") {
		_uieMessagerAlert("更新", "请选择用户!");
		return;
	}

	var nCount = _uieDataGridPaginationGetPageSize(IdDataGrid_Applications);
	var deleteIds = "";
	var addIds = "";
	for ( var i = 0; i < nCount; i++) {
		var id = _uieDataGridGetColumnValueByIndex(IdDataGrid_Applications, i, "id");
		if (id == "")
			continue;

		deleteIds += id + _Const._stringSplitDefault;
		if (_uieDataGridIsRowSelected(IdDataGrid_Applications, "id", id)) {
			addIds += id + _Const._stringSplitDefault;
		}
	}

	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&userName=" + encodeURIComponent(IdSelect_User);
	params += "&applicationIdsDelete=" + encodeURIComponent(deleteIds);
	params += "&applicationIdsAdd=" + encodeURIComponent(addIds);

	var url = getHref("user/application/change" + "?" + params);
	_System._sendReq(url, "post", null, null, handleUserApplicationChange, handleUserApplicationChange, null, "");
}
function handleUserApplicationChange(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		doQueryUserApplications();
	} catch (e) {
		alert(e.message);
	}
}

// ///////////////////////////////////////////
