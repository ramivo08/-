/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.ship;

import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.beanutils.BeanUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.gson.Gson;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.Utils;
import business.biz.ship.domain.ShipDomain;
import common.base.BaseController;
import common.file.FileManager;

@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class ShipController extends BaseController {

	@Autowired
	private Utils utils;

	@Autowired
	private ShipService shipService;

	@Autowired
	private ExcelService excelService;
	@Autowired
	private CSVService csvService;
	@Autowired
	private FileService fileService;
	@Resource(name = "fileManager")
	FileManager fileManager;

//	@Autowired
//	private int fnmRuleNum;
//	private int dataSttIdx;
//	private Integer[] dtmIdx;
//	private List<String> bwmsMsrElem;
//	
//	private XSSFSheet sheet;
//	
//	private static final String DATE_FORMAT = "yyyy-MM-dd";
//	private static final String TIME_FORMAT = "HH:mm:ss";
//	

	/**
	 *
	 *
	 * @param request HTTP 요청
	 * @param model   모델맵
	 * @return 모델뷰
	 * @throws Exception 발생오류
	 */
	@RequestMapping("/ship/insertShipInfo.do")
	@SuppressWarnings({ "rawtypes" })
	public String insertShipInfo(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		HttpSession session = request.getSession();
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		return "ship/insertShipInfo";
	}

	@RequestMapping("/ship/insertShip.do")
	@SuppressWarnings({ "rawtypes" })
	public String insertShip(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";

		return "ship/insertShipInfo";

	}
	


	/**
	 * 
	 *
	 * @param request HTTP 요청
	 * @param model   모델맵
	 * @return 모델뷰
	 * @throws Exception 발생오류
	 */
	@RequestMapping("/ship/insertShipInformation.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView insertShipInformation(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		HttpSession session = request.getSession();
		// Request Parameter Values Setting
		
		ModelAndView mv = new ModelAndView("jsonView");
		Map paramMap = getParameterMap(request, true);
		
		
		System.out.println(paramMap.toString());
		
		
		if (paramMap == null) {
			mv.setViewName("redirect:/login.do");
			return mv;
		}
		System.out.println(paramMap);
		System.out.println(paramMap.get("shipNo"));
		System.out.println(paramMap.get("shipNo").toString().length());
		
		if(paramMap.get("shipNo").toString().length() <=0) {
			paramMap.remove("shipNo");
		}
		if(paramMap.get("shipNlty") .toString().length() <=0) {
			paramMap.remove("shipNlty");
		}
		if(paramMap.get("shipCnstrDt").toString().length() <=0) {
			paramMap.remove("shipCnstrDt");
		}
		if(paramMap.get("shipGrtg").toString().length() <=0) {
			paramMap.remove("shipGrtg");
		}
		if(paramMap.get("shipKnd").toString().length() <=0) {
			paramMap.remove("shipKnd");
		}
			System.out.println(paramMap.toString());
		
		
		if (paramMap.containsKey("shipNo")) {
			try {
			paramMap.put("shipNo", Integer.parseInt((String) paramMap.get("shipNo")));
			}catch(NumberFormatException e) {
				paramMap.put("shipNo", 0);
			}
		}
		if (paramMap.containsKey("shipGrtg")) {
			try {
			paramMap.put("shipGrtg", Integer.parseInt((String) paramMap.get("shipGrtg")));
			}catch(NumberFormatException e) {
				paramMap.put("shipGrtg", 0);
			}
		}
		if (paramMap.containsKey("imoNo")) {
			try {
				paramMap.put("imoNo", Integer.parseInt((String) paramMap.get("imoNo")));
			} catch (NumberFormatException e) {
//				e.printStackTrace();
				paramMap.put("imoNo", null);
			}
		}
		if (paramMap.containsKey("shipCnstrDt")) {
			try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
			paramMap.put("shipCnstrDt", sdf.parse((String) paramMap.get("shipCnstrDt")));
			}catch (Exception e ) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
				paramMap.put("shipCnstrDt", sdf.parse((String) paramMap.get("shipCnstrDt")));
			}
		}
		
		
		paramMap.put("registerId", paramMap.get("gsUserId"));
		

		int result = shipService.insertShip(paramMap);
		
		if(result == 1) {
			System.out.println("Information insert success");
			mv.addObject("result", result);
		}else {
			System.out.println("Information insert Error");
			mv.addObject("result", result);
		}
			
			
		
		
		return mv;
		

	}

	/**
	 *
	 *
	 * @param request HTTP 요청
	 * @param model   모델맵
	 * @return 모델뷰
	 * @throws Exception 발생오류
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/ship/insertShipData.do")
	public ModelAndView insertShipData(HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");	
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null) {
			mv.setViewName("redirect:/login.do");			
			return  mv;
		}else {
			
			
			
			System.out.println(paramMap.toString());
			
			
			
			List<Map> ship = shipService.selectShipInfo(paramMap);
			
//			seq로 찾기
//			Map<String,Object> ship = shipService.selectSeq(paramMap);
//			
//			model.addAttribute("ship",ship);
//			System.out.println("insertShipData.do"+paramMap);
			if(ship.size() != 0) {
				mv.addObject("imoNo",ship.get(0).get("imoNo"));
				 mv.addObject("shipNm",ship.get(0).get("shipNm"));
				 mv.addObject("bwmsType",ship.get(0).get("bwmsType"));
			}
			
			
			mv.addObject("shipList",ship);
			mv.addObject("countShip",ship.size());
			mv.setViewName("ship/insertShipData");
			return mv;
		}
		
		

	}
	
	// 선박데이터 등록 -> 표준항목 목록 가져오기
	@RequestMapping("/ship/dataNomalize.do")
	public ModelAndView  dataNomalize(HttpServletRequest request, ModelMap model) throws Exception{
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		Map paramMap = getParameterMap(request, false);
		
		
		System.out.println("paramap #@!"+paramMap);
		List<Map> dataList = shipService.getDataNomalize(paramMap);
		System.out.println("dataList get 0 "+dataList.get(0));
		mv.addObject("result",dataList);
		
		
	
		
		
		return mv;
		
	}
//	선박 데이터 등록
// 	insertShipData.do	
//	@Transactional
	@SuppressWarnings({ "unlikely-arg-type",  "null" })
	@RequestMapping("/ship/configRegist.do")
//	@ResponseBody
	public void configRegist(
//			@RequestParam int imo_num,
//			@RequestParam String fnm_rule,
//			@RequestParam String exl_sht_nm,
//			@RequestParam String bwms_type,
//			@RequestParam String log_type,
//			@RequestParam(value="cols[]") List<String> cols,
//			@RequestParam int data_stt_idx,
//			@RequestParam(value="dtm_idx[]") int[] dtm_idx,
//			@RequestParam(value="data") List<Object> data,
//			@RequestBody HashMap<Object, Object> datas,
//			@RequestParam JSON param,
			//@RequestParam HashMap<String,Object> param,
			@RequestParam HashMap<String,Object> param,
			HttpServletRequest request, ModelMap model,	HttpServletResponse response) throws Exception {
		Long imo_num = null;
		String fnm_rule = null;
		String exl_sht_nm = null;
		String bwms_type = null;
		String log_type = null;
		JSONArray cols = null;
		Long data_stt_idx = null;
		JSONArray dtm_idx = null;
		JSONArray data = null;
		String ball_deball = null;
		String existColumnsYn = null;
		List<String> lowerCols = new ArrayList<String>();
//		Map paramMap = getParameterMap(request, false);
//		
//		paramMap = getParameterMap(request,false);

		
		
		
		
		
		
		param.put("category", param.get("bwms_type"));
		
	
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParse.parse(param.get("target").toString());
	
			//데이터 저장
			
			
			
			
			existColumnsYn = (String) jsonObj.get("existColumnsYn");
			System.out.println("existColumnsYn : " + existColumnsYn);
			imo_num = (Long) jsonObj.get("imo_num");
			System.out.println("imo_num : " + imo_num);
	
			fnm_rule = (String) jsonObj.get("fnm_rule");
			System.out.println("fnm_rule : " + fnm_rule);
	
			exl_sht_nm = (String) jsonObj.get("exl_sht_nm");
			System.out.println("exl_sht_nm : " + exl_sht_nm);
	
			bwms_type = (String) jsonObj.get("bwms_type");
			System.out.println("bwms_type : " + bwms_type);
			
			
			log_type = (String) jsonObj.get("log_type");
			System.out.println("log_type : " + log_type);
			
			cols = (JSONArray) jsonObj.get("cols");
			cols.remove("");
			System.out.println("cols : " + cols.toString());
			
			if(existColumnsYn.equals("N")) {
				data_stt_idx = (Long) jsonObj.get("data_stt_idx");
				System.out.println("data_stt_idx : " + data_stt_idx);
		
				dtm_idx = (JSONArray) jsonObj.get("dtm_idx");
				System.out.println("dtm_idx : " + dtm_idx);
			}
			data = (JSONArray) jsonObj.get("data");
			System.out.println(data.size());
	
			ball_deball = (String) jsonObj.get("ball_deball");
	
		
			for (int i = 0; i < cols.size(); i++) {
				String colObject = (String) cols.get(i);
				lowerCols.add(colObject.toString().toLowerCase()); 
				System.out.println(colObject.toString().toLowerCase());
			}
			
				
			for (int i = 0; i < data.size(); i++) {
				JSONObject dataObject = (JSONObject) data.get(i);
				dataObject.remove("");
			}
		
	
		// 확장자 제거한 파일명으로만 규칙 생성
//		int pos = fileName.lastIndexOf(".");
//		String fnm_rule = fnmRulePattern(fileName.substring(0, pos));

//		String method = getMethodName(new Throwable());
//		// Request Parameter Values Setting

//		System.out.println(data);

//		// mapping domain
//		ShipDomain shipDomain = new ShipDomain();
//		BeanUtils.copyProperties(shipDomain, paramMap);
		/*********************************************/

