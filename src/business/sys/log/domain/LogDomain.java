package business.sys.log.domain;

import common.base.BaseModel;

public class LogDomain extends BaseModel {

	private String srchDate				= null;
	private String srchFromDate			= null;
	private String srchToDate			= null;
	private String srchUserNm			= null;


	public String getSrchDate() {
		return srchDate;
	}
	public void setSrchDate(String srchDate) {
		this.srchDate = srchDate;
	}
	public String getSrchUserNm() {
		return srchUserNm;
	}
	public void setSrchUserNm(String srchUserNm) {
		this.srchUserNm = srchUserNm;
	}
	public String getSrchFromDate() {
		return srchFromDate;
	}
	public void setSrchFromDate(String srchFromDate) {
		this.srchFromDate = srchFromDate;
	}
	public String getSrchToDate() {
		return srchToDate;
	}
	public void setSrchToDate(String srchToDate) {
		this.srchToDate = srchToDate;
	}


}