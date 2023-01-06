<%
 /****************************************************************************************
***	ID				: searchFAQMgmt.jsp
***	Title			: FAQ 관리
***	Description		: FAQ 관리 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2019-10-31					NJS					First Coding.
*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
	<%@ include file ="../header.jsp" %>
	<app:layout mode="stylescript" type="normal" />
</head>

<body>

<app:layout mode="header" />

	<form:form commandName="model" id="model" method="post">
		<form:hidden path="page" />
		<div class="titWrap">
			<div class="subject">
				<form:select path="searchCond">
					<form:option value="subject">아이디</form:option>
				</form:select>
			</div>
			<div class="textInput"><form:input path="searchWord" /></div>
			<div class="search" id="btnSearch"><a href="#void">조회</a></div>
		</div>
		
		<!-- 리스트 -->
		<div class="list_faq">
			<ul class="infoWrap">
				<li>
					<ul>
						<li>번호</li>
						<li>아이디</li>
						<li>최근 접속 일자</li>
						<li>IP</li>
						<li>페이지URL</li>
					</ul>
				</li>
				<c:forEach items="${pageList }" var="item" varStatus="status">
					<li>
						<ul>
							<li>${item.rNum }</li>
							<li><a href="javascript:viewFaq(${item.logOrd })">${item.userId }</a></li>
							<li>${item.logDt }</li>
							<li>${item.logIp }</li>
							<li>${item.conUrl }</li>
						</ul>
					</li>
				</c:forEach>
			
			</ul>
		</div>		<!-- //end list_faq -->
		
		<!-- 페이징 -->
		<app:paging name="pageList" jsFunction="fn_search"/>
		<!-- //페이징 -->
		
	</form:form>

<!-- 삭제 -->
<div class="layerPop_del">
	<div>
		<div class="wrap">
			<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
			<div class="con">
				<p class="tit">선택된 <span id="delNum"></span>개의 해당 FAQ를 삭제하시겠습니까?</p>
				<ul>
					<li><a href="#void" id="btnDelete">Yes</a></li>
					<li><a href="#void" id="btnCancel">No</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- FAQ 추가 -->
<form name="insert_model" id="insert_model" method="post" enctype="multipart/form-data">
	<div class="layerPop_add">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">FAQ 작성</p>
					<div class="adminPop">
						<div class="subject">FAQ 제목</div>
						<div class="inputWrap">
							<input type="text" name="bbsSubject" placeholder="자주묻는 질문 제목">
						</div>
						<div class="subject">FAQ 답변</div>
						<div class="inputWrap">
							<textarea name="bbsCont"></textarea>
						</div>
					</div>
					<div class="save">
						<a href="#void" id="btnSave">저장</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>


<!-- FAQ 수정 -->
<form name="update_model" id="update_model" method="post" enctype="multipart/form-data">
	<input type="hidden" name="bbsNo" value="" />
	<div class="layerPop_modify">
		<div>
			<div class="wrap">
				<a href="#void"><img src="../images/common/icon_x.png" alt=""></a>
				<div class="con">
					<p class="tit">FAQ 질문</p>
					<div class="adminPop">
						<div class="subject">FAQ 제목</div>
						<div class="inputWrap">
							<input type="text" name="bbsSubject" value="">
						</div>
						<div class="subject">FAQ 답변</div>
						<div class="inputWrap">
							<textarea name="bbsCont"></textarea>
						</div>
						<div class="subject">공개 여부</div>
						<div class="inputWrap radio">
							<input type="radio" name="openYn" value="Y">
							<label for="yes">Y</label>
							<input type="radio" name="openYn" value="N">
							<label for="no">N</label>
						</div>
					</div>
					<div class="save">
						<a href="#void" id="btnUpdate">저장</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>

<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
