package business.biz;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class Utils {
	private static final Logger logger = LoggerFactory.getLogger(Utils.class);
	
	// .csv -> .xlsx
	public XSSFWorkbook csvToXLSX(InputStream inputStream) throws IOException {
		XSSFWorkbook workbook = new XSSFWorkbook();

	    try(BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"))) {
	        XSSFSheet sheet = workbook.createSheet("sheet1");
	        String currentLine=null;
	        int rowNum=0;

	        while ((currentLine = br.readLine()) != null) {
	            String[] str = currentLine.split("\","); /** 그냥 ,로 자르면 예외 발생... **/
	            rowNum++;
	            XSSFRow currentRow=sheet.createRow(rowNum);
	            for(int i=0; i<str.length; i++){
	            	String cellVal = str[i].replaceAll("\"", "");
	            	
	            	currentRow.createCell(i).setCellValue(cellVal);
	            }
	        }

	        return workbook;
	    } catch (IOException ie) {
	    	logger.debug(ie.toString());
	    } 
	    
	    return workbook;
	}

	// 날짜 포맷 변환
	public Date parseDate(String date) {
		Date parsedDate = null;
		
		try {
			parsedDate = DateUtils.parseDateStrictly(date, 
							/** new String[] 굳이 할 필요 없다 **/
							"yy-MM-dd-HH:mm:ss", "HH:mm:ss", "yy/MM/dd HH:mm:ss", "yy/MM/dd", 
							"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "dd/mm/yy", "yy/MM/dd_",
							"yy/MM/dd_HH:mm:ss");
		} catch(ParseException pe) {
			logger.debug("Date형으로 파싱 안함");
			return Calendar.getInstance().getTime();
		}
		
		return parsedDate;
	}
	
	// String -> double 형 변환 가능한지 확인
	public boolean isStringDouble(String s) {
	    try {
	        Double.parseDouble(s);
	        
	        return true;
	    } catch (NumberFormatException e) {
	        return false;
	    }
	}
	
	// 도분초 변환(위경도)
	public String[] separararDMS(String coordenada, int type) {

	    String grados = null;
	    String minutos = null;
	    String segundos = null;
	    String direccion = null;

	    switch (type) {
	        case 1: // latitude
	            grados = coordenada.substring(0, 2);
	            minutos = coordenada.substring(2, 4);
	            segundos = coordenada.substring(5, coordenada.length() - 1);
	            break;
	        case 2: // longitude
	            grados = coordenada.substring(0, 3);
	            minutos = coordenada.substring(3, 5);
	            segundos = coordenada.substring(6, coordenada.length() - 1);
	            break;
	        default:

	    }

	    double sec = 0;
	    try {
	        sec = Double.parseDouble("0."+segundos);
	    }catch(Exception e) {
	    	logger.debug(e.toString());
	    }

	    sec = (sec * 60);
	    direccion = coordenada.substring(coordenada.length() - 1);
	    
	    return new String[] {grados, minutos, sec + "", direccion};
	}
	
	public double DMSaDecimal(int grados, int minutos, double segundos, String direccion) {

	    double decimal = Math.signum(grados) * (Math.abs(grados) + (minutos / 60.0) + (segundos / 3600.0));

	    //reverse for south or west coordinates; north is assumed
	    if (direccion.equals("S") || direccion.equals("W")) {
	        decimal *= -1;
	    }

	    return decimal;
	}
	
	// 파일명 규칙 만들기
	public String fnmRulePattern(String fileName) {
		int numCnt = 0;
		int strCnt = 0;
		StringBuilder regex = new StringBuilder(fileName.length());
		
		for(int i=0; i<fileName.length(); i++) {
			String s = fileName.substring(i, i+1);
			
			if(stringInteger(s)) {
				if(strCnt != 0) {
					regex.append("[A-Za-z_ -]{" + strCnt + "}");
					strCnt = 0;
				}
				numCnt++;
			} else if("(".equals(s) || ")".equals(s)) {
				if(numCnt != 0) {
					regex.append("\\d{" + numCnt + "}");
					numCnt = 0;
				} else if(strCnt != 0) {
					regex.append("[A-Za-z _-]{" + strCnt + "}");
					strCnt = 0;
				}
				regex.append("\\" + s);
			} else {
				if(numCnt != 0) {
					regex.append("\\d{" + numCnt + "}");
					numCnt = 0;
				}
				strCnt++;
			}
			
			// 마지막 문자에서 체크해줘야한다. 카운트만 세고 끝날 수 있다.
			if(i == fileName.length() - 1) {
				if(strCnt != 0) {
					regex.append("[A-Za-z_ -]{" + strCnt + "}");
					strCnt = 0;
				} else if(numCnt != 0) {
					regex.append("\\d{" + numCnt + "}");
					numCnt = 0;
				}
			}
		}
		
		return regex.toString();
	}
	
	// String -> Integer 변환 가능 여부 확인
	public boolean stringInteger(String s) {
		try {
			Integer.parseInt(s);
			
			return true;
		} catch(NumberFormatException nfe) {
			return false;
		}
	}
}
