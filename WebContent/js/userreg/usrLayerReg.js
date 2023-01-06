//var pohang_bound = [129.32287576, 36.09029113, 129.40850933, 36.14067640];
var pohang_bound = [229078.4, 388140.5, 236767.4, 393702.5];
var usrlayerbtn;
var pohang_content;
var pohang_overlay;
//버튼 클릭시
function usrLayerReg(item){
	usrlayerbtn = item;
	if($(item).parent().attr("class")){
		USpatialInactive();	//레이어 등록 비활성화
	}else{
		createUSpatialPopup();	//레이어 등록 비활성화
		pohang_content = document.getElementById('right_popup-content');
		var closer = document.getElementById('right_popup-closer');
		
		pohang_overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
			element:  document.getElementById('right_popup'),
			autoPan: true,
			autoPanAnimation: {
				duration: 250
			},
			id:'pohang-info'
		}));
		
		closer.onclick = function() {
			pohang_overlay.setPosition(undefined);
	        closer.blur();
	        return false;
		};
		
		right_map.addOverlay(pohang_overlay);
	}
}

function USpatialInactive(){
	if($("#usrLayerReg").length > 0) {
		$("#usrLayerReg").remove();
	}
}

function createUSpatialPopup() {
	if($("#usrLayerReg").length == 0) {
		var arg = {popName : "usrLayerReg"
				   ,title : "사용자 레이어 등록"
				   ,popIcon : "cloud_upload"
				   ,content : '<div class="pop_real_cont">' +
				   		'<form id="usrlayerForm" enctype="multipart/form-data" method="post">' +
						'<span class="box_title">· 등록정보 입력</span>' +
						'<div class="pop_box last">' +
						'<table class="usrreg_table">' +
						'<tbody>' +
						'<tr>' +
						'<td>'+
						'<label for="usrlayer_nm" class="input_side">- 레이어명 :　</label>' +
						'</td>' +
						'<td colspan="3">'+
						'<input type="text" class="other_type layer_nm" id="usrlayer_nm"><br/>' +
						'</td>' +
						'</tr>' +
						'<tr>' +
						'<td>'+
						'<label for="spatial_type" class="input_side">- 파일형태 :　</label>' +
						'</td>' +
						'<td>'+
						'<span class="select_wrap other_type" style="margin-left:0px; margin-right:15px;">' +
						'<select id="spatial_type">' +
							'<option value="null">선택</option>' +
							'<option value="shp">shp(zip)</option>' +
							'<option value="kml">KML</option>' +
							//'<option value="geotiff">GeoTIFF</option>' +
							//'<option value="tilemap">타일맵(zip)</option>' +
						'</select>' +
						'</span>' +
						'</td>' +
						'<td>' +
						'<label for="spatial_epsg" class="input_side">- 좌표체계 :　</label>' +
						'</td>' +
						'<td>' +
						'<input type="text" class="other_type epsg" id="spatial_epsg">' +
						'<span class="epsg_info" onclick="javascript:epsgInfo();"><i class="material-icons">info</i></span>' +
						'</td>' +
						'</tr>' +
						'<tr id="kml_url_tr" style="display:none;">' +
						'<td>'+
						'<label for="kml_url" class="input_side">- 외부URL :　</label>' +
						'</td>' +
						'<td colspan="3">'+
						'<input type="text" class="other_type layer_nm" id="kml_url"><br/>' +
						'</td>' +
						'</tr>' +
						'</tbody>' +
						'</table>' +
						'</div><!-- //pop_box -->' +
						'<div class="btn_area center">' +
						'<div class="btn_left" style="display:inline-block; float:left;">'+
							'<label for="usrlayer_file">파일선택</label>' +
							'<input type="file" name="usrlayer_file" class="usrlayer_file" id="usrlayer_file" accept=".kml, .zip, .tif">' +
							'<input type="text" class="usrlayer_upload" value="..." disabled="disabled">' +
						'</div>'+
						'<div class="btn_right" style="display:inline-block; float:right;">'+
							'<a href="#" class="btn blue" onclick="javascript:usrSpatialUpload();">레이어 등록</a>' +
						'</div>'+
						'</div>' +
						'<div class="text_wrap">' +
							'<div id="warning_area" style="background-color:#ffffff">' +
							//'<p>·　첨부 가능 용량은 30MB까지 가능합니다.</p>' +
							'<p>·　shp 파일은 shp 및 dbf 파일을 압축 후 등록 가능합니다.</p>' +
							//'<p>·　타일맵은 MapTiler에서 생성된 폴더를 압축 후 등록 가능합니다.</p>' +
							'<p>·　원본 및 압축 파일명은 한글을 지원하지 않습니다.</p>' +
							'</div>' +
						'</div>' +
						'<div id="usrlayer_box"class="setting_box">' +
						'</div>' +
						'<div class="btn_area center bottom">' +
						'<div class="btn_left" style="display:inline-block; float:left;">'+
						'</div>'+
						'<div class="btn_right" style="display:inline-block; float:right;">'+
							'<a href="#" class="btn green" onclick="javascript:createUSpatialListPopup();">레이어목록 보기</a>' +
							'<a href="#" class="btn green" onclick="javascript:halfMapView();">2분할로 보기</a>' +
						'</div>'+
						'</div>' +
						'</form>' +
					'</div><!-- //pop_real_cont -->'
					,styleVal : "top:70px; left:300px;"	};
		BIZComm.createPopup(arg);
		
		$('.other_type epsg').keyup(function () { 
		    this.value = this.value.replace(/[^0-9,-]/g,'');
		});
	} else {
		return;
	}
	
	$(document).on('change', '#usrlayer_file', function(){ // 값이 변경되면
		if(window.FileReader){ // modern browser
			var filename = $(this)[0].files[0].name;
			console.log(filename);
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
			console.log(filename);
		} // 추출한 파일명 삽입
		$('.usrlayer_upload').val(filename);
	});
}

