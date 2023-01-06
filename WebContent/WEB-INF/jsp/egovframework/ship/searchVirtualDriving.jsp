<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<%@ include file ="../header.jsp" %>
	
	<app:layout mode="stylescript" type="normal" />
	
<style>
  #map {
    height: 600px;
    width: 100%;
  }
  .inputWrap{
  margin-bottom: 20px;
  }
  input [type="date"]{
  width : 192px;
  }
  .Simulator{
  border: 1px solid;
  text-align: center;
  margin-bottom: 10px;
  }
  div{
  padding: 10px;
 
  
  }
  button{
  float:right;
  }
  
  .virtual{
  	border: 1px solid;
  	display:none;
  }
  
  
</style>

</head>
<app:layout mode="header" />
<body>




<h1 style="margin-bottom:50px">가상운전</h1>

<div class="Simulator">
<div class= "inputWrap">
<input type="text" id="shipName" placeholder="선박 명">
</div>
<div class= "inputWrap">
<input type="text" id="startPort" placeholder="출발지">
<input type="text" id="middlePort" placeholder="경유지">
<input type="text" id="endPort" placeholder="도착지">
</div>
<div class= "inputWrap">
<input type="text" id="startPort" placeholder="출발일자" onfocus="(this.type='date')">
<input type="text" id="middlePort" placeholder="경유일자" onfocus="(this.type='date')">
<input type="text" id="endPort" placeholder="도착일자 " onfocus="(this.type='date')">
</div>
<div class= "inputWrap">
<input type="text" id="startPort" placeholder="수온">
<input type="text" id="middlePort" placeholder="염분">
<input type="text" id="endPort" placeholder="탁도">
</div>
	<div class= "inputWrap">
	<button href="#void" class="add" alt="추가" title="추가">검색</button>
	</div>
</div>

<div  class ="virtual"id="virtual">
<h5 style="text-align:center">해양 과학 기술원의 ISABU 선박 BWMS 가상운전 결과</h5>
<p>선박명 : ISABU | IMO 번호 : 9751042 | 국적 : KOR | 처리 용량(t) : 3000<br>
출발지 : 인천항 | 도착지 : 시드니항 | 경유지 : 부산항<br>
출발일시 : 2019-08-30 08:32:59 | 도착일시 : 2019-09-06 19:11:47 | 경유일시 : 2019-08-31 17:01:09<br>
수온 : 3.5 °C | 염분 : 35 ‰ | 탁도 : 7 ppm<br>
<br>
예상 가능 운전 일수 : n일 m 시간 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BWMS 운전 데이터 예측: 정상</p>


<h3 style="text-align:center">BWMS 운전 데이터 예측값</h3>
<br>
<br>
<p>그래프 예정 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;그래프 예정</p>

<script>
$(".add").click(function(e){
	e.preventDefault();
	if($(".virtual").css("display")=="none"){
		$(".virtual").css("display","block");
		
	}else{
		$(".virtual").css("display","none");
	}
	
	
	
})
</script>
</div>

 





</body>
</html>