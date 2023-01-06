/**
 * 공통 확장 스크립트이다.
 *
 * @version 1.0 2017/01/10
 */
////////////////////////////////////////////////////////////////////////////////
// jQuery 관련 공통 custom 코드 관리
////////////////////////////////////////////////////////////////////////////////

// 공통 변수
var _IS_TEST_CAST_ = false;

////////////////////////////////////////////////////////////////////////////////

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// select box 동적 구성 관련
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(function($) {
    $.fn.emptySelect = function() {
        return this.each(function() {
            if(this.tagName=='SELECT') this.options.length = 1;
        });
    };

    $.fn.loadSelect = function(optionsDataArray) {
        return this.emptySelect().each(function() {
            if(this.tagName=='SELECT') {
                var selectElement = this;
                $.each(optionsDataArray, function(idx, optionData) {
                    var option = new Option( optionData.codeNm, optionData.code);
                    if($.browser.msie){
                        selectElement.add(option);
                    }else{
                        selectElement.add(option,null);
                    }
                });
            }
        });
    };
})(jQuery);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Validation 관련 내용
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 입력 필수 검사.
function fn_checkRequired(chkObj,formNm) {
    return _fn_commValid(chkObj, "required", formNm);
}
// 날짜 검사.
function fn_checkDate(chkObj,formNm) {
    return _fn_commValid(chkObj, "date", formNm);
}

function fn_checkDateFmt(chkObj,formNm) {
    return _fn_commValid(chkObj, "dateFmt", formNm);
}
// email 검사.
function fn_checkEmail(chkObj,formNm) {
    return _fn_commValid(chkObj, "email", formNm);
}
function fn_checkAmount(chkObj,formNm) {
    return _fn_commValid(chkObj, "amount", formNm);
}

// 형식 검사
function fn_checkType(chkObj, formNm){
    return _fn_commValid(chkObj, "typeCheck", formNm);
}

function fn_checkUserId(chkObj, formNm) {
    return _fn_commValid(chkObj, "userId", formNm);
}

function fn_checkFileExt(chkObj, formNm) {
    return _fn_commValid(chkObj, "fileExt", formNm);
}


