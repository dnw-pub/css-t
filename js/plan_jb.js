
	//logger �оߺ� Ŭ����
	function _trkEventLog(str)
	{
		try {_trk_clickTrace('EVT', str);} catch(_e) {}
	}

	//�ؽ�Ʈ ���Ʒ� �̵�
	function TextMove(mode){
		var firstNum = document.getElementById('firstNum').value;
		var lastNum = document.getElementById('lastNum').value;

		if(lastNum > PlanTextLen)
			return;

		if(firstNum == 1 && mode == 'pre')
			return;

		if(lastNum == PlanTextLen && mode == 'next')
			return;

		if(mode == 'next'){
			lastNum++;
			for(var i = 1; i <= PlanTextLen; i++ ){
				if(i == firstNum)
					document.getElementById('TrText_'+i).style.display = "none";

				if(i == lastNum)
					document.getElementById('TrText_'+i).style.display = "block";

			}
			firstNum++;
			document.getElementById('firstNum').value = firstNum;
			document.getElementById('lastNum').value = lastNum;
		}else if(mode == 'pre'){
			firstNum--;
			for(var i = 1; i <= PlanTextLen; i++ ){
				if(i == firstNum)
					document.getElementById('TrText_'+i).style.display = "block";

				if(i == lastNum)
					document.getElementById('TrText_'+i).style.display = "none";

			}
			lastNum--;
			document.getElementById('firstNum').value = firstNum;
			document.getElementById('lastNum').value = lastNum;
		}
	}

	//top ��ȹ�� �ѹ���(��ȹ�� ����)
	function PlanProdBtnReverse(num)
	{
		var img = new Image;
		if(PlanProdLen > 10) PlanProdLen = 10;
		for(var i = 1; i<=PlanProdLen; i++)
		{
			btnId = "btn_0"+i;
			LinkId = "link_id"+i;

			if(PlanProdLen > 1){
				if( i == num ){
					document.getElementById(btnId).background = "http://img.danawa.com/new/Shopping_plan/main/img/temp2_num_in.gif";
					document.getElementById(LinkId).className = "numin";

				}else{
					document.getElementById(btnId).background = "http://img.danawa.com/new/Shopping_plan/main/img/temp2_num_dis.gif";
					document.getElementById(LinkId).className = "numdis2";
				}
			}
		}
	}

	//top ��ȹ��(��ȹ�� ����)
	function printPlanPorduct(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 10)
			num = 1;
		PlanProdBtnReverse(num);
		for(var i = 1; i <= PlanProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_"+i).style.display = "none";
			}
		}

	}


	//���� ���� ��ȹ��
	function PlanBtnReverse(num)
	{
		var PlanBtnImg = new Image();
		for(var i = 1; i<=PlanProdLen; i++)
		{
			PlanBtnImg.name = "btn_0"+i;
			
			if(document.images[PlanBtnImg.name]) {
				if( i == num )	document.images[PlanBtnImg.name].src = "http://img.danawa.com/new/Shopping_plan/Section/img/btn_good0"+i+"_on.gif";
				else			document.images[PlanBtnImg.name].src = "http://img.danawa.com/new/Shopping_plan/Section/img/btn_good0"+i+".gif";
			}
		}
	}

	//���� ���� ��ȹ�� - new
	function PlanBtnReverse_NEW(num)
	{
		var img = new Image();
		for(var i = 1; i<=PlanProdLen; i++)
		{
			img.name = "btn_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/section_m/pc/img/btn_n"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/section_m/pc/img/btn_n"+i+".gif";
		}
	}
	
	//��Ʈ�� ���� ��ȹ��
	function PlanBtnReverse_NEW_notebook(num)
	{
		var img = new Image();
		for(var i = 1; i<=PlanProdLen; i++)
		{
			img.name = "btn_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/section_m/note/img/btn2_n"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/section_m/note/img/btn2_n"+i+".gif";
		}
	}	
	
	//��ǰ����Ʈ �̺�Ʈ
	function PlanBtnReverse_Event(num)
	{
		var img = new Image();
		for(var i = 1; i<=PlanProdLen; i++)
		{
			img.name = "btn_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/blog_product/img/btn_"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/blog_product/img/btn_"+i+".gif";
		}
	}		
	
	//��Ʈ�ϸ��� ������
	function TvBtnReverse(num)
	{
		var img = new Image();
		for(var i = 1; i<=TvLen; i++)
		{
			img.name = "btnTv_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/main_new/img/btn_"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/main_new/img/btn_"+i+".gif";
		}
	}		
	

	function printPlanPorductGood(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 6)
			num = 1;

		PlanBtnReverse(num);

		for(var i = 1; i <= PlanProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_"+i).style.display = "none";
			}
		}
	}
	
	//���ո���,�Ǿ�
	function printPlanPorductGood_NEW(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 6)
			num = 1;

		PlanBtnReverse_NEW(num);

		for(var i = 1; i <= PlanProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_"+i).style.display = "none";
			}
		}
	}

	//��Ʈ��
	function printPlanPorductGood_NEW_notebook(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 6)
			num = 1;

		PlanBtnReverse_NEW_notebook(num);

		for(var i = 1; i <= PlanProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_"+i).style.display = "none";
			}
		}
	}	
	

	//��ǰ����Ʈ �̺�Ʈ
	function printPlanPorductGood_Event(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 6)
			num = 1;

		PlanBtnReverse_Event(num);

		for(var i = 1; i <= PlanProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_"+i).style.display = "none";
			}
		}
	}	
	

	//��Ʈ�ϸ��� ������
	function printTv(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * PlanProdLen);

		if(num == 0 || num > 6)
			num = 1;

		TvBtnReverse(num);

		for(var i = 1; i <= TvLen; i++){
			if(num == i){
				document.getElementById("TblTv_"+i).style.display = "block";
			}else{
				document.getElementById("TblTv_"+i).style.display = "none";
			}
		}
	}		


/* ���ո��� ���ιڽ��� */
	function PlanImg(num){

		if(num < 1)
			num = 1;
		else if(num > 5)
			num == 5;

		for(var i = 1; 5 >= i; i++){
			if(i == num)
				document.getElementById('td_img'+i).style.display = 'block';
			else
				document.getElementById('td_img'+i).style.display = 'none';
		}
	}

	function LayDisplay(){
		var DisVal = document.getElementById('dis').value;

		if(DisVal == 'hid'){
			document.getElementById('LAY_cate').style.display = 'block';
			document.getElementById('dis').value = 'open';
			document.getElementById('cate_img').src = 'http://img.danawa.com/new/main/splan_cate_up.gif';
		}else{
			document.getElementById('LAY_cate').style.display = 'none';
			document.getElementById('dis').value = 'hid';
			document.getElementById('cate_img').src = 'http://img.danawa.com/new/main/splan_cate_on.gif';
		}
	}

	function buttonDisplay(mode){
		var DisVal = document.getElementById('dis').value;

		if(DisVal == 'hid'){
			if(mode == 'in')
				document.getElementById('cate_img').src = 'http://img.danawa.com/new/main/splan_cate_on.gif';
			else
				document.getElementById('cate_img').src = 'http://img.danawa.com/new/main/splan_cate_out.gif';
		}else
			document.getElementById('cate_img').src = 'http://img.danawa.com/new/main/splan_cate_up.gif';
	}
