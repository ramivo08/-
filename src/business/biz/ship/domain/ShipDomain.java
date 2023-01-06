package business.biz.ship.domain;

import java.util.List;

public class ShipDomain {
	private String imonum;
	private String shipName;
	private String bwmsType;
	private String upfile;
	private int imo_num;
	private String fnm_rule;
	private String exl_sht_nm;
	private String bwms_type;
	private String log_type;
	private List<String> cols;
	private String data_stt_idx;
	private int[] dtm_idx;
	
	
	
	
	



	public int getImo_num() {
		return imo_num;
	}

	public void setImo_num(int imo_num) {
		this.imo_num = imo_num;
	}

	public List<String> getCols() {
		return cols;
	}

	public void setCols(List<String> cols) {
		this.cols = cols;
	}

	public int[] getDtm_idx() {
		return dtm_idx;
	}

	public void setDtm_idx(int[] dtm_idx) {
		this.dtm_idx = dtm_idx;
	}

	public String getFnm_rule() {
		return fnm_rule;
	}

	public void setFnm_rule(String fnm_rule) {
		this.fnm_rule = fnm_rule;
	}

	public String getExl_sht_nm() {
		return exl_sht_nm;
	}

	public void setExl_sht_nm(String exl_sht_nm) {
		this.exl_sht_nm = exl_sht_nm;
	}

	public String getBwms_type() {
		return bwms_type;
	}

	public void setBwms_type(String bwms_type) {
		this.bwms_type = bwms_type;
	}

	public String getLog_type() {
		return log_type;
	}

	public void setLog_type(String log_type) {
		this.log_type = log_type;
	}

	public String getData_stt_idx() {
		return data_stt_idx;
	}

	public void setData_stt_idx(String data_stt_idx) {
		this.data_stt_idx = data_stt_idx;
	}

	public String getUpfile() {
		return upfile;
	}

	public void setUpfile(String upfile) {
		this.upfile = upfile;
	}

	public String getBwmsType() {
		return bwmsType;
	}

	public void setBwmsType(String bwmsType) {
		this.bwmsType = bwmsType;
	}

	public String getImonum() {
		return imonum;
	}

	public void setImonum(String imonum) {
		this.imonum = imonum;
	}

	public String getShipName() {
		return shipName;
	}

	public void setShipName(String shipName) {
		this.shipName = shipName;
	}
	

}
