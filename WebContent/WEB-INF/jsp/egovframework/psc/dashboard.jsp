<!DOCTYPE html>
<%@ page language="java" pageEncoding="utf-8"%>


<html lang="ko">

<head>
<%@ include file="../header.jsp"%>
<app:layout mode="stylescript" type="main" />
<link rel="stylesheet" type="text/css" href="/css/pscDashboard.css">
<link rel="stylesheet" type="text/css"
	href="/assets/plugins/tui-grid/tui-grid.min.css">
<link href="/assets/css/Chart.css" rel="stylesheet" type="text/css" />
<link
	href="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css"
	rel="stylesheet" type="text/css" />

	<script src="/assets/plugins/chart.js/moment.min.js"></script>
	<script type="text/javascript"
		src="/assets/plugins/tui-grid/tui-grid.min.js"></script>
	<script type="text/javascript" src="/assets/js/Chart.bundle.js"></script>
	
	
<!-- <script type="text/javascript" src="/assets/js/pages/forms-input-pickers.init.js"></script> -->


<!-- <script type="text/javascript" src="/assets/plugins/tui-chart/tui-chart.min.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" href="/assets/plugins/tui-chart/tui-chart.min.css"> -->
<script defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0hEiiLTCSgttQP1EO9cLcRrqs3wtKkto">
	</script>
<style>
html,body{

	height: 100%;
  	margin: 0;
 	 padding: 0;
}
.margin-bottom {
	margin-bottom: 20px;
}
canvs {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
}
.btn .btn-result{
	margin-right:10px;
}

</style>
</head>

<!--   -->
<body style="background-color: #f5f6f9;">


	<!-- WRAPPER -->
	<div id="wrapper">

		<app:layout mode="header" />

		<!-- MAIN -->
		<div class="main">

			<!-- MAIN CONTENT -->
			<div class="main-content">

				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">운전데이터 분석</h1>
						<p class="page-subtitle">등록된 데이터를 시각화,분석하는 페이지 입니다.</p>
					</div>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="/main.do"> <i
									class="fa fa-home"></i> Home
							</a></li>
							<li class="breadcrumb-item"><a href="#">Dashboard</a></li>

						</ol>
					</nav>
				</div>

				<div class="container-fluid">
					<div class="row">
						<div class="col-md-3">
							<div class="card">
								<div class="card-body">
									
<!-- 									<div class="input-group margin-bottom"> -->
<!-- 										<div class="input-group-prepend"> -->
<!-- 											<label class="input-group-text" for="searchImo">선박 검색</label> -->
<!-- 										</div> -->

