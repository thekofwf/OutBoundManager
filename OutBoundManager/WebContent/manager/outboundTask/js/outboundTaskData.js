_Base._load();

var IdDataGrid_Tasks = "tableDataGridTasks";
var IdDataGrid_Batchs = "tableDataGridBatchs";
var IdDataGrid_Datas = "tableDataGridDatas";

var IdWindow_BatchAdd = "divWindowBatchAdd";
var IdWindow_BatchEdit = "divWindowBatchEdit";
var IdWindow_UploadFile = "divWindowUploadFile";

var IdLayout_BatchsDatas = "divLayoutBatchsDatas";

var IdSelect_Task = "";
var IdSelect_Batch = "";

var MapId2Task = new _Map();
var MapId2Batch = new _Map();

function initialize() {
	// 整体初始化
	_uibInitialize();

	// 子布局初始化
	_uieLayoutInitialize(IdLayout_BatchsDatas, true);

	{
		// 任务列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		// frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("查询", "icon-search", doQueryTasks);
		toolbarButtons[index++] = "-";

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("taskId", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("taskName", "名称", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("currentState", "状态", false, 50, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Tasks, "", "icon-search", true, true, "taskId", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Tasks, onClickRowTask);
		_uieDataGridPaginationInitializeSimple(IdDataGrid_Tasks, doQueryTasks);

		_uieDataGridResize(IdDataGrid_Tasks);
	}

	{
		// 批次列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		// frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryBatchs);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("添加", "icon-add", showWinBatchAdd);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("修改", "icon-edit", showWinBatchSave);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("启动", "icon-redo", doStartBatch);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("停止", "icon-undo", doStopBatch);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("删除", "icon-remove", doDeleteBatch);

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("batchId", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("batchName", "名称", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("batchState", "状态", false, 50, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Batchs, "", "icon-search", true, true, "batchId", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Batchs, onClickRowBatch);
		_uieDataGridPaginationInitializeSimple(IdDataGrid_Batchs, doQueryBatchs);

		_uieDataGridResize(IdDataGrid_Batchs);
	}

	{
		// 数据列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("刷新", "icon-search", doQueryDatas);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("导入", "icon-add", showWinUploadFile);
		// toolbarButtons[index++] = _uieDataGridCreateToolbarButton("修改", "icon-edit", doQueryBatchs);
		// toolbarButtons[index++] = _uieDataGridCreateToolbarButton("删除", "icon-remove", doQueryBatchs);

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("dnis", "号码", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("currentStatus", "状态", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("finalStatus", "拨打结果", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("reasonCode", "结果码", false, 150, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Datas, "", "icon-search", false, true, "id", toolbarButtons, frozenColumns, columns);
		// _uieDataGridOnClickRow(IdDataGrid_Datas, onClickRowData);
		_uieDataGridPaginationInitialize(IdDataGrid_Datas, doQueryDatas);

		_uieDataGridResize(IdDataGrid_Datas);
	}

	doQueryTasks();
}

// 点击任务列表
function onClickRowTask(rowIndex, rowData) {
	var taskId = rowData["taskId"];
	var task = MapId2Task._get(taskId);

	if (task == null) {
		return;
	}

	IdSelect_Task = taskId;
	IdSelect_Batch = "";

	_uieDataGridDeleteAllRows(IdDataGrid_Batchs);
	_uieDataGridPaginationRefresh(IdDataGrid_Batchs, 0, 0);

	_uieDataGridDeleteAllRows(IdDataGrid_Datas);
	_uieDataGridPaginationRefresh(IdDataGrid_Datas, 0, 0);

	doQueryBatchs();
}

// 查询任务
function doQueryTasks() {
	var agentId = parent.apiGetAgentId();
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Tasks);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Tasks);

	var params = "agentId=" + encodeURIComponent(agentId);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	params += "&startDate=" + encodeURIComponent("");
	params += "&endDate=" + encodeURIComponent("");
	params += "&currentState=" + encodeURIComponent("");
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

			_uieDataGridAppendRow(IdDataGrid_Tasks, row);

			MapId2Task._put(task.taskId, task);
		}

		_uieDataGridPaginationRefresh(IdDataGrid_Tasks, parseInt(map.count), parseInt(map.pageNumber));
	} catch (e) {
		alert(e.message);
	}
}

// 点击批次列表
function onClickRowBatch(rowIndex, rowData) {
	var batchId = rowData["batchId"];

	IdSelect_Batch = batchId;

	_uieDataGridDeleteAllRows(IdDataGrid_Datas);
	_uieDataGridPaginationRefresh(IdDataGrid_Datas, 0, 0);

	doQueryDatas();
}

// 查询批次
function doQueryBatchs() {
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Batchs);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Batchs);

	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("taskdata/batchs" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryBatchs, handleQueryBatchs, null, "");
}
function handleQueryBatchs(result, data, statusText, xhr) {
	_uieDataGridDeleteAllRows(IdDataGrid_Batchs);

	var json = xhr.responseText;
	try {
		MapId2Batch = new _Map();

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
			var batch = list[i - first];
			var row = new Array();
			row["no"] = i;
			row["batchId"] = batch.batchId;
			row["batchName"] = batch.batchName;
			row["batchState"] = _Const_Batch._getBatchStateName(batch.batchState);

			_uieDataGridAppendRow(IdDataGrid_Batchs, row);

			MapId2Batch._put(batch.batchId, batch);
		}

		_uieDataGridPaginationRefresh(IdDataGrid_Batchs, parseInt(map.count), parseInt(map.pageNumber));
	} catch (e) {
		alert(e.message);
	}
}