//		fnmRuleExistsMap.put("imo_num", paramMap.get(imo_num));
//		fnmRuleExistsMap.put("fnm_rule", fnm_rule);	

		// --------------------------------------------
		
		//table에 존재하는 컬럼 가져오기 
		Map<String,Object> bwmsLogMap = new HashMap<>();
		bwmsLogMap.put("log_type", log_type);
		bwmsLogMap.put("category", bwms_type);
		List<String> existCols = shipService.searchColsExistTable(bwmsLogMap);	
		List<String> newCols = new ArrayList<String>();
		List<Integer> withOutDataCount = new ArrayList<Integer>();
		Gson objGson = new Gson();
		
		
		JSONArray deleteColsNo = null;
		int withOutCount = 0 ;
		for (Object a : lowerCols) {
			boolean isEquals = false;
			
			for (Object b : existCols) {
				if(a.equals(b)) {
					isEquals = true;
				}
			}
			if(isEquals) {
				
				newCols.add(a.toString().toUpperCase());
			}else {
				withOutDataCount.add(withOutCount);
				
			}
//			deleteColsNo.add(a);
			withOutCount++;
		
		}
		
		//존재하느것만 cols에 넣기 
//		cols.removeAll(newCols);
//		cols.add(newCols);
			
		//fnm_rule 존재하는지 여부 	
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		fnmRuleExistsMap.put("imo_num", imo_num);
		fnmRuleExistsMap.put("fnm_rule", fnm_rule);

		int fnmRuleExists = shipService.getFnmRuleExists(fnmRuleExistsMap);
		
		//fnm_rule 존재하지않다면 fnm_rule 추가
		Map<String, Object> fnmRuleMap = new HashMap<>();
		if (fnmRuleExists == 0) {
			fnmRuleMap.put("imo_num", imo_num);
			fnmRuleMap.put("fnm_rule", fnm_rule);
			fnmRuleMap.put("bwms_type", bwms_type);
			fnmRuleMap.put("gsUserId", ((Map) super.getParameterMap(request, true)).get("gsUserId"));
			if (bwms_type.equals("O3")) {
				fnmRuleMap.put("ball_deball", ball_deball);
			}
			shipService.setFnmRule(fnmRuleMap);
		}
		


		int fnm_rule_num = shipService.getFnmRuleNum(fnmRuleExistsMap);
		System.out.println(fnm_rule_num);
		bwmsLogMap.put("fnm_rule_num", fnm_rule_num);
		Map<String, Object> fnmRuleSheetsMap = new HashMap<>();
		
//		if(existColumnsYn.equals("N")) {
//	
//		

//		}else if(existColumnsYn.equals("Y")) {
//			
//			
//		}
		
		
		
		// exsit컬럼이 아니면  fnmruleSheets 저장
		if(existColumnsYn.equals("N") || existColumnsYn == null){
			fnmRuleSheetsMap.put("fnm_rule_num", fnm_rule_num);
			fnmRuleSheetsMap.put("exl_sht_nm", exl_sht_nm);
			fnmRuleSheetsMap.put("log_type", log_type);
			fnmRuleSheetsMap.put("data_stt_idx", data_stt_idx);
			fnmRuleSheetsMap.put("dtm_idx", dtm_idx);
			
			//등록할 데이터의 정보들 insert
			shipService.setFnmRuleSheets(fnmRuleSheetsMap);
			
		}
		else if(existColumnsYn.equals("Y") ) {
			System.out.println("#@! if문 탐 ");
			fnmRuleSheetsMap = shipService.getFnmRuleSheet(bwmsLogMap);
			fnm_rule_num = (int) fnmRuleSheetsMap.get("fnm_rule_num");
			log_type = (String) fnmRuleSheetsMap.get("log_type");
		}

		
		
		
		
		Map<String, Object> bwmsMsrElemMap = new HashMap<>();
		
		if(existColumnsYn.equals("N")  || existColumnsYn == null){
			bwmsMsrElemMap.put("fnm_rule_num", fnm_rule_num);
			bwmsMsrElemMap.put("exl_sht_nm", exl_sht_nm);
			bwmsMsrElemMap.put("log_type", log_type);
			bwmsMsrElemMap.put("bwms_type", bwms_type);
			bwmsMsrElemMap.put("category", bwms_type);
			bwmsMsrElemMap.put("existColumnsYn",existColumnsYn);
			bwmsMsrElemMap.put("withOutDataCount",withOutDataCount);
		}
		else if(existColumnsYn.equals("Y")) {
			
			bwmsMsrElemMap = shipService.getFnmRuleSheet(bwmsLogMap);
			bwmsMsrElemMap.put("existColumnsYn",existColumnsYn);
			bwmsMsrElemMap.put("category", bwms_type);
			bwmsMsrElemMap.put("bwms_type", bwms_type);
			bwmsMsrElemMap.put("withOutDataCount",withOutDataCount);
			
		}
		
		
		int orgColsCount = shipService.countOrgCols(bwmsMsrElemMap);

		if(existColumnsYn.equals("N")) {
			Map orgMap = new HashMap<>();
				
				if(orgColsCount == 0) {
					//cols 오리지날 먼저 넣기
					orgMap.put("fnm_rule_num", fnm_rule_num);
					orgMap.put("cols", cols);
					orgMap.put("log_type", bwmsMsrElemMap.get("log_type"));
					orgMap.put("bwms_type", bwmsMsrElemMap.get("bwms_type"));

					shipService.setOrgCols(orgMap);
		
				}			
			}
		
		

		// --------------------------------------------

		// BWMS 측정 항목에서 빈 값이나 날짜/시간 항목은 제거
		/** 고민... **/
