_Base._load();

var IdDataGrid_Tasks = "tableDataGridTasks";
var IdDataGrid_ReportTypes = "tableDataGridReportTypes";
var IdDataGrid_ReportDatas = "tableDataGridReportDatas";

var IdLayout_Report = "divLayoutReport";

var IdSelect_Task = "";
var IdSelect_ReportType = "";
var Select_TaskName = "";

var MapId2Name = new _Map();
var MapId2SetParams = new _Map();
var MapId2DoQuery = new _Map();

function initialize() {
	// 整体初始化
	_uibInitialize();

	// 子布局初始化
	_uieLayoutInitialize(IdLayout_Report, true);

	{
		// 查询条件初始化
		_uieDateboxSetValue("startDate01", _DateTime._getThisMonthFirstDay());
		_uieDateboxSetValue("endDate01", _DateTime._getDate(0));
	}

	{
		// 任务列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		// frozenColumns[index++] = _uieDataGridCreateColumn("ck", "", false, 20, true, "center", "center", true, "asc");
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("taskId", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("taskName", "名称", false, 200, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_Tasks, "", "icon-search", true, true, "taskId", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_Tasks, onClickRowTask);
		_uieDataGridPaginationInitializeSimple(IdDataGrid_Tasks, doQueryTasks);

		_uieDataGridResize(IdDataGrid_Tasks);
	}

	{
		var index = 1;
		index = 1;
		MapId2Name._put(index, "实时数据监控");
		MapId2SetParams._put(index, setParams02);
		MapId2DoQuery._put(index, doQuery02);

		index = 2;
		MapId2Name._put(index, "拨打结果统计");
		MapId2SetParams._put(index, setParams01);
		MapId2DoQuery._put(index, doQuery01);

		index = 3;
		MapId2Name._put(index, "48小时统计");
		MapId2SetParams._put(index, setParams03);
		MapId2DoQuery._put(index, doQuery03);

		index = 4;
		MapId2Name._put(index, "通话详单");
		MapId2SetParams._put(index, setParams04);
		MapId2DoQuery._put(index, doQuery04);

		index = 5;
		MapId2Name._put(index, "客户回复");
		MapId2SetParams._put(index, setParams05);
		MapId2DoQuery._put(index, doQuery05);

		// 报表类型列表初始化
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("reportTypeId", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("reportTypeName", "名称", false, 200, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_ReportTypes, "", "icon-search", true, false, "reportTypeId", toolbarButtons, frozenColumns, columns);
		_uieDataGridOnClickRow(IdDataGrid_ReportTypes, onClickRowReportType);

		_uieDataGridResize(IdDataGrid_ReportTypes);

		for ( var i = 1; i < 6; i++) {
			if (!MapId2Name._containsKey(i)) {
				var row = new Array();
				row["no"] = i;
				row["reportTypeId"] = i;
				row["reportTypeName"] = i;
				_uieDataGridAppendRow(IdDataGrid_ReportTypes, row);
				continue;
			}
			var row = new Array();
			row["no"] = i;
			row["reportTypeId"] = i;
			row["reportTypeName"] = MapId2Name._get(i);
			_uieDataGridAppendRow(IdDataGrid_ReportTypes, row);
		}
	}

	doQueryTasks();
}

// 点击任务列表
function onClickRowTask(rowIndex, rowData) {
	IdSelect_Task = rowData["taskId"];
	Select_TaskName = rowData["taskName"];

	setParams();
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

			_uieDataGridAppendRow(IdDataGrid_Tasks, row);
		}

		_uieDataGridPaginationRefresh(IdDataGrid_Tasks, parseInt(map.count), parseInt(map.pageNumber));
	} catch (e) {
		alert(e.message);
	}
}

// 点击报表类型列表
function onClickRowReportType(rowIndex, rowData) {
	IdSelect_ReportType = rowData["reportTypeId"];

	setParams();
}

function setParams() {
	if (IdSelect_Task == "" || IdSelect_ReportType == "") {
		return;
	}

	hideAll();

	if (MapId2SetParams._containsKey(IdSelect_ReportType)) {
		MapId2SetParams._get(IdSelect_ReportType)();
	}
}

function hideAll() {
	highcharts01 = null;
	highcharts02 = null;

	_divHide("chartContainer");
	_divHide("container1");
	_divHide("container2");
	_divHide("container3");

	handleStopDoQuery02 = true;
}

function showWindowSetParams01() {
	_divShow("divWindowSetParams01");
	_uieWindowCreate("divWindowSetParams01", "设置参数", "icon-serarch", false, 500, 0, false, false, false, true, true);
	_uieWindowShow("divWindowSetParams01");
}

function showWindowSetParams04() {
	_divShow("divWindowSetParams04");
	_uieWindowCreate("divWindowSetParams04", "设置参数", "icon-search", false, 400, 0, false, false, false, true, true);
	_uieWindowShow("divWindowSetParams04");
}

function showWindowSetParams05() {
	_divShow("divWindowSetParams05");
	_uieWindowCreate("divWindowSetParams05", "设置参数", "icon-search", false, 500, 0, false, false, false, true, true);
	_uieWindowShow("divWindowSetParams05");
}

function doQuery(idWindow) {
	_uieWindowClose(idWindow);

	if (MapId2DoQuery._containsKey(IdSelect_ReportType)) {
		MapId2DoQuery._get(IdSelect_ReportType)();
		return;
	}
}

// ////////////////////////////////////
