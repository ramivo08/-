var time = [];
var elevationData = [];

var graphPoint = [];
var chart = null;

function fn_Add_Features(surveyData) {
	var features = [];
	var coordinate;
	for (var i = 0; i < surveyData.length; ++i) {
		coordinate = ol.proj.transform([ surveyData[i]["longGps"],
				surveyData[i]["latGps"] ], 'EPSG:4326', 'EPSG:5179');
		features[i] = new ol.Feature(new ol.geom.Point(coordinate));
		features[i].set('id', surveyData[i]["id"]);
		features[i].set('spotName', surveyData[i]["spotName"]);
		features[i].set('spotGb', surveyData[i]["spotGb"]);

		if (surveyData[i]["name"] != null) {
			features[i].set('name', surveyData[i]["name"]);
			features[i].set('windSpd', surveyData[i]["windSpd"]);
			features[i].set('windDir', surveyData[i]["windDir"]);
			features[i].set('latGps', surveyData[i]["latGps"]);
			features[i].set('longGps', surveyData[i]["longGps"]);
		}
	}

	clusterSource.getSource().clear();
	clusterSource.getSource().addFeatures(features);
}

function fn_Search_Spot() {
	// popup.hide(); 
	// heightPopup.hide();

	fn_Remove_Layer("allRoutePointLayer");
	fn_Remove_Layer("allRouteLayer");
	clusterSource.getSource().clear();

	$("#spotResult").empty();
	var spotName = document.getElementById("spotName").value;
	var organization = document.getElementById("organization").value;
	var key = document.getElementById("searchSpotKey").value;
	var selection;
	var spotCoords = [];

	var radios = document.getElementsByName("select1");

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked == true) {
			selection = radios[i].value;
		}
	}

	$
			.ajax({
				type : 'POST',
				url : ROOT_PATH + '/map/searchDeliverySpot.do',
				data : {
					"spotName" : spotName,
					"organization" : organization,
					"selection" : selection,
					"key" : key
				},
				dataType : 'json',
				success : function(result) {
					var spotList = result.spotList;
					var listItem = '<p>검색결과 : <span>'
							+ spotList.length
							+ '</span>건</p><ul style="height:600px;overflow:auto;">'

					spotList
							.forEach(function(spot) {

								listItem += '<li><a href="#" onclick=javscript:fn_Select_Spot(\''+ spot.OBJ_MNG_NO+ '\')><p>'+ "배달점 : "+ spot.DRONDLV_NM+ '</p><span id="seco">'
										+ "설명 : " + spot.DRONDLV_DC + '</span></a></li>';

								var coord = new Object();

								coord.id = spot.OBJ_MNG_NO;
								coord.latGps = spot.DRONDLV_XCNTS;
								coord.longGps = spot.DRONDLV_YDNTS;
								coord.spotName = spot.DRONDLV_NM;
								coord.spotGb = spot.SPOT_GB

								spotCoords.push(coord);
							});

					listItem += '</ul>';

					$("#spotResult").append(listItem);

					fn_Add_Features(spotCoords);

					map.getView().fit(clusterSource.getSource().getExtent(),
							map.getSize());
				},
				error : function(request, status, error) {
					alert("데이터 조회 오류\ncode:" + request.status + "\n"
							+ "message:" + request.responseText + "\n"
							+ "error:" + error);
				}
			});
}

function fn_Select_Spot(selectedObj) {
	// popup.hide();
	// heightPopup.hide();

	var features = clusterSource.getSource().getFeatures();

	features.forEach(function(feature, i) {
		if (feature.get("id") == selectedObj) {

			map.getView().setCenter(feature.get("geometry").getCoordinates());
			map.getView().setZoom(18);
		}
	});
}

