function _Const_Data() {

}

_Const_Data._ReasonCode_Connected = "connected";
_Const_Data._ReasonCode_NoAnswer = "noanswer";
_Const_Data._ReasonCode_Ls005 = "ls_005";
_Const_Data._ReasonCode_Ls009 = "ls_009";
_Const_Data._ReasonCode_Busy = "busy";
_Const_Data._ReasonCode_InvalidNumber = "invalid_number";
_Const_Data._ReasonCode_Disconnect = "disconnect";

_Const_Data._FinalStatus_Success = "SUCCESS";
_Const_Data._FinalStatus_Failure = "FAILURE";

_Const_Data._CurrentStatus_Run = "OUTDIAL_PENDING";
_Const_Data._CurrentStatus_Stop = "NOT_READY";
_Const_Data._CurrentStatus_Delete = "DELETE";
_Const_Data._CurrentStatus_NotEligible = "NOT_ELIGIBLE";
_Const_Data._CurrentStatus_OutDialPending = "OUTDIAL_PENDING";
_Const_Data._CurrentStatus_OutDialInProgress = "OUTDIAL_IN_PROGRESS";
_Const_Data._CurrentStatus_OutDialAttemptesExhausted = "OUTDIAL_ATTEMPTS_EXHAUSTED";

_Const_Data._getReasonCodeName = function(reasonCode) {
	if (_Const_Data._ReasonCode_Connected.toLowerCase() == reasonCode.toLowerCase()) {
		return "接通";
	} else if (_Const_Data._ReasonCode_NoAnswer.toLowerCase() == reasonCode.toLowerCase()) {
		return "无应答";
	} else if (_Const_Data._ReasonCode_Ls005.toLowerCase() == reasonCode.toLowerCase()) {
		return "无效号码";
	} else if (_Const_Data._ReasonCode_Ls009.toLowerCase() == reasonCode.toLowerCase()) {
		return "无连接";
	} else if (_Const_Data._ReasonCode_Busy.toLowerCase() == reasonCode.toLowerCase()) {
		return "忙音";
	} else if (_Const_Data._ReasonCode_InvalidNumber.toLowerCase() == reasonCode.toLowerCase()) {
		return "无效号码";
	} else if (_Const_Data._ReasonCode_Disconnect.toLowerCase() == reasonCode.toLowerCase()) {
		return "无连接";
	} else {
		return reasonCode;
	}
};

_Const_Data._getFinalStatusName = function(finalStatus) {
	if (_Const_Data._FinalStatus_Success.toLowerCase() == finalStatus.toLowerCase()) {
		return "成功";
	} else if (_Const_Data._FinalStatus_Failure.toLowerCase() == finalStatus.toLowerCase()) {
		return "失败";
	} else {
		return finalStatus;
	}
};

_Const_Data._getCurrentStatusName = function(currentStatus) {
	if (_Const_Data._CurrentStatus_Run.toLowerCase() == currentStatus.toLowerCase()) {
		return "待拨";
	} else if (_Const_Data._CurrentStatus_Stop.toLowerCase() == currentStatus.toLowerCase()) {
		return "暂停使用";
	} else if (_Const_Data._CurrentStatus_Delete.toLowerCase() == currentStatus.toLowerCase()) {
		return "删除";
	} else if (_Const_Data._CurrentStatus_NotEligible.toLowerCase() == currentStatus.toLowerCase()) {
		return "拨打结束";
	} else if (_Const_Data._CurrentStatus_OutDialPending.toLowerCase() == currentStatus.toLowerCase()) {
		return "待拨";
	} else if (_Const_Data._CurrentStatus_OutDialInProgress.toLowerCase() == currentStatus.toLowerCase()) {
		return "拨打中";
	} else if (_Const_Data._CurrentStatus_OutDialAttemptesExhausted.toLowerCase() == currentStatus.toLowerCase()) {
		return "拨打超次";
	} else {
		return currentStatus;
	}
};
