<!doctype html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<html lang="ko" class="fullscreen-bg">
<head>
  <%@ include file="header.jsp"%>
  <app:layout mode="stylescript" type="main" />
<!--   <script type="text/javascript" src="js/login.js"></script> -->
</head>
<body>
  <!-- WRAPPER -->
  <div id="wrapper" class="d-flex align-items-center justify-content-center">
    <div class="auth-box ">
      <div class="left">
        <div class="content">
          <div class="header">
            <p class="lead">조기폐차지원시스템</p>
          </div>
          <form class="form-auth-small" action="loginCheck.do" method="post")>
            <div class="form-group input-group">
              <label for="signin-email" class="control-label sr-only">ID</label>
              <input type="text" class="form-control" id="inputId" placeholder="ID" name="inputId" required>
              <span class="input-group-append"><span class="input-group-text"><i class="fa fa-user"></i></span></span>
            </div>
            <div class="form-group input-group">
              <label for="signin-password" class="control-label sr-only">Password</label>
              <input type="password" class="form-control" id="inputPwd" placeholder="Password" name="inputPwd" required>
              <span class="input-group-append"><span class="input-group-text"><i class="fa fa-lock"></i></span></span>
            </div>
            
<!--             <div class="form-group"> -->
<!--               <label class="fancy-checkbox element-left custom-bgcolor-blue"> -->
<!--                 <input type="checkbox" id="remember" name="remember"> -->
<!--                 <span class="text-muted">Remember me</span> -->
<!--               </label> -->
<!--             </div> -->
            <button type="submit" class="btn btn-primary btn-lg btn-block">LOGIN</button>
            <div class="bottom">
              <span class="helper-text d-block">계정이 없으십니까? <a href="/register.do">회원가입</a></span>
              <span class="helper-text"><i class="fa fa-lock"></i> 
              <a href="javascript:forgotPwdModal()">비밀번호 찾기</a>
              
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="right">
        <div class="overlay"></div>
        <div class="content text">
          <h1 class="heading">조기폐차지원시스템</h1>
        </div>
      </div>
    </div>
    <div class="modal fade" id="forgotPwdModal" tabindex="-1" role="dialog" aria-labelledby="forgotPwdModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<span>비밀번호찾기</span>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form id="forgotPwdForm" enctype="multipart/form-data" onsubmit="return false">
			<div class="modal-body">
				<div class="form-group row">
					<label class="col-sm-2 col-form-label">ID</label>
					<div class="col-sm-10">
						<input type="text" name="inputId" class="form-control ui-autocomplete-input" id="inputInitPwdId" placeholder="Input ID" autocomplete="off" required>
					</div>
				</div>
			</div>
			
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">
					<i class="fa fa-remove"></i>
					닫기
				</button>
				<button type="button" class="btn btn-primary" onclick="javascript:forgotPwd()">
					<i class="fa fa-check"></i>
					보내기
				</button>
			</div>
			</form>
		</div>
	</div>
	</div>
  </div>
  <!-- END WRAPPER -->
</body>
</html>