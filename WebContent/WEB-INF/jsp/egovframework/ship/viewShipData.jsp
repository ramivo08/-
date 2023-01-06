<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/viewShipData.css">
<link rel="stylesheet" type="text/css" href="/assets/plugins/tui-grid/tui-grid.min.css">
<script type="text/javascript" src="/assets/plugins/tui-grid/tui-grid.min.js"></script>
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
									<h1 class="page-title">선박데이터 조회</h1>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do">
											<i class="fa fa-home"></i> Home
										</a></li>
									<li class="breadcrumb-item">선박등록</li>
									<li class="breadcrumb-item"><a href="/ship/viewShipData.do">선박데이터 조회</a></li>
								</ol>
								</nav>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-3">
								<div class="card">
									<div class="card-header">데이터 선택</div>
									<div class="card-body">
										<!-- <div class="row" id="radioDiv">
		                    			<div class="form-check col-sm-4">
				                          <input class="domainChk" type="radio" name="domainChk" id="ecChk" value="EC" >
				                          <label class="form-check-label" for="exampleRadios1">EC</label>
				                        </div>
				                        <div class="form-check col-sm-4">
				                          <input class="domainChk" type="radio" name="domainChk" id="uvChk" value="UV" checked>
				                          <label class="form-check-label" for="exampleRadios2">UV</label>
				                        </div>
				                        <div class="form-check col-sm-4">
				                          <input class="domainChk" type="radio" name="domainChk" id="o3Chk" value="O3">
				                          <label class="form-check-label" for="exampleRadios3">O3</label>
				                        </div>
		                    		</div> -->
										<div class="row">
											<div class="col-md-3">
												<ul class="nav nav-pills flex-column">
													<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id = "ecDrop" href="#" data-toggle="dropdown" aria-expanded="false" onClick="javascript:initChecked()">EC<b class="caret"></b></a>
													<div class="dropdown-menu" role="menu" aria-labelledby="myTabDrop21" style="">
															<a href="#ecDataDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Data</a>
															<a href="#ecEventDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Event</a>
															<a href="#ecOperDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Operation</a>
													</div></li>
													<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="uvDrop" href="#" data-toggle="dropdown" onClick="javascript:initChecked()" >UV<b class="caret"></b></a>
													<div class="dropdown-menu" role="menu" aria-labelledby="uvDrop" style="">
															<a href="#uvDataDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Data</a>
															<a href="#uvEventDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Event</a>
															<a href="#uvOperDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Operation</a>
													</div></li>
													<li class="nav-item dropdown"><a href="#" id="myTabDrop21" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" onClick="javascript:initChecked()">O3<b class="caret"></b>
														</a>
														<div class="dropdown-menu" role="menu" aria-labelledby="myTabDrop21" style="">
															<a href="#o3BallDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">Ballasting</a>
															<a href="#o3DeBallDiv" class="dropdown-item" tabindex="-1" data-toggle="tab" onClick="javascript:initChecked()">De-Ballasting</a>
														</div></li>
												</ul>
											</div>
											<div class="col-md-9">
												<div class="tab-content">
													<div class="tab-pane fade" id="ecDataDiv" data-value="data">
														<input type="hidden"  class="logType" value="data" >
														<div id="ecDataList" class="fnmRuleList">
														
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ ecFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${ecFnmRules.size() != 0}">
															<c:forEach var="fnmRule" items="${ ecFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if> </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="ecEventDiv">
														<input type="hidden"  class="logType" value="event">
														<div id="ecEventList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ ecFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${ecFnmRules.size() != 0}">
															
															<c:forEach var="fnmRule" items="${ ecFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="ecOperDiv">
													<input type="hidden"  class="logType" value="oper">
														<div id="ecOperList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ ecFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${ecFnmRules.size() != 0}">
															
															<c:forEach var="fnmRule" items="${ ecFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="uvDataDiv">
													<input type="hidden"  class="logType" value="data">
														<div id="uvDataList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ uvFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${uvFnmRules.size() != 0}">
															<c:forEach var="fnmRule" items="${ uvFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if> </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="uvEventDiv">
													<input type="hidden"  class="logType" value="event">
														<div id="uveventList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ uvFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${uvFnmRules.size() != 0}">
															
															<c:forEach var="fnmRule" items="${ uvFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="uvOperDiv">
														<input type="hidden"  class="logType" value="oper">
														<div id="uvOperList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ uvFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${uvFnmRules.size() != 0}">
															
															<c:forEach var="fnmRule" items="${ uvFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="o3BallDiv">
														<div id="ballFnmRuleList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ ballFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${ballFnmRules.size() != 0}">
															<c:forEach var="fnmRule" items="${ ballFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if> </ui>
														</div>
													</div>
													<div class="tab-pane fade" id="o3DeBallDiv">
														<div id="deballFnmRuleList" class="fnmRuleList">
															<ui>
															<li style="list-style: none;" id="title">
																<div class="row" id="fnmRuleTitle">
																	<div class="col-sm-5">IMO</div>
																	<div class="col-sm-7">Fnm Rule</div>

																</div>
															</li>
															<c:if test="${ deballFnmRules.size() == 0 }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${deballFnmRules.size() != 0}">
															<c:forEach var="fnmRule" items="${ deballFnmRules }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-5 fnmRuleImoNo">${ fnmRule.imoNo }</div>
																		<div class="col-sm-7 fnmRuleFnmRule">${ fnmRule.fnmRule }</div>
																	</div>
																</li>
															</c:forEach>
															</c:if> </ui>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="row selectBtn">
											<div class="col-sm-12" style="text-align: center;">
												<button type="button" class="btn btn-primary" id="dataSelectedBtn">Select</button>
											</div>
										</div>
									</div>
								</div>
								<div class="card" id="domainCard">
									<div class="card-header">도메인 정보</div>
									<div class="card-body">
										<ul>
											<li id="domainNameListItem">Domain Name</li>
											<li id="domainDesListItem">
												<div class="row">
													<div class="col-sm-4">Dscription</div>
													<div class="col-sm-8" id="desItemDiv"></div>
												</div>
											</li>
											<li id="domainTypeListItem">
												<div class="row">
													<div class="col-sm-4">Type</div>
													<div class="col-sm-8" id="typeItemDiv"></div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-sm-9">
								<div class="card" id="informationCard">
									<div class="card-header">데이터 정보</div>
									<div class="card-body" id="tableBody">
										<div id="grid"></div>
										<!-- <table id="dataTable">
										</table> -->

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
	<div class="wrap-loading display-none">
	<div><img src="/images/loading.gif"/></div>
	</div>
</body>
</html>