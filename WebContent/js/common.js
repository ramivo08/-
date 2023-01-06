
/**
 *  toUpperCase()
 *  onkeyup="doUpper(this)"
 */
function doUpper(obj){
    obj.value=obj.value.toUpperCase().trim();
    return obj.value;
}

/**
 * get Byte Length
 *
 * @param	string
 * @return	byte length
 * @author	ntarget
 * @since	2011-06-22
 */
function jsByteLength(str) {
	if (str == "") {
		return	0;
	}

	var len = 0;

	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 128) {
			len++;
		}
		len++;
	}
	return	len;
}

function ltrim(str) {
	var s = new String(str);

	if (s.substr(0,1) == " ")
		return ltrim(s.substr(1));
	else
		return s;
}

function rtrim(str) {
	var s = new String(str);

	if (s.substr(s.length - 1, 1) == " ")
		return rtrim(s.substring(0, s.length - 1));
	else
		return s;
}

function trim(str) {
	return ltrim(rtrim(str));
}

function isNumber(num) {
	var notNumberPattern	= /[^0-9.-]/;
	var twoDotPattern		= /[0-9]*[.][0-9]*[.][0-9]*/;
	var twoMinusPattern		= /[0-9]*[-][0-9]*[-][0-9]*/;
	var validRealPattern	= /^([-]|[.]|[-.]|[0-9])[0-9]*[.]*[0-9]+$/;
	var validIntegerPattern2	= /^([-]|[0-9])[0-9]*$/;
	var validNumberPattern	= /(^([-]|[.]|[-.]|[0-9])[0-9]*[.]*[0-9]+$)|(^([-]|[0-9])[0-9]*$)/;

	num = rtrim(num);
	return	!notNumberPattern.test(num) &&
			!twoDotPattern.test(num)	&&
			!twoMinusPattern.test(num)	&&
			validNumberPattern.test(num);
}

/* Only Number and Char '-' (keydown event) */
function onlyNumberInput() {
     var code = window.event.keyCode;
     if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || code == 109 || code == 189 || code == 8 || code == 9 || code == 13 || code == 46){
        window.event.returnValue = true;
        return;
     }
     window.event.returnValue = false;
}