// 显示增加批次窗口
function showWinBatchAdd() {
	if (IdSelect_Task == "") {
		_uieMessagerError("添加批次", "请选择任务！");
		return;
	}

	_uieTextboxSetValue("batchNameNew", "");
	_uieComboboxSetSelectByIndex("batchStateNew", 1);
	_divShow(IdWindow_BatchAdd);
	_uieWindowCreate(IdWindow_BatchAdd, "添加批次", "icon-add", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_BatchAdd);
}

// 增加批次
function doAddBatch() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&batchName=" + encodeURIComponent(_uieTextboxGetValue("batchNameNew"));
	params += "&batchState=" + encodeURIComponent(_uieComboboxGetValue("batchStateNew"));
	var url = getHref("taskdata/batch/add" + "?" + params);
	_System._sendReq(url, "post", null, null, handleAddBatch, handleAddBatch, null, "");
}
function handleAddBatch(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("添加批次", "成功");
		} else {
			_uieMessagerError("添加批次", "失败");
		}

		doQueryBatchs();
	} catch (e) {
		alert(e.message);
	}
}

// 显示修改批次信息窗口
function showWinBatchSave() {
	var batch = MapId2Batch._get(IdSelect_Batch);
	if (batch == null) {
		_uieMessagerError("修改批次", "请选择批次！");
		return;
	}

	_uieTextboxSetValue("batchNameEdit", batch.batchName);
	_uieComboboxSetValue("batchStateEdit", batch.batchState);
	_divShow(IdWindow_BatchEdit);
	_uieWindowCreate(IdWindow_BatchEdit, "修改批次", "icon-save", false, 300, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_BatchEdit);
}

// 修改批次信息
function doSaveBatch() {
	var params = "batchId=" + encodeURIComponent(IdSelect_Batch);
	params += "&batchName=" + encodeURIComponent(_uieTextboxGetValue("batchNameEdit"));
	var url = getHref("taskdata/batch/save" + "?" + params);
	_System._sendReq(url, "post", null, null, handleSaveBatch, handleSaveBatch, null, "");
}
function handleSaveBatch(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("修改批次", "成功");
		} else {
			_uieMessagerError("修改批次", "失败");
		}

		doQueryBatchs();
	} catch (e) {
		alert(e.message);
	}
}

// 启动批次
function doStartBatch() {
	var batchId = IdSelect_Batch;
	if (batchId == "") {
		_uieMessagerError("启动批次", "请首先选择批次！");
		return;
	}
	_uieMessagerConfirm("启动确认", "确定启动？", funStartBatch);
}
function funStartBatch() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&batchId=" + encodeURIComponent(IdSelect_Batch);
	var url = getHref("taskdata/batch/start" + "?" + params);
	_System._sendReq(url, "post", null, null, handleStartBatch, handleStartBatch, null, "");
}
function handleStartBatch(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("启动批次", "成功");
		} else {
			_uieMessagerError("启动批次", "失败");
		}

		doQueryBatchs();
		doQueryDatas();
	} catch (e) {
		alert(e.message);
	}
}

