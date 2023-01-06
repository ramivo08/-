$(document).ready(function() {

		
		
			
			 
			
	  
		
		$(".nameTd").click(function() {
			$('.layerPop_add').addClass("on").fadeIn(200);
		});
		
		
		$("#btnCancel").click(function() {
			$('.layerPop_add').removeClass("on").fadeOut(200);
		});
		
		
	
		Highcharts.chart('container', {
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: 'ISABU UV 처리량'
		    },
		    subtitle: {
		        text: 'BWMS처리량 그래프'
		    },
		    xAxis: {
		        categories: ['S1_DOSE', 'P1_DOSE', 'S2_DOSE', 'P1_DOSE'],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: '처리량(t)',
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: 't'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            }
		        }
		    },
		    legend: {
		        layout: 'vertical',
		        align: 'right',
		        verticalAlign: 'top',
		        x: 0,
		        y: 80,
		        floating: true,
		        borderWidth: 1,
		        backgroundColor:
		            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
		        shadow: true
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: 'S1_DOSE',
		        data: [500,600,700,800]
		    }, {
		        name: 'P1_DOSE',
		        data: [800,700,600,500]
		    }, {
		        name: 'S2_DOSE',
		        data: [1000,900,800,600]
		    }, {
		        name: 'P2_DOSE',
		        data: [900,1000,900,700]
		    }]
		});

});