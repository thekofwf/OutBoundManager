package sunin.outbound.model;

public class CallDetail {
	private int id;
	private int contentId;
	private String callerInput;
	private String lastUpdated;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getContentId() {
		return contentId;
	}

	public void setContentId(int contentId) {
		this.contentId = contentId;
	}

	public String getCallerInput() {
		return callerInput;
	}

	public void setCallerInput(String callerInput) {
		this.callerInput = callerInput;
	}

	public String getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public CallDetail() {
		super();
	}

	public CallDetail(int id, int contentId, String callerInput, String lastUpdated) {
		super();
		this.id = id;
		this.contentId = contentId;
		this.callerInput = callerInput;
		this.lastUpdated = lastUpdated;
	}

	@Override
	public String toString() {
		return "CallDetail [id=" + id + ", contentId=" + contentId + ", callerInput=" + callerInput + ", lastUpdated=" + lastUpdated + "]";
	}

}
