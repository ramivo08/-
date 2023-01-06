package business.biz.comm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import business.biz.board.BoardService;
import business.biz.comm.domain.LoginLogDomain;
import business.sys.log.LogService;
import business.sys.menu.MenuService;
import business.sys.user.UserInfoService;
import common.base.BaseController;
import common.util.CommUtils;
import common.util.paging.PaginatedArrayList;

/**
 * Program Name : UserInfoController Description : User profile 수정 등
 *
 * Programmer Name : ntarget Creation Date : 2017-01-12 Used Table :
 */

@Controller
@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
public class AdminController extends BaseController {
	@Autowired
	private UserInfoService userInfoService;
	@Autowired
	private LogService logService;
	@Autowired
	private BoardService boardService;
	@Autowired
	private MenuService menuService;

	@RequestMapping("/admin/manageUser.do")
	public String manageUser(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
//		System.out.println(paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"));
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		int currPage = CommUtils.strToInt((String) paramMap.get("page"), 1);
		int pageSize= 12;
		
		PaginatedArrayList userList = userInfoService.getUserInfoList(paramMap, currPage, pageSize);
//		List userNotPageList = userInfoService.getUserInfoList();
		model.addAttribute("pageList", userList);
		model.addAttribute("userList", userList);
//		model.addAttribute("userNotPageList", userNotPageList);

		model.addAttribute("totalSize", userList.getTotalSize());
		model.addAttribute("currSize", userList.getCurrPage());
		model.addAttribute("pageSize", userList.getPageSize());
		
		if(paramMap.containsKey("searchCont") &&paramMap.containsKey("searchType")) {
			model.addAttribute("searchType", paramMap.get("searchType"));
			model.addAttribute("searchCont", paramMap.get("searchCont"));
		} else {
			model.addAttribute("searchType", "all");
			model.addAttribute("searchCont", "");
		}
		
		
		return "admin/manageUser";
	}
	
//	@RequestMapping("/admin/getUserList.do")
//	public ModelAndView getUserList(HttpServletRequest request, ModelMap model) throws Exception {
//		Map paramMap = super.getParameterMap(request, true);
//		ModelAndView mv = new ModelAndView("jsonView");
//		List userList = userInfoService.getUserInfoList();
//		System.out.println(userList);
//		mv.addObject(userList);
//		mv.addObject(paramMap.get("gsUserId"));
//		return mv;
//	}
	
	@RequestMapping("/admin/deleteUser.do")
	public ModelAndView deleteUser(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		if(paramMap.get("inputId").equals(paramMap.get("gsUserId"))) {
			return null;
		}
		mv.addObject("isSuccess", userInfoService.deleteUser(paramMap.get("inputId").toString()));
		
		return mv;
	}
	
	@RequestMapping("/admin/changeUserInfo.do")
	public String changeUserInfo(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		System.out.println(paramMap);
		if(paramMap.get("inputId").equals(paramMap.get("gsUserId"))) {
			return "redirect:/admin/manageUser.do";
		}
		if(paramMap.get("isActive").equals("On")) {
			paramMap.put("isActive", true);
		} else {
			paramMap.put("isActive", false);
		}
		System.out.println(paramMap.get("gsRoleId"));
//		System.out.println(paramMap);
//		if(paramMap.get("changeDomain").equals("ACCESS_YN")) {
//			if(paramMap.get("changeValue").equals("true")) paramMap.put("changeValue", true);
//			else paramMap.put("changeValue", false);
//		}
		userInfoService.changeUserInfo(paramMap);
		
		return "redirect:/admin/manageUser.do";
	}
	
	@RequestMapping("/admin/manageMenu.do")
	public String manageMenu(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		List roleList = userInfoService.getRoleList();
		List menuList = menuService.getMenuList();
		
		model.addAttribute("roleList", roleList);
//		model.addAttribute("menuMap", menus);
		model.addAttribute("menuList" ,dataSorted(menuList));
		
		return "admin/manageMenu";
		
//		HashMap<String, List<HashMap>> menus = new HashMap<String, List<HashMap>>();
//		JSONArray jarr = new JSONArray();
//		for(Object menu : menuList) {
//			HashMap t = ((HashMap)menu);
//			JSONObject jobj = new JSONObject() {{
//				put("id", t.get("id"));
//			}};
//			
//			for(Object obj : jarr) {
//				if(((JSONObject)obj).get("id").equals((String)t.get("belongTo"))) {
//					if(!((JSONObject) obj).containsKey("children")) {
//						((JSONObject) obj).put("children", new JSONArray());
//					}
//					((JSONArray)((JSONObject) obj).get("children")).add(obj);
//					break;
//				}
//			}
			
//			HashMap t = (HashMap)menu;
//			if(!menus.keySet().contains(Integer.toString((Integer)t.get("level")))) {
//				menus.put(Integer.toString((Integer)t.get("level")), new ArrayList<HashMap>() {{add(t);}});
//			} else {
//				menus.get(Integer.toString((Integer)t.get("level"))).add(t);
//			}
//		}
		
		
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
			
			obj.put("belongTo", belongTo);
			
			if(menuMap.containsKey(belongTo)) {
				if(!((JSONObject)menuMap.get(belongTo)).containsKey("children")) {
					((JSONObject)menuMap.get(belongTo)).put("children", new JSONArray());
				}
				((JSONArray)((JSONObject)menuMap.get(belongTo)).get("children")).add(obj);
			}
		}
		
//		System.out.println(rootMenus);
//		System.out.println(menuMap);
		
