package sunin.outbound.model;

public class Batch {
	private int batchId;
	private int taskId;
	private String batchName;
	private String batchState;

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public int getTaskId() {
		return taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	public String getBatchName() {
		return batchName;
	}

	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	public String getBatchState() {
		return batchState;
	}

	public void setBatchState(String batchState) {
		this.batchState = batchState;
	}

	public Batch() {
		super();
	}

	public Batch(int batchId, int taskId, String batchName, String batchState) {
		super();
		this.batchId = batchId;
		this.taskId = taskId;
		this.batchName = batchName;
		this.batchState = batchState;
	}

	@Override
	public String toString() {
		return "Batch [batchId=" + batchId + ", taskId=" + taskId + ", batchName=" + batchName + ", batchState=" + batchState + "]";
	}

}
