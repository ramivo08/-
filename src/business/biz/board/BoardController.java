/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.board;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import business.biz.FileService;
import business.biz.board.domain.BoardDomain;
import business.biz.target.domain.TargetDomain;
import business.sys.program.ProgService;
import common.base.BaseController;
import common.file.FileManager;
import common.user.UserInfo;
import common.util.CommUtils;
import common.util.FileUtil;
import common.util.paging.PaginatedArrayList;
import common.util.properties.ApplicationProperty;
import jdk.internal.org.jline.utils.Log;

@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class BoardController extends BaseController {

	@Autowired
	private BoardService boardService;
	@Autowired
	private ProgService progService;

	@Autowired
	private FileService fileService;

	@Resource(name = "fileManager")
	FileManager fileManager;

	protected static final String BBS_TYPE_B01 = "BW1"; // 공지사항(Notice)
	protected static final String BBS_TYPE_B02 = "BW2"; // 자주묻는 질문(FAQ)
	protected static final String BBS_TYPE_B03 = "BW3"; // Q&A(Q&A)

	/**
	 * BWMS 게시판 공지사항 조회
	 *
	 * @param request
	 * @param model
	 * @return string
	 * @throws Exception
	 */
	@RequestMapping("/board/searchNotice.do")
	public String searchNotice(HttpServletRequest request, ModelMap model) throws Exception {
		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		int currPage = CommUtils.strToInt((String) paramMap.get("page"), 1); // 현재페이지 몇페이지인지
		int pageSize = 10;

		// 검색내용, 검색타입이 없을때
		if (!(paramMap.containsKey("searchCont") && paramMap.containsKey("searchType"))) {
			paramMap.put("searchType", "all"); // 검색 타입, 전체 넣는다.
			paramMap.put("searchCont", ""); // 검색 내용, 아무것도 없을때
		}
		model.addAttribute("searchType", paramMap.get("searchType"));
		model.addAttribute("searchCont", paramMap.get("searchCont"));

		PaginatedArrayList noticeList = boardService.searchNotice(paramMap, currPage, pageSize);

		model.addAttribute("pageList", noticeList);
		model.addAttribute("noticeList", noticeList);

		model.addAttribute("totalSize", noticeList.getTotalSize());
		model.addAttribute("currSize", noticeList.getCurrPage());
		model.addAttribute("pageSize", noticeList.getPageSize());

		return "board/listNotice";
	}

	@RequestMapping("/board/searchFAQ.do")
	public String searchFAQ(HttpServletRequest request, ModelMap model) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		int currPage = CommUtils.strToInt((String) paramMap.get("page"), 1);
		int pageSize = 10;

		if (!(paramMap.containsKey("searchCont") && paramMap.containsKey("searchType"))) {
			paramMap.put("searchType", "all");
			paramMap.put("searchCont", "");
		}
		model.addAttribute("searchType", paramMap.get("searchType"));
		model.addAttribute("searchCont", paramMap.get("searchCont"));
		PaginatedArrayList faqList = boardService.searchFAQ(paramMap, currPage, pageSize);

		model.addAttribute("pageList", faqList);
		model.addAttribute("faqList", faqList);

		model.addAttribute("totalSize", faqList.getTotalSize());
		model.addAttribute("currSize", faqList.getCurrPage());
		model.addAttribute("pageSize", faqList.getPageSize());

		return "board/listFAQ";
	}

	@RequestMapping("/board/searchQNA.do")
	public String searchQNA(HttpServletRequest request, ModelMap model) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		int currPage = CommUtils.strToInt((String) paramMap.get("page"), 1);
		int pageSize = 10;

		if (!(paramMap.containsKey("searchCont") && paramMap.containsKey("searchType"))) {
			paramMap.put("searchType", "all");
			paramMap.put("searchCont", "");
		}
		model.addAttribute("searchType", paramMap.get("searchType"));
		model.addAttribute("searchCont", paramMap.get("searchCont"));
		PaginatedArrayList qnaList = boardService.searchQNA(paramMap, currPage, pageSize);

		model.addAttribute("pageList", qnaList);
		model.addAttribute("qnaList", qnaList);

		model.addAttribute("totalSize", qnaList.getTotalSize());
		model.addAttribute("currSize", qnaList.getCurrPage());
		model.addAttribute("pageSize", qnaList.getPageSize());

		return "board/listQNA";
	}


	@RequestMapping("/board/selectNotice.do") // 공지사항 상세보기
	public String selectNotice(HttpServletRequest request, ModelMap model) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		int bbsNo = Integer.parseInt(request.getParameter("bbsNo"));
		int page = Integer.parseInt(request.getParameter("page"));
		boardService.viewPlus(paramMap);

		// 게시글정보가져오기
		BoardDomain boardDomain = boardService.SelectBbs(bbsNo);
		System.out.println("selectNotice 제목 :" + boardDomain.getBbsSubject());

		boardDomain.setBbsCont(boardDomain.getBbsCont().replaceAll("&lt;", "<").replaceAll("&gt;", ">"));

		paramMap.put("rootNo", paramMap.get("bbsNo"));
		List<Map> fileList = fileService.listFile(paramMap);

		model.addAttribute("bd", boardDomain);
		model.addAttribute("fileList", fileList);
		model.addAttribute("page", page);

		return "/board/viewNotice";
	}

	// 공지사항 글등록하기 폼으로 이동
	@RequestMapping("/board/insertNotice.do")
	public String insertNotice(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		return "board/insertNotice";

	}

	// 공지사항 글등록하기
	   @RequestMapping("/board/insertNotices.do")
	   public String insertNotices(HttpServletRequest request, HttpServletResponse response, ModelMap model)
	         throws Exception {

	      MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	      Map<String, MultipartFile> files = multipartRequest.getFileMap();
	      String upfileName = "upfile";
	      MultipartFile inFile = files.get(upfileName);
	      
	      Map paramMap = super.getParameterMap(request, true);
	      if (paramMap == null)
	         return "redirect:/login.do";
	      if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
	         return "redirect:/main.do";

	      if( CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(), ApplicationProperty.get("file.all.allow.exts")) ) {
	         BoardDomain boardDomain = new BoardDomain();
	         BeanUtils.copyProperties(paramMap, boardDomain);
	         
	         paramMap.put("bbsKind", this.BBS_TYPE_B01); // 게시판종류
	         paramMap.put("register", paramMap.get("gsUserId"));// 로그인한 사람 -가입자 admin,user 구분하는거
	         
	         Map boardMap = boardService.insertBoardMap(paramMap, boardDomain);
	         
	         List<HashMap> fileList = fileManager.multiFileUpload(request);
	         System.out.println(((MultipartHttpServletRequest) request).getFileMap());
	         System.out.println(paramMap);
	         System.out.println(fileList);
	         if (fileList.size() != 0) {
	            Map paramFileMap = fileManager.makeFileMap(request, response);
	            System.out.println(paramFileMap);
	            paramFileMap.put("subDir", BBS_TYPE_B01); // 파일 경로
	            paramFileMap.put("rootNo", Integer.toString(boardService.selectCurrentBbsNo()));
	            paramFileMap.put("docuType", BBS_TYPE_B01);//게시물타입
	            // paramFileMap.put("status", "I");
	            fileService.fileManagement(paramFileMap, fileList);
	         }
	         
	         model.addAttribute("model", boardDomain);
	         model.addAttribute("boardMap", boardMap);
	         
	      }//if
	      else {
	         response.setContentType("text/html; charset=UTF-8");
	          PrintWriter writer=response.getWriter();
	         writer.println("<script> alert('등록 불가능한 파일 확장자이므로 게시글을 등록할 수 없습니다.'); </script>");
	          writer.println("<script> location.href='searchNotice.do' </script>");
	          writer.flush();
	      }

	      return "redirect:/board/searchNotice.do";

	   }

	@RequestMapping("/board/updateformNotice.do") // 수정 form
	public String updateformNotice(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {

		int bbsNo = Integer.parseInt(request.getParameter("bbsNo"));
		int page = Integer.parseInt(request.getParameter("page")); // 수정 후 상세페이지 이동 추가

		BoardDomain boardDomain = boardService.SelectBbs(bbsNo);
		Map paramMap = super.getParameterMap(request, true);
		paramMap.put("rootNo", paramMap.get("bbsNo"));
		List<Map> fileList = fileService.listFile(paramMap);

		model.addAttribute("fileList", fileList);
		model.addAttribute("bd", boardDomain);
		model.addAttribute("page", page); // 수정 후 상세페이지 이동 추가

		return "board/updateformNotice";
	}

	@RequestMapping("/board/updateNotice.do") // 공지사항 수정
	public String updateNotice(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			BoardDomain boardDomain, int bbsNo, int page) throws Exception { // 수정 후 상세페이지 이동 변경

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		System.out.println("updateNotice bbsNo:" + request.getParameter("bbsNo"));
		System.out.println("updateNotice bbsSubject:" + request.getParameter("bbsSubject"));
		System.out.println("updateNotice bbsCont:" + request.getParameter("bbsCont"));

		List<HashMap> fileList = fileManager.multiFileUpload(request);
		System.out.println(((MultipartHttpServletRequest) request).getFileMap());
		System.out.println(paramMap);
		System.out.println(fileList);
		if (fileList.size() != 0) {
			Map paramFileMap = fileManager.makeFileMap(request, response);
			paramFileMap.put("rootNo", request.getParameter("bbsNo"));
			paramFileMap.put("status", "D");
			paramFileMap.put("subDir", BBS_TYPE_B01); // 파일 경로
			paramFileMap.put("docuType", BBS_TYPE_B01);
			fileService.fileManagement(paramFileMap, fileList);
		} else if (request.getParameter("deleteFileNo") != null && !request.getParameter("deleteFileNo").equals("")) {
			//null값이 아니고 , 빈값도 아닌경우 실행된다
			//StringUtil.isEmpty - 안에 값이 널이거나 빈값이면 true, 그 외 false
			fileService.deltFiles(request.getParameter("bbsNo"), paramMap.get("gsUserId").toString());
		}

		// System.out.println(paramFileMap);
		// paramFileMap.put("status", "I");
		// fileService.fileManagement(paramFileMap, fileList);

		// BoardDomain boardDomain = new BoardDomain();
		BeanUtils.copyProperties(paramMap, boardDomain);

		System.out.println("updateNotice bbsNo:" + boardDomain.getBbsNo());
		System.out.println("updateNotice bbsSubject:" + boardDomain.getBbsSubject());
		System.out.println("updateNotice bbsCont:" + boardDomain.getBbsCont());

		boardService.updateNotice(boardDomain);

		// model.addAttribute("model",boardDomain);
		// model.addAttribute("updateboardMap", updateboardMap);

		return "redirect:/board/selectNotice.do?bbsNo=" + bbsNo + "&page=" + page; // 수정 후 상세페이지 이동 변경
	}

	//다중삭제 - 체크박스 선택해서
	@RequestMapping("/board/deleteNotices.do")
	public String deleteNotices(HttpServletRequest request, HttpServletResponse response,ModelMap model, int page, 
			@RequestParam(value="num", required=false) String num,
			@RequestParam(value="numList",required=false) String numList) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		String[] datalist = numList.split(" ");

		for (int i = 0; i < datalist.length; i++) {
			System.out.println(datalist[i]);
			paramMap.put("bbsNo", datalist[i]);
			boardService.deleteBbs(paramMap);
		}
		return "redirect:/board/searchNotice.do?page="+page;
	}


	//상세보기에서 삭제
	@RequestMapping("/board/deleteNotice.do")
	public String deleteNotice(HttpServletRequest request, HttpServletResponse response, ModelMap model, int page) throws Exception {

		Map paramMap = super.getParameterMap(request, true);

		boardService.deleteBbs(paramMap);

		return "redirect:/board/searchNotice.do?page="+page;
	}



	// QNA 상세보기
	@RequestMapping("/board/selectQNA.do")
	public String selectQNA(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		int bbsNo=Integer.parseInt(request.getParameter("bbsNo"));
		int page=Integer.parseInt(request.getParameter("page"));

		//조회수+1
		boardService.viewPlus(paramMap);

		//게시글정보가져오기
		BoardDomain boardDomain = boardService.SelectBbs(bbsNo);
		System.out.println("selectQNA 제목 :"+boardDomain.getBbsSubject());

		boardDomain.setBbsCont(boardDomain.getBbsCont().replaceAll("&lt;", "<").replaceAll("&gt;", ">"));

		model.addAttribute("bd", boardDomain);
		model.addAttribute("page", page);

		return "/board/viewQNA";
	}
	//
	//	@RequestMapping("/board/deleteQNA.do")
	//	public String deleteQNA(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
	//		
	//	}
	//	
	//	@RequestMapping("/board/deleteQNAs.do")
	//	public String deleteQNAs(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
	//		
	//	}
	//	
	//	
	// QNA폼으로 이동
	@RequestMapping("/board/insertQNA.do")
	public String insertQNA(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		return "/board/insertformQNA";
	}

	// QNA 등록하기
	@RequestMapping("/board/insertQNAs.do")
	public String insertQNAs(HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {

		Map paramMap = super.getParameterMap(request, true);
		if (paramMap == null)
			return "redirect:/login.do";
		if (!paramMap.get("gsRoleId").equals("ROLE_AUTH_SYS"))
			return "redirect:/main.do";

		BoardDomain boardDomain = new BoardDomain();
		BeanUtils.copyProperties(paramMap, boardDomain);

		paramMap.put("bbsKind", this.BBS_TYPE_B03); // 게시판종류
		paramMap.put("register", paramMap.get("gsUserId"));// 로그인한 사람 -가입자 admin,user 구분하는거

		Map boardMap = boardService.insertBoardMap(paramMap, boardDomain);

		model.addAttribute("model", boardDomain);
		model.addAttribute("boardMap", boardMap);

		return "redirect:/board/searchQNA.do";
	}

	//	
	//	@RequestMapping("/board/updateQNA.do")
	//	public String updateQNA(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
	//		
	//	}
	//	
	//	@RequestMapping("/board/qnaIsPriv.do")
	//	public ModelAndView qnaIsPriv(HttpServletRequest request, ModelMap model) throws Exception {
	//		
	//	}
	//	
	//	

	// ******************************************************************************************************//
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Default Values Setting
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
	// ******************************************************************************************************//

}
