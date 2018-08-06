function _Const_Application() {

}

_Const_Application._Status_Normal = "Normal";
_Const_Application._Status_Deleted = "Deleted";

_Const_Application._getStatusName = function(status) {
	if (_Const_Application._Status_Normal.toLowerCase() == status.toLowerCase()) {
		return "正常";
	} else if (_Const_Application._Status_Deleted.toLowerCase() == status.toLowerCase()) {
		return "删除";
	} else {
		return reasonCode;
	}
};
