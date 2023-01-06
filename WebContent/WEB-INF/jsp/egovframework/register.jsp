<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<html lang="ko" class="fullscreen-bg">
<head>
<!-- <title>BWMS 실시간 모니터링 시스템 | 회원가입</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  App css
  <link href="assets/css/bootstrap-custom.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/app.min.css" rel="stylesheet" type="text/css" />

  Fonts
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">

  Favicon
  <link rel="shortcut icon" href="assets/images/favicon.png"> -->
<%@ include file="header.jsp"%>
<app:layout mode="stylescript" type="main" />
</head>
<body>
	<!-- WRAPPER -->
	<div id="wrapper"
		class="d-flex align-items-center justify-content-center">
		<div class="auth-box register">
			<div class="content">
				<div class="header">
					<p class="lead">회원가입</p>
				</div>
				<form class="form-auth-small needs-validation" id="registerForm"
					method="post"  action="/registerUser.do">
					<input type="hidden" name="mnftNm" id="mnftNm">
					
					
					<input type="hidden" name="seqShipNo" id="seqShipNo">

					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputId">아이디</label>
						<div class="input-group col-sm-8">
                   			 <input type="text" class="form-control" id="inputId" name="inputId">
                  			 <div class="input-group-append">
                     			 <button class="btn btn-outline-light" type="button" onclick="checkId()" style="margin-top:0px;">아이디 확인</button>
                    		</div>
                  		</div>
                 	 </div>
<!-- 						<label class="col-sm-4 col-form-label" for="inputId">아이디</label> -->
<!-- 						<div class="col-sm-8"> -->
<!-- 							<input type="text" class="form-control ui-autocomplete-input" -->
<!-- 								id="inputId" name="inputId" placeholder="아이디를 입력해주세요." -->
<!-- 								autocomplete="off" required> -->
<!-- 						</div> -->
<!-- 					</div> -->

										
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputPwd">비밀번호</label>
						<div class="col-sm-8">
							<input type="password" class="form-control" id="inputPwd"
								placeholder="" name="inputPwd"
								pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,20}"
								title="Must contain at least one number and one special letter and lowercase letter, and at least 8 and at most 20 characters"
								autocomplete="off"
								required>
						</div>
					</div>
					
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputPwdVaild">비밀번호
							확인</label>
						<div class="col-sm-8">
							<input type="password" class="form-control" id="inputPwdVaild"
								placeholder="" name="inputPwdVaild"
								pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,20}"
								title="Must contain at least one number and one special letter and lowercase letter, and at least 8 and at most 20 characters"
								autocomplete="off"
								required>
						</div>
					</div>
					
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="userRole"> 직책</label>
						<div class="col-sm-8">

							<select class="custom-select" id="userRole" name="userRole">
								<option selected disabled>선택</option>
<!-- 								<option value="ROLE_AUTH_SYS">시스템관리자</option> -->
								<option value="ROLE_SHIPOWNER">선주</option>
								<option value="ROLE_PSC">PSC(항만통제국)</option>
								<option value="ROLE_MNFT">제조사</option>
<!-- 								<option value="ROLE_RESEARCHER">연구원</option> -->
							</select>

						</div>
					</div>
					
					
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputEmail">이메일</label>
						<div class="col-sm-8">
							<input type="email" class="form-control ui-autocomplete-input"
								id="inputEmail" name="inputEmail" placeholder=""
								autocomplete="off" required>
						</div>
					</div>
					
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputName">이름</label>
						<div class="col-sm-8">
							<input type="text" class="form-control ui-autocomplete-input"
								id="inputName" name="inputName" placeholder=""
								autocomplete="off" required>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputTel">휴대폰 번호</label>
						<div class="col-sm-8">
							<input type="tel" class="form-control ui-autocomplete-input"
								id="inputTel" name="inputTel" placeholder=""
								autocomplete="off" required>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputOfName">회사 명</label>
						<div class="col-sm-8">
							<input type="text" class="form-control ui-autocomplete-input"
								id="inputOfName" name="inputOfName" placeholder=""
								autocomplete="off" required>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 col-form-label" for="inputOfTel">회사 전화번호</label>
						<div class="col-sm-8">
							<input type="tel" class="form-control ui-autocomplete-input"
								id="inputOfTel" name="inputOfTel" placeholder=""
								autocomplete="off" required>
						</div>
					</div>

					<button type="submit" class="btn btn-primary btn-lg btn-block">회원가입</button>
					<div class="bottom">
						<span class="helper-text">이미 계정이 있습니까?
						 <a	href="/login.do">로그인</a></span>
					</div>
				</form>

				<!--         <div class="separator-linethrough"><span>OR</span></div>

        <button class="btn btn-signin-social"><i class="fa fa-facebook-official facebook-color"></i> Sign in with Facebook</button>
        <button class="btn btn-signin-social"><i class="fa fa-twitter twitter-color"></i> Sign in with Twitter</button> -->
			</div>
		</div>
		<!--  왼쪽 박스  End-->
		<!--  선주 선택시 display -->
		<div id="searchMnftInfo" class="auth-box register"
			style="display: none; padding: 1.25rem;">
			<h4 class="h5" style="text-align: center; padding-bottom: 1.25rem;">제조사 등록</h4>
			<div class="form-group row">
				<label class="col-sm-3 col-form-label">제조사명</label>
				<div class="input-group col-sm-9">
					<select id="selectMnftList" name = "selectMnftList" class="form-control">
						<option selected disabled>선택</option>
						<c:forEach items="${mnftList}" var="mnft">
							<option  value="${mnft.mnftEn}">${mnft.mnftKr}</option>
						</c:forEach>
					</select>				
				</div>
			</div>
