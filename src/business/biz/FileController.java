package business.biz;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import common.base.BaseController;
import common.file.FileManager;
import common.util.CommUtils;
import common.util.FileUtil;
import common.util.properties.ApplicationProperty;
import egovframework.rte.fdl.cmmn.exception.EgovBizException;

/**
 * Program Name : FileController Description : Common File Management Programmer
 * Name : ntarget Creation Date : 2017-01-05 Used Table :
 */

@Controller
@SuppressWarnings("all")
public class FileController extends BaseController {

	@Resource(name = "fileManager")
	FileManager fileManager;

	@Autowired
	FileService fileService;

	/**
	 * File Upload
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws EgovBizException
	 * @throws Exception
	 */
	@RequestMapping("/comm/fileUpload.do")
	public void fileUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List listFile = new ArrayList();

		// 파일 멀티로 받음
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();

		String tempDir = ApplicationProperty.get("upload.temp.dir");

		// 디렉토리 생성
		FileUtil.makeDirectories(tempDir);

		// 파일이름이 중복되면 spring에서 에러가 나므로 각각 다른 이름으로 받음
		for (int i = 0; i < files.size(); i++) {
			String upfileName = "upfile" + i;
			MultipartFile inFile = files.get(upfileName);

			String saveFileName = fileManager.getFileName(tempDir, inFile.getOriginalFilename());

			// 가능 확장자 체크
			if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(),
					ApplicationProperty.get("file.all.allow.exts")))
				throw new EgovBizException(
						"[" + inFile.getOriginalFilename() + "]" + message.getMessage("fail.common.notExtFile"));

			FileOutputStream fos = null;

			try {
				fos = new FileOutputStream(tempDir + "/" + saveFileName);

				// 파일을 폴더에 저장함
				FileUtil.copyFile(inFile.getInputStream(), fos);

				HashMap fmap = new HashMap();
				fmap.put(upfileName, saveFileName);
				fmap.put("tempDir", tempDir);

				listFile.add(fmap);

			} catch (FileNotFoundException e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} catch (IOException e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} catch (Exception e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} finally {
				fos.close();
			}
		}
		
		// 파일이름을 세션에 저장
		request.getSession().setAttribute("FILELIST", listFile);
	}
	/**
	 * File Upload
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws EgovBizException
	 * @throws Exception
	 */
	@RequestMapping("/comm/excelUpload.do")
	public void excelUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List listFile = new ArrayList();
		// 분기 계산
		Calendar currentCalendar = Calendar.getInstance();
		int month = currentCalendar.get(Calendar.MONTH)+1;		
		int quarter = (int) Math.ceil(month / 3.0);
		// 파일 멀티로 받음
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();

		String tempDir = ApplicationProperty.get("upload.excel.dir");

		// 디렉토리 생성
		FileUtil.makeDirectories(tempDir);

		// 파일이름이 중복되면 spring에서 에러가 나므로 각각 다른 이름으로 받음
		for (int i = 0; i < files.size(); i++) {
			String upfileName = "upfile" + i;
			MultipartFile inFile = files.get(upfileName);

			String saveFileName = fileManager.getFileName(tempDir, inFile.getOriginalFilename());

			// 가능 확장자 체크
			if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(),
					ApplicationProperty.get("file.excel.allow.exts")))
				throw new EgovBizException(
						"[" + inFile.getOriginalFilename() + "]" + message.getMessage("fail.common.notExtFile"));

			FileOutputStream fos = null;

			try {
				fos = new FileOutputStream(tempDir + "/" + saveFileName);

				// 파일을 폴더에 저장함
				FileUtil.copyFile(inFile.getInputStream(), fos);

				HashMap fmap = new HashMap();
				fmap.put(upfileName, saveFileName);
				fmap.put("tempDir", tempDir);

				listFile.add(fmap);

			} catch (FileNotFoundException e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} catch (IOException e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} catch (Exception e) {
				response.setStatus(500);
				throw new RuntimeException(e);
			} finally {
				fos.close();
			}
		}
		
		// 파일이름을 세션에 저장
		request.getSession().setAttribute("FILELIST", listFile);
	}

	/**
	 * File Download
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/comm/fileDownload.do")
	public void fileDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Integer fileNo = Integer.parseInt(request.getParameter("fileNo"));

		Map params = new HashMap();
		params.put("fileNo", fileNo);

		String saveFileName = "";
		String serverDirPath = "";
		String orgFileName = "";

		Map fileInfo = fileService.viewFile(params);

		fileDownloadDetail(request, response, fileInfo);
	}

	/**
	 * File Download(시스템 소개 -사용자, 운영자 메뉴얼 다운로드)
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/comm/fileManualDownload.do")
	public void fileManualDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String fileName = request.getParameter("fileName");
		String fileDir = ApplicationProperty.get("manual.down.dir");

		Map fileInfo = new HashMap();

		fileInfo.put("fileSvrNm", fileName);
		fileInfo.put("filePath", fileDir);
		fileInfo.put("fileOrgNm", fileName);

		fileDownloadDetail(request, response, fileInfo);
	}

	/**
	 * File Download(구조동물목록, 생물자원현황)
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/comm/exclDownload.do")
	public void exclDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {

//    	JSONObject jsonObj = (JSONObject)
		String fnmNumList = ((String) request.getParameter("fnmRuleNum"));
		// 여기부분 체크 
		String[] list = fnmNumList.split(",");
		List<Map> fileList = new ArrayList<Map>();

		for (String fnmRuleNumString : list) {
			Integer fnmRuleNum = Integer.parseInt(fnmRuleNumString);

			Map params = new HashMap();
			params.put("fnmRuleNum", fnmRuleNum);

			String saveFileName = "";
			String serverDirPath = "";
			String orgFileName = "";

			fileList.add(fileService.viewFileForExcel(params));

		}
		if(fileList.size() > 1) {
			multiFileDownloadDetail(request, response, fileList);
		} else if (fileList.size() == 1) {
			fileDownloadDetail(request, response, (Map)fileList.get(0));
		}
		
	}

	/**
	 * 파일 다운로드 상세내용 (파일정보를 map 객체로 전달받아 처리.
	 * 
	 * @param request
	 * @param response
	 * @param fileInfo
	 * @throws Exception
	 */
	public void fileDownloadDetail(HttpServletRequest request, HttpServletResponse response, Map fileInfo)
			throws Exception {
		String saveFileName = "";
		String serverDirPath = "";
		String orgFileName = "";

		if (fileInfo != null) {
			saveFileName = (String) fileInfo.get("fileSvrNm");
			serverDirPath = (String) fileInfo.get("filePath");
			orgFileName = (String) fileInfo.get("fileOrgNm");
		} else {
			logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
			throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다.");
		}

		// 실제 디렉토리
		String realDir = ApplicationProperty.get("upload.real.dir");
		// 파일 풀경로 가져옴
		String fullFileName = serverDirPath + "/" + saveFileName;

		// 파일을 orgFileName의 이름으로 다운로드 함
		File f = new File(fullFileName);
		if (f.exists()) {
			logger.info("response charset : " + response.getCharacterEncoding());

			// 파일명 인코딩 처리
			String downFilename = CommUtils.downFileName(request.getHeader("User-Agent"), orgFileName);
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downFilename + "\"");
			response.setHeader("Content-Transfer-Encoding", "binary;");

			byte[] buffer = new byte[1024];
			BufferedInputStream ins = new BufferedInputStream(new FileInputStream(f));
			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());

			try {
				int read = 0;
				while ((read = ins.read(buffer)) != -1) {
					outs.write(buffer, 0, read);
				}
				outs.close();
				ins.close();
			} catch (IOException e) {
				logger.info("$$$$$$$$$$$$$$$$$  : FILE DOWNLOAD ERROR : $$$$$$$$$$$$$$$$$$");
			} finally {
				if (outs != null)
					outs.close();
				if (ins != null)
					ins.close();
			}
		} else {
			logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
			throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다..");
		}
	}

	public void multiFileDownloadDetail(HttpServletRequest request, HttpServletResponse response, List<Map> fileList)
			throws Exception {

		String saveFileName = "";
		String serverDirPath = "";
		String orgFileName = "";
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ZipOutputStream zipFile = new ZipOutputStream(baos);
		
		for(Map fileInfo : fileList) {
			if (fileInfo != null) {
				saveFileName = (String) fileInfo.get("fileSvrNm");
				serverDirPath = (String) fileInfo.get("filePath");
				orgFileName = (String) fileInfo.get("fileOrgNm");
			} else {
				logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
				throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다.");
			}

			// 실제 디렉토리
			String realDir = ApplicationProperty.get("upload.real.dir");
			// 파일 풀경로 가져옴
			String fullFileName = serverDirPath + "/" + saveFileName;

			// 파일을 orgFileName의 이름으로 다운로드 함
			File f = new File(fullFileName);
			if (f.exists()) {

				// 파일명 인코딩 처리
				String downFilename = CommUtils.downFileName(request.getHeader("User-Agent"), orgFileName);
				zipFile.putNextEntry(new ZipEntry(downFilename));
				zipFile.closeEntry();
			}else {
				logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
				throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다..");
			}
		}
		zipFile.finish();
		response.setContentType("APPLICATION/DOWNLOAD");
		response.setHeader("Content-disposition", "attachment; filename=\"ZippedFile.zip\"");
		ServletOutputStream souts = response.getOutputStream();
		try {
			souts.write(baos.toByteArray());
		} catch (IOException e) {
			logger.info("$$$$$$$$$$$$$$$$$  : FILE DOWNLOAD ERROR : $$$$$$$$$$$$$$$$$$");
		} finally {
			if(souts != null) souts.close();
		}
		
		
//		if (fileInfo != null) {
//			saveFileName = (String) fileInfo.get("fileSvrNm");
//			serverDirPath = (String) fileInfo.get("filePath");
//			orgFileName = (String) fileInfo.get("fileOrgNm");
//		} else {
//			logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
//			throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다.");
//		}
//
//		// 실제 디렉토리
//		String realDir = ApplicationProperty.get("upload.real.dir");
//		// 파일 풀경로 가져옴
//		String fullFileName = serverDirPath + "/" + saveFileName;
//
//		// 파일을 orgFileName의 이름으로 다운로드 함
//		File f = new File(fullFileName);
//		if (f.exists()) {
//			logger.info("response charset : " + response.getCharacterEncoding());
//
//			// 파일명 인코딩 처리
//			String downFilename = CommUtils.downFileName(request.getHeader("User-Agent"), orgFileName);
//			response.setContentType("application/octet-stream");
//			response.setHeader("Content-Disposition", "attachment; filename=\"" + downFilename + "\"");
//			response.setHeader("Content-Transfer-Encoding", "binary;");
//
//			byte[] buffer = new byte[1024];
//			BufferedInputStream ins = new BufferedInputStream(new FileInputStream(f));
//			BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
//
//			try {
//				int read = 0;
//				while ((read = ins.read(buffer)) != -1) {
//					outs.write(buffer, 0, read);
//				}
//				outs.close();
//				ins.close();
//			} catch (IOException e) {
//				logger.info("$$$$$$$$$$$$$$$$$  : FILE DOWNLOAD ERROR : $$$$$$$$$$$$$$$$$$");
//			} finally {
//				if (outs != null)
//					outs.close();
//				if (ins != null)
//					ins.close();
//			}
//		} else {
//			logger.info("$$$$$$$$$$$$$$$$$  FILE DOWNLOAD ERROR : Not Server File.");
//			throw new EgovBizException("첨부파일이 존재하지 않습니다. 관리자에게 문의바랍니다..");
//		}

	}

	/**
	 * File size 체크 (20Mb 이하만 올릴수 있도록 설정)
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("/comm/fileSizeCheck.do")
	private ModelAndView fileSizeCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView mav = new ModelAndView();

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();

		HashMap fmap = new HashMap();

		int maxFileSize = FILE_SIZE * 1024 * 1024; // 20MB

		for (int i = 0; i < files.size(); i++) {

			String upfileName = "upfile" + i;
			MultipartFile inFile = files.get(upfileName);

			try {
				if (inFile.getSize() > maxFileSize) {
					fmap.put("flag", "false");
				} else {
					fmap.put("flag", "true");
				}

			} catch (Exception e) {
				throw new RuntimeException(e);
			} finally {
				logger.debug("파일 크기는 ::::: " + inFile.getSize());
			}
		}

		logger.debug("File Upload End !!!");

		mav.addObject("AJAX_MODEL", fmap);
		mav.setViewName(ajaxView);
		return mav;
	}

	/**
	 * File Upload
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	@RequestMapping("/comm/editorfileUpload.do")
	private ModelAndView editorfileUpload(HttpServletRequest request, HttpServletResponse response) throws Exception {

		List listFile = new ArrayList();

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();
		String tempDir = ApplicationProperty.get("upload.img.dir");

		String[] arrPermFileViewFg = null;

		logger.debug("File Directory Create !!!");

		FileUtil.makeDirectories(tempDir);

		String saveFileName = "";
		int nWidth = 0;
		int nHeight = 0;
		for (int i = 0; i < files.size(); i++) {

			String upfileName = "upfile" + i;
			MultipartFile inFile = files.get(upfileName);

			if (inFile != null) {
				saveFileName = fileManager.getFileName(tempDir, inFile.getOriginalFilename());
			}

			// 가능 확장자 체크
			if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(),
					ApplicationProperty.get("file.all.allow.exts")))
				throw new EgovBizException(
						"[" + inFile.getOriginalFilename() + "]" + message.getMessage("fail.common.notExtFile"));

			FileOutputStream fos = null;

			try {
				logger.debug("File Upload !!!");

				if (!saveFileName.equals("")) {

					fos = new FileOutputStream(tempDir + saveFileName);

					FileUtil.copyFile(inFile.getInputStream(), fos);

					HashMap fmap = new HashMap();
					fmap.put("fileSvrNm", saveFileName);
					fmap.put("fileOrgNm", CommUtils.nvlTrim(inFile.getOriginalFilename()));
					fmap.put("tempDir", tempDir);
					fmap.put("fileSize", inFile.getSize());
					fmap.put("idx", String.valueOf(i));

					File file = new File(tempDir + saveFileName);
					BufferedImage bi = ImageIO.read(file);
					logger.info(bi.getWidth() + "," + bi.getHeight());

					int width = bi.getWidth();
					int height = bi.getHeight();
					int maxWidth = 640;
					int maxHeight = 320;

					if (width > maxWidth) {
						float widthRatio = maxWidth / (float) width;
						nWidth = (int) (width * widthRatio);
						nHeight = (int) (height * widthRatio);
					}
					if (height > maxHeight) {
						float heightRatio = maxHeight / (float) height;
						nWidth = (int) (width * heightRatio);
						nHeight = (int) (height * heightRatio);
					}
				}
			} catch (FileNotFoundException e) {
				throw new RuntimeException(e);
			} catch (IOException e) {
				throw new RuntimeException(e);
			} catch (Exception e) {
				throw new RuntimeException(e);
			} finally {
				fos.close();
			}
		}

		logger.debug("File Upload End !!!");

		String callback_func = (String) request.getParameter("callback_func");

		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + saveFileName + "\"");
		response.setHeader("Content-Transfer-Encoding", "binary;");

		logger.info(">>>>> NoticeManageService.fileupload END <<<<<");

		return new ModelAndView("redirect:/se2/popup/quick_photo/callback.jsp?callback_func=" + callback_func
				+ "&bNewLine=true&sFileName=" + saveFileName + "&sFileURL=/editorImg/" + saveFileName + "&nWidth="
				+ nWidth + "&nHeight=" + nHeight);
	}

}
