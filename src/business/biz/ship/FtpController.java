/**
 * Program Name    : CommController
 * Description     : Common Process
 * Programmer Name : ntarget
 * Creation Date   : 2017-01-09
 * Used Table      :
 */

package business.biz.ship;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.Utils;
import common.base.BaseController;
import common.file.FileManager;

@Controller
@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
public class FtpController extends BaseController {

	@Autowired
	private Utils utils;

	@Autowired
	private ShipService shipService;

	@Autowired
	private ExcelService excelService;
	@Autowired
	private CSVService csvService;
	@Autowired
	private FileService fileService;
	@Resource(name = "fileManager")
	FileManager fileManager;


	@RequestMapping("/ship/viewReciveFtp.do")
//	@ResponseBody
	public ModelAndView viewReciveFtp(HttpServletRequest request, ModelMap model,HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null) {
			mv.setViewName("redirect:/login.do");
			return mv;
		}
		
		//csv 반환용
		 List<List<String>> ret = new ArrayList<List<String>>();

		
		 // 파일 정보를 위한 리스트 변수
        List<String> files = new ArrayList<>();
        // 디렉토리 정보를 위한 리스트 변수
        List<String> directories = new ArrayList<>();
		File file = null;
		String[] ftpDir = {"isabuho","NK","onNuri"};
		String[] nkDir =null;
		String[] isabuDir =null;
		String[] onnuriDir =null;
	
//		String rootPath = "Z:\\ftptest";
		FTPClient client = new FTPClient();
		// ftp root dir List ex(nk,isabu,onuri)

		try {
			client.setControlEncoding("UTF-8");
			// ftp://localhost에 접속한다.
			client.connect("hw.koast.tech", 20021);
			// 접속을 확읺나다.
			int resultCode = client.getReplyCode();
			System.out.println("resultCode"+resultCode);
			// 접속시 에러가 나오면 콘솔에 에러 메시지를 표시하고 프로그램을 종료한다.
			  if (!FTPReply.isPositiveCompletion(resultCode)) {
			        System.out.println("FTP server refused connection!(x)");
			        
			  } else {
		        // 파일 전송간 접속 딜레이 설정 (1ms 단위기 때문에 1000이면 1초)
		        client.setSoTimeout(1000);
		        // 로그인을 한다.
			        if (!client.login("bwmsdata", "bwms12#$")) {
			          // 로그인을 실패하면 프로그램을 종료한다.
			        	System.out.println("Login Error!");
			        }else {
			        	System.out.println("Login success");
			        }
			   
			        try {
			        	client.enterLocalPassiveMode();
//			        	if(client.listNames() == null) {
//
//			        		return;
//
//			        	}
			        	System.out.println("listName : " + client.listNames());
			        	System.out.println("printWorking"+  client.printWorkingDirectory());
			        	ftpDir = client.listNames();
			        	mv.addObject("ftpDir", ftpDir);	
			        	
			        
			            // FTP에서 파일 리스트와 디렉토리 정보를 취득한다.
//			            if (getFileList(client, File.separator, files, directories)) {
//			            	for (int i = 0; i < files.size(); i++) {
//			            		System.out.println(files);	
//							}
//			            	for (int i = 0; i < directories.size(); i++) {
//			            		System.out.println(directories);	
//							}
//			            	
//			            }
			        	
			        	
			        	client.changeWorkingDirectory("NK");
			        	nkDir = client.listNames();
	        	    	mv.addObject("nkDir", nkDir);
	        	    	
	        	    	
	        	    	client.changeToParentDirectory();
	        	    	System.out.println("작업 dir" + client.printWorkingDirectory() );
	        	       	client.changeWorkingDirectory("isabuho");
			        	isabuDir = client.listNames();
			        	mv.addObject("isabuDir", isabuDir);
			        	
			        	client.changeToParentDirectory();
			        	client.changeWorkingDirectory("onNuri");
			        	onnuriDir = client.listNames();
			        	mv.addObject("onnuriDir", onnuriDir);
			        	
			        	
			        }catch(IOException e) {
			        	System.out.println("서버로 부터 파일 리스트를 가져오지 못했습니다.");
			        }
			        
			        //워킹디렉토리 바꾸기
			        
//			        client.changeWorkingDirectory(pathname)
			        
			        
		      }
			  
			  
			
		}catch(Exception e){
			e.printStackTrace();
		}
		      
		mv.setViewName("ship/viewReciveFtp");		
		return mv;
	}
	
	
	@RequestMapping("/ftp/selectData.do")
