$(function(){
	var data = "";
	var workbook = "";
	
	// 동적으로 생성된 DOM을 이벤트 처리할 경우 
	// $(document).on('이벤트', '선택자', function(e){ ... });
	
	$(document).on('change', '#input-excel', function(e){
		$('table').remove();
		$('#sel_sheet').remove();
		$('#bwms_type').remove();
		$('#log_type').remove();
		$('input[name="ball_deball"]').remove();
		$('.span1').remove();

		var reader = new FileReader();
	
		reader.readAsBinaryString(e.target.files[0]);
		
		var sel_sheet = $("<select id=\"sel_sheet\" name=\"sheet_name\" sty/>");
		
		reader.onload = function(e) {
			workbook = XLSX.read(reader.result, {type:'binary'});
			
			workbook.SheetNames.forEach(function(sheetName){
				$("<option />", {value : sheetName, text : sheetName}).appendTo(sel_sheet);
			});
			
			var htmlstr = XLSX.write(workbook, {sheet:"", type : 'binary', bookType : 'html'});
			$('#wrapper')[0].innerHTML += htmlstr;

			$('table').attr('id', 'table-menu');
//			$('table td').attr('contenteditable', true);
		}
		
		// span들 label로 묶어서 처리하면 좋을 듯
		$('<span class="span1">시트명 : </span>').appendTo('#div1');
		sel_sheet.appendTo("#div1");
		
		$('<span class="span1">BWMS 처리방식 : </span>').appendTo('#div1');
		var bwms_type = $('<select id=\"bwms_type\" name=\"bwms_type\" />');
		$('<option />', {value : 'EC', text : 'EC'}).appendTo(bwms_type);
		$('<option />', {value : 'UV', text : 'UV'}).appendTo(bwms_type);
		$('<option />', {value : 'O3', text : 'O3'}).appendTo(bwms_type);
		bwms_type.appendTo('#div1');
		
		$('<span class="span1">Log 형식 : <span>').appendTo('#div1');
		var log_type = $('<select id=\"log_type\" name=\"log_type\" />');
		$('<option />', {value : 'Data Log', text : 'Data Log'}).appendTo(log_type);
		$('<option />', {value : 'Alarm Log', text : 'Alarm Log'}).appendTo(log_type);
		$('<option />', {value : 'Operation Log', text : 'Operation Log'}).appendTo(log_type);
		$('<option />', {value : 'GPS Log', text : 'GPS Log'}).appendTo(log_type);
		log_type.appendTo('#div1');
		
//		$('<input type="radio" name="ball_deball" value="Ballast">').appendTo('#div1');
//		$('<span class="span1">Ballast</span>').appendTo('#div1');
//		$('<input type="radio" name="ball_deball" value="DeBallast">').appendTo('#div1');
//		$('<span class="span1">DeBallast</span>').appendTo('#div1');
	});
	
	$(document).on('change', '#sel_sheet', function(e){
		$('#sel_sheet option').attr('selected', false);
		$('#sel_sheet option[value=\"' + $(this).val() + '\"]').attr('selected', 'selected');
		
		$('table').remove();
		
		var htmlstr = XLSX.write(workbook, {sheet : $(this).val(), type : 'binary', bookType : 'html'});
		
		$('#wrapper')[0].innerHTML += htmlstr;

		$('table').attr('id', 'table-menu');
//		$('table td').attr('contenteditable', true);
	});

	var rowIndex = 0;
	var colIndex = 0;
	var colsRowIdx = 0;
	var dataSttIdx = 0;
	var cols = new Array();
	var dtmIdx = new Array();
	var columnValue = null;
	$.contextMenu({
        selector: '#table-menu td',
        callback: function(key, options) {
			rowIndex = $(this).closest("tr").index();
			colIndex = $(this).index();
			if(key == "delete") { // 항목 삭제
				colIndex += 1;
				$("#table-menu td:nth-child(" + colIndex + ")").remove();
			} else if(key == "setColumns") { // DB 컬럼 설정
				$("#table-menu tr:eq(" + rowIndex + ")").css('background-color', '#7FFF00');
				
				cols = [];
				
				var td = $("#table-menu tr:eq(" + rowIndex + ")").children();
				td.each(function(i){
					cols.push(td.eq(i).text());
				});
				colsRowIndex = rowIndex;
			} else if(key == "startData") { // 데이터 시작 행
				$("#table-menu tr:eq(" + rowIndex + ")").css('background-color', '#FFA500');
				
				dataSttIdx = rowIndex;
			} else if(key == "dateTime") { // 날짜/시간 설정
				$("#table-menu tr:eq(" + rowIndex + ") > td:eq(" + colIndex + ")").css('background-color', '#00FFFF');
				
				dtmIdx.push(colIndex);
			}
		},
        items: {
//            "delete" : {name: "열 삭제", icon: "delete"},
            "setColumns" : {name : "이 행을 DB 항목으로 설정", icon : "edit"},
            "setDataColumns" : {
			    name : "데이터 표준 항목 설정",
			    icon : "edit",
			    items : {
				    "setUVColumn" : { 
					    name : "UV 데이터 항목명 설정", 
					    items : {
						    select : {
						    	type : "select",
						    	options : getUVDataLogColumnList(),
						    	selected : 0,
            					events : {
							    	change : function(e) {
	            						columnValue = $(e.target).find(":selected").val();
	            					}
            					}
						    },
						    key : {
						    	name : "선택",
						    	callback : function() {
						    		rowIndex = $(this).closest("tr").index();
									colIndex = $(this).index();
									
									$("#table-menu tr:eq(" + rowIndex + ")" +
											" > td:eq(" + colIndex + ")").html(columnValue);
						    	} 
						    }
					    }
				    },
				    "setECColumn" : {
					    name : "EC 데이터 항목명 설정",
					    items : {
					    	select : {
						    	type : "select",
						    	options : getECDataLogColumnList(),
						    	selected : 0,
            					events : {
							    	change : function(e) {
	            						columnValue = $(e.target).find(":selected").val();
	            					}
            					}
						    },
						    key : {
						    	name : "선택",
						    	callback : function() {
						    		rowIndex = $(this).closest("tr").index();
									colIndex = $(this).index();
									
									$("#table-menu tr:eq(" + rowIndex + ")" +
											" > td:eq(" + colIndex + ")").html(columnValue);
						    	} 
						    }
					    }
				    },
				    "setO3Column" : {
				    	name : "O3 데이터 항목명 설정",
				    	items : {
				    		select : {
						    	type : "select",
						    	options : getO3DataLogColumnList(),
						    	selected : 0,
            					events : {
							    	change : function(e) {
	            						columnValue = $(e.target).find(":selected").val();
	            					}
            					}
						    },
						    key : {
						    	name : "선택",
						    	callback : function() {
						    		rowIndex = $(this).closest("tr").index();
									colIndex = $(this).index();
									
									$("#table-menu tr:eq(" + rowIndex + ")" +
											" > td:eq(" + colIndex + ")").html(columnValue);
						    	} 
						    }
				    	}
				    }
			    }
        	},
            "startData" : {name : "이 행 부터 데이터 시작" , icon : "edit"},
            "dateTime" : {name : "이 항목을 '날짜/시간'으로 설정", icon: "edit"}
        }
    });
	
	$(document).on('click', '#file_open', function(e){
		e.preventDefault();
		$('#input-excel').click();
	});
	
	var filename = "";
	$(document).on('change', '#input-excel', function(e){
		var fullPath = $('#input-excel').val();
		if (fullPath) {
		    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		    filename = fullPath.substring(startIndex);
		    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
		        filename = filename.substring(1);
		    }
		    $('#file_label').html(filename);
		}
	});
	
	$(document).on('click', '#reg_btn', function(){
		// console.log($('#TYPE_ID').val(), colsRowIdx, cols, parseInt($('#sel_type option:selected').val()), parseInt($('input[name="ball_deball"]:checked').val()));
		$.ajax({
			url : 'configRegist',
			type : 'POST',
			data : {
				"imo_num" : parseInt($('#imo_num').val()),
				"fnm_rule" : $('#fnm_rule').val(),
//				"fileName" : $('#file_label').text(),
				"exl_sht_nm" : $('#sel_sheet option:selected').val(),
				"bwms_type" : $('#bwms_type option:selected').val(),
				"log_type" : $('#log_type option:selected').val(),
//				"ball_deball" : $('input[name="ball_deball"]:checked').val(),
				"cols" : cols,
				"data_stt_idx" : dataSttIdx,
				"dtm_idx" : dtmIdx
			},
			cache : false,
			success : function(){
				dtmIdx = [];
				alert('등록 성공');
			},
			error : function(){
				alert('등록 실패');
			}
		});
	});
});

