var highcharts01 = null;
var highcharts02 = null;

// ///////////////////////////////////////////////////////////////////////////////////////////////// 拨打结果统计
function setParams01() {
	showWindowSetParams01();
}
function doQuery01() {
	hideAll();

	var dtType = _radioGetValue("dtType01");
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&dtType=" + encodeURIComponent(dtType);
	params += "&startDate=" + encodeURIComponent(_uieDateboxGetValue("startDate01"));
	params += "&endDate=" + encodeURIComponent(_uieDateboxGetValue("endDate01"));
	var url = getHref("report/query01" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQuery01, handleQuery01, null, "");
}
function handleQuery01(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var listMap = listReturn[0];
			var sStartDT = listReturn[1];
			var sEndDT = listReturn[2];

			var datas = new Array();
			for ( var i = 0; i < 5; i++) {
				datas[i] = 0;
			}
			for ( var i = 0; i < listMap.length; i++) {
				var map = listMap[i];
				var reasonCode = map.reasonCode;
				var count = _String._toInt(map.count);
				if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_Connected)) {
					datas[0] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_NoAnswer)) {
					datas[1] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_Ls005)) {
					datas[2] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_Ls009)) {
					datas[3] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_Busy)) {
					datas[4] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_InvalidNumber)) {
					datas[2] += count;
				} else if (_String._compareNoCase(reasonCode, _Const_Data._ReasonCode_Disconnect)) {
					datas[3] += count;
				}
			}

			var valueSeries = new Array();
			{
				var datasTemp = [ datas[0] ];
				var seriesMap = {};
				seriesMap["name"] = "接通";
				seriesMap["data"] = datasTemp;
				valueSeries[0] = seriesMap;
			}
			{
				var datasTemp = [ datas[1] ];
				var seriesMap = {};
				seriesMap["name"] = "无应答";
				seriesMap["data"] = datasTemp;
				valueSeries[1] = seriesMap;
			}
			{
				var datasTemp = [ datas[2] ];
				var seriesMap = {};
				seriesMap["name"] = "无效号码";
				seriesMap["data"] = datasTemp;
				valueSeries[2] = seriesMap;
			}
			{
				var datasTemp = [ datas[3] ];
				var seriesMap = {};
				seriesMap["name"] = "无连接";
				seriesMap["data"] = datasTemp;
				valueSeries[3] = seriesMap;
			}
			{
				var datasTemp = [ datas[4] ];
				var seriesMap = {};
				seriesMap["name"] = "忙";
				seriesMap["data"] = datasTemp;
				valueSeries[4] = seriesMap;
			}

			showBar("container1", Select_TaskName + " - 拨打结果统计", sStartDT + " - " + sEndDT, [ '' ], "呼叫结果", 0, '个', ' 个', valueSeries);
		} else {
			_uieMessagerError("查询", "失败");
		}

	} catch (e) {
		alert(e.message);
	}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////// 实时数据监控
var handleDoQuery02 = null;
var handleStopDoQuery02 = true;
function setParams02() {
	hideAll();

	highcharts01 = showDynamic("container1", Select_TaskName + " - 实时剩余号码量", "剩余号码量(个)", "剩余号码");
	highcharts02 = showDynamic("container2", Select_TaskName + " - 实时当前拨打数", "当前拨打数(个)", "当前拨打");

	handleStopDoQuery02 = false;
	handleDoQuery02 = window.setInterval(doQuery02, 5000);
}
function doQuery02() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	var url = getHref("report/query02" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQuery02, handleQuery02, null, "");
}
function handleQuery02(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var listMap = listReturn[0];

			var outdialPending = 0;
			var outdialInProgress = 0;
			for ( var i = 0; i < listMap.length; i++) {
				var map = listMap[i];
				var currentStatus = map.currentStatus;
				var count = _String._toInt(map.count);
				if (_String._compareNoCase(currentStatus, _Const_Data._CurrentStatus_OutDialPending)) {
					outdialPending = count;
				} else if (_String._compareNoCase(currentStatus, _Const_Data._CurrentStatus_OutDialInProgress)) {
					outdialInProgress = count;
				}
			}

			if (highcharts01 != null) {
				var series = highcharts01.series[0];
				var x = (new Date()).getTime();
				var y = outdialPending;

				series.addPoint([ x, y ], true, true);
			}

			if (highcharts02 != null) {
				var series = highcharts02.series[0];
				var x = (new Date()).getTime();
				var y = outdialInProgress;

				series.addPoint([ x, y ], true, true);
			}
		}
	} catch (e) {
	} finally {
		if (handleDoQuery02 != null) {
			window.clearInterval(handleDoQuery02);
			handleDoQuery02 = null;
		}
		if (!handleStopDoQuery02) {
			handleDoQuery02 = window.setInterval(doQuery02, 5000);
		}
	}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////// 48小时统计
