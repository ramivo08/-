<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<%@ include file="../header.jsp"%>

<app:layout mode="stylescript" type="main" title="main" />
<link	href="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />

	<script src="/assets/plugins/chart.js/moment.min.js"></script>

</head>

<body>
	<input type=hidden id="isCorrect" value="" />

	<div id="wrapper">
		<app:layout mode="header" />

		<div class="main">
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-headline">
						<div class="panel-head">
							<div class="content-heading">
								<div class="heading-left">
									<h1 class="page-title">가상운전</h1>
									<p class="page-subtitle">가상운전은 대상 항만의 해양환경에 대한 현황을 입력한 후 관측자료의 값과 비교하여 운전 적정성 유무를 사전에 알아보기 위함입니다.
									<br>
									조회결과는 기록되거나 데이터베이스에 저장되지 않습니다. </p>
								</div>
								<nav aria-label="breadcrumb">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/main.do"><i class="fa fa-home"></i> Home</a></li>
									<li class="breadcrumb-item"><a href="/virtual/virtualDrive.do">가상운전</a></li>
								</ol>
								</nav>
							</div>
					<div class="row">
						 <!--  best div-->
					<div class="col-md-4">
						<div class="card">
                <div class="card-header">
                  <h3 class="card-title">가상운전</h3>
                </div>
                <div class="card-body">
                  <form id="virtualInfo" method="post" enctype="multipart/form-data">
                    <fieldset>
                    <div class="form-group row">
                        <label for="ticket-email" class="col-sm-4 col-form-label">선박명</label>
                        <div class="col-sm-8">
                        <c:if test="${countShip != 0 }">
                        	<c:if test="${countShip >= 1 }">
                        	
                        	<select id="ship_nm" name="ship_nm" class="form-control" onchange="selectShipNm()">
                        		<c:forEach items="${shipList}" var="shipList">
                        			<option  value="${shipList.shipNm}">${shipList.shipNm}</option>
                        		</c:forEach>
                        	</select>
                        	
                        	</c:if>
<%--                           <input type="text" class="form-control" id="ship_nm" name="ship_nm" value="${shipNm}"> --%>
                          </c:if>
                          <c:if test="${countShip == 0 }">
                          <input type="text" class="form-control" id="ship_nm" name="ship_nm" >
                          </c:if>
                        </div>
                      </div>
                         <div class="form-group row">
                        <label for="ticket-name" class="col-sm-4 col-form-label">IMO번호</label>
                        <div class="col-sm-8">
                        
                        <c:if test="${countShip != 0 }">
                          <input type="text" class="form-control"  id="imo_num" name="imo_num"   value="${imoNo}">
                         </c:if>
                          <c:if test="${countShip == 0 }">
                         	 <input type="text" class="form-control"  id="imo_num" name="imo_num">
                          </c:if>
                        </div>
                      </div>
                  
                      
                       <div class="form-group row">
                        <label for="ticket-email" class="col-sm-4 col-form-label">BWMS 장치</label>
                        <div class="col-sm-8">
                        	<select id="bwmsType" name ="bwmsType" class="form-control" onchange="selectOptionParam()">
                        	 <option value="N">선택</option>
                        	 <option value="EC" 
                        	 <c:if test="${bwmsType eq 'EC' }">
                        	 selected 
                        	 </c:if>
                        	 
                        	 >전기분해(EC)</option>
                        	 <option value="UV"
                        	 <c:if test="${bwmsType eq 'UV' }">
                        	 selected 
                        	 </c:if>
                        	 >자외선분해(UV)</option>
                        	 <option value="O3"
                        	 <c:if test="${bwmsType eq 'O3' }">
                        	 selected 
                        	 </c:if>
                        	 >오존분해(03)</option>
                        	 
                        	</select>
                     
                        </div>
                      </div>
                      
                      
                      
