<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main"/>
<link rel="stylesheet" href="/css/checkLog.css">
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
									<h1 class="page-title">로그 확인</h1>
								</div>
								<nav aria-label="breadcrumb">
		                        <ol class="breadcrumb">
		                           <li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
		                           <li class="breadcrumb-item">관리자 페이지</li>
		                           <li class="breadcrumb-item"><a href="/admin/checkLog.do">로그 확인</a></li>
		                        </ol>
                        </nav>                        
							</div>
						</div>
					</div>
	               	<div class="panel-body">
	               		<div class="card" id="loginLogCard">
	               			<div class="card-header">
	               				<span>로그인 로그</span>
	               			</div>
	               			<div class="card-body">
	               				<form id="loginLogForm" method="post">
	               				<input type="hidden" name="loginLogPage"/>
	               				<table id="loginLogList">
	               					<colgroup>
	               						<col width="10%"/>
	               						<col width="20%"/>
	               						<col width="10%"/>
	               						<col width="5%"/>
	               						<col width="5%"/>
	               						<col width="25%"/>
	               						<col width="25%"/>
	               					</colgroup>
	               					<tr>
	               						<th>사용자아이디</th>
	               						<th>로그인 일시</th>
	               						<th>연도</th>
	               						<th>월</th>
	               						<th>일</th>
	               						<th>IP주소</th>
	               						<th>로그인 서버 </th>
	               					</tr>
	               			 		<c:set var="totalSize">${loginLogTotalSize}</c:set>
	               			 		<c:set var="pageSize">${loginLogPageSize}</c:set>
	               			 		<c:set var="pageNum">${totalSize-(loginLogPageSize*(loginLogCurrSize-1))}</c:set>
	               			 		<c:forEach var="log" items="${loginLogList}" varStatus="status">
	               			 			<tr>
	               			 				<td>${ log.userId }</td>
	               			 				<td>${ log.loginDate }</td>
	               			 				<td>${ log.loginYy }</td>
	               			 				<td>${ log.loginMt }</td>
	               			 				<td>${ log.loginDe }</td>
	               			 				<td>${ log.loginIp }</td>
	               			 				<td>${ log.loginServerNm }</td>
	               			 			</tr>
	               			 		</c:forEach>
	               			 	</table>
	               			 	<!-- 페이징 -->
				                <div class="col-md-12">
				                	<app:paging name="loginLogPageList" jsFunction="fn_login_Log_search" />
				                </div>
				                <!-- //페이징 -->
				                </form>
	               			</div>
	               		</div>
	            
	               	</div>
				</div>
			</div>
		</div>
	</div>
	<app:layout mode="stylescript" type="footer" />
</body>
</html>
