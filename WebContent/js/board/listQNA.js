function fn_search(page) {
   const form = $("#qna")
   $("input[name=page]").val(page);

   form.attr("action", ROOT_PATH + "/board/searchQNA.do");
   form.submit();
}