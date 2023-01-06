/*
 * @(#)openWithdrawStep2.js 1.0 2014/10/08
 * 
 * COPYRIGHT (C) 2006 CUBES CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 회원탈퇴 2단계 - 본인확인
 *
 * @author NJS
 * @version 1.0 2013/10/08
 */

$(document).ready(function(){

    //-------------------
    // Event
    //-------------------
	
    $("#cfrmBtn").click(function(){
    	updtWithdrawStep2();
    });
    
    // 회원탈퇴 취소
    $("#cnclBtn").click(function(){
    	cnclWithdrawStep2();  
    });
    
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var UPDT_PROC_URL = "/memb/updtWithdrawStep2.do";
var INIT_PROC_URL = "/memb/openWithdrawStep1.do";

/**
 * /화면 이동 및 처리 method
 * 
 * @param
 */
function updtWithdrawStep2(button) {
	if (isEmpty($("#passwd").val())) {
		nAlert(MSG_MEMB_W002);
		 
		$("#passwd").focus();
		
		return;
	}
	
	//변수
	var params={userId:$("#userId").val(), passwd:$("#passwd").val()};
	
	nConfirm(MSG_MEMB_W003, null, function(isConfirm){
		if(isConfirm){
	    	$.ajax({ 
	            url: ROOT_PATH + UPDT_PROC_URL, 
	            type: "POST",
	            data:params, 
	            dataType:"json", 
//			    contentType:"application/json; text/html; charset=utf-8", 
	            success:function(result) {
	            	var rtnStat = result.rtnStat;
	            	if(rtnStat == 'EXIST'){
	            		nConfirm(MSG_MEMB_W004, null, function(isConfirm){
	            			if(isConfirm){
	            				location.href="/j_logout_check.do";   
	            			}
	            		});
	            	}else if(rtnStat == 'EMPTY'){
	            		nAlert(MSG_MEMB_W005);
	            		
	            		$(":password").val("");	//입력 창 초기화
	            	}else if(rtnStat == 'ERROR'){
	            		nAlert(MSG_MEMB_W006);
	            	}
	            }
	            ,error:function(request, status, error) {
	                alert("ERROR");
	                alert(request.responseText);
	            }
	        });		
		}
	});

}

/** 
 * 회원탈퇴를 취소한다.
 * 
 * @param
 */
function cnclWithdrawStep2(button) {
	
	var form = $("#frm"); 
	
	form.attr("action", ROOT_PATH + INIT_PROC_URL);
	
	form.submit();
}

