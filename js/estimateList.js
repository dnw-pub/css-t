<!--
// 관심상품 저장 할 팝업창 띄우기
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

	var opt = "left="+posX+",top="+posY+",width=260,height=350,resizable=false";
	var popWin = window.open(url,"pop_wishFolder",opt);
	popWin.focus();
}

// 관심상품 저장 취소
function saveCancel()
{
	var msg = "정말 저장하지 않고 취소 하시겠습니까?";
	if(confirm(msg) == true)
	{
		opener.focus(); self.close();
	}
	else return;
}

// 관심상품 선택한 폴더에 저장 - POST방식
function saveWishProd_POST(f)
{
	f.action = 'wishProdSave.php'
	f.submit();
}

// 관심상품 저장 폴더 보이기 숨기기
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

// 관심상품 저장 폴더 보이기 숨기기
function folderManager_old()
{
	var argObj	= folderManager.arguments;
	var argLen	= argObj.length;

	var layName	= "LAY_WishFolderManager";
	var lay		= $(layName);

	var docLeft = 5;
	var docTop	= 5;

	var url		= "/myPage/folderManager.html";
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


// 체크박스 리스트 몇개인지 알아보기
function chkbox_count(chkbox)
{
	if(typeof(chkbox.length) == 'undefined')	return 1;
	else										return chkbox.length;
}

// 체크박스에 체크된 갯수 알아보기
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

// 체크박스 전체 선택/해제
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

// 저장 폴더리스트 레이어 보이기
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
	menuObj.onmouseout = document.all ? function(){wishFolderMenuDynamicHide(event)} : function(event){wishFolderMenuDynamicHide(event)}

	menuShowHide(menuObj.style,	evt);

	var currentLeft = getRealOffsetLeft(obj);
	
	if(currentLeft > 170)
		docLeft = getRealOffsetLeft(obj) - 170;  // 중앙정렬 후 -170
	else
		docLeft = getRealOffsetLeft(obj) - 30;

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
// 저장내용의 카운트 관련.

	// 수량 1씩 증가/차감
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

	// 가격 갱신 표시
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
//선택상품 해당 폴더로 옮기기
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
			alert("제품을 하나 이상 선택하세요");
			return;
		}
	}

	frm.action  = "/myPage/wishListProductProc.php";

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

				//가상온라인 가로형 type으로 인해 추가 by김다정
				var type = args[4];		
				
				var sellTypeA	= (frm2.sellTypeA.checked == true)	? 'A' : '';
				var sellTypeB	= (frm2.sellTypeB.checked == true)	? 'B' : '';
				var sellTypeC	= (frm2.sellTypeC.checked == true)	? 'C' : '';
				//var chk_vat		= (frm2.chk_vat[0].checked == true) ? 'Y' : 'N';

				var url = "/myPage/wishListProductProc.php"
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
		}
	}
	else
	{
		if(confirm("선택하신 상품을 삭제 하시겠습니까?") == false) return;
		frm.tgtFolder.value = '';
		
		var type = args[1];	
		var url = "/myPage/wishListProductProc.php"
				+ "?type=" + type;
		frm.action  = url;
	}

	//var ifr		= window.frames["IFR_HiddenProdProc"];
	//frm.action  = "wishListProductProc.php";
	frm.method	= "post";
	frm.target	= "IFR_HiddenProdProc";
	frm.submit();
}


//선택상품 저장(체크박스 선택시)
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
		alert("제품을 하나 이상 선택하세요");
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
	frm.action  = "/myPage/wishListProductProc_checkbox.php";
	frm.method	= "post";
	//frm.target	= "IFR_HiddenProdProc";
	frm.submit();
}

//----------------//

function goMyWishProdProc(mode,folderSeq,fromPage)
{
	switch (fromPage)
	{
		case 1 :			// wishlist 페이지에서
			var frm = document.FORM_myWishProdList;
			break;
		case 2 :			// 가상견적서에서
			var frm = document.FRM_SelList;
			break;
	}

	var url = "/myPage/myWishListProc.html?mode="+mode+"&fseq="+folderSeq+"&fromPage="+fromPage;
	var opt = 'width=530, height=525';

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
			msg = '로그인을 하셔야 이용하실 수 있습니다.\n먼저 로그인 해 주십시요';
			break;
	}

	alert(msg);
	return;
}
//-->