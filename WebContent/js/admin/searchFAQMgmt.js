$(document).ready(function(){
	
	$("#searchWord").keydown(function(e){
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
			form.attr("action", ROOT_PATH + "/board/insertFAQMgmt.do");
			form.submit();
		}
	});
	
	

	// 수정 팝업 버튼 클릭
	$(".modify").click(function() {
		var code = "";
		var codeType = "";
		
		if($("input[name=ck]:checked").length <= 0) {
			alert("수정할 코드를 선택해주세요.");
			return false;
		} else if($("input[name=ck]:checked").length > 1) {
			alert("수정할 1개의 코드를 선택해주세요.");
			return false;
		} else {
			code = $("input[name=ck]:checked").val();
			codeType = $("input[name=ck]:checked").next("input").val();
			
			$.ajax({
		        url : ROOT_PATH + "/board/selectCodeMgmt.do",
		        data : {"code" : code, "codeType" : codeType},
		        dataType : "json",
		        contentType : "application/json; text/html; charset=utf-8",
		        success : function(result) {
		        	var item = result;
		        	var code = item.code;
		        	var codeNm = item.codeNm;
		        	var codeOdr = item.codeOdr;
		        	var codeType = item.codeType;
		        	var parentCode = item.parentCode;
		        	var useYn = item.useYn;

		        	$("#update_model .code").html(code);
		        	$("#update_model .codeType").html(codeType);
		        	$("#update_model [name=code]").val(code);
		        	$("#update_model [name=codeType]").val(codeType);
		        	$("#update_model select[name=parentCode]").val(parentCode).prop("selected");
		        	$("#update_model [name=codeNm]").val(codeNm);
		        	$("#update_model [name=codeOdr]").val(codeOdr);
		        	$("#update_model input[name=useYn][value="+useYn+"]").prop("checked", true);
		        	
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
			alert("삭제할 FAQ를 선택해주세요.");
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
		
		form.attr("action", ROOT_PATH + "/board/deleteFAQMgmt.do");
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
			form.attr("action", ROOT_PATH + "/board/updateFAQMgmt.do");
			form.submit();
		}
	});
	
	
});


// 검색
function fn_search(page) {
	
	var form = $("#model");
	$("#page").val(page);
	
	form.attr("action", ROOT_PATH + "/board/searchFAQMgmt.do");
	form.submit();
	
}


// 상세조회
function viewFaq(bbsNo) {

	var bbsType = $("#bbsType").val();
	var bbsNo = bbsNo;
	
	$("input[name=bbsNo]").val(bbsNo);
	
	$.ajax({
        url : ROOT_PATH + "/board/selectFAQMgmt.do",
        data : {"bbsNo" : bbsNo, "bbsType" : bbsType},
        dataType : "json",
        contentType : "application/json; text/html; charset=utf-8",
        success : function(result) {
        	
        	var item = result;
        	var bbsNo = item.bbsNo;
        	var bbsSubject = item.bbsSubject;
        	var bbsCont = item.bbsCont;
        	var openYn = item.openYn;
//
        	$("#update_model [name=bbsSubject]").val(bbsSubject);
        	$("#update_model [name=bbsCont]").val(bbsCont);
        	$("#update_model input[name=openYn][value="+openYn+"]").prop("checked", true);
        	
        	$('.layerPop_modify').addClass("on").fadeIn(200);
        },
        error : function(request, status, error) {
            alert("process Error");
        }
    });
	
	
	
}
