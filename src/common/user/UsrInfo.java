package common.user;

import java.io.Serializable;

@SuppressWarnings("all")
public class UsrInfo implements Serializable {
	private String userId		= null;
	private String userNm		= null;

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserNm() {
		return userNm;
	}
	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

}

