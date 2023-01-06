<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" href="../css/viewShipData.css">

<style>
html,body{height:100%;}
#wrapper,#main{height:100%;}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #e9eef2;
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
									<h1 class="page-title">FTP 수신자료</h1>
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
												<c:forEach var="ftpDir" items="${ftpDir}" varStatus="status">
													<li class="nav-item "><a class="nav-link ftpForder " href="#${ftpDir}div" data-toggle="tab" aria-expanded="true" onClick="javascript:initChecked()">${ftpDir}</a></li>
													
												</c:forEach>
													
														
												</ul>
											</div>
											<div class="col-md-9">
												<div class="tab-content">
													<div class="tab-pane fade show in" id="NKdiv">
														<div id="ecFnmRuleList" class="fnmRuleList">
															<ul>
															<li style="list-style: none;" id="title">
																<div class="row" id="fileNameTitle">
																	<div class="col-sm-12">파일명</div>
																</div>
															</li>
															<c:if test="${empty nkDir  }">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${not empty nkDir}">
															<c:forEach var="fnmRule" items="${ nkDir }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRule">${ nkDir[status.index]}</div>
																		
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ul>
														</div>
													</div>
													<div class="tab-pane fade show in" id="isabuhodiv">
														<div id="ecFnmRuleList" class="fnmRuleList">
															<ul>
															<li style="list-style: none;" id="title">
																<div class="row" id="fileNameTitle">
																	<div class="col-sm-12">파일명</div>
																</div>
															</li>
															<c:if test="${empty isabuDir}">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${not empty isabuDir}">
															<c:forEach var="fnmRule" items="${ isabuDir }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRule">${ isabuDir[status.index]}</div>
																		
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ul>
														</div>
													</div>
													<div class="tab-pane fade show in" id="onNuridiv">
														<div id="ecFnmRuleList" class="fnmRuleList">
															<ul>
															<li style="list-style: none;" id="title">
																<div class="row" id="fileNameTitle">
																	<div class="col-sm-12">파일명</div>
																</div>
															</li>
															<c:if test="${empty onnuriDir}">
															<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRuleNull">해당타입에 등록된 데이터가 없습니다.</div>
																		
																	</div>
																</li>
															</c:if>
															<c:if test="${not empty onnuriDir}">
															<c:forEach var="fnmRule" items="${ onnuriDir }" varStatus="status">
																<li style="list-style: none;" class="content">
																	<div class="row fnmRuleContent">
																		<div class="col-sm-12 fnmRule">${ onnuriDir[status.index]}</div>
																		
																	</div>
																</li>
															</c:forEach>
															</c:if>
															 </ul>
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
<!-- 								<div class="card" id="domainCard"> -->
<!-- 									<div class="card-header">도메인 정보</div> -->
<!-- 									<div class="card-body"> -->
<!-- 										<ul> -->
<!-- 											<li id="domainNameListItem">Domain Name</li> -->
<!-- 											<li id="domainDesListItem"> -->
<!-- 												<div class="row"> -->
<!-- 													<div class="col-sm-4">Dscription</div> -->
<!-- 													<div class="col-sm-8" id="desItemDiv"></div> -->
<!-- 												</div> -->
<!-- 											</li> -->
<!-- 											<li id="domainTypeListItem"> -->
<!-- 												<div class="row"> -->
<!-- 													<div class="col-sm-4">Type</div> -->
<!-- 													<div class="col-sm-8" id="typeItemDiv"></div> -->
<!-- 												</div> -->
<!-- 											</li> -->
<!-- 										</ul> -->
<!-- 									</div> -->
<!-- 								</div> -->
							</div>
							<div class="col-sm-9">
								<div class="card" id="informationCard">
									<div class="card-header">데이터 정보</div>
										<div class="card-body" id="tableBody" style="width:100%; height: calc(100vh - 300px); overflow:auto">


												<table class="table table-bordered" id="csvTable">
								                    <thead id="csvHeader">
								                     
								                    </thead>
								                    <tbody id = "csvBody">
								                     
								                    </tbody>
								                  </table>
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
			<div class = "card">
				<div class= "card-body">
					<h3 class="mb-3 mt-3">데이터 조회중입니다.</h3>
					
					<img class= mb-3 src="/images/loading.gif"/>
					<h4 class="mb-3 mt-3" ><b id="secTimer">0</b>초</h4>	
					<p>데이터양에 따라서 시간이 오래걸릴수도 있습니다.</p>
				</div>
			</div>
	</div>

</body>
</html>