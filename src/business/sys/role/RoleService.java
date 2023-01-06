package business.sys.role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.CommUtils;


/**
 * Program Name    : RoleService
 * Description     : Role 관리 service
 * Programmer Name : NJS
 * Creation Date   : 2019-10-22
 * Used Table(주요) : 
 *
 * @author NJS
 *
 */
@Service
@SuppressWarnings("all")
public class RoleService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	// 롤 리스트 조회
	public List searchRoleMgmt(Map paramMap) {
		return (List)dao.list("Role.searchRoleMgmt", paramMap);
	}

	// 롤콤보
	public List listComboRole(Map paramMap) {
		return (List)dao.list("Role.listComboRole", paramMap);
	}

	// 롤콤보(롤 전체 리스트)
	public List listComboRoleAll(Map paramMap) {
		return (List)dao.list("Role.listComboRoleAll", paramMap);
	}

	// 롤 상세
	public Map viewRole(Map paramMap) {
		return (HashMap)dao.view("Role.viewRole", paramMap);
	}

	// 롤 저장
	public int saveRole(Map paramMap) {
		int cnt = 0;

		cnt = dao.update("Role.updtRole", paramMap);

		if (cnt == 0)
			cnt = dao.update("Role.regiRole", paramMap);

		return cnt;
	}

	// 롤 삭제
	public int deltRole(Map paramMap) {
		int cnt = 0;
		String roleId	= CommUtils.nvl((String)paramMap.get("roleId"));

		if (!roleId.equals("")) {
			dao.update("RoleMenu.deltRoleByMenu", 	paramMap);		// 롤메뉴 삭제
			dao.update("RoleProg.deltRoleByProg", 	paramMap);		// 롤프로그램 삭제
			dao.update("RoleUser.deltRoleByUser",	paramMap);		// 롤유저 삭제
		}

		cnt = dao.update("Role.deltRole",			paramMap);

		return cnt;
	}

}