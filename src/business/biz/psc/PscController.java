package business.biz.psc;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.opencsv.CSVWriter;

import business.biz.ship.ShipService;
import common.base.BaseController;

@Controller
@SuppressWarnings({ "rawtypes", "unchecked" })
public class PscController extends BaseController {
	@Autowired
	private ShipService shipService;

	@RequestMapping("/psc/dashboard.do")
	public String dashboard(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		System.out.println("paramMap #@!"+ paramMap.toString());
		if (paramMap == null)
			return "redirect:/login.do";
		List fnmRuleList = (List) shipService.getFnmRuleList(paramMap, "EC");
		model.addAttribute("fnmRuleList", fnmRuleList);
		return "/psc/dashboard";
	}

	@RequestMapping("/psc/searchImo.do")
	public ModelAndView searchImo(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		String bwms_type = null;
		if (paramMap.containsKey("bwmsType"))
			bwms_type = (String) paramMap.get("bwmsType");
		ModelAndView mv = new ModelAndView("jsonView");
		mv.addObject(shipService.getFnmRuleList(paramMap, bwms_type));
		return mv;
	}

	@RequestMapping("/psc/selectedBwmsType.do")
	public ModelAndView selectedBwmsType(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		mv.addObject(shipService.getFnmRuleList(paramMap, null));
		return mv;
	}

	@RequestMapping("/psc/searchDataLog.do")
	public ModelAndView searchDataLog(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		List<Map> operTime = new ArrayList<Map>();
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imoNo")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnmRule"));

		dataMap.put("fnmRuleNum", shipService.getFnmRuleNum(fnmRuleExistsMap));
		dataMap.put("category", paramMap.get("category"));
		
		int operCount = shipService.getOperCount(dataMap);
		System.out.println(operCount);
		if(operCount> 0) {
			if((boolean)paramMap.get("category").equals("EC")) {
				operTime= shipService.getOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}else if ((boolean)paramMap.get("category").equals("UV")) {
				operTime= shipService.getUVOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}
				
		}
		
		List seqList = shipService.getSeqList(dataMap);
		dataMap.put("seqList", seqList);
		List<String> bwmsMsrElem = shipService.getBwmsMsrElem((int) dataMap.get("fnmRuleNum"));
		
		
		mv.addObject(shipService.getDataGroupByDate(dataMap));
		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("operCount",operCount);
		
		return mv;
	}
	@SuppressWarnings("deprecation")
	@RequestMapping("/psc/searchUnitLog.do")
	public ModelAndView searchUnitLog(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		List<Map> operTime = new ArrayList<Map>();
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imoNo")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnmRule"));

		dataMap.put("fnmRuleNum", shipService.getFnmRuleNum(fnmRuleExistsMap));
		dataMap.put("category", paramMap.get("category"));
		
		int operCount = shipService.getOperCount(dataMap);
		System.out.println(operCount);
		if(operCount> 0) {
			if((boolean)paramMap.get("category").equals("EC")) {
				operTime= shipService.getOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}else if ((boolean)paramMap.get("category").equals("UV")) {
				operTime= shipService.getUVOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}
				
		}

	
		
		List seqList = shipService.getSeqList(dataMap);
		dataMap.put("seqList", seqList);
		List<String> bwmsMsrElem = shipService.getBwmsMsrElem((int) dataMap.get("fnmRuleNum"));
		
		
		mv.addObject(shipService.getDataGroupByDate(dataMap));
		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("operCount",operCount);
		
		return mv;
	}
	
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/psc/searchTermUnitLog.do")
	public ModelAndView searchTermUnitLog(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		List<Map> operTime = new ArrayList<Map>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imoNo")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnmRule"));

		dataMap.put("fnmRuleNum", shipService.getFnmRuleNum(fnmRuleExistsMap));
		dataMap.put("category", paramMap.get("category"));
		
		
		dataMap.put("startTime", paramMap.get("startTime"));
		dataMap.put("endTime", paramMap.get("endTime"));
		int operCount = shipService.getOperCount(dataMap);
		System.out.println(operCount);
		if(operCount> 0) {
			if((boolean)paramMap.get("category").equals("EC")) {
				operTime= shipService.getOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}else if ((boolean)paramMap.get("category").equals("UV")) {
				operTime= shipService.getUVOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}
				
		}
		
		
		List seqList = shipService.getSeqList(dataMap);
		dataMap.put("seqList", seqList);
		List<String> bwmsMsrElem = shipService.getBwmsMsrElem((int) dataMap.get("fnmRuleNum"));
		
		
		
		
		
		
		mv.addObject(shipService.getDataGroupByDate(dataMap));
		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("operCount",operCount);
		
		return mv;
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/psc/searchUnitOperValiData.do")
	public ModelAndView searchUnitOperValiData(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		List<Map> operTime = new ArrayList<Map>();
		ArrayList troList = new ArrayList();
		ArrayList tro1List = new ArrayList();
		ArrayList tro2List = new ArrayList();
		ArrayList tro_b1List = new ArrayList();
		ArrayList tro_b2List = new ArrayList();
		ArrayList tro_b3List = new ArrayList();
		ArrayList tro_d1List = new ArrayList();
		ArrayList tro_d2List = new ArrayList();
		ArrayList tro_d3List = new ArrayList();
		ArrayList tro_d4List = new ArrayList();
		ArrayList tro_s1List = new ArrayList();
		ArrayList tro_s2List = new ArrayList();
		ArrayList tro_s3List = new ArrayList();
		ArrayList tro_s4List = new ArrayList();
		List<String> optionList = new ArrayList<String>();
		int troCount =0;
		int tro1Count =0;
		int tro2Count =0;
		int tro_b1Count =0;
		int tro_b2Count =0;
		int tro_b3Count =0;
		int tro_d1Count =0;
		int tro_d2Count =0;
		int tro_d3Count =0;
		int tro_d4Count =0;
		int tro_s1Count =0;
		int tro_s2Count =0;
		int tro_s3Count =0;
		int tro_s4Count =0;
		int doseCount =0;
		int s1doseCount =0;
		int s2doseCount =0;
		int p1doseCount =0;
		int p2doseCount =0;
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imoNo")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnmRule"));
		int fnmRuleNum = shipService.getFnmRuleNum(fnmRuleExistsMap);
		dataMap.put("logType", "data");
		dataMap.put("startTime", new Date((String) paramMap.get("startTime")));
		dataMap.put("endTime", new Date((String) paramMap.get("endTime")));
		dataMap.put("fnmRuleNum", fnmRuleNum);
		dataMap.put("fnm_rule_num", fnmRuleNum);
		dataMap.put("category", paramMap.get("category"));
		
		String category = (String) paramMap.get("category");
