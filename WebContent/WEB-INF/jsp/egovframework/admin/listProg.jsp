<%
 /****************************************************************************************
***	ID				: listProg.jsp
***	Title			: 프로그램 관리
***	Description		: 프로그램 관리 화면
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
	.con_search {font-size:13px; line-height:1.2;}
</style>
</head>

<body id="top">

<app:layout mode="header" />

<!-- ======================= 중앙내용 시작 ====================== -->
<div class="con_search community">
	<!-- 상세검색 -->
	<div class="searchbox">
		<div class="box2">
			<form:form commandName="model" name="form1" id="form1" method="post" >
			<form:hidden path="page"/>
				<p><span style="width:80px">프로그램명</span>
				<form:input path="srchProgNm" maxlength="50" cssStyle="width:300px;" title="프로그램명"/>
				<a class="btn bg_sky i_search" href="#void"><span id="srchBtn">검색</span></a>
			</form:form>
		</div>
	</div>
	<div class="top_btn2">
		<span id="openRegiBtn"><a class="btn bg_blue i_apply" href="#void" ><span>신규등록</span></a></span>
	</div>

	<table style="margin:0px 0 0px 0px;">
	<caption class="caption_none">프로그램 목록</caption>
		<colgroup>
			<col style="width:120px;">
			<col style="width:250px;">
			<col style="">
			<col style="width:130px;">
			<col style="width:20px;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col">프로그램ID</th>
				<th scope="col">프로그램명</th>
				<th scope="col">프로그램URL</th>
				<th scope="col">연결 메뉴ID</th>
				<th scope="col"></th>
			</tr>
		</thead>
	</table>

	<div class="listContents">
		<table>
		<caption class="caption_none">프로그램 목록</caption>
			<colgroup>
				<col style="width:120px">
				<col style="width:250px">
				<col style="">
				<col style="width:130px">
			</colgroup>
			<tbody>
			<c:forEach var="data" items="${list}" varStatus="state">
				<tr>
					<td class="left"><c:out value="${data.progId}"/></td>
					<td class="left"><a href="#none" onclick="goOpenRegi('${data.progId}');"><c:out value="${data.progNm}"/></a></td>
					<td class="left"><c:out value="${data.progPattern}"/></td>
					<td class="left"><c:out value="${data.menuId}"/></td>
				</tr>
			</c:forEach>
			</tbody>
		</table>
	</div>
</div>

<div class="h10"></div>

<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