function setParams03() {
	hideAll();

	doQuery03();
}
function doQuery03() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	var url = getHref("report/query03" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQuery03, handleQuery03, null, "");
}
function handleQuery03(result, data, statusText, xhr) {
	var json = xhr.responseText;
	try {
		var jObj = _System._compileJson(json);
		if (jObj == null || jObj.result == null) {
			return;
		}

		if (jObj.result == _System._success) {
			var listReturn = jObj.data;
			var listX = listReturn[0];
			var listMap = listReturn[1];

			var x = new Array();
			var valuesNotEligible = new Array();
			var valuesOutDialAttemptesExhausted = new Array();
			var mapX2Index = new _Map();
			for ( var i = 0; i < listX.length; i++) {
				x[i] = listX[i];
				mapX2Index._put(listX[i], i);
				valuesNotEligible[i] = 0;
				valuesOutDialAttemptesExhausted[i] = 0;
			}

			for ( var i = 0; i < listMap.length; i++) {
				var map = listMap[i];
				var startTime = map.startTime + "";
				var currentStatus = map.currentStatus;
				var count = _String._toInt(map.count);

				if (!mapX2Index._containsKey(startTime)) {
					continue;
				}
				var index = mapX2Index._get(startTime);

				if (_String._compareNoCase(currentStatus, _Const_Data._CurrentStatus_NotEligible)) {
					valuesNotEligible[index] = count;
				} else if (_String._compareNoCase(currentStatus, _Const_Data._CurrentStatus_OutDialAttemptesExhausted)) {
					valuesOutDialAttemptesExhausted[index] = count;
				}
			}

			var valueSeries = new Array();
			{
				var seriesMap = {};
				seriesMap["name"] = "拨打成功";
				seriesMap["data"] = valuesNotEligible;
				valueSeries[0] = seriesMap;
			}
			{
				var seriesMap = {};
				seriesMap["name"] = "失败超次";
				seriesMap["data"] = valuesOutDialAttemptesExhausted;
				valueSeries[1] = seriesMap;
			}

			showArea("container1", Select_TaskName + " - 48小时统计", "", x, '个', valueSeries);

		} else {
			_uieMessagerError("查询", "失败");
		}
	} catch (e) {
		alert(e.message);
	}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////// 通话详单
var mapId2ListOrktapes = new _Map();
function setParams04() {
	hideAll();

	_divShow("container3");
	{
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("查询", "icon-search", showWindowSetParams04);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("收听录音", "icon-redo", doPlayRecord04);
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("下载录音", "icon-save", doDownRecord04);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("下载数据", "icon-print", confirmDownData04);

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("dnis", "号码", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("currentStatus", "号码状态", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("reasonCode", "拨打结果", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("callId", "录音标签", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("startTime", "开始时间", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("endTime", "结束时间", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("timeLength", "时长", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("attempts", "拨打次数", false, 75, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_ReportDatas, "", "icon-search", true, true, "id", toolbarButtons, frozenColumns, columns);
		_uieDataGridPaginationInitialize(IdDataGrid_ReportDatas, doQuery04);

		_uieDataGridResize(IdDataGrid_ReportDatas);

		_uieDataGridDeleteAllRows(IdDataGrid_ReportDatas);
	}

	showWindowSetParams04();
}
function doQuery04() {
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_ReportDatas);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_ReportDatas);

	_uieDataGridDeleteAllRows(IdDataGrid_ReportDatas);

	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&dataType=" + encodeURIComponent(_uieComboboxGetValue("dataType04"));
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("report/query04" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQuery04, handleQuery04, null, "");
}
function handleQuery04(result, data, statusText, xhr) {
	mapId2ListOrktapes._clear();

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
			var listListOrktapes = listReturn[2];

			var first = map.first;
			var last = map.last;
			for ( var i = first; i <= last; i++) {
				var data = list[i - first];
				var row = new Array();
				row["no"] = i;
				row["id"] = data.id;
				row["dnis"] = data.dnis;
				row["currentStatus"] = _Const_Data._getCurrentStatusName(data.currentStatus);
				row["reasonCode"] = _Const_Data._getReasonCodeName(data.reasonCode);
				row["callId"] = data.callId;
				row["startTime"] = data.startTime;
				row["endTime"] = data.endTime;
				row["timeLength"] = data.timeLength;
				row["attempts"] = data.attempts;

				mapId2ListOrktapes._put(data.id, listListOrktapes[i - first]);

				_uieDataGridAppendRow(IdDataGrid_ReportDatas, row);
			}

			_uieDataGridPaginationRefresh(IdDataGrid_ReportDatas, parseInt(map.count), parseInt(map.pageNumber));
		} else {
			_uieMessagerError("查询", "失败");
		}
	} catch (e) {
		alert(e.message);
	}
}

function doPlayRecord04() {
	var id = _uieDataGridGetSelectRowId(IdDataGrid_ReportDatas, "id");
	if (id == "") {
		_uieMessagerAlert("播放录音", "请选择记录!");
		return;
	}

	var listOrktapes = mapId2ListOrktapes._get(id);
	if (listOrktapes == null || listOrktapes.length == 0) {
		_uieMessagerAlert("播放录音", "该记录没有录音!");
		return;
	}

	if (_WindowPlayRecords == null) {
		_WindowPlayRecords = new _Window_PlayRecords();
	}
	_WindowPlayRecords._show(listOrktapes);
}

function doDownRecord04() {
	var id = _uieDataGridGetSelectRowId(IdDataGrid_ReportDatas, "id");
	if (id == "") {
		_uieMessagerAlert("播放录音", "请选择记录!");
		return;
	}

	var listOrktapes = mapId2ListOrktapes._get(id);
	if (listOrktapes == null || listOrktapes.length == 0) {
		_uieMessagerAlert("播放录音", "该记录没有录音!");
		return;
	}

	for ( var i = 0; i < listOrktapes.length; i++) {
		var orktape = listOrktapes[i];
		window.open(orktape.fileName);
	}
}

function confirmDownData04() {
	_uieMessagerConfirm("下载数据", "即将开始下载全部数据，请确认！", doDownData04);
}
function doDownData04() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&dataType=" + encodeURIComponent(_uieComboboxGetValue("dataType04"));
	var url = getHref("report/excel04" + "?" + params);
	window.open(url);
}

// ///////////////////////////////////////////////////////////////////////////////////////////////// 客户回复
function setParams05() {
	hideAll();

	_divShow("container3");
	{
		var toolbarButtons = new Array();
		var index = 0;
		var frozenColumns = new Array();
		index = 0;
		frozenColumns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
		index = 0;
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("查询", "icon-search", showWindowSetParams05);
		toolbarButtons[index++] = "-";
		toolbarButtons[index++] = _uieDataGridCreateToolbarButton("下载数据", "icon-print", confirmDownData05);

		var columns = new Array();
		index = 0;
		columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("dnis", "号码", false, 100, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("ivrContent", "信息", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("callerInput", "回复信息", false, 200, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("startTime", "开始时间", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("endTime", "结束时间", false, 150, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("timeLength", "时长", false, 75, false, "center", "center", true, "asc");
		columns[index++] = _uieDataGridCreateColumn("attempts", "拨打次数", false, 75, false, "center", "center", true, "asc");

		_uieDataGridInitialize(IdDataGrid_ReportDatas, "", "icon-search", true, true, "taskId", toolbarButtons, frozenColumns, columns);
		_uieDataGridPaginationInitialize(IdDataGrid_ReportDatas, doQuery05);

		_uieDataGridResize(IdDataGrid_ReportDatas);

		_uieDataGridDeleteAllRows(IdDataGrid_ReportDatas);
	}

	showWindowSetParams05();
}
function doQuery05() {
	var pageNumber = _uieDataGridPaginationGetPageNumber(IdDataGrid_ReportDatas);
	var pageSize = _uieDataGridPaginationGetPageSize(IdDataGrid_ReportDatas);

	_uieDataGridDeleteAllRows(IdDataGrid_ReportDatas);

	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&lengthMin=" + encodeURIComponent(_uieNumberboxGetValue("lengthMin05"));
	params += "&lengthMax=" + encodeURIComponent(_uieNumberboxGetValue("lengthMax05"));
	params += "&keyWord=" + encodeURIComponent(_uieNumberboxGetValue("keyWord05"));
	params += "&pageNumber=" + encodeURIComponent(pageNumber);
	params += "&pageSize=" + encodeURIComponent(pageSize);
	var url = getHref("report/query05" + "?" + params);
	_System._sendReq(url, "post", null, null, handleQuery05, handleQuery05, null, "");
}
function handleQuery05(result, data, statusText, xhr) {
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
				var data = list[i - first];
				var row = new Array();
				row["no"] = i;
				row["id"] = i;
				row["dnis"] = data.dnis;
				row["ivrContent"] = data.ivrContent;
				row["callerInput"] = data.callerInput;
				row["startTime"] = data.startTime;
				row["endTime"] = data.endTime;
				row["timeLength"] = data.timeLength;
				row["attempts"] = data.attempts;

				_uieDataGridAppendRow(IdDataGrid_ReportDatas, row);
			}

			_uieDataGridPaginationRefresh(IdDataGrid_ReportDatas, parseInt(map.count), parseInt(map.pageNumber));
		} else {
			_uieMessagerError("查询", "失败");
		}
	} catch (e) {
		alert(e.message);
	}
}

function confirmDownData05() {
	_uieMessagerConfirm("下载数据", "即将开始下载全部数据，请确认！", doDownData05);
}
function doDownData05() {
	var params = "taskId=" + encodeURIComponent(IdSelect_Task);
	params += "&lengthMin=" + encodeURIComponent(_uieNumberboxGetValue("lengthMin05"));
	params += "&lengthMax=" + encodeURIComponent(_uieNumberboxGetValue("lengthMax05"));
	params += "&keyWord=" + encodeURIComponent(_uieNumberboxGetValue("keyWord05"));
	var url = getHref("report/excel05" + "?" + params);
	window.open(url);
}
