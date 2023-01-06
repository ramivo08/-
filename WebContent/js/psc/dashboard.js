/*psc dashboard */


var firVal;
var firLabel;
var secVal;
var secLabel;
var firTime;
var secTime;
var valiSelectedData;

var fnmRule;
var imoNo;
var category;
//gisList 가져오기 /getData 에서


var gisList;
var body = $("body");
var srhCategory = "";
csvHeader = new Array();
csvDataList = new Array();

$(document).ready(function () {
//	$(".datePick").datepicker.regional['ko'] = {
//	        closeText: '닫기',
//	        prevText: '이전달',
//	        nextText: '다음달',
//	        currentText: '오늘',
//	        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
//	        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
//	        monthNamesShort: ['1월','2월','3월','4월','5월','6월',
//	        '7월','8월','9월','10월','11월','12월'],
//	        dayNames: ['일','월','화','수','목','금','토'],
//	        dayNamesShort: ['일','월','화','수','목','금','토'],
//	        dayNamesMin: ['일','월','화','수','목','금','토'],
//	        weekHeader: 'Wk',
//	        dateFormat: 'yyyy-mm-dd',
//	        firstDay: 0,
//	        isRTL: false,
//	        showMonthAfterYear: true,
//	        yearSuffix: '',
//	        showOn: 'both',
//	        buttonText: "달력",
//	        changeMonth: true,
//	        changeYear: true,
//	        showButtonPanel: true,
//	        yearRange: 'c-99:c+99',
//	    };
//	 $.datepicker.setDefaults($.datepicker.regional['ko']);

	
	
	//사이드 바 작게만드는 class
//	$("body").addClass("sidebar-minified")
	$("body").addClass("layout-default layout-fullwidth")
	let shipList = []
	const grid = new tui.Grid({
		el: document.getElementById('grid'),
		scrollX: true,
		scrollY: true,
		bodyHeight: 600,
		data: [],
		columns: []
	

	
	
	})
	

	
	
	//그래프 click 핸들러
	grid.on('click',function(ev){
		const startTime = $("#dataStartDate").val()
		const endTime = $("#dataEndDate").val()
		const imo_num = $("#shipSelected").children()[1].textContent
		const fnm_rule = $("#shipSelected").children()[0].textContent
		const category = $("#bwmsTypeSelected").text().trim()
	
		
		var rowInfo= grid.getFocusedCell()
		var ex = grid.getRow(1)
		var selectColNm =  rowInfo.columnName
// row1 값 object 키값 가져오기		
//		if(	Object.keys(ex).incluedes(selectColNm)){
//			object.keys()
//			object.values(selectColNm)
//			
//		}
		
		if(rowInfo.rowKey == 0){
			newWindow('/psc/dashPop.do?colNm='+rowInfo.columnName+
					'&startTime='+startTime
					+'&endTime='+endTime
					+'&imoNum='+imo_num
					+'&shipNm='+fnm_rule
					+'&category='+category
					
					
					, rowInfo.columnName+'Pop', screen.width/2.5, screen.height/1.7, 'yes', 'no');
		}
		console.log(rowInfo);
//		alert("clickRow");
//			console.log("ev"+ev.getRow())
		
	})

	$('#newDataAnalysisModal').on('hidden.bs.modal',function(){
		firVal = null;
		secVal = null;
		
	});
	
	
	
	var char = "[34,56,85,N][128,26,18,E]"
	var rx = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;	
	
	console.log("char" + char.replace(rx,""));
		
	$(".bwms_type").click(function(){
		const tableBody = $("#shipList tbody")
		const shipDataBody = $("#shipDataList tbody")
		const OperBody = $("#shipOperList tbody")
		tableBody.children().remove()
		shipDataBody.children().remove()
		OperBody.children().remove()
	})
	function seacrhShip(e) {
		const validKeyWhich = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 46]
		$(this).val(e.target.value.replace(/[^0-9]/ig, ''))
		if (validKeyWhich.includes(e.which)) {
			// console.log(e.which)
			const _this = this
			const tableBody = $("#shipList tbody")
			const OperBody = $("#shipOperList tbody")
			tableBody.children().remove()
			OperBody.children().remove()
			
			shipList.forEach((val, idx) => {
				const shipImo = val.imoNo.toString()
				if (shipImo.includes($(_this).val())) {
					const tr = '<tr><td>' + val.fnmRule + '</td><td>' + val.imoNo + '</td></tr>'
					tableBody.append(tr)
					tableBody.children(":last-child").click(selectedShip)
				}
			})
		}
	}

	function selectedShip(e) {
		$("#shipSelected").removeAttr("id")
		$(this).attr("id", "shipSelected")
		fnmRule = e.currentTarget.cells[0].textContent
		imoNo = e.currentTarget.cells[1].textContent
		category = $("#bwmsTypeSelected").text().trim()
		$.ajax({
			type: 'post',
			url: '/psc/searchDataLog.do',
			data: {
				fnmRule: fnmRule,
				imoNo: imoNo,
				category: category
			},
			dataType: 'json',
			success: ({ hashMapList, domain ,operTime,operCount}) => {
				console.log(operTime)
				const tableBody = $("#shipDataList tbody")
				var operTbody = $("#shipOperList tbody")
				
				tableBody.children().remove()
				operTbody.children().remove()
				const tr2 = '<tr class="pointer-event"><th class="text-center" colspan="4">전체 데이터셋 </th></tr>'
					tableBody.append(tr2)	
					hashMapList.forEach((val, idx) => {
					const { startTime, endTime } = val
					// console.log(startTime, endTime)
					
					//09/23
					$("#dataStartDate").val(startTime);
					$("#dataEndDate").val(endTime);
					
					
					const tr = '<tr><td>' + (idx + 1) + '.</td>'
						+ '<td class="text-center">' + startTime + '</td>'
						+ '<td class="text-center">' + '~' + '</td>'
						+ '<td class="text-center">' + endTime + '</td></tr>'
					tableBody.append(tr)
				})
				
				//확인필요
				tableBody.children().click(selectedShipData)
				
//				tableBody.children().click(selectedUnitOper(fnmRule,imoNo,category))
				
	
				
				$("#validData").children().not("#notDeletedOption").remove()
				$("#notDeletedOption").attr("selected", "selected")
				let optionList = []
				if ($("#bwmsTypeSelected").text().trim() == "EC") {
					optionList = ["TRO1", "TRO2", "TRO_B1", "TRO_B2", "TRO_B3",
						,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_D4", "TRO_S1", "TRO_S2", "TRO_S3", "TRO_S4"] 
//					,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_S1", "TRO_S2"]
				} else if ($("#bwmsTypeSelected").text().trim() == "UV") {
					optionList = ["DOSE", "S1_DOSE", "S2_DOSE", "S3_DOSE", "S4_DOSE", "S5_DOSE", "S6_DOSE",
						"P1_DOSE", "P2_DOSE", "P3_DOSE", "P4_DOSE", "P5_DOSE", "P6_DOSE"]
				} else if ($("#bwmsTypeSelected").text().trim() == "O3") {
					optionList = ["PORT_O3_DOSE", "STBD_O3_DOSE", "BR_DOSE"]
				}

				domain.forEach((val, idx) => {
					if (optionList.includes(val.toUpperCase())) {
						const option = '<option value="' + val.toUpperCase() + '">' + val.toUpperCase() + '</option>'
						$("#validData").append(option)
					}
				})
				
				
				
			},
			error: (request, error, status) => {

			}
			
		})
	
	}
	
	function selectedUnitOper(e) {
		const startTime = new Date($("#dataStartDate").val())
		const endTime = new Date($("#dataEndDate").val())
		
		$("#unitOperSelected").removeAttr("id")
		$(this).attr("id", "unitOperSelected")
		$.ajax({
			type: 'post',
			url: '/psc/searchUnitLog.do',
			data: {
				fnmRule: fnmRule,
				imoNo: imoNo,
				category: category
//				startTime : startTime,
//				endTime : endTime
			},
			dataType: 'json',
			success: ({ hashMapList, domain ,operTime,operCount}) => {
				console.log(operTime)
			
				var operTbody = $("#shipOperList tbody")
				operTbody.children().remove()
				const tr1 = '<tr class="pointer-event"><th class="text-center" colspan="4">단위 운전 데이터 셋 </th></tr>'
					operTbody.append(tr1)
				if(operCount > 0){
					
					
					operTime.forEach((val, idx) => {
						console.log(val.startTime)
						
						// console.log(startTime, endTime)
						
						//09/23
	//					$("#dataStartDate").val(val.startTime);
	//					$("#dataEndDate").val(val.endTime);
	//					
						
						const tr = '<tr><td>' + (idx + 1) + '.</td>'
							+ '<td class="text-center">' + val.startTime + '</td>'
							+ '<td class="text-center">' + '~' + '</td>'
							+ '<td class="text-center">' + val.endTime + '</td></tr>'
						operTbody.append(tr)
					})
					operTbody.children().click(selectedUnitOperData)
				}else{
					const tr2 = '<tr class="pointer-event"><th class="text-center" colspan="4">존재하는 단위운전 데이터셋이 없습니다. </th></tr>'
					operTbody.append(tr2)
				}
				
				$("#validData").children().not("#notDeletedOption").remove();
				$("#notDeletedOption").attr("selected", "selected")
				let optionList = []
				if ($("#bwmsTypeSelected").text().trim() == "EC") {
					optionList = ["TRO1", "TRO2", "TRO_B1", "TRO_B2", "TRO_B3",
						,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_S1", "TRO_S2", "TRO_S3", "TRO_S4"] 
//					optionList = ["TRO1", "TRO2", "TRO_B1", "TRO_B2", "TRO_B3"] 
//					,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_S1", "TRO_S2"]
				} else if ($("#bwmsTypeSelected").text().trim() == "UV") {
					optionList = ["DOSE", "S1_DOSE", "S2_DOSE", "S3_DOSE", "S4_DOSE", "S5_DOSE", "S6_DOSE",
						"P1_DOSE", "P2_DOSE", "P3_DOSE", "P4_DOSE", "P5_DOSE", "P6_DOSE"]
				} else if ($("#bwmsTypeSelected").text().trim() == "O3") {
					optionList = ["PORT_O3_DOSE", "STBD_O3_DOSE", "BR_DOSE"]
				}

				domain.forEach((val, idx) => {
					if (optionList.includes(val.toUpperCase())) {
						const option = '<option value="' + val.toUpperCase() + '">' + val.toUpperCase() + '</option>'
						$("#validData").append(option)
					}
				})
			},
			error: (request, error, status) => {

			}
		})
	}
	
	function selectedBwmsType(e) {
		// console.log($(this))
		$(this).attr("id", "bwmsTypeSelected")
		$(this).removeClass("btn")
		$(this).siblings("#bwmsTypeSelected").addClass("btn")
		$(this).siblings("#bwmsTypeSelected").removeAttr("id")

		
		$("#shipOperList tbody").children().remove()
		$("#shipList tbody").children().remove()
		$("#dataStartDate").children().remove()
		$("#dataEndDate").children().remove()
		$("#validData").children().not("#notDeletedOption").remove()
		$("#notDeletedOption").prop("disabled", false)
		$("#notDeletedOption").prop("selected", true)
		$("#notDeletedOption").prop("disabled", true)
		$.ajax({
			type: 'post',
			url: '/psc/selectedBwmsType.do',
			data: {
				bwms_type: $(this).text().trim()
			},
			dataType: 'json',
			success: ({ hashMapList }) => {
				const tableBody = $("#shipList tbody")
				
				tableBody.children().remove()
				
				shipList = []
				if(hashMapList == null){
					const tr = '<tr><td>해당 타입에 등록된 </td><td>데이터가 없습니다.</td></tr>'
					tableBody.append(tr)
				}else{
					hashMapList.forEach((val, idx) => {
						shipList.push(val)
						const tr = '<tr><td>' + val.fnmRule + '</td><td>' + val.imoNo + '</td></tr>'
						tableBody.append(tr)
					})
					// console.log(shipList)
					$("#shipList tbody tr").click(selectedShip)
				}
				
				
			},
			error: (request, status, error) => {
			}
		})
	}
	
	
	

	function selectedShipData(e) {
		$(this).attr("id", "shipDataSelected")
		$(this).siblings("#shipDataSelected").removeAttr("id")
		 const startTime = $(this).text().trim().split('~')[0].split('.')[1]
		 const endTime = $(this).text().trim().split('~')[1]
		
		
		$("#dataStartDate").val(startTime);
		$("#dataEndDate").val(endTime);
		
		
		
		if($("#shipDataSelected")){
			selectedUnitOper()
		}
		
		
		
			
	}
	
	function searchUnitOperValiData(e) {
		const startTime = new Date($("#dataStartDate").val())
		const endTime = new Date($("#dataEndDate").val())
		
		
		$.ajax({
			type: 'post',
			url: '/psc/searchUnitOperValiData.do',
			data: {
				fnmRule: fnmRule,
				imoNo: imoNo,
				category: category,
				startTime : startTime,
				endTime : endTime
			},
			dataType: 'json',
			success: ({ hashMapList, optionList ,operTime,operCount}) => {
				console.log(operTime)
				
				$("#validData").children().not("#notDeletedOption").remove();
				$("#notDeletedOption").attr("selected", "selected")
			
//				if ($("#bwmsTypeSelected").text().trim() == "EC") {
//					optionList = ["TRO1", "TRO2", "TRO_B1", "TRO_B2", "TRO_B3"] 
////					,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_S1", "TRO_S2"]
//				} else if ($("#bwmsTypeSelected").text().trim() == "UV") {
//					optionList = ["DOSE", "S1_DOSE", "S2_DOSE", "S3_DOSE", "S4_DOSE", "S5_DOSE", "S6_DOSE",
//						"P1_DOSE", "P2_DOSE", "P3_DOSE", "P4_DOSE", "P5_DOSE", "P6_DOSE"]
//				} else if ($("#bwmsTypeSelected").text().trim() == "O3") {
//					optionList = ["PORT_O3_DOSE", "STBD_O3_DOSE", "BR_DOSE"]
//				}

				optionList.forEach((val, idx) => {
					
						const option = '<option value="' + val.toUpperCase() + '">' + val.toUpperCase() + '</option>'
						$("#validData").append(option)
					
				})
			},
			error: (request, error, status) => {

			}
		})
	}
	
	function selectedUnitOperData(e) {
		$(this).attr("id", "unitOperSelected")
		$(this).siblings("#unitOperSelected").removeAttr("id")
		 const startTime = $(this).text().trim().split('~')[0].split('.')[1]
		 const endTime = $(this).text().trim().split('~')[1]
		
		
		$("#dataStartDate").val(startTime);
		$("#dataEndDate").val(endTime);
		
		if($("#unitOperSelected")){
			searchUnitOperValiData()
		}

	}
	
	//gis데이터 조회
	
	//데이터분석
	

	function analysisShipData(e) {
		$("#map").children().remove();
//		const startTime = new Date($("#shipDataSelected").text().trim().split('~')[0].split('.')[1])
//		const endTime = new Date($("#shipDataSelected").text().trim().split('~')[1])
		const startTime = new Date($("#dataStartDate").val())
		const endTime = new Date($("#dataEndDate").val())
		
		const imo_num = $("#shipSelected").children()[1].textContent
		const fnm_rule = $("#shipSelected").children()[0].textContent
		const category = $("#bwmsTypeSelected").text().trim()
		const validData = $("#validData option:selected").val().toLowerCase()
		valiSelectedData =  $("#validData option:selected").val()
		const ecMin  = $("#ecMin").val();
		const ecMax  = $("#ecMax").val();
		const uvMax  = $("#uvMax").val();
		const o3Min  = $("#o3Min").val();
		const o3Max  = $("#o3Max").val();
		/* 운전데이터  설명 기준 값 받아와서 설정*/ 
		//상한값
		$("#ecMax_h").text(ecMax);
		$("#o3Max_h").text(o3Max);
		//하한값
		$("#ecMin_h").text(ecMin);
		$("#uvMin_h").text(uvMax);
		$("#o3Min_h").text(o3Min);
		
		
		// console.log(validData)
		if (validData == "not") return;

		$.ajax({
			type: 'post',
			url: '/psc/getShipData.do',
			data: {
				startTime: startTime,
				endTime: endTime,
				imo_num: imo_num,
				fnm_rule: fnm_rule,
				category: category,
				validData: validData
			},
			dataType: 'json',
			success: ({ dataList, logList, allDataList, domain, startTime, endTime,gpsList }) => {
				srhCategory = category;
				/*dataList Slice*/
				const orgList = dataList.slice()
				const outlierList = dataList.slice()
				var cou = 0;
				var notZero = orgList;
				orgList.forEach(function(el,index){
					if(orgList[index]==0){
						cou +=1 
					}else{
						notZero += orgList[index]
					}
				})
				dataList.sort();
			
				/*콘솔*/
				// dataList = 유효데이터 selected 한 값들 
				
				
				//평균 구하기 
				const average = (array) => array.filter(a => a>0).reduce((a, b) => a + b,0) / array.length;
				//operation time
				const opTime = (new Date(endTime) - new Date(startTime)) / (60 * 60 * 1000);
				//0인 값들 제거
				const tbDataList = dataList.filter((element, i) => (element > 0 || element < 0));
				var [max, min, avg, mid, stdDev, lower, upper, count] =
					[
					//max
					tbDataList.reduce((previous, current) => previous > current ? previous : current,0),
					//min
					tbDataList.reduce((previous, current) => previous > current ? current : previous,0),
					//avg
					average(tbDataList),
					//mid
					tbDataList[parseInt(tbDataList.length / 2)],
					//stdDev
					((tbDataList, avg) => Math.sqrt(tbDataList.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / (tbDataList.length - 1)))(dataList, average(tbDataList)),
					//lower
					tbDataList[parseInt(tbDataList.length * 0.25)],
					//upper
					tbDataList[parseInt(tbDataList.length * 0.75)],
					//count
					tbDataList.length];

				//IQR 계산
				//IQR 계산 하지말고 절대 값
				const iqr = upper - lower
				//const [upperExt, lowerExt] = [upper + 1.5 * iqr, lower - 1.5 * iqr]
			
				
				//이상치 = outlier 그래프
				let outlier = 0
				orgList.forEach((v, i) => {
					if (category == "EC") {
						//if (v > upperExt || v < lowerExt) {
						if (v > ecMax || v < ecMin) {
							orgList[i] = null
							outlier += 1
						} else outlierList[i] = null
					} else if (category == "UV") {
						if (v < uvMax) {
							orgList[i] = null
							outlier += 1
						} else outlierList[i] = null
					} else if (category == "O3") {
						if (o3Min > v || o3Max < v) {
							orgList[i] = null
							outlier += 1
						} else outlierList[i] = null
					}

				})
				
				//이상치  테이블
				var tbOutLier = 0
				tbDataList.forEach((v, i) => {
					if (category == "EC") {
						//if (v > upperExt || v < lowerExt) {
						if (v > ecMax || v < ecMin) {
							tbDataList[i] = null
							tbOutLier += 1
						} 
					} else if (category == "UV") {
						if (v < uvMax) {
							tbDataList[i] = null
							tbOutLier += 1
						} 
					} else if (category == "O3") {
						if (o3Min > v || o3Max < v) {
							tbDataList[i] = null
							tbOutLier += 1
						} 
					}
				})
				
				var span   = $("#resultColor");
				var span2  = $("#isResult");
				//운전데이터 card header 판별 결과 초기화
				span.removeClass("green orange red");
				span.text("");
				span2.text("");
				//이상치 퍼센트 테이블 
				var outlierPer = (tbOutLier / count) * 100
				let isNormal = "정상"
				if (category == "EC") {
					if(outlierPer >= 20) isNormal = "이상"
					else if (outlierPer >= 10 && outlierPer < 20) isNormal = "검토"
					else isNormal="정상"
				} else {
					if( outlierPer > 5 && outlierPer<10) {isNormal = "검토"}
					else if (outlierPer >10){ isNormal="이상"}
					else {isNormal="정상"}
				}
				
				//운전데이터 card header 판별 결과 표현
				if(isNormal=="정상"){
				
					span.addClass("green");
					span.append("●")
					span2.append(isNormal);
					
				}else if(isNormal=="검토"){
					span.addClass("orange");
					span.append("●")
					span2.append(isNormal);
				}else if(isNormal=="이상"){
					span.addClass("red");
					span.append("●")
					span2.append(isNormal);
				}
					
				
				Date.prototype.format = function (f) {
					if (!this.valueOf()) return " ";

					var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
					var d = this;

					return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
						switch ($1) {
							case "yyyy": return d.getFullYear();
							case "yy": return (d.getFullYear() % 1000).zf(2);
							case "MM": return (d.getMonth() + 1).zf(2);
							case "dd": return d.getDate().zf(2);
							case "E": return weekName[d.getDay()];
							case "HH": return d.getHours().zf(2);
							case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
							case "mm": return d.getMinutes().zf(2);
							case "ss": return d.getSeconds().zf(2);
							case "a/p": return d.getHours() < 12 ? "오전" : "오후";
							default: return $1;
						}
					});
				};
				String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
				String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
				Number.prototype.zf = function (len) { return this.toString().zf(len); };
				
				
					
				
				if(isNaN(avg)){
					avg =0
				}
				if(mid == undefined){
					mid = 0
				}
				if (isNaN(outlierPer)){
					outlierPer = 100;
					isNormal = "이상";
					$("#resultColor").removeClass();
					$("#resultColor").addClass("red");
					$("#isResult").html('이상');
				}
				if (isNaN(stdDev)){
					stdDev = 0
				}
			
				
				const tablebody = $("#driveTable tbody")
				tablebody.children().remove()
				const tr = '<tr>'
					+ '<td>' + fnm_rule + '</td>'
					+ '<td>' + new Date(startTime).format('yy-MM-dd HH:mm:ss') + '</td>'
					+ '<td>' + new Date(endTime).format('yy-MM-dd HH:mm:ss') + '</td>'
//					+ '<td>' + opTime.toFixed(1) + '</td>'
					+ '<td>' + min + '</td>'
					+ '<td>' + max + '</td>'
					+ '<td>' + avg.toFixed(3) + '</td>'
					+ '<td>' + mid + '</td>'
					+ '<td>' + stdDev.toFixed(3) + '</td>'
					+ '<td>' + tbOutLier + '</td>'
					+ '<td>' + count + '</td>'
					+ '<td>' + outlierPer.toFixed(1) + '%</td>'
					+ '<td>' + isNormal + '</td>'
					+ '</tr>'
				tablebody.append(tr)
				
				var dragOptions = {
					animationDuration: 1000
				};
				// console.log(orgList, outlierList)
				if ($("#pointChart")) {

					const parent = $("#pointChart").parent()
					// console.log(parent)
					parent.children().remove()
					parent.append('<canvas id="pointChart"></canvas>')
				}
				const pointContainer = document.getElementById('pointChart').getContext('2d')
				const chart = new Chart(pointContainer, {
					type: 'line',
					data: {
						labels: logList,
						datasets: [{
							label: fnm_rule,
							//bwms nomaldataList
							data: orgList,
							lineTension: 0,
							showLine: false,
							pointBackgroundColor: 'rgba(75, 192, 192, 1)',
							backgroundColor: 'rgba(75, 192, 192, 1)',
						}, {
							label: fnm_rule + '`s outlier',
							//bwms outlierList
							data: outlierList,
							lineTension: 0,
							showLine: false,
							pointBackgroundColor: 'rgb(255, 99, 132)',
							backgroundColor: 'rgb(255, 99, 132)',
						}]
					},
					options: {
						responsive: true,
						title: {
							display: true,
							text: '정상화 판별 기준'
						},
						tooltips: {
							mode: 'index',
							intersect: false,
						},
						hover: {
							mode: 'nearest',
							intersect: true
						},
						onHover:(event, chartElement) => {
						    event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
						},
						scales: {
							xAxes: [{
								type: 'time',
								offset: true,
								distribution: 'series',
								time: {
									displayFormats: {
										'day': 'M월 DD일 HH:mm'
									}
								},
								ticks: {
									source: 'auto',
									autoSkip: true,
									autoSkipPadding: 200,
									maxRotation: 0,
								},

							}],
							yAxes: [{
								display: true,
								ticks: {
									suggestedMin: 0,
								},
								scaleLabel: {
									display: false,
									labelString: 'y축'
								},
								
							}]
						},
						//scale end
						plugins: {
							zoom: { 
								pan:{
									enabled:true,
									mode:'x'
								},
								zoom: {
									enabled: true,
									mode: 'x',
									speed: 0.5
								}
							},
//							tooltip:{
//								callbacks:{
//									footer:'조회 장치'+valiSelectedData,
//								}
//							}
						},
						
						
					
					
						
					}
							
				});
				
				
				
			
				document.getElementById("pointChart").onclick = function(evt){
					
					var activePoint = chart.getElementAtEvent(event);
					var graphCard = $("#graphCard");
					var stEndDt ='<div class="right" id ="stEndDt"></div>' 
					var spanFir = '<span class="btn btn-result" id = "firLabel"></span>'
					var spanSec = '<span class="btn btn-result" id = "secLabel"></span>'
					
				
					//첫번째 클릭
					if(firVal == null){
						if($("#stEndDt").length != 0){
							$("#stEndDt").remove();
							
						}
						graphCard.append(stEndDt)
						
					  // make sure click was on an actual point
					  if (activePoint.length > 0) {
							
					    var clickedDatasetIndex = activePoint[0]._datasetIndex;
					    var clickedElementindex = activePoint[0]._index;
					    var label = chart.data.labels[clickedElementindex];
					    var value = chart.data.datasets[clickedDatasetIndex].data[clickedElementindex];     
					    firVal = value;
					    firLabel = label;
					    $("#stEndDt").append(spanFir)
					    $("#firLabel").text('시작점 : '+  new Date(firLabel).format('MM월 dd일 HH:mm:ss'));
					    $("#dataStartDate").val(firLabel);
					  }else{
						  firVal == null;
					  }
					  //두번째 클릭
					}else if(firVal != null){
					  if (activePoint.length > 0) {
					    var clickedDatasetIndex = activePoint[0]._datasetIndex;
					    var clickedElementindex = activePoint[0]._index;
					    var label = chart.data.labels[clickedElementindex];
					    var value = chart.data.datasets[clickedDatasetIndex].data[clickedElementindex];     
					    secVal = value;
					    secLabel = label;
					    $("#stEndDt").append(spanSec)
					    $("#secLabel").text('종료점 : '+  new Date(secLabel).format('MM월 dd일 HH:mm:ss'));
					    $("#dataEndDate").val(secLabel);
					  
					  firTime = new Date(firLabel)
					  secTime = new Date(secLabel)
					  
					  
					  $.ajax({
						  type: 'post',
						  url: '/psc/getShipData.do',
						  data: {
							  startTime: firTime,
							  endTime: secTime,
							  imo_num: imo_num,
							  fnm_rule: fnm_rule,
							  category: category,
							  validData: validData
						  },
						  dataType: 'json',
						  success: ({ dataList, logList, allDataList, domain, startTime, endTime,gpsList }) => {
						  srhCategory = category;
						  /dataList Slice/
						  const orgList = dataList.slice()
						  const outlierList = dataList.slice()
						  var cou = 0;
						  var notZero = orgList;
						 	orgList.forEach(function(el,index){
							  if(orgList[index]==0){
							  cou +=1
							  }else{
							  notZero += orgList[index]
							 	}
							})
							dataList.sort();
							/*콘솔*/
							// dataList = 유효데이터 selected 한 값들


							//평균 구하기
							const average = (array) => array.filter(a => a > 0).reduce((a, b) => a + b,0) / array.length;
							//operation time
							const opTime = (new Date(secLabel) - new Date(firLabel)) / (60 * 60 * 1000);
							//0인 값들 제거
//							const tbDataList = dataList.filter((element, i) => (element > 0 || element < 0));
							const [max, min, avg, mid, stdDev, lower, upper, count] =
								[
								//max
								orgList.reduce((previous, current) => previous > current ? previous : current,0),
								//min
								orgList.reduce((previous, current) => previous > current ? current : previous,0),
								//avg
								average(orgList),
								//mid
								orgList[parseInt(orgList.length / 2)],
								//stdDev
								((orgList, avg) => Math.sqrt(orgList.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / (orgList.length - 1)))(dataList, average(orgList)),
								//lower
								orgList[parseInt(orgList.length * 0.25)],
								//upper
								orgList[parseInt(orgList.length * 0.75)],
								//count
								orgList.length];

							//IQR 계산
							//IQR 계산 하지말고 절대 값
							const iqr = upper - lower
							//const [upperExt, lowerExt] = [upper + 1.5 * iqr, lower - 1.5 * iqr]


							//이상치 = outlier 그래프
							let outlier = 0
							orgList.forEach((v, i) => {
								if (category == "EC") {
									//if (v > upperExt || v < lowerExt) {
									if (v > ecMax || v < ecMin) {
										orgList[i] = null
										outlier += 1
									} else outlierList[i] = null
								} else if (category == "UV") {
									if (v < uvMax) {
										orgList[i] = null
										outlier += 1
									} else outlierList[i] = null
								} else if (category == "O3") {
									if (o3Min > v || o3Max < v) {
										orgList[i] = null
										outlier += 1
									} else outlierList[i] = null
								}

							})

							//이상치  테이블
							var tbOutLier = 0
							tbDataList.forEach((v, i) => {
								if (category == "EC") {
									//if (v > upperExt || v < lowerExt) {
									if (v > ecMax || v < ecMin) {
										tbDataList[i] = null
										tbOutLier += 1
									}
								} else if (category == "UV") {
									if (v < uvMax) {
										tbDataList[i] = null
										tbOutLier += 1
									}
								} else if (category == "O3") {
									if (o3Min > v || o3Max < v) {
										tbDataList[i] = null
										tbOutLier += 1
									}
								}
							})

							var span   = $("#newResultColor");
							var span2  = $("#newIsResult");
							//운전데이터 card header 판별 결과 초기화
							span.removeClass("green orange red");
							span.text("");
							span2.text("");
							//이상치 퍼센트 테이블
							const outlierPer = (outlier / count) * 100
							let isNormal = "정상"
							if (category == "EC") {
								if(outlierPer >= 20) isNormal = "이상"
								else if (outlierPer >= 10 && outlierPer < 20) isNormal = "검토"
								else isNormal="정상"
							} else {
								if(5<outlierPer<10) isNormal = "검토"
								else if (outlierPer >10) isNormal="이상"
								else isNormal="정상"
							}

							//운전데이터 card header 판별 결과 표현
							if(isNormal=="정상"){

								span.addClass("green");
								span.append("●")
								span2.append(isNormal);

							}else if(isNormal=="검토"){
								span.addClass("orange");
								span.append("●")
								span2.append(isNormal);
							}else if(isNormal=="이상"){
								span.addClass("red");
								span.append("●")
								span2.append(isNormal);
							}


//							Date.prototype.format = function (f) {
//								if (!this.valueOf())return " ";
//
//								var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
//								var d = this;
//
//								return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\\/p)/gi, function ($1) {
//									switch ($1) {
//										case "yyyy": return d.getFullYear();
//										case "yy": return (d.getFullYear() % 1000).zf(2);
//										case "MM": return (d.getMonth() + 1).zf(2);
//										case "dd": return d.getDate().zf(2);
//										case "E": return weekName[d.getDay()];
//										case "HH": return d.getHours().zf(2);
//										case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
//										case "mm": return d.getMinutes().zf(2);
//										case "ss": return d.getSeconds().zf(2);
//										case "a/p": return d.getHours() < 12 ? "오전" : "오후";
//										default: return $1;
//									}
//								});
//							};
//							String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
//							String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
//							Number.prototype.zf = function (len) { return this.toString().zf(len); };
							
							
						




							const tablebody = $("#newDriveTable tbody")
							tablebody.children().remove()
							const tr = '<tr>'
								+ '<td>' + fnm_rule + '</td>'
								+ '<td>' + new Date(firTime).format('yy-MM-dd HH:mm:ss') + '</td>'
								+ '<td>' + new Date(secTime).format('yy-MM-dd HH:mm:ss') + '</td>'
//								+ '<td>' + opTime.toFixed(1) + '</td>'
								+ '<td>' + min + '</td>'
								+ '<td>' + max + '</td>'
								+ '<td>' + avg.toFixed(3) + '</td>'
								+ '<td>' + mid + '</td>'
								+ '<td>' + stdDev.toFixed(3) + '</td>'
								+ '<td>' + outlier + '</td>'
								+ '<td>' + count + '</td>'
								+ '<td>' + outlierPer.toFixed(1) + '%</td>'
								+ '<td>' + isNormal + '</td>'
								+ '</tr>'
							tablebody.append(tr)

							var dragOptions = {
							 sanimationDuration: 1000
							};
							// console.log(orgList, outlierList)
							if ($("#newPointChart")) {

								const parent = $("#newPointChart").parent()
								// console.log(parent)
								parent.children().remove()
								parent.append('<canvas id="newPointChart"></canvas>')
							}
							const pointContainer = document.getElementById('newPointChart').getContext('2d')
							const chart = new Chart(pointContainer, {
								type: 'line',
								data: {
									labels: logList,
									datasets: [{
										label: fnm_rule,
										//bwms nomaldataList
										data: orgList,
										lineTension: 0,
										showLine: false,
										pointBackgroundColor: 'rgba(75, 192, 192, 1)',
										backgroundColor: 'rgba(75, 192, 192, 1)',
									}, {
										label: fnm_rule + '`s outlier',
										//bwms outlierList
										data: outlierList,
										lineTension: 0,
										showLine: false,
										pointBackgroundColor: 'rgb(255, 99, 132)',
										backgroundColor: 'rgb(255, 99, 132)',
									}]
								},
								options: {
									responsive: true,
									title: {
										display: true,
										text: '정상화 판별 기준'
									},
									tooltips: {
										mode: 'index',
										intersect: false,
									},
									hover: {
										mode: 'nearest',
										intersect: true
									},
									scales: {
										xAxes: [{
											type: 'time',
											offset: true,
											distribution: 'series',
											time: {
												displayFormats: {
													'day': 'M월 DD일 HH:mm'
												}
											},
											ticks: {
												source: 'auto',
												autoSkip: true,
												autoSkipPadding: 200,
												maxRotation: 0,
											},

										}],
										yAxes: [{
											display: true,
											ticks: {
												suggestedMin: 0,
											},
											scaleLabel: {
												display: false,
												labelString: 'y축'
											},

										}]
									},
									//scale end
									plugins: {
										zoom: {
											pan:{
												enabled:true,
												mode:'x'
											},
											zoom: {
												enabled: true,
												mode: 'x',
												speed: 0.5
											}
										}
									}





								}

							});
					  
						  }
						  //success end
					  
					
					  
					  });
						$("#newDataAnalysisModal").modal("show")
					}
					}else{
						secLabel == null;
						secVal == null;
					}
					
				}



				
			
				
				
				//chart end
				/*grid start*/
				grid.clear()

				let header = []

				domain.forEach(function (val, idx) {
					header.push({
						header: String(val).toLocaleUpperCase(),
						name: val,
						whiteSpace: 'normal'
					})
				})
				csvHeader = header.slice();
				csvDataList = allDataList.slice();
				
				grid.setColumns(header);
				// grid.appendRows(createRows())
				grid.resetData(allDataList);
				grid.setWidth(header.length * 170);
				//map 초기화
				if(category == "EC"){
					if(csvDataList[0].gps){
						initMap();
					}else{
						
						
						$("#map").append("<p>해당 데이터에 GPS값이 없습니다.</p>")
					}
				}else{
					initMap();
				}
				/*grid 팝업창에 post 방식으로 데이터 보내기위한  form에 데이터 넣기*/
				$("#startTime").val(startTime);
				$("#endTime").val(endTime);
				$("#imoNum").val(imo_num);
				$("#shipNm").val(fnm_rule);
				$("#category").val(category);
			
				
				
			}
		,beforeSend:function(){
			$('.wrap-loading').removeClass('display-none');
		}
		,complete:function(){
			 $('.wrap-loading').addClass('display-none');
		}
		,error: (request, status, error) => {

			}
		})
	}
	$("#searchImo").on("propertychange change keyup paste input", seacrhShip)
	
	$(".bwms_type").click(selectedBwmsType)
	
	
	
	
	
	//analysis클릭 시 작업 
	$("#analysisBtn").click(function(){
		//validation value 
		if($('#bwmsTypeSelected').length == 0){
			alert("조회할 BWMS TYPE을 클릭해주세요 .");
			$('#bwmsTypeSelected').focus();
			return false;
		}else if($('#shipSelected').length == 0){
			alert("조회할 선박을  선택해주세요.");
			$('#shipList').focus();
			return false;
		}else if($('#shipDataSelected').length == 0){
			alert("전체데이터  데이터셋을  선택해주세요.");
			$('#shipDataList').focus();
			return false;
		}
		
		else if($('#validData option:selected').val() == 'not'){
			alert("조회할 유효데이터를 선택해주세요");
			$('#validData').focus();
			return false;
		}else if($('#ecMin').val().length == 0){
			alert("정상운전 판별기준 전기분해방식 최소값을 확인해주세요.");
			$('#ecMin').focus();
			return false;
		}else if($('#ecMax').val().length == 0){
			alert("정상운전 판별기준 전기분해방식 최대값을 확인해주세요.");
			$('#ecMax').focus();
			return false;
		}else if($('#uvMax').val().length == 0){
			alert("정상운전 판별기준 자외선분해방식 값을 확인해주세요.");
			$('#uvMax').focus();
			return false;
		}else if($('#o3Min').val().length == 0){
			alert("정상운전 판별기준 전기분해방식 최소값을 확인해주세요.");
			$('#o3Min').focus();
			return false;
		}else if($('#o3Max').val().length == 0){
			alert("정상운전 판별기준 전기분해방식 최대값을 확인해주세요.");
			$('#o3Man').focus();
			return false;
		}
		
		$("#firstHide").css("display","block");
		$("#pointChart").focus();
		
	})
	
	$("#analysisBtn").click(analysisShipData)
	$(".bwms_type")[0].click()
	
	
	/* input on change */
	$("#termBtn").click(function(){
		if($("#termDataStartDate").val().length== 0){
			alert("기간검색  시작일자를 입력해주세요.");
			$('#termDataStartDate').focus();
			return false;
		}
		if($("#termDataEndDate").val().length == 0){
			alert("기간검색  종료일자를 입력해주세요.");
			$('#termDataEndDate').focus();
			return false;
		}
		
		const startTimeArr = $("#termDataStartDate").val().trim().split('/')
		const startTime = startTimeArr[2]+'-'+startTimeArr[0]+'-'+startTimeArr[1]
//		$("#shipDataSelected").text().trim().split('~')[0].split('.')[1])
		const endTimeArr = $("#termDataEndDate").val().trim().split('/')
		const endTime = endTimeArr[2]+'-'+endTimeArr[0]+'-'+endTimeArr[1]
		
		console.log("startTime =" + startTime);
		console.log("startTime =" + endTime)
		
		$("#unitOperSelected").removeAttr("id")
		$(this).attr("id", "unitOperSelected")
		$.ajax({
			type: 'post',
			url: '/psc/searchTermUnitLog.do',
			data: {
				fnmRule: fnmRule,
				imoNo: imoNo,
				category: category,
				startTime : startTime,
				endTime : endTime
			},
			dataType: 'json',
			success: ({ hashMapList, domain ,operTime,operCount}) => {
				
			
				var operTbody = $("#shipOperList tbody")
				operTbody.children().remove()
				const tr1 = '<tr class="pointer-event"><th class="text-center" colspan="4">단위 운전 데이터 셋 </th></tr>'
					operTbody.append(tr1)
				if(operCount > 0){
					
					
					operTime.forEach((val, idx) => {
						
						
						// console.log(startTime, endTime)
						
						//09/23
	//					$("#dataStartDate").val(val.startTime);
	//					$("#dataEndDate").val(val.endTime);
	//					
						
						const tr = '<tr><td>' + (idx + 1) + '.</td>'
							+ '<td class="text-center">' + val.startTime + '</td>'
							+ '<td class="text-center">' + '~' + '</td>'
							+ '<td class="text-center">' + val.endTime + '</td></tr>'
						operTbody.append(tr)
					})
					operTbody.children().click(selectedUnitOperData)
				}else{
					const tr2 = '<tr class="pointer-event"><th class="text-center" colspan="4">존재하는 단위운전 데이터셋이 없습니다. </th></tr>'
					operTbody.append(tr2)
				}
				
				$("#validData").children().not("#notDeletedOption").remove()
				$("#notDeletedOption").attr("selected", "selected")
				let optionList = []
				if ($("#bwmsTypeSelected").text().trim() == "EC") {
					optionList = ["TRO1", "TRO2", "TRO_B1", "TRO_B2", "TRO_B3"] 
//					,"TRO_D1", "TRO_D2", "TRO_D3", "TRO_D4", "TRO_S1", "TRO_S2"]
				} else if ($("#bwmsTypeSelected").text().trim() == "UV") {
					optionList = ["DOSE", "S1_DOSE", "S2_DOSE", "S3_DOSE", "S4_DOSE", "S5_DOSE", "S6_DOSE",
						"P1_DOSE", "P2_DOSE", "P3_DOSE", "P4_DOSE", "P5_DOSE", "P6_DOSE"]
				} else if ($("#bwmsTypeSelected").text().trim() == "O3") {
					optionList = ["PORT_O3_DOSE", "STBD_O3_DOSE", "BR_DOSE"]
				}

				domain.forEach((val, idx) => {
					if (optionList.includes(val.toUpperCase())) {
						const option = '<option value="' + val.toUpperCase() + '">' + val.toUpperCase() + '</option>'
						$("#validData").append(option)
					}
				})
			},
			error: (request, error, status) => {

			}
		})
	})
	
})

