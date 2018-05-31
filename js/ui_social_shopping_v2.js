//write :박지영
jQuery(document).ready(function() {
	
	jQuery("#ajaxLoadingImage").ajaxStart(function(){
		jQuery(this).show();
		jQuery("#pageCover").show();
		jQuery("#pageCover").width(jQuery("#productList").width());
		jQuery("#pageCover").height(jQuery("#productList").height());
	});
	
	jQuery("#ajaxLoadingImage").ajaxStop(function(){
		jQuery(this).hide();
		jQuery("#pageCover").hide();
	});
	
	getDefaultProductList();	
	
	// default
	jQuery(".tab_content").hide();
	jQuery("ul.tabs li:first").addClass("select").show();
	jQuery(".tab_content:first").show();

	//Click Event
	jQuery("ul.tabs li").click(function() {
		jQuery("ul.tabs li").removeClass("select");
		jQuery(this).addClass("select");
		jQuery(".tab_content").hide();
		var activeTab = jQuery(this).find("a").attr("href");
		//jQuery(activeTab).fadeIn();
		jQuery(activeTab).show();
		return false;
	});
});

function clipClock(productId, y, m, d, h, mi, s) {
	var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	
	var today=new Date();
	var todayYear=today.getYear();
	if (todayYear < 1000)
		todayYear+=1900;
	var todayMonth=today.getMonth();
	var todayDate=today.getDate();
	var todayHour=today.getHours();
	var todayMin=today.getMinutes();
	var todaySec=today.getSeconds();
	
	var todayString = montharray[todayMonth]+" "+todayDate+", "+todayYear+" "+todayHour+":"+todayMin+":"+todaySec;
	var endDateString = montharray[m-1]+" "+d+", "+y+" "+h+":"+mi+":"+s;
	
	var miliSec = Date.parse(endDateString)-Date.parse(todayString);
	jQuery('#times_' + productId).html(timeCalc(miliSec));
}


