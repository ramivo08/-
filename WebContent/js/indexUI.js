var f_date = new Date();
var $tabs;
var legendId = 0;

function Acc(selector){
	this.init(selector);
};

Acc.prototype.init=function(selector){
	this.selector = selector; 
	this.eventDefine(); 
};

Acc.prototype.eventDefine=function(){
	var obj = this; 
	this.target = this.selector.children("li"); 
	this.target.children("a").on("click", function(){
		var parent = $(this).parent(); 
		parent.toggleClass("active");
		if(parent.hasClass("active") && $(this).next(".acc_cont").length !=0){
			$(this).next(".acc_cont").slideDown("fast"); 
		}else{
			$(this).next(".acc_cont").slideUp("fast"); 
		};
	}); 
}; 

/**************************************/

function AsideDisplay(){
	this.init(); 
}; 

AsideDisplay.prototype.init=function(){
	this.eventDefine(); 
}; 

AsideDisplay.prototype.eventDefine=function(){
	var objThis=this; 
	$(".main_menu").on("click", function(){
		$(this).toggleClass("active"); 

		if($(this).hasClass("active")){
			if($(".dep1_aside").hasClass("extend")){
				$(".dep1_aside").removeClass("extend");
			}; 
			$(".dep1_aside").show(); 
		}else{
			$(".ui_aside").hide(); 
		}; 
		objThis.asideWSum(); 
	});

	$(".left_dep1 > li > a").on("click", function(){
		var parent = $(this).parent(); 
		parent.addClass("active"); 
		parent.siblings().removeClass("active"); 

		$(".dep2_aside").find(".left_dep2").hide(); 

		var showBox = $(".dep2_aside").find(".left_dep2").filter("#box" + (parent.index() + 1))
		showBox.show(); 
//		if(showBox.find(".sub_list li").hasClass("active")){
//			$(".left_dep3").show(); 
//		} else {
//			$(".left_dep3").hide(); 
//		};
		
		objThis.asideWSum();
	}); 
	
	$(".dep1_extend").on("click", function(){
		$(".dep1_aside").toggleClass("extend"); 

		if(!$(".dep1_aside").hasClass("extend")){
			
		}
		objThis.asideWSum();
	}); 

    $(".left_dep2 .sub_list button.toggle").on("click", function(){
    	var parentID = $(this).parent().prop("id");
    	if(parentID != ""){
    		$(".left_dep2.ui_aside").each(function(i, item){
    			$(this).find(".sub_list").find("li#"+parentID).toggleClass("active");
    		});
    	}else{
    		$(this).parent().toggleClass("active"); 
    	}

		//3depth 메뉴 처리
//		if(/*$("#aws").hasClass('active') || */$("#image").hasClass('active') || $("#northaws").hasClass('active') || $("#userSensor_tif").hasClass('active')){
//			$(".left_dep3").show();
//		} else {
//			if($("#widget_list").children().length == 0) {
//				$(".left_dep3").hide();
//			}
//		}
		objThis.asideWSum(); 
	});

	$(".widget_box .widget_close").on("click", function(){
		$(this).parents(".widget_box").remove(); 
	}); 

	$(".all_close").on("click", function(){
		$(".ui_aside").hide(); 
		objThis.asideWSum(); 
	});

	$(".alert_btn").on("click", function(){
		$(this).toggleClass("active"); 
		$(this).siblings().removeClass("active"); 

		$(".right_aside .right_box").hide();
		if($(this).hasClass("active")){
			$(".right_aside .alert_wrap").show(); 
		}else{
			$(".right_aside .alert_wrap").hide(); 
			selectemd_source.clear();
			ufam_group.setVisible(false);
			removePastLayer('kma-expresszone-preview');
		}
		
		objThis.asideWSum(); 
	}); 

	$(".time_btn").on("click", function(){
		$(this).toggleClass("active");
		$(this).siblings().removeClass("active"); 

		$(".right_aside .right_box").hide();
		if($(this).hasClass("active")){
			$(".right_aside .time_wrap").show(); 
		}else{
			$(".right_aside .time_wrap").hide(); 
		}
		
		objThis.asideWSum(); 
	}); 

	$(".bg_map_btn").on("click", function(){
		$(this).toggleClass("active");
		$(this).siblings().removeClass("active"); 

		$(".right_aside .right_box").hide();
		if($(this).hasClass("active")){
			$(".right_aside .bg_map_wrap").show(); 
		}else{
			$(".right_aside .bg_map_wrap").hide(); 
		}

		objThis.asideWSum(); 
	}); 

	$(".common_btn").on("click", function(){
		$(this).toggleClass("active");
		$(this).siblings().removeClass("active"); 

		$(".right_aside .right_box").hide();
		if($(this).hasClass("active")){
			$(".right_aside .common_wrap").show(); 
		}else{
			$(".right_aside .common_wrap").hide(); 
		}

		objThis.asideWSum();
	});

}; 

