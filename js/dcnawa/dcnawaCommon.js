jQuery(document).ready(function(){
	jQuery("body").css("width","100%");
	jQuery(document).ajaxStart(function(){
		var modalTop = 400;
		if(jQuery(document).scrollTop() > 0)
		{
			modalTop = (jQuery(document).height() * 20) / 120;
		}
		jQuery("#ajaxLoader").css({"z-index":9999,"top":jQuery(document).scrollTop() + modalTop}).show();
	}).ajaxStop(function(){
		jQuery("#ajaxLoader").css({"z-index":0}).hide();
	});
});
jQuery(function(){	
	//모달 레이어 바깥을 클릭하면 모달 레이어 감춤
	jQuery("#pageCover").click(function(){
		modalClose();
	});

	//1차 카테고리 선택시 2차 카테고리 리스트 노출
	jQuery("a#title").mouseover(function(){
		jQuery(".popSubCategoryLayer").css("display","none");
		jQuery(this).siblings("div").css("display","block");
	});

	//카테고리 레이어 외의 부분 마우스 오버시 2차 카테고리 비노출
	//header, footer, 본문
	jQuery("#header, #footer_new, .contents_area").mouseover(function(){
		jQuery(".popSubCategoryLayer").css("display","none");
	});
});

modalOpen = function(prodCode)
{
	var modalTop = 400;
	if(jQuery(document).scrollTop() > 0)
	{
		modalTop = (jQuery(document).height() * 20) / 120;
	}

	jQuery.get("dcnawaList.proc.php",{prodCode:prodCode},function(data){
		jQuery(".modal_Container").html(data);	
	});
	//구매하기 버튼을 클릭하면 모달레이어 노출
	//추후 Ajax사용 데이터 삽입 모듈 추가
	//모달 레이어 노출
	//모달 레이어는 화면 높이에서 20% 밑의 위치
	jQuery(".modalWindowLayer").css({
			"display":"block",			
			"top":jQuery(document).scrollTop() + modalTop,
			"z-index":9998
	});
	//모달 레이어 배경 노출
	jQuery("#pageCover").css({
			"display":"inline",
			"width":document.body.scrollWidth,
			"height":document.documentElement.scrollHeight,
			"z-index":9997,
			"top":0,
			"left":0
 	});	
};

modalClose = function()
{
	jQuery(".modal_Container").html("");
	jQuery(".modalWindowLayer").css({
		"display":"none",
		"z-index":0		
	});
	jQuery("#pageCover").css({
		"display":"none",
		"z-index":0
	});
};

/**
 * PRICE-1092
 * 구매하기 버튼 클릭시 모달 레이어 오픈
 * @use 	common_files/tpl/product_delivery/prodList_list.tpl.html
 * @author	eprkswu
 * @since	2010-11-29
 */
fnBuyModalOpen = function(prodCode)
{
	var modalTop = 400;
	if(parent.jQuery(document).scrollTop() > 0)
	{
		modalTop = (parent.jQuery(document).height() * 20) / 120;
	}	
	
	jQuery.get("/dcnawa/dcnawaList.proc.php",{prodCode:prodCode},function(data){		
		parent.jQuery(".modal_Container").html(data);	
	});
	
	//부모창의 모달 레이어 배경 노출
	parent.jQuery("#pageCover").css({
		"display":"inline",
		"width":parent.document.body.scrollWidth,
		"height":parent.document.documentElement.scrollHeight,
		"z-index":9997,
		"top":0,
		"left":0
	});	
	//부모창의 모달 레이어 노출
	parent.jQuery(".modalWindowLayer").css({
		"display":"block",
		"top":jQuery(parent.document).scrollTop()+400,
		"z-index":9998
	});
};

/*
 * setInterval 사용시 적용 함수
 * 현재 top px과 마지막 top px을 사용하여
 * 마지막 top px일땐 0으로 전환하여 처음으로
 * top px이 0(처음 이미지) 일댄 마지막 top px을 사용하여 마지막으로 이동
 * 처음과 마지막이 아닐땐 -200 씩 추가하여 아래로 슬라이드
 */
autoStart = function()
{
	var index = jQuery(".dui_sliding").css("top");	
	var length = $(".dui_sliding li").length;
	index = parseInt(index.replace("px",""));
	if(index == 0)
	{
		index = -200;		
	}
	else if(index <= (-200 * (length - 1)))
	{
		index = 0;
	}
	else
	{
		index = index - 200;
	}
	jQuery(".dui_sliding").animate({
		   top : (index) + "px"
	}, 500);
};

//logger 클릭률 체크용
function _trkEventLogDcnawa(str)
{
	try {_trk_clickTrace('EVT', str);} catch(_e) {}
}