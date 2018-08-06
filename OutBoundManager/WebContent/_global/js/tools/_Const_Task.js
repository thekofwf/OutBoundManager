function _Const_Task() {

}

// 当前状态
// 执行
_Const_Task._CurrentState_Run = "Run";
// 停止
_Const_Task._CurrentState_Stop = "Stop";
// 删除
_Const_Task._CurrentState_Delete = "Delete";

_Const_Task._getCurrentStateName = function(currentState) {
	if (_Const_Task._CurrentState_Run.toLowerCase() == currentState.toLowerCase()) {
		return "运行";
	} else if (_Const_Task._CurrentState_Stop.toLowerCase() == currentState.toLowerCase()) {
		return "停止";
	} else if (_Const_Task._CurrentState_Delete.toLowerCase() == currentState.toLowerCase()) {
		return "删除";
	} else {
		return currentState;
	}
};

// 标志
_Const_Task._Flag_Yes = "Yes";
_Const_Task._Flag_No = "No";

_Const_Task._isFlagYes = function(flag) {
	if (_Const_Task._Flag_Yes.toLowerCase() == flag.toLowerCase()) {
		return true;
	}
	return false;
};

_Const_Task._getFlagName = function(flag) {
	if (_Const_Task._Flag_Yes.toLowerCase() == flag.toLowerCase()) {
		return "是";
	} else if (_Const_Task._Flag_No.toLowerCase() == flag.toLowerCase()) {
		return "否";
	} else {
		return flag;
	}
};