AsideDisplay.prototype.asideWSum=function(){
	var leftContainer = $(".left_aside"); 
	var leftAside = leftContainer.find(".ui_aside");
	var leftWSum=0; 

	var rightContainer = $(".right_aside"); 
	var rightAside = rightContainer.find(".right_box");
	var rightWSum=0; 

	leftAside.each(function(){
		if($(this).css("display") == "block"){
			leftWSum += $(this).outerWidth(); 
		}; 
	}); 

	rightAside.each(function(){
		if($(this).css("display") == "block"){
			rightWSum += $(this).outerWidth(); 
		}; 
	});

	$(".content_container").css({"left":leftWSum+"px", "right":rightWSum+"px"}); //수정 
	map_update();
}; 

/**************************************/

function Tooltip(selector){
	this.init(selector) ;
}; 

Tooltip.prototype.init=function(selector){
	this.selector = selector; 
	this.toolTarget = null; 
	this.toolTip = $(".tooltip"); 
	this.eventDefine(); 
}; 

Tooltip.prototype.eventDefine=function(){
	var objThis=this;
	this.selector.on("mouseenter", function(e){
		if($(this).parents(".dep1_aside").length!=0){
			if(!$(this).parents(".dep1_aside").hasClass("extend")){
				  objThis.tipShow(e);
			}
		}else{
			objThis.tipShow(e); 
		};
	});//mouseenter

	this.selector.on("mouseleave", function(){
		if(objThis.toolTarget){
			objThis.toolTarget.hide()
		};
	}); 
}; 

Tooltip.prototype.tipShow=function(e){
	var $this=$(e.currentTarget); 
	if($this.attr("data-tooltip")){
		var dlr = $this.attr("data-tipdlr"); 
		var txt = $this.attr("data-tooltip"); 
		var posY = $this.offset().top; 
		var posX = $this.offset().left;
		
		this.toolTarget = this.toolTip.filter("."+dlr); 
		this.toolTarget.find(".toolbox").text(txt); 

		if(dlr == "left"){
			if($this.hasClass("legend_btn")){
				posX = posX + 15;
				posY = posY - $this.outerHeight();
			}

			posX = posX + $this.outerWidth() - 3; 
			posY = posY - $this.outerHeight() + this.toolTip.filter("."+dlr).height()/2 - 5 ;
		}else{
			posY = posY - 60 - $this.outerHeight() -10 ; 
			posX = posX - this.toolTarget.outerWidth()/2 + $this.width()/2 ;
		}; 
		this.toolTarget.css({"left" : posX+"px", "top" : posY+"px"}).show(); 
	}; 
}

var utilBtn=function(){
	$(".util_wrap").on("mouseenter", function(){
		$(this).addClass("extend"); 
	});

	$(".util_wrap").on("mouseleave", function(){
		$(this).removeClass("extend active"); //수정
	}); 

	$(".util_wrap").find("button").on("click", function(){
		//$(".util_wrap button").removeClass("active"); 
		$(this).toggleClass("active"); 
	}); 

	//수정
	$(".pos_btn").on("click", function(){
		$(".util_wrap").addClass("active"); 
	})
}; 

/*var headerSub=function(){
	$(".map_btn").on("click", function(){
		$(this).toggleClass("active"); 
		if($(this).hasClass("active")){
			$(".sel_map_wrap").show(); 
			createMapSearchPopup();
		}else{
			BIZComm.removePopup("mapSearch");
			map.removeLayer(pointLayer_mapSearch);
			$(".sel_map_wrap").hide()
		}; 
	});

	$(".sel_map_wrap .toggle").on("click", function(){
		$(this).parent().toggleClass("active")
		//$(this).toggle("active");
	})
}; */

