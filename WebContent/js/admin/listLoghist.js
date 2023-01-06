$(document).ready(function(){
    // 검색 처리
    $("#srchBtn").click(function(){
    	fn_search(1);
    });

    // 포맷
    $("#srchFromDate").toCalendarField();
    $("#srchToDate").toCalendarField();
});

// 검색
function fn_search(page) {
	var form = $("#form1");

	if (fn_checkRequired($("#srchFromDate"), "시작일자") == false)
		return false;
	if (fn_checkRequired($("#srchToDate"), "종료일자") == false)
		return false;

	// 날짜 유효 체크
	if (fn_checkDateFmt($("#srchFromDate"), "시작일") == false)
		return false;
	if (fn_checkDateFmt($("#srchToDate"), "종료일") == false)
		return false;

	if (replace($("#srchFromDate").val(), "-", "") > replace($("#srchToDate").val(), "-", "")) {
        nAlert(MSG_COMM_2013);	//시작일은 종료일보다 클 수 없습니다.
        $("#srchFromDate").focus();
        return false;
    }

    $("input[name=page]").val(page);

	form.attr("action", ROOT_PATH + "/board/listLoghist.do");
	form.submit();
}