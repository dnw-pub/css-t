$(document).ready(function() {
	billingOption =  {
		type						: '001',							// 옵션타입(001 : 분리형(기본), 002 : 일체형)
		originalData				: null,								// 옵션 원본데이터
		lastOptionDepth				: 0,								// 마지막 옵션 차수
		titleDisplay				: true,								// 옵션타이틀 노출 여부
		integralAttributeDisplay	: true,								// 일체형 옵션일 경우 옵션명 노출 여부
		integralSplitString			: ',',								// 일체형 옵션일 경우 옵션명 구분 문자
		optionSelectBoxContainer	: $('#optionSelectBoxContainer'),	// [필수]옵션영역(selectBox)
		optionQuantityContainer		: $('#optionQuantityContainer'),	// [필수]옵션영역(수량)
		orderButton					: $('#orderBtn'),					// 구매하기 버튼 객체
		totalPriceObj				: $('#totalPrice'),					// 주문상품 총 금액 객체
		message						: {									// 경고 메세지
			stockOut		: '재고가 소진되었습니다.',
			alreadyOption	: '이미 추가된 옵션입니다.',
			limitOver		: '1인 구매수량이 초과되었습니다.'
		},

		// 옵션타입에 따른 selectBox 를 셋팅합니다.
		formSetting : function(data) {
			switch(this.type) {
				case '001'	:this.separatedFormSelectBoxSetting(data);break;
				case '002'	:this.integralFormSelectBoxSetting(data);break;
				default		:this.error('옵션타입을 지정해주셔야 합니다.[001 or 002]');
			}
		},

		// 옵션정보를 가지고 selectBox 를 셋팅합니다.(분리형)
		separatedFormSelectBoxSetting : function(data) {
			try {
				// 옵션영역 체크
				this.checkContainer();

				// 원본데이터 저장
				this.originalData = data;

				var obj = [
					data.firstAttributeName,
					data.secondAttributeName,
					data.thirdAttributeName,
					data.fourthAttributeName
				]

				var html = [];
				for(var i in obj) {
					if(obj[i] != null) {
						this.lastOptionDepth++;
						html.push('<label for="option' + this.lastOptionDepth + '">' + obj[i] + '</label>');
						html.push('<select id="option' + this.lastOptionDepth + '" onchange="billingOption.changeSelectBox(this)">');
						html.push('		<option value="">' + obj[i] + ' 선택</option>');
						html.push('</select>');
					}
					// 1차 옵션은 필수정보, 구매를 하지 못하게 구매버튼을 삭제처리 합니다.
					if(i == 0 && obj[i] == null) {throw '옵션정보 조회 실패';}
				}

				if(this.titleDisplay == true) html.unshift('<strong class="option_list_title">필수옵션</strong>');

				this.optionSelectBoxContainer.empty().append(html.join(''));

				// 1차 옵션항목값을 selectBox로 변화
				this.convertSelectBoxByOptionValue(1);

				// 상품가격 셋팅
				this.setTotalPrice();
			} catch(e) {
				this.error(e);
			}
		},

		// 오류가 발생할 경우 주문을 못하게 합니다.
		error : function(e) {
			alert(e);
			this.orderButton.remove();
		},

		// 옵션차수에 해당하는 옵션항목값을 selectBox로 변환합니다.
		convertSelectBoxByOptionValue : function(depth) {
			if(parseInt(depth) < 1 || parseInt(depth) > 4 || depth == undefined) throw '옵션차수 오류';

			var html = [];
			var option = [];

			$(this.originalData.goodsOptionAttributeValueList).each(function(e, data) {
				if(billingOption.lastOptionDepth == depth) {
					if(billingOption.checkOptionItem(data, billingOption.lastOptionDepth)) {
						html.push(billingOption.convertLastOptionItem(data));
					}
				} else {
					if(depth == 1) {
						if(data.firstAttributeValueName != null) {
							if($.inArray(data.firstAttributeValueName, option) === -1) option.push(data.firstAttributeValueName);
						}
					} else {
						var attributeValue = {
							1 : data.firstAttributeValueName,
							2 : data.secondAttributeValueName,
							3 : data.thirdAttributeValueName,
							4 : data.fourthAttributeValueName
						}

						if(billingOption.checkOptionItem(data, depth, option)) option.push(attributeValue[depth]);
					}
				}
			});

			$(option).each(function(e, data) {html.push('<option value="' + data + '">' + data + '</option>');});
			$('#option' + depth + ' option:eq(0)').after(html.join(''));
		},

		// 옵션항목 추가여부 체크
		checkOptionItem : function(data, depth, tempData) {
			var result = [];
			var attributeValue = {
				1 : data.firstAttributeValueName,
				2 : data.secondAttributeValueName,
				3 : data.thirdAttributeValueName,
				4 : data.fourthAttributeValueName
			}

			for(var i = 1; i < depth; i++) {
				var obj = $('#option' + i);
				result[i-1] = (obj.val() == attributeValue[i]) ? true : false;
			}

			if(this.lastOptionDepth == depth) {
				return ($.inArray(false, result) === -1) ? true : false;
			} else {
				if($.inArray(false, result) === -1) {
					if($.inArray(attributeValue[depth], tempData) === -1) return true;
					else return false;
				} else {
					return false;
				}
			}
		},

		// 마지막 옵션항목일경우는 예외적으로 품절, 가격차이를 보여줘야 함으로 변경작업
		convertLastOptionItem : function(data) {
			var optionText = [];
			var disabledClass = '';
			var attributeValue = {
				1 : data.firstAttributeValueName,
				2 : data.secondAttributeValueName,
				3 : data.thirdAttributeValueName,
				4 : data.fourthAttributeValueName
			}

			optionText.push(attributeValue[this.lastOptionDepth]);

			if(data.difference > 0) {
				optionText.push('(+' + this.numberFormat(data.difference) + '원)');
			} else if(data.difference < 0) {
				optionText.push('(' + this.numberFormat(data.difference) + '원)');
			}
			if(parseInt(data.stock) < 1 ) {
				optionText.push('(품절)');
				disabledClass = "class='disabled'";
			}

			return '<option value="' + attributeValue[this.lastOptionDepth] + '" optionAttributeValueSeq="' + data.attributeValueSeq + '"' + disabledClass + ' >' + optionText.join(' ') +'</option>';
		},

		// 옵션 추가
		addOption : function(data) {
			// 1인 최대 구매 수량 체크
			if(this.checkOrderCount() == false) {
				return false;
			}

			var obj = '#option' + data.attributeValueSeq;
			if($(obj).length > 0) {
				alert(this.message.alreadyOption);
			} else {
				var option = [
					{title : this.originalData.firstAttributeName,	value : data.firstAttributeValueName},
					{title : this.originalData.secondAttributeName,	value : data.secondAttributeValueName},
					{title : this.originalData.thirdAttributeName,	value : data.thirdAttributeValueName},
					{title : this.originalData.fourthAttributeName,	value : data.fourthAttributeValueName},
				];

				var optionTitle = '';
				for(var i in option) {
					if(option[i].value != null) {
						optionTitle+= i > 0 ? '/' : '';
						optionTitle+= option[i].title
						optionTitle+= ':';
						optionTitle+= option[i].value
					}
				}

				// 금액의 차이가 있는경우 표시를 해줍니다.
				if(data.difference > 0) {
					optionTitle+='(+' + this.numberFormat(data.difference) + ')';
				} else if(data.difference < 0) {
					optionTitle+='(' + this.numberFormat(data.difference) + ')';
				}

				var html = [];
					html.push('<div class="opt_item" id="option' + data.attributeValueSeq + '">');
					html.push('	<div class="goods_name"><p><span>' + optionTitle + '</span></p></div>');
					html.push('	<div class="qnt_num">');
					html.push('		<input type="hidden" name="optionAttributeValueSeq[]" value="' + data.attributeValueSeq + '">');
					html.push('		<input type="text" name="optionOrderCount[]" class="input_qnt" title="수량입력" value="1" readonly="readonly">');
					html.push('		<div class="edit_number">');
					html.push('			<button type="button" class="btn_qnt_up" title="수량 증가" onclick="billingOption.plusQuantity(this)" stock=' + data.stock + '>증가</button>');
					html.push('			<button type="button" class="btn_qnt_down" title="수량 감소" onclick="billingOption.minusQuantity(this)">감소</button>');
					html.push('		</div>');
					html.push('	</div>');
					html.push('	<strong class="price"><span class="num">' + this.numberFormat(data.salePrice) + '</span>원</strong>');
					html.push('	<a href="#" class="btn_del" onclick="billingOption.deleteOption(this); return false;">삭제</a>');
					html.push('</div>');

				this.optionQuantityContainer.append(html.join(''));

				this.setTotalPrice();
			}

		},

		// 옵션 삭제
		deleteOption : function(data) {
			$(data).parent().remove();
			this.setTotalPrice();
		},

		// 주문수량 증가
		plusQuantity : function(data) {
			if(this.checkOrderCount(data)) {
				var obj = $(data).parent().siblings('.input_qnt');

				if(parseInt(obj.val()) + 1 > parseInt($(data).attr('stock'))) {
					alert('재고가 없습니다.');
				} else {
					obj.val(parseInt(obj.val()) + 1);
				}
			}
			this.setTotalPrice();
		},

		// 주문수량 감소
		minusQuantity : function(data) {
			var obj = $(data).parent().siblings('.input_qnt');
			if(parseInt(obj.val()) > 1) obj.val(parseInt(obj.val()) - 1);
			this.setTotalPrice();
		},

		// 주문수량 체크
		checkOrderCount : function() {
			// 1인 구매제한 수량
			var limitOrderCount =  this.optionQuantityContainer.attr('limitOrderCount');

			if(isNaN(limitOrderCount) == true || parseInt(limitOrderCount) < 0 || limitOrderCount == '') {
				throw 'limitOrderCount 속성값 오류입니다.';
			}

			var currentOrderCount = 1;
			$('.input_qnt').each(function(e, data) {
				currentOrderCount+=parseInt($(this).val());
			});

			if(currentOrderCount > limitOrderCount) {
				alert(this.message.limitOver);
				$('#option' + this.lastOptionDepth).val('');
				return false;
			}
			return true;
		},

		// 옵션영역 체크
		checkContainer : function() {
			if(this.optionSelectBoxContainer.length < 1) throw 'optionSelectBoxContainer 영역이 정의되지 않았습니다.';

			if(this.optionQuantityContainer.length < 1) {
				throw 'optionQuantityContainer 영역이 정의되지 않았습니다.';
			} else {
				if(this.optionQuantityContainer.attr('limitOrderCount') == null) {
					throw 'limitOrderCount 속성이 정의되지 않았습니다.';
				}
			}
		},

		// 총 상품금액을 셋팅합니다.
		setTotalPrice : function() {
			var totalPrice = 0;
			$('.opt_item').each(function(e, data) {
				var price = parseInt($(data).find('.num').text().replace(',', ''));
				var quantity = parseInt($(data).find('.input_qnt').val());
				totalPrice+= price * quantity;
			});
			this.totalPriceObj.text(this.numberFormat(totalPrice));
		},

		// selectBox 값 변경시  하위 옵션값을 렌더링 합니다.
		changeSelectBox : function(data) {
			try {
				var optionID = $(data).attr('id');
				var optionDepth = parseInt(optionID.charAt(optionID.length-1));

				if(optionDepth != 4) {
					for(var i = optionDepth + 1; i <=4; i++) {
						$('#option' + i + ' option:not(option:eq(0))').remove();
					}
					if($(data).val()) this.convertSelectBoxByOptionValue(optionDepth + 1);
				}

				// 최종적으로 선택된 마지막 옵션항목을 추가합니다.
				if($('#option' + this.lastOptionDepth).val()) {
					$(this.originalData.goodsOptionAttributeValueList).each(function(e, data) {
						if($('#option1').val() == data.firstAttributeValueName &&
							$('#option2').val() == data.secondAttributeValueName &&
							$('#option3').val() == data.thirdAttributeValueName &&
							$('#option4').val() == data.fourthAttributeValueName) {

							if(data.stock < 1) {
								alert(billingOption.message.stockOut);
								$('#option' + billingOption.lastOptionDepth).val('');
							} else {
								billingOption.addOption(data);
							}
							return false;
						}
					});
				}
			} catch(e) {
				this.error(e);
			}
		},

		numberFormat : function(data) {
			data+= '';
			var objRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
			while(objRegExp.test(data)) {
				data = data.replace(objRegExp, '$1,$2');
			}
			return data;
		},

		// 옵션정보를 가지고 selectBox 를 셋팅합니다.(일체형)
		integralFormSelectBoxSetting : function(data) {
			try {
				// 옵션영역 체크
				this.checkContainer();

				// 원본데이터 저장
				this.originalData = data;

				var html = [];
				if(this.titleDisplay == true) html.push('<strong class="option_list_title">필수옵션</strong>');

				html.push('<select id="option1" onchange="billingOption.changeIntegralSelectBox(this)">');
				html.push('<option value="">선택하세요.');

				$(data.goodsOptionAttributeValueList).each(function(e, value) {
					var text = [];
					var disabledClass = '';

					if(data.firstAttributeName != null) {
						if(billingOption.integralAttributeDisplay == true) {
							text.push(data.firstAttributeName + ':' + value.firstAttributeValueName);
						} else {
							text.push(value.firstAttributeValueName);
						}
					}
					if(data.secondAttributeName != null) {
						if(billingOption.integralAttributeDisplay == true) {
							text.push(data.secondAttributeName + ':' + value.secondAttributeValueName);
						} else {
							text.push(value.secondAttributeValueName);
						}
					}
					if(data.thirdAttributeName != null) {
						if(billingOption.integralAttributeDisplay == true) {
							text.push(data.thirdAttributeName + ':' + value.thirdAttributeValueName);
						} else {
							text.push(value.thirdAttributeValueName);
						}
					}
					if(data.fourthAttributeName != null) {
						if(billingOption.integralAttributeDisplay == true) {
							text.push(data.fourthAttributeName + ':' + value.fourthAttributeValueName);
						} else {
							text.push(value.fourthAttributeValueName);
						}
					}

					if(value.difference > 0) {
						text.push('(+' + billingOption.numberFormat(value.difference) + ')');
					} else if(value.difference < 0) {
						text.push('(' + billingOption.numberFormat(value.difference) + ')');
					}

					if(parseInt(value.stock) < 1 ) {
						text.push('(품절)');
						disabledClass = "class='disabled'";
					}

					html.push('<option value="' + value.attributeValueSeq + '" ' + disabledClass + '>' + text.join(billingOption.integralSplitString) + '</option>');
				});
				html.push('</select>');

				this.optionSelectBoxContainer.empty().append(html.join(''));

				// 상품가격 셋팅
				this.setTotalPrice();

			} catch(e) {
				this.error(e);
			}
		},

		// selectBox 값 변경시 옵션을 추가 합니다.(일체형)
		changeIntegralSelectBox : function(data) {
			$(this.originalData.goodsOptionAttributeValueList).each(function(e, value) {
				if($(data).val() == value.attributeValueSeq) {
					if(value.stock < 1) {
						alert(billingOption.message.stockOut);
					} else {
						billingOption.addOption(value);
					}
					$('#option1').val('');
					return false;
				}
			});
		}
	}
});