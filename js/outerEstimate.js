/**
 *	@mainpage	
 *
 *	@brief	�ܺ������� �ٳ��� �¶��� ������ �ڹٽ�ũ��Ʈ
 *
 *	@author	�ߴٳ��� ����2�� ���¿�
 *	@date	2011�� 7�� 6�� (��)
 *	@file	
 *
 *	@history	
 *	[2011-07-06]
 */

var productsXml;					// ��ǰ ����Ʈ(XML)
var estimateProducts = new Array();	// ���� ����Ʈ
var compareProducts = new Array();	// ��ǰ �� ����Ʈ

$(function() {
	getAttributes();	// �Ӽ� �˻� ȣ��(Ajax)
	getProducts();		// ��ǰ ����Ʈ ȣ��(Ajax)

	// Ŭ������ Ȱ��ȭ
	ZeroClipboard.setMoviePath('/globaljs/external/jquery/plugin/zeroClipboard/1.0.7/ZeroClipboard10.swf');
	var clip = new ZeroClipboard.Client();

	// ����1 ī�װ� ���ý�
	$("[id^='category-']").click(function() {
		// 1. ����2 �˻� ��ư �� �ʱ�ȭ
		setProductOrder($(".order li a img[alt^='�α��ǰ']").parent());

		// 2. ����2. �ؽ�Ʈ �˻� �� ����¡ �ʱ�ȭ
		$('#searchText').val('');
		$('#page').val('1');

		// 3. ī�װ� ������ ����
		$('#categorySeq').val($(this).attr('id').split('-')[1]);
		$('#attributes').val('');

		// 4. ����2 ī�װ� �̸� ����
		resetCategoryNames();
		setCategoryName($(this));

		// 5. ����1 ī�װ� �̹��� ���� ����
		setCategoryImageColor($(this));

		// 6. ������ ī�װ��� ���� �˻��Ӽ� ȣ�� �� ����
		getAttributes();

		// 7. ��ǰ����Ʈ ȣ�� �� ����
		getProducts();
	});
	
	// ����2 ���� ���� Ŭ����
	$(".order li a").click(function() {
		setProductOrder($(this));
		getProducts();
	});

	// ����2 �ڼ��� ���� Ŭ����
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

	// ����2 �ڼ��� �ݱ� Ŭ����
	$("span[class^='viewClose']").livequery('click', function() {
		$("[id^='v']").each(function() {
			$(this).hide();
		});
	});

	// ����2 �Ӽ� �˻� �����
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

	// ����2 �ؽ�Ʈ �˻� Ŭ����
	$('#textSearch').click(function() {
		if($(this).val() == '������/�귣��/��ǰ��') {
			$(this).val('');
		}
	});

	// ����2 �˻��� �Է��� ���� �Է½�
	$('#textSearch').keypress(function(e) {
		if(e.keyCode == 13) {
			var searchText = $.trim($('#textSearch').val());
			$('#searchText').val(searchText);

			getProducts();
		};
	});

	// ����1 ī�װ� ���й� Ŭ����
	$('.tablist').click(function () {
		$('.equipment').each(function() {
			$(this).slideUp('normal');
		});

		$(this).parent().next().slideDown('normal');
	});

	// ����2 �Ӽ� �˻� �� Ŭ����
	$('#searchDetail').click(function() {
		if($('#options').attr('class') == 'none' || $('#options').attr('class') == '') {
			setAttributeSlideDown();	
		}
		else {
			setAttributeSlideUp();
		}
	});

	// ����2 ����¡
	$('.pagination').find('a').livequery('click', function () {
		var page = $(this).html();							// ������ ������
		var currentPage = Number($('#page').val());			// ���� ������
		var listsPerPage = Number($('#listPerPage').val());	// �������� ��ǰ ����Ʈ ��
		var count = Number($('#count').val());				// ��ǰ ī��Ʈ
		var pages = Math.floor(count / listsPerPage);		// 
		
		if(Number(page) > 0) {
			$('#page').val(page);
		}
		else {
			var alt = $(this).find('img').attr('alt');
			var targetPage;

			switch(alt) {
				case 'ó��':
					targetPage = 1;
					break;
				case '����':
					if((currentPage - listsPerPage) > 0) {
						targetPage = currentPage - listsPerPage;
					}
					// �������� 0���Ϸ� �˻� �ɶ� ���� ó�� : captain2240 (2011-06-27)
					else {
						targetPage = 1;
					}
					break;
				case '����':
					if((currentPage + listsPerPage) < pages) {
						targetPage = currentPage + listsPerPage;
					}
					else {
						targetPage = pages;
					}
					break;
				case '������':
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

	// ����2 ��ǰ ���ý�
	$('.prdSelect').livequery('click', function() {
		var productSeq = Number($(this).parent().parent('tr').attr('id').split('-')[1]);
		
		$('#step3').addClass('stepOff');
		
		addEstimateProduct(productSeq);
		setEstimateProducts();
	});

	// ����3 ��ǰ ������
	$('.del').find('a').livequery('click', function () {
		var productSeq = $(this).parent().parent().attr('id').split('-')[2];

		deleteEstimateProduct(productSeq);
		setEstimateProducts();

		if(estimateProducts.length == 0) {
			$('#step3').removeClass();
			$('#step3').addClass('estimateStep');			
		}
	});

	// ����1, ����2, ����3 Ŭ����
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

	// ����3 ���� ��ǰ �� '�� �ٿ�' Ŭ����
	$('.count').find('span a').livequery('click', function() {
		var productSeq = $(this).parent().parent().parent().attr('id').split('-')[2];
		var productCountUpDown = $(this).find('img').attr('alt');

		setEstimateProductCount(productSeq, productCountUpDown);
		setEstimateProducts();
	});

	
	// ����2 ��ǰ�� Ŭ����
	$('.btnPrdVs').livequery('click', function(){
		var productSeq = Number($(this).parent().parent('tr').attr('id').split('-')[1]);
		
		addCompareProduct(productSeq);
		setCompareProducts();

		$('#prdVS').removeClass('openVS');
		$('#prdVS').slideDown('normal');

		$(this).removeClass();
		$(this).addClass('btnPrdVson');
	});

	// ����2 ��ǰ�� ���̾� �ݱ� Ŭ����
	$('.btnVS .close').livequery('click', function() {
		$('#prdVS').slideUp('normal', function() {
			$('#prdVS').addClass('openVS');
			$('#prdVS').slideDown('normal');
		});
	});

	// ����2 ��ǰ�� ���̾� ���� Ŭ����
	$('.btnVS .open').livequery('click', function() {
		$('#prdVS').slideUp('normal', function() {
			$('#prdVS').removeClass('openVS');
			$('#prdVS').slideDown('normal');
		})
		
	});

	// ����3 ���ø� Ŭ������
	$('#zeroClipboard').mouseover(function() {
		var estimateTemplateHtml = getEstiamteTemplateHtml();
	
		ZeroClipboard.setMoviePath('/globaljs/external/jquery/plugin/zeroClipboard/1.0.7/ZeroClipboard10.swf');
		var clip = new ZeroClipboard.Client();
				
		clip.setText(estimateTemplateHtml);
		clip.glue('zeroClipboard');
		clip.show();

		clip.addEventListener('complete', function (client) {
			if(estimateProducts.length > 0) {
				alert("Ŭ�����忡 ����Ǿ����ϴ�. \'Ctrl+v\'�� ���� �ٿ��ֱ� ���ּ���.");
				clip.destroy();
			}
			else {
				alert('���� ��ǰ�� �����ϴ�.');
			}
		});
	});

	// �� ������ ������ ��ư �̺�Ʈ
	$('.btns a').livequery('click', function() {
		var action = $(this).find('img').attr('alt');

		switch(action) {
			case '��ü ����':
				$('.vsBox :checkbox').attr('checked', 'checked');

				break;
			case '���� ��':
				var object = $('.vsBox input:checked');

				if(object.length > 0) {
					popupProductCompareWindow(object);
				}
				else {
					alert('���� ��ǰ�� �������ּ���.');

					return false;
				}

				break;
			case '���� ����':
				var object = $('.vsBox input:checked');

				if(object.length > 0) {
					deleteCompareProduct(object);
				}

				setCompareProducts();

				if(compareProducts.length == 0) {
					$('#prdVS').slideUp('normal');
				}

				break;

			case '�����۰���':
				// ����3 ���ø� Ŭ������

				break;

			case '���θ��� ���ݺ�':
				if(estimateProducts.length > 0) {
					if(confirm('�� ���񽺴� �ٳ��� ����Ʈ���� �̿� �����մϴ�.\n�̵��Ͻðڽ��ϱ�?')) {
						popupCompanyCompareWindow();
					}
				}
				else {
					alert('������ǰ�� �����ϴ�.');
				}
				
	
				break;

			case '�ٳ��� �����ŷ��� ���Ž�û ���':
				if(estimateProducts.length > 0) {
					if(confirm('�� ���񽺴� �ٳ��� ����Ʈ���� �̿� �����մϴ�.\n�̵��Ͻðڽ��ϱ�?')) {
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
					alert('������ǰ�� �����ϴ�.');
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
					'<td style="width:304px;"><img src="http://img.danawa.com/new/mail/estimate/img/danawa_logo.gif" border="0" alt="danawa.com" /><img src="http://img.danawa.com/new/mail/estimate/img/online_estimate.gif" border="0" alt="����¶��� ������" style="margin:3px 0 0 14px;" /></td>' +
					'<td colspan="3" style="padding-top:12px;text-align:right;"><span style="padding:4px 5px 3px 5px; color:#fff;font-size:11px;font-family:dotum;line-height:18px;background:#94b7ef;">�����Ͻ� - ' + year + '�� ' + month + '�� ' + day + '�� ' + meridiem + ' ' + hour + '��:' + minute + '��</span></td>' +
				'</tr>' +
				'<tr>' +
					'<td colspan="4" style="padding:19px 0 7px 0;">' +
						'<table border="0" cellpadding="0" cellspacing="0" style="width:730px;color:#666;border-bottom:1px solid #7384b8;font-size:12px;font-family:dotum;">' +
							'<thead>' +
								'<tr>' +
									'<th scope="col" style="width:74px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">ǰ��</th>' +
									'<th scope="col" style="width:50px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">�̹���</th>' +
									'<th scope="col" style="width:286px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">��ǰ��</th>' +
									'<th scope="col" style="width:50px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">��ü��</th>' +
									'<th scope="col" style="width:75px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">��հ�</th>' +
									'<th scope="col" style="width:75px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">������</th>' +
									'<th scope="col" style="width:30px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">����</th>' +
									'<th scope="col" style="width:90px;padding:7px 0 8px 0;color:#fff;font-weight:normal;text-align:center;background:#7384b8;">�հ�</th>' +
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
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + getNumberFormat(estimateProducts[index].avgPrice) + '��</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + getNumberFormat(estimateProducts[index].minimumPrice) + '��</td>' +
			'<td style="padding:6px 0 7px 0;border-bottom:1px solid #ccc;color:#666;text-align:center;">' + estimateProducts[index].productCount + '</td>' +
			'<td style="padding:6px 18px 7px 0;border-bottom:1px solid #ccc;color:#fe6700;font-weight:bold;text-align:right;">' + getNumberFormat(estimateProducts[index].minimumPrice * estimateProducts[index].productCount) + '��</td>' +
		'</tr>';
	}
	
	popupCompanyCompareUrl = popupCompanyCompareUrl.substring(0, popupCompanyCompareUrl.length-1);

	for(var index in popupDanawaSafeTradeParams) {
		popupDanawaSafeTradeUrl += popupDanawaSafeTradeParams[index].substring(0, popupDanawaSafeTradeParams[index].length-1);
	}

	estimateTemplateHtml += '<tr>' +
								'<th scope="row" colspan="6" style="padding:10px 0 10px 24px;color:#323234;text-align:left;background:#f0f4ff;">���� <span style="color:#666;font-size:11px;font-weight:normal;">(O/S ��ġ��, ������ ������)</span></th>' +
								'<td colspan="2" style="padding:10px 18px 10px 0;color:#fe6700;font-weight:bold;text-align:right;background:#f0f4ff;">' + getNumberFormat(totalPrice) + '��</td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
				'</td>' +
			'</tr>' +
			'<tr class="btns">' +
				'<td style="width:304px;vertical-align:top;">' +
					'<a href="http://pcshop.danawa.com?logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_pcgo.gif" style="vertical-align:top;" border="0" alt="�ٳ���PC �ٷΰ���" /></a>' +
				'</td>' +
				'<td style="width: 99px"><a href="http://img.danawa.com/new/estimate_out/estimate_guide1.html" target="_blank"><img src="http://img.danawa.com/new/estimate_out/images/btn_mailguide.gif" border="0"></a></td>' +
				'<td style="width:140px;text-align:right;">' +
					'<a href="' + popupCompanyCompareUrl + '&logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_price.gif" style="vertical-align:top;" border="0" alt="���θ��� ���ݺ�" /></a>' +
				'</td>' +
				'<td style="width:195px;text-align:right;">' +
					'<a href="' + popupDanawaSafeTradeUrl + '&logger_kw=estimate_cp&_C_=108" target="_blank"><img src="http://img.danawa.com/new/mail/estimate/img/btn_apply.gif" style="vertical-align:top;" border="0" alt="�ٳ��� �����ŷ��� ���Ž�û ���" /></a>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td colspan="4" style="padding-top:30px;">' +
					'<p style="margin:0 0 6px 0;padding:0;"><img src="http://img.danawa.com/new/mail/estimate/img/reading.gif" border="0" alt="�� �о����!" /></p>' +
					'<ul style="list-style:none;margin:0;padding:0;border-top:14px solid #f6f6f6;border-bottom:10px solid #f6f6f6;background:#f6f6f6;">' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />����������� �ٳ��Ͱ� �����ϴ� ���񽺷� <span style="color:#3960ea;">�ֹ������� ȿ���� ���� �ʽ��ϴ�.</span></li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />�� ������ �ش� ��ǰ�� ���� <span style="color:#3960ea;">�ٳ��� ���»簡 ������ �ݾ� �� ������ ������ ������ ���������� ǥ��</span>�� ���Դϴ�.</li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />���������� ���÷� ������Ʈ�� ���� ������ ����¶��ΰ����� �ۼ� �� <span style="color:#3960ea;">���� ��ǰ ���� �� �ݾ��� �ٸ� �� �ֽ��ϴ�.</span></li>' +
						'<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />�����۰��� �� <span style="color:#3960ea;">HTML ���� ���� �� �ٿ��ֱ�(Ctrl+ V)</span>�Ͻñ� �ٶ��ϴ�.</li>' +
						// '<li style="list-style:none;margin:0;padding:0 0 2px 0;color:#797979;font-size:11px;font-family:dotum;"><img src="http://img.danawa.com/new/mail/estimate/img/bullet.gif" border="0" alt="" />�����۰��� �� �� �ۼ� ��忡�� <span style="color:#3960ea;">��ũ��Ʈ���� �� �����۰���, ���θ��� ���ݺ�, �ٳ��� �����ŷ��� ���Ž�û ��� ��ư ����� �Ұ�</span>�մϴ�.</li>' +
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
	var compareProductHtml = '<h4><img src="http://img.danawa.com/new/estimate_out/images/selectvs.gif" alt="���û�ǰ ���ϱ�" /></h4>' +
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
					'<span>' + getNumberFormat(minimumPrice) + '��</span>' +
					'<input type="checkbox" />' +
				'</label>' +
			'</li>';
	}

	compareProductHtml += '</ul><span class="btns">' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_allselect.gif" alt="��ü ����" /></a>' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_vs.gif" alt="���� ��" /></a>' +
				'<a class="del"><img src="http://img.danawa.com/new/estimate_out/images/btn_delete.gif" alt="���� ����" /></a>' +
			'</span>' +
		'</div>' +
		'<span class="btnVS">' +
			'<a><span class="close">�ݱ�</span><span class="open">����</span></a>' +
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
		alert('�� �̻� ��ǰ�� �߰��� �� �����ϴ�.');

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
				// ����ó��
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
	<td class="pname">���� �ھ� i5 760 (���ʵ�)(��ǰ)</td>
	<td class="count">
		<input type="text" size="2" value="1" class="intxt" id="cnt_01" />
		<span>
			<a href="javascript:count_change('01','PLUS');"><img src="http://img.danawa.com/new/estimate_out/images/btn_plus.gif" alt="plus" /></a>
			<a href="javascript:count_change('01','MINUS');"><img src="http://img.danawa.com/new/estimate_out/images/btn_minus.gif" alt="minus" /></a>
		</span>
	</td>
	<td class="won">214,000</td>
	<td class="del"><a href="#"><img src="http://img.danawa.com/new/estimate_out/images/btn_del.gif" alt="����" /></a></td>
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
			'<td class="del"><a><img src="http://img.danawa.com/new/estimate_out/images/btn_del.gif" alt="����" /></a></td></tr>';

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

	$('.totalWon').find('span').html(getNumberFormat(getTotalPrice()) + '��');
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
			// ����ó��
		}
	});
}

function setAttributes(xml) {
	var attributesHtml = '';
	var attributeLength = $(xml).find('attributes').find('attribute').length;

	if(attributeLength > 0) {
		$(xml).find('attributes').children('attribute').each(function(idx) {
			/*
			<select title="���з�">
				<option value="">���(��)</option>
				<option value="">���(��)</option>
				<option value="">���(��)</option>
				<option value="">���(��)</option>
				<option value="">���(��)</option>
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
		// ����ó��
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
			$('#prdList').html('<div align="center" height="300"><br /><br /><br /><br />�˻��� ��ǰ�� �����ϴ�.</div>');
		}
	});
}

function setProducts(xml) {
	var productHtml = '<table border="0" cellspacing="0" cellpadding="0" summary="��ǰ�� �������ּ���."><tbody>';
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
						<a href="#">���� �ھ� i5 760 (���ʵ�) (��ǰ)</a>
						<span class="lowest">������ 141,500�� / ��ü�� 178</span>
					</th>
					<td class="choices">
						<a href="#" class="prdSelect">�� �� �� ��</a>
						<!-- <a href="#" class="prdSelect prdClear">�� �� �� ��</a> -->
						<a href="#v1"><img src="http://img.danawa.com/new/estimate_out/images/btn_expand.gif" alt="�ڼ�������" /></a><a href="#prdVS" onclick="showToggle('prdVS');return false;" class="btnPrdVs">��ǰ��</a>
						<!-- <a href="#prdVS" onclick="showToggle('prdVS');return false;" class="btnPrdVson">�� ��</a> -->
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
				var productSelectHtml = '<a class="prdSelect">�� �� �� ��</a>';
			}
			else {
				// var productSelectHtml = '<a class="prdSelect prdClear">�� �� �� ��</a>';
				var productSelectHtml = '<a class="prdSelect prdClear">�� �� �� ��</a>';
			}

			var compareProduct = getCompareProduct(productSeq);

			if(typeof compareProduct == 'undefined') {
				var compareProductSelectHtml = '<a class="btnPrdVs">��ǰ��</a>';
			}
			else {
				var compareProductSelectHtml = '<a class="btnPrdVson">��ǰ��</a>';
			}

			productHtml += '<tr id="lv-' + productSeq + '">' +
				'<td class="prdImg"><img src="' + productImage + '" width="48" height="48" alt="" /></td>' +
				'<th scope="col" class="prdTitle">' +
				'<a href="' + productBlogUrl + '" target="_blank">' + productName + '</a>' +
				'<span class="lowest">������ ' + getNumberFormat(minimumPrice) + '�� / ��ü�� ' + shopCount + '</span>' +
				'</th>' +
				'<td class="choices">' +
				productSelectHtml +
				'<a id="#v-' + productSeq + '"><img src="http://img.danawa.com/new/estimate_out/images/btn_expand.gif" alt="�ڼ�������" /></a>' + compareProductSelectHtml +
				'</td>' +
				'</tr>' +
				'<tr id="v-' + productSeq + '" class="prdView" style="display: none;">' +
				'<td colspan="3">' + description +
					'<span class="viewClose"><a>�ݱ�</a></span>' +
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
		// ����ó��
		$('#prdList').html('');
		$('#prdList').html('<div align="center" height="300"><br /><br /><br /><br />�˻��� ��ǰ�� �����ϴ�.</div>');
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
			paginationHtml += '<a><img src="http://img.danawa.com/new/estimate_out/images/btn_first.gif" alt="ó��" /></a>&nbsp;' +
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_prev.gif" alt="����" /></a>&nbsp;';
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
			paginationHtml += '<a><img src="http://img.danawa.com/new/estimate_out/images/btn_next.gif" alt="����" /></a>&nbsp;'+
				'<a><img src="http://img.danawa.com/new/estimate_out/images/btn_last.gif" alt="������" /></a>';
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
		case '�α��ǰ':
			$('#productOrder').val('1');
			break;

		case '�Ż�ǰ':
			$('#productOrder').val('2');
			break;

		case '��������':
			$('#productOrder').val('3');
			break;

		case '��������':
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