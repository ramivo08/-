/*
 * @(#)openRegiMembUser02.js 1.0 2017/01/12
 *
 * COPYRIGHT (C) 2017 Sundosoft CO., INC.
 * ALL RIGHTS RESERVED.
 */

/**
 * 회원관리 2단계 - 사용자정보 입력페이지
 *
 * @author NJS
 * @version 1.0 2017/01/12
 */


//---------------------------------
// Global 변수
//---------------------------------

// 첨부 허용 파일 확장명
var _ALLOWED_FILE_EXTS = "";

$(document).ready(function(){
    //---------------------------------
    // load init
    //---------------------------------
   
    // 공통 loading 호출
    fn_uscm_load({
        cityauth: {
            sidoName: "cityauthCd1",
            cityName: "cityauthCd",
            initName: "cityauthCdVal",
            loading: true
        }
    });

    //---------------------------------
    // event
    //---------------------------------

    // 공통 이벤트 설정
    fn_uscm_setEvent();

    // 사용자 id 중복 검사 버튼 이벤트 연결
    $(".userChkDuplBtn").click(function(){
        checkDuplUserId();
    });

    // 최종 확인 처리 버튼 이벤트
    $("#cnfmBtn,  #cnclBtn").click(function(){
        doAction($(this));
    });
    
    // 사용자 구분별 화면 처리
    $("#userType").change(function(){
    	bindUscmType($(this));
    }); 
    
    $("#rscuCd, #rscuCd2").change(function() {
    	
    	if($(this).attr('id') == "rscuCd") {
    		$("#organNm").val($("#rscuCd option:checked").text());
//    		$("#organNm").val($(this).text());
    	} else {
    		$("#organNm").val($("#rscuCd2 option:checked").text());
    	}
    });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//화면 처리 관련 및 이벤트
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//버튼 클릭 이벤트 처리
function onClickButton( id ) {
    switch( id ) {
        case 'prcBtnSrch':            // 검색
            doSearch();
            break;
        case 'prcBtnRegi':            // 등록
            goRegi();
            break;
        case 'prcBtnAppr':            // 승인
            doApproval();
            break;
        case 'prcBtnDelt':            // 삭제
            doDelete();
            break;
        case 'prcBtnExcl':            // 엑셀
            doExcel();
            break;
    }
}

function bindUscmType(bindObj){
	var bindVal = bindObj.val();
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
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// action 로직
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var REGI_PROC_URL        = "/memb/regiMembUser02.do";
var INIT_PROC_URL        = "/memb/openRegiMembUser01.do";

// 화면 이동 및 처리 method
function doAction(actObj) {
    var form = $("#form1");
    var actObjId = actObj.attr("id");
    var url = "";

    if(actObjId == "cnfmBtn") {
    	if(validation() == true) {
            // msg : "회원 등록 요청하시겠습니까?"
        	nConfirm(MSG_MEMB_A007, null, function(isConfirm){
	            if(isConfirm){
	            	 url = REGI_PROC_URL;

            	    form.attr({
            	         "method" :"post"
            	        ,"action" :ROOT_PATH + url
            	    });
            	   form.submit();
	            }
        	});
    	}else{
    		return false;
    	}
    }else if(actObjId == "cnclBtn"){
    	 url = INIT_PROC_URL;

    	    form.attr({
    	         "method" :"post"
    	        ,"action" :ROOT_PATH + url
    	    });
    	   form.submit();
    }

}

//아이디 중복검사
function checkDuplUserId(){

    var userIdObj = $("#userId");
    var orgUserIdObj = $("#orgUserId");

    fn_checkUserIdDuplAjax();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Validation 처리 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function validation() {

    var isValid = true;

 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 // 기본정보 검사		2015.01.28 화면변경요청으로 인해 수정
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var addNotRequiredNmArry = null;
//    var addNotRequiredNmArry = ["userId", "passwd", "passwdCfrm", "userNm", "telNo1", "telNo2", "telNo3", "cellphoneNo1", "cellphoneNo2", "cellphoneNo3", "email1", "email2"];

    if($('#userType').val() == 'U5'){ 
    	addNotRequiredNmArry = ["nierCd", "diagCd"];
    } else if($('#userType').val() == 'U6'){ 
    	addNotRequiredNmArry = ["rscuCd", "diagCd"];
    } else if($('#userType').val() == 'U7'){ 
    	addNotRequiredNmArry = ["rscuCd", "nierCd"];
    } else {
    	addNotRequiredNmArry = ["rscuCd", "nierCd", "diagCd"];
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

