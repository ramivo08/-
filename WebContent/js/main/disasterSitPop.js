
$(document).ready(function (){
})

function disasterSitPopSet(){
	if($("#disasterSit").hasClass('active')){
//		BIZComm.removePopup("test19");
		disasterSitPop();
	}else{
//		BIZComm.removePopup("test19");
		disasterSitPop();
	}
	
}

var now = new Date();
var year= now.getFullYear();
var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
var chan_val = year + '-' + mon + '-' + day;

function disasterSitPop(){
	
	var arg = {popName : "test19"
		   ,title : "일일재난상황판"
		   ,popIcon : "pageview"
		   ,content : '<div  class="pop_real_cont">' +
				'<span id = "toDayDate" class="box_title">2017-01-15</span>'+
				'<br>'+
				'<span id = "pop_title" class="box_title">특보상황</span>' +
				'<div id="occurid_container">'+
				'<table class="mgb10" style="width:450px;text-align:center; font-size:13px; border-collapse:collapse;">'+
				'<colgroup><col width="16%"><col width="16%"><col width="16%"><col width="16%"><col width="16%"><col width="16%"></colgroup>'+		
					'<tbody>'+
						'<tr>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;"><span style="cursor: pointer;" onclick="javascript:showTyphoon()">태풍</span></td>'+
							'<td class="second" id="typhoonNum" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; cursor: pointer;" onclick="javascript:showTyphoon()"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;"><span style="cursor: pointer;" onclick="javascript:showRainFall()">강우</span></td>'+
							'<td class="second" id="rainFallNum" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; cursor: pointer;" onclick="javascript:showRainFall()"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;"><span style="cursor: pointer;" onclick="javascript:showEarthQuake()">지진</span></td>'+
							'<td class="second" id="earthQuakeNum" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; cursor: pointer;" onclick="javascript:showEarthQuake()"></td>'+
						'</tr>'+
					'</tbody>'+
				'</table>'+
				'<br>'+
				'<span id = "pop_title" class="box_title">알람상황</span>' +
				'<div id="occurid_container">'+
				'<table class="mgb10" style="width:450px;text-align:center; font-size:13px; border-collapse:collapse;">'+
				'<colgroup><col width="12.5%"><col width="12.5%"><col width="12.5%"><col width="12.5%"><col width="12.5%"><col width="12.5%"><col width="12.5%"><col width="12.5%"></colgroup>'+	
					'<tbody>'+
						'<tr>'+
							'<th class="second" colspan="8" style="height:30px; text-align:center; background-color:#F6F6F6; border-top: 1px solid #444444;"><span style="cursor: pointer;" onclick="javascirpt:showFardTab()">확률 강우 빈도(FARD)</span></th>'+
						'</tr>'+
						'<tr>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">관심</td>'+
							'<td class="second" id="fardAttention" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">주의</td>'+
							'<td class="second" id="fardAlert" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">경계</td>'+
							'<td class="second" id="fardCaution" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">위험</td>'+
							'<td class="second" id="fardDanger" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
						'</tr>'+	
					'</tbody>'+
				'</table>'+
				'<br>'+
				'<table class="mgb10" style="width:450px;text-align:center; font-size:13px; border-collapse:collapse;">'+
				'<colgroup><col width="16.6%"><col width="16.6%"><col width="16.6%"><col width="16.6%"><col width="16.6%"><col width="16.6%"></colgroup>'+	
					'<tbody>'+
						'<tr>'+
							'<th class="second" colspan="6" style="height:30px; text-align:center; background-color:#F6F6F6; border-top: 1px solid #444444;"><span style="cursor: pointer;" onclick="javascirpt:showUfamTab()">강우 경보(UFAM)</span></th>'+
						'</tr>'+
						'<tr>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">주의</td>'+
							'<td class="second" id="ufamAlert" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">경계</td>'+
							'<td class="second" id="ufamCaution" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
							'<td class="second" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444; background:#F6F6F6; padding-top:8px;">위험</td>'+
							'<td class="second" id="ufamDanger" style="height:30px; border-top: 1px solid #444444; border-bottom: 1px solid #444444;"></td>'+
						'</tr>'+	
					'</tbody>'+
				'</table>'+
		   '</div>'+
		 '</div>'
			,styleVal : "top:70px; left:300px;"};
	
	BIZComm.createPopup(arg);
    
    $("#toDayDate").html(chan_val + " (오늘)");
	
	$.ajax({
		 url: "main/getDisaterSitPop.do",
		 data: {date:chan_val},
		 async: false,
		 dataType: "json",
		 type: "POST",
		 success: function(result){
			 
			 $("#typhoonNum").html(result.typhoon_Num);
			 $("#rainFallNum").html(result.fard_occur);
			 $("#earthQuakeNum").html(result.earth_quak);
			 
			 $("#fardAttention").html(result.fard_attention);
			 $("#fardAlert").html(result.fard_alert);
			 $("#fardCaution").html(result.fard_caution);
			 $("#fardDanger").html(result.fard_danger);
			 
			 $("#ufamAlert").html(result.ufam_alert);
			 $("#ufamCaution").html(result.ufam_caution);
			 $("#ufamDanger").html(result.ufam_danger);
			 
		 },
		 error: function(request, status, error){
			 alert("에러 : " + request.responSeText);
		 }
	 });
	
}

