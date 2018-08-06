package sunin.outbound.model;

public class User {
	private String userName;
	private String userPwd;
	private String userLevel;
	private int maxConcurrent;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getUserLevel() {
		return userLevel;
	}

	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}

	public int getMaxConcurrent() {
		return maxConcurrent;
	}

	public void setMaxConcurrent(int maxConcurrent) {
		this.maxConcurrent = maxConcurrent;
	}

	public User() {
		super();
	}

	public User(String userName, String userPwd, String userLevel, int maxConcurrent) {
		super();
		this.userName = userName;
		this.userPwd = userPwd;
		this.userLevel = userLevel;
		this.maxConcurrent = maxConcurrent;
	}

	@Override
	public String toString() {
		return "Batch [userName=" + userName + ", userPwd=" + userPwd + ", userLevel=" + userLevel + ", maxConcurrent=" + maxConcurrent + "]";
	}

}