<!-- 										<input type="text" class="form-control" id="searchImo" -->
<!-- 											placeholder="IMO No."></input> -->
<!-- 									</div> -->
									<div class="text-center w-100 mb-2 margin-bottom">
										<div
											class="d-inline-block w-32 btn btn-light my-2 py-1 bwms_type">EC</div>
										<div
											class="d-inline-block w-32 btn btn-light my-2 py-1 bwms_type">UV</div>
										<div
											class="d-inline-block w-32 btn btn-light my-2 py-1 bwms_type">O3</div>
									</div>
									<div class="shipTableList">
										<table id="shipList"
											class="table table-hover table-sm table-light my-3 text-center margin-bottom">
											<colgroup>
												<col width="60%" />
												<col width="40%" />
											</colgroup>
											<thead>
												<tr>
													<th>선박명</th>
													<th>IMO번호</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
											<%-- <c:forEach items="${ fnmRuleList }" var="fnm" varStatus="status">
												<tr>
													<td>${ fnm.fnmRule }</td>
													<td>${ fnm.imoNo }</td>
												</tr>
											</c:forEach> --%>
										</table>
									</div>
									<div class="input-daterange input-group margin-bottom"
										data-provide="datepicker" >
										<div class="input-group-prepend">
											<span class="input-group-text">기간 선택</span>
										</div>
										<input type="text" class="form-control datePick" name="start"
											id="termDataStartDate">
										<div class="input-group-prepend">
											<span class="input-group-text">~</span>
										</div>
										<input type="text" class="form-control datePick" name="end"
											id="termDataEndDate">
										<input type="hidden" id="dataStartDate"  name =dataStartDate>	
										<input type="hidden" id="dataEndDate"  name =dataEndDate>	
											
									</div>
									<div class="input-group text-center">
										<button type="button" class="col-md-12 btn btn-dark" id="termBtn">단위운전 기간 조회</button>
									</div>
									<div class="margin-bottom">
										<table id="shipDataList"
											class="table table-sm table-hover table-light my-3">
											<colgroup>
												<col width="6%" />
												<col width="45%" />
												<col width="2%" />
												<col width="47%" />
											</colgroup>
											<tbody>
											
											

											</tbody>
										</table>
									</div>
									
									<div class="margin-bottom pscTableList">
										<table id="shipOperList"
											class="table table-sm table-hover table-light my-3">
											<colgroup>
												<col width="6%" />
												<col width="45%" />
												<col width="2%" />
												<col width="47%" />
											</colgroup>
											<tbody>

											</tbody>
										</table>
									</div>

									<div class="input-group margin-bottom">
										<div class="input-group-prepend">
											<label class="input-group-text" for="validData">유효
												데이터</label>
										</div>
										<select class="custom-select" id="validData" name="validData">
											<option id="notDeletedOption" value="not" disabled selected>데이터 선택
												</option>
											<!-- <option value="TRO_B1">TRO_B1</option>
											<option value="TRO_B2">TRO_B2</option> -->
										</select>
									</div>
									<div class="row py-3 margin-bottom" >
										<div class="col-md-8 my-auto">
											<h6 class="font-weight-bold">데이터 분석  ></h6>
										</div>
										<div class="col-md-4 my-auto text-center">
											<button type="button" class="col-md-12 btn btn-dark" id="analysisBtn">분석</button>
										</div>
									</div>
									<div>
										<h5>정상운전 판별 기준</h5>
										<form ></form>
										<div class="border border-dark p-2">
											<h6 class="mb-1 font-weight-bold">전기분해방식</h6>
											<ul class="pl-3 mb-1">
												<li class="list-unstyled">
													<div class="row ml-0">
														<label class="col-form-label">	정상</label>
										 				<input type="number" class="form-control cb-20" step="0.1" id="ecMin" value="6">
										 				<label class="col-form-label">~</label>
									 					<input type="number" class="form-control cb-20" step="0.1" id="ecMax" value="8">
								 					</div>
												</li>
													
												<li class="list-unstyled">
													<label class="col-form-label">점검 (이외)</label>
												</li>
												<li class="list-unstyled"></li>
											</ul>
											<h6 class="mb-1 font-weight-bold">자외선 처리 방식</h6>
											<ul class="pl-3 mb-1">
												<li class="list-unstyled">
													<div class="row ml-0">
														<label class="col-form-label ">	정상 UV DOSE &gt;= </label>
										 				<input type="number" class="form-control cb-20"  id="uvMax" value="250">
								 					</div>												
												</li>
												<li class="list-unstyled">이상 UV DOSE(입력값 미만)</li>
											</ul>
											<h6 class="mb-1 font-weight-bold">오존 처리 방식</h6>
											<ul class="pl-3 mb-1">
												<li class="list-unstyled">
													<div class="row ml-0">
														<label class="col-form-label">	정상</label>
										 				<input type="number" class="form-control cb-20" step="0.1" id="o3Min" value="2.3">
										 				<label class="col-form-label">&lt;= O3 &lt;=</label>
									 					<input type="number" class="form-control cb-20" step="0.1" id="o3Max" value="2.6">
									 				</div>
												</li>
												<li class="list-unstyled">이상 O3(범위 외의 값)</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-9" id="firstHide" style="display:none;">
							<div class="card">
								<div class="card-header d-flex justify-content-between align-items-center">
									<span>운전 데이터
<!-- 										<a href="#" class="toggle-toggle" data-toggle="modal" data-target="#driveDataModal" -->
<!-- 											 id="" title="도움말"> -->
<!-- 											 <span><i class="ti-help btn-help"></i></span> -->
<!-- 										</a> -->
									</span>
									
									<div class="right btn btn-result">
										<span id="discrim">
											<span id="resultColor"></span><span id="isResult"></span>								
										</span>
									</div>
										
								</div>
								<div class="card-body">
									
									<table id="driveTable"
										class="w-100 table  table-responsive table-sm table-light text-center">
										<colgroup>
											<col width="8%" />
											<col width="10%" />
											<col width="10%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
											<col width="8%" />
										</colgroup>
										<thead class="">
											<tr>
												<th>선박명</th>
												<th>시작 일시</th>
												<th>종료 일시</th>
												<th>최소값</th>
												<th>최대값</th>
												<th>평균</th>
												<th>중간값</th>
												<th>표준편차</th>
												<th>이상치 </th>
												<th>자료수</th>
												<th>이상치 비율
												<a href="#" class="toggle-toggle" data-toggle="modal" data-target="#driveDataModal"
											 				id="" title="도움말">
											 		<span><i class="ti-help btn-help"></i></span>
												</a>
												</th>
												<th>판별</th>
											</tr>
										</thead>
										<tbody>

										</tbody>
									</table>
									
								</div>
							</div>
							<div class="row" >
								<div class="col-md-6">
									<div class="card card-tab" id="pointChartCard">
										<div class="card-header" id="graphCard">
											<ul class="nav nav-tabs" role="tablist">
							                    <li class="nav-item"><a href="#tab1" class="nav-link active" data-toggle="tab">운전데이터 가시화</a></li>
