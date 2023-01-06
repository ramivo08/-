
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="ko">
<head>
<%@ include file="../header.jsp"%>
<app:layout mode="stylescript" type="main" />
<link
	href="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css"
	rel="stylesheet" type="text/css" />
	<script src="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
	
<style>
</style>
</head>

<body>
	<div id="wrapper">
		<app:layout mode="header" />


		<div class="main">
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<div class="content-heading">
						<div class="heading-left">
							<h1 class="page-title">선박 정보 등록</h1>
							<p class="page-subtitle">선박에대한 정보를 등록합니다.</p>
						</div>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="/main.do"><i
										class="fa fa-home"></i> Home</a></li>
								<li class="breadcrumb-item">선박등록</li>
								<li class="breadcrumb-item">선박 정보 등록</li>

							</ol>
						</nav>
					</div>


					<div class="row">
						<div class="col-md-6">
							<div class="card ">
								<div class="card-header">선박명 검색</div>
								<div class="card-body">

									<div class="form-group row">
										<label class="col-sm-3 col-form-label">선박명</label>
										<div class="input-group col-sm-9">
											<input class="form-control" id="searchShipName" name="shipName"
												type="text"> <span class="input-group-append">
												<a href="javascript:searchShip()" class="btn btn-primary"
												id="shipSearch">검색</a>
											</span>
										</div>
									</div>
								</div>
							</div>

							<div class="card ">
								<div class="card-header">선박 조회 결과</div>
								<div class="card-body" id="shipSearchResult">
									
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="card ">
								<div class="card-header">선박 정보 입력</div>
								<div class="card-body">
									<form id="shipInfo" method="post">
										<fieldset>
											<legend class="center">선박 정보 </legend>
											<div class="form-group row">
												<label for="ticket-type" class="col-sm-3 col-form-label">처리방식<b>*</b></label>
												<div class="col-sm-9">
													<select id="bwmsType" name="bwmsType" class="form-control">
														<option value="" selected>처리방식선택</option>
														<option value="EC">전기분해</option>
														<option value="UV">자외선</option>
														<option value="O3">오존</option>
													</select>
												</div>
											</div>
											<div class="form-group row">
												<label for="shipName" class="col-sm-3 col-form-label">선박명<b>*</b></label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="selectShipName"
														name="shipName">
												</div>
											</div>
											<div class="form-group row">
												<label for="imoNo" class="col-sm-3 col-form-label">IMO번호<b>*</b></label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="imoNo"
														name="imoNo">
												</div>
											</div>
											<div class="form-group row">
												<label for="shipNo" class="col-sm-3 col-form-label">선박번호</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="shipNo"
														name="shipNo">
												</div>
											</div>
											<div class="form-group row">
												<label for="shipNlty" class="col-sm-3 col-form-label">선박
													국적</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="shipNlty"
														name="shipNlty">
												</div>
											</div>
											<div class="form-group row " >
											
<!-- 											<div class="input-daterange input-group margin-bottom" -->
<!-- 												data-provide="datepicker" > -->
<!-- 												<div class="input-group-prepend"> -->
<!-- 													<span class="input-group-text">기간 선택</span> -->
<!-- 												</div> -->
<!-- 												<input type="text" class="form-control datePick" name="start" -->
<!-- 													id="termDataStartDate"> -->
<!-- 												<div class="input-group-prepend"> -->
<!-- 													<span class="input-group-text">~</span> -->
<!-- 												</div> -->
<!-- 												<input type="text" class="form-control datePick" name="end" -->
<!-- 													id="termDataEndDate"> -->
<!-- 											</div> -->

												<label for="shipCnstrDt" class="col-sm-3 col-form-label">선박
													건조 일시</label>
												<div class="col-sm-9" >
													<input type="text" class="form-control datePick" id="shipCnstrDt"
														name="shipCnstrDt" data-provide="datepicker" data-date-autoclose="true" data-date-format="yyyy-mm-dd " autocomplete="off">
												</div>
											</div>
											<div class="form-group row">
												<label for="shipGrtg" class="col-sm-3 col-form-label">총
													톤수</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="shipGrtg"
														name="shipGrtg">
												</div>
											</div>
											<div class="form-group row">
												<label for="shipKnd" class="col-sm-3 col-form-label">선박
													종류</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="shipKnd"
														name="shipKnd">
												</div>
											</div>
											<div class="form-group row">
												<div class="offset-sm-3 col-sm-9">
													<button type="button" class="btn btn-primary btn-block" onClick="javascript:insertShip()" >저장</button>
												</div>
											</div>
										</fieldset>

									</form>
								</div>
							</div>
						</div>
					</div>
					<!--  End -->



				</div>
			</div>
		</div>
	</div>

	<!-- END MAIN -->
	<div class="clearfix"></div>
	




	<!-- Vendor -->
	<script src="/assets/js/vendor.min.js"></script>

	<!-- Plugins -->
	<script src="/assets/plugins/chart.js/Chart.min.js"></script>
	<script src="/assets/plugins/chartist/chartist.min.js"></script>
	<script src="/assets/plugins/flot/jquery.canvaswrapper.js"></script>
	<script src="/assets/plugins/flot/jquery.colorhelpers.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.saturated.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.browser.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.drawSeries.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.uiConstants.js"></script>
	<script src="/assets/plugins/flot/jquery.flot.resize.js"></script>
	<script src="/assets/plugins/easy-pie-chart/jquery.easypiechart.min.js"></script>
	<script src="/assets/plugins/datatables.net/jquery.dataTables.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-bs4/dataTables.bootstrap4.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-buttons/js/buttons.html5.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-buttons/js/buttons.print.min.js"></script>
	<script src="/assets/plugins/jszip/jszip.min.js"></script>
	<script src="/assets/plugins/pdfmake/pdfmake.min.js"></script>
	<script src="/assets/plugins/pdfmake/vfs_fonts.js"></script>
	<script
		src="/assets/plugins/datatables.net-buttons-bs4/buttons.bootstrap4.min.js"></script>
	<!-- sweetalert -->
	<script src="/assets/plugins/sweetalert2/sweetalert2.all.min.js"></script>
	<script src="/assets/js/pages/sweetalert2.init.min.js"></script>

	<!-- App -->
	<script type="text/javascript" src="/assets/js/app.min.js"></script>


</body>
</html>
