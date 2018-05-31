/**
 *	@mainpage	
 *
 *	@brief	외부제공용 다나와 온라인 견적서 자바스크립트
 *
 *	@author	㈜다나와 연구2팀 강승엽
 *	@date	2011년 7월 6일 (수)
 *	@file	
 *
 *	@history	
 *	[2011-07-06]
 */

var productsXml;					// 상품 리스트(XML)
var estimateProducts = new Array();	// 견적 리스트
var compareProducts = new Array();	// 상품 비교 리스트

$(function() {
	getAttributes();	// 속성 검색 호출(Ajax)
	getProducts();		// 상품 리스트 호출(Ajax)

	// 클립보드 활성화
	ZeroClipboard.setMoviePath('/globaljs/external/jquery/plugin/zeroClipboard/1.0.7/ZeroClipboard10.swf');
	var clip = new ZeroClipboard.Client();

	// 스텝1 카테고리 선택시
	$("[id^='category-']").click(function() {
		// 1. 스텝2 검색 버튼 색 초기화
		setProductOrder($(".order li a img[alt^='인기상품']").parent());

		// 2. 스텝2. 텍스트 검색 및 페이징 초기화
		$('#searchText').val('');
		$('#page').val('1');

		// 3. 카테고리 시퀀스 저장
		$('#categorySeq').val($(this).attr('id').split('-')[1]);
		$('#attributes').val('');

		// 4. 스텝2 카테고리 이름 변경
		resetCategoryNames();
		setCategoryName($(this));

		// 5. 스텝1 카테고리 이미지 색상 변경
		setCategoryImageColor($(this));

		// 6. 선택한 카테고리에 대한 검색속성 호출 및 노출
		getAttributes();

		// 7. 상품리스트 호출 및 노출
		getProducts();
	});
	
	// 스텝2 정렬 순서 클릭시
	$(".order li a").click(function() {
		setProductOrder($(this));
		getProducts();
	});

	// 스텝2 자세히 보기 클릭시
	$("a[id^='#v']").livequery('click', function() {
		var index = $(this).attr('id').split('v')[1];
		var object = $('#v' + index);
		var isToggle;

		object.css('display') == 'none' ? isToggle = true : isToggle == false;

		$("[id^='v']").each(function() {
			$(this).hide();
		});

		if(isToggle) {
			object.fadeIn('normal');
		}
	});

	// 스텝2 자세히 닫기 클릭시
	$("span[class^='viewClose']").livequery('click', function() {
		$("[id^='v']").each(function() {
			$(this).hide();
		});
	});

	// 스텝2 속성 검색 변경시
	$("select[id^='attribute']").livequery('change', function() {
		var attributesParam = '';

		$("select[id^='attribute']").each(function() {
			var attributeSeq = $(this).attr('id').split('-')[1];
			var attributeValueSeq = $(this).val();
						
			if(attributeValueSeq != 0) {
				attributesParam += attributeSeq + '-' + attributeValueSeq + ',';
			}
		});

		attributesParam = attributesParam.substring(0, attributesParam.length-1);

		$('#attributes').val(attributesParam);

		getProducts();
	});

	// 스텝2 텍스트 검색 클릭시
	$('#textSearch').click(function() {
		if($(this).val() == '제조사/브랜드/상품평') {
			$(this).val('');
		}
	});

	// 스텝2 검색어 입력후 엔터 입력시
	$('#textSearch').keypress(function(e) {
		if(e.keyCode == 13) {
			var searchText = $.trim($('#textSearch').val());
			$('#searchText').val(searchText);

			getProducts();
		};
	});

	// 스텝1 카테고리 구분바 클릭시
	$('.tablist').click(function () {
		$('.equipment').each(function() {
			$(this).slideUp('normal');
		});

		$(this).parent().next().slideDown('normal');
	});

	// 스텝2 속성 검색 바 클릭시
	$('#searchDetail').click(function() {
		if($('#options').attr('class') == 'none' || $('#options').attr('class') == '') {
			setAttributeSlideDown();	
		}
		else {
			setAttributeSlideUp();
		}
	});

	// 스텝2 페이징
	$('.pagination').find('a').livequery('click', function () {
		var page = $(this).html();							// 선택한 페이지
		var currentPage = Number($('#page').val());			// 현재 페이지
		var listsPerPage = Number($('#listPerPage').val());	// 페이지당 상품 리스트 수
		var count = Number($('#count').val());				// 상품 카운트
		var pages = Math.floor(count / listsPerPage);		// 
		
		if(Number(page) > 0) {
			$('#page').val(page);
		}
		else {
			var alt = $(this).find('img').attr('alt');
			var targetPage;

			switch(alt) {
				case '처음':
					targetPage = 1;
					break;
				case '이전':
					if((currentPage - listsPerPage) > 0) {
						targetPage = currentPage - listsPerPage;
					}
					// 페이지가 0이하로 검색 될때 예외 처리 : captain2240 (2011-06-27)
					else {
						targetPage = 1;
					}
					break;
				case '다음':
					if((currentPage + listsPerPage) < pages) {
						targetPage = currentPage + listsPerPage;
					}
					else {
						targetPage = pages;
					}
					break;
				case '마지막':
					targetPage = pages;
					break;
				default:
					break;
			}

			$('#page').val(targetPage);
		}

		if(currentPage != targetPage) {
			getProducts();
		}
	});

	// 스텝2 상품 선택시
	$('.prdSelect').livequery('click', function() {
		var productSeq = Number($(this).parent().parent('tr').attr('id').split('-')[1]);
		
		$('#step3').addClass('stepOff');
		
		addEstimateProduct(productSeq);
		setEstimateProducts();
	});

	// 스텝3 상품 삭제시
	$('.del').find('a').livequery('click', function () {
		var productSeq = $(this).parent().parent().attr('id').split('-')[2];

		deleteEstimateProduct(productSeq);
		setEstimateProducts();

		if(estimateProducts.length == 0) {
			$('#step3').removeClass();
			$('#step3').addClass('estimateStep');			
		}
	});

	// 스텝1, 스텝2, 스텝3 클릭시
	$("div[id^='step']").click(function() {
		$("div[id^='step']").removeClass('stepOn');

		$(this).addClass('estimateStep');
		$(this).addClass('stepOn');

		if(estimateProducts.length == 0) {
			$('#step3').removeClass();
			$('#step3').removeClass();
			$('#step3').addClass('estimateStep');			
		}
	});

	// 스텝3 견적 상품 수 '업 다운' 클릭시
	$('.count').find('span a').livequery('click', function() {
		var productSeq = $(this).parent().parent().parent().attr('id').split('-')[2];
		var productCountUpDown = $(this).find('img').attr('alt');

		setEstimateProductCount(productSeq, productCountUpDown);
		setEstimateProducts();
	});

	
	// 스텝2 상품비교 클릭시
	$('.btnPrdVs').livequery('click', function(){
		var productSeq = Number($(this).parent().parent('tr').attr('id').split('-')[1]);
		
		addCompareProduct(productSeq);
		setCompareProducts();

		$('#prdVS').removeClass('openVS');
		$('#prdVS').slideDown('normal');

		$(this).removeClass();
		$(this).addClass('btnPrdVson');
	});

	// 스텝2 삼품비교 레이어 닫기 클릭시
	$('.btnVS .close').livequery('click', function() {
		$('#prdVS').slideUp('normal', function() {
			$('#prdVS').addClass('openVS');
			$('#prdVS').slideDown('normal');
		});
	});

	// 스텝2 삼품비교 레이어 열기 클릭시
	$('.btnVS .open').livequery('click', function() {
		$('#prdVS').slideUp('normal', function() {
			$('#prdVS').removeClass('openVS');
			$('#prdVS').slideDown('normal');
		})
		
	});

	// 스텝3 템플릿 클립보드
	$('#zeroClipboard').mouseover(function() {
		var estimateTemplateHtml = getEstiamteTemplateHtml();
	
		ZeroClipboard.setMoviePath('/globaljs/external/jquery/plugin/zeroClipboard/1.0.7/ZeroClipboard10.swf');
		var clip = new ZeroClipboard.Client();
				
		clip.setText(estimateTemplateHtml);
		clip.glue('zeroClipboard');
		clip.show();

		clip.addEventListener('complete', function (client) {
			if(estimateProducts.length > 0) {
				alert("클립보드에 복사되었습니다. \'Ctrl+v\'를 눌러 붙여넣기 해주세요.");
				clip.destroy();
			}
			else {
				alert('견적 상품이 없습니다.');
			}
		});
	});

	// 각 스텝을 포함한 버튼 이벤트
	$('.btns a').livequery('click', function() {
		var action = $(this).find('img').attr('alt');

		switch(action) {
			case '전체 선택':
				$('.vsBox :checkbox').attr('checked', 'checked');

				break;
			case '선택 비교':
				var object = $('.vsBox input:checked');

				if(object.length > 0) {
					popupProductCompareWindow(object);
				}
				else {
					alert('비교할 상품을 선택해주세요.');

					return false;
				}

				break;
			case '선택 삭제':
				var object = $('.vsBox input:checked');

				if(object.length > 0) {
					deleteCompareProduct(object);
				}

				setCompareProducts();

				if(compareProducts.length == 0) {
					$('#prdVS').slideUp('normal');
				}

				break;

			case '견적퍼가기':
				// 스텝3 템플릿 클립보드

				break;

			case '쇼핑몰별 가격비교':
				if(estimateProducts.length > 0) {
					if(confirm('이 서비스는 다나와 사이트에서 이용 가능합니다.\n이동하시겠습니까?')) {
						popupCompanyCompareWindow();
					}
				}
				else {
					alert('견적상품이 없습니다.');
				}
				
	
				break;

			case '다나와 안전거래로 구매신청 등록':
				if(estimateProducts.length > 0) {
					if(confirm('이 서비스는 다나와 사이트에서 이용 가능합니다.\n이동하시겠습니까?')) {
						var isLogin = $('#isLogin').val();

						if(isLogin == 'N') {
							window.open('http://shop.danawa.com/shopLogin.php?type=outerEstimate', '', 'width=390,height=220,top=0,left=0,scrollbars=no,resizable=no');
						}
						else {
							popupDanawaSafeTradeWindow();
						}
					}
				}
				else {
					alert('견적상품이 없습니다.');
				}

				break;

			default:
				break;
		}
	});

	$('#guide').click(function() {
		popupEstimateGuideWindow();
	});
});

