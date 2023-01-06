$(document).ready(function (){
	
	
	$("#searchShipName").keypress(function(e) {
		if(e.which == 13) {
			searchShip()
		}
	})
})

function searchShip(){
	var shipName = $("#searchShipName").val();
	if(shipName !== "") {
		$.ajax({
			type : "GET",			
			url : "/ship/shipinfoAPI.do",
			data : {shipName : shipName},
			dataType: "json",
			success : function(result){
				var list = result.result
				var count = result.count
				
				
				$("#shipSearchResult").children().remove()
//				console.log(list)
				console.log(count)
				if(typeof count == "undefined"){
					var content = '<p>입력하신 값에 해당하는 선박이 없습니다.</p>' 
					 $("#shipSearchResult").append(content); 
				}else{
					for (var i = 0; i < count; i++) {
						var content ='<div class="form-group row">'
				            +'<label class="col-form-label col-sm-4">'
				            + result.result.vsslKorNm[i]
				            +'</label>'
				            +'<div class="col-sm-6">'
				            +'<div class="editable-wrapper">'
				            +'<a class="editable editable-text" title="선택" id="'+i+'" href="javascript:selectShip(' + "'" + list.vsslKorNm[i] + "'" + ')">선택</a>'
	//			            +'<form id="'+i+'">'
	//			            +'<input type=hidden id="korNm" name="korNm" value="'+result.result.vsslKorNm[i]+'">'
	//			            +'<input type=hidden id="engNm" name="engNm" value="'+result.result.vsslEngNm[i]+'">'
	//			            +'<input type=hidden id="vsslNo" name="vsslNo" value="'+result.result.vsslNo[i]+'">'
	//			            +'</form >'  href=javascript:insertshipinfo("'+i+'")
				            +'</div>'
				            +'</div>'
				            +'</div>'
						 $("#shipSearchResult").append(content); 
				          
					}
				}
			},
			error: function(request, status, error){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}
				
		})
	}else{
		alert("선박명을 입력해 주세요.")
	}
	
	
}

function selectShip(shipName) {
	// console.log(shipName)
	$.ajax({
		type : "GET",			
		url : "/ship/shipinfoAPI.do",
		data : {shipName : shipName},
		dataType: "json",
		success : function(result){
			var list = result.result
			var selectedShipIndex = list.vsslKorNm.indexOf(shipName)
			$("#selectShipName").val(list.vsslKorNm[selectedShipIndex])
			$("#imoNo").val(list.imoNo[selectedShipIndex])
			$("#shipNo").val(list.vsslNo[selectedShipIndex])
			$("#shipNlty").val(list.vsslNlty[selectedShipIndex])
			$("#shipCnstrDt").val(list.vsslCnstrDt[selectedShipIndex])
			$("#shipGrtg").val(list.grtg[selectedShipIndex])
			$("#shipKnd").val(list.vsslKnd[selectedShipIndex])
		
		},
		error: function(request, status, error){
			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
			// 		+ request.responseText + "\n" + "error:" + error);
		}
			
	})
}

function insertShip(e) {
	
	var data = $("#shipInfo").serialize();
	

		if($("#bwmsType option:selected").val().length <= 0){
			
			alert("처리방식을 선택해주세요.")
			$("#bwmsType").focus();
			return false;
		}else if($("#selectShipName").val().length <= 0){
			alert("선박명을 입력해주세요.")
			$("#selectShipName").focus();
			return false;
		}else if($("#imoNo").val().length <= 0){
			alert("IMO 번호를 입력해주세요.")
			$("#imoNo").focus();
			return false;
		}else if(!isNumber($("#imoNo").val())){
			alert("IMO 번호는 숫자만 입력할 수 있습니다.")
			$("#imoNo").val("")
			return false;
		}else if($("#shipNo").val().length > 0 && !isNumber($("#shipNo").val())){
				alert("선박번호는 숫자만 입력할 수 있습니다.")
				$("#shipNo").val("")
				return false;
		}else if($("#shipGrtg").val().length > 0  &&  !isNumber($("#shipGrtg").val())){
		
				alert("선박 톤수  숫자만 입력할 수 있습니다.")
				$("#shipGrtg").val("")
				return false;
		
		}else {
				$.ajax({
					type : "POST",			
					url : "/ship/insertShipInformation.do",
					data : data,
					dataType: "json",
					success : function(result){
						var num =  result.result
						
						if(num ==  1){
							alert("선박 등록 성공");
							location.reload();
						}else{
							alert("선박 등록 실패하였습니다.");
							return false;
						}
					
					},
					error: function(request, status, error){
						// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
						// 		+ request.responseText + "\n" + "error:" + error);
					}
						
				})
		}
	
}


