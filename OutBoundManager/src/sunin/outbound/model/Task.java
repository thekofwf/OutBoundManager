package sunin.outbound.model;

public class Task {
	private int taskId;
	private String taskName;
	private String maxConcurrentCall;
	private String ani;
	private String applicationName;
	private String startTime1;
	private String endTime1;
	private String startTime2;
	private String endTime2;
	private String startTime3;
	private String endTime3;
	private String startTime4;
	private String endTime4;
	private String startDate;
	private String endDate;
	private String currentState;
	private String mondayFlag;
	private String tuesdayFlag;
	private String wednesdayFlag;
	private String thursdayFlag;
	private String fridayFlag;
	private String saturdayFlag;
	private String sundayFlag;
	private String rna;
	private int maxAttempts;
	private String realTimeConcurrentCall;
	private String retryInterval;
	private String userId;

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getMaxConcurrentCall() {
		return maxConcurrentCall;
	}

	public void setMaxConcurrentCall(String maxConcurrentCall) {
		this.maxConcurrentCall = maxConcurrentCall;
	}

	public String getAni() {
		return ani;
	}

	public void setAni(String ani) {
		this.ani = ani;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getStartTime1() {
		return startTime1;
	}

	public void setStartTime1(String startTime1) {
		this.startTime1 = startTime1;
	}

	public String getEndTime1() {
		return endTime1;
	}

	public void setEndTime1(String endTime1) {
		this.endTime1 = endTime1;
	}

	public String getStartTime2() {
		return startTime2;
	}

	public void setStartTime2(String startTime2) {
		this.startTime2 = startTime2;
	}

	public String getEndTime2() {
		return endTime2;
	}

	public void setEndTime2(String endTime2) {
		this.endTime2 = endTime2;
	}

	public String getStartTime3() {
		return startTime3;
	}

	public void setStartTime3(String startTime3) {
		this.startTime3 = startTime3;
	}

	public String getEndTime3() {
		return endTime3;
	}

	public void setEndTime3(String endTime3) {
		this.endTime3 = endTime3;
	}

	public String getStartTime4() {
		return startTime4;
	}

	public void setStartTime4(String startTime4) {
		this.startTime4 = startTime4;
	}

	public String getEndTime4() {
		return endTime4;
	}

	public void setEndTime4(String endTime4) {
		this.endTime4 = endTime4;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getCurrentState() {
		return currentState;
	}

	public void setCurrentState(String currentState) {
		this.currentState = currentState;
	}

	public String getMondayFlag() {
		return mondayFlag;
	}

	public void setMondayFlag(String mondayFlag) {
		this.mondayFlag = mondayFlag;
	}

	public String getTuesdayFlag() {
		return tuesdayFlag;
	}

	public void setTuesdayFlag(String tuesdayFlag) {
		this.tuesdayFlag = tuesdayFlag;
	}

	public String getWednesdayFlag() {
		return wednesdayFlag;
	}

	public void setWednesdayFlag(String wednesdayFlag) {
		this.wednesdayFlag = wednesdayFlag;
	}

	public String getThursdayFlag() {
		return thursdayFlag;
	}

	public void setThursdayFlag(String thursdayFlag) {
		this.thursdayFlag = thursdayFlag;
	}

	public String getFridayFlag() {
		return fridayFlag;
	}

	public void setFridayFlag(String fridayFlag) {
		this.fridayFlag = fridayFlag;
	}

	public String getSaturdayFlag() {
		return saturdayFlag;
	}

	public void setSaturdayFlag(String saturdayFlag) {
		this.saturdayFlag = saturdayFlag;
	}

	public String getSundayFlag() {
		return sundayFlag;
	}

	public void setSundayFlag(String sundayFlag) {
		this.sundayFlag = sundayFlag;
	}

	public String getRna() {
		return rna;
	}

	public void setRna(String rna) {
		this.rna = rna;
	}

	public int getMaxAttempts() {
		return maxAttempts;
	}

	public void setMaxAttempts(int maxAttempts) {
		this.maxAttempts = maxAttempts;
	}

	public String getRealTimeConcurrentCall() {
		return realTimeConcurrentCall;
	}

	public void setRealTimeConcurrentCall(String realTimeConcurrentCall) {
		this.realTimeConcurrentCall = realTimeConcurrentCall;
	}

	public String getRetryInterval() {
		return retryInterval;
	}

	public void setRetryInterval(String retryInterval) {
		this.retryInterval = retryInterval;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Task() {
		super();
	}

	public Task(int taskId, String taskName, String maxConcurrentCall, String ani, String applicationName, String startTime1, String endTime1, String startTime2, String endTime2,
			String startTime3, String endTime3, String startTime4, String endTime4, String startDate, String endDate, String currentState, String mondayFlag, String tuesdayFlag, String wednesdayFlag,
			String thursdayFlag, String fridayFlag, String saturdayFlag, String sundayFlag, String rna, int maxAttempts, String realTimeConcurrentCall, String retryInterval, String userId) {
		super();
		this.taskId = taskId;
		this.taskName = taskName;
		this.maxConcurrentCall = maxConcurrentCall;
		this.ani = ani;
		this.applicationName = applicationName;
		this.startTime1 = startTime1;
		this.endTime1 = endTime1;
		this.startTime2 = startTime2;
		this.endTime2 = endTime2;
		this.startTime3 = startTime3;
		this.endTime3 = endTime3;
		this.startTime4 = startTime4;
		this.endTime4 = endTime4;
		this.startDate = startDate;
		this.endDate = endDate;
		this.currentState = currentState;
		this.mondayFlag = mondayFlag;
		this.tuesdayFlag = tuesdayFlag;
		this.wednesdayFlag = wednesdayFlag;
		this.thursdayFlag = thursdayFlag;
		this.fridayFlag = fridayFlag;
		this.saturdayFlag = saturdayFlag;
		this.sundayFlag = sundayFlag;
		this.rna = rna;
		this.maxAttempts = maxAttempts;
		this.realTimeConcurrentCall = realTimeConcurrentCall;
		this.retryInterval = retryInterval;
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Task [taskId=" + taskId + ", taskName=" + taskName + ", maxConcurrentCall=" + maxConcurrentCall + ", ani=" + ani + ", applicationName=" + applicationName + ", startTime1="
				+ startTime1 + ", endTime1=" + endTime1 + ", startTime2=" + startTime2 + ", endTime2=" + endTime2 + ", startTime3=" + startTime3 + ", endTime3=" + endTime3 + ", startTime4="
				+ startTime4 + ", endTime4=" + endTime4 + ", startDate=" + startDate + ", endDate=" + endDate + ", currentState=" + currentState + ", mondayFlag=" + mondayFlag + ", tuesdayFlag="
				+ tuesdayFlag + ", wednesdayFlag=" + wednesdayFlag + ", thursdayFlag=" + thursdayFlag + ", fridayFlag=" + fridayFlag + ", saturdayFlag=" + saturdayFlag + ", sundayFlag=" + sundayFlag
				+ ", rna=" + rna + ", maxAttempts=" + maxAttempts + ", realTimeConcurrentCall=" + realTimeConcurrentCall + ", retryInterval=" + retryInterval + ", userId=" + userId + "]";
	}

}
