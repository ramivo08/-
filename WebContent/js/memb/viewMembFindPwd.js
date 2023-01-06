/*
 * @(#)viewMembFindPwd.js 1.0 2017/01/12
 * 
 * COPYRIGHT (C) 2017 Sundosoft CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 비밀번호 찾기
 *
 * @author NJS
 * @version 1.0 2017/01/12
 */


$(document).ready(function(){
    //---------------------------------
    // load init
    //---------------------------------

    // a 링크를 안되게 처리.
    $(".button").find("a").attr("href", "javascript:");
    
    // 공통 이벤트 설정
    fn_uscm_setEvent();

    //---------------------------------
    // event
    //---------------------------------

    $("#cfrmBtn").bind({
    	"click":function(){
    		findUserPwdAjax();
    	}
    });
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var FIND_PWD_URL = "/memb/getMembFindPwd.do";
var ACCS_LOGI_URL = "/login.do";

function doAction(url) {
    var form = $("#form1");

    form.attr({
         "method":"post"
        ,"action":ROOT_PATH + url
    });

    form.submit();
}

//PWD 찾기
function findUserPwdAjax(){
	
	var params = null;
	var userIdObj    = $("#userId");
	var uscmRoleObj    = $("#uscmRole"); 
	var userNmObj     = $("#userNm");
	var emailObj = $("#email");
	
	// 사용자 id를 입력했는지 확인.
	if(validation() == false) {
		return;
	}
	
	params = {
			userId:userIdObj.val()
			,uscmRole:uscmRoleObj.val()
			,userNm:userNmObj.val()
			,email:emailObj.val()
	};
	
	$.ajax({
		url : ROOT_PATH + FIND_PWD_URL,
		data : params,
		dataType : "json",
		contentType : "application/json; text/html; charset=utf-8",
		success : function(result) {
			
			var rtnStat = result.rtnStat;
			var tempPwd  = result.tempPwd;
			
			if("EMPTY" == rtnStat) {
				// 입력한 정보가 일치하지 않았을 경우 
//                nAlert("입력하신 정보와 일치하는 아이디가 존재하지 않습니다.\n다시 한 번 확인하시기 바랍니다.");
			    nAlert(MSG_MEMB_A008); 
			    $(":input:text").val(" ");
			    $("#email3 option:eq(0)").attr("selected","selected");   
			}else if("EXIST" == rtnStat) {
				// pwd를 변경했을 경우
//              nAlert("회원님의 비밀번호가 "+tempPwd+"으로 초기화 되었습니다. .\n로그인 화면으로 이동하시겠습니까?") 
//				e-mail 전송으로 변경하면서 메시지 수정
//				nAlert("임시 비밀번호가 회원가입 시 입력한 E-mail로 전송되었습니다.") 
				nAlert(MSG_MEMB_A010);
				$(":input:text").val(" "); 
				$("#email3 option:eq(0)").attr("selected","selected");  
			}else if("ERROR" == rtnStat){
				//시스템 에러
			    nAlert(MSG_MEMB_A011);
				$(":input:text").val(" "); 
				$("#email3 option:eq(0)").attr("selected","selected");  
			}
		},
		error : function(request, status, error) {
		    alert("process Error");
		}
	});
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//화면 설정 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// validation 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
* validation 검사
*/
function validation() {

    var isValid    = true;
    
    getCheckObjects($('#form1')).each(function(){

    	var notRequiredNms = "|email3";
    	var chkObj = $(this);
    	var chkObjNm = chkObj.attr("name");
    	
    	
        // 입력 필수 검사.
        if(notRequiredNms.indexOf(chkObjNm) < 0) {
	        if(fn_checkRequired(chkObj) == false)           { isValid = false; return false; }
        }

    });

    return isValid;
}

//Retrieve validation target items in the area object
function getCheckObjects(areaObj) {
    return areaObj.find(":input:not(input:hidden):not(input:checkbox)");
}