<!--
		//adv_srch_url 변수가 선언되었다면
		if(window.adv_srch_url != null) {
			search_keyword_rand(document.srchFRM_TOP.k1);
		}//end if

		if(window.adv_srch_view != null) {
			document.write("<iframe name=viewad src=\"http://www.danawa.com/includes/view_ad.php?"+adv_srch_view+"\" topmargin=\"0\" leftmargin=\"0\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" scrolling=\"no\" width=\"0\" height=\"0\"></iframe>");
		}//end if

		function checkSearchForm(f) {
			if (srch_keyword2) {
				window.open(srch_keyword2);
				search_clear(f.k1);
				return false;
			}//end if

			if (!f.k1.value) {
				alert("검색어를 입력하세요.");
				f.k1.focus();
				return false;
			}//end if

			AKCResultFrame.QuerySave();
			return true;
		}//end function checkSearchForm(f)

		function search_clear(obj){
			if (c2) return;
			srch_keyword2 = '';
			obj.style.backgroundColor = '#FFFFFF';
			obj.style.backgroundImage='';
			obj.value='';
			c2 = true;
		}//end function

		function setSearchParameter(tabName) {
			var module = document.getElementById('module');
			var act = document.getElementById('act');

			if(tabName == "Main") {
				module.value ="goods";
				act.value ="dispMain";
			} else if(tabName == "Goods") {
				module.value ="goods";
				act.value ="dispGoodsList";
			} else if(tabName == "Market") {
				module.value ="market";
				act.value ="dispMarketList";
			} else {
				module.value ="community";
				act.value ="disp" + tabName + "List";
			}

		}// end function

		// 로딩시 검색창에 포커스 설정
		document.onkeydown = SearchEventKeyHandler;
//-->
	