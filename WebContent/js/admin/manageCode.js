$(document).ready(function(){
	
});

function fn_login_Log_search(page) {
	const form = $("#loginLogForm")
	$("input[name=loginLogPage]").val(page);

	form.attr("action", ROOT_PATH + "/admin/checkLog.do");
	form.submit();
}

function fn_ship_Log_search(page) {
	const form = $("#shipLogForm")
	$("input[name=shipLogPage]").val(page);

	form.attr("action", ROOT_PATH + "/admin/checkLog.do");
	form.submit();
}