<!--                       <div class="form-group row"> -->
<!--                         <label for="ticket-type" class="col-sm-4 col-form-label">출발지</label> -->
<!--                         <div class="col-sm-8"> -->
<!--                           <select id="startPoint" name = "startPoint" class="form-control"> -->
<!--                            <option selected="" value="N">출발지</option> -->
<%-- 	                      <c:forEach var="stHb" items="${harborList}" varStatus="status"> --%>
<%--                       		<option value="${harborList[status.index].stName}">${harborList[status.index].stName }</option> --%>
<%-- 	                      </c:forEach> --%>
						                    
<!--                           </select> -->
<!--                         </div> -->
<!--                       </div> -->
                       <div class="form-group row">
                        <label for="ticket-type" class="col-sm-4 col-form-label">운전 지역</label>
                        <div class="col-sm-8">
                          <select  id="endPoint" name="endPoint" class="form-control">
                           <option selected="" value="N">운전 지역</option>
	                       <c:forEach var="stHb" items="${harborList}" varStatus="status">
	                       <option value="${harborList[status.index].stName}">${harborList[status.index].stName }</option>
	                       </c:forEach>
						                    
                          </select>
                        </div>
                      </div>
                     <div class="form-group row" >
                        <label for="ticket-email" class="col-sm-4 col-form-label">운전 시작 일자</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" name="startDate" id="startDate" data-provide="datepicker" data-date-autoclose="true" data-date-format="yyyy-mm-dd">
                        </div>
                      </div>
                        <div class="form-group row" >
                        <label for="ticket-email" class="col-sm-4 col-form-label">운전 종료 일자</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control"  name="endDate" id="endDate" data-provide="datepicker" data-date-autoclose="true" data-date-format="yyyy-mm-dd">
                        </div>
                      </div>
                     <div class="form-group row">
                        <label for="ticket-email" class="col-sm-4 col-form-label">수온 (℃)</label>
                        <div class="col-sm-8">
<!--                           <input type="text" class="form-control"  id="temp" name="temp"> -->
							<div class="row ml-0">
								
				 				<input type="number" class="form-control col-sm-4" step="0.01" id="tempMin" name="tempMin" value="${optionResult.tempMin }"  >
				 				<label class="col-form-label col-sm-3 text-center">~</label>
			 					<input type="number" class="form-control col-sm-4" step="0.01" id="tempMax" name="tempMax" value="${optionResult.tempMax}">
		 					</div>
                        </div>
                      </div>
                       <div class="form-group row">
                        <label for="ticket-email" class="col-sm-4 col-form-label">염분 (psu)</label>
                        <div class="col-sm-8">
<!--                           <input type="text" class="form-control" id="salt" name="salt"> -->
							<div class="row ml-0">
				 				<input type="number" class="form-control col-sm-4" step="0.01" id="saltMin" name="saltMin" value="${optionResult.saltMin }">
				 				<label class="col-form-label col-sm-3 text-center">~</label>
			 					<input type="number" class="form-control col-sm-4" step="0.01" id="saltMax" name="saltMax" value="${optionResult.saltMax }">
		 					</div>
                        </div>
                      </div>
                       <div class="form-group row">
                        <label for="ticket-email" class="col-sm-4 col-form-label">부유물질 (mg/L)</label>
                        <div class="col-sm-8">
<!--                           <input type="text" class="form-control" id="matter" name="matter"> -->
							<div class="row ml-0">
				 				<input type="number" class="form-control col-sm-4" step="0.01" id="matterMin" name="matterMin" value="${optionResult.matterMin }">
				 				<label class="col-form-label col-sm-3 text-center">~</label>
			 					<input type="number" class="form-control col-sm-4" step="0.01" id="matterMax" name="matterMax" value="${optionResult.matterMax }">
		 					</div>
                        </div>
                      </div>
                    </fieldset>
                    
                      <div class="form-group row">
                        <div class="offset-sm-3 col-sm-9">
                          <button type="button" id="submit_btn"  onclick="selectShipInfo()"class="btn btn-primary btn-block">분석</button>
                        </div>
                      </div>
               
                  </form>
                </div>
              </div>

					</div>
					
					
						<div id = "button_after" class="col-md-8"> </div>
					
				</div>
				
			
				
