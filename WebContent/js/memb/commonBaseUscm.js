/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @(#) commonBaseUscm.js 1.0 2017/01/16
    회원정보 등록/수정 화면에서 공통으로 사용할 스크립트 모음

    @version 1.0 2017/01/16
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

// 공통 loading
function fn_uscm_load( args ){
    //-------------------
    // 화면 loading 관련
    //-------------------

    // 휴대폰(전화) 번호를 자리수 구분해서 화면의 각 항목에 mapping 함.
    fn_uscm_loadTelNos();
    fn_uscm_loadFaxNos();
    fn_uscm_loadOffTelNos();

    //이메일주로를 구분해서 화면의 각 항목에 mapping 함.
    fn_uscm_loadEmails();

    // 처음 화면이 열렸을 때 domain과 연결되지 않은 우편번호 항목들 mapping
    fn_uscm_loadPostNoForms();

    //처음 화면이 열렸을 때 사용자 구분에 따라 화면 변경
    //fn_uscm_loadDisplayChg(args);
}

// 공통 event 설정 함수
function fn_uscm_setEvent() {
    // 개인연락처 입력 이벤트 연결
    $("#telNo1,#telNo2,#telNo3").change(function(){
        fn_uscm_setFullTelNo();
    });

    // Fax번호 입력 이벤트 연결
    $("#faxNo1,#faxNo2,#faxNo3").change(function(){
    	fn_uscm_setFullFaxNo();
    });

    // 사무실연락처 입력 이벤트 연결
    $("#offTelNo1,#offTelNo2,#offTelNo3").change(function(){
    	fn_uscm_setFullOffTelNo();
    });

    // 이메일 입력 이벤트 연결.
    $("#email1,#email2").change(function(){
        fn_uscm_setFullDomain();
    });
    // 이메일 도메인 combo 이벤트
    $("#email3").change(function(){
        fn_uscm_setEmailDomain($(this));
        fn_uscm_setFullDomain();
    });

    // 우편번호 popup 버튼 클릭 이벤트
    $("#postPopBtn").click(function(){
    	//우편번호 검색방법 변경으로 인한 메소드 변경
        openFindJuso();  // jq-common.js
    });
}


//ID 중복 검사
function fn_checkUserIdDuplAjax(){
    var params = null;
    var userIdObj = $("#userId");
    var userIdChkYnObj = $("#userIdDuplChkYn");

    // 사용자 id를 입력했는지 확인.
    if(fn_checkRequired(userIdObj) == false) {
        return;
    }
    //사용자 아이디 정합성 검사.
    if(fn_checkType(userIdObj) == false) {
        return;
    }

    params = {userId:userIdObj.val()};

    $.ajax({
        url : ROOT_PATH + "/memb/getMembCheckIdDupl.do",
        data : params,
        dataType : "json",
        contentType : "application/json; text/html; charset=utf-8",
        success : function(result) {

            var duplCnt = result.duplCnt;

            if(duplCnt == 0) {
                // 사용 가능한 상태.
                msgAlert(convertMsgArgs(MSG_MEMB_A001,[userIdObj.val()]));
                userIdChkYnObj.val("Y");
            }else if(duplCnt > 0) {
                // 이미 등록된 상태.
                msgAlert(convertMsgArgs(MSG_MEMB_A002,[userIdObj.val()]));
                userIdChkYnObj.val("");
                userIdObj.val("");
            }
        },
        error : function(request, status, error) {
            msgAlert(MSG_MEMB_A003);
        }
    });
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//화면 처리 관련 및 이벤트
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//화면 처음 loading시 휴대폰 번호를 자리수 구분해서 화면의 각 항목에 mapping 함.
function fn_uscm_loadTelNos(){
    var telNo1Obj = $("#telNo1");
    var telNo2Obj = $("#telNo2");
    var telNo3Obj = $("#telNo3");
    var telNoObj  = $("#telNo");

    var telNoVal  = telNoObj.val();

    if(isEmpty(telNoVal) == false) {
        if(telNoVal.length == 12){
        	telNo1Obj.val(telNoVal.substring(0,3));
        	telNo2Obj.val(telNoVal.substring(4,7));
        	telNo3Obj.val(telNoVal.substring(8,12));
        }else if(telNoVal.length == 13){
        	telNo1Obj.val(telNoVal.substring(0,3));
        	telNo2Obj.val(telNoVal.substring(4,8));
        	telNo3Obj.val(telNoVal.substring(9,13));
        }
    }
}

//화면 처음 loading시 휴대폰 번호를 자리수 구분해서 화면의 각 항목에 mapping 함.
function fn_uscm_loadFaxNos(){
	var faxNo1Obj = $("#faxNo1");
	var faxNo2Obj = $("#faxNo2");
	var faxNo3Obj = $("#faxNo3");
	var faxNoObj  = $("#faxNo");

	var faxNoVal  = faxNoObj.val();

	if(isEmpty(faxNoVal) == false) {

        if(faxNoVal.indexOf('02') == 0) {
            if(faxNoVal.length == 11){
            	faxNo1Obj.val(faxNoVal.substring(0,2));
            	faxNo2Obj.val(faxNoVal.substring(3,6));
            	faxNo3Obj.val(faxNoVal.substring(7,11));
            }else if(faxNoVal.length == 12){
            	faxNo1Obj.val(faxNoVal.substring(0,2));
            	faxNo2Obj.val(faxNoVal.substring(3,7));
            	faxNo3Obj.val(faxNoVal.substring(8,12));
            }
        }else if(faxNoVal.indexOf('0303') == 0 || faxNoVal.indexOf('0505') == 0 ){
            if(faxNoVal.length == 13){
            	faxNo1Obj.val(faxNoVal.substring(0,4));
            	faxNo2Obj.val(faxNoVal.substring(5,8));
            	faxNo3Obj.val(faxNoVal.substring(9,13));
            }else if(faxNoVal.length == 14){
            	faxNo1Obj.val(faxNoVal.substring(0,4));
            	faxNo2Obj.val(faxNoVal.substring(5,9));
            	faxNo3Obj.val(faxNoVal.substring(10,14));
            }
        }else{
            if(faxNoVal.length == 12){
            	faxNo1Obj.val(faxNoVal.substring(0,3));
            	faxNo2Obj.val(faxNoVal.substring(4,7));
            	faxNo3Obj.val(faxNoVal.substring(8,12));
            }else if(faxNoVal.length == 13){
            	faxNo1Obj.val(faxNoVal.substring(0,3));
            	faxNo2Obj.val(faxNoVal.substring(4,8));
            	faxNo3Obj.val(faxNoVal.substring(9,13));
            }
        }
	}
}

//화면 처음 loading시 전화번호를 자리수 구분해서 화면의 각 항목에 mapping 함.
function fn_uscm_loadOffTelNos(){
    var offTelNo1Obj = $("#offTelNo1");
    var offTelNo2Obj = $("#offTelNo2");
    var offTelNo3Obj = $("#offTelNo3");
    var offTelNoObj  = $("#offTelNo");

    var offTelNoVal  = offTelNoObj.val();

    if(isEmpty(offTelNoVal) == false) {

        if(offTelNoVal.indexOf('02') == 0) {
            if(offTelNoVal.length == 11){
            	offTelNo1Obj.val(offTelNoVal.substring(0,2));
            	offTelNo2Obj.val(offTelNoVal.substring(3,6));
            	offTelNo3Obj.val(offTelNoVal.substring(7,11));
            }else if(offTelNoVal.length == 12){
            	offTelNo1Obj.val(offTelNoVal.substring(0,2));
            	offTelNo2Obj.val(offTelNoVal.substring(3,7));
            	offTelNo3Obj.val(offTelNoVal.substring(8,12));
            }
        }else if(offTelNoVal.indexOf('0303') == 0 || offTelNoVal.indexOf('0505') == 0 ){
            if(offTelNoVal.length == 13){
            	offTelNo1Obj.val(offTelNoVal.substring(0,4));
            	offTelNo2Obj.val(offTelNoVal.substring(5,8));
            	offTelNo3Obj.val(offTelNoVal.substring(9,13));
            }else if(offTelNoVal.length == 14){
            	offTelNo1Obj.val(offTelNoVal.substring(0,4));
            	offTelNo2Obj.val(offTelNoVal.substring(5,9));
            	offTelNo3Obj.val(offTelNoVal.substring(10,14));
            }
        }else{
            if(offTelNoVal.length == 12){
            	offTelNo1Obj.val(offTelNoVal.substring(0,3));
            	offTelNo2Obj.val(offTelNoVal.substring(4,7));
            	offTelNo3Obj.val(offTelNoVal.substring(8,12));
            }else if(offTelNoVal.length == 13){
            	offTelNo1Obj.val(offTelNoVal.substring(0,3));
            	offTelNo2Obj.val(offTelNoVal.substring(4,8));
            	offTelNo3Obj.val(offTelNoVal.substring(9,13));
            }
        }
    }
}

//화면 처음 loading시 이메일주소를 구분해서 화면의 각 항목에 mapping 함.
function fn_uscm_loadEmails() {
    var emailObj = $("#email");

    if(emailObj.size() > 0) {

        var emailVal = $("#email").val();
        var emailArr = emailVal.split("@");

        var email1Obj = $("#email1");
        var email2Obj = $("#email2");
        var email3Obj = $("#email3");

        if(emailArr.length == 2) {
            email1Obj.val(emailArr[0]);
            email2Obj.val(emailArr[1]);

            email3Obj.find("option").each(function(){
                var tagObj = $(this);
                if(tagObj.text() == emailArr[1]){
                    tagObj.prop("selected", true);

                    // 도메인 입력항목을  readOnly 로 설정.
                    email2Obj.prop("readOnly", true);

                    return false;
                }
            });
        }

    }
}

// 사무실번호 설정.
function fn_uscm_setFullOffTelNo() {
    var offTelNo1Val 	= $("#offTelNo1").val();
    var offTelNo2Val2 	= $("#offTelNo2").val();
    var offTelNo3Val3 	= $("#offTelNo3").val();

    $("#offTelNo").val(offTelNo1Val+"-"+offTelNo2Val2+"-"+offTelNo3Val3);
}

// json 객체를 받아 휴대폰의 모든 객체에 적용함.
function fn_uscm_setAllCellphoneNoForms(args){
    var phoneNo1Val = args.cellphoneNo1;
    var phoneNo1Va2 = args.cellphoneNo2;
    var phoneNo1Va3 = args.cellphoneNo3;

    $("#cellphoneNo1").val(phoneNo1Val);
    $("#cellphoneNo2").val(phoneNo1Va2);
    $("#cellphoneNo3").val(phoneNo1Va3);

    $("#cellphoneNo").val(phoneNo1Val+"-"+phoneNo1Va2+"-"+phoneNo1Va3);
}

// 개인연락처 설정.
function fn_uscm_setFullTelNo() {
    var telVal = $("#telNo1").val();
    var telVa2 = $("#telNo2").val();
    var telVa3 = $("#telNo3").val();

    $("#telNo").val(telVal+"-"+telVa2+"-"+telVa3);
}

// 팩스번호 설정.
function fn_uscm_setFullFaxNo() {
	var faxVal = $("#faxNo1").val();
	var faxVa2 = $("#faxNo2").val();
	var faxVa3 = $("#faxNo3").val();

	$("#faxNo").val(faxVal+"-"+faxVa2+"-"+faxVa3);
}

// 이메일 설정.
function fn_uscm_setFullDomain() {
    var email1Val = $("#email1").val();
    var email2Val = $("#email2").val();

    $("#email").val(email1Val + "@" + email2Val);
}

// 이메일 도메인 값 설정 func
function fn_uscm_setEmailDomain(dmSelObj) {
    var email2Obj = $("#email2");

    if(isEmpty(dmSelObj.val()) == true) {
        email2Obj.prop("readOnly", false);
        email2Obj.val("");
        email2Obj.removeClass("read_only_int");
    }else{
        email2Obj.prop("readOnly", true);
        email2Obj.val(dmSelObj.find("option:selected").text());
        email2Obj.addClass("read_only_int");
    }
}

//처음 화면이 열렸을 때 domain과 연결되지 않은 우편번호 항목들 mapping
//우편번호체계 변경으로 인한 수정
function fn_uscm_loadPostNoForms() {
    var postNo1Obj  = $("#roadPostNo1");

    // 우편번호 load
    var zipCodeVal  = $("#roadPostNo").val();
    if(isEmpty(zipCodeVal) == false){
          postNo1Obj.val(zipCodeVal);
    }
}

/////////////////////////////////////////////////////////
//우편번호 검색 관련 샘플
/////////////////////////////////////////////////////////

//우편번호 검색 팝업에서 주소 설정을 위해 호출하는 함수.
function fn_uscm_setAddressForms(data){
    var addressVal    = data.address;

    var roadPostNo1Obj  = $("#roadPostNo1");
    var roadPostNo2Obj  = $("#roadPostNo2");
    var roadPostNoObj   = $("#roadPostNo");
    var roadAddress1Obj = $("#roadAddress1");
    var roadAddr1Obj    = $("#roadAddr1");
    var roadAddr2Obj    = $("#roadAddr2");
    var roadAddr3Obj    = $("#roadAddr3");
    var roadAddr4Obj    = $("#roadAddr4");
    var roadAddr5Obj    = $("#roadAddr5");

    //-------------------------------
    // 우편번호 적용.
    //-------------------------------
    roadPostNo1Obj.val(data.postcode1);
    roadPostNo2Obj.val(data.postcode2);
    roadPostNoObj.val(trim(data.postcode1)+"-"+trim(data.postcode2));

    //-------------------------------
    // 주소 설정
    //-------------------------------
    var convAddrData    = bizutils.getParseAddressData(addressVal);

    // 도로명 주소 설정
    roadAddress1Obj.val(convAddrData.addr1 + " " + convAddrData.addr2 + " " + convAddrData.addr3 + " " + convAddrData.addr4);
    roadAddr1Obj.val(convAddrData.addr1);
    roadAddr2Obj.val(convAddrData.addr2);
    roadAddr3Obj.val(convAddrData.addr3);
    roadAddr4Obj.val(convAddrData.addr4);
    roadAddr5Obj.val(convAddrData.addr5);
}

//우편번호 클릭 이벤트 연결
function jusoCallBack(addrInfo){
    var roadPostNo1Obj  = $("#roadPostNo1");
    var roadPostNo2Obj  = $("#roadPostNo2");
    var roadPostNoObj   = $("#roadPostNo");
    var roadAddress1Obj = $("#roadAddress1");
    var roadAddr1Obj    = $("#roadAddr1");
    var roadAddr2Obj    = $("#roadAddr2");
    var roadAddr3Obj    = $("#roadAddr3");
    var roadAddr4Obj    = $("#roadAddr4");
    var roadAddr5Obj    = $("#roadAddr5");

    var mainAddrVal  = addrInfo.roadAddrPart1; // 도로명 주소
    var addedAddrVal = addrInfo.addrDetail +" " + addrInfo.roadAddrPart2;

    // 도로명 주소가 없으면 지번주소로 변경.
    if(isEmpty(mainAddrVal)) {
        mainAddrVal = addrInfo.jibunAddr;
        addedAddrVal = addrInfo.addrDetail;
    }

    if(!isEmpty(mainAddrVal) ) {

        // 주소 분석 분리 작업.
        var convAddrData = bizutils.getParseAddressData(mainAddrVal);
        // addr5 : 분석5번째 + 사용자입력 + (참고주소)
        var addr5Val     = addedAddrVal;

        var zipNo = addrInfo.zipNo;

        //-------------------------------
        // 우편번호 적용.
        //-------------------------------
        // 주소체계가 5자리로 변경되어 삭제처리
        //roadPostNo1Obj.val(zipNo[0]);
        //roadPostNo2Obj.val(zipNo[1]);
        roadPostNo1Obj.val(zipNo);
        roadPostNoObj.val(trim(addrInfo.zipNo));

        // 도로명 주소 설정
        roadAddress1Obj.val(trim(addrInfo.roadAddrPart1));
        roadAddr1Obj.val(convAddrData.addr1);
        roadAddr2Obj.val(convAddrData.addr2);
        roadAddr3Obj.val(convAddrData.addr3);
        roadAddr4Obj.val(convAddrData.addr4);
        roadAddr5Obj.val(addr5Val);
    }
    // 주소 적용 오류 메시지.
    else {
        // MSG : 주소 검색 적용중 오류가 발생했습니다.
        msgAlert(MSG_BUSI_M017);
    }
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//validation 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * 기본정보 부분 검사.
 *
 * @param areaId 검사 영역 id 값.
 * @param addNotRequiredNmsArray 입력 필수 항목명 추가
 *
 * @returns {Boolean}
 */
function fn_validationUscmArea(areaId, addNotRequiredNmsArray) {

    var isValid = true;

    //--------------
    // 기존정보 검사
    //--------------
    var passwdVal = "";

    fn_getCheckObjects($("#"+areaId)).each(function(){

        var chkObj = $(this);
        var chkObjNm = chkObj.attr("name");
        var chkObjTitle = chkObj.attr("title");

        // 입력 필수 값 검사.
        var notRequiredNms = "|email3";
        if(addNotRequiredNmsArray != undefined && addNotRequiredNmsArray != null && addNotRequiredNmsArray.length > 0) {
            for(var i=0;i<addNotRequiredNmsArray.length;i++){
                notRequiredNms += "|"+addNotRequiredNmsArray[i];
//                notRequiredNms += "|"+addNotRequiredNmsArray;
            }
        }

        // 입력 필수 검사.
        if(notRequiredNms.indexOf(chkObjNm) < 0) {
	        if(fn_checkRequired(chkObj) == false)           { isValid = false; return false; }
        }

        // 타입 검사.
        if(fn_checkType(chkObj) == false)           { isValid = false; return false; }

        // 사용자 id 검사.
        if(isValid && chkObjNm == "userId") {
            // 중복검사 여부 확인
            var etcChkObj = chkObj.parent().find("input:hidden[name=userIdDuplChkYn]");
            if(isEmpty(etcChkObj.val()) == true) {
                //message : chkObjTitle + " 중복검사를 수행하세요."
                msgAlert(chkObjTitle + MSG_MEMB_A004);
                chkObj.focus();
                isValid = false; return false;
            }
        } else if(isValid && chkObjNm == "passwd") {
            passwdVal = chkObj.val();
        } else if(isValid && chkObjNm == "passwdCfrm") {
            if(passwdVal != chkObj.val()){
                // message:"비밀번호가 일치하지 않습니다."
                msgAlert(MSG_MEMB_A005);
                chkObj.focus();
                isValid = false; return false;
            }
        } else if(isValid && chkObjNm == "email2") {
            var emailObj = chkObj.parent().find("input:hidden[name=email]");
            if(fn_checkEmail(emailObj,"E-mail2") == false){
                chkObj.focus();
                isValid = false;
                return false;
            }
        }

    });

    return isValid;
}

//사용자구분에 따라 화면 변화
function fn_uscm_loadDisplayChg(args){

	var objType = args.uscmType;

	if(isEmpty(objType) ==false){
		var uscmType = objType.uscmType
		var loading  = objType.loading;
		var chkObj = $("#"+uscmType);
		var chkVal = chkObj.val();
	}

	//사용자가 selectbox 체인지 했을경우만 초기화
	if(!loading)
		//값 초기화시켜줌
		valueInit();

	//사용자정보에 따라 화면 off
	if(chkVal == 'U2'){
		$('._localGoverArea').hide();
		$('._investorArea').show();
	}else if(chkVal == 'U3'){
		$('._investorArea').hide();
		$('._localGoverArea').show();
		$("#cityauthCd").hide();
	}else if(chkVal == 'U4'){
		$('._investorArea').hide();
		$('._localGoverArea').show();
		$("#cityauthCd").show();
	}else if(chkVal == 'U7' || chkVal == 'U8'){
		$('._investorArea').hide();
		$('._localGoverArea').hide();
		$("._mcstArea, ._default").show();
	}else{
		$('._investorArea, ._localGoverArea').hide();
		$("._default").show();
	}
}

//값 초기화
function valueInit(){
	$("._localGoverArea, ._investorArea").find(":input").each(function(){
		var chkObj = $(this);
		chkObj.val("");
	});
}

//Retrieve validation target items in the area object
function fn_getCheckObjects(areaObj) {

    return areaObj.find(":input:not(input:hidden):not(input:checkbox):not(:disabled):not(input:button)");
}

function fn_deptChg(){
	var depNmObj = $("#deptNm");
	if(isEmpty($("#deptCd").val()) == true){
		depNmObj.prop("readOnly", false);
		depNmObj.removeClass("read_only_int");
	}else{
		depNmObj.prop("readOnly", true);
		depNmObj.val("");
		depNmObj.addClass("read_only_int");
    }
}
//종구분 바인딩
function bindSmplSpciKind(){

    var smplSmplKindObj = $("#smplSmplKind");   // 시료구분
    var smplSpciKindObj = $("#smplSpciKind");   // 종 구분
    var spciKindVal = $("#smplSpciKindObj").val();

    if(smplSmplKindObj.size() > 0){

//    	smplSmplKindObj.change(function(){

    	smplSpciKindObj.emptySelect();

        if(!isEmpty(smplSmplKindObj.val())) {
            bizutils.findCode({
                params: {parentCode:smplSmplKindObj.val()},
                fn    : function(result){
                    // '종 구분' 콤보 구성.
                    if(result != null && smplSpciKindObj.size() == 1) {
                    	smplSpciKindObj.loadSelect(result);
                    	if(!isEmpty(spciKindVal)){
                    		smplSpciKindObj.val(spciKindVal).prop("selected", true);
                    	}
                    }
                }
            });
        }
//      });
    }

}

//종구분 바인딩
function bindforeSpciKind(){

    var foreSmplKindObj = $("#foreSmplKind");   // 시료구분
    var foreSpciKindObj = $("#foreSpciKind");   // 종 구분
    var spciKindVal = $("#foreSpciKindObj").val();

    if(foreSmplKindObj.size() > 0){

//    	smplSmplKindObj.change(function(){

    	foreSpciKindObj.emptySelect();

        if(!isEmpty(foreSmplKindObj.val())) {
            bizutils.findCode({
                params: {parentCode:foreSmplKindObj.val()},
                fn    : function(result){
                    // '종 구분' 콤보 구성.
                    if(result != null && foreSpciKindObj.size() == 1) {
                    	foreSpciKindObj.loadSelect(result);
                    	if(!isEmpty(spciKindVal)){
                    		foreSpciKindObj.val(spciKindVal).prop("selected", true);
                    	}
                    }
                }
            });
        }
//      });
    }

}


// 프로세스 이동
function doProcess(diagReqNo, procStat, form, url) {
	form.attr({
		action : ROOT_PATH + url,
		method : "post"
	});
	form.submit();
}


//// 01.진단의뢰 신청관리 조회
//function doView_process01(diagReqNo, procStat) {
//	
//}
//
//
//// 02.개체별 검사항목 관리 조회
//function doView_process02(diagReqNo, procStat, form) {
//	form.attr({
//		action : ROOT_PATH+"/diag/viewPomoOpnn.do",
//		method : "post"
//	});
//	form.submit();
//}
//
//// 02.개체별 검사항목 관리 작성
//function doRegi_process02(diagReqNo, procStat) {
//	
//}
//
//// 03.검사 결과서 관리 조회
//function doView_process03(diagReqNo, procStat) {
//	
//}
//
//// 03.검사결과서 관리 작성
//function doRegi_process03(diagReqNo, procStat) {
//	
//}