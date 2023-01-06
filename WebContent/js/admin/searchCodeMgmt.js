$(document).ready(function(){
	
	
	$("#srchCodeNm").keydown(function(e){
		if(e.keyCode == 13){
			fn_search(); 
		}
	})
	
	// 결과 메시지
	resultMessage();
	
	// 검색 처리
	$("#btnSearch").click(function() {
		fn_search(1);
	});
	
	// 코드 추가 팝업 버튼 클릭
	$(".add").click(function() {
		
		if($("input[name=ck]:checked").length > 1) {
			alert("하나의 코드만 선택해주세요.");
			return false;
		} else if($("input[name=ck]:checked").length == 1) {
			
			var codeType = $("input[name=ck]:checked").next("input").val();
			$("input[name=codeType]").val(codeType);
			
			var code = $("input[name=ck]:checked").val();
			$("select[name=parentCode]").val(codeType).prop("selected");
			
		} else {
			$("input[name=codeType]").val('');
			$("select[name=parentCode]").val('NONE').prop("selected");
			
		}
		
		$('.layerPop_add').addClass("on").fadeIn(200);
	})
	
	// 코드 추가 버튼 클릭
	$("#btnSave").click(function() {
		var form = $("#insert_model");

		if(confirm(MSG_COMM_C003)) {
			form.attr("action", ROOT_PATH + "/board/insertCodeMgmt.do");
			form.submit();
		}
	});
	
	

	// 수정 팝업 버튼 클릭
	$(".modify").click(function() {
		var sigCd = "";
		var sdNm = "";
		
		if($("input[name=ck]:checked").length <= 0) {
			alert("수정할 코드를 선택해주세요.");
			return false;
		} else if($("input[name=ck]:checked").length > 1) {
			alert("수정할 1개의 코드를 선택해주세요.");
			return false;
		} else {
			sigCd = $("input[name=ck]:checked").val();
		
			
			$.ajax({
		        url : ROOT_PATH + "/board/selectCodeMgmt.do",
		        data : {"sigCd" : sigCd},
		        dataType : "json",
		        contentType : "application/json; text/html; charset=utf-8",
		        success : function(result) {
		        	var item = result;
		        	var sigCd = item.sigCd;
		        	var sdNm = item.sdNm;
		        	var sigNm = item.sigNm;
		        	var delYn = item.delYn;
		        	
		        	$("#update_model .sigCd").html(sigCd);
		        
		        	$("#update_model [name=sigCd]").val(sigCd);
		        	$("#update_model [name=sdNm]").val(sdNm);
		        	$("#update_model [name=sigNm]").val(sigNm);
		        
		        	$("#update_model input[name=delYn][value="+delYn+"]").prop("checked", true);
		        	
		        	$('.layerPop_modify').addClass("on").fadeIn(200);
		        },
		        error : function(request, status, error) {
		            alert("process Error");
		        }
		    });
		}
		
	});
	
	
	// 삭제 팝업 버튼 클릭
	$(".del").click(function() {
		
		if($("input[name=ck]:checked").length <= 0) {
			alert("삭제할 코드를 선택해주세요.");
			return false;
		} else {
			var delSize = $("input[name=ck]:checked").length;
			$("#delNum").html(delSize);
			$('.layerPop_del').addClass("on").fadeIn(200);
		}
		
	});
	
	
	// 삭제 버튼 클릭
	$("#btnDelete").click(function() {
		var form = $("#model");
		
		var length = $("input[name=ck]:checked").length;
		var delCont = "";
		
		$("input[name=ck]:checked").each(function(index) {
			var code = $(this).val();
			var codeType = $(this).next("input").val();
			
			if(index < length - 1) {
				delCont += code+"/"+codeType+",";
			} else {
				delCont += code+"/"+codeType;
			}
			
		});

		$("input[name=delArr]").val(delCont);
		
		form.attr("action", ROOT_PATH + "/board/deleteCodeMgmt.do");
		form.submit();
	});
	
	
	// 삭제 취소 버튼 클릭
	$("#btnCancel").click(function() {
		$('.layerPop_del').removeClass("on").fadeOut(200);
	});
	
	
	// 수정 버튼 클릭
	$("#btnUpdate").click(function() {
		
		var form = $("#update_model");
		
		if(confirm(MSG_COMM_C004)) {
			form.attr("action", ROOT_PATH + "/board/updateCodeMgmt.do");
			form.submit();
		}
		
	});
	
	
});


// 검색
function fn_search(page) {
	
	var form = $("#model");
	
	$("#page").val(page);
	
	form.attr("action", ROOT_PATH + "/board/searchCodeMgmt.do");
	form.submit();
	
}

