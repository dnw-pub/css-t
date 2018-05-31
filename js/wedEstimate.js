var nChangeKind =1;

function changeKind(oObj, nKind) {
	$("ul.tabInterface li").removeClass("active");
	$(oObj).addClass("active");
	if(nChangeKind != nKind)
		wedEstimateManager.CHANGE(nKind);
	nChangeKind = nKind;
	return false;
}

function changeKindData(nKind){
	if(nChangeKind != nKind){
		$("ul.tabInterface li").removeClass("active");
		if(nKind == 1)
			$("ul.tabInterface li:first").addClass("active");
		else
			$("ul.tabInterface li:eq(1)").addClass("active");
		wedEstimateManager.CHANGE(nKind);
		nChangeKind = nKind;
	}
	return false;
}

function numberFormat(nPrice){
	var sPrice = '' + nPrice;
    var format = /[^0-9]/g;
    var checkFormat = /(-?[0-9]+)([0-9]{3})/;
    sPrice = sPrice.replace(format,'');              
     while (checkFormat.test(sPrice)) { 
		sPrice = sPrice.replace(checkFormat, "$1,$2"); 
	}
	return sPrice;
}

//새창 열기
function mailOpen(prod_c, cate_c1, cate_c2, cate_c3, cate_c4)
{
	var oDate =new Date();
	var sTime = oDate.getTime();
	if(bLogin == 0){
		alert('로그인 후 사용할 수 있습니다 ');
		return;
	}
	
	if(bEmail == 0){
		if(!confirm('이메일 정보가 없습니다.\n이메일 정보를 수정 하시겠습니까?')){
			return;
		}
		location.replace('http://login.danawa.com/modify_member_info.php'); 
		return;
	}
		
  window.open('wedRecommendMail.php?prod_c='+prod_c+'&cate_c1='+cate_c1+'&cate_c2='+cate_c2+'&cate_c3='+cate_c3+'&cate_c4='+cate_c4 + '&sDate=' + sTime, 'winProdEmail', 'left=22,top=0,width=390,height=460,toolbar=false,menubar=false,status=false,scrollbars=false,resizable=false');
}//end WindowOpen


