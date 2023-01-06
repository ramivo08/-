// ********************************** 해당 사이트에만 실행되는 스크립트 / 모두 지운 후 사용 ***********************************/

// 탭
$(document).ready(function(){
	var tabNow;
	$(".tab_con > ul > li").css({display:"none"});
	$(".tab").on("focusin mouseenter", function(){
		tabNow = $(this).index(".tab");
	});

	$(".tab li").on("focusin", function(){
		$(".tab:eq("+tabNow+") li").attr("class","off");
		$(this).attr("class","on");
	});

	$(".tab li").on("click", function(){
		var num = $(this).index()
		$(".tab_con:eq("+tabNow+") > ul > li").css({display:"none"});
		$(".tab_con:eq("+tabNow+") > ul > li").eq(num).css({display:"block"});
		$(this).attr("class","on");
	});

	$(".tab").each(function(idx){
		$(".tab:eq("+idx+") > ul > li:first").addClass("on");
		$(".tab_con:eq("+idx+") > ul > li:first").css({display:"block"});
	});
});


// 탭2 (야생동물 질병진단->개체별 검사항목관리)
//$(document).ready(function(){
//	$(".tab2_con>ul>li:last").css({display:"none"})
//
//	$(".tab2 .ra1").click(function(){
//		$(".tab2_con>ul>li:first").css({display:"block"});
//		$(".tab2_con>ul>li:last").css({display:"none"})
//	});
//	$(".tab2 .ra2").click(function(){
//		$(".tab2_con>ul>li:first").css({display:"none"});
//		$(".tab2_con>ul>li:last").css({display:"block"})
//	});
//});


// 메인 퀵버튼 이미지on,off
$(document).ready(function(){
	$(".visual ul li").mouseenter(function() {
		$(this).find('img').attr('src',$(this).find('img').attr('src').replace('_off.png','_on.png'));
	})
	$(".visual ul li").mouseleave(function(){
		$(this).find('img').attr('src',$(this).find('img').attr('src').replace('_on.png','_off.png'));
	});
});

// admin 팝업창
$(document).ready(function(){
	$("a").click(function(){
		if($(this).attr("data-name")){
			var openName = $(this).attr("data-name");
			var openLL ="open_"+openName;
			$("* [class ^= 'open_' ]").fadeOut(0);
			$("."+openLL).css({visibility:"visible"}).fadeIn(100);
			return false;
		};
	});

	$("* [class ^= 'open_' ] .clo").click(function(){
		$("* [class ^= 'open_' ]").fadeOut(100);
		return false;
	});

	$(".bg").click(function(){
		$("* [class ^= 'open_' ] .clo").click("");
		return false;
	});

	resize();
	function resize(){
		var obj = $("* [class ^= 'open_' ] .join_layer"),
		w = obj.width() / 2;
		h = obj.height() / 2;

		obj.css({marginLeft : '-'+w+'px', marginTop : '-' +h+ 'px'});
	}
	$(window).resize(resize);
});

// 법령정보
$(function(){
	$(".expand_title").click(function() {
		$(this).toggleClass("clicked")
			.next()
			.slideToggle(200);
		$(".expand_title").not(this)
			.removeClass("clicked")
			.next()
			.slideUp(200);
	});
	$(".expand_title").eq(0).click();
});

//테이블 하단 버튼 (처음이전 ~ 다음끝)
$(document).ready(function(){

	$(".btnbox_move>div a:first-child").addClass("a3 a_fff");/*1번버튼 on*/

	$(".move_group1").on("click", function(){
		$(".btnbox_move a").removeClass("a1 a2 a3 a4 a_fff");
		$(this).addClass("a_fff a1");
	});
	$(".btnbox_move > div a").on("click", function(){
		$(".btnbox_move a").removeClass("a1 a2 a3 a4 a_fff");
		$(this).addClass("a2 a_fff");
	});
	$(".btnbox_move > div > a:first-child").on("click", function(){
		$(".btnbox_move a").removeClass("a1 a2 a3 a4 a_fff");
		$(this).addClass("a3 a_fff");
	});
	$(".btnbox_move > div > a:last-child").on("click", function(){
		$(".btnbox_move a").removeClass("a1 a2 a3 a4 a_fff");
		$(this).addClass("a4 a_fff");
	});
});