/* Only Number keydown event) */
function onlyNumberInput2(){
 	var code = window.event.keyCode;
	if(!event.shiftKey){
	 	if ((code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46) {
			window.event.returnValue = true;
	  		return;
	 	}
  	}
 	window.event.returnValue = false;
	return;
}

function isNumberOnly(string) {
    var pattern = new RegExp("^[0-9]+$", "");
    return pattern.test(string);
}

/**
 * 정수 체크
 *
 * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
 * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
 * 3. 마지막은 숫자로 끝나야 한다 : [0-9]$
 *
 * @param	num
 * @return	boolean
 */
function isInteger(num) {
	var re = /^[\+-]?[0-9]*[0-9]$/;

	if (re.test(num)) {
		return	true;
	}

	return	false;
}

/**
 * 유리수 체크
 *
 * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
 * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
 * 3. 소수점을 넣을 수 있다 : [.]?
 * 4. 소수점 이하 자리에 0에서 9까지 숫자가 올 수 있다 : [0-9]*
 * 5. 마지막은 숫자로 끝나야 한다 : [0-9]$
 *
 * @param	num
 * @return	boolean
 */
function isFloat(num) {
	var re = /^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/;

	if (re.test(num)) {
		return	true;
	}

	return	false;
}

//function isGPS(value) {
//	var re = /[0-9]{1,3}*[º][0-9]$/;
//	
//	if(re.test(value)) {
//		return	true;
//	}
//	
//	return	false;
//	
//}

/**
 * Email Check
 *
 * @param	email
 * @return	boolean
 */
function isEmail(email) {
	var re = /[^@]+@[A-Za-z0-9_-]+[.]+[A-Za-z]+/;

	if (re.test(email)) {
		return	true;
	}

	return	false;
}

/**
 * 날짜 유효 체크
 *
 * @param	date
 * @return	boolean
 */
function isDate(date) {
	if (date == null || date.length != 8) {
		return	false;
	}

	if (!isNumber(date)) {
		return	false;
	}

	var year = eval(date.substring(0, 4));
	var month = eval(date.substring(4, 6));
	var day = eval(date.substring(6, 8));

	if (month < 1 || month > 12) {
		return	false;
	}

	var totalDays = 30;

	switch (eval(month)){
		case 1 :
			totalDays = 31;
			break;
		case 2 :
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
				totalDays = 29;
			else
				totalDays = 28;
			break;
		case 3 :
			totalDays = 31;
			break;
		case 4 :
			totalDays = 30;
			break;
		case 5 :
			totalDays = 31;
			break;
		case 6 :
			totalDays = 30;
			break;
		case 7 :
			totalDays = 31;
			break;
		case 8 :
			totalDays = 31;
			break;
		case 9 :
			totalDays = 30;
			break;
		case 10 :
			totalDays = 31;
			break;
		case 11 :
			totalDays = 30;
			break;
		case 12 :
			totalDays = 31;
			break;
	}

	if (day == 0  || day > totalDays  ) {  // 날짜체크시 일자가 0 인거에 대한 오류 추가, 20090500 도 정상인 날짜로 인식하고 있었다.( 20090520, BYS )
		return	false;
	}

	return	true;
}

/**
 * 날짜 체크
 *
 * @param	date
 * @return	boolean
 */
function isDateMonth(datemonth) {
	if (datemonth == null || datemonth.length != 6) {
		return	false;
	}

	if (!isNumber(datemonth)) {
		return	false;
	}

	var month = eval(datemonth.substring(4, 6));

	if (month < 1 || month > 12) {
		return	false;
	}

	return	true;
}

/**
 * 시간 형식인지 체크 한다.(HH24MI)
 *
 * @param	code
 * @return	boolean
 */
function isTime(time) {
	if (time.length != 4) {
		return	false;
	}

	if (!isNumber(time)) {
		return	false;
	}

	var hour = eval(time.substring(0, 2));
	var minute = eval(time.substring(2, 4));

	if (hour < 0 || 24 < hour) {
		return	false;
	}

	if (minute < 0 || 60 <= minute) {
		return	false;
	}

	if (hour == 24 && minute > 0) {
		return	false;
	}

	return	true;
}

/**
 * 초 형식인지 체크 한다.(SS)
 *
 * @param	sec
 * @return	boolean
 */
function isSecond(sec) {
	if (sec.length != 2) {
		return	false;
	}

	if (!isNumber(sec)) {
		return	false;
	}

	var ss = eval(sec);

	if (ss < 0 || 60 <= ss) {
		return	false;
	}

	return	true;
}

/**
 * 전화번호 형식인지 체크 한다.
 * 222-3333
 *
 * @param	str
 * @return	boolean
 */
function isPhone(str) {
	return	isNumber(str);
}

/**
 * 숫자에 comma를 붙인다.
 *
 * @param	str
 */
function addCommaStr(str) {
	var num = "";
	var sign = "";

	if (str.charAt(0) == "+" || str.charAt(0) == "-") {
		sign = str.charAt(0);
		str = str.substr(1);
	}

	var index = str.indexOf('.');

	if (index != -1) {
		num = str.substr(index);
	} else {
		index = str.length;
	}

	for (var i = index - 3; i > 0; ) {
		num = ',' + str.substr(i, 3) + num;

		index = i;
		i -= 3;
	}

	num = sign + str.substr(0, index) + num;

	return	num;
}

/**
 * 숫자에서 comma를 없앤다.
 *
 * @param	str
 */
function delCommaStr(str) {
	var temp = '';

	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == ',') {
			continue;
		} else {
			temp += str.charAt(i);
		}
	}

	return	temp;
}

/**
 * 날짜에 "/"를 붙인다.
 *
 * @param	str
 */
function addDateFormatStr(str) {
    if(str=="" || str==null) return str;
    else
	return	str.substring(0, 4) + "/" + str.substring(4, 6) + "/" + str.substring(6, 8);
}

