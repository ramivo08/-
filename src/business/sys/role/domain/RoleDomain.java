package business.sys.role.domain;

import common.base.BaseModel;

public class RoleDomain extends BaseModel {
	private String roleId			= null;
	private String parentRoleId		= null;
	private String roleNm			= null;
	private String orgRoleId		= null;
	private String rolePwd		= null;

	
	private String srchRoleId		= null;
	private String roleOrg		= null;
	
	
	
	
	public String getRoleOrg() {
		return roleOrg;
	}
	public void setRoleOrg(String roleOrg) {
		this.roleOrg = roleOrg;
	}
	public String getRolePwd() {
		return rolePwd;
	}
	public void setRolePwd(String rolePwd) {
		this.rolePwd = rolePwd;
	}


	public String getSrchRoleId() {
		return srchRoleId;
	}
	public void setSrchRoleId(String srchRoleId) {
		this.srchRoleId = srchRoleId;
	}
	public String getOrgRoleId() {
		return orgRoleId;
	}
	public void setOrgRoleId(String orgRoleId) {
		this.orgRoleId = orgRoleId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getParentRoleId() {
		return parentRoleId;
	}
	public void setParentRoleId(String parentRoleId) {
		this.parentRoleId = parentRoleId;
	}
	public String getRoleNm() {
		return roleNm;
	}
	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}
}