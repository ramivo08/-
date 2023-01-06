package business.biz.map;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import business.biz.comm.CommService;
import business.biz.main.domain.MainDomain;
import common.base.BaseController;

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

@EnableWebMvc
@Controller
@SuppressWarnings({ "rawtypes", "unused"})
public class MapController extends BaseController {

    @Autowired
    private CommService  commService;

    @Autowired
    private MapService  mapService;




    /**
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("map/map.do")
    public String main(HttpServletRequest request, ModelMap model)
    throws Exception {

		//---------------------------------------------
		//Default Setting Start
		String method = getMethodName(new Throwable());
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		// mapping domain
		MainDomain mainDomain	= new MainDomain();
		BeanUtils.copyProperties(mainDomain, paramMap);
		// -------------------- Default Setting End -----------------------//

		//Return Values
		model.addAttribute("model", mainDomain);
		model.addAttribute("map",   paramMap);

		return "map/map";
//		return "main/main";
    }
	
	
	@RequestMapping("/geoGps.do")
	public ModelAndView geoGps(HttpServletRequest request, ModelMap model) throws Exception{
		
		String EC = "EC";
		String O3 = "O3";
		String UV = "UV";
		
		
		ModelAndView mv= new ModelAndView("jsonview");
		
		//Default
		Map paramMap = getParameterMap(request, true);
		
		
		String bwmsType = (String)paramMap.get("bwmsType");
		
		String fnmRuleNum = (String)paramMap.get("fnmRuleNum");
		if(bwmsType.equals(EC)) {
			List<Map> list = mapService.searchEcGps(fnmRuleNum);
		}else if(bwmsType.equals(O3)) {
			//O3로 수정 필요
			List<Map> list = mapService.searchEcGps(fnmRuleNum);
		}else if(bwmsType.equals(UV)) {
			//UV로 수정 필요
			List<Map> list = mapService.searchEcGps(fnmRuleNum);
		}else {
			
		}
		
		
		
		
		
		
		
		
		return mv;
	}

	
	

}