//		List<String> bwmsMsrElem = shipService.getBwmsMsrElemMap(dataMap);
	
		
		List<Map> allDataList = shipService.searchValidData(dataMap);
		
		if(category.equals("EC")) {
			for (Object map : allDataList) {
				troList.add(((Map) map).get("tro"));
				tro1List.add(((Map) map).get("tro1"));
				tro2List.add(((Map) map).get("tro2"));
				tro_b1List.add(((Map) map).get("tro_b1"));
				tro_b2List.add(((Map) map).get("tro_b2"));
				tro_b3List.add(((Map) map).get("tro_b3"));
				tro_d1List.add(((Map) map).get("tro_d1"));
				tro_d2List.add(((Map) map).get("tro_d2"));
				tro_d3List.add(((Map) map).get("tro_d3"));
				tro_d4List.add(((Map) map).get("tro_d4"));
				tro_s1List.add(((Map) map).get("tro_s1"));
				tro_s2List.add(((Map) map).get("tro_s2"));
				tro_s3List.add(((Map) map).get("tro_s3"));
				tro_s4List.add(((Map) map).get("tro_s4"));
			}
		
			for (int i = 0; i < allDataList.size(); i++) {
				
				if(String.valueOf(troList.get(i)).equals("null") || String.valueOf(troList.get(i)).equals("0.0")) {
					troCount ++;
				}
				if(String.valueOf(tro1List.get(i)).equals("null") ||  String.valueOf(tro1List.get(i)).equals("0.0")) {
					tro1Count ++;
				}
				if(String.valueOf(tro2List.get(i)).equals("null")  || String.valueOf(tro2List.get(i)).equals("0.0") ) {
					tro2Count ++;
				}
				if(String.valueOf(tro_b1List.get(i)).equals("null") ||  String.valueOf(tro_b1List.get(i)).equals("0.0")) {
					tro_b1Count ++;
				}
				if(String.valueOf(tro_b2List.get(i)).equals("null") ||  String.valueOf(tro_b2List.get(i)).equals("0.0")) {
					tro_b2Count ++;
				}
				if(String.valueOf(tro_b3List.get(i)).equals("null") || String.valueOf(tro_b3List.get(i)).equals("0.0")) {
					tro_b3Count ++;
				}
				if(String.valueOf(tro_d1List.get(i)).equals("null") || String.valueOf(tro_d1List.get(i)).equals("0.0")) {
					tro_d1Count ++;
				}
				if(String.valueOf(tro_d2List.get(i)).equals("null") || String.valueOf(tro_d2List.get(i)).equals("0.0")) {
					tro_d2Count ++;
				}
				if(String.valueOf(tro_d3List.get(i)).equals("null") || String.valueOf(tro_d3List.get(i)).equals("0.0")) {
					tro_d3Count ++;
				}
				if(String.valueOf(tro_d4List.get(i)).equals("null") || String.valueOf(tro_d4List.get(i)).equals("0.0")) {
					tro_d4Count ++;
				}
				if(String.valueOf(tro_s1List.get(i)).equals("null") || String.valueOf(tro_s1List.get(i)).equals("0.0")) {
					tro_s1Count ++;
				}
				if(String.valueOf(tro_s2List.get(i)).equals("null") || String.valueOf(tro_s2List.get(i)).equals("0.0")) {
					tro_s2Count ++;
				}
				if(String.valueOf(tro_s3List.get(i)).equals("null") || String.valueOf(tro_s3List.get(i)).equals("0.0")) {
					tro_s3Count ++;
				}
				if(String.valueOf(tro_s4List.get(i)).equals("null") || String.valueOf(tro_s4List.get(i)).equals("0.0")) {
					tro_s4Count ++;
				}
				
			}
			
	
	//		if(!troList.contains("null"))
			
			
			if(troCount != allDataList.size()) {
				optionList.add("tro");
			}if(tro1Count != allDataList.size()) {
				optionList.add("tro1");
			} 
			if(tro2Count != allDataList.size()) {
				optionList.add("tro2");
			} 
			if(tro_b1Count != allDataList.size()) {
				optionList.add("tro_b1");
			}
			if(tro_b2Count != allDataList.size()) {
				optionList.add("tro_b2");
			}
			if(tro_b3Count != allDataList.size()) {
				optionList.add("tro_b3");
			}
			if(tro_d1Count != allDataList.size()) {
				optionList.add("tro_d1");
			}
			if(tro_d2Count != allDataList.size()) {
				optionList.add("tro_d2");
			}
			if(tro_d3Count != allDataList.size()) {
				optionList.add("tro_d3");
			}
			if(tro_d4Count != allDataList.size()) {
				optionList.add("tro_d4");
			}
			if(tro_s1Count != allDataList.size()) {
				optionList.add("tro_s1");
			}
			if(tro_s2Count != allDataList.size()) {
				optionList.add("tro_s2");
			}
			if(tro_s3Count != allDataList.size()) {
				optionList.add("tro_s3");
			}
			if(tro_s4Count != allDataList.size()) {
				optionList.add("tro_s4");
			}
		}else if( category.equals("UV")) {
			
			ArrayList doseList = new ArrayList();
			ArrayList s1doseList = new ArrayList();
			ArrayList s2doseList = new ArrayList();
			ArrayList p1doseList = new ArrayList();
			ArrayList p2doseList = new ArrayList();
			
			
			for (Object map : allDataList) {
				doseList.add(((Map) map).get("dose"));
				s1doseList.add(((Map) map).get("s1_dose"));
				s2doseList.add(((Map) map).get("s2_dose"));
				p1doseList.add(((Map) map).get("p1_dose"));
				p2doseList.add(((Map) map).get("p2_dose"));
				
			}
			
			for (int i = 0; i < allDataList.size(); i++) {
				
				if(String.valueOf(doseList.get(i)).equals("null") || String.valueOf(doseList.get(i)).equals("0.0")) {
					doseCount ++;
				}
				if(String.valueOf(s1doseList.get(i)).equals("null") ||  String.valueOf(s1doseList.get(i)).equals("0.0")) {
					s1doseCount ++;
				}
				if(String.valueOf(s2doseList.get(i)).equals("null")  || String.valueOf(s2doseList.get(i)).equals("0.0") ) {
					s2doseCount ++;
				}
				if(String.valueOf(p1doseList.get(i)).equals("null") ||  String.valueOf(p1doseList.get(i)).equals("0.0")) {
					p1doseCount ++;
				}
				if(String.valueOf(p2doseList.get(i)).equals("null") ||  String.valueOf(p2doseList.get(i)).equals("0.0")) {
					p2doseCount ++;
				}
			
			}
			

			if(doseCount != allDataList.size()) {
				optionList.add("dose");
			}if(s1doseCount != allDataList.size()) {
				optionList.add("s1_dose");
			} 
			if(s2doseCount != allDataList.size()) {
				optionList.add("s2_dose");
			} 
			if(p1doseCount != allDataList.size()) {
				optionList.add("p1_dose");
			}
			if(p2doseCount != allDataList.size()) {
				optionList.add("p2_dose");
			}
			
			
		}
		
		System.out.println("optionList" + optionList);
		int operCount = shipService.getOperCount(dataMap);
		System.out.println(operCount);
		if(operCount> 0) {
			if((boolean)paramMap.get("category").equals("EC")) {
				operTime= shipService.getOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}else if ((boolean)paramMap.get("category").equals("UV")) {
				operTime= shipService.getUVOperTime(dataMap);
				mv.addObject("operTime",operTime);	
			}
				
		}
		
