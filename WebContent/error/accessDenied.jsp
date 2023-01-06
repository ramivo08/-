<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ACCESS DENIED ERROR 를 표시하는 화면이다.                               	--%>
<%--                                                                       	--%>
<%-- @author                                                               	--%>
<%-- @version 1.0 2017/03/07                                               	--%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html lang="ko">
<head>
<%@ include file ="/WEB-INF/jsp/egovframework/header.jsp" %>
<title><spring:message code="title.sysname"/></title>
<app:layout mode="stylescript" type="normal" /><!-- style & javascript layout -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/error.css"/>
</head>

<body>

<header>
	<div class="gnb">
		<h1><a href="${pageContext.request.contextPath}/index.jsp" title="드론배달점 통합관리시스템">
			<img src="${pageContext.request.contextPath}/images/common/logo.png" alt="한국지역정보개발원"></a></h1>
	</div>
</header>

<section class="container box">
	<div class="con_wrap">
		<div class="error">
			<div>
				<img src="${pageContext.request.contextPath}/images/common/i_h3.png" alt="Access Denied">
				<span>ACCESS DENIED</span>
				<p>해당 화면에 접근할 수 있는 권한이 없습니다. 관리자에게 문의 바랍니다.</p>
			</div>
		</div>
		<div class="btnWrap">
			<a class="btn lg bg_gray" href="#void" onclick="history.back()">이전 페이지로 돌아가기</a>
		</div>
	</div>
</section>

</body>
</html>

