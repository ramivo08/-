<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<html lang="ko">

<head>

<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="/assets/css/jquery.contextMenu.css"/>
<link rel="stylesheet" href="/assets/css/font/context-menu-icons.woff2"/>
<app:layout mode="stylescript" type="main" />
<!-- <script  type="text/javascript" src="/assets/plugins/xlsx/xlsx.full.min.js"> </script> -->


	
<style>
tr th {
    padding: 20px 10px;
    border-top: 1px solid #102b79;
    border-bottom: 1px solid #102b79;
    
    /* font-size: 15px;
    font-weight: 400; */
}

</style>


</head>

<body>
<!-- <div class="wrap-loading display-none"> -->
<!-- 	<div><img src="/images/loading.gif"/></div> -->
<!-- </div> -->

	<div id="wrapper">
		
<app:layout mode="header" />
		<div class="main">
			<form:form  commandName="model" name="model" id="model"  method="post" onsubmit="return false;">
				<form:hidden path="page" />
				<form:hidden path="targetNo" />
				
			<div class="main-content">
				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">대상 차량 확인 </h1>
						<p class="page-subtitle">대상 차량 </p>
					</div>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="/main.do"><i
									class="fa fa-home"></i> Home</a></li>

						</ol>
					</nav>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<h3 class="card-header">대상차량 확인</h3>
							<div class="card-body">
							
									<div class="row mb-3">
										