<!-- 							                    <li class="nav-item"><a href="#tab2" class="nav-link" data-toggle="tab">EVENTLOG 가시화</a></li> -->
<!-- 							                    <li class="nav-item"><a href="#tab3" class="nav-link" data-toggle="tab">전류 그래프</a></li> -->
						                	</ul>
<!-- 						                	<div class="right  btn btn-result" id ="stEndDt"> -->
<!-- 												<span id = "firLabel"></span> -->
<!-- 												<span id = "secLabel"></span> -->
<!-- 											</div> -->
					               		 </div>
									
										<div class="card-body">
											<canvas id="pointChart"></canvas>
										</div>
									</div>
								</div>
									<div class="col-md-6" >
									<div class="card" style="height:95%;">
										<div class="card-header">
											<span>지도</span>
										</div>
											<div class="card-body" style="width:100%;height:100%;">
												<div id="map" class="map" style="height:100%;"></div>
											</div>
										
									</div>
								</div>
							</div>

						
						
							<div class="row">
								<div class="col-md-12" >	
									<div class="card">
										<div class="card-header d-flex justify-content-between align-items-center"">
											<span>운전자료</span>
											<div class="right">
                  							  <button type="button" class="btn btn-primary btn-sm" id="csvDownload" onclick="csvDownload();"><i class="ti-save"></i> CSV</button>
                  							</div>
										</div>
										<div class="card-body" id="fnmRuleListBody">
											<div id="grid"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<!-- END MAIN CONTENT -->


				<!-- END MAIN -->


<!-- 				<div class="clearfix"></div> -->

				<!-- footer -->
<!-- 				<footer> -->
<!-- 					<div class="container-fluid"> -->
<!-- 						<p class="copyright"> -->
<!-- 							&copy; 2020 <a href="https://www.themeineed.com" target="_blank">Theme -->
<!-- 								I Need</a> . All Rights Reserved. -->
<!-- 						</p> -->
<!-- 					</div> -->
<!-- 				</footer> -->
				<!-- end footer -->

			</div>
			<!-- END WRAPPER -->
		</div>
	</div>

	
	<script
		src="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
		
	<app:layout mode="stylescript" type="footer" />
	<div class="wrap-loading display-none">
			<div class = "card">
				<div class= "card-body">
					<h3 class="mb-3 mt-3">데이터 조회중입니다.</h3>
					
					<img class= mb-3 src="/images/loading.gif"/>
					<p>데이터 양에 따라서 시간이 오래걸릴수도 있습니다.</p>
				</div>
			</div>
	</div>
	
	
	<div class="modal" tabindex="-1" role="dialog" id="driveDataModal">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title">운전 데이터 분석 설명 </h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
<!-- 	        <h5>◈ 처리방식별 정상범위</h5> -->
<!-- 	        <table class="table table-bordered text-center"> -->
<!-- 	        	<thead> -->
<!-- 	        		<tr align="center"> -->
<!-- 		        		<th rowspan="3" align="center" valign="middle"  class="vertical-middle">적정범위구분</th> -->
<!-- 		        		<th colspan="4">처리방식별 적정값 기준</th>		        		 -->
<!-- 	        		</tr> -->
<!-- 	        		<tr align="center">  -->
<!-- 	        			<th colspan="2"> EC <br> (TRO)</th> -->
<!-- 	        			<th rowspan="2"  class="vertical-middle"> UV <br> (UV-DOSE)</th> -->
<!-- 	        			<th rowspan="2"  class="vertical-middle"> O3 <br> (O3-DOSE)</th> -->
<!-- 	        		</tr> -->
<!-- 	        		<tr align="center"> -->
<!-- 	        			<th> B </th> -->
<!-- 	        			<th> D </th> -->
<!-- 	        		</tr> -->
<!-- 	        	</thead> -->
<!-- 	        	<tbody> -->
<!-- 	        	<tr> -->
<!-- 	        		<th>상한값</th> -->
<!-- 	        		<td><span id="ecMax_h"></span></td> -->
<!-- 	        		<td>0.1</td> -->
<!-- 	        		<td>-</td> -->
<!-- 	        		<td><span id="o3Max_h"></span></td> -->
<!-- 	        	</tr> -->
<!-- 	        	<tr> -->
<!-- 	        		<th>하한값</th> -->
<!-- 	        		<td><span id="ecMin_h"></span></td> -->
<!-- 	        		<td>-</td> -->
<!-- 	        		<td><span id="uvMin_h"></span></td> -->
<!-- 	        		<td><span id="o3Min_h"></span></td> -->
<!-- 	        	</tr> -->
<!-- 	        	<tr> -->
<!-- 	        		<th colspan="5"> 범위 바깥에 존재하는 값을 이상치(Outlier)로 간주 </th> -->
<!-- 	        	</tr> -->
<!-- 	        	</tbody> -->
	        	
