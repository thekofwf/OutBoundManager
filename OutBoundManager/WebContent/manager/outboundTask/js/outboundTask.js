_Base._load();

var IdDataGrid_Tasks = "tableDataGridTasks";

var MapId2Task = new _Map();

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
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		// index = 0;
		// toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryTasks);
		// toolbarButtons[index++] = "-";

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("taskId", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("taskName", "名称", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("currentState", "状态", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("ani", "外显号码", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("startDate", "开始日期", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("endDate", "结束日期", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("mondayFlag", "一", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("tuesdayFlag", "二", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("wednesdayFlag", "三", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("thursdayFlag", "四", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("fridayFlag", "五", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("saturdayFlag", "六", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("sundayFlag", "日", false, 50, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("executeTime1", "时段一", false, 125, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("executeTime2", "时段二", false, 125, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("executeTime3", "时段三", false, 125, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("executeTime4", "时段四", false, 125, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("maxConcurrentCall", "最大并发", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("maxAttempts", "重拨次数", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("retryInterval", "重拨间隔", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("rna", "等待时长", false, 75, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Tasks, "", "icon-search", true, true, "taskId", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Tasks, onClickRowTask);
		_uieDataGridPaginationInitialize(IdDataGrid_Tasks, doQueryTasks);

		_uieDataGridResize(IdDataGrid_Tasks);
	}

	{
		// 查询条件初始化
		_uieDateboxSetValue("conditionStartDate", _DateTime._getThisMonthFirstDay());
		_uieDateboxSetValue("conditionEndDate", _DateTime._getDate(0));
	}

	{
		// 数据展示控件初始化
		_uieDateboxSetValue("startDate", _DateTime._getThisMonthFirstDay());
		_uieDateboxSetValue("endDate", _DateTime._getDate(0));

		_uieComboboxInitializeHour("retryIntervalHour");
		_uieComboboxSetSelectByIndex("retryIntervalHour", 0);
		_uieComboboxInitializeMinute("retryIntervalMinute");
		_uieComboboxSetSelectByIndex("retryIntervalMinute", 5);
		_uieComboboxInitializeMinute("retryIntervalSecond");
		_uieComboboxSetSelectByIndex("retryIntervalSecond", 0);

		_uieComboboxInitializeHour("beginHour1");
		_uieComboboxSetSelectByIndex("beginHour1", 0);
		_uieComboboxInitializeMinute("beginMinute1");
		_uieComboboxSetSelectByIndex("beginMinute1", 0);
		_uieComboboxInitializeHour("endHour1");
		_uieComboboxSetSelectByIndex("endHour1", 23);
		_uieComboboxInitializeMinute("endMinute1");
		_uieComboboxSetSelectByIndex("endMinute1", 59);

		_uieComboboxInitializeHour("beginHour2");
		_uieComboboxSetSelectByIndex("beginHour2", 0);
		_uieComboboxInitializeMinute("beginMinute2");
		_uieComboboxSetSelectByIndex("beginMinute2", 0);
		_uieComboboxInitializeHour("endHour2");
		_uieComboboxSetSelectByIndex("endHour2", 23);
		_uieComboboxInitializeMinute("endMinute2");
		_uieComboboxSetSelectByIndex("endMinute2", 59);

		_uieComboboxInitializeHour("beginHour3");
		_uieComboboxSetSelectByIndex("beginHour3", 0);
		_uieComboboxInitializeMinute("beginMinute3");
		_uieComboboxSetSelectByIndex("beginMinute3", 0);
		_uieComboboxInitializeHour("endHour3");
		_uieComboboxSetSelectByIndex("endHour3", 23);
		_uieComboboxInitializeMinute("endMinute3");
		_uieComboboxSetSelectByIndex("endMinute3", 59);

		_uieComboboxInitializeHour("beginHour4");
		_uieComboboxSetSelectByIndex("beginHour4", 0);
		_uieComboboxInitializeMinute("beginMinute4");
		_uieComboboxSetSelectByIndex("beginMinute4", 0);
		_uieComboboxInitializeHour("endHour4");
		_uieComboboxSetSelectByIndex("endHour4", 23);
		_uieComboboxInitializeMinute("endMinute4");
		_uieComboboxSetSelectByIndex("endMinute4", 59);
	}

	doQueryUserApplications();
	doQueryTasks();
}

function doQueryUserApplications() {
	var agentId = parent.apiGetAgentId();

	var params = "userName=" + encodeURIComponent(agentId);
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
			var list = listReturn[1];

			if (list && list.length) {
				for ( var i = 0; i < list.length; i++) {
					var application = list[i];

					_uieComboboxAddOption("applicationName", application.name, application.name);
				}
				_uieComboboxSetSelectByIndex("applicationName", 0);
			}
		} else {
			_uieMessagerError("查询用户应用信息异常", jObj.data);
		}
	} catch (e) {
		alert(e.message);
	}
}

function onClickRowTask(rowIndex, rowData) {
	var taskId = rowData["taskId"];
	var task = MapId2Task._get(taskId);

	if (task == null) {
		return;
	}

	_uieTextboxSetValue("taskId", task.taskId);
	_uieTextboxSetValue("taskName", task.taskName);
	_uieComboboxSetValue("maxConcurrentCall", task.maxConcurrentCall);
	_uieTextboxSetValue("ani", task.ani);
	_uieComboboxSetValue("applicationName", task.applicationName);
	_uieComboboxSetValue("beginHour1", task.startTime1.substring(0, 2));
	_uieComboboxSetValue("beginMinute1", task.startTime1.substring(3, 5));
	_uieComboboxSetValue("endHour1", task.endTime1.substring(0, 2));
	_uieComboboxSetValue("endMinute1", task.endTime1.substring(3, 5));
	_uieComboboxSetValue("beginHour2", task.startTime2.substring(0, 2));
	_uieComboboxSetValue("beginMinute2", task.startTime2.substring(3, 5));
	_uieComboboxSetValue("endHour2", task.endTime2.substring(0, 2));
	_uieComboboxSetValue("endMinute2", task.endTime2.substring(3, 5));
	_uieComboboxSetValue("beginHour3", task.startTime3.substring(0, 2));
	_uieComboboxSetValue("beginMinute3", task.startTime3.substring(3, 5));
	_uieComboboxSetValue("endHour3", task.endTime3.substring(0, 2));
	_uieComboboxSetValue("endMinute3", task.endTime3.substring(3, 5));
	_uieComboboxSetValue("beginHour4", task.startTime4.substring(0, 2));
	_uieComboboxSetValue("beginMinute4", task.startTime4.substring(3, 5));
	_uieComboboxSetValue("endHour4", task.endTime4.substring(0, 2));
	_uieComboboxSetValue("endMinute4", task.endTime4.substring(3, 5));
	_uieDateboxSetValue("startDate", task.startDate);
	_uieDateboxSetValue("endDate", task.endDate);
	_uieComboboxSetValue("currentState", task.currentState);
	_checkboxSetChecked("mondayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.mondayFlag));
	_checkboxSetChecked("tuesdayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.tuesdayFlag));
	_checkboxSetChecked("wednesdayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.wednesdayFlag));
	_checkboxSetChecked("thursdayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.thursdayFlag));
	_checkboxSetChecked("fridayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.fridayFlag));
	_checkboxSetChecked("saturdayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.saturdayFlag));
	_checkboxSetChecked("sundayFlag", _String._compareNoCase(_Const_Task._Flag_Yes, task.sundayFlag));
	_uieNumberboxSetValue("rna", task.rna);
	_uieComboboxSetValue("maxAttempts", task.maxAttempts);
	_uieComboboxSetValue("retryIntervalHour", task.retryInterval.substring(0, 2));
	_uieComboboxSetValue("retryIntervalMinute", task.retryInterval.substring(3, 5));
	_uieComboboxSetValue("retryIntervalSecond", task.retryInterval.substring(6, 8));
}

function doQueryTasks() {
	var agentId = parent.apiGetAgentId();
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Tasks);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Tasks);

	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	params += "&startDate=" + encodeURIComponent(_uieDateboxGetValue("conditionStartDate"));
	params += "&endDate=" + encodeURIComponent(_uieDateboxGetValue("conditionEndDate"));
	params += "&currentState=" + encodeURIComponent(_uieComboboxGetValue("currentStateCondition"));
	var url = getHref("task/user/tasks" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryTasks, handleQueryTasks, null, "");
}
function handleQueryTasks(result, data, statusText, xhr) {
	_uieDataGridDeleteAllRows(IdDataGrid_Tasks);

	var json = xhr.responseText;
	try {
		MapId2Task = new _Map();
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null || jObj.result != _System._success) {
			return;
		}

		var listReturn = jObj.data;
		var map = listReturn[0];
		var list = listReturn[1];

		var first = map.first;
		var last = map.last;
		for ( var i = first; i <= last; i++) {
			var task = list[i - first];
			var row = new Array();
			row["no"] = i;
			row["taskId"] = task.taskId;
			row["taskName"] = task.taskName;
			row["currentState"] = _Const_Task._getCurrentStateName(task.currentState);
			row["ani"] = task.ani;
			row["startDate"] = task.startDate;
			row["endDate"] = task.endDate;
			row["mondayFlag"] = _Const_Task._isFlagYes(task.mondayFlag) ? "O" : "";
			row["tuesdayFlag"] = _Const_Task._isFlagYes(task.tuesdayFlag) ? "O" : "";
			row["wednesdayFlag"] = _Const_Task._isFlagYes(task.wednesdayFlag) ? "O" : "";
			row["thursdayFlag"] = _Const_Task._isFlagYes(task.thursdayFlag) ? "O" : "";
			row["fridayFlag"] = _Const_Task._isFlagYes(task.fridayFlag) ? "O" : "";
			row["saturdayFlag"] = _Const_Task._isFlagYes(task.saturdayFlag) ? "O" : "";
			row["sundayFlag"] = _Const_Task._isFlagYes(task.sundayFlag) ? "O" : "";
			row["executeTime1"] = task.startTime1 + " - " + task.endTime1;
			row["executeTime2"] = task.startTime2 + " - " + task.endTime2;
			row["executeTime3"] = task.startTime3 + " - " + task.endTime3;
			row["executeTime4"] = task.startTime4 + " - " + task.endTime4;
			row["maxConcurrentCall"] = task.maxConcurrentCall;
			row["maxAttempts"] = task.maxAttempts;
			row["retryInterval"] = task.retryInterval;
			row["rna"] = task.rna;

			_uieDataGridAppendRow(IdDataGrid_Tasks, row);

			MapId2Task._put(task.taskId, task);
		}

		_uieDataGridPaginationRefresh(IdDataGrid_Tasks, parseInt(map.count), parseInt(map.pageNumber));
	} catch (e) {
		alert(e.message);
	}
}

function funGetTaskInfoParams() {
	var params = "userId=" + encodeURIComponent(parent.apiGetAgentId());
	params += "&taskName=" + encodeURIComponent(_uieTextboxGetValue("taskName"));
	params += "&maxConcurrentCall=" + encodeURIComponent(_uieComboboxGetValue("maxConcurrentCall"));
	params += "&ani=" + encodeURIComponent(_uieTextboxGetValue("ani"));
	params += "&applicationName=" + encodeURIComponent(_uieComboboxGetValue("applicationName"));
	params += "&startTime1=" + encodeURIComponent(_uieComboboxGetValue("beginHour1") + ":" + _uieComboboxGetValue("beginMinute1"));
	params += "&endTime1=" + encodeURIComponent(_uieComboboxGetValue("endHour1") + ":" + _uieComboboxGetValue("endMinute1"));
	params += "&startTime2=" + encodeURIComponent(_uieComboboxGetValue("beginHour2") + ":" + _uieComboboxGetValue("beginMinute2"));
	params += "&endTime2=" + encodeURIComponent(_uieComboboxGetValue("endHour2") + ":" + _uieComboboxGetValue("endMinute2"));
	params += "&startTime3=" + encodeURIComponent(_uieComboboxGetValue("beginHour3") + ":" + _uieComboboxGetValue("beginMinute3"));
	params += "&endTime3=" + encodeURIComponent(_uieComboboxGetValue("endHour3") + ":" + _uieComboboxGetValue("endMinute3"));
	params += "&startTime4=" + encodeURIComponent(_uieComboboxGetValue("beginHour4") + ":" + _uieComboboxGetValue("beginMinute4"));
	params += "&endTime4=" + encodeURIComponent(_uieComboboxGetValue("endHour4") + ":" + _uieComboboxGetValue("endMinute4"));
	params += "&startDate=" + encodeURIComponent(_uieDateboxGetValue("startDate"));
	params += "&endDate=" + encodeURIComponent(_uieDateboxGetValue("endDate"));
	params += "&currentState=" + encodeURIComponent(_uieComboboxGetValue("currentState"));
	params += "&mondayFlag=" + encodeURIComponent(_checkboxIsChecked("mondayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&tuesdayFlag=" + encodeURIComponent(_checkboxIsChecked("tuesdayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&wednesdayFlag=" + encodeURIComponent(_checkboxIsChecked("wednesdayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&thursdayFlag=" + encodeURIComponent(_checkboxIsChecked("thursdayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&fridayFlag=" + encodeURIComponent(_checkboxIsChecked("fridayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&saturdayFlag=" + encodeURIComponent(_checkboxIsChecked("saturdayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&sundayFlag=" + encodeURIComponent(_checkboxIsChecked("sundayFlag") ? _Const_Task._Flag_Yes : _Const_Task._Flag_No);
	params += "&rna=" + encodeURIComponent(_uieNumberboxGetValue("rna"));
	params += "&maxAttempts=" + encodeURIComponent(_uieComboboxGetValue("maxAttempts"));
	params += "&retryInterval=" + encodeURIComponent(_uieComboboxGetValue("retryIntervalHour") + ":" + _uieComboboxGetValue("retryIntervalMinute") + ":" + _uieComboboxGetValue("retryIntervalSecond"));

	return params;
}

function checkParams() {
	{
		var applicationName = _uieComboboxGetValue("applicationName");
		if (_uieComboboxGetSelectIndex("applicationName", applicationName) == -1) {
			return false;
		}

		var sBegin = "09:00";
		var sEnd = "18:00";

		var sBeginTemp = _uieComboboxGetValue("beginHour1") + ":" + _uieComboboxGetValue("beginMinute1");
		if (sBeginTemp < sBegin) {
			return false;
		}
		var sEndTemp = _uieComboboxGetValue("endHour1") + ":" + _uieComboboxGetValue("endMinute1");
		if (sEndTemp > sEnd) {
			return false;
		}
		sBeginTemp = _uieComboboxGetValue("beginHour2") + ":" + _uieComboboxGetValue("beginMinute2");
		if (sBeginTemp < sBegin) {
			return false;
		}
		sEndTemp = _uieComboboxGetValue("endHour2") + ":" + _uieComboboxGetValue("endMinute2");
		if (sEndTemp > sEnd) {
			return false;
		}
		sBeginTemp = _uieComboboxGetValue("beginHour3") + ":" + _uieComboboxGetValue("beginMinute3");
		if (sBeginTemp < sBegin) {
			return false;
		}
		sEndTemp = _uieComboboxGetValue("endHour3") + ":" + _uieComboboxGetValue("endMinute3");
		if (sEndTemp > sEnd) {
			return false;
		}
		sBeginTemp = _uieComboboxGetValue("beginHour4") + ":" + _uieComboboxGetValue("beginMinute4");
		if (sBeginTemp < sBegin) {
			return false;
		}
		sEndTemp = _uieComboboxGetValue("endHour4") + ":" + _uieComboboxGetValue("endMinute4");
		if (sEndTemp > sEnd) {
			return false;
		}
	}
	return true;
}

function doAddTask() {
	_uieMessagerConfirm("添加确认", "确定添加？", funAddTask);
}
function funAddTask() {
	if (!checkParams()) {
		_uieMessagerAlert("增加任务", "参数异常!");
		return;
	}

	var params = funGetTaskInfoParams();
	var url = getHref("task/add" + "?" + params);
	_System._sendReq(url, "post", null, null, handleAddTask, handleAddTask, null, "");
}
function handleAddTask(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("添加任务", "成功");
		} else {
			_uieMessagerError("添加任务", "失败");
		}

		doQueryTasks();
	} catch (e) {
		alert(e.message);
	}
}

function doSaveTask() {
	_uieMessagerConfirm("更新确认", "确定更新？", funSaveTask);
}
function funSaveTask() {
	if (!checkParams()) {
		_uieMessagerAlert("更新任务", "参数异常!");
		return;
	}

	var params = funGetTaskInfoParams();
	params += "&taskId=" + encodeURIComponent(_uieTextboxGetValue("taskId"));
	var url = getHref("task/save" + "?" + params);
	_System._sendReq(url, "post", null, null, handleSaveTask, handleSaveTask, null, "");
}
function handleSaveTask(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("更新任务", "成功");
		} else {
			_uieMessagerError("更新任务", "失败");
		}

		doQueryTasks();
	} catch (e) {
		alert(e.message);
	}
}

function doDeleteTask() {
	_uieMessagerConfirm("删除确认", "确定删除？", funDeleteTask);
}
function funDeleteTask() {
	var params = "userId=" + encodeURIComponent(parent.apiGetAgentId());
	params += "&taskId=" + encodeURIComponent(_uieTextboxGetValue("taskId"));
	var url = getHref("task/delete" + "?" + params);
	_System._sendReq(url, "post", null, null, handleDeleteTask, handleDeleteTask, null, "");
}
function handleDeleteTask(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("删除任务", "成功");
		} else {
			_uieMessagerError("删除任务", "失败");
		}

		doQueryTasks();
	} catch (e) {
		alert(e.message);
	}
}
