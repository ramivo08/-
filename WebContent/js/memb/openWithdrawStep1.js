/*
 * @(#)openWithdrawStep1.js 1.0 2014/10/08
 * 
 * COPYRIGHT (C) 2006 CUBES CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 회원탈퇴 1단계
 *
 * @author NJS
 * @version 1.0 2013/10/08
 */

$(document).ready(function(){

    //-------------------
    // Event
    //-------------------
	
    // 다음으로 진행
    $("#cfrmBtn").click(function(){
    	updtWithdrawStep1();
    });
    
    // 회원탈퇴 취소
    $("#cnclBtn").click(function(){
    	cnclWithdrawStep1();  
    });
    
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var NEXT_PROC_URL = "/memb/openWithdrawStep2.do";
var INIT_PROC_URL = "/main.do";

/**
 * 회원탈퇴를 계속한다.
 * 
 * @param button {String} 버튼
 */
function updtWithdrawStep1(button) {
	if (!$("#withdrawAgreeYn").is(":checked")) {
		nAlert(MSG_MEMB_W001);
		
		$("#withdrawAgreeYn").focus();
		
		return;
	}
	
	var form = $("#frm");
	
	form.attr("action", ROOT_PATH + NEXT_PROC_URL);
	
	form.submit();
}

/**
 * 회원탈퇴를 취소한다.
 * 
 * @param button {String} 버튼
 */
function cnclWithdrawStep1(button) {
	
	var form = $("#frm");
	
	form.attr("action", ROOT_PATH + INIT_PROC_URL);  
	
	form.submit();
}

