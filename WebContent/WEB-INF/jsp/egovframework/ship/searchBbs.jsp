<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<%@ include file ="../header.jsp" %>
	
	<app:layout mode="stylescript" type="normal" />
	<script>
	$(document).ready(function() {

		$(".content").addClass("boardList_notice");

	});
</script>
	


</head>

<body>

<app:layout mode="header" />

<h1>공지사항</h1>

<div class="inner list_normal">

		
			
			
			<!-- 검색 -->
			<form class = "form-">
			<div class="search_box">
				<div class="type4 inputWrap">
				
					<select id="searchType" class="searchType"  name = "searchType"title="검색">					
						<option value="all">전체</option>
						<option value="title">제목</option>
						<option value="content">내용</option>
					</select>
					
					
					<!-- 					<select name="searchType" id="searchType"> -->
					<!-- 						<option value="title">제목</option> -->
					<!-- 						<option value="content">내용</option> -->
					<!-- 					</select> -->
					<div>
					
						<input  type ="text" class="searchCont" name="searchCont" id="searchCont" 
							maxlength="30"  title="검색어"  />
							
						<!-- 						<input type="text" id="searchCont"name="searchCont" value="" placeholder="검색어를 입력하세요"> -->
					</div>
				</div>
				<div class="btn inputWrap add_del">
					
					<c:if test="${usrRole eq 'ROLE_AUTH_SYS'}">
						<a href="#void" class="del" alt="삭제" title="삭제">삭제</a> 
						<a href="#void" class="add" alt="추가" title="추가">추가</a> 
					</c:if>
					<c:if test="${usrRole eq 'ROLE_MOIS'}">
						<a href="#void" class="del" alt="삭제" title="삭제">삭제</a> 
						<a href="#void" class="add" alt="추가" title="추가">추가</a> 
					</c:if>
<%-- 					<c:if test="${usrRole eq 'ROLE_RELT_ORG'}"> --%>
<!-- 						<a href="#void" class="del" alt="삭제" title="삭제">삭제</a>  -->
<!-- 						<a href="#void" class="add" alt="추가" title="추가">추가</a>  -->
<%-- 					</c:if> --%>
<%-- 					<c:if test="${usrRole eq 'ROLE_MOIS'}"> --%>
<!-- 						<a href="#void" class="del" alt="삭제" title="삭제">삭제</a>  -->
<!-- 						<a href="#void" class="add" alt="추가" title="추가">추가</a>  -->
<%-- 					</c:if> --%>
<%-- 					<c:if test="${usrRole eq 'ROLE_KLID'}"> --%>
<!-- 						<a href="#void" class="del" alt="삭제" title="삭제">삭제</a>  -->
<!-- 						<a href="#void" class="add" alt="추가" title="추가">추가</a>  -->
<%-- 					</c:if> --%>
					<a href="javascript:fn_search(1)" class="search" alt="조회" title="조회">조회</a>
				</div>
			</div>
			<!-- //검색 -->


			<div class="head">
				<div class="checks">
					<input type="checkbox" id="chk_num" name="ckall"> <label
						for="chk_num">전체선택 / 해제</label>
				</div>

				<div class="nowPage">
					전체 : 1  현재 : 1 / 1 페이지
					
					
				</div>

			</div>

			<!-- 목록 -->
			<div class="list">
				<ul>
					<c:set var="totalSize">${totalSize}</c:set>
					<c:set var="pageSize">${pageSize}</c:set>
					<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set>
				
<%-- 							<c:forEach items="${fileList}" var="item"> --%>
						<li>
							<div class="checks">
								<input type="checkbox" id="chk_num ${notice.bbsNo}"
									name="ck" value="${notice .bbsNo}"> <label
									for="chk_num ${notice.bbsNo}">1</label>
							</div>
							<div class="info">
								<a href="javascript:selectNotice('${notice .bbsNo }');"
									title="">공지사항입니다.</a>
								<p>
									<span>작성자 : 관리자</span><span>작성일 :
										2020-05-20</span><span>조회 : 1</span>
<!-- 										 <span -->
<!-- 										class="fileWrap">  -->
<%-- 										<c:if test="${not empty item}"> --%>
<!-- 											<span class="fileWrap">  -->
<!-- 												<a -->
<%-- 													href="javascript:download('<c:out value="${item.fileNo }"/>')"><img --%>
<!-- 													src="/drone/images/common/icon_file.png" alt="첨부파일 아이콘"> -->
<%-- 													<c:out value="${item.fileOrgNm}" /></a> --%>

