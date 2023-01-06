package business.biz.ship;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import business.biz.FileService;
import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.properties.ApplicationProperty;


@Service
@SuppressWarnings({"rawtypes"})
public class ShipService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;
	
	@Autowired
	private FileService fileService;
	
	

	@SuppressWarnings("unchecked")
	public List insertExcel(Map paramMap, List listFileInfo, String procType) throws Exception {
		// TODO Auto-generated method stub

		int cnt = 0;
		try {
			

			// ------------------
			// 파일 처리 부분
			// ------------------
			// 2019-11-08
			// 여기서 docuType,atthType안들어감. 넣어줘야함.
			Map infoMap = new HashMap();
			infoMap.put("subDir", ApplicationProperty.get("upload.sub.dir2")); // 파일 경로
			infoMap.put("rootNo", paramMap.get("bbsNo")); // root 번호
			infoMap.put("docuType", paramMap.get("docuType")); // 게시판 구분
			infoMap.put("atthType", paramMap.get("atthType")); // 첨부파일 구분
			infoMap.put("arrFileNo", paramMap.get("arrFileNo")); // 삭제될 첨부파일 번호

			cnt += fileService.fileManagement(infoMap, listFileInfo);
			logger.debug("@@@@@@파일 디버그 완료");
			

			if (cnt == 0) {
				// msg : 저장된 내역이 없습니다.
				throw processException("exception.user.notExistSaveResult");

			}
		} catch (NullPointerException e) {
			logger.error(e.toString());
		}

		return null;
	}
	

	/**
	 * Combo Code List Search
	 */
    public List listComboCode(Map reqMap) throws Exception {
	    return dao.list("Comm.listCode", reqMap);
	}

    /**
     * Code List Search
     */
    public List listCode(Map reqMap) throws Exception {
    	return dao.list("Comm.listCode", reqMap);
    }


	public int getFnmRuleExists(Map fnmRuleExistsMap) {
		// TODO Auto-generated method stub
		return (Integer) dao.select("Ship.getFnmRuleExists",fnmRuleExistsMap);
	}


	public boolean setFnmRule(Map paramMap) {
		// TODO Auto-generated method stub
		try {
			dao.insert("Ship.setFnmRule",paramMap);
			return true;
		} catch(Exception e) {
			return false;
		}
		
	}


	public int getFnmRuleNum(Map fnmRuleExistsMap) {
		// TODO Auto-generated method stub
		return (Integer) dao.select("Ship.getFnmRuleNum",fnmRuleExistsMap);
	}
	
	public int getFnmRuleNum2(String inputFile) {
		// TODO Auto-generated method stub
		return (Integer) dao.select("Ship.getFnmRuleNum",inputFile);
	}


	public boolean setFnmRuleSheets(Map fnmRuleSheetsMap) {
		// TODO Auto-generated method stub
		try {
			dao.insert("Ship.setFnmRuleSheets",fnmRuleSheetsMap);
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}


	public boolean setBwmsMsrElem(Map bwmsMsrElemMap) {
		// TODO Auto-generated method stub
		try {
			dao.insert("Ship.setBwmsMsrElem",bwmsMsrElemMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
		
	}
	

	
	
	public int insertShip(Map paramMap) {
		try {
			dao.insert("Ship.insertShip", paramMap);
			return 1;
		} catch (Exception e) {
//			e.printStackTrace();
			return 0;
		}
	}
	
	public boolean insertUVData(Map dataMap) {
		try{
			dao.insert("Ship.insertUVData", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}
	
	public boolean insertUVDataList(List dataList) {
		try{
			dao.insert("Ship.insertUVDataList", dataList);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}
	
	public boolean insertO3Data(Map dataMap) {
		try{
			dao.insert("Ship.insertO3Data", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}
	
	public boolean insertECData(Map dataMap) {
		try{
			dao.insert("Ship.insertECData", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}
	
	public boolean insertECEvent(Map dataMap) {
		try{
			dao.insert("Ship.insertECEvent", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}
	
	public String getDomainType(String domainName) {
		return null;
	}
	
	public List getFnmRuleList(Map paramMap, String bwms_type) {
		if(bwms_type != null) {
			if(bwms_type.startsWith("O3")) {
				System.out.println(bwms_type.split(":")[1]);
				String ball_deball = bwms_type.split(":")[1];
				bwms_type = bwms_type.split(":")[0];
				paramMap.put("ball_deball", ball_deball);
			}
			paramMap.put("bwms_type", bwms_type);
		}
		
		List result = dao.list("Ship.getFnmRuleList", paramMap);
		paramMap.remove("bwms_type");
		if(paramMap.containsKey("ball_deball")) {
			paramMap.remove("ball_deball");
		}
		return result;
	}
	
	public List<String> getBwmsMsrElem(int fnm_rule_num) {
		return (List<String>) dao.list("Ship.getBwmsMsrElem", fnm_rule_num);
	}

	public List getData(Map paramMap) {
		System.out.println(paramMap.get("columnnamearr"));
		return dao.list("Ship.getData", paramMap);
	}

	
	public boolean deleteFnmRuleNum(int fnm_rule_num) {
		return dao.delete("Ship.deleteFnmRuleNum", fnm_rule_num) == 1 ? true : false;
	}
	
	public Map getDomainDescription(Map paramMap) {
		return (Map)dao.view("Ship.getDomainDescription", paramMap);
	}
	
	public HashMap getDataSetCount() {
		return (HashMap) dao.select("Ship.getDataSetCount");
	}
	
	public List getDataSetRgsDe() {
		return dao.list("Ship.getDataSetRgsDe");
	}
	
	public List getDataGroupByDate(Map paramMap) {
		return dao.list("Ship.getDataGroupByDate", paramMap);
	}


	public int selectShipSeq() {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.selectShipSeq");
	}


	public Map selectSeq(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.select("Ship.selectSeq",paramMap);
	}


	public List getDataNomalize(Map paramMap) {
		// TODO Auto-generated method stub
		return  dao.list("Ship.getDataNomalize",paramMap);
	}


	public List selectShipInfo(Map paramMap) {
		// TODO Auto-generated method stub
		return dao.list("Ship.selectShipInfo",paramMap);
	}


	public int selectShipNm(Map paramMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.selectShipNm",paramMap);
	}


	public List<Map> selectMnftList() {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Ship.selectMnftList");
	}


	public List<Map> selectAllShipInfo(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Ship.selectAllShipInfo",paramMap);
	}


	public Map selectShipInfoProfile(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.select("Ship.selectShipInfoProfile",paramMap);
	}


	public Map getFnmRuleSheet(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.select("Ship.getFnmRuleSheet",paramMap);
	}


	public void setOrgCols(Map orgMap) {
		// TODO Auto-generated method stub
		dao.insert("Ship.setOrgCols",orgMap);
	}


	public List<String>  getOrgCols(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<String>)  dao.list("Ship.getOrgCols",paramMap);
	}


	public int getMaxSeq(Map bwmsMsrElemMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.getMaxSeq",bwmsMsrElemMap);
	}


	public List getSeqList(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		return  dao.list("Ship.getSeqList",dataMap);
	}


	public int countCols(Map paramMap) {
		// TODO Auto-generated method stub
		return (int)dao.select("Ship.countCols",paramMap);
	}


	public Map getFnmRule(int imoNum) {
		// TODO Auto-generated method stub
		return (Map) dao.select("Ship.getFnmRule",imoNum);
	}


	public List<String> getBwmsMsrElemMap(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<String>) dao.list("Ship.getBwmsMsrElemMap",paramMap);
	}


	public int countOrgCols(Map bwmsMsrElemMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.countOrgCols",bwmsMsrElemMap);
	}


	public boolean insertECOper(Map dataMap) {
		// TODO Auto-generated method stub
		try{
			dao.insert("Ship.insertECOper", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}


	public boolean insertUVOper(Map dataMap) {
		// TODO Auto-generated method stub
		try{
			dao.insert("Ship.insertUVOper", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}


	public boolean insertUVEvnet(Map dataMap) {
		// TODO Auto-generated method stub
		try{
			dao.insert("Ship.insertUVEvent", dataMap);
			return true;
		} catch(Exception e) {
//			e.printStackTrace();
			return false;
		}
	}


	public Map getBwmsMsrElemView(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.select("Ship.getFnmRuleView",paramMap);
	}


	public int getOperCount(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.getOperCount",dataMap);
	}


	public List<Map> getOperTime(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		return  (List<Map>) dao.list("Ship.getOperTime",dataMap);
	}


	public List<Map> getUVOperTime(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		return  (List<Map>) dao.list("Ship.getUVOperTime",dataMap);
	}


	public List<Map> getFnmFileList(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Ship.getFnmFileList",paramMap);
	}


	public List<Map> searchValidData(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Ship.searchValidData",dataMap);
	}


	public int countMsrCols(Map paramMap) {
		// TODO Auto-generated method stub
		return (int) dao.select("Ship.countMsrCols",paramMap);
	}


	public List<String> searchColsExistTable(Map<String, Object> bwmsLogMap) {
		// TODO Auto-generated method stub
		return (List<String>) dao.list("Ship.searchColsExistTable",bwmsLogMap);
	}


	public int updateShipInfo(Map paramMap) {
		// TODO Auto-generated method stub
		return dao.update("Ship.updateShipInfo",paramMap);
	}


	public int deleteShipInfo(Map paramMap) {
		// TODO Auto-generated method stub
		return dao.delete("Ship.deleteShipInfo",paramMap);
	}












	


	



}
