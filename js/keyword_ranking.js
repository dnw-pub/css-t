function keyword(
	$,
	oHotKeywordSectionList,
	oSectionImageSeqList	
	){	
	this.init = function(){
		var aTopKeywordList = Affiliate_hotKeyword_0.keywordList;
		var sTopKwdHtml = "<ol class='word_list rank_wrap'>";
		var sSelectedClass = "";
		var sKeywordStatus = "";
		var sKeywordLink = "";
		var rollInterval;
		var now;
		
		for(var i = 0; i < aTopKeywordList.length; i++){
	
			if(i > 9){ break; }
			
			sSelectedClass = "";
			if(i == 0){
				sSelectedClass = "selected";	
			}
	
			if(aTopKeywordList[i].hotKeywordUp == "Y"){
				sKeywordStatus = "<span class='status'><span class='rank_up'>순위 상승</span></span>";	
			}else if(aTopKeywordList[i].hotKeywordDown == "Y"){
				sKeywordStatus = "<span class='status'><span class='rank_down'>순위 하락</span></span>";	
			}else if(aTopKeywordList[i].hotKeywordNew == "Y"){
				sKeywordStatus = "<span class='status'><span class='rank_new'>신규 진입</span></span>";	
			}else{
				sKeywordStatus = "<span class='status'><span class='rank_keep'>순위 유지</span></span>";	
			}
	
			sKeywordLink = "http://search.danawa.com/dsearch.php?query=" + aTopKeywordList[i].hotKeywordName;
			
			sTopKwdHtml += "<li class='"+sSelectedClass+"'><a href='"+sKeywordLink+"' class='order_"+(i+1)+"'>"+aTopKeywordList[i].hotKeywordName+" "+sKeywordStatus+"</a></li>"; 
		}
		sTopKwdHtml += "</ol>";
	
		jQuery(".up_word_wrap").html(sTopKwdHtml);

		var sCateListHtml = "<div class='list_header'>";
		sCateListHtml += "<ul style='position:relative;height: 13px;width: 124px; overflow:hidden'>";	
		var sKeywordListHtml = "<div id='todayKeywordList' style='position:relative;height:260px;width: 185px;overflow:hidden'>";
		var sListClass = "";		
		var sFirstKeywordText = "";
		var randIndex = Math.floor(Math.random() * Object.keys(oHotKeywordSectionList).length);

		var nHotKeywordSeactionSeq = 0;
		$.each(oHotKeywordSectionList,function(index,value){
			var aKeywordList = eval("Affiliate_hotKeyword_" + index + ".keywordList");
								
			sCateListHtml += "<li style='position:absolute;width:100%;left:175px;'><h4 class='cate_tit_"+oSectionImageSeqList[index]+"'>"+value+"</h4></li>";				
			sKeywordListHtml += "<ol class='word_order rank_wrap' style='position:absolute;width:100%;left:185px;'>";

			if(nHotKeywordSeactionSeq == randIndex){						
				sFirstKeywordText = aKeywordList[0].hotKeywordName;
			}
						
			$.each(aKeywordList,function(nKeywordIndex,oKeywordObject){

				if(nKeywordIndex > 9){
					return false;
				}
				
				var sStatusText = "";
				if(oKeywordObject.hotKeywordNew == "Y"){
					sStatusText = "<span class='status'><span class='rank_new'>신규진입</span></span>";
				}else if(oKeywordObject.hotKeywordUp == "Y"){
					sStatusText = "<span class='status'><span class='rank_up'>순위상승</span></span>";
				}else if(oKeywordObject.hotKeywordDown == "Y"){
					sStatusText = "<span class='status'><span class='rank_down'>순위하락</span></span>";
				}else{
					sStatusText = "<span class='status'><span class='rank_keep'>순위유지</span></span>";
				}

				sSelectedClass = "";
				if(nHotKeywordSeactionSeq == randIndex && nKeywordIndex == 0){
					sSelectedClass = "selected";	
				}

				var sOrderNumber = "";
				if((nKeywordIndex+1) < 10){
					sOrderNumber = "<span class='n_"+(nKeywordIndex+1)+"'></span>";
				}else{
					sOrderNumber = "<span class='n_1'></span>";
					sOrderNumber += "<span class='n_0'></span>";
				}
				
				sKeywordListHtml += "<li class='"+sSelectedClass+"'><a href='#' onclick='return false;' class='list_link'><span class='order_num'>"+sOrderNumber+"</span> <span class='keyword_text'>"+oKeywordObject.hotKeywordName+"</span> "+sStatusText+"</a></li>";
			});		
			
			sKeywordListHtml += "</ol>";
			
			nHotKeywordSeactionSeq++;
		});

		sCateListHtml += "</ul>";
		sCateListHtml += "</div>";
		sKeywordListHtml += "</div>";
		
		$(".cate_frame .cate_selector .cate_wrap .key_list").html(sCateListHtml + sKeywordListHtml);		

		$(".up_word_wrap ol li").mouseover(function(){
			$(".up_word_wrap ol li.selected").removeClass("selected");
			$(this).addClass("selected");
		});

		$("#todayKeywordList ol li").click(function(){
			$("#pageCover").removeClass("hide");
			$("#recommendAjaxImage").removeClass("hide");
			$("#todayKeywordList ol li.selected").removeClass("selected");
			$(this).addClass("selected");
			var sKeywordText = $(this).find(".keyword_text").text();
			getKeywordRecommend(sKeywordText);
		});	

		searchToolRolling($,randIndex);

		getKeywordRecommend(sFirstKeywordText);

		$(".btn_cate_all").click(function(){
			if($(".all_cate").hasClass("hide") == true){
				$(".all_cate").removeClass("hide");
			}else{
				$(".all_cate").addClass("hide");
			}		
		});

		$(".all_cate .btn_close").click(function(){
			$(".all_cate").addClass("hide");
		});
		
		$(".hot_key_week .week_rank_wrap li").mouseover(function(){
			$(".hot_key_week .week_rank_wrap li.selected").removeClass("selected");
			$(this).addClass("selected");
		});
	};
};

