function objMyBrowser()
{
	var strUA, s, i;
	this.isIE = false;		// 인터넷 익스플로러인지를 나타내는 속성
	this.isNS = false;		// 넷스케이프인지를 나타내는 속성

	// Agent 정보를 담고 있는 문자열.
	strUA = navigator.userAgent;

	// Agent 문자열(strUA) "MSIE"란 문자열이 들어 있는지 체크
	s = "MSIE";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isIE = true;
		// 변수 i에는 strUA 문자열 중 MSIE가 시작된 위치 값이 들어있고,
		// s.length는 MSIE의 길이 즉, 4가 들어 있다.
		// strUA.substr(i + s.length)를 하면 strUA 문자열 중 MSIE 다음에
		// 나오는 문자열을 잘라온다.
		// 그 문자열을 parseFloat()로 변환하면 버전을 알아낼 수 있다.
		return;
	}

	// Agent 문자열(strUA) "Netscape6/"이란 문자열이 들어 있는지 체크
	s = "Netscape6/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}

	// 다른 "Gecko" 브라우저는 NS 6.1로 취급.
	s = "Firefox/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}
	// 다른 "Gecko" 브라우저는 NS 6.1로 취급.
	s = "Chrome/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}
	s = "Safari/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}
}
var oMyBrowser	= new objMyBrowser();

// object 좌표값
function getposOffset(obj, offsettype)
{
	var totaloffset	= (offsettype == "left") ? obj.offsetLeft : obj.offsetTop;
	var parentEl	= obj.offsetParent;

	while (parentEl != null)
	{
		totaloffset = (offsettype == "left") ? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
		parentEl=parentEl.offsetParent;
	}

	return totaloffset;
}

