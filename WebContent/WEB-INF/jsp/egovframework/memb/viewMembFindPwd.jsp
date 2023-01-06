<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="ko">
<head>
	<%@ include file ="../header.jsp" %>

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 아이디 찾기 비밀번호 찾기 						  	                                  									 		  --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2017-01-12                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="stylescript" type="normal" />

	<!-- 공통부분 스크립트 추가 -->
	<script type="text/javascript" src="/js/memb/commonBaseUscm.js"></script>
</head>

<body>

		<!-- header layout -->
	<app:layout mode="header"  type="normal"/>

            <div class="con idpw">

			<!-- 2.비밀번호찾기 -->
			<form:form commandName="model" id="form1" name="form1" method="post">
			<div class="login_wrap">
				<div class="title">PASSWORD SEARCH</div>
				<ul class="login_form">
					<li>
						<span><label for="userId">아이디</label><form:input path="userId" maxlength="15" title="아이디"/></span><br>
						<span><label for="userNm">이름</label><form:input path="userNm" maxlength="25" title="이름" /></span><br>
						<span>
							<label for="email1">이메일</label><input type="text" name="email1" id="email1"  style="width: 100px;" maxlength="30" title="담당자 E-mail1"> @ <input type="text" name="email2" id="email2" style="margin-left:0; width: 100px;" maxlength="30" title="담당자 E-mail2"/>
							<form:hidden path="email"/>
							<select name="email3"  id="email3"  title="담당자 E-mail3">
					            <c:forEach items="${emailCdCodeList }" var="emailCd">
				                    <option value="${emailCd.code }"><c:out value="${emailCd.codeNm }"/></option>
				                </c:forEach>
							</select>
						</span>
					</li>
					<li class="btn2_identify02"><a class="" data-name="identify02" href="#void" id="cfrmBtn">확인</a></li>
				</ul>

				<ul class="member_explain_01">
					<li>위 정보를 입력하신 내용이 등록된 정보와 일치하면 임시 비밀번호를 알려드립니다.</li>
					<li>회원가입시 입력하신 아이디, 이름, 이메일을 입력해주세요.</li>
				</ul>

			</div><!--// 2.비밀번호찾기 -->
			</form:form>

            </div><!-- //con -->
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- bottom footer layout                                                  													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="footer" type="normal"/>

	<!-- gotop -->
	<a id="gotop" href="#void" title="Top"></a>

<!-- ie8 이하 안내 메시지 -->
<!--#include virtual="/ver3/include/ie8.asp"-->

</body>
</html>