var legend=function(){
	var legendContainer= $(".legend_container");
	var legendBtn=$(".legend_btn"); 
	var tabContainer=$(".tab_container"); 
	var tabList=$(".tab_list"); //추가
	var id=0; 
	var detail;

	legendBtn.on("click", function(){
		if($(".tab_list > li").length > 0) {
			$(this).hide();
			legendContainer.show();
		}
	});
	
	legendContainer.find(".cut_btn").on("click", function(){
		//$(this).hide(); 
		legendBtn.show(); 
		legendContainer.hide();
	});

	/*$(".detail_btn").on("click", function(){
		legendContainer.hide(); 
		$("#tab0"+(id+1)+"_extend").show();

		$("#tab0"+(id+1)+"_extend").find(".cut_btn").on("click", function(){
			$("#tab0"+(id+1)+"_extend").hide(); 
			legendContainer.show(); 
		})

	}); */
}

var zoomController=function(){
	$("#extend_slide").on( "slide", function( event, ui ) {
		var zoomlv = $( "#extend_slide" ).slider( "value" );
		map.getView().setZoom(zoomlv);
	});
	
	map.getView().on("change:resolution", function(){
		var zoomlv = map.getView().getZoom();
		$( "#extend_slide" ).slider( "value", zoomlv );
	});
	
	$("#extend_zoom_in_btn").on( "click", function() {
		var zoomlv = map.getView().getZoom();
		map.getView().setZoom(zoomlv+1);
	});
	
	$("#extend_zoom_out_btn").on( "click", function() {
		var zoomlv = map.getView().getZoom();
		map.getView().setZoom(zoomlv-1);
	});
	
}

var Widget = function(selector){
	this.init(selector);
}

Widget.prototype.init=function(selector){
	this.selector = selector;
	this.parentId = selector.parents(".left_dep2").prop("id");
	this.childrenId = selector.parent().prop("id");
	this.parentIdx = selector.parent().index();
	this.eventDefine();
};

Widget.prototype.eventDefine=function(){
	var parentId = this.parentId;
	if(parentId == 'TyphoonAlarm' || parentId == 'RainAlarm') {
		parentId = "box1";
	}
	var childrenId = this.childrenId;
	var parentIdx = this.parentIdx;
	
	this.selector.on("click", function(e){
		//var widgetId = parentId + "_" + parentIdx;
		var widgetId = parentId + "_" + childrenId;
		console.log(widgetId);
		if($(this).parent().hasClass("active")){
			$(".widget_box").remove("#"+widgetId);
		}else{
			$(".widget_list > li").each(function(){
				if(!$(this).prop("id")){
					$(this).prop("id", widgetId); 
				}
			});
		};
		BIZComm.leftDepth3Close();
	});
};

$(document).ready(function(){
	$(".ui_acc").each(function(){
		var acc = new Acc($(this)); 
	}); 

	
	$(".left_dep1 > li > a").each(function(){
		var tool = new Tooltip($(this)); 
	});

	$(".util_btn > li > button").each(function(){
		var tool = new Tooltip($(this)); 
	});

	$(".legend_btn").each(function(){
		var tool = new Tooltip($(this)); 
	});

	$( "#slider" ).slider({
		value: 50,
	    orientation: "horizontal",
	    range: "min",
	    animate: true
	});

	$( "#extend_slide" ).slider({
      orientation: "vertical",
      range: "min",
      min: 3,
      max: 18,
      value:7,
      step:1
    });
	

	/*$( ".layer_slider" ).slider({
		value: 50,
		min: 0,
	    max: 100,
	    orientation: "horizontal",
	    range: "min",
	    animate: true
	});*/


    var aside = new AsideDisplay(); 

	utilBtn(); 
	//headerSub();
	legend();
	zoomController();

	//달력 스크립트
	datePicker();

	$(".select_wrap.fake").on("click", function(){
		var panelList = $(this).next(".panel_list");
		var panelSpan=$(this).find("span")
		panelList.toggle(); 

		panelList.find("a").on("click", function(){
			var className = $(this).attr("class"); 
			panelSpan.attr("class", "").attr("class", className); 
			panelList.hide();
		})
	}); 

	$(".modal_pos").on("click", function(){
		$(this).next(".pos").toggle(); 
	});
	
	// 상단 날짜 세팅
/*	var date_form = document.getElementById("date");
	date_form.innerHTML = f_date.getFullYear() + "년 " + (f_date.getMonth()+1) + "월 " + f_date.getDate() +"일";*/
	
})

function map_update() {
	map.updateSize();
	//console.log("map.updateSize() execute;");
	if(right_map != null) {
		right_map.updateSize();
	}
}

function datePicker(){
	
	$(".date-picker").datepicker({
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

		yearSuffix: '년'
	 });
	
}