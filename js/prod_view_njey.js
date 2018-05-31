<!--
//function ProdView(nCateC1, nCateC2, nCateC3, nCateC4, nProdC, aname)

// 가전
function ProdView(nCateC1, nCateC2, nCateC3, nCateC4, nProdC) //*** 상품 상세페이지 팝업창 열기 
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

function WindowOpen(url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
  toolbar_str = toolbar ? 'yes' : 'no';
  menubar_str = menubar ? 'yes' : 'no';
  statusbar_str = statusbar ? 'yes' : 'no';
  scrollbar_str = scrollbar ? 'yes' : 'no';
  resizable_str = resizable ? 'yes' : 'no';
  window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

// 피씨 분류 보기 ...
function goCateViewNew(cate1, cate2)
{
	if(cate2 == 869)		location.href = 'http://pc.danawa.com/notebook/';
	else if(cate2 == 870)	location.href = 'http://pc0.danawa.com/price_new_njey.html?topposition=NB&cate1='+cate1+'&cate2='+cate2;
	else if (cate1 == 197 && cate2==532)
	{
		location.href = 'http://pc0.danawa.com/price_new_njey.html?pc=pc&cate1='+cate1+'&cate2='+cate2;
	}
	else					location.href = 'http://pc0.danawa.com/price_new_njey.html?pc=pc&cate1='+cate1+'&cate2='+cate2;
}

// 디카 분류 보기
function goCateViewDICA(cate1,cate2, Ca_ram)
{
	if(Ca_ram == '')
	{
		document.location.href='http://pc0.danawa.com/price_new_njey.html?dica=dica&cate1='+cate1+'&cate2='+cate2;
	}
	else
	{
		document.location.href='http://pc0.danawa.com/price_new_njey.html?dica=dica&cate1='+cate1+'&cate2='+cate2+'&Ca_ram='+Ca_ram;
	}
	
}

// 노트북에서 피씨 분류 보기...
function goCateViewNOTEBOOK(cate1,cate2)
{
	location.href='http://pc0.danawa.com/price_new_njey.html?topposition=NB&cate1='+cate1+'&cate2='+cate2;
}

// 디스플레이에서 피씨 분류 보기...
function goCateViewDISPLAY(cate1,cate2)
{
	location.href='http://pc0.danawa.com/price_new_njey.html?display=display&cate1='+cate1+'&cate2='+cate2;
}


function goNotebookView(opt)
{
	var link = 'http://pc0.danawa.com/price_new_njey.html?topposition=NB&cate1=860&cate2=869';
	if(opt != '0') link += '&sel_maker='+opt;
	location.href = link;
}

// 검색 옵션값
function goSrchOptionView(cate1,cate2,val)
{
	var link;
	link			= '/price_new_njey.html?topposition=NB&cate1='+cate1+'&cate2='+cate2+'&SearchCombo='+val;
	location.href	= link;
}

-->