var global_now = 0; //현재 보이는 리스트 index
var global_bro = global_now; //다음 리스트 index
var global_cate = null;
var global_word = null;
var global_status = true;
var global_animateState = true;
var ajax_jsonp = null;
var keywordText = "";

//http://iapi.danawa.com/api/main/product/list/searchByAttribute?mediaType=xml&charset=utf8&cate1=".$cate_c1."&cate2=".$cate_c2."&cate3=".$cate_c3."&cate4=0&orderBy=saveCountDESC&shortageYN=N&offset=0&limit=5
function getKeywordRecommend(sKeywordText){
	if(keywordText != sKeywordText){				
		keywordText = sKeywordText;		
								
		var jsonUrl = "http://search.danawa.com/dsearch.php";
		ajax_jsonp = jQuery.ajax({
			dataType : "jsonp",
			jsonp : "callback",
			jsonpCallback : "drawRecommendProduct",
			url : jsonUrl,
			data : {"query":sKeywordText,"module":"recommand","act":"dispRcmdProductListKeywordRanking"}		
		});
		
	}
}

function drawRecommendProduct(jsonData){
	
	var recommendProductHtml = "";
	recommendProductHtml += "<h5>검색어 추천상품</h5>";
	recommendProductHtml += "<a class='view_more' href='http://search.danawa.com/dsearch.php?query="+keywordText+"'>"+keywordText+" 추천상품 더보러가기</a>";
	recommendProductHtml += "<ul class='goods_list'>";
	jQuery.each(jsonData,function(){
		recommendProductHtml += "<li>";
		recommendProductHtml += "<a href='"+$(this).productLinkUrl+"' class='link_goods'>";
		recommendProductHtml += "<img src='"+$(this).productImage+"' alt='"+$(this).productFullName+"' class='thumb'>";
		recommendProductHtml += "<span class='name'>"+$(this).productName+"</span>";
		recommendProductHtml += "</a>";
		recommendProductHtml += "<span class='price'>"+$(this).minPrice+"원</span>";
		recommendProductHtml += "<div class='goods_opt'>";
		recommendProductHtml += "<a href='"+$(this).productLinkUrl+"' class='btn_compare'>가격비교</a> <a href='#' onclick='javascript:saveWishProduct("+$(this).productSeq+",event); return false;' class='btn_add_fav'>관심상품</a>";			
		recommendProductHtml += "</div>";
		recommendProductHtml += "</li>";				
	});
	recommendProductHtml += "</ul>";

	jQuery(".recom_goods").html(recommendProductHtml); 	
	jQuery("#pageCover").addClass("hide");
	jQuery("#recommendAjaxImage").addClass("hide");
}

