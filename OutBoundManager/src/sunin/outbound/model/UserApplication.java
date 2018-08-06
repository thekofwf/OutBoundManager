package sunin.outbound.model;

public class UserApplication {
	private String id;;
	private String userName;
	private int applicationId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(int applicationId) {
		this.applicationId = applicationId;
	}

	public UserApplication() {
		super();
	}

	public UserApplication(String id, String userName, int applicationId) {
		super();
		this.id = id;
		this.userName = userName;
		this.applicationId = applicationId;
	}

	@Override
	public String toString() {
		return "UserApplication [id=" + id + ", userName=" + userName + ", applicationId=" + applicationId + "]";
	}

}