//팝업 내 '확률 강우 빈도(FARD)' 클릭시
function showFardTab(){
	
	var fardAttention =	$("#fardAttention").val();
	var fardAlert = $("#fardAlert").val();
	var fardCaution = $("#fardCaution").val();
	var fardDanger = $("#fardDanger").val();
	
	if(fardAttention != 0 || fardAlert != 0 || fardCaution != 0 || fardDanger !=0){
		$('#showFardTab').trigger('click');
	}else{
		alert("조회되는 값이 없습니다.");
	}
	
}

//팝업 내 '강우 경보(UFAM)' 클릭시
function showUfamTab(){
	
	var ufamAlert =	$("#ufamAlert").val();
	var ufamCaution = $("#ufamCaution").val();
	var ufamDanger = $("#ufamDanger").val();
	
	if(ufamAlert != 0 || ufamCaution != 0 || ufamDanger != 0){
		$('#showUfamTab').trigger('click');
	}else{
		alert("조회되는 값이 없습니다.");
	}
	
}

//팝업 내 특보상황 > '태풍' 클릭 시
function showTyphoon(){
	
	$('#txtWeatherNewsDate_S').val(chan_val);
	$("#txtWeatherNewsWrn").val("T");
	expresslist();
	setWeatherNewsPopData();
	$('#kma-expresszone').trigger('click');
}

//팝업 내 특보상황 > '강우' 클릭 시
function showRainFall(){
	
	$('#txtWeatherNewsDate_S').val(chan_val);
	$("#txtWeatherNewsWrn").val("R");
	expresslist();
	setWeatherNewsPopData();
	$('#kma-expresszone').trigger('click');
}

//팝업 내 특보상황 > '지진' 클릭 시
function showEarthQuake(){
	
	if($('#earthQuakeWrap').css('display')=='block'){
		
		$('#btnCommonDiv').trigger('click');
		$('#btnCommonDiv').trigger('click');
		$('#txtQuakeDateS').val(chan_val);
		$('#txtQuakeDateE').val(chan_val);
		$('#btnQuake').trigger('click');
		
	}else if($('#earthQuakeWrap').css('display')=='none'){
	
		$('#btnCommonDiv').trigger('click');
		$('#btnCommonDiv').trigger('click');
		$('#btnCommonDiv').trigger('click');
		$('#txtQuakeDateS').val(chan_val);
		$('#txtQuakeDateE').val(chan_val);
		$('#btnQuake').trigger('click');
		
	}
	
}


