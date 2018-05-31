<!--
var c2 = false;
var srch_keyword2 = '';

function search_keyword_rand(obj)
{
	/*
	var srch_kwd_img = new Array();
	var srch_kwd_txt = new Array();

	srch_kwd_img[0]	= 'http://img.danawa.com/ad/images/campaign/lge/happywedding/300_18_2.gif';
	srch_kwd_txt[0]	= 'http://sas.nasmedia.co.kr/sas/redirect/adv/LGHW0609(300)2dana.asp';
	
	//var c=false;
	var len			= srch_kwd_img.length;
	var bgNum		= Math.floor(Math.random()*len);
	var bgUrl		= srch_kwd_img[bgNum];
	srch_keyword2	= srch_kwd_txt[bgNum];
	obj.style.backgroundImage = 'url('+bgUrl+')';
	//alert(srch_keyword2);
	*/
	
	var bgUrl		= adv_srch_obj;
	srch_keyword2	= adv_srch_url;
	//텍스트 광고타입
	if(adv_srch_type=='text')
  	{
  		obj.value = " "+bgUrl;
  	}
  	//이미지형 광고타입
  	else
  	{
  		obj.style.backgroundColor = '#FFFFFF';
  		obj.style.backgroundImage = 'url('+bgUrl+')';
  	}
  	
}

function search_ch(obj)
{
	if (c2) return;
	srch_keyword2 = '';
	//초기화
	obj.style.backgroundColor = '#EBF5DE';
	obj.style.backgroundImage='';
	//obj.value='';
	c2=true;
	//alert(srch_keyword2);
	alert('test');
}
-->
