$(function() {
	// ���� ��ǰ ��ٱ��� Ŭ�� �̺�Ʈ
	$('#selectedGoodsCartButton').click(function() {
		goSelectedGoodsCart();
	});

	// ��ü ��ǰ ��ٱ��� Ŭ�� �̺�Ʈ
	$('#allGoodsCartButton').click(function() {
		goAllGoodsCart();
	});

	// ���չ�� ���»� selectbox ���� �̺�Ʈ
	$("select[name^='billingSeller']").change(function() {
		var priceArray = $(this).attr('name').split('-');
		var productSeq = priceArray[1];
		var price = 0;
		var quantity = 1;

		price = getPriceToPriceString($(this).children('option:selected').html());
		quantity = $('#goodsQuantity-' + productSeq).html();

		setPrice(productSeq, price, quantity);
		setTotalPrice();

		var sellerSeq = 0;
		var sellerSeqArray = $(this).children('option:selected').val().split('-');
		sellerSeq = sellerSeqArray[0];

		setSellerSeq(productSeq, sellerSeq);
	});

	// ��ü���� Ŭ�� �̺�Ʈ
	$("#checkAll").css("cursor","pointer").click(function(){
		$(":checkbox[name^='goodsSeq']").attr("checked",$("#checkAll").attr("checked"));
	});

	// �� �ֹ� �ݾ� ���
	setTotalPrice();
});

function goSelectedGoodsCart() {
	if($("input[name^='goodsSeq-']:checked").length > 0) {
		var goodsSeqListString = '';

		$("input[name^='goodsSeq-']:checked").each(function(index, formElments){
			var goodsSeqArray = $("select[name='billingSeller-" + $(this).val() + "']").val().split('-');
			var quantity = $.trim($('#goodsQuantity-' + $(this).val()).html());
			
			goodsSeqListString += goodsSeqArray[1] + '|' + quantity + '^';			

			$('#goodsSeqListString').val($("select[name='billingSeller-" + $(this).val() + "']").val());
		});

		goodsSeqListString = goodsSeqListString.substr(0, (goodsSeqListString.length) - 1);

		$('#goodsSeqListString').val(goodsSeqListString);

		doSubmit(goodsSeqListString);
	}
	else {
		alert('���� ��ǰ�� �����ϴ�. ���� ��ǰ�� ������ �ּ���');
	}
}

function goAllGoodsCart() {
	var goodsSeqListString = '';

	$("input[name^='goodsSeq-']").each(function(index, formElments){		
		var goodsSeqArray = $("select[name='billingSeller-" + $(this).val() + "']").val().split('-');
		var quantity = $.trim($('#goodsQuantity-' + $(this).val()).html());

		goodsSeqListString += goodsSeqArray[1] + '|' + quantity + '^';		

		$('#goodsSeqListString').val($("select[name='billingSeller-" + $(this).val() + "']").val());
	});

	goodsSeqListString = goodsSeqListString.substr(0, (goodsSeqListString.length) - 1);
	
	doSubmit(goodsSeqListString);
}

function goOneGoodsCart(productSeq) {
	var goodsSeqListString = '';

	var goodsSeqArray = $("select[name='billingSeller-" + productSeq + "']").val().split('-');
	var quantity = $.trim($('#goodsQuantity-' + productSeq).html());

	goodsSeqListString += goodsSeqArray[1] + '|' + quantity + '^';

	goodsSeqListString = goodsSeqListString.substr(0, (goodsSeqListString.length) - 1);

	doSubmit(goodsSeqListString);
}

function doSubmit(goodsSeqListString) {
	var billingEstimateFormObject = $("[name='billingEstimate']");
	var actionURL = 'http://buyer.danawa.com/cart/Carts/insertCartGoodsFromEstimate';

	$('#goodsSeqListString').val(goodsSeqListString);

	billingEstimateFormObject.attr('method', 'post');
	billingEstimateFormObject.attr('action', actionURL);

	billingEstimateFormObject.submit();
}

function goSellerInfo(productSeq) {
	var sellerSeq = $('#sellerSeq-' + productSeq).val();

	window.open('http://pcshop.danawa.com/AssembledPC/sellerInfo/sellerSeq/' + sellerSeq,'sellerInfomationPopup','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,width=270,height=150,top=100,left=150');
}

function setTotalPrice() {
	var totalOrderPrice = 0;
	var totalOrderCount = 0;
	var baseDeliveryPrice = 2500;

	$("input[name^='price-']").each(function() {
		var price = 0;

		// price = getPriceToPriceString($(this).html());
		price = Number($(this).val());

		totalOrderPrice += price;
		totalOrderCount++;
	});

	$('#totalPrice').html(numberFormat(totalOrderPrice));
	
	$('#deliveryPrice').html(numberFormat(baseDeliveryPrice * totalOrderCount));

	if(totalOrderPrice > 100000) {
		$('#totalOrderPrice').html(numberFormat(totalOrderPrice));
		$('#deliveryDiscountPrice').html(numberFormat(baseDeliveryPrice * totalOrderCount));
	}
	else {
		$('#totalOrderPrice').html(numberFormat(totalOrderPrice + 2500));
		$('#deliveryDiscountPrice').html(numberFormat(baseDeliveryPrice * (totalOrderCount-1) ));
	}
}

function setPrice(productSeq, price, quantity) {
	$('#goodsSeq-' + productSeq).html(numberFormat(price * quantity));
	$("input[name='price-" + productSeq + "']").val(price * quantity);
}

function setSellerSeq(productSeq, sellerSeq) {
	$('#sellerSeq-' + productSeq).val(sellerSeq);
}

function numberFormat(input){ 
    var input = String(input); 
    var reg = /(\-?\d+)(\d{3})($|\.\d+)/; 

    if(reg.test(input)) { 
        return input.replace(reg, function(str, p1,p2,p3) { 
			return numberFormat(p1) + "," + p2 + "" + p3; 
		}); 
    }
	else { 
        return input; 
    }
}

function getPriceToPriceString(priceString) {
	var priceArray = priceString.split(' ');
	var price = '';

	price = priceArray[1].replace('��', '');
	price = parseInt(price.replace(',', ''));

	return price;
}