function fn_Search_Route(obj) {
	// popup.hide();
	// heightPopup.hide();

	fn_Remove_Layer("allRoutePointLayer");
	fn_Remove_Layer("allRouteLayer");
	clusterSource.getSource().clear();

	var spotName;
	var organization;
	var key;
	var selection;
	var radios;
	var status = "";
	var comment = null;

	if (obj == "roadSearchButton") {
		$("#routeResult").empty();

		spotName = document.getElementById("routeSpotName").value;
		organization = document.getElementById("routeOrganization").value;
		key = document.getElementById("searchRouteKey").value;

		radios = document.getElementsByName("select2");

		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked == true) {
				selection = radios[i].value;
			}
		}

		/* status = "3"; */
	} else {
		$("#routeResult2").empty();

		spotName = document.getElementById("routeSpotName2").value;
		organization = document.getElementById("routeOrganization2").value;
		key = document.getElementById("searchRouteKey").value;

		radios = document.getElementsByName("select3");

		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked == true) {
				selection = radios[i].value;
			}
		}
	}

	$
			.ajax({
				type : 'POST',
				url : ROOT_PATH + '/map/searchDeliveryRoute.do',
				data : {
					"spotName" : spotName,
					"organization" : organization,
					"selection" : selection,
					"key" : key,
					"status" : status
				},
				dataType : 'json',
				success : function(result) {
					var routeList = result.routeList;
					var listItem = '<p>검색결과 : <span>'
							+ routeList.length
							+ '</span>건</p><ul style="height:600px;overflow:auto;"><ul><li style="background-color: lightgray;"><a><span>출발지</span><span>배송지</span><span>배송일시</span></a>'

					routeList
							.forEach(function(route) {
								if (obj == "roadSearchButton") {
									if (route.LOCATION_XY != null) {
										var spotNm = [ route.STARTSPOTNAME,
												route.DELIVERYSPOTNAME1,
												route.DELIVERYSPOTNAME2,
												route.ENDSPOTNAME ];
										var spotGb = [ route.STARTSPOTGB,
												route.DELIVERYSPOTGB1,
												route.DELIVERYSPOTGB2,
												route.ENDSPOTGB ];
										var spotX = [ route.STARTSPOTX,
												route.DELIVERYSPOTX1,
												route.DELIVERYSPOTX2,
												route.ENDSPOTX ];
										var spotY = [ route.STARTSPOTY,
												route.DELIVERYSPOTY1,
												route.DELIVERYSPOTY2,
												route.ENDSPOTY ];
										
										

										try {
											fn_Draw_All_Route(JSON
													.parse(route.LOCATION_XY),
													spotNm, spotGb, spotX,
													spotY, route.DLVY_NO);
										} catch (error) {
											comment = "경로 형식(JSON)이 올바르지 않은 데이터가 있습니다.\n 해당 데이터 경로를 제외하고 표출합니다."
										}

									}
									listItem += '<li><a href="#" onclick="javascript:fn_Change_Route_View(\''
											+ route.DLVY_NO
											+ '\')"><span>'
											+ route.STARTSPOTNAME
											+ '</span><span>'
											+ route.DELIVERYSPOTNAME1
											+ '</span><span>'
											+ route.STARTDATE
											+ '</span></a></li>';

								} else {
									listItem += '<li><a href="#" onclick="javascript:fn_Select_Route(\''
											+ route.DLVY_NO
											+ '\')"><span>'
											+ route.STARTSPOTNAME
											+ '</span><span>'
											+ route.DELIVERYSPOTNAME1
											+ '</span><span>'
											+ route.STARTDATE
											+ '</span></a></li>';
								}
							});

					if (comment != null) {
						alert(comment);
					}

					listItem += '</ul></ul>';

					if (obj == "roadSearchButton") {
						$("#routeResult").append(listItem);
					} else {
						$("#routeResult2").append(listItem);
					}
				},
				error : function(request, status, error) {
					alert("데이터 조회 오류\ncode:" + request.status + "\n"
							+ "message:" + request.responseText + "\n"
							+ "error:" + error);
				}
			});

}

function fn_Change_Route_View(dlvyId) {
	map.getLayers().forEach(function(layer, i) {
		if (layer.get("name") == dlvyId) {
			var style = new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : 'rgba(255, 0, 0, 1)',
					width : 4,
					lineDash : [ 10, 20 ]
				})
			});

			var features = layer.getSource().getFeatures();

			features.forEach(function(feature, i) {
				if (feature.get("id") == "routeFeature") {
					feature.setStyle(style);
				}
			})

			layer.setZIndex(100);
		} else {
			if (!isNaN(Number(layer.get("name")))) {
				var style = new ol.style.Style({
					stroke : new ol.style.Stroke({
						color : 'rgba(255, 192, 0, 1)',
						width : 4,
						lineDash : [ 10, 20 ]
					})
				});

				var features = layer.getSource().getFeatures();

				features.forEach(function(feature, i) {
					if (feature.get("id") == "routeFeature") {
						feature.setStyle(style);
					}
				})

				layer.setZIndex(90);
			}
		}
	});
}