// 기본 검사 method
function _fn_commValid(chkObj, type, formName) {
    var rtnValue = true;

    if(formName == undefined || isEmpty(formName) == true ){
        formName = null;
    }

    var formTitleStr = chkObj.attr("title");
    var formNm       = chkObj.attr("name");
    var formValue    = chkObj.val();
    var addMsg = "";

    if(formName != null ){
        formTitleStr = formName;
    }

    // 입력 필수 검사.
    if(type == "required") {
        if(isEmpty(formValue) == true) {
            addMsg = MSG_COMM_2001;         //" 항목을 입력하세요.";
            if(chkObj.prop("tagName") == "SELECT") {
                addMsg = MSG_COMM_2002;     //" 항목을 선택하세요";
            }
        }
    }else if(type == "date" ){
        var convFormValue = formValue;
        // 10자리이면 "/"를 제거하고 검사
        if(formValue.length == 10){
            convFormValue = convFormValue.split("/").join("");
        }
        if(isDate(convFormValue) == false) {
            addMsg = MSG_COMM_2003;         //" 항목은 날짜 형식에 맞지 않습니다.";
        }
    }else if(type == "dateFmt" ){

        if(formValue.length == 0){

        }else if(formValue.length == 8){
            if(isDate(formValue) == false) {
                addMsg = MSG_COMM_2003;         //" 항목은 날짜 형식에 맞지 않습니다.";
            }
        }else if(formValue.length == 10){
            var value = formValue.substring(0,4) + formValue.substring(5,7) + formValue.substring(8,10);
            if(isDate(value) == false) {
                addMsg = MSG_COMM_2003;         //" 항목은 날짜 형식에 맞지 않습니다.";
            }
        }else{
            addMsg = MSG_COMM_2003;         //" 항목은 날짜 형식에 맞지 않습니다.";
        }

    }else if(type == "email" ){
        if(isEmail(formValue) == false) {
            addMsg = MSG_COMM_2004;         //" 항목은 Email 형식에 맞지 않습니다.";
        }
    }else if(type == "amount" ){
        if(isEmpty(formValue) == true) {
            // 값이 없으면 통과
        }else if (isFloat(formValue) == false) { // float형식 검사.
            addMsg = MSG_COMM_2010;         //" 항목은 양표시 형식에 맞지 않습니다.";
        }else{
            var floatVal = parseFloat(formValue);
            if(floatVal < 0){
                addMsg = MSG_COMM_2010;         //" 항목은 양표시 형식에 맞지 않습니다.";
            }
        }
    }else if(type == "fileExt" ){
        //-------------------------
        // 첨부파일 허용여부 : _ALLOWED_FILE_EXTS는 스크립트 파일에 global 변수로 정의해 놓으면 됨.
        //-------------------------
        if(isAtthAllowedFileType(formValue, _ALLOWED_FILE_EXTS) == false) {
            addMsg = MSG_COMM_2012;     //"첨부한 파일이 허용된 파일 유형이 아닙니다."
        }

    }else if(type == "typeCheck" ){
        var upperFormNm = formNm.toUpperCase();
        var upperTagNm = chkObj.prop("tagName");

        if(formValue != "" && trim(formValue).length > 0 ) {

            if(upperFormNm.indexOf("BUSIREGNNO") >= 0){
                var convFormValue = formValue.split("-").join("");  // replaceAll 효과 ("-" 모두제거)
                if(isBizRegNo(convFormValue) == false) {
                    addMsg = MSG_COMM_2005;     //" 항목은 사업자등록번호 형식에 맞지 않습니다.";
                    if(_IS_TEST_CAST_ == true){
                        // _IS_TEST_CAST_ 이 true이면 사업자등록번호 check 하지 않음.
                        addMsg = "";
                        // 테스트 상황이면 전체 길이만 검사함.
                        if(convFormValue.length != 10) {
                            addMsg = MSG_COMM_2005;
                        }
                    }
                }
            }else if(upperFormNm.indexOf("USERID") >= 0){   // 사용자 아이디 검사.
                var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9]{4,20}$/;
                if( pattern.test(formValue) == false){
                    addMsg = "아이디 형식에 맞지 않습니다.\n아이디는 4~20자리수로 숫자와 영문만사용할 수 있으며 첫글자는 반드시 영문이어야 합니다. ";
                }
            }else if(upperFormNm.indexOf("DATE") >= 0){
                var convFormValue = formValue;
                // 10자리이면 "/"를 제거하고 검사
                if(formValue.length == 10){
                    convFormValue = convFormValue.split("-").join("");
                }
                if(isDate(convFormValue) == false) {
                    addMsg = MSG_COMM_2006;     //" 항목은 날짜 형식에 맞지 않습니다.";
                }
            }else if(upperFormNm.indexOf("PASSWD") >= 0){
                if(isValidPassword(formValue) == false) {
                    addMsg = MSG_COMM_2007;     //" 항목은 비밀번호 조건에 맞지 않습니다.";
                }
            }else if(upperFormNm.indexOf("CELLPHONENO2") >= 0 || upperFormNm.indexOf("TELNO2") >= 0){
                if(isNumberOnly(formValue) == false || formValue.length < 3 ) {
                    addMsg = MSG_COMM_2008;     //" 항목은 3자리 또는 4자리 숫자만 입력하세요.";
                }
            }else if(upperFormNm.indexOf("CELLPHONENO3") >= 0 || upperFormNm.indexOf("TELNO3") >= 0){
                if(isNumberOnly(formValue) == false || formValue.length < 4 ) {
                    addMsg = MSG_COMM_2009;     //" 항목은 4자리 숫자만 입력하세요.";
                }
                /*}else if(upperFormNm.indexOf("GPSX") >= 0 || upperFormNm.indexOf("GPSY") >= 0){
                if (isGPS(formValue) == false ){
                    addMsg = MSG_COMM_2011;     //" 항목은 GPS 좌표 형식에 맞지 않습니다.";
                }*/
            }/*else if(upperFormNm.indexOf("GPSX") >= 0 || upperFormNm.indexOf("GPSY") >= 0){
            	if (isFloat(formValue) == false ){
            		addMsg = MSG_COMM_2011;     //" 항목은 GPS 좌표 형식에 맞지 않습니다.";
            	}
            }*/else if(upperFormNm.indexOf("UPFILE") >= 0){
                if(isAtthAllowedFileType(formValue, _ALLOWED_FILE_EXTS) == false) {
                    addMsg = MSG_COMM_2012;     //"첨부한 파일이 허용된 파일 유형이 아닙니다."
                    formTitleStr = "";
                }
            }

            // TEXTAREA 항목의 최대 길이 조건 확인.
            if(formValue != "" && "TEXTAREA" == upperTagNm) {
                var byteLen   = jsByteLength(formValue);
                var maxLength = 4000;

                     if(upperFormNm.indexOf("RECTNOTE") >= 0){ maxLength = 800; }		// 반려사유
                else if(upperFormNm.indexOf("PERMCOND") >= 0){ maxLength = 1600; }      // 허가조건
                else if(upperFormNm.indexOf("CHGDETAIL") >= 0){ maxLength = 800; }		// 변경사항

                if(byteLen > maxLength) {
                    addMsg = " 항목이 최대 입력가능 길이("+maxLength+") 이상 입력됐습니다. 현재길이("+byteLen+")";
                }
            }
        }

    }

    // 메시지가 설정되었으면 오류임.
    if(addMsg != "" ) {
        msgAlert(formTitleStr + addMsg, chkObj);
        //chkObj.focus();
        rtnValue = false;
    }

    return rtnValue;
}

