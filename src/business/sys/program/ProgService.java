package business.sys.program;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.CommUtils;

@Service
@SuppressWarnings("all")
public class ProgService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	/**
	 * 프로그램 정보 조회
	 * @param reqMap
	 * @return
	 */
	public Map getProgInfo(Map reqMap) {
		Map progInfo = (HashMap)dao.view("Prog.getProgInfo", reqMap);
		List pathList	= null;

		if (progInfo != null) {
			String[] menuPath	= CommUtils.split((String)progInfo.get("menuPath"), ",");
			String[] urlPath	= CommUtils.split((String)progInfo.get("urlPath"), ",");

			if (menuPath != null) {
				pathList	= new ArrayList();
				for (int i = 0; i < menuPath.length; i++) {
					Map pathmap = new HashMap();
					pathmap.put("menuPath", menuPath[i]);
					pathmap.put("urlPath", urlPath[i]);

					pathList.add(pathmap);
				}
			}
			progInfo.put("pathList", pathList);
		}
		return progInfo;
	}


	// 프로그램관리] 프로그램리스트 조회
	public List listProg(Map paramMap) {
		return (List)dao.list("Prog.listProg", paramMap);
	}

	// 프로그램관리] 프로그램 상세조회
	public Map viewProg(Map paramMap) {
		return (HashMap)dao.view("Prog.viewProg", paramMap);
	}

	// 프로그램관리] 프로그램 저장(등록, 수정)
	public int saveProg(Map paramMap) {
		int cnt = 0;

		cnt = (Integer)dao.update("Prog.updtProg", paramMap);

		if (cnt == 0)
			cnt = (Integer)dao.update("Prog.regiProg", paramMap);

		return cnt;
	}

	// 프로그램관리] 프로그램 삭제
	public int deltProg(Map paramMap) {
		int cnt = 0;

		String progId	= CommUtils.nvl((String)paramMap.get("progId"));

		if (!progId.equals(""))
			dao.update("RoleProg.deltRoleByProg", paramMap);	// 롤프로그램 삭제

		cnt = dao.update("Prog.deltProg", paramMap);

		return cnt;
	}

}
