jQuery(function() {
	getThemeXML();
	// 테마영역 설정
	// setThemesArea();
	// 상품영역 설정
	// setProductsArea();

	jQuery("li[id^='theme-']").livequery('click', function() {
		var themeSeq = jQuery(this).attr('id').split('-')[1];

		jQuery("li[id^='theme-']").removeClass('active');
		jQuery('#theme-' + themeSeq).addClass('active');

		jQuery('#prevProductButton').removeClass();
		jQuery('#nextProductButton').removeClass();
		jQuery('#prevProductButton').removeClass('default');
		jQuery('#nextProductButton').addClass('active');

		getProductXML(themeSeq);
		resetPixel(0);
	});

	// 테마 왼쪽 페이징
	jQuery('#prevTheme').click(function() {
		// setThemeCount('prev');
		// setThemesArea();
	});

	// 테마 오른쪽 페이징
	jQuery('#nextTheme').click(function() {
		// setThemeCount('next');
		// setThemesArea();
	});

	// 상품 왼쪽 페이징
	jQuery('#prevProductButton').click(function() {
		if(jQuery('#prevProductButton').attr('class') == 'active') {
			resetPage('prev');
		}
	});

	// 상품 오른쪽 페이징
	jQuery('#nextProductButton').click(function() {
		if(jQuery('#nextProductButton').attr('class') == 'active') {
			resetPage('next');
		}
	});
});

function resetPage(direction)
{
	var currentProductCount = Number(jQuery('#currentProductCount').val());

	if(direction == 'prev') {
		if(currentProductCount-1 == 3){
			jQuery('#prevProductButton').removeClass();
			jQuery('#nextProductButton').removeClass();
			jQuery('#prevProductButton').addClass('default');
			jQuery('#nextProductButton').addClass('active');
		}
		else {
			jQuery('#nextProductButton').removeClass();
			jQuery('#nextProductButton').addClass('active');
		}

		resetPixel(285);
		jQuery('#currentProductCount').val(currentProductCount-1);
	}
	else if(direction == 'next') {
		if(currentProductCount+1 == Number(jQuery('#productCount').val())) {
			jQuery('#prevProductButton').removeClass();
			jQuery('#nextProductButton').removeClass();
			jQuery('#prevProductButton').addClass('active');
			jQuery('#nextProductButton').addClass('default');
		}
		else {
			jQuery('#prevProductButton').removeClass();
			jQuery('#prevProductButton').addClass('active');
		}

		resetPixel(-285);
		jQuery('#currentProductCount').val(currentProductCount+1);
	}
}

function resetPixel(pixel)
{
	var originPixel = Number(jQuery('#productList').css('left').replace('px', ''));

	if(pixel == 0) {
		jQuery('#productList').css('left', pixel);
	}
	else {
		jQuery('#productList').css('left', originPixel+pixel);
	}
}

function getProductXML(themeSeq){
	jQuery('#productList').html('');

	jQuery.ajax({
		type: 'get'
		, dataType: 'xml'
		, url: 'http://www.danawa.com/myPage/estimate/xml/?controller=genfiles&methods=getThemeGoodsList&themeSeq=' + themeSeq
		, data: 'arg=L'
		, success: function(xml) {
			var productCount = jQuery(xml).find('themeGoodsList').find('goods').length;

			if(productCount > 0) {
				jQuery(xml).find('themeGoodsList').find('goods').each(function(idx) {
					var representProductSeq = jQuery(this).find('representProductSeq').text();
					var productName = jQuery(this).find('productName').text();
					var additionDetail = jQuery(this).find('additionDetail').text();
					var minimumPrice = jQuery(this).find('minimumPrice').text();
					var representProductImageUrl = jQuery(this).find('representProductImageUrl').text();
					var representProductBlogUrl = jQuery(this).find('representProductBlogUrl').text();
					
					if(productName.length > 32) {
						productName = productName.substring(0, 32) + '..';
					}

					if(additionDetail.length > 36) {
						additionDetail = additionDetail.substring(0, 36) + '..';
					}

					var productListHTML = '<li>' +
							'<a href="' + representProductBlogUrl + '" target="_blank">' +
								'<img src="' + representProductImageUrl + '" alt="">' +
								'<strong>' + productName + '</strong>' +
							'</a>' +
							'<p class="desc">' +
								'<span class="spec">' + additionDetail  + '</span>' +
								'<span class="price">' + numberFormat(minimumPrice) + '원</span>' +
							'</p>' +
						'</li>';

					jQuery('#productList').append(productListHTML);
					jQuery('#currentProductCount').val(3);
					jQuery('#productCount').val(productCount);
				});
			}

			if(productCount > 3) {
				jQuery('#nextProductButton').addClass('active');
			}
		}
		, error: function(xhr, status, error) {alert(error); }
	});
}