function getEstimateProduct(productSeq) {
	for(var index=0; index<estimateProducts.length; index++) {
		if(estimateProducts[index].productSeq == productSeq) {
			return estimateProducts[index];
		}
	}
}

function getCompareProduct(productSeq) {
	for(var index=0; index<compareProducts.length; index++) {
		if(compareProducts[index].productSeq == productSeq) {
			return compareProducts[index];
		}
	}
}

function getProductXml(productSeq) {
	var productObject;

	$(productsXml).find('products').children('product').each(function (){
		if(productSeq == Number($(this).find('seq').text())) {
			productObject = $(this);
		}
	});

	return productObject;
}

function getEstiamteTemplateHtml() {
	var now = new Date();

	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var rawHour = now.getHours();
	var minute = now.getMinutes();

	if(rawHour < 12) {
		var meridiem = 'AM';
	}
	else {
		var meridiem = 'PM';
	}

	var hour = rawHour % 12;

	if(hour == 0) {
		hour = 12;
	}

	var totalPrice = 0;
	var popupCompanyCompareUrl = 'http://www.danawa.com/myPage/estimate/save_list.php?view=2&method=get&folderSeq=0&optCate1=1&prodInfo=';
	var popupDanawaSafeTradeUrl = 'http://shop.danawa.com/pc/?controller=estimateDeal&methods=form&type=clippingEstimate';
	var popupDanawaSafeTradeParams = new Array('&pcode=', '&cate1=', '&cate2=', '&cate3=', '&cate4=', '&pname=', '&cardq=', '&cnt=');

	var estimateTemplateHtml = '<div style="width:730px;margin:25px 30px; background:#fff;">' +
		'<style type="text/css">' +
			'body,div,table,tr,th,td,img,span,p,ul,li {margin:0; padding:0;}' +
			'img {border:0;}' +
		'</style>' +
		'<table border="0" cellpadding="0" cellspacing="0" style="width:730px;background:#fff;">' +
			'<tbody>' +
				'<tr>' +
					'<td style="width:304px;"><img src="http://img.danawa.com/new/mail/estimate/img/danawa_logo.gif" border="0" alt="danawa.com" /><img src="http://img.danawa.com/new/mail/estimate/img/online_estimate.gif" border="0" alt="가상온라인 견적서" style="margin:3px 0 0 14px;" /></td>' +
					'<td colspan="3" style="padding-top:12px;text-align:right;"><span style="padding:4px 5px 3px 5px; color:#fff;font-size:11px;font-family:dotum;line-height:18px;background:#94b7ef;">저장일시 - ' + year + '년 ' + month + '월 ' + day + '일 ' + meridiem + ' ' + hour + '시:' + minute + '분</span></td>' +
				'</tr>' +
				'<tr>' +
					'<td colspan="4" style="padding:19px 0 7px 0;">' +
						'<table border="0" cellpadding="0" cellspacing="0" style="width:730px;color:#666;border-bottom:1px solid #7384b8;font-size:12px;font-family:dotum;">' +
							'<thead>' +
								'<tr>' +
									'<th scope="col" style="width:74px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">품목</th>' +
									'<th scope="col" style="width:50px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">이미지</th>' +
									'<th scope="col" style="width:286px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">상품평</th>' +
									'<th scope="col" style="width:50px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">업체수</th>' +
									'<th scope="col" style="width:75px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">평균가</th>' +
									'<th scope="col" style="width:75px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">최저가</th>' +
									'<th scope="col" style="width:30px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">수량</th>' +
									'<th scope="col" style="width:90px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">합계</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody>';

	for(var index=0; index<estimateProducts.length; index++) {
		totalPrice += estimateProducts[index].minimumPrice * estimateProducts[index].productCount;

		popupCompanyCompareUrl += estimateProducts[index].productSeq + '^'
			+ estimateProducts[index].productCount + '^'
			+ estimateProducts[index].categorySeq1 + '^'
			+ estimateProducts[index].categorySeq2 + '^'
			+ estimateProducts[index].categorySeq3 + '^'
			+ estimateProducts[index].categorySeq4 + '|';

		popupDanawaSafeTradeParams[0] += estimateProducts[index].productSeq + ',';
		popupDanawaSafeTradeParams[1] += estimateProducts[index].categorySeq1 + ',';
		popupDanawaSafeTradeParams[2] += estimateProducts[index].categorySeq2 + ',';
		popupDanawaSafeTradeParams[3] += estimateProducts[index].categorySeq3 + ',';
		popupDanawaSafeTradeParams[4] += estimateProducts[index].categorySeq4 + ',';
		popupDanawaSafeTradeParams[5] += encodeURIComponent(estimateProducts[index].productName) + ',';
		popupDanawaSafeTradeParams[6] += estimateProducts[index].minimumPrice + ',';
		popupDanawaSafeTradeParams[7] += estimateProducts[index].productCount + ',';

		var productBlogUrl = 'http://prod.danawa.com/info/?pcode=' + estimateProducts[index].productSeq;
		var categoryName = getCategoryName(estimateProducts[index].categorySeq2);

		estimateTemplateHtml += '<tr>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + categoryName + '</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;text-align:center;"><img src="' + estimateProducts[index].productImage + '" border="0" alt="" /></td>' +
			'<td style="padding:6px 0 7px 22px;border-bottom:1px solid #ccc;color:#333;"><a href="' + productBlogUrl + '" target="_blank">' + estimateProducts[index].productName + '</a></td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + estimateProducts[index].shopCount + '</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + getNumberFormat(estimateProducts[index].avgPrice) + '원</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + getNumberFormat(estimateProducts[index].minimumPrice) + '원</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + estimateProducts[index].productCount + '</td>' +
			'<td style="padding:6px 18px 7px 0;border-bottom:1px solid #ccc;color:#fe6700;font-weight:bold;text-align:right;">' + getNumberFormat(estimateProducts[index].minimumPrice * estimateProducts[index].productCount) + '원</td>' +
		'</tr>';
	}
	
	popupCompanyCompareUrl = popupCompanyCompareUrl.substring(0, popupCompanyCompareUrl.length-1);

	for(var index in popupDanawaSafeTradeParams) {
		popupDanawaSafeTradeUrl += popupDanawaSafeTradeParams[index].substring(0, popupDanawaSafeTradeParams[index].length-1);
	}

	estimateTemplateHtml += '<tr>' +
								'<th scope="row" colspan="6" style="padding:10px 0 10px 24px;color:#323234;text-align:left;background:#f0f4ff;">총합 <span style="color:#666;font-size:11px;font-weight:normal;">(O/S 설치비, 조립비 미포함)</span></th>' +
								'<td colspan="2" style="padding:10px 18px 10px 0;color:#fe6700;font-weight:bold;text-align:right;background:#f0f4ff;">' + getNumberFormat(totalPrice) + '원</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
				'</td>' +
			'</tr>' +
			'<tr class="btns">' +
				'<td style="width:304px;vertical-align:top;">' +
					'<a href="http://pcshop.danawa.com?logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_pcgo.gif" style="vertical-align:top;" border="0" alt="다나와PC 바로가기" /></a>' +
				'</td>' +
				'<td style="width: 99px"><a href="http://img.danawa.com/new/estimate_out/estimate_guide1.html" target="_blank"><img src="http://img.danawa.com/new/estimate_out/images/btn_mailguide.gif" border="0"></a></td>' +
				'<td style="width:140px;text-align:right;">' +
					'<a href="' + popupCompanyCompareUrl + '&logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_price.gif" style="vertical-align:top;" border="0" alt="쇼핑몰별 가격비교" /></a>' +
				'</td>' +
				'<td style="width:195px;text-align:right;">' +
					'<a href="' + popupDanawaSafeTradeUrl + '&logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_apply.gif" style="vertical-align:top;" border="0" alt="다나와 안전거래로 구매신청 등록" /></a>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td colspan="4" style="padding-top:30px;">' +
					'<p style="margin:0 0 6px 0;padding:0;"><img src="http://img.danawa.com/new/mail/estimate/img/reading.gif" border="0" alt="꼭 읽어보세요!" /></p>' +
					'<ul style="list-style:none;margin:0;padding:0;border-top:14px solid #f6f6f6;border-bottom:10px solid #f6f6f6;background:#f6f6f6;">' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />가상견적서는 다나와가 제공하는 서비스로 <span style="color:#3960ea;">주문서로의 효력을 갖지 않습니다.</span></li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />위 가격은 해당 상품에 대해 <span style="color:#3960ea;">다나와 협력사가 제시한 금액 중 견적을 저장한 시점의 최저가만을 표시</span>한 것입니다.</li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />가격정보는 수시로 업데이트가 되지 않으며 가상온라인견적서 작성 후 <span style="color:#3960ea;">실제 상품 구매 시 금액은 다를 수 있습니다.</span></li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />견적퍼가기 시 <span style="color:#3960ea;">HTML 모드로 선택 후 붙여넣기(Ctrl+ V)</span>하시기 바랍니다.</li>' +
						// '<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />견적퍼가기 시 글 작성 모드에서 <span style="color:#3960ea;">스크립트차단 시 견적퍼가기, 쇼핑몰별 가격비교, 다나와 안전거래로 구매신청 등록 버튼 사용이 불가</span>합니다.</li>' +
					'</ul>' +
				'</td>' +
			'</tr>' +
		'</tbody>' +
	'</table>' +
	'</div>';

	return estimateTemplateHtml;
}

