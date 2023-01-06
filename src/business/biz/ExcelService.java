package business.biz;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibatis.sqlmap.client.SqlMapExecutor;

import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.user.UserInfo;
import common.util.CommUtils;
import common.util.FileUtil;

//import egovframework.rte.psl.orm.ibatis.SqlMapClientCallback;


/**
 * Program Name    : ExcelService
 * Description     : Excel Upload Common Service
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-03 ( Excel Common Addition )
 * Used Table      :
 */
@Service
@SuppressWarnings("all")
public class ExcelService extends BaseService {

	private final int LIST_LIMIT = 100;		// DB등록처리 Group 구분

	@Autowired
	private CommonDAOImpl dao;

	@Autowired
	private UserInfo userInfo;

	/**
	 * EXCEL SERVICE
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	@SuppressWarnings("deprecation")
	public long regiExcelLoadImport(Map reqMap, Map fileMap, String updateName, String insertName, String[] colName, String batch)
	throws Exception, FileNotFoundException, IOException {
		String filePath = (String)fileMap.get("excelDir");
		String fileName = (String)fileMap.get("fileNm");

		
		long loopcnt = 0;
		List listLoadData	= new ArrayList();
		//String[] colName = FileManager.getColumnInfo(method);

		if (colName == null || colName.length == 0)
			throw processException("정의된 Column정보가 없습니다. 확인바랍니다.[FileManager.getColumnInfo]");

		
		
        XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(filePath+ "/" +fileName));

        XSSFSheet sheet = null;
        XSSFRow row     = null;
        XSSFCell cell   = null;

        // 생성된 시트 수만큼..
        int sheetNum	= workbook.getNumberOfSheets();

        try {
        	// LOG
        	logger.info("");
        	logger.info("Excel Upload Start ----- [exclUploadCodeMgmt] ");

        	int totInsertCnt = 0;
        	int totUpdateCnt = 0;

        	for (int i = 0; i < sheetNum; i++) {
        		logger.info("Sheet Num : "+ i);
        		logger.info("Sheet Name : "+ workbook.getSheetName(i));

        		sheet = workbook.getSheetAt(i);
        		// 생성된 시트를 이용하여 그 행의 수만큼
        		int rows = sheet.getPhysicalNumberOfRows();

        		logger.info("Row Total Num : "+ (rows-1));

        		for (int r = 0; r < rows; r++) {
        			if (r == 0) continue;	// Head Line 은 Skip

        			row	= sheet.getRow(r);

        			Map cellMap	= new HashMap(reqMap);

        			// 생성된 Row를 이용하여 그 셀의 수만큼
        			int cells = row.getPhysicalNumberOfCells();

        			if (cells != colName.length)
        				throw processException("Excel 데이터 포맷이 맞지 않습니다. 확인바랍니다.");

        			for (short c = 0; c < cells; c++) {	// short형. 255개 Max
        				cell = row.getCell(c);

						if (colName != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_NUMERIC:
								//엑셀 셀에서 yyyy-mm-dd의 형태의 데이터가 [날짜]셀서식일때
								if(DateUtil.isCellDateFormatted(cell)) {
									Date date = cell.getDateCellValue();
									cellMap.put(colName[c], new SimpleDateFormat("yyyy-MM-dd").format(date));
								//엑셀 셀에서 yyyy-mm-dd의 형태의 데이터가 [일반]셀서식일때
								} else {
									cellMap.put(colName[c], cell.getNumericCellValue());
								}
								break;
							case XSSFCell.CELL_TYPE_STRING:
								cellMap.put(colName[c], cell.getStringCellValue());
								break;
							}
						}
        			}

        			listLoadData.add(cellMap);

        			// 저장
        			// out of memory 때문에 짤라서 처리하는게 좋음.
        			int icnt = 0;
        			int ucnt = 0;

        			if (listLoadData.size() == LIST_LIMIT || r == rows-1) {
        				if (CommUtils.nvlTrim(batch).equalsIgnoreCase("Y")) {
        					int batchCnt = regiBatch(listLoadData, insertName);
        					if (batchCnt == 0)
        						throw processException("ERROR] 데이터가 정상적으로 저장되지 않았습니다. [regiExcelLoadImport]");

        					logger.info("Saving Count : "+ listLoadData.size()+" [Insert : "+batchCnt+"]");
        				} else {
        					for (int n = 0; n < listLoadData.size(); n++) {
        						Map importMap = (HashMap)listLoadData.get(n);
        						importMap.put("gsUserId", userInfo.getUserId());

        						if (updateName != null) {
        							if (dao.update(updateName, importMap) == 0) {
        								// Insert
        								icnt += dao.update(insertName, importMap);
        							}
        						} else {
        							// Insert
        							icnt += dao.update(insertName, importMap);
        						}
        					}
        					logger.info("Saving Count : "+ listLoadData.size()+" [Insert : "+icnt+", Update : "+ucnt+"]");

        				}
        				listLoadData.clear();
        			}
        			totInsertCnt+=icnt;
        			totUpdateCnt+=ucnt;

        			loopcnt++;
        		}
        	}

        	logger.info("Total Count (Insert, Update) : "+totInsertCnt+", "+totUpdateCnt);
        	logger.info("Excel Upload End ----- [exclUploadCodeMgmt] ");
        	logger.info("");

        	// 처리 후 파일 삭제.
        	FileUtil.deleteFile(filePath +"/"+ fileName);
        } catch (Exception e) {
        	throw processException("엑셀을 읽는 중 오류가 발생하였습니다. 확인바랍니다.");
        } finally {
        	// FileInput CLOSE
        	if(workbook!=null)
        		workbook.close();
        }


		return loopcnt;
	}

	/**
	 * EXCEL SERVICE
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	@SuppressWarnings({ "deprecation", "unused" })
	public List listExcelLoad(Map reqMap, Map fileMap, String[] colName)
	throws Exception, FileNotFoundException, IOException {

		long loopcnt = 0;
		List listLoadData	= new ArrayList();
		//String[] colName = FileManager.getColumnInfo(method);

		if (colName == null || colName.length == 0)
			throw processException("정의된 Column정보가 없습니다. 확인바랍니다.[FileManager.getColumnInfo]");

		String filePath = (String)fileMap.get("excelDir");
		String fileName = (String)fileMap.get("upfile1");

		
	    XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(filePath+ "/" +fileName));

		XSSFSheet sheet = null;
		XSSFRow row     = null;
		XSSFCell cell   = null;

		// 생성된 시트 수만큼..
		int sheetNum	= workbook.getNumberOfSheets();

		try {
			// LOG
			logger.info("");
			logger.info("Excel Upload Start ----- [listExcelLoad] ");

			for (int i = 0; i < sheetNum; i++) {
				logger.info("Sheet Num : "+ i);
				logger.info("Sheet Name : "+ workbook.getSheetName(i));

				sheet = workbook.getSheetAt(i);
				// 생성된 시트를 이용하여 그 행의 수만큼
				int rows = sheet.getPhysicalNumberOfRows();

				logger.info("Row Total Num : "+ (rows-1));

				for (int r = 0; r < rows; r++) {
					if (r == 0) continue;	// Head Line 은 Skip

					row	= sheet.getRow(r);

					Map cellMap	= new HashMap();
					// 생성된 Row를 이용하여 그 셀의 수만큼
					int cells = row.getPhysicalNumberOfCells();

					if (cells != colName.length)
						throw processException("Excel 데이터 포맷이 맞지 않습니다. 확인바랍니다.");

					for (short c = 0; c < cells; c++) {	// short형. 255개 Max
						cell = row.getCell(c);

						if (colName != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_NUMERIC:
								cellMap.put(colName[c], cell.getNumericCellValue());
								break;
							case XSSFCell.CELL_TYPE_STRING:
								cellMap.put(colName[c], cell.getStringCellValue());
								break;
							}
						}
					}

					listLoadData.add(cellMap);

					loopcnt++;
				}
			}

			logger.info("Excel Upload End ----- [listExcelLoad] ");
			logger.info("");

			// 처리 후 파일 삭제.
			FileUtil.deleteFile(filePath +"/"+ fileName);

		} catch (Exception e) {
			throw processException("엑셀을 읽는 중 오류가 발생하였습니다. 확인바랍니다.");
		} finally {
			// FileInput CLOSE
			if(workbook!=null)
				workbook.close();
		}

		return listLoadData;
	}

	/**
	 * @author dekim
	 * @category 구조동물현황 > 구조동물목록, 생물자원현황 에서 구조센터와의 Excel 데이터 연계 시 사용하는 메소드
	 * @param jspFileName : jsp에서 각기 다른 파일업로드 시의 input filename을 parameter로 추가
	 */
	@SuppressWarnings({ "deprecation", "unused" })
	public void commListExcelLoad(Map reqMap, Map fileMap, String upfileName, String statement, String[] colName, String[] mapToMap)
			throws Exception, FileNotFoundException, IOException {

		long loopcnt = 0;
		List listLoadData	= new ArrayList();
		//String[] colName = FileManager.getColumnInfo(method);

		if (colName == null || colName.length == 0)
			throw processException("정의된 Column정보가 없습니다. 확인바랍니다.[FileManager.getColumnInfo]");

		String filePath = (String)fileMap.get("excelDir");
		String fileName = (String)fileMap.get(upfileName);

		
	    XSSFWorkbook workbook = new XSSFWorkbook(new FileInputStream(filePath+ "/" +fileName));

		XSSFSheet sheet = null;
		XSSFRow row     = null;
		XSSFCell cell   = null;

		// 생성된 시트 수만큼..
		int sheetNum	= workbook.getNumberOfSheets();

		try {
			// LOG
			logger.info("");
			logger.info("Excel Upload Start ----- [listExcelLoad] ");

			for (int i = 0; i < sheetNum; i++) {
				logger.info("Sheet Num : "+ i);
				logger.info("Sheet Name : "+ workbook.getSheetName(i));

				sheet = workbook.getSheetAt(i);
				// 생성된 시트를 이용하여 그 행의 수만큼
				int rows = sheet.getPhysicalNumberOfRows();

				logger.info("Row Total Num : "+ (rows-1));

				for (int r = 0; r < rows; r++) {
					if (r == 0) continue;	// Head Line 은 Skip

					row	= sheet.getRow(r);

					Map cellMap	= new HashMap();
					// 생성된 Row를 이용하여 그 셀의 수만큼
					int cells = row.getPhysicalNumberOfCells();

					if (cells != colName.length)
						throw processException("Excel 데이터 포맷이 맞지 않습니다. 확인바랍니다.");

					for (short c = 0; c < cells; c++) {	// short형. 255개 Max
						cell = row.getCell(c);

						if (colName != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_NUMERIC:
								cellMap.put(colName[c], cell.getNumericCellValue());
								break;
							case XSSFCell.CELL_TYPE_STRING:
								cellMap.put(colName[c], cell.getStringCellValue());
								break;
							}
						}
					}

					objToDB(reqMap, cellMap, "Rscu.upFileRscuExcl", mapToMap);

					loopcnt++;
				}
			}

			logger.info("Excel Upload End ----- [listExcelLoad] ");
			logger.info("");

			// 처리 후 파일 삭제.
			FileUtil.deleteFile(filePath +"/"+ fileName);
		} catch (Exception e) {
			throw processException("엑셀을 읽는 중 오류가 발생하였습니다. 확인바랍니다.");
		} finally {
			// FileInput CLOSE
			if(workbook!=null)
				workbook.close();
		}
	}

	/**
	 * @author dekim
	 * @category Object(허용 type : List, Map)를 DB에 insert하는 메소드
	 * @param paramMap
	 * @param o
	 * @param statement insertStatement
	 * @param mapToMap paramMap에서 excelMap으로 get, put하는 String 배열
	 */
	public int objToDB(Map paramMap, Object o, String statement, String[] mapToMap) {
		
		int resultCnt = 0;
		
		Map excelMap = new HashMap();
		try {
			if(o instanceof List) {
				for(int i = 0; i < ((List) o).size(); i++) {
					excelMap = (Map) ((List) o).get(i);
					if(mapToMap != null) {
						for (int j = 0; j < mapToMap.length; j++) {
							excelMap.put(mapToMap[j], paramMap.get(mapToMap[j]));
						}
					}
					String orgRecpNo = (String) excelMap.get("orgRecpNo");
					String bioResoNo = (String) excelMap.get("bioResoNo");
					
					if((orgRecpNo != null && orgRecpNo != "") || (bioResoNo != null && bioResoNo != "")){
						dao.insert(statement, excelMap);
						resultCnt++;
					}		// 2018.03.12 추가
					
				}
			} else if(o instanceof Map) {
				excelMap = new HashMap((Map) o);
				if(mapToMap != null) {
					for (int i = 0; i < mapToMap.length; i++) {
						excelMap.put(mapToMap[i], paramMap.get(mapToMap[i]));
					}
				}
				String orgRecpNo = (String) excelMap.get("orgRecpNo");
				String bioResoNo = (String) excelMap.get("bioResoNo");
				
				if((orgRecpNo != null && orgRecpNo != "") || (bioResoNo != null && bioResoNo != "")){
					dao.insert(statement, excelMap);
					resultCnt++;
				}		// 2018.03.12 추가
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultCnt;
	}
	
	
//	public void objToDB(Map paramMap, Object o, String statement, String[] mapToMap) {
//		Map excelMap = new HashMap();
//		try {
//			if(o instanceof List) {
//				for(int i = 0; i < ((List) o).size(); i++) {
//					excelMap = (Map) ((List) o).get(i);
//					if(mapToMap != null) {
//						for (int j = 0; j < mapToMap.length; j++) {
//							excelMap.put(mapToMap[j], paramMap.get(mapToMap[j]));
//						}
//					}
//					String orgRecpNo = (String) excelMap.get("orgRecpNo");
//					
//					if(orgRecpNo != null && orgRecpNo != ""){
//						dao.insert(statement, excelMap);
//					}		// 2018.03.12 추가
//					
//				}
//			} else if(o instanceof Map) {
//				excelMap = new HashMap((Map) o);
//				if(mapToMap != null) {
//					for (int i = 0; i < mapToMap.length; i++) {
//						excelMap.put(mapToMap[i], paramMap.get(mapToMap[i]));
//					}
//				}
//				String orgRecpNo = (String) excelMap.get("orgRecpNo");
//				
//				if(orgRecpNo != null && orgRecpNo != ""){
//					dao.insert(statement, excelMap);
//				}		// 2018.03.12 추가
//				
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

	// SMS_SEND_LOG Batch INSERT
	public int regiBatch(final List smsList, final String statment) {
		try {
			dao.batch(new org.springframework.orm.ibatis.SqlMapClientCallback(){
				public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException{
					executor.startBatch();
					for ( int i = 0 ; i < smsList.size() ; i++ ) {
						logger.debug("i:::::"+i);
						executor.insert(statment, smsList.get(i));
					}
					executor.executeBatch();
					return null;
				}
			});
			return 1;
		} catch(Exception ex) {
			return 0;
		}
	}
}
