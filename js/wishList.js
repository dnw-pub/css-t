<!--
// ���ɻ�ǰ ���� �� �˾�â ����
function saveWishProduct(pCode,e)
{
	var posX = posY = 0;

	var url = 'http://www.danawa.com/myPage/wishSaveFolder.html?pcode='+pCode;
	if(document.all)
	{
		posX = event.screenX
		posY = event.screenY;
	}
	else
	{
		posX = e.screenX
		posY = e.screenY;
	}
	posX = posX - 100;
	posY = posY + 15;
	
	var userHeight = screen.availHeight;
	if(userHeight - posY < 350) {
		posY = posY - 350;
	}

	var opt = "left="+posX+",top="+posY+",width=260,height=350,resizable=false";
	var popWin = window.open(url,"pop_wishFolder",opt);
	popWin.focus();
}

// ���ɻ�ǰ ���� �� �˾�â ����
function saveWishProduct2(e,mode,targetSeq)
{
	var posX = posY = 0;

	var url = 'http://www.danawa.com/myPage/estimate/estimateSaveFolder.html';

	if(mode || targetSeq) {
		url += '?mode='+mode+'&targetSeq='+targetSeq;
	}

	if(document.all)
	{
		posX = event.screenX
		posY = event.screenY;
	}
	else
	{
		posX = e.screenX
		posY = e.screenY;
	}
	posX = posX - 100;
	posY = posY - 350;

	var opt = "left="+posX+",top="+posY+",width=379,height=350,resizable=false";
	var popWin = window.open(url,"pop_estimateFolder",opt);
	popWin.focus();
}

// ������ǰ ���� �� �˾�â ����
function saveEstimateProduct(e,mode,targetSeq)
{
	var posX = posY = 0;

	var url = 'http://www.danawa.com/myPage/estimate/estimateSaveFolder.html';

	if(mode || targetSeq) {
		url += '?mode='+mode+'&targetSeq='+targetSeq;
	}

	if(document.all)
	{
		posX = event.screenX
		posY = event.screenY;
	}
	else
	{
		posX = e.screenX
		posY = e.screenY;
	}
	posX = posX - 100;
	posY = posY - 350;

	var opt = "left="+posX+",top="+posY+",width=379,height=350,resizable=false";
	var popWin = window.open(url,"pop_estimateFolder",opt);
	popWin.focus();
}

// ���ɻ�ǰ ���� ���
function saveCancel()
{
	var msg = "���� �������� �ʰ� ��� �Ͻðڽ��ϱ�?";
	if(confirm(msg) == true)
	{
		opener.focus(); self.close();
	}
	else return;
}

// ���ɻ�ǰ ������ ������ ���� - POST���
function saveWishProd_POST(f)
{
	f.action = 'wishProdSave.php'
	f.submit();
}

// ���ɻ�ǰ ���� ���� ���̱� �����
function folderManager()
{
	var argObj	= folderManager.arguments;
	var argLen	= argObj.length;

	var layName	= "LAY_WishFolderManager";
	var lay		= $(layName);

	var curStat = lay.style.display;

	var docLeft = 5;
	var docTop	= 5;

	lay.style.display		= "block";
	lay.style.visibility	= "visible";

	if(argLen > 0)
	{
		var obj		= argObj[0];
		var layExt	= lay.offsetWidth - obj.width;

		docLeft = getRealOffsetLeft(obj) - layExt + 4;
		//docTop	= getRealOffsetTop(obj) + obj.height + 2;
		docTop	= getRealOffsetTop(obj) - 1;

		if(docLeft < 0)
		{
			docLeft = 20;
		}

		var clientHei = ieCompatTest().scrollTop+ieCompatTest().clientHeight;
		if(clientHei - docTop < lay.offsetHeight)
		{
			docTop = clientHei - lay.offsetHeight-2;
		}
	}

	lay.style.left	= docLeft + 'px';
	lay.style.top	= docTop + 'px';

	if(curStat != 'block') myWishFolderManager.Init();
}

