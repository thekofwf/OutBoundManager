package sunin.outbound.model;

import global.tools.ToolDateTime;
import sunin.outbound.model.define.ConstJobList;

public class JobList {
	private int id;
	private String taskId;
	private String taskBatchId;
	private String dnis;
	private String attempts;
	private String currentStatus;
	private String finalStatus;
	private String nextRetry;
	private String reasonCode;
	private String rna;
	private String cli;
	private String uui;
	private String lastUpdated;
	private String startTime;
	private String endTime;
	private String callId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskBatchId() {
		return taskBatchId;
	}

	public void setTaskBatchId(String taskBatchId) {
		this.taskBatchId = taskBatchId;
	}

	public String getDnis() {
		return dnis;
	}

	public void setDnis(String dnis) {
		this.dnis = dnis;
	}

	public String getAttempts() {
		return attempts;
	}

	public void setAttempts(String attempts) {
		this.attempts = attempts;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}

	public String getFinalStatus() {
		return finalStatus;
	}

	public void setFinalStatus(String finalStatus) {
		this.finalStatus = finalStatus;
	}

	public String getNextRetry() {
		return nextRetry;
	}

	public void setNextRetry(String nextRetry) {
		this.nextRetry = nextRetry;
	}

	public String getReasonCode() {
		return reasonCode;
	}

	public void setReasonCode(String reasonCode) {
		this.reasonCode = reasonCode;
	}

	public String getRna() {
		return rna;
	}

	public void setRna(String rna) {
		this.rna = rna;
	}

	public String getCli() {
		return cli;
	}

	public void setCli(String cli) {
		this.cli = cli;
	}

	public String getUui() {
		return uui;
	}

	public void setUui(String uui) {
		this.uui = uui;
	}

	public String getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getCallId() {
		return callId;
	}

	public void setCallId(String callId) {
		this.callId = callId;
	}

	public JobList() {
		super();
	}

	public JobList(int id, String taskId, String taskBatchId, String dnis, String attempts, String currentStatus, String finalStatus, String nextRetry, String reasonCode, String rna, String cli,
			String uui, String lastUpdated, String startTime, String endTime, String callId) {
		super();
		this.id = id;
		this.taskId = taskId;
		this.taskBatchId = taskBatchId;
		this.dnis = dnis;
		this.attempts = attempts;
		this.currentStatus = currentStatus;
		this.finalStatus = finalStatus;
		this.nextRetry = nextRetry;
		this.reasonCode = reasonCode;
		this.rna = rna;
		this.cli = cli;
		this.uui = uui;
		this.lastUpdated = lastUpdated;
		this.startTime = startTime;
		this.endTime = endTime;
		this.callId = callId;
	}

	public void initializeValue(String[] values, String taskId, String taskBatchId) {
		int nLength = values.length;
		int nIndex = 0;

		this.id = 0;
		nIndex++;

		this.taskId = taskId;
		this.taskBatchId = taskBatchId;

		if (nLength > nIndex) {
			this.dnis = values[nIndex++];
		}
		this.attempts = "0";
		this.currentStatus = ConstJobList.currentStatus_Default;
		this.finalStatus = ConstJobList.finalStatus_Default;
		this.nextRetry = ToolDateTime.getDT();
		this.reasonCode = ConstJobList.reasonCode_Default;
		this.rna = "0";
		this.cli = "";
		this.uui = "";
		this.lastUpdated = this.nextRetry;
		this.startTime = this.nextRetry;
		this.endTime = this.nextRetry;
	}

	@Override
	public String toString() {
		return "JobList [id=" + id + ", taskId=" + taskId + ", taskBatchId=" + taskBatchId + ", dnis=" + dnis + ", attempts=" + attempts + ", currentStatus=" + currentStatus + ", finalStatus="
				+ finalStatus + ", nextRetry=" + nextRetry + ", reasonCode=" + reasonCode + ", rna=" + rna + ", cli=" + cli + ", uui=" + uui + ", lastUpdated=" + lastUpdated + ", startTime="
				+ startTime + ", endTime=" + endTime + ", callId=" + callId + "]";
	}

}
