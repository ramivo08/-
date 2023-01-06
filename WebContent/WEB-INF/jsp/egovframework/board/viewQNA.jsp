<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/viewBbs.css">
<script type="text/javascript" src="../js/board/deleteQNA.js"></script>
<script type="text/javascript" src="../js/board/updateQNA.js"></script>

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
									<h1 class="page-title">Q & A</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
									<li class="breadcrumb-item">게시판</li>
									<li class="breadcrumb-item"><a href="/board/searchQNA.do">Q&A</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<form method="post" id="qna" enctype="multipart/form-data">
					<input type=hidden name="bbsNo" value="${ bbsNo }"/>
					<input type=hidden name="privYn" value="${ privYn }" id="privYn"/>
					<input type=hidden name="bbsType" value="${ bbsType }" />
						<div class="panel-body">
							<div class="card">
								<h4 class="card-header">${ bbsSubject }</h4>
								
								<div class="card-body">
									<div class="additionalContent">
										<p>
										<span>${ register }</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>${ rgsDe }</span>&nbsp;&nbsp; | &nbsp;&nbsp;<span>조회 : ${ viewCnt }</span>
										</p>
										<div class="file">
											<c:forEach var="file" items="${fileList}">
												<a href="javascript:fileDownload('${ file.fileNo }')">
													<i class="fa fa-file"></i>
													${ file.fileOrgNm }
												</a>
												<br>
											</c:forEach>
										</div>
									</div>
									<div class="content">
										${ bbsCont }
									</div>
								</div>
							</div>
							<div class="selectBtns">
								<button type="button" class="btn btn-dark" onClick="location.href='/board/searchQNA.do'">
									<i class="fa fa-align-justify"></i> 
									목록
								</button>
								<button type="button" class="btn btn-info" data-toggle="modal" data-target="#editModal">
									<i class="fa fa-edit"></i>
									수정
								</button>
								<button type="button" class="btn btn-danger" onClick="javascript:deleteQNA()">
									<i class="fa fa-remove"></i>
									삭제
								</button>
							</div>
						</div>
						<%@ include file="editModalHeader.jsp" %>
						<div class="row" style="width : 100%">
							<div class="col-sm-6">
								<span>Edit QNA</span>
							</div>
							<div class="col-sm-6">
								<label class="switch-input">
		                        <input type="checkbox" name="isPrivate" checked="" id="isPrivateToggleBtn">
		                    		<i data-swon-text="Private" data-swoff-text="Public"></i>
		                    	</input>
		                    </label>
							</div>
							
						</div>
						
						<%@ include file="editModalBody.jsp" %>
						<div class="form-group row">
							<label class="col-sm-2 col-form-label">Password</label>
							<div class="col-sm-10">
								<input type="password" class="form-control ui-autocomplete-input" name="bbsPwd" id="password" placeholder="" autocomplete="off">
							</div>
						<%@ include file="editModalFooter.jsp" %>
					</form>
				</div>
			</div>
			
		</div>
	</div>
	</div>
	<app:layout mode="stylescript" type="footer" />
</body>
</html>