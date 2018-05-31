/**
* bool String::bytes(void)
* �ش罺Ʈ���� ����Ʈ���� ���̸� �����մϴ�. (������ length �Ӽ��� 2����Ʈ ���ڸ� �ѱ��ڷ� �����մϴ�)
*/
String.prototype.strbytes = function()
{
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
	return l;
}

/**
* string String::strcut(int len, string tail)
* ���ڸ� �տ������� ���ϴ� ����Ʈ��ŭ �߶� �����մϴ�.
* �ѱ��� ��� 2����Ʈ�� ����ϸ�, ���� �߰����� �߸��� �ʽ��ϴ�.
*/
String.prototype.strcut = function(len, tail)
{
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++)
	{
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len) return str.substring(0,i) + tail;
	}
	return str;
}

/* ��� ��
	aaa = "��a��b��c�� ��λ���";
	alert(aaa.strcut(15));

	// �Ǵ�
	bbb = "�ʹ��䳻��ʹ��䳻��ʹ��䳻��";
	alert("length: " + bbb.length + "\nbytes(): " + bbb.strbytes());

	//����
	if (bbb.strbytes() > 20)
		alert("������ �ʹ� ��ϴ�");
	else
		// ó��
*/


// HTML Ư�����ڸ� ��ȯ
String.prototype.htmlChars = function()
{
	var str = ((this.replace('"', '&')).replace('"', '"')).replace('\'', '\'');
	return (str.replace('<', '<')).replace('>', '>');
}

// �¿� ������ִ� �Լ�
String.prototype.trim = function() {return this.replace(/(^\s*)|(\s*$)/g, "");}

// �±׸� ����
String.prototype.stripTags = function()
{
	var str = this;
	var pos1 = str.indexOf('<');

	if (pos1 == -1) return str;
	else
	{
		var pos2 = str.indexOf('>', pos1);
		if (pos2 == -1) return str;
		return (str.substr(0, pos1) + str.substr(pos2+1)).stripTags();
    }
}

function commaNum(num)
{
	if (num < 0) { num *= -1; var minus = true}
	else var minus = false
	var dotPos = (num+"").split(".")
	var dotU = dotPos[0]
	var dotD = dotPos[1]
	var commaFlag = dotU.length%3
	if(commaFlag)
	{
		var out = dotU.substring(0, commaFlag)
		if (dotU.length > 3) out += ","
	}
	else var out = ""
	for (var i=commaFlag; i < dotU.length; i+=3)
	{
		out += dotU.substring(i, i+3)
		if( i < dotU.length-3) out += ","
	}
	if(minus) out = "-" + out
	if(dotD) return out + "." + dotD
	else return out
}

//�̴��� ���ȭ��
function wall_pop()
{
	var width=593;
	var height=750;
	var posx=0;
	var posy=0;

	position = "width="+width+",height="+height+",scrollbars=no,top="+posy+",left="+posx;
	window.open('http://img.danawa.com/wall/wall.html','DanawaDica', position);
}

function strcut_fix(str, maxlen, tail)
{
	if(maxlen == 0) return;

	var width		= new Array(0, 12, 4, 4, 4,	6, 6, 10, 8, 4,	5, 5, 6, 6,	4, 6, 4, 6,	6, 6, 6, 6,	6, 6, 6, 6,	6, 6, 4, 4,	8, 6, 8, 6,	12,	8, 8, 9, 8,	8, 7, 9, 8,	3, 6, 8, 7,	11,	9, 9, 8, 9,	8, 8, 8, 8,	8, 10, 8, 8, 8,	6, 11, 6, 6, 6,	4, 7, 7, 7,	7, 7, 3, 7,	7, 3, 3, 6,	3, 11, 7, 7, 7,	7, 4, 7, 3,	7, 6, 10, 7, 7,	7, 6, 6, 6,	9, 0);
	var str_buffer	= '';
	var len_buffer	= 0;
	var count		= 0;
	var str_len		= str.length;
	var asc;

	maxlen = width[1] * maxlen / 2;

	while( count <	str_len )
	{
		asc = str.charCodeAt(count);

		if(	asc > 128 )
		{
			len_buffer	+= width[1];
		}
		else
		{
			len_buffer	+= width[asc-30];
		}

		if(	len_buffer > maxlen )
		{
			if(tail) str_buffer += tail;
			break;
		}

		str_buffer	+= str.substring(count,count+1);
		count += 1;
	}
	return str_buffer;
}

