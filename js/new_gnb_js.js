	function checkSearchForm(frm) {
		if (frm.k1.value == "") {
			frm.k1.value = "";
			alert('�˻�� �Է��ϼ���.');
			frm.k1.focus();
			return false;
		} else {
			return true;
		}//end if
	}//end function
	
	// �ε��� �˻�â�� ��Ŀ�� ����
	document.onkeydown = SearchEventKeyHandler; 