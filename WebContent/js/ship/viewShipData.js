$(document).ready(function () {
	//	$(".domainChk").change(function() {
	//		var bwms_type = $(this).val()
	//		$.ajax({
	//			url : '/ship/getFnmRule.do',
	//			type : 'post',
	//			data : {
	//				bwms_type : bwms_type
	//			},
	//			dataType : 'json',
	//			success : function(result){
	//				$fnmRuleList = $("#fnmRuleList ui")
	//				$fnmRuleList.children(".content").remove()
	//				result.fnmRules.forEach(function(element){
	//					let fnmRule = element.fnmRule
	//					let imoNo = element.imoNo
	//					let type = element.type
	//					
	//					var content ='<li style="list-style:none;" class="content">'
	//			            +'<div class="row fnmRuleContent">'
	//			            + '<div class="col-sm-5 fnmRuleImoNo">'
	//			            + imoNo
	//			            + '</div>'
	//			            + '<div class="col-sm-7 fnmRuleFnmRule">'
	//			            + fnmRule
	//			            + '</div>'
	//			            + '</div>'
	//			            + '</li>'
	//			        $fnmRuleList.append(content)
	//				});		
	//				$(".content").on("click", function(){
	//					console.log($(this))
	//					$(this).siblings(".checked").removeClass("checked")
	//					$(this).addClass("checked")
	//				})
	//			},
	//			error : function(request, status, error){
	//				console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
	//			               + request.responseText + "\n" + "error:" + error);
	//			}
	//		});
	//	})

	const grid = new tui.Grid({
		el: document.getElementById('grid'),
		scrollX: true,
		scrollY: true,
		bodyHeight: 600,
		data: [],
		columns: []
	})

	grid.on("click", (e) => {
		const { columnName, rowKey, instance } = e
		const category = $(".nav-link.active").text().trim()
		// console.log(columnName, rowKey, instance)
		if (rowKey == null) {
			$.ajax({
				url: '/ship/getDomainDescription.do',
				type: 'post',
				data: {
					domainName: columnName,
					category: category
				},
				dataType: 'json',
				success: function (result) {
					const { des, type } = result.hashMap
					// console.log(des, type)
					$("#domainCard .card-body").css("display", "block")
					$("#domainNameListItem").text(columnName)
					$("#desItemDiv").text(des)
					$("#typeItemDiv").text(type)
				},
				error: function (request, status, error) {
					// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
					// 	+ request.responseText + "\n" + "error:" + error);
				}
			})
		}
	})
	tui.Grid.applyTheme('striped');
	function dataSelect() {
		const imoNo = $(".checked .fnmRuleImoNo").text().trim()
		const fnmRule = $(".checked .fnmRuleFnmRule").text().trim()
		const category = $(".nav-link.active").text().trim()
//		const logType = $(".dropdown-item.active").text().trim().toLowerCase();
		const logType = $(".tab-pane.active").children(".logType").val();
		console.log("logtype" + logType);
		$.ajax({
			url: '/ship/getShipData.do',
			type: 'post',
			data: {
				imo_num: imoNo,
				fnm_rule: fnmRule,
				category: category,
				log_type : logType
			},
			dataType: 'json',
			success: function (result) {
				// $("#dataTable").children().remove()
				grid.clear()
				const { domain, data } = result

				function createRows() {
					const rows = [];
					for (let i = 0; i < 50; i += 1) {
						const row = data[i]
						data.slice(1)
						rows.push(row);
					}
					return rows;
				}

				let header = []

				domain.forEach(function (val, idx) {
					header.push({
						header: String(val).toLocaleUpperCase(),
						name: val,
						whiteSpace: 'normal'
					})
				})
				// console.log(header)
				grid.setColumns(header)
				// grid.appendRows(createRows())
				grid.resetData(data)
				grid.setWidth(header.length * 170)

				// grid.on('scrollEnd', () => {
				// 	grid.appendRows(createRows());
				// })

				//			const colGroup = '<colgroup><col style="width:15%"></colgroup>'
				//			$("#dataTable").append(colGroup)
				// let header = '<tr id="tableHeader">'

				// domain.forEach(function (domain) {
				// 	header += '<th>' + domain + '</th>'
				// })
				// header += '</tr>'
				// $("#dataTable").append(header)



				// data.forEach(function (data) {
				// 	let body = '<tr class="tableContent">';
				// 	domain.forEach(function (domain) {
				// 		//					console.log(data[domain])
				// 		body += '<td>' + data[domain] + '</td>'
				// 	})
				// 	body += "</tr>";
				// 	$("#dataTable").append(body)
				// })
				// console.log(domain)
				// console.log(data)
			}
			,beforeSend:function(){
				$('.wrap-loading').removeClass('display-none');
			}
			,complete:function(){
				 $('.wrap-loading').addClass('display-none');
			}			
			,error: function (request, status, error) {
				console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
					+ request.responseText + "\n" + "error:" + error);
			}
		});
	}


	$(".content").on("click", function () {
		// console.log($(this))
		if ($(this).hasClass("checked")) {
			$(this).removeClass("checked")
		} else {
			$(this).siblings(".checked").removeClass("checked")
			$(this).addClass("checked")
		}

	})

	$("#dataSelectedBtn").click(dataSelect)

})
$(function () {
	$('[data-toggle="popover"]').popover()
})
function initChecked() {
	$(".tab-content .checked").removeClass("checked")
	$(".dropdown-item .active").removeClass("active")
}



function getDomainDescription(e) {
	// console.log($(this))

}