<!--
function comboOptionCount(combo)
{
	return combo.options.length;
}

//var sTempWishFolderCreateMessage = "�������� �Է��� �ּ���";
var nMaxCreateWishFolderCount	 = 5;

// ���� �߰�
function folderAdd()
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	
	var len		= comboOptionCount(combo);

	if(len >= nMaxCreateWishFolderCount)
	{
		alert("���ɻ�ǰ ���� ������ �ִ� "+nMaxCreateWishFolderCount+"�� ������ ���� �����մϴ�.");
		return;
	}

	var name	= f.folderName;	
	if(name.value.trim() == '')
	{
		alert('���ɻ�ǰ �������� �Է��� �ּ���.');
		name.focus();
		return;
	}
	
	var idx		= combo.selectedIndex;
	if((idx < 0))
	{
		var val				= 'TEMP_'+len;
		combo.options.length= len;
		combo.options[len]	= new Option(name.value.trim(),val);
		combo.selectedIndex = len;
	}

	name.value			= '';
	combo.selectedIndex = -1;
	name.focus();
}

// �ش� ���� ����
function folderDel()
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	var idx		= combo.selectedIndex;

	if(idx < 0) {
		alert('������ ������ ������ �ּ���.');
		combo.focus();
		return;
	}

	var len		= comboOptionCount(combo);
	var name	= f.folderName;

	if(len == 1)
	{
		alert('�ϳ� �϶��� ������ �� �����ϴ�.');
		combo.selectedIndex = -1;
		combo.focus();
		name.value = '';
		return;
	}

	// ��� ����� ���� seq���� ������ ���� ��� ����	
	if(combo[idx].value.substring(0,5) != 'TEMP_')
	{
		if(confirm("������ ���� �Ͻø� ������ ����� ��ǰ�� ���� �˴ϴ�.\n���� �Ͻðڽ��ϱ�?") != true)
		{
			return;
		}

		var f_id = $("FORM_DataPost");
		
		var create_str = '';
		create_str = f_id.innerHTML;

		create_str += "<input type='hidden' name='DELETE_Seq[]' value='"+combo[idx].value+"'>\n";
		f_id.innerHTML += create_str;
		
		//var oInput = document.createElement("<input type='hidden' name='DELETE_Seq[]' value='"+combo[idx].value+"'>");
		//f_id.appendChild(oInput);
	}

	// ���� ��ġ�� �Ʒ��� ���� �ϳ��� ä��.
	for(var i=idx; i<len-1; i++)
	{
		combo.options[i] = new Option(combo.options[i+1].text,combo.options[i+1].value);
	}
	combo.options.length = len-1;
	name.value = '';

	if(combo.options.length < 5) name.disabled = false;
}

// ��ġ����
function changePosition(pos)
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	var idx		= combo.selectedIndex;
	var len		= comboOptionCount(combo);
	var tgt		= 0;

	if(len == 1) return;

	if(pos == 'up')
	{
		if(idx == 0)		return;
		else				tgt = idx-1;
	}
	else
	{
		if(idx == (len-1))	return;
		else				tgt = idx+1;
	}

	swapPosition(combo, idx, tgt);
}

function swapPosition(combo, src, tgt)
{
	var tmpVal, tmpTxt;

	tmpVal = combo.options[src].value;
	tmpTxt = combo.options[src].text;

	combo.options[src] = new Option(combo.options[tgt].text,combo.options[tgt].value);
	combo.options[tgt] = new Option(tmpTxt,tmpVal);

	combo.selectedIndex = tgt;
}


// �ش� ���� Ŭ����
function folderClick(idx)
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	var name	= f.folderName;

	var txt		= combo.options[idx].text;
	var val		= combo.options[idx].value;

	name.disabled = false;
	name.value = txt;	
	name.select();
	name.focus();	
}

function updateChar(str)
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	var idx		= combo.selectedIndex;

	if(idx > -1)
	{
		combo.options[idx].text = str;
	}
}

function checkChar(keyAction,str)
{
	var f	= document.FORM_FolderManager;
	var combo = f.comboFolderList;
	var name = f.folderName;
	var idx = combo.selectedIndex;
	/*
	if(str == sTempWishFolderCreateMessage && keyAction == 'click')
	{
		name.value='';
		combo.options[idx].text = '';
	}
	*/
}

// �����ϱ�
function goMyWishFolderCreate()
{
	var f		= document.FORM_FolderManager;
	var combo	= f.comboFolderList;
	var len		= comboOptionCount(combo);

	var f_id = $("FORM_DataPost");

	var create_str = '';
	create_str = f_id.innerHTML;

	for(var i=0; i<len; i++)
	{
		if (combo.options[i].text.trim() == '' || combo.options[i].value == '')
		{
			alert('�������� �Է��� �ּ���.');
			combo.selectedIndex = i;
			f.folderName.value = '';
			f.folderName.focus();
			return;
		}

		var tmpVal	= combo.options[i].value;
		var tmpTxt	= combo.options[i].text.trim();
		var sortNum	= parseInt(i) + 1;
		var oInput;

		create_str += "<input type='hidden' name='Seq[]' value='"+tmpVal+"'>\n";
		create_str += "<input type='hidden' name='SortNumber[]' value='"+sortNum+"'>\n";
		create_str += "<input type='hidden' name='FolderName[]' value='"+tmpTxt+"'>\n";
		/*
		oInput = document.createElement("<input type='hidden' name='Seq[]' value='"+tmpVal+"'>");
		f_id.appendChild(oInput);
		oInput = document.createElement("<input type='hidden' name='SortNumber[]' value='"+sortNum+"'>");
		f_id.appendChild(oInput);
		oInput = document.createElement("<input type='hidden' name='FolderName[]' value='"+tmpTxt+"'>");
		f_id.appendChild(oInput);
		*/
	}
	f_id.innerHTML += create_str;
	//alert(f_id.innerHTML); return;

	var f2 = document.FORM_DataPost;
	/*
	f2.method = "post";
	f2.action = "/myPage/wishSaveFolder.php";
	f2.submit();
	*/
	f2.action	= "/myPage/wishSaveFolder.php";
	f2.method	= "post";
	f2.target	= "IFR_HiddenWishFolderProc";
	f2.submit();
}

function goMyWishFolderManagerClose()
{
	var lay = $("LAY_WishFolderManager");
	lay.style.left = "-500px";
	lay.style.top = "-500px";
	lay.style.visibility = "hidden";
	lay.style.display = "none";
}
//-->