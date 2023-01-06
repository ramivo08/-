function windfieldInactive() {
	
	removeWindStreamVectorLayer();
}

function windfieldlist(item) {
	
	$.ajax({
	    method : "POST",
        url : ROOT_PATH + "/map/getStnList.do",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType : "json",
        cache : false,
        success : windDataLoad,
    	error : function(err) {
            console.log("readyState:"+err.readyState);
            console.log("status:"+err.status);
            console.log("statusText:"+err.statusText);
            console.log("responseText:"+err.responseText);
    	}
    });

}

var windData; // 바람장 데이터
function windDataLoad(result) {
	var time = result[0].TIME;

    var stations = new Object();
	var data = {samples : []};

	for(var i =0; i<result.length; i++){
		var lon = result[i].LON;
		var lat = result[i].LAT;
		var stationId = i + 1;
		// 받아온 관측소, 기상정보
		stations[stationId] = ({
			stationId: stationId,
			name: result[i].STN_NM,
			coordinates : [ parseFloat(lon), parseFloat(lat)]
		});
		data.samples.push({
			stationId : stationId,
			wv: result[i].WIND_SPD,
			wd: result[i].WIND_DIR
		});
	}
	windData = {stations: stations, data : data, maxWindIntensity:gMaxWindIntensity};
	
	renewWindData(windData);
}

function formatCoordinates(lng, lat) {
	var coordinates = [];
	coordinates[0] = lat.toFixed(6) + "º " + (lat >= 0 ? "N" : "S");
	coordinates[1] = lng.toFixed(6) + "º " + (lng >= 0 ? "E" : "W");

    return coordinates;
}

function getWindBearing(degree){
	if(degree >= '11.2' && degree <= '33.7') return 'NNE'
	else if(degree >= '33.7' && degree <= '56.2') return 'NE';
	else if(degree >= '56.2' && degree <= '78.7') return 'ENE';
	else if(degree >= '78.7' && degree <= '101.2') return 'E';
	else if(degree >= '101.2' && degree <= '123.7') return 'ESE';
	else if(degree >= '123.7' && degree <= '146.2') return 'SE';
	else if(degree >= '146.2' && degree <= '168.7') return 'SSE';
	else if(degree >= '168.7' && degree <= '191.2') return 'S';
	else if(degree >= '191.2' && degree <= '213.7') return 'SSW';
	else if(degree >= '213.7' && degree <= '236.2') return 'SW';
	else if(degree >= '236.2' && degree <= '253.7') return 'WSW';
	else if(degree >= '253.7' && degree <= '276.2') return 'W';
	else if(degree >= '276.2' && degree <= '303.7') return 'WNW';
	else if(degree >= '303.7' && degree <= '326.2') return 'NW';
	else if(degree >= '326.2' && degree <= '337.5') return 'NNW';
	else return 'N';
}

getKoreanWindBearing = function(direction){
	var text = "";
	switch(direction){
		case 'N': text = "북풍"; break;
		case 'NNE': text = "북북동풍"; break;
		case 'NE': text = "북동풍"; break;
		case 'ENE': text = "동북동풍"; break;
		case 'E': text = "동풍"; break;
		case 'ESE': text = "동남동풍"; break;
		case 'SE': text = "남동풍"; break;
		case 'SSE': text = "남남동풍"; break;
		case 'S': text = "남풍"; break;
		case 'SSW': text = "남남서풍"; break;
		case 'SW': text = "남서풍"; break;
		case 'WSW': text = "서남서풍"; break;
		case 'W': text = "서풍"; break;
		case 'WNW': text = "서북서풍"; break;
		case 'NW': text = "북서풍"; break;
		case 'NNW': text = "북북서풍"; break;
	}
	return text;
}

var gMaxWindIntensity = null; /* DEFAULT SET (20m/s) */
function setMaxWindIntensity(value){
	gMaxWindIntensity = value;
	windfieldlist('windfield');
}

/***************************************************
 * [ Wind Stream Layer ]
 ***************************************************/

function windFire(listAWSCondition, val){
	if(!isSupportsCanvas()){
		alert("바람장 기능을 지원 할 수 없는 브라우저입니다.");
		return;
	}

	if(!listAWSCondition || listAWSCondition.length <= 0){
		alert("사용할 수 있는 AWS 데이터 정보가 없습니다.");
		windClear();
		return;
	}

 	isWindMapChecked = true;
	var windData = updateWindData(listAWSCondition);

	addWindStreamVectorLayer(windData);
	startWindStream();
}

function mapGetLayersByName(layerName){
	var layers = map.getLayers().getArray();
	for(var i =0, n = layers.length; i < n; i++) {
		var layer = layers[i];
		if (layer.get('name') == layerName) {
			return layer;
		}
	}
	return null;
}

var WIND_STREAM_LAYER = "windStreamLayer";

function renewWindData(windData){
	var windStreamLayer = mapGetLayersByName(WIND_STREAM_LAYER);

	if(windStreamLayer){
		windStreamLayer.updateWindData(windData);
	}
	else{
		addWindStreamVectorLayer(windData);
	}

	setTimeout(function(){
		startWindStream();
	}, 500);
}

function addWindStreamVectorLayer(windData){
	var layer = mapGetLayersByName(WIND_STREAM_LAYER);
	if(layer){
		renewWindData(windData);
	}
	else{
		map.addLayer(new windStreamLayer(windData,{
			name : WIND_STREAM_LAYER,
			extent : ol.proj.transformExtent([13787007.20, 3853725.78, 14701850.64, 4702836.50], 'EPSG:3857', 'EPSG:5179')
		}));
	}
}

//바람장 레이어 제거
function removeWindStreamVectorLayer(){
	stopWindStream();
	var windStreamLayer = mapGetLayersByName(WIND_STREAM_LAYER);
	if(windStreamLayer){
		windStreamLayer.release();
		map.removeLayer(windStreamLayer);
	}
	windStreamLayer = null;
}

//바람장 표출 시작
function startWindStream(){
	var windStreamLayer = mapGetLayersByName(WIND_STREAM_LAYER);
	if(windStreamLayer){
		windStreamLayer.startWindStream();
	}
}

//바람장 표출 정지
function stopWindStream(){
	var windStreamLayer = mapGetLayersByName(WIND_STREAM_LAYER);
	if(windStreamLayer){
		windStreamLayer.stopWindStream();
	}
}