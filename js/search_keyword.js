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



	srch_kwd_txt[0]	= '����Ű ���� waffle';
	
	srch_kwd_txt[1]	= '2006 ���̾';
	srch_kwd_txt[2]	= 'ũ�� ����';
	srch_kwd_txt[3]	= '������ DMB';
	srch_kwd_txt[4]	= 'Ÿ�� PC';
	srch_kwd_txt[5]	= '���� ��ġ';

	srch_kwd_txt[6]	= 'ǥ��PC';
	srch_kwd_txt[7]	= '��Ʈ��';
	srch_kwd_txt[8]	= '���� ����ũ';
	srch_kwd_txt[9]	= '��� ��';

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
