//prototype ������� ���� ���� ����
jQuery.noConflict();

//���̹� �� ����
naverMapOpen = function(lat,lng,thisLocation,width,height){
	oPoint = new nhn.api.map.LatLng(lat, lng);
	nhn.api.map.setDefaultPoint('LatLng');
	oMap = new nhn.api.map.Map('naverMap' ,{
				point : oPoint,
				zoom : 8,
				enableWheelZoom : true,
				enableDragPan : true,
				enableDblClickZoom : false,
				mapMode : 0,
				activateTrafficMap : false,
				activateBicycleMap : false,
				minMaxLevel : [ 1, 14 ],
				size : new nhn.api.map.Size(width,height),
				detectCoveredMarker : true
			});
	//oIconSize = new nhn.api.map.Size(28,37);
	//oIcon = new nhn.api.map.Icon("http://img.danawa.com/new/section_m/danawapc/img/naver_img_point.png",oIconSize);
	//oMarkerDefault = new nhn.api.map.Marker(oIcon);
	//oMarkerDefault.setPoint(oPoint);
	//oMarkerDefault.setTitle(thisLocation);
	var oMapTypeBtn = new nhn.api.map.MapTypeBtn();
	var oZoomControl = new nhn.api.map.ZoomControl();
	oMapTypeBtn.setPosition({top:10,left:10});
	//oMap.addOverlay(oMarkerDefault);
	oMap.addControl(oMapTypeBtn);
	oMap.addControl(oZoomControl);
	
	mapInfoWindow = new nhn.api.map.InfoWindow(); // - info window ����
	oLabel = new nhn.api.map.MarkerLabel(); // - ��Ŀ �� ����.

	mapInfoWindow.setVisible(false); // - infowindow ǥ�� ���� ����.
	oMap.addOverlay(mapInfoWindow);	// - ������ �߰�.	
		
	oMap.addOverlay(oLabel); // - ��Ŀ �� ������ �߰�. �⺻�� ���� ������ �ʴ� ���·� �߰���.

	mapInfoWindow.attach('changeVisible', function(oCustomEvent) {
		if (oCustomEvent.visible) {
			oLabel.setVisible(false);
		}
	});
	
	oMap.attach('mouseenter', function(oCustomEvent) {
		var oTarget = oCustomEvent.target;
		// ��Ŀ���� ���콺 �ö󰣰Ÿ�
		if (oTarget instanceof nhn.api.map.Marker) {
			var oMarker = oTarget;					
			if(oMarker.getTitle() != ""){
				oLabel.setVisible(true, oMarker); // - Ư�� ��Ŀ�� �����Ͽ� �ش� ��Ŀ�� title�� �����ش�.
			}
		}
	});

	oMap.attach('mouseleave', function(oCustomEvent) {
		var oTarget = oCustomEvent.target;
		// ��Ŀ������ ���콺 �����Ÿ�
		if (oTarget instanceof nhn.api.map.Marker) {
			oLabel.setVisible(false);
		}
	});
};

