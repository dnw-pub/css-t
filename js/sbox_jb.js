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
		url = '/GenFiles/HTML/SBox_0810/SBoxMain.'+idx+'.html?dummy='+Math.floor(Math.random()*10000);
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
		url = '/GenFiles/HTML/SBox_0810/SBoxMain.'+mode+'.'+idx+'.html?dummy='+Math.floor(Math.random()*10000);
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


//logger 분야별 클릭율
function _trkEventLog(str)
{
	try {_trk_clickTrace('EVT', str);} catch(_e) {}
}

function sboxTab(idx)
{
	sboxShow('LAY_sboxContent', idx);

	var btntab = document.getElementById('btntab');
	btntab.className = 'section_sbox'+idx;


	//var sbTab_img = document.getElementById('sbTab_img');
	//sbTab_img.src = 'http://img.danawa.com/new/main_new/img/tab_sbox'+idx+'.gif';

	//var sbTab1_img = document.getElementById('sbTab1_img');
	//var sbTab2_img = document.getElementById('sbTab2_img');
	//var sbTab3_img = document.getElementById('sbTab3_img');

	//sbTab1_img.src = 'http://img.danawa.com/new/main_new/img/tab_hot'+(idx==1?'_on':'')+'.gif';
	//sbTab2_img.src = 'http://img.danawa.com/new/main_new/img/tab_cm'+(idx==2?'_on':'')+'.gif';
	//sbTab3_img.src = 'http://img.danawa.com/new/main_new/img/tab_tapa'+(idx==3?'_on':'')+'.gif';
	
	if(idx == 2)
	{
		_trkEventLog('쇼핑박스 초특가 인터파크 탭');
	}
}

var layNum = new Array();
var layMax = new Array();
layMax['1_2'] = 1;
layMax['2_1'] = 1;
layMax['2_2'] = 1;
layMax['3_1'] = 1;
layMax['3_2'] = 3;

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
//		sboxArrow('next','1_2');
		break;
	case 2:
//		sboxArrow('next','2_1');
//		sboxArrow('next','2_2');
		break;
	case 3:
		sboxArrow('next','3_1');
		sboxArrow('next','3_2');
//		sboxArrow('next','3_3');
		break;

	}
}
