package sunin.outbound.model.define;

import global.tools.ToolConvert;

import java.util.HashMap;
import java.util.Map;

public class ConstJobList {
	public final static String TableName_Real_Prefix = "JOBLIST";
	public final static String TableName_Prefix = "JobList";
	public final static String id = "ID";
	public final static String taskId = "TASKID";
	public final static String taskBatchId = "TASKBATCHID";
	public final static String dnis = "DNIS";
	public final static String attempts = "ATTEMPTS";
	public final static String currentStatus = "CURRENT_STATUS";
	public final static String finalStatus = "FINAL_STATUS";
	public final static String nextRetry = "NEXT_RETRY";
	public final static String reasonCode = "REASON_CODE";
	public final static String rna = "RNA";
	public final static String cli = "CLI";
	public final static String uui = "UUI";
	public final static String lastUpdated = "LAST_UPDATED";
	public final static String startTime = "START_TIME";
	public final static String endTime = "END_TIME";
	public final static String callId = "CALLID";

	public final static String currentStatus_Default = "NOT_READY";
	public final static String currentStatus_Run = "OUTDIAL_PENDING";
	public final static String currentStatus_Stop = "NOT_READY";
	public final static String currentStatus_Delete = "DELETE";
	public final static String currentStatus_NotEligible = "NOT_ELIGIBLE";
	public final static String currentStatus_OutDialPending = "OUTDIAL_PENDING";
	public final static String currentStatus_OutDialInProgress = "OUTDIAL_IN_PROGRESS";
	public final static String currentStatus_OutDialAttemptesExhausted = "OUTDIAL_ATTEMPTS_EXHAUSTED";

	public final static String finalStatus_Default = "FAILURE";
	public final static String finalStatus_Success = "SUCCESS";
	public final static String finalStatus_Failure = "FAILURE";

	public final static String reasonCode_Default = "";
	public final static String reasonCode_Connected = "connected";
	public final static String reasonCode_NoAnswer = "noanswer";
	public final static String reasonCode_Ls005 = "ls_005";
	public final static String reasonCode_Ls009 = "ls_009";
	public final static String reasonCode_Busy = "busy";
	public final static String reasonCode_InvalidNumber = "invalid_number";
	public final static String reasonCode_Disconnect = "disconnect";

	public static Map<String, String> getSelectJobListsCountParam(String table, String condition) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("table", table);
		map.put("condition", condition);
		return map;
	}

	public static Map<String, String> getSelectJobListsParam(String table, String condition) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("table", table);
		map.put("condition", condition);
		return map;
	}

	public static String getReasonCodeName(String sReasonCode) {
		sReasonCode = ToolConvert.toString(sReasonCode);

		if (sReasonCode.compareToIgnoreCase(reasonCode_Connected) == 0) {
			return "接通";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_NoAnswer) == 0) {
			return "无应答";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_Ls005) == 0) {
			return "无效号码";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_Ls009) == 0) {
			return "无连接";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_Busy) == 0) {
			return "忙音";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_InvalidNumber) == 0) {
			return "无效号码";
		} else if (sReasonCode.compareToIgnoreCase(reasonCode_Disconnect) == 0) {
			return "无连接";
		} else {
			return sReasonCode;
		}
	}

	public static String getFinalStatusName(String sFinalStatus) {
		sFinalStatus = ToolConvert.toString(sFinalStatus);

		if (sFinalStatus.compareToIgnoreCase(finalStatus_Success) == 0) {
			return "成功";
		} else if (sFinalStatus.compareToIgnoreCase(finalStatus_Failure) == 0) {
			return "失败";
		} else {
			return sFinalStatus;
		}
	}

	public static String getCurrentStatusName(String sCurrentStatus) {
		sCurrentStatus = ToolConvert.toString(sCurrentStatus);

		if (sCurrentStatus.compareToIgnoreCase(currentStatus_Run) == 0) {
			return "待拨";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_Stop) == 0) {
			return "暂停使用";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_Delete) == 0) {
			return "删除";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_NotEligible) == 0) {
			return "拨打结束";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_OutDialPending) == 0) {
			return "待拨";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_OutDialInProgress) == 0) {
			return "拨打中";
		} else if (sCurrentStatus.compareToIgnoreCase(currentStatus_OutDialAttemptesExhausted) == 0) {
			return "拨打超次";
		} else {
			return sCurrentStatus;
		}
	}

}
