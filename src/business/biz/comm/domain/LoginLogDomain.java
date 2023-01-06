package business.biz.comm.domain;

import common.base.BaseModel;

public class LoginLogDomain extends BaseModel {

	private String userId;
	private String loginDate;
	private String loginYY;
	private String loginMT;
	private String loginDE;
	private String loginSttusCode;
	private String loginFailCode;
	private String loginIp;
	private String loginServerNm;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLoginDate() {
		return loginDate;
	}
	public void setLoginDate(String loginDate) {
		this.loginDate = loginDate;
	}
	public String getLoginYY() {
		return loginYY;
	}
	public void setLoginYY(String loginYY) {
		this.loginYY = loginYY;
	}
	public String getLoginMT() {
		return loginMT;
	}
	public void setLoginMT(String loginMT) {
		this.loginMT = loginMT;
	}
	public String getLoginDE() {
		return loginDE;
	}
	public void setLoginDE(String loginDE) {
		this.loginDE = loginDE;
	}
	public String getLoginSttusCode() {
		return loginSttusCode;
	}
	public void setLoginSttusCode(String loginSttusCode) {
		this.loginSttusCode = loginSttusCode;
	}
	public String getLoginFailCode() {
		return loginFailCode;
	}
	public void setLoginFailCode(String loginFailCode) {
		this.loginFailCode = loginFailCode;
	}
	public String getLoginIp() {
		return loginIp;
	}
	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}
	public String getLoginServerNm() {
		return loginServerNm;
	}
	public void setLoginServerNm(String loginServerNm) {
		this.loginServerNm = loginServerNm;
	}
	
	


}