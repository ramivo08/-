package business.biz.comm;

import java.io.PrintWriter;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.ship.ShipService;
import business.sys.log.AccessControlService;
import business.sys.menu.MenuService;
import business.sys.user.UserInfoService;
import common.base.BaseController;
import common.user.UserInfo;

/**
 * Program Name : UserInfoController Description : User profile 수정 등
 *
 * Programmer Name : ntarget Creation Date : 2017-01-12 Used Table :
 */

@Controller
@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
public class UserInfoController extends BaseController {
	@Autowired
	private UserInfoService userInfoService;
	@Autowired
	private MenuService menuService;
	@Autowired
	private AccessControlService accessControlService;
	@Autowired
	private ShipService shipService;

	@RequestMapping("/getUserInfo.do")
	public ModelAndView getUserInfo(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = getParameterMap(request, true);
		if(paramMap == null) return null;
		ModelAndView mv = new ModelAndView("jsonView");
		
		UserInfo user = (UserInfo) request.getSession().getValue("userInfo");
		paramMap.put("roleId", user.getRoleId());
		
		List accessableMenuList = menuService.getRoleAccessableMenu(paramMap);
		
		mv.addObject("userId", user.getUserId());
		mv.addObject("userName", user.getUserNm());
		mv.addObject("userRoleId", user.getRoleId());
		mv.addObject("menuList", dataSorted(accessableMenuList));
		return mv;
	}

	private JSONArray dataSorted(List menuList) {
		JSONArray rootMenus = new JSONArray();
		HashMap<String, JSONObject> menuMap = new HashMap<String, JSONObject>();
		
		for(Object menu : menuList) {
			HashMap m = (HashMap)menu;
			String id = (String)((HashMap)menu).get("id");
			String name = (String)((HashMap)menu).get("name");
			String url = (String)((HashMap)menu).get("url");
			String belongTo = (String)((HashMap)menu).get("belongTo");
			Integer level = (Integer)((HashMap)menu).get("level");
			
			JSONObject obj = new JSONObject();
			if(level == 1) {
				rootMenus.add(obj);
			}
			menuMap.put(id, obj);
			
			obj.put("id", id);
			obj.put("name", name);
			obj.put("url", url);
			obj.put("belongTo", belongTo);
			
			if(menuMap.containsKey(belongTo)) {
				if(!((JSONObject)menuMap.get(belongTo)).containsKey("children")) {
					((JSONObject)menuMap.get(belongTo)).put("children", new JSONArray());
				}
				((JSONArray)((JSONObject)menuMap.get(belongTo)).get("children")).add(obj);
			}
		}
		
		System.out.println(rootMenus);
		System.out.println(menuMap);
		
		return rootMenus;
	}
	
	@RequestMapping("/profile.do")
	public ModelAndView profile(HttpServletRequest request, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		ModelAndView mv = new ModelAndView("jsonView");
		if(session.getValue("userInfo") != null) {
			Map paramMap = getParameterMap(request, true);
			System.out.println("paramMap#@!"+paramMap.toString());
			paramMap.put("userId", paramMap.get("gsUserId"));
			UserInfo user = userInfoService.getUserInfo(paramMap);
			if(paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) {
				
			}
			List<Map> mnftList = shipService.selectMnftList();
			List<Map> shipList = shipService.selectAllShipInfo(paramMap);
			System.out.println(user);
			mv.addObject("shipList", shipList);
			mv.addObject("mnftList",mnftList);
			mv.addObject("userInfo", user);
			mv.addObject("paramMap", paramMap);
			model.addAttribute("userInfo", user);
			mv.setViewName("profile");
			return mv;
		} else {
			
			mv.setViewName("redirect:/login.do");
			return mv;
		}
	}
	
	
	@RequestMapping("/ajaxSelectShipInfo.do")
	public ModelAndView ajaxSelectShipInfo(HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");	
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		
		paramMap.put("imoNum", Integer.parseInt((String) paramMap.get("imoNo")));
		
		Map  shipInfo = shipService.selectShipInfoProfile(paramMap);
		
		mv.addObject("shipInfo", shipInfo);
		return mv;
	}
	
	
	@RequestMapping("/passwordCheck.do")
	public ModelAndView passwordCheck(HttpServletRequest request, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		return mv;
	}
	