// ���ɻ�ǰ ���� ���� ���̱� �����
function folderManager_old()
{
	var argObj	= folderManager.arguments;
	var argLen	= argObj.length;

	var layName	= "LAY_WishFolderManager";
	var lay		= $(layName);

	var docLeft = 5;
	var docTop	= 5;

	var url		= "http://www.danawa.com/myPage/folderManager.html";
	//var param	= "test=test";

	var folderAjax = new Ajax.Updater(
		layName,
		url,
		{
			method : 'get'
		}
	);

	lay.style.display		= "block";
	lay.style.visibility	= "visible";

	if(argLen > 0)
	{
		var obj		= argObj[0];
		var layExt	= lay.offsetWidth - obj.width;

		docLeft = getRealOffsetLeft(obj) - layExt + 4;
		docTop	= getRealOffsetTop(obj) + obj.height + 2;

		if(docLeft < 0)
		{
			docLeft = 20;
		}

		var clientHei = ieCompatTest().scrollTop+ieCompatTest().clientHeight;
		if(clientHei - docTop < lay.offsetHeight)
		{
			docTop = clientHei - lay.offsetHeight-2;
		}
	}

	lay.style.left	= docLeft + 'px';
	lay.style.top	= docTop + 'px';
}

function getRealOffsetTop(o)
{
	return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0;
}

function getRealOffsetLeft(o)
{
	return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0;
}

function ieCompatTest()
{
	return (document.compatMode	&& document.compatMode!="BackCompat") ? document.documentElement : document.body;
}


// üũ�ڽ� ����Ʈ ����� �˾ƺ���
function chkbox_count(chkbox)
{
	if(typeof(chkbox.length) == 'undefined')	return 1;
	else										return chkbox.length;
}

// üũ�ڽ��� üũ�� ���� �˾ƺ���
function chkbox_checked(chkbox)
{
	var len = chkbox_count(chkbox);

	if(len == 1)
	{
		if(chkbox.checked == true)	return 1;
		else						return 0;
	}
	else if (len > 1)
	{
		var cnt = 0;
		for(var i=0; i<len; i++)
		{
			if(chkbox[i].checked == true) cnt += 1;
			else continue;
		}
		return cnt;
	}
}

// üũ�ڽ� ��ü ����/����
function chkbox_control(f,check_status)
{
	var chkbox	= f.elements["pListSeq[]"];

	if(chkbox)
	{
		if(chkbox_count(chkbox) == 1)
		{
			chkbox.checked = check_status;
		}
		else if (chkbox_count(chkbox) > 1)
		{
		}
		{
			for(var i=0; i<chkbox.length; i++) chkbox[i].checked = check_status;
		}
	}
	else return;
}

function chkbox_view(f)
{
	var chksrc	= f.all_control;
	var chkbox	= f.elements["pListSeq[]"];

	if(typeof(chkbox.length) == 'undefined')
	{
		if (chkbox.checked == true) chksrc.checked = true;
		else chksrc.checked = false;
	}
	else
	{
		var chked	= 0;
		for(var i=0; i<chkbox.length; i++)
		{
			if(chkbox[i].checked == true) chked++;
		}
		if(chkbox.length == chked) chksrc.checked = true;
		else chksrc.checked = false;
	}
}

// ���� ��������Ʈ ���̾� ���̱�
function myWishFolderListMenu(obj, e, menuID)
{
	obj.blur();
	//var evt = (window.event) ? window.event : e;
	if (window.event)
	{	evt				= window.event;
		evt.cancelBubble= true;
	}
	else if (e.stopPropagation)
	{
		evt = e;
		evt.stopPropagation();
	}

	if (typeof menuObj != "undefined")	// hide previous menu
	{
		menuObj.style.visibility	= "hidden";
		menuObj.style.display		= "none";
	}

	clearHideMenu();

	obj.onmouseout	= hideMenu;
	menuObj			= $(menuID);

	menuObj.onclick=function()
	{
		menuObj.style.visibility='hidden';
		menuObj.style.display='none';
	}

	menuObj.onmouseover = clearHideMenu;
	menuObj.onmouseout = document.all ? function(){wishFolderMenuDynamicHide(event);} : function(event){wishFolderMenuDynamicHide(event);}

	menuShowHide(menuObj.style,	evt);

	var currentLeft = getRealOffsetLeft(obj);

	if(currentLeft > 170){
		docLeft = getRealOffsetLeft(obj) - 170;  // �߾����� �� -170
	}else{
		docLeft = getRealOffsetLeft(obj) - 30;
	}

	if(!obj.height) {
		obj.height = 20;
	}
	docTop	= getRealOffsetTop(obj) + obj.height + 1;

	menuObj.style.left	= docLeft + 'px';
	menuObj.style.top	= docTop  + 'px';
}

