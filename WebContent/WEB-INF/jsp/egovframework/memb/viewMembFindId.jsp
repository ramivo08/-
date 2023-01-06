<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLine", "\n"); %>
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

			<!-- 1.아이디찾기 -->
			<form:form commandName="model" id="form1" name="form1" method="post">
			<div class="login_wrap">
				<div class="title">ID SEARCH</div>
				<div class="ids">
					<ul class="login_form">
						<li>
							<span><label for="userNm">이름</label><form:input path="userNm"  title="사용자 명"/></span><br>
							<span>
								<label for="email1">이메일</label><input type="text" name="email1" id="email1"  class="addEmailCls"  maxlength="30"  style="width: 100px;" title="담당자 E-mail1">@<input type="text" name="email2" id="email2" class="addEmailCls"  maxlength="30" style="margin-left:0; width: 100px;" title="담당자 E-mail2"/>
								<form:hidden path="email"/>
								<select name="email3" id="email3" title="담당자 E-mail3">
						            <c:forEach items="${emailCdCodeList }" var="emailCd">
					                    <option value="${emailCd.code }"><c:out value="${emailCd.codeNm }"/></option>
					                </c:forEach>
								</select>
							</span>
						</li>
						<li class="btn_wrap">
							<a class="btn2_identify01" data-name="identify01" href="#void"  id="cfrmBtn">확인</a>
						</li>
					</ul>
				</div>

				<ul class="member_explain_01">
					<li>위 정보를 입력하신 내용이 등록된 정보와 일치하면 가입하신 아이디를 알려드립니다.</li>
					<li>회원가입시 입력하신 이름과 이메일을 입력해주세요.</li>
				</ul>

			</div><!-- // 1.아이디찾기 -->
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