	//¿Ã∫•∆Æ
	function EventBtnReverse(num)
	{
		var img = new Image;
		for(var i = 1; i<=EventProdLen; i++)
		{
			img.name = "EventImgBtn_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/Shopping_plan/Section/img/btn_good0"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/Shopping_plan/Section/img/btn_good0"+i+".gif";
		}
	}

	function printEventPorductGood(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * EventProdLen);

		if(num == 0 || num > 6)
			num = 1;

		EventBtnReverse(num);

		for(var i = 1; i <= EventProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_event_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_event_"+i).style.display = "none";
			}
		}

	}

	function EventBtnReverse_NEW(num)
	{
		var img = new Image;
		for(var i = 1; i<=EventProdLen; i++)
		{
			img.name = "EventImgBtn_0"+i;
			if( i == num )	document.images[img.name].src = "http://img.danawa.com/new/section_m/pc/img/btn_n"+i+"_on.gif";
			else			document.images[img.name].src = "http://img.danawa.com/new/section_m/pc/img/btn_n"+i+".gif";
		}
	}

	function printEventPorductGood_NEW(num)
	{
		if(num == undefined)
			num = Math.floor(Math.random() * EventProdLen);

		if(num == 0 || num > 6)
			num = 1;

		EventBtnReverse_NEW(num);

		for(var i = 1; i <= EventProdLen; i++){
			if(num == i){
				document.getElementById("Tbl_event_"+i).style.display = "block";
			}else{
				document.getElementById("Tbl_event_"+i).style.display = "none";
			}
		}

	}