$(document).on('change', '#spatial_type', function(){ // 값이 변경되면
	if($("#spatial_type").val() == "kml") {
		$("#spatial_epsg").val("4326");
		$("#kml_url_tr").show();
	} else if($("#spatial_type").val() == "shp") {
		$("#kml_url_tr").hide();
	}
});


function epsgInfo() {
	if($("#usrLayerEpsg").length == 0) {
		var arg = {popName : "usrLayerEpsg"
				   ,title : "주요 좌표체계 EPSG 코드 목록"
				   ,popIcon : "list"
				   ,content : '<div class="pop_real_cont" style="padding:0 !important;">' +
				   		'<div style="text-align:center;padding-bottom:10px;">' +
						'<a href="http://epsg.io/?q=korea" target="_blank" title="epsg.io로 이동합니다."><img src="/images/epsg.png" alt="epsg.io로 이동합니다." /></a>' +
						'</div>' +
						'</div>'
					,styleVal : "top:70px; left:550px;"
					,popWidth : "440px"};
		BIZComm.createPopup(arg);
	} else {
		return;
	}
}

function usrSpatialUpload() {
	var form = document.getElementById('usrlayerForm');

	var data = new FormData();
	data.append("usrlayer_nm", $("input[id=usrlayer_nm]").val());
	data.append("usrlayer_file", document.getElementById("usrlayer_file").files[0]);
	data.append("spatial_type", $("select[id=spatial_type]").val());
	data.append("kml_url", $("input[id=kml_url]").val());
	data.append("spatial_epsg", $("input[id=spatial_epsg]").val());
	console.log(data);
	
	$.ajax({
        method: "POST",
        enctype: 'multipart/form-data',
        url: "/userreg/usrSpatialUpload.do",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
        	console.log("RESULT : ", data.RESULT);
        	if(data.RESULT == "SUCCESS") {
        		alert("레이어 등록이 완료되었습니다.");
        		if($("#usrLayerRegList").length > 0) {
        			getUsrLayerList(1);
        		}
        	} else {
        		alert("레이어 등록에 실패하였습니다.");
        	}
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("레이어 등록 중 에러가 발생하였습니다.");
        }
    });
}

