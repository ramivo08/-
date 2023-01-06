$(document).ready(function(){
	
	
	$("#searchWord").keydown(function(e){
		if(e.keyCode == 13){
			fn_search(); 
		}
	})
	
	// 검색 처리
	$("#btnSearch").click(function() {
		fn_search(1);
	});
	
	

	$('.btnWrap .add').on('click', function(){
        
   
		$('.layerPop_add_Id').addClass("on").fadeIn(200);
		
		
		
	})
	
	
	// 삭제 팝업 취소 클릭
	
	
	$('.cancle').on('click', function(){
        
   
		$('.layerPop_add_Id').removeClass("on").fadeOut(200);
		$('.layerPop_add_admnId').removeClass("on").fadeOut(200);
		$('.layerPop_add_admnModify').removeClass("on").fadeOut(200);
		
		$("input[type=text]").val("");
		$("input[type=password]").val("");
		
		
	})
	// 수정해야할 부분
	
	
	// 관리자 시스템 사용자 추가
	$('.btnWrap .addAdmn').on('click', function(){
        
   
		$('.layerPop_add_admnId').addClass("on").fadeIn(200);
		
		
	})
	
	

	
	
	
	
	
});

function modifyadmn(inputId){
	
	$('#inputId').val(inputId)
	$('.layerPop_add_admnModify').addClass("on").fadeIn(200);
	
	
	
}

function updateAdmn(){
	var icp =$("#inputChangePwd").val();
	var icpc =$("#inputChangePwdCheck").val();
	
	
	if ($("#inputId").val() == "" ) {
		
		alert("수정할 아이디를 입력해주세요.");
		return false;

	}else if($("#inputPwd").val() == ""){
		
		alert("현재 비밀번호를 입력해주세요.");
		return false;
		
	}else if($("#inputChangePwd").val() == ""){
		
		alert("변경할 비밀번호를 입력해주세요.");
		return false;
		
	}else if($("#inputChangePwdCheck").val() == ""){
		
		alert("비밀번호 확인을 입력해주세요.");
		return false;
		
	}else if(icp != icpc){
		 
		alert("변경할 비밀번호가 일치하지 않습니다.\n다시입력해주시기 바랍니다.");
		return false;
	}else{
		var inputId = $("#inputId").val();
		var inputChangePwd = $("#inputChangePwd").val();
		
		$.ajax({
			type:'POST',
			url: '/board/updateAdmn.do',
			data: {"inputId": inputId, "inputChangePwd": inputChangePwd},
			dataType: 'json',
			success: function(result){
				if(result.result == 1){
					alert("변경되었습니다.");
					location.reload();
				}else{
					alert("수정 실패 \n 입력값을 확인해 주세요.");
				}
			},
			error: function(request, status, error){
				alert(" 관리자 시스템 사용자 변경 오류 \n code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
		
	}
	

	var form = $("#admnModify");
	
	
	form.attr("action", "/board/updateAdmn.do");
	form.submit();
	
}


//
function lockQNA(rNum) {
	$("#bbsNo").val(bbsNo);

	$("#password").val("");
	
	$('.layerPop_lock').addClass("on").fadeIn(200);
	$('#sub').click(function() {

		if ($("#password").val() == "" ) {
			
			alert("비밀번호를 입력해주세요.");
			return false;

		} else {
			
			$("#password").val();
			var form = $("#model")
			form.attr("action", ROOT_PATH +"/supp/selectQNA.do");
			form.submit();
		}

	})

}

function insertAdmnId(){
	
	var form = $("#insertAdmnId");
	
	
	form.attr("action", "/board/insertAdmnId.do");
	form.submit();
	
}

function insertId() {

	var form = $("#insert");
	 

	

	form.attr("action", "/board/insertId.do");
	form.submit();
	
	/*
	 * $.ajax({ type:'POST', url: '/board/modifyUserRole.do', data:
	 * {"roleId": roleId, "usrId": usrId}, dataType: 'json', success:
	 * function(result){ if(result.result == 1){ alert("변경되었습니다.");
	 * location.reload(); }else{ alert("DB 업데이트 실패"); } }, error:
	 * function(request, status, error){ alert("권한 변경
	 * 오류\ncode:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); }
	 * });
	 */

}


// 검색
function fn_search(page) {
	
	var form = $("#model");
	$("#page").val(page);
	
	form.attr("action", ROOT_PATH + "/board/searchAdmnUserMgmt.do");
	form.submit();
	
}

function fn_Role_Selected(existRole, usrId){
	var roleId = null;
	
	var sel = document.getElementById(usrId+"roleOption");
	roleId = sel.options[sel.selectedIndex].value;
	
	if(confirm("권한을 변경하시겠습니까?")){
		$.ajax({
			type:'POST',
			url: '/board/modifyUserRole.do',
			data: {"roleId": roleId, "usrId": usrId},
			dataType: 'json',
			success: function(result){
				if(result.result == 1){
					alert("변경되었습니다.");
					location.reload();
				}else{
					alert("DB 업데이트 실패");
				}
			},
			error: function(request, status, error){
				alert("권한 변경 오류\ncode:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	}else{
		for(var i=0; i<sel.options.length; i++){
			if(sel.options[i].value == existRole){
				sel.options[i].selected = "selected";
			}
		}
	}
}

function fn_Delete_User(distribution, usrId){
	
	if(confirm("정말로 삭제하시겠습니까?")){
		$.ajax({
			type: 'POST',
			url: '/board/deleteUser.do',
			data: {"usrId": usrId, "distribution": distribution},
			dataType: 'json',
			success: function(result){
				if(result.result == 1){
					alert("삭제되었습니다.");
					location.reload();
				}else{
					alert("DB 업데이트 실패");
				}
			},
			error: function(request, status, error){
				alert("사용자 삭제 오류\ncode:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	}
}