function getThemeXML()
{
	jQuery('#themeList').html('');

	jQuery.ajax({
		type: 'get'
		, dataType: 'xml'
		, url: 'http://www.danawa.com/myPage/estimate/xml/?controller=genfiles&methods=getThemeInfo'
		, data: 'arg=L'
		, success: function(xml) {
			var isFirstThemeSeq = true;
			var themeCount = jQuery(xml).find('themeList').find('theme').length;

			if(themeCount > 0) {
				jQuery(xml).find("themeList").find("theme").each(function(idx) {
					var themeSeq = jQuery(this).find("themeSeq").text();
					var themeName = jQuery(this).find("themeName").text();
					var themeGoodsData = jQuery(this).find("themeGoodsData").text();
					
					var themeListHTML = '<li id="theme-' + themeSeq + '"><a>' + themeName + '</a></li>';
					jQuery('#themeList').append(themeListHTML);

					if(isFirstThemeSeq == true) {
						jQuery('#theme-' + themeSeq).addClass('active');

						getProductXML(themeSeq);
						isFirstThemeSeq = false;
					}
				});
			}

			if(themeCount > 6) {
				var themeButtonHTML = '<span class="prevButton">' +
					'<button class="default"></button></span>' +
					'<span class="nextButton"><button class="active"></button></span>';

				jQuery('#themeButton').append(themeButtonHTML);
			}

		}
		, error: function(xhr, status, error) {alert(error); }
	});
}

function setThemesArea()
{
	jQuery("td[id^='theme-']").css({display: 'none'});
	jQuery("td[id^='theme-']").remove('span');
	
	var selectedThemeCount = Number(jQuery('#selectedThemeCount').val());	// 선택된 테마 순번
	var firstThemeCount = Number(jQuery('#firstThemeCount').val());			// 첫 노출 테마 카운트
	var lastThemeCount = Number(jQuery('#lastThemeCount').val());			// 마지막 노출 테마 카운트
	
	for(var index = firstThemeCount; index<=lastThemeCount; index++) {
		jQuery('#theme-' + index).css({display: ''});

		if(index == selectedThemeCount) {
			jQuery('#theme-' + index).removeClass();
			jQuery('#theme-' + index).addClass('freeset_top_menu_on');
			jQuery('#theme-' + index).children().wrap('<span class="freeset_txt_on"></span>');
		}
	}
}

function setProductsArea()
{
	jQuery("td[id^='product-']").css({display: 'none'});

	var firstProductCount = Number(jQuery('#firstProductCount').val());
	var lastProductCount = Number(jQuery('#lastProductCount').val());

	for(var index = firstProductCount; index<=lastProductCount; index++) {
		jQuery('#product-' + index).css({display: ''});
	}
}

function setThemeCount(direction)
{
	var themeCount = jQuery('#themeCount').val();				// 상품수
	var firstThemeCount = jQuery('#firstThemeCount').val();		// 첫 노출 테마 카운트
	var lastThemeCount = jQuery('#lastThemeCount').val();		// 마지막 노출 테마 카운트

	if(direction == 'prev') {
		if(firstThemeCount <= 0) {
			jQuery('#prevTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_left_btn_off.gif');
			jQuery('#nextTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_right_btn_on.gif');
			// alert('첫 페이지입니다.');
			return false;
		}
		else {
			jQuery('#prevTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_left_btn_on.gif');
			jQuery('#nextTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_right_btn_on.gif');
			firstThemeCount--;
			lastThemeCount--;
		}
	}
	else if(direction == 'next') {
		if(lastThemeCount >= themeCount-1) {
			jQuery('#prevTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_left_btn_on.gif');
			jQuery('#nextTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_right_btn_off.gif');
			// alert('마지막 페이지입니다.');
			return false;
		}
		else {
			jQuery('#prevTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_left_btn_on.gif');
			jQuery('#nextTheme').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_right_btn_on.gif');
			firstThemeCount++;
			lastThemeCount++;
		}
	}
	else {
		return false;
	}

	jQuery('#firstThemeCount').val(firstThemeCount);
	jQuery('#lastThemeCount').val(lastThemeCount);
}

function setProductCount(direction)
{
	var productCount = jQuery('#productCount').val();				// 상품수
	var firstProductCount = jQuery('#firstProductCount').val();		// 첫 노출 상품 카운트
	var lastProductCount = jQuery('#lastProductCount').val();		// 마지막 노출 상품 카운트

	if(direction == 'prev') {
		if(firstProductCount <= 0) {
			jQuery('#prevProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_left_off.gif');
			jQuery('#nextProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_right_on.gif');
			// alert('첫 페이지입니다.');
			return false;
		}
		else {
			jQuery('#prevProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_left_on.gif');
			jQuery('#nextProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_right_on.gif');
			firstProductCount--;
			lastProductCount--;
		}
	}
	else if(direction == 'next') {
		if(lastProductCount >= productCount-1) {
			jQuery('#prevProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_left_on.gif');
			jQuery('#nextProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_right_off.gif');
			// alert('마지막 페이지입니다.');
			return false;
		}
		else {
			jQuery('#prevProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_left_on.gif');
			jQuery('#nextProduct').children().attr('src', 'http://img.danawa.com/new/estimate_new/img/freeset_pro_btn_right_on.gif');
			firstProductCount++;
			lastProductCount++;
		}
	}
	else {
		return false;
	}

	jQuery('#firstProductCount').val(firstProductCount);
	jQuery('#lastProductCount').val(lastProductCount);
}

function numberFormat(input){ 
    var input = String(input); 
    var reg = /(\-?\d+)(\d{3})($|\.\d+)/; 
    if(reg.test(input)){ 
        return input.replace(reg, function(str, p1,p2,p3){ 
                return numberFormat(p1) + "," + p2 + "" + p3; 
            }     
        ); 
    }else{ 
        return input; 
    } 
}

function strReplace(text, oldstr, newstr) 
{
	cnt = text.length;

	retValue = "";

	for(i=0; i < cnt; i++){
		if (text.charAt(i) == oldstr) retValue += newstr;
		else retValue += text.charAt(i);
	}

	return retValue;
}