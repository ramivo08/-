function fn_search(page) {
	const form = $("#FAQForm")
	$("input[name=page]").val(page);
 
	form.attr("action", ROOT_PATH + "/board/searchFAQ.do");
	form.submit();
}