<!-- 										<div class="input-group col-md-6"> -->
<!-- 											<div class="input-group-prepend"> -->
<!-- 												<span class="input-group-text" id="inputGroup-sizing-default">IMO 번호</span> -->
<!-- 											</div> -->
<%-- 											<c:if test="${countShip != 0 }"> --%>
<!-- 											<input type="text" class="form-control"  id="imo_num" name="imo_num" -->
<!-- 												aria-label="Sizing example input" -->
<%-- 												aria-describedby="inputGroup-sizing-default"  value="${imoNo}"> --%>
<%-- 											</c:if> --%>
<%-- 											<c:if test="${countShip == 0 }"> --%>
<!-- 											<input type="text" class="form-control"  id="imo_num" name="imo_num" -->
<!-- 												aria-label="Sizing example input" -->
<!-- 												aria-describedby="inputGroup-sizing-default"  > -->
<%-- 											</c:if> --%>
<!-- 										</div> -->
										<div class="input-group col-md-6">
									
											<div class="input-group col-md-2">
												<p>신청일 : </p>
											</div>
											<div class="input-group col-md-5">
												<div class="input-group date" >
													<form:input path="startDe"  class="form-control" id="startDe" value = ""/>
													<div class="input-group-append">
														<span class="input-group-text"> <i
															class="fa fa-calendar"></i>
														</span>
													</div>
												</div>
											</div>
											<div class="input-group col-md-5">
											<div class="input-group date" >
													<form:input path="endDe"  class="form-control" id="endDe" value ="" />
													<div class="input-group-append">
														<span class="input-group-text"> <i
															class="fa fa-calendar"></i>
														</span>
													</div>
												</div>
											</div>
									
										
										</div>
										<div class="input-group col-md-6">
											<div>
											<button type="button" class="btn btn-outline-info btn-sm" id="today">오늘</button>
											<button type="button" class="btn btn-outline-info btn-sm" id="1w">1주일</button>
											<button type="button" class="btn btn-outline-info btn-sm " id="1m">1개월</button>
											<button type="button" class="btn btn-outline-info btn-sm" id="3m">3개월 </button>
											</div>
										</div>
										
								
										
									</div>
								<div class="row mb-3">
									<div class="input-group col-md-6">
										<div class="input-group col-md-4">
											<div class="input-group mb-3">
							                    <div class="input-group-prepend">
							                      <label class="input-group-text" for="searchList">검색항목</label>
							                    </div>
							                    <form:select path ="searchList" class="custom-select" >
							                 		<form:option value = "all">전체</form:option>
							                    	<form:option value = "ownerNm" > 소유주명</form:option>
													<form:option value = "vehicleNum" > 자동차등록번호</form:option>	
							                    	<form:option value = "vehicleIdntfcNum" > 차대번호</form:option>
													<form:option value = "vehicleNm" > 차명</form:option>							                    
													<form:option value = "years" > 연식</form:option>							                    
							                    </form:select>
						                  </div>
										</div>
										<div class="input-group col-md-8">
											<form:input  path="searchValue" class="form-control ui-autocomplete-input" />
										</div>
									</div>
									
									<div class="input-group col-md-6">
										<div>
										<button type="button" class="btn  btn-sm" id="searchTarget" onclick="javascript:fn_search(1)" >검색</button>
										</div>
									</div>

							</div>
							
							<div class="row mb-3">
								<div class="input-group col-md-6">
									<div class="input-group col-md-6">
										<div class="input-group mb-3">
						                    <div class="input-group-prepend">
						                      <label class="input-group-text" for="targetProcess">진행상태</label>
						                    </div>
						                    <form:select path= "targetProcess" class="custom-select">
						                 		<form:option value="">선택</form:option>
						                     <c:forEach var="processList" items="${processList }" varStatus="status">

						                      <form:option value="${processList.codeId }">${processList.codeNm}</form:option>
						                      </c:forEach>
						                    </form:select>
						                  </div>
									</div>
									<div class="input-group col-md-6">
									
									</div>
								</div>
							
							</div>
								
						</div>
					</div>
					

					
					
				</div>
				<div class="row">
				
              </div>
					<div class="col-md-12">
						<div class="card" id="informaionCard">
							
							<div class="card-body" id="informationBody">
								<table class="table">
				                    <thead>
				                      <tr>
					                      <th>번호</th>
					                      <th>진행상태</th>
					                      <th>소유주 명</th>
					                      <th>신청일</th>
					                      <th>자동차등록번호</th>
					                      <th>차대번호</th>
					                      <th>차명</th>
					                      <th>연식</th>
					                      <th>폐차장</th>
					                      <th>상세정보</th>
				                      </tr>
				                    </thead>
				                    <tbody>
				                    <c:set var="totalSize">${totalSize}</c:set>
									<c:set var="pageSize">${pageSize}</c:set>
									<c:set var="pageNum">${totalSize-(pageSize*(currSize-1))}</c:set>
				                    <c:forEach var="targetList" items="${ list }" varStatus="status">
				                      <tr>
					                      <td>${targetList.target_no}</td>
					                      <td>${targetList.process}</td>
					                      <td>${targetList.owner_nm}</td>
					                      <td>${targetList.release_de}</td>
					                      <td>${targetList.vehicle_num}</td>
					                      <td>${targetList.vehicle_idntfc_num}</td>
					                      <td>${targetList.vehicle_nm}</td>
					                      <td>${targetList.years}</td>
					                      <td>${targetList.junkyard}</td>
					                      <td><button class='btn btn-sm' id="info" onclick="javascript:selectTarget(${targetList.target_no})">상세정보 </button></td>
				                      </tr>
				                   
				                      </c:forEach>
				                    </tbody>
				                    
				                  </table>
									<app:paging name="pageList" jsFunction="fn_search" />
							</div>
								
							</div>	
							
						</div>
					</div>
					
				</div>
				</form:form>
			
			</div>
		</div>

	</div>
	<!-- END WRAPPER -->
		<!-- END MAIN -->
		<div class="clearfix"></div>
		<footer>
			<div class="container-fluid">
<!-- 				<p class="copyright"> -->
<!-- 					Shared by <i class="fa fa-love"></i><a -->
<!-- 						href="https://bootstrapthemes.co">BootstrapThemes</a> -->
<!-- 				</p> -->
			</div>
		</footer>
		<!-- end WRAPPER -->
		
	<div class="loadingModal"></div>
	

	
	<!-- Vendor -->
	
	<div class="wrap-loading display-none">
			<div class = "card">
				<div class= "card-body">
					<h3 class="mb-3 mt-3">데이터 입력중입니다.</h3>
					
					<img class= mb-3 src="/images/loading.gif"/>
					<h4 class="mb-3 mt-3" ><b id="secTimer">0</b>초</h4>	
					<p>데이터 양에 따라서 시간이 오래걸릴수도 있습니다.</p>
				</div>
			</div>
	</div>
	</div>

</body>
</html>