function timeCalc(ms) {
	if(ms<0) {
		time = "<p>종료</p>";
	} else {
		var d = new String(Math.floor(ms/(60*60*1000*24)*1));
		var h = new String(Math.floor((ms%(60*60*1000*24))/(60*60*1000)*1));
		var mi = new String(Math.floor(((ms%(60*60*1000*24))%(60*60*1000))/(60*1000)*1));
		var se = new String(Math.floor((((ms%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1));	
		time = "<p>";
		
		if(d != "0"){
			if(d.length == 1){
				time += "<span class='day"+d+"'>" + d + "</span>";
			}else{
				time += "<span class='day"+d.charAt(0)+"'>" + d.charAt(0) + "</span>";
				time += "<span class='day"+d.charAt(1)+"'>" + d.charAt(1) + "</span>";
			}
			time += "<span class='day_text'></span>";
		}
		
		if(h.length == 1){
			time += "<span class='time0'>0</span>";
			time += "<span class='time"+h+"'>"+h+"</span>";
		}else{
			time += "<span class='time"+h.charAt(0)+"'>"+h.charAt(0)+"</span>";
			time += "<span class='time"+h.charAt(1)+"'>"+h.charAt(1)+"</span>";
		}
		
		time += "<span class='colon'>:</span>";
		
		if(mi.length == 1){
			time += "<span class='time0'>0</span>";
			time += "<span class='time"+mi+"'>"+mi+"</span>";
		}else{
			time += "<span class='time"+mi.charAt(0)+"'>"+mi.charAt(0)+"</span>";
			time += "<span class='time"+mi.charAt(1)+"'>"+mi.charAt(1)+"</span>";
		}
		
		time += "<span class='colon'>:</span>";
		
		if(se.length == 1){
			time += "<span class='time0'>0</span>";
			time += "<span class='time"+se+"'>"+se+"</span>";
		}else{
			time += "<span class='time"+se.charAt(0)+"'>"+se.charAt(0)+"</span>";
			time += "<span class='time"+se.charAt(1)+"'>"+se.charAt(1)+"</span>";
		}				
		
		time += "</p>";
		
	}	
	return time;
}

function selectKeyword(value){
	jQuery("#keyword").val(jQuery("#searchKeyword").val());
	jQuery("#page").val(0);
	getProductList();
}

function selectLocale(index,value){
	jQuery("#localeSelect .select").removeClass("select");
	jQuery("#localeSelect dd").eq(index).addClass("select");
	var html = "";
	if(typeof(localSubArea[value]) != "undefined"){
		var seq = 0;
		html += "<table>";
		html += "<caption>해당지역 지역구</caption>";
		jQuery.each(localSubArea[value],function(index){
			var subLocalCount = localSubArea[value][index].length;
			if(seq == 0 || (seq % 8) == 0){
				html += "<tr>";
			}
			html += "<td><a href='javascript:selectSubLocale("+seq+",\""+index+"\");'>"+index+"("+subLocalCount+")</a></td>";
			if(seq != 0 && (seq + 1) % 8 == 0){
				html += "</tr>";
			}
			seq++;
		});
		html += "</table>";
		jQuery("#layer_00").html(html);
		jQuery("#layer_00").show();
	}else{
		jQuery("#layer_00").html("");
		jQuery("#layer_00").hide();
	}
	jQuery("#area").val(value);
	jQuery("#subArea").val('');
	jQuery("#keyword").val('');
	jQuery("#searchKeyword").val('');
	jQuery("#page").val(0);
	
	getGroupList('groupSelect');
	
	selectGroup(0,'','groupSelect');
}

function selectSubLocale(index,value){
	
	jQuery("#layer_00 td").each(function(index){	   
	    if(jQuery(this).find("strong").index() == 0){
	        var seq = index;
	        var prevHtml = jQuery(this).find("strong span").html();
	        var subLocalCount = localSubArea[jQuery("#area").val()][prevHtml].length;
	        jQuery(this).find("strong").remove();
	        jQuery(this).html("<a href='javascript:selectSubLocale("+seq+",\""+prevHtml+"\");'>"+prevHtml+"("+subLocalCount+")</a>");
	    }    
	});
	var subLocalCount = localSubArea[jQuery("#area").val()][value].length;
	jQuery("#layer_00 td").eq(index).find("a").remove();
	jQuery("#layer_00 td").eq(index).html("<strong><span>"+value+"</span>("+subLocalCount+")</strong>");
	jQuery("#subArea").val(value);
	jQuery("#keyword").val('');
	jQuery("#searchKeyword").val('');
	jQuery("#page").val(0);
	
	getGroupList('groupSelect');
	
	getProductList();
}

function selectGroup(index,value,dlId){
	jQuery("#"+dlId+" .select").removeClass("select");
	jQuery("#"+dlId+" dd").eq(index).addClass("select");
	
	jQuery("#goods").val(value);
	jQuery("#page").val(0);
	jQuery("#keyword").val('');
	jQuery("#searchKeyword").val('');
	getProductList();
}

function selectSortKind(index,value){
	jQuery(".sort_items .select").removeClass("select");
	jQuery(".sort_items li").eq(index).addClass("select");
	jQuery("#sortKind").val(value);
	jQuery("#page").val(0);
	getProductList();
}

function fnMovePage(page){
	jQuery("#page").val(page);
	getProductList();
}

function getDefaultProductList(){
	jQuery("#keyword").val('');
	jQuery("#area").val('');
	jQuery("#subArea").val('');
	jQuery("#page").val(0);
	jQuery("#searchKeyword").val('');
	jQuery("#goods").val('');
	
	jQuery("#localeSelect .select").removeClass("select");
	jQuery("#localeSelect dd").eq(0).addClass("select");
	
	jQuery("#layer_00").html("");
	jQuery("#layer_00").hide();
	
	getGroupList('groupSelect');	
	getProductList();
}

function getProductList(){
	var keyword = jQuery("#keyword").val();
	var area = jQuery("#area").val();
	var subArea = jQuery("#subArea").val();
	var page = jQuery("#page").val();
	var sortKind = jQuery("#sortKind").val();
	var goods = jQuery("#goods").val();
	
	jQuery.get("./process/specialPriceSearch.proc.php",{"keyword":keyword,"area":area,"subArea":subArea,"page":page,"sortKind":sortKind,"goods":goods},function(data){
		jQuery("#productList").html(data);
	});	
}

function getLocationProductList(){		
	if( 
		jQuery.trim(jQuery("#areaTemp").val()) == ""
	){
		jQuery.get("./process/specialPriceLocationSearch.proc.php",{},function(data){
			jQuery("#area").val(data.sSidoLocation);
			jQuery("#subArea").val(data.sGugunLocation);
			jQuery("#areaTemp").val(data.sSidoLocation);
			jQuery("#subAreaTemp").val(data.sGugunLocation);
			var locationHtml = data.sSidoLocation;
			if(data.sGugunLocation != ""){
				locationHtml += " > " + data.sGugunLocation;
			}
			jQuery(".now_location strong").html(locationHtml);
			
			jQuery("#keyword").val('');
			jQuery("#searchKeyword").val('');
			jQuery("#goods").val('');
			jQuery("#page").val(0);
			
			selectGroup(0,'','groupSelectLocation');
			
			getGroupList('groupSelectLocation');
			getProductList();
		},"json");			
	}else{
		jQuery("#area").val(jQuery("#areaTemp").val());
		jQuery("#subArea").val(jQuery("#subAreaTemp").val());
		jQuery("#keyword").val('');
		jQuery("#searchKeyword").val('');
		jQuery("#goods").val('');
		jQuery("#page").val(0);
		
		selectGroup(0,'','groupSelectLocation');
		
		getGroupList('groupSelectLocation');
		getProductList();
	}
	
}

function getGroupList(dlId){
	var area = jQuery("#area").val();
	var subArea = jQuery("#subArea").val();
	
	jQuery.get("./process/specialPriceGroupSearch.proc.php",{"area":area,"subArea":subArea,"dlId":dlId},function(data){
		jQuery("#"+dlId).html(data);
	});
}

/**
 *  패이스북 링크
 */
function goFacebook(sContent){
	var url = "http://www.danawa.com/specialPrice/specialPriceMain.php";
	var sLinkUrl = "http://www.danawa.com/sns/danawaSnsShare.php?snsType=1&content="+encodeURI(sContent)+"&sourceUrl="+encodeURI(url);
	window.open(sLinkUrl, 'facebook', 'left=22,top=0,width=740,height=510,toolbar=false,menubar=false,status=false,scrollbars=false,resizable=false');
}

/**
 * 미투데이 링크
 */
function goMe2Day(sContent,url){
	var sLinkUrl = "http://www.danawa.com/sns/danawaSnsShare_jmg.php?snsType=3&content="+encodeURI(sContent)+"&sourceUrl="+encodeURI(url);
	window.open(sLinkUrl, 'Me2Day', 'left=22,top=0,width=1000,height=800,toolbar=false,menubar=false,status=false,scrollbars=false,resizable=false');
}

/**
 * 트위터 링크
 */
function goTwitter(sContent,url){
	var sLinkUrl = "http://www.danawa.com/sns/danawaSnsShare.php?snsType=2&content="+encodeURI(sContent)+"&sourceUrl="+encodeURI(url);
	window.open(sLinkUrl, 'Twitter', 'left=22,top=0,width=1000,height=800,toolbar=false,menubar=false,status=false,scrollbars=false,resizable=false');
}
