package business.biz.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import commf.dao.CommonDAOImpl;
import commf.message.Message;
import common.base.BaseService;
import common.util.CommUtils;
import common.util.properties.ApplicationProperty;

@Service
@SuppressWarnings({ "unchecked" })
public class MapService extends BaseService {

    @Autowired
    private CommonDAOImpl dao;


    public Map listResentBbs() throws Exception {
    	Map viewMap = new HashMap();
    	List list01 = null;
    	List list02 = null;
    	List list04 = null;
    	List list05 = null;
    	try {
    		list01 = dao.list("Main.listRecentBbs01", null);
    		viewMap.put("list01", list01);
    		list02 = dao.list("Main.listRecentBbs02", null);
    		viewMap.put("list02", list02);
    		list04 = dao.list("Main.listRecentBbs04", null);
    		viewMap.put("list04", list04);
//    		list05 = dao.list("Main.listRecentBbs05", null);
//    		viewMap.put("list05", list05);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return viewMap;
    }

    //야생동물질병진단 의뢰 및 예찰 그래프 - 종 구분
    public List listSmplSp() throws Exception {
    	List list = null;
    	try {
			list = dao.list("Main.listSmplSp", null);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return list;
    }
    //야생동물질병진단 의뢰 및 예찰 그래프 - 종 구분
    public List viewMainGraph(Map paramMap) throws Exception {
    	List list = null;
    	try {
			list = dao.list("Main.viewMainGraph", paramMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return list;
    }

    // 메인화면 ____년 __월 AI 발생현황 통계 (임시)
	public Map viewAiStat(Map paramMap) throws Exception {
		
		Map returnMap = new HashMap();
		
		Map hpaiMap = new HashMap();
		Map diedMap = new HashMap();
		
		try{
			
			hpaiMap = (Map) dao.view("Main.hpaiList", paramMap);
			returnMap.put("hpaiMap", hpaiMap);
			
			diedMap = (Map) dao.view("Main.diedList", paramMap);
			returnMap.put("diedMap", diedMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnMap;
	}

	// geom값 매핑 테스트 Function
	public void testFunction(Map paramMap) throws Exception {
		dao.update("Main.testFunction", paramMap);
		
	}
	
	public void testDiedFunction(Map paramMap) throws Exception {
		dao.update("Main.testDiedFunction", paramMap);
		
	}

	public List<Map> searchEcGps(String fnmRuleNum) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Ship.searchEcGps");
	}

}