function getUVDataLogColumnList() {
	var uvDataLogColumnList = {
		0 		: "---항목 선택---", 
		FLOW 	: "FLOW - 단일 UV 배관 통과 유량", 
		S1_FLOW : "S1_FLOW - 우현(STBD) 1번 UV 배관 통과 유량",
		S2_FLOW : "S2_FLOW - 우현(STBD) 2번 UV 배관 통과 유량",
		S3_FLOW : "S3_FLOW - 우현(STBD) 3번 UV 배관 통과 유량",
		P1_FLOW : "P1_FLOW - 좌현(PORT) 1번 UV 배관 통과 유량", 
		P2_FLOW : "P2_FLOW - 좌현(PORT) 1번 UV 배관 통과 유량",
		P3_FLOW : "P3_FLOW - 좌현(PORT) 1번 UV 배관 통과 유량",
		F_IN 	: "F_IN - 단일 UV 미생물 필터 장치 압력",
		S1_M_IN : "S1_M_IN - 우현(STBD) Main미생물 필터 장치 압력",
		S1_1_IN	: "S1_1_IN - 우현(STBD) 1번 미생물 필터 장치 압력",
		S1_2_IN : "S1_2_IN - 우현(STBD) 2번 미생물 필터 장치 압력",
		S1_3_IN : "S1_3_IN - 우현(STBD) 3번 미생물 필터 장치 압력",
		P1_M_IN : "P1_M_IN - 좌현(PORT) Main 미생물 필터 장치 압력",
		P1_1_IN : "P1_1_IN - 좌현(PORT) 1번 미생물 필터 장치 압력",
		P1_2_IN : "P1_2_IN - 좌현(PORT) 2번 미생물 필터 장치 압력",
		P1_3_IN : "P1_3_IN - 좌현(PORT) 3번 미생물 필터 장치 압력",
		F_DP 	: "F_DP - 단일 UV 필터 IN&OUT 압력 차이",
		S1_M_DP : "S1_M_DP - 우현(STBD) Main 필터 IN&OUT 압력 차이",
		S1_1_DP	: "S1_1_DP - 우현(STBD) 1번 필터 IN&OUT 압력 차이",
		S1_2_DP : "S1_2_DP - 우현(STBD) 2번 필터 IN&OUT 압력 차이",
		S1_3_DP : "S1_3_DP - 우현(STBD) 3번 필터 IN&OUT 압력 차이",
		P1_M_DP : "P1_M_DP - 좌현(PORT) Main 필터 IN&OUT 압력 차이",
		P1_1_DP : "P1_1_DP - 좌현(PORT) 1번 필터 IN&OUT 압력 차이",
		P1_2_DP : "P1_2_DP - 좌현(PORT) 2번 필터 IN&OUT 압력 차이",
		P1_3_DP : "P1_3_DP - 좌현(PORT) 3번 필터 IN&OUT 압력 차이",
		DOSE 	: "DOSE - 단일 UV 선량(dosage)",
		S1_DOSE : "S1_DOSE - 우현(STBD) 1번 UV 선량",
		S2_DOSE : "S2_DOSE - 우현(STBD) 2번 UV 선량",
		S3_DOSE : "S3_DOSE - 우현(STBD) 3번 UV 선량",
		S4_DOSE : "S4_DOSE - 우현(STBD) 4번 UV 선량",
		S5_DOSE : "S5_DOSE - 우현(STBD) 5번 UV 선량",
		S6_DOSE : "S6_DOSE - 우현(STBD) 6번 UV 선량",
		P1_DOSE : "P1_DOSE - 좌현(STBD) 1번 UV 선량",
		P2_DOSE : "P2_DOSE - 좌현(STBD) 2번 UV 선량",
		P3_DOSE : "P3_DOSE - 좌현(STBD) 3번 UV 선량",
		P4_DOSE : "P4_DOSE - 좌현(STBD) 4번 UV 선량",
		P5_DOSE : "P5_DOSE - 좌현(STBD) 5번 UV 선량",
		P6_DOSE : "P6_DOSE - 좌현(STBD) 6번 UV 선량",
		TEMP 	: "TEMP - 단일 UV Chamber 온도",
		S1_TEMP : "S1_TEMP - 우현(STBD) 1번 UV Chamber 온도",
		S2_TEMP : "S2_TEMP - 우현(STBD) 2번 UV Chamber 온도",
		S3_TEMP : "S3_TEMP - 우현(STBD) 3번 UV Chamber 온도",
		S4_TEMP : "S4_TEMP - 우현(STBD) 4번 UV Chamber 온도",
		S5_TEMP : "S5_TEMP - 우현(STBD) 5번 UV Chamber 온도",
		S6_TEMP : "S6_TEMP - 우현(STBD) 6번 UV Chamber 온도",
		P1_TEMP : "P1_TEMP - 좌현(PORT) 1번 UV Chamber 온도",
		P2_TEMP : "P2_TEMP - 좌현(PORT) 2번 UV Chamber 온도",
		P3_TEMP : "P3_TEMP - 좌현(PORT) 3번 UV Chamber 온도",
		P4_TEMP : "P4_TEMP - 좌현(PORT) 4번 UV Chamber 온도",
		P5_TEMP : "P5_TEMP - 좌현(PORT) 5번 UV Chamber 온도",
		P6_TEMP : "P6_TEMP - 좌현(PORT) 6번 UV Chamber 온도"
	}
	
	return uvDataLogColumnList;
}