var moveFeature = null;
var animating = false;
var speed, now;
var routeCoord = [];
var routeLength = null;
var path;

var iconVectorLayer;
/* 심홍섭 - 2019.12.10 모든 배송경로 표출 */
function fn_Draw_All_Route(obj, spotNm, spotGb, spotX, spotY, dlvyId) {
	var iconVectorSource = new ol.source.Vector({});

	for (var i = 0; i < spotGb.length; i++) {
		if (spotGb[i] == "B") {
			var iconStyle = new ol.style.Style({
				image : new ol.style.Icon({
					src : "/drone/images/map/dronIcon.gif"
				}),
				text : new ol.style.Text({
					text : spotNm[i],
					font : 'bold 12px comic sans ms',
					textBaseline : 'bottom',
					offsetY : -20,
					fill : new ol.style.Fill({
						// color: '#fff'
						color : 'blue'
					})
				})
			});

			// 배달점 별로 아이콘나오게 하는 거
			var iconFeature = new ol.Feature({
				geometry : new ol.geom.Point(ol.proj.transform([
						Number(spotY[i]), Number(spotX[i])], 'EPSG:4326',
						'EPSG:5179'))
			});

			// 아이콘 스타일
			iconFeature.setStyle(iconStyle);

			iconVectorSource.addFeature(iconFeature);

		} else {
			var iconStyle = new ol.style.Style({
				image : new ol.style.Icon({
					src : "/drone/images/map/dronIcon3.png"
				}),
				text : new ol.style.Text({
					text : spotNm[i],
					font : 'bold 12px comic sans ms',
					textBaseline : 'bottom',
					offsetY : -20,
					fill : new ol.style.Fill({
						// color: '#fff'
						color : 'blue'
					})
				})
			});

			var iconFeature = new ol.Feature({
				geometry : new ol.geom.Point(ol.proj.transform([
						Number(spotY[i]), Number(spotX[i]) ], 'EPSG:4326',
						'EPSG:5179'))
			});

			iconFeature.setStyle(iconStyle);

			iconVectorSource.addFeature(iconFeature);

		}
	}

	// 아이콘 레이어
	iconVectorLayer = new ol.layer.Vector({
		source : iconVectorSource,

		visible : true,
		layerId : 'allRoutePointLayer'
	})

	map.addLayer(iconVectorLayer);

	var vectorSource = new ol.source.Vector();
	var vectorLayer = new ol.layer.Vector({
		source : vectorSource,
		visible : true,
		layerId : 'allRouteLayer',
		name : dlvyId
	});
	
	vectorSource.once('change',function(e){
	    if (vectorSource.getState() === 'ready') {
	      path = vectorSource.getFeatures()[0];
	    }
	  });
	
	var feature = new ol.Feature({
		id : "routeFeat re",
		geometry : new ol.geom.LineString()
	});
	
	graphPoint = [];
	routeCoord = [];
	

	
//
	for (var i = 0; i < obj.length; i++) {
		var coord = [];
		coord.push(Number(obj[i].lon));
		coord.push(Number(obj[i].lat));		
		console.log('obj 타임                    '+obj[i].time);
		console.log('     replace              '+obj[i].time.replace(/ /g,"T"));
		
		
		
		
		graphPoint.push([ (Date.parse(obj[i].time.replace(/ /g,"T")) / 1000),
				Number(obj[i].height) ]);
		

		routeCoord.push(ol.proj.transform(coord, 'EPSG:4326', 'EPSG:5179'));
		
		
		// 경로그리기
		  feature.getGeometry().appendCoordinate(
				ol.proj.transform(coord, 'EPSG:4326', 'EPSG:5179'));
		
		
		
	}
//	var dsa = [];
//	dsa = feature.getGeometry().getCoordinate();
//	for (var i = 0; i < dsa.length; i ++){
//		var test = [];
//		test.push(Number(dsa[i]));
//		
//		
//		routeCoord.push(ol.proj.transform(test, 'EPSG:4326', 'EPSG:5179'));
//		
//	}
	
	
	
	routeLength = routeCoord.length;
//	console.log(routeCoord);
//	console.log(routeLength);
//	
	
	
	var style = new ol.style.Style({
		stroke : new ol.style.Stroke({
			color : 'rgba(255, 192, 0, 1)',
			width : 4,
			lineDash : [ 10, 20 ]
		})
	});

	feature.setStyle(style);
	feature.set('name', '폴리라인');

	vectorSource.addFeature(feature);

	var iconStyle = new ol.style.Style({
		image : new ol.style.Icon({
			src : "/drone/images/map/dronIcon3.png"
		})
	});
	
	//경로 좌표 가져오기 
	moveFeature = new ol.Feature({
		geometry : 
//			new ol.geom.LineString(
			new ol.geom.Point(
		// EPSG는 좌표변환.
		
		ol.proj.transform([ Number(spotY[0]), Number(spotX[0]) ], 'EPSG:4326',
				'EPSG:5179'))
//		ol.proj.transform([ Number(a[0]), Number(a[1]) ], 'EPSG:4326',
//				'EPSG:5179'),
//		ol.proj.transform([ Number(b[0]), Number(b[1]) ], 'EPSG:4326',
//					'EPSG:5179'))
					
		
				
	});
	//추가추가0406
	
	
	moveFeature.setStyle(iconStyle);

	vectorSource.addFeature(moveFeature);

	map.addLayer(vectorLayer);

	map.getView().fit(feature.getGeometry().getExtent(), map.getSize());
}
//(시간에따라서 이동)
// 맵에 드론 아이콘 이동