//		List<String> delElemList = new ArrayList<>();
//		for(int i=0; i<dtm_idx.length; i++) {
//			delElemList.add(cols.get(dtm_idx[i]));
//		}
//		for(int i=0; i<delElemList.size(); i++) {
//			cols.remove(delElemList.get(i));
//		}
//		cols.remove("");

		// --------------------------------------------

		// --------------------------------------------

		
		System.out.println("BWMSTYPE #@!" + bwms_type);
		if (bwms_type.equals("UV")) {
			
			if(log_type.equals("data")) {
				if (saveUVData(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("UV Data save success");
				} else {
					System.out.println("UV Data save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("event")){
				if (saveUVEvent(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("UV Event save success");
				} else {
					System.out.println("UV Event save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("oper")) {
				if (saveUVOperation(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("UV Operation save success");
				} else {
					System.out.println("UV Operation save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
				
				
			}
			
			
		} else if (bwms_type.equals("EC")) {
			
			if(log_type.equals("data")) {
				if (saveECData(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("EC Data save success");
				} else {
					System.out.println("EC Data save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("event")){
				if (saveECEvent(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("EC Event save success");
				} else {
					System.out.println("EC Event save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("oper")) {
				if (saveECOperation(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("EC Operation save success");
				} else {
					System.out.println("EC Operation save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
				
				
			}
			
		} else if (bwms_type.equals("O3")) {	
			if(log_type.equals("data")) {
				if (saveO3Data(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("O3 Data save success");
				} else {
					System.out.println("O3 Data save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("event")){
				if (saveO3Event(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("O3 Event save success");
				} else {
					System.out.println("O3 Event save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			}else if(log_type.equals("oper")) {
				if (saveO3Operation(bwmsMsrElemMap, data, fnm_rule_num, newCols)) {
					System.out.println("O3 Operation save success");
				} else {
					System.out.println("O3 Operation save fail");
	//				shipService.deleteFnmRuleNum(fnm_rule_num);
				}
			
			
		}
		
		}
		//data save 
//		dataLowSave(exl_sht_nm);

	}
	
	
	
	@RequestMapping("/ship/UVdataInsert.do")
//	@ResponseBody
	public void UVdataInsert(HttpServletRequest request, ModelMap model,HttpServletResponse response) throws Exception {
		
		Map paramMap =getParameterMap(request, false);
		
		
		ModelAndView mv  = new ModelAndView("jsonView");
		
		System.out.println("paramMap #@!" + paramMap);
		
		
		
		mv.addObject("result",paramMap);
		
		
	}
	
	
	
	
	

	
	private boolean saveUVOperation(Map<String, Object> bwmsMsrElemMap, JSONArray data, int fnm_rule_num,
			List<String> newCols) throws ParseException {
		// TODO Auto-generated method stub
		Map dataMap = null;
		boolean result = true;
		Object[] domains = null;
		
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
	

		
		System.out.println(data.get(0));
		for (int i = 0; i < data.size(); i++) {
		

			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			JSONObject dataObject = (JSONObject) data.get(i);

			System.out.println(dataObject);
			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			
			
			if (dataObject.keySet().containsAll(Arrays
					.asList(new Object[] { ((Object) new String("DATE")), ((Object) new String("TIME")) }))) {
				
				String date = (String) dataObject.get("DATE");
				
				String[] t =  date.split(" ");
				
				System.out.println(t[0]);
				date  = t[0];
			//			String dateTime = (String) dataObject.get("DATE/TIME");
			//			dateTime = dateTime.replace('/', '-');
				
				
				
				
				System.out.println(date);		
				newCols.remove("DATE");
				String time = (String) dataObject.get("TIME");
				newCols.remove("TIME");
				System.out.println(time);
			
				System.out.println(sdf.parse(date + " " + time));
				dataMap.put("log_date", sdf.parse(date + " " + time));
			

		

			}

				
				System.out.println("dataMap Insert end");
				System.out.println(newCols);
			for (Object key : newCols) {
				System.out.println("#@! key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
//							Double.parseDouble(((String) dataObject.get(key)).trim())
							dataObject.get(key).toString().trim()
							);
					} catch (Exception e) {
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}

			if (domains == null) {
				domains = dataMap.keySet().toArray();
			}
			result &= shipService.insertUVOper(dataMap);
		
		}
	

		bwmsMsrElemMap.put("cols", domains);
		
		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}

		return result;
		
	}

	private boolean saveUVEvent(Map<String, Object> bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) throws ParseException {
		// TODO Auto-generated method stub
		Map dataMap = null;
		boolean result = true;
		Object[] domains = null;
		
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
		

		
		System.out.println(data.get(0));
		for (int i = 0; i < data.size(); i++) {
		

			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			JSONObject dataObject = (JSONObject) data.get(i);

			System.out.println(dataObject);
			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			
			
			if (dataObject.keySet().containsAll(Arrays
					.asList(new Object[] { ((Object) new String("DATE")), ((Object) new String("TIME")) }))) {
				
				String date = (String) dataObject.get("DATE");
				
				String[] t =  date.split(" ");
				
				System.out.println(t[0]);
				date  = t[0];
			//			String dateTime = (String) dataObject.get("DATE/TIME");
			//			dateTime = dateTime.replace('/', '-');
				
				
				
				
				System.out.println(date);		
				newCols.remove("DATE");
				String time = (String) dataObject.get("TIME");
				newCols.remove("TIME");
				System.out.println(time);
			
				System.out.println(sdf.parse(date + " " + time));
				dataMap.put("log_date", sdf.parse(date + " " + time));
				

		

			}

				
				System.out.println("dataMap Insert end");
				System.out.println(newCols);
			for (Object key : newCols) {
				System.out.println("#@! key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
//							Double.parseDouble(((String) dataObject.get(key)).trim())
							dataObject.get(key).toString().trim()
							);
					} catch (Exception e) {
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}

			if (domains == null) {
				domains = dataMap.keySet().toArray();
			}
			result &= shipService.insertUVEvnet(dataMap);
		
		}
	

		bwmsMsrElemMap.put("cols", domains);
		
		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}

		return result;
		
	}
	/*operation*/
	private boolean saveECOperation(Map<String, Object> bwmsMsrElemMap, JSONArray data, int fnm_rule_num,
			List<String> newCols) throws ParseException {
		// TODO Auto-generated method stub
		// INDEX_NO 거르기
		if (newCols.contains("NO.")) {
			newCols.remove("NO.");
		} else if (newCols.contains("INDEX")) {
			newCols.remove("INDEX");
		} else if (newCols.contains("Normal OperationINDEX_NO")) {
			newCols.remove("Normal OperationINDEX_NO");
		} 
//		else if (cols.contains("INDEX_NO")) {
//			cols.remove("INDEX_NO");
//		}
		else if (newCols.contains("NORMAL OPERATIONINDEX_NO")) {
			newCols.remove("NORMAL OPERATIONINDEX_NO");
		
		}
		Map dataMap = null;
		boolean result = true;
		Object[] domains = null;
		
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
		

		
		System.out.println(data.get(0));
		for (int i = 0; i < data.size(); i++) {
		

			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			JSONObject dataObject = (JSONObject) data.get(i);

			System.out.println(dataObject);
			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		
			
			if(dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("START_TIME")),((Object) new String("END_TIME"))}))) {
			// start_time 정규화
				String startTime = (String) dataObject.get("START_TIME");
				newCols.remove("START_TIME");
				dataMap.put("start_time", sdf.parse(startTime));
				// end_time 정규화
				String endTime = (String) dataObject.get("END_TIME");
				newCols.remove("END_TIME");
				dataMap.put("end_time", sdf.parse(endTime));

		
			}

				
				System.out.println("dataMap Insert end");
				
			for (Object key : newCols) {
				System.out.println("#@! key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
//							Double.parseDouble(((String) dataObject.get(key)).trim())
							dataObject.get(key).toString().trim()
							);
					} catch (Exception e) {
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}

		
			result &= shipService.insertECOper(dataMap);
			if (domains == null) {
				dataMap.remove("fnm_rule_num");
				dataMap.remove("index_no");
				domains = dataMap.keySet().toArray();
			}
		}
	

		bwmsMsrElemMap.put("cols", domains);
		
		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}

		return result;
		
	}

	private boolean saveECEvent(Map<String, Object> bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) throws ParseException {
		
		// INDEX_NO 거르기
		if (newCols.contains("NO.")) {
			newCols.remove("NO.");
		} else if (newCols.contains("INDEX")) {
			newCols.remove("INDEX");
		} else if (newCols.contains("Normal OperationINDEX_NO")) {
			newCols.remove("Normal OperationINDEX_NO");
		}
		
//		else if (cols.contains("INDEX_NO")) {
//			cols.remove("INDEX_NO");
//		}
		else if (newCols.contains("NORMAL OPERATIONINDEX_NO")) {
			newCols.remove("NORMAL OPERATIONINDEX_NO");
		
		}
		
		
		Map dataMap = null;
		boolean result = true;
		Object[] domains = null;
		
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
	
		System.out.println(data.get(0));
		for (int i = 0; i < data.size(); i++) {
		

			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			JSONObject dataObject = (JSONObject) data.get(i);

			System.out.println(dataObject);
			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			// date 정규화
			if(dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("LOG_DATE"))}))) {
				String logDate = (String) dataObject.get("LOG_DATE");
				System.out.println("logdateParse  : " + logDate);
				newCols.remove("LOG_DATE");
				
				dataMap.put("log_date", sdf.parse(logDate));
				
			}
			// tag_name 빈칸일경우 
				String tagName = (String) dataObject.get("TAG_NAME");
				if(tagName.equals("")) {
					tagName = tagName.replace("","-");
					try {
						dataObject.remove("TAG_NAME");
						dataObject.put("TAG_NAME", tagName);
					} catch (Exception e) {
						System.out.println("put TAG_NAME False");
						continue;
					}
					
				}
				
			// device_name
				String deviceName = (String) dataObject.get("DEVICE_NAME");
				if(deviceName.equals("")) {
					deviceName = deviceName.replace("", "-");
					try {
						dataObject.remove("DEVICE_NAME");
						dataObject.put("DEVICE_NAME", deviceName);
//						dataMap.remove("device_name");
//						dataMap.put("device_name", deviceName);
					}catch (Exception e) {
						System.out.println("put DEVICE_NAME False");
						continue;
					}
				}
				
				
				System.out.println("dataMap Insert end");
				
			for (Object key : newCols) {
				System.out.println("#@! key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
//							Double.parseDouble(((String) dataObject.get(key)).trim())
							dataObject.get(key).toString().trim()
							);
					} catch (Exception e) {
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}
			if (domains == null) {
				dataMap.remove("fnm_rule_num");
				dataMap.remove("index_no");
				domains = dataMap.keySet().toArray();
			}
		
			result &= shipService.insertECEvent(dataMap);
		
		}
	
		
		bwmsMsrElemMap.put("cols", domains);
		
		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}

		return result;
		
	}

	private boolean saveECData(Map bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) throws ParseException {
		if (newCols.contains("NO.")) {
			newCols.remove("NO.");
		} else if (newCols.contains("INDEX")) {
			newCols.remove("INDEX");
		} else if (newCols.contains("Normal OperationINDEX_NO")) {
			newCols.remove("Normal OperationINDEX_NO");
		} 
//		else if (cols.contains("INDEX_NO")) {
//			cols.remove("INDEX_NO");
//		}
	
		Map dataMap = null;
		boolean result = true;
		Object[] domains = null;
		int maxSeq = shipService.getMaxSeq(bwmsMsrElemMap);
		
		List<Integer> withOutDataList = (List<Integer>) bwmsMsrElemMap.get("withOutDataCount");
		
		bwmsMsrElemMap.put("seq", maxSeq+1);
		
		// orgcols카운트
		int orgColsCount = shipService.countOrgCols(bwmsMsrElemMap);
		
		
		//org name
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
		
		
		System.out.println(data.get(0));
		for (int i = 0; i < data.size(); i++) {
//			if(withOutDataList.contains(i))
//				continue;
			String operation = null, gps = null, nwse = null, lat = null, lon = null, pump1 = null, pump2 = null,master = null;
			Integer merge = null;

			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			dataMap.put("seq",maxSeq);
			JSONObject dataObject = (JSONObject) data.get(i);

			System.out.println(dataObject);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if(dataObject.get("DATE") != null &&  dataObject.get("TIME") != null) {
				String date = (String) dataObject.get("DATE");
				date = date.replace('/', '-');
				System.out.println(date);
				String[] t = date.split("-");
				date = "20"+t[2] + '-' + t[0] + '-' + t[1];
				newCols.remove("DATE");
				String time = (String) dataObject.get("TIME");
				newCols.remove("TIME");
				System.out.println(time);
				try {
	//				System.out.println(date +" "+ time);
					System.out.println(sdf.parse(date + " " + time));
					dataMap.put("log_date", sdf.parse(date + " " + time));
				} catch (Exception e) {
					continue;
				}
			}
		
			
			if(dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("LOG_DATE"))}))) {
				String logDate = (String) dataObject.get("LOG_DATE");
				System.out.println("logdateParse  : " + logDate);
				newCols.remove("LOG_DATE");
				
				dataMap.put("log_date", sdf.parse(logDate));
				
			}
			
			if(dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("OPERATION"))}))) {
				 operation = (String) dataObject.get("OPERATION");
				newCols.remove("OPERATION");
				
				dataMap.put("operation", operation);
				
			}
			
			// gps 관련한거
			if(dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("GPS"))}))) {
				gps = (String) dataObject.get("GPS");
				newCols.remove("GPS");
				
				dataMap.put("gps", gps);
				
			}else if (dataObject.keySet().containsAll(Arrays.asList(new Object[] { ((Object) new String("GPS1")),
					((Object) new String("GPS2")), ((Object) new String("GPS3")), ((Object) new String("GPS4")),
					((Object) new String("GPS5")), ((Object) new String("GPS6")), ((Object) new String("GPS7")) }))) {
				gps =  (String) dataObject.get("GPS1") + (String) dataObject.get("GPS2")
						+ (String) dataObject.get("GPS3") + (String) dataObject.get("GPS4")
						+ (String) dataObject.get("GPS5") + (String) dataObject.get("GPS6")
						+ (String) dataObject.get("GPS7");

				
				newCols.remove("GPS1");
				newCols.remove("GPS2");
				newCols.remove("GPS3");
				newCols.remove("GPS4");
				newCols.remove("GPS5");
				newCols.remove("GPS6");
				newCols.remove("GPS7");

				dataMap.put("gps", gps);
			}

			System.out.println("gps = " +gps);

			if (dataObject.keySet().containsAll(Arrays.asList(
					new Object[] { ((Object) new String("LON_DIRECTION")), ((Object) new String("LAT_DIRECTION")) }))) {
				nwse = (String) dataObject.get("LAT_DIRECTION") + (String) dataObject.get("LON_DIRECTION");

				newCols.remove("LON_DIRECTION");
				newCols.remove("LAT_DIRECTION");

				dataMap.put("nwse", nwse);
			}
			System.out.println(nwse);


			if (dataObject.keySet().containsAll(Arrays
					.asList(new Object[] { ((Object) new String("LATITUDE")), ((Object) new String("LONGITUDE")) }))) {
				lat = (String) dataObject.get("LATITUDE");
				lon = (String) dataObject.get("LONGITUDE");

				newCols.remove("LATITUDE");
				newCols.remove("LONGITUDE");

				dataMap.put("lat", lat);
				dataMap.put("lon", lon);
			}
			
			if (dataObject.keySet().containsAll(
					Arrays.asList(new Object[] {((Object) new String("MASTER")) }))) {
			
				master = (String) dataObject.get("MASTER");

				
				newCols.remove("MASTER");

			
				dataMap.put("master", master);
			}

			if (dataObject.keySet().containsAll(
					Arrays.asList(new Object[] {((Object) new String("MERGE")) }))) {
			
				merge = Integer.parseInt((String) dataObject.get("MERGE"));

				
				newCols.remove("MERGE");

			
				dataMap.put("merge", merge);
			}

			if (dataObject.keySet().containsAll(
					Arrays.asList(new Object[] { ((Object) new String("PUMP1")), ((Object) new String("PUMP2")) }))) {
				newCols.remove("PUMP1");
				newCols.remove("PUMP2");

				dataMap.put("pump1", dataObject.get("PUMP1"));
				dataMap.put("pump2", dataObject.get("PUMP2"));
			}
			
			
			
			

			System.out.println(newCols);
			System.out.println(dataMap);
			System.out.println(dataObject);
			for (Object key : newCols) {
				System.out.println("#@! key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
							Double.parseDouble(((String) dataObject.get(key)).trim()));
//					((String) dataObject.get(key)).trim());
					} catch (Exception e) {
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}
			
			System.out.println(dataMap);
			
			result &= shipService.insertECData(dataMap);
			if (domains == null) {
				dataMap.remove("fnm_rule_num");
				dataMap.remove("index_no");
				domains = dataMap.keySet().toArray();
			}
		}

		bwmsMsrElemMap.put("cols", domains);

		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}

		return result;
	}

	private boolean saveUVData(Map bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols)
			throws IllegalAccessException, InvocationTargetException, ParseException {
		Map dataMap = null;
		boolean result = true;
//		List dataList = new ArrayList<>();
		int maxSeq = shipService.getMaxSeq(bwmsMsrElemMap);
		bwmsMsrElemMap.remove("seq");
		bwmsMsrElemMap.put("seq", maxSeq+1);
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
	
		Object[] domains = null;
		for (int i = 0; i < data.size(); i++) {
			dataMap = new HashMap<>();
//			UVDomain uvDomain = new UVDomain();

//			BeanUtils.copyProperties(uvDomain, dataMap);

			dataMap.put("fnm_rule_num", fnm_rule_num);
			dataMap.put("seq",maxSeq);
			JSONObject dataObject = (JSONObject) data.get(i);
//			System.out.println(dataObject);
//			System.out.println(dataObject);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			if (dataObject.keySet().containsAll(Arrays
					.asList(new Object[] { ((Object) new String("DATE")), ((Object) new String("TIME")) }))) {
				
				String date = (String) dataObject.get("DATE");
				
//				
//				date = date.replace('/', '-');
//				System.out.println(date);
//				String[] t = date.split("-");
//				date = "20"+t[2] + '-' + t[0] + '-' + t[1];
//				newCols.remove("DATE");
				String[] t = date.split(" ");
				date = t[0];
				System.out.println("변환 : "+date);
				String time = (String) dataObject.get("TIME");
				newCols.remove("TIME");
				System.out.println(time);
				try {
	//				System.out.println(date +" "+ time);
					System.out.println(sdf.parse(date + " " + time));
					dataMap.put("log_date", sdf.parse(date + " " + time));
				} catch (Exception e) {
					continue;
				}
					

			}

			if (dataObject.keySet().containsAll(Arrays
					.asList(new Object[] { ((Object) new String("LAT")), ((Object) new String("LON")) }))) {
				//lat long data replace
				
				
				String lat =  dataObject.get("LAT").toString().replace(".", "");
				lat = new StringBuilder(lat).insert(lat.length()-4, ".").toString();
				
				String lon =  dataObject.get("LON").toString().replace(".", "");
				lon = new StringBuilder(lon).insert(lon.length()-4, ".").toString();
				
				
				dataObject.put("lat", lat);
				dataObject.put("lon", lon);

				newCols.remove("LAT");
				newCols.remove("LON");

				newCols.add("lat");
				newCols.add("lon");
			}
			
		

			String nwse = "";
			if (dataObject.get("N").equals("1")) {
				nwse += "n";
			}
			dataObject.remove("N");
			newCols.remove("N");
			if (dataObject.get("S").equals("1")) {
				nwse += "s";
			}
			dataObject.remove("S");
			newCols.remove("S");
			if (dataObject.get("E").equals("1")) {
				nwse += "e";
			}
			dataObject.remove("E");
			newCols.remove("E");
			if (dataObject.get("W").equals("1")) {
				nwse += "w";
			}
			dataObject.remove("W");
			newCols.remove("W");

			dataMap.put("nwse", nwse);
