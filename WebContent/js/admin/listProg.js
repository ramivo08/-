$(document).ready(function(){

    // 등록 버튼클릭
    $("#openRegiBtn").click(function(){
    	goOpenRegi('');
    });

    $("#srchProgNm").focus();

    // 검색 처리
    $("#srchBtn").click(function(){
    	goSearch();
    });
});

// 등록,수정 페이지 이동
function goOpenRegi(progId) {
	var params = {
    	url:ROOT_PATH+"/board/openRegiProg.do?progId="+progId,
        width: '650',
        height: '320',
        scrolling:'no'
    };
	newWindow2(params);
}

//검색
function goSearch() {
	var form = $("#form1");

	form.attr("action", ROOT_PATH + "/board/listProg.do");
	form.submit();
}