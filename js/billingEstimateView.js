$(function() {
	// 선택 상품 장바구니 클릭 이벤트
	$('#selectedGoodsCartButton').click(function() {
		goSelectedGoodsCart();
	});

	// 전체 상품 장바구니 클릭 이벤트
	$('#allGoodsCartButton').click(function() {
		goAllGoodsCart();
	});

	// 통합배송 협력사 selectbox 변경 이벤트
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

	// 전체선택 클릭 이벤트
	$("#checkAll").css("cursor","pointer").click(function(){
		$(":checkbox[name^='goodsSeq']").attr("checked",$("#checkAll").attr("checked"));
	});

	// 총 주문 금액 계산
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
		alert('선택 상품이 없습니다. 먼저 상품을 선택해 주세요');
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

	price = priceArray[1].replace('￦', '');
	price = parseInt(price.replace(',', ''));

	return price;
}