function popupEstimateGuideWindow() {
	var popupUrl = 'http://img.danawa.com/new/estimate_out/estimate_guide1.html';

	window.open(popupUrl, 'estimateGuide', 'width=750,height=620,top=0,left=0,scrollbars=no,resizable=no');
}

function popupDanawaSafeTradeWindow() {
	setProductsForm();

	var productFormObject = document.productsForm;
	var targetWindow = 'DanawaSafeTradeWindow';

	window.open('', targetWindow, 'width=780,height=730,top=0,left=0,scrollbars=yes,resizable=no');

	productFormObject.action = 'http://shop.danawa.com/pc/?controller=estimateDeal&methods=form';
	productFormObject.target = targetWindow;
	productFormObject.method = 'post';
	
	productFormObject.submit();
	
	return false;
}

function popupCompanyCompareWindow() {
	setProductsForm();

	var productFormObject = document.productsForm;
	var targetWindow = 'companyCompareWindow';

	window.open('', targetWindow, '');

	productFormObject.action = "http://www.danawa.com/myPage/estimate/save_list.php?view=2";
	productFormObject.target = targetWindow;
	productFormObject.method = 'post';

	productFormObject.submit();
	
	return false;
}

function setProductsForm() {
	var productFormHtml = getProductsFormHtml();

	$('#productsForm').html('');
	$('#productsForm').append(productFormHtml);
}

