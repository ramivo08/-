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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//변수
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    $("#cfrmBtn, #cnclBtn, #apprBtn").click(function(){
        doAction($(this));
    });

    // 공통 event 걸기.
    fn_uscm_setEvent();

    // 비밀번호 변경 popup 호출
    $("#resetPwdBtn").click(function(){
    	resetPwd();
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
		$("._diagCDArea").hide();
	} else if (bindVal == "U6"){		// 2017.12 추가 (국립환경과학원 소속 과 입력)
		$("._rscuCDArea").hide();
		$("._neirArea").show();
		$("._diagCDArea").hide();
	} else if (bindVal == "U7"){		// 2019.01 추가 진단기관의 경우 정해진 기관 내에서 선택
		$("._rscuCDArea").hide();
		$("._neirArea").hide();
		$("._diagCDArea").show();
	} else{
		$("._rscuCDArea").hide();
		$("._neirArea").hide();
		$("._diagCDArea").hide();
	} 
	
//	if(bindVal == "U5"){
//		$("._rscuCDArea").show();
//	}else{
//		$("._rscuCDArea").hide();
//	}
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var SAVE_USER_URL = "/board/regiAdmnUser.do";
var INIT_URL = "/board/listAdmnUser.do";
var PWD_RESET_URL = "/admn/saveResetUserPwd.do";

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
   	           	 $("#mode").val("updt");

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
        url = INIT_URL;

        form.attr({
            "method":"post"
           ,"action":ROOT_PATH + url
       });

       form.submit();
    }
	else if(actObjId == "apprBtn") {

		// 승인 하시겠습니까?
		if(confirm(MSG_MEMB_A018)){

		    //메인화면으로
		    url = SAVE_USER_URL;
		    $("#mode").val("appr");

		    form.attr({
		        "method":"post"
		       ,"action":ROOT_PATH + url
		   });

		   form.submit();
		}
	}
}

//비밀번호 변경 팝업 열기
function resetPwd(){

	if(confirm('비밀번호를 초기화 하시겠습니까?')){

		params = {userId:$('#userId').val()};
    	$.ajax({
            url: ROOT_PATH + PWD_RESET_URL,
            type: "POST",
            data:params,
            dataType:"json",
//		            contentType:"application/json; text/html; charset=utf-8",
            success:function(result) {
            	if(result.uptNum == '1'){
            		msgAlert(convertMsgArgs(MSG_ADMN_U003, [result.passwd]));

            	}else if(result.chk != '1'){
            		nAlert(MSG_ADMN_U004);
            		return false;
            	}
            }
            ,error:function(request, status, error) {
                alert("ERROR");
                alert(request.responseText);
            }
        });
	}
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
//기타
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~.

function loadMessage(){

  if(RETURN_MSG != "" || RETURN_MSG == 'SUCC') {
  	nAlert(MSG_MEMB_A016);
  }
}

