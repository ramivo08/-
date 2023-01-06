<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
									<h1 class="page-title">폐차장 관리</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"> <i
											class="fa fa-home"></i> Home
									</a></li>
									<li class="breadcrumb-item">관리자 페이지</li>
									<li class="breadcrumb-item"><a href="/admin/manageJunkyard.do">폐차장 관리
											</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<!-- <div id="grid"></div> -->

						<div class="row">

							<div class="col-sm-12">
								<div class="card">
									<div class="card-header">
										<span>폐차장관리</span>
									</div>
									<div class="card-body">
										<div class="row">
											<div class="input-group col-8 pr-1">
												<div class="input-group-prepend">
													<form id="userForm" method="post"
														action="/admin/manageUser.do">
														<select name="searchType" class="custom-select">
															<c:choose>
																<c:when test="${searchType eq 'all'}">
																	<option value="all" selected>전체</option>
																	<option value="codeId">코드ID</option>
																	<option value="codeNm">이름</option>
																</c:when>
																<c:when test="${searchType eq 'id'}">
																	<option value="all" selected>전체</option>
<!-- 																	<option value="codeId">코드ID</option> -->
																	<option value="codeNm">이름</option>
																</c:when>
																<c:when test="${searchType eq 'name'}">
																	<option value="all" selected>전체</option>
																	<option value="codeId">코드ID</option>
																	<option value="codeNm">이름</option>
																</c:when>
																<c:when test="${searchType eq 'auth'}">
																	<option value="all" selected>전체</option>
																	<option value="codeId">코드ID</option>
																	<option value="codeNm">이름</option>
																</c:when>
															</c:choose>
														</select>
													</form>
												</div>
												<input type="text" class="form-control"
													aria-label="Sizing example input"
													aria-describedby="inputGroup-sizing-default"
													name="searchCont" value="${ searchCont }">
												<div class="col-4 pl-0 text-center">
													<button type="submit" class="btn btn-primary">검색</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">

							<div class="col-sm-12">
								<div class="card">
									<div class="card-header">
										<span>폐차장 목록</span>
									</div>
									<div class="card-body pb-0" id="tableCardBody">

										<input type="hidden" name="page" />

										<table id="userList">
											<colgroup>
												<col width="20"></col>
												<col width="20%"></col>
												<col width="50%"></col>
												<col width="10%"></col>
											</colgroup>
											<tr>
												<th>폐차장 명</th>
												<th>대표자</th>
												<th>폐차장 주소</th>
												<th>전화번호</th>
											</tr>
											<c:set var="totalSize">${totalSize}</c:set>
											<c:set var="pageSize">${pageSize}</c:set>
											<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set>
											<c:forEach var="junkyardList" items="${ junkyardList }"
												varStatus="status">
												<tr class="userInfoRow">
													<td>${ junkyardList.junkyardNm }</td>
													<td>${ junkyardList.junkyardAgent }</td>
													<td>${ junkyardList.junkyardAddr }</td>
													<td>${ junkyardList.junkyardTel }</td>
													<input type=hidden value="${ user.roleId }" />
												</tr>
											</c:forEach>
										</table>
										<!-- 페이징 -->
										<div class="col-md-12 pt-2">
											<app:paging name="pageList" jsFunction="fn_search" />
										</div>
										<!-- //페이징 -->

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
