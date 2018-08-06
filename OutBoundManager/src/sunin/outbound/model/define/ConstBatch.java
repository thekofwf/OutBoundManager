package sunin.outbound.model.define;

public class ConstBatch {
	public final static String TableName_Real = "BATCH";
	public final static String TableName = "Batch";
	public final static String batchId = "BATCHID";
	public final static String taskId = "TASKID";
	public final static String batchName = "BATCHNAME";
	public final static String batchState = "BATCHSTATE";

	// 当前状态：运行、停止、删除
	public final static String batchState_Run = "Run";
	public final static String batchState_Stop = "Stop";
	public final static String batchState_Delete = "Delete";
}