function menuShowHide(obj, e)
{
	menuObj.style.left = menuObj.style.top = -500;

	if (e.type=="click")
	{
		obj.display		= 'block';
		obj.visibility	= 'visible';
	}
	else if	(e.type=="mouseout")
	{
		obj.display		= 'none';
		obj.visibility	= 'hidden';
	}
}

// ���� ��������Ʈ �˾�â
function myWishFolderListPopup(obj, mode, nCommandType, nFolderSeq)
{
	var frm		= document.forms["FORM_myWishProdList"];
	var chkbox	= frm.elements["pListSeq[]"];
	if(chkbox_checked(chkbox) == 0)
	{
		alert("��ǰ�� �ϳ� �̻� �����ϼ���");
		return;
	}

	if(!nCommandType || !nFolderSeq) {
		alert('�߸��������Դϴ�.');
	}

	var currentLeft = getRealOffsetLeft(obj);

	if(currentLeft > 170)
		docLeft = getRealOffsetLeft(obj) - 170;  // �߾����� �� -170
	else
		docLeft = getRealOffsetLeft(obj) - 30;

	if(!obj.height) obj.height = 20;
	docTop	= getRealOffsetTop(obj) + obj.height + 1;

	var url = 'http://www.danawa.com/myPage/wishFolderPop.html';

	url += '?nServiceType='+mode+'&nCommandType='+nCommandType+'&nFolderSeq='+nFolderSeq;

	var opt = "left="+docLeft+",top="+docTop+",width=379,height=350,resizable=false";
	var popWin = window.open(url,"pop_wishFolder",opt);
	popWin.focus();
}

function wishFolderMenuDynamicHide(e){
	if (document.all && !menuObj.contains(e.toElement))
	{
		hideMenu();
	}
	else if	((!document.all && document.getElementById)&&e.currentTarget!=	e.relatedTarget&& !contains_ns(e.currentTarget, e.relatedTarget))
	{
		hideMenu();
	}
}

function hideMenu()
{
	delayhide=setTimeout("menuObj.style.visibility='hidden';menuObj.style.display='none';",250);
}

function clearHideMenu()
{
	if (typeof delayhide!="undefined") clearTimeout(delayhide);
}

function contains_ns(a,b)
{
	while (b.parentNode) if ((b = b.parentNode) == a) return true;
	return false;
}