function createUSpatialListPopup() {
	if($("#usrLayerRegList").length == 0) {
		var arg = {popName : "usrLayerRegList"
				   ,title : "사용자 레이어 목록"
				   ,popIcon : "list"
				   ,content : '<div class="pop_real_cont">' +
				   		'<ul class="layer_admin_list">' +
						'<li>' +
						'<input type="radio" name="layer_admin" id="layer_admin1" class="radio_type" checked="checked"><label for="layer_admin1">내 레이어</label>' +
						'</li>' +
						'<li>' +
						'<input type="radio" name="layer_admin" id="layer_admin2" class="radio_type"><label for="layer_admin2">공유받은 레이어</label>' +
						'</li>'+
						'</ul>' +
						'<ul id="layer_name_list" class="layer_name_list">' +
						'</ul>' +
						'</div><!-- //pop_real_cont -->'+
						'<div class="paging">' +
						'<ul id="paging_usrlyrlist">' +
						'</ul>'+
						'</div>'
					,styleVal : "top:70px; left:300px;"
					,popWidth : "356px"};
		BIZComm.createPopup(arg);
		
		getUsrLayerList(1);
	} else {
		return;
	}
}

// 사용자 레이어 목록
var loadUsrLayer = new Array();
var loadUsrLayerData;
function getUsrLayerList(page) {
	console.log("============================ getUsrLayerList ============================");
	if(loadUsrLayer.length >0) {
		loadUsrLayer.length = 0;
	}
	$("#layer_name_list").empty();
	$.ajax({
		url:"userreg/selectListUserLayer.do",
		method:"POST",
		data : {page:page},
		success: function(data) {
			var items = data.LIST;
			var chkFlag = false;
			console.log(data);
			console.log(items);
			for(var i = 0 ; i < 5 ; i++) {
				var layers = map.getLayers();
				var layerId = "usrlyr-"+items[i].layer_sn;
				layers.forEach(function (layer, i){
					if(layer.get("layerId") == layerId && layer.get("type") != "base") {
						chkFlag = true;
					}
				});
				
				if(chkFlag) {
					var li_form = '<li>'+
						'<input type="checkbox" name="user_layer_1" class="user_layer_1" id="layer_ch'+items[i].layer_sn+'" value="'+layerId+'" checked="checked" onclick="javascript:viewUsrLayer('+items[i].layer_sn+');">' +
						'<label for="layer_ch'+items[i].layer_sn+'">'+items[i].layer_alias+'</label>' +
						'<span class="date">'+items[i].layer_wdate+'</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>';
						
					$("#layer_name_list").append(li_form);
					loadUsrLayerData ={"layerId":layerId,"lyr_sn":items[i].layer_sn, "layer_nm":items[i].layer_nm, "layer_file_nm":items[i].layer_file_nm, "format":items[i].layer_dist};
					loadUsrLayer.push(loadUsrLayerData);
				} else {
					var li_form = '<li>'+
						'<input type="checkbox" name="user_layer_1" class="user_layer_1" id="layer_ch'+items[i].layer_sn+'" value="'+layerId+'" onclick="javascript:viewUsrLayer('+items[i].layer_sn+');">' +
						'<label for="layer_ch'+items[i].layer_sn+'">'+items[i].layer_alias+'</label>' +
						'<span class="date">'+items[i].layer_wdate+'</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>';
					$("#layer_name_list").append(li_form);
					loadUsrLayerData ={"layerId":layerId,"lyr_sn":items[i].layer_sn, "layer_nm":items[i].layer_nm, "layer_file_nm":items[i].layer_file_nm, "format":items[i].layer_dist};
					loadUsrLayer.push(loadUsrLayerData);
				}
				chkFlag = false;
			}
			
			// 페이징
			$("#paging_usrlyrlist").html("");
			var page_viewList = Paging(data.COUNT, 5, 5, page, "UsrLayerList");
			$("#paging_usrlyrlist").append(page_viewList);
		}
	});
}

