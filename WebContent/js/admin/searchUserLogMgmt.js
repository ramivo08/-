$(document).ready(function(){
	
	$("#searchWord").keydown(function(e){
		if(e.keyCode == 13){
			fn_search(); 
		}
	})

	
	// 검색 처리
	$("#btnSearch").click(function() {
		fn_search(1);
	});
	
	//title수정
	/*var sections = document.getElementsByClassName("title");
	
	for(var i=0; i<temp.length; i++){
		var section = sections.item(i);
		section.
	}*/
});


// 검색
function fn_search(page) {
	
	var form = $("#model");
	$("#page").val(page);
	
	form.attr("action", ROOT_PATH + "/board/searchUserLogMgmt.do");
	form.submit();
	
}


// 상세조회
function viewFaq(logSeq) {
	
	var form = document.createElement("form");
	
	form.setAttribute("charset", "utf-8");
	form.setAttribute("method", "post");
	form.setAttribute("action", ROOT_PATH + "/board/searchUserLogDetail.do");
	
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "logSeq");
	hiddenField.setAttribute("name", "logSeq");
	hiddenField.setAttribute("value", logSeq);
	form.appendChild(hiddenField);
	
	document.body.appendChild(form);
	form.submit();
	
}