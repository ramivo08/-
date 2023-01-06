

$( document ).ready(function() {
	$("#submit").click(function(){
		if($("#front").val() == '' ||$("#front").val().length == 0 ){
			alert("차량 전면 사진을 등록해주세요.");
		}else if($("#behind").val() == '' ||$("#behind").val().length == 0 ){
			alert("차량 후면 사진을 등록해주세요.");
		}else if($("#side1").val() == '' ||$("#side1").val().length == 0 ){
			alert("차량 측면1 사진을 등록해주세요.");
		}else if($("#side2").val() == '' ||$("#side2").val().length == 0 ){
			alert("차량 측면2 사진을 등록해주세요.");
		}
		
		
		
	})
	
	$("#searchResult").click(function(){
		
		
		location.href=ROOT_PATH + "/target/searchTargetConfirm.do";
//		var form = $("#model");
//		form.action = ROOT_PATH + "/target/searchTargetConfirm.do"
//		form.target = "_self";
//		form.submit();	
//		console.log("!@# searchResult")
	})


	
});


//이전페이지
function preview(){
	history.go(-1)
	
}




function uploadImgPreview(e){
	
	const tagId= e 
	const fileInfo = document.getElementById(tagId).files[0];
	const reader = new FileReader();

    // readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
    reader.onload = function() {
	    EXIF.getData(fileInfo,function(){
	    	const allMetaData = EXIF.getAllTags(fileInfo);
	    	var lat = EXIF.getTag(this,"GPSLatitude");
	    	var long= EXIF.getTag(this,"GPSLongitude");
	    	var originTime= EXIF.getTag(this,"DateTimeOriginal");
	    	
	    	
	    	var latString = Number(lat[0])+Number(lat[1]/60)+Number(lat[2]/3600);
	    	var longString = Number(long[0])+Number(long[1]/60)+Number(long[2]/3600);
	    	var date = originTime.split(" ");
	    	var originDate = date[0].replace(/:/gi,"");
	    	var today = getToday();
	    	
    	  if(originDate != today){
    		  
	       	   alert("차량사진은 당일에 찍은 사진만 올리실 수 있습니다.")
	       	   $("#"+tagId).val("");
	       	   return false;
	       	   /*$("#"+tagId+"Img").attr("src","");*/
	       	   
          }	else{
        	  document.getElementById(tagId+"Img").src = reader.result;
        		var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        		var options = { //지도를 생성할 때 필요한 기본 옵션
        			center: new kakao.maps.LatLng(latString, longString), //지도의 중심좌표.
        			level: 3 //지도의 레벨(확대, 축소 정도)
        		};

        		var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        		var mapTypeControl = new kakao.maps.MapTypeControl();

        		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        		var zoomControl = new kakao.maps.ZoomControl();
        		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        		
        		var marker = new kakao.maps.Marker({ 
        		    // 지도 중심좌표에 마커를 생성합니다 
        		    position: map.getCenter() 
        		}); 
        		// 지도에 마커를 표시합니다
        		marker.setMap(map);
          }
 
         
	    })
	    // 파일의 URL을 Base64 형태로 가져온다.
	   
    }
    if( fileInfo ) {

       // readAsDataURL( )을 통해 파일의 URL을 읽어온다.
       reader.readAsDataURL( fileInfo );
    }
    

   
}
//}

/*
function uploadImgPreview(e) {

        // 업로드 파일 읽기

		var tagId= e
		
        var fileInfo = document.getElementById(tagId).files[0];

        var lastModifiedDate = fileInfo.lastModifiedDate;
        
       var fileYear = lastModifiedDate.getFullYear();
       var fileMonth = "";
	       if (lastModifiedDate.getMonth()+1 < 10) {
	    	   fileMonth = "0"+(lastModifiedDate.getMonth()+1);
			} else {
				fileMonth = ""+(lastModifiedDate.getMonth()+1);
			}
       var fileDate  = ""
    	   if (lastModifiedDate.getDate()+1 < 10) {
    		   fileDate = "0"+lastModifiedDate.getDate();
    		} else {
    			fileDate = ""+lastModifiedDate.getDate();
    		}
       
       
       var fileLastDate = fileYear+fileMonth+fileDate;
       
       var today = getToday();
       
       
      
       if(fileLastDate != today){
    	   alert("차량사진은 당일에 찍은 사진만 올리실 수 있습니다.")
    	   
    	   console.log(fileLastDate + " ======== " + today )
    	   $("#"+tagId).val("");
    	   $("#"+tagId+"Img").attr("src","");
    	  
       }else{
           var reader = new FileReader();
 

        // readAsDataURL( )을 통해 파일을 읽어 들일때 onload가 실행
        reader.onload = function() {


            // 파일의 URL을 Base64 형태로 가져온다.
            document.getElementById(tagId+"Img").src = reader.result;
        };

        if( fileInfo ) {

            // readAsDataURL( )을 통해 파일의 URL을 읽어온다.
            reader.readAsDataURL( fileInfo );
        }
        
       }
   
    }*/


function uploadVideoPreview(e) {

    // 업로드 파일 읽기

	var tagId= e
	
    var fileInfo = document.getElementById(tagId).files[0];

    var lastModifiedDate = fileInfo.lastModifiedDate;
    
   var fileYear = lastModifiedDate.getFullYear();
   var fileMonth = "";
       if (lastModifiedDate.getMonth()+1 < 10) {
    	   fileMonth = "0"+(lastModifiedDate.getMonth()+1);
		} else {
			fileMonth = ""+(lastModifiedDate.getMonth()+1);
		}
   var fileDate  = ""
	   if (lastModifiedDate.getDate()+1 < 10) {
		   fileDate = "0"+lastModifiedDate.getDate();
		} else {
			fileDate = ""+lastModifiedDate.getDate();
		}
   
   
   var fileLastDate = fileYear+fileMonth+fileDate;
   
   var today = getToday();
   
   
  
   if(fileLastDate != today){                                                                                                                                                                                                                                                                                                                                                                                                                                          
	   alert("동영상은 당일에 찍은 동영상만 올리실 수 있습니다.")
	   
	   console.log(fileLastDate + " ======== " + today )
	   $("#"+tagId).val("");
	   $("#"+tagId+"Vehicle").attr("src","");
	  
   }else{
    var video = document.getElementById(tagId+"Vehicle");
    var videoUrl = URL.createObjectURL(fileInfo);
    video.setAttribute("src",videoUrl);
    video.play();
    
    
   }

}



/*function uploadImgPreview(){
    var fileInfo = document.getElementById( "frontUpload" ).files[0];
    EXIF.getData(fileInfo,function () {
        
        var make = EXIF.getTag(fileInfo,"DateTimeOriginal");
        

        
        
 
        // 메타데이터 값 얻기
        console.log(make);
        

       
    });

}*/





