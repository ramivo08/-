<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main"/>
<link rel="stylesheet" href="../css/listBbs.css">


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
									<h1 class="page-title">FAQ</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
									<li class="breadcrumb-item">게시판</li>
									<li class="breadcrumb-item"><a href="/board/searchFAQ.do">FAQ</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<ul class="nav nav-tabs" role="tablist">
							<c:forEach var="category" items="${ categoryList }" varStatus="status">
							<c:choose>
								<c:when test="${ status.index == 0 }">
									<li class="nav-item active"><a href="#${ status.index }" class="nav-link active" role="tab" data-toggle="tab" aria-selected="true" aria-expanded="true">${ category }</a></li>
								</c:when>
								<c:when test="${ status.index != 0 }">
									
									<li class="nav-item"><a href="#${ status.index }" class="nav-link" role="tab" data-toggle="tab" aria-selected="false" aria-expanded="false">${ category }</a></li>
								</c:when>
							</c:choose>
							
								
							</c:forEach>
						</ul>
						<div class="tab-content">
							<% int i = 0; %>
							<c:forEach var="category" items="${ categoryList }" varStatus="status">
								<c:choose>
									<c:when test="${ status.index == 0 }">
										<div class="tab-pane fade active in" id="${ status.index }">
									</c:when>
									<c:when test="${ status.index != 0 }">
										<div class="tab-pane fade" id="${ status.index }">	
									</c:when>
								</c:choose>
											<div class="accordion" id="<%=i%>_accordion">
												<c:forEach var="faq" items="${faqList}">
												<c:if test="${ faq.faqCategory == category }">
													<div class="card">
														<div class="card-header" id="<%=i%>_header">
															<h2 class="mb-0">
														        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${faq.bbsNo}" aria-expanded="false" aria-controls="collapse${faq.bbsNo}">
														          ${ faq.bbsSubject }
														        </button>
														    </h2>
														</div>
														<div id="collapse${faq.bbsNo}" class="collapse show" data-parent='#<%=i%>_accordion' style="" aria-labelledby="<%=i%>_header">
															<div class="card-body">
																${faq.bbsCont}
															</div>
														</div>
													</div>
												</c:if>
												</c:forEach>
											</div>
											<% i++; %>
										</div>
							</c:forEach>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<app:layout mode="stylescript" type="footer" />
</body>
</html>