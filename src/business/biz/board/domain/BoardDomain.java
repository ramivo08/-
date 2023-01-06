package business.biz.board.domain;

public class BoardDomain {
	
	private String page;			// 페이징 수
	
	private String parentBbsNo;		// 부모 게시판 번호
	
	private String searchCond;		// 검색 조건
	private String searchWord;		// 검색어
	
	private String bbsNo;			// 게시판 번호	
	private String bbsType;  		// 게시판 구분
	
	private String bbsKind;			// 게사판 종류 
	private String docuKind;		// 문서종류
	
	private String bbsSubject;		// 게시판 제목
	private String bbsCont;			// 게시판 내용
	
	private String viewCnt;			// 조회수
	private String openYn;			// 공개여부
	private String delYn;			// 삭제여부
	
	private String register;		// 등록자
	private String rgsDe;			// 등록일자
	private String updusr;			// 수정자 아이디
	private String updDe;			// 수정일시
	
	private String searchType;		// 검색조건

	private String searchCont;		// 검색내용
	private String password;
	private String uprBbsNo;
	private String privYn;
	private String faqCategory;
	
	private String rNum; //Rownum
	
	//파일업로드
//	MultipartFile upload;
//	
//	
//	public MultipartFile getUpload() {
//		return upload;
//	}
//	public void setUpload(MultipartFile upload) {
//		this.upload = upload;
//	}
//	
	
	
	public String getrNum() {
		return rNum;
	}
	public void setrNum(String rNum) {
		this.rNum = rNum;
	}
	public String getUprBbsNo() {
		return uprBbsNo;
	}
	public void setUprBbsNo(String uprBbsNo) {
		this.uprBbsNo = uprBbsNo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getParentBssNo() {
		return parentBbsNo;
	}
	public void setParentBssNo(String parentBssNo) {
		this.parentBbsNo = parentBssNo;
	}
	public String getSearchCond() {
		return searchCond;
	}
	public void setSearchCond(String searchCond) {
		this.searchCond = searchCond;
	}
	public String getSearchWord() {
		return searchWord;
	}
	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}
	public String getBbsNo() {
		return bbsNo;
	}
	public void setBbsNo(String bbsNo) {
		this.bbsNo = bbsNo;
	}
	public String getBbsType() {
		return bbsType;
	}
	public void setBbsType(String bbsType) {
		this.bbsType = bbsType;
	}
	public String getBbsKind() {
		return bbsKind;
	}
	public void setBbsKind(String bbsKind) {
		this.bbsKind = bbsKind;
	}
	public String getDocuKind() {
		return docuKind;
	}
	public void setDocuKind(String docuKind) {
		this.docuKind = docuKind;
	}
	public String getBbsSubject() {
		return bbsSubject;
	}
	public void setBbsSubject(String bbsSubject) {
		this.bbsSubject = bbsSubject;
	}
	public String getBbsCont() {
		return bbsCont;
	}
	public void setBbsCont(String bbsCont) {
		this.bbsCont = bbsCont;
	}
	public String getViewCnt() {
		return viewCnt;
	}
	public void setViewCnt(String viewCnt) {
		this.viewCnt = viewCnt;
	}
	public String getOpenYn() {
		return openYn;
	}
	public void setOpenYn(String openYn) {
		this.openYn = openYn;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
	public String getRegister() {
		return register;
	}
	public void setRegister(String register) {
		this.register = register;
	}
	public String getRgsDe() {
		return rgsDe;
	}
	public void setRgsDe(String rgsDe) {
		this.rgsDe = rgsDe;
	}
	public String getUpdusr() {
		return updusr;
	}
	public void setUpdusr(String updusr) {
		this.updusr = updusr;
	}
	public String getUpdDe() {
		return updDe;
	}
	public void setUpdDe(String updDe) {
		this.updDe = updDe;
	}
	public String getParentBbsNo() {
		return parentBbsNo;
	}
	public void setParentBbsNo(String parentBbsNo) {
		this.parentBbsNo = parentBbsNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getSearchCont() {
		return searchCont;
	}
	public void setSearchCont(String searchCont) {
		this.searchCont = searchCont;
	}
	public String getPrivYn() {
		return privYn;
	}
	public void setPrivYn(String privYn) {
		this.privYn = privYn;
	}
	public String getFAQCategory() {
		return faqCategory;
	}
	public void setFAQCategory(String faqCategory) {
		this.faqCategory = faqCategory;
	}
	


	
	
}
