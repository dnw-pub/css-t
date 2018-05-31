jQuery(document).ready(function($) {
	
	planningIndex = $("#nRandSelectNum").val();
	$(".hover_b li").eq(planningIndex).find("a").addClass("on");
	$(".section_slider").eq(planningIndex).fadeIn(300);
	
	planChange = function(index){
		$(".hover_b li a.on").removeClass("on");
		$(".hover_b li").eq(index).find("a").addClass("on");
		$(".section_slider").hide();
		$(".section_slider").eq(index).fadeIn(300);
		planningIndex = index;
	};
	
	moveNext = function(){
		$(".hover_b li a.on").removeClass("on");
		$(".section_slider").hide();
		if(planningIndex == $(".hover_b li").length - 1){
			$(".hover_b li").eq(0).find("a").addClass("on");
			$(".section_slider").eq(0).fadeIn(300);
			planningIndex = 0;
		}else{
			$(".hover_b li").eq(eval(planningIndex) + 1).find("a").addClass("on");
			$(".section_slider").eq(eval(planningIndex) + 1).fadeIn(300);
			planningIndex = eval(planningIndex) + 1;
		}
	};
	
	moveBack = function(){
		$(".hover_b li a.on").removeClass("on");
		$(".section_slider").hide();
		if(planningIndex == 0){
			$(".hover_b li").eq($(".hover_b li").length - 1).find("a").addClass("on");
			$(".section_slider").eq($(".hover_b li").length - 1).fadeIn(300);
			planningIndex = $(".hover_b li").length - 1;
		}else{
			$(".hover_b li").eq(planningIndex - 1).find("a").addClass("on");
			$(".section_slider").eq(planningIndex - 1).fadeIn(300);
			planningIndex = planningIndex - 1;
		}
	};

	setInterval(moveNext, 6000);
});