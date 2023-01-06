$(document).ready(function () {
	
	
	
	
	
	
	
	
	
	
	
//	
//	$("#submit_btn").click(function(){
//		
//		
//		
//		var form = $("form")[0];
//		var formData = new FormData(form);
//		
//
//		$.ajax({
//			type : "POST",
//			url : "/virtual/selectShipInfo.do",
//			data : formData,
//			dataType:'json',
//			success :function(data){
//				
//				/*SQL 조회 결과 */
//				var result = data.virtualResult;
//				console.log(result);
//				
//				var wqi = result.wqi
//				var salt = result.salt
//				var depth = result.depth
//				var metter = result.matter
//				var temp = result.temp
//				var harborNm = result.harborNm
//				
//				/*paramMap */
//				
//				var param = data.paramMap;
//				
//				
//				
//				 
//				
//				
//				
//			},
//			error:function(request,status,error)
//			{   
//				alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); }
//
//				
//			
//		})
//		
//		
//		if($("#virtual_result").css("display") == "block"){
//			
//			$("#virtual_result").css("display","none");
//		}else{
//			$("#virtual_result").css("display","block");
//		}
//		
//		
//		
//		
//	})
//	
//	
//	
	
	


})

function selectShipNm(){ 
	var shipNm = $("#ship_nm option:selected").val();
	$.ajax({
		type : "POST",
		url : "/virtual/selectVirtualShipInfo.do",
		data : {"shipNm":shipNm},
		dataType:'json',
		success :function(data){
			var result = data.virtualResult
			$("#imo_num").val(result.imoNo);
				
		}

	})
	
	
	
}


function selectOptionParam(){
	
	var bwmsType = $("#bwmsType option:selected").val();
	
	$.ajax({
		type : "POST",
		url : "/virtual/selectOptionParam.do",
		data : {"bwmsType":bwmsType},
		dataType:'json',
		success :function(data){
			var result = data.optionResult
			
				$("#tempMin").val(result.tempMin);
				$("#tempMax").val(result.tempMax);
				$("#saltMin").val(result.saltMin);
				$("#saltMax").val(result.saltMax);
				$("#matterMin").val(result.matterMin);
				$("#matterMax").val(result.matterMax);
		}

	})
}



