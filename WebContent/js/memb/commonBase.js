/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @(#) commonBase.js 1.0 2013/10/21
    Base 공통 include script

    @version 1.0 2017/02/10
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

$(document).ready(function(){
    //---------------------------------
    // load init
    //---------------------------------

    // a 링크를 안되게 처리.
    $(".sub_tab_box, .button, .button_box, .calendar_bt").find("a").attr("href", "javascript:");

    // disabled와 readonly 객체에 style 적용
    $(":disabled").addClass("read_only_int");
    $(":input:not(:disabled)").each(function(){
        if($(this).prop("readonly") == true){
            $(this).addClass("read_only_int");
        }
    });

    //-------------------
    // validation mask 적용.
    //-------------------

    //사업자번호 필드를 사업자등록번호 필드로 변환한다.
    $("form input:not(:hidden)[id*=usiRegnNo]").not("[id*=srchBusiRegnNo]").css({"maxLength":"12"}).toBizRegNoField();
    //  -> 사업자등록번호 조회조건은 format 적용하지 않고 숫자만 가능하게 적용.
    $("form input:not(:hidden)[id=srchBusiRegnNo]").setMask({ mask:"9999999999"});

    // 전화번호 field 설정.(숫자만 입력)
    $("form input:not(:hidden)[id*=telNo]").setMask({ mask:"9999"});
    // 휴대폰 번호 필드 설정.(숫자만 입력)
    $("form input:not(:hidden)[id*=offTelNo]").setMask({ mask:"9999"});
    // 팩스 번호 필드 설정.(숫자만 입력)
    $("form input:not(:hidden)[id*=faxNo]").setMask({ mask:"9999"});

    // 날짜 입력항목 필드 설정. (날짜형식 적용, YYYY/MM/DD)
    $("form input:not(:hidden)[id$=Date]").toCalendarField();

    // 사용자 아이디 필드 설정. (숫자,영문만 입력 가능 (20자))
    $("form input:not(:hidden)[id$=userId]").setMask({mask:"********************"});

    // 사용자 이메일 필드 설정. (숫자,영문만 입력 가능 (20자))
    //$("form input:not(:hidden)[id*=email]").setMask({mask:"********************"});

    // textarea 길이 검사
    $("#rectNote").toByteLimitField({limit:800});       // 반려사유
    $("#permCond").toByteLimitField({limit:1600});      // 허가조건
    $("#chgDetail").toByteLimitField({limit:800});      // 변경사항
});

