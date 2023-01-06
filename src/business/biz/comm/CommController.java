/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.comm;

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

import business.biz.CommConst;
import business.biz.comm.domain.ComboDomain;
import business.biz.comm.domain.CommDomain;

import commf.message.Message;
import common.base.BaseController;
import common.util.CommUtils;

@Controller
@SuppressWarnings( {"rawtypes", "unused", "unchecked" })
public class CommController extends BaseController {

	@Autowired
	private CommService commService;

    /**
     * 공통코드 목록을 AJAX로 반환한다.
     *
     * @param request HTTP 요청
     * @param model 모델맵
     * @return 모델뷰
     * @throws Exception 발생오류
     */
    @RequestMapping("/comm/findCodeAjax.do")
    @SuppressWarnings({ "rawtypes" })
    public ModelAndView findCodeAjax(HttpServletRequest request, ModelMap model) throws Exception {

		// Request Parameter Values Setting
		Map paramMap  = getParameterMap(request, true);

		List list = commService.listComboCode(paramMap);

		ModelAndView mav = new ModelAndView();
		mav.addObject("AJAX_MODEL", list);
		mav.setViewName(ajaxView);

		return mav;
	}


	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Default Values Setting
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//
	private void SetMappingValues(Map reqMap, String method) {
		if (method.equalsIgnoreCase("findCodeAjax")) {
		}
	}
}
