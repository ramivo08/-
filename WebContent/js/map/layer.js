var wms_title = '비행금지구역';
var wms_val = 'lt_c_aisprhc';
var wms_tile = new ol.layer.Tile({
	name : "aisprhc",
	source : new ol.source.TileWMS({
		url : "http://api.vworld.kr/req/wms?",
		params : {
			LAYERS : wms_val,
			STYLES : wms_val,
			CRS : "EPSG:5179",
			apikey : "4463DCE5-D51A-3A25-987E-646D7E15DFEB",
			DOMAIN : "http://sundosoft.co.kr",
			title : wms_title,
			FORMAT : "image/png"
		}
	}),
	layerId: "aisprhc",
	visible: false,
	type: "userLayer"
});

map.addLayer(wms_tile);

var wms_title = '비행제한구역';
var wms_val = 'lt_c_aisresc';
var wms_tile = new ol.layer.Tile({
	name : "aisresc",
	source : new ol.source.TileWMS({
		url : "http://api.vworld.kr/req/wms?",
		params : {
			LAYERS : wms_val,
			STYLES : wms_val,
			CRS : "EPSG:5179",
			apikey : "4463DCE5-D51A-3A25-987E-646D7E15DFEB",
			DOMAIN : "http://sundosoft.co.kr",
			title : wms_title,
			FORMAT : "image/png"
		}
	}),
	layerId: "aisresc",
	visible: false,
	type: "userLayer"
});

map.addLayer(wms_tile);

function fn_Get_Image(feature){
	var image = null;
	
	if(feature.get('features')[0].get("spotGb") == "B"){
		image = new ol.style.Icon({
			src: "/drone/images/map/dronIcon.gif"
		});
	}else{
		image = new ol.style.Icon({
			src: "/drone/images/map/dronIcon3.png"
		});
	}
	
	return image;
}

var styleCache = {};

function fn_Get_Style (feature, resolution){
	if(feature.get("features")[0].get("name") == null){
		  var size = feature.get('features').length;
		  var style;
		  if (!style) {
		    var color = size>9 ? "192,0,0" : size>4 ? "0,128,0" : "0,0,255";
		    var radius = Math.max(8, Math.min((size+10)*0.75, 20));
		    var dash = 2*Math.PI*radius/6;
		    var dash2 = [ 0, dash, dash, dash, dash, dash, dash ];
		    style = new ol.style.Style({
		    	image: fn_Get_Image(feature),
		    	text: new ol.style.Text({
			        text: feature.get("features")[0].get("spotName"),
			        font: 'bold 12px comic sans ms',
			        textBaseline: 'bottom',
			        offsetY: -20,
			        fill: new ol.style.Fill({
			          //color: '#fff'
			        	color: 'blue'
			        })
		    	})
		    });
		  }
		  return [style];
	}else{
		  var size = feature.get('features').length;
		  var style = styleCache[size];
		  if (!style) {
		    var color = size>9 ? "192,0,0" : size>4 ? "0,128,0" : "0,0,255";
		    var radius = Math.max(8, Math.min((size+10)*0.75, 20));
		    var dash = 2*Math.PI*radius/6;
		    var dash2 = [ 0, dash, dash, dash, dash, dash, dash ];
		    style = styleCache[size] = new ol.style.Style({
		    	image: new ol.style.Icon({
					anchor: [0.5, 46],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					src: "/drone/images/map/clusterIcon.png"
				}),
		      text: new ol.style.Text({
		        text: size.toString(),
		        font: 'bold 12px comic sans ms',
		        textBaseline: 'bottom',
		        offsetY: -30,
		        fill: new ol.style.Fill({
		          //color: '#fff'
		        	color: 'blue'
		        })
		      })
		    });
		  }
		  return [style];
	}
	
}

var clusterSource = new ol.source.Cluster({
	distance: 40,
	source: new ol.source.Vector()
});

var clusterLayer = new ol.layer.AnimatedCluster({
	name: 'Cluster',
	source: clusterSource,
	animationDuration: 700,
	style: fn_Get_Style,
	layerId: 'clusterLayer'
});

map.addLayer(clusterLayer);