//파일 첨부에서 허용된 파일 형식인지 확인.
//fullFileNm : 전체 파일명
//allowedExtNms : 허용된 확장명 문자열 (ex : txt,xls,pdf)
function isAtthAllowedFileType(fullFileNm, allowedExtNms) {
    //-----------------------------
    // 제한된 확장명이 전달되지 않으면 무조건 허용.
    //-----------------------------
    if(allowedExtNms == undefined || allowedExtNms == null) {
        return true;
    }

    var allowedExtNmsTm = "|"+allowedExtNms.replace(new RegExp(",", 'g'), "|") + "|";
    allowedExtNmsTm = allowedExtNmsTm.toUpperCase().replace(/ /g,"");
    allowedExtNmsTm = allowedExtNmsTm.replace(/ /g,"");     // 중간의 모든 공백 제거

    var extNm = fullFileNm.substring( fullFileNm.toLowerCase().lastIndexOf(".") + 1 );
    var extNmTm = "|"+extNm.toUpperCase() +"|";

    if(allowedExtNmsTm.indexOf(extNmTm) >= 0){
        return true;
    }else{
        return false;
    }
}

/**
 * jQuery Calendar 설정
 */
$.datepicker.setDefaults({
	  buttonText: "Calendar"
	, showOn: 'both' 										// 우측에 달력 icon 을 보인다. 'both' : 입력박스클릭허용, 'button' : 버튼클릭
	, buttonImage: ROOT_PATH+'/images/btn/carlendar.png'  	// 우측 달력 icon 의 이미지 패스
	, buttonImageOnly: true 								//  inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
	, changeMonth: true 									// 월선택 select box 표시 (기본은 false)
	, changeYear: true  									// 년선택 selectbox 표시 (기본은 false)
	, showButtonPanel: true 								// 하단 today, done  버튼기능 추가 표시 (기본은 false)
	//, showOtherMonths: true
	//, selectOtherMonths: true
	//, monthNames: ['년 1월','년 2월','년 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월']
	, dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
	, showMonthAfterYear:true
	, yearSuffix: ' '
	, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
	, currentText: '오늘'    	//button:Today
	, closeText: '닫기'    		//button:Close
});

// jQuery Calendar 사용.
$(document).ready(function() {
	cleanDatepicker();

	// 달력 사용(클래스명) 예)  jcalendar-1, jcalendar-2, jcalendar-3....
	$("[class^='jcalendar-']").datepicker({
		  dateFormat : 'yy-mm-dd'
	});
	// calendar inputbox readonly 처리
	$("[class^='jcalendar-']").each(function (e) {
		$(this).attr('readOnly', 'true');
	});
});

// jQuery Calendar Clear Button 추가하기
function cleanDatepicker(){
	var old_fn = $.datepicker._updateDatepicker;

	$.datepicker._updateDatepicker = function(inst) {
		old_fn.call(this, inst);
		var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");
		$("<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>삭제</button>").appendTo(buttonPane).click(function(ev) {
			$.datepicker._clearDate(inst.input);
		}) ;
	};
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 공통 message 관련 함수.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 *  메시지(string)에 argument부분을 변환 처리하는 function
 * argument는 중괄호와 0부터 시작하는 순차번호로 표시  ex) {0}, {1} ...
 *
 * @param msgTemp
 * @param arguArray
 * @returns
 */
function convertMsgArgs(msgTemp, arguArray) {
    var rtnMsg = msgTemp;
    for(var i=0;i<arguArray.length;i++) {
        rtnMsg = rtnMsg.replace("{"+ i +"}", arguArray[i]);
    }
    return rtnMsg;
}

/**
 * 메시지 출력과 닫기후 포커스 할 대상만 설정할 수 있는 msg box
 * @param message
 * @param focusObj
 */
function msgAlert(message, focusObj) {
    if(isEmpty(message) == false) {
        nAlert(message, null, function(){
            if(focusObj)
                focusObj.focus();
        });
    }
}

// alert
function nAlert(message, title, callback) {
    if( title == null ) title = '알림';
    jAlert(message, title, callback);
}

// confirm
function nConfirm(message, title, callback) {
    if( title == null ) title = '확인';
    jConfirm(message, title, callback) ;
}

// prompt
function nPrompt(message, value, title, callback) {
    if( title == null ) title = 'Prompt';
    jPrompt(message, value, title, callback) ;
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 일반 공통 함수.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 파업창 Close
$(document).ready(function() {
    $("#closeBtn").click(function() {
   		self.close();
    });
});

//주소 검색 POPUP 여는 함수
function openFindJuso(tagtId){
    newWindow(ROOT_PATH+'/jusoPopup.jsp?tagtId='+tagtId, 'findPostNoAddressPop', 530, 420, "yes", "no");
}

//Arrange the file names
function initFileFormNm() {
    var fIdx = 0;
    $("input:file[name^=upfile]").each(function(){
        $(this).attr("name", "upfile"+fIdx);
        fIdx ++;
    });
}