// ADDMONTHS
function addMonths(strdate, months) {
    strdate = deleteDateFormatStr(strdate);

	if (strdate == null || !isNumber(strdate) || strdate.length != 8) {
		return null;
	}

	var year = Number(strdate.substring(0, 4));
	var month = Number(strdate.substring(4, 6));
	var day = Number(strdate.substring(6));

	var monthsum = month + months;
	if(months>=0) {
		if (monthsum > 12) {
			month = monthsum % 12;
			if (month == 0) {
				month = 12;
				year += monthsum / 12 - 1;
			} else {
				year += (monthsum - month) / 12;
			}
		} else {
			month = monthsum;
		}
	} else {
		if (monthsum <= 0) {
			month = (monthsum % 12) + 12;
			year = year + (parseInt(months/12));
			if(Math.abs(monthsum % 12)<Math.abs(months)) {
				year = year -1;
			}
		} else {
			month = monthsum;
		}
	}

	var total_days = 0;
	switch (eval(month))
	{
		case 1 :
			total_days = 31;
			break;
		case 2 :
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
				total_days = 29;
			else
				total_days = 28;
			break;
		case 3 :
			total_days = 31;
			break;
		case 4 :
			total_days = 30;
			break;
		case 5 :
			total_days = 31;
			break;
		case 6 :
			total_days = 30;
			break;
		case 7 :
			total_days = 31;
			break;
		case 8 :
			total_days = 31;
			break;
		case 9 :
			total_days = 30;
			break;
		case 10 :
			total_days = 31;
			break;
		case 11 :
			total_days = 30;
			break;
		case 12 :
			total_days = 31;
			break;
		default :
			alert("default");
			total_days = 30;
			break;
	}

	if (day > total_days) {
		day = total_days;
	}

	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	return ("" + year + month + day);
}

// get last day.
function lastDate(yyyymmdd) {
	if (yyyymmdd == null || !isNumber(yyyymmdd) || yyyymmdd.length != 8) {
		return null;
	}

	var year = Number(yyyymmdd.substring(0, 4));
	var month = Number(yyyymmdd.substring(4, 6));
	var day = Number(yyyymmdd.substring(6));

	var total_days = 0;
	switch (eval(month)) {
		case 1 :
			total_days = 31;
			break;
		case 2 :
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
				total_days = 29;
			else
				total_days = 28;
			break;
		case 3 :
			total_days = 31;
			break;
		case 4 :
			total_days = 30;
			break;
		case 5 :
			total_days = 31;
			break;
		case 6 :
			total_days = 30;
			break;
		case 7 :
			total_days = 31;
			break;
		case 8 :
			total_days = 31;
			break;
		case 9 :
			total_days = 30;
			break;
		case 10 :
			total_days = 31;
			break;
		case 11 :
			total_days = 30;
			break;
		case 12 :
			total_days = 31;
			break;
		default :
			alert("default");
			total_days = 30;
			break;
	}

	day = total_days;

	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}

	return ("" + year + month + day);
}


//새창
var win = "";
function newWindow(mypage, myname, w, h, scroll, resize) {
	
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2-35;
	var winRe = resize?'yes':'no';
	var winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+winRe+',status=yes, menubar=no, toolbar=no,location=no';
	
	myname = replace(myname, '-', '');
	
	win = window.open(mypage,myname, winprops);
	win.focus();
	
}

function newPage(mypage, myname, w, h, scroll, resize) {
	
	var winl = nvl(w, screen.width);
	var wint = nvl(h, screen.height);
	var winRe = resize?'yes':'no';
	var winprops = 'height='+wint+',width='+winl+',scrollbars='+scroll+',resizable='+winRe+',status=yes, menubar=no, toolbar=no,location=no';
	
	myname = replace(myname, '-', '');
	
	win = window.open(mypage,myname, winprops);
	win.focus();
	
}

function newWindow2(params) {
	var winl = (screen.width - params.width) / 2;
	var wint = (screen.height - params.height) / 2-35;
	var winRe = params.resize?'yes':'no';
	var winprops = 'height='+params.height+',width='+params.width+',top='+wint+',left='+winl+',scrollbars='+params.scrolling+',resizable='+winRe+',status=no, menubar=no, toolbar=no,location=no';

	var myname = 'popup';

	if (params.name != null)
		myname = replace(params.name, '-', '');

	win = window.open(params.url, myname, winprops);
	win.focus();
}

