//설문 체크 검사
function pollCheck(frm,elename)
{
/* http://dlab.danawa.com:8080/jira/browse/PRICE-1002
설문기능을 빼고 링크 기능으로 변경되었음

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
		alert("설문 항목을 선택하세요!");
	}else{
		frm.submit();
	}//end if
*/
	frm.submit();
}//end pCheck


//새창 열기
function winopen(url,name,w,h,scroll,resize)
{
  window.open(url,name,'width='+w+',height='+h+',scrollbars='+scroll+',resizable='+resize+',left=0,top=0');
}//end winopen

//레이어 블럭 컨트롤
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