var index = 0;
var moveFunction = function(event) {
	var vectorContext = event.vectorContext;

	var frameState = event.frameState;

	if (animating) {
		var elapsedTime = frameState.time - now;
		index = Math.round(speed * elapsedTime / 1000);
		// var index = Math.round(speed * elapsedTime / 100);

		if (index >= routeLength) {
			stopAnimation(true);

			return;
		}

//		var currentPoint = new ol.geom.Point(routeCoord[index]);
		var currentPoint = new ol.geom.Point(routeCoord[index]);
		var feature = new ol.Feature(currentPoint);
		
		vectorContext.drawFeature(feature, new ol.style.Style({
			image : new ol.style.Icon({
				src : "/drone/images/map/dronIcon3.png"
			})		
		}));
		
		
		 
		 
	
		requestData(graphPoint[index]);
	}

	map.render();
};

// 드론아이콘 경로따라 움직이는것.
function animateFeature(){
	
	
	var iconStyle = new ol.style.Style({
		image : new ol.style.Icon({
			src : "/drone/images/map/dronIcon3.png"
		}),
		
	});
	
//	console.log(path);
	 if (path) {
		 
		 	// 점표현
		 	//	
		    f = new ol.Feature(new ol.geom.Point([0,0]));
		    f.setStyle(iconStyle);
		    anim = new ol.featureAnimation.Path({
		      path: path,
		     
		     
		      speed: 3,
		     
		    });
		  
		    iconVectorLayer.animateFeature ( f, anim );
		  }
	 
	
}

function startAnimation() {
	if (animating) {
		stopAnimation(false);
	} else {
		animating = true;
		now = new Date().getTime();
		speed =2;
		moveFeature.setStyle(null);
		//console
		
		animateFeature()

		// 동적 지도 표현
		// map.on('postcompose', moveFunction);
		map.on('postcompose', moveFunction);
		map.render();
	}
}

function stopAnimation(ended) {
	animating = false;

	var coord = ended ? routeCoord[routeLength - 1] : routeCoord[0];
	(moveFeature.getGeometry()).setCoordinates(coord);

	// map.un('postcompose', moveFunction);
	map.un('postcompose', moveFunction);
}