function getProductsFormHtml() {
	var productFormHtml = '<input type="hidden" name="folder_seq" value="0" />' +
		'<input type="hidden" name="optcate1" value="1" />' +
		'<input type="hidden" name="cmd" value="SAVE" />' +
		'<input type="hidden" name="mode" value="onlineEstimate" />';

	for(var index=0; index<estimateProducts.length; index++) {
		productFormHtml += '<input type="hidden" name="pcode[]" value="' + estimateProducts[index].productSeq + '">';
		productFormHtml += '<input type="hidden" name="cate1_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].categorySeq1 + '">';
		productFormHtml += '<input type="hidden" name="cate2_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].categorySeq2 + '">';
		productFormHtml += '<input type="hidden" name="cate3_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].categorySeq3 + '">';
		productFormHtml += '<input type="hidden" name="cate4_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].categorySeq4 + '">';
		productFormHtml += '<input type="hidden" name="pcode_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].productSeq + '">';
		productFormHtml += '<input type="hidden" name="cardq_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].minimumPrice + '">';
		productFormHtml += '<input type="hidden" name="pname_'+ estimateProducts[index].productSeq +'" value="' + encodeURIComponent(estimateProducts[index].productName) + '">';
		productFormHtml += '<input type="hidden" name="cnt_'+ estimateProducts[index].productSeq +'" value="' + estimateProducts[index].productCount + '">';
		productFormHtml += '<input type="hidden" name=vcardq_'+ estimateProducts[index].productSeq +'" value="">';
	}

	return productFormHtml;
}

