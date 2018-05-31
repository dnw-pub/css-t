var c2 = false;
var srch_keyword2 = '';

function search_keyword_rand(obj)
{
	var srch_kwd_img = new Array();
	var srch_kwd_txt = new Array();

	srch_kwd_img[0]	= 'http://img.danawa.com/ad/images/campaign/lge/happywedding/300-18.gif';
	srch_kwd_txt[0]	= 'http://sas.nasmedia.co.kr/sas/redirect/adv/LGHW0609(300)dana.asp';
	
	//var c=false;
	var len			= srch_kwd_img.length;
	var bgNum		= Math.floor(Math.random()*len);
	var bgUrl		= srch_kwd_img[bgNum];
	
	//주소
	srch_keyword2	= srch_kwd_txt[bgNum];
	//이미지
	obj.style.backgroundImage = 'url('+bgUrl+')';
	//alert(srch_keyword2);
}

function ch(obj)
{
	alert('test');
	if (c2) return;
	srch_keyword2 = '';
	obj.style.backgroundImage='';
	
	c2=true;
	//alert(srch_keyword2);
}