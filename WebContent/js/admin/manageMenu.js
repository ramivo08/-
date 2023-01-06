var roleAccessableMenuList = []

$(document).ready(function() {
	let selectedAddedMenuList = []
	let selectedDeledtedMenuList = []
	function roleListClick() {
		$(".roleItem").removeAttr("id")
		$(this).attr("id", "selectedRole")
		
		$.ajax({
			type:'post',
			url:'/admin/getRoleAccessableMenu.do',
			data:{
				roleName : $(this).text().trim() 
			},
			dataType:'json',
			success: roleAccessableMenus,
			error: function(request, status, error){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}
		})
	}
	
	function roleAccessableMenus(result){
		roleAccessableMenuList = []
		/*console.log(result)
		const table = $("#accessableMenuTable tbody")
		table.children("tr").not("tr#tableHeader").remove();
		
		result.hashMapList.forEach((item) => {
			const {roleId, menuId, menuName, url, belongTo, level} = item
			const tr = '<tr><td>'+menuName+'</td><td>' + url + '</td></tr>'
			table.append(tr)
		})*/
		let output = '';
		$.each(result.JSONObjectList, function(index, item) {
			output += buildItem(item)
		})
//		console.log(roleAccessableMenuList)
		$("#accessableDiv #staticAccessableList").children().remove()
		$("#accessableDiv #staticAccessableList").append(output)
		document.getElementById('staticAccessableList').querySelectorAll('input').forEach(function(i, idx) {
	    	i.isWhole = false
	    	/* console.log(i)
	    	console.log(i.isWhole) */
	    })
	    $("#staticAccessableList input").on("change", menuListCheck)
		$("#menuWholeList input").attr("disabled", false)
		roleAccessableMenuList.forEach(function(item, idx){
//			console.log(item)
			$("#menuWholeList input[data-id=" + item +"]").attr("disabled", true)
			if($("#menuWholeList input[data-id=" + item +"]").is(":checked")) {
				$("#menuWholeList input[data-id=" + item +"]").prop("checked", false)
			}
			
		})
	}
	
	function menuAddBtnClick() {
		selectedAddedMenuList = []
		$.each($("#menuWholeList input"), function(idx, i){
			if($(i).is(":checked") && !$(i).is(":disabled")) selectedAddedMenuList.push($(i).attr("data-id"))
		})
		
		$.ajax({
			type : 'post',
			url : '/admin/addAccessableMenu.do',
			data : {
				selectedMenuList : selectedAddedMenuList,
				roleName	: $("#selectedRole span").text().trim(),
				roleId		: $("#selectedRole input").val()
			},
			dataType : 'json',
			success : roleAccessableMenus
			,error : function(error, status, request){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}
		})
		// console.log(selectedAddedMenuList)
	}
	
	function menuDelBtnClick() {
		selectedDeledtedMenuList = []
		$.each($("#staticAccessableList input"), function(idx, i){
			if($(i).is(":checked") && !$(i).is(":disabled")) selectedDeledtedMenuList.push($(i).attr("data-id"))
		})
		
		$.ajax({
			type : 'post',
			url : '/admin/delAccessableMenu.do',
			data : {
				selectedMenuList : selectedDeledtedMenuList,
				roleName	: $("#selectedRole span").text().trim(),
				roleId		: $("#selectedRole input").val()
			},
			dataType : 'json',
			success : roleAccessableMenus
			,error : function(error, status, request){
				// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
				// 		+ request.responseText + "\n" + "error:" + error);
			}
		})
		// console.log(selectedDeledtedMenuList)
	}
	
	$(".roleItem").click(roleListClick)
	$("#menuAddBtn").click(menuAddBtnClick)
	$("#menuDelBtn").click(menuDelBtnClick)
	
})

function buildItem(item) {
//	console.log(item)
	roleAccessableMenuList.push(item.id)
	let html = '<li class="static-item">'
			+ "<div class='input-group'>"
			+ '<div class="input-group-prepend">'
			+ '<div class="input-group-text">'
			+ '<input type="checkbox" aria-label="Checkbox for following text input" data-id="' + item.id + '" data-belongTo="' + item.belongTo +'">'
			+ '</div>'
			+ '</div>'
			+ '<span class="form-control">' + item.name +'</span>'
			+ '</div>'
	if(item.children){
		html += '<ol class="childrenList static-list">';
		$.each(item.children, (index, sub) => {
			html += buildItem(sub);
		});
		html += '</ol>';
	}
	html += "</li>";
//	console.log(html)
	return html;
}


function menuListCheck(e){
	const isWhole = e.target.isWhole ? '#menuWholeList' : '#staticAccessableList'
	const parentInput = $(isWhole + " input[data-id="+ $(this).attr("data-belongto") +"]")
	const childList = $(this).parent().parent().parent().siblings("ol").children()
	const isChecked = $(this).is(":checked")
	if(e.target.isWhole) {
		if(parentInput.length != 0 && !parentInput.is(":checked")) {
			parentInput.prop("checked", true)
		}
		if(!isChecked) {
			$.each(childList, function(idx, li) {
				$(li.querySelector("input")).prop("checked", false);
//				console.log()
			})
		}
	} else {
		$.each(childList, function(idx, li) {
			$(li.querySelector("input")).prop("checked", true);
//			console.log()
		})
		
	}
	
	
}



