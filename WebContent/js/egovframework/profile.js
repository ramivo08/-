$(document).ready(function (){
		
})

function changePwd() {
	
		if($("#isPwdChange").val() == "true") {
			$("#isPwdChange").val("false")
			$("#inputChangePwd").attr("disabled", true);
			$("#inputChangePwd").attr("required", false);
			$("#inputChangePwdAgain").attr("disabled", true);
			$("#inputChangePwdAgain").attr("required", false);
		} else {
			$("#isPwdChange").val("true")
			$("#inputChangePwd").attr("disabled", false);
			$("#inputChangePwd").attr("required", true);
			$("#inputChangePwdAgain").attr("disabled", false);
			$("#inputChangePwdAgain").attr("required", true);
		}
	
}

function changeShipInfo(){
	if($("#shipList option:selected").val().length <= 0 ){
		alert("변경하실 선박을 먼저 선택해해주세요.")
		return false;
	}else{
		if($("#isShipInfoChange").val() == "true") {
			$("#isShipInfoChange").val("false")
			$("#bwmsDeviceNm").attr("disabled", true);
			$("#bwmsDeviceNm").attr("required", false);
			$("#imoNo").attr("disabled", true);
			$("#imoNo").attr("required", false);
			$("#shipNo").attr("disabled", true);
			$("#shipNlty").attr("disabled", true);
			$("#shipKnd").attr("disabled", true);
		} else {
			$("#isShipInfoChange").val("true")
			$("#bwmsDeviceNm").attr("disabled", false);
			$("#bwmsDeviceNm").attr("required", true);
			$("#imoNo").attr("disabled", false);
			$("#imoNo").attr("required", true);
			$("#shipNo").attr("disabled", false);
			$("#shipNlty").attr("disabled", false);
			$("#shipKnd").attr("disabled", false);
		}
	}
}

function updateUserInfo() {
	if($("#inputChangePwd").is(":disabled") && $("#inputChangePwdAgain").is(":disabled")) {
		return true;
	} else {
		if($("#inputChangePwd").val() != $("#inputChangePwdAgain").val()) {
			alert("변경할 비밀번호를 다시 확인 해 주세요.");
			return false;
		} else {
			if($("#inputChangePwd").val() == $("#inputPwd").val()) {
				alert("변경할 비밀번호가 기존 패스워드와 동일합니다.");
				return false;
			} else {
				return true;
			}
		}
	}
}

function updateShipInfo(){
		if($("#isShipInfoChange").val("true")){
			if($("#bwmsDeviceNm option:selected").val().length <= 0){
				alert("처리방식을 선택해주세요.")
				$("#bwmsDeviceNm").focus();
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
			}else{
				
				var bwmsType = $("#bwmsDeviceNm option:selected").val();
				$.ajax({
					type : "POST",
					url: "/updateShipInfo.do",
					data:{
						"imoNo" :$("#imoNo").val(),
						"bwms_type" : $("#bwmsDeviceNm option:selected").val(),
						"shipNm" :$("#selectShipName").val(),
						"shipNo" :$("#shipNo").val(),
						"shipNlty" :$("#shipNlty").val(),
						"shipKnd" :$("#shipKnd").val()
						} ,
					success: function (result) {
											
					
							alert("선박정보변경에 성공하였습니다");	
							location.reload() 
						
				
						
					}
					,error: function (request, status, error) {
//						alert("선박정보변경에 실패하였습니다");
					}
//				
					
				})
				
			}
			
			
			
		}else{
			alert("선박 정보 변경을 먼저 클릭해주세요.");
		}
}

function deleteShipInfo(){
	var shipNm = $("#selectShipName").val()
	
	if(shipNm.length <=0){
		alert("제거하실 선박을 먼저 선택해주세요.")
	}else{
		
	
	
	$.ajax({
					type : "POST",
					url: "/deleteShipInfo.do",
					data:{
						
						"shipNm" :shipNm
						
						} ,
					success: function (result) {
											
					
							alert("선박을 제거하였습니다");	
							location.reload() 
						
				
						
					}
					,error: function (request, status, error) {
//						alert("선박정보변경에 실패하였습니다");
					}
//				
					
				})
	}
	
	
	
}

function selectShipInfo(){
	// 행당 제조사로 등록된선박 selected option value
	var imoNo = $("#shipList option:selected").val();
	// 선박정보 
	var bwmsDeviceNm = $("#bwmsDeviceNm").val();
	var selectShipName = $("#selectShipName").val();
	var imoNum = $("#imoNo").val();
	var shipNo = $("#shipNo").val();
	var shipNlty = $("#shipNlty").val();
	var shipCnstrDt = $("#shipCnstrDt").val();
	var shipGrtg = $("#shipGrtg").val();
	var shipKnd = $("#shipKnd").val();
	var mnftNm = $("#mnftNm");
	
	$.ajax({
		type : "POST",
		url: "/ajaxSelectShipInfo.do",
		data:{"imoNo" :imoNo } ,
		dataType: "json",
		success: function (result) {
			var shipInfo 	= result.shipInfo;
			if($("#mnftNm")){
				$("#mnftNm").val(shipInfo.mnftNm);
			}
			$("#bwmsDeviceNm").val(shipInfo.bwmsType);
			$("#selectShipName").val(shipInfo.shipNm);
			$("#imoNo").val(shipInfo.imoNo);
			$("#shipNo").val(shipInfo.shipNum);
			$("#shipNlty").val(shipInfo.countryCode);
			$("#shipGrtg").val(shipInfo.processingCapacity);
			$("#shipKnd").val(shipInfo.shipKind);
			
		}
		,error: function (request, status, error) {
			console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
//		,error: function (request, status, error) {
//			alert("조회하는 중에 에러가 발생하였습니다.");
//		}
		
	})
}