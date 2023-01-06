<%
 /****************************************************************************************
***	ID				: listRoleByMenu.jsp
***	Title			: 롤(권한)별 메뉴 관리
***	Description		: 롤(권한)별 메뉴 관리 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2017-02-23					ntarget					First Coding.
*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
<style type="text/css" >
	.con_search {font-size:12px; line-height:1.2;}
</style>
</head>

<body id="top">

<app:layout mode="header" />

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="con_search community">
	<form:form commandName="model" name="form1" id="form1" method="post" >

	<!-- 상세검색 -->
	<div class="searchbox">
		<div class="box2">
			<p><span style="width:80px">권한</span>
			<div class="w80">
	            <form:select path="roleId" cssClass="" cssStyle="width:300px;" multiple="false" title="권한 선택">
	 				<form:option value="" label="=== 선택하세요 ==="/>
	 				<form:options items="${roleList}"/>
				</form:select>
			</div>
			<a class="btn bg_sky i_search" href="#void"><span id="srchBtn">검색</span></a>
		</div>
	</div>
	<!-- // 상세검색 -->

	<div class="h30"></div>

	<div style="width:47%; float:left; margin-right:15px;">
		<p class="mark_title">권한 메뉴리스트</p>
		<table style="margin:0px 0 0px 0px;">
		<caption class="caption_none">권한적용 메뉴 리스트</caption>
			<colgroup>
				<col style="width:20px;">
				<col style="">
				<col style="width:20px;">
			</colgroup>
			<thead>
				<tr>
					<th scope="col"><input type="checkbox" name="allCheck" title="권한적용 메뉴 삭제 전체선택"/></th>
					<th scope="col">메뉴명</th>
					<th scope="col"></th>
				</tr>
			</thead>
		</table>

		<div id="Layer1" class="listContents2">
			<table>
			<caption class="caption_none">권한적용 메뉴 리스트</caption>
				<colgroup>
					<col style="width:20px;">
					<col style="">
				</colgroup>
				<tbody>
				<c:forEach var="data" items="${list}" varStatus="state">
					<tr>
						<td><input name="arrRoleMenuId" type="checkbox" value="${data.menuId}" title="<c:out value="${data.menuNm}"/> 메뉴 삭제 선택"/></td>
						<td class="left"><c:out value="${data.menuNm}"/></td>
					</tr>
				</c:forEach>
				<c:if test="${fn:length(list) == 0}">
					<tr>
						<td class="no_result" colspan="50" align="center"><spring:message code="exception.NoResult"/></td>
					</tr>
				</c:if>
				</tbody>
			</table>
		</div>
		</div>

		<div style="width:20px; float:left; margin-top:250px;">
			<span id="syncBtn"><a href="#none"><img src="${pageContext.request.contextPath}/images/synced.gif" alt="싱크 저장"></a></span>
		</div>

		<div style="width:47%; float:right;">
			<p class="mark_title">메뉴리스트</p>
			<table style="margin:0px 0 0px 0px;">
			<caption class="caption_none">메뉴 리스트</caption>
				<colgroup>
					<col style="width:20px;">
					<col style="">
					<col style="width:20px;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col"><input type="checkbox" name="allNotCheck" title="권한적용 메뉴 추가 전체선택"/></th>
						<th scope="col">메뉴명</th>
						<th scope="col"></th>
					</tr>
				</thead>
			</table>

			<div id="Layer2" class="listContents2">
				<table>
				<caption class="caption_none">메뉴 리스트</caption>
					<colgroup>
						<col style="width:20px;">
						<col style="">
					</colgroup>
					<tbody>
					<c:forEach var="data" items="${notList}" varStatus="state">
						<tr>
							<td><input name="arrMenuId" type="checkbox" value="${data.menuId}" title="<c:out value="${data.menuNm}"/> 멘슈 추가 선택"/></td>
							<td class="left"><c:out value="${data.menuNm}"/></td>
						</tr>
					</c:forEach>
					<c:if test="${fn:length(notList) == 0}">
						<tr>
							<td class="no_result" colspan="50" align="center"><spring:message code="exception.NoResult"/></td>
						</tr>
					</c:if>
					</tbody>
				</table>
			</div>
		</div>

	</form:form>
</div>

<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
