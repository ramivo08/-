// 태풍알람 3depth 메뉴 생성
function setTyphoon3dpt() {
	open2DepthMenu("TyphoonAlarm");
}

//호우알람 3depth 메뉴 생성
function setRain3dpt() {
	open2DepthMenu("RainAlarm");
}

//지진알람 3depth 메뉴 생성
function setEarthquake3dpt() {
	open2DepthMenu("EarthquakeAlarm");
}

function open2DepthMenu(id){
	var parent = $(".left_dep1 > li"); 
	parent.siblings().removeClass("active"); 

	$(".dep2_aside").find(".left_dep2").hide();
	$(".dep1_aside").show(); 

	var showBox = $(".dep2_aside").find(".left_dep2").filter("#" + id);
	showBox.show(); 
	
	AsideDisplay.prototype.asideWSum();
}