<!-- 	        </table> -->
	        
	         <h5>◈ 운전상태 식별 기준 안</h5>
	        
	        <table class="table table-bordered text-center">
	        	<thead>
	        		<tr align="center">
		        		<th rowspan="2" align="center" valign="middle" class="vertical-middle">운전상태구분</th>
		        		<th colspan="3">운전상태 식별 기준</th>		        		
	        		</tr>
	        		<tr align="center"> 
	        			<th> EC <br> (TRO)</th>
	        			<th> UV <br> (UV-DOSE)</th>
	        			<th> O3 <br> (O3-DOSE)</th>
	        		</tr>	        		
	        	</thead>
	        	<tbody>
		        	<tr>
		        		<th><span class="green">●</span> 정상</th>
		        		<td>10% 미만</td>
		        		<td>5% 미만</td>
		        		<td>5% 미만</td>
		        	</tr>
		        	<tr>
		        		<th><span class="orange">●</span> 검토</th>
		        		<td>10 ~ 20% 미만</td>
		        		<td>5 ~ 10% 미만</td>
		        		<td>5 ~ 10% 미만</td>
		        	</tr>
		        	<tr>
		        		<th><span class="red">●</span> 이상</th>
		        		<td>20% 초과</td>
		        		<td>10% 초과</td>
		        		<td>10% 초과</td>
		        	</tr>
	        	<tr>
	        		<th colspan="4"> %값은 각 정상운전범위를 벗어나는 값(이상치)의 발생비율<br>
                                    (식별기준 범위는 사용자가 변경하여 적용 가능)</th>
	        	</tr>
	        	</tbody>
	        	
	        </table>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	
	
	<div class="modal" tabindex="-1" role="dialog" id="newDataAnalysisModal">
	  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title">그래프 지정 운전데이터 분석</h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	      <div id="modalTable">
	    <table id="newDriveTable"	class="w-100 table   table-sm  text-center">
				<colgroup>
					<col width="8%" />
					<col width="10%" />
					<col width="10%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
					<col width="8%" />
				</colgroup>
				<thead class="">
					<tr>
					<th colspan='12'>운전 데이터 분석</th>
					</tr>
					<tr>
						<th class="vertical-middle">선박명</th>
						<th class="vertical-middle">시작 일시</th>
						<th class="vertical-middle">종료 일시</th>
						<th class="vertical-middle">최소값</th>
						<th class="vertical-middle">최대값</th>
						<th class="vertical-middle">평균</th>
						<th class="vertical-middle">중간값</th>
						<th class="vertical-middle">표준편차</th>
						<th class="vertical-middle">이상치</th>
						<th class="vertical-middle">자료수</th>
						<th class="vertical-middle">이상치 비율</th>
						<th class="vertical-middle">판별</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
			</div>
			
			
			<div class="col-md-12">
				<div class="card " id="pointChartCard">
					<div class="card-header">
						<span>지정데이터 그래프</span>
						<div class="right btn btn-result">
										<span id="newDis">
											<span id="newResultColor" ></span><span id="newIsResult"></span>								
										</span>
									</div>
               		 </div>
				
					<div class="card-body">
						<canvas id="newPointChart"></canvas>
					</div>
				</div>
			</div>
	        	
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
	
<!-- 	<form name="gridForm" id="gridForm" method="post"> -->
<!--     	<input type="text" name="stratTime" id="startTime" /> -->
<!--     	<input type="text" name="endTime" id="endTime" /> -->
<!--     	<input type="text" name="imo_num" id="imo_num" /> -->
<!--     	<input type="text" name="shipNm" id="shipNm" /> -->
<!--     	<input type="text" name="category" id="category" /> -->
<!--     	<input type="text" name="colNm"	 id="colNm"/> -->
<!--    	</form> -->




</body>

</html>
