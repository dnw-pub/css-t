;(function($){
	var opt = {
		isUsingAKCService	: true,		// �ڵ��ϼ� ���� ��� ����.
		isDisplayAKCService	: false,	// �ڵ��ϼ� ���� display ����
		isAKCArea			: false,	// ���콺 Ŀ�� ��ġ�� �ڵ��ϼ� ��������.			
		akcServiceType		: "search",	// �ڵ��ϼ� ���� Ÿ�� ���� : ���հ˻� / ���� �� ����.
		akcSourceKeyword 	: "",		// �Է� Ű����.
		transformAKCSourceKeyword: "",	// �ڵ��ϼ� ��ȯ Ű����.
		akcInputForm		: "",		// �ڵ��ϼ� �Է� ��
		//akcResultText		: "",		// �ڵ��ϼ� ����Ʈ
		akcRequestTimeOut	: 0,		// �ڵ��ϼ� time out value.
		akcListCurrentLine	: 0,		// �ڵ��ϼ� ����Ʈ ���� ��ġ
		akcListTotalLine	: 0,		// �ڵ��ϼ� ����Ʈ �� ���� ��
		
		arrowImg1 : '<img src="http://img.danawa.com/new/newmain/img/btn_auto_up2.gif" width="13" height="11" alt="�ڵ��ϼ� �ݱ�"/>',
		arrowImg2 : '<img src="http://img.danawa.com/new/newmain/img/btn_auto_down.gif" width="13" height="11" alt="�ڵ��ϼ� ��ġ��"/>',
		
		searchURL : 'http://search.danawa.com'
	};

	var selectors = {
		akcLayer		: null,		// �ڵ��ϼ� �����ִ� ���̾�
		serviceCtrlLayer: null,		// "��ɲ���" ��ư ���̾�
		akcLayerContent	: null,		// �˻������� �ڵ��ϼ� ����Ÿ ���÷��� ���̾�
		akcArrowLayer	: null
	};
	
	$.danawaSearchAutoComplete = function(el, options) {
		var self = this;
		
		this.$el = $(el);
		this.options = $.extend(opt, options || {});
		this.selectors = selectors;
		
		this.akcArrowDraw(); // �ڵ��ϼ� ǥ��..
		this.akcLayerCreate();
		
		this.init();
	};
	
	$.danawaSearchAutoComplete.fn = $.danawaSearchAutoComplete.prototype = {};
	$.danawaSearchAutoComplete.fn.extend = $.danawaSearchAutoComplete.extend = $.extend;	
	$.danawaSearchAutoComplete.fn.extend({
		
		init : function() {
			var self = this;
			var $el = this.$el;

			// �̺�Ʈ ������ �߰�
			this.$el
			.attr("autocomplete","off")
			.bind("mousedown, focus", function(){
				self.AKCOpenClose();
			})
			.bind( (($.browser.opera) ? "keypress" : "keydown" ), function(e){
				setTimeout(function(){ self.akcKeyEventAction(e); },100);
			})
			.bind("blur", function(){
				self.AKCFocusOut();
			});
		},
		
		/**
		 * �ڵ��ϼ� �Է� Ű �̺�Ʈ ó��
		 * @param akcEventParam �̺�Ʈ ��ü.
		 * @return null
		 */
		akcKeyEventAction : function(e) {
			var opt = this.options;
			var sel = this.selectors;
			var $el = this.$el;
			
			var akcInputKeyword = "";
		
			// esc key : close akc window
			if(e.keyCode == 27) {
				opt.isAKCArea = false;
				this.akcDisplayControl(0);
				return;
			}
			
			// akc â�� �������� �ʴٸ�  open
			if(!opt.isDisplayAKCService) {
				this.akcDisplayControl(1);
			}
			
			// tab key : non action
			if(e.keyCode == 9) {
				e.returnValue = false;
				return;
			}
			
			// key down : move down
			if(e.keyCode == 40) {
				if(opt.akcListCurrentLine < opt.akcListTotalLine) {
					if(opt.akcListCurrentLine > 0) {
						$("#akc_"+opt.akcListCurrentLine).removeClass("select");
					}
					
					opt.akcListCurrentLine++;
					$("#akc_"+opt.akcListCurrentLine).addClass("select");
					
					// Ű���� �Է�
					$el.val( $("#akc_"+opt.akcListCurrentLine).attr('text') );
				}
				
				return;
			}
			
			// key up : move up
			if(e.keyCode == 38) {
				if(opt.akcListCurrentLine > 1) {
					$("#akc_"+opt.akcListCurrentLine).removeClass("select");
					opt.akcListCurrentLine--;
					$("#akc_"+opt.akcListCurrentLine).addClass("select");
					
					// Ű���� �Է�
					$el.val( $("#akc_"+opt.akcListCurrentLine).attr('text') );
				}
				
				return;
			}
			
			// etc key input action
			opt.akcListCurrentLine = 0;
			opt.akcListTotalLine = 0;
			this.akcDisplayControl(1);
			
		},
		
		
		/**
		 * �ڵ��ϼ� â ��Ʈ�ѷ�. �ڵ��ϼ� â �����ֱ�/�������� �ʱ⿡ ���� ��ɸ� ����.
		 * @param akcFlagParam �ڵ��ϼ� â ���� �÷���. 1�̸� display, 0�̸� non display.
		 */
		akcDisplayControl : function (flag) {
			var sel = this.selectors;
			var opt = this.options;
			
			if(flag) {
				opt.isDisplayAKCService = true;
				$(sel.akcLayer).show();
				this.akcArrowDisplay();
				this.akcDataDisplay();
			} else {
				opt.isDisplayAKCService = false;
				$(sel.akcLayer).hide();
				this.akcArrowDisplay();
			}
		},
		
		/**
		 * �ڵ��ϼ� â
		 */
		akcLayerCreate : function () {
			var self = this;
			var $el = this.$el;
			var opt = this.options;
			var sel = this.selectors;
			
			
			var akcLayer = document.createElement("DIV");
				$(akcLayer)
				.bind("mouseenter",function(){ opt.isAKCArea = true })
				.bind("mouseleave",function(){ opt.isAKCArea = false });
			
			var akcLayerContent = document.createElement("UL");
				
			var serviceCtrlLayer = document.createElement("DIV");
				$(serviceCtrlLayer)
				.addClass("function")
				.html("��ɲ���")
				.bind("click", function(){ self.akcServiceControl() });

			$(akcLayer)
			.append( $(akcLayerContent) )
			.append( $(serviceCtrlLayer) )
			.hide();
			
			document.body.appendChild(akcLayer);
			
			// ���������� ��´�.
			sel.akcLayer 		= akcLayer;
			sel.akcLayerContent	= akcLayerContent;
			sel.serviceCtrlLayer= serviceCtrlLayer;
			
			var postionObj = $el.parent();
			
			$(akcLayer)
			.addClass("auto_complete")
			.css({
				position: "absolute",
				zIndex	: 1000,
				left	: postionObj.offset().left + 4 + "px",
				top		: ( postionObj.offset().top + postionObj.height() + 5 ) + "px",
				width	: postionObj.width() -2 + "px"
			});
		},
		
		akcArrowDraw : function() {
			var sel = this.selectors;
			var opt = this.options;
			var $el = this.$el;
			var self= this;
			
			if(!sel.akcArrowLayer) {
				var akcArrowLayer = document.createElement("DIV");
					$(akcArrowLayer)
					//.attr("id","akcArrowLayer")
					.css({width:"13px", height:"11px"})
					.append( opt.arrowImg2 )
					.toggle(
						function(){ self.akcDisplayControl(1); },
						function(){ self.akcDisplayControl(0); }
					);
				
				document.body.appendChild(akcArrowLayer);
				
				$(akcArrowLayer)
				.css({
					position: "absolute",
					zIndex	: 1000,
					left	: ($el.offset().left + $el.width() + 7) + "px",
					top		: ($el.offset().top + 5) + "px"
				})
				.show();
				
				// ���������� ��´�.
				sel.akcArrowLayer	= akcArrowLayer;
			}
		},
		
		/**
		 * �ڵ��ϼ� arrow ��ư ��Ʈ�ѷ�. arrow �̹��� �� �̹��� Ŭ�� �׼� ���濡 ���� ��ɸ� ����.
		 * isDisplayService�� true�̸� �ڵ��ϼ� â �������� �ʱ⿡ ���� �׼����� ����, false�̸� �����ֱ� �׼����� ����.
		 */
		akcArrowDisplay : function () {
			var sel = this.selectors;
			var opt = this.options;
		
			if(opt.isDisplayAKCService) {
				$(sel.akcArrowLayer).html(opt.arrowImg1);
			} else {
				$(sel.akcArrowLayer).html(opt.arrowImg2);
			}
		},
		
		akcDataDisplay : function() {			
			var opt = this.options;
			
			//var $el = this.$el;
			var self= this;
			var akcDisplayText = "";
			
			// �ڵ��ϼ� �� �ڵ��ϼ� �ȳ� ���� ����
			if(opt.isUsingAKCService) {
				// time out initialize
				if(opt.akcRequestTimeOut) { window.clearTimeout(opt.akcRequestTimeOut); }
					
				// �ڵ��ϼ� ����Ʈ
				opt.akcRequestTimeOut = window.setTimeout(function(){
					self.makeAKCData();
				}, 100);
				return;
			} else {
				// �ڵ��ϼ� �ȳ�����(��� ���� ����)
				var sel = this.selectors;
				akcDisplayText = self.getAKCInfo(0);
				$(sel.akcLayerContent).html("");
				$(sel.akcLayerContent).html(akcDisplayText);
			}
		},
		
		
		makeAKCData : function() {
			var opt = this.options;
			var sel = this.selectors;
			var self = this;
			var $el = this.$el;
			
			var akcDisplayText = "";
			var akcKeywordParamValue = "";
			var akcRequestUrl = "";
			
			opt.akcSourceKeyword = $el.val();
			
			if( opt.akcSourceKeyword == "" || opt.akcSourceKeyword == null ) {
				akcDisplayText = this.getAKCInfo(1);
				$(sel.akcLayerContent).html ( akcDisplayText );
				return;
			}
			
			akcKeywordParamValue = opt.akcSourceKeyword.replace("'", "||");
			
			if(akcKeywordParamValue == "" || akcKeywordParamValue == null) {
				return;
			}

			//akcRequestUrl = "/globalData/searchAKC/akc.json.php";
			akcRequestUrl = "/globalData/searchAKC/akc.php";
			
			//console.log(akcKeywordParamValue);
			
			$.ajax({
				type : "get",
				url : akcRequestUrl,
				//data : {q : encodeURIComponent(akcKeywordParamValue)},
				data : {q : akcKeywordParamValue},
				//dataType : "json",
				success : function(data, textStatus) {
					self.akcSearch(data);
				},
				error : function (xhr, status, err) {
					//console.log("error:" + xhr.status);
				},
				complete : function(xhr, status) {
					//console.log(xhr.responseText);
				}
			});
		},
		
		akcSearch : function (data) {
			var opt = this.options;
			var sel = this.selectors;
			var $el = this.$el;
			var self = this;
			//var akcListText = "";
			
			//console.log(data);
			
			var akcLayerContent = sel.akcLayerContent;
			//var akcListText = "";
			$(akcLayerContent).html("");

			if(!data) {
				//opt.akcResultText = "";
				$(akcLayerContent)
				.append("<li><span class=\"auto_text\" style=\"width:100%;\">�ش� �ܾ� ���� ��õ� �����ϴ�.</span></li>");
			} else {
				eval(data);	
				opt.transformAKCSourceKeyword = eQuery;
				opt.akcListTotalLine = myJSONObject.LIST.length;
				
				if(myJSONObject.LIST.length == 0) {
					$(akcLayerContent)
					.append("<li><span class=\"auto_text\" style=\"width:100%;\">�ش� �ܾ� ���� ��õ� �����ϴ�.</span></li>");
				} else {
					for(i = 0; i < myJSONObject.LIST.length; i++) {
						var li = document.createElement("LI");
							$(li)
							.attr("id","akc_"+(i+1))
							.attr("text", myJSONObject.LIST[i].KEYWORD)
							.bind("click", {kwd:myJSONObject.LIST[i].KEYWORD}, function(e){ top.location.href = "http://search.danawa.com/dsearch.php?query="+e.data.kwd })
							.bind("mouseover", function(){ self.akcHighlight(this, 1); $el.val( $(this).attr("text") ); })
							.bind("mouseout", function(){ self.akcHighlight(this, 0); });
						var span1 = document.createElement("SPAN");
							$(span1)
							.addClass("auto_text")
							.html( self.getAKCKeywordMatch(myJSONObject.LIST[i].KEYWORD) );
						var span2 = document.createElement("SPAN");
							$(span2)
							.addClass("start")
							.html( "<img src=\"http://img.danawa.com/new/newmain/img/star" + myJSONObject.LIST[i].INFO + ".gif\" alt=\"star" + myJSONObject.LIST[i].INFO + "\" />" );
							
						$(li).append( $(span1) );
						$(li).append( $(span2) );
						$(akcLayerContent).append( $(li) );
					}
				}				
			}
		},
		
		/**
		 * �ڵ��ϼ� Ű���� ����Ʈ ��Ī.
		 * @param keywordList �ڵ��ϼ� Ű���� ����Ʈ.
		 * @return returnKeyword string ��Ī�� Ű����.
		 */
		getAKCKeywordMatch : function (akcKeywordParam) {
			var opt = this.options;
			var sel = this.selectors;
			
			// akc Ű���� ���� ����
			var akcTargetKeyword = akcKeywordParam.replace(/ /g, "");
			// �Է� Ű���� ���� ����
			var ackTargetSourceKeyword = opt.akcSourceKeyword.replace(/ /g, "");
			// ��ȯ�� �Է� Ű���� ���� ����
			var akcSubTargetSourceKeyword = opt.transformAKCSourceKeyword.replace(/ /g, "");
			// ��Ī ��� Ű����
			var returnAKCKeyword = "";
			
			if(akcTargetKeyword == ackTargetSourceKeyword) {
				returnAKCKeyword += "<em>" + akcKeywordParam + "</em>";
			} else {
				// ���ݺ� ��Ī.
				if(akcTargetKeyword.substring(0, ackTargetSourceKeyword.length) == ackTargetSourceKeyword) {
					returnAKCKeyword = "<em>";

					for(var i = 0, j = 0; j < ackTargetSourceKeyword.length; i++) {
						if(akcKeywordParam.substring(i, i+1) != " ") {
							j++;
						}
						returnAKCKeyword += akcKeywordParam.substring(i, i+1);
					}
					returnAKCKeyword += "</em>" + akcKeywordParam.substring(i, akcKeywordParam.length);
				}
				
				// �Ĺݺ� ��Ī.
				if(akcTargetKeyword.substring(akcTargetKeyword.length - ackTargetSourceKeyword.length) == ackTargetSourceKeyword) {
					for(var i = 0, j = 0; j < (akcTargetKeyword.length - ackTargetSourceKeyword.length); i++) {
						if(akcKeywordParam.substring(i, i + 1) != " ") {
							j++;
						}
						returnAKCKeyword += akcKeywordParam.substring(i, i + 1);
					}

					returnAKCKeyword += "<em>";
					
					for(var k = i, l = 0; l < ackTargetSourceKeyword.length; k++) {
						if(akcKeywordParam.substring(k, k + 1) != " ") {
							l++;
						}
						returnAKCKeyword += akcKeywordParam.substring(k, k + 1);
					}
					returnAKCKeyword += "</em>";
				}
			}
			
			// ��Ī�� Ű���尡 ���� ��� ��ȯ�� Ű���带 �̿��Ͽ� ��Ī
			if(returnAKCKeyword == "" && akcSubTargetSourceKeyword) {
				if(akcTargetKeyword == akcSubTargetSourceKeyword) {
					returnAKCKeyword += "<em>" + akcKeywordParam + "</em>";
				} else {
					// ���ݺ� ��Ī
					if(akcTargetKeyword.substring(0, akcSubTargetSourceKeyword.length) == akcSubTargetSourceKeyword) {
						returnAKCKeyword = "<em>";

						for(var i = 0, j = 0; j < akcSubTargetSourceKeyword.length; i++) {
							if(akcKeywordParam.substring(i, i+1) != " ") {
								j++;
							}
							returnAKCKeyword += akcKeywordParam.substring(i, i+1);
						}
						returnAKCKeyword += "</em>";
					}
					
					// �Ĺݺ� ��Ī
					if(akcTargetKeyword.substring(akcTargetKeyword.length - akcSubTargetSourceKeyword.length) == akcSubTargetSourceKeyword) {
						for(var i = 0, j = 0; j < (akcTargetKeyword - akcSubTargetSourceKeyword.length); i++) {
							if(akcKeywordParam.substring(i, i + 1) != " ") {
								j++;
							}
							returnAKCKeyword += akcKeywordParam.substring(i, i + 1);
						}

						returnAKCKeyword += "<em>";

						for(var k = i, l = 0; l < akcSubTargetSourceKeyword.length; k++) {
							if(akcKeywordParam.substring(k, k + 1) != " ") {
								l++;
							}
							returnAKCKeyword += akcKeywordParam.substring(k, k + 1);
						}
						returnAKCKeyword += "</em>";
					}
				}
			}
			
			if(returnAKCKeyword == "") {
				returnAKCKeyword = akcKeywordParam;
			}
			
			return returnAKCKeyword;
		},
		
		/**
		 * �ڵ��ϼ� ����Ʈ ���� ���̶�����.
		 * @param obj �ش� ���� object.
		 * @param flag ���̶����� ���θ� ���� �÷���.
		 */
		akcHighlight : function (objParam, akcFlagParam) {
			if(akcFlagParam) {
				$(objParam).addClass("select");
			} else {
				$(objParam).removeClass("select");
			}
		},

		
		
		/**
		 * �Է�â Ű �̺�Ʈ üũ.
		 * @param e �̺�Ʈ ��ü.
		 * @return true or false boolean.
		 */

		getAKCKeyEventCheck : function (e) {
			var sel = this.selectors;
			var opt = this.options;
			
			//if(! sel.akcLayer) this.akcLayerCreate();
			
			if(e.keyCode == 40 || (!e.shiftKey && e.keyCode == 9)) {
				if( $(sel.akcLayer).is(":visible") == 'true') return false;
			} else if(e.keyCode == 38 || (e.shiftKey && e.keyCode == 9) || e.keyCode == 27 || e.keyCode == 16) {
				return false;
			}
			return true;
		},

		/**
		 * �ڵ��ϼ� �ȳ� ����.
		 * @param flag �ڵ��ϼ� �ȳ����� ������ ���� �÷���.
		 * @return infoMessage string �ڵ��ϼ� �ȳ� ����.
		 */
		getAKCInfo : function(flag) {
			var infoMessage = "";

			if(flag) {
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">�˻��� �ڵ��ϼ� ����� ����� �Դϴ�.</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">�˻��� �ڵ��ϼ� ����� ������ ���Ͻø�</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">'��ɲ���'�� Ŭ���� �ֽʽÿ�.</span></li>";
			} else {
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">�˻��� �ڵ��ϼ� ����� ���� �Ǿ����ϴ�.</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">�˻��� �ڵ��ϼ� ����� ����� ���Ͻø�</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">'����ѱ�'�� Ŭ���� �ֽʽÿ�.</span></li>";
			}
			
			return infoMessage;
		},
		
		
		AKCSearchStart : function (e) {
			if(this.getAKCKeyEventCheck(e)) this.akcDisplayControl(1);
		},		
		AKCFocusOut : function () {
			if(!this.options.isAKCArea) this.akcDisplayControl(0);
		},
		AKCOpenClose : function () {
			if(this.options.isDisplayAKCService)
				this.akcDisplayControl(0);
			else
				this.akcDisplayControl(1);
		},

		/**
		 * �ڵ��ϼ� ���� ��Ʈ�ѷ�. �ڵ��ϼ� ��� ���/�̻�뿡 ���� ��ɸ� ����.
		 * isUsingAKCService�� true�̸� ��� �̻������ ��ȯ, false�̸� ������� ��ȯ.
		 */

		akcServiceControl : function() {
			var opt = this.options;
			
			if(opt.isUsingAKCService) {
				opt.isUsingAKCService = false;
				this.akcDisplayControl(0);
				this.akcServiceCtrlLayer();
			} else {
				opt.isUsingAKCService = true;
				this.akcDisplayControl(1);
				this.akcServiceCtrlLayer();
			}
		},

		/**
		 * �ڵ��ϼ� ��� ��ư ���̾� ����.
		 */
		akcServiceCtrlLayer : function () {
			var opt = this.options;			
			var sel = this.selectors;
			
			if(opt.isUsingAKCService) {
				$(sel.serviceCtrlLayer).html("��ɲ���");
			} else {
				$(sel.serviceCtrlLayer).html("����ѱ�");
			}
		},
		empty : null
	});
	
	
	$.fn.danawaSearchAutoComplete = function(options) {
		return this.each(function(){
			new $.danawaSearchAutoComplete(this,options);
		});
	};
})(jQuery);