//			cols.add("nwse");

//			dataMap.put("Latitude", Double.parseDouble((String) dataObject.get("Latitude")));
//			dataMap.put("Longitude", Double.parseDouble((String) dataObject.get("Longitude")));
//			System.out.println(cols);
//			System.out.println(dataMap);
//			System.out.println(dataObject);
			for (Object key : newCols) {
//				System.out.println("key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
//					System.out.println(((String) dataObject.get(key)).trim());
					dataMap.put(((String) key).toLowerCase(),
							Double.parseDouble(((String) dataObject.get(key)).trim()));

				} catch (Exception e) {
					// e.printStackTrace();

//					System.out.println("error!! key : " + key + " value : " + (String) dataObject.get(key));

				}
			}
//			if(!dataMap.containsKey("fnm_rule_num")) {
//				System.out.println("index : " + i);
//				dataMap.put("fnm_rule_num", fnm_rule_num);
//			}
//			dataList.add(dataMap);

//			System.out.println(dataMap);

			result &= shipService.insertUVData(dataMap);
		}
	

//		System.out.println(dataList.toString());
//		for(int j = 0; j < 10; j++) {
//			System.out.println(dataList.get(j));
//		}
//		shipService.insertUVDataList(dataList);
//		System.out.println(dataList.toString());

		if (domains == null) {
			dataMap.remove("fnm_rule_num");
			domains = dataMap.keySet().toArray();
////			List temp = Arrays.asList(dataMap.keySet().toArray());
////			temp.remove("fnm_rule_num");
////			domains = temp.toArray();
		}
