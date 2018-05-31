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
	//��� ���̾� �ٱ��� Ŭ���ϸ� ��� ���̾� ����
	jQuery("#pageCover").click(function(){
		modalClose();
	});

	//1�� ī�װ� ���ý� 2�� ī�װ� ����Ʈ ����
	jQuery("a#title").mouseover(function(){
		jQuery(".popSubCategoryLayer").css("display","none");
		jQuery(this).siblings("div").css("display","block");
	});

	//ī�װ� ���̾� ���� �κ� ���콺 ������ 2�� ī�װ� �����
	//header, footer, ����
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
	//�����ϱ� ��ư�� Ŭ���ϸ� ��޷��̾� ����
	//���� Ajax��� ������ ���� ��� �߰�
	//��� ���̾� ����
	//��� ���̾�� ȭ�� ���̿��� 20% ���� ��ġ
	jQuery(".modalWindowLayer").css({
			"display":"block",			
			"top":jQuery(document).scrollTop() + modalTop,
			"z-index":9998
	});
	//��� ���̾� ��� ����
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
 * �����ϱ� ��ư Ŭ���� ��� ���̾� ����
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
	
	//�θ�â�� ��� ���̾� ��� ����
	parent.jQuery("#pageCover").css({
		"display":"inline",
		"width":parent.document.body.scrollWidth,
		"height":parent.document.documentElement.scrollHeight,
		"z-index":9997,
		"top":0,
		"left":0
	});	
	//�θ�â�� ��� ���̾� ����
	parent.jQuery(".modalWindowLayer").css({
		"display":"block",
		"top":jQuery(parent.document).scrollTop()+400,
		"z-index":9998
	});
};

/*
 * setInterval ���� ���� �Լ�
 * ���� top px�� ������ top px�� ����Ͽ�
 * ������ top px�϶� 0���� ��ȯ�Ͽ� ó������
 * top px�� 0(ó�� �̹���) �ϴ� ������ top px�� ����Ͽ� ���������� �̵�
 * ó���� �������� �ƴҶ� -200 �� �߰��Ͽ� �Ʒ��� �����̵�
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

//logger Ŭ���� üũ��
function _trkEventLogDcnawa(str)
{
	try {_trk_clickTrace('EVT', str);} catch(_e) {}
}