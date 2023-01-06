/* **********************************************************
- lnb 모션에 transform 사용
********************************************************** */
$(document).ready(function(){
	// 가속도
	var easingType1 = "easeInOutExpo";
	var easingType2 = "easeInOutCubic";

	var onmenu;//활성 메뉴
	var nowmenu;//현재 클릭 메뉴
	var speed = 200;//lnb 열림,닫힘 시간 / 1초=1000

	/* ********************* PC ******************** */
	$(function pcFn(){
		/* ON 메뉴 찾기 */
		onmenu = $("nav .lnb>ul>li.on").index();
		if(onmenu<0){
			onmenu = "null";
		}

		var orgH = $("nav .lnb").attr("data-orgH");
		var navH = $("nav .lnb").attr("data-maxH");
		var leftPos = $("nav .lnb").attr("data-leftPos");
		var gap = $("nav .lnb").attr("data-gap");

		$("nav").css({height:orgH});
		$("nav .lnb").css({height:"",left:leftPos});
		$("nav .lnb>ul>li").each(function(){
			$(this).css({paddingRight:gap}).children("ul").css({width:$(this).outerWidth()-20});
		});

		$("header").on("mouseenter focusin",function(){//열림
			$("nav").stop().animate({height:navH}, speed);
			return false;
		}).on("mouseleave focusout",function(){//닫힘
			$("nav").stop().animate({height:orgH}, speed);
			return false;
		});
	});//end pc
	
});//end document.ready