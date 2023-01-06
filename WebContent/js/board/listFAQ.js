$(document).ready(function (){
	$(".nav-link").click(function() {
		if(!$(this).hasClass("active")) {
			// console.log($(this).siblings())
			$.each($(this).parents(".nav-item").siblings(), function(index, item) {
				if($(item).children().hasClass("active")) $(item).children().removeClass("active")
			})
			$(this).addClass("active")
		}
	})
})