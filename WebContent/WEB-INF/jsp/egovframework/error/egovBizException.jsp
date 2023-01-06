<%
 /****************************************************************************************
***	ID	: egovBizException.jsp
***	Title	: 전자정부 시스템 에러 페이지
***	Description   : 전자정부 시스템 에러 페이지
***
***	------------------    Modified Log   --------------------------------
***	ver	       date	author	description
***    --------------------------------------------------------------------
***	1.0	2019-10-24	NJS	First   Coding
*****************************************************************************************/
%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<html lang="ko">
<head>
<%@ include file ="../header.jsp" %>
<app:layout mode="stylescript" type="normal" /><!-- style & javascript layout -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/error.css"/>
<style>
 	header {height:130px;} 
 	.gnb {position: relative; width: 1000px; height: 80px; margin: 0 auto;}
 	.gnb h1 {position: absolute; margin-top: 23px;} 
 	.container {position: relative; width: 100%;} 
	.con_wrap {width: 1000px; margin: 0 auto; position: relative; overflow: hidden;}
	.btn {display:inline-block; border-radius: 3px; color: #fff !important; font-size:13px; text-align:center;}
	.lg {height: 40px; padding: 12px 15px;}
	.bg_gray {background-color: #666;}
</style>
</head>

<body>

<header>
	<div class="gnb">
		<h1><a href="${pageContext.request.contextPath}/index.jsp" title="주소기반의 드론배달점 통합관리시스템">
			<img src="${pageContext.request.contextPath}/images/common/logo.jpg" alt="주소기반의 드론배달점 통합관리시스템"></a></h1>
	</div>
</header>

<section class="container box">
	<div class="con_wrap">
		<div class="error">
			<div>
<%-- 				<img src="${pageContext.request.contextPath}/images/common/message_icon.png" alt="Exception"> --%>
				<span>MESSAGE</span>
				<p>${exception.message}</p>
			</div>
		</div>
		<div class="btnWrap">
			<a class="btn lg bg_gray" href="#void" onclick="history.back()">이전 페이지로 돌아가기</a>
		</div>
	</div>
</section>

</body>
</html>
