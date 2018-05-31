// work : 박지영
(function($){
	
	var aRecentViewProductsJson = null;	
	var nRecentViewProductsCurrentPage = 0;
	var aRumorContentsJson = null;
	
	$.draw = function() {
		var idx = nRecentViewProductsCurrentPage * 2;
		var rowcount = idx + 2;
		
		var sHtml = "<ul>";
		if (aRecentViewProductsJson) {
			for(idx; idx < rowcount; idx++) {
				if(!aRecentViewProductsJson[idx]){ 
					sHtml = sHtml + '<li></li>';
				}else{
					sHtml = sHtml + '<li><a target="_blank" href="'+aRecentViewProductsJson[idx].linkUrl+'"><img alt="'+aRecentViewProductsJson[idx].productName+'" src="'+aRecentViewProductsJson[idx].imageUrl+'"></a></li>';
				}
			}
		}		
		sHtml = sHtml + "</ul>";
		//3개 이상일 경우만 페이징 버튼 노출
		if(aRecentViewProductsJson.length > 2){
			sHtml = sHtml + "<p class='paging_fix'>";			
			sHtml = sHtml + "<a href='#' onclick='javascript:$.prevPage(); return false;' class='prev03'>이전</a>";						
			sHtml = sHtml + "<a href='#' onclick='javascript:$.nextPage(); return false;' class='next03'>다음</a>";
			sHtml = sHtml + "</p>";
		}
		$("#scroll_banner .new_fix_area .recently_fix_box .product_list").html(sHtml);
	};
	
	$.drawRumorContents = function(){
		var sHtml = "";
		if (aRumorContentsJson) {
			for(var i = 0; i < 2; i++) {
				sHtml += "<li><a href='"+aRumorContentsJson[i].sLink+"'>"+aRumorContentsJson[i].sTitle+"</a></li>";
			}
		}
		
		$("#scroll_banner .new_fix_area .best_fix_box ul").html(sHtml);
	};
	
	$.nextPage = function() {
		var page = nRecentViewProductsCurrentPage+1;
		if(page >= nRecentViewProductsPage) {
			nRecentViewProductsCurrentPage = 0;			
		} else {
			nRecentViewProductsCurrentPage = page;
		}
		$.draw(); 
	};
	
	$.prevPage = function() {
		var page = nRecentViewProductsCurrentPage-1;
		if(page < 0) {
			nRecentViewProductsCurrentPage = nRecentViewProductsPage-1;
		} else {
			nRecentViewProductsCurrentPage = page;
		}
		$.draw(); 
	};
		
	//최근 본 상품 데이터
	$.loadContentProduct = function() {
		var url = "http://prod.danawa.com/list/todayItemViewListJson.inc.php?jsoncallback=?";
		var params = {format: "json"};
		$.getJSON(url, params, function(json) {
			if (json) {
				aRecentViewProductsJson = eval(json);
			}
			$.draw(); 
		});			
	};
	
	//입소문 쇼핑 데이터
	$.loadContentRumorContents = function() {
		var url = "http://www.danawa.com/api/danawa/rumorContentsListJson.php?jsoncallback=?";
		var params = {format: "json"};
		$.getJSON(url, params, function(json) {
			if (json) {
				aRumorContentsJson = eval(json);
			}
			$.drawRumorContents(); 
		});
	};
	
	$.setStartHomePage = function(obj){ 
		obj.style.behavior = 'url(#default#homepage)'; 
		obj.setHomePage('http://www.danawa.com/'); 
	};
	
	$.addFavorite = function(){
		window.external.addFavorite('http://www.danawa.com/', '행복쇼핑의 시작! 다나와 (가격비교)');
	};
	
})(jQuery);