function fn_Select_Route(dlvyId) {

	// popup.hide();
	// heightPopup.hide();

	// 운영이력 팝업
	var comment = null;
	time = [];
	elevationData = [];

	fn_Remove_Layer("allRoutePointLayer");
	fn_Remove_Layer("allRouteLayer");
	clusterSource.getSource().clear();

	$
			.ajax({
				type : 'POST',
				url : ROOT_PATH + '/map/searchDeliveryRoute.do',
				data : {
					"dlvyId" : dlvyId
				},
				dataType : 'json',
				success : function(result) {
					var routeList = result.routeList;
//					console.log(routeList);
					routeList
							.forEach(function(route) {
								if (route.LOCATION_XY != null) {
									var spotNm = [ route.STARTSPOTNAME,
											route.DELIVERYSPOTNAME1,
											route.DELIVERYSPOTNAME2,
											route.ENDSPOTNAME ];
									var spotGb = [ route.STARTSPOTGB,
											route.DELIVERYSPOTGB1,
											route.DELIVERYSPOTGB2,
											route.ENDSPOTGB ];
									var spotX = [ route.STARTSPOTX,
											route.DELIVERYSPOTX1,
											route.DELIVERYSPOTX2,
											route.ENDSPOTX ];
									var spotY = [ route.STARTSPOTY,
											route.DELIVERYSPOTY1,
											route.DELIVERYSPOTY2,
											route.ENDSPOTY ];

									try {
										// 경로 그리는 거
										fn_Draw_All_Route(JSON
												.parse(route.LOCATION_XY),
												spotNm, spotGb, spotX, spotY,
												route.DLVY_NO);
									} catch (error) {
										comment = "경로 형식(JSON)이 올바르지 않은 데이터입니다."
									}
								} else {
									comment = "경로 형식(JSON)이 올바르지 않은 데이터입니다."
								}
							});

					if (comment != null) {
						popup.hide();
						heightPopup.hide();
						alert(comment);
					} else {
						var content = '<div class="layerPop_road" style="width:600.01px !important;">'
								+ '<div class="innerWrap">'
								+ '<dl>'
								+ '<dt>운영 이력 번호</dt>' + '<dd>'
								+ routeList[0].DLVY_NO
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>운영 기관</dt>'
								+ '<dd>'
								+ routeList[0].ORGNZT_NM
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>출발지</dt>'
								+ '<dd>'
								+ routeList[0].STARTSPOTNAME
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>출발 일시</dt>'
								+ '<dd>'
								+ routeList[0].STARTDATE
								+ ' '
								+ routeList[0].STARTTIME
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>위치 정보</dt>'
								+ '<dd>'
								+ routeList[0].START_RN
								+ ' '
								+ routeList[0].START_DETAIL_ADRES
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>배송지/dt>'
								+ '<dd>'
								+ routeList[0].DELIVERYSPOTNAME1
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>도착 일시</dt>'
								+ '<dd>'
								+ routeList[0].ENDDATE
								+ ' '
								+ routeList[0].ENDTIME
								+ '</dd>'
								+ '</dl>'
								+ '<dl>'
								+ '<dt>위치 정보</dt>'
								+ '<dd>'
								+ routeList[0].END_RN
								+ ' '
								+ routeList[0].END_DETAIL_ADRES
								+ '</dd>'
								+ '</dl>'
								// + '<dl>'
								// + '<dt>드론 정보</dt>'
								// + '</dl>'
								// + '<dl class="normal">'
								//					
								// + '<dd>드론명 : 드론3</dd>'
								// + '</dl>'
								// + '<dl class="normal">'
								// + '<dd>드론 종류 : 엄청 좋은 드론</dd>'
								// + '</dl>'
								+ '</div>' + '</div>';

						var content2 = '<div id="heightContainer" ></div>'
							
							
						
						popup.show(ol.proj.transform([ 126.977985, 37.545335 ],
								'EPSG:4326', 'EPSG:5179'), content);
						heightPopup.show(ol.proj.transform([ 126.977985,
								37.545335 ], 'EPSG:4326', 'EPSG:5179'),
								content2);
						
					

						chart = Highcharts.chart('heightContainer', {

						    chart: {
						        type: 'area',
						        events: {
						            load: requestData(null)
						        }
						    },

						    title: {
						        text: '비행 고도'
						    },

						    credits: {
						        enabled: false
						    },

						    xAxis: {

						        type: 'datetime',
						        labels: {
						            formatter: function () {
						                //														console.log("xaxis 데이터       "+new Date(this.value));
						               
						                return new Date(this.value * 1000).toLocaleString().substr(-12);
						            }
						        },
						        title: {
						            text: '시간'
						        }
						    },

						    yAxis: {
						        title: {
						            text: null
						        },
						        labels: {
						            format: '{value} m'
						        }
						    },

						    tooltip: {
						        formatter: function () {
						            return '시간: ' + new Date(this.x * 1000).toLocaleString();
						             + '<br/>고도:'
						             + this.y + 'm';
						        },
						        shared: true
						    },

						    legend: {
						        enabled: false
						    },

						    plotOptions: {
						        area: {
						            fillColor: {
						                linearGradient: {
						                    x1: 0,
						                    y1: 0,
						                    x2: 0,
						                    y2: 1
						                },
						                stops: [
						                    [
						                        0,
						                        Highcharts
						                        .getOptions().colors[0]],
						                    [
						                        1,
						                        Highcharts
						                        .Color(
						                            Highcharts
						                            .getOptions().colors[0])
						                        .setOpacity(
						                            0)
						                        .get(
						                            'rgba')]]
						            },
						            marker: {
						                symbol: 'url(/drone/images/map/dronIcon3.png)'
						            },
						            lineWidth: 1,
						            states: {
						                hover: {
						                    lineWidth: 3
						                }
						            },
						            threshold: null
						        }
						    },

						    series: [{
						            type: 'area',
						            data: [],
						            name: 'Elevation',
						            marker: {
						                enabled: false
						            },
						            threshold: null
						        }
						    ]

						});

						
//						console.log(chart);
							// 브라우저 확인하는곳
						var browse = navigator.userAgent.toLowerCase();

						var element = document
								.getElementsByClassName("ol-popup");

						element[0].classList.add("ol-fixed");
						element[0].style.setProperty('margin-top', '550px',
								'important');

						if ((navigator.appName == 'Netscape' && browse
								.indexOf('trident') != -1)
								|| (browse.indexOf("msie") != -1)) {
							element[0].classList.add("default");
							element[0].classList.add("hasclosebox");
						}

						element[1].classList.add("ol-fixed");
						element[1].style.setProperty('margin-top', '50px',
								'important');

						if ((navigator.appName == 'Netscape' && browse
								.indexOf('trident') != -1)
								|| (browse.indexOf("msie") != -1)) {
							element[1].classList.add("default");
							element[1].classList.add("hasclosebox");
						}

						startAnimation();
						
					}
				},
				error : function(request, status, error) {
					alert("데이터 조회 오류\ncode:" + request.status + "\n"
							+ "message:" + request.responseText + "\n"
							+ "error:" + error);
				}
			});
}
//차트에 뿌려주는 데이터 
function requestData(point) {
	if (point != null) {
		var series = chart.series[0];

		chart.series[0].addPoint(point, true);
	}
}