function popupProductCompareWindow(object) {
	// http://www.danawa.com/elec/prod_view/prod_view_compare.php?cmd=view&prod_c_list=861 873 959 0 3 1273110|861 873 959 0 3 1317974
	var popupProductCompareUrl = 'http://www.danawa.com/elec/prod_view/prod_view_compare.php?cmd=view&prod_c_list=';

	object.each(function() {
		var productSeq = $(this).parent().parent().attr('id').split('-')[1];

		for(var index=0; index<compareProducts.length; index++) {
			if(compareProducts[index].productSeq == productSeq) {
				popupProductCompareUrl += compareProducts[index].categorySeq1 + ' '
					+ compareProducts[index].categorySeq2 + ' '
					+ compareProducts[index].categorySeq3 + ' '
					+ compareProducts[index].categorySeq4 + ' 3 '
					+ compareProducts[index].productSeq + '|';
			}
		}
	});

	popupProductCompareUrl = popupProductCompareUrl.substring(0, popupProductCompareUrl.length-1);

	window.open(popupProductCompareUrl);
}

function deleteCompareProduct(object) {
	object.each(function() {
		var productSeq = $(this).parent().parent().attr('id').split('-')[1];

		for(var index=0; index<compareProducts.length; index++) {
			if(compareProducts[index].productSeq == productSeq) {
				compareProducts.splice(index, 1);
			}
		}

		var productObject = getProductXml(productSeq);

		if(typeof productObject == 'object') {
			setProductCompareSelectHtml(productSeq, 0);
		}
	});
}

function setCompareProducts() {
	var compareProductHtml = '<h4><img src="http://img.danawa.com/new/estimate_out/images/selectvs.gif" alt="선택상품 비교하기" /></h4>' +
		'<div class="vsBox">' +
			'<ul>';

	for(var index=0; index<compareProducts.length; index++) {
		var estimateProductHtml = '';
		
		var productSeq = compareProducts[index].productSeq;
		var categorySeq1 = compareProducts[index].categorySeq1;
		var categorySeq2 = compareProducts[index].categorySeq2;
		var categorySeq3 = compareProducts[index].categorySeq3;
		var categorySeq4 = compareProducts[index].categorySeq4;
		var productName = compareProducts[index].productName;
		var productImage = compareProducts[index].productImage;
		var minimumPrice = compareProducts[index].minimumPrice;

		compareProductHtml += '<li id="productCompare-' + productSeq + '">' +
				'<img src="' + productImage + '" width="48" height="48" alt="" />' +
				'<label>' +
					productName.cutString(28) + '<br />' +
					'<span>' + getNumberFormat(minimumPrice) + '원</span>' +
					'<input type="checkbox" />' +
				'</label>' +
			'</li>';
	}

	compareProductHtml += '</ul><span class="btns">' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_allselect.gif" alt="전체 선택" /></a>' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_vs.gif" alt="선택 비교" /></a>' +
				'<a class="del"><img src="http://img.danawa.com/new/estimate_out/images/btn_delete.gif" alt="선택 삭제" /></a>' +
			'</span>' +
		'</div>' +
		'<span class="btnVS">' +
			'<a><span class="close">닫기</span><span class="open">열기</span></a>' +
		'</span>';

	$('#prdVS').html('');
	$('#prdVS').append(compareProductHtml);
}

function addCompareProduct(productSeq) {
	if(compareProducts.length < 6) {
		$(productsXml).find('products').children('product').each(function () {
			if(productSeq == Number($(this).find('seq').text())) {
				var compareProduct = new Object();

				for(var index=0; index<compareProducts.length; index++) {
					if(compareProducts[index].productSeq == productSeq) {
						return false;
					}
				}

				compareProduct.productSeq = productSeq;
				compareProduct.productName = $(this).find('name').text();
				compareProduct.categorySeq1 = $(this).find('categorySeq1').text();
				compareProduct.categorySeq2 = $(this).find('categorySeq2').text();
				compareProduct.categorySeq3 = $(this).find('categorySeq3').text();
				compareProduct.categorySeq4 = $(this).find('categorySeq4').text();
				compareProduct.minimumPrice = Number($(this).find('minimumPrice').text());
				compareProduct.productImage = $(this).children('productImage').text();

				compareProducts.push(compareProduct);

				return false;
			}
		});
	}
	else {
		alert('더 이상 상품을 추가할 수 없습니다.');

		return false;
	}
}

function setEstimateProductCount(productSeq, productCountUpDown) {
	for(var index=0; index<estimateProducts.length; index++) {
		if(estimateProducts[index].productSeq == productSeq) {
			if(productCountUpDown == 'plus') {
				estimateProducts[index].productCount = estimateProducts[index].productCount + 1;
			}
			else if(productCountUpDown == 'minus') {
				if(estimateProducts[index].productCount > 1) {
					estimateProducts[index].productCount = estimateProducts[index].productCount - 1;
				}
			}
			else {
				// 예외처리
			}

			return false;
		}
	}
}

function getTotalPrice() {
	var totalPrice = 0;

	for(var index=0; index<estimateProducts.length; index++) {
		totalPrice += (estimateProducts[index].minimumPrice * estimateProducts[index].productCount);
	}

	return totalPrice;
}

function resetEstimateProducts() {
	$("tr[id^='product-']").each(function (){
		$(this).remove();
	});

	$("tr[id^='estimateTheme-']").each(function (){
		$(this).hide();
	});
}