//		System.out.println(cols);
//		bwmsMsrElemMap.put("cols", cols);
		bwmsMsrElemMap.put("cols", domains);
		
		if(existColumnsYn.equals("N")) {
		
			
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}
		return result;
	}
	
		
	

	private boolean saveO3Data(Map bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) {
		Map dataMap = null;
		boolean result = true;
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
		int maxSeq = shipService.getMaxSeq(bwmsMsrElemMap);	
		
		bwmsMsrElemMap.put("seq", maxSeq+1);
		
			
		
		Object[] domains = null;
		for (int i = 0; i < data.size(); i++) {
			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			dataMap.put("seq",maxSeq);
			JSONObject dataObject = (JSONObject) data.get(i);
			System.out.println(dataObject);
//			System.out.println(dataObject);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String date = (String) dataObject.get("LOG_DATE");
			
			newCols.remove("LOG_DATE");
			try {
				System.out.println(date);
//				System.out.println(sdf.parse(date +" "+ time));
				dataMap.put("log_date", sdf.parse(date));
			} catch (Exception e) {
				continue;
			}
		
			for (Object key : newCols) {
//				System.out.println("key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
							Double.parseDouble(((String) dataObject.get(key)).trim()));
				} catch (Exception e) {
//					e.printStackTrace();
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}
			System.out.println(dataMap);
		
			result &= shipService.insertO3Data(dataMap);
			if (domains == null) {
				dataMap.remove("fnm_rule_num");
				domains = dataMap.keySet().toArray();
			}
		}
		bwmsMsrElemMap.put("cols", domains);

		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}
		return result;
	}
	
	
	private boolean saveO3Event(Map bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) {
		Map dataMap = null;
		boolean result = true;
		String existColumnsYn = (String) bwmsMsrElemMap.get("existColumnsYn");
	
		
		Object[] domains = null;
		for (int i = 0; i < data.size(); i++) {
			dataMap = new HashMap<>();
			dataMap.put("fnm_rule_num", fnm_rule_num);
			JSONObject dataObject = (JSONObject) data.get(i);
			System.out.println(dataObject);
//			System.out.println(dataObject);
			SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
			String date = (String) dataObject.get("Start DATE");
			date = date.replace('/', '-');
			dataObject.remove("Start DATE");
			newCols.remove("Start DATE");
			try {
				System.out.println(date);
//				System.out.println(sdf.parse(date +" "+ time));
				dataMap.put("log_date", sdf.parse(date));
			} catch (Exception e) {
				continue;
			}
			System.out.println(newCols);
			System.out.println(dataMap);
			System.out.println(dataObject);
			for (Object key : newCols) {
//				System.out.println("key : " + key + " value : " + ((String) dataObject.get(key)).trim());
				try {
					dataMap.put(((String) key).toLowerCase(),
							Double.parseDouble(((String) dataObject.get(key)).trim()));
				} catch (Exception e) {
//					e.printStackTrace();
					System.out.println("error!!");
					System.out.println((String) dataObject.get(key));
					break;
				}
			}
			System.out.println(dataMap);
			if (domains == null) {
				dataMap.remove("fnm_rule_num");
				domains = dataMap.keySet().toArray();
			}
			result &= shipService.insertO3Data(dataMap);
		}
		bwmsMsrElemMap.put("cols", domains);

		if(existColumnsYn.equals("N")) {
			shipService.setBwmsMsrElem(bwmsMsrElemMap);
		}
		return result;

	}
	
	private boolean saveO3Operation(Map bwmsMsrElemMap, JSONArray data, int fnm_rule_num, List<String> newCols) {
		
		
		
		return false;
	}