//		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("optionList", optionList);
		mv.addObject("operCount",operCount);
		
		
		return mv;
	}
	

	@SuppressWarnings("deprecation")
	@RequestMapping("/psc/getShipData.do")
	
	public ModelAndView getShipData(HttpServletRequest request, ModelMap model) throws Exception {
		
		Map paramMap = super.getParameterMap(request, true);
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		ModelAndView mv = new ModelAndView("jsonView");
	
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imo_num")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("fnm_rule"));
		dataMap.put("fnm_rule_num", shipService.getFnmRuleNum(fnmRuleExistsMap));
		dataMap.put("category", paramMap.get("category"));
//		dataMap.put("startTime", paramMap.get("startTime"));
		dataMap.put("endTime", paramMap.get("endTime"));
		dataMap.put("logType", "data");
		dataMap.put("startTime", new Date((String) paramMap.get("startTime")));
		dataMap.put("endTime", new Date((String) paramMap.get("endTime")));
		
		//표준화 된 컬럼명
		//표준화 된 칼럼명 저장된 테이블 bwms_msr_elem
//		List<String> bwmsMsrElem = shipService.getBwmsMsrElem((int) dataMap.get("fnm_rule_num"));
		List<String> bwmsMsrElem = shipService.getBwmsMsrElemMap(dataMap);
		
		bwmsMsrElem.remove("log_date");
		bwmsMsrElem.add(0, "log_date");
		// 칼럼명 clumnnamearr에 다 넣음
		dataMap.put("columnnamearr", bwmsMsrElem);
		
		System.out.println("dataMap #@! @@ = "+ dataMap.get("coulmnnamearr"));
		ArrayList dataList = new ArrayList();
		ArrayList logList = new ArrayList();
		//gpsList
		ArrayList gpsList = new ArrayList();
		ArrayList latList = new ArrayList();
		ArrayList lonList = new ArrayList();
		String category = (String)paramMap.get("category");
		List allDataList = shipService.getData(dataMap);
		for (Object map : allDataList) {
			logList.add(((Map) map).get("log_date"));
			//유효 데이터 selected 된 값 (ex: tro_b1)
			dataList.add(((Map) map).get(paramMap.get("validData")));
			//gpsList add
			if(category == "EC") {
				gpsList.add(((Map) map).get("gps"));
			}
			if(category == "UV") {
				latList.add(((Map) map).get("lat"));
				lonList.add(((Map) map).get("lon"));
			}
		}
//		System.out.println(dataList);
//		System.out.println(logList);
		mv.addObject("gpsList", gpsList);
		mv.addObject("dataList", dataList);
		mv.addObject("logList", logList);
		mv.addObject("allDataList", allDataList);
		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("startTime", paramMap.get("startTime"));
		mv.addObject("endTime", paramMap.get("endTime"));

		return mv;
	}
	
	@RequestMapping("/psc/dashPop.do")
	public ModelAndView dashPop(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		Map fnmRule = shipService.getFnmRule(Integer.parseInt((String)paramMap.get("imoNum")));
		String shipNm = (String)fnmRule.get("fnmRule");
		paramMap.remove("shipNm");
		paramMap.put("shipNm", shipNm);
		paramMap.put("domainName", paramMap.get("colNm"));
		String lowerColNm = paramMap.get("colNm").toString();
		String colNm = paramMap.get("colNm").toString().toUpperCase();
		mv.addObject("colNm", colNm);
		mv.addObject("lowerColNm", lowerColNm);
//		SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
//		Date startTime = sdf.parse((String)paramMap.get("startTime")); 
//		Date endTime = sdf.parse((String)paramMap.get("endTime")); 
//		
//		paramMap.remove("startTime");
//		paramMap.remove("endTime");
//		
//		paramMap.put("startTime", startTime);
//		paramMap.put("endTime", endTime);
		
		Map domainMap = shipService.getDomainDescription(paramMap);
		//도메인정보 조회
		mv.addObject("domainMap",domainMap);
		mv.addObject("paramMap",paramMap);
		
		
		

		
		
		
		
		
		mv.setViewName("popup/dashPop");
		return mv;
		
	}
	
	@SuppressWarnings("deprecation")
	@RequestMapping("/psc/ajaxGraphPop.do")
	public ModelAndView ajaxGraphPop(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, false);
		ModelAndView mv = new ModelAndView("jsonView");
		
		
		
		Map<String, Object> fnmRuleExistsMap = new HashMap<>();
		Map<String, Object> dataMap = new HashMap<>();
		
	
		fnmRuleExistsMap.put("imo_num", Integer.parseInt((String) paramMap.get("imo_num")));
		fnmRuleExistsMap.put("fnm_rule", paramMap.get("shipNm"));
		dataMap.put("fnm_rule_num", shipService.getFnmRuleNum(fnmRuleExistsMap));
		dataMap.put("category", paramMap.get("category"));
		dataMap.put("startTime", new Date((String) paramMap.get("startTime")));
		dataMap.put("endTime", new Date((String) paramMap.get("endTime")));