//�������� �� ���� �˾�â ����
function contact()
{
	var url = "http://eshop.danawa.co.kr/mall/contactus.html";
	var opt = "width=808, height=800, scrollbars=yes";
	window.open(url, "contactus_pop", opt);
}

// ���޻縦 ���� �������� �˾�����(POST)
function contact_affil()
{
	var f		= document.FORM_AffilInfo;
	f.method	= "post";
	f.action	= "http://eshop.danawa.com/mall/contactus_partner.html";
	f.target	= "contactus_pop";
	var opt		= "width=808, height=800, scrollbars=yes";
	window.open("about:blank", "contactus_pop", opt);
	f.submit();
}

//�������� �� ���� �˾�â ����
function contact5()
{
	var url = "http://eshop.danawa.com/mall/p_request.html";
	var opt = "width=808, height=800, scrollbars=yes";
	window.open(url, "contactus5_pop", opt);
}

//*** comindex_right �˾�â ����
function comright(kindc, typec, codec)
{
	var win = window.open('http://pc.danawa.com/comindex_right.php3?kindc=' + kindc + '&typec='+typec+'&codec='+codec,'viewprod','resizable=yes, scrollbars=yes,left=300,top=50,height=600,width=635');
	win.focus();
}

//*** comindex_right �˾�â ����
function comright_new(cate1, cate2, pcode)
{
	var win = window.open('http://pc.danawa.com/price_right.html?cate1=' + cate1 + '&cate2='+cate2+'&pcode='+pcode,'viewprod','resizable=yes, scrollbars=yes,left=300,top=50,height=600,width=635');
	win.focus();
}

//*** comindex_right �˾�â ���� - ��ǰ�� ���� �ǰߺ���
function comright_opinion(cate1, cate2, pcode)
{
	var win = window.open('http://pc.danawa.com/price_right.html?cate1=' + cate1 + '&cate2='+cate2+'&pcode='+pcode+'#explain_board','viewprod','resizable=yes, scrollbars=yes,left=300,top=50,height=600,width=635');
	win.focus();
}

//*** ���� ��ǰ �������� �˾�â ����
function ProdView(nCateC1, nCateC2, nCateC3, nCateC4, nDepth, nProdC)
{
	sUrl =  'http://www.danawa.com/elec/prod_view/prod_view_frame.php?cmd=view' +
			'&cate_c1=' + nCateC1 +
			'&cate_c2=' + nCateC2 +
			'&cate_c3=' + nCateC3 +
			'&cate_c4=' + nCateC4 +
			'&depth='   + nDepth  +
			'&prod_c='  + nProdC;

	WindowOpen(sUrl, '_blank', 22, 0, 968, 700, false, false, false, true, true);
}

function WindowOpen(url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
  toolbar_str = toolbar ? 'yes' : 'no';
  menubar_str = menubar ? 'yes' : 'no';
  statusbar_str = statusbar ? 'yes' : 'no';
  scrollbar_str = scrollbar ? 'yes' : 'no';
  resizable_str = resizable ? 'yes' : 'no';
  window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}
/******************************************/


//*** ���Ӽ��� �޴� �̹��� ����
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
/******************************************/

/*
 * 2007-04-04, kbk35
 * ��ǰ�̹��� ��� ���� �Լ�
 ****************************
 * Arg[0] : ��ǰ�ڵ�
 * Arg[1] : ��ǰ ������ ���丮 ��(�⺻: small)
 */
function getPImgStringSize(sSize) {
		 if ( sSize == 'middle'		) nSizeType = 160;
	else if ( sSize == 'middle2'	) nSizeType = 130;
	else if ( sSize == 'large'		) nSizeType = 550;
	else if ( sSize == 'big_large'	) $nSizeType = 5000;
	else							  nSizeType = 80;
	return nSizeType;
}

