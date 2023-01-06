/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie. */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,

		/* ntarget : option 추가 */
		showButtonPanel: true,		// 오늘, 닫기버튼 영역 나옴.
		changeMonth: true,			// 월 선택가능하게
		changeYear: true,			// 년 선택가능하게
		showOn: 'button', // 우측에 달력 icon 을 보인다.
		buttonImage: '/images/calendar.gif',  	// 우측 달력 icon 의 이미지 패스
		buttonImageOnly: true, 					//  inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)

		yearSuffix: '년'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});
