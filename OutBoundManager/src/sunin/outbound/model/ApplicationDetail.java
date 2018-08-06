package sunin.outbound.model;

public class ApplicationDetail {
	private String applicationName;
	private int serialNumber;
	private String content;
	private int contentId;

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public int getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(int serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getContentId() {
		return contentId;
	}

	public void setContentId(int contentId) {
		this.contentId = contentId;
	}

	public ApplicationDetail() {
		super();
	}

	public ApplicationDetail(String applicationName, int serialNumber, String content, int contentId) {
		super();
		this.applicationName = applicationName;
		this.serialNumber = serialNumber;
		this.content = content;
		this.contentId = contentId;
	}

	@Override
	public String toString() {
		return "ApplicationDetail [applicationName=" + applicationName + ", serialNumber=" + serialNumber + ", content=" + content + ", contentId=" + contentId + "]";
	}

}
