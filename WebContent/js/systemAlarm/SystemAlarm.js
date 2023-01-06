/**
 * 
 * 시스템알람(systemAlarm) > 시스템알람(SystemAlarm)
 * 
 */

// 알람 목록을 정의함
var _arrJsonData = [];

// 알람 목록을 불러옴
function chkSystemAlarm() {
	
	selectemd_source.clear();
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getSystemAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			// 알람 발생 여부를 확인함(true:발생함, false:발생안함)
			var chkAlarmTrigger = false;
			
			$.each(result, function(i, row) {
				/*
				 * ALARM_CODE : 알람 코드
				 * ALARM_NAME : 알람 이름
				 * ALARM_YN : 알람 발생여부(Y:발생함, N:발생안함)
				 * UPT_DATE : 암람 발생일시
				 */
				
                _arrJsonData.push({
                	ALARM_CODE: row.alarm_code,
                	ALARM_NAME: row.alarm_name,
                	ALARM_YN: row.alarm_yn,
                	UPT_DATE: row.upt_date
				});
                
                if (row.alarm_yn == "Y") {
                	chkAlarmTrigger = true;
                }

                // 화면 우측의 알람 목록을 출력함 
                switch (row.alarm_code) {
	            	// 기상특보 통보문 알람
	            	case "WEATHER_NEWS":
	            		getWeatherNewsAlarmList();
	            		break;
            		
                	// 확률 강우 빈도 위험지역 알람
                	case "FARD":
                		getFardAlarmList();
                		break;
                		
                	// 읍면동 경보현황
                	case "UFAM":
                		getUfamAlarmList();
                		break;                		
                		
                	// 읍면동 경보현황(주의)
                	case "UFAM_ALERT":
                		//getUfamAlertAlarmList();
                		break;                		
                		
                	// 읍면동 경보현황(경계)
                	case "UFAM_CAUTION":
                		//getUfamCautionAlarmList();
                		break;                		
                		
                	// 읍면동 경보현황(위험)
                	case "UFAM_DANGER":
                		//getUfamDangerAlarmList();
                		break;                		
                }
			});
			
			// 알람이 발생하면 화면 상단의 알람 아이콘에 뱃지를 출력함
			if (chkAlarmTrigger == true) {
				$(function() {
					$('#btnSystemAlarm').addClass('alert');
				});
			} else {
				$(function() {
					$('#btnSystemAlarm').removeClass('alert');
				});
			}
			
			// 메인화면 뱃지 변경
			changeRainBoard();
			changeEarthquakeBoard();
			//console.log(">>> Rows count : " + result.length);
		},
		error : function(err) {
			alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);
		}
	});
}