function setEstimateProducts() {
	resetEstimateProducts();

	/*
	<td class="pname">인텔 코어 i5 760 (린필드)(정품)</td>
	<td class="count">
		<input type="text" size="2" value="1" class="intxt" id="cnt_01" />
		<span>
			<a href="javascript:count_change('01','PLUS');"><img src="http://img.danawa.com/new/estimate_out/images/btn_plus.gif" alt="plus" /></a>
			<a href="javascript:count_change('01','MINUS');"><img src="http://img.danawa.com/new/estimate_out/images/btn_minus.gif" alt="minus" /></a>
		</span>
	</td>
	<td class="won">214,000</td>
	<td class="del"><a href="#"><img src="http://img.danawa.com/new/estimate_out/images/btn_del.gif" alt="삭제" /></a></td>
	*/

	for(var index=0; index<estimateProducts.length; index++) {
		var estimateProductHtml = '';

		var categorySeq2 = estimateProducts[index].categorySeq2;
		var productSeq = estimateProducts[index].productSeq;
		var productName = estimateProducts[index].productName;
		var minimumPrice = estimateProducts[index].minimumPrice;
		var productCount = estimateProducts[index].productCount;

		var productBlogUrl = 'http://prod.danawa.com/info/?pcode=' + productSeq;

		var estimateProductHtml = '<tr id="product-' + categorySeq2 + '-' + productSeq + '"><td class="pname"><a href="' + productBlogUrl + '" target="_blank">' + productName + '</a></td>' +
			'<td class="count">' +
				'<input type="text" size="2" value="' + productCount + '" class="intxt" id="cnt_01" />' +
				'<span>' +
					'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_plus.gif" alt="plus" /></a>' +
					'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_minus.gif" alt="minus" /></a>' +
				'</span>' +
			'</td>' +
			'<td class="won">' + getNumberFormat(minimumPrice) + '</td>' +
			'<td class="del"><a><img src="http://img.danawa.com/new/estimate_out/images/btn_del.gif" alt="삭제" /></a></td></tr>';

		var targetElement = $("#selPcSet tr[id*='estimate'][id*='" + categorySeq2 + "']");
		var estimateTheme = targetElement.attr('id').split('-')[1];

		targetElement.after(estimateProductHtml);
		$("#selPcSet tr[id^='estimateTheme-" + estimateTheme + "']").show();
		
		
	}

	$("tr[id^='estimate-']").each(function (){
		if((typeof $(this).next().attr('id') != 'undefined') && $(this).next().attr('id').indexOf('product-') == 0) {
			var categorySeq2 = $(this).attr('id').split('-')[2];
			var categoryName = getCategoryName(categorySeq2);
			var productCountPerCategory = $("tr[id^=product-" + categorySeq2 + "]").length;

			$(this).next().prepend('<th scope="row" rowspan="' + productCountPerCategory + '" class="part">' + categoryName + '</th>');
		}
	});

	$('.totalWon').find('span').html(getNumberFormat(getTotalPrice()) + '원');
}

function getCategoryName(categorySeq2) {
	var categoryName = '';

	if($('#category-' + categorySeq2).find('img').attr('alt')) {
		categoryName = $('#category-' + categorySeq2).find('img').attr('alt');
	}
	else {
		categoryName = $("ul li a[id^='category-" + categorySeq2 + "']").html();
	}

	return categoryName;
}

function deleteEstimateProduct(productSeq) {
	for(var index=0; index<estimateProducts.length; index++) {
		if(estimateProducts[index].productSeq == productSeq) {
			estimateProducts.splice(index, 1);
		}
	}

	setProductSelectHtml(productSeq, 0);
}

function setProductSelectHtml(productSeq, action) {
	var object = $('#prdList #lv-' + productSeq).find('.prdSelect');

	if(action == 0) {
		object.removeClass('prdClear');
	}
	else if(action == 1) {
		object.addClass('prdClear');
	}
}

function setProductCompareSelectHtml(productSeq, action) {
	var object = $('#prdList #lv-' + productSeq).find("a[class^='btnPrdVs']");

	if(action == 0) {
		object.removeClass();
		object.addClass('btnPrdVs');
	}
	else if(action == 1) {
		object.removeClass();
		object.addClass('btnPrdVsOn');
	}
}

function addEstimateProduct(productSeq) {
	$(productsXml).find('products').children('product').each(function () {
		if(productSeq == Number($(this).find('seq').text())) {
			var estimateProduct = new Object();

			for(var index=0; index<estimateProducts.length; index++) {
				if(estimateProducts[index].productSeq == productSeq) {
					estimateProducts[index].productCount = estimateProducts[index].productCount + 1;

					return false;
				}
			}

			estimateProduct.productSeq = productSeq;
			estimateProduct.productName = $(this).find('name').text();
			estimateProduct.categorySeq1 = $(this).find('categorySeq1').text();
			estimateProduct.categorySeq2 = $(this).find('categorySeq2').text();
			estimateProduct.categorySeq3 = $(this).find('categorySeq3').text();
			estimateProduct.categorySeq4 = $(this).find('categorySeq4').text();
			estimateProduct.productImage = $(this).find('productImage').text();
			estimateProduct.shopCount = $(this).find('shopCount').text();
			estimateProduct.minimumPrice = Number($(this).find('minimumPrice').text());
			estimateProduct.avgPrice = Number($(this).find('avgPrice').text());
			estimateProduct.productCount = 1;

			estimateProducts.push(estimateProduct);

			return false;
		}
	});

	setProductSelectHtml(productSeq, 1);
}

function setAttributeSlideUp() {
	$('#options').slideUp('normal');
	$('#options').removeClass();
	$('#options').addClass('none');

	var src = $('#searchDetail').find('img').attr('src');
	src = src.replace('open.gif', 'close.gif');
	$('#searchDetail').find('img').attr('src', src);
}

