
function fn_search(page) {

	$("#page").val(page);

	var form = document.model;
	
	

	form.action = ROOT_PATH +"/target/searchTargetVehicle.do";
	form.target = "_self";

	/*
	 * var hiddenField = document.createElement("input");
	 * hiddenField.setAttribute("type","hidden");
	 * hiddenField.setAttribute("name" )
	 */

	form.submit();

}



function selectTarget(targetNo) {

	$("#targetNo").val(targetNo);

	var form = document.model;
	
	

	form.action = ROOT_PATH +"/target/selectTargetVehicle.do";
	form.target = "_self";

	/*
	 * var hiddenField = document.createElement("input");
	 * hiddenField.setAttribute("type","hidden");
	 * hiddenField.setAttribute("name" )
	 */

	form.submit();

}
$( document ).ready(function() {
	
	
    
	$.datepicker.setDefaults({
	    dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년',
		changeYear: true,
		changeMonth : true
			
	});

	    
    $("#startDe").datepicker();
    
    
    $("#endDe").datepicker();

    $('#startDe').datepicker('setDate', 'today');
	
    $("#endDe").datepicker('setDate', '+1W');
    
    $("#today").click(function(){
    	$('#startDe').datepicker('setDate', 'today');
		
	    $("#endDe").datepicker('setDate', 'today');
    })
    
    console.log($('#startDe').datepicker("getDate"))
    
    var stde = $('#startDe').datepicker("getDate")
    
    $("#1w").click(function(){

		
	    $("#endDe").datepicker('setDate', '+1W');
    	
    })
    $("#1m").click(function(){
    	 $("#endDe").datepicker('setDate','+1M');
    	
    })
    $("#3m").click(function(){
    	 $("#endDe").datepicker('setDate','+3M');
    	
    })

    $('#startDe').datepicker({
    	onClose: function(selectedDate){
    		if(selectedDate != ""){
    			$('#startDe').datepicker("option","minDate",selectedDate)
    		}
    	}
    })
    
      $('#endtDe').datepicker({
    	onClose: function(selectedDate){
    		if(selectedDate != ""){
    			$('#endDe').datepicker("option","maxDate",selectedDate)
    		}
    	}
    })
    
    
    
	$("#searchValue").keydown(function(e){
		if(e.keyCode == 13){
			fn_search(1); 
		}
	})
	
    /*const grid = new tui.Grid({
		el: document.getElementById('table-grid'),
		scrollX: true,
		scrollY: true,
		bodyHeight: 600,
		data: [],
		
		columns: [
			{
				header:'번호',
				name:'target_no',
				width : 40
			},
			{
				header:'진행상태',
				name:'process',
				width : 90
			},
			{
				header:'소유주 명',
				name:'owner_nm',
				width : 90
			},
			{
				header:'신청일',
				name:'release_de',
				width : 90
			},
			{	
				header:'자동차 등록번호',
				name:'vehicle_num',
				width : 160
					
			},
			{	
				header:'차대번호',
				name:'vehicle_idntfc_num',
				width : 160 
			},
			{	
				header:'차명',
				name:'vehicle_nm'
			},
			{	
				header:'연식',
				name:'years'
			},
			{	
				header:'폐차장',
				name:'junkyard',
				width :120 
			},
			{	
				header:'상세정보',
				name:'info'
			}-
			
			
			
		]
	})
*/	
	
	//tui.Grid.applyTheme('striped');
	

	
	
});

