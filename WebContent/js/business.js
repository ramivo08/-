//*****************************************************************************
// 업무 공통 함수 정의
// ex) 팝업 호출 함수, 코드 AJAX 함수 등
//
//*****************************************************************************

var comutils = {}; //공통유틸
var bizutils = {}; //업무용

/**
 * 공통코드 목록 호출 AJAX 함수
 *
 * << 인자항목 >>
 * args.params : 검색조건
 * args.fn     : 결과처리함수
 *
 *
 * << 사용예 >>
 *    bizutils.findCode({
 *        params: {
 *            parentCode: ''
 *        },
 *        fn: function(result) {
 *        }
 *    });
 *
 */
bizutils.findCode = function( args ) {
	if (!args) {
		alert('[bizutils.findCode] : 함수인자가 정의되지 않았습니다.');
		return;
	}
	if (!args.fn || !$.isFunction(args.fn)) {
		alert('[bizutils.findCode] : 결과처리함수가 정의되지 않았습니다.');
		return;
	}
	var params = args.params || {};
	var fn = args.fn;

    $.ajax({
        url: ROOT_PATH +"/comm/findCodeAjax.do",
        data:params,
        dataType:"json",
        contentType:"application/json; text/html; charset=utf-8",
        success:fn,
        error:function(request, status, error) {
        	alert('error');
        }
    });
};

/**
 * 주소 문자열을 받아서 업무구성에 맞게 5개 값으로 분리하는 method
 *
 * << 인자항목 >>
 * args : 주소 문자열 (예: "경기도 고양시 덕양구 토당동 845 파워프라자")
 *
 * return : {addr1:"경기도",addr2:"고양시",addr3:"덕양구",addr4:"토당동",addr5:845 파워프라자}
 */
bizutils.getParseAddressData = function( args ){

    var address = args;

    var convArr = ["","","","",""];
    var arrIdx  = 0;

    var addrArr = address.split(" ");

    for(var i=0;i<addrArr.length;i++) {

        if(curVal == "") continue;

        var curVal = trim(addrArr[i])+"";

        // 현재 값이 empty 상태면 통과
        if( curVal==null || curVal=="" || curVal.length == 0 ) continue;

        if(arrIdx == 3){
            var repCurVal = curVal.replace("-","").replace(" ","").replace("~","");
            var isValid = false;

            //예) 토당동 845, 세종로 17, 부근리 474, 삽교읍 47, 상성길 119
            if(isNaN( parseInt(repCurVal) ) == true){
                // 마지막 1글자 (리/동/로/길 중에 하나면 true
                var lastStr = repCurVal.substring(repCurVal.length-1);
                if("리|동|로|길".indexOf(lastStr) >= 0) {isValid = true;}
            }

            if(isValid == true) {
                // true이면 현재 index(3)에 저장
                convArr[arrIdx] = curVal;
                arrIdx ++;
            }else{
                // false이면 다음 index(4)에 저장
                arrIdx ++;
                convArr[arrIdx] = curVal;
            }
        }else if(arrIdx == 4){
                convArr[arrIdx] += (" " + curVal);
        }else{
            // addr1 ~ addr3는 모두 기본으로 값 입력.
            convArr[arrIdx] = curVal;
            arrIdx ++;
        }
    }

    var convData = {
            addr1:convArr[0]
           ,addr2:convArr[1]
           ,addr3:convArr[2]
           ,addr4:convArr[3]
           ,addr5:trim(convArr[4])
    };

    return convData;
};

/**
 * 파일 다운로드 function
 * << 인자항목 >>
 * 1) pk값만 전달.
 * args.fileNo : 파일테이블 pk 값.
 *
 * 2)파일 path를 전달할 때
 * args.filePath : 파일이 존재하는 directory의 full path
 * args.fileName : 실제 서버에 저장된 파일명
 * args.orgFileName : 원래 파일명 (다운로드되는 파일명이기도 함)
 *
 *
 */
comutils.fileDownload = function(args) {
    var filePath    = args.filePath;
    var fileName    = args.fileName;
    var orgFileName = args.orgFileName;
    var fileNo      = args.fileNo;

    if( fileNo != null && isNaN(fileNo) == false) {
        fileNo = fileNo.toString();
    }
    var param = "";

    if( fileNo != undefined && fileNo != null && fileNo.length > 0 ) {
        param = "?fileNo="+fileNo;
        document.location.href = ROOT_PATH +"/comm/fileDownload.do"+param;
    }else{
        param = "?orgFileName="+orgFileName+"&filePath="+filePath+"&fileName="+fileName;
        document.location.href = ROOT_PATH +"/comm/fileDownload.do"+param;
    }
};
