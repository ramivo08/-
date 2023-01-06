package business.biz.memb;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import business.biz.FormTagManager;
import business.biz.comm.CommService;
import business.biz.memb.domain.MembDomain;

import common.base.BaseController;
import common.util.CommUtils;
import common.util.properties.ApplicationProperty;

/**
 * Program Name    : MembController
 * Description     : 회원정보 Controller
 * Programmer Name : NJS
 * Creation Date   : 2017-01-12
 * Used Table(주요) :
 *
 * @author NJS
 *
 */
@Controller
@SuppressWarnings({ "rawtypes", "unchecked" })
public class MembController extends BaseController {

    @Autowired
    private MembService membServicese;

    @Autowired
    private CommService  commService;

    //return message
    protected static final String RETURN_MSG		= "SUCC";		// 정상처리



    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // 회원가입 관련 ...
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * 회원가입 1단계 -회원약관동의 화면으로 이동
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/openRegiMembUser01.do")
    public String openRegiMembUser01(HttpServletRequest request, ModelMap model)
    throws Exception {

        return "/memb/openRegiMembUser01";
    }

    /**
     * 회원가입 2단계 -회원정보입력 화면으로 이동
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/openRegiMembUser02.do")
    public String openRegiMembUser02(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        //---------------------------------------------
        // set object part
        //---------------------------------------------
        model.addAttribute("model",        domain);
        model.addAttribute("map",          paramMap);

        return moveValidStep(request, paramMap, method);
    }


    /**
     * 사용자 ID(USER_ID) 중복 검사.
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/getMembCheckIdDupl.do")
    public ModelAndView getMembCheckIdDupl(HttpServletRequest request, ModelMap model)
            throws Exception {
        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);
        //Default Setting End
        //---------------------------------------------

        Map returnMap = new HashMap();
        ModelAndView mav = new ModelAndView();

        try {
        	//아이디 중복 검사
        	 int duplCnt = membServicese.viewMembCheckDuplUserId(paramMap);
        	 returnMap.put("duplCnt", duplCnt);

         	 mav.addObject("AJAX_MODEL", returnMap);
         	 mav.setViewName(ajaxView);

		} catch (Exception e) {
			e.printStackTrace();
		}

        return mav;
    }

    /**
     *회원가입 2단계 - 회원정보 입력처리
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/regiMembUser02.do")
    public ModelAndView regiMembUser02(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        //입력 수정 구분
        String procType = "I";

        try {
            //------------------
            // DB 작업 부분
            //------------------
            membServicese.saveMembUserInfo(paramMap, procType);

            resultFlag(message.getMessage("message.user.regiMembComplete"));
		} catch (Exception e) {
			e.printStackTrace();
		}

        //---------------------------------------------
        // 이동 url 설정.
        //---------------------------------------------
        String url = "redirect:/login.do"; // next로 처리

        return new ModelAndView(url);
    }

    /**
     * 아이디 찾기 화면으로 이동
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/viewMembFindId.do")
    public String viewMembFindId(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        //---------------------------------------------
        // set object part
        //---------------------------------------------
        model.addAttribute("model",     domain);
        model.addAttribute("map",       paramMap);

        return "/memb/viewMembFindId";
    }

    /**
     * 아이디 찾기 프로세스
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/getMembFindId.do")
    public ModelAndView getMembFileId(HttpServletRequest request, ModelMap model)
            throws Exception {
        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);
        //Default Setting End
        //---------------------------------------------

        Map returnMap = new HashMap();
        ModelAndView mav = new ModelAndView();

        try{

	        String rtnUserId = membServicese.getMembFindId(paramMap);
	        returnMap.put("rtnStat", (CommUtils.empty(rtnUserId) == false)? "EXIST":"EMPTY");
	        returnMap.put("rtnData", rtnUserId);
	    	 mav.addObject("AJAX_MODEL", returnMap);
	    	 mav.setViewName(ajaxView);

        }catch(Exception e){
        	e.printStackTrace();
        }

        return mav;
    }

    /**
     * 비밀번호 찾기 화면으로 이동
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/viewMembFindPwd.do")
    public String viewMembFindPwd(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        //---------------------------------------------
        // set object part
        //---------------------------------------------
        model.addAttribute("model",     domain);
        model.addAttribute("map",       paramMap);

        return "/memb/viewMembFindPwd";
    }

    /**
     * 비밀번호 찾기 프로세스
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/getMembFindPwd.do")
    public ModelAndView getMembFindPwd(HttpServletRequest request, ModelMap model)
    		throws Exception {
    	//---------------------------------------------
    	//Default Setting Start
    	String method       = getMethodName(new Throwable());
    	// mapping request parameters to map
    	Map paramMap = getParameterMap(request, true);
    	// Default Value Setting
    	setMappingValues(paramMap, method);
    	//Default Setting End
    	//---------------------------------------------

    	Map returnMap = new HashMap();
    	ModelAndView mav = new ModelAndView();

    	try{

    		returnMap = membServicese.getMembFindPwd(paramMap);
//    		returnMap.put("rtnStat", (CommUtils.empty(returnStat) == false)? "EXIST":"EMPTY");
//    		returnMap.put("rtnData", returnStat);

    		mav.addObject("AJAX_MODEL", returnMap);
    		mav.setViewName(ajaxView);

    	}catch(Exception e){
    		e.printStackTrace();
    	}

    	return mav;
    }

    /**
     * 회원탈퇴 1단계 - 약관동의 페이지로 이동
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/openWithdrawStep1.do")
    public String openWithdrawStep1(HttpServletRequest request, ModelMap model)
    		throws Exception {

    	//---------------------------------------------
    	//Default Setting Start
    	String method       = getMethodName(new Throwable());
    	// mapping request parameters to map
    	Map paramMap = getParameterMap(request, true);
    	// Default Value Setting
    	setMappingValues(paramMap, method);

    	// mapping domain
    	MembDomain domain   = new MembDomain();
    	BeanUtils.copyProperties(domain, paramMap);
    	//Default Setting End
    	//---------------------------------------------

    	//---------------------------------------------
    	// set object part
    	//---------------------------------------------
    	model.addAttribute("model",     domain);
    	model.addAttribute("map",       paramMap);

    	return moveValidStep(request, paramMap, method);
    }

    /**
     * 회원탈퇴 2단계 - 비밀번호 확인
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/openWithdrawStep2.do")
    public String openWithdrawStep2(HttpServletRequest request, ModelMap model)
    		throws Exception {

    	//---------------------------------------------
    	//Default Setting Start
    	String method       = getMethodName(new Throwable());
    	// mapping request parameters to map
    	Map paramMap = getParameterMap(request, true);
    	// Default Value Setting
    	setMappingValues(paramMap, method);

    	// mapping domain
    	MembDomain domain   = new MembDomain();
    	BeanUtils.copyProperties(domain, paramMap);
    	//Default Setting End
    	//---------------------------------------------

    	//---------------------------------------------
    	// set object part
    	//---------------------------------------------
    	model.addAttribute("model",     domain);
    	model.addAttribute("map",       paramMap);

    	return moveValidStep(request, paramMap, method);
    }

    /**
     * 회원탈퇴 2단계 - 비밀번호 확인
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/updtWithdrawStep2.do")
    public ModelAndView updtWithdrawStep2(HttpServletRequest request, ModelMap model)
    		throws Exception {

    	//---------------------------------------------
    	//Default Setting Start
    	String method       = getMethodName(new Throwable());
    	// mapping request parameters to map
    	Map paramMap = getParameterMap(request, true);
    	// Default Value Setting
    	setMappingValues(paramMap, method);

    	// mapping domain
    	MembDomain domain   = new MembDomain();
    	BeanUtils.copyProperties(domain, paramMap);
    	//Default Setting End
    	//---------------------------------------------

    	ModelAndView mav = new ModelAndView();
    	Map returnMap = new HashMap();

    	try {
        	// 탈퇴처리
        	String rtnStat = membServicese.updtWithdrawStep2(paramMap);
        	returnMap.put("rtnStat", rtnStat);

    		mav.addObject("AJAX_MODEL", returnMap);
    		mav.setViewName(ajaxView);

		} catch (Exception e) {
			e.printStackTrace();
		}

    	return mav;
    }

    /**
     * 개인 정보 보기화면 이동.
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/viewMembUserInfo.do")
    public String viewMembUserInfo(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
//        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        //---------------------------------------------
        // set object part
        //---------------------------------------------
        Map userInfoMap = membServicese.viewMembUserInfo(paramMap);

        BeanUtils.copyProperties(domain, userInfoMap);

        model.addAttribute("model",     domain);
        model.addAttribute("userInfo",  userInfoMap);
        model.addAttribute("map",       paramMap);

        return "/memb/viewMembInfoUser";
    }

    /**
     * 개인 정보 수정 처리
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/saveMembInfoUser.do")
    public ModelAndView saveMembInfoUser(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------

        String procType = "U";

        //------------------
        // DB 작업 부분
        //------------------
        membServicese.saveMembUserInfo(paramMap, procType);

        //---------------------------------------------
        // 이동 url 설정.
        //---------------------------------------------
        String url = "redirect:/memb/viewMembUserInfo.do";

        //---------------------------------------------
        // 이동 url 설정.
        //---------------------------------------------

        logger.debug("message:::::::::::::::::::"+message.getMessage("message.user.updtMembComplete"));

        resultFlag(message.getMessage("message.user.updtMembComplete"));

        return new ModelAndView(url);
    }

    /**
     * 비밀번호 변경 화면 이동. [팝업]
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/viewMembInfoModifyPwd.do")
    public String viewMembInfoModifyPwd(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //---------------------------------------------

        //---------------------------------------------
        // set object part
        //---------------------------------------------

        model.addAttribute("model",     domain);
        model.addAttribute("map",       paramMap);

        return "/memb/viewMembInfoModifyPwd";
    }

    /**
     * 현재 비밀번호 일치 여부 확인
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/getMembInfoCheckPwd.do")
    public ModelAndView getMembInfoCheckPwd(HttpServletRequest request, ModelMap model)
            throws Exception {
        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);
        //Default Setting End
        //---------------------------------------------

        // 해당 사용자정보 조회
        Map userInfo = (Map)membServicese.viewMembUserInfo(paramMap);
        String userPasswd = (String)userInfo.get("password");
        String recvPasswd = CommUtils.getPasswordEncodingString((String)paramMap.get("curPasswd")) ;

        String rtnStatStr = "";
        if(recvPasswd.equals(userPasswd) == true) {
            // id를 찾았음.
            rtnStatStr = "EQUAL";
        }else{
            // 찾지 못했음.
            rtnStatStr = "NOTEQ";
        }

        Map rtnMap = new HashMap();
        rtnMap.put("rtnStat", rtnStatStr);

        ModelAndView mav = new ModelAndView();
        mav.addObject("AJAX_MODEL", rtnMap);

        mav.setViewName(ajaxView);

        return mav;
    }

    /**
     * 비밀번호 변경 처리.
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/memb/updtMembInfoModifyPwd.do")
    public ModelAndView updtMembInfoModifyPwd(HttpServletRequest request, ModelMap model)
            throws Exception {

        //---------------------------------------------
        //Default Setting Start
        String method       = getMethodName(new Throwable());
        // mapping request parameters to map
        Map paramMap = getParameterMap(request, true);
        // Default Value Setting
        setMappingValues(paramMap, method);

        // mapping domain
        MembDomain domain   = new MembDomain();
        BeanUtils.copyProperties(domain, paramMap);
        //Default Setting End
        //---------------------------------------------
        
        // 해당 사용자정보 조회
        Map userInfo = (Map)membServicese.viewMembUserInfo(paramMap);
        String userPasswd = (String)userInfo.get("password");
        String recvPasswd = CommUtils.getPasswordEncodingString((String)paramMap.get("curPasswd")) ;

        String rtnStatStr = "";
        if(recvPasswd.equals(userPasswd) == true) {
            // id를 찾았음.
            rtnStatStr = "EQUAL";
            
            // 변경 처리.
            membServicese.updtMembInfoModifyPwd(paramMap);
        }else{
            // 찾지 못했음.
            rtnStatStr = "NOTEQ";
        }

        Map rtnMap = new HashMap();
        rtnMap.put("rtnStat", rtnStatStr);

        ModelAndView mav = new ModelAndView();
        mav.addObject("AJAX_MODEL", rtnMap);

        mav.setViewName(ajaxView);

        return mav;
    }


    //++++++++++++++++++++++++++++++++++++++++++++++
    // Data Management Zone
    //++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * Data Management
     * @param paramMap
     * @param method
     */
    private void setMappingValues(Map paramMap, String method) throws Exception {
        logger.debug("************ method:" + method);

        //---------------------------------------------------
        // 기본 설정
        //---------------------------------------------------
        paramMap.put("regiId", userInfo.getUserId());
        paramMap.put("updtId", userInfo.getUserId());

        //---------------------------------------------------
        // 화면별 설정.
        //---------------------------------------------------
        if (method.equalsIgnoreCase("regiMembUser02") ) {

            // 등록자를 가입자 ID로 설정.
            paramMap.put("regiId"  , (String)paramMap.get("userId"));

        }

        //----------------------------------
        // 허용된 파일 TYPE 설정
        //----------------------------------
        String allowedFileExts = ApplicationProperty.get("file.base.allow.exts");
        paramMap.put("allowedFileExts", allowedFileExts);

        //---------------------------------------------------
        // Form 설정.
        //---------------------------------------------------
        // 폼 객체 옵션 데이터를 추가한다.
        formObject(paramMap, method);
    }

