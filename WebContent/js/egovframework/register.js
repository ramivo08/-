//Object
var onChangeVal = $("#userRole option:selected").val();


$(document).ready(function (){
	$("#searchShipName").keypress(function(e) {
		if(e.which == 13) {
			searchShip()
		}
	})  
	
	$("#userRole").change(function(){
		
		var onChangeVal = $("#userRole option:selected").val();
		
		if(onChangeVal == "ROLE_SHIPOWNER"){
//			 $("#searchShip").addClass('auth-box register');
//			 
//			 var content = '<div class="card ">'
//				  + '<div class="card-header">선박명 검색</div>' 
//				  + '<div class="card-body">'
//				  + '<div class="form-group row">'
//				  + '<label class="col-sm-3 col-form-label">선박명</label>'
//				  + '<div class="input-group col-sm-9">'
//				  + '<input class="form-control" id="searchShipName" name="shipName" type="text">'
//				  + '<span class="input-group-append">'
//				  + '<a href="javascript:searchShip()" class="btn btn-primary" id="shipSearch">검색</a>'
//				  + '</span></div></div></div></div>'
//			 $("#searchShip").append(content)
			$("#searchMnftInfo").css("display","none");
			$("#searchShipInfo").css("display","block");
			$("#insertShipInfo").css("display","block");
		}else if(onChangeVal == "ROLE_MNFT"){
			$("#searchShipInfo").css("display","none");
			$("#insertShipInfo").css("display","none");
			$("#searchMnftInfo").css("display","block");
			
			
		}
		
		else{
			$("#searchMnftInfo").css("display","none");
			$("#searchShipInfo").css("display","none");
			$("#insertShipInfo").css("display","none");
		}
		
	})
	
	mnftNm
	$("#selectMnftList").change(function(){
		var selectVal = $("#selectMnftList option:selected").val();
		
		$("#mnftNm").val(selectVal);
		
	})
	
	
	
	
})




function register() {
	var inputPwd = $("#inputPwd").val();
	var inputPwdVaild = $("#inputPwdVaild").val();
	var inputEmail = $("#inputEmail").val();
	var inputId = $("#inputId").val();
	var userRole = $("#userRole option:selected").val()
	
	if(inputPwd !== inputPwdVaild) {
		alert("비밀번호가 일치하지않습니다.");
	} else {
		$.ajax({
			type : "POST",			
			url : "/registerUser.do",
			data : {inputEmail : inputEmail, inputId : inputId},
			dataType: "json",
			success : function(result){
				// console.log(result)
			},
			error: function(request, status, error){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}				
		})
	}
}

/*아이디 체크*/
function checkId(){
	
	var inputId = $("#inputId").val();
	
	$.ajax({
		type : "POST",
		url : "/checkId.do",
		data : {inputId : inputId},
		dataType: "json",
		success : function(result){
			
			if(result.check == "true"){
				
				alert("해당 아이디는 사용 가능합니다.")
				
			}else if(result.check == "false"){
				
				alert("해당 아이디는 이미 존재 합니다. \n다른아이디를 입력해주세요.")
				
				inputId = "";
				$("#inputId").focus();
			}
			
			
		},
		error : function (){
			alert("아이디 체크 에러");
		}
	});
	
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
//		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function searchShip(){
	var searchShipName = $("#searchShipName").val();
//	
	var data = {'shipName' : searchShipName };
	if(searchShipName !== "") {
		$.ajax({
			type : "GET",			
			url : "/shipInfoApi.do",
			data : data,
			dataType: 'json',
			success : function(result){
				var list = result.result
				if(list != null){
					$("#shipSearchResult").children().remove()
					for (var i = 0; i < result.size; i++) {
						var content ='<div class="form-group row">'
				            +'<label class="col-form-label col-sm-4">'
				            + result.result.vsslKorNm[i]
				            +'</label>'
				            +'<div class="col-sm-6">'
				            +'<div class="editable-wrapper">'
				            +'<a class="editable editable-text" title="선택" id="'+i+'" href="javascript:selectShip(' + "'" + list.vsslKorNm[i] + "'" + ')">선택</a>'
				            +'</div>'
				            +'</div>'
				            +'</div>'
						 $("#shipSearchResult").append(content); 
				          
					}
				}else{
					$("#shipSearchResult").children().remove();
					
					var empty = '<p>조회 결과가 없습니다.</p>'
						
						 $("#shipSearchResult").append(empty);
					
				}
			},
			error: function(request, status, error){
//				 console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
//				 		+ request.responseText + "\n" + "error:" + error);
			}
				
		})
	}else{
		alert("선박명을 입력해주세요.");
		$("#searchShipName").focus();
	}
	
	
}


