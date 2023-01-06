package commf.dao;

import java.util.List;

import common.util.paging.PaginatedArrayList;
import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
//import egovframework.rte.psl.orm.ibatis.SqlMapClientCallback;

/**
 * @author ntarget
 * @version $Revision: 1.5 $ $Date: 2012/05/04 06:14:00 $
 * EgovAbstractDAO 상속
 * : 기본적으로 EgovAbstractDAO 상속하여 사용하고,
 *   페이징처리, 배치는 처리는 아래 메소스 상속하여 사용함.
 *
 *
 */
@SuppressWarnings("all")
public class IBatisMappingDAO extends EgovAbstractDAO {

	/**
	 * Paging 처리 리스트
	 *
	 * - 페이징 선택부분 쿼리
	 * - 전체 Count 쿼리
	 * --> 두개의 쿼리를 생성해야함.
	 *
	 * @param statementName
	 * @param parameterObject
	 * @return @
	 */
	public PaginatedArrayList pageList(String statementName, Object parameterObject, int page, int pageSize) {
		/*
		// MSSQL Only  - ntarget 2012-05-03
		if (parameterObject instanceof Map) {
			//((Map) parameterObject).put("pageNo", 		page);
			//((Map) parameterObject).put("pageSize",		pageSize);

			((Map) parameterObject).put("startPage", 	((page - 1) * pageSize) + 1);
			((Map) parameterObject).put("endPage",		((page - 1) * pageSize) + pageSize);
		}
		Object retObj = getSqlMapClientTemplate().queryForList(statementName, parameterObject);
		*/

		// queryForList = > selectList
		Object retObj = getSqlMapClientTemplate().queryForList(statementName, parameterObject, (page - 1) * pageSize, pageSize);

		// queryForObject = > selectOne
		int totalSize = ((Integer) getSqlMapClientTemplate().queryForObject(
				statementName + "Count", parameterObject)).intValue();

		PaginatedArrayList paginateList = new PaginatedArrayList((List) retObj, pageSize, totalSize);

		// start no.
		paginateList.setStartIndex((page - 1) * pageSize);

		// total size
		int totalPage = totalSize / pageSize;

		if ((totalSize % pageSize) > 0) {
			totalPage++;
		}

		if (totalPage <= 0) {
			totalPage = 1;
		}
		paginateList.setTotalPage(totalPage);

		// Current Page
		paginateList.setCurrPage(page);

		return paginateList;
	}

	/**
	 *
	 * 단건 데이터 조회.
	 *
	 * @param statementName
	 * @param parameterObject
	 * @return @
	 */
	public Object view(String statementName, Object parameterObject) {
		return getSqlMapClientTemplate().queryForObject(statementName, parameterObject);
	}

	/**
	 *
	 * Return int형 저장처리
	 *
	 * @param statementName
	 * @param parameterObject
	 * @return @
	 */
	public int save(String statementName, Object parameterObject) {
		return getSqlMapClientTemplate().update(statementName, parameterObject);
	}

	/**
	 * ntarget : Batch를 위한 excute method call
	 * @param statementName
	 * @param parameterObject
	 * @return
	 */
	public Object batch(org.springframework.orm.ibatis.SqlMapClientCallback action) {
		return getSqlMapClientTemplate().execute(action);
	}
}
