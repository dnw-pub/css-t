function objMyBrowser()
{
	var strUA, s, i;
	this.isIE = false;		// ���ͳ� �ͽ��÷η������� ��Ÿ���� �Ӽ�
	this.isNS = false;		// �ݽ������������� ��Ÿ���� �Ӽ�

	// Agent ������ ��� �ִ� ���ڿ�.
	strUA = navigator.userAgent;

	// Agent ���ڿ�(strUA) "MSIE"�� ���ڿ��� ��� �ִ��� üũ
	s = "MSIE";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isIE = true;
		// ���� i���� strUA ���ڿ� �� MSIE�� ���۵� ��ġ ���� ����ְ�,
		// s.length�� MSIE�� ���� ��, 4�� ��� �ִ�.
		// strUA.substr(i + s.length)�� �ϸ� strUA ���ڿ� �� MSIE ������
		// ������ ���ڿ��� �߶�´�.
		// �� ���ڿ��� parseFloat()�� ��ȯ�ϸ� ������ �˾Ƴ� �� �ִ�.
		return;
	}

	// Agent ���ڿ�(strUA) "Netscape6/"�̶� ���ڿ��� ��� �ִ��� üũ
	s = "Netscape6/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}

	// �ٸ� "Gecko" �������� NS 6.1�� ���.
	s = "Firefox/";
	if ((i = strUA.indexOf(s)) >= 0)
	{
		this.isNS = true;
		return;
	}
	// �ٸ� "Gecko" �������� NS 6.1�� ���.
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

