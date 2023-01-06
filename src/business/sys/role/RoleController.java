package business.sys.role;

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
import business.sys.role.domain.RoleDomain;
import common.base.BaseController;
import common.util.CommUtils;

/**
 * Program Name    : RoleController
 * Description     : Role 관리 Controller
 * Programmer Name : NJS
 * Creation Date   : 2019-10-22
 * Used Table(주요) : 
 *
 * @author NJS
 *
 */

@Controller
@SuppressWarnings("all")
public class RoleController extends BaseController {

    @Autowired
    private RoleService  roleService;

//    /**
//     * 권한 롤 조회
//     * @param request
//     * @param response
//     * @return
//     * @throws Exception
//     */
//    @RequestMapping("/board/searchRoleMgmt.do")
//    public String listRole(HttpServletRequest request, ModelMap model)
//    throws Exception {
//    	String method 			= getMethodName(new Throwable());
//    	RoleDomain roleDomain	= new RoleDomain();
//
//    	Map paramMap = getParameterMap(request, true);
//
//    	SetMappingValues(paramMap, method);
//
//    	BeanUtils.copyProperties(roleDomain, paramMap);
//    	//-------------------- Default Setting End -----------------------//
//
//    	// 권한
//    	List searchRoleMgmt = roleService.searchRoleMgmt(paramMap);
//
//    	// Return Values
//    	model.addAttribute("model", 	roleDomain);
//    	model.addAttribute("list", 		searchRoleMgmt);
//
//    	return "admin/searchRoleMgmt";
//    }

    /**
     * 권한 롤 등록 수정페이지
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/openRegiRole.do")
    public String openRegiRole(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	RoleDomain roleDomain	= new RoleDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(roleDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

		// 롤
		List roleList = roleService.listComboRole(paramMap);
		model.addAttribute("roleList", FormTagManager.listToMapCombo(roleList, "comboValue", "comboText", "N"));

    	// 상세조회
		Map roleMap = roleService.viewRole(paramMap);
    	if (roleMap != null) {
    		BeanUtils.copyProperties(roleDomain, roleMap);
    	}

    	model.addAttribute("model", 	roleDomain);

    	return "admin/regiRole";
    }

    /**
     * 권한 롤 저장
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/saveRole.do")
    public ModelAndView saveRole(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	RoleDomain roleDomain	= new RoleDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(roleDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = roleService.saveRole(paramMap);

    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("roleId",		paramMap.get("roleId"));
    	return new ModelAndView("redirect:/board/openRegiRole.do", returnMap);
    }

    /**
     * 권한 롤 삭제
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/board/deltRole.do")
    public ModelAndView deltRole(HttpServletRequest request, ModelMap model)
    throws Exception {
    	String method 			= getMethodName(new Throwable());
    	RoleDomain roleDomain	= new RoleDomain();

    	Map paramMap = getParameterMap(request, true);

    	SetMappingValues(paramMap, method);

    	BeanUtils.copyProperties(roleDomain, paramMap);
    	//-------------------- Default Setting End -----------------------//

    	int cnt = roleService.deltRole(paramMap);

    	//처리결과 Return
    	if (cnt > 0) {
    		resultFlag(message.getMessage("prompt.success"));
    	} else {
    		resultFlag("0");
    	}

    	Map returnMap = new HashMap();
    	returnMap.put("roleId", 		paramMap.get("roleId"));
    	return new ModelAndView("redirect:/board/openRegiRole.do", returnMap);
    }


	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    Default Values Setting     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map paramMap, String method) {
		if (method.equalsIgnoreCase("openRegiRole")) {
			paramMap.put("roleId",		CommUtils.nvlTrim((String)paramMap.get("roleId")));
			paramMap.put("orgRoleId", 	CommUtils.nvlTrim((String)paramMap.get("roleId")));
		}
		if (method.equalsIgnoreCase("deltRole")) {
			paramMap.put("roleId",  	CommUtils.nvlTrim((String)paramMap.get("orgRoleId")));
		}
	}
}