package business.biz.comm;

import java.io.PrintWriter;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.ibatis.binding.MapperMethod.ParamMap;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import business.biz.FileService;
import business.biz.ship.ShipService;
import business.sys.log.AccessControlService;
import business.sys.user.UserInfoService;
import common.base.BaseController;
import common.file.FileManager;

/**
 * Program Name : RegisterController Description : Register
 *
 * Programmer Name : ntarget Creation Date : 2017-01-12 Used Table :
 */

@Controller
@SuppressWarnings({ "unchecked", "rawtypes", "unused" })
public class RegisterController extends BaseController {
	@Autowired
	private UserInfoService userInfoService;
	@Autowired
	private AccessControlService accessControlService;
	@Autowired
	private UserMailSendService mailsender;
	
	@Autowired
	private ShipService shipService;
	
	@Autowired
	private FileService fileService;
	
	@Resource(name = "fileManager")
	FileManager fileManager;

	@RequestMapping("/register.do")
	public ModelAndView register(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
			ModelAndView mv = new ModelAndView("jsonView");
		if (request.getSession() == null) {
			
			List<Map> mnftList = shipService.selectMnftList();
			mv.addObject("mnftList",mnftList);
			mv.setViewName("register");
			return mv;
		} else if (request.getSession().getValue("userInfo") == null) {
			List<Map> mnftList = shipService.selectMnftList();
			mv.addObject("mnftList",mnftList);
			mv.setViewName("register");
			return mv;
		} else {
			mv.setViewName("redirect:/main.do");
			return mv;
		}

	}
	
	@RequestMapping("/checkId.do")
	public ModelAndView checkId (HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		
		ModelAndView mv = new ModelAndView("jsonView");
		//Default
		Map paramMap = getParameterMap(request, false);
		
		
		System.out.println("userid  =  " + paramMap.get("inputId"));
		int result  = userInfoService.checkId(paramMap);
		
		String check;
		
		if(result == 0) {
			
			check = "true";
		} else {
			check = "false";
		}
		
		mv.addObject("check",check);
		
		return  mv;
	}