// object ��ǥ��
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
		case 'safe_100'		:		// ���ں���
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
				'			<td>�������ں������� �ǽ��ϴ� �Ÿź�ȣ������� ���θ����� ��� ��ǰ���Ž� ���������� �߱��Ͽ� �Աݱݾ׿� ���� �����ϰ� ��ȣ���� �� �ִ� �ý���</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'safe'			:		// ����/�Ϲ�
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
				'			<td>�������ں������� �ǽ��ϴ� �Ÿź�ȣ������� ���θ����� ��ǰ���Ž� ���ں��� �Ǵ� �Ϲݰŷ��� ������ �� �ִ� �ý���<br>(�Ÿź�ȣ ������ �Һ��� �δ�)</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'escrow'		:		// ����ũ��
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
				'			<td>�ϳ����࿡�� �ǽ��ϴ� �Ÿź�ȣ������� �ϳ����࿡�� �����ݾ��� �����ϸ� �������� �ŷ��� ������ �� ����� �����ϴ� ���</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'self_guard'	:		// ��ü��ȣ
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
				'			<td>���θ� ��ü������ �غ��� �Ÿź�ȣ������� ���� �� PG����� ���� �Ÿź�ȣ ���</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'price_copy'	:		// ��ǰ���ݺ��� ����
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
				'				�Խù� �ۼ��� �������� �ٳ��� ������ �Ǵ� <br>��հ��� �Է��� ���� [��ǰ���ݺ���] ��ư�� <br>Ŭ�� �� ���ϴ� ���� �ٿ� �ֱ� �Ͽ� ����Ͻʽÿ�.'+
				'			</td>'+
				'		</tr>'+
				'		</table>'+
				'	</td>'+
				'</tr>'+
				'</table>';
			break;
		}

		case 'shop_logo'		:		// ������ ��ü ����
		{

			str =	'    <table id="LayerPrimSpon">'+
					'    	<tr>'+
					'            <td class="Area_lt">'+
					'                <p class="titTxt">�ٳ��� �����̾� �������� ?</p>'+
					'                <p class="titBtn"></p>'+
					'                <p class="conText">- �ٳ��Ϳ� 3�� �̻� ������ �������̳� etrust�� ������ũ ��ü<br />- ����/ī�� ���ϸ� Ȥ�� ����ũ�γ� ���ں��� ��ü<br />- �ٳ��� ���� ���� ��ġ���� ��ü</p>'+
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
					+ "<td><font face='����' color='#0974AB'>DSP�� ������ PC��ü���� �����Ǵ� ��ǰ���̸� S/W��ǰ���θ� ������ ��� �������� ��ǰ����� �Ǹ��� �������� ���մϴ�.</font></td>"
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
	// ������
	// ����
	// ������
	// ����ǰ
	// Ư������
	// ���
	// �Է���
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
			'    <td width="55">������</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+point+'</td>' +
			'</tr>';
	}
	if (nointerest != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_mu.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">������</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+nointerest+'</td>' +
			'</tr>';
	}
	if (gift != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_sa.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">����ǰ</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+gift+'</td>' +
			'</tr>';
	}
	if (coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_ku.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">����</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+coupon+'</td>' +
			'</tr>';
	}
	if (special_coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_te.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">Ư������</td>' +
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
	'			<td height="20" align="center"><strong><font color="#2F429D">[���ݰ�����] '+input_date+'</font></strong></td>' +
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

		if (tmpLeft < 300) {		// �¿���ġ����
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
	// ������
	// ����
	// ������
	// ����ǰ
	// Ư������
	// ���
	// �Է���


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
			'    <td width="55">������</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+point+'</td>' +
			'</tr>';
	}
	if (nointerest != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_mu.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">������</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+nointerest+'</td>' +
			'</tr>';
	}
	if (gift != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_sa.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">����ǰ</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+gift+'</td>' +
			'</tr>';
	}
	if (coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_ku.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">����</td>' +
			'    <td width="5"><font color="#999999">|</font></td>' +
			'    <td width="195">'+coupon+'</td>' +
			'</tr>';
	}
	if (special_coupon != '') {
		optionTable +=
			'<tr valign="top">' +
			'    <td width="15"><img src="http://img.danawa.com/new/pc/ico_s_te.gif" width="15" height="14" hspace="1"></td>' +
			'    <td width="55">Ư������</td>' +
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

		if (tmpLeft < 300) {		// �¿���ġ����
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
 * Ŭ�����忡 ��ǰ ��ũ��Ʈ ����
 */
function clipPrice(avg, pcode)
{
	if (window.clipboardData)
	{
		if (avg==0)
			avg = "";
		window.clipboardData.setData("Text", "<script language='javascript' src='http://pc.danawa.com/tools/NowProdProp.html?prod_c="+pcode+"&avg="+avg+"'></script>");
		alert("   ���� ���ô� ��ǰ�� ���� ��ũ��Ʈ�� ����Ǿ����ϴ�.   \n\n   �ٸ� ���� �ٿ��ֱ� �Ͽ� �̿��Ͻ� �� �ֽ��ϴ�.\n");
	} else {
		alert("IE �����Դϴ�. ������ ����� �˼��մϴ�.");
	}
}


/**
 * Ŭ�����忡 ��ǰ ��ũ��Ʈ ����
 */
function clipPriceAff(avg, pcode)
{
	if (window.clipboardData)
	{
		if (avg==0)
			avg = "";
		window.clipboardData.setData("Text", "<script language='javascript' src='http://pc.danawa.com/tools/NowProdProp.html?aff=Y&prod_c="+pcode+"&avg="+avg+"'></script>");
		alert("   ���� ���ô� ��ǰ�� ���� ��ũ��Ʈ�� ����Ǿ����ϴ�.   \n\n   �ٸ� ���� �ٿ��ֱ� �Ͽ� �̿��Ͻ� �� �ֽ��ϴ�.\n");
	} else {
		alert("IE �����Դϴ�. ������ ����� �˼��մϴ�.");
	}
}

/**
 * Ŭ�����忡 ��ǰ��α� URL ����
 */
function clipProd(pcode)
{
	var meintext = "http://prod.danawa.com/info/?pcode="+pcode;
	if (window.clipboardData) {
		window.clipboardData.setData("Text", meintext);
		alert("���� ���ô� ���� â�� �ּҰ� ����Ǿ����ϴ�.\n�ٸ� ���� �ٿ��ֱ� �Ͽ� �̿��Ͻ� �� �ֽ��ϴ�.");
	} else {
		alert("IE �����Դϴ�. ������ ����� �˼��մϴ�.");
	}
}

/**
 * �μ� ������ �˾�
 */
function printProd(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winPrintProd', '50', '50', '700', '700', 0, 0, 0, 1, 0);
}

/**
 * ��ü �Ұ� �˾�
 */
function storeIntro(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winStoreIntro', '50', '50', '900', '650', 0, 0, 0, 1, 1);
}

/**
 * ��ü �Ű�
 */
function userReport(url)
{
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winUserSingo', '200', '100', '750' , '760', 0, 0, 0, 1, 1);
}

/**
 * �Ű� �� �α��� üũ
 */
function reportLoginMsg(){
	if(confirm('�α��ε� ����ڸ� �̿��� �� �ֽ��ϴ�.\n�α��� �Ͻðڽ��ϱ�?')){
		getVisibleLogin();
	}
}

/**
 * ��ǰ���� ���� ����
 */
function makeProdInfo()
{
	var url = "http://eshop.danawa.com/mall/p_request.html";
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winMakeProdInfo', '50', '50', '808', '800', 0, 0, 0, 1, 0);
}

/**
 * ���޼��θ� �����ȳ�
 */
function affiliateContact()
{
	var url = "http://eshop.danawa.co.kr/mall/cps_01.html";
	windowOpen(url, 'winAffiliateContact', '50', '50', '808', '800', 0, 0, 0, 1, 0);
}

/**
 * �̿�ȳ�
 */
function useGuide()
{
	var url = "http://pc.danawa.com/pc_html/pc_right_guide.html";
	// url, name, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable
	windowOpen(url, 'winUseGuide', '50', '50', '670', '650', 0, 0, 0, 1, 0);
}


/**
 * ��ǰ����ó (�����û)
 */
function prodAdver(param)
{
	var url = "http://pc.danawa.com/cate-adver/advpromain_test/advlist.html?" + param;
	window.open(url, '_blank');
}

/**
 * ������ ����
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
 * ����/�Ϲ�
 */
function select_safe(url)
{
	var iXPos, iYPos;
	iXPos = (window.screen.width - 610) / 2;
	iYPos = (window.screen.height - 800) / 2;
	window.open(url, 'safe_confirm2', 'width=680,height=700,scrollbars=no,left='+ iXPos + ',top=' + iYPos);
}

/**
 * ���� ����
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
 * ��������� �̹��� ȣ��
 */
function loadRsi(url)
{
	window.open(url, 'loadRsi', 'width=579 height=290');
}

/**
 * ū �̹�������
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
 * �� ����
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
 * �ڵ��� ������ �ڽ� ����
 */
function mobileInBoxChange()
{
	document.getElementById('LAY_mobilePrice2').style.display = "block";
	document.getElementById('LAY_mobilePrice1').style.display = "none";
}

/**
 * �ڵ��� ������ �Է�
 */
function setMobilePrice()
{
	var frm		= document.forms['FRM_mobile'];
	var param1	= encodeURIComponent(frm.nReturnUrl.value);
	var param2	= encodeURIComponent(frm.hpPrice.value);

	if (frm.hpPrice.value.split(" ").join("") == "") {
		alert('���� �Է����ּ���');
	}
	if(isNaN(param2) == false) {
		frm.action	= 'http://www.danawa.com/elec/prod_list/mobileSubsidySave.php?mode=insert&nReturnUrl='+param1+'&hpPrice='+param2;
		frm.submit();
	} else {
		alert('���ڸ� �Է��ϼ���!');
	}
}

/**
 * ��ǰ�� ���� �ǰ� �ۼ�
 */
function goWrite()
{
	var f	= document.saveOpinionFORM;
	var url = 'http://blog.danawa.com/archive/save_list.php';
	var sMsg = f.sDescm.value;

	if (sMsg.split(" ").join("") == "") {
		alert("������ �Է��� �ּ���");
		f.sDescm.focus();
		return;
	}

	f.target = 'IFRAME_OpinionAction';
	f.action = url;
	f.submit();
}

/**
 * ���� �׷��� ����
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
	
				//�׷��� ��������~������ ���� �ְ�~�׷��� �� ������ ���� ���߱� ���� max�� min�� ���
				var priceGap = (nMaxPrice-nMinPrice) / 5; //�������� �ְ� ���� ���� ���μ�(5)�� ����
				priceGap = parseInt(priceGap) * 2 //��,�ϴ��� �׷��� �׵θ����� ������ �ø��� ���� 2�� ����
	
				//�ְ����� ���� ���ϰ�, ���������� ���� ����.
				nMaxPrice = parseInt(nMaxPrice) + priceGap;
				nMinPrice = parseInt(nMinPrice) - priceGap;
				
				//�ְ��� �������� ���� ��� �׷��� ���� ������ ���� ���μ�(5) ���� ������ �ְ��� �������� ���� �ٸ��� ���ش�.
				if(nMaxPrice == nMinPrice) {
					nMaxPrice += (nMaxPrice/5) * 2;
					nMinPrice -= (nMinPrice/5) * 2;
				}
				
				var minPriceLabelCount = 0;  //������ �� ī��Ʈ
				if(nPriceListCount > 0){
					//�÷����ο� �°� �����͸� �迭�� ���
					 $.each(aJQPlotOption, function(seq, value) {						 
						 //1���� ������ �⺻ �����ϱ� ���� �󺧰� ����
						 var minPriceLabel = '';						
						 if(nOriginMinPrice == value.minPrice && minPriceLabelCount < 1){
							 minPriceLabel = value.minPrice;
							 minPriceLabelCount++;
						 }
						 
						 aMinPricePointLabelList.push(minPriceLabel);	//����ǥ�� �� (1���� �������� ǥ��)
						 aChartData.push([value.date, value.minPrice]);	//������ ������
					 });
	
					  $.jqplot.config.enablePlugins = true;
					  plot1 = $.jqplot(area,[aChartData],{
						 animate: true,			//�ִϸ��̼� ȿ�� �ɼ�
						 animateReplot: true,	//�ִϸ��̼� ȿ�� �ɼ�
					     seriesDefaults: {	//�׷��� ���� �ɼ�
						     base : 10,
					          rendererOptions: {
						      	shadow : false,
						      	animation:{
							      	speed: 1500	// �ִϸ��̼� �ӵ�
							     }
					          },
					          markerOptions: { style:"filledSquare"}	//������ ����(��?)��� �ɼ�
					      },
					      grid: { //�׷��� ��� �ɼ�
					            backgroundColor: '#ffffff',
					            borderWidth: 1,
					            shadow:false,
				                drawBorder:false,
					            gridLineColor: '#EEEEEE'
					     },
					     axes: {
					         xaxis: {
					             renderer: $.jqplot.CategoryAxisRenderer,
					             tickOptions: { // '%#m/%#d/%y' #�� ���̸� ���� �տ� 0�� �Ⱥ���
					             	showGridline: false,
					             	fontSize:'10px'	//X�� ��Ʈ������
					             }
					         },
					         yaxis: {
					        	numberTicks :5, //Y�� ���μ�
					        	//tickInterval: nMaxPrice/7,
						      	min : nMinPrice,
						     	max : nMaxPrice,
						        //showTicks:false,
					            tickOptions: {
						            formatString:"%'d",						            
						            //fontSize:'11px',	//Y�� ��Ʈ������
						            showLabel: false, // ������ �ݾ� ����
					                //showGridline: false
					            }
	
					         }
					     },
					     series: [{		// ������ �׷��� ���� �ɼ�
				        	color: '#FE6500',
				            label:'������',
				            lineWidth : 0.5,
				            markerOptions: {size:5},
				            pointLabels : {
					              show:true, // true ������ labels (aMinPricePointLabelList)�� ����
				            	  hideZeros:true,
				            	  labels: aMinPricePointLabelList, //(������ ��)
						          location:'s',
						          ypadding : 3,
						          xpadding : 3,
	
							},
							highlighter: {
						    	 sizeAdjust: 7,
						         tooltipLocation: 'n', //���� ��ġ (n, ne, e, se, s, sw, w, nw)						    	
						         tooltipAxes: 'y',
						         tooltipFormatString: '<font size="2pt">' + "%'d"+'��</font>',						       
						         useAxesFormatters: false
	
						     },
				        }],
				        legend : { // Legend(����) �ɼ�
				        	renderer : $.jqplot.EnhancedLegendRenderer,
				            show : true, 			// Legend ǥ�� ����
				            placement : 'outside',  // Legend ��ġ (Default���� inside)
				            textColor : '#505358', 	// Legend ���� Text Color
				            rowSpacing : '0px', 	// Legend �鰣�� ���� ����
				            location : 's',  		// Legend ��ġ (e,w,s,n)(��,��,��,��) ���հ���
				            marginTop : '27px',
				            marginLeft :'369px',				            
				            fontSize: '11px',				            
				            border : '0px',
				            fontFamily: "Dotum,'����',AppleGothic,Helvetica,sans-serif",	//Legend �۾�ü
				            //showSwatches : false,	//�÷��ڽ� ���⿩��
				            rendererOptions: {
				            	numberRows: 1				            	
				            }
				        },
					     cursor: {	//���콺 Ŀ�� �ɼ�
					    	  zoom:true,
					          looseZoom: true,
					          showTooltip:true
					          //showTooltipOutsideZoom: true,
					          //constrainOutsideZoom: false
					     }
	
					  }).replot(); //�ٽ� �׸���
					  
					  
					  //������ ���� Ŭ�� ����(�׷����� �������� ����� �����ϱ� ����), ���콺 ������ css ���ְ��� Ŭ���� ����					
					  $(".jqplot-table-legend td").unbind("click").removeClass("jqplot-seriesToggle");
					  
					  //���� ��� �÷�
					  $(".jqplot-table-legend").css("background-color","rgb(241, 241, 241)");
					  
					  /*
					   * div�� ������ ���� ������ ������ 
					   */					  
					  // �˾� ���̾� ������ ������ Ŭ������ �׷����� �ٽ� �׷����� ������ div�� ������ �ٽ� �׷�����					
					  $("#addBigBarArea").remove();
					 
					  //����
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
 * ��ǰ��α� �θ�â ȣ��
 */
function ProdReflash(url)
{
	parent.location.href=url;
}

/**
 * ������ ȯ��
*/
function StandardChange(){
	var change_val;
	var prev_val = document.getElementById('prev_val').value;

	if(isNaN(prev_val)){
		alert('���ڸ� �Է��ϽǼ� �ֽ��ϴ�.');
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