	@RequestMapping("/profileUpdate.do")
	public String profileUpdate(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		response.setContentType("text/html; charset=UTF-8");
	    PrintWriter out = response.getWriter();
		if(session.getValue("userInfo") != null) {
			Map paramMap = getParameterMap(request, true);
			paramMap.put("inputPwd", this.pwdEncrypt((String)paramMap.get("inputPwd")));
			
			
			if(paramMap.get("isPwdChange").equals("false")) {
				paramMap.remove("inputChangePwd");
			} else if(paramMap.get("isPwdChange").equals("true")) {
				paramMap.put("inputChangePwd", this.pwdEncrypt((String) paramMap.get("inputChangePwd")));
			}
			
			
			System.out.println(paramMap);
			if(userInfoService.checkUserInfo(paramMap)) {
				if(userInfoService.changeUserInfo(paramMap)) {
					out.println("<script>alert('정보 수정이 완료되었습니다.'); location.href='/main.do';</script>");
					out.flush();
					return null;
				} else {
					out.println("<script>alert('정보 수정이 실패하었습니다.'); location.href='/profile.do';</script>");
					out.flush();
					return null;
				}
			} else {
				out.println("<script>alert('정보 수정이 실패하었습니다.'); location.href='/profile.do';</script>");
				out.flush();
				return null;
			}
		} else {
			return "redirect:/main.do";
		}
	}
	@RequestMapping("/deleteShipInfo.do")
	public String deleteShipInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		response.setContentType("text/html; charset=UTF-8");
	    PrintWriter out = response.getWriter();
		int result  = 0 ;
		ModelAndView mv = new ModelAndView(); 
	    
		if(session.getValue("userInfo") != null) {
			Map paramMap = getParameterMap(request, true);
			shipService.deleteShipInfo(paramMap);
			
			return null;
		}else {
			return "redirect:/login.do";
		}
		
		
	}
	@RequestMapping("/updateShipInfo.do")
	public String updateShipInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		response.setContentType("text/html; charset=UTF-8");
	    PrintWriter out = response.getWriter();
		int result  = 0 ;
		ModelAndView mv = new ModelAndView(); 
	    
		if(session.getValue("userInfo") != null) {
			Map paramMap = getParameterMap(request, true);
			if(paramMap.get("shipNo").toString().length() <=0) {
				paramMap.remove("shipNo");
			}
			if(paramMap.get("shipNlty") .toString().length() <=0) {
				paramMap.remove("shipNlty");
			}
		
			if(paramMap.get("shipKnd").toString().length() <=0) {
				paramMap.remove("shipKnd");
			}
				System.out.println(paramMap.toString());
			
			
			if (paramMap.containsKey("shipNo")) {
				try {
				paramMap.put("shipNo", Integer.parseInt((String) paramMap.get("shipNo")));
				}catch(NumberFormatException e) {
					paramMap.put("shipNo", 0);
				}
			}
		
			if (paramMap.containsKey("imoNo")) {
				try {
					paramMap.put("imoNo", Integer.parseInt((String) paramMap.get("imoNo")));
				} catch (NumberFormatException e) {
//					e.printStackTrace();
					paramMap.put("imoNo", null);
				}
			}
	
			
			
			paramMap.put("registerId", paramMap.get("gsUserId"));
			
			
		 result = shipService.updateShipInfo(paramMap);
			
		 System.out.println("result  : " + result);
		 
		 
			return null;
		}else {
			return "redirect:/login.do";
		
		}
		
	
	}
	private String pwdEncrypt(String pwd) {
		StringBuffer hexString = new StringBuffer();

		try {

			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(pwd.getBytes("UTF-8"));

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);

				if (hex.length() == 1) {
					hexString.append('0');
				}

				hexString.append(hex);
			}

		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}

		return hexString.toString();
	}

}
