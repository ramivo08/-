/*
 * @(#)openRegiMembUser01.js 1.0 2017/01/12
 * 
 * COPYRIGHT (C) 2017 Sundosoft CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 회원관리 1단계 - 약관 동의 페이지 스크립트
 *
 * @author NJS
 * @version 1.0 2017/01/12
 */

$(document).ready(function(){

    // a 링크를 안되게 처리.
    $(".button").find("a").attr("href", "javascript:");

    //=============================
    // Event
    //=============================

    // 버튼 클릭 이벤트
    $("#disagreeBtn,#agreeBtn").click(function(){

        // 버튼 클릭 이벤트 처리 함수
        doAction($(this));
    });
    
    // 각 약관 check 클릭 이벤트 
    $("#termsAgree1, #termsAgree2, #termsAgree3").click(function(){
        chkAgreeCheckObj($(this));
    });
    
    // 약관 모두 동의 
    $("#termsAllAgree").click(function(){
        
        // 모두 check 객체 선택 행위 대로 변경.
        var allChkObj = $(this);
        $("input[id^=termsAgree]").prop("checked", allChkObj.is(":checked"));
    });
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 서비스 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * 각 약관 동의 check 이벤트 처리 함수
 */
function chkAgreeCheckObj(chkObj) {
    
    var allCheckObj = $("#termsAllAgree");
    
    // 각 약관 check 해제시 "모두동의"도 해제 됨.
    if(chkObj.is(":checked") == false) {
        allCheckObj.prop("checked", false);
    }
    
    //모든 약관 체크 시 모두동의 체크
    var flag = true;
    $("input[id^=termsAgree]").each(function(){
    	
    	if($(this).is(":checked")){ 
    		if(flag)
    		flag = true;
    	}else{
    		flag = false;
    	}
    });
    
    if(flag){
    	 allCheckObj.prop("checked", true);
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var NEXT_STEP_URL = "/memb/openRegiMembUser02.do";
var INIT_URL      = "/main.do";

function doAction(btnObj) {
    var form = $("#form1");

    var url = "";
    var btnId = btnObj.attr("id");
    
    if(btnId == "agreeBtn") {
        url = ROOT_PATH + NEXT_STEP_URL;
    }else if(btnId == "disagreeBtn") {
        url = ROOT_PATH + INIT_URL;
    }
    
    if(btnId == "disagreeBtn" || validation() == true) {
    	 
        form.attr({
             "method":"post"
            ,"action":url
        });

        form.submit();
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// validation 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
* validation 검사
*/
function validation() {

    var rtnStat = true;
    
    if(!$('#termsAgree1').is(":checked")){
        // MSG : "서비스 이용약관에 동의를 해주세요." 
        nAlert(MSG_MEMB_0001); 
        $('#termsAgree1').focus();
        rtnStat = false;
    }else if(!$('#termsAgree2').is(":checked")){
        // MSG : "개인정보 제공 처리방침에 동의를 해주세요."
        nAlert(MSG_MEMB_0002);
        $('#termsAgree2').focus();
        rtnStat = false;
    }
/*    
    else if(!$('#termsAgree3').is(":checked")){
        // MSG : "위치정보 이용 또는 제3자 제공 처리방침에 동의를 해주세요."
        nAlert(MSG_MEMB_0003);
        $('#termsAgree3').focus();
        rtnStat = false;
    }
*/    

    return rtnStat;
}