function getECDataLogColumnList() {
	var ecDataLogColumnList = {
		0 			 : "---항목 선택---", 
		CURRENT 	 : "CURRENT - 단일 ECU 정류기 전류값",
		REC1_CURRENT : "REC1_CURRENT - ECU 정류기 #1 전류값",
		REC2_CURRENT : "REC2_CURRENT - ECU 정류기 #2 전류값",
		REC3_CURRENT : "REC3_CURRENT - ECU 정류기 #3 전류값",
		REC4_CURRENT : "REC4_CURRENT - ECU 정류기 #4 전류값",
		REC5_CURRENT : "REC5_CURRENT - ECU 정류기 #5 전류값",
		REC6_CURRENT : "REC6_CURRENT - ECU 정류기 #6 전류값",
		VOLTAGE 	 : "VOLTAGE - 단일 ECU 정류기 전류값",
		REC1_VOLTAGE : "REC1_VOLTAGE - ECU 정류기 #1 전압값",
		REC2_VOLTAGE : "REC2_VOLTAGE - ECU 정류기 #2 전압값",
		REC3_VOLTAGE : "REC3_VOLTAGE - ECU 정류기 #3 전압값",
		REC4_VOLTAGE : "REC4_VOLTAGE - ECU 정류기 #4 전압값",
		REC5_VOLTAGE : "REC5_VOLTAGE - ECU 정류기 #5 전압값",
		REC6_VOLTAGE : "REC6_VOLTAGE - ECU 정류기 #6 전압값",
		ANU_D1		 : "ANU_D1 - Deballast Mode 중화제 토출량 1",
		ANU_D2		 : "ANU_D2 - Deballast Mode 중화제 토출량 2",
		ANU_D3		 : "ANU_D3 - Deballast Mode 중화제 토출량 3",
		ANU_D4		 : "ANU_D4 - Deballast Mode 중화제 토출량 4",
		ANU_S1		 : "ANU_S1 - Stripping Mode 중화제 토출량 1",
		ANU_S2		 : "ANU_S2 - Stripping Mode 중화제 토출량 1",
		CSU			 : "CSU - 단일 장치 염분도",
		CSU1		 : "CSU1 - 염분도1",
		CSU2		 : "CSU2 - 염분도2",
		CSU3		 : "CSU3 - 염분도3",
		FMU			 : "FMU - 단일 장치 유량",
		FMU1		 : "FMU1 - 유량1",
		FMU2		 : "FMU2 - 유량2",
		FMU3		 : "FMU3 - 유량3",
		FMU4		 : "FMU4 - 유량4",
		FTS1		 : "FTS1 - FreshWater(청수) 온도1",
		FTS2		 : "FTS2 - FreshWater(청수) 온도2",
		FTS3		 : "FTS3 - FreshWater(청수) 온도3",
		GDS			 : "GDS - 단일 장치 H2(수소)값",
		GDS1		 : "GDS1 - H2(수소)값1",
		GDS2		 : "GDS2 - H2(수소)값2",
		GDS3		 : "GDS3 - H2(수소)값3",
		GDS4		 : "GDS4 - H2(수소)값4",
		TRO1		 : "TRO1 - 단일 장치 TRO1값",
		TRO2		 : "TRO2 - 단일 장치 TRO2값",
		TRO_B1		 : "TRO_B1 - Ballast Mode TRO1값",
		TRO_B2		 : "TRO_B2 - Ballast Mode TRO2값",
		TRO_B3		 : "TRO_B3 - Ballast Mode TRO3값",
		TRO_D1		 : "TRO_D1 - DeBallast Mode TRO1값",
		TRO_D2		 : "TRO_D2 - DeBallast Mode TRO2값",
		TRO_D3		 : "TRO_D3 - DeBallast Mode TRO3값",
		TRO_D4		 : "TRO_D4 - DeBallast Mode TRO4값",
		TRO_S1		 : "TRO_S1 - Stripping Mode TRO1값",
		TRO_S2		 : "TRO_S2 - Stripping Mode TRO2값"
	};
	
	return ecDataLogColumnList;
}

