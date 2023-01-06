package business.biz.target;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import business.biz.FileService;
import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.paging.PaginatedArrayList;


@Service
@SuppressWarnings({"rawtypes"})
public class TargetService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;
	
	@Autowired
	private FileService fileService;
	
	



	public PaginatedArrayList searchTargetList(Map paramMap, int currPage, int pageSize) {
		// TODO Auto-generated method stub
		return dao.pageList("Target.searchTargetList",paramMap,currPage,pageSize);
	}





	public List searchProcessList(Map paramMap) {
		// TODO Auto-generated method stub
		return dao.list("Target.searchProcessList",paramMap);
	}





	public Map selectTargetMap(Map paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap<String,Object>();
		
		resultMap = (Map) dao.select("Target.selectTargetMap",paramMap);
		return resultMap;
	}










	


	



}