// 停止批次
function doStopBatch() {
	var batchId = IdSelect_Batch;
	if (batchId == "") {
		_uieMessagerError("停止批次", "请首先选择批次！");
		return;
	}
	_uieMessagerConfirm("停止确认", "确定停止？", funStopBatch);
}
function funStopBatch() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&batchId=" + encodeURIComponent(IdSelect_Batch);
	var url = getHref("taskdata/batch/stop" + "?" + params);
	_System._sendReq(url, "post", null, null, handleStopBatch, handleStopBatch, null, "");
}
function handleStopBatch(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("停止批次", "成功");
		} else {
			_uieMessagerError("停止批次", "失败");
		}

		doQueryBatchs();
		doQueryDatas();
	} catch (e) {
		alert(e.message);
	}
}

// 停止批次
function doDeleteBatch() {
	var batchId = IdSelect_Batch;
	if (batchId == "") {
		_uieMessagerError("删除批次", "请首先选择批次！");
		return;
	}
	_uieMessagerConfirm("删除确认", "确定删除？", funDeleteBatch);
}
function funDeleteBatch() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&batchId=" + encodeURIComponent(IdSelect_Batch);
	var url = getHref("taskdata/batch/delete" + "?" + params);
	_System._sendReq(url, "post", null, null, handleDeleteBatch, handleDeleteBatch, null, "");
}
function handleDeleteBatch(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			_uieMessagerInfo("删除批次", "成功");
		} else {
			_uieMessagerError("删除批次", "失败");
		}

		doQueryBatchs();
		doQueryDatas();
	} catch (e) {
		alert(e.message);
	}
}

// 查询数据
function doQueryDatas() {
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_Datas);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_Datas);

	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&batchId=" + encodeURIComponent(IdSelect_Batch);
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("taskdata/batch/datas" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQueryDatas, handleQueryDatas, null, "");
}
function handleQueryDatas(result, data, statusText, xhr) {
	_uieDataGridDeleteAllRows(IdDataGrid_Datas);

	var json = xhr.responseText;
	try {
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
			var joblist = list[i - first];
			var row = new Array();
			row["no"] = i;
			row["id"] = joblist.id;
			row["dnis"] = joblist.dnis;
			row["currentStatus"] = _Const_Data._getCurrentStatusName(joblist.currentStatus);
			row["finalStatus"] = _Const_Data._getFinalStatusName(joblist.finalStatus);
			row["reasonCode"] = _Const_Data._getReasonCodeName(joblist.reasonCode);

			_uieDataGridAppendRow(IdDataGrid_Datas, row);
		}

		_uieDataGridPaginationRefresh(IdDataGrid_Datas, parseInt(map.count), parseInt(map.pageNumber));
	} catch (e) {
		alert(e.message);
	}
}

// 显示导入数据窗口
function showWinUploadFile() {
	if (IdSelect_Task == "") {
		_uieMessagerError("导入", "请选择任务！");
		return;
	}

	if (IdSelect_Batch == "") {
		_uieMessagerError("导入", "请选择批次！");
		return;
	}

	_uieTextboxSetValue("taskIdImport", IdSelect_Task);
	_uieTextboxSetValue("batchIdImport", IdSelect_Batch);

	_divShow(IdWindow_UploadFile);
	_uieWindowCreate(IdWindow_UploadFile, "导入", "icon-add", false, 500, 0, false, false, false, true, true);
	_uieWindowShow(IdWindow_UploadFile);
	return;
}

function doUploadFile() {
	$('#formUploadFile').form({
		url : getHref("taskdata/datas/upload"),
		onSubmit : function() {
			var arr = [ "xlsx" ];
			// 取出上传文件的扩展名
			var file = document.getElementById('fileUpload').files[0];
			var filename = file.name;
			var index = filename.lastIndexOf(".");
			var ext = filename.substr(index + 1);
			// 循环比较
			for ( var i = 0; i < arr.length; i++) {
				if (ext == arr[i]) {
					return true;
				}
			}
			_uieMessagerAlert("上传文件", "文件必须为：xlsx");
			return false;
		},
		success : function(json) {
			var jObj = _System._compileJson(json);
			if (jObj == null || jObj.result == null) {
				return;
			}
			var result = jObj.result;
			var data = jObj.data;
			if (_String._compareNoCase(result, "success")) {
				doQueryDatas();
				_uieWindowClose(IdWindow_UploadFile);
				_uieMessagerInfo("导入成功!", data);
			} else {
				_uieMessagerError("导入失败", data);
			}
		}
	});
	// submit the form
	$('#formUploadFile').submit();
}

// ////////////////////////////////////
