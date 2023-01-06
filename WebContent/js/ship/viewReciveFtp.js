$(document).ready(function () {


	$(".ftpForder")[0].click();
	
	

	
	
//	const grid = new tui.Grid({
//		el: document.getElementById('grid'),
//		scrollX: true,
//		scrollY: true,
//		bodyHeight: 600,
//		data: [],
//		columns: []
//	})

//	grid.on("click", (e) => {
//		const { columnName, rowKey, instance } = e
//		const category = $(".nav-link.active").text().trim()
//		// console.log(columnName, rowKey, instance)
//		if (rowKey == null) {
//			$.ajax({
//				url: '/ship/getDomainDescription.do',
//				type: 'post',
//				data: {
//					domainName: columnName,
//					category: category
//				},
//				dataType: 'json',
//				success: function (result) {
//					const { des, type } = result.hashMap
//					// console.log(des, type)
//					$("#domainCard .card-body").css("display", "block")
//					$("#domainNameListItem").text(columnName)
//					$("#desItemDiv").text(des)
//					$("#typeItemDiv").text(type)
//				},
//				error: function (request, status, error) {
//					// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
//					// 	+ request.responseText + "\n" + "error:" + error);
//				}
//			})
//		}
//	})
//	tui.Grid.applyTheme('striped');
	
//	 confirm("alarm이 발견되었습니다.\n 해당 부분으로 이동하시겠습니까?");
	// modal timer
	var timer
	var i =1
//	function secTimer(){
//			
//			console.log(i);
//	}
//	function plus(){
//		$('#secTimer').text(i)
//		i++
//	}
//	
//	function timerStop(){
//		clearInterval(timer);
//		timer = null
//		i = 1
//	}
	function dataSelect() {
		
		
		
		const fileNm = $(".checked .fnmRule").text().trim()
		const forderNm = $(".nav-link.active").text().trim()
		
		if(forderNm == ""){
			alert("데이터를 먼저 선택해주세요.");
			return false;
		}else{
		var csvArray;
		var csvThead = $("#csvTable thead");
		var csvTbody = $("#csvTable tbody");
			$.ajax({
				url: '/ftp/selectData.do',
				type: 'post',
				data: {
					fileNm: fileNm,
					forderNm: forderNm,
					
				},
				dataType: 'json',
				success: function (result) {
					
					csvThead.children().remove()
					csvTbody.children().remove()
					csvArray = result.csvArray;
					
					makeTable(csvArray);
//					 clearInterval(timer);
					
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
				,error: function (request, status, error) {
					console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
						+ request.responseText + "\n" + "error:" + error);
				}
			});
		}
	}
	


	
	function makeTable(array) {
		var alarmCnt = 0;
	    var table = $("#csvTable");
	    var thead = $("#csvHeader");
	    var tbody = $("#csvBody");
	    var alarmCol;
	    for (var i = 0; i < array.length; i++) {
	        var row = document.createElement('tr');
	        	alarmCol = (array[i].length-1);
	        for (var j = 0; j < array[i].length; j++) {
	        	if(i == 0){
        		  var th = document.createElement('th');
		            th.textContent = array[i][j];

		            row.append(th);	
		        }else{
		            var cell = document.createElement('td');
		            cell.textContent = array[i][j];

		            row.append(cell);
		        }
	        	// 헤더행 제외
	        	if(i != 0){
	        		//alarm colum
		        	if(j == alarmCol){
		        		array[i][alarmCol]
		        		if(Number(array[i][alarmCol]) != 0 ||Number(array[i][alarmCol]) != 0.0){
		        			alarmCnt++
		        		}
		        		
		        	}
	        	}
	        	
	        }
	        if(i == 0){
	        	thead.append(row);	
	        }else{
	        	tbody.append(row);
	        }
	    }
	    
	    if(alarmCnt != 0){
	    	alert("자가진단 알람값이 총  "+alarmCnt+" 발견되었습니다.\n 데이터의 alarm 값을 확인바랍니다.")
	    }
	    
	}


	$(".content").on("click", function () {
		// console.log($(this))
		if ($(this).hasClass("checked")) {
			$(this).removeClass("checked")
		} else {
			$(this).siblings(".checked").removeClass("checked")
			$(this).addClass("checked")
		}

	})

	$("#dataSelectedBtn").click(dataSelect)

})
$(function () {
	$('[data-toggle="popover"]').popover()
})
function initChecked() {
	$(".tab-content .checked").removeClass("checked")
}



function getDomainDescription(e) {
	// console.log($(this))

}