function fn_Layer_Selection() {
	var content = '<div class="layerSelection">'
			+ '<input type="checkbox" id="aisprhc" onclick="javascript:fn_Layer_Expression(this)">비행금지구역</input></br>'
			+ '<input type="checkbox" id="aisresc" onclick="javascript:fn_Layer_Expression(this)">비행제한구역</input></br>'
			+ '<input type="checkbox" id="windStream" onclick="javascript:fn_Layer_Expression(this)">바람장</input>'
			+ '</div>';

	popup.show(ol.proj.transform([ 126.977985, 37.545335 ], 'EPSG:4326',
			'EPSG:5179'), content);

	var browse = navigator.userAgent.toLowerCase();

	var element = document.getElementsByClassName("ol-popup");

	element[1].classList.add("ol-fixed");
	element[1].style.setProperty('margin-top', '50px', 'important');

	var contentElement = document.getElementsByClassName("ol-popup-content");

	contentElement[0].style.setProperty('margin-right', '7em');

	if ((navigator.appName == 'Netscape' && browse.indexOf('trident') != -1)
			|| (browse.indexOf("msie") != -1)) {
		element[1].classList.add("default");
		element[1].classList.add("hasclosebox");
	}
}

function fn_Layer_Expression(obj) {
	var layers = map.getLayers();

	if ($(obj).prop("checked")) {
		if (obj.id == "windStream") {
			windfieldlist('windfield');
		} else {
			layers.forEach(function(layer, i) {
				if (layer.get("layerId") == obj.id) {
					layer.setVisible(true);
				}
			});
		}
	} else {
		if (obj.id == "windStream") {
			windfieldInactive();
		} else {
			layers.forEach(function(layer, i) {
				if (layer.get("layerId") == obj.id) {
					layer.setVisible(false);
				}
			});
		}
	}
}

