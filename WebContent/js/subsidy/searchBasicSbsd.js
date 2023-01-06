var data = "";
var toHtml = "";
var workbook = null;
var htmlstr = null;
var colsRowIdx = 0;
var dataSttIdx = 0;
var cols = new Array();
var selectedDomainColIndex = -1;
var selectedShipNm = $("#fnm_rule option:selected").val();
var inputImoNo = $("#imo_num").val();
var existCols= new Array();
var foundationJson = null;

$(function(){
	const grid = new tui.Grid({
		el: document.getElementById('table-grid'),
		scrollX: true,
		scrollY: true,
		bodyHeight: 600,
		data: [],
		columns: []
	})
	
	//tui.Grid.applyTheme('clean');
	tui.Grid.applyTheme('striped');
	
	//자료세팅 select validation
	
	
	$("#log_type").change(function(e){
		if($("#bwms_type").val() == ""){
			alert("처리방식을 먼저 선택해주세요.");
			e.preventDefault();
		}
	})
	
	$("#data_nomalize").change(function(e){
		if($("#log_type").val() == ""){
			alert("Log 형식을 먼저 선택해주세요.");
			e.preventDefault();
		}
	})
	
	
	
	
//	var htmlstr = null;
	// 동적으로 생성된 DOM을 이벤트 처리할 경우 
	// $(document).on('이벤트', '선택자', function(e){ ... });

	$(document).on('change', '#input-excel', function(e){
		$('table').remove();
		$('#sel_sheet').remove();
//		$('#bwms_type').remove();
//		$('#log_type').remove();
		$('input[name="ball_deball"]').remove();
		$('.span1').remove();
		var fileValue = $("#input-excel").val().split("\\");
		var fileName = fileValue[fileValue.length-1].split("_");
		var reader = new FileReader();
		var form = new FormData();
		form.append("upfile", $("#input-excel")[0].files[0]);
		
		// 기초자료 excel Upload
		$.ajax({
			 url : "/subsidy/insertBasicExcel.do"
			,type : "POST"
			,processData : false
			,contentType : false
			,data : form
			,success : function (result){
				if(result.result == 1){
					console.log("서버에 엑셀 업로드성공")
				}
			}
			
		
			
		});
		
		

		console.log(fileName);
		
	    
		reader.readAsBinaryString(e.target.files[0]);
//		reader.readAsBinaryString(e.target.files[0]);
		
		var sel_sheet = $("<select id=\"sel_sheet\" name=\"sheet_name\" />");
		
		reader.onload = function(e) { 
			/*
			workbook = XLSX.read(reader.result, {type:'binary'});
			
		
			
		
			*/
			var data = e.target.result;
			//var data = e.target.result
			
			
	     	var workbook = XLSX.read(data,{type: 'binary' });
//			var workbook = XLSX.read(data, {type:"binary" , cellText: false, cellDates:true, dateNF:'yyyy-MM-dd hh:mm:ss'} );
	       
			workbook.SheetNames.forEach(function(sheetName){
				$("<option />", {value : sheetName, text : sheetName}).appendTo(sel_sheet);
			});

	        var first_sheet_name = workbook.SheetNames[0];
	        var worksheet = workbook.Sheets[first_sheet_name];

	        //var sheetArray = XLSX.utils.sheet_to_json(worksheet,{sheetRows:2});
	        
	        // 상한액, 3.5t 미만, 3.5t 이상 ,지원금 불러오기 테스트 (220704) 
	         var sheetArray = XLSX.utils.sheet_to_json(worksheet);
	         
	         
	         var json_object = JSON.stringify(sheetArray);
	         console.log("object_array"+sheetArray[0]);
	        
	        console.log("sheetArray"+sheetArray);
	        //4번째 라인부터 데이터 
	        var jsonObj = XLSX.utils.sheet_to_json(worksheet,{range:3});
	        foundationJson = jsonObj;
	        
	        
	        
	        
	        
	        var domain = Object.keys(jsonObj[0]);
	    	grid.clear()

			let header = []

			domain.forEach(function (val, idx) {
				header.push({
					header: String(val),
					name: val,
					whiteSpace: 'normal'
				})
			})
			grid.setColumns(header)
			console.log("header : " + header)
			
			grid.resetData(jsonObj)
			grid.setWidth(header.length * 170)
	        
	        
			
		

//			htmlstr = jsonObj;

			//엑셀 sheet 들어가는 부분
//			
//			$('#excel')[0].innerHTML += htmlstr;
//			const childs = $("#excel table").children().children()
//			for(var i = 10; i < childs.length; i++) {
//				childs.get(i).remove()
//			}
			
//			$('#excel')[0].innerHTML += toHtml;
//			$('#wrapper')[0].innerHTML += htmlstr;

//		$('#excel table').attr('id', 'table-menu');
		
//			$("#table-menu td").click(function() {
//				selectedDomainColIndex = $(this).index();
	//			if($(this).parent().attr("id") == "selectedDBCol") {
//					if($(this).attr("id") == "selectedNormalize") {
//						$(this).removeAttr("id")
//						$("#selectedColLabel").text("표준 항목")
//					} else {
//						$("#selectedNormalize").removeAttr("id")
//						$(this).attr("id", "selectedNormalize")
//						$("#selectedColLabel").text($(this).text())
//					}
//				} else {
					// console.log("Please DB Col selet")
//				}
//			})
			
			
			
//			console.log(tableToJson($('#table-menu')))
			
//			$('table td').attr('contenteditable', true);
		}
		
		// span들 label로 묶어서 처리하면 좋을 듯
		$('<span class="span1">시트명 : </span>').appendTo('#div1');
		sel_sheet.appendTo("#div1");
		
//		$('<span class="span1">BWMS 처리방식 : </span>').appendTo('#div1');
//		var bwms_type = $('<select id=\"bwms_type\" name=\"bwms_type\" />');
//		$('<option />', {value : 'EC', text : 'EC'}).appendTo(bwms_type);
//		$('<option />', {value : 'UV', text : 'UV'}).appendTo(bwms_type);
//		$('<option />', {value : 'O3', text : 'O3'}).appendTo(bwms_type);
//		bwms_type.appendTo('#div1');
//		
//		$('<span class="span1">Log 형식 : <span>').appendTo('#div1');
//		var log_type = $('<select id=\"log_type\" name=\"log_type\" />');
//		$('<option />', {value : 'Data Log', text : 'Data Log'}).appendTo(log_type);
//		$('<option />', {value : 'Alarm Log', text : 'Alarm Log'}).appendTo(log_type);
//		$('<option />', {value : 'Operation Log', text : 'Operation Log'}).appendTo(log_type);
//		$('<option />', {value : 'GPS Log', text : 'GPS Log'}).appendTo(log_type);
//		log_type.appendTo('#div1');
		
//		$('<input type="radio" name="ball_deball" value="Ballast">').appendTo('#div1');
//		$('<span class="span1">Ballast</span>').appendTo('#div1');
//		$('<input type="radio" name="ball_deball" value="DeBallast">').appendTo('#div1');
//		$('<span class="span1">DeBallast</span>').appendTo('#div1');
	});
	function s2ab(s) { 
	    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	    var view = new Uint8Array(buf);  //create uint8array as viewer
	    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	    return buf;    
	}

	$("#excelExport").click(function(){
//      csv 		
//		grid.export('csv', { fileName:"exportTest" });
		
		var wb = XLSX.utils.book_new();
		var workbook = XLSX.utils.json_to_sheet(foundationJson);
		
		XLSX.utils.book_append_sheet(wb,workbook,"test.xlsx");
		
		var wbout = XLSX.write(wb,{bookType:'xlsx', type: 'binary' });
		
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}),"test.xlsx");
	
		
	})
	
	function formatColumn(worksheet, col, fmt) {
		  const range = XLSX.utils.decode_range(worksheet['!ref'])
		  // note: range.s.r + 1 skips the header row
		  for (let row = range.s.r + 1; row <= range.e.r; ++row) {
		    const ref = XLSX.utils.encode_cell({ r: row, c: col })
		    if (worksheet[ref] && worksheet[ref].t === 'n') {
		      worksheet[ref].z = fmt
		    }
		  }
		}
	
	$(document).on('change', '#sel_sheet', function(e){
		$('#sel_sheet option').attr('selected', false);
		$('#sel_sheet option[value=\"' + $(this).val() + '\"]').attr('selected', 'selected');
		
		$('table').remove();
		
		var htmlstr = XLSX.write(workbook, {sheet : $(this).val(), type : 'binary', bookType : 'html'});

		$('#excel')[0].innerHTML += htmlstr;
		
		const childs = $("#excel table").children().children()
		for(var i = 10; i < childs.length; i++) {
			childs.get(i).remove()
		}
		
		
		
//		$('#excel')[0].innerHTML += toHtml;
//		$('#wrapper')[0].innerHTML += htmlstr;

		$('#excel table').attr('id', 'table-menu');

		$("#table-menu td").click(function() {
			if($(this).parent().attr("id") == "selectedDBCol") {
				if($(this).attr("id") == "selectedNormalize") {
					$(this).removeAttr("id")
					$("#selectedColLabel").text("표준 항목")
				} else { 
					$("#selectedNormalize").removeAttr("id")
					$(this).attr("id", "selectedNormalize")
					
				}
			} else {
				// console.log("Please DB Col select")
			}
		})
		
//		data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames])
//		//엑셀 시트 삽입되는 부븐
//		$('#excel')[0].innerHTML += htmlstr;
//
//		$('table').attr('id', 'table-menu');
//		$('table td').attr('contenteditable', true);
	});
	
	
	var bwmsType = $("#bwms_type").val();
	

	var pre_val;
	$("#bwms_type").focus(function(){
		pre_val = $(this).val();
	}).change(function(e) {
		// console.log($(this))
		if($("#file_label").text() != ""){
			console.log("#file_lael text="+$("#file_label").text());			
			if($("#bwms_type").val() == "EC"){
				$("#o3Type").parent().css("display", "none")
			} else if($("#bwms_type").val() == "UV"){
				$("#o3Type").parent().css("display", "none")
			} else if($("#bwms_type").val() == "O3"){
				$("#o3Type").parent().css("display", "flex")
			} 
			$("#data_normalize option").remove()
		}else{
			
		
			alert("파일을 먼저 등록해주세요");
			$("#bwms_type").val(pre_val);
		
		}
	})
			//로그 타입 변경
		$("#log_type").focus(function(){
			pre_val = $(this).val();
		}).change(function(){
				
			
				var fm = $("#file_label").text();
			if($("#file_label").text() != ""){
				var fnm_rule = $("#fnm_rule option:selected").val();
				var imo_num =  $("#imo_num").val();
				var log_type = $("#log_type").val();
				$.ajax({
					type : "POST",
					url: "/ship/existColumns.do",
					data:{"imo_num" :imo_num,
						  "fnm_rule" : fnm_rule,
						  "log_type" : log_type } ,
					dataType: "json",
					success: function (result) {
						$("#input-logType").val(log_type);
						
						var existYn = result.existYn;
						if(existYn == 'Y'){
							var columns = result.columns;
							var ruleSheet = result.ruleSheet;
							cols = columns;
							dataSttIdx = result.dataSttIdx;
//							dtmIdx = result.dtmIdx;
	
							$("#existColumnsYn").val('Y');
							console.log(columns);
							$("#existColumn").modal("show")	
						}else{
							$("#existColumnsYn").val('N');
						}
						
						
					}
	//				,error: function (request, status, error) {
	//					console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
	//						+ request.responseText + "\n" + "error:" + error);
	//				}
				})
				
			
				
				$.ajax({
					type : "post",
					url : "/ship/dataNomalize.do",
					data : {
							bwmsType : $("#bwms_type").val(),
							logType : $("#log_type").val()
							},
					dataType : "json",
					async: false,
					success: function(data){
						$("#data_normalize option").remove()
						const dataLength = data.result.length;
						console.log("data.result.length" + dataLength);
						for (var i = 0; i < dataLength; i++) {
							const des = data.result[i].DESCRIPTION;
							const name = data.result[i].NAME;
							
							/*dataNomalize*/
							$("#data_normalize").append('<option value="' +name.toUpperCase() +'">' + name.toUpperCase()+' - '+des +'</option>')
							
						}
						
						
						
					}
					
						
				})
				
				
				/* data nomalize 원본*/				
//				var dataObj = null
//				if($("#bwms_type").val() == "EC"){
//					dataObj = getECDataLogColumnList()
//					$("#o3Type").parent().css("display", "none")
//				} else if($("#bwms_type").val() == "UV"){
//					dataObj = getUVDataLogColumnList()
//					$("#o3Type").parent().css("display", "none")
//				} else if($("#bwms_type").val() == "O3"){
//					dataObj = getO3DataLogColumnList()
//					$("#o3Type").parent().css("display", "flex")
//				} 
//				if(dataObj != null) {
//					for(key in dataObj) {
//						if(key == "0") {
//							$("#data_normalize").append('<option selected disabled value="' + key + '">' + dataObj[key] +'</option>')
//						} else {
//							$("#data_normalize").append('<option value="' + key +'">' + dataObj[key] +'</option>')
//						}
//					}
//				}else{
//					
//					
//					
//				}
			}else{
				alert("파일을 먼저 등록해주세요");
				$("#log_type").val(pre_val)
			}
			
			})

	
	
	
	var rowIndex = 0;
	var colIndex = 0;
