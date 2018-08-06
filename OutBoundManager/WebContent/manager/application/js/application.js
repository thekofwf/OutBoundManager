_Base._load();

var IdDataGrid_Applications = "tableDataGridApplications";

var IdWindow_ApplicationAdd = "divWindowApplicationAdd";
var IdWindow_ApplicationEdit = "divWindowApplicationEdit";

var IdSelect_Application = "";

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
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryApplications);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("添加", "icon-add", showWinApplicationAdd);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("修改", "icon-edit", showWinApplicationEdit);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("删除", "icon-remove", doDeleteApplication);
		toolbarButtons[index++] = "-";

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("name", "名称", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("status", "状态", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("description", "描述", false, 600, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Applications, "", "icon-search", true, true, "id", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Applications, onClickRowApplication);
		_uieDataGridPaginationInitialize(IdDataGrid_Applications, doQueryApplications);

		_uieDataGridResize(IdDataGrid_Applications);
	}

	doQueryApplications();
}

function onClickRowApplication(rowIndex, rowData) {
	IdSelect_Application = rowData["id"];
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
	IdSelect_Application = "";
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
		} else {
			_uieMessagerError("查询应用异常", jObj.data);
		}
	} catch (e) {
		alert(e.message);
	}
}

// 显示增加应用窗口
function showWinApplicationAdd() {
	_uieTextboxSetValue("applicationNameNew", "");
	_uieComboboxSetSelectByIndex("applicationStatusNew", 0);
	_uieTextboxSetValue("applicationDescriptionNew", "");
	_divShow(IdWindow_ApplicationAdd);
	_uieWindowCreate(IdWindow_ApplicationAdd, "添加应用", "icon-add", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_ApplicationAdd);
}

// 增加应用
function doAddApplication() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&name=" + encodeURIComponent(_uieTextboxGetValue("applicationNameNew"));
	params += "&status=" + encodeURIComponent(_uieComboboxGetValue("applicationStatusNew"));
	params += "&description=" + encodeURIComponent(_uieTextboxGetValue("applicationDescriptionNew"));
	var url = getHref("application/add" + "?" + params);
	_System._sendReq(url, "post", null, null, handleAddApplication, handleAddApplication, null, "");
}
function handleAddApplication(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("添加应用", "成功");
		} else {
			_uieMessagerError("添加应用", "失败");
		}

		doQueryApplications();
	} catch (e) {
		alert(e.message);
	}
}

// 显示修改应用窗口
function showWinApplicationEdit() {
	if (IdSelect_Application == "") {
		_uieMessagerAlert("修改应用", "请选择应用！");
		return;
	}

	var name = _uieDataGridGetColumnValue(IdDataGrid_Applications, IdSelect_Application, "name");
	var description = _uieDataGridGetColumnValue(IdDataGrid_Applications, IdSelect_Application, "description");

	_uieTextboxSetValue("applicationNameEdit", name);
	_uieTextboxSetValue("applicationDescriptionEdit", description);
	_divShow(IdWindow_ApplicationEdit);
	_uieWindowCreate(IdWindow_ApplicationEdit, "修改应用", "icon-edit", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_ApplicationEdit);
}

// 修改应用
function doEditApplication() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&id=" + encodeURIComponent(IdSelect_Application);
	params += "&name=" + encodeURIComponent(_uieTextboxGetValue("applicationNameEdit"));
	params += "&description=" + encodeURIComponent(_uieTextboxGetValue("applicationDescriptionEdit"));
	var url = getHref("application/save" + "?" + params);
	_System._sendReq(url, "post", null, null, handleEditApplication, handleEditApplication, null, "");
}
function handleEditApplication(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("修改应用", "成功");
		} else {
			_uieMessagerError("修改应用", "失败");
		}

		doQueryApplications();
	} catch (e) {
		alert(e.message);
	}
}

// 删除应用
function doDeleteApplication() {
	if (IdSelect_Application == "") {
		_uieMessagerAlert("删除应用", "请选择应用！");
		return;
	}

	var name = _uieDataGridGetColumnValue(IdDataGrid_Applications, IdSelect_Application, "name");
	_uieMessagerConfirm("删除确认", "确定删除？" + name, funDeleteApplication);
}
function funDeleteApplication() {
	var agentId = parent.apiGetAgentId();
	var userInfo = parent.apiGetUserInfo();
	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&userInfo=" + encodeURIComponent(userInfo);
	params += "&id=" + encodeURIComponent(IdSelect_Application);
	var url = getHref("application/delete" + "?" + params);
	_System._sendReq(url, "post", null, null, handleDeleteApplication, handleDeleteApplication, null, "");
}
function handleDeleteApplication(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("删除应用", "成功");
		} else {
			_uieMessagerError("删除应用", "失败");
		}

		doQueryApplications();
	} catch (e) {
		alert(e.message);
	}
}

// ///////////////////////////////////////////
