<!--
var myWishFolderManager =
{
	MaxFolderCount  : null,
	ObjTable		: null,
	ObjLayer		: null,
	ObjForm			: null,

	Init			: function ()
	{
		this.MaxFolderCount = 10;
		this.ObjTable		= $('TBL_FolderList');
		this.ObjLayer		= $('LAY_WishFolderManager');
		this.ObjForm		= document.FORM_FolderManager;

		if( aMyFolderSeq && aMyFolderSeq.length > 0 )
		{
			for(var i=0; i<aMyFolderSeq.length; i++)
			{
				this.InsertRow(aMyFolderSeq[i],aMyFolderName[i]);
			}
		}
	},

	ADD				: function ()
	{
		var FName = this.ObjForm.inputFolderName.value.trim();
		if(FName == '')
		{
			alert('관심상품 폴더명을 입력해 주세요');
			this.ObjForm.inputFolderName.value='';
			this.ObjForm.inputFolderName.focus();
			return;
		}

		if(this.ObjTable.rows.length >= (this.MaxFolderCount*2))
		{
			alert('관심상품 폴더는 최대 '+ this.MaxFolderCount +'개 까지 입니다.');
			this.ObjForm.inputFolderName.value='';
			return;
		}

		this.InsertRow('', FName);
		this.ObjForm.inputFolderName.value = '';
	},

	DELETE			: function (obj)
	{
		if(this.ObjTable.rows.length == 2)
		{
			alert('관심저장폴더는 1개 이상 존재해야 합니다. ');
			return;
		}
		var RowIdx = this.FindRowIndex(obj);
		this.DeleteRow(RowIdx+1);
		this.DeleteRow(RowIdx);

	},

	MODIFY			: function (obj)
	{
		var RowIdx	= this.FindRowIndex(obj);
		var fName	= this.ObjTable.rows[RowIdx].cells[1].childNodes[0];

		fName.readOnly	= false;
		fName.className = "input";
		fName.focus();
	},

	MODIFY2			: function (obj)
	{
		var RowIdx	= this.FindRowIndex(obj);
		var fName	= this.ObjTable.rows[RowIdx].cells[1].childNodes[0];

		fName.readOnly	= true;
		fName.className = "likeText";
	},

	UP				: function (obj)
	{
		var RowIdx	= this.FindRowIndex(obj);
		if(RowIdx == 0) return;
		this.SwapTableRow(this.ObjTable.rows[RowIdx], this.ObjTable.rows[RowIdx-2]);
	},

	DOWN			: function (obj)
	{
		var RowIdx	= this.FindRowIndex(obj);
		if(RowIdx == this.ObjTable.rows.length-2) return;
		this.SwapTableRow(this.ObjTable.rows[RowIdx], this.ObjTable.rows[RowIdx+2]);
	},

	SwapTableRow	: function (src,tgt)
	{
		if(document.all) src.swapNode(tgt);
		else
		{
			var p=tgt.parentNode;
			var s=tgt.nextSibling;
			src.parentNode.replaceChild(tgt,src);
			p.insertBefore(src,s)
			return src;
		}
	},

	InsertRow		: function (FolderSeq,FolderName)
	{
		var Len	 = this.ObjTable.rows.length;
		var Row0 = this.ObjTable.insertRow(Len);
		var Row1 = this.ObjTable.insertRow(Len+1);

		var Cel00 = Row0.insertCell(0);
		var Cel01 = Row0.insertCell(1);
		var Cel02 = Row0.insertCell(2);
		var Cel03 = Row0.insertCell(3);
		
		FolderName = FolderName.replace(/\"/g,"'");

		Cel00.innerHTML = '<img src="http://img.danawa.com/new/wish/img/ico_arrow.gif" width="3" height="5" border="0">';
		Cel01.innerHTML = '<input type="text" name="fName[]" value="'+FolderName+'" maxlength="20" onBlur="myWishFolderManager.MODIFY2(this)" class="likeText" readOnly>'
						+ '<input type="hidden" name="fSeq[]" value="'+FolderSeq+'">';

		Cel02.innerHTML = '\n'
						+ '<a href="javascript:;">'
						+ '<img src="http://img.danawa.com/new/wish/img/btn_arrow01.gif" width="17" height="16" border="0" onClick="myWishFolderManager.DOWN(this)">'
						+ '</a>'
						+ '<a href="javascript:;">'
						+ '<img src="http://img.danawa.com/new/wish/img/btn_arrow02.gif" width="17" height="16" border="0" onClick="myWishFolderManager.UP(this)" hspace="2">'
						+ '</a>'
						+ '\n';

		Cel03.innerHTML = '\n'
						+ '<a href="javascript:;">'
						+ '<img src="http://img.danawa.com/new/wish/img/btn_modify.gif" width="29" height="18" border="0" onClick="myWishFolderManager.MODIFY(this)">'
						+ '</a>'
						+ '\n'
						+ '<a href="javascript:;">'
						+ '<img src="http://img.danawa.com/new/wish/img/btn_del02.gif" width="29" height="18" border="0" onClick="myWishFolderManager.DELETE(this)">'
						+ '</a>'
						+ '\n';

		var Cel10 = Row1.insertCell(0);
		Cel10.setAttribute('colSpan','4');
		Cel10.setAttribute('height','1');
		Cel10.setAttribute('bgColor','#e5e5e5');

		if(this.ObjTable.rows.length > 2) this.NoticeShowHide('hide');
	},

	DeleteRow		: function (rowIdx)
	{
		this.ObjTable.deleteRow(rowIdx);
		if(this.ObjTable.rows.length == 2) this.NoticeShowHide('show');
	},

	FindRowIndex	: function (obj)
	{
		if(obj.nodeName == 'TR')
		{
			return obj.rowIndex;
		}
		else
		{
			return this.FindRowIndex(obj.parentNode);
		}
	},
	
	NoticeShowHide	: function (mode)
	{
		var obj = $('TBL_ShowHide');
		if(mode == 'show')
		{
			obj.style.display = 'block';
			obj.style.visivility = 'visible';
		}
		else
		{
			obj.style.visivility = 'hidden';
			obj.style.display = 'none';			
		}
	},

	CLOSE			: function ()
	{
		for(var i=this.ObjTable.rows.length-1; i>=0; i--) this.DeleteRow(i);

		this.ObjLayer.style.left		= "-500px";
		this.ObjLayer.style.top			= "-500px";
		this.ObjLayer.style.visibility	= "hidden";
		this.ObjLayer.style.display		= "none";
	},

	SAVE			: function ()
	{
		if(this.ObjTable.rows.length < 1)
		{
			alert('관심상품 폴더를 하나 이상 만드셔야 합니다.');
			this.ObjForm.inputFolderName.focus();
			return;
		}

		this.ObjForm.method = "post";
		this.ObjForm.action = "/myPage/wishSaveFolder.php";
		this.ObjForm.target	= "IFR_HiddenWishFolderProc";
		this.ObjForm.submit();
	}
}
//-->