jQuery(document).ready(function($) {

	if ($('p#first_layer').next().length == 0){
		$('p#first_layer').css({marginTop:'20px'});
	}

	if ($('.hot_vs > .vs > .hot_vs_img').length < 3 ){
		$('.hot_vs > .vs ').css({marginLeft:'20px'});
	}

	if ($('#last_layer_main').length == 0){
		$('p#first_layer_main').css({marginTop:'40px'});
	}

	$('.last_menu li:eq(1)').css({marginBottom:'-4px'});


	$("li.category a").click(function(){
		$(this).blur();
		$('#category_price').toggleClass('show');
	});
	$('#category_price').mouseenter(function(){
		$('#category_price').addClass('show');
	});
	$('#category_price').mouseleave(function(){
		$('#category_price').addClass('none');
		$('#category_price').removeClass('show');
	});



	$('.seller,#seller').mouseover(function(){
		$('#seller').css({display:'block'});
	});
	$('.seller,#seller').mouseout(function(){
		$('#seller').css({display:'none'});
		$('#area').css({display:'none'});
	});

	$('.area,#area').mouseover(function(){
		$('#area').css({display:'block'});
	});
	$('.area,#area').mouseout(function(){
		$('#area').css({display:'none'});
		$('#seller').css({display:'none'});
	});


// footer
	$('#content_guide,#indicate_onlineDigitalContent').mouseover(function(){
		$('#indicate_onlineDigitalContent').addClass('show');
	});
	$('#content_guide,#indicate_onlineDigitalContent').mouseout(function(){
		$('#indicate_onlineDigitalContent').addClass('none');
		$('#indicate_onlineDigitalContent').removeClass('show');
	});

// scroll_banner
	$.loadContentProduct();
	$.loadContentRumorContents();

	/*$('.new_lnb dl,#category_open dl,.lnb_top_menu dl').hover(function(){
		$(this).css({backgroundColor:'#e5eeff'});
	}, function(){
		$(this).css({backgroundColor:'#ffffff'});
	});*/

	$('.right_tab li').hover(function(){
		if (!$(this).hasClass('over')) {
		$('.right_tab li').removeClass('over');
		$(this).addClass('over');
		$('.left_goods > div').css({display:'none'});
		$('.left_goods > div:eq(' + $('.right_tab li').index(this) + ')').css({display:'block'});
		}

		}).mouseover(function() {
		$(this).addClass('over');
		$(this).removeClass('');

		}).mouseout(function() {
		$(this).addClass('');
		//$(this).removeClass('over');
	});

	$('.accessory_tab li').hover(function(){
		if (!$(this).hasClass('over')) {
		$('.accessory_tab li').removeClass('over');
		$(this).addClass('over');
		$('.goods_list > div').css({display:'none'});
		$('.goods_list > div:eq(' + $('.accessory_tab li').index(this) + ')').css({display:'block'});
		}

		}).mouseover(function() {
		$(this).addClass('over');
		$(this).removeClass('');

		}).mouseout(function() {
		$(this).addClass('');
		//$(this).removeClass('over');
	});

	$('.navigation > ul.menu > li#menu_11').hover(function(){
		$(this).children().next().css({display:'block'});
		$('#all_up').css({display:'block'});
		$('#all_down').css({display:'none'});

	}, function() {
		$(this).children().next().css({display:'none'});
		$('#all_up').css({display:'none'});
		$('#all_down').css({display:'block'});
	});




	$('.tab_category').bind('click', function(event){
		if($('#category_all_open').css('display') == 'none'){
			$('#category_all_open').css({display:'block'});
			$('.tab_category a.open').css({display:'none'});
			$('.tab_category a.close').css({display:'block'});
		}
		else {
			$('#category_all_open').css({display:'none'});
			$('.tab_category a.open').css({display:'block'});
			$('.tab_category a.close').css({display:'none'});
		}
	 });

	 $('.btn_close').click(function(){
		$('#category_all_open').css({display:'none'});
		$('.tab_category a.open').css({display:'block'});
		$('.tab_category a.close').css({display:'none'});
	});




	$("li.more_view a").click(function(){
			$(this).blur();
			$('#more_view').toggleClass('show');
		});
		$('#more_view').mouseover(function(){
			$('#more_view').addClass('show');
		});
		$('#more_view').mouseout(function(){
			$('#more_view').addClass('none');
			$('#more_view').removeClass('show');
		});

	 $('.section_menu_open h5').bind('click', function(event){
		if($('#menu_open_layer').css('display') == 'none'){
			$('#menu_open_layer').css({display:'block'});
			$('.section_menu_open h5 a.open').css({display:'none'});
			$('.section_menu_open h5 a.close').css({display:'block'});
		}
		else {
			$('#menu_open_layer').css({display:'none'});
			$('.section_menu_open h5 a.open').css({display:'block'});
			$('.section_menu_open h5 a.close').css({display:'none'});
		}
	 });


	 $('.new_snb h5').bind('click', function(event){
		if($('#category_open').css('display') == 'none'){
			$('#category_open').css({display:'block'});
			$('.new_snb h5 a.open').css({display:'none'});
			$('.new_snb h5 a.close').css({display:'block'});
		}
		else {
			$('#category_open').css({display:'none'});
			$('.new_snb h5 a.open').css({display:'block'});
			$('.new_snb h5 a.close').css({display:'none'});
		}
	 });


	 $('.lnb_sub_category_open').bind('click', function(event){
		if($('.lnb_top_menu').css('display') == 'none'){
			$('.lnb_top_menu').css({display:'block'});
			$('.category_open_button a.open').css({display:'none'});
			$('.category_open_button a.close').css({display:'block'});
			//$('.lnb_top_menu_box').css({marginTop:'-1px'});
		}
		else {
			$('.lnb_top_menu').css({display:'none'});
			$('.category_open_button a.open').css({display:'block'});
			$('.category_open_button a.close').css({display:'none'});
			//$('.lnb_top_menu_box').css({marginTop:'5px'});
		}
		});


		$('#cateListBox').css({display:'block'});

		$('.dnw_snb h5').bind('click', function(event){
		if($('#category_open').css('display') == 'none'){
			$('#category_open').css({display:'block'});
			$('.dnw_snb h5 a.open').css({display:'none'});
			$('.dnw_snb h5 a.close').css({display:'block'});
			$('ul.pLocation > li:eq(2)').css({zIndex:'-1'});
			if ( $.browser.msie && $.browser.version.substring(0, 1) == "6" && ($('#category_open dl').length > 5))
			{
				$('#cateListBox').css({display:'none'});
			}
		}
		else {
			$('#category_open').css({display:'none'});
			$('.dnw_snb h5 a.open').css({display:'block'});
			$('.dnw_snb h5 a.close').css({display:'none'});
			$('#cateListBox').css({display:'block'});
			
		}
		});


	$('a.new_target').click(function(){

		window.open(this.href);
		return false;
	});

	$(".lnb_top_menu_box, .lnb_top_menu, .dnw_snb, #dnw_header, #IFRAME_SrchOption, #container, #content_area, #con1, #con2, #con3, #TBL_Container, table").mouseover(function(){
		$("#menu_detail").hide();
	});

	/*$("#dnw_wrap").mouseout(function(){
		//$("#menu_detail").hide();
	});*/
});

