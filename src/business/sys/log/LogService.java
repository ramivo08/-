package business.sys.log;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.paging.PaginatedArrayList;

/**
 * Log Service Class
 * @author ntarget
 * @since 2017.02.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << Modification Information >>
 *    Date	         Name          	    Desc
 * ----------      --------    ---------------------------
 *  2017.02.23      ntarget      Init.
 *
 * </pre>
 */

@Service
@SuppressWarnings({"rawtypes"})
public class LogService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

    /**
     * 메뉴별 접속 리스트 조회
     */
	public PaginatedArrayList listAcchist(Map paramMap, int currPage, int pageSize) throws Exception {
		return dao.pageList("Log.listAcchist", paramMap, currPage, pageSize);
	}

	/**
	 * 사용자별 로그인이력 리스트 조회
	 */
	public PaginatedArrayList listLoghist(Map paramMap, int currPage, int pageSize) throws Exception {
		return dao.pageList("Log.listLoghist", paramMap, currPage, pageSize);
	}
	
	public PaginatedArrayList loginLogList(Map paramMap, int currPage, int pageSize) throws Exception {

		PaginatedArrayList list = dao.pageList("Log.loginLogList", paramMap, currPage, pageSize);
		
		return list;

	}
	
	public boolean loginLog(Map paramMap) {
		try {
			dao.insert("Log.loginLog",paramMap);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	public PaginatedArrayList searchCodeList(Map paramMap,int currPage, int pageSize)throws Exception {
		
		// TODO Auto-generated method stub
		return dao.pageList("Admin.searchCodeList", paramMap, currPage, pageSize);
	}

	public PaginatedArrayList searchJunkyardList(Map paramMap, int currPage, int pageSize) {
		// TODO Auto-generated method stub
		return dao.pageList("Admin.searchJunkyardList", paramMap, currPage, pageSize);
	}

}
