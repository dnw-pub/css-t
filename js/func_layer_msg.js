<!--
/************************************************************************************************
* 위  치 : DOCUMENT_ROOT/include/func_layer_msg.js                                              *
* 내  용 : 메시지 레이어 핸들링                                                                 *
* 참  고 :                                                                                      *
* 작성자 : magma01                                                                              *
* 작성일 : 2004-10-13                                                                           *
************************************************************************************************/

var MsgLayerTimer	= null; //메시지 레이어 타이머 변수 선언(상품 리스트에서 비교 및 삭제 버튼용)


function ShowMsgLayer(nGapX, nGapY, sMsg)
{
	document.all["divMsg"].style.visibility = "visible";
	document.all["divMsg"].style.left = event.x + document.body.scrollLeft + nGapX;
	document.all["divMsg"].style.top = event.y + document.body.scrollTop + nGapY;
	document.all["divMsg"].innerHTML = sMsg;
}

function HideMsgLayer()
{
	document.all["divMsg"].style.visibility = "hidden";
}


function ShowMsgBtn(sType, form) //*** 상품 체크박스 클릭시 버튼 레이어 보기기
{
	var nCheckedCount = 0;

	for ( var i = 0; i < form.chkProdC.length; i++ )
	{
		if (form.chkProdC[i].checked)
		{
			nCheckedCount++;
		}
	}

	if (nCheckedCount > 0) //한개이상을 체크하면 비교버튼 레이어 보임
	{
		HideMsgLayer();
		if (sType == 'today_list' || sType == 'recom_list' || sType == 'new_list')
		{
			sMsg = "<table width='40' height='20' border='0' cellpadding='0' cellspacing='0'><tr><td><a href=\"javascript:SendForm('my_list');\"><img src='http://img.danawa.com/img1/all_img/list_img/btn_mylist.gif' border=0></a></td></tr></table>";
		}
		else if (sType == 'my_list')
		{
			sMsg = "<table width='40' height='20' border='0' cellpadding='0' cellspacing='0'><tr><td><a href=\"javascript:SendForm('delete');\"><img src='http://img.danawa.com/img1/all_img/list_img/btn_del.gif' border=0></a></td></tr></table>";
		}
		else
		{
			sMsg = '';
		}

		ShowMsgLayer(5, 0, sMsg);
		if ( MsgLayerTimer == null )
		{
			MsgLayerTimer = setTimeout('TimeHideMsgLayer()', 10000);
		}
	}
	else
	{
		HideMsgLayer();
	}
}


function TimeHideMsgLayer() //*** 타이머를 이용한 비교 버튼 레이어 감추기
{
	HideMsgLayer();
	MsgLayerTimer = null;
}

//-->