// replace : before를 after로 치환.
function replace(str, before, after) {
    var temp="";

    for(var i=0;i<str.length;++i) {
        var c=str.charAt(i);
        if(c==before){temp += after;}
        else temp += c;
    }
    return temp;
}

// 해당 데이타가 Null인지 Check한다.
function checkNull(element) {
   var ii = 0 ;
   if(element.value == "" ) {			// 값이 없을 때
      element.value = "";
      element.focus();
      element.select();
      return false;
   }
   while( ii < element.value.length ) { // SPACE가 아닌 값이 존재하면 TRUE
     if( " ".indexOf(element.value.charAt(ii)) < 0 ) {
   	       return true;
     }
     ii++ ;
   }
   element.focus();
   element.select();
   return false ;
}

// Result Message
function resultMessage() {
	if (PROC_FLAG != "" && PROC_FLAG != null && PROC_FLAG != "null")  {
		alert(PROC_FLAG);
	}
}

// Get Today Dete.
function getToday() {
	var current = new Date();
	var year	= ""+current.getFullYear();
	var month	= "";

	if (current.getMonth()+1 < 10) {
		month = "0"+(current.getMonth()+1);
	} else {
		month = ""+(current.getMonth()+1);
	}

	var date		= "";

	if (current.getDate()+1 < 10) {
		date = "0"+current.getDate();
	} else {
		date = ""+current.getDate();
	}

	return year+month+date;
}

// Get Today Date Time.
function getDateTime() {
    var current = new Date();

    var year		= ""+current.getFullYear();

    var month	= "";
		if (current.getMonth()+1 < 10) {
			month = "0"+(current.getMonth()+1);
		} else {
			month = ""+(current.getMonth()+1);
		}
    var date		= "";
		if (current.getDate() < 10) {
			date = "0"+current.getDate();
		} else {
			date = ""+current.getDate();
		}

	var hours	= "";
		if (current.getHours() < 10) {
			hours = "0"+current.getHours();
		} else {
			hours = ""+current.getHours();
		}

	var minutes = "";
		if (current.getMinutes() < 10) {
			minutes = "0"+current.getMinutes();
		} else {
			minutes = ""+current.getMinutes();
		}
	var seconds = "";
		if (current.getSeconds() < 10) {
			seconds = "0"+current.getSeconds();
		} else {
			seconds = ""+current.getSeconds();
		}

	return year+month+date+hours+minutes+seconds;
}

function getFormValue(frm, nm, seq) {
	var obj = null;

	if (seq >= 0) {
		obj = frm.elements[nm][seq];
	} else {
		obj = frm.elements[nm];
	}

	if( obj ) {
		if(obj.type=='text')		return obj.value;
		else if(obj.type=='hidden')	return obj.value;
		else if(obj.type=='select-one')	return selectValue( obj );
		else if(obj.type=='radio')	return radioValue( obj );
		else if(obj.type=='textarea')	return obj.value;
	}
	return "";
}

function setFormValue(frm, nm, val) {
	var obj = frm.elements[nm];

	if( obj ) {
		if(obj.type=='text')		obj.value = val;
		else if(obj.type=='hidden')	obj.value = val;
		else if(obj.type=='select-one')	setSelectValue( obj, val );
		else if(obj.type=='radio')	setRadioValue( obj,val );
		else if(obj.type=='textarea')	obj.value = val;
	}
}

// [ntarget] - String Length Check (Byte)
function chkByteLength(contents) {
	var space=0,Latin=0;
	for(var i = 0; i < contents.length; i++)   {
		Latin = escape(contents.charAt(i)).length;
		if(Latin == 6) space++;
		space++;
	}
	return space;
}

// Date Validation.
function isValidDate(dateValue) {
	var pt = /^\d{4}\d{2}\d{2}$/;
	if (!pt.test(dateValue)) return false;
	var y = parseInt(dateValue.substr(0,4), 10);
	var m = parseInt(dateValue.substr(4,2), 10) - 1;
	var d = parseInt(dateValue.substr(6,2), 10);

	var dt = new Date(y, m, d);

	if (dt.getYear() == y && dt.getMonth() == m && dt.getDate() == d) {
		return true;
	}else{
		return false;
	}
}

