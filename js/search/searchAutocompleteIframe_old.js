;
/**
 * 자동완성 IFRAME 방식
 */
(function($){
	var Fn = autocomplete = function(el, options) {
		var self		= this;
		var opt			= {
							isUsingAKCService	: true,		// 자동완성 서비스 사용 유무.
							isDisplayAKCService	: false,	// 자동완성 서비스 display 유무
							isAKCArea			: false,	// 마우스 커서 위치가 자동완성 영역인지.
							akcServiceType		: "search",	// 자동완성 서비스 타입 구분 : 통합검색 / 메인 및 섹션.
							akcSourceKeyword 	: "",		// 입력 키워드.
							transformAKCSourceKeyword: "",	// 자동완성 변환 키워드.
							akcInputForm		: "",		// 자동완성 입력 폼
							//akcResultText		: "",		// 자동완성 리스트
							akcRequestTimeOut	: 0,		// 자동완성 time out value.
							akcListCurrentLine	: 0,		// 자동완성 리스트 라인 위치
							akcListTotalLine	: 0,		// 자동완성 리스트 총 라인 수

							arrowImg1 : '',
							arrowImg2 : '',

							searchURL : 'http://search.danawa.com',
							akcLinkDomain	: ''			// 자동완성 요청 도메인
						};

		var selectors	= {
							akcKeywordFrame	: null,		// IFrame
							akcKeywordLayer	: null,		// Iframe의 자동완성 키워드 레이어
							serviceCtrlLayer: null,		// "기능끄기" 버튼 레이어
							akcLayerContent	: null,		// 검색서버의 자동완성 데이타 디스플레이 레이어
							akcArrowLayer	: null,
							akcKeywordInput	: null		// 검색어 입력 박스
						};

		this.el			= el;
		this.options	= $.extend(opt, options || {});
		this.selectors	= selectors;
		this.iframesrc	= "/globalData/searchAKC/akcNew.php";

		this.init();
	}
	Fn.prototype = {
		init	: function() {
			var self= this;
			
			this.selectors.akcKeywordInput = $("INPUT#AKCSearch",this.el);

			var img1 = new Image();
				img1.src = "http://img.danawa.com/new/newmain/img/btn_auto_up2.gif";
			var img2 = new Image();
				img2.src = "http://img.danawa.com/new/newmain/img/btn_auto_down.gif";			
			this.options.arrowImg1 = '<img src="'+img1.src+'" width="13" height="11" alt="자동완성 닫기"/>';
			this.options.arrowImg2 = '<img src="'+img2.src+'" width="13" height="11" alt="자동완성 닫기"/>';

			// 이벤트 리스너 추가
			$("INPUT#AKCSearch", this.el)
			.attr("autocomplete","off")
			.bind("mousedown, focus", function(){
				self.AKCOpenClose();
			})
			.bind( (($.browser.opera) ? "keypress" : "keydown" ), function(e){
				setTimeout(function(){ self.akcKeyEventAction(e); }, 100);
			})
			.bind("blur", function(){
				self.AKCFocusOut();
			});

			this.akcArrowDraw();
			this.akcIframeCreate();
		},

		// 자동완성 Iframe 생성
		akcIframeCreate : function () {
			var self= this;
			var el = this.el;
			var opt = this.options;
			var sel = this.selectors;

			var akcKeywordFrame = document.createElement("IFRAME");
			var postionObj = $(">SPAN:first", el);
				$(akcKeywordFrame)
				.attr({
					"id"			: "AKCFrame",
					"name"			: "AKCFrame",
					"src"			: self.iframesrc,
					"frameborder"	: "0",
					"scrolling"		: "no"
				})
				.css({
					position: "absolute",
					zIndex	: 1000,
					width	: postionObj.width() + "px",
					height	: "0px",
					left	: "3px",
					top		: postionObj.height() + 4+ "px",
					padding	: "1px",
					border	: "0px solid RED"
				})
				.bind({
					"mouseenter": function(){ opt.isAKCArea = true; },
					"mouseleave": function(){ opt.isAKCArea = false; },
					"load"		: function(){
									sel.akcKeywordLayer = $(this).contents().find("DIV#akcLayer");
									this.contentWindow.resizeIframe(this);
								}
				})
				;
			
			$(el).append(akcKeywordFrame);
			sel.akcKeywordFrame = akcKeywordFrame;
		},

		akcArrowDraw : function() {
			var sel = this.selectors;
			var opt = this.options;
			var el	= this.el;
			var self= this;

			if(!sel.akcArrowLayer) {
				var akcArrowLayer = document.createElement("DIV");
					$(akcArrowLayer)
					.attr("id","akcArrowLayer")
					.css({width:"13px", height:"11px"})
					.append( opt.arrowImg2 )
					.toggle(
						function(){ self.akcDisplayControl(1); },
						function(){ self.akcDisplayControl(0); }
					);

				$(el).append(akcArrowLayer);

				$(akcArrowLayer)
				.css({
					position: "absolute",
					zIndex	: 1000,
					left	: $(sel.akcKeywordInput).width() + 15 + "px",
					top		: "13px"
				})
				.show();

				// 전역변수에 담는다.
				sel.akcArrowLayer	= akcArrowLayer;
			}
		},

		//자동완성 입력 키 이벤트 처리
		akcKeyEventAction : function(e) {
			var opt = this.options;
			var sel = this.selectors;

			var akcInputKeyword = "";

			// esc key : close akc window
			if(e.keyCode == 27) {
				opt.isAKCArea = false;
				this.akcDisplayControl(0);
				return;
			}

			// akc 창이 열려있지 않다면  open
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

					// 키워드 입력
					$(sel.akcKeywordInput).val( $("#akc_"+opt.akcListCurrentLine).attr('text') );
				}

				return;
			}

			// key up : move up
			if(e.keyCode == 38) {
				if(opt.akcListCurrentLine > 1) {
					$("#akc_"+opt.akcListCurrentLine).removeClass("select");
					opt.akcListCurrentLine--;
					$("#akc_"+opt.akcListCurrentLine).addClass("select");

					// 키워드 입력
					$(sel.akcKeywordInput).val( $("#akc_"+opt.akcListCurrentLine).attr('text') );
				}

				return;
			}

			

			// etc key input action
			opt.akcListCurrentLine = 0;
			opt.akcListTotalLine = 0;
			this.akcDisplayControl(1);
		},


		// 자동완성 창 컨트롤러.
		// 자동완성 창 보여주기/보여주지 않기에 대한 기능만 수행.
		// flag : 자동완성 창 제어 플래그. 1이면 display, 0이명 non display.
		akcDisplayControl : function (flag) {
			var sel = this.selectors;
			var opt = this.options;

			if(flag) {
				opt.isDisplayAKCService = true;
				$(sel.akcKeywordFrame).show();
				this.akcArrowDisplay();
				this.akcDataDisplay();
			} else {
				opt.isDisplayAKCService = false;
				$(sel.akcKeywordFrame).hide();
				this.akcArrowDisplay();
			}
		},

		// 자동완성 arrow 버튼 컨트롤러. arrow 이미지 및 이미지 클랙 액션 변경에 대한 기능만 수행.
		// isDisplayService가 true이면 자동완성 창 보여주지 않기에 대한 액션으로 변경, false이면 보여주기 액션으로 변경.
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

			// 자동완성 및 자동완성 안내 문구 선택
			if(opt.isUsingAKCService) {
				// time out initialize
				if(opt.akcRequestTimeOut) {
					window.clearTimeout(opt.akcRequestTimeOut);
				}

				// 자동완성 리스트
				opt.akcRequestTimeOut = window.setTimeout(function(){
					self.makeAKCData();
				}, 100);
				return;
			} else {
				// 자동완성 안내문구(기능 끄기 상태)
				var sel = this.selectors;
				akcDisplayText = self.getAKCInfo(0);
				//$(sel.akcLayerContent).html("");
				//$(sel.akcLayerContent).html(akcDisplayText);
			}
		},


		makeAKCData : function() {
			var opt = this.options;
			var sel = this.selectors;
			var self= this;
			var el	= this.el;

			var akcDisplayText = "";
			var akcKeywordParamValue = "";
			var akcRequestUrl = "";

			opt.akcSourceKeyword = $(sel.akcKeywordInput).val();

			if( opt.akcSourceKeyword == "" || opt.akcSourceKeyword == null ) {
				//akcDisplayText = this.getAKCInfo(1);
				//$(sel.akcLayerContent).html ( akcDisplayText );
				return;
			}

			akcKeywordParamValue = opt.akcSourceKeyword.replace("'", "||");

			if(akcKeywordParamValue == "" || akcKeywordParamValue == null) {
				return;
			}

			akcKeywordParamValue = escape(akcKeywordParamValue);

			akcRequestUrl = self.iframesrc + "?q=";
			akcRequestUrl += akcKeywordParamValue;
			
			$(sel.akcKeywordFrame).attr("src",akcRequestUrl);
		},
		
		/*
		akcSearchResult : function (data) {
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
				.append("<li><span class=\"auto_text\" style=\"width:100%;\">해당 단어 관련 추천어가 없습니다.</span></li>");
			} else {
				eval(data);
				opt.transformAKCSourceKeyword = eQuery;
				opt.akcListTotalLine = myJSONObject.LIST.length;

				if(myJSONObject.LIST.length == 0) {
					$(akcLayerContent)
					.append("<li><span class=\"auto_text\" style=\"width:100%;\">해당 단어 관련 추천어가 없습니다.</span></li>");
				} else {
					for(i = 0; i < myJSONObject.LIST.length; i++) {
						var li = document.createElement("LI");
							$(li)
							.attr("id","akc_"+(i+1))
							.attr("text", myJSONObject.LIST[i].KEYWORD)
							.bind("click", {kwd:myJSONObject.LIST[i].KEYWORD}, function(e){ top.location.href="http://search.danawa.com/dsearch.php?query="+e.data.kwd })
							//.bind("mouseover", function(){ self.akcHighlight(this, 1); $el.val( $(this).attr("text") ); })
							.bind("mouseover", function(){ self.akcHighlight(this, 1); })
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
		

		// 자동완성 키워드 리스트 매칭.
		// @param keywordList 자동완성 키워드 리스트.
		// @return returnKeyword string 매칭된 키워드.
		getAKCKeywordMatch : function (akcKeywordParam) {
			var opt = this.options;
			var sel = this.selectors;

			// akc 키워드 공백 제거
			var akcTargetKeyword = akcKeywordParam.replace(/ /g, "");
			// 입력 키워드 공백 제거
			var ackTargetSourceKeyword = opt.akcSourceKeyword.replace(/ /g, "");
			// 변환된 입력 키워드 공백 제거
			var akcSubTargetSourceKeyword = opt.transformAKCSourceKeyword.replace(/ /g, "");
			// 매칭 결과 키워드
			var returnAKCKeyword = "";

			if(akcTargetKeyword == ackTargetSourceKeyword) {
				returnAKCKeyword += "<em>" + akcKeywordParam + "</em>";
			} else {
				// 전반부 매칭.
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

				// 후반부 매칭.
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

			// 매칭된 키워드가 없을 경우 변환된 키워드를 이용하여 매칭
			if(returnAKCKeyword == "" && akcSubTargetSourceKeyword) {
				if(akcTargetKeyword == akcSubTargetSourceKeyword) {
					returnAKCKeyword += "<em>" + akcKeywordParam + "</em>";
				} else {
					// 전반부 매칭
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

					// 후반부 매칭
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
		*/

		// 자동완성 리스트 라인 하이라이팅.
		// @param obj 해당 라인 object.
		// @param flag 하이라이팅 여부를 위한 플래그.
		akcHighlight : function (objParam, akcFlagParam) {
			if(akcFlagParam) {
				$(objParam).addClass("select");
			} else {
				$(objParam).removeClass("select");
			}
		},


		// 입력창 키 이벤트 체크.
		// @param e 이벤트 객체.
		// @return true or false boolean.
		getAKCKeyEventCheck : function (e) {
			var sel = this.selectors;
			var opt = this.options;

			//if(! sel.akcKeywordFrame) this.akcLayerCreate();

			if(e.keyCode == 40 || (!e.shiftKey && e.keyCode == 9)) {
				if( $(sel.akcKeywordFrame).is(":visible") == 'true') return false;
			} else if(e.keyCode == 38 || (e.shiftKey && e.keyCode == 9) || e.keyCode == 27 || e.keyCode == 16) {
				return false;
			}
			return true;
		},

		// 자동완성 안내 문구.
		// @param flag 자동완성 안내문구 선택을 위한 플래그.
		// @return infoMessage string 자동완성 안내 문구.
		getAKCInfo : function(flag) {
			var infoMessage = "";

			if(flag) {
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">검색어 자동완성 기능을 사용중 입니다.</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">검색어 자동완성 기능의 중지를 원하시면</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">'기능끄기'를 클릭해 주십시오.</span></li>";
			} else {
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">검색어 자동완성 기능이 중지 되었습니다.</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">검색어 자동완성 기능의 사용을 원하시면</span></li>";
				infoMessage += "<li><span class=\"auto_text\" style=\"width:100%\">'기능켜기'를 클릭해 주십시오.</span></li>";
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

		// 자동완성 서비스 컨트롤러. 자동완성 기능 사용/미사용에 대한 기능만 수행.
		// isUsingAKCService가 true이면 기능 미상용으로 전환, false이면 사용으로 전환.
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

		// 자동완성 기능 버튼 레이어 동작.
		akcServiceCtrlLayer : function () {
			var opt = this.options;
			var sel = this.selectors;

			if(opt.isUsingAKCService) {
				$(sel.serviceCtrlLayer).html("기능끄기");
			} else {
				$(sel.serviceCtrlLayer).html("기능켜기");
			}
		}
	}

	$.danawaSearchAutoComplete = function(selector, settings) {
		new autocomplete(selector, settings);
	}
	$.fn.danawaSearchAutoComplete = function(settings) {
		return this.each(function(){
			new $.danawaSearchAutoComplete(this,settings);
		});
	}

})(jQuery);
