package business.sys.role;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;

@Service
@SuppressWarnings("all")
public class RoleProgService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	public List listRoleByProg(Map paramMap) {
		return (List)dao.list("RoleProg.listRoleByProg", paramMap);
	}

	public List listNotRoleByProg(Map paramMap) {
		return (List)dao.list("RoleProg.listNotRoleByProg", paramMap);
	}

	// 권한별 프로그램정보 저장
	public int saveRoleByProg(Map paramMap) {
		int cnt = 0;

		String[] arrProgId		= (String[])paramMap.get("arrProgId");
		String[] arrRoleProgId	= (String[])paramMap.get("arrRoleProgId");

		if (arrProgId != null) {
			for (int i = 0; i < arrProgId.length; i++) {
				paramMap.put("progId", (String)arrProgId[i]);
				cnt += dao.update("RoleProg.regiRoleByProg", paramMap);
			}
		}

		if (arrRoleProgId != null) {
			for (int i = 0; i < arrRoleProgId.length; i++) {
				paramMap.put("progId", (String)arrRoleProgId[i]);
				cnt += dao.update("RoleProg.deltRoleByProg", paramMap);
			}
		}

		return cnt;
	}

}