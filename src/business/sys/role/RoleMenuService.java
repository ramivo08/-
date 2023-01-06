package business.sys.role;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;

@Service
@SuppressWarnings("all")
public class RoleMenuService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	public List listRoleByMenu(Map paramMap) {
		return (List)dao.list("RoleMenu.listRoleByMenu", paramMap);
	}

	public List listNotRoleByMenu(Map paramMap) {
		return (List)dao.list("RoleMenu.listNotRoleByMenu", paramMap);
	}

	// 권한별 메뉴정보 저장
	public int saveRoleByMenu(Map paramMap) {
		int cnt = 0;

		String[] arrMenuId		= (String[])paramMap.get("arrMenuId");
		String[] arrRoleMenuId	= (String[])paramMap.get("arrRoleMenuId");

		if (arrMenuId != null) {
			for (int i = 0; i < arrMenuId.length; i++) {
				paramMap.put("menuId", (String)arrMenuId[i]);
				cnt += dao.update("RoleMenu.regiRoleByMenu", paramMap);
			}
		}

		if (arrRoleMenuId != null) {
			for (int i = 0; i < arrRoleMenuId.length; i++) {
				paramMap.put("menuId", (String)arrRoleMenuId[i]);
				cnt += dao.update("RoleMenu.deltRoleByMenu", paramMap);
			}
		}

		return cnt;
	}

}