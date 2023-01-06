<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<%@ include file="../header.jsp"%>
<app:layout mode="stylescript" type="normal" />
</head>
<body id="top">

	<app:layout mode="header" />

	<form:form commandName="model" id="model" method="post">

		<!-- 검색 조건 -->
		<form:hidden path="page" id="page" />
		<form:hidden path="searchCond" id="searchCond" />
		<form:hidden path="searchWord" id="searchWord" />
		<!-- 게시판 타입 -->
		<form:hidden path="bbsType" id="bbsType" />
		<!-- 게시판 No -->
		<input type="hidden" name="bbsNo" id="bbsNo"
			value="${resultView.bbsNo }" />
		<!-- 댓글 페이징 -->
		<input type="hidden" name="page" id="page"  value='<c:out value="${paramMap.page}"/>'/>
		

		<!-- ********** contents ********** -->
		<div class="contents">

			<div class="con">
				<!-- Table -->
				<table class="th_top_left_01">
					<colgroup>
						<col width="15%">
						<col width="50%">
						<col width="15%">
						<col width="20%">
					</colgroup>
					<tbody>
						<tr class="top">
							<th class="leftNoLine">제목</th>
							<td class="rightNoLine"><c:out
									value="${resultView.bbsSubject }" /></td>
							<th>작성일</th>
							<td class="rightNoLine"><c:out
									value="${resultView.regiDate }" /></td>
						</tr>
						<tr class="bottom">
							<th class="leftNoLine">작성자</th>
							<td><c:out value="${resultView.userNm }" /></td>
							<th>조회수</th>
							<td class="rightNoLine"><c:out
									value="${resultView.viewCnt }" /></td>
						</tr>
						<tr class="bottom">
							<td colspan="4" class="view_con"><pre
									style="background-color: white;">
									<c:out value="${resultView.bbsCont }" />
								</pre></td>
						</tr>
						<c:if test="${not empty resultView.fileList}">
							<tr>
								<th class="leftNoLine">첨부파일</th>
								<td colspan="3" class="file"><c:forEach
										items="${resultView.fileList }" var="item" varStatus="idx">
										<a href="javascript:download('<c:out value="${item.fileNo}"/>');">
											<img src="${pageContext.request.contextPath}/images/common/file.png" alt="첨부파일 아이콘"><span>${item.fileOrgNm }</span>
										</a>
									</c:forEach></td>
							</tr>
						</c:if>
					</tbody>
				</table>
				
				<c:if test="${modelMap.bbsType eq 'B06' }">
					
					<div class="container">
					
						<h2 style="margin-top: 30px;">댓글 ${totalNo }건</h2>
						
						<div class="container-fluid" style="margin-top: 28px;">
						
						<c:if test="${modelMap.gsRoleId eq 'ROLE_AUTH_SYS' || modelMap.gsRoleId eq 'ROLE_NIER'}">
							<div class="row">
								<textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5" style="margin-top: 15px;"></textarea>
							</div>
							<div class="row">
								<a class="btn i_save bg_blue" href="#" style="float: right; margin-top: 20px;"><span id="_icommenttBtn">등록</span></a>
							</div>
						</c:if>
						<div class="row" id="comment_ResultDiv">
							<c:forEach var="item" items="${pageList}" varStatus="state">
								<input type="hidden" value="<c:out value="${item.bbsNo}" />" name="CommentNo" id="CommentNo"/>
								<hr>
								<c:out value="${item.regiId }" /> | <c:out value="${item.regiDate }" /><br/>
								<span style="color:black; margin-top: 20px;"><c:out value="${item.bbsCont}" /></span>
								<c:if test="${modelMap.gsRoleId eq 'ROLE_AUTH_SYS' || modelMap.gsRoleId eq 'ROLE_NIER'}">
									<span class="btn btn-inverse" style="margin-left:700px;" id="_dcommenttBtn"><i class="icon-white icon-trash"></i></span>
								</c:if><br/>
							</c:forEach>
						</div>
						<div id="nav" class="text-center">
							<app:paging name="pageList" jsFunction="fn_search" />
						</div>
							<div class="h30"></div>
						</div>
					</div>
				</c:if>


				<table class="th_top_left_01" style="border-top: 1px solid #ddd;">
					<colgroup>
						<col width="15%">
						<col width="50%">
						<col width="15%">
						<col width="20%">
					</colgroup>
					<tbody>
						<tr>
							<th class="view_b_up">이전글</th>
							<td colspan="3">
								<c:if test="${not empty resultView.preTitle }">
									<a href="#link" onclick="doView('<c:out value="${resultView.preSeq}"/>')"><c:out value="${resultView.preTitle }" /></a>
								</c:if>
								<c:if test="${empty resultView.preTitle }">
				   					이전글이 없습니다.
				   				</c:if>
				   			</td>
						</tr>
						<tr class="bottom">
							<th class="view_b_down">다음글</th>
							<td colspan="3">
							<c:if test="${not empty resultView.nextTitle }">
								<a href="#link" onclick="doView('<c:out value="${resultView.nextSeq}"/>')"><c:out value="${resultView.nextTitle }" /></a>
							</c:if>
							<c:if test="${empty resultView.nextTitle }">
			   					다음글이 없습니다.
			   				</c:if></td>
						</tr>
					</tbody>
				</table>
				<!-- //Table-->
				
				<div class="align_r">
					<c:if test="${resultView.regiId eq modelMap.gsUserId or modelMap.gsRoleId eq 'ROLE_AUTH_SYS'  }">
						<c:if test="${resultView.regiId eq modelMap.gsUserId}">
							<a class="btn i_modify bg_green" href="#"><span id="_openUpdtBtn">수정</span></a>
						</c:if>
						<a class="btn i_delete bg_pink" href="#void"><span id="_delBtn">삭제</span></a>
					</c:if>
					<a class="btn i_list bg_gray" href="#"><span id="_goListBtn">목록</span></a>
				</div>

			</div>
			<!-- //con -->
		</div>
		<!-- /contents-->


	</form:form>

	<app:layout mode="footer" type="normal" />

</body>
</html>