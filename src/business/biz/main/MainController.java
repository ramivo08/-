package business.biz.main;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import business.biz.CSVService;
import business.biz.ExcelService;
import business.biz.FileService;
import business.biz.board.BoardService;
import business.biz.comm.CommService;
import business.biz.main.domain.MainDomain;
import common.base.BaseController;
import common.file.FileManager;

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


@Controller
@SuppressWarnings({ "rawtypes", "unused"})
public class MainController extends BaseController {

    @Autowired
    private CommService  commService;
    @Autowired
    private MainService  mainService;
    @Autowired
    private	BoardService boardService;
    @Autowired
    private ExcelService  excelService;
    @Autowired
    private CSVService  csvService;
    @Autowired
    private FileService fileService;
    @Resource(name="fileManager")
    FileManager fileManager;
    
    
    protected static final String BBS_TYPE_B01 = "BW1"; // 공지사항(Notice)
	protected static final String BBS_TYPE_B02 = "BW2"; // 자주묻는 질문(FAQ)
	protected static final String BBS_TYPE_B03 = "BW3"; // Q&A(Q&A)



    /**
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/main.do")
    public String main(HttpServletRequest request, ModelMap model)
    throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");	
		// Request Parameter Values Setting
		Map paramMap = getParameterMap(request, true);
		if (paramMap == null) {
			return "redirect:/login.do";			
			
		}else {
			
			return "main/main";
			
			
		}
		
    }
	
	

  
	
	

}