	@RequestMapping("/registerUser.do")
	public void registerUser(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {

		Map paramMap = getParameterMap(request, false);
		paramMap.put("inputPwd", this.pwdEncrypt((String) paramMap.get("inputPwd")));
		
		if (paramMap.containsKey("seqShipNo")) {
			try {
				paramMap.put("seqShipNo", Integer.parseInt((String) paramMap.get("seqShipNo")));
			} catch (NumberFormatException e) {
				// e.printStackTrace();
				paramMap.put("imoNo", null);
			}
		}
		
		response.setContentType("text/html; charset=UTF-8");

		PrintWriter out = response.getWriter();
		if (userInfoService.registerUser(paramMap)) {
			out.println("<script>alert('회원가입이 완료되었습니다.'); location.href='/login.do';</script>");
		} else {
			out.println("<script>alert('오류가 발생하였습니다.'); location.href='/register.do';</script>");
			System.out.println("Failed");
		}
		out.flush();
	}

	@RequestMapping("/shipInfoApi.do")
	public ModelAndView searchShipInfoAPI(HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map paramMap = getParameterMap(request, false);

		response.setHeader("Access-Control-Allow-Origin", "*");

		response.setHeader("Access-Control-Allow-Methods", "GET");

		ModelAndView mv = new ModelAndView("jsonView");

		String apiUrl = "http://apis.data.go.kr/1192000/SicsVsslManp2/Info";
		// 홈페이지에서 받은 키
		String serviceKey = "bAPkxM2d0FmZ0CMQDH9LAgeUIHv8NMF%2Fc4yOBn6HqKS9aWgOlNrVZmGcqb%2F%2FHfqZhUXcyEHaZmMG3UWSRCJjjw%3D%3D";
		String pageNo = "1";
		String numOfRows = "10";
		String shipName = (String) paramMap.get("shipName");

		StringBuilder urlBuilder = new StringBuilder();

		urlBuilder.append(apiUrl);
		urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
		urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(pageNo, "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(numOfRows, "UTF-8"));
		urlBuilder.append("&" + URLEncoder.encode("vsslNm", "UTF-8") + "=" + URLEncoder.encode(shipName, "UTF-8"));;
//		shipName UTF-8 Encording
//				URLEncoder.encode(shipName, "UTF-8"));

		System.out.println("URL Builder : " + urlBuilder);
		/*
		 * GET방식으로 전송해서 파라미터 받아오기
		 */
		URL url = new URL(urlBuilder.toString());
		// 어떻게 넘어가는지 확인하고 싶으면 아래 출력분 주석 해제
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		List<String> nolist = new ArrayList<String>();
		List<String> kornmlist = new ArrayList<String>();
		List<String> engnmlist = new ArrayList<String>();
		List<String> totltlist = new ArrayList<String>();
		List<String> ltlist = new ArrayList<String>();
		List<String> dplist = new ArrayList<String>();
		List<String> vsslNltylist = new ArrayList<String>();
		List<String> vsslCnstrDtlist = new ArrayList<String>();
		List<String> grtglist = new ArrayList<String>();
		List<String> vsslKndlist = new ArrayList<String>();
		List<String> imoNolist = new ArrayList<String>();

		// Map<String,Map<String,Object>> mapmap = new
		// HashMap<String,Map<String,Object>>();
		String s = null;
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(urlBuilder.toString());

		Element e = null;
		NodeList nodeList = doc.getElementsByTagName("item");
		System.out.println("파싱할 리스트 수  : " + nodeList.getLength());

		for (int i = 0; i < nodeList.getLength(); i++) {
			Node n = nodeList.item(i); // 노드 반환
			if (n.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element) n;

				nolist.add(getTagValue("vsslNo", element));
				map.put("vsslNo", nolist);
				kornmlist.add(getTagValue("vsslKorNm", element));
				map.put("vsslKorNm", kornmlist);
				engnmlist.add(getTagValue("vsslEngNm", element));
				map.put("vsslEngNm", engnmlist);
				totltlist.add(getTagValue("vsslTotLt", element));
				map.put("vsslTotLt", totltlist);
				ltlist.add(getTagValue("vsslLt", element));
				map.put("vsslLt", ltlist);
				dplist.add(getTagValue("vsslDp", element));
				map.put("vsslDp", dplist);

				vsslNltylist.add(getTagValue("vsslNlty", element));

				map.put("vsslNlty", vsslNltylist);
				vsslCnstrDtlist.add(getTagValue("vsslCnstrDt", element));

				map.put("vsslCnstrDt", vsslCnstrDtlist);
				grtglist.add(getTagValue("grtg", element));

				map.put("grtg", grtglist);
				vsslKndlist.add(getTagValue("vsslKnd", element));

				map.put("vsslKnd", vsslKndlist);
				imoNolist.add(getTagValue("imoNo", element));
				map.put("imoNo", imoNolist);
			}
			mv.addObject("size", nodeList.getLength());
			mv.addObject("result", map);
		}
		return mv;
	}
	
	
	@RequestMapping("/insertRegiShipInfo.do")
	@SuppressWarnings({ "rawtypes" })
	public ModelAndView insertShipInformation(HttpServletRequest request, ModelMap model, HttpServletResponse response)
			throws Exception {
		
		
		// Request Parameter Values Setting
		HttpSession session = request.getSession();
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, false);

		ModelAndView mv = new ModelAndView("jsonView");
		
		
		System.out.println("paramMap #@! = " + paramMap);
		
		String result = null;
//		String shipSeq = null;
//		String[] arr = {result,shipSeq} ;
		if (paramMap == null) {
			System.out.println("paramMap======null#@!#@!");
			result = "fail";
			
			mv.addObject("result", result);

			return mv;

		} else {
			
			int shipCount = shipService.selectShipNm(paramMap);
			
			if(shipCount == 1) {
				mv.addObject("result","overlap");
			}else {
				
				if (paramMap.containsKey("shipKnd")) {
					paramMap.put("shipKnd", Integer.parseInt(((String) paramMap.get("shipKnd")).substring(0,
							((String) paramMap.get("shipKnd")).indexOf('['))));
					System.out.println("shipKnd 진입#@!#@!");
				}
				if (paramMap.containsKey("shipNlty")) {
					paramMap.put("shipNlty", ((String) paramMap.get("shipNlty")).substring(0,
							((String) paramMap.get("shipNlty")).indexOf('[')));
					System.out.println("shipNlty 진입#@!#@!");
				}
				if (paramMap.containsKey("shipNo")) {
					paramMap.put("shipNo", Integer.parseInt((String) paramMap.get("shipNo")));
					System.out.println("shipNo 진입#@!#@!");
				}
				if (paramMap.containsKey("shipGrtg")) {
					paramMap.put("shipGrtg", Integer.parseInt((String) paramMap.get("shipGrtg")));
					System.out.println("shipGrtg 진입#@!#@!");
				}
				if (paramMap.containsKey("imoNo")) {
					System.out.println("imoNo 진입#@!#@!");
					try {
						paramMap.put("imoNo", Integer.parseInt((String) paramMap.get("imoNo")));
						
					} catch (NumberFormatException e) {
						// e.printStackTrace();
						paramMap.put("imoNo", null);
					}
				}
				if (paramMap.containsKey("shipCnstrDt")) {
					System.out.println("shipCnstrDt 진입#@!#@!");
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					paramMap.put("shipCnstrDt", sdf.parse((String) paramMap.get("shipCnstrDt")));
				}
				
			
				System.out.println("insert 전 ");
				
				shipService.insertShip(paramMap);
				
				System.out.println("Information insert success");
				
				
				result = "success";
				mv.addObject("result", "success");
				
				
			}


			

//			mv.addObject("shipSeq", shipSeqNo);
			
			
	
			
//			shipSeq = Integer.toString(shipSeqNo);
			// 선박 증명서 파일 등록
//			List fileList = fileManager.multiFileUpload(request);
//			if (fileList.size() != 0) {
//				Map fileMap = fileManager.makeFileProof(request, response);
//
//				fileMap.put("rootNo", Integer.toString((Integer) paramMap.get("shipNo")));
//				fileMap.put("docuType", "shipInfo");
//				fileMap.put("status", "I");
//
//				fileService.proofFileManagement(fileMap, fileList);
//				System.out.println("fileMap#@!" + fileMap);
//			}
//
//			int shipSeqNo = selectShipSeq();
//			paramMap.put("shipSeq", shipSeqNo);

		

		}
		return mv;

	}
	
	
	//bw_ship_info 시퀀스
//	private int selectShipSeq() {
//		int shipSeq = shipService.selectShipSeq();
//		
//		return shipSeq;
//	}
	

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

	private static String getTagValue(String tag, Element ele) {

		NodeList nodeList = ele.getElementsByTagName(tag).item(0).getChildNodes();

		Node nValue = (Node) nodeList.item(0);

		if (nValue == null) {

			return null;

		}

		return nValue.getNodeValue();

	}

}
