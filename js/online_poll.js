//���� üũ �˻�
function pollCheck(frm,elename)
{
/* http://dlab.danawa.com:8080/jira/browse/PRICE-1002
��������� ���� ��ũ ������� ����Ǿ���

	var ele_cnt = frm.elements.length;
	var cFvalue = 0;

	for (var i=0; i<ele_cnt; i++)
	{
		var objEle = frm.elements[i];

		if (objEle.name == elename)
		{
			if (objEle.checked == true)
			{
				cFvalue += 1;
			}else{
				cFvalue += 0;
			}//end if
		}//end if
	}//end for

	if (cFvalue <= 0)
	{
		alert("���� �׸��� �����ϼ���!");
	}else{
		frm.submit();
	}//end if
*/
	frm.submit();
}//end pCheck


//��â ����
function winopen(url,name,w,h,scroll,resize)
{
  window.open(url,name,'width='+w+',height='+h+',scrollbars='+scroll+',resizable='+resize+',left=0,top=0');
}//end winopen

//���̾� �� ��Ʈ��
function Layer_Block_Part(id,num)
{
	var layerID = eval(id+"["+num+"].style");

	if(layerID.display == "block")
	{
		layerID.display = "none";
	}else{
		layerID.display = "block";
	}
}//end functon Layer_Block


function pollResultView(sid)
{
	var goUrl = "http://www.danawa.com/online_poll/poll_result.php?npbsid="+sid;
	window.open(goUrl,"pwin","resizable=no,width=575,height=720");
}