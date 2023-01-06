

<!DOCTYPE html>
<%@ page language="java" pageEncoding="utf-8"%>
<html lang="ko">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<%@ include file="../header.jsp"%>


<app:layout mode="stylescript" type="main" title="main" />
<link rel="stylesheet" type="text/css"
	href="/assets/plugins/tui-grid/tui-grid.min.css">
<link href="/assets/css/Chart.css" rel="stylesheet" type="text/css" />
<link href="/css/dashboard.css" rel="stylesheet" type="text/css" />

<script type="text/javascript"
	src="/assets/plugins/tui-grid/tui-grid.min.js"></script>
<script type="text/javascript" src="/assets/js/Chart.bundle.js"></script>
<title>지도 테스트</title>
<!-- google Maps  -->
<script defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCMn76MdJcYFMKwwOsvJ1cb5W2spT2rCo&callback=initMap">
	</script>

<style>
#map {
	width : 100%;
	height: 100%;
}

html, body {
	height: 100%;
	margin: 0;
	padding: 0;
}

.margin-bottom {
	margin-bottom: 20px;
}
</style>
</head>
<body>
	<!-- WRAPPER -->
	<div id="wrapper">

		<app:layout mode="header" />

		<!-- MAIN -->
		<div class="main">

			<!-- MAIN CONTENT -->
			<div class="main-content">

				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">지도</h1>
						<p class="page-subtitle">해당 선박 위치에 관해서 조회 할 수 있습니다.</p>
					</div>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="/main.do"> <i
									class="fa fa-home"></i> Home
							</a></li>
							<li class="breadcrumb-item"><a href="#">Map</a></li>

						</ol>
					</nav>
				</div>

				<div class="container-fluid" style="height:90%;">
			
					<div id="map" class="map"></div>
				
				</div>
			</div>
		</div>
	</div>


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



	<!-- Datables Core -->
	<script src="/assets/plugins/datatables.net/jquery.dataTables.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-bs4/dataTables.bootstrap4.min.js"></script>

	<!-- Datables Extension -->
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
	<script
		src="/assets/plugins/datatables.net-colreorder/dataTables.colReorder.min.js"></script>
	<script
		src="/assets/plugins/datatables.net-colreorder-bs4/colReorder.bootstrap4.min.js"></script>


	<!-- App -->
	<script type="text/javascript" src="/assets/js/app.min.js"></script>



	

</body>
</html>
