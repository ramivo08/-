/**********************************
 * [ WIND STREAM LAYER ]
 *
 * [주의]
 * 버전이 변경이 되면 관련 코드를 수정해야합니다.
 *
 * 2016 - sykim@egiskorea.com
 **********************************/

/*********************************************************
 * Wind Stream Layer
 * (http://openlayers.org/en/latest/apidoc/ol.layer.Group.html)
 *********************************************************/

var windStreamLayer = function(windData, options){
	if(!(this instanceof windStreamLayer)) {
		return new windStreamLayer(windData, options);
	}
	var baseExtent = (options && options.extent) ? options.extent : undefined;

	var streamLayer =  new ol.layer.Image({
		name:'streamLayer',
		extent : baseExtent,
		minResolution : 0.001,
		maxResolution : 10000,
		map:map,
		mapCanvas: document.createElement('canvas'),
		source: new ol.source.ImageCanvas({
			canvasFunction : function(extent, resolution, pixelRatio, size, projection){
				   var source = streamLayer.getSource();
				   var canvas = streamLayer.get('mapCanvas');
				   var context = canvas.getContext('2d');

				   var canvasWidth = size[0], canvasHeight = size[1];
				   if(canvas.width != parseInt(canvasWidth) || canvas.height != parseInt(canvasHeight)){
					   canvas.setAttribute('width', parseInt(canvasWidth));
					   canvas.setAttribute('height', parseInt(canvasHeight));
				   }

				   var isIntersects = ol.extent.intersects(map.getView().calculateExtent(map.getSize()), baseExtent);
		           var frameInfo = source.get('frameInfo');
		           if(frameInfo && isIntersects){
			           // Canvas extent is different than map extent, so compute delta between
			           // left-top of map and canvas extent.
			           var mapExtent = map.getView().calculateExtent(map.getSize());
			           var canvasOrigin = map.getPixelFromCoordinate([extent[0], extent[3]]);
			           var mapOrigin = map.getPixelFromCoordinate([mapExtent[0], mapExtent[3]]);
			           var delta = [mapOrigin[0]-canvasOrigin[0], mapOrigin[1]-canvasOrigin[1]];

			           var settings = frameInfo.settings;
		        	   var bounds = frameInfo.bounds;
		        	   var buckets = frameInfo.buckets;
		        	   var view = frameInfo.view;

		               var dXpos = (delta[0] + view.x);
	          		   var dYpos = (delta[1] + view.y);

		               var prev = context.globalCompositeOperation;
		               context.globalCompositeOperation = "destination-in";

		        	   context.lineWidth = settings.particleLineWidth;
		               context.fillStyle = settings.fadeFillStyle;

		               context.fillRect(0, 0, canvasWidth, canvasHeight);
		               context.globalCompositeOperation = prev;

		               //Draw new particle trails.
		               buckets.forEach(function(bucket, i) {
		              	 if (bucket.length > 0) {
		              		 context.beginPath();
		              		 context.strokeStyle = settings.styles[i];

		              		 bucket.forEach(function(particle) {
	              				 context.moveTo(dXpos +  particle.x, dYpos + particle.y);
		              			 context.lineTo(dXpos + particle.xt, dYpos + particle.yt);
		              			 particle.x = particle.xt;
		              			 particle.y = particle.yt;
		              		 });
		              		 context.stroke();
		              	 }
		               });
		           }
		           else{
		        	   context.clearRect(0, 0, canvasWidth, canvasHeight);
		           }

		           source.set('frameInfo', null);
		           return canvas;
			},
			projection : 'EPSG:5179'
		}),
		zIndex : 3
	});

	var stationFeatures = getStationFeatures(windData);

	function getStationFeatures(windData){
		var stationFeatures = [];
		if(windData && windData.data && windData.data.samples){
			for(var i=0;i<windData.data.samples.length;i++){
				stationFeatures.push(new ol.Feature({
					  geometry: new ol.geom.Point(ol.proj.transform(windData.stations[windData.data.samples[i].stationId].coordinates, 'EPSG:4326', 'EPSG:5179')),
					  id: windData.data.samples[i].stationId,
					  name: windData.stations[windData.data.samples[i].stationId].name,
					  wd: windData.data.samples[i].wd,
					  wv: windData.data.samples[i].wv,
					  coordinate:windData.stations[windData.data.samples[i].stationId].coordinates
				}));
			}
		}
		return stationFeatures;
	}

	var stationLayer = new ol.layer.Vector({
		name:'stationLayer',
		extent : baseExtent,
		map:map,
		source : new ol.source.Vector({
			features: stationFeatures
		}),
		visible:false,
		zIndex:2
	});

	this.layerGroup = new ol.layer.Group(options);

	//-> 임시 오버레이 맵으로만 적용하자, overview에서 동시 표현 문제 발생 회피
	//this.layerGroup.setLayers(new ol.Collection([/*stationLayer, streamLayer ,bboxLayer]));

	//바람장 분석 객체 생성
	var createWindStreamProcess = function(progressCallback){
		var _isIntersects = ol.extent.intersects(map.getView().calculateExtent(map.getSize()), baseExtent);
		if(!windData || _isIntersects){
			var _extent = ol.extent.getIntersection(map.getView().calculateExtent(map.getSize()), baseExtent);

			var _dl = map.getPixelFromCoordinate([_extent[0], _extent[1]]);
			var _ur = map.getPixelFromCoordinate([_extent[2], _extent[3]]);
			var _view = {x: _dl[0], y : _ur[1], width: _ur[0] - _dl[0], height: _dl[1] - _ur[1]};
			return new VWWindStreamProcess(ol.proj.transformExtent(_extent, "EPSG:5179", "EPSG:4326"), _view, windData,
					function(settings, bounds, buckets){
				var source = streamLayer ? streamLayer.getSource() : null;
				if(source){
					source.set('frameInfo', {settings:settings, bounds:bounds, buckets:buckets, view: _view});
					source.changed();
				}
			}, progressCallback);
		}
		return null;
	}

	var loaderOverlay = null;
	function showProgress(){
		closeProgress();
		var resolution = map.getView().getResolution();
		if(streamLayer.get('minResolution') <= resolution && resolution <= streamLayer.get('maxResolution')){
			loaderOverlay = createLoaderOverlay();
			map.addOverlay(loaderOverlay);
			map.renderSync();
		}
		else{
			loaderOverlay = null;
		}
	}

	function closeProgress(){
		if(loaderOverlay){
			map.removeOverlay(loaderOverlay);
		}
		loaderOverlay = null;
	}

	var windStreamProcess = null;

	//바람장 표출 시작
	this.layerGroup.startWindStream = function(){
		if(windStreamProcess){
			this.stopWindStream();
		}
		setTimeout(function(){
			windStreamProcess = createWindStreamProcess(closeProgress);
			streamLayer.setVisible(true);
			showProgress();
		}, 500);
	};

	//바람장 표출 정지
	this.layerGroup.stopWindStream = function(){
		if(windStreamProcess){
			windStreamProcess.stop();
		}
		windStreamProcess = null;
		streamLayer.setVisible(false);
		streamLayer.getSource().set('frameInfo', null);
		streamLayer.getSource().changed();

		closeProgress();
	};

	//바람장 레이어 제거
	this.layerGroup.release = function(){
		this.stopWindStream();
		if(streamLayer){
			streamLayer.setMap(null);
		}
		streamLayer = null;
		if(stationLayer){
			stationLayer.setMap(null);
		}
		stationLayer = null;
	};

	//바람장 데이터 업데이트
	this.layerGroup.updateWindData = function(data){
		if(windStreamProcess){
			this.stopWindStream();
		}

		windData = data;
		stationFeatures = getStationFeatures(windData);
		stationLayer.setSource(new ol.source.Vector({
			features: stationFeatures
		}));

		setTimeout(function(){
			windStreamProcess = createWindStreamProcess(closeProgress);
			streamLayer.setVisible(true);
			showProgress();
		}, 500);
	};

	//바람장 데이터 반환
	this.layerGroup.getWindData = function(coordinate){
		var result = null;
		try{
			if(streamLayer && streamLayer.getVisible()
					&& ol.extent.containsXY(baseExtent, coordinate[0], coordinate[1])
					&& windStreamProcess) {
				result = windStreamProcess.getWindInfo(ol.proj.transform(coordinate, "EPSG:5179", "EPSG:4326"));
			}
		}catch(exception){}
		return result;
	};

	function createLoaderOverlay(){
		var intersection = ol.extent.getIntersection(map.getView().calculateExtent(map.getSize()), baseExtent);
		var lUp = map.getPixelFromCoordinate([intersection[0], intersection[3]]);
		var rDn = map.getPixelFromCoordinate([intersection[2], intersection[1]]);
		var _width = rDn[0] - lUp[0];
		var _height = rDn[1] - lUp[1];

		function createLoaderElement(){
			var loader = document.createElement('div');
			loader.className = 'streamLoader';
			loader.style.width = _width + 'px';
			loader.style.height = _height + 'px';

			var progress = document.createElement('span');
			progress.className = 'ol-loading-panel ol-unselectable';
			loader.appendChild(progress);

			return loader;
		}
		var element = createLoaderElement();
		return new ol.Overlay({
			name:'loaderOverlay',
			position: ol.extent.getCenter(intersection),
			positioning: 'center-center',
			element: element,
			stopEvent: false
		});
	};

	return this.layerGroup;
}

