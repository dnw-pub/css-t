<!--
/************************************************************************************************
* ��  ġ : DOCUMENT_ROOT/include/func_layer_msg.js                                              *
* ��  �� : �޽��� ���̾� �ڵ鸵                                                                 *
* ��  �� :                                                                                      *
* �ۼ��� : magma01                                                                              *
* �ۼ��� : 2004-10-13                                                                           *
************************************************************************************************/

var MsgLayerTimer	= null; //�޽��� ���̾� Ÿ�̸� ���� ����(��ǰ ����Ʈ���� �� �� ���� ��ư��)


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


function ShowMsgBtn(sType, form) //*** ��ǰ üũ�ڽ� Ŭ���� ��ư ���̾� �����
{
	var nCheckedCount = 0;

	for ( var i = 0; i < form.chkProdC.length; i++ )
	{
		if (form.chkProdC[i].checked)
		{
			nCheckedCount++;
		}
	}

	if (nCheckedCount > 0) //�Ѱ��̻��� üũ�ϸ� �񱳹�ư ���̾� ����
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


function TimeHideMsgLayer() //*** Ÿ�̸Ӹ� �̿��� �� ��ư ���̾� ���߱�
{
	HideMsgLayer();
	MsgLayerTimer = null;
}

//-->