<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<%@ include file ="../header.jsp" %>
	
	<app:layout mode="stylescript" type="normal" />
	
<style>
  #map {
    height: 600px;
    width: 100%;
  }
  
  
</style>

</head>
<app:layout mode="header" />
<body>




<h1 style="margin-bottom:50px">전자지도</h1>


<div class = "maps" id="map"></div>




	<script type="text/javascript" src="/js/map/layer.js"></script>
	<script type="text/javascript" src="/js/map/mapFunction.js"></script>
	
	<script type="text/javascript" src="/js/map/mvi.js"></script>
	<script type="text/javascript" src="/js/map/d3.min.js"></script>
	<script type="text/javascript" src="/js/map/wind_stream_layer.js"></script>
	<script type="text/javascript" src="/js/map/windField.js"></script>
	<script type="text/javascript" src="/js/map/turf.min.js"></script>


</body>
</html>