


/*전역변수*/
var ex = {lat: 35, lng: 129};

// gps 값 담기
var ec_Gps = "";
var o3_Gps = "";
var uv_Gps = "";

$(document).ready(function(){
	// 조회한 값들 에서 gps 만 가져와서 지도에 뿌리기
	
	
})
    
function initMap() {
	const latLng = {lat: 34.5220, lng: 128.4794}
	const map = new google.maps.Map(document.getElementById("map"),{
		center : latLng,
		zoom: 7,
		mapTypeId : google.maps.MapTypeId.HYBRID,
		panControl:false,
		streetViewcontrol:false,
		rotateControl:false
	})
	
	//마커
	const marker = new google.maps.Marker({
		position : latLng,
		map,
		title : "Click to zoom"
	});
	
	$.ajax({
		type:"POST",
		url:"/geoGps",
		dataType: "json",
		data : { 'fnmRuleNum' : fnmRuleNum , 'bwmsType' : bwmsType},
		success : function(result){
			alert("성공!");
			
		},
		error : function(error){
			alert("에러");
		}
		
			
		
			
		
	})
	
	var icons = {
		
	}
	var features = [
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5686,128.2619)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		{
			position : new google.maps.LatLng(34.5220,128.4794)
			
		},
		
		
		
	]
	
	//센터로 줌하는 이벤트 리스터
	 map.addListener("center_changed", () => {
		    // 3 seconds after the center of the map has changed, pan back to the
		    // marker.
		    window.setTimeout(() => {
		      map.panTo(marker.getPosition());
		    }, 3000);
		  });
		  marker.addListener("click", () => {
		    map.setZoom(8);
		    map.setCenter(marker.getPosition());
		  });
	
	
//
//	 const coordInfoWindow = new google.maps.InfoWindow();
//	  coordInfoWindow.setContent(createInfoWindowContent(latLng, map.getZoom()));
//	  coordInfoWindow.setPosition(latLng);
//	  coordInfoWindow.open(map);
//	  map.addListener("zoom_changed", () => {
//	    coordInfoWindow.setContent(createInfoWindowContent(latLng, map.getZoom()));
//	    coordInfoWindow.open(map);
//	  });
	
	
}
//const TILE_SIZE = 256;
//
//
//
//function createInfoWindowContent(latLng, zoom) {
//	  const scale = 1 << zoom;
//	  const worldCoordinate = project(latLng);
//	  const pixelCoordinate = new google.maps.Point(
//	    Math.floor(worldCoordinate.x * scale),
//	    Math.floor(worldCoordinate.y * scale)
//	  );
//	  const tileCoordinate = new google.maps.Point(
//	    Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
//	    Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
//	  );
//	  return [
//	    "Korea, IL",
//	    "LatLng: " + latLng,
//	    "Zoom level: " + zoom,
//	    "World Coordinate: " + worldCoordinate,
//	    "Pixel Coordinate: " + pixelCoordinate,
//	    "Tile Coordinate: " + tileCoordinate
//	  ].join("<br>");
//	}
//
//	// The mapping between latitude, longitude and pixels is defined by the web
//	// mercator projection.
//	function project(latLng) {
//	  let siny = Math.sin((latLng.lat * Math.PI) / 180);
//	  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
//	  // about a third of a tile past the edge of the world tile.
//	  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
//	  return new google.maps.Point(
//	    TILE_SIZE * (0.5 + latLng.lng / 360),
//	    TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
//	  );
//	}