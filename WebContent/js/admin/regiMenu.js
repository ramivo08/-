$(document).ready(function() {
	if ($("#orgMenuId").val() != '') {
		$("#menuId").prop("readOnly", true);
		$("#deltBtn").show();
	} else
		$("#deltBtn").hide();

    // 저장 버튼클릭
    $("#saveBtn").click(function(){
    	goSave();
    });

    // 삭제 버튼클릭
    $("#deltBtn").click(function(){
    	goDelt();
    });

	if (PROC_FLAG != "" && PROC_FLAG != null && PROC_FLAG != "null")  {
		alert(PROC_FLAG);

		opener.location.reload();

		// 팝업 닫기
    	self.close();
	}
});

// 저장처리
function goSave() {
	var form = $("#form1");

	// validation (필수입력 체크)
	if (fn_checkRequired($("#menuId"), "메뉴ID") == false)
		return false;
	if (fn_checkRequired($("#menuNm"), "메뉴명") == false)
		return false;
	if (fn_checkRequired($("#parentMenuId"), "부모 메뉴ID") == false)
		return false;
	if (fn_checkRequired($("#menuLvl"), "메뉴레벨") == false)
		return false;
	if (fn_checkRequired($("#tagtUrl"), "타겟 URL") == false)
		return false;
	if ($("input[name=popupYn]:checked").size() == 0) {
		nAlert('팝업여부'+MSG_COMM_2002);
		return;
	}
	if ($("input[name=useYn]:checked").size() == 0) {
		nAlert('사용여부'+MSG_COMM_2002);
		return;
	}

	form.attr("action", ROOT_PATH+"/board/saveMenu.do");
	form.submit();
}

// 삭제처리
function goDelt() {
	var form = $("#form1");
	form.attr("action", ROOT_PATH+"/board/deltMenu.do");

	// 정말 삭제하시겠습니까?
    nConfirm(MSG_COMM_C002+"\n삭제하시면 모든 권한(메뉴)이 삭제 처리됩니다.", null, function(isConfirm) {
        if (isConfirm){
            form.submit();
        }
    });
}
