/*
 * @(#)viewMembInfoUser.js 1.0 2017/01/12
 * 
 * COPYRIGHT (C) 2017 Sundosoft CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 회원정보 수정
 *
 * @author NJS
 * @version 1.0 2017/01/12
 */


$(document).ready(function(){

    //-------------------
    // 화면 loading 관련
    //-------------------

    // 공통 loading 
    fn_uscm_load({
    	uscmType: {
    		uscmType: "uscmType",
    		loading: true
    	},
    	 cityauth: {
             sidoName: "cityauthCd1",
             cityName: "cityauthCd",
             initName: "cityauthCdVal",
             loading: true
         }
    });

    //-------------------
    // Event
    //-------------------
    
    // 저장 버튼 이벤트
    $("#cfrmBtn, #cnclBtn").click(function(){
        doAction($(this)); 
    });

    // 공통 event 걸기.
    fn_uscm_setEvent();
    
    // 비밀번호 변경 버튼 이벤트
    $("#chgPwdBtn").click(function(){
    	chgPwd($(this)); 
    });
    
    // 비밀번호 취소 버튼 이벤트
    $("#cnclPwdBtn").click(function(){
    	cnclPwd($(this)); 
    });
    
    // 사용자 구분별 화면 처리
    $("#userType").change(function(){
    	bindUscmType($(this));
    }); 
    
    bindUscmType();
    
    //-------------------------------
    //메시지 출력
    //-------------------------------
    resultMessage();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 화면 처리 관련 및 이벤트
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function bindUscmType(){
	var bindVal =  $("#userType").val();
	if(bindVal == "U5"){
		$("._rscuCDArea").show();
		$("._neirArea").hide();
	} else if (bindVal == "U6") {
		$("._rscuCDArea").hide();
		$("._neirArea").show();
	} else{
		$("._rscuCDArea").hide();
		$("._neirArea").hide();
	}
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var SAVE_USER_URL = "/memb/saveMembInfoUser.do";
var INIT_URL = "/main.do";

//화면 이동 및 처리 method
function doAction(actObj) {

    var form = $("#form1");
    var actObjId = actObj.attr("id");
    var url = "";
    
    if(actObjId == "cfrmBtn") {
        // 수정 처리  
        if(validation() == true) { 
            // msg : "회원정보를  수정하시겠습니까?"
        	nConfirm(MSG_MEMB_A012, null, function(isConfirm){
                if(isConfirm){ 
   	           	 url = SAVE_USER_URL;
   	           	 
   	             form.attr({
   	                 "method":"post"
   	                ,"action":ROOT_PATH + url
   	            });

   	            form.submit();
               }
        	});
        }else {
        	return false;
        }
    }else if(actObjId == "cnclBtn") {
        //메인화면으로
        url = INIT_URL;
        
        form.attr({
            "method":"post"
           ,"action":ROOT_PATH + url
       });

       form.submit();
    }

}

//비밀번호 변경
function chgPwd(){
	
	var curPasswd = $("#curPasswd").val();
	var passwd = $("#passwd").val();
	var passwdCfrm = $("#passwdCfrm").val();
	
//	if(pwdValidation() == false) {return;}
	
	if(passwd != passwdCfrm){ 
		alert("비밀번호를 확인해주시기 바랍니다.");
		$("#passwdCfrm").focus();
		return false;
	}
	
    params = {userId : $("#userId").val(), curPasswd: curPasswd, passwd: passwd};

    $.ajax({
        url : ROOT_PATH + "/memb/updtMembInfoModifyPwd.do",
        data : params,
        dataType : "json",
        contentType : "application/json; text/html; charset=utf-8",
        success : function(result) {

            var rtnStat = result.rtnStat;

            if("EQUAL" == rtnStat) {
                // 암호가 일치 -> 저장처리 한다.
//            	nAlert(MSG_MEMB_A015, $("#curPasswd").focus());
            	
            	alert(MSG_MEMB_A015);
            	
            	 $(":password").val("");	//입력창 초기화
            	
        		$("* [class ^= 'open_' ]").fadeOut(100);
        		return false;

            }else if("NOTEQ" == rtnStat) {
                // 암호가 일치하지 않음
//                nAlert(MSG_MEMB_A013, $("#curPasswd").focus());
            	
            	alert(MSG_MEMB_A013);
                
                $(":password").val("");	//입력창 초기화
            }
        },
        error : function(request, status, error) {
            msgAlert(MSG_MEMB_A014);
        }
    });
}

function cnclPwd(){
	
	 $(":password").val("");	//입력창 초기화
	
	$("* [class ^= 'open_' ]").fadeOut(100);
	return false;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// validation 관련		2015.01.28 화면변경요청으로 인해 수정
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
* validation 검사
*/
function validation() {

    var isValid = true;
    
    var addNotRequiredNmArry = null;
    
    if($('#userType').val() != 'U5'){ 
    	addNotRequiredNmArry = ["rscuCd"];
    }

    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 기본정보 검사
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    

    isValid = fn_validationUscmArea("_baseArea", addNotRequiredNmArry);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  추가정보 검사
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if(isValid == true) {
      
        isValid = fn_validationUscmArea("_etcArea", addNotRequiredNmArry);
    }
 
    return isValid;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 비밀번호 validation 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.
function pwdValidation(){
  var isValid = true;
  
  getCheckObjects($(".join_layer")).each(function(){
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

function loadMessage(){ 
	
  if(RETURN_MSG != "" || RETURN_MSG == 'SUCC') {
  	nAlert(MSG_MEMB_A016);
  } 
}

function getCheckObjects(areaObj) {

    return areaObj.find(":input:not(input:hidden):not(input:checkbox):not(:disabled)");
}