function selectShipInfo(){
	
	
		
	
	var imoNo 			= $("#imo_num").val();
	var shipNm			= $("#ship_nm").val();
	var bwmsType		= $("#bwmsType option:selected").val();
	var endPoint 		= $("#endPoint option:selected").val();
	var startDate 		= $("#startDate").val();
	var endDate 		= $("#endDate").val();
	var tempMin			= $("#tempMin").val();
	var tempMax			= $("#tempMax").val();
	var saltMin			= $("#saltMin").val();
	var saltMax			= $("#saltMax").val();
	var matterMin		= $("#matterMin").val();
	var matterMax		= $("#matterMax").val();
	
	
	
	if(imoNo.length == 0){
		alert("IMO 번호를 입력해주세요.");
		return false;
	}else if (shipNm.length == 0){
		alert("선박 이름을 입력해주세요.")
		return false;
	}else if(bwmsType == "N"  ){
		alert("BMWS 장치를 선택해주세요.");
		return false;
	}
	else if (endPoint == "N"){
		alert("운전지역을 선택해주세요.")
		return false;
	}else if (startDate.length == 0){
		alert("출발 일자를 입력해주세요.")
		return false;
	}else if (endDate.length == 0){
		alert("도착 일자를 입력해주세요.")
		return false;
	}else if (tempMin.length == 0 || tempMax.length == 0){
		alert("수온 값을 확인해주세요.")
		return false;
	}else if (saltMin.length == 0 || saltMax.length == 0){
		alert("염분 값을 확인해주세요.")
		return false;
	}else if (matterMin.length == 0 || matterMax.length ==0){
		alert("부유물질 입력값을 확인해주세요.")
		return false;
	}
	
	
	
//	
//	var data = { 
//			imoNo 			:	 imoNo,
//			shipNm 			:	 shipNm,
//			startPoint 		:	 startPoint,
//			endPoint 		:	 endPoint,
//			startDate		:	 startDate,
//			endDate			:	 endDate,
//			temp			: 	 temp,
//			salt			:	 salt,
//			matter			:	 matter
//		  }
//		
	
	var textNomal = "운전 적합"
	var textWarning = "운전주의"
	var textImpossible = "운전 부적합"
	
	/*결과*/
	var heightTemp = "높은 수온"	
	var heightSalt = "높은 염분"	
	var heightMatter = "높은 부유물질"	
	/*조치사항*/
	var messageN = "안전한 운항 가능합니다."
	var messageM = "BWMS 처리장치 상태를 지속적으로 관찰 바랍니다."
	var messageH = "운전 부적합 입니다. 수치가 너무 높습니다."
	/*EXPLANE 초기화*/
	var textExplane  = textNomal	
	var driveMassage = messageN
	var resultMessage = "";
	
	
	var action = "";
	var Hmatter = "부유물질 수치가 높습니다."
	var Htemp = "수온 수치가 높습니다."
	var Hsalt = "염분 수치가 높습니다."
	
	
	var data = $("#virtualInfo").serialize();

	$.ajax({
		type : "POST",
		url : "/virtual/selectOceanMedian.do",
		data : data,
		dataType:'json',
		success :function(data){
			
			
			
			
			var root = $(".virtual_result")
			textExplane  = textNomal
			driveMassage = messageN
		
			root.remove()
			
			/*SQL 조회 결과 */
			
			var result = data.medianResult;
	
			console.log(data);
			
//			var stNm = result.stName
//			var month = result.month
//			var year = result.year 
//			var salt = result.salinity
//			var matter = result.ss
//			var temp = result.temp
//			var ph = result.ph
//			var Do = result.do
//			var cod = result.cod
//			var nh4n = result.nh4n
//			var no2n = result.no2n
//			var no3n = result.no3n
//			var din = result.din
//			var tn = result.tn
//			var dip = result.dip
//			var tp1 = result.tp1
//			var sio2Si = result.sio2Si
//			var chla = result.chla
//			var trans = result.trans
			
			/*paramMap */
			
			var param = data.paramMap;
			
			var startDate = param.startDate
			var endDate	= param.endDate
			
			//결과 항구이름
//			$(".harborNm").text(harborNm+" 정보");
			//결과 선박이름 
			$(".shipNm").text(param.ship_nm);
			//결과 imonum
			$("#imoNo").text(param.imo_num);
			//결과 startDate
			$("#strtDe").text(param.startDate);
			//결과 endDate
			$("#endDe").text(param.endDate);
			//결과 수온
			$("#tempCondition").text(param.temp);
			//결과 염분
			$("#saltCondition").text(param.salt);
			//결과 부유물질
			$("#matterCondition").text(param.matter);
			
			 /*수온,염분,부유물질 계산식*/
	
			// 운전가능,운전주의,운전불가
			/*if(tempResult < 100 && saltResult < 100 && matterResult <100){
				textExplane = textNomal;
			}else*/
//			if(100< tempResult && tempResult < 120 || 100< saltResult && saltResult < 120 || 100< matterResult&& matterResult <120){
//				textExplane = textWarning;
//				driveMassage = messageM;
//				
//			}
//			if(tempResult > 120 || saltResult > 120 || matterResult >120){
//				textExplane = textImpossible;
//				driveMassage = messageH;
//			}
			
			
			//각 조건이 기준치를 넘었을 때
//			if(100< tempResult && tempResult < 120 || tempResult > 120 ){
//				resultMassege = Htemp;
//			}
//			if(100< saltResult && saltResult < 120 || saltResult > 120 ){
//				resultMassege = Hsalt;
//			}
//			if(100< matterResult && matterResult < 120 || matterResult > 120 ){
//				resultMassege = Hmatter;
//			}
			
		
			
			
			var div1 = $("#button_after")
			/*append 할 텍스트 (가상운전 결과 )*/
			var text =
				
//				'<div class="row "  id="virtual_result" >'+
//				'<div class="col-md-6 ">'+
				'<div class="virtual_result">'
			  + '<div class="card">'
				+'<h3 class="card-header harborNm" >항 정보</h3>'
				+'<div class="card-body">'
				+'	<div class="row mt-3 mb-3">'
//				+'		<h3 ><span class="harborNm">'+harborNm  +'</span></h3>'
				+'	</div>'
				+'	<div class="row mt-3 mb-3">'
				+'		<table class="table table-striped h_t">'
	             +'       <thead>'
	             +'<tr>'
	              +'<th colspan="6">해양환경정보(중간값)</th>'
	               +'</tr>'
	              +'        <tr>'
	               +'       	<th>계절 구분</th>'
	               +'       	<th>관측시기</th>'
	               +'       	<th>수온</th>'
	                +'      	<th>염분</th>'
	                 +'     	<th>부유물질</th>'
	                  +'    	<th>적정 시기</th>'
	                    +'  </tr>'
	                    +' </thead>'
	                   +' <tbody id="medianList">'
	           
	                    +' </tbody>'
	                  +' </table>'
														
					+' </div>'
				
					
					+' <div class="row mt-3 mb-3">'
				
					+' </div>'
				+' </div>'
			+' </div>'
			
//		+'</div>'
//		+'<div class="col-md-6 ">'
			+'<div class="card">'
				+'<h3 class="card-header">가상운전 결과</h3>'
				+'<div class="card-body">'
				+'<div class="padding-25">'
				+'<div class="row">'
				+'<h5>'+param.ship_nm +' 선박 가상운전 결과  </h5>'
				+'</div>'
					+'<div class="row mt-3 ">'
					+'<h3 class="text-center" id="resultAction"> [조치 사항]</h5>'
				+'	</div>'
				+'	<div class="row mt-3">'
				+'<div class=""><span id="resultLimit"></span></div>'
				+'	</div>'
				+'	<div class="row mt-3 ">'
				+'     <div><h3 id="resultBwms"></h3></div>'
				+'	</div>'
				+'	<div class="row mt-3 ">'
				+'<div class=""><span id="resultTemp"></span></div>'
				+'	</div>'
			
					
//				+'	<div class="row mt-3 mb-3">'
//				+'<div>염분 : <span id="resultSalt"></span></div>'	
//				+	'</div>'
//				+'	<div class="row mt-3 mb-3">'
//				+'<div>부유물질 : <span id="resultMatter"></span></div>'
//				+	'</div>'
//					 
//				+	'<div class="row mt-3 mb-3">'
//					+	'<h5>조치사항 :'+action+'</h5>'
//					+'</div>'
					+'<div class="row mt-3 mb-3">'
							
					
				
				+'</div>'
				+'</div>'
				
			+'</div>'
		+'</div>'
		+' </div>'
	
//	+'</div>'
//	+'</div>'
	
			
		//apeend	
		div1.append(text);
			
			/*적정 시기*/
			var tempMin = parseFloat(param.tempMin)
			var tempMax = parseFloat(param.tempMax)
			var saltMin = parseFloat(param.saltMin)
			var saltMax = parseFloat(param.saltMax)
			var matterMin = parseFloat(param.matterMin)
			var matterMax = parseFloat(param.matterMax)
			
			var resultTemp = $("#resultTemp");		
			var resultSalt = $("#resultSalt");		
			var resultMatter = $("#resultMatter");	
			var resultLimit = $("#resultLimit");
			var resultBwms = $("#resultBwms");
			
		/*medianListappend*/
		var medianList = $("#medianList");
	      for(var i =0; i <result.length; i++ ){
	    	  /*계절구분 */
	    	  if(result[i].month == 5){
	       			 var word = '<td>봄(3,4,5)</td>' 
	       		     
	       		 }else if(result[i].month == 8){
	       			var word = '<td>여름(6,7,8)</td>'
	       		 }else if(result[i].month == 11){
	       			var word = '<td>가을(9,10,11)</td>'
	       		 }else if(result[i].month == 2){
	       			var word = '<td>겨울(12,1,2)</td>'
	       		 }
	    	 //계절구분 end
	    	  /*적정시기 비교*/
	    	  var seasonText ;
	    	  var tempVal ;
	    	  var saltVal ;
	    	  var matterVal ;
	    	  var tempText ;
	    	  var saltText ;
	    	  var matterText ;
				var tempColor = $(".tempColor"+i)
				var saltColor = $(".saltColor"+i)
				var matterColor = $(".matterColor"+i)
	    	  if(tempMin>parseFloat(result[i].temp)||parseFloat(result[i].temp) >tempMax ||
	    		 saltMin> parseFloat(result[i].salinity)||parseFloat(result[i].salinity) >saltMax||
	    		 matterMin> parseFloat(result[i].ss)||parseFloat(result[i].ss) >matterMax){
	    		  
	    		  seasonText='<td class="red">운전 주의<td>'
	    			  
	    	  }else{
	    		  seasonText='<td class="green">운전 가능<td>'
	    	
	    	  }
	    	  
       	 var medianText = '<tr>'
       		
           	   + word    
           	   +'<td>'+data.firstYear+'-'+data.lastYear+'</td>'     
           	   +'<td class="tempColor'+i+' ">'+result[i].temp+'</td>'     
           	   +'<td class="saltColor'+i+' ">'+result[i].salinity+'</td>'     
           	   +'<td class="matterColor'+i+' ">'+result[i].ss+'</td>'     
           	   + seasonText    
       	   +'</tr>'
       	   medianList.append(medianText);
       	 
         if(tempMin>parseFloat(result[i].temp)){
   		  tempVal=0;
   		  tempText ="수온이 낮음으로 가열 후 재주입 작동 필요"
         }else if(tempMax<parseFloat(result[i].temp)){
   		  tempVal=1;
   		  tempText ="수온이 높으므로 안전운전 요망";
			  if(tempColor.hasClass("red") == false){
				  tempColor.addClass("red"); 
			  }
   		
          }
     	
       
         
	   	  if(saltMin>parseFloat(result[i].salinity)){
	   		  saltVal=0;
	   		  saltColor.addClass("red");
	   		
	   	  }else if(saltMax<parseFloat(result[i].salinity)){
	   		  saltVal=1;
	   		  saltText ="염분이 높으므로 안전운전 요망";
	   		  if(saltColor.hasClass("red") == false){
					  saltColor.addClass("red"); 
				  }
	   			 
	   	  }
	   	  if(matterMin>parseFloat(result[i].ss)){
	   		  matterVal=0;
	   		  matterText ="부유물질농도가 낮습니다.";
	   		  matterColor.addClass("red");
	   		  
	   	  }else if(matterMax<parseFloat(result[i].ss)){
	   		  matterVal=1;
	   		  matterText ="부유물질농도가 높으므로  안전운전요망";
	   		  if(matterColor.hasClass("red") == false){
					  matterColor.addClass("red"); 
	   		  }
	   		  
	   	  }
        } 
	      //for end
	      var bwmsType = data.paramMap.bwmsType
	         if(bwmsType == 'EC'){
	        	 if(saltMin < 1){
		        	 var div1 = " 염분이 1 psu 이하일 때 TRC 70% 감소운전  <br>";
		        	 resultTemp.append(div1);
		        	 var div2 = " 염분이 1 psu 이하일 경우 일반 해수(저장된 해수)를 혼합하여 염분 범위를 >1.5으로 조정 <br>  ";
	        	 	 resultTemp.append(div2);
	        	 	 resultBwms.append("[EC 권고사항]");
	        	 }
	        	 if(tempMin <= -2){
	        		 var div3 = "수온이 -2℃ 이하 기준이므로 BWMS가 정상운전이 불가능 할 수 있습니다. BWMS 운전고려  <br>";
					 resultTemp.append(div3);
					 if(!resultBwms.html("[EC 권고사항]")){
						 resultBwms.append("[EC 권고사항]");
					 }
					 
	        	 }
	        	 
	         }else if(bwmsType == 'UV'){
	        	 var div1= "UV intensity 가 < 90mW/㎠이면 TRC 50%조정 필요";
	        	 resultTemp.append(div1);
	        	 resultBwms.append("[UV 권고사항]");
	         }
	   
	      if(tempText == undefined && saltText == undefined && saltText == undefined ){
	    	  var div4 = "해당 항만에서 BWMS장치가 정상 작동 가능합니다.";
	    	  resultLimit.append(div4);
	      }
	      resultLimit.append(tempText);
	      resultLimit.append(saltText);
	      resultLimit.append(matterText);
	      
	      
			
			
		
		// css 초기화 
//		$("#prediction").css("color","green");	
//		if(100< tempResult && tempResult < 120 || tempResult > 120 ){
//			resultMassege = Htemp;
//		}
//		if(100< saltResult && saltResult < 120 || saltResult > 120 ){
//			resultMassege = Hsalt;
//		}
//		if(100< matterResult && matterResult < 120 || matterResult > 120 ){
//			resultMassege = Hmatter;
//		}
//		
//		if(100< tempResult && tempResult < 120||100< saltResult && saltResult < 120||100< matterResult && matterResult < 120){
//			$("#prediction").css("color","orange");	
//		}else if(tempResult > 120 ||saltResult > 120||matterResult > 120 ){
//			$("#prediction").css("color","red");	
//		}
//		
	 	
    	  
		
		
			
			
			
		},
		error:function(request,status,error)
		{   
			alert("가상운전진행중 에러가 발생하였습니다."); 
			}

			
		
	})
	
	
//	if($("#virtual_result").css("display") == "block"){
//		
//		$("#virtual_result").css("display","none");
//	}else{
//		$("#virtual_result").css("display","block");
//	}
//	
	
	


	
}