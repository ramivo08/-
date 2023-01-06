package business.biz.virtual;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.board.BoardService;
import business.biz.comm.CommService;
import business.biz.main.domain.MainDomain;
import business.biz.ship.ShipService;
import common.base.BaseController;
import common.file.FileManager;

/**
 *  Main Controller Class
 * @author NJS
 * @since 2017.07.
 * @version 2.0
 * @see
 *
 * <pre>
 * << Modification Information >>
 *    Date	         Name          	       Desc
 * ----------      --------    ---------------------------
 *  2017.07.      NJS	       Init.
 *
 * </pre>
 */


@Controller
@SuppressWarnings({ "rawtypes", "unused"})
public class VirtualController extends BaseController {

    @Autowired
    private CommService  commService;
    @Autowired
    private VirtualService  virtualService;
    @Autowired
    private ShipService shipService;
    @Autowired
    private	BoardService boardService;
    @Autowired
    private ExcelService  excelService;
    @Autowired
    private CSVService  csvService;
    @Autowired
    private FileService fileService;
    @Resource(name="fileManager")
    FileManager fileManager;
    
    


    /**
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@SuppressWarnings("unchecked")
	@RequestMapping("/virtual/virtualDrive.do")
    public ModelAndView main(HttpServletRequest request, ModelMap model)
    throws Exception {

		//---------------------------------------------
		//Default Setting Start
		String method = getMethodName(new Throwable());
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		System.out.println(paramMap.toString());
		//Return Values
				HttpSession session = request.getSession();
		
		// mapping domain
		MainDomain mainDomain	= new MainDomain();
		BeanUtils.copyProperties(mainDomain, paramMap);
		// -------------------- Default Setting End -----------------------//
		
		ModelAndView mv = new ModelAndView("jsonView");	
		// Request Parameter Values Setting
	
		if (paramMap == null) {
			mv.setViewName("redirect:/login.do");			
			return  mv;
		}else {
			
			List<Map> ship = shipService.selectShipInfo(paramMap);
			
			if(ship.size() != 0) {
				mv.addObject("imoNo",ship.get(0).get("imoNo"));
				mv.addObject("shipNm",ship.get(0).get("shipNm"));
				mv.addObject("bwmsType",ship.get(0).get("bwmsType"));
				String bwmsType = (String) ship.get(0).get("bwmsType");
				Map optionResult = virtualService.selectVirtualOption(bwmsType);
				
				mv.addObject("optionResult", optionResult);
				System.out.printf("optionResult#@!#@!",optionResult);
				
			}
			List<Map> harborList = virtualService.selectHarborList();
			
//			seq로 찾기
//			Map<String,Object> ship = shipService.selectSeq(paramMap);
//			
//			model.addAttribute("ship",ship);
//			System.out.println("insertShipData.do"+paramMap);
			
			
			mv.addObject("harborList",harborList);			 
			mv.addObject("countShip",ship.size());
			mv.addObject("shipList",ship);
			mv.setViewName("virtual/searchVirtualDrive");
			return mv;
		}
		
		
		
		
		
    }
	
	
	 /**
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/virtual/selectVirtualShipInfo.do")
    public ModelAndView selectVirtualShipInfo(HttpServletRequest request, ModelMap model)
    throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		Map paramMap = getParameterMap(request, true);
		System.out.println(paramMap.toString());
		
		Map virtualResult = virtualService.selectVirtualShipInfo(paramMap);
//		List<Map> virtualResult = virtualService.selectOceanMedian(paramMap);
		
		
		
		
		
		mv.addObject("paramMap",paramMap);
		mv.addObject("virtualResult",virtualResult);
		
		return mv;
	
	}
	
	@RequestMapping("/virtual/selectOceanMedian.do")
    public ModelAndView selectOceanMedian(HttpServletRequest request, ModelMap model)
    throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		Map paramMap = getParameterMap(request, true);
	
		
        String stName = (String) paramMap.get("endPoint");
        paramMap.put("stName", stName);
    	System.out.println(paramMap.toString());
//		Map virtualResult = virtualService.selectVirtualShipInfo(paramMap);
		List<Map> medianResult = virtualService.selectOceanMedian(paramMap);
		
		List<Map> oceanYear = virtualService.selectOceanYear(paramMap);
		
		if(oceanYear.size() != 0) {
			String firstYear = (String) oceanYear.get(0).get("year");
			String lastYear = (String) oceanYear.get(oceanYear.size() -1).get("year");
			mv.addObject("firstYear",firstYear);
			mv.addObject("lastYear",lastYear);
			
		}
		
		
		
		
		mv.addObject("paramMap",paramMap);
		mv.addObject("medianResult",medianResult);
		
		return mv;
	
	}
	
	
	
	@RequestMapping("/virtual/selectOptionParam.do")
	public ModelAndView selectOptionParam(HttpServletRequest request, ModelMap model)
		    throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		Map paramMap = getParameterMap(request, true);
		
		String bwmsType = (String) paramMap.get("bwmsType");
		
		Map optionResult = virtualService.selectVirtualOption(bwmsType);
		
		
		mv.addObject("optionResult",optionResult);
		
		
	
		return mv;
	}
	
  
  
	
	

}

