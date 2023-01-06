/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.subsidy;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.Utils;
import common.base.BaseController;
import common.file.FileManager;
import common.util.CommUtils;

@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class SubsidyController extends BaseController {

	@Autowired
	private Utils utils;

	@Autowired
	private SubsidyService subsidyService;

	@Autowired
	private ExcelService excelService;
	@Autowired
	private CSVService csvService;
	@Autowired
	private FileService fileService;
	@Resource(name = "fileManager")
	FileManager fileManager;
	
	
	@RequestMapping("/subsidy/searchBasicSbsd.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView getShipData(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
	
		mv.setViewName("subsidy/searchBasicSbsd");
		return mv ;
	}
		
	@RequestMapping("/subsidy/insertBasicExcel.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView insertBasicExcel(HttpServletRequest request, ModelMap model, HttpServletResponse response) throws Exception {
		Map paramMap = getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
	
		List fileList = fileManager.multiFileUpload(request);
		System.out.println(((MultipartHttpServletRequest)request).getFileMap());
		System.out.println(paramMap);
		System.out.println(fileList);
		if(fileList.size() != 0) {
			Map paramFileMap = fileManager.makeFileMap(request, response);
			paramFileMap.put("gsUserId", (String)paramMap.get("gsUserId"));
			paramFileMap.put("docTy", "basic");
			paramFileMap.put("atchmnflTy", "excel");
			fileService.fileManagementForExcel(paramFileMap, fileList);
		}else {
			mv.addObject("result",2);
		}
		
		mv.addObject("result",1);
		
		return mv;
	}
		
}
	