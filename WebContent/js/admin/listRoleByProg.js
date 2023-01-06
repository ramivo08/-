$(document).ready(function(){
    // 검색 처리
    $("#srchBtn").click(function(){
    	goSearch();
    });

    // 등록/삭제
	$("#syncBtn").click(function() {
		saveRoleProg();
	});

	$("input[name=allCheck]").click(function() {
		checkAll($(this), "arrRoleProgId");
	});
	$("input[name=allNotCheck]").click(function() {
		checkAll($(this), "arrProgId");
	});
});

//검색
function goSearch() {
	var form = $("#form1");

	form.attr("action", ROOT_PATH + "/board/listRoleByProg.do");
	form.submit();
}

//등록,삭제
function saveRoleProg() {
	var form = $("#form1");

	var num1 = $("input[name=arrRoleProgId]:checkbox:checked").length;
	var num2 = $("input[name=arrProgId]:checkbox:checked").length;

	if (num1 == 0 && num2 == 0) {
		nAlert("추가 또는 제외할 프로그램를 선택하여 주세요.");
		return;
	}

	if (!confirm("추가("+num2+"건), 제외("+num1+"건)을 저장 하시겠습니까?")) {
		return;
	}

	form.prop("action", ROOT_PATH + "/board/saveRoleByProg.do");
	form.submit();
}

//check all
function checkAll(object, nm) {
	if (object.is(":checked"))
		$("[name="+nm+"]").prop("checked", true);
    else
		$("[name="+nm+"]").prop("checked", false);
}