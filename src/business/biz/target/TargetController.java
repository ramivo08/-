/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.target;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.Utils;
import business.biz.target.domain.TargetDomain;
import common.base.BaseController;
import common.file.FileManager;
import common.util.CommUtils;
import common.util.paging.PaginatedArrayList;

@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class TargetController extends BaseController {

	@Autowired
	private Utils utils;

	@Autowired
	private TargetService targetService;

	@Autowired
	private ExcelService excelService;
	@Autowired
	private CSVService csvService;
	@Autowired
	private FileService fileService;
	@Resource(name = "fileManager")
	FileManager fileManager;
	
	
	@RequestMapping("/target/searchTargetVehicle.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView searchTargetVehicle(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		
		TargetDomain targetDomain = new TargetDomain();
		BeanUtils.copyProperties(targetDomain, paramMap);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		
		int CURR_PAGE = 1;

		int PAGE_BBS_SIZE = 10;

		CURR_PAGE = CommUtils.strToInt((String) paramMap.get("page"), 1);
		PaginatedArrayList list = targetService.searchTargetList(paramMap, CURR_PAGE, PAGE_BBS_SIZE);
		
		List<Map> processList = targetService.searchProcessList(paramMap);
		mv.addObject("model",targetDomain);
		mv.addObject("processList",processList);
		mv.addObject("list",list);
		mv.addObject("pageList", list);
		mv.addObject("totalSize", list.getTotalSize());
		mv.addObject("currSize", list.getCurrPage());
		mv.addObject("pageSize", list.getPageSize());
		
		mv.setViewName("target/searchTargetVehicle");
		return mv ;
	}
	
	@RequestMapping("/target/selectTargetVehicle.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView selectTargetVehicle(HttpServletRequest request, ModelMap model) throws Exception {
		
		
		Map paramMap = getParameterMap(request, false);

		TargetDomain targetDomain = new TargetDomain();
		BeanUtils.copyProperties(targetDomain, paramMap);
		ModelAndView mv = new ModelAndView("jsonView");
		
		
		Map targetMap = targetService.selectTargetMap(paramMap);
		
		mv.addObject("model",targetDomain);
		mv.addObject("targetMap", targetMap);
		mv.setViewName("target/selectTargetVehicle");
		return mv ;
	}
	
	
	
	@RequestMapping("/target/searchTargetConfirm.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView searchTargetConfirm(HttpServletRequest request, ModelMap model) throws Exception {
		
		
		Map paramMap = getParameterMap(request, false);

		TargetDomain targetDomain = new TargetDomain();
		BeanUtils.copyProperties(targetDomain, paramMap);
		ModelAndView mv = new ModelAndView("jsonView");
		
		
		
		mv.addObject("model",targetDomain);
		mv.setViewName("target/searchTargetConfirm");
		return mv ;
	}
	
	@RequestMapping("/target/viewResult.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView viewResult(HttpServletRequest request, ModelMap model) throws Exception {
		
		
		Map paramMap = getParameterMap(request, false);
		
		TargetDomain targetDomain = new TargetDomain();
		BeanUtils.copyProperties(targetDomain, paramMap);
		ModelAndView mv = new ModelAndView("jsonView");
		
		
		
		mv.addObject("model",targetDomain);
		mv.setViewName("target/viewResult");
		return mv ;
	}
		
		


		
}
	