function iecompattest()
{
	return (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
}

function showhide(obj_style, e, visible, hidden, tipwidth)
{
	if(oMyBrowser.isNS || oMyBrowser.isIE) tooltip_obj.style.left=tooltip_obj.style.top = -500;

	if (tipwidth != '')
	{
		tooltip_obj.widthobj		= tooltip_obj.style;
		tooltip_obj.widthobj.width	= tipwidth;
	}

	if (e.type=="click" && obj_style.visibility==hidden || e.type=="mouseover")
	{
		obj_style.visibility="visible";
		obj_style.display="block";
	}
	else if (e.type=="click")
	{
		obj_style.visibility="hidden";
		obj_style.display="none";
	}
}

function clearbrowseredge(obj, whichedge)
{
	var edgeoffset = (whichedge=="rightedge") ? -3*-1 : 0*-1;

	if (whichedge=="rightedge")
	{
		var windowedge = (oMyBrowser.isIE) ? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15;
		tooltip_obj.contentmeasure=tooltip_obj.offsetWidth;
		if (windowedge-tooltip_obj.x < tooltip_obj.contentmeasure) edgeoffset=tooltip_obj.contentmeasure-obj.offsetWidth;
	}
	else
	{
		var windowedge = (oMyBrowser.isIE) ? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18;
		tooltip_obj.contentmeasure=tooltip_obj.offsetHeight;
		if (windowedge-tooltip_obj.y < tooltip_obj.contentmeasure) edgeoffset=tooltip_obj.contentmeasure+obj.offsetHeight;
	}

	return edgeoffset;
}

function layer_option_message()
{
	var str ="";

}
function layer_make_message(title, message, tipwidth)
{
	var str =	'<div class="LayerArea" style="display:block">' +
				'	<table id="LayerComInfo" bgcolor="#224E8D">' +
				'		<tr>' +
				'			<td class="Area_lt" bgcolor="#FFFFFF">' +
				'				<p class="titTxt">' + title + '</p>' +
				'				<p class="conText">' + message + '</p>' +
				'			</td>' +
				'		</tr>' +				
				'	</table>' +
				'</div>';

	return str;
}

function layer_static_message(name, tipwidth)
{
	var str = '';
	switch(name)
	{
		case 'safe_100'		:		// 전자보증
		{
			str =
				'<table width="'+tipwidth+'" border="0" cellspacing="0" cellpadding="0">'+
				'<tr>'+
				'	<td><img src="http://img.danawa.com/new/pc/ico_layerar.gif" width="8" height="4" hspace="20"></td>'+
				'</tr>'+
				'</table>'+
				'<table width="100%" border="0" cellpadding="5" cellspacing="2" bgcolor="#224E8D">'+
				'<tr>'+
				'	<td bgcolor="#FFFFFF">'+
				'		<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'		<tr>'+
				'			<td height="23">'+
				'				<a href="#"><img src="http://img.danawa.com/new/pc/ico_anjun01.gif" width="48" height="14" border="0" align="absmiddle"></a>'+
				'			</td>'+
				'		</tr>'+
				'		<tr>'+
				'			<td>서울전자보증에서 실시하는 매매보호방식으로 쇼핑몰내의 모든 제품구매시 보증보험을 발급하여 입금금액에 대해 안전하게 보호받을 수 있는 시스템</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'safe'			:		// 보증/일반
		{
			str =
				'<table width="'+tipwidth+'" border="0" cellspacing="0" cellpadding="0">'+
				'<tr>'+
				'	<td><img src="http://img.danawa.com/new/pc/ico_layerar.gif" width="8" height="4" hspace="20"></td>'+
				'</tr>'+
				'</table>'+
				'<table width="100%" border="0" cellpadding="5" cellspacing="2" bgcolor="#224E8D">'+
				'<tr>'+
				'	<td bgcolor="#FFFFFF">'+
				'		<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'		<tr>'+
				'			<td height="23">'+
				'				<a href="#"><img src="http://img.danawa.com/new/pc/ico_anjun02.gif" width="48" height="14" border="0" align="absmiddle"></a>'+
				'			</td>'+
				'		</tr>'+
				'		<tr>'+
				'			<td>서울전자보증에서 실시하는 매매보호방식으로 쇼핑몰에서 제품구매시 전자보증 또는 일반거래를 선택할 수 있는 시스템<br>(매매보호 수수료 소비자 부담)</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'escrow'		:		// 에스크로
		{
			str =
				'<table width="'+tipwidth+'" border="0" cellspacing="0" cellpadding="0">'+
				'<tr>'+
				'	<td><img src="http://img.danawa.com/new/pc/ico_layerar.gif" width="8" height="4" hspace="20"></td>'+
				'</tr>'+
				'</table>'+
				'<table width="100%" border="0" cellpadding="5" cellspacing="2" bgcolor="#224E8D">'+
				'<tr>'+
				'	<td bgcolor="#FFFFFF">'+
				'		<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'		<tr>'+
				'			<td height="23">'+
				'				<a href="#"><img src="http://img.danawa.com/new/pc/ico_anjun03.gif" width="48" height="14" border="0" align="absmiddle"></a>'+
				'			</td>'+
				'		</tr>'+
				'		<tr>'+
				'			<td>하나은행에서 실시하는 매매보호방식으로 하나은행에서 결제금액을 보관하며 정상적인 거래가 성립된 후 대금을 지불하는 방식</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'self_guard'	:		// 자체보호
		{
			str =
				'<table width="'+tipwidth+'" border="0" cellspacing="0" cellpadding="0">'+
				'<tr>'+
				'	<td><img src="http://img.danawa.com/new/pc/ico_layerar.gif" width="8" height="4" hspace="20"></td>'+
				'</tr>'+
				'</table>'+
				'<table width="100%" border="0" cellpadding="5" cellspacing="2" bgcolor="#224E8D">'+
				'<tr>'+
				'	<td bgcolor="#FFFFFF">'+
				'		<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'		<tr>'+
				'			<td height="23"><a href="#">'+
				'				<img src="http://img.danawa.com/new/pc/ico_anjun04.gif" width="48" height="14" border="0" align="absmiddle"></a>'+
				'			</td>'+
				'		</tr>'+
				'		<tr>'+
				'			<td>쇼핑몰 자체적으로 준비한 매매보호방식으로 은행 및 PG사등을 통한 매매보호 방식</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'price_copy'	:		// 상품가격복사 설명
		{
			str =
				'<table width="'+tipwidth+'" border="0" cellpadding="5" cellspacing="1" bgcolor="#BABABA">'+
				'<tr>'+
				'	<td bgcolor="#ffffff">'+
				'		<table width="100%" border="0" cellspacing="0" cellpadding="3" bgcolor="#F8F8F8">'+
				'		<tr>'+
				'			<td height="23"><img src="http://img.danawa.com/new/pc/btn_pricecopy.gif" width="81" height="16" border="0" align="absmiddle"></td>'+
				'			<td align="right">'+
				'				<a href="javascript:void(0)" onClick="tooltip_layer_hide();"><img src="http://img.danawa.com/new/pc/btn_x.gif" width="11" height="11" hspace="3" border="0"></a>'+
				'			</td>'+
				'		</tr>'+
				'		<tr>'+
				'			<td colspan="2">'+
				'				게시물 작성시 유동적인 다나와 최저가 또는 <br>평균가를 입력할 때는 [상품가격복사] 버튼을 <br>클릭 후 원하는 곳에 붙여 넣기 하여 사용하십시오.'+
				'			</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'shop_logo'		:		// 스폰서 업체 설명
		{

			str =	'    <table id="LayerPrimSpon">'+
					'    	<tr>'+
					'            <td class="Area_lt">'+
					'                <p class="titTxt">다나와 프리미엄 스폰서란 ?</p>'+
					'                <p class="titBtn"></p>'+
					'                <p class="conText">- 다나와에 3년 이상 입점한 전문몰이나 etrust등 인증마크 업체<br />- 현금/카드 동일몰 혹은 에스크로나 전자보증 업체<br />- 다나와 전문 상담원 배치가능 업체</p>'+
					'            </td>'+
					'            <td class="Area_rt"></td>'+
					'        </tr>'+
					'        <tr>'+
					'            <td class="Area_lb"></td>'+
					'            <td class="Area_rb"></td>'+
					'        </tr>'+
					'    </table>';

			break;
		}

		case 'dsp'		:
		{
			str =	  "<table width='"+ tipwidth +"' height='40' border='0' cellpadding='1' cellspacing='1'><tr><td bgcolor='#39B4D7'>"
					+ "<table width='100%' border='0' cellspacing='3' cellpadding='0' bgcolor='#EEFAFD'>"
					+ "<tr><td height='1'></td></tr><tr><td valign='top'>"
					+ "<img src='http://img.danawa.com/pc/left_right/b_gomall.gif'></td>"
					+ "<td><font face='굴림' color='#0974AB'>DSP는 조립용 PC업체에만 제공되는 제품군이며 S/W단품으로만 구입할 경우 정상적인 제품사용의 권리를 인정받지 못합니다.</font></td>"
					+ "</tr></table></td></tr></table>";
			break;
		}
	}

	return str;
}

function tooltip_layer_view(layertype, obj, e, title, msg, tipwidth, sel_hidden)
{
	tooltip_obj = document.getElementById ? document.getElementById("ToolTip_Layer") : ToolTip_Layer;

	if(layertype != '' && title == '' && msg == '') var htmlTag = layer_static_message(layertype, tipwidth);
	else if(title != '' && msg != '')				var htmlTag = layer_make_message(title, msg, tipwidth);

	tooltip_obj.innerHTML = htmlTag;

	if(oMyBrowser.isNS || oMyBrowser.isIE)
	{
		showhide(tooltip_obj.style, e, "visible", "hidden", tipwidth);

		tooltip_obj.x			= getposOffset(obj, "left");// + 270;
		tooltip_obj.y			= getposOffset(obj, "top");

//		if (tooltip_obj.x > 400) {
//			tooltip_obj.x -=  tipwidth;
//		}

		tooltip_obj.style.left	= tooltip_obj.x - clearbrowseredge(obj, "rightedge") + "px";
		tooltip_obj.style.top	= tooltip_obj.y - clearbrowseredge(obj, "bottomedge") + obj.offsetHeight + "px";
	}
}

function tooltip_layer_hide()
{
	if (typeof(tooltip_obj) != "undefined")
	{
		if(oMyBrowser.isNS || oMyBrowser.isIE)
		{
			tooltip_obj.style.visibility	= "hidden";
			tooltip_obj.style.display		= "none";
		}
	}
}

var nscp = (navigator.appName == "Netscape");
var ismc = (navigator.appVersion.indexOf("Mac") != -1);
var vers = parseFloat(navigator.appVersion.substring(22,25));

function getObj(obj)
{
	if (nscp) {
		compLayr = document.getElementById(obj);
	} else {
		compLayr = eval("document.all." + obj + ".style");
	}
	return compLayr;
}

function tooltip_layer_box(point, coupon, nointerest, gift, special_coupon, desc, input_date, obj, e)
{
	// 적립금
	// 쿠폰
	// 무이자
	// 사은품
	// 특별쿠폰
	// 비고
	// 입력일
	var str =
		'<table width="280" border="0" cellspacing="0" cellpadding="0">' +
		'<tr>' +
		'	<td align="right" style="text-align:right" id="tool_box_arr"><img src="http://img.danawa.com/new/pc/ico_layerar.gif" width="8" height="4" hspace="10"></td>' +
		'</tr>' +
		'</table>' +
		'<table width="100%" border="0" cellpadding="0" cellspacing="2" bgcolor="#224E8D">' +
		'<tr>' +
		'	<td bgcolor="#FFFFFF">';


	var optionTable = '<table width="270" border="0" cellspacing="5" cellpadding="0">';
	if (point != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_juk.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">적립금</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+point+'</td>' +
			'</tr>';
	}
	if (nointerest != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_mu.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">무이자</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+nointerest+'</td>' +
			'</tr>';
	}
	if (gift != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_sa.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">사은품</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+gift+'</td>' +
			'</tr>';
	}
	if (coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_ku.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">쿠폰</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+coupon+'</td>' +
			'</tr>';
	}
	if (special_coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_te.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">특별쿠폰</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+special_coupon+'</td>' +
			'</tr>';
	}
	optionTable += '</table>';

	if (desc != '') {
		optionTable +=
		'<table width="270" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'	<td height="1" bgcolor="#CCCCCC"></td>' +
		'</tr>' +
		'<tr>' +
		'	<td height="20" align="center" bgcolor="#FFFFEC">'+desc+'</td>' +
		'</tr>' +
		'</table>';
	}

	str += optionTable;
	str +=
	'		<table width="270" border="0" cellspacing="5" cellpadding="0">' +
	'		<tr>' +
	'			<td height="1" bgcolor="#CCCCCC"></td>' +
	'		</tr>' +
	'		<tr>' +
	'			<td height="20" align="center"><strong><font color="#2F429D">[가격갱신일] '+input_date+'</font></strong></td>' +
	'		</tr>' +
	'		</table>' +
	'	</td>' +
	'</tr>' +
	'</table>';

	tooltip_obj = document.getElementById ? document.getElementById("ToolTip_Layer") : ToolTip_Layer;
	var htmlTag = str;
	tooltip_obj.innerHTML = str;

	if(oMyBrowser.isNS || oMyBrowser.isIE)
	{
		showhide(tooltip_obj.style, e, "visible", "hidden", "270");
		var tmpOffset = obj.offsetWidth;//getposOffset(obj, "left");
		var tmpLeft = getposOffset(obj, "left");

		if (tmpLeft < 300) {		// 좌우위치변경
			document.getElementById('tool_box_arr').style.textAlign = "left";
			//tooltip_obj.x			= tmpLeft + tmpOffset/2;
			tooltip_obj.x			= getposOffset(obj, "left") + "px";
		} else {
			document.getElementById('tool_box_arr').style.textAlign = "right";
			//tooltip_obj.x			= tmpLeft + tmpOffset/2 - 270 ;
			tooltip_obj.x			= getposOffset(obj, "left") - 245 + "px";
		}
		tooltip_obj.y			= getposOffset(obj, "top");
		tooltip_obj.style.left	= tooltip_obj.x;
		tooltip_obj.style.top	= tooltip_obj.y - clearbrowseredge(obj, "bottomedge") + obj.offsetHeight + "px";
	}

}




function tooltip_layer_box_cardcash(point, coupon, nointerest, gift, special_coupon, desc, input_date, obj, e)
{
	// 적립금
	// 쿠폰
	// 무이자
	// 사은품
	// 특별쿠폰
	// 비고
	// 입력일


	var str =
		'<table width="280" border="0" cellspacing="0" cellpadding="0">' +
		'<tr>' +
		'	<td align="right" style="text-align:right" id="tool_box_arr"></td>' +
		'</tr>' +
		'</table>' +
		'<table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#77A8EC">' +
		'<tr>' +
		'	<td bgcolor="#FFFFFF">';


	var optionTable = '<table width="270" border="0" cellspacing="5" cellpadding="0">';
	if (point != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_juk.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">적립금</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+point+'</td>' +
			'</tr>';
	}
	if (nointerest != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_mu.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">무이자</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+nointerest+'</td>' +
			'</tr>';
	}
	if (gift != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_sa.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">사은품</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+gift+'</td>' +
			'</tr>';
	}
	if (coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_ku.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">쿠폰</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+coupon+'</td>' +
			'</tr>';
	}
	if (special_coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_te.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">특별쿠폰</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+special_coupon+'</td>' +
			'</tr>';
	}
	optionTable += '</table>';

	if (desc != '') {
		optionTable +=
		'<table width="270" border="0" cellspacing="5" cellpadding="0">' +
		'<tr>' +
		'	<td height="1" bgcolor="#CCCCCC"></td>' +
		'</tr>' +
		'<tr>' +
		'	<td height="20" align="center" bgcolor="#FFFFEC">'+desc+'</td>' +
		'</tr>' +
		'</table>';
	}

	str += optionTable;
	str +=
	'		</table>' +
	'	</td>' +
	'</tr>' +
	'</table>';

	tooltip_obj = document.getElementById ? document.getElementById("ToolTip_Layer") : ToolTip_Layer;
	var htmlTag = str;
	tooltip_obj.innerHTML = str;

	if(oMyBrowser.isNS || oMyBrowser.isIE)
	{
		showhide(tooltip_obj.style, e, "visible", "hidden", "270");
		var tmpOffset = obj.offsetWidth;//getposOffset(obj, "left");
		var tmpLeft = getposOffset(obj, "left");

		if (tmpLeft < 300) {		// 좌우위치변경
			document.getElementById('tool_box_arr').style.textAlign = "left";
			//tooltip_obj.x			= tmpLeft + tmpOffset/2;
			tooltip_obj.x			= getposOffset(obj, "left") + "px";
		} else {
			document.getElementById('tool_box_arr').style.textAlign = "right";
			//tooltip_obj.x			= tmpLeft + tmpOffset/2 - 270 ;
			tooltip_obj.x			= getposOffset(obj, "left") - 245 + "px";
		}
		tooltip_obj.y			= getposOffset(obj, "top");
		tooltip_obj.style.left	= tooltip_obj.x;
		tooltip_obj.style.top	= tooltip_obj.y - clearbrowseredge(obj, "bottomedge") + obj.offsetHeight + "px";
	}

}


/**
 * 클립보드에 상품 스크립트 복사
 */
function clipPrice(avg, pcode)
{
	if (window.clipboardData)
	{
		if (avg==0)
			avg = "";
		window.clipboardData.setData("Text", "<script language='javascript' src='http://pc.danawa.com/tools/NowProdProp.html?prod_c="+pcode+"&avg="+avg+"'></script>");
		alert("   지금 보시는 상품의 가격 스크립트가 복사되었습니다.   \n\n   다른 곳에 붙여넣기 하여 이용하실 수 있습니다.\n");
	} else {
		alert("IE 전용입니다. 불편을 드려서 죄송합니다.");
	}
}


/**
 * 클립보드에 상품 스크립트 복사
 */
function clipPriceAff(avg, pcode)
{
	if (window.clipboardData)
	{
		if (avg==0)
			avg = "";
		window.clipboardData.setData("Text", "<script language='javascript' src='http://pc.danawa.com/tools/NowProdProp.html?aff=Y&prod_c="+pcode+"&avg="+avg+"'></script>");
		alert("   지금 보시는 상품의 가격 스크립트가 복사되었습니다.   \n\n   다른 곳에 붙여넣기 하여 이용하실 수 있습니다.\n");
	} else {
		alert("IE 전용입니다. 불편을 드려서 죄송합니다.");
	}
}

/**
 * 클립보드에 상품블로그 URL 복사
 */
function clipProd(pcode)
{
	var meintext = "http://prod.danawa.com/info/?pcode="+pcode;
	if (window.clipboardData) {
		window.clipboardData.setData("Text", meintext);
		alert("지금 보시는 정보 창의 주소가 복사되었습니다.\n다른 곳에 붙여넣기 하여 이용하실 수 있습니다.");
	} else {
		alert("IE 전용입니다. 불편을 드려서 죄송합니다.");
	}
}

/**
 * 인쇄 페이지 팝업
 */
function printProd(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winPrintProd', '50', '50', '700', '700', 0, 0, 0, 1, 0);
}

/**
 * 업체 소개 팝업
 */
function storeIntro(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winStoreIntro', '50', '50', '900', '650', 0, 0, 0, 1, 1);
}

/**
 * 업체 신고
 */
function userReport(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winUserSingo', '200', '100', '750' , '760', 0, 0, 0, 1, 1);
}

/**
 * 신고 전 로그인 체크
 */
function reportLoginMsg(){
	if(confirm('로그인된 사용자만 이용할 수 있습니다.\n로그인 하시겠습니까?')){
		getVisibleLogin();
	}
}

/**
 * 상품정보 제작 문의
 */
function makeProdInfo()
{
	var url = "http://eshop.danawa.com/mall/p_request.html";
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winMakeProdInfo', '50', '50', '808', '800', 0, 0, 0, 1, 0);
}

/**
 * 제휴쇼핑몰 입점안내
 */
function affiliateContact()
{
	var url = "http://eshop.danawa.co.kr/mall/cps_01.html";
	windowOpen(url, 'winAffiliateContact', '50', '50', '808', '800', 0, 0, 0, 1, 0);
}

/**
 * 이용안내
 */
function useGuide()
{
	var url = "http://pc.danawa.com/pc_html/pc_right_guide.html";
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winUseGuide', '50', '50', '670', '650', 0, 0, 0, 1, 0);
}


/**
 * 제품문의처 (광고신청)
 */
function prodAdver(param)
{
	var url = "http://pc.danawa.com/cate-adver/advpromain_test/advlist.html?" + param;
	window.open(url, '_blank');
}

/**
 * 윈도우 오픈
 */
function windowOpen(url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
	toolbar_str = toolbar ? 'yes' : 'no';
	menubar_str = menubar ? 'yes' : 'no';
	statusbar_str = statusbar ? 'yes' : 'no';
	scrollbar_str = scrollbar ? 'yes' : 'no';
	resizable_str = resizable ? 'yes' : 'no';
	window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

/**
 * 보증/일반
 */
function select_safe(url)
{
	var iXPos, iYPos;
	iXPos = (window.screen.width - 610) / 2;
	iYPos = (window.screen.height - 800) / 2;
	window.open(url, 'safe_confirm2', 'width=680,height=700,scrollbars=no,left='+ iXPos + ',top=' + iYPos);
}

/**
 * 가격 정렬
 */
function priceSort()
{
	var FRM = document.forms['FRM_searchOption'];
	var nPriceOrder = FRM.price_order.value;
	if (nPriceOrder == '') {
		FRM.price_order.value = 'D';
	} else if (nPriceOrder == 'D') {
		FRM.price_order.value = 'A';
	} else if (nPriceOrder == 'A') {
		FRM.price_order.value = '';
	}
	FRM.submit();
}

/**
 * 리얼사이즈 이미지 호출
 */
function loadRsi(url)
{
	window.open(url, 'loadRsi', 'width=579 height=290');
}

/**
 * 큰 이미지보기
 */
function showLargeImage(src, prodname)
{
	var imgObj = new Image();
	imgObj.src = src;
	var wopt = "scrollbars=no,status=no,resizable=no";
		wopt += ",width=" + imgObj.width;
		wopt += ",height=" + imgObj.height;
	var wbody = "<head><title>" + prodname + "</title>";
		wbody += "<script language='javascript'>";
		wbody += "function bigImageResize(){";
		wbody += "	var oBody=document.body;";
		wbody += "  var oImg=document.images[0];";
		wbody += "  var xdiff=oImg.width-oBody.clientWidth;";
		wbody += "  var ydiff=oImg.height-oBody.clientHeight;";
		wbody += "  window.resizeBy(xdiff,ydiff);";
		wbody += "}";
		wbody += "</"+"script>";
		wbody += "</head>";
		wbody += "<body onLoad='bigImageResize()' style='margin:0'>";
		wbody += "<a href='javascript:window.close()'><img src='" + src + "' border=0></a>";
		wbody += "</body>";
	winResult = window.open("about:blank","",wopt);
	winResult.document.open("text/html", "replace");
	winResult.document.write(wbody);
	winResult.document.close();
	return;
}

/**
 * 탭 보기
 */
function showTab(num)
{
	var tab1	= document.getElementById('tab1');
	var tab2	= document.getElementById('tab2');
	var tab3	= document.getElementById('tab3');

	var market	= document.getElementById('market');

	var imgUrl	= 'http://img.danawa.com/new/pc';
	switch (num) {
		case 1:
			tab1.style.display = "block";
			tab2.style.display = "block";
			tab3.style.display = "block";
			break;
		case 2:
			tab1.style.display = "block";
			tab2.style.display = "none";
			tab3.style.display = "none";
			break;
		case 3:
			tab1.style.display = "none";
			tab2.style.display = "block";
			tab3.style.display = "none";
			break;
		case 4:
			tab1.style.display = "none";
			tab2.style.display = "none";
			tab3.style.display = "block";
			break;
		case 6:
			tab1.style.display = "none";
			tab2.style.display = "none";
			tab3.style.display = "none";
			break;
	}

	var obj1 = new Image();
	var obj2 = new Image();

	for (var i=1; i<=6 ; i++) {
		var ntab = i + 7;
		obj1 = document.getElementById('IMG_tab'+i);
		obj2 = document.getElementById('IMG_tab'+ ntab);

		if (num == i) {
			obj1.src = imgUrl + '/info_tab0'+i+'_on.gif';
			obj2.src = imgUrl + '/info2_tab0'+i+'_on.gif';
		} else {
			obj1.src = imgUrl + '/info_tab0'+i+'.gif';
			obj2.src = imgUrl + '/info2_tab0'+i+'.gif';
		}
	}
}


/**
 * 핸드폰 보조금 박스 노출
 */
function mobileInBoxChange()
{
	document.getElementById('LAY_mobilePrice2').style.display = "block";
	document.getElementById('LAY_mobilePrice1').style.display = "none";
}

/**
 * 핸드폰 보조금 입력
 */
function setMobilePrice()
{
	var frm		= document.forms['FRM_mobile'];
	var param1	= encodeURIComponent(frm.nReturnUrl.value);
	var param2	= encodeURIComponent(frm.hpPrice.value);

	if (frm.hpPrice.value.split(" ").join("") == "") {
		alert('값을 입력해주세요');
	}
	if(isNaN(param2) == false) {
		frm.action	= 'http://www.danawa.com/elec/prod_list/mobileSubsidySave.php?mode=insert&nReturnUrl='+param1+'&hpPrice='+param2;
		frm.submit();
	} else {
		alert('숫자만 입력하세요!');
	}
}

/**
 * 상품에 대한 의견 작성
 */
function goWrite()
{
	var f	= document.saveOpinionFORM;
	var url = 'http://blog.danawa.com/archive/save_list.php';
	var sMsg = f.sDescm.value;

	if (sMsg.split(" ").join("") == "") {
		alert("내용을 입력해 주세요");
		f.sDescm.focus();
		return;
	}

	f.target = 'IFRAME_OpinionAction';
	f.action = url;
	f.submit();
}

/**
 * 가격 그래프 보기
 */
function view_graph(period, pcode)
{
	getPriceGraph('graphArea', period, pcode);
}

function getPriceGraph(area, period, pcode){	
	var nPriceListCount;
	var aChartData = [];
	var aMinPricePointLabelList = [];
	var aJQPlotOption;
	var nMinPrice = 0;
	var nMaxPrice = 0;
	var nOriginMinPrice = 0;

	$.ajax({
		url : "/info/ajax/getProductPriceList.ajax.php",
		data : {"productCode" : pcode, "period" : period},
		type : "GET",
		dataType : "json",
		cache : false,
		success : function(data){
			nPriceListCount = data.count;			
			
			if(nPriceListCount == 0) {
				var chg_grp = "//img.danawa.com/img/nodata.gif";
				$('#' + area).css("height","auto");
				$('#' + area).html('<img src="' + chg_grp + '"/>');			
			} else {
				nMinPrice = Number(data.minPrice);
				nMaxPrice = Number(data.maxPrice);
				nOriginMinPrice = nMinPrice;
				
				aJQPlotOption = data.result;
	
				//그래프 시작지점~최저가 갭과 최고가~그래프 끝 지점의 갭을 맞추기 위한 max와 min값 계산
				var priceGap = (nMaxPrice-nMinPrice) / 5; //최저가와 최고가 차이 값을 라인수(5)로 나눔
				priceGap = parseInt(priceGap) * 2 //상,하단의 그래프 테두리와의 간격을 늘리기 위해 2를 곱함
	
				//최고가에는 갭을 더하고, 최저가에는 갭을 뺀다.
				nMaxPrice = parseInt(nMaxPrice) + priceGap;
				nMinPrice = parseInt(nMinPrice) - priceGap;
				
				//최고가와 최저가가 같을 경우 그래프 범위 지정을 위해 라인수(5) 나눈 값으로 최고가와 최저가의 값을 다르게 해준다.
				if(nMaxPrice == nMinPrice) {
					nMaxPrice += (nMaxPrice/5) * 2;
					nMinPrice -= (nMinPrice/5) * 2;
				}
				
				var minPriceLabelCount = 0;  //최저가 라벨 카운트
				if(nPriceListCount > 0){
					//플러그인에 맞게 데이터를 배열에 담기
					 $.each(aJQPlotOption, function(seq, value) {						 
						 //1개의 최저가 기본 노출하기 위한 라벨값 생성
						 var minPriceLabel = '';						
						 if(nOriginMinPrice == value.minPrice && minPriceLabelCount < 1){
							 minPriceLabel = value.minPrice;
							 minPriceLabelCount++;
						 }
						 
						 aMinPricePointLabelList.push(minPriceLabel);	//가격표시 라벨 (1개의 최저가만 표시)
						 aChartData.push([value.date, value.minPrice]);	//최저가 데이터
					 });
	
					  $.jqplot.config.enablePlugins = true;
					  plot1 = $.jqplot(area,[aChartData],{
						 animate: true,			//애니메이션 효과 옵션
						 animateReplot: true,	//애니메이션 효과 옵션
					     seriesDefaults: {	//그래프 라인 옵션
						     base : 10,
					          rendererOptions: {
						      	shadow : false,
						      	animation:{
							      	speed: 1500	// 애니메이션 속도
							     }
					          },
					          markerOptions: { style:"filledSquare"}	//라인의 지점(점?)모양 옵션
					      },
					      grid: { //그래프 배경 옵션
					            backgroundColor: '#ffffff',
					            borderWidth: 1,
					            shadow:false,
				                drawBorder:false,
					            gridLineColor: '#EEEEEE'
					     },
					     axes: {
					         xaxis: {
					             renderer: $.jqplot.CategoryAxisRenderer,
					             tickOptions: { // '%#m/%#d/%y' #을 붙이면 숫자 앞에 0이 안붙음
					             	showGridline: false,
					             	fontSize:'10px'	//X축 폰트사이즈
					             }
					         },
					         yaxis: {
					        	numberTicks :5, //Y축 라인수
					        	//tickInterval: nMaxPrice/7,
						      	min : nMinPrice,
						     	max : nMaxPrice,
						        //showTicks:false,
					            tickOptions: {
						            formatString:"%'d",						            
						            //fontSize:'11px',	//Y축 폰트사이즈
						            showLabel: false, // 최저가 금액 노출
					                //showGridline: false
					            }
	
					         }
					     },
					     series: [{		// 최저가 그래프 라인 옵션
				        	color: '#FE6500',
				            label:'최저가',
				            lineWidth : 0.5,
				            markerOptions: {size:5},
				            pointLabels : {
					              show:true, // true 설정시 labels (aMinPricePointLabelList)값 노출
				            	  hideZeros:true,
				            	  labels: aMinPricePointLabelList, //(최저가 라벨)
						          location:'s',
						          ypadding : 3,
						          xpadding : 3,
	
							},
							highlighter: {
						    	 sizeAdjust: 7,
						         tooltipLocation: 'n', //툴팁 위치 (n, ne, e, se, s, sw, w, nw)						    	
						         tooltipAxes: 'y',
						         tooltipFormatString: '<font size="2pt">' + "%'d"+'원</font>',						       
						         useAxesFormatters: false
	
						     },
				        }],
				        legend : { // Legend(범례) 옵션
				        	renderer : $.jqplot.EnhancedLegendRenderer,
				            show : true, 			// Legend 표시 유무
				            placement : 'outside',  // Legend 위치 (Default값은 inside)
				            textColor : '#505358', 	// Legend 내부 Text Color
				            rowSpacing : '0px', 	// Legend 들간의 사이 공간
				            location : 's',  		// Legend 위치 (e,w,s,n)(동,서,남,북) 조합가능
				            marginTop : '27px',
				            marginLeft :'369px',				            
				            fontSize: '11px',				            
				            border : '0px',
				            fontFamily: "Dotum,'돋음',AppleGothic,Helvetica,sans-serif",	//Legend 글씨체
				            //showSwatches : false,	//컬러박스 노출여부
				            rendererOptions: {
				            	numberRows: 1				            	
				            }
				        },
					     cursor: {	//마우스 커서 옵션
					    	  zoom:true,
					          looseZoom: true,
					          showTooltip:true
					          //showTooltipOutsideZoom: true,
					          //constrainOutsideZoom: false
					     }
	
					  }).replot(); //다시 그리기
					  
					  
					  //최저가 범례 클릭 방지(그래프가 숨겨지는 기능을 방지하기 위함), 마우스 포인터 css 없애고자 클래스 제거					
					  $(".jqplot-table-legend td").unbind("click").removeClass("jqplot-seriesToggle");
					  
					  //범례 배경 컬러
					  $(".jqplot-table-legend").css("background-color","rgb(241, 241, 241)");
					  
					  /*
					   * div로 가리기 왼쪽 하이픈 가리기 
					   */					  
					  // 팝업 레이어 영역은 개월수 클릭마다 그래프가 다시 그려지기 때문에 div도 지웠다 다시 그려야함					
					  $("#addBigBarArea").remove();
					 
					  //툴팁
					  $(".jqplot-highlighter-tooltip").css("z-index",100);
					 
					  $("#" + area + " .jqplot-title").after('<div id="addBigBarArea"></div>');
					  
					 $("#addSmallBarArea, #addBigBarArea").css({
						 "z-index":1,
						 "background-color":"rgb(241, 241, 241)",
						 "position":"absolute",							 
						 "width":"10px",							  
						 "top":"0px"
					 });
					
					 $("#addBigBarArea").css({
						 "height":"170px",
						 "left":"0px"
					 });
				
				}
			}
	
			},
			error : function(xhr,status,error){
				var chg_grp = "//img.danawa.com/img/nodata.gif";
				$('#' + area).css("height","auto");
				$('#' + area).html('<img src="' + chg_grp + '"/>');
			}
	});
}

/**
 * 상품블로그 부모창 호출
 */
function ProdReflash(url)
{
	parent.location.href=url;
}

/**
 * 도량형 환산
*/
function StandardChange(){
	var change_val;
	var prev_val = document.getElementById('prev_val').value;

	if(isNaN(prev_val)){
		alert('숫자만 입력하실수 있습니다.');
		return;
	}
	for(var i = 0; 8 > i; i++){
		if(document.change.conv[i].checked == true){
			if(document.change.conv[i].value == 1)
				change_val = prev_val * 0.3938;
			else if(document.change.conv[i].value == 2)
				change_val = prev_val * 0.3025;
			else if(document.change.conv[i].value == 3)
				change_val = prev_val * 0.033;
			else if(document.change.conv[i].value == 4)
				change_val = prev_val * 0.267;
			else if(document.change.conv[i].value == 5)
				change_val = prev_val / 0.3938;
			else if(document.change.conv[i].value == 6)
				change_val = prev_val / 0.3025;
			else if(document.change.conv[i].value == 7)
				change_val = prev_val / 0.033;
			else if(document.change.conv[i].value == 8)
				change_val = prev_val / 0.267;
		}
	}

	document.getElementById('next_val').value = change_val.toFixed(4);
}

function NameChange(prev, next){
	document.getElementById('prev').innerHTML = prev;
	document.getElementById('next').innerHTML = next;
	StandardChange();
}

function number_format(num)
{
	if (num < 0) { num *= -1; var minus = true;}
	else var minus = false;
	var dotPos = (num+"").split(".");
	var dotU = dotPos[0];
	var dotD = dotPos[1];
	var commaFlag = dotU.length % 3;
	if(commaFlag)
	{
		var out = dotU.substring(0, commaFlag);
		if (dotU.length > 3) out += ",";
	}
	else var out = "";
	for (var i=commaFlag; i < dotU.length; i+=3)
	{
		out += dotU.substring(i, i+3);
		if( i < dotU.length-3) out += ",";
	}
	if(minus) out = "-" + out;
	if(dotD) return out + "." + dotD;
	else return out;
}