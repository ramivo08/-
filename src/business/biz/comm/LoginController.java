package business.biz.comm;

import java.io.PrintWriter;
import java.security.MessageDigest;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.sys.log.AccessControlService;
import business.sys.log.LogService;
import business.sys.user.UserInfoService;
import common.base.BaseController;
import common.user.UserInfo;
import common.util.properties.ApplicationProperty;

/**
 * Program Name : LoginController Description : Login, Logout Login 로그 등록
 *
 * Programmer Name : ntarget Creation Date : 2017-01-12 Used Table :
 */

@Controller
@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
public class LoginController extends BaseController {
	protected static final String FORM_USERNAME = "j_userid";
	protected static final String FORM_PASSWORD = "j_password";
	protected static final String LOGIN_SUCC_URL = "/loginSuccess.do";
	protected static final String LOGIN_SUCC_PAGE = "loginSuccess";
	protected static final String LOGIN_URL = "/login.do";
	protected static final String LOGIN_URL_PAGE = "login";
	protected static final String LOGOUT_URL_PAGE = "logout";

	protected static final String ERROR_FLAG_E1 = "E1"; // 사용자 정보가 없음.
	protected static final String ERROR_FLAG_E2 = "E2"; // 패스워드 틀림.
	protected static final String ERROR_FLAG_E3 = "E3"; // 사용하지 않는 ID
	protected static final String ERROR_FLAG_E4 = "E4"; // 승인되지 않은 ID
	protected static final String ERROR_FLAG_E8 = "E8"; // 해당 업체는 사용상태가 아님.
	protected static final String ERROR_FLAG_EA = "EA"; // 가입 승인중인 아이디 입니다.
	protected static final String ERROR_FLAG_EB = "EB"; // 등록된 권한정보가 없습니다. 관리자에게 문의 바랍니다.

	protected static final String CERT_RETURN = "CERT_RETURN";
	@Autowired
	private UserInfoService userInfoService;
	@Autowired
	private LogService logService;
	@Autowired
	private AccessControlService accessControlService;
	
	@Autowired
	private UserMailSendService mailsender;

	@RequestMapping("/login.do")
	public String login(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		
		if (request.getSession() == null) {
			return LOGIN_URL_PAGE;
		} else if (request.getSession().getValue("userInfo") == null) {
			return LOGIN_URL_PAGE;
		} else {
			return "redirect:/main.do";
		}
	}

	@RequestMapping("/logout.do")
	public String logout(HttpServletRequest request, ModelMap model) throws Exception {
		clearSessionInformation(request);
		request.getSession().invalidate();
		return "redirect:/login.do";
	}

	@RequestMapping("/loginSuccess.do")
	public String loginSuccess(HttpServletRequest request, ModelMap model) throws Exception {
		return LOGIN_SUCC_PAGE;
	}
	
	@RequestMapping("/remember.do")
	public ModelAndView rememberId(HttpServletRequest request, ModelMap model) throws Exception {
		Cookie[] cookies = request.getCookies();
		Map paramMap = getParameterMap(request, false);
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		if(cookies.length != 0) {
			for(Cookie cookie : cookies) {
				if(cookie.getName().equals("bwmsRememberCookieId")) {
					paramMap.put("cookieValue", cookie.getValue());
					mv.addObject("userId", userInfoService.getUserId(paramMap));
					return mv;
				}
			}
			
		}
		
		return mv;
	}

