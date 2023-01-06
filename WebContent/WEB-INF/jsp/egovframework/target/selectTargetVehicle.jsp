<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<html lang="ko">

<head>

<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="/assets/css/jquery.contextMenu.css"/>
<link rel="stylesheet" href="/assets/css/font/context-menu-icons.woff2"/>
<link rel="stylesheet" href="/style/program.css"/>

<script type="text/javascript" src="/assets/plugins/exif/exif.js"></script>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b91dd1712b605a8e46a6979679cb6aae"></script>
<app:layout mode="stylescript" type="main" />
<!-- <script  type="text/javascript" src="/assets/plugins/xlsx/xlsx.full.min.js"> </script> -->




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
						<h1 class="page-title">대상 차량 확인 상세정보 </h1>
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
							<h3 class="card-header">대상차량 확인 상세 정보 </h3>
							<div class="card-body">
								<form:form commandName="moel" id="model" name="model">
								
								</form:form>
							
								<div class="viewLayout">
									<div class="target_table" >
											<!-- 1 -->
											<div>
												<div>
													<p class="th"> 성명</p>
													<p >${targetMap.owner_nm}</p>
												</div>
												<div>
													<p class="th"> 주민등록번호</p>
													<p >${targetMap.rsdt_num}</p>
												</div>
											</div>
											<!-- 2 -->
											<div>
												<div>
													<p class="th">주소</p>
													<p >${targetMap.addr}</p>
												</div>
												<div>
													<p class="th"> 휴대전화번호</p>
													<p>${targetMap.phone_num}</p>
												</div>
											</div>
											<!-- 3 -->
									</div>
								</div>
								
										
							</div>
						
								
						</div>
					</div>
					
					
				</div>
					<div class="row">
					<div class="col-md-12">
						<div class="card">
							<h3 class="card-header">차량사진등록  </h3>
							<div class="card-body">
								<form:form commandName="moel" id="model" name="model">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group row">
											<p>차량 전면 사진</p>
										</div>
										<div class="form-group row">
											<img id="frontImg"   class="img-thumbnail" width="300px" height="300px">
										</div>
										<div class="form-group row">
											<input type="file" id="front" name="front" onchange="javascript:uploadImgPreview('front');">
										</div>
										<div class="form-group row">
											<p>차량 측면1 사진</p>
										</div>
										<div class="form-group row">
											<img id="side1Img"  class="img-thumbnail" width="300px" height="300px">
										</div>
										<div class="form-group row">
											<input type="file" id="side1" name="side1" onchange="javascript:uploadImgPreview('side1');">
										</div>
								
											
									</div>
									<div class="col-md-6">
									<div class="form-group row">
										<p>차량 후면 사진</p>
									</div>
									<div class="form-group row">
										<img id="behindImg"  class="img-thumbnail" width="300px" height="300px">
									</div>
									<div class="form-group row">
									<input type="file" id="behind" name="behind" onchange="javascript:uploadImgPreview('behind');">
									</div>
									<div class="form-group row">
										<p>차량 측면2 사진</p>
									</div>
									<div class="form-group row">
										<img id="side2Img"  class="img-thumbnail" width="300px" height="300px">
								
									</div>
									<div class="form-group row">
									<input type="file" id="side2" name="side2" onchange="javascript:uploadImgPreview('side2');">
									</div>
								
										
									</div>
								</div>
							
								
							
								<div class="row">
									<div class="col-md-6" >
									<div class="form-group row">
										<p>차량 동영상 </p>
									</div>
									<div class="form-group row">
										<video id="videoVehicle"  width="300px" height="300px" autoplay="autoplay" controls="controls" ></video>
									</div>
									
											<div class="form-group row">
										<input type="file" id="video" name="video" onchange="javascript:uploadVideoPreview('video')" accept="video/mp4,video/mkv, video/x-m4v,video/*">
									</div>
									</div>
								</div>
								
								<div class="row">
									<div class="col-md-6" >
										<div class="form-group row">
											<p>차량 위치 </p>
										</div>
										<div class="form-group row">
										<div id="map"  style="width:500px;height:400px;"></div>
										</div>									
									</div>
								</div>
								
								
								
								<div class="row">
									<div class="col-md-12 center" >
										<button type="button" class="btn-primary" id = "preview" onclick='javascript:preview()'> 이전 </button>
										<button type="button" class="btn-primary" id = "submit"> 제출 </button>
										<button type="button" class="btn-primary" id = "searchResult" > 결과작성 </button>
									</div>
								</div>
								
								</form:form>
							</div>
						
								
						</div>
					</div>
					

					
					
				</div>
			
					
			</div>
		</div>

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