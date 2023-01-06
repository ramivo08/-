var Paging = function(totCnt, viewCnt, pageSize, pageNo, listNm){
	totCnt = parseInt(totCnt);
	viewCnt = parseInt(viewCnt);
	pageSize = parseInt(pageSize);
	pageNo = parseInt(pageNo);
	
	var html = new Array();
	
	if(totCnt == 0) {
		return "";
	}
	
	// 페이지 카운트
	var pageCnt = totCnt % viewCnt;
	
	if(pageCnt == 0) {
		pageCnt = parseInt(totCnt / viewCnt);
	} else {
		pageCnt = parseInt(totCnt / viewCnt);
	}
	
	var pRCnt = parseInt(pageNo / pageSize);
	
	if(pageNo % pageSize == 0) {
		pRCnt = parseInt(pageNo / pageSize) - 1;
	}
	
	
	// 이전으로 가기
	if(pageNo > pageSize) {
		var s1;
		
		if(pageNo % pageSize == 0) {
			s1 = pageNo - pageSize;
		} else {
			s1 = pageNo - pageNo % pageSize;
		}
		
		html.push('<li><a href="#" onClick="javascript:get'+listNm+'('+s1+');"><i class="material-icons">keyboard_arrow_left</i></a></li>');
	} else {
		html.push('<li><a href="#"><i class="material-icons">keyboard_arrow_left</i></a></li>');
	}
	
	
	// 페이징
	for(var i = pRCnt * pageSize + 1 ; i < (pRCnt + 1) * pageSize + 1 ; i++) {
		if(i == pageNo) {
			html.push('<li class="active"><a href="#" onClick="javascript:get'+listNm+'('+i+');">'+i+'</a></li>');
		} else {
			html.push('<li><a href="#" onClick="javascript:get'+listNm+'('+i+');">'+i+'</a></li>');
		}
		
		if(i == pageCnt) {
			break;
		}
	}
	
	// 다음으로 가기
	if(pageCnt > (pRCnt+1) * pageSize) {
		var s2 = ((pRCnt+1)*pageSize+1);
		html.push('<li><a href="#" onClick="javascript:get'+listNm+'('+s2+');"><i class="material-icons">keyboard_arrow_right</i></a></li>');
	} else {
		html.push('<li><a href="#"><i class="material-icons">keyboard_arrow_right</i></a></li>');
	}
	
	return html.join("");
};