	/* 심홍섭 - 20200109 추가 */
	@RequestMapping("/loginCheck.do")
	public String loginCheck(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {
		logger.info("loginCheck@@@@controller");
		UserInfo userInfo = new UserInfo();
		Map paramMap = getParameterMap(request, false);
		BeanUtils.copyProperties(userInfo, paramMap);
		
		paramMap.put("inputPwd", this.pwdEncrypt((String) paramMap.get("inputPwd")));
		
		HttpSession session = request.getSession();

		if (userInfoService.checkUserInfo(paramMap)) {
			System.out.println(paramMap);
			Cookie[] cookies = request.getCookies();
			if(cookies.length != 0) {
				for(Cookie cookie : cookies) {
					if(cookie.getName().equals("bwmsRememberCookieId")) {
						paramMap.put("cookieValue", cookie.getValue());
						userInfoService.deleteRememberId(paramMap);
						cookie.setMaxAge(0);
						response.addCookie(cookie);
					}
				}
			}
			
			if(paramMap.containsKey("remember")) {
				String cookieId = userInfoService.rememberId(paramMap);
				Cookie cookie = new Cookie("bwmsRememberCookieId", cookieId);
				response.addCookie(cookie);
			}
			
			session.invalidate();

			paramMap.put("userId", paramMap.get("inputId"));
			paramMap.put("serverNm", "127.0.0.1_TankDev");
			UserInfo user = (UserInfo) userInfoService.getUserInfo(paramMap);

			// -------------------------------------------------
			String ip = request.getHeader("X-Forwarded-For");
			logger.info(">>>> X-FORWARDED-FOR : " + ip);
			 
	        if (ip == null) {
	            ip = request.getHeader("Proxy-Client-IP");
	            logger.info(">>>> Proxy-Client-IP : " + ip);
	        }
	        if (ip == null) {
	            ip = request.getHeader("WL-Proxy-Client-IP"); // 웹로직
	            logger.info(">>>> WL-Proxy-Client-IP : " + ip);
	        }
	        if (ip == null) {
	            ip = request.getHeader("HTTP_CLIENT_IP");
	            logger.info(">>>> HTTP_CLIENT_IP : " + ip);
	        }
	        if (ip == null) {
	            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
	            logger.info(">>>> HTTP_X_FORWARDED_FOR : " + ip);
	        }
	        if (ip == null) {
	            ip = request.getRemoteAddr();
	        }
	        
	        logger.info(">>>> Result : IP Address : "+ip);
	        
	        paramMap.put("userIp", ip);
	        
	        logService.loginLog(paramMap);
			// -------------------------------------------------
			
			logger.info(GRID_DATA, request.getSession(true));
			request.getSession(true).setAttribute("userInfo", user);
			
			return "redirect:/main.do";
		}
		response.setContentType("text/html; charset=UTF-8");
	    PrintWriter out = response.getWriter();
		out.println("<script>alert('아이디 혹은 패스워드가 일치하지 않습니다.'); location.href='/login.do';</script>");
		out.flush();
		return null;
	}

	/**
	 * 로그인 처리. (일반, 인증서)
	 *
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	/*
	 * @RequestMapping("/j_login_check.do") public ModelAndView
	 * j_login_check(HttpServletRequest request, HttpServletResponse response,
	 * ModelMap model) throws Exception {
	 * 
	 * String logUserNm = ""; String failFlag = ""; String returnUrl =
	 * LOGIN_SUCC_URL;
	 * 
	 * String userId = CommUtils.nvlTrim(request.getParameter(FORM_USERNAME));
	 * String password = CommUtils.nvlTrim(request.getParameter(FORM_PASSWORD));
	 * 
	 * //SHA256 암호화 password = CommUtils.getPasswordEncodingString(password);
	 * 
	 * Map reqUserMap = new HashMap(); reqUserMap.put("userId", userId);
	 * reqUserMap.put("loginType", "");
	 * 
	 * UserInfo user = (UserInfo)userInfoService.getUserInfo(reqUserMap);
	 * 
	 * // 로그인 검증. if(user == null) { failFlag = ERROR_FLAG_E1; // 사용자정보가 없음. } else
	 * { if("N".equals(CommUtils.nvlTrim(user.getUseYn()))) { failFlag =
	 * ERROR_FLAG_E3; // 사용하지 않는 id입니다. } else
	 * if(password.equals(CommUtils.nvlTrim(user.getPasswd())) == false) { failFlag
	 * = ERROR_FLAG_E2; // 패스워드 틀림 (일반) } else
	 * if("80".equals(CommUtils.nvlTrim(user.getUseStat())) ) { //승인거부 상태로 변경
	 * failFlag = ERROR_FLAG_E8; // 해당 사용자는 사용가능 상태가 아닙니다. } else
	 * if("10".equals(CommUtils.nvlTrim(user.getUseStat()))){ // 승인대기중인 상태 failFlag
	 * = ERROR_FLAG_EA; // 가입 승인중인 아이디 입니다. } else
	 * if("".equals(CommUtils.nvlTrim(user.getRoleId()))){ // 권한정보 유무 failFlag =
	 * ERROR_FLAG_EB; // 등록된 권한정보가 없습니다. } }
	 * 
	 * // 로그인 실패시 if (CommUtils.nvlTrim(failFlag).equals("") == false) { Map
	 * returnMap = new HashMap(); returnMap.put("returnFlag" , failFlag);
	 * 
	 * request.getSession().setAttribute(CERT_RETURN, returnMap); returnUrl =
	 * LOGIN_URL;
	 * 
	 * // 로그인 성공시 } else { clearSessionInformation(request); // UserInfo Bean
	 * Session BeanUtils.copyProperties(user, userInfo); }
	 * 
	 * // 로그인시 무조건 기존 메뉴정보는 삭제처리.
	 * request.getSession().removeAttribute(ApplicationProperty.get("SESS.MENUINFO")
	 * );
	 * 
	 *//**
		 * Login Log Registration - Start
		 */
	/*
	 * Map logMap = new HashMap(); logMap.put("userId", CommUtils.nvlTrim(userId,
	 * "guest") ); logMap.put("userIp", request.getRemoteAddr());
	 * logMap.put("serverNm",
	 * request.getServerName()+"_"+request.getLocalName()+"_"+request.getLocale().
	 * toString());
	 * 
	 * // When failure if(CommUtils.nvlTrim(failFlag).equals("") == false) {
	 * logMap.put("loginStat", "X"); logMap.put("loginReas", failFlag); // When
	 * success }else{ logMap.put("loginStat", "O"); logMap.put("loginReas", ""); }
	 * 
	 * accessControlService.regiLoginInfo(logMap);
	 *//**
		 * Login Log Registration - End
		 *//*
			 * 
			 * //return returnUrl; return new ModelAndView("redirect:"+returnUrl); }
			 */

	/**
	 * 로그아웃 처리.
	 *
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */

//	@RequestMapping("/j_logout_check.do")
//	public String j_logout_check(HttpServletRequest request, HttpServletResponse response, ModelMap model)
//			throws Exception {
//		clearSessionInformation(request);
//		request.getSession().invalidate();
//
//		return LOGOUT_URL_PAGE;
//	}
	
	@RequestMapping("/forgotPwdAuth.do")
	public ModelAndView forgotPwdAuth(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {

		Map paramMap = getParameterMap(request, false);
		ModelAndView mv = new ModelAndView("jsonView");
		String key = this.mailsender.mailSendUserPwd(userInfoService.getUserEmail(paramMap), request);
		paramMap.put("initPwd", this.pwdEncrypt(key));
		if(userInfoService.initPwd(paramMap)) {
			mv.addObject("isSuccess", true);
			mv.addObject("pwd", key);
		} else {
			mv.addObject("isSuccess", false);
		}
		
		
		System.out.println(mv);
		return mv;
	}
	

	// Session Remove
	private void clearSessionInformation(HttpServletRequest request) {
		request.getSession().removeAttribute(ApplicationProperty.get("SESS.USERINFO"));
		request.getSession().removeAttribute(ApplicationProperty.get("SESS.PAGEINFO"));
		request.getSession().removeAttribute(ApplicationProperty.get("SESS.MENUINFO"));
		request.getSession().removeAttribute(ApplicationProperty.get("SESS.PROCFLAG"));
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
	
	// Temporary function replaces email function
	private String randomKey(boolean lowerCheck, int size) {
		Random ran = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;

		do {
			num = ran.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < size);
		if (lowerCheck) {
			return sb.toString().toLowerCase();
		}
		return sb.toString();
	}

}
