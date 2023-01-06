package business.biz.virtual;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import business.biz.FileService;
import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.properties.ApplicationProperty;

@Service
@SuppressWarnings({ "unchecked" })
public class VirtualService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	@Autowired
	private FileService fileService;
	
	

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



	public List selectHarborList() {
		// TODO Auto-generated method stub
		return  dao.list("Virtual.selectHarborList");
	}



	public Map selectVirtualShipInfo(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.view("Virtual.selectVirtualShipInfo", paramMap);
	}



	public Map selectHarborNm(Map paramMap) {
		// TODO Auto-generated method stub
		return (Map) dao.view("Virtual.selectHarberNm", paramMap);
	}



	public List<Map> selectOceanMedian(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Virtual.selectOceanMedian",paramMap);
	}



	public List<Map> selectOceanYear(Map paramMap) {
		// TODO Auto-generated method stub
		return (List<Map>) dao.list("Virtual.selectOceanYear",paramMap);
	}



	public Map selectVirtualOption(String bwmsType) {
		// TODO Auto-generated method stub
		return (Map) dao.view("Virtual.selectVirtualOption", bwmsType);
	}



	
	

}