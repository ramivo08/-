<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% pageContext.setAttribute("newLine", "\n"); %>
<html lang="ko">
<head>
	<%@ include file ="./header.jsp" %>

<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
<%-- 로그인 화면						  	                                  									 		  --%>
<%--                                                                        														  --%>
<%-- @author NJS                                                         													  --%>
<%-- @version 1.0 2017-01-17                                               													  --%>
<%-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ --%>
	<app:layout mode="stylescript" type="normal" />

	<c:set var="returnFlag" value="<%=returnFlag%>"/>


	<script type="text/javascript" >
	$(function() {
	    $('#j_password').keypress(function(e){
	        if (e.keyCode == 13) {
	            loginProc();
	            return false;		// jAlert와 keyCode 사용시 return false 해줘야함.
	        }
	    });
	    $("#loginBtn").click(function(){
	        loginProc();
	    });

	    $("#j_userid").focus();

		//로그인 실패 리턴메세지
		var message	= "${returnFlag}";

		if (message == "E1") {
			message = MSG_COMM_E001;		// 등록된 사용자 정보가 없습니다.
		}
		if (message == "E2") {
			message = MSG_COMM_E002;		// 패스워드 틀립니다.
		}
		if (message == "E3") {
			message = MSG_COMM_E003;		// 사용제한된 ID.
		}
		if (message == "E8") {
			message = MSG_COMM_E008;		// 해당 사용자는 사용가능 상태가 아닙니다.
		}
		if (message == "EA") {
			message = MSG_COMM_E014;		// 해당 사용자는 사용가능 상태가 아닙니다.
		}
		if (message == "EB") {
			message = MSG_COMM_E016;		// 등록된 권한정보가 없습니다. 관리자에게 문의바랍니다.
		}
		if (message == "EF") {
			message = MSG_COMM_E015;		// URL 강제접속시 Return값 로그인후 사용가능함.
		}

		if (isEmpty(message) == false) {
		    msgAlert(message, $("#j_userid"));
		}

	    //-------------------------------
	    //메시지 출력
	    //-------------------------------
	    resultMessage();
	});

	// 로그인 처리.
	function loginProc() {
	    var form = $("#form1");

	    if (isEmpty($('#j_userid').val())) {
	    	nAlert(MSG_COMM_U001);
	    	return;
	    }
	    if (isEmpty($('#j_password').val())) {
	    	nAlert(MSG_COMM_U002);
	    	return;
	    }
	    form.attr("action", ROOT_PATH + "/j_login_check.do");

	    form.submit();
	}
	</script>
</head>

<body>

		<!-- header layout -->
	<app:layout mode="header"  type="normal"/>

            <div class="con">
			<!-- 멤버 로그인 -->
			<div class="login_wrap">
			<form name="form1" id="form1">
			<input type="hidden" id="certSignData" name="certSignData" title="인증서 정보"> <!-- 인증서 정보-->
				<div class="title">MEMBER LOGIN</div>
				<div class="login_form">
					<div><label for="j_userid">아이디</label><input type="text" id="j_userid" name="j_userid" value="" maxlength="15"  class="w30" title="아이디"></div>
					<div><label for="j_password">비밀번호</label><input type="password" id="j_password" name="j_password" value="" maxlength="12" class="w30" title="비밀번호"></div>
					<div><a class="login_btn" href="#" id="loginBtn">로그인</a></div>
				</div>

				<!-- <ul class="member_explain_01">
					<li>회원이 되시면 다양한 혜택을 누릴 수 있습니다.</li>
					<li>아직 회원이 아니시면 무료회원가입으로 본 사이트의 다양한 혜택을 누려보세요.</li>
				</ul> -->

				<div class="member_etc_btn_01">
					<span><em>아직 회원가입을 하지 않으셨나요?</em></span> <span><a class="btn1_join" href="/memb/openRegiMembUser01.do">회원가입</a></span>
					<span class="space"><em>아이디 또는 비밀번호가 기억나지 않으세요?</em></span> <span><a class="btn1_idpw" href="/memb/viewMembFindId.do">ID 찾기</a></span> <span><a class="btn1_idpw" href="/memb/viewMembFindPwd.do">PW찾기</a></span>
				</div>

			</form>
			</div><!-- //멤버 로그인-->
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