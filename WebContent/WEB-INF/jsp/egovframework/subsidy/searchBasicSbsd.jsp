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
<link rel="stylesheet" href="../css/insertShipData.css"/>
<link rel="stylesheet" type="text/css" href="/assets/plugins/tui-grid/tui-grid.min.css">
<script type="text/javascript" src="/assets/plugins/tui-grid/tui-grid.min.js"></script>




</head>

<body>
<!-- <div class="wrap-loading display-none"> -->
<!-- 	<div><img src="/images/loading.gif"/></div> -->
<!-- </div> -->

	<div id="wrapper">
		<app:layout mode="header" />

		<div class="main">
			
			<div class="main-content">
				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">기초 보조금 데이터관리</h1>
						<p class="page-subtitle">기초 보조금 데이터관리</p>
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
							<h3 class="card-header">기초 보조금 데이터관리</h3>
							<div class="card-body">
									<div class="row mb-3">
										<div class="input-group col-md-6">
											<button type="button" id="excelExport">EXPORT</button>&nbsp;
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
							<h3 class="card-header">운전자료</h3>
							<div class="card-body" id="informationBody">
				
								<div id="div1" class="m-3"></div>
								<div id="excel" class="m-3">
								<div id="table-grid"></div>
							</div>
								<div id="hiddenTableForJson" style="display : none;"></div>
							</div>	
						</div>
					</div>
					
				</div>
				
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
	
	<div class="modal" tabindex="-1" role="dialog" id="existColumn">
	  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title">기존에 등록된 표준 항목 존재</h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	       	 기존에 등록된 표준화 컬럼들이있습니다. 등록된 표준화 컬럼으로 데이터를 등록하겠습니다.
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-success" id="existRegi" >네</button>
<!-- 	        <button type="button" class="btn btn-danger" data-dismiss="modal">아니요</button> -->
	      </div>
	    </div>
	  </div>
	</div>
	
	<!-- Vendor -->
	<script src="/assets/js/vendor.min.js"></script>

	<!-- Plugins -->
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
	<script
		src="/assets/plugins/datatables.net-buttons-bs4/buttons.bootstrap4.min.js"></script>
	<!-- 엑셀 스크립트 -->
	
		<script
		src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.3/xlsx.full.min.js"></script>
	
	
	
	<!-- App -->
	<script type="text/javascript" src="/assets/js/app.min.js"></script>
	
	<!-- jquery.contextMenu -->
	<script type="text/javascript" src="/assets/js/jquery.contextMenu.js"></script>
	<script type="text/javascript" src="/assets/js/jquery.form.js"></script>
	<!-- contextMenu.css -->
	
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