		return rootMenus;
	}
	
	@RequestMapping("/admin/getRoleAccessableMenu.do")
	public ModelAndView getRoleAccessableMenu(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		List accessableMenuList = menuService.getRoleAccessableMenu(paramMap);
		
		mv.addObject(dataSorted(accessableMenuList));
		
		return mv;
//		HashMap<Integer, HashMap<String, JSONArray>> inLevelMenuChildrenMap = new HashMap<Integer, HashMap<String, JSONArray>>(); 
//		HashMap<String, JSONObject> menuMap = new HashMap<String, JSONObject>();
//		
//		for(Object menu : accessableMenuList) {
//			JSONObject obj = new JSONObject();
//			String id = (String)((HashMap)menu).get("menuId");
//			String name = (String)((HashMap)menu).get("menuName");
//			String url = (String)((HashMap)menu).get("url");
//			String belongTo = (String)((HashMap)menu).get("belongTo");
//			Integer level = (Integer)((HashMap)menu).get("level");
//			
//			obj.put("id", id);
//			obj.put("name", name);
//			obj.put("url", url);
//			obj.put("belongTo", belongTo);
//			obj.put("level", level);
//			
//			if(!inLevelMenuChildrenMap.containsKey(level)) {
//				inLevelMenuChildrenMap.put(level, new HashMap<String, JSONArray>(){{
//					put(id, new JSONArray());
//				}});
//			} else {
//				if(!inLevelMenuChildrenMap.get(level).containsKey(id)) {
//					inLevelMenuChildrenMap.get(level).put(id, new JSONArray());
//				}
//			}
//			
//			if(inLevelMenuChildrenMap.containsKey(level-1)) {
//				if(inLevelMenuChildrenMap.get(level-1).containsKey(belongTo)) {
//					inLevelMenuChildrenMap.get(level-1).get(belongTo).add(obj);
//				}
//			}
//			menuMap.put(id, obj);
//		}
//		
//		ArrayList<Integer> levels = new ArrayList<Integer>(inLevelMenuChildrenMap.keySet());
//		Collections.sort(levels);
//		levels.remove(levels.size()-1);
//		Collections.reverse(levels);
//		
//		for(Integer level : levels) {
//			HashMap<String, JSONArray> curLevelMenuMap = inLevelMenuChildrenMap.get(level);
//			for(String key : curLevelMenuMap.keySet()) {
//				JSONObject obj = menuMap.get(key);
//				if(inLevelMenuChildrenMap.containsKey(level-1)) {
//					if(inLevelMenuChildrenMap.get(level-1).containsKey(obj.get("belongTo"))) {
//						inLevelMenuChildrenMap.get(level-1).get(obj.get("belongTo")).remove(obj);
//					}
//				}
//				JSONArray childs = curLevelMenuMap.get(key);
//				if(childs.size() > 0) {
//					obj.put("children", childs);
//				}
//				
//				if(inLevelMenuChildrenMap.containsKey(level-1)) {
//					inLevelMenuChildrenMap.get(level-1).get(obj.get("belongTo")).add(obj);
//				}
//			}
//		}
//		HashMap<String, JSONArray> topMenuChildMap = inLevelMenuChildrenMap.get(1);
//		JSONArray result = new JSONArray();
//		for(String key : topMenuChildMap.keySet()) {
//			JSONObject topMenu = menuMap.get(key);
//			topMenu.put("children", topMenuChildMap.get(key));
//			result.add(topMenu);
//		}
//		
//		System.out.println(result.toJSONString());
//		
//		mv.addObject(accessableMenuList);
//		mv.addObject(result);
		
		
		
	}
	
	@RequestMapping("/admin/delAccessableMenu.do")
	public ModelAndView delAccessableMenu(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="selectedMenuList[]") List<String> selectedMenuList) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		ModelAndView mv = new ModelAndView("jsonView");
		
		paramMap.put("selectedMenuList", selectedMenuList);
		menuService.delAccessableMenu(paramMap);
		
		List accessableMenuList = menuService.getRoleAccessableMenu(paramMap);
		
		mv.addObject(dataSorted(accessableMenuList));
		
		return mv;
		
	}
	
	@RequestMapping("/admin/addAccessableMenu.do")
	
	public ModelAndView addAccessableMenu(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value="selectedMenuList[]") List<String> selectedMenuList) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		paramMap.put("selectedMenuList", selectedMenuList);