//$(document).ready(function(){
//	let roleAccessableMenuList = []
//	
//	
//
//	const plusBtn = '<button type="button" class="btn btn-light p-0 addBtn">'
//    	+ "+"
//    	+ '</button>'
//    const minusBtn = '<button type="button" class="btn btn-light p-0 delBtn">'
//    	+ "-"
//    	+ '</button>'
//
//	function buildItem(item, plus_minus) {
//		if(!plus_minus) roleAccessableMenuList.push(item.id)
//		const identi = plus_minus ? 'whole' : 'view'
//        var html = "<li class='static-item' id='static-" + identi + '-' + item.id + "' data='"+ item.id +"'>";
//        html += "<div class='static-handle row d-flex'>" 
//        	+ '<span class="col-9">' + item.name + " : " + item.url + '</span>'
//        	+ '<div class="col-3 text-right overflow-hidden">'
//        	+ (plus_minus ? plusBtn : minusBtn)
//        	+ '</div>'
//        	+ "</div>"
//        if (item.children) {
//            html += "<ol class='static-list' id='static-" + identi + item.id +"-children'>";
//            $.each(item.children, function (index, sub) {
//                html += buildItem(sub, plus_minus);
//            });
//            html += "</ol>";
//        }
//        html += "</li>";
//        return html;
//    }
//	let output = '';
//    $.each($("#nestable1").nestable('serialize'), function (index, item) {
//        output += buildItem(item, true);
//    });
//    
//    $("#staticList #staticRootList").append(output)
//    $("#staticList div span").click(menuListClick)
//    $(".addBtn").click(addViewMenu)
//    
//	function menuListClick() {
//		console.log($(this))
//		
//	}
//    
//    function addViewMenu() {
//    	const li = $(this).parent().parent().parent()
//    	const menuId = li.attr("data")
//    	const roleNm = $("#selectedRole").text().trim()
//    	if(!roleAccessableMenuList.includes(li.attr("data"))) {
//    		$.get({
//        		url : '/admin/addAccessableMenu.do',
//        		data : {
//        			menuId:menuId,
//        			roleName:roleNm
//        		},
//        		dataType:'json',
//        		success:function(result){
//        			roleAccessableMenuList = []
//        			console.log("suc")
//        			let output = '';
//    				$.each(result.JSONObjectList, function(index, item) {
//    					console.log(item)
//    					output += buildItem(item, false)
//    				})
//    				$("#accessableDiv #staticAccessableList").children().remove()
//    				$("#accessableDiv #staticAccessableList").append(output)
//    				
//    				$(".delBtn").click(delViewMenu)
//    				console.log(roleAccessableMenuList)
////        			$("#staticAccessableList").append(li.clone())
//        		},
//        		error: function(error, status, request){
//        			console.log(error+ status + request)
//        		}
//        	})
//    	} else {
//    		alert("이미 존재하는 메뉴입니다.")
//    	}
//    	
////    	document.location.href = ROOT_PATH +"/admin/delAccessableMenu.do?menuId="+menuId+"&roleNm="+roleNm;
//	}
//    
//    function delViewMenu() {
//    	const li = $(this).parent().parent().parent()
//    	const menuId = li.attr("data")
//    	const roleNm = $("#selectedRole").text().trim()
//    	
//    	$.get({
//    		url : '/admin/delAccessableMenu.do',
//    		data : {
//    			menuId:menuId,
//    			roleNm:roleNm
//    		},
//    		success:function(){
//    			console.log("suc")
//    			li.remove()
//    			roleAccessableMenuList.remove(li.attr("data"))
//    			console.log(roleAccessableMenuList)
//    		},
//    		error: function(error, status, request){
//    			console.log(error+ status + request)
//    		}
//    	})
////    	document.location.href = ROOT_PATH +"/admin/delAccessableMenu.do?menuId="+menuId+"&roleNm="+roleNm;
//	}
//	
	
//	
//	function toggleDragable() {
//		if($("#nestable1").css("display") == "block") {
//			
//			$("#staticList #staticRootList").children().remove()
//			let output = '';
//			$.each($("#nestable1").nestable('serialize'), function (index, item) {
//		        output += buildItem(item, true);
//		    });
//		    $("#staticList #staticRootList").append(output)
//			$(".addBtn").click(addViewMenu)
//		    $("#staticList div").click(menuListClick)
//		    
//			$("#nestable1").css("display", "none")
//			$("#staticList").css("display", "block")
//			$(this).text("edit")
//			console.log("not dragable")
//		} else {
//			$("#staticList").css("display", "none")
//			$("#nestable1").css("display", "block")
//			$(this).text("Confirm")
//			console.log("dragable")
//		}
//	}
//	
//	
//	$("#dragableBtn").click(toggleDragable)
//	$(".roleItem").click(roleListClick)
//	$(".dd-item").click(menuListClick)
//});

