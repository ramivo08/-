<!DOCTYPE html>
<%@ page language="java" pageEncoding="utf-8"%>


<html lang="ko">
<head>
<%@ include file="/WEB-INF/jsp/egovframework/header.jsp"%>
<app:layout mode="stylescript" type="popup" />

<link rel="stylesheet" type="text/css"
	href="/assets/plugins/tui-grid/tui-grid.min.css">
<link href="/assets/css/Chart.css" rel="stylesheet" type="text/css" />
<link
	href="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css"
	rel="stylesheet" type="text/css" />


<script type="text/javascript"
	src="/assets/plugins/tui-grid/tui-grid.min.js"></script>
<script type="text/javascript" src="/assets/js/Chart.bundle.js"></script>
<script type="text/javascript"
	src="/assets/plugins/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript"
	src="/js/dashPop.js"></script>
</head>
<body>
<!-- 	<div id="wrapper"> -->
<%-- 	<app:layout mode="header" /> --%>
		<div class="main">
			<div class="main-content">
				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">${colNm} 가시화</h1>
						
					</div>
				</div>
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">
							
								<div class="card-body">
									
									<div id="colNm">컬럼명 : ${colNm}</div>
									<div id="des">설명 : ${domainMap.des}</div>
									<div id="type">타입 : ${domainMap.type}</div>
									
									<table id="driveTable"
										class="w-100 table   table-sm  text-center mt-3">
										<colgroup>
											<col width="8%" />
											<col width="10%" />
											<col width="10%" />
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
											</tr>
										</thead>
										<tbody>

										</tbody>
									</table>
								</div>
							
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header" id="graphCard"> ${colNm} 그래프</div>
								<div class="card-body">
									<canvas id="popupChart"></canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>

	<form name="gridForm" id="gridForm" method="post">
    	<input type="hidden" name="stratTime" id="startTime" value="${paramMap.startTime} " />
    	<input type="hidden" name="endTime" id="endTime" value="${paramMap.endTime}"/>
    	<input type="hidden" name="imo_num" id="imo_num" value="${paramMap.imoNum}"/>
    	<input type="hidden" name="shipNm" id="shipNm" value="${paramMap.shipNm}"/>
    	<input type="hidden" name="category" id="category" value="${paramMap.category}"/>
    	<input type="hidden" name="colNm2"	 id="colNm2" value="${lowerColNm}"/>
   	</form>
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
<!-- 					<col width="8%" /> -->
<!-- 					<col width="8%" /> -->
<!-- 					<col width="8%" /> -->
<!-- 					<col width="8%" /> -->
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
<!-- 						<th class="vertical-middle">이상치</th> -->
<!-- 						<th class="vertical-middle">자료수</th> -->
<!-- 						<th class="vertical-middle">이상치 비율</th> -->
<!-- 						<th class="vertical-middle">판별</th> -->
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
	

</body>


</html>