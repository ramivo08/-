package business.biz.domain;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.Utils;
import business.biz.ship.ShipService;
import business.biz.ship.domain.FnmRuleSheetsVO;
import business.biz.ship.domain.ShipDomain;
import common.base.BaseController;
import common.file.FileManager;


@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class ShipDomainController extends BaseController {

	@Autowired
	private Utils utils;
	
	@Autowired
	private ShipDomainService shipDomainService;

	@Autowired
	private ExcelService excelService;
	@Autowired
	private CSVService csvService;
	@Autowired
	private FileService fileService;
	@Resource(name = "fileManager")
	FileManager fileManager;

	@RequestMapping("/domain/ecDomain.do")
	@SuppressWarnings({ "rawtypes" })
	public String ecDomain(HttpServletRequest request, ModelMap model) throws Exception {
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		paramMap.put("domainCategory", "EC");
		paramMap.put("logType", "data");
		
	
		
		model.addAttribute("domains", shipDomainService.getDomainList(paramMap));
		model.addAttribute("category", paramMap.get("domainCategory"));
		
		
		
		paramMap.put("logType", "event");
		
		
		model.addAttribute("eventDomains", shipDomainService.getDomainList(paramMap));
		
		
		
		
		paramMap.put("logType", "oper");
		
		
		model.addAttribute("operDomains", shipDomainService.getDomainList(paramMap));
		
		
		
		return "domain/ecDomain";

	}
	
	
	@RequestMapping("/domain/uvDomain.do")
	@SuppressWarnings({ "rawtypes" })
	public String uvDomain(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		paramMap.put("domainCategory", "UV");
		paramMap.put("logType", "data");
		model.addAttribute("domains", shipDomainService.getDomainList(paramMap));
		model.addAttribute("category", paramMap.get("domainCategory"));
		
		paramMap.put("logType", "event");
		
		
		model.addAttribute("eventDomains", shipDomainService.getDomainList(paramMap));
		
		
		
		
		paramMap.put("logType", "oper");
		
		
		model.addAttribute("operDomains", shipDomainService.getDomainList(paramMap));
		
	
		
		return "domain/uvDomain";

	}

	@RequestMapping("/domain/o3Domain.do")
	@SuppressWarnings({ "rawtypes" })
	public String o3Domain(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		paramMap.put("domainCategory", "O3");
		paramMap.put("logType", "data");
		model.addAttribute("domains", shipDomainService.getDomainList(paramMap));
		model.addAttribute("category", paramMap.get("domainCategory"));
		
		paramMap.put("logType", "event");
		
		
		model.addAttribute("eventDomains", shipDomainService.getDomainList(paramMap));
		
		
		
		
		paramMap.put("logType", "oper");
		
		
		model.addAttribute("operDomains", shipDomainService.getDomainList(paramMap));
		return "domain/o3Domain";

	}
	
	@RequestMapping("/domain/editDomain.do")
	@SuppressWarnings({ "rawtypes" })
	public String editDomain(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		shipDomainService.updateDomain(paramMap);

		return "redirect:/domain/"+((String)paramMap.get("domainCategory")).toLowerCase()+"Domain.do";
	}
	
	@RequestMapping("/domain/removeDomain.do")
	@SuppressWarnings({ "rawtypes" })
	public String removeDomain(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		shipDomainService.removeDomain(paramMap);

		return "redirect:/domain/"+((String)paramMap.get("domainCategory")).toLowerCase()+"Domain.do";
	}
	
	@RequestMapping("/domain/addDomain.do")
	@SuppressWarnings({ "rawtypes" })
	public String addDomain(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		shipDomainService.addDomain(paramMap);
		System.out.println("#@!#@!paramMap    " + paramMap.toString());
		return "redirect:/domain/"+((String)paramMap.get("domainCategory")).toLowerCase()+"Domain.do";
	}
	

	
}