$(document).ready(function(){
	 // 카테고리 열고 닫기!
	 	$("div.categoryContainer span.rBtn").click(function(){
	 		$(this).parent().toggleClass("open");
		})
	})

	$(document).ready(function(){
		$("span.closePopButton").click(function(){
			$("div.buttonContainer").removeClass("popopen");
		})
		wedFolderManager.Init();
		wedEstimateManager.Init();	
	})
	
	function getFrmProdList(sParam, nCateSeq, sLinkUrl) {
		var sUrl = "/wedding/wedProdList.php?" + sParam;
		$("#frmProdList").attr('src', sUrl);
		$("#cateImg"+nOldSelectCategorySeq).attr('src', "http://img.danawa.com/new/section_m/wedding/img/menu_deco_title_"+nOldSelectCategorySeq+".gif");
		$("#cateImg"+nCateSeq).attr('src', "http://img.danawa.com/new/section_m/wedding/img/menu_deco_title_"+nCateSeq+"_over.gif");
		if(aSelectCateImg[nCateSeq] != "" && aSelectCateImg[nCateSeq]!="http://"){	
			$("#cateMainImg").show();
			$("#cateMainImg").attr('src', aSelectCateImg[nCateSeq]);
		}else
			$("#cateMainImg").hide();
		$("#moreCate").html("더 많은 "+$("#cateImg"+nCateSeq).attr('alt') + " 보러가기");	
		$("#moreCate").attr("href", sLinkUrl);
		nOldSelectCategorySeq = nCateSeq;
		nSelectCategorySeq = nCateSeq;
	}

	function getFrmProdSortList(oObject, sSortMode) {
		var sUrl = "/wedding/wedProdList.php?cateSeq=" + nSelectCategorySeq + "&sortMode=" + sSortMode;
		$(".sortBar > button").removeClass("active");
		$("#frmProdList").attr('src', sUrl);
		
		$(oObject).addClass("active");	
	}

	function putEstimateGoodsList(data) {
		wedEstimateManager.ADDESTIMATEALL(data);
	}

	function deleteSelectGoods() {			
		var bProcess = false;
		$(".selectThis > input[type=checkbox]").each(
			function(index){
				if(this.checked == true) {	
					bProcess = true;	
				}
			}
		)
		if(bProcess == false) {
			alert('삭제할 상품을 선택 하세요');
			return;
		}
		
		if(!confirm('선택하신 상품을 삭제 하시겠습니까?'))
			return;
		$(".selectThis > input[type=checkbox]").each(
			function(index){
				if(this.checked == true) {	
					wedEstimateManager.SELECTDELETE(this, this.value);			
				}
			}
		)
	}

	function selectAllGoods() {
		$(".selectThis > input[type=checkbox]").each(
			function(index){
				if(this.checked == false)
					this.checked = true;
				else
					this.checked = false;
			}
		)
	}

	$(document).ready(function(){
		var ddanjiLayer = $(".registddanji");
		var saveLayer = $(".saveEstimate");
	    $(".ddanjiRegistButton").click(function(){
	    	
	    	if(bLogin == 0){
				alert('로그인 후 딴지 등록을 할 수 있습니다');
				return;
			}
	    	
	    	if(nWedSelectGoodsCnt == 0) {
				alert('등록할 딴지 상품이 없습니다');
				return;
			}
	       $(this).parent().parent().toggleClass("ddanjiopen")
	    })
	    
		$(ddanjiLayer).find(".closePopButton").click(function(){
			$(".ddanjiRegistButton").parent().parent().removeClass();
		})
		$(".saveEstimateButton").click(function(){
			if(bLogin == 0){
				alert('로그인 후 저장할 수 있습니다');
				return;
			}
				
			if((nWedSelectGoodsGiftCnt == 0) && (nWedSelectGoodsCnt == 0)) {
				alert('저장할 상품이 없습니다');
				return;
			}
			$(this).parent().parent().toggleClass("saveopen")
		});
		$(saveLayer).find(".closePopButton").click(function(){
			$('.saveEstimateButton').parent().parent().removeClass("saveopen");
		});
	})

	function pickEstimate() {
		var sTitle = $('#ddanji_titleTextfield').val();
		var sContent = $('#ddanji_titleTextarea').val();
		if(sTitle.length == 0) {
			alert('제목을 작성해 주세요');
			$('#ddanji_titleTextfield').focus();
			return;
		}
		wedEstimateManager.PICKESTMATE(sTitle, sContent);		
	}
	
	
	function cancelFolder() {
		$("div.manageButton").removeClass("popopen");
	}
	
	function cancelDDanji() {
		$(".ddanjiRegistButton").parent().parent().removeClass("ddanjiopen");
	}
		
	function prodImgViewer(sUrl, nProdCode) {
		window.open(sUrl + '?prod_c='+nProdCode, 'winProdEmail', 'left=22,top=0,width=740,height=510,toolbar=false,menubar=false,status=false,scrollbars=false,resizable=false');

		/*
		$("#prodViewForm").attr("action", sUrl);
		document.prodView.prod_c.value = nProdCode;
		$("#prodViewForm").submit();*/
	}
	
	
	/**
	 * 1. 바이트 계산을 하여 글자수 계산을 한다.
	 * 2. nLimitCnt 값이 0이상이면 제한 글자수 까지의 캐릭터 수를 반환한다.
	 * 
	 * @param {string} nChString 글
	 * @param {int} nLimitCnt 제한 글자수 
	 * @reaturn {int} 바이트로 계산된 글자수 
	 */
	function getCountChar(nChString, nLimitCnt) {
		var nChStringCnt	= nChString.length;

		var i = 0;						//반복문 변수
		var nCutByte = 0;				//바이트수 카운터
		var nOneChar, nOneCharAscii;	//바이트 수를 채크하기위한 한글자, 글자당 아스키코드
		var nDpByte;					//표시될 바이트수

		//글자수 카운트
		for(i=0; i<nChStringCnt; i++)
		{		
			nOneChar = nChString.charAt(i);
			nOneCharAscii = escape(nOneChar);
			//한글처리
			if(nOneCharAscii.length > 4)
			{
				nCutByte += 2;
			}else if(nOneCharAscii != "%0D" || nOneCharAscii != "%0A"){ //개행 문자 필터
				nCutByte += 1;
			}//end if
			
			//제한 글자수가 존재하면 제한 글자수 까지의 캐릭터 수를 반환한다.
			if (nLimitCnt > 0 && nCutByte==nLimitCnt) {
				return i;
			}
		}//end for
		
		return nCutByte;
	}

	//글자 수제한 하기
	function getCharByte(nCheckFld, nDpFld, nCutCnt)
	{
		var nChObj	= document.getElementById(nCheckFld);	//체크 대상
		var nDpObj	= (!nDpFld) ? "" : document.getElementById(nDpFld) ;//상태표시 대상

		var nChString		= nChObj.value;
		var nChStringCnt	= nChString.length;

		var i = 0;						//반복문 변수
		var nCutByte = 0;				//바이트수 카운터
		var nOneChar, nOneCharAscii;	//바이트 수를 채크하기위한 한글자, 글자당 아스키코드
		var nDpByte;					//표시될 바이트수

		//바이트로 계산된 글자수 
		nCutByte = getCountChar(nChString);
		
		//글자 제한
		if(nCutByte <= nCutCnt)
		{
			(!nDpFld) ? "" : nDpObj.lastChild.nodeValue = nCutByte ;
			return true;
		}else{
			alert(nCutCnt+"byte 이상은 입력 하실수 없습니다!");

			//제한된 글자까지 자른다.
			nLimitIdx = getCountChar(nChString, nCutCnt);
			nChObj.value = nChString.substr(0,nLimitIdx);

			(!nDpFld) ? "" : nDpObj.lastChild.nodeValue = nCutCnt;
			nChObj.focus();
			return false;
		}//end if
	}//end function getCharByte(nCheckFld,nDpFld,nCutCnt)
	
	
	
	function changeEstimate(oObj){
		var wrapperShortcut = $(".dui-lib-selectbox .dui-lib-selectbox-radioWrapper");
		var str = $(oObj).parent().find("input").attr("value").toString();
		var estimateSeq =  $(oObj).parent().children('input[type=hidden]').val();
		if($('[name=estimateSeq]').val() != estimateSeq) {
			$('[name=estimateSeq]').val(estimateSeq);
			$("input#selectedItem").attr("value", str);
			$.getJSON('wedJSonEstimateGoodsList.php?estimateListSeq='+estimateSeq, function(data) {
			putEstimateGoodsList(data);
			});
		}
		var str = $(oObj).parent().find("input").attr("value").toString();
		$(oObj).parent().parent().parent().find("input.selectedItem").attr("value", str);
		$(wrapperShortcut).removeClass("open");
	}
	
	function changeEstimateSave(oObj) {
		var wrapperShortcut = $(".dui-lib-selectbox .dui-lib-selectbox-radioWrapper");
		var str = $(oObj).parent().find("input").attr("value").toString();
		$(oObj).parent().parent().parent().find("input.selectedItem").attr("value", str);
		var estimateSeq =  $(oObj).parent().children('input[type=hidden]').val();
		$(wrapperShortcut).removeClass("open");
		$("#saveEstimateItem").val(estimateSeq);
		return false;
	}
	
	function cancelSaveEstimate() {
		$('.saveEstimateButton').parent().parent().removeClass("saveopen");
	}
	
	
	function prodViewPrice(sUrl, nProdCode) {
		$("#prodViewForm").attr("action", sUrl);
		document.prodView.pcode.value = nProdCode;
		$("#prodViewForm").submit();
	}
	
	