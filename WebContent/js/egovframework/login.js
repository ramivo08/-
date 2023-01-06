$(document).ready(function (){
	
	var agent = navigator.userAgent.toLowerCase();

	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {

	  alert("접속하신 페이지는 익스플로어를 지원하지 않습니다.\n페이지를 이용할수는 있지만 기능이 정상작동하지 않은수도 있습니다. \n권장사용은 chrome입니다.");
	  
	}


	
	
	$.ajax({
		type : "GET",			
		url : "/remember.do",
		dataType: "json",
		success : function(result){
			if(!jQuery.isEmptyObject(result)) {
				$("#remember").prop("checked", true)
				$("#inputId").val(result.userId)
			}
		},
		error: function(request, status, error){
			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
			// 		+ request.responseText + "\n" + "error:" + error);
		}
			
	})
	

	$("#inputInitPwdId").keypress(function(e) {
		if(e.which == 13) {
			forgotPwd()
		}
	})
	
})


function loginCheck() {
	var inputId = $("#inputId").val()
	var inputPwd = $("#inputPwd").val()
	var remember = $("#remember").is(":checked")
	
//	console.log(inputId)
	$.ajax({
		type : "POST",			
		url : "/loginCheck.do",
		data : {inputId : inputId, inputPwd : inputPwd, remember : remember},
		dataType: "json",
		success : function(result){
			if(result.result == 1){
				document.location.href= ROOT_PATH + "/main.do"
			}
		},
		error: function(request, status, error){
			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
			// 		+ request.responseText + "\n" + "error:" + error);
		}
			
	})
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function forgotPwdModal() {
	$("#forgotPwdModal").modal()
}

function forgotPwd() {
	var inputId = $("#inputInitPwdId").val()
	if(inputId != "") {
		$.ajax({
			type : "POST",			
			url : "/forgotPwdAuth.do",
			data : {inputId : inputId},
			dataType: "json",
			success : function(result){
				if(result.isSuccess) {
					alert("Password가 변경되었습니다.\n 이메일을 확인해주세요.")
					 console.log("변경된 Password : " + result.pwd)
				}
//				if(result.success == "true") {
//					
//				} else {
//					alert("Failed")
//				}
				
			},
			error: function(request, status, error){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}
				
		})
	} else {
		// console.log("empty")
	}
	
}
