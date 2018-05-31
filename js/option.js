$(document).ready(function() {
	billingOption =  {
		type						: '001',							// �ɼ�Ÿ��(001 : �и���(�⺻), 002 : ��ü��)
		originalData				: null,								// �ɼ� ����������
		lastOptionDepth				: 0,								// ������ �ɼ� ����
		titleDisplay				: true,								// �ɼ�Ÿ��Ʋ ���� ����
		integralAttributeDisplay	: true,								// ��ü�� �ɼ��� ��� �ɼǸ� ���� ����
		integralSplitString			: ',',								// ��ü�� �ɼ��� ��� �ɼǸ� ���� ����
		optionSelectBoxContainer	: $('#optionSelectBoxContainer'),	// [�ʼ�]�ɼǿ���(selectBox)
		optionQuantityContainer		: $('#optionQuantityContainer'),	// [�ʼ�]�ɼǿ���(����)
		orderButton					: $('#orderBtn'),					// �����ϱ� ��ư ��ü
		totalPriceObj				: $('#totalPrice'),					// �ֹ���ǰ �� �ݾ� ��ü
		message						: {									// ��� �޼���
			stockOut		: '��� �����Ǿ����ϴ�.',
			alreadyOption	: '�̹� �߰��� �ɼ��Դϴ�.',
			limitOver		: '1�� ���ż����� �ʰ��Ǿ����ϴ�.'
		},

		// �ɼ�Ÿ�Կ� ���� selectBox �� �����մϴ�.
		formSetting : function(data) {
			switch(this.type) {
				case '001'	:this.separatedFormSelectBoxSetting(data);break;
				case '002'	:this.integralFormSelectBoxSetting(data);break;
				default		:this.error('�ɼ�Ÿ���� �������ּž� �մϴ�.[001 or 002]');
			}
		},

		// �ɼ������� ������ selectBox �� �����մϴ�.(�и���)
		separatedFormSelectBoxSetting : function(data) {
			try {
				// �ɼǿ��� üũ
				this.checkContainer();

				// ���������� ����
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
						html.push('		<option value="">' + obj[i] + ' ����</option>');
						html.push('</select>');
					}
					// 1�� �ɼ��� �ʼ�����, ���Ÿ� ���� ���ϰ� ���Ź�ư�� ����ó�� �մϴ�.
					if(i == 0 && obj[i] == null) {throw '�ɼ����� ��ȸ ����';}
				}

				if(this.titleDisplay == true) html.unshift('<strong class="option_list_title">�ʼ��ɼ�</strong>');

				this.optionSelectBoxContainer.empty().append(html.join(''));

				// 1�� �ɼ��׸��� selectBox�� ��ȭ
				this.convertSelectBoxByOptionValue(1);

				// ��ǰ���� ����
				this.setTotalPrice();
			} catch(e) {
				this.error(e);
			}
		},

		// ������ �߻��� ��� �ֹ��� ���ϰ� �մϴ�.
		error : function(e) {
			alert(e);
			this.orderButton.remove();
		},

		// �ɼ������� �ش��ϴ� �ɼ��׸��� selectBox�� ��ȯ�մϴ�.
		convertSelectBoxByOptionValue : function(depth) {
			if(parseInt(depth) < 1 || parseInt(depth) > 4 || depth == undefined) throw '�ɼ����� ����';

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

		// �ɼ��׸� �߰����� üũ
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

		// ������ �ɼ��׸��ϰ��� ���������� ǰ��, �������̸� ������� ������ �����۾�
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
				optionText.push('(+' + this.numberFormat(data.difference) + '��)');
			} else if(data.difference < 0) {
				optionText.push('(' + this.numberFormat(data.difference) + '��)');
			}
			if(parseInt(data.stock) < 1 ) {
				optionText.push('(ǰ��)');
				disabledClass = "class='disabled'";
			}

			return '<option value="' + attributeValue[this.lastOptionDepth] + '" optionAttributeValueSeq="' + data.attributeValueSeq + '"' + disabledClass + ' >' + optionText.join(' ') +'</option>';
		},

		// �ɼ� �߰�
		addOption : function(data) {
			// 1�� �ִ� ���� ���� üũ
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

				// �ݾ��� ���̰� �ִ°�� ǥ�ø� ���ݴϴ�.
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
					html.push('		<input type="text" name="optionOrderCount[]" class="input_qnt" title="�����Է�" value="1" readonly="readonly">');
					html.push('		<div class="edit_number">');
					html.push('			<button type="button" class="btn_qnt_up" title="���� ����" onclick="billingOption.plusQuantity(this)" stock=' + data.stock + '>����</button>');
					html.push('			<button type="button" class="btn_qnt_down" title="���� ����" onclick="billingOption.minusQuantity(this)">����</button>');
					html.push('		</div>');
					html.push('	</div>');
					html.push('	<strong class="price"><span class="num">' + this.numberFormat(data.salePrice) + '</span>��</strong>');
					html.push('	<a href="#" class="btn_del" onclick="billingOption.deleteOption(this); return false;">����</a>');
					html.push('</div>');

				this.optionQuantityContainer.append(html.join(''));

				this.setTotalPrice();
			}

		},

		// �ɼ� ����
		deleteOption : function(data) {
			$(data).parent().remove();
			this.setTotalPrice();
		},

		// �ֹ����� ����
		plusQuantity : function(data) {
			if(this.checkOrderCount(data)) {
				var obj = $(data).parent().siblings('.input_qnt');

				if(parseInt(obj.val()) + 1 > parseInt($(data).attr('stock'))) {
					alert('��� �����ϴ�.');
				} else {
					obj.val(parseInt(obj.val()) + 1);
				}
			}
			this.setTotalPrice();
		},

		// �ֹ����� ����
		minusQuantity : function(data) {
			var obj = $(data).parent().siblings('.input_qnt');
			if(parseInt(obj.val()) > 1) obj.val(parseInt(obj.val()) - 1);
			this.setTotalPrice();
		},

		// �ֹ����� üũ
		checkOrderCount : function() {
			// 1�� �������� ����
			var limitOrderCount =  this.optionQuantityContainer.attr('limitOrderCount');

			if(isNaN(limitOrderCount) == true || parseInt(limitOrderCount) < 0 || limitOrderCount == '') {
				throw 'limitOrderCount �Ӽ��� �����Դϴ�.';
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

		// �ɼǿ��� üũ
		checkContainer : function() {
			if(this.optionSelectBoxContainer.length < 1) throw 'optionSelectBoxContainer ������ ���ǵ��� �ʾҽ��ϴ�.';

			if(this.optionQuantityContainer.length < 1) {
				throw 'optionQuantityContainer ������ ���ǵ��� �ʾҽ��ϴ�.';
			} else {
				if(this.optionQuantityContainer.attr('limitOrderCount') == null) {
					throw 'limitOrderCount �Ӽ��� ���ǵ��� �ʾҽ��ϴ�.';
				}
			}
		},

		// �� ��ǰ�ݾ��� �����մϴ�.
		setTotalPrice : function() {
			var totalPrice = 0;
			$('.opt_item').each(function(e, data) {
				var price = parseInt($(data).find('.num').text().replace(',', ''));
				var quantity = parseInt($(data).find('.input_qnt').val());
				totalPrice+= price * quantity;
			});
			this.totalPriceObj.text(this.numberFormat(totalPrice));
		},

		// selectBox �� �����  ���� �ɼǰ��� ������ �մϴ�.
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

				// ���������� ���õ� ������ �ɼ��׸��� �߰��մϴ�.
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

		// �ɼ������� ������ selectBox �� �����մϴ�.(��ü��)
		integralFormSelectBoxSetting : function(data) {
			try {
				// �ɼǿ��� üũ
				this.checkContainer();

				// ���������� ����
				this.originalData = data;

				var html = [];
				if(this.titleDisplay == true) html.push('<strong class="option_list_title">�ʼ��ɼ�</strong>');

				html.push('<select id="option1" onchange="billingOption.changeIntegralSelectBox(this)">');
				html.push('<option value="">�����ϼ���.');

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
						text.push('(ǰ��)');
						disabledClass = "class='disabled'";
					}

					html.push('<option value="' + value.attributeValueSeq + '" ' + disabledClass + '>' + text.join(billingOption.integralSplitString) + '</option>');
				});
				html.push('</select>');

				this.optionSelectBoxContainer.empty().append(html.join(''));

				// ��ǰ���� ����
				this.setTotalPrice();

			} catch(e) {
				this.error(e);
			}
		},

		// selectBox �� ����� �ɼ��� �߰� �մϴ�.(��ü��)
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