	function checkSearchForm(frm) {
		if (frm.k1.value == "") {
			frm.k1.value = "";
			alert('검색어를 입력하세요.');
			frm.k1.focus();
			return false;
		} else {
			return true;
		}//end if
	}//end function
	
	// 로딩시 검색창에 포커스 설정
	document.onkeydown = SearchEventKeyHandler; 