//******  기후정보 탭 
//******
function fn_View_Aws(obj) {

	// popup.hide();
	// heightPopup.hide();
	//	
	
	var uri = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getFcstVersion?serviceKey=9PSa58d5dxhD7MXSf5t6LDasSscvYat5g0tbwMk+zTOd8F3mGYprUqwFNYhtQ3zeebEUzCRvYkQtfLCQ5lgP7w=="
				+ "&numOfRows=10&pageNo=1&ftype=ODAM&basedatetime=201701170800";
	var enc = encodeURI(uri);
	var dec = decodeURI(enc);
	
	console.log(enc); 
	console.log(dec); 

	var spotCoords = [];
	var sidoCoords = [];
	var sigCoords = [];
	var dongCoords = [];
	$.ajax({
		type : 'POST',
		url : 'www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : 'json',
		success : function(result) {

			for (var i = 0; i < result.length; i++) {
				var coord = new Object();

				coord.id = i + 1;
				coord.code = result[i].code;
				coord.value = result[i].value;
				

				sidoCoords.push(coord);
				(function(i){
					$.ajax({
						type : 'POST',
						url :  'www.kma.go.kr/DFSROOT/POINT/DATA/mdl.'+cood.code[i]+'.json.txt',
						contentType : "application/x-www-form-urlencoded; charset=UTF-8",
						dataType : 'json',
						success : function(result2) {
							
							for (var j = 0; j < result2.length; j++) {
								var coord2 = new Object();

								coord2.id = j + 1;
								coord2.code = result2[j].code;
								coord2.value = result2[j].value;
								sigCoords.push(coord2);
								(function(j){
									$.ajax({
										type : 'POST',
										url :  'www.kma.go.kr/DFSROOT/POINT/DATA/leaf.'+cood2.code[j]+'.json.txt',
										contentType : "application/x-www-form-urlencoded; charset=UTF-8",
										dataType : 'json',
										success : function(result3) {
											
											for (var k = 0; k < result3.length; k++) {
												var coord3 = new Object();

												coord3.id = k + 1;
												coord3.code = result3[k].code;
												coord3.value = result3[k].value;
												coord3.x = result3[k].x;
												coord3.y= result3[k].y;
												dongCoords.push(coord3);
											
											}
										},
										error : function(request, status, error) {
											alert("기상 조회 오류\ncode:" + request.status + "\n" + "message:"
													+ request.responseText + "\n" + "error:" + error);
											
											console.log("기상 조회 오류\ncode:" + request.status + "\n" + "message:"
													+ request.responseText + "\n" + "error:" + error);
										}
									
									})
								})
							}
						},
						error : function(request, status, error) {
							alert("기상 조회 오류\ncode:" + request.status + "\n" + "message:"
									+ request.responseText + "\n" + "error:" + error);
							
							console.log("기상 조회 오류\ncode:" + request.status + "\n" + "message:"
									+ request.responseText + "\n" + "error:" + error);
						}
					
					})
				})
			
			}
			
			
			
		
		},
		error : function(request, status, error) {
			alert("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			
			console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
		}
	});
	
	// 기상청 api 작업중
	// ************
	
	$.ajax({
		type : 'POST',
		url : ROOT_PATH + '/map/getStnList.do',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",

		dataType : 'json',
		success : function(result) {

			for (var i = 0; i < result.length; i++) {
				var coord = new Object();

				coord.id = i + 1;
				coord.name = result[i].STN_NM;
				coord.windSpd = result[i].WIND_SPD;
				coord.windDir = result[i].WIND_DIR;
				coord.latGps = parseFloat(result[i].LAT);
				coord.longGps = parseFloat(result[i].LON);

				spotCoords.push(coord);
			}

			fn_Add_Features(spotCoords);

			map.getView().fit(clusterSource.getSource().getExtent(),
					map.getSize());
		},
		error : function(request, status, error) {
			alert("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
		}
	});
	

	if ($(obj).prop("checked")) {
		$.ajax({
			type : 'POST',
			url : ROOT_PATH + '/map/getStnList.do',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",

			dataType : 'json',
			success : function(result) {

				for (var i = 0; i < result.length; i++) {
					var coord = new Object();

					coord.id = i + 1;
					coord.name = result[i].STN_NM;
					coord.windSpd = result[i].WIND_SPD;
					coord.windDir = result[i].WIND_DIR;
					coord.latGps = parseFloat(result[i].LAT);
					coord.longGps = parseFloat(result[i].LON);

					spotCoords.push(coord);
				}

				fn_Add_Features(spotCoords);

				map.getView().fit(clusterSource.getSource().getExtent(),
						map.getSize());
			},
			error : function(request, status, error) {
				alert("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
						+ request.responseText + "\n" + "error:" + error);
			}
		});
	} else {
		clusterSource.getSource().clear();
	}
}

function fn_Remove_Layer(layerId) {
	for (var i = 0; i < map.getLayers().getLength(); i++) {
		if (map.getLayers().a[i].get("layerId") == layerId) {
			map.removeLayer(map.getLayers().a[i]);
			i--;
		}
	}
}