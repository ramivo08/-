package business.sys.log;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import business.sys.log.domain.LogDomain;
import common.base.BaseController;
import common.util.CommUtils;
import common.util.paging.PaginatedArrayList;

/**
 *  Log Controller Class
 * @author ntarget
 * @since 2017.02.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << Modification Information >>
 *    Date	         Name          	       Desc
 * ----------      --------    	---------------------------
 *  2017.02.23      ntarget      Init.
 *
 * </pre>
 */

@Controller
@SuppressWarnings("all")
public class LogController extends BaseController {

	@Autowired
    private LogService  logService;

	/**
     * 화면접속 로그 리스트 조회
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/board/listAcchist.do")
    public String listAcchist(HttpServletRequest request, ModelMap model)
    		throws Exception {
    	String method = getMethodName(new Throwable());
		LogDomain logDomain	= new LogDomain();

		Map paramMap = getParameterMap(request, true);

		SetMappingValues(paramMap, method);

		BeanUtils.copyProperties(logDomain, paramMap);
		// -------------------- Default Setting End -----------------------//

		CURR_PAGE = CommUtils.strToInt((String)paramMap.get("page"), 1);
    	PaginatedArrayList list	= logService.listAcchist(paramMap, CURR_PAGE, 20);

		//Return Values
		model.addAttribute("model", 		logDomain);
		model.addAttribute("map",   		paramMap);
		model.addAttribute("pageList", 		list);
		model.addAttribute("startNo",  		list.getStartNo());

		return "admin/listAcchist";
    }

	/**
	 * 사용자별 로그인 로그 조회
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/board/listLoghist.do")
	public String listLoghist(HttpServletRequest request, ModelMap model)
			throws Exception {
		String method = getMethodName(new Throwable());
		LogDomain logDomain	= new LogDomain();

		Map paramMap = getParameterMap(request, true);

		SetMappingValues(paramMap, method);

		BeanUtils.copyProperties(logDomain, paramMap);
		// -------------------- Default Setting End -----------------------//

		CURR_PAGE = CommUtils.strToInt((String)paramMap.get("page"), 1);
		PaginatedArrayList list	= logService.listLoghist(paramMap, CURR_PAGE, 20);

		//Return Values
		model.addAttribute("model", 		logDomain);
		model.addAttribute("map",   		paramMap);
		model.addAttribute("pageList", 		list);
		model.addAttribute("startNo",  		list.getStartNo());

		return "admin/listLoghist";
	}


	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    Default Values Setting     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map paramMap, String method) {
		paramMap.put("page",		CommUtils.nvlTrim((String)paramMap.get("page"), "1"));

		if (method.equalsIgnoreCase("listAcchist") ) {
			paramMap.put("srchFromDate",		CommUtils.nvlTrim((String)paramMap.get("srchFromDate"),  	CommUtils.getCurrYear()+"-01-01"));
			paramMap.put("srchToDate", 			CommUtils.nvlTrim((String)paramMap.get("srchToDate"),  		CommUtils.getToday("-")));
		}

		if (method.equalsIgnoreCase("listLoghist") ) {
			paramMap.put("srchFromDate",		CommUtils.nvlTrim((String)paramMap.get("srchFromDate"),  	CommUtils.getCurrYear()+"-01-01"));
			paramMap.put("srchToDate", 			CommUtils.nvlTrim((String)paramMap.get("srchToDate"),  		CommUtils.getToday("-")));
		}
	}
}

