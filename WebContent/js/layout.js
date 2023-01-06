
$(".singleMenu").click(function(){
	this.children('a').atttr('class','active');
	
	console.log(this.children().length);
	console.log('singleMenu');
})





$.ajax({
	type : "POST",			
	url : "/getUserInfo.do",
	dataType: "json",
	
	success : function(result){
		const { userId, menuList } = result
		const singleOrdering = ["pscdashboard", "virtual_drive"]
		const singleIconList = ["ti-dashboard","fa fa-database","ti-map"] 
		const listOrdering = ["subsidy","target_vehicle" ,"board", "admin"]
		const iconList = ["ti-clipboard","ti-anchor", "ti-filter",  "ti-layout-tab-window", "ti-settings"]
		$("#userNamePlace").text(userId)
		// console.log(userRoleId)
		let output = '';
		var singleOutput = '';
//		singleOrdering.forEach(function(i,idx){
//			singleOutput += ' <li class="singleMenu"><a href="/main.do" class=""><i class="ti-dashboard"></i> <span class="title">대시 보드</span></a></li>'
//		})
		singleOrdering.forEach(function(i,idx){
			$.each(menuList, function(idx,root){
				if(root.id == i){
					singleOutput += ''
						+ ''
						+''
						
						+''
						+''
						+''
						+''
						$.each(root.children,function(idx,sub){
							singleOutput += ''
						})
				}
			})
		})
		
//		 <li class="singleMenu"><a href="/psc/dashboard.do" class=""><i class="fa fa-database"></i> <span class="title">운전데이터 분석</span></a></li>
		listOrdering.forEach(function(i, idx) {
			$.each(menuList, function(idx, root) {
				if(root.id == i) {
					output += '<li class="panel">' 
						+ '<a href="#'+ root.id +'Menu" data-toggle="collapse" data-parent="#sidebar-nav-menu" aria-expanded="" class="">'
						+ '<i class="' + iconList[idx] +'"></i>'
						+ '<span class="title">' + root.name + '</span>'
						+ '<i class="icon-submenu ti-angle-left"></i></a>'
						+ '<div id="'+ root.id +'Menu" class="collapse">'
						+ '<ul class="submenu">';
					$.each(root.children, function(idx, sub) {
						output += '<li><a href="'+sub.url+'" class="">'+ sub.name +'</a></li>'
					})
					output += '</ul></div></li>';
				}
			})
		})
		$("#sidebar-nav-menu").append(output)
	},
	error: function(request, status, error){
		// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
		// 		+ request.responseText + "\n" + "error:" + error);
		location.href='/login.do';
	}				
})