<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<html lang="ko">

<head>

<%@ include file="../header.jsp"%>

<link rel="stylesheet" href="/assets/css/jquery.contextMenu.css" />
<link rel="stylesheet" href="/assets/css/font/context-menu-icons.woff2" />
<link rel="stylesheet" href="/style/program.css" />
<!-- <script  src = "/assets/plugins/pdfmake/build/pdfmake.min.js" ></script>
<script  src = "/assets/plugins/pdfmake/build/pdfmake-unicode.js" ></script>
<script  src = "/assets/plugins/pdfmake/build/vfs_fonts.js" ></script> -->
<script src="/assets/plugins/jspdf/jspdf.umd.min.js"></script>
<script src="/assets/plugins/html2canvas/html2canvas.js"></script>

<app:layout mode="stylescript" type="popup" />
<!-- <script  type="text/javascript" src="/assets/plugins/xlsx/xlsx.full.min.js"> </script> -->

<style>
#ecResult {
	margin: auto;
	text-align: center;
	font-family: 'BatangChe';
}
</style>


</head>

<body>
	<!-- <div class="wrap-loading display-none"> -->
	<!-- 	<div><img src="/images/loading.gif"/></div> -->
	<!-- </div> -->

	<div id="wrapper">

		<div class="main">

			<div class="main-content">






				<div id="testPdf" style="dispaly: none; ">
					<div style="    width: -webkit-fill-available; height: 20px;"></div>
					<table cellspacing=0 border=1 id="ecResult">
						<tr>
							<td style="min-width: 50px">확인번호</td>
							<td style="min-width: 50px" colspan='6' rowspan='2'>조기폐차
								대상차량 확인(차량상태확인)서</td>

						</tr>
						<tr>
							<td style="min-width: 50px">1</td>
						</tr>
						<tr>
							<td style="min-width: 50px" rowspan='3'>소유자</td>
							<td style="min-width: 50px">성 명</td>
							<td style="min-width: 50px"></td>
							<td style="min-width: 50px">생년월일</td>
							<td style="min-width: 50px" colspan='2'></td>
						</tr>
						<tr>
							<td style="min-width: 50px">주 소</td>
							<td style="min-width: 50px" colspan='4'></td>
						</tr>
						<tr>
							<td style="min-width: 50px">전화번호</td>
							<td style="min-width: 50px"></td>
							<td style="min-width: 50px">FAX</td>
							<td style="min-width: 50px" colspan='2'></td>
						</tr>
						<tr>
							<td style="min-width: 50px" rowspan='4'>신 청 <br>자동차
							</td>
							<td style="min-width: 50px">등록번호</td>
							<td style="min-width: 50px"></td>
							<td style="min-width: 50px">차대번호</td>
							<td style="min-width: 50px" colspan='2'></td>
						</tr>
						<tr>
							<td style="min-width: 50px" rowspan='3'>차 종</td>
							<td style="min-width: 50px" colspan='4'>□연식( )년 □배기량( )CC</td>
						</tr>
						<tr>
							<td style="min-width: 50px" colspan='4'>정원(승합): 명</td>
						</tr>
						<tr>
							<td style="min-width: 50px" colspan='4'>중량(화물) : □적재중량( )톤
								□총중량( )톤</td>
						</tr>
						<tr>
							<td style="min-width: 50px; writing-mode: tb-rl;" rowspan='11'>확
								인 항 목</td>
							<td style="min-width: 50px">동일성 확인</td>
							<td style="min-width: 50px" colspan='2'>- 부작된 픙독번호와 등록중상 일치</td>
							<td style="min-width: 50px; writing-mode: tb-rl;" rowspan='10'>확
								인 결 과</td>
							<td style="min-width: 50px">□ 일치 □ 불연치 □ 식별불가</td>
						</tr>
						<tr>
							<td style="min-width: 50px">원동기</td>
							<td style="min-width: 50px" colspan='2'>- 원동기(시동)작동 여부</td>
							<td style="min-width: 50px">□가능 □불가</td>
						</tr>
						<tr>
							<td style="min-width: 50px">동력전달장치<br>(변속기포함)
							</td>
							<td style="min-width: 50px" colspan='2'>-변속기의 작동여부<br>
								- 변속 시 동력 전달 여부(전 후진)
							</td>
							<td style="min-width: 50px">□가능 □불가 □ 전진 또는 후진 불가</td>
						</tr>
						<tr>
							<td style="min-width: 50px">조 향</td>
							<td style="min-width: 50px" colspan='2'>- 좌우작동여부</td>
							<td style="min-width: 50px">□가능 □불가</td>
						</tr>
						<tr>
							<td style="min-width: 50px">제 동</td>
							<td style="min-width: 50px" colspan='2'>- 제동 가능 여부</td>
							<td style="min-width: 50px">□가등 □불량</td>
						</tr>
						<tr>
							<td style="min-width: 50px" rowspan='5'>그외 주요 부품</td>
							<td style="min-width: 50px">- 차에 외관 상태</td>
							<td style="width: 100px" rowspan='5'>정상가동에 지장을 주지않는 경우 판정에
								미반영</td>
							<td style="min-width: 50px">□양호 □불량 □ 일부 파손(찌그러짐)</td>
						</tr>
						<tr>
							<td style="min-width: 50px">- 완충장치 상태</td>
							<td style="min-width: 50px">□ 양호 □ 불량</td>
						</tr>
						<tr>
							<td style="min-width: 50px">- 유리창 파손 상태</td>
							<td style="min-width: 50px">□ 양호 □ 불량 □ 단순 파손(일부파손)</td>
						</tr>
						<tr>
							<td style="min-width: 50px">- 타이어 장착 여부 및 상태</td>
							<td style="min-width: 50px">□ 양호 □ 불량 □ 단술 불량(공기압부족)</td>
						</tr>
						<tr>
							<td style="min-width: 50px">- 등화장치 설치 상태</td>
							<td style="min-width: 50px">□ 설치 □ 미설치 □ 단순 파손(일부 깨짐)</td>
						</tr>
						<tr>
							<td style="min-width: 50px">첨부물</td>
							<td style="min-width: 50px" colspan='4'>사진 4매（전 • 후 • 좌 •
								우면）※ 필요시 동영상 첨부</td>
						</tr>
						<tr>
							<td style="min-width: 50px" rowspan='2'>판 정 결 과</td>
							<td style="min-width: 50px">정상 가동 여부</td>
							<td style="min-width: 50px" colspan='4'>□ 가 □ 부</td>
						</tr>
						<tr>
							<td style="min-width: 50px">불가 사유</td>
							<td style="min-width: 50px" colspan='2'></td>
							<td style="min-width: 50px">종합의견</td>
							<td style="min-width: 50px"></td>
						</tr>
						<tr>
							<td style="min-width: 50px" colspan='6'>
								<div style="text-align: left;">&nbsp;위와 같이 조기폐차 대상(정상가동)
									여부를 확인합니다.</div>
								<div style="text-align: right">년 월 일</div>
								<div style="text-align: right">확인자 : &nbsp;&nbsp;&nbsp;(인)
								</div>
								<div>시장(지사) 또는 절차대행자(인)</div>
							</td>

						</tr>
					</table>

					
				</div>
				<button onclick="javascript:savePDF()">Generate PDF -></button>
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
			<div class="card">
				<div class="card-body">
					<h3 class="mb-3 mt-3">데이터 입력중입니다.</h3>

					<img class=mb-3 src="/images/loading.gif" />
					<h4 class="mb-3 mt-3">
						<b id="secTimer">0</b>초
					</h4>
					<p>데이터 양에 따라서 시간이 오래걸릴수도 있습니다.</p>
				</div>
			</div>
		</div>
	</div>

</body>
</html>