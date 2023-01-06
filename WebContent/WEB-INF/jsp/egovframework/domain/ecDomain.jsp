<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/domain.css">
<script type="text/javascript" src="../js/domain.js"></script>


<style>
.card-header{
background-color:#383838;
}
.col-md-4{
padding-right:0px;
padding-left:0px;

}


</style>
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
									<h1 class="page-title">EC 도메인</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"><i
											class="fa fa-home"></i> Home</a></li>
									<li class="breadcrumb-item">도메인</li>
									<li class="breadcrumb-item"><a href="/domain/ecDomain.do">EC
											도메인</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					



					<div class="panel-body" style="font-weight:700;">
						<div class="card card-tab">
							<div class="card-header">
								<ul class="nav nav-tabs col-md-12" role="tablist" style="padding: 0px 24px;">
				                    <li class="nav-item col-md-4 active" id="data"><a href="#tab1" class="nav-link active" data-toggle="tab" aria-expanded="true"><i class="fa fa-user-circle"></i> Data Log</a></li>
				                    <li class="nav-item col-md-4" id="event"><a href="#tab2" class="nav-link" data-toggle="tab" aria-expanded="false"><i class="fa fa-envelope"></i> Event Log</a></li>
				                    <li class="nav-item col-md-4" id="operation"><a href="#tab3" class="nav-link" data-toggle="tab" aria-expanded="false"><i class="fa fa-pie-chart"></i> Operation Log</a></li>
				                </ul>
							</div>
								<div class="card-body">
									<div class="tab-content">
									
										<div  class= "tab-pane show active" id="tab1">
		                			 		<%@ include file="domainList.jsp" %>
		                			 	</div>
		                			 	
		                			 	<div class= "tab-pane fade" id="tab2">
											<ul class="domainList">
												<li style="list-style: none;">
													<div class="row domainTitle">
														<div class="col-sm-4">Name</div>
														<div class="col-sm-4">Description</div>
														<div class="col-sm-4">Type</div>
											
													</div>
												</li>
												<c:forEach var="domain" items="${eventDomains}" varStatus="status">
													<li style="list-style: none;">
														<div class="row domainContent">
															<div class="col-sm-4 domainName">${ domain.name }</div>
															<div class="col-sm-4 domainDes">${ domain.des }</div>
															<div class="col-sm-4 domainType">${ domain.type }</div>
														</div>
													</li>
												</c:forEach>
												<div class="row">
													<div class="col-sm-12" style="text-align: center; margin-top: 10px">
														<button type="button" class="btn btn-outline-dark"
															style="border-radius: 1rem;" onclick="javascript:eventAddingModal()">+</button>
													</div>
											
												</div>
											</ul>
											
											
											<div class="modal fade in" id="eventDomainAddModal" tabindex="-1"
												role="dialog" aria-labelledby="eventDomainAddModalCenterTitle"
												aria-hidden="true">
												<div class="modal-dialog modal-dialog-centered" role="document">
													<div class="modal-content">
														<div class="modal-header">
															<span>${ category } domain</span>
															<button type="button" class="close" data-dismiss="modal"
																aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<form id="eventDomainAddForm" method="post">
															<input type=hidden name="logType" id="logType"value="event" />
															<input type=hidden name="domainCategory" value="${ category }" />
															
															<div class="modal-body">
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Name</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainName"
																			class="form-control ui-autocomplete-input" id="domainName"
																			placeholder="Input name" required>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Description</label>
																	<div class="col-sm-9">
																		<textarea class="form-control ui-autocomplete-input"
																			name="domainDes" id="domainDes" rows="5"></textarea>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Type</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainType"
																			class="form-control ui-autocomplete-input" id="domainType"
																			placeholder="Input domain" required>
																	</div>
																</div>
															</div>
											
															<div class="modal-footer">
																<button type="button" class="btn btn-danger" data-dismiss="modal">
																	<i class="fa fa-remove"></i> Close
																</button>
																<button type="button" class="btn btn-primary"
																	onclick="javascript:eventAddDomain()">
																	<i class="fa fa-save"></i> Save
																</button>
															</div>
														</form>
													</div>
												</div>
												</div>
										
											
											<div class="modal fade in" id="eventDomainInformationModal" tabindex="-1"
												role="dialog" aria-labelledby="eventDomainInformationModallCenterTitle"
												aria-hidden="true">
												<div class="modal-dialog modal-dialog-centered" role="document">
													<div class="modal-content">
														<div class="modal-header">
															<span>${ category } domain</span>
															<button type="button" class="close" data-dismiss="modal"
																aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<form id="eventDomainInformaionForm" method="post">
															<input type=hidden name="domainCategory" value="${ category }" /> 
															<input	type=hidden name="domainOrgName" id="domainOrgName" />
															<input	type=hidden name="logType" id="logType" value="event" />
															<div class="modal-body">
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Name</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainName"
																			class="form-control ui-autocomplete-input"
																			id="domainInformationName" placeholder="Input name" required>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Description</label>
																	<div class="col-sm-9">
																		<textarea class="form-control ui-autocomplete-input"
																			name="domainDes" id="domainInformationDes" rows="5"></textarea>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Type</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainType"
																			class="form-control ui-autocomplete-input"
																			id="domainInformationType" placeholder="Input domain" required>
																	</div>
																</div>
															</div>
											
															<div class="modal-footer">
																<button type="button" class="btn btn-danger"
																	onClick="javascript:removeDomain()">
																	<i class="fa fa-remove"></i> Remove
																</button>
																<button type="button" class="btn btn-primary"
																	onclick="javascript:editDomain()">
																	<i class="fa fa-edit"></i> Edit
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
												</div>

		                			 	
		                			 	<div class= "tab-pane fade" id="tab3">
		                			 			<ul class="domainList">
												<li style="list-style: none;">
													<div class="row domainTitle">
														<div class="col-sm-4">Name</div>
														<div class="col-sm-4">Description</div>
														<div class="col-sm-4">Type</div>
											
													</div>
												</li>
												<c:forEach var="domain" items="${operDomains}" varStatus="status">
													<li style="list-style: none;">
														<div class="row domainContent">
															<div class="col-sm-4 domainName">${ domain.name }</div>
															<div class="col-sm-4 domainDes">${ domain.des }</div>
															<div class="col-sm-4 domainType">${ domain.type }</div>
														</div>
													</li>
												</c:forEach>
												<div class="row">
													<div class="col-sm-12" style="text-align: center; margin-top: 10px">
														<button type="button" class="btn btn-outline-dark"
															style="border-radius: 1rem;" onclick="javascript:operAddingModal()">+</button>
													</div>
											
												</div>
											</ul>
											
											
											<div class="modal fade in" id="operDomainAddModal" tabindex="-1"
												role="dialog" aria-labelledby="operDomainAddModalCenterTitle"
												aria-hidden="true">
												<div class="modal-dialog modal-dialog-centered" role="document">
													<div class="modal-content"> 
														<div class="modal-header">
															<span>${ category } domain</span>
															<button type="button" class="close" data-dismiss="modal"
																aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<form id="operDomainAddForm" method="post">
															<input type=hidden name="domainCategory" value="${ category }" />
															<input type=hidden name="logType" value="oper" />
															<div class="modal-body">
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Name</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainName"
																			class="form-control ui-autocomplete-input" id="domainName"
																			placeholder="Input name" required>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Description</label>
																	<div class="col-sm-9">
																		<textarea class="form-control ui-autocomplete-input"
																			name="domainDes" id="domainDes" rows="5"></textarea>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Type</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainType"
																			class="form-control ui-autocomplete-input" id="domainType"
																			placeholder="Input domain" required>
																	</div>
																</div>
															</div>
											
															<div class="modal-footer">
																<button type="button" class="btn btn-danger" data-dismiss="modal">
																	<i class="fa fa-remove"></i> Close
																</button>
																<button type="button" class="btn btn-primary"
																	onclick="javascript:operAddDomain()">
																	<i class="fa fa-save"></i> Save
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
											<div class="modal fade in" id="operDomainInformationModal" tabindex="-1"
												role="dialog" aria-labelledby="operDomainInformationModallCenterTitle"
												aria-hidden="true">
												<div class="modal-dialog modal-dialog-centered" role="document">
													<div class="modal-content">
														<div class="modal-header">
															<span>${ category } domain</span>
															<button type="button" class="close" data-dismiss="modal"
																aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<form id="operDomainInformaionForm" method="post">
															<input type=hidden name="domainCategory" value="${ category }" /> <input
																type=hidden name="domainOrgName" id="domainOrgName" />
																<input type=hidden name="logType" value="oper" >
															<div class="modal-body">
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Name</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainName"
																			class="form-control ui-autocomplete-input"
																			id="domainInformationName" placeholder="Input name" required>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Description</label>
																	<div class="col-sm-9">
																		<textarea class="form-control ui-autocomplete-input"
																			name="domainDes" id="domainInformationDes" rows="5"></textarea>
																	</div>
																</div>
																<div class="form-group row">
																	<label class="col-sm-3 col-form-label">Type</label>
																	<div class="col-sm-9">
																		<input type="text" name="domainType"
																			class="form-control ui-autocomplete-input"
																			id="domainInformationType" placeholder="Input domain" required>
																	</div>
																</div>
															</div>
											
															<div class="modal-footer">
																<button type="button" class="btn btn-danger"
																	onClick="javascript:operRemoveDomain()">
																	<i class="fa fa-remove"></i> Remove
																</button>
																<button type="button" class="btn btn-primary"
																	onclick="javascript:operEditDomain()">
																	<i class="fa fa-edit"></i> Edit
																</button>
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
		
					</div>
				</div>
			</div>
		</div>
	
	<app:layout mode="stylescript" type="footer" />
</body>
</html>