//================================================//
// ���峻���� ī��Ʈ ����.

	// ���� 1�� ����/����
	function count_change(frm,idx,ord)
	{
		var cnt_obj = eval('frm.TXT_Account_'+idx);
		var cnt_val = cnt_obj.value;

		if(ord == '+')
		{
			if(cnt_val<100) cnt_val = parseInt(cnt_val)+1;
		}
		else
		{
			if(cnt_val>1) cnt_val = parseInt(cnt_val)-1;
		}
		cnt_obj.value = cnt_val;

		price_sum(frm, idx);
	}

	// ���� ���� ǥ��
	function price_sum(frm,idx)
	{
		var elem	= 'pListSeq[]';

		if(frm.elements[elem])
		{
			var minprice			= 0;
			var avgprice			= 0;
			var cnt					= 0;
			var minprice_total_sum	= 0;
			var avgprice_total_sum	= 0;


			if(typeof(frm.elements[elem].length) == 'undefined')
			{
				var prodSeq = frm.elements[elem].value;
				minprice	= eval('frm.TXT_MinPrice_'+prodSeq+'.value');
				avgprice	= eval('frm.TXT_AvgPrice_'+prodSeq+'.value');
				cnt			= eval('frm.TXT_Account_' +prodSeq+'.value');

				minprice_total_sum = parseInt(minprice) * parseInt(cnt);
				avgprice_total_sum = parseInt(avgprice) * parseInt(cnt);
			}
			else
			{
				for(var i=0; i<frm.elements[elem].length; i++)
				{
					var prodSeq = frm.elements[elem][i].value;
					minprice	= eval('frm.TXT_MinPrice_'+prodSeq+'.value');
					avgprice	= eval('frm.TXT_AvgPrice_'+prodSeq+'.value');
					cnt			= eval('frm.TXT_Account_' +prodSeq+'.value');

					minprice_total_sum += parseInt(minprice) * parseInt(cnt);
					avgprice_total_sum += parseInt(avgprice) * parseInt(cnt);
				}
			}
		}
		else
		{
			price_sum = 0;
		}

		var minprice_unit_sum			= eval('frm.TXT_MinPrice_'+idx+'.value') * eval('frm.TXT_Account_' +idx+'.value');

		var lay_minprice_unit			= $('LAY_UnitMinPrice_' + idx);
		var lay_minprice_total			= $('LAY_TotalMinPrice');
		var lay_avgprice_total			= $('LAY_TotalAvgPrice');

		lay_minprice_unit.innerHTML		= commaNum(minprice_unit_sum);
		lay_minprice_total.innerHTML	= commaNum(minprice_total_sum);
		lay_avgprice_total.innerHTML	= commaNum(avgprice_total_sum);
	}

//---------------------//
//���û�ǰ �ش� ������ �ű��
function myWishProdProc()
{
	var frm		= document.forms["FORM_myWishProdList"];
	var chkbox	= frm.elements["pListSeq[]"];

	var args	= myWishProdProc.arguments;
	var argLen	= args.length;
	var order	= args[0];

	frm.procOrder.value = order;

	if(order != 'SAVE')
	{
		if(chkbox_checked(chkbox) == 0)
		{
			alert("��ǰ�� �ϳ� �̻� �����ϼ���");
			return;
		}
	}

	frm.action  = "http://www.danawa.com/myPage/wishListProductProc.php";

	if(order == 'MOVE' || order == 'COPY' || order == 'SAVE')
	{
		var folderSeq = args[1];
		frm.tgtFolder.value = folderSeq;

		if(order == 'SAVE')
		{
			chkbox_control(frm,true);

			if(args[2] == 'GoMinPriceCompany')
			{
				var frm2 = document.FORM_MinPriceCompany;
				var view = args[3];

				//����¶��� ������ type���� ���� �߰� by�����
				var type = args[4];

				var sellTypeA	= (frm2.sellTypeA.checked == true)	? 'A' : '';
				var sellTypeB	= (frm2.sellTypeB.checked == true)	? 'B' : '';
				var sellTypeC	= (frm2.sellTypeC.checked == true)	? 'C' : '';
				//var chk_vat		= (frm2.chk_vat[0].checked == true) ? 'Y' : 'N';

				var url = "http://www.danawa.com/myPage/wishListProductProc.php"
						+ "?goPage=MinPriceCompany"
						+ "&fseq=" + folderSeq
						+ "&type=" + type
						+ "&view=" + view
						+ "&sellTypeA=" + sellTypeA
						+ "&sellTypeB=" + sellTypeB
						+ "&sellTypeC=" + sellTypeC;
						//+ "&chk_vat="	+ chk_vat;

				frm.action  = url;
			}
		} else {
			var nServiceType = args[2];
			if(nServiceType == 0 || nServiceType == 1)
				frm.nServiceType.value = nServiceType;
		}
	}
	else
	{
		if(confirm("�����Ͻ� ��ǰ�� ���� �Ͻðڽ��ϱ�?") == false) return;
		frm.tgtFolder.value = '';

		var type = args[1];
		var url = "http://www.danawa.com/myPage/wishListProductProc.php"
				+ "?type=" + type;
		frm.action  = url;
	}

	//var ifr		= window.frames["IFR_HiddenProdProc"];
	//frm.action  = "wishListProductProc.php";
	frm.method	= "post";
	frm.target	= "IFR_HiddenProdProc";
	frm.submit();
}