// 파일 추가삭제
$(document).ready(function(){
	var filecount = new Array;
	var inpName = "upfile";//인풋 네임	[ntarget] : fileNum -> upfile
	var inpId = "fileName";//인풋 아이디

	if($("*").hasClass("fileWrap")){
		$(".fileWrap").each(function(idx){
			filecount[idx] = 0;
			$(".fileWrap").eq(idx).find("input").attr("name",inpName+idx);

			/* 추가하기 */
			$(".fileWrap:eq("+idx+") .plus").click(function(){
				filecount[idx] ++;
				$(this).parents().siblings(".fileDiv:last").clone().appendTo($(".fileWrap").eq(idx));
				$(".fileWrap")
					.eq(idx).find(".fileDiv").last()
					.find("input").attr("name",inpName+filecount[idx])
					.last().attr("id",inpId+filecount[idx]);
				$(".fileWrap").eq(idx).find(".fileDiv").last().find("label").attr("for",inpId+filecount[idx]);
				$(".fileWrap").eq(idx).find(".fileDiv").last().find(".upload-name").val("파일선택");
				$(".fileWrap:eq("+idx+")").find(".fileDiv").last().find("input[name*='"+inpName+"']").attr("checked",false);
				chFile();
			});

			/* 삭제하기 */
			var fileMax = 1;
			var checkMax = 0;
			$(".fileWrap:eq("+idx+") .minus").click(function() {
				var checkDiv = $(".fileWrap:eq("+idx+") input[name*='"+inpName+"']:checked");
				fileMax = $(".fileWrap:eq("+idx+") .fileDiv").length; //전체체크박스 갯수
				checkMax = $(".fileWrap:eq("+idx+") input[name*='"+inpName+"']:checked").length; //선택한 체크박스 갯수

				if(checkMax<fileMax){ //체크한게 전체보다 작으면 그냥 삭제처리.
					checkDiv.parent().parent().parent().parent().remove();
				}
				else if(fileMax=checkMax && fileMax>1){//체크가 전체 갯수와 같으면 모두 지우 되 첫번째는 파일명글자만 제거
					$(".fileWrap:eq("+idx+") .fileDiv:gt(0)").remove();
					$(".fileWrap:eq("+idx+") input[name*='"+inpName+"']").attr("checked",false);
					$(".fileWrap:eq("+idx+") .fileDiv:eq(0) .upload-name").val("파일선택");
					$(".fileWrap:eq("+idx+") .fileDiv:eq(0) .upload-hidden").val("");

				}
				else	if(fileMax=1){
					$(".fileWrap:eq("+idx+") .fileDiv .upload-name").val("파일선택");
					$(".fileWrap:eq("+idx+") .fileDiv .upload-hidden").val("");
					$(".fileWrap:eq("+idx+") input[name*='"+inpName+"']").attr("checked",false);
				}
			});

			/* 파일명 삽입 */
			function chFile(){
				var fileTarget = $(".fileWrap:eq("+idx+") .fileDiv .upload-hidden");
				var filename = "";
				fileTarget.on("change", function(){  // 값이 변경되면
					if(window.FileReader){// modern browser
						filename = $(this)[0].files[0].name;
					} else { // old IE
						filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
					}

					if(!isAtthAllowedFileType(filename, _ALLOWED_FILE_EXTS)) {
						nAlert(MSG_COMM_2012);
				        $(this).replaceWith($(this).clone(true));
				        $(this).siblings('.upload-name').val('파일선택');
					} else {
						// 추출한 파일명 삽입
						$(this).siblings('.upload-name').val(filename);
					}
				});
			};chFile();
		});//end each
	};//end if - hasClass


});//end ready

//프로세스 내용 열고접기
$(function(){
	$(".process_title").click(function() {
		$(this).toggleClass("clicked")
			.next()
			.slideToggle(200);
//		$(".process_title").not(this)
//			.removeClass("clicked")
//			.next()
//			.slideUp(200);
	});
//	$(".process_title").eq(0).click();
	/* .expand_title에 off 넣을 경우 모두 닫힌상태에서 창 열림 */
	if($('.process_title').hasClass('off')){
		$(".process_title").removeClass('clicked').next().css({display:'none'});
	}
});

//데이터 반복 내용 열고접기
$(function(){
	$(".data_title").click(function() {
		$(this).toggleClass("clicked")
		.next()
		.slideToggle(200);
//		$(".process_title").not(this)
//			.removeClass("clicked")
//			.next()
//			.slideUp(200);
	});
//	$(".process_title").eq(0).click();
	/* .expand_title에 off 넣을 경우 모두 닫힌상태에서 창 열림 */
	if($('.data_title').hasClass('off')){
		$(".data_title").removeClass('clicked').next().css({display:'none'});
	}
});