//		System.out.println(paramMap);
//		System.out.println(selectedMenuList);
		ModelAndView mv = new ModelAndView("jsonView");
		menuService.addAccessableMenu(paramMap);
		
		List accessableMenuList = menuService.getRoleAccessableMenu(paramMap);
		
		mv.addObject(dataSorted(accessableMenuList));
		
		return mv;
		
//		ModelAndView mv = new ModelAndView("jsonView");
//		List accessableMenuList = menuService.getRoleAccessableMenu(paramMap);
//		
//		HashMap<Integer, HashMap<String, JSONArray>> inLevelMenuChildrenMap = new HashMap<Integer, HashMap<String, JSONArray>>(); 
//		HashMap<String, JSONObject> menuMap = new HashMap<String, JSONObject>();
//		
//		for(Object menu : accessableMenuList) {
//			JSONObject obj = new JSONObject();
//			String id = (String)((HashMap)menu).get("menuId");
//			String name = (String)((HashMap)menu).get("menuName");
//			String url = (String)((HashMap)menu).get("url");
//			String belongTo = (String)((HashMap)menu).get("belongTo");
//			Integer level = (Integer)((HashMap)menu).get("level");
//			
//			obj.put("id", id);
//			obj.put("name", name);
//			obj.put("url", url);
//			obj.put("belongTo", belongTo);
//			obj.put("level", level);
//			
//			if(!inLevelMenuChildrenMap.containsKey(level)) {
//				inLevelMenuChildrenMap.put(level, new HashMap<String, JSONArray>(){{
//					put(id, new JSONArray());
//				}});
//			} else {
//				if(!inLevelMenuChildrenMap.get(level).containsKey(id)) {
//					inLevelMenuChildrenMap.get(level).put(id, new JSONArray());
//				}
//			}
//			
//			if(inLevelMenuChildrenMap.containsKey(level-1)) {
//				if(inLevelMenuChildrenMap.get(level-1).containsKey(belongTo)) {
//					inLevelMenuChildrenMap.get(level-1).get(belongTo).add(obj);
//				}
//			}
//			menuMap.put(id, obj);
//		}
//		
//		ArrayList<Integer> levels = new ArrayList<Integer>(inLevelMenuChildrenMap.keySet());
//		Collections.sort(levels);
//		levels.remove(levels.size()-1);
//		Collections.reverse(levels);
//		
//		for(Integer level : levels) {
//			HashMap<String, JSONArray> curLevelMenuMap = inLevelMenuChildrenMap.get(level);
//			for(String key : curLevelMenuMap.keySet()) {
//				JSONObject obj = menuMap.get(key);
//				if(inLevelMenuChildrenMap.containsKey(level-1)) {
//					if(inLevelMenuChildrenMap.get(level-1).containsKey(obj.get("belongTo"))) {
//						inLevelMenuChildrenMap.get(level-1).get(obj.get("belongTo")).remove(obj);
//					}
//				}
//				JSONArray childs = curLevelMenuMap.get(key);
//				if(childs.size() > 0) {
//					obj.put("children", childs);
//				}
//				
//				if(inLevelMenuChildrenMap.containsKey(level-1)) {
//					inLevelMenuChildrenMap.get(level-1).get(obj.get("belongTo")).add(obj);
//				}
//			}
//		}
//		HashMap<String, JSONArray> topMenuChildMap = inLevelMenuChildrenMap.get(1);
//		JSONArray result = new JSONArray();
//		for(String key : topMenuChildMap.keySet()) {
//			JSONObject topMenu = menuMap.get(key);
//			topMenu.put("children", topMenuChildMap.get(key));
//			result.add(topMenu);
//		}
//		
//		System.out.println(result.toJSONString());
//
//		mv.addObject(result);
//		
//
//		
//		return mv;
	}
	
	
	
	@RequestMapping("/admin/manageBoard.do")
	public String manageBoard(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		
		List faqCategoryList = boardService.getFAQCategoryList();
		
		model.addAttribute("categoryList", faqCategoryList);
		
		return "admin/manageBoard";
	}
	
	@RequestMapping("/admin/getFAQList.do")
	public ModelAndView getFAQList(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		
		ModelAndView mv = new ModelAndView("jsonView");
		List list = boardService.listFAQ(paramMap);
		System.out.println(list);
		mv.addObject("faqList", list);
		return mv;
	}
	
	@RequestMapping("/admin/addFAQ.do")
	public ModelAndView addFAQ(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		paramMap.put("bbsType", "BW2");
		
//		System.out.println(paramMap);
		mv.addObject("isSuccess", boardService.insertBbs(paramMap));
			
		
		return mv;
	}
	
	@RequestMapping("/admin/deleteFAQ.do")
	public ModelAndView deleteFAQ(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		
		ModelAndView mv = new ModelAndView("jsonView");
		paramMap.put("bbsType", "BW2");
		paramMap.put("bbsNo", Integer.parseInt((String)paramMap.get("bbsNo")));
//		System.out.println(paramMap);
		mv.addObject("isSuccess", boardService.deleteBbs(paramMap));
			
		
		return mv;
	}
	
	
	
	@RequestMapping("/admin/editFAQ.do")
	public ModelAndView editFAQ(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		
		ModelAndView mv = new ModelAndView("jsonView");
		paramMap.put("bbsType", "BW2");
		paramMap.put("bbsNo", Integer.parseInt((String)paramMap.get("bbsNo")));
		System.out.println(paramMap);
		mv.addObject("isSuccess", boardService.updateBbs(paramMap));
			
		
		return mv;
	}
	
	@RequestMapping("/admin/checkLog.do")
	public String checkLog(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		LoginLogDomain loginLogDomain = new LoginLogDomain();
		BeanUtils.copyProperties(loginLogDomain, paramMap);
		
		
		int loginLogCurrPage = CommUtils.strToInt((String) paramMap.get("loginLogPage"), 1);
		int loginLogPageSize= 25;
		
		int shipLogCurrPage =  CommUtils.strToInt((String) paramMap.get("page"), 1);
		
		PaginatedArrayList loginLogList = logService.loginLogList(paramMap, loginLogCurrPage, loginLogPageSize);
		PaginatedArrayList list = logService.loginLogList(paramMap, loginLogCurrPage, loginLogPageSize);
		
		model.addAttribute("loginLogPageList", loginLogList);
		model.addAttribute("loginLogList", loginLogList);

		model.addAttribute("loginLogTotalSize", loginLogList.getTotalSize());
		model.addAttribute("loginLogCurrSize", loginLogList.getCurrPage());
		model.addAttribute("loginLogPageSize", loginLogList.getPageSize());
		
		
		
		return "admin/checkLog";
	}
	
	
	@RequestMapping("/admin/manageCode.do")
	public String manageCode(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		
		
		int currPage = CommUtils.strToInt((String) paramMap.get("loginLogPage"), 1);
		int pageSize= 10;
		PaginatedArrayList codeList = logService.searchCodeList(paramMap,currPage,pageSize);
		if(paramMap.containsKey("searchCont") &&paramMap.containsKey("searchType")) {
			model.addAttribute("searchType", paramMap.get("searchType"));
			model.addAttribute("searchCont", paramMap.get("searchCont"));
		} else {
			model.addAttribute("searchType", "all");
			model.addAttribute("searchCont", "");
		}
		
		
		model.addAttribute("pageList", codeList);
		model.addAttribute("codeList", codeList);
		
		model.addAttribute("totalSize", codeList.getTotalSize());
		model.addAttribute("currSize", codeList.getCurrPage());
		model.addAttribute("pageSize", codeList.getPageSize());
		
		return "admin/manageCode";
	}
	
	@RequestMapping("/admin/manageJunkyard.do")
	public String manageJunkyard(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if(paramMap == null) return "redirect:/login.do";
		if(!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS")) return "redirect:/main.do";
		
		
		
		int currPage = CommUtils.strToInt((String) paramMap.get("loginLogPage"), 1);
		int pageSize= 10;
		PaginatedArrayList junkyardList = logService.searchJunkyardList(paramMap,currPage,pageSize);
		if(paramMap.containsKey("searchCont") &&paramMap.containsKey("searchType")) {
			model.addAttribute("searchType", paramMap.get("searchType"));
			model.addAttribute("searchCont", paramMap.get("searchCont"));
		} else {
			model.addAttribute("searchType", "all");
			model.addAttribute("searchCont", "");
		}
		
		
		model.addAttribute("pageList", junkyardList);
		model.addAttribute("junkyardList", junkyardList);
		
		model.addAttribute("totalSize", junkyardList.getTotalSize());
		model.addAttribute("currSize", junkyardList.getCurrPage());
		model.addAttribute("pageSize", junkyardList.getPageSize());
		
		return "admin/manageJunkyard";
	}
	
	
	
	@RequestMapping("/test.do")
	public String test(HttpServletRequest request, ModelMap model) throws Exception {
		return "test/test";
	}
	
}
