function fn_search(page) {
	const form = $("#notice")
	$("input[name=bbsNo]").val(bbsNo);
 
	form.attr("action", ROOT_PATH + "/board/selectNotice.do");
	form.submit();
}