var sboxContent = new Array();
var sboxMi = 1;

function changeInnerHtml(pDivId,pUrl,afterFunc) {
	new ajax.xhr.Request(pUrl,null,loadInnerHtml,"GET",pDivId,afterFunc);
}

function loadInnerHtml(req,divId,afterAction) {
	if(req.readyState == 4) {
		if(req.status == 200) {
			var divObj = document.getElementById(divId);
			if(divObj) {
				divObj.innerHTML = req.responseText;
				var contents = req.responseText;
				var re = /<\s*script.+?<\/\s*script\s*>/gim;
				contents = contents.replace( /\n/g, "<-newline->" );
				var dataArr = contents.match( re );
				if( dataArr != null ) {
					for( var i = 0; i < dataArr.length; ++i ) {
						contents = dataArr[i].replace( /<-newline->/g, "\n" );
						contents = contents.replace( /<\s*\/*script>/gi, "" );
						eval( contents );
					}
				}
				if(afterAction) eval(afterAction);
			}
		}
	}
}

function sboxSave(mi)
{
	var divObj = document.getElementById('LAY_sboxContent');
	sboxContent[mi] = divObj.innerHTML;
}

function sboxShow(mode, idx)
{
	var url;
	layNum[mode] = idx;

	if(mode=='LAY_sboxContent') {
		url = '/GenFiles/HTML/SBox/SBoxMain.'+idx+'.html?dummy='+Math.floor(Math.random()*10000);
		//sboxSave(sboxMi);

		if( sboxContent[idx] != null && sboxContent[idx] != undefined && sboxContent[idx] != '' ) {
			var divObj = document.getElementById(mode);
			if(divObj) divObj.innerHTML = sboxContent[idx];
			sboxMi = idx;
		} else {
			changeInnerHtml(mode,url,'sboxMi='+idx);
		}
	}
	else {
		url = '/GenFiles/HTML/SBox/SBoxMain.'+mode+'.'+idx+'.html?dummy='+Math.floor(Math.random()*10000);
		changeInnerHtml(mode,url,'');
	}
}

function sboxArrow(position, divId)
{
	_layNum = layNum[divId];
	if (position == 'prev') {
		if (_layNum > 1)
			idx = _layNum - 1;
		else
			idx = layMax[divId];
	} else if (position == 'next') {
		if (_layNum < layMax[divId])
			idx = _layNum + 1;
		else
			idx = 1;
	}
	sboxShow(divId, idx);
}

function sboxTab(idx)
{
	sboxShow('LAY_sboxContent', idx);

	var sbTab1_img = document.getElementById('sbTab1_img');
	var sbTab2_img = document.getElementById('sbTab2_img');
	var sbTab3_img = document.getElementById('sbTab3_img');

	sbTab1_img.src = 'http://img.danawa.com/new/main/ntab_shopbox1'+(idx==1?'_on':'')+'.gif';
	sbTab2_img.src = 'http://img.danawa.com/new/main/ntab_shopbox2'+(idx==2?'_on':'')+'.gif';
	sbTab3_img.src = 'http://img.danawa.com/new/main/ntab_shopbox3'+(idx==3?'_on':'')+'.gif';
}

var layNum = new Array();
var layMax = new Array();
layMax['1_2'] = 3;
layMax['2_1'] = 3;
layMax['2_2'] = 3;
layMax['3_1'] = 3;
layMax['3_2'] = 3;
layMax['3_3'] = 5;

function imgNotLoad(img, type) {
	if (type == "0") {
		img.src = "http://img.danawa.com/common/error/noimg_50x50.gif";
	} else {
		img.src = "http://img.danawa.com/common/error/noimg_80x80.gif";
	}
}

function sboxAutoScroll()
{
	if (sboxIdx < 3) {
		sboxIdx++;
	} else {
		sboxIdx = 1;
	}
	sboxTab(sboxIdx);
}

function sboxRandom()
{
	switch (sboxMi) {
	case 1:
		sboxArrow('next','1_2');
		break;
	case 2:
		sboxArrow('next','2_1');
		sboxArrow('next','2_2');
		break;
	case 3:
		sboxArrow('next','3_1');
		sboxArrow('next','3_2');
		sboxArrow('next','3_3');
		break;

	}
}