function getProdImageURL() {
	var oArg = getProdImageURL.arguments;
	var nArg = oArg.length;

	if(nArg == 0) return false;

	var sImgURL		= null;
	var nProdCode	= oArg[0];
	var nSizeType	= 80;
	var nPImgSeqNum	= 1;

	if(nArg == 1) {}
	else if (nArg == 2) { // argument�� �ΰ��� �Ѿ������.
		if(oArg[1] >= 1 && oArg[1] < 17) { // ��ǰ�̹��� ���° ����....
			nPImgSeqNum	= oArg[1];
		}
		else {	// ��ǰ ������
			nSizeType		= oArg[1];
		}
	}
	else {
		if(oArg[1] >= 1 && oArg[1] < 17) {
			nPImgSeqNum	= oArg[1];
			nSizeType	= oArg[2];
		}
		else {
			nSizeType	= oArg[1];
			nPImgSeqNum	= oArg[2];
		}
	}

	var sPat = /^[1-9]+[0-9]*/;
	if (sPat.test(nProdCode) != true) return;
	if (sPat.test(nSizeType) != true) nSizeType = getPImgStringSize(nSizeType);


	if(nProdCode >= 500000) {
		var sTmpStr	 = nProdCode.toString();
		var sSubDir1 = sTmpStr.substr(sTmpStr.length-3,3);
		var sSubDir2 = sTmpStr.substr(sTmpStr.length-6,3);

		if(nSizeType >= 20 && nSizeType <= 80)
			sImgURL = 'http://img.danawa.com/prod_img/500000/'+sSubDir1+'/'+sSubDir2+'/img/'+nProdCode+'_'+nPImgSeqNum+'_80.jpg';
		else if(nSizeType > 80 && nSizeType <= 130)
			sImgURL = 'http://img.danawa.com/prod_img/500000/'+sSubDir1+'/'+sSubDir2+'/img/'+nProdCode+'_'+nPImgSeqNum+'_130.jpg';
		else if(nSizeType > 130 && nSizeType <= 160)
			sImgURL = 'http://img.danawa.com/prod_img/500000/'+sSubDir1+'/'+sSubDir2+'/img/'+nProdCode+'_'+nPImgSeqNum+'_160.jpg';
		else if ((nSizeType > 160 && nSizeType < 5000) || nSizeType == 0 || nSizeType == null)
			sImgURL = 'http://img.danawa.com/prod_img/500000/'+sSubDir1+'/'+sSubDir2+'/img/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else if (nSizeType >= 5000)
			sImgURL = 'http://img.danawa.com/prod_img/500000/'+sSubDir1+'/'+sSubDir2+'/img/'+nProdCode+'_'+nPImgSeqNum+'_big.jpg';
		else
			sImgURL = null;
	}
	else {
		if(nSizeType >= 20 && nSizeType <= 80)
			sImgURL = 'http://img.danawa.com/prod_img/small/group_'+Math.floor(nProdCode/500)+'/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else if(nSizeType > 80 && nSizeType <= 130)
			sImgURL = 'http://img.danawa.com/prod_img/middle2/group_'+Math.floor(nProdCode/500)+'/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else if(nSizeType > 130 && nSizeType <= 160)
			sImgURL = 'http://img.danawa.com/prod_img/middle/group_'+Math.floor(nProdCode/500)+'/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else if ((nSizeType > 160 && nSizeType < 5000) || nSizeType == 0 || nSizeType == null)
			sImgURL = 'http://img.danawa.com/prod_img/large/group_'+Math.floor(nProdCode/500)+'/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else if (nSizeType >= 5000)
			sImgURL = 'http://img.danawa.com/prod_img/big_large/group_'+Math.floor(nProdCode/500)+'/'+nProdCode+'_'+nPImgSeqNum+'.jpg';
		else
			sImgURL = null;
	}

	//if(sImgURL == null) sImgURL = "http://img.danawa.com/GoodsImage/thumb.php?q="+nProdCode+"&size="+nSizeType+"&rep=1";

	//var sImgURL = "http://img.danawa.com/GoodsImage/thumb.php?q="+nProdCode+"&size="+nSizeType+"&rep=1";
	return sImgURL;
}