function setAttributeSlideDown() {
	$('#options').slideDown('normal');
	$('#options').removeClass();
	$('#options').addClass('block');

	var src = $('#searchDetail').find('img').attr('src');
	src = src.replace('close.gif', 'open.gif');
	$('#searchDetail').find('img').attr('src', src);
}

function setCategoryImageColor(object) {
	$('.pcset').find('img').each(function() {
		var src = $(this).attr('src');
		src = src.replace('_on.gif', '.gif');

		$(this).attr('src', src);
	});

	var src = object.children('img').attr('src');

	if(typeof src != 'undefined') {
		src = src.replace('.gif', '_on.gif');
		object.children('img').attr('src', src);
	}
}

function resetCategoryNames() {
	$("li a[id^='category']").each(function() {
		$(this).css('font-weight', '');
	});
}

function setCategoryName(object) {
	// 1. 
	var categoryName = object.children('img').attr('alt')

	if(typeof categoryName == 'undefined') {
		categoryName = object.html();

		object.css('font-weight', 'bold');
	}

	$('#categoryName').html(categoryName);
}

function getAttributes() {
	var attributeUrl = 'http://www.danawa.com/myPage/estimate/outerService/get/attribute.php';
	var categorySeq = $('#categorySeq').val();
	
	$.ajax({
		type: 'get',
		dataType: 'xml', 
		url: attributeUrl + '?categorySeq=' + categorySeq,
		data: 'arg=L',
		success: function(xml) {
			setAttributes(xml);
		},
		error: function(xhr, status, error) {
			// 에러처리
		}
	});
}

function setAttributes(xml) {
	var attributesHtml = '';
	var attributeLength = $(xml).find('attributes').find('attribute').length;

	if(attributeLength > 0) {
		$(xml).find('attributes').children('attribute').each(function(idx) {
			/*
			<select title="밝기분류">
				<option value="">밝기(㎡)</option>
				<option value="">밝기(㎡)</option>
				<option value="">밝기(㎡)</option>
				<option value="">밝기(㎡)</option>
				<option value="">밝기(㎡)</option>
			</select>
			*/

			var attributeSeq = $(this).children('attributeSeq').text();
			var attributeName = $(this).children('attributeName').text();
			var attributeValues = $(this).children('attributeValues');

			attributesHtml += '<select id="attribute-' + attributeSeq + '" title="' + attributeName + '" value="0"><option value="0">' + attributeName + '</option>';

			$(attributeValues).children('attributeValue').each(function(idx) {
				var attributeValueSeq = $(this).find('attributeValueSeq').text();
				var attributeValueName = $(this).find('attributeValueName').text();
				
				attributesHtml += '<option value="' + attributeValueSeq + '">' + attributeValueName + '</option>';
			});

			attributesHtml += '</select>';
			
		});

		$('#options').html('');
		$('#options').append(attributesHtml);
	}
	else {
		// 예외처리
	}
}

function getProducts() {
	setAttributeSlideUp();

	var attributeUrl = 'http://www.danawa.com/myPage/estimate/outerService/get/product.php';
	var categorySeq = $('#categorySeq').val();
	var attributes = $('#attributes').val();
	var productOrder = $('#productOrder').val();
	var searchText = $('#searchText').val();
	var requestUrl = attributeUrl + '?categorySeq=' + categorySeq;
	var page = $('#page').val();

	if(attributes != '') {
		requestUrl += '&attributes=' + attributes;
	}

	requestUrl += '&attributes=' + attributes + '&productOrder=' + productOrder + '&searchText=' + encodeURI(searchText) + '&page=' + page;
	
	$.ajax({
		type: 'get',
		dataType: 'xml', 
		url: requestUrl,
		data: 'arg=L',
		success: function(xml) {
			setProducts(xml);
			productsXml = xml;
		},
		error: function(xhr, status, error) {
			$('#prdList').html('');
			$('#prdList').html('<div align="center" height="300"><br /><br /><br /><br />검색된 상품이 없습니다.</div>');
		}
	});
}