//		Date startTime = sdf.parse((String)paramMap.get("startTime"));
//		Date endTime = sdf.parse((String)paramMap.get("endTime"));
//		System.out.println(startTime +" "+ endTime);
//		System.out.println(startTime + "       " + endTime);
//		dataMap.put("startTime",startTime);
//		dataMap.put("endTime", endTime);
		//표준화 된 컬럼명
		//표준화 된 칼럼명 저장된 테이블 bwms_msr_elem
		List<String> bwmsMsrElem = new ArrayList();

		bwmsMsrElem.remove("log_date");
		bwmsMsrElem.add(0, "log_date");
		bwmsMsrElem.add(1, (String)paramMap.get("colNm"));
		// 칼럼명 clumnnamearr에 다 넣음
		dataMap.put("columnnamearr", bwmsMsrElem);
		
		System.out.println("dataMap #@! @@ = "+ dataMap.get("coulmnnamearr"));
		ArrayList dataList = new ArrayList();
		ArrayList logList = new ArrayList();
		//gpsList
		
		List allDataList = shipService.getData(dataMap);
		for (Object map : allDataList) {
			logList.add(((Map) map).get("log_date"));
			//유효 데이터 selected 된 값 (ex: tro_b1)
			dataList.add(((Map) map).get(paramMap.get("colNm")));
			
		}
//		System.out.println(dataList);
//		System.out.println(logList);
		mv.addObject("dataList", dataList);
		mv.addObject("logList", logList);
		mv.addObject("allDataList", allDataList);
		mv.addObject("domain", bwmsMsrElem);
		mv.addObject("startTime", paramMap.get("startTime"));
		mv.addObject("endTime", paramMap.get("endTime"));
		
		
		return mv;
	}

	
	
	
	
	public static void writeDataToCsv(String filePath) throws IOException {
        CSVWriter writer = new CSVWriter(new FileWriter(filePath));
        String[] entries = "EW#City#State".split("#");  // 1
        writer.writeNext(entries);  // 2

        String[] entries1 = {"W", "Youngstown", "OH"};  // 3
        writer.writeNext(entries1);

        String[] entries2 = {"W", "Williamson", "WV"};
        writer.writeNext(entries2);

        writer.close();
    }

  
}
