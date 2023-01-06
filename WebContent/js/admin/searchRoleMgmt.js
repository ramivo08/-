function fn_Check_Authority(obj){
    if($(obj).is(":checked")){
    	$.ajax({
	        url : ROOT_PATH + "/board/searchRoleMenuMgmt.do",
	        data : {"roleId" : obj.value},
	        dataType : "html",
	        contentType : "application/json; text/html; charset=utf-8",
	        success : function(result) {
	        	$('input:checkbox[name="roleArr"]').prop("checked",false);
	        	$(obj).prop("checked",true);
	        	
	        	$(".menu").html(result);
	        },
	        error : function(request, status, error) {
	            alert("process Error");
	        }
	    });
    }
}

function fn_Check_Menulist(obj){
	
	var roleId;
	var role = $('input:checkbox[name="roleArr"]');
	
	for(var i=0; i<role.length; i++){
		if(role[i].checked){
			roleId = role[i].value;
		}
	}
	
    if($(obj).is(":checked")){
    	$.ajax({
    		type: 'POST',
	        url : ROOT_PATH + "/board/menuRoleAuthorize.do",
	        data : {"menuId" : obj.value, "roleId" : roleId},
	        dataType: 'json',
	        success : function(result) {
	        	console.log(result);
	        },
	        error : function(request, status, error) {
	        	alert("권한 insert 오류\ncode:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	        }
	    });
    }else{
    	$.ajax({
    		type: 'POST',
	        url : ROOT_PATH + "/board/menuRoleDelete.do",
	        data : {"menuId" : obj.value, "roleId" : roleId},
	        dataType: 'json',
	        success : function(result) {
	        	console.log(result);
	        },
	        error : function(request, status, error) {
	        	alert("권한 delete 오류\ncode:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	        }
	    });
    }
}