function checkAll(check1, check2) {
	var existobj = eval(check2);
	var isChecked = check1.checked;

	if (existobj != null) {
		var lenobj = eval(check2.length);
		if(lenobj != null){
			for(var i = 0; i < check2.length; i++){
				check2[i].checked = isChecked;
			}
		}else{
			check2.checked = isChecked;
		}
	}
}

/*
 * 객체가 널값이면 리턴 값을 반환한다.
 *
 * Usage: nvl(val, ret)
 */
function nvl(val, ret) {
	if(isNull(val) || isUndefined(val)) {
		return ret;
	} else {
		return val;
	}
}


/*
 * 객체가 널값인지 확인한다.
 *
 * Usage: isNull(value)
 */
function isNull(value) {
    return value == null;
}

/*
 * 객체가 빈값인지 확인한다.
 *
 * Usage: isEmpty(value)
 */
function isEmpty(value) {
	if (isNull(value)) {
        return true;
    }

    if (typeof(value) == "string") {
        return trim(value) == "";
    }

    return false;
}

/*
 * 객체가 undefined 형태인지 확인한다.
 *
 * Usage: isUndefined(value)
 */
function isUndefined(value) {
	if(typeof(value)==undefined || type(value)=="undefined" || value=="undefined" || value==undefined) {
		return true;
	}
	return false;
}


// 사용자 ID 검사
function isValidUserId(value){
    var pattern = /^[a-zA-Z0-9.]{6,20}$/;
    return (pattern.test(value));
}

// 파일 첨부에서 허용된 파일 형식인지 확인.
// fullFileNm : 전체 파일명
// allowedExtNms : 허용된 확장명 문자열 (ex : txt,xls,pdf)
function isAtthAllowedFileType(fullFileNm, allowedExtNms) {
    //-----------------------------
    // 제한된 확장명이 전달되지 않으면 무조건 허용.
    //-----------------------------
    if(allowedExtNms == undefined || allowedExtNms == null || allowedExtNms == '') {
        return true;
    }

    var allowedExtNmsTm = "|"+allowedExtNms.replace(new RegExp(",", 'g'), "|") + "|";
    allowedExtNmsTm = allowedExtNmsTm.toUpperCase();

    var extNm = fullFileNm.substring( fullFileNm.toLowerCase().lastIndexOf(".") + 1 );
    var extNmTm = extNm.toUpperCase() +"|";

    if(allowedExtNmsTm.indexOf(extNmTm) >= 0){
        return true;
    }else{
        return false;
    }
}

//암호 검사
function isValidPassword(upw) {
    var isValid = true;

    if(upw.length < 8) {
    	isValid = false;
    }
    
    // 특수문자 조합 사용 시 설정
//    if(upw.length < 6) {
//    	isValid = false;
//    }

    if(!/([a-zA-Z0-9])/.test(upw)) {
    	//alert('비밀번호는 문자, 숫자, 특수문자 조합의 9자리 이상으로 입력해주세요.');
    	return false;
    }
//    if(!/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,(,)])|([!,@,#,$,%,^,&,*,?,_,~,(,)].*[a-zA-Z0-9])/.test(upw)) {
//    	//alert('비밀번호는 문자, 숫자, 특수문자 조합의 9자리 이상으로 입력해주세요.');
//    	return false;
//    }

    var chk_num = upw.search(/[0-9]/g);
    var chk_eng = upw.search(/[a-z]/ig);

    // 영문, 숫자은 꼭 입력하게 ...
    if (chk_num < 0 || chk_eng < 0) {
    	//alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.');
    	return false;
    }

    return isValid;
}

function getMeta(string) {
    var replace = "";

    var pattern = new RegExp("([\\$\\(\\)\\*\\+\\.\\[\\]\\?\\\\\\^\\{\\}\\|]{1})", "");

    for (var i = 0; i < string.length; i++) {
        if (pattern.test(string.charAt(i))) {
            replace = replace + string.charAt(i).replace(pattern, "\\$1");
        }
        else {
            replace = replace + string.charAt(i);
        }
    }

    return replace;
}