function viewUsrLayer(layer_sn) {
	
	if($("#layer_ch"+layer_sn).is(":checked")){
		for(var i = 0 ; i < loadUsrLayer.length ; i++) {
			if(loadUsrLayer[i].lyr_sn == layer_sn) {
				console.log(loadUsrLayer[i].lyr_sn);
				addUsrLayer(layer_sn);
			}
		}
	}else{
		var layers = map.getLayers();
		var layerId = "usrlyr-"+layer_sn;
		layers.forEach(function (layer, i){
			if(layer.get("layerId") == layerId && layer.get("type") != "base") {
				//deleteLayerList(layer.get("layerId"));
				//$("#"+layerId+"_li").remove();
				map.removeLayer(layer);
			}
		});
	}
}

function addUsrLayer(layer_sn){
	console.log(loadUsrLayer);
	for(var i = 0 ; i < loadUsrLayer.length ; i++) {
		if(loadUsrLayer[i].lyr_sn == layer_sn) {
			console.log(loadUsrLayer[i].layer_nm);
			if(loadUsrLayer[i].format == "S") {
				console.log(loadUsrLayer[i].layer_nm);
				//shp파일
				var usr_layer_Source = new ol.source.ImageWMS({
					url : geoserver_url,
					params : {
						'LAYERS' : 'NDMI:'+loadUsrLayer[i].layer_nm
					},
					serverType : 'geoserver',
					crossOrigin : 'anonymous'
				});

				var usr_layer = new ol.layer.Image({
					source : usr_layer_Source,
					layerId : loadUsrLayer[i].layerId,
					visible : true
				});
				
				map.addLayer(usr_layer);
			} else if(loadUsrLayer[i].format == "K") {
				//kml파일
				var usr_layer_Source = new ol.source.Vector({
			          url: '/kmlFile/'+loadUsrLayer[i].layer_file_nm,
			          format: new ol.format.KML({
			        	  //extractStyles: false
			          })
			    });
				var usr_layer = new ol.layer.Image({
			        source: new ol.source.ImageVector({
			        	source : usr_layer_Source
			        }),
			        layerId : loadUsrLayer[i].layerId,
					visible : true,
					style: new ol.style.Style({
		        		fill : new ol.style.Fill({
		        			color: '#6581a7',
		        			opacity: 0.8
		        		}),
		        		stroke : new ol.style.Stroke({
		        			color: '#202939',
		        			width: 2
		        		})
		        	})
			    });
				
				map.addLayer(usr_layer);
			} else if(loadUsrLayer[i].format == "U") {
				//kmlURL
				
			}
		}
	}
}

function createUSpatial2DivListPopup() {
	if($("#usrLayerReg2DivList").length == 0) {
		var arg = {popName : "usrLayerReg2DivList"
				   ,title : "사용자 레이어 목록(2분할)"
				   ,popIcon : "list"
				   ,content : '<div class="pop_real_cont">' +
				   		'<ul class="layer_admin_list">' +
						'<li>' +
						'<input type="radio" name="layer_admin" id="layer_admin1" class="radio_type" ><label for="layer_admin1">내 레이어</label>' +
						'</li>' +
						'<li>' +
						'<input type="radio" name="layer_admin" id="layer_admin2" class="radio_type"><label for="layer_admin2">공유받은 레이어</label>' +
						'</li>'+
						'</ul>' +
						'<ul class="layer_name_list">' +
						'<li>'+
						'<input type="checkbox" name="user_layer_2" class="user_layer_2" id="layer_ch2" value="pohang-earthquake">' +
						'<label for="layer_ch2">포항 지진 본진</label>' +
						'<span class="date">2017.12.21</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>' +
						'<li>'+
						'<input type="checkbox" name="user_layer_2" class="user_layer_2" id="layer_ch3" value="pohang-drilling">' +
						'<label for="layer_ch3">포항 액상화 시추지점</label>' +
						'<span class="date">2017.1d2.21</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>' +
						'<li>'+
						'<input type="checkbox" name="user_layer_2" class="user_layer_2" id="layer_ch4" value="pohang-measure">' +
						'<label for="layer_ch4">포항 액상화 추정조사지점</label>' +
						'<span class="date">2017.12.21</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>' +
						'<li>'+
						'<input type="checkbox" name="user_layer_2" class="user_layer_2" id="layer_ch0" value="pohang-image100">' +
						'<label for="layer_ch0">포항 위성영상(1m)</label>' +
						'<span class="date">2017.12.21</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>' +
						'<li>'+
						'<input type="checkbox" name="user_layer_2" class="user_layer_2" id="layer_ch1" value="pohang-image10">' +
						'<label for="layer_ch1">포항 위성영상(10cm)</label>' +
						'<span class="date">2017.12.21</span>' +
						'<button type="button" class="share"><i class="material-icons">share</i></button>' +
						'<button type="button" class="del"><i class="material-icons">highlight_off</i></button>'+
						'</li>' +
						'</ul>' +
						'</div><!-- //pop_real_cont -->'+
						'<div class="paging">' +
						'</div>'
					,styleVal : "top:70px; left:1200px;"
					,popWidth : "356px"};
		BIZComm.createPopup(arg);
	} else {
		$("#usrLayerReg2DivList").show();
		return;
	}
}