//	public void dataLowSave(String inputFile) {
//		String fileName = inputFile.substring(
//				inputFile.lastIndexOf('\\') + 1, inputFile.length());
//		
//		// 확장자 제거한 파일명으로만 사용
//		int pos = fileName.lastIndexOf('.');
//		String fileNameWithoutExt = fileName.substring(0, pos);
//		
//		bwmsMsrElem = new ArrayList<>();
//		
//		// 파일 규칙명 번호
//		fnmRuleNum = shipService.getFnmRuleNum2(fileNameWithoutExt);
//		
//		BufferedInputStream is = new BufferedInputStream(new FileInputStream(inputFile));
//		XSSFWorkbook wb = new XSSFWorkbook(is);
//		
//		int sheets = wb.getNumberOfSheets();
//		for(int k=0; k<sheets; k++) {
//			if(!bwmsMsrElem.isEmpty())
//				bwmsMsrElem.clear();
//		
//			sheet = wb.getSheetAt(k);
//			String sheetName = sheet.getSheetName();
//			
//			Map<String, Object> paramMap = new HashMap<>();
//			paramMap.put("fnmRuleNum", fnmRuleNum);
//			paramMap.put("exlShtNm", sheetName);
//			
//			FnmRuleSheetsVO fnmRuleSheetsVO = shipService.getFnmRuleSheets(paramMap);
//			
//			String logType = fnmRuleSheetsVO.getLogType();
//			dataSttIdx = fnmRuleSheetsVO.getDataSttIdx();
//			dtmIdx = (Integer[]) fnmRuleSheetsVO.getDtmIdx();
//			
//			// BWMS 측정항목
//			bwmsMsrElem = shipService.getBwmsMsrElem(paramMap);
//			
//			// 엑셀 시트 행 수
//			int rows = sheet.getPhysicalNumberOfRows();
//			
//			if("Data Log".equals(logType)) {
//				try {
//					dataLogSave(rows);
//				} catch (SQLException se) {
//					logger.debug(se.toString());
//				}
//			} else if("Event Log".equals(logType)) {
//				try {
//					eventLogSave(rows);
//				} catch (SQLException se) {
//					logger.debug(se.toString());
//				}
//			}
//		} // for end (k)