    /**
     * 폼 객체 옵션 데이터를 추가한다.
     *
     * @param paramMap 파라메터
     * @param method 메소드
     * @throws Exception 발생오류
     */
    private void formObject(Map paramMap, String method) throws Exception {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        if (method.equalsIgnoreCase("openRegiMembUser02") || method.equalsIgnoreCase("viewMembUserInfo") ) {
            // 이메일 도메인 코드 리스트
            paramMap.put("parentCode", "EMAIL_CD");
            List emailCdCodeList = commService.listCode(paramMap);
            request.setAttribute("emailCdCodeList", FormTagManager.listToListCombo(emailCdCodeList, "직접입력") ) ;

            // 휴대폰 국번 코드 리스트
            paramMap.put("parentCode", "CELL_FNUM");
            List phoneFNumCodeList = commService.listCode(paramMap);
            request.setAttribute("cellFNumCodeList", FormTagManager.listToListCombo(phoneFNumCodeList, ":: 선택 ::") ) ;

            // 전화번호 국번 코드리스트 설정.
            paramMap.put("parentCode", "TEL_FNUM");
            paramMap.put("searchNotIn", null);
            List telFnumCodeList = commService.listCode(paramMap);
            request.setAttribute("telFnumCodeList", FormTagManager.listToListCombo(telFnumCodeList, ":: 선택 ::"));

            // 사용자 구분 코드리스트 설정.
            paramMap.put("parentCode", "USCM_TYPE");
            paramMap.put("searchNotIn", new String[]{"U9"});
            List uscmRoleCodeList = commService.listCode(paramMap);
            request.setAttribute("uscmTypeCodeList", FormTagManager.listToListCombo(uscmRoleCodeList, ":: 선택 ::"));

            // 야생동물센터종류 설정.
            paramMap.put("parentCode", "ORG_KIND");
            paramMap.put("searchNotIn", null);
            List orgKindList = commService.listCode(paramMap);
            request.setAttribute("orgKindCodeList", FormTagManager.listToListCombo(orgKindList, ":: 선택 ::"));
            
            // 진단기관 설정.
            paramMap.put("parentCode", "DIAG_CENTER");
            paramMap.put("searchNotIn", null);
            List diagKindList = commService.listCode(paramMap);
            request.setAttribute("diagKindCodeList", FormTagManager.listToListCombo(diagKindList, ":: 선택 ::"));
        }else if(method.equalsIgnoreCase("viewMembFindId") || method.equalsIgnoreCase("viewMembFindPwd")){
            // 이메일 도메인 코드 리스트
            paramMap.put("parentCode", "EMAIL_CD");
            List emailCdCodeList = commService.listCode(paramMap);
            request.setAttribute("emailCdCodeList", FormTagManager.listToListCombo(emailCdCodeList, "직접입력") ) ;

            // 사용자 구분 코드리스트 설정.
            paramMap.put("parentCode", "USCM_TYPE");
            paramMap.put("searchNotIn", new String[]{"U9"});
            List uscmRoleCodeList = commService.listCode(paramMap);
            request.setAttribute("uscmRoleCodeList", FormTagManager.listToListCombo(uscmRoleCodeList, ":: 선택 ::"));
        }
    }

