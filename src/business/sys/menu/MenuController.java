package business.sys.menu;

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
import business.sys.menu.domain.MenuDomain;
import common.base.BaseController;
import common.util.CommUtils;

/**
 * Program Name    : MenuController
 * Description     : 메누관리 Controller
 * Programmer Name : NJS
 * Creation Date   : 2019-10-22
 * Used Table(주요) : 
 *
 * @author NJS
 *
 */

@Controller
@SuppressWarnings("all")
public class MenuController extends BaseController {

    @Autowired
    private MenuService  menuService;

    /**
     * 메뉴 조회
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
//    @RequestMapping("/board/listMenu.do")
//    public String listMenu(HttpServletRequest request, ModelMap model)
//    throws Exception {
//    	String method 			= getMethodName(new Throwable());
//    	MenuDomain menuDomain	= new MenuDomain();
//
//    	Map paramMap = getParameterMap(request, true);
//
//    	SetMappingValues(paramMap, method);
//
//    	BeanUtils.copyProperties(menuDomain, paramMap);
//    	//-------------------- Default Setting End -----------------------//
//
//    	List resultList = menuService.listMenu(paramMap);
//
//    	// Return Values
//    	model.addAttribute("model", 	menuDomain);
//    	model.addAttribute("list", 		resultList);
//
//    	return "admin/listMenu";
//    }

    /**
     * 메뉴 등록 수정페이지
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/openRegiMenu.do")
    public String openRegiMenu(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	MenuDomain menuDomain	= new MenuDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(menuDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

		// 메뉴
		List menuList = menuService.listComboMenu(paramMap);
		model.addAttribute("menuList", FormTagManager.listToMapCombo(menuList, "comboValue", "comboText", "N"));

    	// 상세조회
		Map menuMap = menuService.viewMenu(paramMap);
    	if (menuMap != null) {
    		BeanUtils.copyProperties(menuDomain, menuMap);
    	}

    	model.addAttribute("model", 	menuDomain);

    	return "admin/regiMenu";
    }

    /**
     * 메뉴 저장
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/saveMenu.do")
    public ModelAndView saveMenu(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	MenuDomain menuDomain	= new MenuDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(menuDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = menuService.saveMenu(paramMap);

    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("menuId", 		paramMap.get("menuId"));
    	return new ModelAndView("redirect:/board/openRegiMenu.do", returnMap);
    }

    /**
     * 메뉴 삭제
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/deltMenu.do")
    public ModelAndView deltMenu(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	MenuDomain menuDomain	= new MenuDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(menuDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = menuService.deltMenu(paramMap);

    	//처리결과 Return
    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("menuId", 		paramMap.get("menuId"));
    	return new ModelAndView("redirect:/board/openRegiMenu.do", returnMap);
    }


	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    Default Values Setting     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map paramMap, String method) {
		if (method.equalsIgnoreCase("openRegiMenu")) {
			paramMap.put("menuId",		CommUtils.nvlTrim((String)paramMap.get("menuId")));
			paramMap.put("orgMenuId", 	CommUtils.nvlTrim((String)paramMap.get("menuId")));
			paramMap.put("popupYn", 	CommUtils.nvlTrim((String)paramMap.get("popupYn"),	"N"));
			paramMap.put("useYn", 		CommUtils.nvlTrim((String)paramMap.get("useYn"),	"Y"));
		}
		if (method.equalsIgnoreCase("deltMenu")) {
			paramMap.put("menuId",  	CommUtils.nvlTrim((String)paramMap.get("orgMenuId")));
		}
	}
}