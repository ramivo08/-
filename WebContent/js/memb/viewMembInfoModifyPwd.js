/*
 * @(#)viewMembInfoModifyPwd.js 1.0 2014/10/13
 * 
 * COPYRIGHT (C) 2006 CUBES CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 비밀번호 변경 스크립트 .
 *
 * @author NJS
 * @version 1.0 2014/10/13
 */

$(document).ready(function(){

    //-------------------
    // 화면 loading 관련
    //-------------------
	
    //-------------------
    // Event
    //-------------------
	
    $("#cfrmBtn,#cnclBtn").click(function(){
        onClickButton($(this).attr("id"));
    });
   
    //-------------------------------
    //메시지 출력
    //-------------------------------
//    resultMessage();
    loadMessage();	
});




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//화면 처리 관련 및 이벤트
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//버튼 클릭 이벤트 처리
function onClickButton( id ) {
    switch( id ) {
        case 'cfrmBtn':        //확인
        	doModifyPasswdAjax();
            break;
        case 'cnclBtn':        //취소
        	window.close();
            break;
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 비밀번호 검사 및 변경 처리.
function doModifyPasswdAjax(){
    var params = null;
    var curPasswdObj = $("#curPasswd");

    if(doValidation() == false) {return;}
    
//    // 사용자 id를 입력했는지 확인.
//    if(fn_checkRequired(curPasswdObj) == false) {
//        return;
//    }

    params = {curPasswd:curPasswdObj.val()};
    
    $.ajax({
        url : ROOT_PATH + "/memb/getMembInfoCheckPwd.do",
        data : params,
        dataType : "json",
        contentType : "application/json; text/html; charset=utf-8",
        success : function(result) {
        	
            var rtnStat = result.rtnStat;

            if("EQUAL" == rtnStat) {
                // 암호가 일치 -> 저장처리 한다.
               doUpdatePasswd();
            }else if("NOTEQ" == rtnStat) {
                // 암호가 일치하지 않음
                nAlert(MSG_MEMB_A013, curPasswdObj.focus());
                
                $(":password").val("");	//입력창 초기화
            }
        },
        error : function(request, status, error) {
            // msg : "비밀번호 검사중 오류가 발생했습니다."
        	nAlert(MSG_MEMB_A014);
        }
    });
}

// 비밀번호 저장처리.
function doUpdatePasswd(){
	
    var form = $("#popupForm");
    form.attr({
         "action" : ROOT_PATH + "/memb/updtMembInfoModifyPwd.do"
        ,"method" : "post"
    });
    
    form.submit();
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//validation 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
function doValidation(){
    var isValid = true;
    
    getCheckObjects($("#popupForm")).each(function(){
        var chkObj = $(this);
        var chkObjNm = chkObj.attr("name");
        
        // 입력 필수 확인 (모든 항목 필수)
        if(fn_checkRequired(chkObj) == false) {isValid=false; return false;}
        
        // 비밀번호 형식에 맞는지 확인
        if("|passwd|cfrmPasswd|".indexOf(chkObjNm) > 0 ) {
            if(fn_checkType(chkObj) == false) {isValid=false; return false;}
        }
        
        // 새비밀번호와 새비밀번호 확인이 일치하는지 확인
        if("cfrmPasswd" == chkObjNm){
            if( $("#passwd").val() != chkObj.val() ) {
                // msg : "새 비밀번호가 일치하지 않습니다."
                msgAlert(MSG_MEMB_A017);
                isValid = false;
            }
        }
    });
    
    return isValid;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//기타 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.

function getCheckObjects(areaObj) {

    return areaObj.find(":input:not(input:hidden):not(input:checkbox):not(:disabled)");
}

function loadMessage(){ 
	
	if (PROC_FLAG != "" && PROC_FLAG != null && PROC_FLAG != "null")  {
		alert(PROC_FLAG);
		
		self.close();
	}
}