/*********************************************************
 * Wind Stream Process
 *********************************************************/
var VWWindStreamProcess = function(extent, view, windData, drawFrameCallback, progressCallback){
	var τ = 2 * Math.PI;
	var MAX_TASK_TIME = 100; 			// amount of time before a task yields control (milliseconds)
	var MIN_SLEEP_TIME = 25;   			// amount of time a task waits before resuming (milliseconds)
	var NIL = -2;       				// non-existent vector
	var INVISIBLE = -1; 			    // an invisible vector

	var PARTICLE_LINE_WIDTH = 2;
	var INTENSITY_SCALE_STEP = 10;
	var MAX_WIND_INTENSITY = (windData && windData.maxWindIntensity) ? windData.maxWindIntensity :30;

	//데이터
	var stations = windData.stations;
	var data = windData.data;


	//분석 정지
	var cancelOperation = false;
	this.stop = function(){
		windFields = null;
		cancelOperation = true;
	}

	var windFields = null;

	//지점 정보 반환 : EPSG4326 기준
	this.getWindInfo = function(coordinate){
		var result = null;
		try{
			if(settings && windFields){
				var p = settings.projection(coordinate);
				var v = windFields(p[0], p[1]);
				if (v[2] >= INVISIBLE) {
					result = {windDegree:formatWindDegree(v[0], v[1]),
							windText:formatVector(v[0], v[1])
							//coordinateText:formatCoordinates(coordinate[0], coordinate[1])
							};
		        }
			}
		}catch(exception){}
		return result;
	}

	var settings = createSettings();

	//Wind 표출 정보 설정
	function createSettings(){
		var isFF = /firefox/i.test(navigator.userAgent);
		var projection = createAlbersProjection(extent[0], extent[1], extent[2], extent[3], view);
		var bounds = createDisplayBounds(extent[0], extent[1], extent[2], extent[3], projection);

		var styles = [];
		var settings = {
		      projection: projection,
		      displayBounds: bounds,
		      particleCount: Math.round(bounds.height / 0.37),// Math.round(bounds.height / 0.24), // 표시 화면에 뿌려질 파티클의 수량
		      maxParticleAge: 50, //파티클의 최대 라이프 값
		      velocityScale: (bounds.height / 800).toFixed(3), //(bounds.height / 700).toFixed(3), //단위 벡터 당 픽셀 수(길이)와 입자의 이동 속도
		      fieldMaskWidth: isFF ? 2 : Math.ceil(bounds.height * 0.06),  // Wide strokes on FF are very slow //FF에 넓은 스트로크는 매우 느린
		      fadeFillStyle: isFF ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.93)",  // FF Mac alpha behaves differently ..FF 맥 알파는 다르게 동작
		      frameRate: 50,  //재생 프레임 생성 대기 시간(밀리세컨드)
		      styles: styles,
		      styleIndex: function(m) {  // map wind speed to a style  //맵에 반영할 풍속 스타일
		         return settings.styles.styleIndex(m);
		      },
			  particleLineWidth : PARTICLE_LINE_WIDTH
		};

		function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		function windIntensityColorScale(step, maxWind) {
			var opacity = 0.7;
			var result = [
				"rgba(" + hexToR('#cfe7ff') + ", " + hexToG('#cfe7ff') + ", " + hexToB('#cfe7ff') + ", " + opacity + ")",
				"rgba(" + hexToR('#add2ff') + ", " + hexToG('#add2ff') + ", " + hexToB('#add2ff') + ", " + opacity + ")",
				"rgba(" + hexToR('#80b8ff') + ", " + hexToG('#80b8ff') + ", " + hexToB('#80b8ff') + ", " + opacity + ")",
				"rgba(" + hexToR('#77b5c8') + ", " + hexToG('#77b5c8') + ", " + hexToB('#77b5c8') + ", " + opacity + ")",
				"rgba(" + hexToR('#80bab9') + ", " + hexToG('#80bab9') + ", " + hexToB('#80bab9') + ", " + opacity + ")",
				"rgba(" + hexToR('#bce45e') + ", " + hexToG('#bce45e') + ", " + hexToB('#bce45e') + ", " + opacity + ")",
				"rgba(" + hexToR('#f2ff13') + ", " + hexToG('#f2ff13') + ", " + hexToB('#f2ff13') + ", " + opacity + ")",
				"rgba(" + hexToR('#ffeb00') + ", " + hexToG('#ffeb00') + ", " + hexToB('#ffeb00') + ", " + opacity + ")",
				"rgba(" + hexToR('#ffb200') + ", " + hexToG('#ffb200') + ", " + hexToB('#ffb200') + ", " + opacity + ")",
				"rgba(" + hexToR('#ff7101') + ", " + hexToG('#ff7101') + ", " + hexToB('#ff7101') + ", " + opacity + ")"
			]
//			var result = [
//				"rgba(" + hexToR('#00ffff') + ", " + hexToG('#00ffff') + ", " + hexToB('#00ffff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#64f0ff') + ", " + hexToG('#64f0ff') + ", " + hexToB('#64f0ff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#87e1ff') + ", " + hexToG('#87e1ff') + ", " + hexToB('#87e1ff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#a0d0ff') + ", " + hexToG('#a0d0ff') + ", " + hexToB('#a0d0ff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#b5c0ff') + ", " + hexToG('#b5c0ff') + ", " + hexToB('#b5c0ff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#c6adff') + ", " + hexToG('#c6adff') + ", " + hexToB('#c6adff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#d49bff') + ", " + hexToG('#d49bff') + ", " + hexToB('#d49bff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#e185ff') + ", " + hexToG('#e185ff') + ", " + hexToB('#e185ff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#ec6dff') + ", " + hexToG('#ec6dff') + ", " + hexToB('#ec6dff') + ", " + 0.5 + ")",
//				"rgba(" + hexToR('#ff1edb') + ", " + hexToG('#ff1edb') + ", " + hexToB('#ff1edb') + ", " + 0.5 + ")"
//			]
			result.styleIndex = function(m) {  // map wind speed to a style
				return Math.floor(Math.min(m, maxWind) / maxWind * (result.length - 1));
			};
			return result;
		}
		settings.styles = windIntensityColorScale(INTENSITY_SCALE_STEP, MAX_WIND_INTENSITY);
		return settings;
	}

	//필드 생성 및 Frame 표출
	interpolateField(stations, data, settings, {
		fieldMask: function(x, y) {
			return true;
	    },
	    displayMask: function(x, y) {
    	  return true;
	    }
	}, function(settings, columns){
		if(!cancelOperation) {
			windFields = createField(columns);
			animate(settings, windFields, drawFrameCallback);
			if(progressCallback){progressCallback();}
		} else {
			//gabage!!!
			settings = null;
			columns = null;
			drawFrameCallback = null;
			progressCallback = null;
		}
	});

	//경계 박스와 좌표를 맵핑
	function createAlbersProjection(lng0, lat0, lng1, lat1, view) {
		var projection = d3.geo.albers()
			.rotate([-((lng0 + lng1) / 2), 0])
			.center([0, (lat0 + lat1) / 2])
			.scale(1)
			.translate([0, 0]);

		var p0 = projection([lng0, lat0]);
		var p1 = projection([lng1, lat1]);

		var s = 1 / Math.max((p1[0] - p0[0]) / view.width, (p0[1] - p1[1]) / view.height);
		var t = [view.width / 2, view.height / 2];

		return projection.scale(s).translate(t);
	}

	//화면 표출 경계 정보 생성
	function createDisplayBounds(lng0, lat0, lng1, lat1, projection) {
		var upperLeft = projection([lng0, lat1]).map(Math.floor);
		var lowerRight = projection([lng1, lat0]).map(Math.ceil);
		return {
			x: upperLeft[0],
			y: upperLeft[1],
			width: lowerRight[0] - upperLeft[0] + 1,
			height: lowerRight[1] - upperLeft[1] + 1
		}
	}

    //벡터 필드 보간
	function interpolateField(stations, data, settings , masks, completedCallback) {
		if (data.samples.length === 0) {
			alert('데이터가 없습니다.');
			return;
		}

		var points = buildPointsFromSamples(stations, data.samples, settings.projection, function(sample) {
		     return isValidSample(sample) ? componentize([sample.wd, sample.wv]) : null;
		 });


		var interpolate = mvi.inverseDistanceWeighting(points, (data.samples.length > 5) ? 5 : data.samples.length);

		var columns = [];
		var bounds = settings.displayBounds;
		var displayMask = masks.displayMask;
		var fieldMask = masks.fieldMask;
		var xBound = bounds.x + bounds.width;
		var yBound = bounds.y + bounds.height;
		var x = bounds.x;

		function interpolateColumn(x) {
			var yMin, yMax;
			for (yMin = 0; yMin < yBound && !fieldMask(x, yMin); yMin++) {
			}
			for (yMax = yBound - 1; yMax > yMin && !fieldMask(x, yMax); yMax--) {
			}

			if (yMin <= yMax) {
				var column = [];
				var offset = column[0] = yMin - 1;
				for (var y = yMin; y <= yMax; y++) {
					var v = null;
					if (fieldMask(x, y)) {
						v = [0, 0, 0];
						v = interpolate(x, y, v);
						v[2] = displayMask(x, y) ? Math.sqrt(v[0] * v[0] + v[1] * v[1]) : INVISIBLE;
						v = mvi.scaleVector(v, settings.velocityScale);
					}
					column[y - offset] = v;

			   }
			   return column;
			}
			else {
		          return null;
		    }
	  }

	  (function batchInterpolate() {
	      try {
	          var start = +new Date;
	          while (x < xBound && !cancelOperation) {
	              columns[x] = interpolateColumn(x);
	              x += 1;
	              if ((+new Date - start) > MAX_TASK_TIME) {
	                  setTimeout(batchInterpolate, MIN_SLEEP_TIME);
	                  return;
	              }
	          }
	          if(!cancelOperation && completedCallback){ completedCallback(settings, columns); }
	          else{
		  			//garbage!!!
		  			settings = null;
		  			columns = null;
					drawFrameCallback = null;
					progressCallback = null;
		  			completedCallback = null;
	          }
	      }
	      catch (e) {
	      	alert(e);
	      }
	  	})();

	  return true;
	}

	function buildPointsFromSamples(stations, samples, projection, transform) {
		var points = [];
		samples.forEach(function(sample) {
			var point = projection(stations[sample.stationId].coordinates);
			var value = transform(sample);
			if (value !== null) {
				points.push([point[0], point[1], value]);
			}
		});
		return points;
	}

	function createField(columns) {
		var nilVector = [NaN, NaN, NIL];

		var field = function(x, y) {
			var column = columns[Math.round(x)];
			if (column) {
				var v = column[Math.round(y) - column[0]];  // the 0th element is the offset--see interpolateColumn
				if (v) {
		              return v;
		        }
			}
		    return nilVector;
		}

		field.randomize = function() {
			var w = [0];
	    	for (var i = 1; i <= columns.length; i++) {
	    		var column = columns[i - 1];
	    		w[i] = w[i - 1] + (column ? column.length - 1 : 0);
	    	}
	    	var pointCount = w[w.length - 1];

	    	return function(o) {
	    		var p = Math.floor(rand(0, pointCount));  // choose random point index
	    		var x = binarySearch(w, p);  // find column that contains this point
	    		x = x < 0 ? -x - 2 : x;  // when negative, x refers to _following_ column, so flip and go back one
	    		while (!columns[o.x = x]) {  // skip columns that have no points
			      x++;
	    		}
	    		// use remainder of point index to index into column, then add the column's offset to get actual y
	    		o.y = p - w[x] + 1 + columns[x][0];
	    		return o;
	    	}
		}();
		return field;
	}

	//바람 벡터를 픽셀 영역 안의 u,v-component vector로 변환
	function componentize(wind) {
		var φ = wind[0] / 360 * τ;  		// meteorological wind direction in radians
		var m = wind[1];  					// wind velocity, m/s
		var u = -m * Math.sin(φ);  			// u component, zonal velocity
		var v = -m * Math.cos(φ);  			// v component, meridional velocity
		return [u, -v]; 					// negate v because pixel space grows downwards
	}

	//바람 데이터의 풍속, 풍향 validation
    function isValidSample(sample) {
    	return sample.wd === +sample.wd && sample.wv === +sample.wv;
    }

    //색상 스타일 함수
    function asColorStyle(r, g, b, a) {
    	return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    function formatVector(x, y) {
        var d = Math.atan2(-x, y) / τ * 360;  // calculate into-the-wind cardinal degrees
        var wd = Math.round((d + 360) % 360 / 5) * 5;  // shift [-180, 180] to [0, 360], and round to nearest 5.
        var m = Math.sqrt(x * x + y * y);
        return wd.toFixed(0) + "º @ " + m.toFixed(1) + " m/s";
    }

    function formatWindDegree(x, y){
        var d = Math.atan2(-x, y) / τ * 360;  // calculate into-the-wind cardinal degrees
        var wd = Math.round((d + 360) % 360 / 5) * 5;  // shift [-180, 180] to [0, 360], and round to nearest 5.
        return wd.toFixed(0);
    }

    function formatCoordinates(lng, lat) {
        return Math.abs(lat).toFixed(6) + "º " + (lat >= 0 ? "N" : "S") + ", " +
            Math.abs(lng).toFixed(6) + "º " + (lng >= 0 ? "E" : "W");
    }

    //이진 탐색
    function binarySearch(a, v) {
    	var low = 0, high = a.length - 1;
    	while (low <= high) {
    		var mid = low + ((high - low) >> 1), p = a[mid];
    		if (p < v) {
    			low = mid + 1;
    		}
    		else if (p === v) {
    			return mid;
    		}
    		else {
    			high = mid - 1;
    		}
    	}
    	return -(low + 1);
    }

    //min (inclusive) and max (exclusive) 사이 랜덤 값
    function rand(min, max) {
    	return min + Math.random() * (max - min);
    }

	function animate(settings, field, drawFrameCallback) {
		var bounds = settings.displayBounds;
		var buckets = settings.styles.map(function() { return []; });
		var particles = [];
		for (var i = 0; i < settings.particleCount; i++) {
			particles.push(field.randomize({age: rand(0, settings.maxParticleAge)}));
		}

		function evolve() {
			buckets.forEach(function(bucket) { bucket.length = 0;});
			particles.forEach(function(particle) {
				if (particle.age > settings.maxParticleAge) {
					field.randomize(particle).age = 0;
				}
				var x = particle.x;
				var y = particle.y;
				var v = field(x, y);  // vector at current position
				var m = v[2];
				if (m === NIL) {
					particle.age = settings.maxParticleAge;  // particle has escaped the grid, never to return...
				}
				else {
					var xt = x + v[0];
					var yt = y + v[1];
					if (m > INVISIBLE && field(xt, yt)[2] > INVISIBLE) {
						// Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
						particle.xt = xt;
						particle.yt = yt;
						buckets[settings.styleIndex(m)].push(particle);
					}
					else {
						// Particle isn't visible, but it still moves through the field.
						particle.x = xt;
						particle.y = yt;
					}
				}
				particle.age += 1;
			});
		}

		function draw() {
			drawFrameCallback(settings, bounds, buckets);
		}

		function cancel(){
			if(frameReqId) { try{ cancelAFrame(frameReqId); }catch(exception){} frameReqId = null;}
			if(fetchTimer){ clearTimeout(fetchTimer); fetchTimer = null;}

  			//garbage!!!
  			settings = null;
  			columns = null;
  			particles = null;
  			windFields = null;
  			field = null;
			drawFrameCallback = null;
			progressCallback = null;
  			completedCallback = null;
		}

		(function frame() {
			try {
				if(!cancelOperation){
					frameReqId = requestAnimationFrame(function(){
						//Works...
						evolve();
						draw();
						//requestAnimationFrame(frame);
						fetchTimer = setTimeout(function() {
							frame();
						},settings.frameRate);
					});
				}
				else{
					cancel();
				}
			}
			catch (e) {
				alert(e);
			}
		})();
	}
}

//Request Animation Frame
window.requestAnimationFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 20);
			};
})();

//Cancel Request Animation Frame
window.cancelAFrame = (function () {
    return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            };
})();