function getO3DataLogColumnList() {
	var o3DataLogColumnList = {
		0 						: "---항목 선택---",
		AIR_TEMP 				: "AIR_TEMP",
		O2_CONC 				: "O2_CONC",
		O2_D1 					: "O2_D1",
		DEW_POINT 				: "DEW_POINT",
		O3_CONC 				: "O3_CONC",
		NEUTRALIZER_TANK_LEVEL 	: "NEUTRALIZER_TANK_LEVEL",
		FIT_1 					: "FIT_1",
		FIT_2 					: "FIT_2",
		PORT_O3_DOSE 			: "PORT_O3_DOSE",
		STBD_O3_DOSE 			: "STBD_O3_DOSE",
		PORT_O3_FLOW 			: "PORT_O3_FLOW",
		STBD_O3_FLOW 			: "STBD_O3_FLOW",
		PORT_O3_CONTROL 		: "PORT_O3_CONTROL",
		STBD_O3_CONTROL 		: "STBD_O3_CONTROL",
		SIT 					: "SIT",
		BR_DOSE 				: "BR_DOSE",
		BR_LEVEL 				: "BR_LEVEL",
		NO1_METERING 			: "NO1_METERING",
		NO2_METERING 			: "NO2_METERING",
		TRO_1 					: "TRO_1",
		TRO_2 					: "TRO_2",
		TRO_3 					: "TRO_3",
		TRO_4 					: "TRO_4",
		TRO_5 					: "TRO_5",
		O3_D1 					: "O3_D1",
		O3_D2 					: "O3_D2",
		O3_D3 					: "O3_D3",
		PT_1 					: "PT_1",
		PT_2 					: "PT_2",
		PT_3 					: "PT_3",
		PT_4 					: "PT_4",
		PT_5 					: "PT_5",
		PT_6 					: "PT_6",
		PT_7 					: "PT_7"
	}
	
	return o3DataLogColumnList;
}
