$(document).ready(function(){
	let categoryList = [];
	for(let first = $("#categoryBody ul li#faqCategoryAddBtn").siblings().first(); first.next().length != 0; first = first.next()) {
		// console.log(first)
		categoryList.push(first.text())
	}
	// console.log(categoryList)
    $("#categoryBody ul li#faqCategoryAddBtn").siblings().click(getFAQList)
    
    $("#categoryBody ul li#faqCategoryAddBtn").click(faqCategoryAddBtn)
    
    function getFAQList() {
    	// console.log($(this).text())
    	$("#selectedCategory").removeAttr("id")
    	$(this).attr("id", "selectedCategory")
    	$.ajax({
    		type : "post",			
    		url : "/admin/getFAQList.do",
    		data : {
    			category : $(this).text()
    		},
    		dataType: "json",
    		success : function(result){
				// console.log(result)
    			const {faqList} = result
    			if($("#faqBody").children().length == 0) {
    				newFAQList()
    			} else {
    				$("#faqBody").children().stop().animate({opacity:"0"}, 150, "linear", function(){
        				$("#faqBody").children().remove()
        				newFAQList()
        			})
    			}
    			
    			function newFAQList() {
    				let list = '<ul>', index = 0, col = ""
    	    			const faqAddBtnDiv = '<div class="col-sm-6">'
    	    				+ '<div class="card">'
    	    				+ '<div class="card-body" id="faqAddBtn">'
    	    				+ '<table>'
    	    				+ '<tbody><tr>'
    	    				+ '<td>+</td>'
    	    				+ '</tr>'
    	    				+ '</tbody>'
    	    				+ '</table>'
    	    				+ '<div id="faqInputDiv" style="display:none;">'
    	    				+ '<div id="addFAQSubject"><input type="text" class="form-control ui-autocomplete-input" /></div>'
    	    				+ '<div id="addFAQContent"><textarea class="form-control ui-autocomplete-input" rows="3"></textarea></div>'
    	    				+ '<div style="text-align:right;"><button type="button" class="btn btn-primary" id="faqConfirmBtn">Confirm</button></div>'
    	    				+ '</div>'
    	    				+ '</div>'
    	    				+ '</div>'
    	    				+ '</div>'
    	    			faqList.forEach((element) => {
    	    				const {bbsCont, bbsSubject, bbsNo} = element
    	    				index %= 2
    	    				if(index == 0) {
    	    					col = '<div class="row">'
    	    				}
    	    				col += '<div class="col-sm-6">'
    	    					+ '<div class="card">'
    							+ '<div class="card-body" style="position:relative;">'
    							+ '<div class="faqContentDiv">'
    							+ '<input type="hidden" value="' + bbsNo + '"/>'
    							+ '<span class="faqSubject">' + bbsSubject +'</span>'
    							+ '<span class="faqContent">' + bbsCont +'</span>'
    							+ '</div>'
    							+ '<div class="editIconDiv">'
    							+ '<table>'
    		    				+ '<tbody><tr>'
    		    				+ '<td><span><i class="fa fa-edit"></i></span></td>'
    		    				+ '</tr>'
    		    				+ '</tbody>'
    		    				+ '</table>'
    		    				+ '</div>'
    							+ '<div class="faqEditDiv" style="display:none">'
    							+ '<div class="editFAQSubject"><input type="text" class="form-control ui-autocomplete-input" /></div>'
    		    				+ '<div class="editFAQContent"><textarea class="form-control ui-autocomplete-input" rows="3"></textarea></div>'
    		    				+ '<div style="text-align:right;">'
    		    				+ '<button type="button" class="btn btn-danger deleteFAQBtn">Delete</button>'
    		    				+ '<button type="button" class="btn btn-primary editFAQBtn">Edit</button>'
    		    				+ '</div>'
    							+ '</div>'
    							+ '</div>'
    							+ '</div>'
    							+ '</div>'
    							
    						if(index == 1) {
    							list += '<li>'
    		    					+ col
    		    					+ '</div>'
    								+ '</li>'
    						}
    	    				index++
    	    			})
    	    			if(index == 1) {
    	    				list += '<li>'
    	    					+ col
    	    					+ faqAddBtnDiv
    	    					+ '</div>'
    							+ '</li>'
    	    			} else {
    	    				list += '<li>'
    	    					+ '<div class="row">'
    	    					+ faqAddBtnDiv
    	    					+ '</div>'
    							+ '</li>'
    	    			}
    	    			list += '</ul>'
    	    				
    	    			$("#faqBody").append(list)
    	    			$("#faqBody").children().css("opacity", "0")
    	    			$("#faqBody").children().stop().animate({opacity:"1"}, 150, "linear")
    	    			$("#faqAddBtn table").click(function() {
    	    				$(this).css("display", "none")
    	    				$(this).siblings("#faqInputDiv").css("display", "block")
    	    			})
    	    			
    	    			$("#faqConfirmBtn").click(function() {
//    	    				$(this).parent().parent().css("display", "none")
//    	    				$(this).parent().parent().siblings("table").css("display", "table")
    	    				// console.log($(this).parent().siblings("#addFAQSubject").children().val())
    	    				// console.log($(this).parent().siblings("#addFAQContent").children().val())
    	    				$.ajax({
    	    					type: 'post',
    	    					url : '/admin/addFAQ.do',
    	    					data : {
    	    						bbsSubject 	: $(this).parent().siblings("#addFAQSubject").children().val(),
    	    						bbsCont		: $(this).parent().siblings("#addFAQContent").children().val(),
    	    						category	: $("#selectedCategory").text()
    	    					},
    	    					dataType : 'json',
    	    					success : function(result){
    	    						alert("FAQ 입력 성공")
    	    						if(result.isSuccess) location.href='/admin/manageBoard.do' 
    	    					},error: function(request, status, error){
    	    		    			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
    	    		    			// 		+ request.responseText + "\n" + "error:" + error);
    	    		    		}		
    	    				})
    	    			})
    	    			
    	    			
    	    			
    	    			$(".faqContentDiv").mouseover(function(){
    	    				// console.log("enter")
    	    				$(this).stop().animate({opacity:"0.4"}, 150, "linear")
    	    				$(this).siblings(".editIconDiv").css("display", "block")
    	    				$(this).siblings(".editIconDiv").stop().animate({opacity: "1"}, 150, "linear")
    	    			})
    	    			
    	    			$(".editIconDiv").mouseleave(function(){
    	    				// console.log("out")
    	    				const _this = $(this)
    	    				$(this).stop().animate({opacity:"0"}, 150, "linear", function(){
    	    					_this.css("display", "none")
    	    				})
    	    				$(this).siblings(".faqContentDiv").stop().animate({opacity: "1"}, 150, "linear")
    	    			})
    	    			
    	    			$(".editIconDiv").click(function(){
    	    				const _this = $(this)
    	    				$(this).siblings(".faqContentDiv").css("display", "none")
    	    				$(this).stop().animate({opacity:"0"}, 150, "linear", function(){
    	    					_this.css("display", "none")
    	    				})
    	    				$(this).stop().animate({opacity:"0"}, 150, "linear", function(){_this.css("display","none")})
    	    				$(this).siblings(".faqEditDiv").css("display","block")
    	    				$(this).siblings(".faqEditDiv").stop().animate({opacity:"1"}, 150, "linear")
    	    				
    	    				// console.log($(this).siblings(".faqContentDiv").children(".faqSubject").text())
    	    				// console.log($(this).siblings(".faqEditDiv").children(".editFAQSubject").children("input"))
    	    				$(this).siblings(".faqEditDiv").children(".editFAQSubject").children("input").val($(this).siblings(".faqContentDiv").children(".faqSubject").text())
    	    				$(this).siblings(".faqEditDiv").children(".editFAQContent").children("textarea").text($(this).siblings(".faqContentDiv").children(".faqContent").text())
    	    				
    	    			})
    	    			
    	    			$(".editFAQBtn").click(function(){
    	    				const mainContent = $(this).parent().parent().siblings(".faqContentDiv")
    	    				$.ajax({
    	    					type : 'post',
    	    					url : '/admin/editFAQ.do',
    	    					data : {
    	    						bbsNo : mainContent.children("input[type=hidden]").val(),
    	    						bbsSubject : $(this).parent().siblings(".editFAQSubject").children("input").val(),
    	    						bbsCont : $(this).parent().siblings(".editFAQContent").children("textarea").val()
    	    					},
    	    					dataType : 'json',
    	    					success: function(result){
    	    						if(result.isSuccess){
    	    							alert("FAQ 수정이 완료되었습니다.")
    	    							location.href="/admin/manageBoard.do"
    	    						}
    	    					},
    	    					error: function(request, status, error){
    	    		    			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
    	    		    			// 		+ request.responseText + "\n" + "error:" + error);
    	    		    		}	
    	    				})
    	    			})
    	    			
    	    			$(".deleteFAQBtn").click(function(){
    	    				const mainContent = $(this).parent().parent().siblings(".faqContentDiv")
    	    				$.ajax({
    	    					type : 'post',
    	    					url : '/admin/deleteFAQ.do',
    	    					data : {
    	    						bbsNo : mainContent.children("input[type=hidden]").val(),
    	    					},
    	    					dataType : 'json',
    	    					success: function(result){
    	    						if(result.isSuccess){
    	    							alert("FAQ 삭제가 완료되었습니다.")
    	    							location.href="/admin/manageBoard.do"
    	    						}
    	    					},
    	    					error: function(request, status, error){
    	    		    			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
    	    		    			// 		+ request.responseText + "\n" + "error:" + error);
    	    		    		}	
    	    				})
    	    			})	
    			}
    			
    		},
    		error: function(request, status, error){
    			// console.log("데이터 조회 오류\ncode:" + request.status + "\n" + "message:"
    			// 		+ request.responseText + "\n" + "error:" + error);
    		}		
    	})
    }
    function faqCategoryAddBtn() {
    	$(this).text("")
    	let input = '<input type="text" class="form-control ui-autocomplete-input" id="categoryAddInput"/>'
    	
    	$(this).append(input)
    	$("#categoryAddInput").keypress(categoryAddInputKeyPress)

    	$(this).unbind()
    }
    
    function categoryAddInputKeyPress(e) {
    	const parent = $(this).parent()
    	if(e.which == 13) {
    		
    		if($(this).val() != "" && !categoryList.includes($(this).val())) {
    			categoryList.push($(this).val())
        		// console.log(categoryList)
        		parent.append('<span>+</span>')
        		parent.click(faqCategoryAddBtn)
    			
        		parent.prev().after('<li>' + $(this).val() + '</li>')
        		parent.prev().click(getFAQList);
        		
        		$(this).remove();
    		}else {
    			// console.log("Duplicated")
    			parent.append('<span>+</span>')
        		parent.click(faqCategoryAddBtn)
        		$(this).remove();
    		}
		}
    }
    
    function initFAQContent() {
    	
    }
    
});