function searchToolRolling($,randIndex){
	global_now = randIndex; //현재 보이는 리스트 index
	global_bro = global_now; //다음 리스트 index
	global_cate = $(".cate_frame .cate_selector .cate_wrap .key_list .list_header ul li"); //상단 카테고리 명
	global_word = $('.cate_frame .cate_selector .cate_wrap .key_list #todayKeywordList ol'); //하단 키워드 그룹
	global_status = true;
	global_animateState = true;

	global_cate.eq(global_now).css('left','0px');
	global_word.eq(global_now).css('left','0px');

	/* 페이지 이벤트 등록 */
	var toolDiv = $(".cate_frame .cate_selector .nav_opt .move_cate");
	//toolDiv.hover(function(){clearInterval(rollInterval)},function(){startInterval();}); //버튼 마우스 오버시 멈춤
	toolDiv.find('.btn_next').click(function(){
		animate(global_cate,global_word,0);
	}); //다음버튼
	toolDiv.find('.btn_prev').click(function(){
		animate(global_cate,global_word,1);
	}); //이전버튼
}

function searchToolRollingSection(sectionNumber){
	if(global_now != sectionNumber){
		global_bro = sectionNumber;	
		global_cate = jQuery(".cate_frame .cate_selector .cate_wrap .key_list .list_header ul li"); //상단 카테고리 명
		global_word = jQuery('.cate_frame .cate_selector .cate_wrap .key_list #todayKeywordList ol'); //하단 키워드 그룹
		moveObj(global_cate,global_word,0);
	}
}

function animate(cate, word, sw){		
	if(sw == 0){ //순방향
		global_bro = global_now + 1;			
		if(global_now >= cate.length - 1){
			global_bro = 0;
		}		
		moveObj(cate,word,sw);					
	}else{ //역방향			
		global_bro = global_now - 1;
		if(global_bro < 0){
			global_bro = cate.length - 1;
		}
		cate.eq(global_bro).css("left","-175px");
		word.eq(global_bro).css("left","-185px");
		moveObj(cate,word,sw);
	}
}

function moveObj(cate, word, sw){//Object 이동 애니메이션
	var aniLen = 250; //애니메이션 duration
	var aniType = 'swing'; //애니메이션 easing		

	var animateCateLeft = {left:'+=175'};
	var animateWordLeft = {left:'+=185'};
	if(sw == 0){
		animateCateLeft = {left:'-=175'};
		animateWordLeft = {left:'-=185'};
	}			

	if(global_animateState == true){
		global_animateState = false;
		
		jQuery("#pageCover").removeClass("hide");
		jQuery("#recommendAjaxImage").removeClass("hide");
		
		if(jQuery(".all_cate").hasClass("hide") != true){
			jQuery(".all_cate").addClass("hide");
		}

		jQuery(".cate_frame .cate_selector .cate_wrap .key_list #todayKeywordList .word_order li.selected").removeClass("selected");
		word.eq(global_bro).find("li").eq(0).addClass("selected");

		var sKeywordText = word.eq(global_bro).find("li").eq(0).find(".keyword_text").text();
					
		cate.eq(global_now).animate(animateCateLeft,aniLen,aniType)
		.end().eq(global_bro).animate({'left':'0'},aniLen,aniType,function(){
			cate.eq(global_now).css("left","175px");						
		});
		
		word.eq(global_now).animate(animateWordLeft,aniLen,aniType)
		.end().eq(global_bro).animate({'left':'0'},aniLen,aniType,function(){
			word.eq(global_now).css("left","185px");
			global_now = global_bro;
			global_animateState = true;
			getKeywordRecommend(sKeywordText);					
		});			
	}	
}//moveObj