//	var colsRowIdx = 0;
//	var dataSttIdx = 0;
//	var cols = new Array();
	var dtmIdx = new Array();
	var columnValue = null;
	$.contextMenu({
        selector: '#table-menu td',
        callback: function(key, options) {
			rowIndex = $(this).closest("tr").index();
			colIndex = $(this).index();
			if(key == "rowDelete") { // 항목 삭제
				rowIndex += 1;
				$("#table-menu tr:nth-child(" + rowIndex + ")").remove();
			}else if(key == "columnDelete"){
				colIndex += 1;
				$("#table-menu td:nth-child(" + colIndex + ")").remove();
				
			} else if(key == "setColumns") { // DB 컬럼 설정
				$("#selectedNormalize").removeAttr("id")
				$("#selectedColLabel").text("표준 항목")
				
				if($(this).parent().attr("id") == "selectedDBCol") {
					$(this).parent().removeAttr("id")
					cols = [];
					colsRowIdx = 0;
				} else {
					$("#selectedDBCol").removeAttr("id")
					$(this).parent().attr("id", "selectedDBCol");
					
					cols = [];
					
					var td = $(this).parent().children();
					td.each(function(i){
						cols.push(td.eq(i).text());
					});
					
					colsRowIdx = rowIndex;
				}
			} else if(key == "startData") { // 데이터 시작 행
				if($(this).parent().attr("id") == "selectedDataStt") {
					$(this).parent().removeAttr("id")
					dataSttIdx = 0;
				} else {
					$("#selectedDataStt").removeAttr("id")
					$(this).parent().attr("id", "selectedDataStt")
					dataSttIdx = rowIndex;
				}
			} else if(key == "dateTime") { // 날짜/시간 설정
				var silb = $(this).parent().siblings()
				// console.log(silb)
				if($(this).hasClass("selectedDate")) {
					for(var i = 0; i < silb.length; i++) {
						$($(silb.get(i)).children().get(colIndex)).removeClass("selectedDate")
					}
					$(this).removeClass("selectedDate")
					dtmIdx.splice(dtmIdx.indexOf(colIndex), 1)
				} else {
					for(var i = 0; i < silb.length; i++) {
						if($(silb.get(i)).children("[colspan]").length == 0) {
							$($(silb.get(i)).children().get(colIndex)).addClass("selectedDate")
						}
						
					}
					$(this).addClass("selectedDate")
					if(!dtmIdx.includes(colIndex)) {
						dtmIdx.push(colIndex);
					}
				}
				

			}
		},
        items: {

            "setColumns" : {name : "이 행을 DB 항목으로 설정", icon : "edit"},
            "startData" : {name : "이 행 부터 데이터 시작" , icon : "edit"},
            "dateTime" : {name : "이 항목을 '날짜/시간'으로 설정", icon: "edit"},
            "rowDelete" : {name : "이 행을 삭제", icon: "edit"},
            "columnDelete" : {name : "해당 열을 삭제", icon: "edit"}
        }
    });
	
	$(document).on('click', '#file_open', function(e){
	
			
		
			
		
		e.preventDefault();
		$('#input-excel').click();
		
	});
	
	var filename = "";
	var existColumns ;
	$(document).on('change', '#input-excel', function(e){
		var fullPath = $('#input-excel').val();
		var fileForm = /(.*?)\.(xls|xlsx|csv)$/;
		
		if( !fullPath.match(fileForm)){
			alert("엑셀파일만 파일등록가능합니다.");
			return false;
		}else{
		
			if (fullPath) {
			    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
			    filename = fullPath.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
			    $('#file_label').html(filename);
			}
			console.log("selectedShipNm"+selectedShipNm);
		}

	});
	
	
	$("#existRegi").click(function(){
		$("#reg_btn").click();
		$("#existColumn").modal("hide");	
	})
	
	
	
	var timer
	var i =1
	
	/*설정 등록 버튼*/	
	$("#reg_btn").click(function(){
		//먼저 조회 하고 existColumns가 존재하면 dataSttIdx, colsRowIdx ajax를 통해서가져오기
		
		
		$('#hiddenTableForJson')[0].innerHTML += htmlstr;
		$('#hiddenTableForJson table').attr('id', 'hidden-table');
		data = tableToJson(dataSttIdx, colsRowIdx)
		var ball_deball = $("#o3Type option:selected").val() 
//		var target =  JSON.stringify({
//			"imo_num" : parseInt($('#imo_num').val()),
//			"fnm_rule" : $('#fnm_rule').val(),
////			"fileName" : $('#file_label').text(),
//			"exl_sht_nm" : $('#sel_sheet option:selected').val(),
//			"bwms_type" : $('#bwms_type option:selected').val(),
//			"log_type" : $('#log_type option:selected').val(),
////			"ball_deball" : $('input[name="ball_deball"]:checked').val(),
//			"cols" : cols,
//			"data_stt_idx" : dataSttIdx,
//			"dtm_idx" : dtmIdx,
//			"data" : data,
//			"ball_deball" : ball_deball
//		});
//		if($("#bwms_type").val() == "O3"){
		
		
//		$.ajax({
//			url : '/ship/configRegist.do',
//			type : 'POST',
//			cache: false,
//			dataType: 'json',
//			data : {
//				target:JSON.stringify({
//					"imo_num" : parseInt($('#imo_num').val()),
//					"fnm_rule" : $('#fnm_rule').val(),
////					"fileName" : $('#file_label').text(),
//					"exl_sht_nm" : $('#sel_sheet option:selected').val(),
//					"bwms_type" : $('#bwms_type option:selected').val(),
//					"log_type" : $('#log_type option:selected').val(),
////					"ball_deball" : $('input[name="ball_deball"]:checked').val(),
//					"cols" : cols,
//					"data_stt_idx" : dataSttIdx,
//					"dtm_idx" : dtmIdx,
//					"data" : data,
//					"ball_deball" : ball_deball
//				})
//			},
		
		
		$.ajax({
			url : '/ship/configRegist.do',
			type : 'post',
			async:true,
			cache:false,
//			contentType: 'application/json;charset=utf-8',
//			dataType:'json',
			data : {
				target:JSON.stringify({
					"imo_num" : parseInt($('#imo_num').val()),
					"fnm_rule" : $('#fnm_rule').val(),
//					"fileName" : $('#file_label').text(),
					"exl_sht_nm" : $('#sel_sheet option:selected').val(),
					"bwms_type" : $('#bwms_type option:selected').val(),
					"log_type" : $('#log_type option:selected').val(),
//					"ball_deball" : $('input[name="ball_deball"]:checked').val(),
					"cols" : cols,
					"data_stt_idx" : dataSttIdx,
					"dtm_idx" : dtmIdx,
					"data" : data,
					"ball_deball" : ball_deball,
					"existColumnsYn" : $("#existColumnsYn").val()
					
				})
			},
			success : function(){
				$("#input-imoNum").val(parseInt($('#imo_num').val()))
				$("#input-fnmRule").val($('#fnm_rule').val())
				$("#transferForm").submit()
				alert('선박데이터 등록을 완료하였습니다.');
			}
			,beforeSend:function(){
				$('.wrap-loading').removeClass('display-none');
				
				timer =setInterval(function(){
					$('#secTimer').text(i)
					i++
					console.log(i)
				},1000)		
			}
			,complete:function(){
				 $('.wrap-loading').addClass('display-none');
				 clearInterval(timer)
					timer = null
					i = 1
					$('#secTimer').text("0")
			}
			,error : function(request, status, error){
				alert('선박 데이터 등록을 실패 하셨습니다. 자료세팅을 확인해주세요. ');
				return false;
			}
		});
//		}else if ($("#bwms_type").val() == "UV" || $("#bwms_type").val() =="EC"){
//			$.ajax({
//				url : '/ship/UVdataInsert.do',
//				type : 'post',
//				contentType: 'application/json;charset=utf-8',
////				dataType:'json',
//				data : {
//					target : JSON.stringify({
//						"imo_num" : parseInt($('#imo_num').val()),
//						"fnm_rule" : $('#fnm_rule').val(),
//						"exl_sht_nm" : $('#sel_sheet option:selected').val(),
//						"bwms_type" : $('#bwms_type option:selected').val(),
//						"log_type" : $('#log_type option:selected').val(),
//						"cols" : cols,
//						"data_stt_idx" : dataSttIdx,
//						"dtm_idx" : dtmIdx,
//						"data" : data,
//						"ball_deball" : ball_deball
//					})
//					
//				},
//				success : function(){
////					$("#input-imoNum").val(parseInt($('#imo_num').val()))
////					$("#input-fnmRule").val($('#fnm_rule').val())
////					$("#transferForm").submit()
//					alert('등록 성공');
//				},
//				error : function(request, status, error){
//					alert('등록 실패');
//					 console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
//				               + request.responseText + "\n" + "error:" + error);
//				}
//			});
//			
//		}
	});
});

