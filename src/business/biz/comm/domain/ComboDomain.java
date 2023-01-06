package business.biz.comm.domain;

import common.base.BaseModel;

public class ComboDomain extends BaseModel {
	private String   comboValue			= null;
	private String   comboText 			= null;


	public String getComboValue() {
		return comboValue;
	}
	public void setComboValue(String comboValue) {
		this.comboValue = comboValue;
	}
	public String getComboText() {
		return comboText;
	}
	public void setComboText(String comboText) {
		this.comboText = comboText;
	}


}