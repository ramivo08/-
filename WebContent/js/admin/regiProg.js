$(document).ready(function() {
	if ($("#orgProgId").val() != '') {
		$("#progId").prop("readOnly", true);
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
	if (fn_checkRequired($("#progId"), "프로그램ID") == false)
		return false;
	if (fn_checkRequired($("#progNm"), "프로그램명") == false)
		return false;
	if (fn_checkRequired($("#progPattern"), "프로그램 URL") == false)
		return false;

	form.attr("action", ROOT_PATH+"/board/saveProg.do");
	form.submit();
}

// 삭제처리
function goDelt() {
	var form = $("#form1");
	form.attr("action", ROOT_PATH+"/board/deltProg.do");

	// 정말 삭제하시겠습니까?
    nConfirm(MSG_COMM_C002+"\n삭제하시면 모든 권한(프로그램)이 삭제 처리됩니다.", null, function(isConfirm) {
        if (isConfirm){
            form.submit();
        }
    });
}
