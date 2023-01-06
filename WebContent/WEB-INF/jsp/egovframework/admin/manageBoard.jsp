<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main"/>
<link rel="stylesheet" href="/css/manageBoard.css">
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
									<h1 class="page-title">게시판 관리</h1>
								</div>
								<nav aria-label="breadcrumb">
		                        <ol class="breadcrumb">
		                           <li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
		                           <li class="breadcrumb-item">관리자 페이지</li>
		                           <li class="breadcrumb-item"><a href="/admin/manageBoard.do">게시판 관리</a></li>
		                        </ol>
                        		</nav>                        
							</div>
						</div>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-2">
								<div class="card">
									<div class="card-header">
										<span>FAQ 카테고리</span>
									</div>
									<div class="card-body" id="categoryBody">
										<ul>
											<c:forEach items="${ categoryList }" var="category" varStatus="status">
												<li>${ category }</li>
											</c:forEach>
											<li id="faqCategoryAddBtn">
												<span>+</span>
												
											</li>
										</ul>
										
									</div>
								</div>
							</div>
							<div class="col-sm-10">
								<div class="card">
									<div class="card-header">
										<span>FAQ 내용</span>
									</div>
									<div class="card-body" id="faqBody">
           
									</div>
								</div>
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
