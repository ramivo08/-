<%
 /****************************************************************************************
***	ID				: listRoleByProg.jsp
***	Title			: 롤(권한)별 프로그램 관리
***	Description		: 롤(권한)별 프로그램 관리 화면
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
	            <form:select path="roleId" cssClass="" cssStyle="width:300px;" title="권한 선택">
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
		<p class="mark_title">권한 프로그램리스트</p>
		<table style="margin:0px 0 0px 0px;">
		<caption class="caption_none">권한적용 프로그램 리스트</caption>
			<colgroup>
				<col style="width:20px;">
				<col style="">
				<col style="width:20px;">
			</colgroup>
			<thead>
				<tr>
					<th scope="col"><input type="checkbox" name="allCheck" title="권한적용 프로그램 삭제 전체선택"/></th>
					<th scope="col">프로그램명</th>
					<th scope="col"></th>
				</tr>
			</thead>
		</table>

		<div id="Layer1" class="listContents2">
			<table>
			<caption class="caption_none">권한적용 프로그램 리스트</caption>
				<colgroup>
					<col style="width:20px;">
					<col style="">
				</colgroup>
				<tbody>
				<c:forEach var="data" items="${list}" varStatus="state">
					<tr>
						<td><input name="arrRoleProgId" type="checkbox" value="${data.progId}" title="<c:out value="${data.progNm}"/> 프로그램 삭제 선택"/></td>
						<td class="left"><c:out value="${data.progNm}"/></td>
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
			<p class="mark_title">프로그램리스트</p>
			<table style="margin:0px 0 0px 0px;">
			<caption class="caption_none">프로그램 리스트</caption>
				<colgroup>
					<col style="width:20px;">
					<col style="">
					<col style="width:70px;">
					<col style="width:20px;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col"><input type="checkbox" name="allNotCheck" title="권한적용 프로그램 추가 전체선택"/></th>
						<th scope="col">프로그램명</th>
						<th scope="col">권한사용</th>
						<th scope="col"></th>
					</tr>
				</thead>
			</table>

			<div id="Layer2" class="listContents2">
				<table>
				<caption class="caption_none">프로그램 리스트</caption>
					<colgroup>
						<col style="width:20px;">
						<col style="">
						<col style="width:70px;">
					</colgroup>
					<tbody>
					<c:forEach var="data" items="${notList}" varStatus="state">
						<tr>
							<td><input name="arrProgId" type="checkbox" value="${data.progId}" title="<c:out value="${data.progNm}"/> 멘슈 추가 선택"/></td>
							<td class="left"><c:out value="${data.progNm}"/></td>
							<td>
								<c:if test="${data.isAdded eq 'Y'}">사용</c:if>
								<c:if test="${data.isAdded ne 'Y'}">-</c:if>
							</td>
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

	<br>

	<div style="position:absolute !important; margin-top:500px; padding:0px 0px 0px 0px;">
		<ul class="">
		    <li>
		    	<span>권한사용 : [사용] 해당 프로그램이 다른 권한에 적용된 프로그램이면 권한체크 대상이 됨.</span><br>
		    	<span style="padding:0px 0px 0px 55px">[-] 어떤 권한에도 포함되지 않은 프로그램으로서 권한체크 대상에서 제외됨.</span>
		    </li>
		</ul>
	</div>
</div>



<!-- ======================= 중앙내용 종료 ====================== -->

<app:layout mode="footer" type="normal"/>

</body>
</html>
