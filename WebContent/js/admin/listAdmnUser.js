/*
 * @(#)listWifeDiagRelt.js 1.0 2017/01/20
 * 
 * COPYRIGHT (C) 2017 Sundosoft CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 야생동물 조류/포유류 예찰 반출목록 리스트
 *
 * @author NJS
 * @version 1.0 2017-02-24
 */

	$(document).ready(function (){
		 
	    //---------------------------------
	    // event
	    //---------------------------------
		
	    // 검색버튼 이벤트
	    $("#prcBtnSrch").click(function(){
	       doSearch();
	    });
	    
	    // 검색버튼 이벤트
	    $("#prcBtnAppr").click(function(){
	    	doAppr($(this));
	    });
	    
	    // 검색버튼 이벤트
	    $("#prcBtnApprCncl").click(function(){
	    	doApprCncl($(this));
	    });

	    $("#testFunction").css("display", "none");
	    $("#testDiedFunction").css("display", "none");
	    
	    // 일괄 geom 값 매핑 위한 함수
	    $("#testFunction").click(function() {
	    	document.location.href = "/main/testFunction.do";
	    });
	    $("#testDiedFunction").click(function() {
	    	document.location.href = "/main/testDiedFunction.do";
	    });
	    
	});

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//화면 처리 관련 및 이벤트
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// action 로직
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// 페이지 이동
	function fn_search(page){
		var form = $('#model'); 
		$('#page').val(page);
		
		form.attr({
			method : "post",
			action : 	ROOT_PATH+ "/board/listAdmnUser.do",
		});
		form.submit();
	}

	// 검색버튼
	function doSearch() {
		
		var form = $('#model');
		$('#page').val("1");
		
		form.attr({
			method : "post",
			action : 	ROOT_PATH+ "/board/listAdmnUser.do",
		});
		form.submit();
	}

	// 상세보기
	function doView(userId){
		
		var form = $("#model");
		$("#userId").val(userId);
		
		var url = "/board/viewAdmnUser.do";
		
		form.attr({
			action : ROOT_PATH+url,
			method : "post"
		});	
		form.submit();
	}
	
	// 반출 승인
	function doAppr(){
		
		var form = $("#model");
		var tempSeq = "";
		
		if(confirm(MSG_BUSI_M022)){
			
			$("input[name='caryOutChck']:checked").each(function(){
				(isEmpty(tempSeq))? tempSeq =  this.value : tempSeq = tempSeq + "," + this.value;
			});
			
			if(isEmpty(tempSeq)){
				alert(MSG_BUSI_M023);
				return false;
			}else{
				
				$("#caryOutSeq").val(tempSeq);
				
				form.attr({
					action : ROOT_PATH+"/fore/apprCarryOutRqst.do",
					method : "post"
				});	
				form.submit();
			}
		}
	}
	
	function doApprCncl(){
		
	}
	

