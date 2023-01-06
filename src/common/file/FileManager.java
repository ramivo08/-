package common.file;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import commf.exception.BusinessException;
import commf.message.Message;
import common.util.CommUtils;
import common.util.FileUtil;
import common.util.properties.ApplicationProperty;
import egovframework.rte.fdl.cmmn.exception.EgovBizException;

/**
 * Program Name    : File Manager
 * Description     : Common File Management
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

@SuppressWarnings("all")
public class FileManager {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 빈 파일 객체를 호함하여 리스트를 리턴한다.
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@RequestMapping
	public List multiFileUpload(HttpServletRequest request) throws Exception {
	    // 빈 file정보는 포함하지 않고 리턴.
	    return multiFileUploadDetail(request, false);
	}
	
	/**
	 * 개체별 검사항목 (다중-다중) 빈 파일 객체를 포함하여 리스트를 리턴한다.
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping
	public List pomo_multiFileUpload(HttpServletRequest request, Map paramMap) throws Exception {
		// 빈 file정보는 포함하지 않고 리턴.
		return pomo_multiFileUploadDetail(request, paramMap, false);
	}

    /*입력정보 파일*/
    @RequestMapping
    private List multiFileUploadDetail(HttpServletRequest request, boolean isInsertEmptyFileInfo) throws Exception {
    	
            List listFile = new ArrayList();

            if (-1 >= request.getContentType().indexOf("multipart/form-data")) {
                return null;
            }
            String upfileName = "upfile";
            
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            List<MultipartFile> files = multipartRequest.getFiles(upfileName);

            String tempDir = ApplicationProperty.get("upload.temp.dir");
            logger.debug("File Directory Create !!! " + tempDir);

            FileUtil.makeDirectories(tempDir);

            for(MultipartFile mf : files) {
                logger.debug(upfileName, mf);
                String saveFileName = getFileName(tempDir, mf.getOriginalFilename());

        		// 가능 확장자 체크
        		if (!CommUtils.isAtthAllowedFileType(mf.getOriginalFilename(), ApplicationProperty.get("file.all.allow.exts")))
        			throw new EgovBizException("["+mf.getOriginalFilename()+"]"+(String)Message.getMessage("fail.common.notExtFile"));

                if (!saveFileName.equals("")) {
                   	FileOutputStream fos = null;
       	            try {
       	                logger.debug("File Upload !!!");
       	                fos = new FileOutputStream(tempDir + saveFileName);
       					FileUtil.copyFile(mf.getInputStream(), fos);

                        HashMap fmap = new HashMap();
                        fmap.put("fileSvrNm", saveFileName);
                        fmap.put("fileOrgNm", CommUtils.nvlTrim(mf.getOriginalFilename()) );
                        fmap.put("tempDir"  , tempDir);
                        fmap.put("fileSize" , mf.getSize());
                        listFile.add(fmap);
                        logger.debug("FileDir : " + tempDir + " File Origin Name : " + CommUtils.nvlTrim(mf.getOriginalFilename()) + " File Sever Name : " + saveFileName);
       	            } catch (FileNotFoundException e) {
       	                throw new RuntimeException(e);
       	            } catch (IOException e) {
       	                throw new RuntimeException(e);
       	            } catch (Exception e) {
       	                throw new RuntimeException(e);
       	            } finally {
       	            	
       	            	fos.close();
       	            }
                } else {
                    if(isInsertEmptyFileInfo) {
                        listFile.add(new HashMap());
                    }
                }
            }
            
            logger.debug("File Upload End !!!");

            return listFile;
    }
    
    
    /* 개체별 검사항목 (다중-다중) 입력정보 파일*/
    @RequestMapping
    private List pomo_multiFileUploadDetail(HttpServletRequest request, Map paramMap, boolean isInsertEmptyFileInfo) throws Exception {
    	
    	List listFile = new ArrayList();
    	
    	if (-1 >= request.getContentType().indexOf("multipart/form-data")) {
    		return null;
    	}
    	
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
    	Map<String, MultipartFile> files = multipartRequest.getFileMap();
    	
    	String tempDir = ApplicationProperty.get("upload.temp.dir");
    	
    	logger.debug("File Directory Create !!!");
    	
    	FileUtil.makeDirectories(tempDir);
    	
    	int pomoLength = Integer.parseInt((String)paramMap.get("pomoLength"));
    	
    	if(pomoLength > 0){
    		for (int o = 1; o < pomoLength+1; o++) {
    			
    			String pomoOpnnNo = (String)paramMap.get("pomoOpnnNo"+o);
    			
    			
    			int fileSize = Integer.parseInt((String)paramMap.get("fileSize"+o));
    			
    			for (int i = 0; i < fileSize; i++) {
//    			for (int i = 0; i < files.size(); i++) {
    				String upfileName = "upfile"+o + i;
    				
    				MultipartFile inFile = files.get(upfileName);
    				String saveFileName = getFileName(tempDir, inFile.getOriginalFilename());
    				
    				// 가능 확장자 체크
    				if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(), ApplicationProperty.get("file.all.allow.exts")))
    					throw new EgovBizException("["+inFile.getOriginalFilename()+"]"+(String)Message.getMessage("fail.common.notExtFile"));
    				
    				if (!saveFileName.equals("")) {
    					FileOutputStream fos = null;
    					
    					try {
    						logger.debug("File Upload !!!");
    						
    						fos = new FileOutputStream(tempDir + saveFileName);
    						FileUtil.copyFile(inFile.getInputStream(), fos);
    						
    						HashMap fmap = new HashMap();
    						fmap.put("rootNo", pomoOpnnNo);
    						fmap.put("fileSvrNm", saveFileName);
    						fmap.put("fileOrgNm", CommUtils.nvlTrim(inFile.getOriginalFilename()) );
    						fmap.put("tempDir"  , tempDir);
    						fmap.put("fileSize" , inFile.getSize());
    						fmap.put("idx"      , String.valueOf(i));
    						
    						listFile.add(fmap);
    						
    					} catch (FileNotFoundException e) {
    						throw new RuntimeException(e);
    					} catch (IOException e) {
    						throw new RuntimeException(e);
    					} catch (Exception e) {
    						throw new RuntimeException(e);
    					} finally {
    						fos.close();
    					}
    				} else {
    					// isInsertEmptyFileInfo이 true이면 빈 파일정보를 empty hashmap으로 추가.
    					if(isInsertEmptyFileInfo) {
    						listFile.add(new HashMap());
    					}
    				}
    			}
    			
    		}
    	}
    	
    	
    	logger.debug("File Upload End !!!");
    	
    	return listFile;
    }



	/**
	 * File Upload
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	public Map makeFileMap(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map fmap = new HashMap();

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();

		String excelDir = ApplicationProperty.get("upload.temp.dir");

		logger.debug("File Directory Create !!!");

		FileUtil.makeDirectories(excelDir);

		String upfileName = "upfile";
		MultipartFile inFile = files.get(upfileName);
		// 확장자체크
		String document = inFile.getOriginalFilename().substring(inFile.getOriginalFilename().lastIndexOf("."));
		System.out.println("확장자 :             " + document);
		String saveFileName = getFileName(excelDir, inFile.getOriginalFilename());

		// 가능 확장자 체크
		if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(), ApplicationProperty.get("file.all.allow.exts")))
			throw new EgovBizException("["+inFile.getOriginalFilename()+"]"+(String)Message.getMessage("fail.common.notExtFile"));

		FileOutputStream fos = null;

		try {
			fos = new FileOutputStream(excelDir + saveFileName);
			FileUtil.copyFile(inFile.getInputStream(), fos);

			fmap.put("inFile", 		inFile.getInputStream());
			fmap.put("fileNm", 		saveFileName);
			fmap.put("excelDir", 	excelDir);

		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			fos.close();
		}

		return fmap;
	}
	
	
	
	/**
	 * 선박 정보입력 파일 업로드
	 * File Upload
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws Exception
	 */
	public Map makeFileProof(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map fmap = new HashMap();

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = multipartRequest.getFileMap();
		
		String proofDir = ApplicationProperty.get("upload.proof.dir");
		logger.debug("Proof #@! ");
		logger.debug("File Directory Create !!!");

		FileUtil.makeDirectories(proofDir);
		
		String upfileName = "upfile";
		MultipartFile inFile = files.get(upfileName);
		// 확장자체크
		String document = inFile.getOriginalFilename().substring(inFile.getOriginalFilename().lastIndexOf("."));
		System.out.println("확장자 :             " + document);
		String saveFileName = getFileName(proofDir, inFile.getOriginalFilename());

		// 가능 확장자 체크
		if (!CommUtils.isAtthAllowedFileType(inFile.getOriginalFilename(), ApplicationProperty.get("file.all.allow.exts")))
			throw new EgovBizException("["+inFile.getOriginalFilename()+"]"+(String)Message.getMessage("fail.common.notExtFile"));

		FileOutputStream fos = null;

		try {
			fos = new FileOutputStream(proofDir + saveFileName);
			FileUtil.copyFile(inFile.getInputStream(), fos);

			fmap.put("inFile", 		inFile.getInputStream());
			fmap.put("fileNm", 		saveFileName);
			fmap.put("proofDir", 	proofDir);

		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			fos.close();
		}

		return fmap;
	}

	

	/**
	 * @param dir
	 * @param originalFileName
	 * @return
	 * @author purple
	 */
	public String getFileName(String dir, String originalFileName) {
		if (CommUtils.nvlTrim(originalFileName).equals(""))
			return "";

		String dotextension = originalFileName.substring(originalFileName.lastIndexOf("."));
		java.io.File currentPath = new java.io.File(dir);
		String[] fileList = null;

		Random random = new Random(System.currentTimeMillis());
		FileNameFilter fileNameFilter = new FileNameFilter();

		StringBuffer sb = null;
		do {
			sb = new StringBuffer();
			sb.append(String.valueOf(System.currentTimeMillis()));
			sb.append(String.valueOf(random.nextLong()));
			sb.append(dotextension);
			fileNameFilter.setFileName(sb.toString());

			fileList = currentPath.list(fileNameFilter);
		} while (fileList.length > 0);

		return sb.toString();
	}

	/**
	 * @author purple
	 */
	static class FileNameFilter implements FilenameFilter {
		String sFileName = null;

		public void setFileName(String sFileName) {
			this.sFileName = sFileName;
		}

		public boolean accept(java.io.File directory, String name) {
			if (name.equals(sFileName)) {
				return true;
			}
			return false;
		}
	}
}