function toNumeric(string) {
    var pattern = new RegExp("[^0-9]", "g");
    return string.replace(pattern, "");
}

// 사업자등록번호 검사.
function isBizRegNo(string, delimiter) {
    if(delimiter == undefined || delimiter == null) {
        delimiter = "";
    }

    var pattern = new RegExp("[0-9]{3}" + getMeta(delimiter) + "[0-9]{2}" + getMeta(delimiter) + "[0-9]{5}$", "");

    var bizRegNo = string.match(pattern);

    if (bizRegNo == null) {
        return false;
    }

    bizRegNo = toNumeric(bizRegNo.toString());
    var sum = parseInt(bizRegNo.charAt(0), 10);
    var mod = [0, 3, 7, 1, 3, 7, 1, 3];

    for (var i = 1; i < 8; i++) {
        sum = sum + ((parseInt(bizRegNo.charAt(i), 10) * mod[i]) % 10);
    }

    sum = sum + Math.floor(parseInt(parseInt(bizRegNo.charAt(8), 10), 10) * 5 / 10);
    sum = sum + ((parseInt(bizRegNo.charAt(8), 10) * 5) % 10 + parseInt(bizRegNo.charAt(9), 10));

    return sum % 10 == 0;
}

//주민등록번호 검사.
function isUsrRegNo( regnno ) {
    if (!regnno)
       return false;

    if (regnno.length == 0)
       return false;

    var str = regnno.replace(/-/g,"");

    if (str.length != 13)
        return false;

    var sex = parseInt(str.substring(6, 7));

    if (sex == 1 ||
        sex == 2 ||
        sex == 3 ||
        sex == 4 ) {

        var tmp = 0;
        for (var i = 0; i < 12 ; i++) {
            tmp += ((i%8+2) * parseInt(str.substring(i,i+1)));
        }
        tmp = 11 - (tmp %11);
        tmp = tmp % 10;
        if (tmp != parseInt(str.substring(12, 13))) {
            return false;
        }
        return true;
    }
    // 1900년대 출생 여자는 6,
    // 2000년대 출생 남자는 7,
    // 2000년대 출생 여자는 8 추가 (20071211 ssk)
    else if (sex == 5 ||
             sex == 6 ||
             sex == 7 ||
             sex == 8 )
        return true;

    return  false;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++
//jquery.mask 관련 공통함수
//++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++

//달력표시칼럼 포맷으로 셋팅한다.
$.fn.toCalendarField = function( args ) {
    var initToday = false;
    var callBack  = false;
    var isValidCheck = false;
    var isSetCalBtn  = false;

    if (typeof args === 'object') {
        initToday = args.initToday;
        callBack  = args.callBack;
        isValidCheck = args.isValidCheck;
        isSetCalBtn = args.isSetCalBtn;
    }
    else if (args == true)
        initToday = true;

    //initToday가 true 이면 빈값인 경우 현재날짜로 값을 설정한다.
    if (initToday &&
            isEmpty(this.val()))
        this.val( getToday("-") );

    // 필드에 날짜 마스크를 바인딩한다.
    this.setMask({ mask:"9999-19-39" });

    // jquery 달력 객체 생성
    if(isSetCalBtn)
        this.datepicker({dateFormat : 'yy-mm-dd'});

    this.bind({
        blur : function(){
            if(isValidCheck) {
                if(isDate( $(this).val().split("-").join("") ) == false) {
                    alert("날짜형식에 맞지 않습니다.ㅣ");
                    $(this).focus();
                }
            }
        }
    });
};

//실수칼럼 포맷으로 셋팅한다.
$.fn.toFloatField = function() {
    $.mask.rules = $.extend($.mask.rules, {
         "#":/[\,\.0-9]/
    });

    // 필드에 실수 마스크를 바인딩한다.
    //this.setMask({ mask:"999.999,999,999", type:"reverse" });
    this.setMask({ mask:"#", type:"repeat" });

    var fn = {
         keydown:function(event) {
             if (event.which == 190) {
                 if ($(this).val().indexOf(".") >= 0) {
                     return false;
                 }
             }
         },
         keyup:function(event) {
             var value = delCommaStr($(this).val());

             var index = value.indexOf(".");

             if (index >= 0) {
                 if (value.substring(index).length >= 4) {
                     value = value.substring(0, index + 4);
                 }

                 if (index == 0) {
                     value = "0" + value;
                 }
             }

             $(this).val(addCommaStr(value));
         },
         focusout:function(event) {
             var value = delCommaStr($(this).val());

             var index = value.indexOf(".");

             if (index >= 0) {
                 if (value.substring(index).length >= 4) {
                     value = value.substring(0, index + 4);
                 }

                 if (index == value.length - 1) {
                     value = value.substring(0, index);
                 }

                 if (index == 0) {
                     value = "0" + value;
                 }
             }

             $(this).val(addCommaStr(value));
         }
    };

    // 필드에 키다운 이벤트를 바인딩한다.
    this.bind("keydown", fn.keydown);

    // 필드에 키업 이벤트를 바인딩한다.
    this.bind("keyup", fn.keyup);

    // 필드에 포커스아웃 이벤트를 바인딩한다.
    this.bind("focusout", fn.focusout);
};

//숫자 포멧으로 설정.
$.fn.toNumberField = function() {
    this.setMask({ mask : '999,999,999,999,999,999,999,999', type : 'reverse' });
};

//사업자등록번호 필드로 변환한다.
$.fn.toBizRegNoField = function() {
    // 필드에 사업자등록번호 마스크를 바인딩한다.
    this.setMask({ mask:"999-99-99999" });
};

//주민등록번호 필드로 변환한다.
$.fn.toUsrRegNoField = function() {
    // 필드에 사업자등록번호 마스크를 바인딩한다.
    this.setMask({ mask:"999999-9999999" });
};

//전화번호 필드로 변환한다.
$.fn.toPhoneNoField = function() {
  // 필드에 키업 이벤트를 바인딩한다.
  this.bind("keyup", function(event) {
       var value = toNumeric($(this).val());

       $(this).val(value);

       if (value.indexOf("0") == 0) {
           if (value.indexOf("02") == 0) {
               if (value.length < 10) {
                   $(this).setMask({ mask:"99-999-99999" });
               } else {
                   $(this).setMask({ mask:"99-9999-9999" });
               }
           } else {
               if (value.length < 11) {
                   $(this).setMask({ mask:"999-999-99999" });
               } else {
                   $(this).setMask({ mask:"999-9999-9999" });
               }
           }
       } else {
           if (value.length < 8) {
               $(this).setMask({ mask:"999-99999" });
           } else {
               $(this).setMask({ mask:"9999-9999" });
           }
       }
  });
};

//바이트제한 칼럼을 셋팅한다.
$.fn.toByteLimitField = function( args ) {
    //최대 1000 BYTE
    var limit = 1000;

    if (args) {
      if (typeof args == 'object') {
          limit = (args.limit || limit);
      } else
          limit = args;
    }

    var val = this.val();

    var fn = {
         keydown:function(event) {

             if (event.which != 8  &&
                 event.which != 46 &&
                 chkByteLength($(this).val()) >= limit) {
                 return false;
             }
         },
         paste: function() {
             var len = chkByteLength($(this).val());
             if (len >= limit) {
                 alert("최대 입력BYTE (최대:"+limit+", 입력:"+len+")를 초과하였습니다.");
                 $(this).val("");
                 return false;
             }
         }
    };

    // 필드에 키다운 이벤트를 바인딩한다.
    this.bind("keydown", fn.keydown);
    this.bind("paste"  , fn.paste);
};


//필드값의 실수형을 반환한다.
$.fn.getFloat = function() {
    var v = this.val();

    // 필드에 입력된 값을 포맷한다.
    if (isEmpty(v))
      return 0;

    v = delCommaStr(v);

    return parseFloat(v);
};

// LPAD
function lpad(str, len, padStr) {
	var rtn = str;

    while(rtn.length < len)
    	rtn = padStr + rtn;

    return rtn;
}

// RPAD
function rpad(str, len, padStr) {
	var rtn = str;

    while(rtn.length < len)
    	rtn += padStr;

    return rtn;
}