//���û�ǰ ����(üũ�ڽ� ���ý�)
function myWishProdProc_checkbox()
{
	var frm		= document.forms["FORM_myWishProdList"];
	var chkbox	= frm.elements["pListSeq[]"];

	var args	= myWishProdProc_checkbox.arguments;
	var argLen	= args.length;
	var order	= args[0];

	frm.procOrder.value = order;

	if(chkbox_checked(chkbox) == 0)
	{
		alert("��ǰ�� �ϳ� �̻� �����ϼ���");
		return;
	}

	if(order == 'SAVE')
	{
		frm.tgtFolder.value = args[1];
	}

	else if(order = 'DELETE')
	{
		frm.tgtFolder.value = '';
	}

	//var ifr		= window.frames["IFR_HiddenProdProc"];
	frm.action  = "http://www.danawa.com/myPage/wishListProductProc_checkbox.php";
	frm.method	= "post";
	//frm.target	= "IFR_HiddenProdProc";
	frm.submit();
}

//----------------//

function isRealDomainStatus(){
	var sDomain = location.href;
	console.log(sDomain);
	var isReal = 'Y';
	
	if(sDomain.indexOf("-t") > -1 || sDomain.indexOf("-local") > -1){
		isReal = 'N';
	}
	
	return isReal;
}

function goMyWishProdProc(mode,folderSeq,fromPage,nServiceType)
{
	switch (fromPage)
	{
		case 1 :			// wishlist ����������
			var frm = document.FORM_myWishProdList;
			break;
		case 2 :			// �������������
			var frm = document.FRM_SelList;
			break;
	}
	if(!nServiceType) nServiceType = 0;
	
	var isReal = isRealDomainStatus();
	var sShopDomain = "http://shop.danawa.com";
	if(isReal == 'N'){
		sShopDomain = "http://shop-t.danawa.com";
	}
	
	if(mode == 1){
		var url = sShopDomain + "/virtualestimate/?controller=estimateMain&methods=wishPrint&marketPlaceSeq=16&folderSeq=" + folderSeq;
	} else {
		var url = sShopDomain + "/virtualestimate/?controller=estimateMain&methods=wishPrint&marketPlaceSeq=16&folderSeq=" + folderSeq + "&mode=email";
	}	
	var opt = 'width=780, height=525, location=no, status=yes';

	frm.method = "post";
	frm.action = url;
	frm.target = 'esti_pop';

	var esti = window.open('about:blank', 'esti_pop', opt);
	frm.submit();
	esti.focus();
}
function goMyWishProdProc_hth(mode,folderSeq,fromPage,nServiceType)
{
	switch (fromPage)
	{
		case 1 :			// wishlist ����������
			var frm = document.FORM_myWishProdList;
			break;
		case 2 :			// �������������
			var frm = document.FRM_SelList;
			break;
	}
	if(!nServiceType) nServiceType = 0;

	var url = "http://www.danawa.com/myPage/myWishListProc_hth.html?mode="+mode+"&fseq="+folderSeq+"&fromPage="+fromPage+"&nServiceType="+nServiceType;
	var opt = 'width=780, height=525, location=no, status=yes';

	frm.method = "post";
	frm.action = url;
	frm.target = 'esti_pop';

	var esti = window.open('about:blank', 'esti_pop', opt);
	frm.submit();
	esti.focus();
}
function printAlert(msgNum)
{
	var msg = '';
	switch (msgNum)
	{
		case 1 :
			msg = '�α����� �ϼž� �̿��Ͻ� �� �ֽ��ϴ�.\n���� �α��� �� �ֽʽÿ�';
			break;
	}

	alert(msg);
	return;
}

