package business.sys.program;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.FormTagManager;
import business.sys.menu.MenuService;
import business.sys.program.domain.ProgDomain;
import common.base.BaseController;
import common.util.CommUtils;

/**
 * @클래스명		: Program
 * @최초작성자	: 2017.02.23 ntarget
 * @변경자 		: 2017.02.23 ntarget
 * @설명 		: 관리자 - 프로그램 관리
 */

@Controller
@SuppressWarnings("all")
public class ProgController extends BaseController {

    @Autowired
    private ProgService  progService;

    @Autowired
    private MenuService  menuService;

    /**
     * 프로그램 조회
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/listProg.do")
    public String listProg(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	ProgDomain progDomain	= new ProgDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(progDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	// 권한
    	List resultList = progService.listProg(paramMap);

    	// Return Values
    	model.addAttribute("model", 	progDomain);
    	model.addAttribute("list", 		resultList);

    	return "admin/listProg";
    }

    /**
     * 프로그램 등록 수정페이지
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/openRegiProg.do")
    public String openRegiProg(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	ProgDomain progDomain	= new ProgDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(progDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

		// 메뉴
		List menuList = menuService.listComboMenu(paramMap);
		model.addAttribute("menuList", FormTagManager.listToMapCombo(menuList, "comboValue", "comboText", "N"));

    	// 상세조회
		Map progMap = progService.viewProg(paramMap);
    	if (progMap != null) {
    		BeanUtils.copyProperties(progDomain, progMap);
    	}

    	model.addAttribute("model", 	progDomain);

    	return "admin/regiProg";
    }

    /**
     * 프로그램 저장
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/saveProg.do")
    public ModelAndView saveProg(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	ProgDomain progDomain	= new ProgDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(progDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = progService.saveProg(paramMap);

    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("progId", 		paramMap.get("progId"));
    	return new ModelAndView("redirect:/board/openRegiProg.do", returnMap);
    }

    /**
     * 프로그램 삭제
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/deltProg.do")
    public ModelAndView deltProg(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	ProgDomain progDomain	= new ProgDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(progDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = progService.deltProg(paramMap);

    	//처리결과 Return
    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("progId", 		paramMap.get("progId"));
    	return new ModelAndView("redirect:/board/openRegiProg.do", returnMap);
    }


	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    Default Values Setting     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map paramMap, String method) {
		if (method.equalsIgnoreCase("openRegiProg")) {
			paramMap.put("progId",		CommUtils.nvlTrim((String)paramMap.get("progId")));
			paramMap.put("orgProgId", 	CommUtils.nvlTrim((String)paramMap.get("progId")));
			paramMap.put("menuId",		CommUtils.nvlTrim((String)paramMap.get("menuId")));
		}
		if (method.equalsIgnoreCase("deltProg")) {
			paramMap.put("progId",  	CommUtils.nvlTrim((String)paramMap.get("orgProgId")));
		}
	}
}