function setProducts(xml) {
	var productHtml = '<table border="0" cellspacing="0" cellpadding="0" summary="제품을 선택해주세요."><tbody>';
	var productLength = $(xml).find('products').find('count').text();
	var index = 1;

	if(productLength > 0) {
		$('#count').val($(xml).find('count').text());
		
		$(xml).find('products').children('product').each(function(idx) {
			/*
			<tbody>
				<tr id="lv1">
					<td class="prdImg"><img src="http://img.danawa.com/new/estimate_out/images/item01.gif" width="48" height="48" alt="" /></td>
					<th scope="col" class="prdTitle">
						<a href="#">인텔 코어 i5 760 (린필드) (정품)</a>
						<span class="lowest">최저가 141,500원 / 업체수 178</span>
					</th>
					<td class="choices">
						<a href="#" class="prdSelect">견 적 선 택</a>
						<!-- <a href="#" class="prdSelect prdClear">견 적 해 제</a> -->
						<a href="#v1"><img src="http://img.danawa.com/new/estimate_out/images/btn_expand.gif" alt="자세히보기" /></a><a href="#prdVS" onclick="showToggle('prdVS');return false;" class="btnPrdVs">상품비교</a>
						<!-- <a href="#prdVS" onclick="showToggle('prdVS');return false;" class="btnPrdVson">비 교</a> -->
					</td>
				</tr>
			</tbody>
			*/

			var productSeq = $(this).children('seq').text();
			var productName = $(this).children('name').text();
			var categorySeq1 = $(this).children('categorySeq1').text();
			var categorySeq2 = $(this).children('categorySeq2').text();
			var categorySeq3 = $(this).children('categorySeq3').text();
			var categorySeq4 = $(this).children('categorySeq4').text();
			var minimumPrice = $(this).children('minimumPrice').text();
			var shopCount = $(this).children('shopCount').text();
			var description = $(this).children('description').text();
			var productImage = $(this).children('productImage').text();
			var productBlogUrl = 'http://prod.danawa.com/info/?pcode=' + productSeq;
			
			var product = getEstimateProduct(productSeq);
	
			if(typeof product == 'undefined') {
				var productSelectHtml = '<a class="prdSelect">견 적 선 택</a>';
			}
			else {
				// var productSelectHtml = '<a class="prdSelect prdClear">견 적 해 제</a>';
				var productSelectHtml = '<a class="prdSelect prdClear">견 적 선 택</a>';
			}

			var compareProduct = getCompareProduct(productSeq);

			if(typeof compareProduct == 'undefined') {
				var compareProductSelectHtml = '<a class="btnPrdVs">상품비교</a>';
			}
			else {
				var compareProductSelectHtml = '<a class="btnPrdVson">상품비교</a>';
			}

			productHtml += '<tr id="lv-' + productSeq + '">' +
				'<td class="prdImg"><img src="' + productImage + '" width="48" height="48" alt="" /></td>' +
				'<th scope="col" class="prdTitle">' +
				'<a href="' + productBlogUrl + '" target="_blank">' + productName + '</a>' +
				'<span class="lowest">최저가 ' + getNumberFormat(minimumPrice) + '원 / 업체수 ' + shopCount + '</span>' +
				'</th>' +
				'<td class="choices">' +
				productSelectHtml +
				'<a id="#v-' + productSeq + '"><img src="http://img.danawa.com/new/estimate_out/images/btn_expand.gif" alt="자세히보기" /></a>' + compareProductSelectHtml +
				'</td>' +
				'</tr>' +
				'<tr id="v-' + productSeq + '" class="prdView" style="display: none;">' +
				'<td colspan="3">' + description +
					'<span class="viewClose"><a>닫기</a></span>' +
				'</td>' +
			'</tr>';
			/*
			'<div id="product-"' + productSeq + '>' +
				'<input type="hidden" id="productSeq" value="' + productSeq + '" />' +
				'<input type="hidden" id="productName" value="' + productName + '" />' +
				'<input type="hidden" id="minimumPrice" value="' + minimumPrice + '" />' +
				'<input type="hidden" id="categorySeq2" value="' + categorySeq2 + '" />' +
			'</div>';
			*/
				
			index++;
		});

		productHtml += '</tbody></table>';

		$('.prdList').fadeOut('fast', function() {
			$('.prdList').html('');
			$('.prdList').append(productHtml).hide();
			$('.prdList').fadeIn('fast');
		});
		
		setPagination();
	}
	else {
		// 예외처리
		$('#prdList').html('');
		$('#prdList').html('<div align="center" height="300"><br /><br /><br /><br />검색된 상품이 없습니다.</div>');
	}
}

function setPagination() {
	var paginationHtml = '';
	var count = Number($('#count').val());
	var listsPerPage = Number($('#listPerPage').val());
	var currentPage = Number($('#page').val());
	var pages = Math.floor(count / listsPerPage);
	var beginPage = Math.ceil((currentPage / listsPerPage) -1) * listsPerPage + 1;
	var endPage = beginPage + (listsPerPage - 1);

	endPage = endPage < pages ? endPage : pages ;

	if(count <= listsPerPage) {
		paginationHtml += '<strong>' + 1 + '</strong>&nbsp;';
	}
	else {
		if(currentPage > 1) {
			paginationHtml += '<a><img src="http://img.danawa.com/new/estimate_out/images/btn_first.gif" alt="처음" /></a>&nbsp;' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_prev.gif" alt="이전" /></a>&nbsp;';
		}
		
		for(pageIndex=beginPage; pageIndex<=endPage; pageIndex++) {
			if(pageIndex == currentPage) {
				paginationHtml += '<strong>' + pageIndex + '</strong>&nbsp;';
			}
			else {
				paginationHtml += '<a>' + pageIndex + '</a>&nbsp;';
			}
		}

		if(currentPage < pages) {
			paginationHtml += '<a><img src="http://img.danawa.com/new/estimate_out/images/btn_next.gif" alt="다음" /></a>&nbsp;'+
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_last.gif" alt="마지막" /></a>';
		}
	}

	$('.pagination').html('');
	$('.pagination').append(paginationHtml);
}


function getNumberFormat(number) {
    var number = String(number); 
    var reg = /(\-?\d+)(\d{3})($|\.\d+)/; 
    if(reg.test(number)){ 
        return number.replace(reg, function(str, p1, p2, p3) { 
			return getNumberFormat(p1) + ',' + p2 + '' + p3; 
		});
    }
	else { 
        return number; 
    } 
}

function resetProductsOrder() {
	$(".order li a").find('img').each(function() {
		var src = $(this).attr('src');

		src = src.replace('_on.gif', '.gif');

		$(this).attr('src', src);
	});
}

function setProductOrder(object) {
	resetProductsOrder();

	var src = object.children('img').attr('src');
	var orderName = object.children('img').attr('alt');

	src = src.replace('.gif', '_on.gif');
	object.children('img').attr('src', src);

	switch(orderName) {
		case '인기상품':
			$('#productOrder').val('1');
			break;

		case '신상품':
			$('#productOrder').val('2');
			break;

		case '낮은가격':
			$('#productOrder').val('3');
			break;

		case '높은가격':
			$('#productOrder').val('4');
			break;

		default:
			$('#productOrder').val('1');
			break;
	}
}

String.prototype.cutString = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) {
		  l += (str.charCodeAt(i) > 128) ? 2 : 1;
		  if (l > len) return str.substring(0,i);
	}
	return str;
}