function goUrl(url) {
	printAlert(1);
	document.location.href = url;
}

/** ����¶��� ������ �˾� ���� **/
function virtualEstimatePopup(){
	//1084*760
	var width = 1064;
	var height = 740;	
	var scrollbars = "no";
	if(width > screen.width){
		width = screen.width;
	
	}
	if(780 > screen.height){
		height = screen.height;
		scrollbars = "yes";
	}	
	var opt = 'width='+width+', height='+height+', location=no, status=no, toolbar=no, menubar=no, scrollbars='+scrollbars+', resizable=no, fullscreen=no, channelmode=no';
	window.open('http://www.danawa.com/myPage/estimate/outerEstimate.php?logger_kw=estimate_new&_C_=107', '', opt);
}

//PC������/������ ����URL ����� 
function makeSharedShortUrl(service, type, pFolderSeq, id, isDev) {
	var sProdCode = '';
	var sProdCount = '';
	jQuery('.pListSeq').each(function(index) {
		if(index == 0) {
//			sProdCode += jQuery(this).attr('value');
			sProdCode += jQuery(this).parent().find('input[type=hidden]').val();
			if(service == 'dealer') {
				sProdCount += jQuery(this).parent().parent().children('td').eq(4).eq(0).find('input[type=hidden]').val();
			} else {
				sProdCount += jQuery(this).parent().parent().children('td').eq(6).eq(0).find('input[type=hidden]').val();
			}
		} else {
//			sProdCode += ',' + jQuery(this).attr('value');
			sProdCode += ',' + jQuery(this).parent().find('input[type=hidden]').val();
			if(service == 'dealer') {
				sProdCount += ',' + jQuery(this).parent().parent().children('td').eq(4).eq(0).find('input[type=hidden]').val();
			} else {
				sProdCount += ',' + jQuery(this).parent().parent().children('td').eq(6).eq(0).find('input[type=hidden]').val();
			}
		}
	});
	var linkUrl = '';
	location.domain = "http://www.danawa.com";
	if(isDev == 'Y' && service != 'dealer') {
		linkUrl = 'http://shop-t.danawa.com';
	} else {
		linkUrl = 'http://shop.danawa.com';
	}
	
	if(service == 'dealer') {
		linkUrl += '/virtualestimate/?controller=estimateMain&methods=index&marketPlaceSeq=19&sellerSeq=1011&shareYN=Y&productSeqList='+sProdCode+'&quantityList='+sProdCount;
	} else if(service == 'minishop') {
		linkUrl += '/virtualestimate/?controller=estimateMain&methods=index&marketPlaceSeq=33&sharedId='+id+'&sharedSns=Y&folderSeq='+pFolderSeq+'&productSeqList='+sProdCode+'&quantityList='+sProdCount;
	} else {
		linkUrl += '/virtualestimate/?controller=estimateMain&methods=index&marketPlaceSeq=16&sharedId='+id+'&sharedSns=Y&folderSeq='+pFolderSeq+'&productSeqList='+sProdCode+'&quantityList='+sProdCount+'logger_kw=estimate_mypop';
	}
	
	
	jQuery.ajax({
		type: "get",
		url: "https://is.gd/create.php",
		dataType: 'json',
		data: {'format':'json', 'url':linkUrl},
		success: function(response) {
			if(type == 'urlcopy') {
				urlCopyBrowser(response.shorturl);
			} else if(type == 'facebook') {
				goSharedSns('1', response.shorturl);
			} else if(type == 'twitter') {
				goSharedSns('2', response.shorturl);
			} else if(type == 'kakao') {
				goSharedSns('7', response.shorturl);
			}
		},
		error: function(response) {
			alert('����URL �����Դϴ�. �� �޼����� �ݺ��� �����Ϳ� �������ּ���.');
			alert(response.status);
		}
	});
}