function halfMapView() {
	if(!$(".div_left").hasClass("half")) {
		$(".div_left").addClass("half");
		$(".div_right").addClass("half");
		createUSpatial2DivListPopup();
		map_update();
	}
}

function halfMapClose() {
	if($(".div_left").hasClass("half")) {
		$(".div_left").removeClass("half");
		$(".div_right").removeClass("half");
		$("#usrLayerReg2DivList").hide();
		map_update();
	}
}

//라디오버튼 체크 이벤트
$(document).ready(function(){
	$(document).on('click', 'input:checkbox[class=user_layer_2]', function() {
		if($(this).val() == "pohang-image100" && $(this).is(":checked")) {
			if(image_pohang != null) {
				image_pohang.setVisible(true);
			} else {
				viewImagePohang($(this).val());
			}
		} else if($(this).val() == "pohang-image100" && !$(this).is(":checked")) {
			//removePastLayer($(this).val());
			//deleteTab($(this).val());
			if(image_pohang != null) {
				image_pohang.setVisible(false);
			}
		}
		if($(this).val() == "pohang-image10" && $(this).is(":checked")) {
			if(maptiler_pohang != null) {
				maptiler_pohang.setVisible(true);
			} else {
				viewTileMapPohang($(this).val());
			}
		} else if($(this).val() == "pohang-image10" && !$(this).is(":checked")) {
			//removePastLayer($(this).val());
			//deleteTab($(this).val());
			if(maptiler_pohang != null) {
				maptiler_pohang.setVisible(false);
			}
		}
		if ($(this).val() == "pohang-earthquake" && $(this).is(":checked"))  {
			//viewRadarImage($(this).val());
			if(pohang_earthquake != null) {
				pohang_earthquake.setVisible(true);
			} else {
				viewKmlPohang($(this).val());
			}
		} else if($(this).val() == "pohang-earthquake" && !$(this).is(":checked")) {
			//removePastLayer($(this).val());
			//deleteTab($(this).val());
			if(pohang_earthquake != null) {
				pohang_earthquake.setVisible(false);
			}
		}
		if ($(this).val() == "pohang-drilling" && $(this).is(":checked"))  {
			//viewCMOSImage($(this).val());
			if(pohang_drilling != null) {
				pohang_drilling.setVisible(true);
			} else {
				viewKmlPohang($(this).val());
			}
		} else if($(this).val() == "pohang-drilling" && !$(this).is(":checked")) {
			//removePastLayer($(this).val());
			//deleteTab($(this).val());
			if(pohang_drilling != null) {
				pohang_drilling.setVisible(false);
			}
		}
		if ($(this).val() == "pohang-measure" && $(this).is(":checked")) {
			//viewCMOSImage($(this).val());
			if(pohang_measure != null) {
				pohang_measure.setVisible(true);
			} else {
				viewKmlPohang($(this).val());
			}
		} else if($(this).val() == "pohang-measure" && !$(this).is(":checked")) {
			//removePastLayer($(this).val());
			//deleteTab($(this).val());
			if(pohang_measure != null) {
				pohang_measure.setVisible(false);
			}
		}
	});
});
var image_pohang;
function viewImagePohang(id) {
	var image_pohang_source = new ol.source.ImageStatic({
		url: '/images/ndmi/171202_PoHang_Mosaic_1m.jpg',
		imageExtent: [229078.4, 388140.5, 236767.4, 393702.5],
		projection : 'EPSG:5187',
		crossOrigin : 'Anonymous'
	});
	
	image_pohang = new ol.layer.Image({
		visible : true,
		opacity : 1,
		zIndex : 300,
		source : image_pohang_source,
		layerId : id
	});
	
	right_map.addLayer(image_pohang);
	right_map.getView().fit([14396156.677524982, 4313052.4152062945, 14405689.362932192, 4319995.532706292]);
}

