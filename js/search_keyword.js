<!--
var c = false;
var srch_keyword = '';

function search_keyword_rand(obj)
{
	var srch_kwd_img = new Array();
	var srch_kwd_txt = new Array();

	srch_kwd_img[0]	= 'http://img.danawa.com/search/keyword_img/bg68.gif';

	srch_kwd_img[1]	= 'http://img.danawa.com/search/keyword_img/bg53.gif';
	srch_kwd_img[2]	= 'http://img.danawa.com/search/keyword_img/bg54.gif';
	srch_kwd_img[3]	= 'http://img.danawa.com/search/keyword_img/bg55.gif';
	srch_kwd_img[4]	= 'http://img.danawa.com/search/keyword_img/bg56.gif';
	srch_kwd_img[5]	= 'http://img.danawa.com/search/keyword_img/bg51.gif';

	srch_kwd_img[6]	= 'http://img.danawa.com/search/keyword_img/bg64.gif';
	srch_kwd_img[7]	= 'http://img.danawa.com/search/keyword_img/bg65.gif';
	srch_kwd_img[8]	= 'http://img.danawa.com/search/keyword_img/bg66.gif';
	srch_kwd_img[9]	= 'http://img.danawa.com/search/keyword_img/bg67.gif';



	srch_kwd_txt[0]	= '나이키 와플 waffle';
	
	srch_kwd_txt[1]	= '2006 다이어리';
	srch_kwd_txt[2]	= '크롭 팬츠';
	srch_kwd_txt[3]	= '차량용 DMB';
	srch_kwd_txt[4]	= '타블렛 PC';
	srch_kwd_txt[5]	= '국산 김치';

	srch_kwd_txt[6]	= '표준PC';
	srch_kwd_txt[7]	= '페트병';
	srch_kwd_txt[8]	= '포켓 바이크';
	srch_kwd_txt[9]	= '헤어 롤';

	//var c=false;
	var len			= srch_kwd_img.length;
	var bgNum		= Math.floor(Math.random()*len);
	var bgUrl		= srch_kwd_img[bgNum];
	srch_keyword	= srch_kwd_txt[bgNum];
	obj.style.backgroundImage = 'url('+bgUrl+')';
}

function ch(obj)
{
	if (c) return;
	srch_keyword = '';
	obj.style.backgroundImage='';
	c=true;
}
-->