function selectShipNm(){
	var shipNm = $("#fnm_rule option:selected").val();
	$.ajax({
		type : "POST",
		url : "/ship/selectShipInfo.do",
		data : {"shipNm":shipNm},
		dataType:'json',
		success :function(data){
			var result = data.shipList[0];
			console.log(data);
			console.log(result.imoNo);
			$("#imo_num").val(result.imoNo);
			$("#bwms_type").val(result.bwmsType).attr("selected","selected");
				
		}

	})
}


function colNormalization() {
	const selectedVal = $("#data_normalize option:selected").val()
	// console.log(selectedDomainColIndex)
	if(selectedVal == "-1") {
		// console.log("Please select BWMS Type")
	} else if (selectedVal == "0"){
		// console.log("Please select normalize value")
	} else {
		if($("#selectedNormalize").length ? false : true) {
			// console.log("Please select normalized value at table")
		} else {
			if(cols.includes(selectedVal)) {
					$("#selectedNormalize").css('font-weight','bold')
					$("#selectedNormalize").css('color','rgb(23 55 213)')
					
			} else {
				cols[selectedDomainColIndex] = selectedVal
				$("#selectedNormalize").text(selectedVal)
				$("#selectedNormalize").css('font-weight','bold')
				$("#selectedNormalize").css('color','#ff00eb')
				$("#selectedNormalize").removeAttr("id")
				$("#selectedColLabel").text("표준 항목")
				// console.log(cols)
			}
			
		}
	}
	
}

function tableToJson(dataSttIdx, colsRowIdx) { // 변환 함수
    var data = [];
    var table = document.getElementById("hidden-table")
    while(cols.indexOf("", 1) != -1){
	    cols.splice(cols.indexOf("", 1), 1)
	}
    for(var i = 0; i < cols.length; i++) {
    	cols[i] = String(cols[i]).toUpperCase()
    }
    var headers = cols;
    
    for(var i=dataSttIdx; i<table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = {};

        for(var j=0; j<tableRow.cells.length; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }
        data.push(rowData);
    }

    return data;
}


function vali(val){
	 
    if (val === null) return true; 
    if (typeof val === 'string' && val === '') return true;
    if (typeof val === 'undefined') return true;
    
    return false;

}

function existRegi(){
	
}