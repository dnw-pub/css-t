;
(function($){
	var settings = {
			parentObj:null,
			childObj:null
		};
	function showSubMenu(obj) {
		if(!settings.childObj) createSubMenu(obj);
		else hideSubMenu({delay:0});
	}
	
	function hideSubMenu(opt) {
		var opt = $.extend({delay:300},opt);
		setTimeout(function(){
			$(settings.childObj).hide( 0, function(){
				$(settings.childObj).remove();
				
				settings.parentObj = null;
				settings.childObj = null;
			});
		}, opt.delay);
	}
	
	function createRootMenu(obj, items) {
		if(!items) return;
		var subIndex = -1;
		
		$(">li",obj).each(function(i){
			if( $(this).hasClass('more_view') ) {
				subIndex = $(this).attr("rel");
				
				if(items[subIndex].SubMenu.length > 0) {				
					$(this)
					.data( "objSettings", {"SubMenu":items[subIndex].SubMenu, "childObj":null} )
					.bind("click",function() { showSubMenu(this); });
				}
			}
		});
	}

	function createSubMenu(obj) {
		var sets	= $.data(obj, "objSettings");
		var items	= sets.SubMenu;
		
		if(items.length > 0) {
			var nMenuInUL 	= 5; //UL>Li °¹¼ö
			var nULCount	= Math.ceil(items.length / nMenuInUL);	// ¸Þ´º °¹¼ö¿¡ µû¸¥ UL °¹¼ö
			var ul = [];

			var wrapDiv	= document.createElement("DIV");
				$(wrapDiv)
				.attr("id","more_view")
				.bind("mouseleave",function(){hideSubMenu();});
			
			//$(obj).data("objSettings", $.extend(sets,{"childObj":wrapDiv}));
			settings.parentObj = obj;
			settings.childObj = wrapDiv;

			for(var i=0; i<nULCount; i++) {
				ul[i] = document.createElement("UL");
			}
		
			$(items).each(function(i,data){
				var li		= document.createElement("LI");
				var title	= "";
				var ulIndex	= Math.floor( i / nMenuInUL);
				
				if(this.sLinkUrl != "") {
					if(this.sLinkTarget != '') this.sLinkTarget = "_self"; 
					title = "<a href=\""+ decodeURIComponent(this.sLinkUrl) +"\" target=\""+this.sLinkTarget+"\">"+this.sMenuName+"</a>";
				} else {
					title = this.sMenuName;
				}

				$(li).html( title );
				$(ul[ulIndex]).append($(li));
			});

			for(var i=0; i<nULCount; i++) {
				$(wrapDiv).append($(ul[i]));
			}

			document.body.appendChild(wrapDiv);
			
			$(wrapDiv)
			.css({
				position: "absolute",
				zIndex	: 1000,
				left	: ($(obj).offset().left) + "px",
				top		: ($(obj).parent().parent().offset().top + $(obj).parent().parent().height() - 1) + "px"
			})
			.show();
		}
		else return;
	}
	
	$.fn.dnwMOREmenu = function (options) {
		var settings = $.extend({nMenuType:3}, options);
		var obj = this;
		var rand = Math.floor(Math.random() * 10000);
		var url = "/globalData/danawaMenu/PHP/danawaCommonMenu.ajax.php?d"+rand+"=";
		$.getJSON(
			url,
			settings,
			function(data) { createRootMenu(obj, data);}
		);
	};
})(jQuery);
