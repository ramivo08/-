<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld" %>


<table>
	<caption class="caption_none">게시글</caption>
	<colgroup>
		<col width="8%">
		<col width="">
		<col width="15%">
		<col width="12%">
		<col width="8%">
	</colgroup>
	<thead>
		<tr>
			<th>순번</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
		</tr>
	</thead>
	<tbody id="listBody">
		<c:forEach var="item" items="${pageList}" varStatus="state">
			<tr>
				<td><c:out value="${startNo-(state.count-1)}"/></td>
				<td class="left">
					<a href="#" onclick="javascript:doView('<c:out value="${item.bbsNo}"/>')"><c:out value="${item.bbsSubject}"/></a>
					<span>[<span style="color: black;">${item.commentCount}</span>]</span>
				</td>
				<td><c:out value="${item.userNm }"/></td>
				<td><c:out value="${item.regiDate }"/></td>
				<td><c:out value="${item.viewCnt }"/></td>
			</tr>
		</c:forEach>
	</tbody>
</table>


<div id="nav" class="text-center">
	<app:paging name="pageList" jsFunction="fn_search" />
</div>