<!-- 			<button type="button" class="btn btn-primary btn-lg btn-block">저장</button> -->
		</div>
		
		
		<div id="searchShipInfo" class="auth-box register"
			style="display: none; padding: 1.25rem;">
			<h4 class="h5" style="text-align: center; padding-bottom: 1.25rem;">선박
				등록</h4>
			<div class="form-group row">
				<label class="col-sm-3 col-form-label">선박명</label>
				<div class="input-group col-sm-9">
					<input class="form-control" id="searchShipName"
						name="searchShipName" type="text"> 
						<span class="input-group-append"> 
						<a href="javascript:searchShip()" class="btn btn-primary"
						id="shipSearch">검색</a>
						
					</span>
				</div>
				
			</div>
			<hr style="margin: 20px;">
			<div id="shipSearchResult"></div>
		</div>
		
		
		
	
		<div id="insertShipInfo" class="auth-box register"
			style="display: none; padding: 1.25rem;">
			
			<h4 class="h5" style="text-align: center; padding-bottom: 1.25rem;">선박 정보 입력</h4>				
			<form id="shipInfo" method="post" enctype="multipart/form-data">
				<input type="hidden" id="registerId" name="registerId" >
				<fieldset>
					<div class="form-group row">
						<label for="ticket-type" class="col-sm-3 col-form-label">처리방식<b>*</b></label>
						<div class="col-sm-9">
							<select id="bwmsType" name="bwmsType" class="form-control">
							<option value = """selected>처리방식선택</option>
								<option value="EC">전기분해</option>
								<option value="UV">자외선</option>
								<option value="O3">오존</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="ticket-type" class="col-sm-3 col-form-label">제조사</label>
						<div class="col-sm-9">
							<select id="shipMnftList" name = "shipMnftList" class="form-control">
								<option selected disabled>선택</option>
								<c:forEach items="${mnftList}" var="mnft">
									<option  value="${mnft.mnftEn}">${mnft.mnftKr}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="ticket-type" class="col-sm-3 col-form-label">BWMS 장치</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="bwmsDeviceNm"	name="bwmsDeviceNm" required>
						</div>
					</div>		
					<div class="form-group row">
						<label for="shipName" class="col-sm-3 col-form-label">선박명<b>*</b></label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="selectShipName"	name="shipName" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="imoNo" class="col-sm-3 col-form-label">IMO번호<b>*</b></label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="imoNo" name="imoNo" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipNo" class="col-sm-3 col-form-label">선박번호</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipNo" name="shipNo" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipNlty" class="col-sm-3 col-form-label">선박
							국적</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipNlty" name="shipNlty" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipCnstrDt" class="col-sm-3 col-form-label">선박 건조 일</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipCnstrDt" name="shipCnstrDt" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipGrtg" class="col-sm-3 col-form-label">총	톤수</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipGrtg" name="shipGrtg" required>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipKnd" class="col-sm-3 col-form-label">선박 종류</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipKnd" name="shipKnd" required>
						</div>
					</div>
<!-- 					<div class="form-group row"> -->
<!-- 						<label for="shipProof" class="col-sm-3 col-form-label">선박 증명서</label> -->
					
<!-- 					<div class="input-group col-sm-9"> -->
<!-- 					  <div class="custom-file"> -->
<!--                       <input type="file"  id="upfile" name="upfile"  required> -->
<!--                     </div> -->
<!--                    </div> -->
<!-- 						<label for="shipProof" class="col-sm-3 col-form-label">선박 -->
<!-- 						 	증명서</label> -->
<!-- 						<div class="col-sm-9"> -->
<!-- 							<input type="file" class="custom-file-input" id="shipProof" -->
<!-- 								name="shipProof"> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="form-group row">
						<div class="offset-sm-3 col-sm-9">
							<button type="button" class="btn btn-primary btn-block" onclick="insertShip()">저장</button>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	</div>

		<!-- END WRAPPER -->
		<!-- Vender -->
	<script src="/assets/js/vendor.min.js"></script>
 		<!-- App -->
	<script type="text/javascript" src="/assets/js/app.min.js"></script>

<iframe name= "hiddenFrame" style="display:none"></iframe>
</body>
</html>