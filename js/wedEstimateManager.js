<!--


function stripHTML(sString) { 
	var oStrip = new RegExp(); 
	oStrip = /[<][^>]*[>]/gi; 
	return sString.replace(oStrip, ""); 
} 



Array.prototype.remove = function(index){
   var aTempArray = new Array();
   var nArrayLen = this.length;
   while(nArrayLen > index){
	   var nTempValue = this.pop();
	   aTempArray.push(nTempValue);
	   nArrayLen--;
   }

	for(var i=aTempArray.length - 2; i>=0; i--){
		this.push(aTempArray[i]);
	}
}

var wedEstimateManager =
{
		ObjTable		: null,
		ObjForm			: null,
		ObjSelectCount	: null,
		ObjGeneralCount : null,
		ObjSelectPrice	: null,
		ObjGeneralPrice : null,
		ChangeKind		: 1,
			
		Init			: function ()
		{
			this.ObjTable  = $('#estimateListTable');
			this.ObjForm  = $('#estimateGoodsForm');
			this.ObjSelectCount	= $('#selectCount');
			this.ObjGeneralCount = $('#generalCount');
			this.ObjSelectPrice	= $('#selectPrice');
			this.ObjGeneralPrice = $('#generalPrice');
			if(nWedSelectGoodsCnt > 0){
				this.InsertAll();
				this.checkCount();
			}
		},
		
		ADD				: function (nGoodsPos, nMallPrice, nMinPrice, sMallCode)
		{
			this.InsertRow(nGoodsPos, nMallPrice, nMinPrice, sMallCode);
		},
		
		
		ADDGIFT			: function (nGoodsPos, nMallPrice, nMinPrice, sMallCode)
		{
			this.InsertRowGift(nGoodsPos, nMallPrice, nMinPrice, sMallCode);
		}, 
		
		SELECTDELETE	: function (oObj, goodsCode) {
			if(this.ChangeKind == 1) {
				this.DELETE(oObj, 0, goodsCode);
				
			}else {
				this.DELETEGIFT(oObj, 0, goodsCode);
			}
		},
		
		
		DeleteUniqCate	: function (nCate) {
			for(var i=0; i<nUniqCategoryCnt; i++){
				if(aUniqCategory[i] == nCate){
					aUniqCategory.remove(i);
					nUniqCategoryCnt--;
					break;
				}
				
			}
		},
		
		PICKESTMATE 	: function (sTitle, sContent) {
				
			if(nWedSelectGoodsCnt == 0) {
				alert('������ ��ǰ�� �����ϴ�');
				return;
			}
			
			var bIsCate;
			var	sElement;
			var goodsName;
			var goodsCode;
			var goodsCateC1;
			var goodsCateC2;
			var goodsCateC3;
			var goodsCateC4;
			var goodsImg;
			var goodsImgM;
			var goodsDesc;
			var mallCode;	
			var categoryName;
			var nTotalMinPrice = 0; 
			var nTotalMallPrice = 0; 
			var nMinCnt =0;
			var nMallCnt =0;
			var bIsCate;
			
			sElement = '';
			
			for(var j=0; j<nUniqCategoryCnt; j++){				
				sElement +=' <div class="categoryContainer">\n';
				bIsCate = false;
				
				for(var i=0; i<nWedSelectGoodsCnt; i++) {	
					if(aWedSelectGoodsCategory[i] == aUniqCategory[j]){
						goodsName = aWedGoodsName[i];
						goodsCode = aWedSelectGoodsCodes[i];
						goodsCateC1 = aCategory1[i];
						goodsCateC2 = aCategory2[i];
						goodsCateC3 = aCategory3[i];
						goodsCateC4 = aCategory4[i];
						goodsImg = aGoodsImg[i];
						goodsDesc = aGoodsDesc[i];
						mallCode = aMallCode[i];
						goodsImgM = aGoodsImgM[i];
						categoryName = aWedCategoryName[i];		
						nTotalMinPrice += aWedGeneralPrice[i];
						nTotalMallPrice += aWedSelectPrice[i];
						
						if(aWedGeneralPrice[i] > 0) {
							nMinCnt++;
						}
						
						if(aWedSelectPrice[i] > 0) {
							nMallCnt++;
						}
						
						if(bIsCate == false){
							bIsCate = true;
							sElement +='<h3>'+aWedCategoryName[i]+'</h3>\n';
						}
						
						sElement +=' <div class="productlist">\n';
						sElement +='<a href="http://prod.danawa.com/info/?pcode='+goodsCode+'" class="productTitle" target="_blank" ><img src="'+goodsImgM+'" alt="" /><strong>'+goodsName+'</strong></a>\n';
						sElement +='<p class="specSummary"><a href="http://prod.danawa.com/info/?pcode='+goodsCode+'"  target="_blank">'+goodsDesc+'</a></p>\n';
						sElement +='<dl class="price">\n';
						sElement +='<dt><img src="http://timg.danawa.com/cmpny_info/images/basic_logo.gif" alt="" /></dt><dd><em>'+numberFormat(aWedGeneralPrice[i])+'</em>��</dd>\n';
						if(aWedSelectPrice[i] > 0){
							sElement +='<dt><img src="http://timg.danawa.com/cmpny_info/images/'+mallCode+'_logo.gif" alt="" />';
							sElement +='</dt><dd><em>'+numberFormat(aWedSelectPrice[i])+'</em>��</dd>\n';	
						}
						sElement += '<input type="hidden" id="goodsCode'+goodsCode+'" name="goodsCode[]" value="'+goodsCode+'" />\n';
						sElement += '<input type="hidden" id="goodsName'+goodsCode+'" name="goodsName[]" value="'+goodsName+'" />\n';
						sElement += '<input type="hidden" id="mallCode'+goodsCode+'" name="mallCode[]" value="'+mallCode+'" />\n';
						sElement += '<input type="hidden" id="goodsDesc'+goodsCode+'" name="goodsDesc[]" value="'+goodsDesc+'" />\n';	
						sElement += '<input type="hidden" id="goodsImg'+goodsCode+'" name="goodsImg[]" value="'+goodsImg+'" />\n';
						sElement += '<input type="hidden" id="goodsImgM'+goodsCode+'" name="goodsImgM[]" value="'+goodsImgM+'" />\n';
						sElement += '<input type="hidden" id="goodsCateC1'+goodsCode+'" name="goodsCateC1[]" value="'+goodsCateC1+'" />\n';	
						sElement += '<input type="hidden" id="goodsCateC2'+goodsCode+'" name="goodsCateC2[]" value="'+goodsCateC2+'" />\n';
						sElement += '<input type="hidden" id="goodsCateC3'+goodsCode+'" name="goodsCateC3[]" value="'+goodsCateC3+'" />\n';
						sElement += '<input type="hidden" id="goodsCateC4'+goodsCode+'" name="goodsCateC4[]" value="'+goodsCateC4+'" />\n';
						sElement += '<input type="hidden" id="categoryName'+goodsCode+'" name="categoryName[]" value="'+categoryName+'" />\n';
						sElement += '<input type="hidden" id="minPrice'+goodsCode+'" name="minPrice[]" value="'+aWedGeneralPrice[i]+'" />\n';
						sElement += '<input type="hidden" id="mallPrice'+goodsCode+'" name="mallPrice[]" value="'+aWedSelectPrice[i]+'" />\n';
						sElement += '<input type="hidden" id="categorySeq'+goodsCode+'" name="categorySeq[]" value="'+aWedSelectGoodsCategory[i]+'" />\n';
						sElement +='</dl>';
						sElement +='</dl>';
						sElement +='</div>';
					}		
					 	// ī�װ� ���� �ݱ�!
				}
				sElement +='</div>\n';	
			}
			
			var sHeader = '<div class="inner_estimateLayer">\n';
				sHeader +='<dl class="estimate_result">\n';
				sHeader +='<dt class="normal">�Ϲݸ� ������ [<em>'+nMinCnt+'</em>��]</dt>\n';
				sHeader +='<dd class="normal"><em>'+numberFormat(nTotalMinPrice)+'</em>��</dd>\n';
				sHeader +='<dt>���ո� ������ [<em>'+nMallCnt+'</em>��]</dt>\n';
				sHeader +='<dd><em>'+numberFormat(nTotalMallPrice)+'</em>��</dd>\n';
				sHeader +='</dl>\n';
			
			sElement = stripHTML(sContent) + sHeader  + sElement + '</div>';
			document.putEstimateBoardForm.sContent.value = sElement;
			document.putEstimateBoardForm.sTitle.value = stripHTML(sTitle);
			document.putEstimateBoardForm.submit();
								
	},

	CHECKPRINT		: function() {
		var bCheckPrint = false;
		
		if(this.ChangeKind ==1){
			
			if(nWedSelectGoodsCnt == 0){
				alert('����� ��ǰ�� ������ �ֽñ� �ٶ��ϴ�');
				return;
			}
			
			var oForm = $('#estimatePrintTable');
			oForm.children("input[type=hidden]").remove();
			$(".selectThis > input[type=checkbox]").each(
				function(index){
					if(this.checked == true) {
						
						var nGoodsSeq =this.value;
						for(var i=0; i<nWedSelectGoodsCnt; i++) {
							if(aWedSelectGoodsCodes[i] == nGoodsSeq) {
								bCheckPrint = true;
								var sElement = '<input type="hidden" name="goodsCode[]" value="'+nGoodsSeq+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsName[]" value="'+aWedGoodsName[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="mallCode[]" value="'+aMallCode[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsDesc[]" value="'+aGoodsDesc[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsImg[]" value="'+aGoodsImg[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsImgM[]" value="'+aGoodsImgM[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC1[]" value="'+aCategory1[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC2[]" value="'+aCategory2[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC3[]" value="'+aCategory3[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC4[]" value="'+aCategory4[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="categoryName[]" value="'+aWedCategoryName[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="minPrice[]" value="'+aWedGeneralPrice[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="mallPrice[]" value="'+aWedSelectPrice[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="categorySeq[]" value="'+aWedSelectGoodsCategory[i]+'" />';
								oForm.append(sElement);
								break;
							}
						}
					}
				}
			)
		}else{
			
			if(nWedSelectGoodsGiftCnt == 0){
				alert('����� ��ǰ�� ������ �ֽñ� �ٶ��ϴ�');
				return;
			}
			
			var oForm = $('#estimatePrintTable');
			oForm.children("input[type=hidden]").remove();
			$(".selectThis > input[type=checkbox]").each(
				function(index){
					if(this.checked == true) {
						var nGoodsSeq =this.value;
						for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
							if(aWedSelectGoodsCodesGift[i] == nGoodsSeq) {
								bCheckPrint = true;
								var sElement = '<input type="hidden" name="goodsCode[]" value="'+nGoodsSeq+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsName[]" value="'+aWedGoodsNameGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="mallCode[]" value="'+aMallCodeGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsDesc[]" value="'+aGoodsDescGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsImg[]" value="'+aGoodsImgGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsImgM[]" value="'+aGoodsImgMGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC1[]" value="'+aCategoryGift1[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC2[]" value="'+aCategoryGift2[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC3[]" value="'+aCategoryGift3[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="goodsCateC4[]" value="'+aCategoryGift4[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="categoryName[]" value="'+aWedCategoryNameGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="minPrice[]" value="'+aWedGeneralPriceGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="mallPrice[]" value="'+aWedSelectPriceGift[i]+'" />';
								oForm.append(sElement);
								sElement = '<input type="hidden" name="categorySeq[]" value="'+aWedSelectGoodsCategoryGift[i]+'" />';
								oForm.append(sElement);
								break;
							}
						}
					}
				}
			)
		}
		
		if(bCheckPrint == false){
			alert('����Ʈ �� ��ǰ�� ������ �ֽʽÿ�');
			return;
		}
		oForm.submit();
	},
	
	
	DELETE			: function (oObj, parentDl, goodsCode) {
			
			var nCategorySeq =0;
			var bCategory = false;
			
			for(var i=0; i<nWedSelectGoodsCnt; i++) {
				
				if(aWedSelectGoodsCodes[i] == goodsCode) {
					nCategorySeq = aWedSelectGoodsCategory[i];
					aWedSelectGoodsCodes.remove(i);
					aWedSelectGoodsCategory.remove(i);
					aWedGeneralPrice.remove(i);
					aWedSelectPrice.remove(i);
					aWedGoodsName.remove(i);
					aWedCategoryName.remove(i);
					aGoodsDesc.remove(i);
					aCategory1.remove(i);
					aCategory2.remove(i);
					aCategory3.remove(i);
					aCategory4.remove(i);
					aGoodsImg.remove(i);
					aGoodsImgM.remove(i);
					nWedSelectGoodsCnt--;
					break;
				}
			}
			
			for(var i=0; i<nWedSelectGoodsCnt; i++) {
				if(aWedSelectGoodsCategory[i] == nCategorySeq) {
					bCategory = true;
					break;
				}
			}
		
			if(bCategory) {
				$(oObj).parents('dl').remove();
			}else {
				$(oObj).parents('div .categoryContainer').remove();	
				this.DeleteUniqCate(nCategorySeq);
			}	
			this.checkCount();
		},			
		
		DELETEGIFT			: function (oObj, parentDl, goodsCode) {
			
			var nCategorySeq =0;
			var bCategory = false;
			
			for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
				
				if(aWedSelectGoodsCodesGift[i] == goodsCode) {
					nCategorySeq = aWedSelectGoodsCategoryGift[i];
					aWedSelectGoodsCodesGift.remove(i);
					aWedSelectGoodsCategoryGift.remove(i);
					aWedGeneralPriceGift.remove(i);
					aWedSelectPriceGift.remove(i);
					aWedGoodsNameGift.remove(i);
					aWedCategoryNameGift.remove(i);
					aCategoryGift1.remove(i);
					aCategoryGift2.remove(i);
					aCategoryGift3.remove(i);
					aCategoryGift4.remove(i);
					aGoodsImgGift.remove(i);
					nWedSelectGoodsGiftCnt--;
					break;
				}
			}
			
			
			for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
				
				if(aWedSelectGoodsCategoryGift[i] == nCategorySeq) {
					bCategory = true;
					break;
				}
			}
		
			if(bCategory) {
				$(oObj).parents('dl').remove();
			}else {
				$(oObj).parents('div .categoryContainer').remove();	
			}	
			this.checkCount();
		},			
		
		ADDESTIMATEALL			: function (data) {
			$('div .categoryContainer').each(
					function () {
						$(this).remove();
					}
			)
			
			$("ul.tabInterface li").removeClass("active");
			$("ul.tabInterface li:first").addClass("active");
			
			nChangeKind =1;
			this.ChangeKind =1;
			
			for(var i=0; i<nWedSelectGoodsCnt; i++) {
				
					aWedSelectGoodsCodes.remove(i);
					aWedSelectGoodsCategory.remove(i);
			}
			nWedSelectGoodsCnt =0;
	
			for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
				
				aWedSelectGoodsCodesGift.remove(i);
				aWedSelectGoodsCategoryGift.remove(i);
			}
			nWedSelectGoodsGiftCnt =0;
			if(data != 0)	
				this.InsertEstimateAll(data);
			else
				this.checkCount();
		},
		
		
		CHANGE			: function (bGift) {
			$('div .categoryContainer').each(
					function () {
						$(this).remove();
					}
			)
			this.ChangeKind = bGift;
			nUniqCategoryCnt =0;
			if(bGift == 1)
				this.InsertAll();
			else 
				this.InsertGiftAll();
			
			this.checkCount();
		},
		
		CHECKED			:		function () {
			this.checkCount();
		},
		
		
		InsertEstimateAll		: function (data) {
			var nGoodsCnt = data.prodCnt;
			
			var sGoodsCode;
			var nCategory;
			var sCategoryName;
			var nGiftType;
			var sGoodsName;
			var nMinPrice;
			var nMallPrice;
			var nCategory1; 
			var nCategory2; 
			var nCategory3; 
			var nCategory4; 
			var sProdImg;
			var sMallCode;
			var sGoodsDesc;
			var bIsCate;
			var	sElement;
			var sProdImgM;
			
			nUniqCategoryCnt =0;
			for(var i=0; i < nGoodsCnt; i++) {
				sGoodsCode = data.prodList[i].goodsCode;
				nCategory = data.prodList[i].category;
				sCategoryName = decodeURIComponent(data.prodList[i].categoryName);
				nGiftType = data.prodList[i].giftType;
				sGoodsName = decodeURIComponent(data.prodList[i].goodsName);
				sGoodsDesc = decodeURIComponent(data.prodList[i].goodsDesc);
				nMinPrice = data.prodList[i].minPrice;
				nMallPrice = data.prodList[i].mallPrice;
				
				nCategory1 = data.prodList[i].category1; 
				nCategory2 = data.prodList[i].category2;
				nCategory3 = data.prodList[i].category3; 
				nCategory4 = data.prodList[i].category4; 
				sProdImg = 	data.prodList[i].prodImg; 
				sMallCode = data.prodList[i].mallCode;
				sProdImgM = data.prodList[i].prodImgM;
				if(nGiftType == 1){		
					bIsCate = false;
					if(nWedSelectGoodsCnt > 0 ){
						for(var j=0; j<nWedSelectGoodsCnt; j++) {		
							if(aWedSelectGoodsCategory[j] == nCategory) {
								bIsCate = true;
								break;
							}
						}
					}
					sElement = '';
					if(bIsCate == false) {
						sElement =' <div class="categoryContainer open">';
						sElement +='<h3>'+sCategoryName+'</h3>';
					}
					sElement +='<dl class="productIn" >';
					sElement +='<dt><a href="#" ><img src="'+sProdImg+'" alt="" /><strong>'+sGoodsName+'</strong></a></dt>';
					sElement +='<dd class="price"><p class="normall">�Ϲݸ��� : <em>'+numberFormat(nMinPrice)+'��</em></p><p>���ո��� : <em>'+numberFormat(nMallPrice)+'��</em></p></dd>';
					sElement +='<dd class="buttons"><span class="selectThis"><input type="checkbox" checked="checked" value="'+sGoodsCode+'" onclick="wedEstimateManager.CHECKED();"/></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedEstimateManager.DELETE(this,'+bIsCate+','+sGoodsCode+');">����</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="prodViewPrice(\'http://prod.danawa.com/info/?\', '+sGoodsCode+')">���ݺ�</button></span></dd>';
					sElement +='<input type="hidden" name="goodsSeq[]" value="'+sGoodsCode+'" />';		
					sElement +='<input type="hidden" name="goodsDesc[]" value="'+sGoodsDesc+'" />';	
					sElement +='<input type="hidden" name="goodsName[]" value="'+sGoodsName+'" />';
					sElement +='</dl>';
					if(bIsCate == false) {		
						
						sElement +='<span class="rBtn" id="productIn'+nCategory+'"></span>';
						sElement +='</div>';
						this.ObjTable.append(sElement);
						
						aUniqCategory[nUniqCategoryCnt] =  nCategory;
						nUniqCategoryCnt++;		
					 	// ī�װ� ���� �ݱ�!
					 	$("#productIn"+nCategory).click(function(){
					 		$(this).parent().toggleClass("open");
					 	})
					}else {
						$("#productIn"+nCategory).before(sElement);
					}
					
					aWedSelectGoodsCategory[nWedSelectGoodsCnt] = nCategory;
					aWedSelectGoodsCodes[nWedSelectGoodsCnt] = sGoodsCode;
					aWedGeneralPrice[nWedSelectGoodsCnt] = nMinPrice;
					aWedSelectPrice[nWedSelectGoodsCnt] =  nMallPrice;
					aMallCode[nWedSelectGoodsCnt]		=  sMallCode;
					aGoodsDesc[nWedSelectGoodsCnt]		=  sGoodsDesc;
					aWedGoodsName[nWedSelectGoodsCnt] = sGoodsName;
					aWedCategoryName[nWedSelectGoodsCnt] = sCategoryName;
					aCategory1[nWedSelectGoodsCnt] = nCategory1;
					aCategory2[nWedSelectGoodsCnt] = nCategory2;
					aCategory3[nWedSelectGoodsCnt] = nCategory3;
					aCategory4[nWedSelectGoodsCnt] = nCategory4;
					aGoodsImg[nWedSelectGoodsCnt] = sProdImg;
					aGoodsImgM[nWedSelectGoodsCnt] = sProdImgM;
					nWedSelectGoodsCnt++;
				} else {
					aWedSelectGoodsCategoryGift[nWedSelectGoodsGiftCnt] = nCategory;
					aWedSelectGoodsCodesGift[nWedSelectGoodsGiftCnt] = sGoodsCode;
					
					aWedGeneralPriceGift[nWedSelectGoodsGiftCnt] = nMinPrice;
					aWedSelectPriceGift[nWedSelectGoodsGiftCnt] =  nMallPrice;
					aGoodsDescGift[nWedSelectGoodsGiftCnt] = sGoodsDesc;
					aWedGoodsNameGift[nWedSelectGoodsGiftCnt] = sGoodsName;
					aWedCategoryNameGift[nWedSelectGoodsGiftCnt] = sCategoryName;
					aCategoryGift1[nWedSelectGoodsGiftCnt] = nCategory1;
					aCategoryGift2[nWedSelectGoodsGiftCnt] = nCategory2;
					aCategoryGift3[nWedSelectGoodsGiftCnt] = nCategory3;
					aCategoryGift4[nWedSelectGoodsGiftCnt] = nCategory4;
					aGoodsImgGift[nWedSelectGoodsGiftCnt] = sProdImg;
					aMallCodeGift[nWedSelectGoodsGiftCnt] = sMallCode;
					aGoodsImgMGift[nWedSelectGoodsCnt] = sProdImgM;
					nWedSelectGoodsGiftCnt++;		
				}
			}
			this.checkCount();
		},
		
		InsertAll		: function () {
			var bIsCate;
			var	sElement;
			
			var goodsName;
			var goodsCode;
			var goodsCateC1;
			var goodsCateC2;
			var goodsCateC3;
			var goodsCateC4;
			var goodsImg ;
			var goodsDesc;
			
			nUniqCategoryCnt = 0;
			
			for(var i=0; i<nWedSelectGoodsCnt; i++) {
				bIsCate = false;
				if(i > 0 ){
					for(var j=0; j<i; j++) {		
						if(aWedSelectGoodsCategory[j] == aWedSelectGoodsCategory[i]) {
							bIsCate = true;
							break;
						}
					}
				}
			
				goodsName = aWedGoodsName[i];
				goodsCode = aWedSelectGoodsCodes[i];
				goodsCateC1 = aCategory1[i];
				goodsCateC2 = aCategory2[i];
				goodsCateC3 = aCategory3[i];
				goodsCateC4 = aCategory4[i];
				goodsImg = aGoodsImg[i];
				goodsDesc = aGoodsDesc[i];
				
				sElement = '';
				
				if(bIsCate == false) {
					sElement =' <div class="categoryContainer open">';
					sElement +='<h3>'+aWedCategoryName[i]+'</h3>';
					aUniqCategory[nUniqCategoryCnt] =  aWedSelectGoodsCategory[i];
					nUniqCategoryCnt++;		
				}
						
				sElement +='<dl class="productIn" >';
				sElement +='<dt><a href="#" ><img src="'+goodsImg+'" alt="" /><strong>'+goodsName+'</strong></a></dt>';
				sElement +='<dd class="price"><p class="normall">�Ϲݸ��� : <em>'+numberFormat(aWedGeneralPrice[i])+'��</em></p><p>���ո��� : <em>'+numberFormat(aWedSelectPrice[i])+'��</em></p></dd>';
				sElement +='<dd class="buttons"><span class="selectThis"><input type="checkbox" checked="checked" value="'+aWedSelectGoodsCodes[i]+'" onclick="wedEstimateManager.CHECKED();"/></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedEstimateManager.DELETE(this,'+bIsCate+','+goodsCode+');">����</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="prodViewPrice(\'http://prod.danawa.com/info/?\', '+goodsCode+')">���ݺ�</button></span></dd>';
				sElement +='<input type="hidden" name="goodsSeq[]" value="'+goodsCode+'" />';		
				sElement +='<input type="hidden" name="goodsDesc[]" value="'+goodsDesc+'" />';
				sElement +='<input type="hidden" name="goodsName[]" value="'+goodsName+'" />';
				sElement +='</dl>';
				if(bIsCate == false) {		
					sElement +='<span class="rBtn" id="productIn'+aWedSelectGoodsCategory[i]+'"></span>';
					sElement +='</div>';
					this.ObjTable.append(sElement);
				 	// ī�װ� ���� �ݱ�!
				 	$("#productIn"+aWedSelectGoodsCategory[i]).click(function(){
				 		$(this).parent().toggleClass("open");
				 	})
				}else {
					$("#productIn"+aWedSelectGoodsCategory[i]).before(sElement);
				}
				
			}
		},
		
		
		InsertGiftAll		: function () {
			var bIsCate;
			var	sElement;
			var goodsName;
			var goodsCode;
			var goodsCateC1;
			var goodsCateC2;
			var goodsCateC3;
			var goodsCateC4;
			var goodsImg ; 
			
			for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
				bIsCate = false;				
				if(i > 0 ){
					for(var j=0; j<i; j++) {		
						if(aWedSelectGoodsCategoryGift[j] == aWedSelectGoodsCategoryGift[i]) {
							bIsCate = true;
							break;
						}
					}
				}			
				
				
				goodsName = aWedGoodsNameGift[i];
				goodsCode = aWedSelectGoodsCodesGift[i];
				goodsCateC1 = aCategoryGift1[i];
				goodsCateC2 = aCategoryGift2[i];
				goodsCateC3 = aCategoryGift3[i];
				goodsCateC4 = aCategoryGift4[i];
				goodsImg = aGoodsImgGift[i];
			
				
				sElement = '';
				if(bIsCate == false) {
					sElement =' <div class="categoryContainer open">';
					sElement +='<h3>'+aWedCategoryNameGift[i]+'</h3>';
				}
				
				sElement +='<dl class="productIn" >';
				sElement +='<dt><a href="#"><img src="'+goodsImg+'" alt="" /><strong>'+goodsName+'</strong></a></dt>';
				sElement +='<dd class="price"><p class="normall">�Ϲݸ��� : <em>'+numberFormat(aWedGeneralPriceGift[i])+'��</em></p><p>���ո��� : <em>'+numberFormat(aWedSelectPriceGift[i])+'��</em></p></dd>';
				sElement +='<dd class="buttons"><span class="selectThis"><input type="checkbox" checked="checked" value="'+aWedSelectGoodsCodesGift[i]+'" onclick="wedEstimateManager.CHECKED();"/></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedEstimateManager.DELETEGIFT(this,'+bIsCate+','+goodsCode+');">����</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="prodViewPrice(\'http://prod.danawa.com/info/?\', '+goodsCode+')">���ݺ�</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="mailOpen('+aWedSelectGoodsCodesGift[i]+','+goodsCateC1+','+goodsCateC2+','+goodsCateC3+','+goodsCateC4+');">��������!</button></span></dd>';
				sElement +='<input type="hidden" name="goodsSeqGift[]" value="'+goodsCode+'" />';		
				sElement +='<input type="hidden" name="goodsNameGift[]" value="'+goodsName+'" />';
				sElement +='</dl>';
				
				if(bIsCate == false) {		
					sElement +='<span class="rBtn" id="productIn'+aWedSelectGoodsCategoryGift[i]+'"></span>';
					sElement +='</div>';
					this.ObjTable.append(sElement);
				 	// ī�װ� ���� �ݱ�!
				 	$("div.categoryContainer span.rBtn").click(function(){
				 		$(this).parent().toggleClass("open");
				 	})
				}else {
					$("#productIn"+aWedSelectGoodsCategoryGift[i]).before(sElement);
				}
				
			}
		},
		
		InsertRow		: function (nGoodsPos, nMallPrice, nMinPrice, sMallCode)
		{
			var goodsName = oCategoryGoodsList.prodList[nGoodsPos].prodName;
			var goodsCode = oCategoryGoodsList.prodList[nGoodsPos].prodCode;
			var goodsCateC1 = oCategoryGoodsList.prodList[nGoodsPos].cateC1;
			var goodsCateC2 = oCategoryGoodsList.prodList[nGoodsPos].cateC2;
			var goodsCateC3 = oCategoryGoodsList.prodList[nGoodsPos].cateC3;
			var goodsCateC4 = oCategoryGoodsList.prodList[nGoodsPos].cateC4;
			var goodsImg = 	oCategoryGoodsList.prodList[nGoodsPos].prodImg_S;
			var goodsDesc = oCategoryGoodsList.prodList[nGoodsPos].mobilePriceUsr;
			var goodsImgM = oCategoryGoodsList.prodList[nGoodsPos].prodImg_M;
			var bIsCate = false;
			
			if(!goodsDesc)
				 goodsDesc = oCategoryGoodsList.prodList[nGoodsPos].mobilePrice;
			if(nWedSelectGoodsCnt == 0)
				nUniqCategoryCnt =0;
			
			if(oCategoryGoodsList.prodList[nGoodsPos].prodUsrName.length > 0)
				goodsName =oCategoryGoodsList.prodList[nGoodsPos].prodUsrName;
			
			for(var i=0; i<nWedSelectGoodsCnt; i++) {
				if(aWedSelectGoodsCodes[i] == oCategoryGoodsList.prodList[nGoodsPos].prodCode) {
					alert('������ ��ǰ�� ������ �� �����ϴ�.');
					return;
				}
				
				if(aWedSelectGoodsCategory[i] == nSelectCategorySeq) {
					bIsCate = true;
				}
			}
			
			aWedSelectGoodsCodes[nWedSelectGoodsCnt] = oCategoryGoodsList.prodList[nGoodsPos].prodCode;
			aWedSelectGoodsCategory[nWedSelectGoodsCnt] = nSelectCategorySeq ; 
			aWedGeneralPrice[nWedSelectGoodsCnt] = nMinPrice;
			aWedSelectPrice[nWedSelectGoodsCnt] = nMallPrice;
			
			aWedGoodsName[nWedSelectGoodsCnt] 		= goodsName;
			
			aCategory1[nWedSelectGoodsCnt] 		= goodsCateC1;
			aCategory2[nWedSelectGoodsCnt] 		= goodsCateC2;
			aCategory3[nWedSelectGoodsCnt] 		= goodsCateC3;
			aCategory4[nWedSelectGoodsCnt] 		= goodsCateC4;
			aGoodsDesc[nWedSelectGoodsCnt]		= goodsDesc;
			aMallCode[nWedSelectGoodsCnt] 		= sMallCode;
			aGoodsImgM[nWedSelectGoodsCnt] 		= goodsImgM;
		
			aWedCategoryName[nWedSelectGoodsCnt]	= $('#selectCateName').val();
			aGoodsImg[nWedSelectGoodsCnt] = goodsImg;
			
			nWedSelectGoodsCnt++;
			
			if(this.ChangeKind != 1)
				return;
			
			var	sElement = "";
			
			
			if(bIsCate == false) {
				aUniqCategory[nUniqCategoryCnt] = nSelectCategorySeq;
				nUniqCategoryCnt++;
				sElement =' <div class="categoryContainer open">';
				sElement +='<h3>'+$('#selectCateName').val()+'</h3>';
			}
			
			sElement +='<dl class="productIn" >';
			sElement +='<dt><a href="#"><img src="'+goodsImg+'" alt="" /><strong>'+goodsName+'</strong></a></dt>';
			sElement +='<dd class="price"><p class="normall">�Ϲݸ��� : <em>'+numberFormat(nMinPrice)+'��</em></p><p>���ո��� : <em>'+numberFormat(nMallPrice)+'��</em></p></dd>';
			sElement +='<dd class="buttons"><span class="selectThis"><input type="checkbox" checked="checked" value="'+oCategoryGoodsList.prodList[nGoodsPos].prodCode+'" onclick="wedEstimateManager.CHECKED();"/></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedEstimateManager.DELETE(this,'+bIsCate+','+goodsCode+');">����</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="prodViewPrice(\'http://prod.danawa.com/info/?\', '+goodsCode+')">���ݺ�</button></span></dd>';
			sElement +='<input type="hidden" name="goodsName[]" value="'+goodsName+'" />';
			sElement +='<input type="hidden" name="goodsSeq[]" value="'+goodsCode+'" />';		
			sElement +='<input type="hidden" name="goodsDesc[]" value="'+goodsDesc+'" />';	
			sElement +='</dl>';
			if(bIsCate == false) {		
				sElement +='<span class="rBtn" id="productIn'+nSelectCategorySeq+'"></span>';
				sElement +='</div>';
				this.ObjTable.append(sElement);
			 	// ī�װ� ���� �ݱ�!
			 	$("#productIn"+nSelectCategorySeq).click(function(){
			 		$(this).parent().toggleClass("open");
			 	})
			}else {
				$("#productIn"+nSelectCategorySeq).before(sElement);
			}
			this.checkCount();
		},
		
		
		InsertRowGift		: function (nGoodsPos, nMallPrice, nMinPrice, sMallCode)
		{
			var goodsName = oCategoryGoodsList.prodList[nGoodsPos].prodName;
			var goodsCode = oCategoryGoodsList.prodList[nGoodsPos].prodCode;
			var goodsCateC1 = oCategoryGoodsList.prodList[nGoodsPos].cateC1;
			var goodsCateC2 = oCategoryGoodsList.prodList[nGoodsPos].cateC2;
			var goodsCateC3 = oCategoryGoodsList.prodList[nGoodsPos].cateC3;
			var goodsCateC4 = oCategoryGoodsList.prodList[nGoodsPos].cateC4;
			
			var goodsImg = 	oCategoryGoodsList.prodList[nGoodsPos].prodImg_S;
			var goodsImgM = oCategoryGoodsList.prodList[nGoodsPos].prodImg_M;
			var goodsDesc = oCategoryGoodsList.prodList[nGoodsPos].mobilePriceUsr;
			var bIsCate = false;
			
			if(!goodsDesc)
				 goodsDesc = oCategoryGoodsList.prodList[nGoodsPos].mobilePrice;
			
			for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
				if(aWedSelectGoodsCodesGift[i] == oCategoryGoodsList.prodList[nGoodsPos].prodCode) {
					alert('������ ��ǰ�� ������ �� �����ϴ�.');
					return;
				}
				
				if(aWedSelectGoodsCategoryGift[i] == nSelectCategorySeq) {
					bIsCate = true;
				}
			}
			
			aWedSelectGoodsCodesGift[nWedSelectGoodsGiftCnt] = oCategoryGoodsList.prodList[nGoodsPos].prodCode;
			aWedSelectGoodsCategoryGift[nWedSelectGoodsGiftCnt] = nSelectCategorySeq ; 
			aWedGeneralPriceGift[nWedSelectGoodsGiftCnt] = nMinPrice;
			aWedSelectPriceGift[nWedSelectGoodsGiftCnt] = nMallPrice;
			aMallCodeGift[nWedSelectGoodsGiftCnt] 		= sMallCode;
			aGoodsImgMGift[nWedSelectGoodsGiftCnt] 		= goodsImgM;
			aGoodsDescGift[nWedSelectGoodsGiftCnt]		= goodsDesc;
			
			if(oCategoryGoodsList.prodList[nGoodsPos].prodUsrName.length > 0)
				goodsName =oCategoryGoodsList.prodList[nGoodsPos].prodUsrName;
			
			aWedGoodsNameGift[nWedSelectGoodsGiftCnt] 		= goodsName;
			aCategoryGift1[nWedSelectGoodsGiftCnt] 		= goodsCateC1;
			aCategoryGift2[nWedSelectGoodsGiftCnt] 		= goodsCateC2;
			aCategoryGift3[nWedSelectGoodsGiftCnt] 		= goodsCateC3;
			aCategoryGift4[nWedSelectGoodsGiftCnt] 		= goodsCateC4;
			aWedCategoryNameGift[nWedSelectGoodsGiftCnt]	= $('#selectCateName').val();
			aGoodsImgGift[nWedSelectGoodsGiftCnt] = goodsImg;
			
			nWedSelectGoodsGiftCnt++;
			
			if(this.ChangeKind != 2)
				return;
			
			var	sElement = "";
			if(bIsCate == false) {		
				sElement =' <div class="categoryContainer open">';
				sElement +='<h3>'+$('#selectCateName').val()+'</h3>';
			}	
			sElement +='<dl class="productIn" >';
			sElement +='<dt><a href="#" ><img src="'+goodsImg+'" alt="" /><strong>'+goodsName+'</strong></a></dt>';
			sElement +='<dd class="price"><p class="normall">�Ϲݸ��� : <em>'+numberFormat(nMinPrice)+'��</em></p><p>���ո��� : <em>'+numberFormat(nMallPrice)+'��</em></p></dd>';
			sElement +='<dd class="buttons"><span class="selectThis"><input type="checkbox" checked="checked" value="'+oCategoryGoodsList.prodList[nGoodsPos].prodCode+'" onclick="wedEstimateManager.CHECKED();"/></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="wedEstimateManager.DELETEGIFT(this,'+bIsCate+','+goodsCode+');">����</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="prodViewPrice(\'http://prod.danawa.com/info/?\', '+goodsCode+')">���ݺ�</button></span><span class="dui-lib-button-set01 duiBtnType2"><button type="button" onclick="mailOpen('+goodsCode+','+goodsCateC1+','+goodsCateC2+','+goodsCateC3+','+goodsCateC4+');">��������!</button></span></dd>';
			sElement +='<input type="hidden" name="goodsSeqGift[]" value="'+goodsCode+'" />';
			sElement +='<input type="hidden" name="goodsNameGift[]" value="'+goodsName+'" />';
			sElement +='</dl>';
			if(bIsCate == false) {		
				sElement +='<span class="rBtn" id="productIn'+nSelectCategorySeq+'"></span>';
				sElement +='</div>';
				this.ObjTable.append(sElement);
			 	// ī�װ� ���� �ݱ�!
			 	$("div.categoryContainer span.rBtn").click(function(){
			 		$(this).parent().toggleClass("open");
			 	})
			}else {
				$("#productIn"+nSelectCategorySeq).before(sElement);
			}
			this.checkCount();
		},
		
		
		deleteAll			: function (nGift) {
			
			if(nGift == 1){
				for(var i=0; i<nWedSelectGoodsCnt; i++) {
					aWedSelectGoodsCodes[i] =0;
					aWedSelectGoodsCategory[i] =0;
					aWedGeneralPrice[i] =0;
					aWedSelectPrice[i] =0;
				}
				nWedSelectGoodsCnt =0;
			}
		},
		
		checkCount			: function () {
			if(this.ChangeKind == 1)
				this.checkMinCount();
			else
				this.checkGiftCount();
		}, 
		
		checkMinCount			: function () {
			var nMinCnt=0;
			var nMallCnt=0;
			var nSumMin =0;
			var nSumMall = 0;
			
			$(".selectThis > input[type=checkbox]").each(
				function(index){
					if(this.checked == true) {		
						for(var i=0; i<nWedSelectGoodsCnt; i++) {
							if(aWedSelectGoodsCodes[i] == this.value) {
								//if(aWedGeneralPrice[i] > 0)
									nMinCnt++;
								if(aWedSelectPrice[i] > 0)
									nMallCnt++;
								nSumMin = nSumMin + aWedGeneralPrice[i];
								nSumMall = nSumMall + aWedSelectPrice[i];
								break;
							}
						}
					}
				}
			)
			this.ObjSelectCount.html(nMinCnt);
			this.ObjGeneralCount.html(nMallCnt);
			this.ObjGeneralPrice.html(numberFormat(nSumMin));
			this.ObjSelectPrice.html(numberFormat(nSumMall));

		},
	
		checkGiftCount			: function () {
			var nMinCnt=0;
			var nMallCnt=0;
			var nSumMin =0;
			var nSumMall = 0;
			$(".selectThis > input[type=checkbox]").each(
				function(index){
					if(this.checked == true) {					
						for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
							if(aWedSelectGoodsCodesGift[i] == this.value) {
								if(aWedGeneralPriceGift[i] > 0)
									nMinCnt++;
								if(aWedSelectPriceGift[i] > 0)
									nMallCnt++;
								nSumMin = nSumMin + aWedGeneralPriceGift[i];
								nSumMall = nSumMall + aWedSelectPriceGift[i];
								break;
							}
						}
					}
				}
			)
			this.ObjSelectCount.html(nMinCnt);
			this.ObjGeneralCount.html(nMallCnt);
			this.ObjSelectPrice.html(numberFormat(nSumMall));
			this.ObjGeneralPrice.html(numberFormat(nSumMin));
		},
		
		SUBMIT				: function	() {
			
			
			var nEstimateSeq = $('#saveEstimateItem').val();
			if(nEstimateSeq == 0) {
				alert('�������� ���� �� ��ǰ�� ���� �� ��  �ֽ��ϴ�');
				return;
			}
			
			if((nWedSelectGoodsGiftCnt == 0) && (nWedSelectGoodsCnt == 0)) {
				alert('������ ��ǰ�� �����ϴ�');
				return;
			}
			
			if(!confirm('������ ���� ������ �ִ� �������� ������ ��� ���� ���� �˴ϴ�.\n�����Ͻðڽ��ϱ�? ')){
				return;
			}
			
			$('#estimateListSeq').val(nEstimateSeq);
					
			var sGoodsCodeStr = "";
			var sCategoryStr = "";
			
			if(nWedSelectGoodsCnt > 0){
				sGoodsCodeStr = aWedSelectGoodsCodes[0];
				sCategoryStr =  aWedSelectGoodsCategory[0];
			}
			for(var i=1; i<nWedSelectGoodsCnt; i++) {
				sGoodsCodeStr = sGoodsCodeStr + ","+ aWedSelectGoodsCodes[i];
				sCategoryStr = sCategoryStr + ","+ aWedSelectGoodsCategory[i];
			}
			
			$('#newGoodsSeqs').val(sGoodsCodeStr);
			$('#categorySeqs').val(sCategoryStr);
					
			sGoodsCodeStr = "";
			sCategoryStr = "";
			
			if(nWedSelectGoodsGiftCnt > 0){
				sGoodsCodeStr = aWedSelectGoodsCodesGift[0];
				sCategoryStr =  aWedSelectGoodsCategoryGift[0];			
			}
			
			for(var i=1; i<nWedSelectGoodsGiftCnt; i++) {
				sGoodsCodeStr = sGoodsCodeStr + ","+aWedSelectGoodsCodesGift[i];
				sCategoryStr = sCategoryStr + ","+ aWedSelectGoodsCategoryGift[i];
			}
			
			$('#newGoodsGiftSeqs').val(sGoodsCodeStr);
			$('#categoryGiftSeqs').val(sCategoryStr);
						
			
			if(this.ChangeKind == 1){
				for(var i=0; i<nWedSelectGoodsGiftCnt; i++) {
					this.ObjForm.append("<input type=\"hidden\" name=\"goodsNameGift[]\" value=\""+aWedGoodsNameGift[i] +"\"/>");
					this.ObjForm.append("<input type=\"hidden\" name=\"goodsSeqGift[]\" value=\""+aWedSelectGoodsCodesGift[i] +"\"/>");			
				}	
			}else{
				for(var i=0; i<nWedSelectGoodsCnt; i++) {
					this.ObjForm.append("<input type=\"hidden\" name=\"goodsName[]\" value=\""+aWedGoodsName[i] +"\"/>");
					this.ObjForm.append("<input type=\"hidden\" name=\"goodsSeq[]\" value=\""+aWedSelectGoodsCodes[i] +"\"/>");			
					this.ObjForm.append("<input type=\"hidden\" name=\"goodsDesc[]\" value=\""+aGoodsDesc[i] +"\"/>");			
				}	
			}
			$.post('wedEstimateGoodsSave.php', this.ObjForm.serialize(), 
					function(data) {
						if(data == "ok"){
							$('[name=estimateSeq]').val(nEstimateSeq);
							$('#selectEstimateText').val($('#saveEstimateItemText').val());
							alert('���� �Ǿ����ϴ�.');
							$('.saveEstimateButton').parent().parent().removeClass("saveopen");
						}else{
							alert(data);
						}
					}
			)
		}
}