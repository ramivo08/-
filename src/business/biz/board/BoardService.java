package business.biz.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import business.biz.FileService;
import business.biz.board.domain.BoardDomain;
import commf.dao.CommonDAOImpl;
import common.base.BaseService;
import common.util.paging.PaginatedArrayList;


@Service
//@SuppressWarnings({"rawtypes"})
public class BoardService extends BaseService {

	@Autowired
	private CommonDAOImpl dao;

	public PaginatedArrayList searchNotice(Map paramMap, int currPage, int pageSize) throws Exception {
		PaginatedArrayList list = dao.pageList("Board.listBbs", paramMap, currPage, pageSize);
		return list;
	}

	/*
	 * public List searchList(Map paramMap) { return dao.list("Board.listBbs",
	 * paramMap); }
	 */

	//	public BoardDomain selectList(Map paramMap) {
	//		if((Boolean)dao.select("Board.isPrivate", paramMap)) {
	//			if(!(Boolean)dao.select("Board.checkPwd", paramMap)) {
	//				return null;
	//			}
	//		}
	//		dao.update("Board.viewPlus", paramMap);
	//		return (BoardDomain) dao.select("Board.selectBbs", paramMap);
	//	}

	public PaginatedArrayList searchFAQ(Map paramMap, int currPage, int pageSize) {
		PaginatedArrayList list = dao.pageList("Board.listFAQ", paramMap, currPage, pageSize);
		return list;
	}
	
	//QNA 리스트
	public PaginatedArrayList searchQNA(Map paramMap, int currPage, int pageSize) {
		PaginatedArrayList list = dao.pageList("Board.listQNA", paramMap, currPage, pageSize);
		return list;
	}
	

	// 상세보기
	public BoardDomain SelectBbs(int bbsNo) {
		System.out.println("SelectBbs");
		BoardDomain bd=(BoardDomain)dao.select("Board.selectBbs",bbsNo);
		System.out.println("bd:"+bd);
		return bd;
	}



	public boolean updateBbs(Map paramMap) {
	      return dao.update("Board.updateBbs", paramMap) == 1 ? true : false;
	   }

	public boolean isPrivate(Map paramMap) {
		return (Boolean)dao.select("Board.isPrivate", paramMap);
	}

	public boolean insertBbs(Map paramMap) {
		try {
			dao.insert("Board.insertBbs", paramMap);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

	public boolean deleteBbsList(Map paramMap) {
		return dao.delete("Board.deleteBbsList", paramMap) > 0 ? true : false;
	}

	public boolean deleteBbs(Map paramMap) {
		return dao.update("Board.deleteBbs", paramMap) == 1 ? true : false;
	}

	public List listFAQ(Map paramMap) {
		return dao.list("Board.listFAQ", paramMap);
	}

	public List getFAQCategoryList() {
		return dao.list("Board.getFAQCategoryList");
	}

	public boolean addFAQ(Map paramMap) {
		try {
			dao.insert("Board.addFAQ", paramMap);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

	public int selectBbsNo() {
		// TODO Auto-generated method stub
		return (int) dao.select("Board.selectBbsNo");
	}

	public Map selectBoardMap(Map paramMap) {
		
		Map resultMap = new HashMap<String,Object>();
		
		dao.select("Board.selectBoardMap",paramMap, resultMap);
		return resultMap;
	}

	/* 공지사항 글등록하기 */
	   public Map insertBoardMap(Map paramMap, BoardDomain boardDomain) {
	      System.out.println("insert");
	      dao.insert("Board.insertBbs", paramMap); // int로 리턴되며, 처리행수가 반환됨. insert into ~~ 성공하면 1, 실패하면 0
	      System.out.println("등록하기: "+paramMap);
	      return paramMap;
	   }
	   
	 //파일업로드 관련
	   public int selectCurrentBbsNo() {
		      return (int) dao.select("Board.selectCurrentBbsNo");
		   }
	
	
	/* 공지사항 수정하기 */
	public void updateNotice(BoardDomain boardDomain) {
		
		System.out.println("updateNotice BbsNo:"+boardDomain.getBbsNo());
		System.out.println("updateNotice BbsSubject:"+boardDomain.getBbsSubject());
		System.out.println("updateNotice BbsCont:"+boardDomain.getBbsCont());
		
		dao.update("Board.updateNotice", boardDomain);
		
		System.out.println("업데이트 완료");
	}

	
	/* 공지사항 조회수 */
	public void viewPlus(Map paramMap) {
		dao.update("Board.viewPlus", paramMap);
	}
	
	
}
