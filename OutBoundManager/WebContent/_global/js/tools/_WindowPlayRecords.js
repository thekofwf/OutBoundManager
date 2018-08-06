//调用示例
//	_WindowPlayRecords = new _Window_PlayRecords();
//	_WindowPlayRecords._show(listTStcRecordLists);

var _WindowPlayRecords = null;
// 初始化
function _Window_PlayRecords() {
	this.idWindow = "baseWindowPlayRecords";
	this.idLayout = "baseLayoutPlayRecords";
	this.idDataGridPlayRecords = "baseDataGridPlayRecords";
	this.idMediaPlayer = "ctrlMediaPlayer";

	this.mapId2Obj = new _Map();
	this.mapId2ObjSelect = new _Map();

	_WindowPlayRecords = this;

	// 显示窗口
	_divShow(_WindowPlayRecords.idWindow);
	// 创建窗口
	_uieWindowCreate(_WindowPlayRecords.idWindow, "录音", "icon-search", false, 400, 600, false, false, false, true, true);
	// 设置关闭窗口回调
	_uieWindowOnClose(_WindowPlayRecords.idWindow, _WindowPlayRecords.oncloseWindow);

	// 初始化layout
	_uieLayoutInitialize(_WindowPlayRecords.idLayout, true);

	// 初始化录音datagrid
	var toolbarButtons = new Array();
	var index = 0;
	toolbarButtons[index++] = _uieDataGridCreateToolbarButton("播放", "icon-search", _WindowPlayRecords.play);
	toolbarButtons[index++] = _uieDataGridCreateToolbarButton("下载", "icon-save", _WindowPlayRecords.download);
	toolbarButtons[index++] = "-";
	var frozenColumns = new Array();
	var columns = new Array();
	index = 0;
	columns[index++] = _uieDataGridCreateColumn("id", "", true, 0, false, "center", "center", true, "asc");
	columns[index++] = _uieDataGridCreateColumn("no", "编号", false, 50, false, "center", "center", true, "asc");
	columns[index++] = _uieDataGridCreateColumn("beginDT", "开始时间", false, 100, false, "center", "center", true, "asc");
	columns[index++] = _uieDataGridCreateColumn("filePath", "文件", false, 200, false, "center", "center", true, "asc");
	_uieDataGridInitialize(_WindowPlayRecords.idDataGridPlayRecords, "录音", "icon-search", true, false, "id", toolbarButtons, frozenColumns, columns);
	_uieDataGridResize(_WindowPlayRecords.idDataGridPlayRecords);

	// 关闭窗口
	_uieWindowClose(_WindowPlayRecords.idWindow);
}
// 显示窗口
_Window_PlayRecords.prototype._show = function(listOrktapes) {
	if (_WindowPlayRecords == null) {
		return;
	}

	_uieDataGridDeleteAllRows(_WindowPlayRecords.idDataGridPlayRecords);
	for ( var i = 0; i < listOrktapes.length; i++) {
		var orktape = listOrktapes[i];
		var row = {};
		// id
		row["id"] = i;
		// 编号
		row["no"] = i + 1;
		// 开始时间
		row["beginDT"] = orktape.timestamp;
		// 文件
		row["filePath"] = orktape.fileName;

		_uieDataGridAppendRow(_WindowPlayRecords.idDataGridPlayRecords, row);
	}

	// 显示窗口
	_uieWindowShow(_WindowPlayRecords.idWindow);
};
// 窗口关闭回调
_Window_PlayRecords.prototype.oncloseWindow = function() {
	if (_WindowPlayRecords == null) {
		return;
	}

	var media = _uibGetObjectById(_WindowPlayRecords.idMediaPlayer);
	media.controls.stop();
};
// 播放录音
_Window_PlayRecords.prototype.play = function() {
	if (_WindowPlayRecords == null) {
		return;
	}

	var filePath = _uieDataGridGetSelectRowId(_WindowPlayRecords.idDataGridPlayRecords, "filePath");
	if (filePath == "") {
		_uieMessagerInfo("提示", "请选择一条录音！");
		return;
	}
	var media = _uibGetObjectById(_WindowPlayRecords.idMediaPlayer);
	// media.url = "http://192.168.139.128:8080/UnisonWeb2.0/1.wav";
	media.url = filePath;
};
// 下载录音
_Window_PlayRecords.prototype.download = function() {
	if (_WindowPlayRecords == null) {
		return;
	}

	var filePath = _uieDataGridGetSelectRowId(_WindowPlayRecords.idDataGridPlayRecords, "filePath");
	if (filePath == "") {
		_uieMessagerInfo("提示", "请选择一条录音！");
		return;
	}
	// window.location = filePath;
	window.open(filePath);
};
