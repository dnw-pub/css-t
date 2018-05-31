<?php
	header("Content-Type: application/x-javascript; charset=euc-kr");
	$sDocRoot	= $_SERVER['DOCUMENT_ROOT'];
	$sCommonLib	= $sDocRoot . '/../common_files/lib';

	@require_once $sCommonLib . '/jsmin-1.1.1.php';

	echo JSMin::minify(file_get_contents($sDocRoot."/GenFiles/JS/goods/Affiliate_hotKeyword_0001.js"));
	echo JSMin::minify(file_get_contents($sDocRoot."/GenFiles/JS/goods/Affiliate_hotKeyword_0002.js"));
?>
	function danawaHotKeywordCategory(jsonData) {
		var oSProd			= eval(jsonData).keywordList;
		var nMainProdLen 	= oSProd.length;
		var sMainProdList	= "";
		var sAddClass = '';

		if(jsonData == 'Affiliate_hotKeyword_0002') {
			if(nMainProdLen > 4) {
				nMainProdLen = 4;
			}
		} else {
			if(nMainProdLen > 6) {
				nMainProdLen = 6;
			}
		}
		
		for(var i=0; i<nMainProdLen; i++) {
			var sname	= oSProd[i].hotKeywordName;
			var link	= oSProd[i].hotKeywordUrl;
			var target	= oSProd[i].hotKeywordTarget;
			var bold	= oSProd[i].hotKeywordBold;

			if(sname == "") break;
			titleName = sname;
			if(bold) {
				sname = '<strong>'+sname+'</strong>';
			}
			
			if(nMainProdLen == i+1) {
				var sAddClass = ' class="lastChild"';
			}

			sMainProdList += '<li'+sAddClass+'><a href="'+link+'" title="'+titleName+'" target="'+target+'" onMouseDown="_trkEventLog(\'집중카테고리_'+sname+'\')">'+sname+'</a></li>\n';
		}//end for
		sMainProdList = '<ul>'+sMainProdList+'</ul>';
		document.write(sMainProdList);
	}
	
	document.write('<div id="leftWingEvent">');
	document.write('<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="80" height="80" src="http://ad.danawa.com/RealMedia/ads/adstream_sx.ads/www.danawa.com/main@Left"></iframe>');  
	document.write('</div>');

	document.write('<div id="leftWingBn">');
	document.write('<div class="asideCategory_container">');
	document.write('<h3><a class="hotcategory"><span class="ir"></span>핫카테고리</a></h3>');
	danawaHotKeywordCategory('Affiliate_hotKeyword_0001');
	document.write('</div>');
	document.write('<div class="asideCategory_container">');
	document.write('<h3><a href="http://shop.danawa.com" class="danawapc"><span class="ir"></span>다나와PC</a></h3>');
	danawaHotKeywordCategory('Affiliate_hotKeyword_0002');
	document.write('</div>');
	document.write('<div style="margin-top:5px;">');
	document.write('<iframe width="90" height="150" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" src="http://ad.danawa.com/RealMedia/ads/adstream_sx.ads/www.danawa.com/main@BottomLeft"></iframe>');
	document.write('</div>');
	document.write('</div>');