//�������� �븮�� ����Ʈ view
viewLocalMarketList = function(page,width,height){		
	if(nTotalCount > 0){
		
		if(typeof(width) == "undefined"){
			width = 323;
		}
		if(typeof(height) == "undefined"){
			height = 393;
		}
		
		jQuery("#naverMap").html("");
		//���̹� ���� ����
		naverMapOpen(lat,lng,thisLocation,width,height);
		nCurrentPage = page;
		
		var nSeq = 0;
		var html = "";
		endList = nCurrentPage * nListByPage;
		if(endList >= oLocalMarketList.length){
			endList = oLocalMarketList.length;
		}
		for(var i = ((nCurrentPage - 1) * nListByPage); i < endList; i++){
			
			var nLocalMarketPlaceSeq = oLocalMarketList[i].nLocalMarketPlaceSeq;
			
			oIconSize = new nhn.api.map.Size(21,28);
			oIcon = new nhn.api.map.Icon("http://img.danawa.com/new/blog_product/img/icon_"+aIconArray[nSeq]+".gif",oIconSize);
			oPoint = new nhn.api.map.LatLng(oLocalMarketList[i].lat, oLocalMarketList[i].lng);
			oMarkerDefault = new nhn.api.map.Marker(oIcon);
			oMarkerDefault.setPoint(oPoint);
			oMarkerDefault.setTitle(oLocalMarketList[i].sLocalMarketPlaceName);
			oMap.addOverlay(oMarkerDefault);						
			
			jQuery(".location_service").data(oLocalMarketList[i].sLocalMarketPlaceName,nLocalMarketPlaceSeq);
			oMarkerDefault.attach('click', function(oEvent) {
				// ��ħ ��Ŀ Ŭ���ѰŸ�
				if (oEvent.clickCoveredMarker) {
					return;
				}
				fnChooseMarketPlace(jQuery(".location_service").data(oEvent.target.getTitle()));
			});			
					
			html += '<li class="loc_'+aIconArray[nSeq]+'" onclick="javascript:fnMapCenterMove(\''+oLocalMarketList[i].lat+'\',\''+oLocalMarketList[i].lng+'\');">';
			html += '<input type="hidden" name="localMarketName_'+nLocalMarketPlaceSeq+'" id="localMarketName_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketName+'" />';
			html += '<input type="hidden" name="localMarketPlaceName_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceName_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketPlaceName+'" />';
			html += '<input type="hidden" name="localMarketPlaceDetailHomepage_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceDetailHomepage_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketPlaceDetailHomepage+'" />';
			html += '<input type="hidden" name="localMarketPlaceDetailPhoneNumber_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceDetailPhoneNumber_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketPlaceDetailPhoneNumber+'" />';
			html += '<input type="hidden" name="localMarketPlaceDetailBusinessHour_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceDetailBusinessHour_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketPlaceDetailBusinessHour+'" />';
			html += '<input type="hidden" name="localMarketPlaceAddress_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceAddress_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketPlaceAddress+'" />';
			html += '<input type="hidden" name="localMarketPlaceMessage_'+nLocalMarketPlaceSeq+'" id="localMarketPlaceMessage_'+nLocalMarketPlaceSeq+'" value="'+oLocalMarketList[i].sLocalMarketMessage+'" />';
			html += '<p class="loc_name">';
			html += '<a href="javascript:fnChooseMarketPlace('+nLocalMarketPlaceSeq+');">'+oLocalMarketList[i].sLocalMarketPlaceName+'</a>';
			html += '</p>';
			html += '<p class="tel_address">';
			html += '<span class="tel">'+oLocalMarketList[i].sLocalMarketPlaceDetailPhoneNumber+'</span>';
			html += '<span class="address">'+oLocalMarketList[i].sLocalMarketPlaceAddressShort+'</span>';
			nSeq++;
		}

		jQuery(".loc_list").html(html);

		//����¡ view
		var nLimitStart = nListByPage * (nCurrentPage-1);
		nTotalPageCount = Math.ceil(nTotalCount / nListByPage);
		nPrintNumber = nTotalCount - ((nCurrentPage-1) * nListByPage);

		nFirstPage = (Math.ceil(nCurrentPage / nPageByScreen) -1) * nPageByScreen + 1;	// ù������ ��ȣ
		nLastPage = (parseInt(nFirstPage) + parseInt(nPageByScreen) <= nTotalPageCount) ? nFirstPage + nPageByScreen - 1 : nTotalPageCount; // ������ ������ ��ȣ
		nPrevPage = (nFirstPage-1 > 0) ? nFirstPage-1 : null;	// ����������
		nNextPage = (nLastPage != nTotalPageCount) ? nLastPage+1 : null; // ����������

		var sPageHtml = "<div class=\"paging_loc\">";
		sPageHtml += (nCurrentPage > nPageByScreen) ? "<a href=\"javascript:fnMovePage(1)\" class=\"page_first\"><span class=\"blind\">ó��</span></a><a href=\"javascript:fnMovePage("+nPrevPage+")\" class=\"page_prev\"><span class=\"blind\">����</span></a>" : "";
		for(var i=nFirstPage; i<=nLastPage; i++) {
			if(i==nCurrentPage){
				sPageHtml += "<strong>"+i+"</strong>";				
			}else{
				sPageHtml += "<a href=\"javascript:fnMovePage("+i+")\">"+i+"</a>";
			}
			if(i < nLastPage){
				sPageHtml += "<span class=\"bar\"></span>&nbsp;";
			}
		}
		sPageHtml += (nFirstPage+nPageByScreen <= nTotalPageCount) ? "<a href=\"javascript:fnMovePage("+nLastPage+")\" class=\"page_next\"><span class=\"blind\">����</span></a><a href=\"javascript:fnMovePage("+nNextPage+")\" class=\"page_last\"><span class=\"blind\">������</span></a>" : "";
		sPageHtml += "</div>\n";
		jQuery(".loc_list").append(sPageHtml);
	}else{
		var html = "�������� ���� ����Ʈ�� �����ϴ�.";
		jQuery(".loc_list").html(html);
	}
};

//�������� ������ ������ view
viewEmptyLocalMarketList = function(){
	jQuery("#naverMap").html("<img src='http://img.danawa.com/new/noData/img/noImg_400.gif' width='323'  height='393' />");
	jQuery(".loc_list").html("�������� ���� ����Ʈ�� �����ϴ�.");
};

//�������� ���� ���ý� �󼼺��� view
fnChooseMarketPlace = function(nLocalMarketPlaceSeq){
	jQuery(".location_explain td#localMarketPlaceName").html(jQuery("#localMarketPlaceName_"+nLocalMarketPlaceSeq).val());	
	jQuery(".location_explain td#localMarketPlaceDetailHomepage").html("<a href='"+jQuery("#localMarketPlaceDetailHomepage_"+nLocalMarketPlaceSeq).val()+"' target='_blank'>�ٷΰ���</a>");
	jQuery(".location_explain td#localMarketPlaceDetailPhoneNumber").html(jQuery("#localMarketPlaceDetailPhoneNumber_"+nLocalMarketPlaceSeq).val());
	jQuery(".location_explain td#localMarketPlaceDetailBusinessHour").html(jQuery("#localMarketPlaceDetailBusinessHour_"+nLocalMarketPlaceSeq).val());
	jQuery(".location_explain td#localMarketPlaceAddress").html(jQuery("#localMarketPlaceAddress_"+nLocalMarketPlaceSeq).val());
	jQuery(".location_explain td#localMarketPlaceMessage").html(jQuery("#localMarketPlaceMessage_"+nLocalMarketPlaceSeq).val());
	jQuery(".location_explain").show();
	jQuery("#samsung").hide();
	jQuery("#lg").hide();
	if(jQuery("#localMarketName_"+nLocalMarketPlaceSeq).val() == "�Ｚ ������������"){
		jQuery("#samsung").show();
	}
	if(jQuery("#localMarketName_"+nLocalMarketPlaceSeq).val() == "LG ����Ʈ��"){
		jQuery("#lg").show();
	}
};

//������ �̵�
fnMovePage = function(page){
	viewLocalMarketList(page);
};

//�������� ���� ���� ���ý� ���� ��ġ �߽ɰ� ����
fnMapCenterMove = function(lat, lng){
	oPoint = new nhn.api.map.LatLng(lat, lng);
	oMap.setCenter(oPoint);
};