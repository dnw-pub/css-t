<!--
var scrollerheight01	= 19;		// ��ũ�ѷ��� ���� 	
var s_amount01			= 19;
var html_tag01, total_area01=0, wait_flag01=true;	
var bMouseOver01		= 1;
var scrollspeed01		= 1;		// Scrolling �ӵ�         
var waitingtime01		= 3500;		// ���ߴ� �ð�
var s_tmp01 = 0;
var startPanel01=0, n_panel01=0;	//, i=0;
var adv_click_url;					//���� Ŭ���� �̵��� URL �ּ�

function startscroll1()
{ // ��ũ�� ����
	i=0;
	for (i in scroll_content1) n_panel01++;
		
	n_panel01 = n_panel01 -1 ;
	//startPanel01 = Math.round(Math.random()*n_panel01);
	if(startPanel01 == 0)
	{
		i=0;
		for (i in scroll_content1) insert_area(total_area01, total_area01++); // area ����
	}
	else if(startPanel01 == n_panel01)
	{
		insert_area(startPanel01, total_area01);
		total_area01++;
		for (i=0; i<startPanel01; i++) 
		{
			insert_area(i, total_area01); // area ����
			total_area01++;
		}
	}
	else if((startPanel01 > 0) || (startPanel01 < n_panel01))
	{
		insert_area(startPanel01, total_area01);
		total_area01++;
		for (i=startPanel01+1; i<=n_panel01; i++) 
		{
			insert_area(i, total_area01); // area ����
			total_area01++;
		}
		for (i=0; i<startPanel01; i++) 
		{
			insert_area(i, total_area01); // area ����
			total_area01++;
		}
	}
	window.setTimeout("scrolling1()",waitingtime01);
}

function scrolling1() // ������ ��ũ�� �ϴ� �κ�
{
	var tmp;

	if (bMouseOver01 && wait_flag01)
	{
		for (i=0;i<total_area01;i++)
		{
			tmp = document.getElementById('scroll_area1'+i).style;
			tmp.top = parseInt(tmp.top)-scrollspeed01;
			if (parseInt(tmp.top) <= -scrollerheight01)
			{
				tmp.top = scrollerheight01*(total_area01-1);
			}
			if (s_tmp01++ > (s_amount01-1)*scroll_content1.length)
			{
				wait_flag01=false;
				window.setTimeout("wait_flag01=true;s_tmp01=0;", waitingtime01);
			}
		}
	}
	window.setTimeout("scrolling1()",1);
}

function insert_area(idx, n)
{
	// area ����
	html_tag01='<div style="left:0px; padding:0px; width:99%; border:ridge 0px #FF0000; position:absolute; top: '+(scrollerheight01*n)+'px" id="scroll_area1'+n+'">\n';
	html_tag01+=scroll_content1[idx]+'\n';
	html_tag01+='</div>\n';
	//document.write(html_tag);
	scroll_image.innerHTML += html_tag01;
}

function GoAdvLink()
{
	if (adv_click_url != null)
	{
		window.open(adv_click_url);
	}
}
//-->
