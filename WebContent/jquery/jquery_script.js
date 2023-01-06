// request1_step2.html 의뢰신청하기 레이어팝업창
 $(document).ready(function(){
	$(".apply_btn").click(function(){
		var openLayer = "apply_wrap"+$(this).attr("class").split("apply_btn")[1];
		$(".apply_wrap").fadeOut(0);
		$("."+openLayer).fadeIn(100);
		return false;
	});

	$(".apply_bg, .no").click(function(){
		$(".apply_wrap").fadeOut(100);
		return false;
	});
	
	$(".apply_bg").click(function(){
		$(".apply_wrap").click();
		return false;
	});
	
	resize();
	function resize(){
		var obj = $(".apply_wrap .list"),
		w = obj.width() / 2;
		h = obj.height() / 2;
		
		obj.css({marginLeft : '-'+w+'px', marginTop : '-' +h+ 'px'});
	}
	$(window).resize(resize);
});

// 지도검색 윈도우 팝업창
function popupOpen(){
	// 바뀐 부분1
	var popUrl = "/diag/searchMap.do";	//팝업창에 출력될 페이지 URL
	var popOption = "width=1000, height=600, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
		window.open(popUrl,"",popOption);
	}		

// 지도검색 윈도우 팝업창
function popupOpenDetail(){
	// 바뀐 부분1
	var popUrl = "/diag/searchMapDetail.do";	//팝업창에 출력될 페이지 URL
	var popOption = "width=1000, height=600, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
	window.open(popUrl,"",popOption);
}		
	
//죽어있음 클릭시
//$(document).ready(function(){
//	alert("docu script in");
//	alert($(".live").val());
//	$("input.live").click(function(){
//		$(this).attr("checked","checked");
//		$("tr.lock").removeClass("on");
//		$("tr.lock input").removeAttr("disabled");
//	});
//	$("input.die").click(function(){
//		alert("die");
//		$(this).attr("checked","checked");
//		$("tr.lock").addClass("on");
//		$("tr.lock input").attr("disabled","disabled");
//	});
//});

// 살아있음 클릭 시
function liveClick(){
	$(this).attr("checked","checked");
	$("tr.lock").removeClass("on");
	$("tr.lock input").removeAttr("disabled");
}

// 죽어있음 클릭 시
function dieClick() {
	$(this).attr("checked","checked");
	$("tr.lock").addClass("on");
	$("tr.lock input").attr("disabled","disabled");
}