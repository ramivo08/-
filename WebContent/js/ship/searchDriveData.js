$(function(){
	// Create the chart
	Highcharts.chart('container1', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'BWMS 운전데이터'
	    },
	    subtitle: {
	        text: '이사부(ISABU) UV'
	    },
	    accessibility: {
	        announceNewData: {
	            enabled: true
	        }
	    },
	    xAxis: {
	        type: 'category'
	    },
	    yAxis: {
	        title: {
	            text: '처리량(t)'
	        }

	    },
	    legend: {
	        enabled: false
	    },
	    plotOptions: {
	        series: {
	            borderWidth: 0,
	            dataLabels: {
	                enabled: true,
	                format: '㎥/h'
	            }
	        }
	    },

	    tooltip: {
	        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
	        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>㎥/h</b> <br/>'
	    },

	    series: [
	        {
	            name: "항목",
	            colorByPoint: true,
	            data: [
	                {
	                    name: "FLOW",
	                    y: 2.3
	                   
	                },
	                {
	                    name: "S1_FLOW",
	                    y: 2.3
	                    
	                },
	                {
	                    name: "P1_FLOW",
	                    y: 2.3
	                    
	                },
	                {
	                    name: "S2_FLOW",
	                    y: 2.3
	                   
	                },
	                {
	                    name: "P2_FLOW",
	                    y: 2.3
	                  
	                }
	            ]
	        }
	    ]
	                
	        
	    
	});
	$(".nameTd").click(function(e){
		e.preventDefault();
		if($("#container1").css("display")=="none"){
			$("#container1").css("display","block");
			
		}else{
			$("#container1").css("display","none");
		}
		
		
		
	})
})
	