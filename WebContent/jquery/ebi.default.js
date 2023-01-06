/* ************************ COMMON **************************** */
//ie8 콘솔로그 오류 제거
var console = window.console || {log:function(){}};

// 가속도
var easingType1 = "easeInOutExpo";
var easingType2 = "easeInOutCubic";

// 최상단 올리기
$(document).ready(function () {
	$(window).scroll(function(){
		var scTop = $(window).scrollTop();
		if (scTop > $("header").outerHeight()) {
			$("#gotop").fadeIn(300);
		} else {
			$("#gotop").fadeOut(300);
		}
	});
	$("#gotop").click(function(){
		$("html, body").stop().animate({scrollTop:0}, 500);
		return false;
	});
});

// 접속한 기기가 PC인지 Mobile인지 체크
var deviceCk = "win16|win32|win64|mac|macintel";
var device;
if(navigator.platform){
	if( deviceCk.indexOf(navigator.platform.toLowerCase())<0 ){
		device = "mobile";
	}else{
		device = "pc";
		$("[href*='tel:']").contents().unwrap(); //PC면 tel링크 안 먹게 하기.
		$("area[href*='tel:']").remove();
	}
}

// 가로크기 기준으로 정사각형 만들기
$(document).ready(function(){
	if($("*").hasClass("square")){
		var maxW;
		$(window).resize(function(){
			$(".square").children().css({height:""});
			$(".square ").each(function(idx){
				maxW = $(".square:eq("+idx+")").children().outerWidth();
				$(".square:eq("+idx+")").children().css({height:maxW});
			});
		});
		return false;
	}
});

// 자식들 높이 같게 만들기
$(window).load(function(){
	if($("*").hasClass("sameH")){
		var maxH;
		$(window).resize(function(){
			 $(".sameH").children().css({minHeight:""});
			 $(".sameH").each(function(idx){
				var itemH = $(".sameH:eq("+idx+")").children().map(function(){
					return $(this).outerHeight();
				}).get(),
				maxH = Math.max.apply(null, itemH);
				$(".sameH:eq("+idx+")").children().css({minHeight:maxH});
				console.log(idx+"번째 : "+maxH);
			 });
		});
		$(window).resize();
		return false;
	};
});

// 자식들 높이 같게 만들기 + 자식 첫번째 요소 높이 100%
// 태블릿 이상에서 적용
$(document).ready(function(){
	if($("*").hasClass("sameH_maxH")){
		var maxH;
		$(window).resize(function(){
			$(".sameH_maxH").children().css({minHeight:""});
			// $(".sameH_maxH").children().children().css({minHeight:""});
			if($(window).width()>767){
				$(".sameH_maxH").each(function(idx){
					var itemH = $(".sameH_maxH:eq("+idx+")").children().map(function(){
						return $(this).height() + 1;
					}).get(),
					maxH = Math.max.apply(null, itemH);
					$(".sameH_maxH:eq("+idx+")").children().css({minHeight:maxH, overflow:"hidden"});
					// $(".sameH_maxH:eq("+idx+")").children().children().css({minHeight:maxH, overflow:"hidden"});
					console.log(idx+"번째 : "+maxH);
				});
			}
		});
		return false;
	};
});

// 부모 높이와 같게 만들기
$(window).load(function(){
	if($("*").hasClass("momH")){
		var maxH;
		$(window).resize(function(){
			 $(".momH").css({minHeight:""});
			 $(".momH").each(function(idx){
				maxH = $(".momH:eq("+idx+")").parent().height();
				$(".momH:eq("+idx+")").css({minHeight:maxH});
				console.log(idx+"번째 : "+maxH);
			 });
		});
		 $(window).resize();
		return false;
	};
});

// 갤러리 가로크기 기준으로 이미지 높이 정사각형으로 만들기
$(document).ready(function(){
	if($("*").hasClass("imgfull")){
		$(".imgfull").css({maxWidth:"",minWidth:"",maxHeight:"",minHeight:""});
		$(".imgfull .img").css({maxWidth:"",minWidth:"",maxHeight:"",minHeight:""});
		var maxW;
		$(window).resize(function(){
			maxW = $(".imgfull .img").eq(0).width();
			$(".imgfull .img").css({height:maxW,overflow:"hidden"});
		});
		return false;
	}
});

// 갤러리등 이미지를 부모의 BG로 깔아버리고 안 보이게 하기
$(document).ready(function(){
	if($("*").hasClass("insertBg")){
		$(".insertBg .img").css({overflow:"hidden"});
		$(".insertBg img").each(function(){
			$(this).css({display:"none"});
			$(this).parent().css({
				display:"block",width:"100%",height:"100%",
				backgroundImage:"url("+$(this).attr("src")+")",
				backgroundRepeat:"no-repeat",
				backgroundPosition:"50%",
				backgroundSize:"cover"});
		});
	};
});