package business.biz;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;

import business.biz.domain.domain.ECDomain;
import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.user.UserInfo;

/**
 * Program Name : CSV Service Description : CSV Upload Common Service Programmer
 * Name : Tank Creation Date : 2020-06-08 ( Excel Common Addition ) Used Table :
 */
@Service
@SuppressWarnings("all")
public class CSVService extends BaseService {

	private final int LIST_LIMIT = 100; // DB등록처리 Group 구분

	@Autowired
	private CommonDAOImpl dao;

	@Autowired
	private UserInfo userInfo;

	public void csvReader(Map fileMap) throws Exception, FileNotFoundException, IOException {
		long loopcnt = 0;

		String filePath = (String) fileMap.get("excelDir");
		String fileName = (String) fileMap.get("fileNm");
		String shipName = (String) fileMap.get("shipName");
		String imoNo = (String) fileMap.get("imono");
		String bwmsType = (String) fileMap.get("bwmsType");
		// 반환용 리스트
		Map<String, Object> map = new HashMap();
		List<String[]> list = new ArrayList<String[]>();
		FileReader a = new FileReader(filePath + "/" + fileName);
		// ',','"'

		CSVReader headerReader = new CSVReader(a);
		CSVReader csvReader = new CSVReader(a,',',';',1);
		String lineText = null;
		// 반환용 리스트
		int arr = 0;
		String[] data = null;
		String[] header = null;
//		String[] columns = new String[] { "index", "time", "master", "merge", "rec1_current", "rec1_voltage",
//				"rec2_current", "rec2_voltage", "rec3_current", "rec3_voltage", "rec4_current", "rec4_voltage",
//				"rec5_current", "rec5_voltage", "rec6_current", "rec6_voltage", "rec7_current", "rec7_voltage",
//				"anu_d1", "anu_d3", "anu_s1", "anu_s2", "csu1", "fmu1", "fmu2", "fmu3", "gds1", "gds2", "gds3", "sts1",
//				"tro_b1", "tro_b2", "tro_b3", "tro_d1", "tro_d3", "tro_s1", "tro_s2", "gps", "anu_d2",
//				"bp1_no1_ballast_pump", "bp2_no2_ballast_pump", "fp1_no1_bilge_fire_pump", "fp2_no2_bilge_fire_pump",
//				"tro_d2" };

		header = headerReader.readNext();
		while ((data = csvReader.readNext()) != null) {
			for (int i = 0; i < header.length; i++) {
				map.put(header[i], data[i]);
			}
			map.put("shipName", shipName);
			map.put("imono", imoNo);
			dao.insert("Ship.insertData", map);

		}

	}

}
