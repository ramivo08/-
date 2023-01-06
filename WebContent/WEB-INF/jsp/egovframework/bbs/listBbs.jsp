<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
</head>

<body id="top">

	<app:layout mode="header" />

	<form:form commandName="model" name="model" id="model" method="post" >
		<form:hidden path="page" id="page"/>
		<form:hidden path="bbsType" id="bbsType"/>
		<input type="hidden" name="bbsNo" id="bbsNo"/>

		<div class="con community">
			<div class="searchbox">
				<div class="box1">
					<p><span>검색조건</span>
						<form:select path="searchCond" cssClass="w15" title="검색조건">
							<form:option value="" label="">==선택==</form:option>
							<form:option value="title" label="title">제목</form:option>
							<form:option value="content" label="content">내용</form:option>
						</form:select>
						<form:input path="searchWord" cssClass="w50" placeholder="검색어를 입력하세요." title="검색어"/>
						<a class="btn i_search bg_sky" href="javascript:fn_search(1);" ><span>조회</span></a>
					</p>
				</div>
			</div>
			
			<div id="bbsDiv"></div>
			
			<div class="under_btn">
				<c:if test="${modelMap.gsRoleId eq 'ROLE_AUTH_SYS' || (modelMap.bbsType eq 'B06' && (!empty(modelMap.gsRoleId) && modelMap.gsRoleId ne 'ROLE_RESTRICTED')) }" >
					<a class="btn bg_blue i_apply" href="javascript:doRegi();"><span>글쓰기</span></a>
				</c:if>
			</div>
			
			<div class="h5"></div>
			
			<c:if test="${modelMap.bbsType eq 'B05' }">
				<div class="under_btn">
					<a class="btn bg_green i_up" target="_blank;" href="http://www.qia.go.kr/livestock/clean/listwebQiaCom.do?type=1_5hwwsdx&clear=1"><span>농림축산검역본부</span></a>
				</div>
			</c:if>

		</div>

	</form:form>

	<app:layout mode="footer" type="normal"/>
</body>
</html>