function urlCopyBrowser(pShortUrl) {
	if(pShortUrl != '' && pShortUrl != null) {
		if (window.clipboardData) {
			// IEó��
			// Ŭ�����忡 ���ڿ� ����
			window.clipboardData.setData('text', pShortUrl);

			// Ŭ�������� ���� ��������
			// window.clipboardData.getData('Text');

			// Ŭ�������� ���� �����
			// window.clipboardData.clearData("Text");

			alert('�ּҰ� ����Ǿ����ϴ�. �ٿ� ���� ���� ctrl+v �ϼ���\n\n');

		} else {
			// ��IE ó��
			window.prompt("�ּҸ� ctrl+c �Ͽ�, �ٿ� ���� ���� ctrl+v�ϼ���.",pShortUrl);
		}
	} else {
		alert('�߸��Ǿ����ϴ�. �������� ���ΰ�ħ(F5)���ּ��� ��� �̷��� ������ �߻��Ѵٸ� �����Ϳ� �������ּ���!!');
		return false;
	}
}

function goSharedSns(pValid, pShortUrl) {
	var marketPlaceName = jQuery("[name='marketPlaceName']").val();
	//document.location.href			+pShortUrl
	var _url = "";
	if( pValid != 4 ) {
		_url = "http://www.danawa.com/sns/danawaSnsShare.php?snsType="+pValid+"&nShareType=2&content="+marketPlaceName+"&sourceUrl="+pShortUrl;
		window.open(_url, "sharedPopUp", "width=500px,height=400px,scrollbars=yes,resizeable=yes");
	} else if ( pValid == 4 ) {
		_url = "https://mypeople.daum.net/mypeople/web/share.do?link="+encodeURIComponent(pShortUrl)+"&prefix="+encodeURIComponent(marketPlaceName)+"&source_id=none";
		window.open(_url, "sharedPopUp", "width=500px,height=400px,scrollbars=yes,resizeable=yes");
	}
}

function shopProductListCopyHtml(sProductCodeList,sQuantityList){
	var isReal = isRealDomainStatus();
	var sShopDomain = "http://shop.danawa.com";
	if(isReal == 'N'){
		sShopDomain = "http://shop-t.danawa.com";
	}
	var sUrl = sShopDomain + "/virtualestimate/?controller=estimateMain&methods=estimateByExternalGoodsInfo&productSeqList=";
	sUrl += sProductCodeList + "&quantityList=" + sQuantityList + "&type=copyHtml";
		
	window.open(sUrl,'','top=100px, left=100px, height=800px, width=1100px');
}

jQuery(function() {
	jQuery.openShareLayer = function() {
		var sharedLeft = $(this).offset().left + $(this).innerWidth();
		alert(sharedLeft);
		jQuery('.estimate_share_popup').css('display','block');
	};
	
	
});


jQuery(document).ready(function() {
	jQuery(document).delegate( '#sharePopupBtn', 'click', function() {
		var sharedLeft = jQuery(this).offset().left;
		var sharedTop = jQuery(this).offset().top + jQuery(this).innerHeight() + 3;
		var aProdCodeList = document.getElementsByName('pListSeq');
		var aProdCodeListTest = jQuery('.pListSeq');
		var sProdCode = '';
		
		jQuery('.pListSeq').each(function(index) {
			if(index == 0) {
				sProdCode += jQuery(this).attr('value');
			} else {
				sProdCode += ','+jQuery(this).attr('value');
			}
		});
				
		if(jQuery('.estimate_share_popup').hasClass('on')) {
			jQuery('.estimate_share_popup').css({'display':'none'});
			jQuery('.estimate_share_popup').removeClass('on');
		} else {
			jQuery('.estimate_share_popup').css({'display':'block'});
			jQuery('.estimate_share_popup').addClass('on');
		}
	});
	
	jQuery(document).delegate('#shareLoginBtn', 'click', function() {
		alert('�α����ϼž� �̿��Ͻ� �� �ֽ��ϴ�.');
		var nowUrl = location.href;
		alert(nowUrl);
		location.href = 'https://login.danawa.com/login.php?url='+nowUrl;
	});
	
	jQuery(document).delegate('.close', 'click', function() {
		jQuery('.estimate_share_popup').css({'display':'none'});
	});
});
//-->