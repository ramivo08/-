$(document).ready(function () {
	var firVal;
	var firLabel;
	var secVal;
	var secLabel;
	var firTime;
	var secTime;
	var valiSelectedData;

	
	var startTime = new Date($("#startTime").val());
	var endTime = new Date($("#endTime").val());
	var imo_num = $("#imo_num").val();
	var shipNm = $("#shipNm").val();
	var category = $("#category").val();
	var colNm = $("#colNm2").val();
	var fnm_rule =  $("#shipNm").val();
	
	var data = {
			startTime : startTime,
			endTime : endTime,
			imo_num : imo_num,
			shipNm : shipNm,
			category : category,
			colNm : colNm
	}
	
	
	$('#newDataAnalysisModal').on('hidden.bs.modal',function(){
		firVal = null;
		secVal = null;
		
	});
	
	
	$.ajax({
		type: 'post',
		url: '/psc/ajaxGraphPop.do',
		data: data,
		dataType: 'json',
		success: ({ dataList, logList, allDataList, domain, startTime, endTime }) => {
			
			//이상치 비율 및 이상치 필요없음
			srhCategory = category;
			/*dataList Slice*/
			const orgList = dataList.slice()
		
			dataList.sort();
		
			/*콘솔*/
			// dataList = 유효데이터 selected 한 값들 
			
			
			//평균 구하기 
			const average = (array) => array.filter(a => a>0).reduce((a, b) => a + b,0) / array.length;
			//operation time
			const opTime = (new Date(endTime) - new Date(startTime)) / (60 * 60 * 1000);
			//0인 값들 제거
//			const tbDataList = dataList.filter((element, i) => (element > 0 || element < 0));
			var [max, min, avg, mid, stdDev, lower, upper, count] =
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
		
			
			const tablebody = $("#driveTable tbody")
			tablebody.children().remove()
			const tr = '<tr>'
				+ '<td>' + fnm_rule + '</td>'
				+ '<td>' + new Date(startTime).format('yy-MM-dd HH:mm:ss') + '</td>'
				+ '<td>' + new Date(endTime).format('yy-MM-dd HH:mm:ss') + '</td>'
//				+ '<td>' + opTime.toFixed(1) + '</td>'
				+ '<td>' + min + '</td>'
				+ '<td>' + max + '</td>'
				+ '<td>' + avg.toFixed(3) + '</td>'
				+ '<td>' + mid + '</td>'
				+ '<td>' + stdDev.toFixed(3) + '</td>'
//				+ '<td>' + tbOutLier + '</td>'
//				+ '<td>' + count + '</td>'
//				+ '<td>' + outlierPer.toFixed(1) + '%</td>'
//				+ '<td>' + isNormal + '</td>'
				+ '</tr>'
			tablebody.append(tr)
			
			
			// 그래프 
			const pointContainer = document.getElementById('popupChart').getContext('2d')
			const chart = new Chart(pointContainer, {
				type: 'line',
				data: {
					labels: logList,
					datasets: [{
						label: colNm,
						//bwms nomaldataList
						data: orgList,
						lineTension: 0,
						showLine: false,
						pointBackgroundColor: 'rgba(75, 192, 192, 1)',
						backgroundColor: 'rgba(75, 192, 192, 1)',
					}]
				},
				options: {
					responsive: true,
					title: {
						display: true,
						text: shipNm+" "+colNm +" 그래프"
						
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
								mode:'x',
								speed: 0.5
							}
						},
			
					},
					
					
				
				
					
				}
						
			});
			
			
			
			document.getElementById("popupChart").onclick = function(evt){
				
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
				  
				  
				  firTime = new Date(firLabel)
				  secTime = new Date(secLabel)
				  
				  $.ajax({
						type: 'post',
						url: '/psc/ajaxGraphPop.do',
						data: {
							  startTime: firTime,
							  endTime: secTime,
							  imo_num : imo_num,
							  shipNm : shipNm,
							  category : category,
							  colNm : colNm
												
						},
						dataType: 'json',
						success: ({ dataList, logList, allDataList, domain, startTime, endTime }) => {
							
							//이상치 비율 및 이상치 필요없음
							srhCategory = category;
							/*dataList Slice*/
							const orgList = dataList.slice()
						
							dataList.sort();
						
							/*콘솔*/
							// dataList = 유효데이터 selected 한 값들 
							
							
							//평균 구하기 
							const average = (array) => array.filter(a => a>0).reduce((a, b) => a + b,0) / array.length;
							//operation time
							const opTime = (new Date(endTime) - new Date(startTime)) / (60 * 60 * 1000);
							//0인 값들 제거
//							const tbDataList = dataList.filter((element, i) => (element > 0 || element < 0));
							var [max, min, avg, mid, stdDev, lower, upper, count] =
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
						
							
							const tablebody = $("#newDriveTable tbody")
							tablebody.children().remove()
							const tr = '<tr>'
								+ '<td>' + fnm_rule + '</td>'
								+ '<td>' + new Date(startTime).format('yy-MM-dd HH:mm:ss') + '</td>'
								+ '<td>' + new Date(endTime).format('yy-MM-dd HH:mm:ss') + '</td>'
//								+ '<td>' + opTime.toFixed(1) + '</td>'
								+ '<td>' + min + '</td>'
								+ '<td>' + max + '</td>'
								+ '<td>' + avg.toFixed(3) + '</td>'
								+ '<td>' + mid + '</td>'
								+ '<td>' + stdDev.toFixed(3) + '</td>'
//								+ '<td>' + tbOutLier + '</td>'
//								+ '<td>' + count + '</td>'
//								+ '<td>' + outlierPer.toFixed(1) + '%</td>'
//								+ '<td>' + isNormal + '</td>'
								+ '</tr>'
							tablebody.append(tr)
							
							
							// 그래프 
							const pointContainer = document.getElementById('newPointChart').getContext('2d')
							const chart = new Chart(pointContainer, {
								type: 'line',
								data: {
									labels: logList,
									datasets: [{
										label: colNm,
										//bwms nomaldataList
										data: orgList,
										lineTension: 0,
										showLine: false,
										pointBackgroundColor: 'rgba(75, 192, 192, 1)',
										backgroundColor: 'rgba(75, 192, 192, 1)',
									}]
								},
								options: {
									responsive: true,
									title: {
										display: true,
										text: shipNm+" "+colNm +" 그래프"
										
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
												mode:'x',
												speed: 0.5
											}
										},
							
									},
									
									
								
								
									
								}
										
							});
						}
				  });
					$("#newDataAnalysisModal").modal("show")
				  
				  
				  
				}
				}else{
					secLabel == null;
				}
			}
			
		}
		,beforeSend:function(){
			$('.wrap-loading').removeClass('display-none');
		}
		,complete:function(){
			 $('.wrap-loading').addClass('display-none');
		}
		,error: (request, error, status) => {
			alert("erorr!");
		}
	})
	
	
	
	
	
})

function dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}