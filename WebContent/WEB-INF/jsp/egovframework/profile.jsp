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
  <app:layout mode="stylescript" type="main" title="main"/>
  <link rel="stylesheet" href="../css/profile.css">	
  
</head>
<body>
  <!-- WRAPPER -->
  <div id="wrapper">
  <app:layout mode="header" />
    <!-- MAIN -->
    <div class="main">

      <!-- MAIN CONTENT -->
      <div class="main-content">

        <div class="container-fluid">
			<div class="panel panel-headline">
            	<div class="panel-head">
                	<div class="content-heading">
                    	<div class="heading-left">
				        	<h1 class="page-title">프로필</h1>
				        </div>
				        <nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
								<li class="breadcrumb-item"><a href="/profile.do">프로필</a></li>
							</ol>
						</nav>
					</div>
				</div>
			</div>
			<div class= "row" >
			 <div class="panel-body col-md-4">
			 	<form method="post" id="profile" action="/profileUpdate.do" onsubmit="return updateUserInfo();">
					<input type=hidden name="inputId" value="${ userInfo.userId }"/>
					<input type=hidden name="isPwdChange" id="isPwdChange" value=false />
					<div class="panel-body">
							<div class="card">
								<div class="card-header">
									<div class="row">
										<div class="col-sm-3" style="align-self: center">
											<span>${ userInfo.userId }님의 정보</span>
										</div>
										<div class="col-sm-9" style="text-align:right">
											<button type="button" class="btn btn btn-secondary" onClick="javascript:changePwd()">비밀번호 변경</button>
											<button type="submit" class="btn btn btn-primary">내 정보 수정</button>
										</div>
									</div>
									
								</div>
								
								<div class="card-body">
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputName">이름</label>
										<div class="col-sm-8">
											<input type="text" name="inputName" class="form-control ui-autocomplete-input" id="inputName" value="${ userInfo.userNm }" autocomplete="off">
										</div>
									</div>
								
								
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputEmail">이메일</label>
										<div class="col-sm-8">
											<input type="email" class="form-control ui-autocomplete-input" id="inputEmail" value="${ userInfo.email }" autocomplete="off" disabled>
										</div>
									</div>
								
									<div class="form-group row">
				                        <label class="col-sm-4 col-form-label" for="inputTel">전화번호</label>
				                        <div class="col-sm-8">
				                            <input type="tel" name="inputTel" class="form-control ui-autocomplete-input" id="inputTel" value="${ userInfo.telNo }"autocomplete="off" pattern="010-[0-9]{4}-[0-9]{4}">
				                        </div>
									</div>
									
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputOffNm">회사 이름</label>
										<div class="col-sm-8">
											<input type="text" name="inputOffNm" class="form-control ui-autocomplete-input" id="inputOffNm" value="${ userInfo.offiNm }" autocomplete="off">
										</div>
									</div>
								
									<div class="form-group row">
				                        <label class="col-sm-4 col-form-label" for="inputOffTel">회사 전화번호</label>
				                        <div class="col-sm-8">
				                            <input type="tel" name="inputOffTel" class="form-control ui-autocomplete-input" id="inputOffTel" value="${ userInfo.offiTelNo }"autocomplete="off">
				                        </div>
									</div>
									
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputPwd">기존 비밀 번호</label>
										<div class="col-sm-8">
											<input type="password" name="inputPwd" class="form-control ui-autocomplete-input" id="inputPwd" value="" autocomplete="off" required>
										</div>
									</div>
									
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputChangePwd">변경할 비밀 번호</label>
										<div class="col-sm-8">
											<input type="password" name="inputChangePwd" class="form-control ui-autocomplete-input" id="inputChangePwd" value="" autocomplete="off" 
											pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,20}" 
								            title="Must contain at least one number and one special letter and lowercase letter, and at least 8 and at most 20 characters" disabled>
										</div>
									</div>
									
									<div class="form-group row">
										<label class="col-sm-4 col-form-label" for="inputChangePwdAgain">변경할 비밀 번호 확인</label>
										<div class="col-sm-8">
											<input type="password" class="form-control ui-autocomplete-input" id="inputChangePwdAgain" value="" autocomplete="off" 
											pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,20}" 
								            title="Must contain at least one number and one special letter and lowercase letter, and at least 8 and at most 20 characters" disabled>
										</div>
									</div>
								</div>
						</div>
						</div>
					</form>
			 </div>
			 
			 <c:if test =  "${paramMap.gsRoleId eq 'ROLE_MNFT' || paramMap.gsRoleId eq 'ROLE_SHIPOWNER' || paramMap.gsRoleId eq 'ROLE_PSC' }" >
			 
			 <div class="panel-body col-md-2">

					<input type=hidden name="inputId" value="${ userInfo.userId }"/>
					<input type=hidden name="isPwdChange" id="isPwdChange" value=false />
					<div class="panel-body">
					<c:if test =  "${paramMap.gsRoleId eq 'ROLE_MNFT' }">
							<div class="card">
								<div class="card-header">
									<div class="row">
										<div class="col-sm-12" style="align-self: center">
											<span>${ userInfo.userId }님의  제조사 </span>
										</div>
									</div>
								</div>
								
								<div class="card-body">
								
								<div class="form-group row">
									<label for="ticket-type" class="col-sm-3 col-form-label">제조사</label>
									<div class="col-sm-9">
										<input type="text" class="form-control" id="mnftNm" name="mnftNm" value="${paramMap.gsMnftNm}" readOnly>
									</div>
								</div>
								</div>
						</div>
						</c:if>
						</div>
						<div class="panel-body">
							<div class="card">
								<div class="card-header">
									<div class="row">
										<div class="col-sm-12" style="align-self: center">
											<span> 등록된 선박</span>
										</div>
									</div>
								</div>
								
								<div class="card-body">
								
								<div class="form-group row">
									<label for="ticket-type" class="col-sm-3 col-form-label">선박</label>
									<div class="col-sm-9">
										<select class="form-control"id="shipList" name="shipList" onchange="selectShipInfo()">
										<option value="">선택</option>
										<c:forEach items="${shipList}" var="shipList">
										<option value="${shipList.imoNo}">${shipList.shipNm} </option>
										</c:forEach>
										</select>
									</div>
								</div>
								</div>
						</div>
						</div>
						
					
			 </div>
			 
				<div class="panel-body col-md-6">
					<div class="card">
						<div class="card-header">
							<div class="row">
								<div class="col-sm-3" style="align-self: center">
									<span>등록된 선박정보</span>
								</div>
								<div class="col-sm-9" style="text-align:right">
											<button type="button" class="btn btn-secondary" onClick="javascript:changeShipInfo()">선박정보 변경</button>
											<button type="button" class="btn btn-primary" onClick="javascript:updateShipInfo()">선박정보 수정</button>
											<button type="button" class="btn btn-danger" onClick="javascript:deleteShipInfo()">선박 삭제</button>
								</div>
							</div>
						</div>
						
						<div class="card-body">
						<input type=hidden name="isShipInfoChange" id="isShipInfoChange" value=false />
						<div class="form-group row">
						<label for="ticket-type" class="col-sm-3 col-form-label">처리방식 <b>*</b></label>
						<div class="col-sm-9">
						 <select class="form-control" id="bwmsDeviceNm" name="bwmsDeviceNm" disabled>
				                      	<option selected  value="">처리방식 선택</option>
										<option value = "EC"						 
										>EC</option>
										<option value = "UV"
										 
										>UV</option>
										<option value = "O3"
										
										>O3</option>
				                    </select>
						</div>
					</div>		
					<div class="form-group row">
						<label for="shipName" class="col-sm-3 col-form-label">선박명<b>*</b></label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="selectShipName"	name="shipName" disabled>
						</div>
					</div>
					<div class="form-group row">
						<label for="imoNo" class="col-sm-3 col-form-label">IMO번호<b>*</b></label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="imoNo" name="imoNo" disabled>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipNo" class="col-sm-3 col-form-label">선박번호</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipNo" name="shipNo" disabled>
						</div>
					</div>
					<div class="form-group row">
						<label for="shipNlty" class="col-sm-3 col-form-label">선박
							국적</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipNlty" name="shipNlty" disabled>
						</div>
					</div>
<!-- 					<div class="form-group row"> -->
<!-- 						<label for="shipCnstrDt" class="col-sm-3 col-form-label">선박 건조 일</label> -->
<!-- 						<div class="col-sm-9"> -->
<!-- 							<input type="text" class="form-control" id="shipCnstrDt" name="shipCnstrDt" readOnly> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="form-group row"> -->
<!-- 						<label for="shipGrtg" class="col-sm-3 col-form-label">총	톤수</label> -->
<!-- 						<div class="col-sm-9"> -->
<!-- 							<input type="text" class="form-control" id="shipGrtg" name="shipGrtg" readOnly> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="form-group row">
						<label for="shipKnd" class="col-sm-3 col-form-label">선박 종류</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="shipKnd" name="shipKnd" disabled>
						</div>
					</div>
					
						</div>
				</div>
			 </div>
			 </c:if>
		
			 
			 
			 </div>
		</div>
      </div>
      <!-- END MAIN CONTENT -->

    </div>
    <!-- END MAIN -->

  </div>
  <!-- END WRAPPER -->

  <!-- Vendor -->
  <script src="assets/js/vendor.min.js"></script>

  <!-- App -->
  <script src="assets/js/app.min.js"></script>
</body>
</html>