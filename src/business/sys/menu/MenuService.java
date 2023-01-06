package business.sys.menu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.CommUtils;


/**
 * Program Name    : MenuService
 * Description     : 메누관리 service
 * Programmer Name : NJS
 * Creation Date   : 2019-10-22
 * Used Table(주요) : 
 *
 * @author NJS
 *
 */
@Service
@SuppressWarnings("all")
public class MenuService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	// Menu List (For Main)
	public List listMainMenu(Map reqMap) throws Exception {
		List list = null;
		list = dao.list("Menu.listMainMenu", reqMap);
		return list;
	}

	// 메뉴관리] 메뉴리스트 조회
//	public List listMenu(Map paramMap) {
//		return (List)dao.list("Menu.listMenu", paramMap);
//	}

	// 메뉴관리] 상위메뉴 조회(콤보용)
	public List listComboMenu(Map paramMap) {
		return (List)dao.list("Menu.listComboMenu", paramMap);
	}

	// 메뉴관리] 메뉴 상세조회
	public Map viewMenu(Map paramMap) {
		return (HashMap)dao.view("Menu.viewMenu", paramMap);
	}

	// 메뉴관리] 메뉴 저장(등록, 수정)
	public int saveMenu(Map paramMap) {
		int cnt = 0;

		cnt = (Integer)dao.update("Menu.updtMenu", paramMap);

		if (cnt == 0)
			cnt = (Integer)dao.update("Menu.regiMenu", paramMap);

		return cnt;
	}

	// 메뉴관리] 메뉴 삭제
	public int deltMenu(Map paramMap) {
		int cnt = 0;
		String menuId	= CommUtils.nvl((String)paramMap.get("menuId"));

		if (!menuId.equals(""))
			dao.update("RoleMenu.deltRoleByMenu", paramMap);

		cnt = dao.update("Menu.deltMenu", paramMap);

		return cnt;
	}
	
	public List getMenuList() {
		return dao.list("Menu.getMenuList");
	}
	
	public List getRoleAccessableMenu(Map paramMap) {
		return dao.list("Menu.getRoleAccessableMenu", paramMap);
	}
	
	public boolean delAccessableMenu(Map paramMap) {
		return dao.delete("Menu.delAccessableMenu", paramMap) == 1 ? true : false;
	}
	
	public boolean addAccessableMenu(Map paramMap) {
		try {
			dao.insert("Menu.addAccessableMenu", paramMap);
			return true;
		} catch(Exception e) {
			return false;
		}
	}
}
