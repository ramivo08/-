<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="/css/manageUser.css">
<!-- <link rel="stylesheet" type="text/css" href="/assets/plugins/tui-grid/tui-grid.min.css">
<link rel="stylesheet" type="text/css" href="/assets/plugins/tui-grid/tui-pagination.css">
<script type="text/javascript" src="/assets/plugins/tui-grid/tui-pagination.min.js"></script>
<script type="text/javascript" src="/assets/plugins/tui-grid/tui-grid.min.js"></script> -->
</head>

<body>
	<div id="wrapper">
		<app:layout mode="header" />

		<div class="main">
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-headline">
						<div class="panel-head">
							<div class="content-heading">
								<div class="heading-left">
									<h1 class="page-title">회원 관리</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do">
											<i class="fa fa-home"></i> Home
										</a></li>
									<li class="breadcrumb-item">관리자 페이지</li>
									<li class="breadcrumb-item"><a href="/admin/manageUser.do">회원 관리</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<!-- <div id="grid"></div> -->

						<div class="row">

							<div class="col-sm-8">
		                     <div class="card">
		                     	<div class="card-header">
		                     		<span>유저 목록</span>
		                     	</div>
		                     	<div class="card-body pb-0" id="tableCardBody">
		                     		<form id="userForm" method="post" action="/admin/manageUser.do">
		                     		<input type="hidden" name="page" />
		                     		<div class="row justify-content-end">
		                     			<div class="col-4 text-right mb-2">
		                     				<div class="row">
		                     					<div class="input-group col-8 pr-1">
													<div class="input-group-prepend">
														<select name="searchType" class="custom-select">
			                     							<c:choose>
															<c:when test="${searchType eq 'all'}">
															<option value="all" selected>전체</option>
			                     							<option value="id">ID</option>
			                     							<option value="name">이름</option>
			                     							<option value="auth">권한</option>
															</c:when>
															<c:when test="${searchType eq 'id'}">
															<option value="all">전체</option>
			                     							<option value="id" selected>ID</option>
			                     							<option value="name">이름</option>
			                     							<option value="auth">권한</option>
															</c:when>
															<c:when test="${searchType eq 'name'}">
															<option value="all">전체</option>
			                     							<option value="id">ID</option>
			                     							<option value="name" selected>이름</option>
			                     							<option value="auth">권한</option>
															</c:when>
															<c:when test="${searchType eq 'auth'}">
															<option value="all">전체</option>
			                     							<option value="id">ID</option>
			                     							<option value="name">이름</option>
			                     							<option value="auth" selected>권한</option>
															</c:when>
															</c:choose>
			                     						</select>
													</div>
														<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
														name="searchCont" value="${ searchCont }">
												</div>
		                     					<div class="col-4 pl-0 text-center">
		                     						<button type="submit" class="btn btn-primary">검색</button>
		                     					</div>
		                     				</div>
		                     			</div>
		                     		</div>
		                     		<table id="userList">
		                     			<colgroup>
		                     				<col width="10.5%"></col>
		                     				<col width="11.5%"></col>
		                     				<col width="17.5%"></col>
		                     				<col width="12.5%"></col>
		                     				<col width="12.5%"></col>
		                     				<col width="12.5%"></col>
		                     				<col width="9.5%"></col>
		                     				<col width="9.5%"></col>
		                     			</colgroup>
		                     			<tr>
												<th>아이디</th>
		                     					<th>이름</th>
		                     					<th>이메일</th>
		                     					<th>전화 번호</th>
		                     					<th>회사 이름</th>
		                     					<th>회사 번호</th>
		                     					<th>활성화</th>
		                     					<th>유저 권한</th>
		                     				</div>
		                     			</tr>
		                     			<c:set var="totalSize">${totalSize}</c:set>
	               			 			<c:set var="pageSize">${pageSize}</c:set>
	               			 			<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set>
		                     			<c:forEach var="user" items="${ userList }" varStatus="status">	
											<tr class="userInfoRow">
												<td>${ user.userId }</td>
			                     				<td>${ user.userNm }</td>
			                     				<td>${ user.email }</td>
			                     				<td>${ user.telNo }</td>
			                     				<td>${ user.offiNm }</td>
			                     				<td>${ user.offiTelNo }</td>
			                     				<td>${ user.isAccessible }</td>
			                     				<td>${ user.roleName }</td>
			                     				<input type=hidden value="${ user.roleId }" />
											</tr>
										</c:forEach>
		                     		</table>	
		                     		<!-- 페이징 -->
					                <div class="col-md-12 pt-2">
					                	<app:paging name="pageList" jsFunction="fn_search" />
					                </div>
					                <!-- //페이징 -->
					                </form>
		                     	</div>
		                     </div>
						</div>
						<div class="col-sm-4">
		                	 <div class="card">
		                	 	<div class="card-header">
		                	 		<span>유저 정보 수정</span>
		                	 	</div>
		                     	<div class="card-body" id="userInfoCardBody">
		                     		<form id="userInfoForm" method="post" action="/admin/changeUserInfo.do">
		                     			<input type="hidden" name="inputId" id="hiddenId" />
		                     			<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputId">ID</label>
											<div class="col-sm-9">
												<input type="text" class="form-control ui-autocomplete-input" id="inputId" disabled/>
											</div>
										</div>
		                     			<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputName">Name</label>
											<div class="col-sm-9">
												<input type="text" name="inputName" class="form-control ui-autocomplete-input" id="inputName" />
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputEmail">Email</label>
											<div class="col-sm-9">
												<input type="text" name="inputEmail" class="form-control ui-autocomplete-input" id="inputEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputTel">Tel</label>
											<div class="col-sm-9">
												<input type="text" name="inputTel" class="form-control ui-autocomplete-input" id="inputTel" pattern="010-[0-9]{4}-[0-9]{4}" />
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputOffNm">Office Name</label>
											<div class="col-sm-9">
												<input type="text" name="inputOffNm" class="form-control ui-autocomplete-input" id="inputOffNm" />
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputOffTel">Office Tel</label>
											<div class="col-sm-9">
												<input type="text" name="inputOffTel" class="form-control ui-autocomplete-input" id="inputOffTel" />
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputActive">Active</label>
											<div class="col-sm-9">
												<div class="row" style="height:100%">
													<div class="col-sm-6 custom-control custom-radio">
														<input type="radio" name="isActive" id="isActive-on" class="custom-control-input" value="On">
														<label class="custom-control-label" for="isActive-on">On</label>
													</div>
													<div class="col-sm-6 custom-control custom-radio">
														<input type="radio" name="isActive" id="isActive-off" class="custom-control-input" value="Off">
														<label class="custom-control-label" for="isActive-off">Off</label>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group row">
											<label class="col-sm-3 col-form-label" for="inputRoleNm">User Role</label>
											<div class="col-sm-9">
												<select class="custom-select" id="inputRoleNm" name="inputRoleNm">
													<option selected disabled>유저 권한 설정</option>
													<option value = "ROLE_AUTH_SYS">시스템관리자</option>
													<option value = "ROLE_SHIPOWNER">선주</option>
													<option value = "ROLE_PSC">항만통제국</option>
													<option value = "ROLE_MNFT">제조사</option>
													<option value = "ROLE_RESEARCHER">연구원</option>
												</select>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-12" style="text-align:center;">
												<button class="btn btn-outline-danger" type="button" onClick="javascript:deleteUser()">Delete</button>
												<button class="btn btn-outline-dark" type="submit">Save</button>
											</div>
										</div>
		                     		</form>
		                     	</div>
		                    </div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<app:layout mode="stylescript" type="footer" />
	</div>
</body>
</html>
