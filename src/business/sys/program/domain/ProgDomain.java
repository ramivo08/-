package business.sys.program.domain;

import common.base.BaseModel;

public class ProgDomain extends BaseModel {
	private String progId;
	private String progNm;
	private String progPattern;
	private String progType;
	private String menuId;
	private String secuLvl;
	private String progOdr;
	private String regiId;
	private String regiDate;
	private String updtId;
	private String updtDate;

	private String orgProgId;
	private String srchProgNm;

	public String getSrchProgNm() {
		return srchProgNm;
	}

	public void setSrchProgNm(String srchProgNm) {
		this.srchProgNm = srchProgNm;
	}

	public String getProgId() {
		return progId;
	}

	public void setProgId(String progId) {
		this.progId = progId;
	}

	public String getProgNm() {
		return progNm;
	}

	public void setProgNm(String progNm) {
		this.progNm = progNm;
	}

	public String getProgPattern() {
		return progPattern;
	}

	public void setProgPattern(String progPattern) {
		this.progPattern = progPattern;
	}

	public String getProgType() {
		return progType;
	}

	public void setProgType(String progType) {
		this.progType = progType;
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getSecuLvl() {
		return secuLvl;
	}

	public void setSecuLvl(String secuLvl) {
		this.secuLvl = secuLvl;
	}

	public String getProgOdr() {
		return progOdr;
	}

	public void setProgOdr(String progOdr) {
		this.progOdr = progOdr;
	}

	public String getRegiId() {
		return regiId;
	}

	public void setRegiId(String regiId) {
		this.regiId = regiId;
	}

	public String getRegiDate() {
		return regiDate;
	}

	public void setRegiDate(String regiDate) {
		this.regiDate = regiDate;
	}

	public String getUpdtId() {
		return updtId;
	}

	public void setUpdtId(String updtId) {
		this.updtId = updtId;
	}

	public String getUpdtDate() {
		return updtDate;
	}

	public void setUpdtDate(String updtDate) {
		this.updtDate = updtDate;
	}

	public String getOrgProgId() {
		return orgProgId;
	}

	public void setOrgProgId(String orgProgId) {
		this.orgProgId = orgProgId;
	}



}