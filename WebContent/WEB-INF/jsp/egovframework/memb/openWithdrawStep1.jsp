<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- @(#)openWithdrawStep1.jsp 1.0 2014/10/08                                   										  --%>
<%--                                                                       														  --%>
<%-- COPYRIGHT (C) 2014 SUNDOSOFT CO., INC.                                   												  --%>
<%-- ALL RIGHTS RESERVED.                                                 													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>

<%@ include file ="../header.jsp" %>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 회원탈퇴 1단계 - 약관 동의 페이지                                   												      --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2014/10/08                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- Title                                            													  						   	  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- style & javascript layout                                              													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<app:layout mode="stylescript" type="normal" />
</head>
<body id="top">
<div class="wrap">

<div class="memberBanner"><!-- ******************************** 메인배너 ****************************** -->
<!-- ==================== top header layout ==================== -->
<app:layout mode="header" />

<!-- ==================== 중앙내용 시작 ==================== -->
<form:form commandName="model" id="frm" name="frm" action="#" method="post">
	<!-- ********** contents ********** -->
	<div class="col-xs-9">
		<div class="contents login">
			<h3>회원탈퇴</h3>
			<h4>회원탈퇴 약관동의</h4>

			<div class="alert alertNoRadius overflow" style="padding: 30px; height: 350px;">
				회원탈퇴 안내사항
			</div>

			<table class="alertTable"><tr><td><div class="checkbox"><label><input type="checkbox" name="withdrawAgreeYn" id="withdrawAgreeYn" value="Y">위의 사항에 동의합니다. </label></div></td></tr></table>

			<div class="text-center" style="margin:50px;">
				<a class="btn btn-blue marginRright15" href="#" id="cfrmBtn"><i class="icon-ic_check"> </i>확인</a><a class="btn btn-red" href="#" id="cnclBtn"><i class="icon-ic_refresh"> </i>취소</a>
			</div>

		</div><!-- /contents-->
	</div><!-- /col-xs-9-->
</form:form>
<!-- ==================== 중앙내용 종료 ==================== -->


<!-- ==================== bottom footer layout ==================== -->
<app:layout mode="footer" type="normal"/>
</body>
</html>