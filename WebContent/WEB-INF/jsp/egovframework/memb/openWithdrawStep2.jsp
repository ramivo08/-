<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- @(#)openWithdrawStep2.jsp 1.0 2014/10/08                                   										  --%>
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
<%-- 회원탈퇴 2단계 - 본인확인                                   												      		  --%>
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
<form:form commandName="model" id="frm" name="frm"  method="post">
	<!-- ********** contents ********** -->
	<div class="col-xs-9">
		<div class="contents login">
			<h3>회원탈퇴</h3>
			<h4>회원탈퇴 비밀번호 확인</h4>

			<h5>본인확인</h5>
			<div class="contentText">
				<p>회원탈퇴 시 본인확인을 위해 비밀번호를 한 번 더 입력해 주세요.</p>
			</div>
			<div >
				<img src="/img/login.png" width="340px" />

				<div class="alert pull-right" style="margin-bottom:200px;">
					<table class="loginTable" >
						<colgroup>
							<col style="width:90px;">
							<col style="width:280px;">
							<col style="width:50px;">
						</colgroup>
						<tbody>
							<tr>
								<td colspan="3" class="loginTitle ">
									Member <span class="text-center" >Edit</span>	<hr>
								</td>
							</tr>
							<tr>
								<th><i class="icon-ic_user_id "> </i>아이디</th>
								<td><input type="text" class="form-control input-sm" id="userId" name="userId" value="<c:out value="${map.gsUserId}"/>" maxlength="15" readonly="readonly"></td>
								<td rowspan="2"></td>
							</tr>
							<tr>
								<th><i class="icon-ic_password"> </i>비밀번호</th>
								<td><input type="password" class="form-control input-sm" id="passwd" name="passwd" value="" maxlength="12"></td>
							</tr>
							<tr>
								<td colspan="3"><hr style="margin-top: 10px;"></td>
							</tr>
							<tr>
								<td colspan="3" class="selectBtn text-center">
									<a class="btn btn-smBlue marginRright15" href="#" id="cfrmBtn"><i class="icon-ic_check"> </i>확인</a>
									<a class="btn btn-smRed" href="#" id="cnclBtn"><i class="icon-ic_refresh"> </i>취소</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		</div><!-- /contents-->
	</div><!-- /col-xs-9-->
</form:form>

<!-- ==================== 중앙내용 종료 ==================== -->


<!-- ==================== bottom footer layout ==================== -->
<app:layout mode="footer" type="normal"/>
</body>
</html>