jQuery(document).ready(function($){
	var $searchBox = $('#AKCSearch');
	
	// �ڵ��ϼ�
	$searchBox.danawaSearchAutoComplete();
	
	// Ű���� �̺�Ʈ �߻��� �˻��ڽ��� �� ����...
	$(document).bind("keydown", function(e) {
		var key = e.keyCode;
        var tg = e.target;
        
		if( !(tg.nodeName == "INPUT" || tg.nodeName == "SELECT" || tg.nodeName == "TEXTAREA" || tg.nodeName == "OBJECT" || (e.ctrlKey && key != 86)) ) {
			if ( key==8 || (key>32 && key<41) || (key!=21 && key<32) || e.altKey ) {
			}
			else if ( key == 32 ) {
				if(e.shiftKey){
					scrollTo(0,0);
					$searchBox.focus();
					$searchBox.css("imeMode","active");
					$searchBox.select();
					e.returnValue = false;
				}
			} else if ( key == 21 ) {
				scrollTo(0,0);
				$searchBox.focus();
				$searchBox.css("imeMode", "active");
				$searchBox.select();
				e.returnValue = false;
			} else if ( $(tg) != $searchBox ){
				scrollTo(0,0);
				$searchBox.focus();
				$searchBox.css("imeMode", "inactive");
				$searchBox.select();
			}
		}
	});
	
	$("#srchFRM_TOP, #searchre").bind("submit",function(){ 
		if( $.trim( $searchBox.val() ) == '' ) {
			alert("�˻�� �Է��� �ּ���.");
			$searchBox.val("").focus();
			return false;
		} else {
			this.method = "get";
			this.action = "http://search.danawa.com/dsearch.php";
			return true;
		}
	});
});
