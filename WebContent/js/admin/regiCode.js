$(document).ready(function() {
	if ($("#orgCode").val() != '') {
		$("#codeType").prop("readOnly", true);
		$("#code").prop("readOnly", true);
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
	if (fn_checkRequired($("#codeType"), "코드타입") == false)
		return false;
	if (fn_checkRequired($("#code"), "코드") == false)
		return false;
	if (fn_checkRequired($("#codeNm"), "코드명") == false)
		return false;
	if (fn_checkRequired($("#parentCode"), "부모코드") == false)
		return false;
	if ($("input[name=useYn]:checked").size() == 0) {
		nAlert('사용여부'+MSG_COMM_2002);
		return;
	}

	form.attr("action", ROOT_PATH+"/board/saveCode.do");
	form.submit();
}

// 삭제처리
function goDelt() {
	var form = $("#form1");
	form.attr("action", ROOT_PATH+"/board/deltCode.do");

	// 정말 삭제하시겠습니까?
    nConfirm(MSG_COMM_C002, null, function(isConfirm) {
        if (isConfirm){
            form.submit();
        }
    });
}
