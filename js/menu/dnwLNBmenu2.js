/**
 * LNB 메뉴
 */
;
(function($) {
	function drawMenuBody(menuBox, items) {
		if(!items) return;
		
		var sMenuName	= "";
		var sLinkUrl	= "";
		var sLinkTarget	= "";
		var sIcon		= "";
		var sIconTxt 	= "";
		
		for ( var i=0; i<items.length; i++ ) {
			var oLI = document.createElement("LI");

			$(menuBox).append($(oLI));

			// 두번째 메뉴가 있으면...
			if( items[i].SubMenu.length > 0 ) {
				var subItems = items[i].SubMenu;

				for(var j=0; j<subItems.length; j++) {
					
					sMenuName	= subItems[j].sMenuName;
					sLinkUrl	= decodeURIComponent(subItems[j].sLinkUrl);
					sLinkTarget2= subItems[j].sLinkTarget;
					sIcon		= subItems[j].sTextMenuIcon;
					sIconTxt 	= "";
					
					
					if(sIcon == "NEW") {
						sIconTxt = 'class="new"';
					} else if (sIcon == "HIT") {
						sIconTxt = 'class="hit"';
					} else {
						sIconTxt = "";
					}					
					if(sLinkUrl != "") {
						sMenuName = '<a href="'+sLinkUrl+'" target="'+sLinkTarget2+'" '+sIconTxt+'>' + subItems[j].sMenuName + "</a>";
					}
					
					var oSubLI = document.createElement("LI");
						$(oSubLI)
						.addClass("list")
						.html(sMenuName);

					// 세번째 뎁스 메뉴 정보
					if(subItems[j].SubMenu.length>0) {
						$(oSubLI)
						.bind("mouseenter", {"items":subItems[j].SubMenu}, function(e){
							$(this).data("objOptions",{"subId":"sub_category_layer","view":true});
							drawSubMenu(this, e.data.items);
							showMenu(this);
						})
						.bind("mouseleave",{"idx":j},function(e){
							$(this).data("objOptions",{"view":false});
							hideMenu(this);
						});

						$(oSubLI).append('<a href="#" class="plus">plus</a>');
					}

					if(subItems.length == (j+1)) {
						$(oSubLI).addClass("last");
					}

					$(menuBox).append($(oSubLI));
				}

				$(oLI).addClass("title_dot");
			}
			else {
				$(oLI).addClass("title");
			}

			// root(depth 1 menu);
			sMenuName	= items[i].sMenuName;
			sLinkUrl	= decodeURIComponent( items[i].sLinkUrl );
			sLinkTarget	= items[i].sLinkTarget;
			sIcon		= items[i].sTextMenuIcon;
			sIconTxt 	= "";
			
			if(sIcon == 'NEW') {
				sIconTxt = 'class="new"';
			} else if (sIcon == 'HIT') {
				sIconTxt = 'class="hit"';
			} else {
				sIconTxt = "";
			}
			if(sLinkUrl == "") {
				$(oLI).html( "<strong>"+sMenuName+"</strong>" );
			}
			else {
				$(oLI).html( '<a href="'+sLinkUrl+'" target="'+sLinkTarget+'" '+sIconTxt+'>' + sMenuName + '</a>' );
			}
		}
	}

	function drawSubMenu(pObj, items) {
		var oDiv= document.createElement("DIV");
			$(oDiv).attr("id",$(pObj).data("objOptions").subId);
			
		var oUL	= document.createElement("UL");

		for(var i=0; i<items.length; i++) {
			var oLI	= document.createElement("LI");
				$(oLI).html('<a href="'+ decodeURIComponent(items[i].sLinkUrl) +'" target="'+items[i].sLinkTarget+'">'+items[i].sMenuName+'</a>');

			$(oUL).append($(oLI));
		}
		$(oDiv).append($(oUL));

		var l = $(pObj).offset().left;
		var t = $(pObj).offset().top;
		var w = $(pObj).width();
		var h = $(pObj).height();

		//document.body.appendChild( oDiv );
		$(oDiv).hide();
		//alert($(pObj).parent().parent().parent().attr("id"));
		$(pObj).append( $(oDiv) );
	}

	function showMenu(obj) {
		var zIndex = 500;
		//alert($(obj).parent().find("li>div").html());

		$(obj).parent().each(function(){
			$(this)
			.find("li>div").data("objOptions", {"view":false})
			.find("li>div").hide();
		});

		var child = $(">div:last",obj);
		$(child).css({"zIndex": zIndex++});
		$(child).data("objOptions", {"view":true});
		$(child).slideDown(100);
	}
	function hideMenu(obj) {
		var child = $(">div:last",obj);
		$(child).data("objOptions", {"view":false});
		setTimeout(function() {
			if (!$(child).data('objOptions').view) {
				$(child).slideUp(100,function(){$(this).remove();});
			}
		}, 300);
	}
	
	$.fn.danawaLNBmenu = function (options) {
		var settings = $.extend({nMenuType:2}, options);
		var obj = this;
		var url = "/globalData/danawaMenu/PHP/danawaCommonMenu2.ajax.php";
		$.getJSON(
			url,
			settings,
			function(data) { drawMenuBody(obj, data); });
	};
})(jQuery);

