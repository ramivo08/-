function fn_search(page) {
   const form = $("#notice")
   $("input[name=page]").val(page);

   form.attr("action", ROOT_PATH + "/board/searchNotice.do");
   form.submit();
}