function selectShip(shipName) {
	// Date.format.
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

	$.ajax({
		type : "GET",			
		url : "/shipInfoApi.do",
		data : {shipName : shipName},
		dataType: "json",
		success : function(result){
			var list = result.result
			var selectedShipIndex = list.vsslKorNm.indexOf(shipName)

			$("#selectShipName").val(list.vsslKorNm[selectedShipIndex])
			$("#imoNo").val(list.imoNo[selectedShipIndex])
			$("#shipNo").val(list.vsslNo[selectedShipIndex])
			$("#shipNlty").val(list.vsslNlty[selectedShipIndex])
//			$("#shipCnstrDt").val(list.vsslCnstrDt[selectedShipIndex])
			$("#shipCnstrDt").val(new Date(list.vsslCnstrDt[selectedShipIndex]).format("yyyy-MM-dd"))
			$("#shipGrtg").val(list.grtg[selectedShipIndex])
			$("#shipKnd").val(list.vsslKnd[selectedShipIndex])
		
		},
		error: function(request, status, error){
			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
			// 		+ request.responseText + "\n" + "error:" + error);
		}
			
	})
}

function registerInfo(btnName){

	
	
	
}

function insertShip() {
	$("#registerId").val($("#inputId").val())

	if($("#registerId").val().length <= 0 ){
		alert("아이디를 먼저 입력해주세요.")
		$("#bwmsType").focus();
		return false;
	}else if($("#bwmsType option:selected").val().length <= 0){
		
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
	}else if($("#shipNo").val().length>0){
		if(!isNumber($("#shipNo").val())){
			alert("선박번호는 숫자만 입력할 수 있습니다.")
			$("#shipNo").val("")
			return false;
		}
	}else if($("#shipGrtg").val().length>0){
		if(!isNumber($("#shipGrtg").val())){
			alert("선박번호는 숫자만 입력할 수 있습니다.")
			$("#shipGrtg").val("")
			return false;
	}else{
		
	
	
	
	
	
	
		var bwmsType 		= $("#bwmsType").val();
		var selectShipName 	= $("#selectShipName").val();
		var shipMnftList 	= $("#shipMnftList").val();
		var imoNo 			= $("#imoNo").val();
		var shipNo 			= $("#shipNo").val();
		var shipNlty 		= $("#shipNlty").val();
		var shipCnstrDt 	= $("#shipCnstrDt").val();
		var shipGrtg	 	= $("#shipGrtg").val();
		var shipKnd 		= $("#shipKnd").val(); 
		var upfile 			= $("#upfile").val();
		var inputId			= $("#inputId").val();
		var registerId 		= $("#inputId").val();
		
		console.log(inputId,registerId)
		
		
		var data =  { 
			bwmsType 		: bwmsType,
			selectShipName 	: selectShipName,
			shipMnftList 	: shipMnftList,
			imoNo 			: imoNo,
			shipNo 			: shipNo,
			shipNlty 		: shipNlty,
			shipCnstrDt 	: shipCnstrDt,
			shipGrtg 		: shipGrtg,
			shipKnd 		: shipKnd,
			upfile 			: upfile,
			inputId			: inputId,
			registerId		: registerId
		  }
		
		var form = $("form")[1];
		var formData = new FormData(form);
		formData.append("registerId",$('#inputId').val());
		
		
		$.ajax({
			type : "POST",
			url : "/insertRegiShipInfo.do",
			data : formData,
			dataType:'json',
			processData: false,
			contentType : false,
			success :function(data){
				console.log(data);
				if(data.result  == "success"){
					alert("선박정보 입력 완료");
					//선박등록 탭 display none
					
					//선박정보입력의 seq를 회원가입 선주 role_seq에 넣어 준다.
	//				$("#seqShipNo").val(data.shipSeq);
					
	//				console.log("Hidden 값 확인 "+$("#seqShipNo").val());
	//				console.log("id 값 확인 "+ data.result.registerId);
	
					$("#searchShipInfo").css("dispaly","none");
				}else if(data.result == "fail"){
					alert("선박정보 입력 실패")
					$("#selectShipName").focus();
					return false;
				}else if(data.result == "overlap"){
					alert("해당 선박이름으로 등록된 선박이있습니다.");
					return false;
				}
				
				
				
				
			},
			error:function(request,status,error){   
				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
			}
		
				
			
			})
	

	}
		return false;
	}
	
}