var maptiler_pohang;
function viewTileMapPohang(id) {
	var bound;
	var minzoom;
	var maxzoom;
	
	$.getJSON('http://210.113.102.134:8080/maptiler/pohang_tiled/metadata.json')
	.done(function(data){
		maptiler_pohang = new ol.layer.Tile({
			layerId : id,
		    visible : true,
		    opacity : 1,
		    zIndex : 299,
		    extent: ol.proj.transformExtent(data.bounds, 'EPSG:4326', 'EPSG:3857'),
		    source : new ol.source.XYZ({
		        url : 'http://210.113.102.134:8080/maptiler/pohang_tiled/{z}/{x}/{y}.png',
		        minZoom: data.minzoom,
		        maxZoom: data.maxzoom
		    })
		});
		
		console.log(ol.proj.transformExtent(data.bounds, 'EPSG:4326', 'EPSG:3857'));
		right_map.addLayer(maptiler_pohang);
		right_map.getView().fit(maptiler_pohang.getExtent());
	}).fail(function() {
		alert("데이터 호출 실패");
	});
}

var pohang_earthquake;
var pohang_drilling;
var pohang_measure;
function viewKmlPohang(id) {
	if(id == "pohang-earthquake") {
		var pohang_earthquake_source = new ol.source.Vector({
	          url: '/kml/pohang_earthquake_pnt.kml',
	          format: new ol.format.KML()
	    });
		pohang_earthquake = new ol.layer.Vector({
	        source: pohang_earthquake_source,
	        layerId : id,
	        zIndex : 303
	    });
		console.log(pohang_earthquake);
		right_map.addLayer(pohang_earthquake);
		
	} else if(id == "pohang-drilling") {
		pohang_drilling = new ol.layer.Vector({
	        source: new ol.source.Vector({
	          url: '/kml/pohang_drilling_pnt.kml',
	          format: new ol.format.KML()
	        }),
	        layerId : id,
	        zIndex : 302
	    });
		console.log(pohang_drilling);
		right_map.addLayer(pohang_drilling);
		
	} else if(id == "pohang-measure") {
		pohang_measure = new ol.layer.Vector({
	        source: new ol.source.Vector({
	          url: '/kml/pohang_measure_pnt.kml',
	          format: new ol.format.KML()
	        }),
	        layerId : id,
	        zIndex : 301
	    });
		console.log(pohang_measure);
		right_map.addLayer(pohang_measure);
		
	}
}

function showPopupPohang(feature, evt) {
	pohang_content.innerHTML = "";
	console.log(feature);
	pohang_content.innerHTML += "<b>"+feature.get("name")+"</b>";
	pohang_content.innerHTML += "<p>"+feature.get("description")+"</p>";
	pohang_overlay.setPosition(evt.coordinate);
}

$(document).on('DOMSubtreeModified', '#control_container', function() {
	if($('#usrLayerReg').length == 0 && $('#usrLayerRegList').length == 0 && $('#usrLayerReg2DivList').length == 0) {
		$(usrlayerbtn).parents().removeClass('active')
	}
});