    /**
	 * 회원가입, 회원탈퇴 시 페이지 이동
     *
     *
     * @param paramMap
     * @param method
     * @param settingUrl
     * @return
     */
    private String moveValidStep(HttpServletRequest request, Map paramMap, String method){

        String rtnUrl = "/memb/"+method;

        //회원가입시
        String termsAgreeYn1 = (String)paramMap.get("termsAgreeYn1");
        String termsAgreeYn2 = (String)paramMap.get("termsAgreeYn2");
//        String termsAgreeYn3 = (String)paramMap.get("termsAgreeYn3");

        //회원탈퇴시

        String withdrawAgreeYn = (String)paramMap.get("withdrawAgreeYn");

        String initUrl = "redirect:/memb/openRegiMembUser01.do";

        String initUrl1 = "redirect:/main.do";

        if (method.equalsIgnoreCase("openRegiMembUser02") ) {
            if(checkWrongAccess(request, paramMap, method) == false
                    || CommUtils.empty(termsAgreeYn1)  || CommUtils.empty(termsAgreeYn2) ){ //|| CommUtils.empty(termsAgreeYn3) ) {
                rtnUrl = initUrl;    // go step 1;
            }
        } else if(method.equalsIgnoreCase("openWithdrawStep1")){
        	if(checkWrongAccess(request, paramMap, method) == false
        			|| CommUtils.empty(userInfo.getUserId())){
        		rtnUrl = initUrl1;    // 회원탈퇴 약관페이지로 이동
        	}
        } else if(method.equalsIgnoreCase("openWithdrawStep2")){
        	if(checkWrongAccess(request, paramMap, method) == false || CommUtils.empty(userInfo.getUserId())
        			|| CommUtils.empty(withdrawAgreeYn) ){
        		rtnUrl = initUrl1;    // 회원탈퇴 약관페이지로 이동
        	}
        }

        return rtnUrl;
    }

    /**
     * 이전 url 정보가 없이 직접 들어왔을 때 false 를 밷는다.
     * @param request
     * @param reqMap
     * @param method
     * @return
     */
    private boolean checkWrongAccess(HttpServletRequest request, Map paramMap, String method)  {

        //+++++++++++++++++++++++++++++++
        // check wrong access
        //+++++++++++++++++++++++++++++++
        String reqReferer =  request.getHeader("REFERER");
        if(CommUtils.empty(reqReferer)){
            return false;
        }
        return true;
    }
}