$(document).ready(function(){
	
	
	$("#srchMenuNm").keydown(function(e){
		if(e.keyCode == 13){
			fn_search(); 
		}
	})

	
	
	// 결과 메시지
	resultMessage();
	
	// 검색 처리
	$("#btnSearch").click(function() {
		fn_search();
//		fn_search(1);
	});
	
	// 수정 팝업 버튼 클릭
	$(".modify").click(function() {
		
		var menuId = "";
		
		if($("input[name=ck]:checked").length <= 0) {
			alert("수정할 메뉴를 선택해주세요.");
			return false;
		} else if($("input[name=ck]:checked").length > 1) {
			alert("수정할 1개의 메뉴를 선택해주세요.");
			return false;
		} else {
			
			menuId = $("input[name=ck]:checked").val();
			
			$.ajax({
		        url : ROOT_PATH + "/board/selectMenuMgmt.do",
		        data : {"menuId" : menuId},
		        dataType : "json",
		        contentType : "application/json; text/html; charset=utf-8",
		        success : function(result) {
		        	
		        	var item = result;
		        	var menuId = item.menuId;
		        	var menuNm = item.menuNm;
		        	var menuEngNm = item.menuEngNm;
		        	var menuOdr = item.menuOdr;
		        	var menuLvl = item.menuLvl;
		        	var parentMenuId = item.parentMenuId;
		        	var popupYn = item.popupYn;
		        	var useYn = item.useYn;
		        	
		        	$("#pop_model [name=menuLvl]").val(menuLvl);
		        	
		        	$("input[name=menuId]").val(menuId);
		        	
		        	$(".menuId").html(menuId);
		        	$("input[name=menuNm]").val(menuNm);
		        	$(".menuEngNm").html(menuEngNm);
//		        	$("input[name=menuEngNm]").val(menuEngNm);
		        	$("input[name=menuOdr]").val(menuOdr);
		        	$("input[name=popupYn][value="+popupYn+"]").prop("checked", true);
		        	$("input[name=useYn][value="+useYn+"]").prop("checked", true);
		        	$("select[name=parentMenuId]").val(parentMenuId).prop("selected");
//		        	$("select[name=parentMenuId]").val(menuId).prop("selected");
		        	
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
			alert("삭제할 메뉴를 선택해주세요.");
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
		
		form.attr("action", ROOT_PATH + "/board/deleteMenuMgmt.do");
		form.submit();
	});
	
	
	// 삭제 취소 버튼 클릭
	$("#btnCancel").click(function() {
		$('.layerPop_del').removeClass("on").fadeOut(200);
	});
	
	// 수정 버튼 클릭
	$("#btnUpdate").click(function() {
		var form = $("#pop_model");
		
		if(confirm(MSG_COMM_C004)) {
			form.attr("action", ROOT_PATH + "/board/updateMenuMgmt.do");
			form.submit();
		}
	});
	
	// 수정 팝업 부모메뉴 변경 Event
	$("#pop_model [name=parentMenuId]").change(function() {
		
		var menuId = $(this).val();
		
		$.ajax({
	        url : ROOT_PATH + "/board/selectMenuLvl.do",
	        data : {"menuId" : menuId},
	        dataType : "json",
	        contentType : "application/json; text/html; charset=utf-8",
	        success : function(result) {
	        	var menuLvl = result.menuLvl;
	        	
	        	$("#pop_model [name=menuLvl]").val(menuLvl);
	        	
	        },
	        error : function(request, status, error) {
	            alert("process Error");
	        }
	    });
	});
	
});


// 검색
function fn_search() {
	
	var form = $("#model");
	
//	$("#page").val(page);
	
	form.attr("action", ROOT_PATH + "/board/searchMenuMgmt.do");
	form.submit();
	
}