//	}

	public void dataLogSave(int rows) throws Exception {
//		for(int i=dataSttIdx; i<rows; i++) {
//			XSSFRow row = sheet.getRow(i);
//			
//			if(row != null) {
//				int cells = row.getPhysicalNumberOfCells();
//				
//				StringBuilder logDate = new StringBuilder();
//				
//				for(int j=0; j<cells; j++) { /** 시작 열 생각 !! **/
//					XSSFCell cell = row.getCell(j);
//					
//					if(cell.getCellType() != XSSFCell.CELL_TYPE_BLANK) {
//						if(dtmIdx[0] == j || dtmIdx[1] == j) {
//							// 날짜 만들자
//							// Date/Time이 엑셀에서 Date형일 수도 있고 String형일 수도 있다. 고려!
//							/** Date와 Time이 분리 돼 있지 않을 경우 생각! **/
//							Date date = cell.getDateCellValue();
//							
//							/** 오전 오후 구분할 수 있게 **/
//							if(cell.getDateCellValue().toString().contains("1899")) {
//								logDate.append(" ");
//								logDate.append(new SimpleDateFormat(TIME_FORMAT).format(date));
//							} else {
//								logDate.append(new SimpleDateFormat(DATE_FORMAT).format(date));
//							}
//							continue;
//						}
//						
//						if(cell != null) {
//							double logData = cell.getNumericCellValue();
//							
//							DataLogVO dataLogVO = new DataLogVO();
//							dataLogVO.setFnmRuleNum(fnmRuleNum);
//							dataLogVO.setLogDate(Timestamp.valueOf(logDate.toString()));
//							dataLogVO.setBwmsMsrElem((bwmsMsrElem.get(j)));
//							dataLogVO.setLogData(logData);
//							
//							dataSaveMapper.setDataLog(dataLogVO);
//						}
//					}
//				} // for end (j)
//			}
//		} // for end (i)
	}

	public void eventLogSave(int rows) throws Exception {
		// TODO
	}

	// 파일명 규칙 만들기
	public String fnmRulePattern(String fileName) {
		int numCnt = 0;
		int strCnt = 0;
		StringBuffer regex = new StringBuffer(fileName.length());

		for (int i = 0; i < fileName.length(); i++) {
			String s = fileName.substring(i, i + 1);

			if (stringInteger(s)) {
				if (strCnt != 0) {
					regex.append("[A-Za-z_ -]{" + strCnt + "}");
					strCnt = 0;
				}
				numCnt++;
			} else if ("(".equals(s) || ")".equals(s)) {
				if (numCnt != 0) {
					regex.append("\\d{" + numCnt + "}");
					numCnt = 0;
				} else if (strCnt != 0) {
					regex.append("[A-Za-z _-]{" + strCnt + "}");
					strCnt = 0;
				}
				regex.append("\\" + s);
			} else {
				if (numCnt != 0) {
					regex.append("\\d{" + numCnt + "}");
					numCnt = 0;
				}
				strCnt++;
			}

			// 마지막 문자에서 체크해줘야한다. 카운트만 세고 끝날 수 있다.
			if (i == fileName.length() - 1) {
				if (strCnt != 0) {
					regex.append("[A-Za-z_ -]{" + strCnt + "}");
					strCnt = 0;
				} else if (numCnt != 0) {
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
		} catch (NumberFormatException nfe) {
			return false;
		}
	}
	
	@RequestMapping("/ship/insertShipDataFile.do")
	public String insertShipDataFile(HttpServletRequest request, ModelMap model, HttpServletResponse response) throws Exception {
		Map paramMap = getParameterMap(request, true);
		List fileList = fileManager.multiFileUpload(request);
		System.out.println(((MultipartHttpServletRequest)request).getFileMap());
		System.out.println(paramMap);
		System.out.println(fileList);
		if(fileList.size() != 0) {
			Map paramFileMap = fileManager.makeFileMap(request, response);
			Map fnmRuleExistsMap = new HashMap();
			fnmRuleExistsMap.put("imo_num", Integer.parseInt((String)paramMap.get("imoNum")));
			fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnmRule"));
			int fnmRuleNum = shipService.getFnmRuleNum(fnmRuleExistsMap);
			System.out.println(fnmRuleNum);
			paramFileMap.put("fnmRuleNum", fnmRuleNum);
			paramFileMap.put("gsUserId", (String)paramMap.get("gsUserId"));
			paramFileMap.put("logType", (String)paramMap.get("input-logType"));
			fileService.fileManagementForExcel(paramFileMap, fileList);
		}
		
		return "redirect:/ship/insertShipData.do";
	}
	

	/**
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/ship/insertExcel.do")
	public String insertExcel(HttpServletRequest request, ModelMap model, HttpServletResponse response)
			throws Exception {

		// ---------------------------------------------
		// Default Setting Start
		String method = getMethodName(new Throwable());
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		// mapping domain
		ShipDomain shipDomain = new ShipDomain();
		BeanUtils.copyProperties(shipDomain, paramMap);
		// -------------------- Default Setting End -----------------------//

		String procType = "I";

		String[] colName = { "INDEX", "TIME", "Master", "Merge", "REC1_CURRENT", "REC1_VOLTAGE", "REC2_CURRENT",
				"REC2_VOLTAGE", "REC3_CURRENT", "REC3_VOLTAGE", "REC4_CURRENT", "REC4_VOLTAGE", "REC5_CURRENT",
				"REC5_VOLTAGE", "REC6_CURRENT", "REC6_VOLTAGE", "REC7_CURRENT", "REC7_VOLTAGE", "ANU_D1", "ANU_D3",
				"ANU_S1", "ANU_S2", "CSU1", "FMU1", "FMU2", "FMU3", "GDS1", "GDS2", "GDS3", "STS1", "TRO_B1", "TRO_B2",
				"TRO_B3", "TRO_D1", "TRO_D3", "TRO_S1", "TRO_S2", "GPS", "ANU_D2", "BP1_NO1_BALLAST_PUMP",
				"BP2_NO2_BALLAST_PUMP", "FP1_NO1_BILGE_FIRE_PUMP", "FP2_NO2_BILGE_FIRE_PUMP", "TRO_D2" };
		Map fileMap = new HashMap();
		Map reqMap = new HashMap();
		String updateName = null;
		String insertName = null;
		String batch = null;

		try {
			List listFileInfo = fileManager.multiFileUpload(request);

			shipService.insertExcel(paramMap, listFileInfo, procType);

			fileMap = fileManager.makeFileMap(request, response);

			fileMap.put("imono", paramMap.get("imono"));
			fileMap.put("shipName", paramMap.get("shipName"));
			fileMap.put("bwmsType", paramMap.get("bwmsType"));
//			excelService.regiExcelLoadImport(reqMap, fileMap, updateName, insertName, colName, batch);

			csvService.csvReader(fileMap);

		} catch (Exception e) {
			e.printStackTrace();

		}

		// Return Values

		return "redirect:/ship/insertShipData.do";
		// return "main/main";
	}

	@RequestMapping(value = "/ship/shipinfoAPI.do")
	public ModelAndView shipinfoAPI(HttpServletRequest request, ModelMap model, HttpServletResponse response)
			throws Exception {

		// Default Setting Start
		String method = getMethodName(new Throwable());
		HttpSession session = request.getSession();
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);

		// mapping domain
		ShipDomain shipDomain = new ShipDomain();
		BeanUtils.copyProperties(shipDomain, paramMap);
		// -------------------- Default Setting End ---------

		response.setHeader("Access-Control-Allow-Origin", "*");

		response.setHeader("Access-Control-Allow-Methods", "GET");

		ModelAndView mv = new ModelAndView("jsonView");

		String apiUrl = "http://apis.data.go.kr/1192000/SicsVsslManp2/Info";
		// 홈페이지에서 받은 키
		String serviceKey = "bAPkxM2d0FmZ0CMQDH9LAgeUIHv8NMF%2Fc4yOBn6HqKS9aWgOlNrVZmGcqb%2F%2FHfqZhUXcyEHaZmMG3UWSRCJjjw%3D%3D";
		String pageNo = "1";
		String numOfRows = "10";
		String shipName = (String) paramMap.get("shipName");

		StringBuilder urlBuilder = new StringBuilder();

		urlBuilder.append(apiUrl);
		urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
		urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(numOfRows, "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("vsslNm", "UTF-8") + "=" + URLEncoder.encode(shipName, "UTF-8"));

		System.out.println("URL Builder : " + urlBuilder);
		/*
		 * GET방식으로 전송해서 파라미터 받아오기
		 */
		URL url = new URL(urlBuilder.toString());
		// 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		List<String> nolist = new ArrayList<String>();
		List<String> kornmlist = new ArrayList<String>();
		List<String> engnmlist = new ArrayList<String>();
		List<String> totltlist = new ArrayList<String>();
		List<String> ltlist = new ArrayList<String>();
		List<String> dplist = new ArrayList<String>();
		List<String> vsslNltylist = new ArrayList<String>();
		List<String> vsslCnstrDtlist = new ArrayList<String>();
		List<String> grtglist = new ArrayList<String>();
		List<String> vsslKndlist = new ArrayList<String>();
		List<String> imoNolist = new ArrayList<String>();

//				Map<String,Map<String,Object>> mapmap = new HashMap<String,Map<String,Object>>();
		String s = null;
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(urlBuilder.toString());

		Element e = null;
		NodeList nodeList = doc.getElementsByTagName("item");
		System.out.println("파싱할 리스트 수  : " + nodeList.getLength());
		
		
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node n = nodeList.item(i); // 노드 반환
			if (n.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element) n;

				nolist.add(getTagValue("vsslNo", element));
				map.put("vsslNo", nolist);
				kornmlist.add(getTagValue("vsslKorNm", element));
				map.put("vsslKorNm", kornmlist);
				engnmlist.add(getTagValue("vsslEngNm", element));
				map.put("vsslEngNm", engnmlist);
				totltlist.add(getTagValue("vsslTotLt", element));
				map.put("vsslTotLt", totltlist);
				ltlist.add(getTagValue("vsslLt", element));
				map.put("vsslLt", ltlist);
				dplist.add(getTagValue("vsslDp", element));
				map.put("vsslDp", dplist);

				vsslNltylist.add(getTagValue("vsslNlty", element));

				map.put("vsslNlty", vsslNltylist);
				vsslCnstrDtlist.add(getTagValue("vsslCnstrDt", element));

				map.put("vsslCnstrDt", vsslCnstrDtlist);
				grtglist.add(getTagValue("grtg", element));

				map.put("grtg", grtglist);
				vsslKndlist.add(getTagValue("vsslKnd", element));

				map.put("vsslKnd", vsslKndlist);
				imoNolist.add(getTagValue("imoNo", element));
				map.put("imoNo", imoNolist);
			}
			mv.addObject("count", nodeList.getLength());
			mv.addObject("result", map);
		}
		return mv;
	}

	@RequestMapping(value = "/ship/ajaxIntoInfo.do")
	public ModelAndView ajaxIntoInfo(HttpServletRequest request, ModelMap model, HttpServletResponse response)
			throws Exception {
		// Default Setting Start
		String method = getMethodName(new Throwable());
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		// mapping domain
		ShipDomain shipDomain = new ShipDomain();
		BeanUtils.copyProperties(shipDomain, paramMap);
		// -------------------- Default Setting End ---------

		response.setHeader("Access-Control-Allow-Origin", "*");

		response.setHeader("Access-Control-Allow-Methods", "GET");

		ModelAndView mv = new ModelAndView("jsonView");

		return mv;
	}

	@RequestMapping("/ship/viewShipData.do")
	@SuppressWarnings({ "rawtypes" })
	public String viewShipData(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		
		System.out.println("paramMap#@!" + paramMap.toString());
		List ecList = shipService.getFnmRuleList(paramMap, "EC");
		List uvList = shipService.getFnmRuleList(paramMap, "UV");
		List ballList = shipService.getFnmRuleList(paramMap, "O3:ball");
		List deballList = shipService.getFnmRuleList(paramMap, "O3:deball");

		model.addAttribute("ecFnmRules", ecList);
		model.addAttribute("uvFnmRules", uvList);
		model.addAttribute("ballFnmRules", ballList);
		model.addAttribute("deballFnmRules", deballList);
		
		
		

		return "ship/viewShipData";

	}

	@RequestMapping("/ship/getFnmRule.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getFnmRule(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);

		ModelAndView mv = new ModelAndView("jsonView");
		
		//파일카운트
		mv.addObject("fnmRules", shipService.getFnmFileList(paramMap));

		return mv;
	}

	@RequestMapping("/ship/getShipData.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getShipData(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		paramMap.put("imo_num", Integer.parseInt((String) paramMap.get("imo_num")));
		int fnm_rule_num = shipService.getFnmRuleNum(paramMap);
		paramMap.put("fnm_rule_num", fnm_rule_num);

		List<String> bwmsMsrElem = shipService.getBwmsMsrElemMap(paramMap);
//		Map msrView = shipService.getBwmsMsrElemView(paramMap);
//		String elem = (String)msrView.get("bwms_msr_elem");
		for (int i = 0; i < bwmsMsrElem.size(); i++) {
			System.out.println(i+bwmsMsrElem.get(i));
			if(bwmsMsrElem.get(i).equals("log_date") ) {
				bwmsMsrElem.remove("log_date");
				bwmsMsrElem.add(0, "log_date");
				paramMap.put("log_date", "Y");
			}
			if(bwmsMsrElem.get(i).equals("start_time")) {
				bwmsMsrElem.remove("start_time");
				bwmsMsrElem.add(0, "start_time");
				paramMap.put("start_time", "Y");
			}
			if(bwmsMsrElem.get(i).equals("end_time")) {
				bwmsMsrElem.remove("end_time");
				bwmsMsrElem.add(1, "end_time");
				paramMap.put("end_time", "Y");
			}
		}
		

		
	
		
		
		paramMap.put("columnnamearr", bwmsMsrElem);

		List data = shipService.getData(paramMap);
//		System.out.println(uv_data.get(0));
		mv.addObject("domain", paramMap.get("columnnamearr"));
		mv.addObject("data", data);
		// data_log에서 데이터 추출 and 도메인값 얻기
		return mv;
	}


	@RequestMapping("/ship/getDomainDescription.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getDomainDescription(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");

		mv.addObject(shipService.getDomainDescription(paramMap));
		
		return mv;
	}
	
	@RequestMapping("/ship/getDataSetCount.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getDataSetCount(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");

		mv.addObject(shipService.getDataSetCount());
		
		return mv;
	}
	
	@RequestMapping("/ship/getDataSetRgsDe.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getDataSetRgsDe(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");

		mv.addObject("result",shipService.getDataSetRgsDe());
		System.out.println();
		return mv;
	}
	
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/ship/selectShipInfo.do")
	public ModelAndView selectShipInfo(HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");	
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		List<Map> ship = shipService.selectShipInfo(paramMap);
		
//		seq로 찾기
//		Map<String,Object> ship = shipService.selectSeq(paramMap);
//		
//		model.addAttribute("ship",ship);
//		System.out.println("insertShipData.do"+paramMap);
	
		
		mv.addObject("shipList",ship);
	
		
		
		return mv;
	}
	// 같은데이터 넣을때
	@RequestMapping("/ship/existColumns.do")
	public ModelAndView existColumns(HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");	
		Map paramMap = getParameterMap(request, true);
		String existYn = null ;
		List<Integer> dtmIdxList = new ArrayList<Integer>();
		
		int imoNum =  Integer.parseInt((String) paramMap.get("imo_num"));
		paramMap.remove("imo_num");
		paramMap.put("imo_num", imoNum);
		
		int existNo = shipService.getFnmRuleExists(paramMap);
		
		if(existNo > 0) {
			
			int fnmRuleNum = shipService.getFnmRuleNum(paramMap);
			paramMap.put("fnm_rule_num", fnmRuleNum);
			
			int countCols = shipService.countCols(paramMap);
			int countMsrCols = shipService.countMsrCols(paramMap);
			System.out.println(countCols);
			System.out.println(countMsrCols);
			if(countCols >0 && countMsrCols>0) {
				existYn = "Y";
				List<String> columns = shipService.getOrgCols(paramMap);
				Map ruleSheet = shipService.getFnmRuleSheet(paramMap);
				
				
				int dataSttIdx = (int) ruleSheet.get("data_stt_idx");
//				String  dtmIdx = ruleSheet.get("dtm_idx").toString();
				
				
				
				mv.addObject("columns",columns);
				mv.addObject("dataSttIdx",dataSttIdx);
//				mv.addObject("dtmIdx",dtmIdx);
//				System.out.println("dtmIdx : " + dtmIdx);
			}else {
				existYn = "N";
			}
//			mv.addObject("dtmIdx",dtmIdx);
		}else {
			existYn = "N";
		}
		mv.addObject("existYn",existYn);
		
		
		return mv;
	}
	
	

	
	private static String getTagValue(String tag, Element ele) {

		NodeList nodeList = ele.getElementsByTagName(tag).item(0).getChildNodes();

		Node nValue = (Node) nodeList.item(0);

		if (nValue == null) {

			return null;

		}

		return nValue.getNodeValue();

	}// getTagValue

	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Default Values Setting
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map reqMap, String method) {
		if (method.equalsIgnoreCase("findCodeAjax")) {
			
			
			
			
		}
	}
}
