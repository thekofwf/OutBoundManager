function _Const_Batch() {

}

// 当前状态
// 执行
_Const_Batch._BatchState_Run = "Run";
// 停止
_Const_Batch._BatchState_Stop = "Stop";
// 删除
_Const_Batch._BatchState_Delete = "Delete";

_Const_Batch._getBatchStateName = function(batchState) {
	if (_Const_Batch._BatchState_Run.toLowerCase() == batchState.toLowerCase()) {
		return "运行";
	} else if (_Const_Batch._BatchState_Stop.toLowerCase() == batchState.toLowerCase()) {
		return "停止";
	} else if (_Const_Batch._BatchState_Delete.toLowerCase() == batchState.toLowerCase()) {
		return "删除";
	} else {
		return batchState;
	}
};