//map init
function initMap() {
	//타입별 연산
	var locations = calcGPS(srhCategory);
	
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 7,
		center: new google.maps.LatLng(locations[0][1],locations[0][2]),
		//위성지도
//		mapTypeId: google.maps.MapTypeId.HYBRID,
		panControl:false,
//		streetViewcontrol:false,
		rotateControl:false
	});

	var infowindow = new google.maps.InfoWindow;
	for (i = 0; i < locations.length; i++) {
		
	var marker, i;
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map
	});

	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
		}
	})(marker, i));

	}
}

/*
 * GPS 연산 함수
 * parameter : category
 * return	 : locations = [['인포리스트 내용', 위도, 경도],,,]
 **/
function calcGPS(category){
	var locations = new Array();
	var stdDate = null;
	if(category === "EC"){
		//techross dms
		for(var idx = 0; idx < csvDataList.length; idx++){
			
		stdDate = new Date(csvDataList[idx].log_date);
				
						
//		if(csvDataList[idx].gps == "" || csvDataList[idx].gps == null || csvDataList[idx].gps == undefined){
//			continue;
//		}
		var loc = new Array();
		loc.push(csvDataList[idx].log_date);
	
			var lat = csvDataList[idx].gps.slice((csvDataList[idx].gps).indexOf('[', 0)+1,(csvDataList[idx].gps).indexOf(']', 0));
			var lon = csvDataList[idx].gps.slice((csvDataList[idx].gps).indexOf('[', (csvDataList[idx].gps).indexOf(']', 0))+1,(csvDataList[idx].gps).indexOf(']', (csvDataList[idx].gps).indexOf(']', 0)+1));
			var latArr = lat.split(",");
			var lonArr = lon.split(",");
			if(latArr.length == 3){
				if(latArr[2] === "N"){
					loc.push(Number(latArr[0]) + (Number(latArr[1])/60));
				}else if(latArr[2] === "S") {
					loc.push((Number(latArr[0]) + (Number(latArr[1])/60)) * -1);
				}
				if(lonArr[2] === "E"){
					loc.push(Number(lonArr[0]) + (Number(lonArr[1])/60));
				}else if(lonArr[2] === "W") {
					loc.push((Number(lonArr[0]) + (Number(lonArr[1])/60))  * -1);
				}
			}else{
				if(latArr[3] === "N"){
					loc.push(Number(latArr[0]) + (Number(latArr[1])/60) + (Number(latArr[2])/3600));
				}else if(latArr[3] === "S") {
					loc.push((Number(latArr[0]) + (Number(latArr[1])/60) + (Number(latArr[2])/3600)) * -1);
				}
				if(lonArr[3] === "E"){
					loc.push(Number(lonArr[0]) + (Number(lonArr[1])/60) + (Number(lonArr[2])/3600));
				}else if(lonArr[3] === "W") {
					loc.push((Number(lonArr[0]) + (Number(lonArr[1])/60) + (Number(lonArr[2])/3600)) * -1);
				}
			}
		

		locations.push(loc);
		}

		
		console.log(locations)
	}else if(category === "UV"){
		console.log(csvDataList);
		for(var idx = 0; idx < csvDataList.length; idx++){
//			if(idx == 0){
				stdDate = new Date(csvDataList[idx].log_date);
//				stdDate.setHours(stdDate.getHours()+1);
//			}else {
//				if(stdDate > new Date(csvDataList[idx].log_date)){
//					continue;
//				}else {
					if(csvDataList[idx].lat == ""&&csvDataList[idx].lon == "" 
						|| csvDataList[idx].lat == null &&  csvDataList[idx].long == null
						|| csvDataList[idx].lat == undefined && csvDataList[idx].lat == undefined
						){
						continue;
					}
//					}
//					stdDate.setHours(stdDate.getHours()+1);
//					if(stdDate < new Date(csvDataList[idx].log_date)){
//						stdDate.setFullYear((new Date(csvDataList[idx].log_date)).getFullYear());
//						stdDate.setMonth((new Date(csvDataList[idx].log_date)).getMonth());
//						stdDate.setDate((new Date(csvDataList[idx].log_date)).getDate());
//						stdDate.setHours((new Date(csvDataList[idx].log_date)).getHours()+1);
//					}
					var loc = new Array();
					var lat = csvDataList[idx].lat;
					var lon = csvDataList[idx].lon;
					loc.push(csvDataList[idx].log_date);
					loc.push(lat);
					loc.push(lon);
					
				
					locations.push(loc);
					
					
//				}
//			}
		}
		console.log(locations)
	}else if(category === "O3"){
		locations = [
		     ['1', 34.872649, 128.708365],
		 	];
	}
	return locations;
}

// csv download
function csvDownload(){
	var a = "";
	//csv 헤더 추가
	csvHeader.forEach((value, index, array)=>{
		a += value.header + ",";
	});
	a.slice(0,-1);
	a += "\r\n";
	//csv 내용 추가
	for(var item of csvDataList){
		csvHeader.forEach((value, index, array)=>{
			a += '\"' + item[value.name] + '\"' + ",";
		});
		a.slice(0,-1);
		a += "\r\n";
	}
	var downloadLink = document.createElement("a");
	var blob = new Blob([a], { type: "text/csv;charset=utf-8" });
	var url = URL.createObjectURL(blob);
	downloadLink.href = url;
	// 파일이름에 date/time 및 선박명 
	downloadLink.download = "data.csv";

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

//운전데이터 모달

function driveDataModal(){
	
	$("#driveDataModal").modal()
}
//








	