<!-- 											</span> -->
<%-- 										</c:if>  --%>

<!-- 									</span> -->
								</p>
							</div>
						</li>
						
						<li>
							<div class="checks">
								<input type="checkbox" id="chk_num ${notice.bbsNo}"
									name="ck" value="${notice .bbsNo}"> <label
									for="chk_num ${notice.bbsNo}">2</label>
							</div>
							<div class="info">
								<a href="javascript:selectNotice('${notice .bbsNo }');"
									title="">공지사항입니다.</a>
								<p>
									<span>작성자 : 관리자</span><span>작성일 :
										2020-05-20</span><span>조회 : 1</span>
<!-- 										 <span -->
<!-- 										class="fileWrap">  -->
<%-- 										<c:if test="${not empty item}"> --%>
<!-- 											<span class="fileWrap">  -->
<!-- 												<a -->
<%-- 													href="javascript:download('<c:out value="${item.fileNo }"/>')"><img --%>
<!-- 													src="/drone/images/common/icon_file.png" alt="첨부파일 아이콘"> -->
<%-- 													<c:out value="${item.fileOrgNm}" /></a> --%>

<!-- 											</span> -->
<%-- 										</c:if>  --%>

<!-- 									</span> -->
								</p>
							</div>
						</li>
						
						<li>
							<div class="checks">
								<input type="checkbox" id="chk_num ${notice.bbsNo}"
									name="ck" value="${notice .bbsNo}"> <label
									for="chk_num ${notice.bbsNo}">3</label>
							</div>
							<div class="info">
								<a href="javascript:selectNotice('${notice .bbsNo }');"
									title="">공지사항입니다.</a>
								<p>
									<span>작성자 : 관리자</span><span>작성일 :
										2020-05-20</span><span>조회 : 1</span>
<!-- 										 <span -->
<!-- 										class="fileWrap">  -->
<%-- 										<c:if test="${not empty item}"> --%>
<!-- 											<span class="fileWrap">  -->
<!-- 												<a -->
<%-- 													href="javascript:download('<c:out value="${item.fileNo }"/>')"><img --%>
<!-- 													src="/drone/images/common/icon_file.png" alt="첨부파일 아이콘"> -->
<%-- 													<c:out value="${item.fileOrgNm}" /></a> --%>

<!-- 											</span> -->
<%-- 										</c:if>  --%>

<!-- 									</span> -->
								</p>
							</div>
						</li>
						


<%-- 							</c:forEach> --%>
					
				</ul>
			</div>
		</form>
	</div>

	<!-- 페이징 -->
	<app:paging name="pageList" jsFunction="fn_search" />
	<!-- //페이징 -->






	<!-- 삭제 -->
	<div class="layerPop_del">
		<div>
			<div class="wrap">
				<a href="#void"><img src="/drone/images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">게시글을 삭제하시겠습니까?</p>
					<ul>
						<li><a href="#void" id="btnDelete">Yes</a></li>
						<li><a href="#void" id="btnCancel">No</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>



	<!-- 공지사항 추가 -->
	<div class="layerPop_add">
		<script type="text/javascript">
			_ALLOWED_FILE_EXTS = '<c:out value="${paramMap.allowedFileExts}"/>';
		</script>
		<div>
			<div class="wrap">
				<a href="#void"><img src="/drone/images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">공지사항 작성</p>
					<form id=insert method="post" enctype="multipart/form-data">
						<input type="hidden" name="docuType" value="B01"> <input
							type="hidden" name="atthType" value="B01">
						<div class="notice">
							<div class="subject">제목</div>
							<div class="inputWrap">
								
								<input type="text" id="bbsS" name="bbsSubject"
									placeholder="제목을 입력하세요" title="제목">
									
							</div>
							<div class="subject">글내용</div>
							<div class="inputWrap">
							
								<textarea name="bbsCont" id="bbsC" title="내용">
								
						</textarea>
						
							</div>
							<div class="subject">첨부파일</div>
							<div class="inputWrap filebox">
							
								<input type="text" name="fileNum"
									class="upload-name input_normal" value="파일선택" disabled="" title="파일선택">
									
								<label for="fileName">찾아보기</label> <input type="file"
									name="upfile" id="fileName" class="upload-hidden input_normal"
									value="파일선택">
							</div>
						</div>
						<div class="save">
							<a href="javascript:insertNotice()">저장</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<app:layout mode="footer" type="normal" />


		

</div>
</body>
</html>