<!-- 				<div id = "button_after"> </div> -->
<!-- 				<div class="row "  id="virtual_result" > -->
				
				
				
<!-- 					<div class="col-md-6 "> -->
<!-- 						<div class="card"> -->
<!-- 							<h3 class="card-header harborNm" >  </h3> -->
<!-- 							<div class="card-body"> -->
<!-- 								<div class="row mt-3 mb-3"> -->
<!-- 									<h3 ><span class="harborNm"></span></h3> -->
<!-- 								</div> -->
<!-- 								<div class="row mt-3 mb-3"> -->
<!-- 									<table class="table h_t"> -->
<!-- 				                    <thead> -->
<!-- 				                    <tr> -->
<!-- 				                    	<th colspan="6">해양환경정보(중간값)</th> -->
<!-- 				                    </tr> -->
<!-- 				                      <tr> -->
<!-- 				                      	<th>계절 구분</th> -->
<!-- 				                      	<th>관측시기</th> -->
<!-- 				                      	<th>수온</th> -->
<!-- 				                      	<th>염분</th> -->
<!-- 				                      	<th>부유물질</th> -->
<!-- 				                      	<th>적정시기</th> -->
<!-- 				                      </tr> -->
<!-- 				                    </thead> -->
<!-- 				                    <tbody> -->
				                
<!-- 				                      <tr> -->
				                      
<!-- 				                      	<td id="h_season"></td> -->
<!-- 				                      	<td id="h_observ"></td> -->
<!-- 				                      	<td id="h_temp"></td> -->
<!-- 				                      	<td id="h_salt"></td> -->
<!-- 				                      	<td id="h_matter"></td> -->
<!-- 				                      	<td id="h_timing"></td> -->
<!-- 				                      </tr> -->
<!-- 				                    </tbody> -->
<!-- 				                  </table> -->
																	
<!-- 								</div> -->
							
								
<!-- 								<div class="row mt-3 mb-3"> -->
							
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-6 "> -->
<!-- 						<div class="card"> -->
<!-- 							<h3 class="card-header">가상운전 결과</h3> -->
<!-- 							<div class="card-body"> -->
<!-- 								<div class="row mt-3 mb-3"> -->
<!-- 									<h3 style='margin:"auto"'><span class="shipNm"></span>  선박 가상운전 결과</h3> -->
<!-- 								</div> -->
<!-- 								<div class="row mt-3 mb-3"> -->

<!-- 								<p >선박명 : <span class="shipNm"></span>               | 	IMO번호 : <span id="imoNo"></span>    <br> -->
<!-- 								출발일자 :	<span id="strtDe"></span>  |   도착일자 : <span id="endDe"></span> <br> -->
<!-- 								수온 : <span id="tempCondition"></span>		   |    염분 : <span id="saltCondition"></span> 		   |   부유물질 : <span style="color:#dc8e00"><span id="matterCondition"></span></span><br> -->
<!-- 								</p> -->
<!-- 								</div> -->
								
<!-- 								<div class="row mt-3 mb-3"> -->
										
<!-- 										<div> -->
<!-- 										<h4><span class="shipNm"></span> 운전상태 예측 : <span id="prediction" style="color:#dc8e00"></span> </h4> -->
<!-- 										</div> -->
<!-- 								</div> -->
								
<!-- 								<div class="row mt-3 mb-3"> -->
<!-- 									<h5>조치사항 : 고탁도 항만</h5> -->
<!-- 								</div> -->
<!-- 								<div class="row mt-3 mb-3"> -->
<!-- 									<p> 고탁도 항만입니다. BMWS 처리장치 상태를 지속적으로 관찰바랍니다. </p>	 -->
										
								
							
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
						
				
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
	</div>
	</div>
	</div>
	</div>
	</div>
	
	<script
		src="/assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
	<app:layout mode="stylescript" type="footer" />
</body>
</html>