// 확률 강우 빈도 위험지역 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getFardAlarmList() {
	var arrGridData = [];
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getFardAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
    		$('#idFardAlarmList').empty();
			$.each(result, function(i, row) {
        		strAddHtml = "";
        		strAddHtml += '<tr>';
    			strAddHtml += '	<td class="tc">' + row.sido_kor_nm + '</td>';
				strAddHtml += '	<td class="tc" style="cursor:pointer;" onclick="javascript:zoomMapByHjd_Alarm(&#39;' + row.hjd_id + '&#39;)">' + row.emd_kor_nm + '</td>';
				strAddHtml += '	<td class="tc">' + row.cumu_15m_trigger + '</td>';
				strAddHtml += '	<td class="tc">' + row.upt_date + '</td>';
				strAddHtml += '</tr>';
        		$('#idFardAlarmList').append(strAddHtml);
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
        		strAddHtml = "";
        		strAddHtml += '<tr>';
        		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
        		$('#idFardAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}

//읍면동 경보현황 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getUfamAlarmList() {
	var arrGridData = [];

	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getUfamAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
			$('#idUfamAlarmList').empty();
		
			$.each(result, function(i, row) {
				var rowFontColor = "";
				
				switch (row.content_type) {
					// 주의
					case "주의":
						rowFontColor = " style='color: #FFE650;'";
						rowFontColor_emd = " style='color: #FFE650; cursor:pointer;'";
						break;
						
					// 경계
					case "경계":
						rowFontColor = " style='color: #FF8200;'";
						rowFontColor_emd = " style='color: #FF8200; cursor:pointer;'";
						break;
						
					// 위험
					case "위험":
						rowFontColor = " style='color: #FF0000;'";
						rowFontColor_emd = " style='color: #FF0000; cursor:pointer;'";
						break;
				}
				
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td class="tc"' + rowFontColor + '>' + row.content_type + '</td>';
	 			strAddHtml += '	<td class="tc"' + rowFontColor + '>' + row.si_nam +'</td>';
				strAddHtml += '	<td class="tc"' + rowFontColor_emd + 'onclick="javascript:zoomMapByBjd_Alarm(&#39;' + row.bjd_cde_gubun + '&#39;, &#39;'+row.content_type+'&#39;)"' +'>' + row.emd_nam + '</td>';
				strAddHtml += '	<td class="tc"' + rowFontColor + '>' + row.rain_01h + '</td>';
				strAddHtml += '</tr>';
	     		$('#idUfamAlarmList').append(strAddHtml);
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
				$('#idUfamAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}

// 읍면동 경보현황(주의) 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getUfamAlertAlarmList() {
	var arrGridData = [];
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getUfamAlertAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
			$('#idUfamAlertAlarmList').empty();
 		
			$.each(result, function(i, row) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td class="tc">' + (i + 1) + '</td>';
	 			strAddHtml += '	<td>' + row.si_nam + '</td>';
				strAddHtml += '	<td>' + row.emd_nam + '</td>';
				strAddHtml += '	<td>' + row.rain_01h + '</td>';
				strAddHtml += '</tr>';
	     		$('#idUfamAlertAlarmList').append(strAddHtml);
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
				$('#idUfamAlertAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}

//읍면동 경보현황(경계) 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getUfamCautionAlarmList() {
	var arrGridData = [];
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getUfamCautionAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
			$('#idUfamCautionAlarmList').empty();
		
			$.each(result, function(i, row) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td class="tc">' + (i + 1) + '</td>';
	 			strAddHtml += '	<td>' + row.si_nam + '</td>';
				strAddHtml += '	<td>' + row.emd_nam + '</td>';
				strAddHtml += '	<td>' + row.rain_01h + '</td>';
				strAddHtml += '</tr>';
	     		$('#idUfamCautionAlarmList').append(strAddHtml);
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
				$('#idUfamCautionAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}

//읍면동 경보현황(위험) 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getUfamDangerAlarmList() {
	var arrGridData = [];
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getUfamDangerAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
			$('#idUfamDangerAlarmList').empty();
		
			$.each(result, function(i, row) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td class="tc">' + (i + 1) + '</td>';
	 			strAddHtml += '	<td>' + row.si_nam + '</td>';
				strAddHtml += '	<td>' + row.emd_nam + '</td>';
				strAddHtml += '	<td>' + row.rain_01h + '</td>';
				strAddHtml += '</tr>';
	     		$('#idUfamDangerAlarmList').append(strAddHtml);
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
				$('#idUfamDangerAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}


// 상단 호우 부분 대시보드 변경
function changeRainBoard() {
	$("#rain_board").html("");
	var now_date = f_date.getFullYear() +""+ (f_date.getMonth()+1) +""+ f_date.getDate() +""+ f_date.getHours();
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getRainNum.do',
		data: {date:now_date},
		dataType: 'json',
		async: false,
		success: function(result) {
			console.log(result);
			var fard_occur = parseInt(result.fard_occur);
			var fard_attention = parseInt(result.fard_attention);
			var fard_alert = parseInt(result.fard_alert);
			var fard_caution = parseInt(result.fard_caution);
			var fard_danger = parseInt(result.fard_danger);
			
			var ufam_alert = parseInt(result.ufam_alert);
			var ufam_caution = parseInt(result.ufam_caution);
			var ufam_danger = parseInt(result.ufam_danger);
			
			console.log(fard_occur +","+ fard_attention +","+ fard_alert+","+ fard_caution+","+ fard_danger+","+ ufam_alert+","+ ufam_caution+","+ ufam_danger);
			
			if(fard_occur == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(fard_occur);
				$(".rain").addClass("attention");
			} else if(fard_attention == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(fard_attention);
				$(".rain").addClass("attention");
			} else if(fard_alert == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(fard_alert);
				$(".rain").addClass("alert");
			} else if(fard_caution == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(fard_caution);
				$(".rain").addClass("caution");
			} else if(fard_danger == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(fard_danger);
				$(".rain").addClass("danger");
			} else if(ufam_alert == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(ufam_alert);
				$(".rain").addClass("alert");
			} else if(ufam_caution == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(ufam_caution);
				$(".rain").addClass("caution");
			} else if(ufam_danger == Math.max(fard_occur, fard_attention, fard_alert, fard_caution, fard_danger, ufam_alert, ufam_caution, ufam_danger)) {
				$("#rain_board").html(ufam_danger);
				$(".rain").addClass("danger");
			} else if(fard_occur == 0 && fard_attention == 0 && fard_alert == 0 && fard_caution == 0 && fard_danger == 0 && ufam_alert == 0 && ufam_caution == 0 && ufam_danger == 0) {
				$(".rain").removeClass("attention");
				$(".rain").removeClass("alert");
				$(".rain").removeClass("caution");
				$(".rain").removeClass("danger");
				$("#rain_board").html("0");
			}
			
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
	
}

var weatherNewsGeomData;
// 기상특보 통보문 알람 목록을 불러와서 화면 우측의 알람 목록에 출력함
function getWeatherNewsAlarmList() {
	var arrGridData = [];
	weatherNewsGeomData = [];
	
	$.ajax({
		method: 'POST',
		url: '/systemAlarm/getWeatherNewsAlarmList.do',
		data: {
		},
		dataType: 'json',
		async: false,
		success: function(result) {
			var strAddHtml = "";
			$('#idWeatherNewsAlarmList').empty();
		
			$.each(result, function(i, row) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	 			strAddHtml += '	<td class="tc" style="cursor:pointer;" onclick="javascript:moveWeatherNewsGeom(' + i + ')">' + row.reg_name + '</td>';
				strAddHtml += '	<td class="tc">' + row.wrn + '</td>';
				strAddHtml += '	<td class="tc">' + row.lvl + '</td>';
				strAddHtml += '	<td class="tc">' + row.tm_fc + '</td>';
				strAddHtml += '</tr>';
	     		$('#idWeatherNewsAlarmList').append(strAddHtml);
	     		
	     		weatherNewsGeomData.push({id:i, geometry:row.wkt});
			});

			// 불러온 데이터가 없음
			if (result.length == 0) {
	     		strAddHtml = "";
	     		strAddHtml += '<tr>';
	     		strAddHtml += '	<td colspan ="4" style="text-align: center;">알람이 없습니다.</td>';
				strAddHtml += '</tr>';
				$('#idWeatherNewsAlarmList').append(strAddHtml);
			}
		},
		error : function(err) {
			//alert("readyState:" + err.readyState + " / status:" + err.status + " / statusText:" + err.statusText + " / responseText:" + err.responseText);				
		}
	});
}

//기상특보 통보문 알람 지도 이동
function moveWeatherNewsGeom(id){
	
	removePastLayer('kma-expresszone-preview');
	for(var i = 0 ; i < weatherNewsGeomData.length ; i++) {
		if(weatherNewsGeomData[i].id == id) {
			var wkt = new ol.format.WKT();
			var move_source = new ol.source.Vector();
			
			var move_ivsource = new ol.source.ImageVector({
				source:move_source
			});
			
			var t_geom = wkt.readGeometry(weatherNewsGeomData[i].geometry);
			t_geom.transform("EPSG:4326", "EPSG:3857");
			
			var feature = new ol.Feature();
			feature.setGeometry(t_geom);
			
			var style = new ol.style.Style({
				fill : new ol.style.Fill({
					color : 'rgba(246, 246, 246, 0)'
				}),
				stroke : new ol.style.Stroke({
					color : '#f96b6b',
					width : 7
				})/*,
				text : new ol.style.Text({
					text : stn_thiessen[v.stn_id].stn_nm,
					fill : new ol.style.Fill({
						color : '#FFFFFF'
					}),
					font : "10px NotoDemiLight"
				})*/
			}); 
			
			feature.setStyle(style);
			
			move_source.addFeature(feature);
			
			var kmaexpress_preview = new ol.layer.Image({
				source:move_ivsource,
				layerId : "kma-expresszone-preview"
			});
			
			map.addLayer(kmaexpress_preview);
			map.getView().fit(feature.getGeometry());
			map.getView().setZoom(9);
			
		}
	}
	
}

//확률강우빈도 위험지역 알람(FARD) 클릭시 레이어 활성화 이동
function zoomMapByHjd_Alarm(hjd_id){
	
	selectemd_source.clear();
	ufam_group.setVisible(false);
	
	var url = "/rainFreqarea/SelectGeom.do";
	var geom;
	
	jQuery.ajax({
		 url: url,
		 data: {hjd_id:hjd_id},
		 async: false,
		 dataType: "json",
		 type: "POST",
		 success: function(response){
			 geom = response.DATA.geom;
		 },
		 error: function(request, status, error){
			 alert("에러 : " + request.responSeText);
		 }
	 });
	
	var fwkt = new ol.format.WKT();
	var polygon
	var feature = new ol.Feature();
	feature.setGeometry(fwkt.readGeometry(geom));
	feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
	
	var style = new ol.style.Style({
		stroke : new ol.style.Stroke({
			color:"#F15F5F",
			width:4
		})
	});
	
	feature.setStyle(style);
	
	map.getView().fit(feature.getGeometry());
	map.getView().setZoom(14);
	
	selectemd_source.addFeature(feature);
	
}

//읍면동 경보현황 알람(UFAM 법정동 코드)
function zoomMapByBjd_Alarm(bjd_id, type){
	selectemd_source.clear();
	ufam_group.setVisible(true);
	
	if(type == '주의') {
		ufam_alert.getSource().updateParams({viewparams:"bjd_id:"+bjd_id+"00"});
		ufam_alert.setVisible(true);
		
		ufam_caution.setVisible(false);
		
		ufam_danger.setVisible(false);
	} else if (type == '경계') {
		ufam_alert.setVisible(false);
		
		ufam_caution.getSource().updateParams({viewparams:"bjd_id:"+bjd_id+"00"});
		ufam_caution.setVisible(true);
		
		ufam_danger.setVisible(false);
	} else if (type == '위험') {
		ufam_alert.setVisible(false);
		
		ufam_caution.setVisible(false);
		
		ufam_danger.getSource().updateParams({viewparams:"bjd_id:"+bjd_id+"00"});
		ufam_danger.setVisible(true);
	}
	
	var url = "/emdAlarm/SelectGeom.do";
	var geom;
	
	$.ajax({
		 url: url,
		 data: {bjd_cde_gubun:bjd_id},
		 async: false,
		 dataType: "json",
		 type: "POST",
		 success: function(response){
			 geom = response.DATA.geom;
		 },
		 error: function(request, status, error){
			 alert("에러 : " + request.responSeText);
		 }
	 });
	
	var fwkt = new ol.format.WKT();
	var polygon
	var feature = new ol.Feature();
	feature.setGeometry(fwkt.readGeometry(geom));
	feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
	
	var style = new ol.style.Style({
		stroke : new ol.style.Stroke({
			color:"#F15F5F",
			width:4
		})
	});
	
	feature.setStyle(style);
	
	map.getView().fit(feature.getGeometry());
	map.getView().setZoom(13);
	
	selectemd_source.addFeature(feature);
}

// 지진 통보문의 현재시간 갯수 불러옴
var earthquake_idx=0;
function changeEarthquakeBoard() {
	var now_date = f_date.getFullYear() +""+ (f_date.getMonth()+1) +""+ f_date.getDate() +""+ f_date.getHours();
	$.ajax({
		 url: "/systemAlarm/getEarthquakeNum.do",
		 data: {date:now_date},
		 async: false,
		 dataType: "json",
		 type: "POST",
		 success: function(response){
			 earthquake_idx = response.COUNT;
			 console.log(response.COUNT);
			 $("#earthquake_board").html(earthquake_idx);
			 if(earthquake_idx == 0) {
				 $(".earthquake").removeClass("attention");
				 $(".earthquake").removeClass("alert");
				 $(".earthquake").removeClass("caution");
				 $(".earthquake").removeClass("danger");
			 } else if(earthquake_idx > 0 && earthquake <= 5){
				 $(".earthquake").addClass("alert");
			 } else if(earthquake_idx > 5 && earthquake <= 10){
				 $(".earthquake").addClass("caution");
			 } else if(earthquake_idx > 10){
				 $(".earthquake").addClass("danger");
			 }
		 },
		 error: function(request, status, error){
			 alert("에러 : " + request.responSeText);
		 }
	 });
	
	
}
	