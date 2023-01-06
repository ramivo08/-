<%
 /****************************************************************************************
***	ID				: listLoghist.jsp
***	Title			: 로그인 로그 리스트
***	Description		: 로그인 로그 리스트 화면
***
***	-----------------------------    Modified Log   --------------------------------------
***	ver				date					author					description
***  -----------------------------------------------------------------------------------------
***	1.0			2017-03-02					ntarget					First Coding.
*****************************************************************************************/
%>

<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" />
<style type="text/css" >
	.con_search {font-size:13px; line-height:1.2;}
</style>
</head>

<body id="top">

<app:layout mode="header" />

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="con_search community">
	<!-- 상세검색 -->
	<div class="searchbox2">
		<form:form commandName="model" name="form1" id="form1" method="post" >
		<form:hidden path="page"/>
			<span style="padding:0px 30px 0px 0px">기간</span>
			<form:input path="srchFromDate" cssClass="jcalendar-1 cal" readonly="false" title="검색 시작일자"/> ~
			<form:input path="srchToDate" cssClass="jcalendar-2 cal" readonly="false" title="검색 종료일자"/>
			<a class="btn bg_sky i_search" href="#void"><span id="srchBtn">검색</span></a>
		</form:form>
	</div>

	<!-- 로그 리스트 -->
	<table style="margin:20px 0 0px 0px;">
	<caption>로그 리스트</caption>
		<colgroup>
			<col style="width:60px;">
			<col style="">
			<col style="width:80px;">
			<col style="width:150px;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col">순번</th>
				<th scope="col">사용자 (ID)</th>
				<th scope="col">로그인횟수</th>
				<th scope="col">마지막 접속일</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach var="data" items="${pageList}" varStatus="state">
			<tr style="height:20px;">
				<td><c:out value="${state.count + startNo}"/></td>
				<td class="left"><c:out value="${data.userNm}"/> (<c:out value="${data.userId}"/>)</td>
				<td class="right"><c:out value="${data.cnt}"/></td>
				<td><c:out value="${data.lastDate}"/></td>
			</tr>
		</c:forEach>
		<c:if test="${fn:length(pageList) == 0}">
			<tr bgcolor="#EEF7FF">
				<td class="no_result" colspan="50" align="center"><spring:message code="exception.NoResult"/></td>
			</tr>
		</c:if>
		</tbody>
	</table>

	<div class="h20"></div>

	<!-- 페이징 -->
	<app:paging name="pageList" jsFunction="fn_search" />

</div>
<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
