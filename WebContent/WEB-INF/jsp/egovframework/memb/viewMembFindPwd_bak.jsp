<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="ko">
<head>

<%@ include file ="../header.jsp" %>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 비밀번호 찾기 페이지                                                       												  --%>
<%--                                                                       														  --%>
<%-- @author NJS                                                            													  --%>
<%-- @version 1.0 2014/10/06                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- Title                                            													  						   	  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- style & javascript layout                                              													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<app:layout mode="stylescript" type="normal" />

<!-- 공통부분 스크립트 추가 -->
<script type="text/javascript" src="/js/memb/commonBaseUscm.js"></script>

</head>
<body id="top">
<div class="wrap">

<div class="memberBanner"><!-- ******************************** 메인배너 ****************************** -->

<!-- ==================== top header layout ==================== -->
<app:layout mode="header" />

<!-- ==================== 중앙내용 시작 ==================== -->
<form:form commandName="model" id="form1" name="form1" method="post">
	<!-- ********** contents ********** -->
	<div class="col-xs-9">
		<div class="contents login">
			<h3>아이디/비밀번호 찾기</h3>
			<h4>비밀번호 찾기</h4>
				<div class="contentText">
					<p>- 아래 정보를 입력하신 내용이 등록된 정보와 일치하면 가입하신 패스워드를 알려드립니다.<br />
					- 회원가입시 입력하신 아이디, 이름, 이메일을 입력해주세요.</p>
				</div>

				<div class="alert" style="padding-bottom: 40px; margin-bottom: 170px;">
					<table class="searchTable"  >
						<colgroup>
							<col style="width:90px;">
							<col style="width:380px;">
							<col style="width:60px;">
						</colgroup>
						<tbody>
							<tr>
								<td colspan="3" class="loginTitle ">
									PASSWORD <span class="text-center" >Search</span>
									<hr>
								</td>
							</tr>
							<tr>
								<th><i class="icon-ic_user_id"> </i>아이디</th>
								<td><form:input path="userId"  cssClass="form-control input-sm"  maxlength="15" title="아이디"/></td>
								<td rowspan="3"><a class="btn btn-smBlue btn-login" href="#" style="margin-bottom: 16px;" id="cfrmBtn">확인</a></td>
							</tr>
							<tr>
								<th><i class="fa fa-tag"> </i> 성명</th>
								<td><form:input path="userNm" maxlength="25" cssClass="form-control input-sm" title="사용자 명"/></td>
							</tr>
							<tr>
								<th><i class="icon-ic_email"> </i>이메일</th>
								<td>
									<table class="searchSubTable" >
										<tr>
											<td><input type="text" class="form-control input-sm" name="email1" id="email1" value="" style="width: 120px;" maxlength="30" title="담당자 E-mail1"></td>
											<td>&nbsp;@&nbsp;</td>
											<td>
												<input type="text" class="form-control input-sm marginRright10" name="email2" id="email2" style="width: 120px;" maxlength="30" title="담당자 E-mail2"/>
												<form:hidden path="email"/>
											</td>
											<td>
												<select name="email3"  id="email3" class="form-control input-sm" style="width: 105px;" title="담당자 E-mail3">
										            <c:forEach items="${emailCdCodeList }" var="emailCd">
								                        <option value="${emailCd.code }"><c:out value="${emailCd.codeNm }"/></option>
								                    </c:forEach>
												</select>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td colspan="3" class="selectBtn text-center">
									<span class="textBlue">임시 비밀번호를 발급해드립니다.</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

		</div><!-- /contents-->
	</div><!-- /col-xs-9-->
</form:form>

<!-- ==================== 중앙내용 종료 ==================== -->


<!-- ==================== bottom footer layout ==================== -->
<app:layout mode="footer" type="normal"/>

</body>
</html>