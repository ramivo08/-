<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<html lang="ko">

<head>

<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="/assets/css/jquery.contextMenu.css"/>
<link rel="stylesheet" href="/assets/css/font/context-menu-icons.woff2"/>
<link rel="stylesheet" href="/style/program.css"/>
<!-- <script  src = "/assets/plugins/pdfmake/build/pdfmake.min.js" ></script>
<script  src = "/assets/plugins/pdfmake/build/pdfmake-unicode.js" ></script>
<script  src = "/assets/plugins/pdfmake/build/vfs_fonts.js" ></script> -->
<script  src = "/assets/plugins/jspdf/jspdf.umd.min.js" ></script>
<script  src = "/assets/plugins/html2canvas/html2canvas.js" ></script>

<app:layout mode="stylescript" type="main" />
<!-- <script  type="text/javascript" src="/assets/plugins/xlsx/xlsx.full.min.js"> </script> -->

<style>
#ecResult{
margin:auto;
text-align: center;

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
				
			<div class="main-content">
				<div class="content-heading">
					<div class="heading-left">
						<h1 class="page-title">대상 차량 검사결과 </h1>
						<p class="page-subtitle">검사결과 </p>
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
							<h3 class="card-header">대상차량 검사표 작성  </h3>
							<div class="card-body">
								<form:form commandName="moel" id="model" name="model">
								
								</form:form>
													
								 <div class="item">
							  
							       
							        <div id ="testPdf" style="dispaly:none">
					<table cellspacing=0 border=1 id="ecResult">
					<tr>
						<td style=min-width:50px;writing-mode:tb-rl; rowspan = '10'>확 인 항 목</td>
						<td style=min-width:50px>동일성 확인</td>
						<td style=min-width:50px colspan='2'>- 부작된 픙독번호와 등록중상 일치</td>
						<td style=min-width:50px;writing-mode:tb-rl; rowspan = '10'>확 인 결 과</td>
						<td style=min-width:50px>
						<input type="radio" name="sameness" value="match" id="s1" > <label for="s1">일치</label>
						<input type="radio" name="sameness" value="dismatch" id="s2" > <label for="s2">불일치</label>
						<input type="radio" name="sameness" value="unidentifiable" id="s3" ><label for="s3">식별불가</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>원동기</td>
						<td style=min-width:50px colspan='2'>- 원동기(시동)작동 여부</td>
						<td style=min-width:50px>
						<input type="radio" name="boot" value="match" id="b1" > <label for="b1">일치</label>
						<input type="radio" name="boot" value="dismatch" id="b2" > <label for="b2">불일치</label>
						</td>
							
					</tr>
					<tr>
						<td style=min-width:50px>동력전달장치<br>(변속기포함)</td>
						<td style=min-width:50px colspan='2'>-변속기의 작동여부<br> - 변속 시 동력 전달 여부(전 후진)</td>
						<td style=min-width:50px>
						<input type="radio" name="power" value="match" id="p1" > <label for="p1">가능</label>
						<input type="radio" name="power" value="dismatch" id="p2" > <label for="p2">불가</label> 
						<input type="radio" name="power" value="unidentifiable" id="p3" > <label for="p3">전진 또는 후진 불가</label> 
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>조 향</td>
						<td style=min-width:50px colspan='2'>- 좌우작동여부</td>
						<td style=min-width:50px>
						<input type="radio" name="steering" value="match" id="st1" > <label for="st1">가능</label>
						<input type="radio" name="steering" value="dismatch" id="st2" > <label for="st2">불가</label> 
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>제 동</td>
						<td style=min-width:50px colspan='2'>- 제동 가능 여부</td>
						<td style=min-width:50px>
						<input type="radio" name="braking" value="match" id="br1" > <label for="br1">가능</label>
						<input type="radio" name="braking" value="dismatch" id="br2" > <label for="br2">불량</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px rowspan='5'>그외 주요 부품</td>
						<td style=min-width:50px>- 차에 외관 상태</td>
						<td style=width:100px rowspan='5'>정상가동에 지장을 주지않는 경우 판정에 미반영</td>
						<td style=min-width:50px>
						<input type="radio" name="exterior" value="match" id="ex1" > <label for="ex1">양호</label>
						<input type="radio" name="exterior" value="dismatch" id="ex2" > <label for="ex2">불량</label>
						<input type="radio" name="exterior" value="unidentifiable" id="ex3" > <label for="ex3">일부 파손(찌그러짐)</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>- 완충장치 상태</td>
						<td style=min-width:50px>
						<input type="radio" name="shork" value="match" id="sh1" > <label for="sh1">양호</label>
						<input type="radio" name="shork" value="dismatch" id="sh2" > <label for="sh2">불량</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>- 유리창 파손 상태</td>
						<td style=min-width:50px>
						<input type="radio" name="glass" value="match" id="gl1" > <label for="gl1">양호</label>
						<input type="radio" name="glass" value="dismatch" id="gl2" > <label for="gl2">불량</label>
						<input type="radio" name="glass" value="unidentifiable" id="gl3" > <label for="gl3">단순 파손(일부파손)</label>
	
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>- 타이어 장착 여부 및 상태</td>
						<td style=min-width:50px>
						<input type="radio" name="tire" value="match" id="ti1" > <label for="ti1">양호</label>
						<input type="radio" name="tire" value="dismatch" id="ti2" > <label for="ti2">불량</label>
						<input type="radio" name="tire" value="unidentifiable" id="ti3" > <label for="ti3">단순 불량(공기압 부족)</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>- 등화장치 설치 상태</td>
						<td style=min-width:50px>
						<input type="radio" name="equalizer" value="match" id="eq1" > <label for="eq1">양호</label>
						<input type="radio" name="equalizer" value="dismatch" id="eq2" > <label for="eq2">불량</label>
						<input type="radio" name="equalizer" value="unidentifiable" id="eq3" > <label for="eq3">단순 파손(일부 깨짐)</label>
						</td>
					</tr>
					
					<tr>
						<td style=min-width:50px rowspan='2'>판 정 결 과</td>
						<td style=min-width:50px >정상 가동 여부</td>
						<td style=min-width:50px colspan='4'>
						<input type="radio" name="behavior" value="match" id="be1" > <label for="be1">가</label>
						<input type="radio" name="behavior" value="dismatch" id="be2" > <label for="be2">부</label>
						</td>
					</tr>
					<tr>
						<td style=min-width:50px>불가 사유</td>
						<td style=min-width:50px;height:250px colspan='2'> <textarea id='impossible' style="height: -webkit-fill-available;
    width: -webkit-fill-available;"></textarea></td>
						<td style=min-width:50px>종합의견</td>
						<td style=min-width:50px;height:250px><textarea id='opnion' style="height: -webkit-fill-available;
    width: -webkit-fill-available;"></textarea></td>
					</tr>
					
				</table>
				<div class="mt-3 center">
					<button class='btn-primary' id="preview" onclick="javascript:preview();">이전페이지 </button>
					<button class='btn-primary' id="viewResult" onclick="javascript:viewResult();">결과보기 </button>

				</div>			     		
							        </div>
							    </div>
							    
							    <div class="item">
							        
							    </div>
										
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