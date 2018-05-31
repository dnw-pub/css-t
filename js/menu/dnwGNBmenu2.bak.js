/**
 * 확장 메뉴 만들기.
 */
// 1Depth 만들어 준다.
;(function($) {
	$.danawaGNBmenu = function (menuBox, options) {
		var self 		= this;
		
		this.$menuBox	= $(menuBox);
		this.options	= $.extend({nMenuType:1}, options || {});
		this.menuItems	= null;
		this.openTimer 	= 0;
		this.iframe		= null;
		
		this.rootMenuIdText	= "menuGnbRoot";
		this.subMenuIdText	= "gnbSubMenuGroup";

		$.getJSON(
			"/globalData/danawaMenu/PHP/danawaCommonMenu.ajax.php",
			self.options,
			function(data) {
				if(!data) return false;
				self.init(data);
			}
		);
	}
	
	$.danawaGNBmenu.fn = $.danawaGNBmenu.prototype = {};
	$.danawaGNBmenu.fn.extend = $.danawaGNBmenu.extend = $.extend;	
	$.danawaGNBmenu.fn.extend({		
		
		init : function(data) {
					this.menuItems = data;
					this.setIframe();
					this.setGnbMenu();
		},

		showMenu : function(parentEl) {
			var self = this;
			var parentData	= $.data(parentEl,"objData");
			var childEl		= parentData.childEl;
			var childData	= $.data(childEl, "objData");
			
			if(parentData.allViewMenu) {
				var posFn = this.setPositionAll;
				var iframeWid = 0;
				var iframeHei = 0;
			} else {
				var posFn = this.setPosiotion;
				var iframeWid = 1;
				var iframeHei = 5;
			}
			
			
			if($(parentEl).offset().left != parentData.leftPos) {
				posFn(parentEl);
			}
			
			// 미리 열려있는 메뉴 바로 감춤
			$("div[id^='"+this.subMenuIdText+"']").each(function(){
				if(childEl != this) {
					self.hideMenu($.data(this,"objData").parentEl, {delayTime:0,hiddenTime:0});
				}
			});
			
			$(">img",parentEl).attr("src", parentData.menuImgOn);
			
			this.openTimer = window.setTimeout(function(){
				$(childEl).show();
				$(self.iframe).css({
					left 	: $(childEl).offset().left + "px",
					top		: $(childEl).offset().top + "px",
					width 	: $(childEl).width() + iframeWid + "px",
					height 	: $(childEl).height() + iframeHei + "px"
				}).show();
			},300);
			
			childData.isView = true;
		},

		hideMenu : function(parentEl, opt) {
			var self = this;
			var parentData	= $.data(parentEl,"objData");
			var childEl		= parentData.childEl;
			var childData	= $.data(childEl, "objData");
			var opt			= $.extend({delayTime:0,hiddenTime:300},opt);
			
			window.clearTimeout(this.openTimer);
			
			childData.isView = false;
			
			window.setTimeout(function(){
				$(self.iframe).hide();
				if(!childData.isView) {
					$(childEl).hide(opt.delayTime, function(){
						$(">img",parentEl).attr("src", parentData.menuImgOff);
					});
				}
			},opt.hiddenTime);
			
		},
		
		setIframe : function() {
			var iframe = document.createElement("IFRAME");
			$(iframe).css({
				position : "absolute",
				zIndex : 999,
				left : "0px",
				top : "0px",
				width : "0px",
				height : "0px",
				border : "0px"
			})
			.attr("src","about:blank")
			.attr("scrolling","no")
			.attr("frameborder","0")
			.hide();
			document.body.appendChild( iframe );
			this.iframe = iframe;
		},

		setGnbMenu : function() {
			var self = this;
			var $menuBox = this.$menuBox;
			
			$(">li[id^='"+self.rootMenuIdText+"']",$menuBox).each(function(idx){
				var el = this;
				
				$.data(this,"objData", {
					parentEl	: null,
					childEl		: null,
					leftPos		: $(this).offset().left,
					menuImgOn 	: "",
					menuImgOff	: "",
					allViewMenu	: false
				});
				
				// 전체 메뉴
				if(idx >= self.menuItems.length) {
					self.drawAllMenu(this);
				}
				// 서브메뉴
				else {
					self.drawSubMenu(idx, this);
				}
				
				$(this)
				.bind("mouseenter", function(){self.showMenu( this );})
				.bind("mouseleave", function(){self.hideMenu( this );});
			});			
		},
		
		drawAllMenu : function(parentEl) {
			var parentData	= $.data( parentEl, "objData" );
			var nRootMenuCnt= this.menuItems.length;
			var self = this;
			
			$menuBox = this.$menuBox;

			// 전체 메뉴 감싸주는 DIV
			var oDiv0 = document.createElement("DIV");
			var oDiv1 = document.createElement("DIV");
				$(oDiv1).addClass("all_layer");

			// 서브메뉴 리스트용 DIV
			var oDiv2 = document.createElement("DIV");
				$(oDiv2).addClass("top_menu");
				//$(oDiv2).css({"border":"1px solid red"});
				
			// 스페셜메뉴 리스트용 DIV
			var oDiv3 = document.createElement("DIV");
				$(oDiv3).addClass("bottom_menu");
				//$(oDiv2).css({"border":"1px solid red"});
				
			$.each(this.menuItems, function(idx, items) {
				var aSubMenuList	= [];
				var aSpecialList	= [];
				
				aSubMenuList = self.drawOnlySubMenu(items.SubMenu);
				aSpecialList = self.drawOnlySpecialMenu(items.aSpecialMenuList);
				
				// 서브메뉴 용
				var oUL = document.createElement("UL");
				// 스페셜 메뉴용
				var oUL2 = document.createElement("UL");

				if((nRootMenuCnt-1) == idx) {
					$(oUL).addClass("last");
					$(oUL2).addClass("last");
				} else {
					$(oUL).addClass("width_130");
					$(oUL2).addClass("width_130");
				}
				
				// 서브메뉴 출력
				for(var j=0; j<aSubMenuList.length; j++) {
					$(oUL).append($(aSubMenuList[j]));
				}
				$(oDiv2).append($(oUL));
				
				// 스페셜 메뉴 출력
				for(var j=0; j<aSpecialList.length; j++) {
					$(oUL2).append($(aSpecialList[j]));
				}
				$(oDiv3).append($(oUL2));
			});

			$(oDiv1).append($(oDiv2));
			$(oDiv1).append($(oDiv3));
			$(oDiv0).append($(oDiv1));
			
			$(oDiv0)
			.css({
				"position" : "absolute",
				"zIndex" : 1000
			})
			.attr("id", self.subMenuIdText + "AllMenu")
			.bind("mouseenter", function(){self.showMenu(parentEl);})
			.bind("mouseleave", function(){self.hideMenu(parentEl);})
			.hide();
			
			// 서브메뉴 기본 정보 데이터 셋 
			$.data(oDiv0,"objData",{
				adChange	: true,		// 브라우져 크기에 따른 좌표 수정이 있었나 여부
				menuAreaObj	: null,
				menuLeftObj	: null,
				menuRightObj: null,
				adObj		: null,
				"parentEl"	: parentEl,
				childEl		: null,
				isView		: false
			});
			
			parentData.childEl	 = oDiv0;
			parentData.allViewMenu = true;
			parentData.menuImgOn = "http://img.danawa.com/new/newmain/img/menu_all_up.gif";
			parentData.menuImgOff= "http://img.danawa.com/new/newmain/img/menu_all.gif";

			$(document.body).prepend( $(oDiv0) );
			
			this.setPositionAll(parentEl);
		},
		
		drawSubMenu : function(rootIdx,parentEl) {
			var subItems = this.menuItems[rootIdx];
			
			if(subItems.SubMenu.length <= 0) return;
			
			var self 		= this;
			var parentData	= $.data( parentEl, "objData" );
			var AdScript	= subItems.sAdScript;
			var SpecialMenu	= subItems.aSpecialMenuList;
			var MenuList	= subItems.SubMenu;
			
			var aSubMenuEl	= [];	// 서브메뉴 리스트
			var aSpecailEl	= [];	// 스페셜 메뉴 리스트
			
			// 서브메뉴리스트 생성
			aSubMenuEl = self.drawOnlySubMenu(MenuList);
			// 스페셜메뉴
			aSpecailEl = self.drawOnlySpecialMenu(SpecialMenu);

			
			// 서브메뉴 전체 감싸주는 레이어
			var wrapDiv = document.createElement("DIV");

			// 서브메뉴 왼쪽/오른쪽 감싸주는 레이어
			var border_right= document.createElement("DIV");
				$(border_right).addClass("border_right");

			// 서브메뉴 왼쪽리스트 감싸주는 레이어
			var over_left1	= document.createElement("DIV");
				$(over_left1).addClass("over_left");

			// 서브메뉴 왼쪽 감싸주는 레이어
			var ul_left = document.createElement("UL");
				$(ul_left).addClass("first_menu");
			
			// 서브메뉴 왼쪽영역에 넣기
			for(var i=0; i<10; i++) {
				ul_left.appendChild(aSubMenuEl[i]);
			}
				
			over_left1.appendChild(ul_left);
				
				
			// 스페셜 메뉴 왼쪽(UL)
			if(aSpecailEl.length>0) {
				var ul_left_bottom = document.createElement("UL");
					$(ul_left_bottom).addClass("last_menu");
				
				for(var i=0; i<2; i++) {
					ul_left_bottom.appendChild(aSpecailEl[i]);
				}				
				over_left1.appendChild(ul_left_bottom);
			}
			
			border_right.appendChild(over_left1);

			
			// 서브메뉴가 10개 이상이면,
			if(aSubMenuEl.length > 10) {
				// 메뉴 오른쪽 리스트 감싸주는 레이어
				var over_left2	= document.createElement("DIV");
				$(over_left2).addClass("over_left");

				var ul_right = document.createElement("UL");
					$(ul_right).addClass("first_menu");
				
				for(var i=10; i<aSubMenuEl.length; i++) {
					ul_right.appendChild(aSubMenuEl[i]);
				}
				over_left2.appendChild(ul_right);
				
				
				// 스페셜 메뉴
				if(aSpecailEl.length>2) {
					var ul_right_bottom = document.createElement("UL");
						$(ul_right_bottom).addClass("last_menu");
					for(var i=2; i<aSpecailEl.length; i++) {
						ul_right_bottom.appendChild(aSpecailEl[i]);
					}
					over_left2.appendChild(ul_right_bottom);
				}
				border_right.appendChild(over_left2);
			}
			wrapDiv.appendChild(border_right);

			// 광고가 있을때 광고 감싸주는 레이어
			var over_right = null;
			if(AdScript != "") {
				over_right = document.createElement("DIV");
				$(over_right).addClass("over_right");
				$(over_right).html('<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="205" height="220" src="about:blank"></iframe>');

				wrapDiv.appendChild(over_right);
			}
			
			$(wrapDiv)
			.bind("mouseenter", function(){self.showMenu(parentEl);})
			.bind("mouseleave", function(){self.hideMenu(parentEl);})
			.addClass("menu_over_layer")
			.css({
				position : "absolute",
				zIndex : 1000,
				left : "0px",
				top : "0px"
			})
			.attr("id", self.subMenuIdText + rootIdx)
			.hide();
			
			// 서브메뉴 기본 정보 데이터 셋 
			$.data(wrapDiv,"objData",{
				adChange	: false,		// 브라우져 크기에 따른 좌표 수정이 있었나 여부
				menuAreaObj	: border_right,
				menuLeftObj	: over_left1,
				menuRightObj: over_left2,
				adObj		: over_right,
				adInput		: false,
				adIframe	: '<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="205" height="220" src="'+decodeURIComponent(AdScript)+'"></iframe>',
				"parentEl"	: parentEl,
				childEl		: null,
				isView		: false
			});
			
			parentData.childEl		= wrapDiv;
			parentData.menuImgOn	= subItems.sMenuImageOn;
			parentData.menuImgOff	= subItems.sMenuImageOff;
			
			$(document.body).prepend( $(wrapDiv) );
			//$("#"+this.rootMenuIdText + rootIdx).append("<ul style='display:none;'><li>" + $(wrapDiv).html() + "</li></ul>");
			
			// 서브메뉴 위치 잡아줌.
			this.setPosiotion(parentEl);
		},
		
		drawOnlySubMenu : function (MenuList) {
			var aSubMenuElement = [];
			
			$.each(MenuList, function(idx, obj){
				if(idx >= 20) return false;	// 여기서 return은 반복문의 break;
				
				var li = document.createElement("LI");
				var title = "";
				var hitCss = (obj.sTextMenuIcon == "ADULT") ? 'class="lock_19"' : "";
				
				title = $.trim( obj.sMenuName );
				if(title == '' || title == '_blank_') {
					$(li).addClass("empty");
					$(li).html('&nbsp;');
				} else {
					title = (obj.sTextMenuStyle == 'BOLD') ? "<strong>"+title+"</strong>" : title;
					title = (obj.sLinkUrl == "") ? title : '<a href="'+ decodeURIComponent(obj.sLinkUrl) +'" target="'+obj.sLinkTarget+'" '+hitCss+'>'+title+"</a>";
					
					$(li).html(title);
				}
				aSubMenuElement.push(li);
			});
			
			return aSubMenuElement;
		},
		
		drawOnlySpecialMenu : function (SpecialMenu) {
			var aSpecialMenuList = [];

			$.each(SpecialMenu, function(idx, obj){
				if(idx >= 4) return false;	// break;
				
				var title = "";
				var hitCss = (obj.sTextMenuIcon == "HIT") ? 'class="hit"' : "";
				
				title = "<strong>"+obj.sMenuName+"</strong>";
				title = (obj.sLinkUrl == "") ? title : '<a href="'+ decodeURIComponent(obj.sLinkUrl) +'" target="'+obj.sLinkTarget+'" '+hitCss+'>'+title+"</a>";
				
				var li = document.createElement("LI");
					$(li).html(title);

				aSpecialMenuList.push(li);
			});
			
			return aSpecialMenuList;
		},
		
		setPositionAll : function(parentEl) {
			var parentData	= $.data( parentEl, "objData" );
			var childEl		= parentData.childEl;
			var childData	= $.data( childEl, "objData" );
			
			parentData.leftPos = $(parentEl).offset().left;
			
			$(childEl)
			.css({
				"left" : $menuBox.offset().left + "px",
				"top" : ($(parentEl).height() + $(parentEl).offset().top) + "px"
			})
		},
		
		setPosiotion : function(parentEl) {
			var parentData	= $.data( parentEl, "objData" );
			var childEl		= parentData.childEl;
			var childData	= $.data( childEl, "objData" );
			
			var areaLeft	= $(childData.menuLeftObj).width() ? $(childData.menuLeftObj).width() : 0;
			var areaRight	= $(childData.menuRightObj).width() ? $(childData.menuRightObj).width() : 0;
			var areaAd		= $(childData.adObj).width() ? $(childData.adObj).width() : 0;
			
			$(childEl).css({
				width : (areaLeft + areaRight + areaAd + 15) + "px",
				left : $(parentEl).offset().left + "px",
				top : $(parentEl).offset().top + $(parentEl).height() + "px"
			});
			
			parentData.leftPos = $(parentEl).offset().left;
			
			// 영역 넓이 보다 서브메뉴 박스넓이가 크면...
			if( ($(parentEl).offset().left + $(childEl).width() ) > this.$menuBox.offset().left + 925 ) {
				if(childData.adChange === false) {
					$(childData.adObj).addClass("left_margin").clone().prependTo($(childEl));
					$(childEl).children().last().remove();
					childData.adObj = $(childEl).children().first();
					$(childData.menuAreaObj).removeClass("border_right").addClass("border_left");
					childData.adChange = true;
				}
				
				$(childEl).css({
					left : ( $(parentEl).offset().left - ( $(childEl).width() - $(parentEl).width() ) -2)+"px"
				});
			}
			
			if(childData.adInput === false) {
				$(childData.adObj).html('');
				$(childData.adObj).html(childData.adIframe);
				childData.adInput = true;
			}
		}		
	});
	
	$.fn.danawaGNBmenu = function(options) {
		new $.danawaGNBmenu(this, options);
	}
})(jQuery);
