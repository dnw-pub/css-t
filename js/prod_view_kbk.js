<!--
//function ProdView(nCateC1, nCateC2, nCateC3, nCateC4, nProdC, aname)

// ����
function ProdView(nCateC1, nCateC2, nCateC3, nCateC4, nProdC) //*** ��ǰ �������� �˾�â ����
{
	var args = ProdView.arguments;
	var args_len = args.length;
	if(args_len > 5) nProdC = args[5];

	var nDepth;
	switch (true) {
		case (nCateC4 > 0) : nDepth = 4; break;
		case (nCateC3 > 0) : nDepth = 3; break;
		case (nCateC2 > 0) : nDepth = 2; break;
		case (nCateC1 > 0) : nDepth = 1; break;
	}
	sUrl =  'http://www.danawa.com/elec/prod_view/prod_view_frame.php?cmd=view' +
			'&cate_c1=' + nCateC1 +
			'&cate_c2=' + nCateC2 +
			'&cate_c3=' + nCateC3 +
			'&cate_c4=' + nCateC4 +
			'&depth='   + nDepth  +
			'&prod_c='  + nProdC;
	//if (aname) sUrl += '#' + aname;

	WindowOpen(sUrl, '_blank', 22, 0, 968, 700, false, false, false, true, true);
}

// �ڵ��� ��ǰ����
function ProdView_CAR(nCateC1, nCateC2, nCateC3, nCateC4, nProdC) //*** ��ǰ �������� �˾�â ����
{
	sUrl =	'http://www.danawa.com/car/catalog/' +
			'?cate_c1=' + nCateC1 +
			'&cate_c2=' + nCateC2 +
			'&cate_c3=' + nCateC3 +
			'&cate_c4=' + nCateC4 +
			'&prod_c=' + nProdC;

	//WindowOpen(sUrl, '_blank', 22, 0, 968, 800, false, false, false, true, true);
	window.open(sUrl, '_blank','');
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

// �Ǿ� �з� ���� ...
function goCateViewNew(cate1, cate2)
{
	if(cate2 == 869)		location.href = 'http://pc.danawa.com/notebook/';
	else if(cate2 == 870)	location.href = 'http://pc.danawa.com/price_new.html?defSite=NOTEBOOK&topposition=NB&cate1='+cate1+'&cate2='+cate2;
	else if (cate1 == 861 && (cate2==882 || cate2==883)) // lcd, crt
		location.href = 'http://pc.danawa.com/price_new.html?defSite=DISPLAY&cate1='+cate1+'&cate2='+cate2;	
	else if (cate1 == 197 && cate2==532) //mp3
		location.href = 'http://pc.danawa.com/price_new.html?defSite=PC&cate1='+cate1+'&cate2='+cate2;
	else
		location.href = 'http://pc.danawa.com/price_new.html?defSite=PC&cate1='+cate1+'&cate2='+cate2;
}

// ��ī �з� ����
function goCateViewDICA(cate1,cate2, Ca_ram)
{
	if(Ca_ram == '')
		document.location.href='http://pc.danawa.com/price_new.html?defSite=DICA&dica=dica&cate1='+cate1+'&cate2='+cate2;
	else
		document.location.href='http://pc.danawa.com/price_new.html?defSite=DICA&dica=dica&cate1='+cate1+'&cate2='+cate2+'&Ca_ram='+Ca_ram;
}

// ��Ʈ�Ͽ��� �Ǿ� �з� ����...
function goCateViewNOTEBOOK(cate1,cate2)
{
	location.href='http://pc.danawa.com/price_new.html?defSite=NOTEBOOK&topposition=NB&cate1='+cate1+'&cate2='+cate2;
}

// ���÷��̿��� �Ǿ� �з� ����...
function goCateViewDISPLAY(cate1,cate2)
{
	location.href='http://pc.danawa.com/price_new.html?defSite=DISPLAY&display=display&cate1='+cate1+'&cate2='+cate2;
}


function goNotebookView(opt)
{
	var link = 'http://pc.danawa.com/price_new.html?defSite=NOTEBOOK&topposition=NB&cate1=860&cate2=869';
	if(opt != '0') link += '&sel_maker='+opt;
	location.href = link;
}

// �˻� �ɼǰ�
function goSrchOptionView(cate1,cate2,val)
{
	var link;
	link			= 'http://pc.danawa.com/price_new.html?defSite=NOTEBOOK&topposition=NB&cate1='+cate1+'&cate2='+cate2+'&SearchCombo='+val;
	location.href	= link;
}

// ��ǰ��α� �˾�
function pBlog(param)
{
	var sParam = "";
	var oArg = pBlog.arguments;
	var nArg = oArg.length;

	if(nArg == 0) {alert("���ڰ��� �����ϴ�."); return;}
	
	if(nArg == 1) sParam = oArg[0];
	else {
		sParam = oArg[0]+"/C/";
		switch(nArg) {
			case 2	: sParam += "/"+oArg[1]+"/0/0/0"; break;
			case 3	: sParam += "/"+oArg[1]+"/"+oArg[2]+"/0/0"; break;
			case 4	: sParam += "/"+oArg[1]+"/"+oArg[2]+"/"+oArg[3]+"/0"; break;
			case 5	: sParam += "/"+oArg[1]+"/"+oArg[2]+"/"+oArg[3]+"/"+oArg[4]; break;
			default	: {alert("���ڰ��� �߸��Ǿ����ϴ�."); return;}
		}
	}

	var screenHeight = screen.height-20;
	var url = "http://blog.danawa.com/prod/"+sParam;
	WindowOpen(url, '_blank', 0, 0, 936, screenHeight, false, false, false, false, true);
}

// ���޻�ǰ ����...
function pPriceCompare(prodid)
{
	var screenHeight = screen.height;
	var url = "http://goods.danawa.com/cnav/list_main_view.php?prod_id="+prodid;
	WindowOpen(url, '_blank', 0, 0, 950, screenHeight, false, false, false, false, true);
}

function goLinkPage(cate1,cate2,cate3,cate4,prod_c)
{
	var screenHeight = screen.height;
	var url = "/elec/prod_view/go_link_elec.php?cate1="+cate1+"&cate2="+cate2+"&cate3="+cate3+"&cate4="+cate4+"&prod_c="+prod_c;
	WindowOpen(url, '_blank', 0, 0, 936, screenHeight, false, false, false, false, true);
}

function goLinkPage2(cate1,cate2,cate3,cate4,prod_c)
{
	var url = "/elec/prod_view/go_link_elec.php?cate1="+cate1+"&cate2="+cate2+"&cate3="+cate3+"&cate4="+cate4+"&prod_c="+prod_c;
	alert(url);
	WindowOpen(url, '_blank', 0, 0, 936, 783, false, false, false, false, true);
}

// ��ǰ �ǹ�ũ�� ����
var RSI = {
	load : function (rsicode,pcode)
	{
		// rsicode ��
		//	5 : mp3|�Ǿ�, 6 : ��ī, 14 : �޴���
		window.open('http://img.danawa.com/rsi/RealSize/Application/RSIDownload_'+rsicode+'.php?totalset=0&pcode=' + pcode, 'window' + pcode, 'width=579 height=290');
	}
}
//-->