//	@ResponseBody
	public ModelAndView selectData(HttpServletRequest request, ModelMap model,HttpServletResponse response) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null) {
			mv.setViewName("redirect:/login.do");
			return mv;
		}
		
		String fileNm = (String) paramMap.get("fileNm");
		String forderNm = (String) paramMap.get("forderNm");
		
		 List<List<String>> ret = new ArrayList<List<String>>();
		 // 파일 정보를 위한 리스트 변수
        List<String> files = new ArrayList<>();
        // 디렉토리 정보를 위한 리스트 변수
        List<String> directories = new ArrayList<>();
		File file = null;
		String[] ftpDir = null;
		String[] nkDir =null;
		String[] isabuDir =null;
		String[] onnuriDir =null;
	
//		String rootPath = "Z:\\ftptest";
		FTPClient client = new FTPClient();
		// ftp root dir List ex(nk,isabu,onuri)

		try {
			client.setControlEncoding("UTF-8");
			// ftp://localhost에 접속한다.
			client.connect("hw.koast.tech", 20021);
			// 접속을 확읺나다.
			int resultCode = client.getReplyCode();
			System.out.println("resultCode"+resultCode);
			// 접속시 에러가 나오면 콘솔에 에러 메시지를 표시하고 프로그램을 종료한다.
			  if (!FTPReply.isPositiveCompletion(resultCode)) {
			        System.out.println("FTP server refused connection!(x)");
			        
			  } else {
		        // 파일 전송간 접속 딜레이 설정 (1ms 단위기 때문에 1000이면 1초)
		        client.setSoTimeout(1000);
		        // 로그인을 한다.
			        if (!client.login("bwmsdata", "bwms12#$")) {
			          // 로그인을 실패하면 프로그램을 종료한다.
			        	System.out.println("Login Error!");
			        }else {
			        	System.out.println("Login success");
			        }
			   
			        try {
			        	client.enterLocalPassiveMode();
			        	client.changeWorkingDirectory(forderNm);
			        	InputStream is  = client.retrieveFileStream(fileNm);
					    ret = readCsv(is);
					    
					    mv.addObject("csvArray",ret);
			        }catch(IOException e) {
			        	System.out.println("서버로 부터 파일 리스트를 가져오지 못했습니다.");
			        }
			        
			        //워킹디렉토리 바꾸기
			        
//			        client.changeWorkingDirectory(pathname)
			        
			        
		      }
			  
			  
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		//csv 반환용
	
		 return mv;
	}
	
	  // FTP의 파일 리스트와 디렉토리 정보를 취득하는 함수.
	  private static boolean getFileList(FTPClient client, String cw, List<String> files, List<String> directories)
	      throws IOException {
	    // FTP의 디렉토리 커서를 이동한다.
	    if (client.changeWorkingDirectory(cw)) {
	      // 해당 디렉토리의 파일 리스트를 취득한다.
	      for (FTPFile file : client.listFiles()) {
	        // 리스트의 객체가 파일이면
	        if (file.isFile()) {
	          // files 리스트에 경로를 추가한다.
	          files.add(cw + file.getName());
	        } else {
	          // 디렉토리리면 함수의 재귀적 방식으로 하위 탐색을 시작한다.
	          if (!getFileList(client, cw + file.getName() + File.separator, files, directories)) {
	            return false;
	          } else {
	            // directories 리스트에 디렉토리 경로를 추가한다.
	            directories.add(cw + file.getName() + File.separator);
	          }
	        }
	      }
	      // 이건 FTP의 디렉토리 커서를 상위로 이동하는 함수입니다.(여기서는 사용하지 않았으나 자주 사용하는 함수입니다.)
	      // client.changeToParentDirectory();
	      // FTP의 디렉토리 커서를 이동한다.
	      return client.changeWorkingDirectory(File.separator);
	    }
	    // 커서 이동에 실패하면 false를 리턴한다.
	    return false;
	  }
	  
	  
	  public static  List<List<String>> readCsv(InputStream is) throws IOException {
		  List<List<String>> lls = new ArrayList<List<String>>();
		  
		
	      	InputStreamReader b = new InputStreamReader(is); 
	      	BufferedReader br = null;
	      	String line;
	      	String csvSplitBy = ",";
	        try{
				br = new BufferedReader(b);
	           //Charset.forName("UTF-8");
	         
	           
	           while((line = br.readLine()) != null){
	               //CSV 1행을 저장하는 리스트
	               List<String> tmpList = new ArrayList<String>();
	               String array[] = line.split(",");
	               //배열에서 리스트 반환
	               tmpList = Arrays.asList(array);
	               System.out.println(tmpList);
	               lls.add(tmpList);
	           }
	       }catch(FileNotFoundException e){
	           e.printStackTrace();
	       }catch(IOException e){
	           e.printStackTrace();
	       }finally{
	           try{
	               if(br != null){
	                   br.close();
	               }
	           }catch(IOException e){
	               e.printStackTrace();
	           }
	       }
	        return lls;
	 }
}
