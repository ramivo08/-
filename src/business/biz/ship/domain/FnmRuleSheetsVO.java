package business.biz.ship.domain;

public class FnmRuleSheetsVO {
	private int fnmRuleNum;
	private String exlShtNm;
	private String logType;
	private int dataSttIdx;
	private Object dtmIdx;
	
	public int getFnmRuleNum() {
		return fnmRuleNum;
	}
	public void setFnmRuleNum(int fnmRuleNum) {
		this.fnmRuleNum = fnmRuleNum;
	}
	public String getExlShtNm() {
		return exlShtNm;
	}
	public void setExlShtNm(String exlShtNm) {
		this.exlShtNm = exlShtNm;
	}
	public String getLogType() {
		return logType;
	}
	public void setLogType(String logType) {
		this.logType = logType;
	}
	public int getDataSttIdx() {
		return dataSttIdx;
	}
	public void setDataSttIdx(int dataSttIdx) {
		this.dataSttIdx = dataSttIdx;
	}
	public Object getDtmIdx() {
		return dtmIdx;
	}
	public void setDtmIdx(Object dtmIdx) {
		this.dtmIdx = dtmIdx;
	}	
}
