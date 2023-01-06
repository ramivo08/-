package commf.view;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.document.AbstractExcelView;

/**
 * 2014-12-04 Excel Download View Resolver
 * @author ntarget
 *
 */

@SuppressWarnings("all")
public class ExcelView extends AbstractExcelView {
	/** Logger for this class */
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	protected void buildExcelDocument(Map model, XSSFWorkbook workbook, HttpServletRequest request, HttpServletResponse response)
	throws Exception {

		String filename	= (String)model.get("filename");

		if (filename == null || "".equals(filename))
			filename	= (String)model.get("filename");
		
		List   titleList	= (List)model.get("titleList");
		List   excelList	= (List)model.get("excelList");

		XSSFSheet worksheet = null;
		XSSFRow row = null;
		XSSFCellStyle cellHeadStyle = workbook.createCellStyle();
		cellHeadStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER);
//		cellHeadStyle.setFillForegroundColor(XSSFColor.LIGHT_CORNFLOWER_BLUE.index);
		cellHeadStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		cellHeadStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
		cellHeadStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
		cellHeadStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
		cellHeadStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);

		worksheet = workbook.createSheet("WorkSheet");
		row = worksheet.createRow(0);

		if (titleList != null) {
			List listKey	= new ArrayList();
			LinkedMap titleMap	= new LinkedMap();
			titleMap = (LinkedMap)titleList.get(0);

			// EXCEL TITLE Create
			Iterator k = titleMap.keySet().iterator();
			String key = "";
			int n = 0;
			while (k.hasNext()) {
				key = (String) k.next();
				XSSFCell cell = row.createCell(n);
				cell.setCellType(XSSFCell.CELL_TYPE_STRING);
				cell.setCellStyle(cellHeadStyle);
				cell.setCellValue((String)titleMap.get(key));

				listKey.add(n, key);
				n++;
			}

			// EXCEL Data Create
			if (excelList != null) {
				XSSFCellStyle cellLeftStyle = workbook.createCellStyle();
				cellLeftStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
				cellLeftStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
				cellLeftStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
				cellLeftStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
				cellLeftStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
//				cellLeftStyle.setFillForegroundColor(XSSFColor.WHITE.index);
				cellLeftStyle.setAlignment(XSSFCellStyle.ALIGN_LEFT);

				XSSFCellStyle cellRightStyle = workbook.createCellStyle();
				cellRightStyle.setBorderTop(XSSFCellStyle.BORDER_THIN);
				cellRightStyle.setBorderBottom(XSSFCellStyle.BORDER_THIN);
				cellRightStyle.setBorderLeft(XSSFCellStyle.BORDER_THIN);
				cellRightStyle.setBorderRight(XSSFCellStyle.BORDER_THIN);
				cellRightStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
//				cellRightStyle.setFillForegroundColor(XSSFColor.WHITE.index);
				cellRightStyle.setAlignment(XSSFCellStyle.ALIGN_RIGHT);

				for(int i = 0; i < excelList.size(); i++){
					row = worksheet.createRow(i+1);
					Map map = (HashMap)excelList.get(i);

					for (int r = 0; r < listKey.size(); r++) {
						XSSFCell cell = row.createCell(r);
						if (map.get(listKey.get(r)) instanceof BigDecimal) {
							cell.setCellStyle(cellRightStyle);
							cell.setCellValue(new XSSFRichTextString( ((BigDecimal)map.get(listKey.get(r))).toString()));
						} else {
							cell.setCellStyle(cellLeftStyle);
							cell.setCellValue((String)map.get(listKey.get(r)));
						}
					}
				}

				for(int i = 0; i < listKey.size(); i++){
					worksheet.autoSizeColumn((short)i);
					worksheet.setColumnWidth(i, (worksheet.getColumnWidth(i))+512 );  // 윗줄만으로는 컬럼의 width 가 부족하여 더 늘려야 함.
				}
			}
		}

        response.setContentType("Application/Msexcel");
        response.setContentType("text/xml;charset=UTF-8");
        response.setCharacterEncoding("utf-8"); 
        response.setHeader("Content-Disposition", "ATTachment; filename="+filename+".xls");


	}

	@Override
	protected void buildExcelDocument(Map<String, Object> arg0, HSSFWorkbook arg1, HttpServletRequest arg2,
			HttpServletResponse arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
