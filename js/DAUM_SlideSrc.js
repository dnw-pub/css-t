try{document.domain="danawa.net";}catch(e){}
try{document.execCommand("BackgroundImageCache",false,true);}catch(ignored){}
function $(id){return document.getElementById(id);}
function $C(node){return document.createElement(node);}
function $T(text){return document.createTextNode(text);}
function $A(iterable){
	if (!iterable) return [];
	var results=[];
	for (var i=0,length=iterable.length; i<length; i++)
		results.push(iterable[i]);
	return results;
}
/*
Thanks for JES
*/
Object.extend=function(a,b){for (var property in b) a[property]=b[property];return a;};
Function.prototype.bind=function(){
	var __method=this,args=$A(arguments),object=args.shift();
	return function() {
		return __method.apply(object,args.concat($A(arguments)));
	}
}
Function.prototype.bindAsEventListener=function()
{
	var __method=this,args=$A(arguments),object=args.shift();
	return function(event) {
		return __method.apply(object,[event || window.event].concat(args));
	}
}

// Common
function _debug( val ){
	try{
//		console.log( val );	
	}catch (e){}
}
var UI={};
UI.$=function(s) { return document.getElementById(s) };
UI.trim=function(s) {return s.replace(/(^\s*)|(\s*$)/g,"") };
UI.toogle=function(id) { UI.$(id).style.display=(UI.getStyle(UI.$(id),'display')=='none') ? 'block':'none' };
UI.getEl=function(e){var E=UI.getE(e);return E.target || E.srcElement}
UI.getE=function(e){return e || window.event}
UI.StringBuffer=function(){this.buffer=new Array()}
UI.StringBuffer.prototype={append:function(s){this.buffer.push(s)},toString:function(){return this.buffer.join("")}};
UI.setOpacity=function(el,value){ el.style.filter="alpha(opacity="+value+")"; el.style.opacity=(value/100); el.style.MozOpacity=(value/100); el.style.KhtmlOpacity=(value/100); };
UI.toogle=function(id) { UI.$(id).style.display=(UI.getStyle(UI.$(id),'display')=='none') ? 'block':'none' };
UI.getScroll=function () {
	if(document.all && typeof document.body.scrollTop != "undefined")
	{
		var cont=document.compatMode!="CSS1Compat"?document.body:document.documentElement;
		return {left:cont.scrollLeft,top:cont.scrollTop,width:cont.clientWidth,height:cont.clientHeight}
	}
	else
		return {left:window.pageXOffset,top:window.pageYOffset,width:window.innerWidth,height:window.innerHeight}
};
UI.parseQuery=function(s){
	var str=s||location.search.substr(1);
	var r={},t=[];
	var a=str.split('&');
	for(var i=0;i<a.length;i++){t=a[i].split("=");r[t[0]] = t[1];}
	return r;
};
UI.getStyle=function(el,style) {
	var value=el.style[style];
	if(!value)
	{
		if(document.defaultView && document.defaultView.getComputedStyle)
		{
			var css=document.defaultView.getComputedStyle(el,null);
			value=css ? css[style]:null;
		}
		else if (el.currentStyle) value=el.currentStyle[style];
	}
	return value=='auto' ? null:value;
};
//add event
UI.addEvent=function(object,type,listener) {
	if(object.addEventListener) {if(type=='mousewheel')type='DOMMouseScroll'; object.addEventListener(type,listener,false)}
	else { object.attachEvent("on"+type,listener); }
};
//delete event
UI.delEvent=function(object,type,listener){
	if (object.removeEventListener) {if(type=='mousewheel')type='DOMMouseScroll'; object.removeEventListener(type,listener,false)}
	else object.detachEvent('on'+type,listener);
};
//stop event
UI.stopEvent=function(event) {
	var e=event || window.event;
	try {
		if(e.preventDefault) {e.preventDefault(); e.stopPropagation(); }
		else {e.returnValue=false; e.cancelBubble=true;}

	} catch (e) {}
};
//get style
UI.getStyle=function(el,style) {
	var value=el.style[style];
	if(!value)
	{
		if(document.defaultView && document.defaultView.getComputedStyle)
		{
			var css=document.defaultView.getComputedStyle(el,null);
			value=css ? css[style]:null;
		}
		else if (el.currentStyle) value=el.currentStyle[style];
	}
	return value=='auto' ? null:value;
};
UI.addComma=function(s){
	s+='';
	s=s.replace(/,/gi,'');
	var re=new RegExp('(-?[0-9]+)([0-9]{3})');
	while(re.test(s)) s=s.replace(re,'$1,$2');
	return s;

};
UI.delComma=function(s){
	s=s.replace(/,/gi, "");
	return s;
}
UI.getBrowser=function(){
	var ua=navigator.userAgent.toLowerCase();
	var opera=/opera/.test(ua)
	UI._browser={
		ie:!opera && /msie/.test(ua),
		ie_ver: parseFloat(((ua.split('; '))[1].split(' '))[1]),
		opera:opera,
		ff:/firefox/.test(ua),
		chrome:/chrome/.test(ua),
		gecko:/gecko/.test(ua)
	};
	return UI._browser;
};




// option
UI.initOption=function(obj){obj.length=0;};
UI.createOption=function(text,value){
	var objOpt=document.createElement("OPTION"); // create object
	objOpt.text=text; // Text(Keyword)
	objOpt.value=value; // Value
	return objOpt;
};
UI.addOption=function(selectObj,keyword,value){
	if(selectObj==null)return;
	// add option
	var option = UI.createOption(keyword ,value);
	selectObj.options.add(option);
	return option;
};


UI.TabDynamic=function(id,options){
	this.options={
		eventType:"click",// event type on active [focus,mouseover]
		defaultIndex:0,//start num (1~[length])
		tabName:"tabBtn",
		bodyName:"tabBody",
		tabId:null,//["tabTest1","tabTest2"]
		bodyId:null,//["tabTestBody1","tabTestBody2"]
		focusBlur:true,
		pattern:/((tab)[0-9]{1,2})(_on)*/ig // tab1,tab1_on,tab2,tab2_on ,...
	}
	Object.extend(this.options,options);
	this.cid=id; // root container id
	this.tabBtn=[]; // tab button object list
	this.tabBody=[]; // tab body object list
	this.index=null; // current list index
	this.tabStyle="auto";
	if (this.options.tabId != null && this.options.bodyId != null && this.options.tabId.length > 0 && this.options.tabId.length==this.options.bodyId.length){
		this.tabStyle="userId";
	}
	if(UI.$(this.cid)){
		this.init();
		return this;
	} else {
		return false;
	}
}
UI.TabDynamic.prototype={
	init: function(){
		if (this.tabStyle=="userId"){
			var len=this.options.tabId.length;
			for (var i=0; i<len; i++) {
				var tabObj=UI.$(this.options.tabId[i]);
				var bodyObj=UI.$(this.options.bodyId[i]);
				// tab
				tabObj.index=this.tabBtn.length;
				this.tabBtn.push(tabObj);
				// add event
				UI.addEvent(tabObj,this.options.eventType,this.on.bind(this,tabObj.index));

				// body
				bodyObj.index=this.tabBody.length;
				this.tabBody.push(bodyObj);
			}
		} else { // auto
			var child=UI.$(this.cid).childNodes;
			var childCnt=child.length;
			// filtering
			for (var i=0; i<childCnt; i++){
				var className=child[i].className;
				if (child[i].nodeType==1 && className != undefined){
					if (className.indexOf(this.options.tabName) > -1){
						child[i].index=this.tabBtn.length;
						this.tabBtn.push(child[i]);
						// add event
						UI.addEvent(child[i],this.options.eventType,this.on.bind(this,child[i].index));
					} else if (className.indexOf(this.options.bodyName) > -1){
						child[i].index=this.tabBody.length;
						this.tabBody.push(child[i]);
					}
				}
			}
		}

		// auto active by 'this.options.num-1'='obj.index'
		this.on(this.options.defaultIndex);
	},
	on:function(index){
		var pattern=this.options.pattern;
		// set prev
		if (this.index==-1){
			return false;
		} else if (this.index != null){
			this.tabBtn[this.index].className=this.tabBtn[this.index].className.replace(pattern,"$1");
			this.tabBody[this.index].style.display="none";
		}
		// set current
		this.tabBtn[index].className=this.tabBtn[index].className.replace(pattern,"$1_on");
		this.tabBody[index].style.display="block";
		this.index=index;
		if (this.options.focusBlur==true){
			this.tabBtn[index].blur();
		}
	}
}

UI.SimpleSlide=function(listId,btnPrevId,btnNextId,options){
	this.options={
		listTagName:"LI",
		showNum:1,
		loop:false,
		onComplete:function(){},
		offComplete:function(){}
	}
	Object.extend(this.options,options);
	this.list=UI.$(listId).getElementsByTagName(this.options.listTagName);
	this.listCnt=this.list.length;
	this.btnPrev=UI.$(btnPrevId);
	this.btnNext=UI.$(btnNextId);
	this.index=null;
	this.prevIndex=null;
	if(this.list.length){
		UI.addEvent(this.btnPrev,"click",this.prev.bind(this));
		UI.addEvent(this.btnNext,"click",this.next.bind(this));
		this.index=0;
		this.on();
	}
}
UI.SimpleSlide.prototype={
	on:function(){
		this.chkBtnView();

		for (var i=0,num=0; i<this.options.showNum ; i++){
			num=this.index*this.options.showNum+i;

			if (this.options.loop==false && num >= this.listCnt){ // loop Á¦ÇÑÀÌ¸é ÃÖ´ë°ª °íÁ¤
				num=this.listCnt-1;
			}
			this.list[ num ].style.display="block";
		}
		this.options.onComplete(this);
	},
	off:function(){
		for (var i=0,num=0; i<this.options.showNum ; i++){
			num=this.index*this.options.showNum+i;
			if (this.options.loop==false && num > this.listCnt){ // loop Á¦ÇÑÀÌ¸é ÃÖ´ë°ª °íÁ¤
				num=this.listCnt;
			}
			if (num < this.listCnt){
				this.list[ num ].style.display="none";
			}
		}
		this.options.offComplete(this);
	},
	prev:function(){

		this.off();
		this.index--;//=this.options.showNum;
		if (this.index < 0){
			if (this.options.loop==true){
				this.index=this.listCnt-1;
			} else {
				this.index=0;
			}
		}
		this.on();
	},
	next:function(){
		this.off();
		this.index++;//=this.options.showNum;
		if (this.index >= Math.ceil(this.listCnt/this.options.showNum)-1){
			if (this.options.loop==true){this.index=0;} 
			else {this.index=Math.ceil(this.listCnt/this.options.showNum)-1;}
		}
		this.on();
	},
	chkBtnView:function(){
		if (this.options.loop==false){
			if (this.index==0){this.setBtnView(this.btnPrev,"off");} 
			else {this.setBtnView(this.btnPrev,"on");}
			if (this.index >= Math.ceil(this.listCnt/this.options.showNum)-1){this.setBtnView(this.btnNext,"off");} 
			else {this.setBtnView(this.btnNext,"on");}
		}
	},
	setBtnView:function(obj,view){
		switch(view){
			case "on":obj.style.backgroundPosition="left top";break;
			case "off":obj.style.backgroundPosition="left bottom";break;
		}
	}
}

// DynamicScript from "JES UI.DynamicScript"
/**
2007-12-10
*/
UI.DynamicScript=function(url,enc){
	this.url=url||'';
	this.enc=enc||'';
	this.head=document.getElementsByTagName("head").item(0);
	if(this.url) this.call(this.url);
};
UI.DynamicScript.prototype={
	noCacheParam:function(){
		var b=(this.url.indexOf('?')==-1) ? '?':'&';
		return b+'nOcAchE='+(new Date()).getTime();
	},
	call:function(url){
		try{this.head.removeChild(this.script)}catch(e){};
		this.url=url;
		this.script=document.createElement("script");
		this.script.setAttribute("type","text/javascript");
		this.script.setAttribute("src",this.url+this.noCacheParam());
		if(this.enc) this.script.setAttribute("charset",this.enc);
		this.head.appendChild(this.script);
	}
};


// Scrolling from "JES UI.Scrolling"
/* 2007-07-10 */
UI.yScrolling=function(cid,millisec1,millisec2,speed,height)
{
	this.cid= cid;
	this.millisec1=millisec1;	//start term
	this.millisec2=millisec2; //runtime term
	this.speed=speed;			//moving pixel
	this.height=height;

	this.h =0;
	this.div=UI.$(this.cid);
	this.htmltxt=this.div.innerHTML;
	this.div.innerHTML=this.htmltxt+this.htmltxt;
	this.div.isover=false;
	this.div.onmouseover=function(){ this.isover=true; }
	this.div.onmouseout=function(){	this.isover=false; }
	this.div.scrollTop=0;
	var self =this;
	window.setTimeout(function(){self.play()},this.millisec1);
}
UI.yScrolling.prototype={
	play:function(){
		var self =this;
		if(!this.div.isover)
		{
			this.div.scrollTop += this.speed;
			if(this.div.scrollTop >= this.div.scrollHeight/2)
			{
				this.div.scrollTop=0;
				//this.h=0;
			}
			else(this.height)
			{
				this.h += this.speed;
				if(this.h>=this.height)
				{
					if(this.h>this.height)
					{
						this.div.scrollTop -= this.h % this.height;
						//window.status=this.div.scrollTop +":"+this.h % this.height;
					}
					this.h=0;
					window.setTimeout(function(){self.play()},this.millisec1);
					return;
				}
			}
		}
		window.setTimeout(function(){self.play()},this.millisec2);
	}
};

// Scrolling from "JES UI.Move"
/* 2007-07-10 */
UI.Move=function(id) {
	this.id=id;
	this.div=UI.$(id);
	this.x= parseInt(UI.getStyle(this.div,'left'))||0;
	this.y= parseInt(UI.getStyle(this.div,'top'))||0;
};
UI.Move.prototype={
	slide:function(pos) {
		this.pos=pos;
		this.pos_n=0;
		this.speed=0.45;
		this.inteval=10;
		this.setPos();
		this.playing =true;
		var self=this;

		this.tid=setInterval(function(){self.play()},this.inteval);
	},
	play:function() {
		this.x += (this.x2-this.x)*this.speed;
		this.y += (this.y2-this.y)*this.speed;
		this.set(this.x,this.y);
		if(Math.round(this.x)==this.x2 && Math.round(this.y)==this.y2)
		{
			this.x=Math.round(this.x);
			this.y=Math.round(this.y);
			this.set(this.x,this.y);

			if(this.pos_n>=this.pos.length)	{this.playing=false; clearInterval(this.tid)}
			else this.setPos();
		}
	},
	setPos:function(){
		var arr=this.pos[this.pos_n].split(",");
		this.x2=arr[0];
		this.y2=arr[1];
		this.pos_n++;
	},
	set:function(x,y){
		this.div.style.left=x+"px";
		this.div.style.top=y+"px";
	}
};


// From JES
UI.length=function(str,len,tail){
	if(!str) str="";
	if(!tail) tail="";
	var l=0,c=0,l2=0,u="",s="";
	if(len>0) l2=len;
	for(var i=0;u=str.charCodeAt(i);i++)
	{
		if (u>127) l+=2;
		else l++;
		if(l2) {
			s+=str.charAt(i);
			if(l>=l2)
			{
				if(l>l2) s=s.slice(0,-1);
				return s+tail;
			}
		}
	}
	return l2 ? s:l;
};

var pos_n=0;
function topMoveSlide(type)
{
	if(slide_div.playing) return;
	if(type=="prev" && pos_n>0) {
		slide_div.slide(pos[--pos_n]);
	} else if(type=="next" && pos_n<pos.length-1) {
		slide_div.slide(pos[++pos_n]);
	}
}


UI.BtnList=function(id,childEl,options){
	this.id=id;
	this.childEl=childEl;
	this.options={
		num:0,
		pnum:null,// prev num
		count:0,
		loop:true
	};
	this.err=false;
	Object.extend(this.options,options);
	this.init();
}
UI.BtnList.prototype={
	init:function(){
		var base=UI.$(this.id);
		var childs=base.getElementsByTagName(this.childEl);
		this.options.count=childs.length;
		if (this.options.count <= 0){
			this.err=true;
		} else {
			this.show();
		}
		base=null;
		childs=null;
	},
	prev:function(){
		if (this.err==true) {
			return false;
		}
		this.options.num--;
		if (this.options.num<0){
			if (this.options.loop==true) {
				this.options.num=this.options.count-1;
			} else {
				this.options.num=0;
			}
		}
		this.show();
	},
	next:function(){
		if (this.err==true) {
			return false;
		}
		this.options.num++;
		if (this.options.num>=this.options.count){
			if (this.options.loop==true) {
				this.options.num=0;
			} else {
				this.options.num=this.options.count-1;
			}
		}
		this.show();
	},
	show:function(){
		var base=UI.$(this.id);
		var childs=base.getElementsByTagName(this.childEl);
		if (this.options.pnum != null){
			childs[this.options.pnum].style.display="none";
		}
		childs[this.options.num].style.display="block";
		this.options.pnum=this.options.num;
		base=null;
		childs=null;
	}
}

// ¼­Á¦½ºÆ®
function renderSuggest(){
	var layout='\
	<h3>Suggest</h3>\
	<div id="SugArea">\
	   <div id="SugMark"></div>\
	   <iframe id="SugFrame" frameborder="0"></iframe>\
	   <div id="SugResult">\
		  <ul id="SugList">\
			<li></li>\
		  </ul>\
		  <div id="SugInfoOn">ÇöÀç <b>¼­Á¦½ºÆ®</b>¸¦ »ç¿ëÇÏ°í ÀÖ½À´Ï´Ù.<br>°Ë»ö¾î ÀÔ·Â½Ã ÀÚµ¿À¸·Î ÀûÇÕÇÑ Á¾¸ñÀ» Á¦½ÃÇÕ´Ï´Ù.</div>\
		  <div id="SugInfoOff">\
		  <b>¼­Á¦½ºÆ®</b>¸¦ »ç¿ëÇØ º¸¼¼¿ä. <a href="javascript:;" id="BTon">±â´ÉÄÑ±â</a><br>°Ë»ö¾î ÀÔ·Â½Ã ÀÚµ¿À¸·Î ÀûÇÕÇÑ Á¾¸ñÀ» Á¦½ÃÇÕ´Ï´Ù.</div>\
		  <div id="SugLink">\
			 <a href="#">¼­Á¦½ºÆ®¶õ?</a> | \
			 <a id="BToff" href="javascript:;">±â´É²ô±â</a>\
			 <a id="BTclose" href="javascript:;">´Ý±â</a>\
		  </div>\
	   </div>\
	</div>\
	';

	document.write(layout);

}

UI.ListDisplay = function( options ){
	this.options = {
		listId : null,
		listEl : "LI",
		btnPrevId : null,
		btnNextId : null,
		amount : 4,
		defaultIndex : 0,
		loop : false
	}
	Object.extend( this.options, options );
	this.init();
}
UI.ListDisplay.prototype = {
	init : function(){
		this.index = this.options.defaultIndex;
		this.objList = UI.$(this.options.listId);
		this.objListEl = this.objList.getElementsByTagName( this.options.listEl );
		this.objCnt = this.objListEl.length;
		this.objPrev = UI.$(this.options.btnPrevId);
		this.objNext = UI.$(this.options.btnNextId);
		this.lastPage = Math.ceil( this.objCnt /this.options.amount )-1;
		if( this.objCnt == this.lastIndex ) this.lastIndex - this.options.amount;
		UI.addEvent( this.objPrev , "click", this.prev.bind(this) );
		UI.addEvent( this.objNext , "click", this.next.bind(this) );

		this.reset();
	},
	reset : function(){
		var start = (this.index*this.options.amount);
		var end = (this.index*this.options.amount) + this.options.amount;

		for ( var i=0; i<this.objCnt ; i++ ){
			
			//if( i>=this.index && i<this.index+this.options.amount ){this.objListEl[i].style.display = "block";
			if( i>=start && i<end ){this.objListEl[i].style.display = "block";
			} else {
				this.objListEl[i].style.display = "none";
			}
		}
		this.check();
	},
	check : function(){
	/*
		if( this.options.loop == false ){
			if( this.index == 0 ){
				this.objPrev.className = "btnOff";
			} else {
				this.objPrev.className = "btnOn";
			}

			if ( this.index == this.lastIndex ){
				this.objNext.className = "btnOff";
			} else {
				this.objNext.className = "btnOn";
			}
			
		} else {
			this.objPrev.className = "btnOn";
			this.objNext.className = "btnOn";
			
		}*/
	},
	prev : function(){
		this.index--;
		if( this.index < 0 ){
			if( this.options.loop ){
				this.index = this.lastPage;//(this.lastPage-1)*this.options.amount;
			} else {
				this.index = 0;
			}
		}
		this.reset();
	},
	next : function(){
		this.index++;//=this.options.amount;
		if( this.index >= this.lastPage ){
			if( this.options.loop ){
				this.index = 0;
			} else {
				this.index = this.lastPage;//(this.lastPage-1)*this.options.amount;
			}
		}
		this.reset();
	}
}


UI.SelectObject = new Array();
UI.SelectObj = function( obj, btnObj, options ){
	this.obj = obj;
	this.btnObj = btnObj;
	this.isOpen = false;
	this.isOver = false;
	this.openComplete = null;
	this.closeComplete = null;
	this.toogleComplete = null;
	if( this.obj ){
		UI.SelectObject.push( this );
	}
	this.options = {
		autoOff : true
	}
	Object.extend( this.options, options );
	if( this.options.autoOff == true ){
		UI.addEvent( this.obj, "mouseover", this.open.bindAsEventListener(this) );
		UI.addEvent( this.obj, "mouseout", this.close.bindAsEventListener(this) );
	}

	if( this.btnObj ){
		UI.addEvent( this.btnObj, "mousedown", this.toogle.bindAsEventListener(this) );
//		UI.addEvent( this.btnObj, "mouseout", this.close.bindAsEventListener(this) );
//		UI.addEvent( this.btnObj, "mouseover", this.open.bindAsEventListener(this) );
	}
}
UI.SelectObj.prototype = {
	open : function(){
		if( this.openInit ){ this.openInit(); }
		closeSelectAll();		
		this.isOpen = true;		
		this.obj.style.display = "block";
		if( this.openComplete ){ this.openComplete(); }
	},
	close : function(){
		if( this.closeInit ){ this.closeInit(); }
		this.isOpen = false;
		this.obj.style.display = "none";
		if( this.closeComplete ){ this.closeComplete(); }
	},
	toogle:function(e){
		if( this.toogleInit ){ this.toogleInit(e); }
		if(this.isOpen)	this.close();
		else this.open();
		if( this.toogleComplete ){ this.toogleComplete(e); }
		UI.stopEvent(e);
	}
}

function closeSelectAll(){
	var len=UI.SelectObject.length;
	for(var num =0; num<len; num++){
		try{ UI.SelectObject[num].close(); }catch (e){}
	}
}


UI.Select=function(id,skin){
	this.skin={
		topbox:'border:1px solid #cdcdcd;font-size:12px;font-family:AppleGothic,Dotum;color:#454545;background-color:#fff;cursor:pointer;text-align:left;line-height:20px;text-indent:5px;',
		subbox:'border:1px solid #cdcdcd;font-size:12px;font-family:AppleGothic,Dotum;color:#666;background-color:#fff;margin-top:-1px;text-align:left;',
		default_txt:'color:#666;background-color:#fff;padding-left:5px;cursor:pointer;',
		selected_txt:'color:#FFF;background-color:#697FE6;padding-left:5px;cursor:pointer;',
		arrow:'http://fn.daum-img.net/image/estate/2008/direct/budong_blit_01.gif',
		width:150,
		padding:3,
		sub_height:20,
		max_option:10,
		trg_obj:null,
		selectEvent:null,
		selfClick:false
	};
	Object.extend(this.skin,skin);

	if (this.skin.width != "auto"){
		this.skin.width=parseInt(this.skin.width)+"px";
		this.skin.topbox += ';width:'+this.skin.width;
	}
	this.input=UI.$(id);
	this.id=id;
	this.list=[];
	this.isOpen=false;
	this.isOver=false;
	this.sIndex=UI.$(id).selectedIndex;
	this.selectedIndex=UI.$(id).selectedIndex;
	this.value='';
	this.print();
};

UI.Select.prototype={
	close:function(){},
	open:function(){},
	toogle:function(e){
		if( this.selectObj.isOpen == true ){
			var obj = UI.$("UISelFocus_"+this.id);
			if( obj ){
				obj.style.display = "block";
				obj.focus();
				obj.style.display = "none";
			}
		}
		var thisClassName=this.objSub.getElementsByTagName('DIV')[this.sIndex].className.replace("default_txt","selected_txt");
		this.objSub.getElementsByTagName('DIV')[this.sIndex].className=thisClassName;
	},
	blur:function(){
		var topSelectClassName=UI.$('UISelectSel_'+this.id).className.replace("selected_txt","default_txt");
		UI.$('UISelectSel_'+this.id).className=topSelectClassName;
	},
	focus:function(){
		if(this.isopen) return;
		var topSelectClassName=UI.$('UISelectSel_'+this.id).className.replace("default_txt","selected_txt");
		UI.$('UISelectSel_'+this.id).className=topSelectClassName;
	},
	subOver:function(e){
		this.el=UI.getEl(e)
		UI.$('UISelectSub_'+this.id).getElementsByTagName('DIV')[this.sIndex].className='default_txt';
		this.el.className='selected_txt';
	},
	subOut:function(e){
		this.el=UI.getEl(e);
		this.el.className='default_txt';
	},
	subClick:function(e){
		this.el=UI.getEl(e);
		var sIndex=this.el.index;
		this.value=this.list[sIndex].value;
		UI.$('UISelectSel_'+this.id).innerHTML=this.list[sIndex].text;
		if( this.skin.selectEvent == null ){
			UI.$(this.id).value=this.list[sIndex].value;
		} else {
			try { this.skin.selectEvent( this.list[sIndex].value ); } catch (e) {}
		}
		//this.close();
		UI.$('UISelectSub_'+this.id).style.display = "none";

		UI.stopEvent(e);
		if( this.skin.selfClick == true || sIndex!=this.sIndex ){
			this.sIndex=sIndex;
			if(this.input.onchange) { this.input.onchange.call(this);}
		}
		this.sIndex=sIndex;
	},
	subChecked:function(el){
		var obj=UI.$('UISelectSubInner_'+this.id).childNodes;
		var cnt=obj.length;
		var listAry=new Array();
		for (var i=0; i<cnt ; i++){
			if (obj[i].className.indexOf("check_true") > -1){
				listAry.push(obj[i].lastChild.nodeValue);
			}
		}
		if (el != null && listAry.length==0){
			el.className=el.className.replace("check_false","check_true");
			return false;
		}
		var value=listAry.join(",");
		var widthLen= value.length - Math.round(value.replace(/[°¡-ÆR]/gi,"").length/2) +1.5;
		if (widthLen < 13) widthLen=13;

		UI.$('UISelectSel_'+this.id).innerHTML=value;
		UI.$('UISelectTop_'+this.id).style.width=UI.$('UISelectSubInner_'+this.id).style.width=widthLen+"em";
	},
	subUnChecked:function(){
		var obj=UI.$('UISelectSub_'+this.id).childNodes;
		for (var n=obj.length-1; n>=0 ; n--){
			if (obj[n].className.indexOf("check_true") > -1){
				obj[n].className=obj[n].className.replace("check_true","check_false");
			}
		}
	},
	print:function(){
		var id=this.id;
		var opt=this.input.options;
		var sb=new UI.StringBuffer();
		var bt=UI.getBrowser();
		var autoWidth=0;
		var isCheckboxItem=false;
		for(var i=0,cnt=opt.length; i<cnt; i++)
		{
			// ±âº»°ª
			// Ã¼Å©¹Ú½º
			var checkAttr=opt[i].getAttribute("checked");
			var checkDiv="";
			var className='default_txt';
			if (checkAttr != undefined){
				if (checkAttr=="true"){
					className += ' check_true';
				} else{
					className += ' check_false';
				}
				checkDiv='<span class="checkbox"></span>';
				isCheckboxItem=true;
			}
			this.list[i]={text:opt[i].text,value:opt[i].value,check:checkAttr};
			if (autoWidth < opt[i].text.length){
				autoWidth=checkDiv+opt[i].text.length ;
			}
			var selectedFocusObj = "";
			if( opt.sIndex == i ){
				selectedFocusObj = '<input type="input" id="UISelFocus_'+id+'" style="display:none">';
			}
			
			sb.append('<div class="'+className+'" style="line-height:'+this.skin.sub_height+'px;height:'+this.skin.sub_height+'px">'+checkDiv+opt[i].text+selectedFocusObj+'</div>');
		}
		

//				<div style="position:absolute;right:0;top:0">'+this.skin.arrow+'</div>\
		this.value=this.list[0].value;
		var tempStyle='<style type="text/css">div.default_txt{'+this.skin.default_txt+'} div.selected_txt{'+this.skin.selected_txt+'} div.check_on{color:#FF0000;} div.check_off{color:#00FF00;} #UISelFocus_'+id+'{width:1px;height:1px;border:0px; } </style>';
		var s='\
			<div id="UISelectTop_'+id+'" style="position:relative;text-align:left;'+this.skin.topbox+'">\
				<div id="UISelectSel_'+id+'">'+this.list[this.sIndex].text+'</div>\
			</div>\
			<div id="UISelectSub_'+id+'" style="display:none;position:absolute;"><span id="UISelectSubInner_'+id+'" style="display:block;width:'+this.skin.width+';'+this.skin.subbox+'">'+sb.toString()+'</span></div>';

		if ( this.skin.trg_obj == "appendChild" ){
			var parent = UI.$(this.id).parentNode;
			var inner = $C("DIV");
			parent.appendChild( inner  );
			this.input.style.display='none';
			inner.innerHTML = tempStyle + s;
		} else if (this.skin.trg_obj != null)	{
			this.skin.trg_obj.innerHTML=tempStyle
			this.input.style.display='none';
			this.skin.trg_obj.innerHTML += s;
		} else {
			document.write(tempStyle);
			this.input.style.display='none';
			document.write(s);
		}



		if(cnt>this.skin.max_option) {
			var sub=UI.$('UISelectSubInner_'+this.id);
			sub.style.height=this.skin.max_option * this.skin.sub_height + "px";
			sub.style.overflowY="auto";
			sub.style.overflowX="hidden";
		}

		var self=this;
		this.objTop = UI.$('UISelectTop_'+id);
		this.objSub = UI.$('UISelectSub_'+id);
		this.selectObj = new UI.SelectObj( this.objSub, this.objTop );
		this.selectObj.openComplete = this.open.bindAsEventListener(this);
		this.selectObj.toogleComplete = this.toogle.bindAsEventListener(this);
		if( bt.ie == true ){
			this.objSub.style.marginTop = "-1px";
		}

		var sub=this.objSub.getElementsByTagName('div');
		for(var i=0; i<sub.length; i++)
		{
			sub[i].index=i;
			UI.addEvent(sub[i],"mouseover",function(e) { self.subOver(e) });
			UI.addEvent(sub[i],"mouseout", function(e) { self.subOut(e) });
			UI.addEvent(sub[i],"mousedown",function(e) { self.subClick(e) });
		}

		this.objSub.style.display="block";
		this.autoSize=this.objSub.offsetWidth;
		if (this.skin.width=="auto"){
			this.objSub.style.width = "200px";
		}

		if( this.skin.arrow != "" ){
			this.objTop.style.backgroundColor = "#FFF";
			this.objTop.style.backgroundImage = "url("+this.skin.arrow + ")";
			this.objTop.style.backgroundRepeat = "no-repeat";
			this.objTop.style.backgroundPosition = "right top" ;
		}	
		this.objSub.style.display="none";

		if (isCheckboxItem==true){
			this.subChecked();
		}
		UI.SelectObject.push( this );
		
	}
};


/* ActiveX */

// Daum Flash
function daumActiveX(obj,div){
	// generate html code
	// for ie obejct
	var html='<object ';
	if (!obj.id && !obj.name){
		var r=Math.round(Math.random()*100);
		//html += 'id="daumActiveXObject'+r+'" name="daumActiveXObject'+r+'" ';
		html += 'id="daumActiveXObject'+r+'"" ';
	} else {
		if (obj.id) html += 'id="'+obj.id+'" ';
		else html += 'id="'+obj.name+'" ';
		/*if (obj.name) html += 'name="'+obj.name+'" ';
		else html += 'name="'+obj.id+'" ';
		*/
	}
	if (obj.type) html += 'type="'+obj.type+'" ';
	if (obj.classid) html += 'classid="'+obj.classid+'" ';
	if (obj.width) html += 'width="'+obj.width+'" ';
	if (obj.height) html += 'height="'+obj.height+'" ';
	if (obj.codebase) html += 'codebase="'+obj.codebase+'" ';
	// append events
	for (var i in obj.events){
		if (obj.events[i]){
			html += obj.events[i][0]+'="'+obj.events[i][1]+'" ';
		}
	}
	// end of object tag
	html += '>\n';
	// append params
	for (var i in obj.param){
		html += '<param name="'+obj.param[i][0]+'" value="'+obj.param[i][1]+'"/>\n';
	}

	// for ns embed
	html += '<embed ';
	if (!obj.id && !obj.name){
		var r=Math.round(Math.random()*100);
		//html += 'id="daumActiveXObject'+r+'" name="daumActiveXObject'+r+'" ';
		html += 'name="daumActiveXObject'+r+'" ';
	} else {
		//if (obj.id) html += 'id="'+obj.id+'" ';
		if (obj.name) html += 'name="'+obj.name+'" ';
	}
	if (obj.type) html += 'type="'+obj.type+'" ';
	if (obj.width) html += 'width="'+obj.width+'" ';
	if (obj.height) html += 'height="'+obj.height+'" ';
	// append params
	for (var i in obj.param){
		if (obj.param[i]){
			if (obj.param[i][0]=='movie' || obj.param[i][0]=='src'){
				var _src=obj.param[i][1];
			}
			html += obj.param[i][0]+'="'+obj.param[i][1]+'" ';
		}
	}
	html += '></embed>\n';
	html += '</object>';

	var isIE=(document.all)?true:false;
	if (isIE){
		document.getElementById(div).innerHTML=html;
	} else if (obj.type=='application/x-shockwave-flash' || obj.classid.toLowerCase()=='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'){
		// ie activex flash
		document.getElementById(div).innerHTML=html;
	} else if (navigator.platform.indexOf('Win')>=0 && obj.classid.toLowerCase()=='clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95'){
		// Windows Media Player - windows platform
		document.getElementById(div).innerHTML=html;
	}
}


//
function daumFlash(src,width,height,div){
	var obj=new Object();
	obj.type='application/x-shockwave-flash';
	obj.classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
	obj.codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,64,0';
	obj.wmode='transparent'; // transparent
	obj.width=width;
	obj.height=height;

	var param=[
		['movie',src],
		['src',src],
		['quality','high'],
		['wmode','transparent'],
		['bgcolor','#FFFFFF'],
		['allowScriptAccess','always'],
		['pluginspage','http://www.macromedia.com/go/getflashplayer'],
	];
	obj.param=param;
	/* event handle
	var events=[['onmouseover','test1()'],['onmouseout','test2()'],];
	obj.events=events;
	*/
	daumActiveX(obj,div);
}

function DaumFlash(src,fv,width,height,div,id ){
	var obj=new Object();
	obj.type='application/x-shockwave-flash';
	obj.classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
	obj.codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,64,0';
	obj.width=width;
	obj.height=height;
	if (id != undefined){
		obj.id=id;
		obj.name=id;
	}
	var param=[
		['movie',src],
		['src',src],
		['quality','high'],
		['wmode','transparent'],//transparent
		['allowScriptAccess','always'],
		['bgcolor','#FFFFFF'],
		['showLiveConnect','true'],
		['FlashVars',fv]
	];
	obj.param=param;
	daumActiveX(obj,div);
}

function DaumFlashWindow(src,fv,width,height,div,id ){
	var obj=new Object();
	obj.type='application/x-shockwave-flash';
	obj.classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
	obj.codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,64,0';
	obj.width=width;
	obj.height=height;
	if (id != undefined){
		obj.id=id;
		obj.name=id;
	}
	var param=[
		['movie',src],
		['src',src],
		['quality','high'],
		['wmode','window'],//transparent
		['allowScriptAccess','always'],
		['bgcolor','#FFFFFF'],
		['showLiveConnect','true'],
		['FlashVars',fv]
	];
	obj.param=param;
	daumActiveX(obj,div);
}

/* GNB common */
function chDivSize(id,width,height){
	if (width != undefined){
		UI.$(id).style.width=width+"px";
	}
	if (height != undefined){
		UI.$(id).style.height=height+"px";
	}
}
/* (suggest) */
function estateSuggestInit(){
	var suggestOption={
		cookie:{
			name:"estateSuggest",
			domain:["estate.daum.net"]
		},
		ui:{
			itemtext:"¸Å¹°",
			padding:4
		},
		ajax:new FN.Ajax({url:"/estate_nsuggest"}),
		input:document.getElementById('query1'),
		frame:document.getElementById('SugFrame'),
		box:document.getElementById('SugResult'),
		arrow:document.getElementById('SugMark'),
		list:document.getElementById('SugList'),
		infoOn:document.getElementById('SugInfoOn'),
		infoOff:document.getElementById('SugInfoOff'),
		footer:document.getElementById('SugLink'),
		onBT:document.getElementById('BTon'),
		offBT:document.getElementById('BToff'),
		closeBT:document.getElementById('BTclose')
	}
	var AutoStock=new Suggest(suggestOption,GoSearch,FormatSuggestList);
}
function GoSearch(){
	document.getElementById('query1').value=document.getElementById('query1').code;
	searchsubmit();
}
function FormatSuggestList(li,keyVal,itemVal) {
	itemVal.match(/(.*)\|(.*)/);
	li.dataName=RegExp.$1;
	li.dataCode=RegExp.$2;
	return highlightCheck(keyVal,li.dataName);
}
function highlightCheck(inputText,suggestText) {
	var rtStr="";
	var _str=suggestText.replace(/ /g,"");
	var _userKeyword=inputText.replace(/ /g,"");
	_userKeyword=_userKeyword.toLowerCase();
	if(_userKeyword==_str.substring(0,_userKeyword.length)){
		rtStr="<b>";
		for (var i=0,j=0; j<inputText.length; i++) {
			if (suggestText.substring(i,i+1)!=" ") j++;
			rtStr += suggestText.substring(i,i+1);
		}
		rtStr += "</b>" + suggestText.substring(i,suggestText.length);
	}else{
		rtStr += suggestText;
	}
	return rtStr;
}
/* ±¤°í°ü·Ã */
function hideAD(){
	var adElem=top.ad;
	adElem.style.display="none";
}

/* °Ë»ö °ü·Ã */
var defaultWord="µ¿¸í and ´ÜÁö¸í";
defaultWord = "Á¾ºÎ¼¼ ¿ÏÈ­ ÇýÅÃ´ÜÁö´Â?";
defaultWordQuery = "¼­¿ï ¾ÆÆÄÆ® ¸Å¸Å 6¾ïÀÌ»ó 9¾ïÀÌÇÏ";
//defaultWordUrl = "http://realestate.daum.net/search/total/?query=%EC%95%84%ED%8C%8C%ED%8A%B8%EC%A0%84%EC%84%B8&tab=total";
//
function search4EstateInit( query4EUCKR ){
	try {
		var obj = document.getElementById('query1');
		obj.setAttribute("autocomplete","off");
		if( obj.value == "" ){
			obj.value = defaultWord;
			obj.className += " noQ";
		} else {
		}
		/*
		var qVal = "";
		if( qVal != "" ){
			obj.value = qVal;
		} else {
			obj.className += " noQ";
		}
		*/
		UI.addEvent( obj, "keydown", inputSearchQuery.bindAsEventListener(this) );
		UI.addEvent( document, "mousedown", setSelBox.bindAsEventListener(this) );
		UI.addEvent( document, "keydown", setFocusQBox.bindAsEventListener(this) );
	} catch (exception) {}

	// click log
	if( query4EUCKR == null || query4EUCKR == "undefined" ){
		query4EUCKR = "";
	}
	init("ES", query4EUCKR, "-1", "@@@");

	//setSearchType(1);
}

function getNavigatorType(){
	if(navigator.appName == "Microsoft Internet Explorer") return 1;
	else if(navigator.appName == "Netscape") return 2;
	else return 0;
}
function setFocusQBox(event){
	var textbox;
	var _event;
	try
	{
		textbox = document.search.query;
	}
	catch (e)
	{
		return false;
	}
	switch(getNavigatorType()){
		case 1 : // IE
			_event = window.event;
			node = _event.srcElement;
			nodeName = _event.srcElement.nodeName;
			break;
		case 2 : // Netscape
			_event = event;
			node = _event.target;
			nodeName = _event.target.nodeName;
			break;
			default :
			nodeName = "None";
		break;
	}
	key = _event.keyCode;

	if(!(nodeName=="INPUT"||nodeName=="SELECT"||nodeName=="TEXTAREA"||(_event.ctrlKey&&key!=86))){
		if(key==8||(key>32&&key<41)||(key!=21&&key<32)||_event.altKey||key==91||key==92){
		}else if(key==32){
			if(_event.shiftKey){
				textbox.focus();
				textbox.style.imeMode ="active";
				textbox.select();
				_event.returnValue=false;
			}
		}else if(key == 21){
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="active";
			textbox.select();
			_event.returnValue=false;
		}else if(node!=textbox){
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="inactive";
			textbox.select();
		}
	}
/*
	try{
		document.getElementById("hFrame").contentWindow.eventHandler(event);
	}catch(e){}
*/
}
//document.onkeydown = setFocusQBox;


// 
function convEUCKR2UTF8( value ) { 
    var utfStr = ''; 
    for(var i=0; i < value.length; i++) { 
        if (value.charCodeAt(i) > 128) { 
            utfStr += '&#'+value.charCodeAt(i)+';'; 
        } else { 
            utfStr += value.substr(i,1); 
        } 
    } 
    return utfStr;
} 

function setSearchType(type){
	document.getElementById('searchType').value=type;
	document.getElementById('s_type'+type).className="radio_on";
	if (type==1){
		document.getElementById('s_type2').className="radio";
	} else {
		document.getElementById('s_type1').className="radio";
	}
}
function getSearchCheck(form){
	return true;
}
function doSearchQ(type,word) {
	var inform=document.search;
	var temp = document.location.href;
	_debug( inform );
	inform.action="http://realestate.daum.net/search/"+inform.tab.value+"/";//http://search.estate.daum.net/searchEstateMainAction.do"; // http://realestate.daum.net
	inform.method="get";
	

	var inputBox=document.getElementById('query1');
	inputBox.value = UI.trim( inputBox.value );
	var inputWord=inputBox.value; //encodeURI,encodeURIComponent,escape
	if(inputWord=="" ) {
		alert("°Ë»ö¾î¸¦ ÀÔ·ÂÇÏ¼¼¿ä.");
		clickSearch();
		inputBox.focus();
		return false;
	} else if( inputWord == defaultWord ){
		inputBox.className = inputBox.className.replace("noQ","");
		inputBox.value = defaultWordQuery;
	}
	inputWord = encodeURIComponent( inputWord );
	return true;

}
function clickSearch() {
	var qInput=document.getElementById('query1');
	if( qInput.value == defaultWord ) {
		qInput.className = qInput.className.replace("noQ","");
		qInput.value="";
	}
}
function searchsubmit() {
	//gLink(null,'SEE','1','1'); 2008-02-13 ¿äÃ»À¸·Î »èÁ¦(ÁÖ¼®Ã³¸®) by ÃÖÁø¿ì
//	try{ console.log(2); }catch(e){}
	if(doSearchQ()) document.search.submit();
}
function inputSearchQuery(event){
	var e = UI.getE( event );
	if( e.keyCode == 13 ){
		searchsubmit();
	}
}

/* click log */
var sec; var kw; var ks; var sss; var uco=0; var uda2;
var URL="http://log.search.daum.net/cgi-bin/";
var etlImg=new Image();

function openWin(u1,u2)
{
 var url=u1+"&uco="+(++uco)+u2;
 etlImg.src=url;
 uda2=null;
 try
 {
	console.log( url ) 
 }
 catch (e)
 {
 }
 return true;
}
function init(s,keyw,keys,ss)
{
 sec=s;
 var index=keyw.indexOf("%2F");
 if(index>0){kw=unescape(keyw); 
 }else{kw=keyw;}
 ks=keys;
 sss=ss;
}
function cU1(a,scope,r,p,ext)
{
 return URL+"s="+sec+"&a="+a+scope+"&q="+kw+"&k="+ks+"&r="+r+"&p="+p+"&ext="+ext;
}
function cU2(o,u1,u2,u3)
{
 var u="NONE";
 if(o!=null) u=o.href;
 if(uda2!=null) u2 = uda2; 
 return "&usr1="+u1+"&usr2="+u2+"&usr3="+u3+"&t=D&u="+u;
}
function cU3(u,u1,u2,u3)
{
 return "&usr1="+u1+"&usr2="+u2+"&usr3="+u3+"&t=D&u="+u;
}
function gLink(o,a,r,p)
{
 try{console.log( "link : " + o + ", " + a + ", "+ r + ", " + p );}catch (e){}
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,"","","");
 return openWin(u1,u2);
}
function gExtraLink(o,a,ext)
{
 try{console.log( "extra : " + o + ", " + a + ", "+ ext );}catch (e){}
 var scope="&ss="+sss+"&as=";
 if(o != null) u = o.href;
 var u1=cU1(a,scope,"","",ext); var u2=cU2(o,"","","");
 return openWin(u1,u2);
}

function gCRLink(u,a,r,p)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU3(u,"","","");
 return openWin(u1,u2);
}
function gCRExtraLink(u,a,ext)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,"","",ext); var u2=cU3(u,"","","");
 return openWin(u1,u2);
}
function gUSR1Link(o,a,r,p,usr1)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,"","");
 return openWin(u1,u2);
}
function gUSR2Link(o,a,r,p,usr2)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,"",usr2,"");
 return openWin(u1,u2);
}
function gUSR12Link(o,a,r,p,usr1,usr2)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,usr2,"");
 return openWin(u1,u2);
}
function gUSR123Link(o,a,r,p,usr1,usr2,usr3)
{
 var scope="&ss="+sss+"&as=";
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,usr2,usr3);
 return openWin(u1,u2);
}
function gAsLink(o,a,r,p,as)
{
 var scope="&ss="+sss+"&as="+as;
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,"","","");
 return openWin(u1,u2);
}
function gAsUSR1Link(o,a,r,p,as,usr1)
{
 var scope="&ss="+sss+"&as="+as;
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,"","");
 return openWin(u1,u2);
}
function gAsUSR12Link(o,a,r,p,as,usr1,usr2)
{
 var scope="&ss="+sss+"&as="+as;
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,usr2,"");
 return openWin(u1,u2);
}
function gAsUSR123Link(o,a,r,p,as,usr1,usr2,usr3)
{
 var scope="&ss="+sss+"&as="+as;
 var u1=cU1(a,scope,r,p,""); var u2=cU2(o,usr1,usr2,usr3);
 return openWin(u1,u2);
}
function gReplaceAll(str,o,n) {var pstr=""; for(var i=0;i<str.length;i++){ pstr+=str.charAt(i).replace(o,n); }return pstr;}
function gSetUSR2(v) {v=gReplaceAll(v, "%", "%25");v=gReplaceAll(v, "#", "%23");v=gReplaceAll(v, "&", "%26");v=gReplaceAll(v, "?", "%3F");uda2=v;}
function gSetKW(v) {kw=v;}
/* click log */


/** 
	ÀÚµ¿ Å°¹ÝÀÀ °Ë»ö
*/
function getNavigatorType(){
	if(navigator.appName == "Microsoft Internet Explorer")
		return 1;  
	else if(navigator.appName == "Netscape")
		return 2;	
	else 
		return 0;
}
function setSelBox(event){
	var _event;
	switch (getNavigatorType()) {
		case 1 : // IE
			_event = window.event;
			node = _event.srcElement;
			nodeName = _event.srcElement.className;
			break;
		case 2 : // Netscape
			_event = event;
			node = _event.target;
			nodeName = _event.target.className;
			break;
		default :
			nodeName = "None"; 
			break;
	}	

	//try{
	//	document.getElementById("hFrame").contentWindow.eventHandlerBody(event);
	//}catch(e){}
}
function setFocusQBox(event){
	var textbox;
	var _event;
	textbox = document.search.query;
	switch(getNavigatorType()){
		case 1 : // IE
			_event = window.event;
			node = _event.srcElement;
			nodeName = _event.srcElement.nodeName;
			break;
		case 2 : // Netscape
			_event = event;
			node = _event.target;
			nodeName = _event.target.nodeName;
			break;
		default :
			nodeName = "None"; 
			break;
	}
	key = _event.keyCode;
	if(!(nodeName=="INPUT"||nodeName=="SELECT"||nodeName=="TEXTAREA"||(_event.ctrlKey&&key!=86))){
		if(key==8||(key>32&&key<41)||(key!=21&&key<32)||_event.altKey||key==91||key==92){
		}else if(key==32){ 
			if(_event.shiftKey){
				textbox.focus();
				textbox.style.imeMode ="active";
				textbox.select();
				_event.returnValue=false;
			}
		}else if(key == 21){
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="active";
			textbox.select();
			_event.returnValue=false;
		}else if(node!=textbox){
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="inactive";
			textbox.select();
		}
	}

	//try{
	//	document.getElementById("hFrame").contentWindow.eventHandler(event);
	//}catch(e){}
}


/* sub gnb mouse event */
function SubOver(m) {m.className=m.className + " on";}
function SubOut(m) {m.className=m.className.replace(" on","");}


function popup(url,name,option){
/*
¨ç.width:Ã¢ °¡·Î±æÀÌ ÁöÁ¤ [no,yes(»ý±è)]
¨è.height:Ã¢ ¼¼·Î±æÀÌ ÁöÁ¤ [no,yes(»ý±è)]
¨é.toolbar:´ÜÃàµµ±¸Ã¢ À¯¹«ÁöÁ¤ [no,yes(»ý±è)]
¨ê.menubar:¸Þ´ºÃ¢ À¯¹«ÁöÁ¤ [no,yes(»ý±è)]
¨ë.location!!:ÁÖ¼ÒÃ¢ À¯¹«ÁöÁ¤ [no,yes(»ý±è)]
¨í.scorllbars:½ºÅ©·Ñ¹Ù ÁöÁ¤ [no,yes(»ý±è)]
¨î.status:¾Æ·¡ »óÅÂ¹ÙÃ¢ À¯¹«ÁöÁ¤ [no,yes(»ý±è)]
¨ï.resizable:Ã¢º¯Çü À¯¹«ÁöÁ¤ [no,yes(»ý±è)]
¨ð.fullscreen:ÀüÃ¼È­¸é À¯¹«ÁöÁ¤ [no,yes(»ý±è]
¨ñ.channelmode=yes:¾Õ&µÚ·Î,Ã¢ÃÖ¼ÒÈ­.´Ý±âµîÀ» ¼³Á¤(F11¹ø Å°¶û °°À½)
¨ò.left=0,top=0:Ã¢À» °íÁ¤½ÃÅ²´Ù.¿ÞÂÊ ±¸¼®¿¡ °íÁ¤
*/
	var opt=new Array();
	for(var property in option){
		opt.push(property+"="+option[property]);
	}
	var popWin=window.open(url,name,opt.join(","));
	return popWin;
}
// ´ÜÁöÁöÁ¤¾÷¼Ò ¾È³»
function popupCompInfo (){
	var popCompInfo = popup('http://realestate.daum.net/popup/agentProgramIntro.daum?nil_profile=estatetop&nil_menu=danji','danjiinfopop',{width:800,height:580,scrollbars:'no'});
	popCompInfo.focus();
}
function popupCalcSize(){
	var popCalc = popup('http://realestate.daum.net/html/calculateSize.html','calculateSizePop',{width:420,height:290,scrollbars:'no'});
	popCalc.focus();
}

var Estate={};

// Á¦ÈÞ»çº° ¸Å¹°°ü ·£´ýÃâ·Â
Estate.CpList=function(){
	this.cpList=new Array();
	this.cpList.push({nil:0,name:"ºÎµ¿»ê114",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_06.gif",className:"cpImg bp_y150",href:"http://r114.realestate.daum.net/std/outsite/daum/default.asp?only=300&m_=0&g_=&nil_profile=estatetop&nil_menu=r114"});
	this.cpList.push({nil:1,name:"´ÚÅÍ¾ÆÆÄÆ®",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_05.gif",className:"cpImg bp_y0",href:"http://drapt.realestate.daum.net/"});
	this.cpList.push({nil:2,name:"ºÎµ¿»ê½áºê",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_03.gif",className:"cpImg bp_y200",href:"http://serve.realestate.daum.net/default.asp"});
	this.cpList.push({nil:3,name:"½ºÇÇµå¹ðÅ©",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_02.gif",className:"cpImg bp_y250",href:"http://speedbank.realestate.daum.net/"});
	this.cpList.push({nil:4,name:"ºÎµ¿»ê¹ðÅ©",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_04.gif",className:"cpImg bp_y100",href:"http://neonet.realestate.daum.net/main.neo"});
	this.cpList.push({nil:5,name:"Á¶ÀÎ½º·£µå",imgSrc:"http://fn.daum-img.net/image/estate/2008/direct/budong_mark_01.gif",className:"cpImg bp_y50",href:"http://joinsland.realestate.daum.net/"});

	this.write();
}
Estate.CpList.prototype={
	write:function(){
		var url = location.href;
		var cname = "";
		if( url.indexOf( "MaemulTop.daum" ) > -1 ){cname = "PCES";}
		else {cname="Z5ES";}

		var liClass=["fl_le","fl_ri","fl_le","fl_ri","fl_le","fl_ri"];
		//var nil=["","","","","",""];
		var nil=["&nil_profile=estatetop&nil_menu=r114","?nil_profile=estatetop&nil_menu=drapt","?nil_profile=estatetop&nil_menu=serve","?nil_profile=estatetop&nil_menu=speedbank","?nil_profile=estatetop&nil_menu=neonet","?nil_profile=estatetop&nil_menu=joinsland"];
		var randNum=this.getRandNum(0,5);
		for(var num in this.cpList){
			var thisNum=randNum[num];
			var nilTag=nil[ this.cpList[thisNum].nil ];
			var row="<li class='"+liClass[num]+"'><img src='"+this.cpList[thisNum].imgSrc+"' alt='"+this.cpList[thisNum].name+"'><a target='_blank' href='"+this.cpList[thisNum].href+nilTag+"' onclick='gLink(null, \""+cname+"\", \""+(this.cpList[thisNum].nil+1)+"\", \"1\");'>"+this.cpList[thisNum].name+"</a></li>";//
			document.write(row);
		}
	},
	getRandNum:function(min,max){
		var randList=new Array(0,1,2,3,4,5);
		randList.sort(function(){return Math.random()*2-1;});
		return randList;
	}
}


var FN={_browser:null};
FN.$=function(s) { return document.getElementById(s) };
FN.Ajax=function(options) {
	this.options={
		method:'GET',
		param:'',
		onComplete:null,
		onError:null,
		asynchronous: true,
		contentType: 'application/x-www-form-urlencoded',
		encoding:'UTF-8'
	}
	Object.extend(this.options,options);
};

FN.Ajax.prototype={
	getReq:function(){
		var req=null;
		try { req=new XMLHttpRequest(); }
		catch(e)
		{
			try { req=new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e)
			{
				try { req=new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(e) { }
			}
		}
		return req;
	},
	send:function(){
		this.req=this.getReq();
		var op=this.options;
		var url=op.url;
		var param=op.param;
		var method=op.method.toUpperCase();
		if(method=='GET' && param) url=url+"?"+param;
		this.req.open(method,url,op.asynchronous);
		this.req.setRequestHeader('Content-Type',op.contentType+';charset='+op.encoding);

		var self=this;
		this.req.onreadystatechange=function() { self.onStateChange.call(self) }
		this.req.send(method=='POST'?param:null);
	},
	onStateChange: function() {
		if(this.req.readyState==4)
		{
			if(this.req.status=="200") this.options.onComplete(this.req);
			else
			{
				if(this.options.onError) this.options.onError(this.req);
			}
		}
	}
};


/**
*	Click Logger
*	@param	ServiceCategory
*	@param	Data
*	... (È®Àå°¡´É)
*
*	»ç¿ë¹ý
*	  ex) clickLogger([sc],[c1],[c2],[c3],...);
*	Áõ±Ç,Á¾¸ñÄÚµå 035720
*	  ex) clickLogger("1","035720");
*/
function clickLogger(){
	var tag='';
	try
	{
		var ref=document.referrer;
		var loc=document.location;

		var cntArg=arguments.length;
		var sc=arguments[0];
		/*
		sc :
		ºÎµ¿»ê´ÜÁö 2
		ºÎµ¿»êÁö¿ª 5

		c :
		ºÎµ¿»êÁö¿ª(Áö¿ªÆäÀÌÁö)
			c1=¸Å¹°Å¸ÀÔÄÚµå(A1, A2 ...)
			c2=Áö¿ªÄÚµå

		ºÎµ¿»ê´ÜÁö(´ÜÁöÆäÀÌÁö)
			c1=¸Å¹°Å¸ÀÔÄÚµå(A1, A2 ...)
			c2=¸éÀû±×·ìÄÚµå(*, S, M, L)
			c3=´ÜÁöÄÚµå(´ÜÁö ¾ÆÀÌµð)
		*/
		//var rootUrl="http://log.finance.daum.net"; ÀÌÀü¹öÀü
		var rootUrl = "http://log.finance.daum.net";
		tag="<img name='clickLog' id='clockLog' style='display:none' src=" + "'" +  rootUrl + "/click?";
		tag += "sc=" + sc + "&";
		for (var n=1; n<cntArg ; n++) {
			tag += "c"+n+"=" + arguments[n] + "&";
		}
		tag += "ref=" + encodeURIComponent(ref) + "&loc=" + encodeURIComponent(loc) + "'" ;
		tag += "width='0' height='0'>";
	}
	catch (e) {}
	document.write( tag );
}

// ÆäÀÌÁö ³×ºñ ¸¶¿ì½º ÀÌº¥Æ®
function mOverPaging(obj){ obj.style.color="#FFF"; obj.style.backgroundColor="#4C77EB"; }
function mOutPaging(obj){  obj.style.color="#333"; obj.style.backgroundColor=""; }

// Å¸ÀÌÆ²¿µ¿ª ÇÁ·Î¸ð¼Ç
function getTitlePromotion(){
	return '<div id="TitlePromotion"><a href="http://blog.daum.net/daumfinance/7163041" target="_blank"><img src="http://fn.daum-img.net/image/estate/2008/direct/banner_0919.gif" alt="ÀÌ»ç°¥ Áý, ½±°í ºü¸£°Ô Ã£´Â ¹æ¹ý"></a></div>';
}
// GNB¿µ¿ª HOT¸µÅ©
function getGNBHotLink(){
	return '<a href="http://realestate.daum.net/maemul/subway/1100000/*/*/A1/A1A3A4/L/*/summary" target="_blank" title="Àü¼ÂÁý, ¿ª¼¼±Ç¿¡¼­ Ã£±â">Àü¼ÂÁý, ¿ª¼¼±Ç¿¡¼­ Ã£±â</a>';
}

var naviItem=function(id,options){
	this.li=UI.$(id).getElementsByTagName("LI");
	this.selObj=null;
	this.selValue=null;
	this.selUlId=id;
	this.options={
		defaultIndex:null
	}
	Object.extend(this.options,options);
	this.init();
}
naviItem.prototype={
	init:function(){
		for(var n in this.li){
			var obj=this.li[n];
			obj.index=n;

			if(this.options.defaultIndex != null && this.options.defaultIndex==n){
//				this.selValue=obj.getAttribute("value");
				this.selObj=obj;
				this.selObj.className="on";
			} else {
				obj.className="off";
			}
		}
	},
	select:function(obj, value){
		if(this.selObj != null && this.selObj != obj){
			this.selObj.className="off";
		}
		this.selValue=value;
		this.selObj=obj;
		this.selObj.className="on";
		this.index=obj.index;
		areanaviHandel.selectOption(this);
	},
	unselect:function(){
		if(this.selObj != null ){
			this.selObj.className="off";
		}
		this.selValue=null;
		this.selObj=null;
	},
	remove:function(){
		this.unselect();
		UI.$(this.selUlId).innerHTML="<li>¼±ÅÃÇÏ¼¼¿ä</li>";
	}
}
dynamicScript =new UI.DynamicScript('','UTF-8'); //DynamicScript °´Ã¼»ý¼º
var EstAreaNavi=function(saleObj,cateObj,depth1Obj,depth2Obj,depth3Obj,depth4Obj ){
	this.saleObj=saleObj; // °Å·¡±¸ºÐ
	this.cateObj=cateObj; // ¸Å¹°Á¾·ù
	this.depth1Obj=depth1Obj; // ½Ã/±¸
	this.depth2Obj=depth2Obj; // ±¸/½Ã/±º
	this.depth3Obj=depth3Obj; // À¾/¸é/µ¿
	this.depth4Obj=depth4Obj; // ´ÜÁö
	this.danjiBox = UI.$("NaviDanjiBox");
}
EstAreaNavi.prototype={
	selectOption:function(naviItemObj){
		var id=naviItemObj.selUlId;
		var value=naviItemObj.selValue;
		var obj=UI.$(id);
		var url=null;
    	if(obj==undefined || value==undefined || value=="") return false;
		switch(id){
		case "Areanavi_saletype":
			if(value=="R"){
				this.cateObj.li[7].style.display="none"; // Àç°³¹ß
				this.cateObj.li[12].style.display="none"; // »ó°¡ÁÖÅÃ
				if(this.cateObj.index==7 || this.cateObj.index==12){
					this.cateObj.unselect();
					this.cateObj.select(this.cateObj.li[0],"A1");
				}
			} else {
				this.cateObj.li[7].style.display="block"; // Àç°³¹ß
				this.cateObj.li[12].style.display="block"; // »ó°¡ÁÖÅÃ
			}

			if( this.depth1Obj.selValue && this.depth2Obj.selValue && this.depth3Obj.selValue){
				url="http://realestate.daum.net/maemul/common/subdanji.daum?areacode="+this.depth3Obj.selValue+"&mcatecode="+this.cateObj.selValue+"&function=searchDanjiList";
			}

			break;
		case "Areanavi_catecode":
			if( this.depth1Obj.selValue && this.depth2Obj.selValue && this.depth3Obj.selValue ){
				url="http://realestate.daum.net/maemul/common/subdanji.daum?areacode="+this.depth3Obj.selValue+"&mcatecode="+this.cateObj.selValue+"&function=searchDanjiList";
			}
			
			// ´ÜÁö±º+Àç°³¹ß : ºñ´ÜÁö / ´ÜÁö¹Ú½º º¸ÀÓ : ¾Èº¸ÀÓ 
			if( this.danjiBox ){
				if( this.cateObj.index>=0 && this.cateObj.index <= 7 ){ this.danjiBox.style.display = "block"; } 
				else { this.danjiBox.style.display = "none"; }
			}
			break;
		case "Areanavi_si":
			this.depth2Obj.remove();this.depth3Obj.remove();this.depth4Obj.remove();
			url="http://realestate.daum.net/maemul/common/subarea.daum?areacode="+value+"&function=searchAreaListGu";
			break;
		case "Areanavi_gu":
			this.depth3Obj.remove();this.depth4Obj.remove();
			url="http://realestate.daum.net/maemul/common/subarea.daum?areacode="+value+"&function=searchAreaListDong";
			break;
		case "Areanavi_dong":
			url="http://realestate.daum.net/maemul/common/subdanji.daum?areacode="+value+"&mcatecode="+this.cateObj.selValue+"&function=searchDanjiList";
			this.srcObj=this.depth3Obj;
			this.trgObj=UI.$(this.depth4Obj.selUlId);
			break;
		}
		if (url != null){
			dynamicScript.call(url);
		}
	},
	moveUrl:function(){
		var url=null;
		if(this.depth4Obj.selValue==null){
			url="http://realestate.daum.net/maemul/area/_areacode_/_catecode_/_extcatecode_/_saletype_/*/*/*/summary";

			if(this.saleObj.selValue){
				url=url.replace(/(_saletype_)/gi,this.saleObj.selValue);
			}
			if( this.cateObj.selValue){
				url=url.replace(/(_catecode_)/gi,this.cateObj.selValue);
			}
			if( this.cateObj.selValue=="A1"){
				url=url.replace(/(_extcatecode_)/gi,"A1A3A4");
			} else {
				url=url.replace(/(_extcatecode_)/gi,this.cateObj.selValue);
			}
			if (this.depth3Obj.selValue){
				url=url.replace(/(_areacode_)/gi,this.depth3Obj.selValue); // À¾/¸é/µ¿
			} else if (this.depth2Obj.selValue){
				url=url.replace(/(_areacode_)/gi,this.depth2Obj.selValue); // ±¸/½Ã/±º
			} else if (this.depth1Obj.selValue){
				url=url.replace(/(_areacode_)/gi,this.depth1Obj.selValue); // ½Ã/±¸
			}
			if(url.indexOf("_areacode_") > -1){
				alert("Áö¿ª ¶Ç´Â ´ÜÁö¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä");
				return false;
			} else {
				top.location.href=url;
			}
		} else {
			if( this.cateObj.index == 7 ){
				url="http://realestate.daum.net/maemul/zone/_danjiid_/summary";
			} else {
				url="http://realestate.daum.net/maemul/danji/_danjiid_/_saletype_/summary";
			}

			if(this.saleObj.selValue){
				url=url.replace(/(_saletype_)/gi,this.saleObj.selValue);
			}
			if (this.depth4Obj.selValue){
				url=url.replace(/(_danjiid_)/gi,this.depth4Obj.selValue); // ´ÜÁö
			}

			if(url.indexOf("_danjiid_") > -1){
				alert("Áö¿ª ¶Ç´Â ´ÜÁö¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä");
				return false;
			} else {
				top.location.href=url;
			}
		}
	}
}
//var naviStep=null;
function searchAreaListGu(data ){ makeNaviList(data, "gu" ); }
function searchAreaListDong(data ){ makeNaviList(data, "dong" ); }
function searchDanjiList(data){ makeNaviList(data, "danji"); }
function makeNaviList(data, naviStep){
	if(naviStep==null ) return false;
	var listHtml="";
	var trgObj=UI.$("Areanavi_"+naviStep);
	var naviName="navi_"+naviStep;
	for (var n in data){
		if (trgObj.id=="Areanavi_danji"){
			listHtml += '<li onmousedown="'+naviName+'.select(this, \''+data[n].danjiid+'\');" >'+data[n].danjiname+'</li>';
		} else {
			listHtml += '<li onmousedown="'+naviName+'.select(this, \''+data[n].areacode+'\');" >'+data[n].areaname+'</li>';
		}
	}
	if (data.length==0){
		listHtml += '<li>Á¤º¸°¡ ¾ø½À´Ï´Ù</li>';
	}
	
	trgObj.innerHTML=listHtml;
}


// ºê¶ó¿ìÁ®º° °´Ã¼¾ò±â - ¿¹¿ÜÀûÀÎ °æ¿ìÀÓ
var getExternalObject=function(id){
	if (window.document[id]) {
		return window.document[id];
	}
	if (navigator.appName.indexOf("Microsoft Internet")==-1) {
		if (document.embeds && document.embeds[id])
			return document.embeds[id];
	} else {
		return document.getElementById(id);
	}
}
// JSON Àü´ÞÇÔ¼ö
function setViewMode(mode ){
	try	{
		getExternalObject("FlashEstMap").setViewMode(mode); 
		var parent = UI.$("mapFlashBgA")||UI.$("mapFlashBgB")||UI.$("mapFlashBgC")||UI.$("mapFlashBgAll");
		if( parent ){
			switch( mode ){
			case "count": parent.style.backgroundPosition = "0px 0px";
				return gLink(null, "ZFES", "1", "8");
				break;
			case "rate": parent.style.backgroundPosition = "0px -22px";
				return gLink(null, "ZFES", "2", "8");
				break;
			case "price": parent.style.backgroundPosition = "0px -44px";
				return gLink(null, "ZFES", "3", "8");
				break;
			}
		}
		
	} catch (e) {}
}
function setDataJSON(data){ getExternalObject("FlashEstMap").setDataJSON(data); }
// Áöµµ
function flashMap(vars,id){
	var varsStr="";
	for (var property in vars){
		varsStr += "&"+property+"="+encodeURI(vars[property]);
	}
	DaumFlash("http://fn.daum-img.net/flash/estate/2008/map/map_"+vars.thisAreacode+".swf?ver=20080710",varsStr,"546","314",id,"FlashEstMap");
}

function resizeFrame( id ){ var frame = UI.$( id ); }
function resizeImg(obj,options){
	var ratio={
		width:options.width/obj.clientWidth,
		height:options.height/obj.clientHeight
	}
	if(ratio.width > ratio.height){
		obj.style.height=options.height + "px";
	} else {
		obj.style.width=options.width + "px";
	}
}

// ÇÏ´Ü °Ë»öÃ¢¿¡ ÀÔ·Â½Ã Ã³¸®
function syncSearchQuery( bform ){
	var form = document.search;
	form.query.value = bform.query.value;
	searchsubmit();
}
// ÇÃ·¡½ÃÁö Áöµµ ´ÜÁöº¸±â ÆË¾÷½Ã
function iframeDanjiView( url ){ dummyIframePV( "iframeHiddenDanji", "/danjiinfoDummy4Flash.daum" ); }
function iframeNaviView( url ){ dummyIframePV( "iframeHiddenNavi", "/naviDataDummy4Flash.daum" ); }//"http://realestate.daum.net/danjiinfoDummy4Flash.daum"
function iframeSiseView( url ){ dummyIframePV( "iframeHiddenSise", "/siseDataDummy4Flash.daum" ); }
function dummyIframePV( id, url ){
	var obj = UI.$(id);
	if( obj ){
		obj.src = url;
	}
}

// ´º½º, Ä¿¹Â´ÏÆ¼ ¿ìÃø¿µ¿ª ¹× °ü·Ã³»¿ë »Ñ¸®±â
// Á¦ÈÞ»ç, °¡ÀÌ¾Æ ¿ìÃø ³¯°³ µ¥ÀÌÅÍ »Ñ¸®±â
function writeWingList( dataset, _options ){
	var options = {
		len : 30
	};
	Object.extend( options, _options );
	for ( var i in dataset ){
		var title = UI.length( dataset[i].title, options.len, ".." );
		var url = dataset[i].url;
		var classname = "";
		if ( dataset[i].bold && dataset[i].bold==true){
			classname += "fw_b ";			
		}
		document.write("<li><a href='"+url+"' class='"+classname+"'>"+title+"</a></li>");
	}
}

function writeWingIssue( dataset, _options ){
	var options = {
		len : 20
	}
	Object.extend( options, _options );

	var title = UI.length( dataset.title, options.len, "..");
	var pic = "";
	try	{
		if( dataset.pic && dataset.pic!= "" ){ pic = dataset.pic; }
	}catch (e){ pic = "http://fn.daum-img.net/image/estate/2008/dummy/dummyissueimg.gif"; }
	var html = '<a href="'+dataset.url+'" class="black"><img src="'+dataset.pic+'" width="64" height="43" class="thumbImg fl_le" ></a><div class="title"><img src="http://fn.daum-img.net/image/estate/2008/maemulSise/icoIssueTitle.gif" alt="ÀÌ½´" ><a href="'+dataset.url+'" class="black"><strong>'+title+'</strong></a></div>';

	document.write( html );
}

var WingContents = function( _dataset ){
	this.dataset = _dataset;
};
WingContents.prototype = {
	list : function( _dataset, _options ){
		var options = {
			len : 30
		};
		Object.extend( options, _options );
		var cnt = _dataset.length;
		if( options.count && options.count != "undefined" && options.count<cnt ){
			cnt = options.count
		}
		for ( var i=0; i<cnt; i++ ){
			var title = UI.length( _dataset[i].title, options.len, ".." );
			if( options.mode && options.mode == "newsView" ){
				title = UI.length( _dataset[i].title2, options.len, ".." );
			}
			var url = _dataset[i].url;
			var classname = "";
			if ( ( _dataset[i].bold && _dataset[i].bold==true ) ) {
				classname += "fw_b ";			
			}
			document.write("<li><a href='"+url+"' class='"+classname+"' title=\""+_dataset[i].title.replace("\"", "&quot;") +"\">"+title+"</a></li>");
		}
	},
	issue : function( _dataset, _options ){
		var options = {
			len : 20
		}
		Object.extend( options, _options );

		var title = UI.length( _dataset.title, options.len, "..");
		var pic = "";
		try	{
			if( _dataset.pic && _dataset.pic!= "" ){ pic = _dataset.pic; }
		}catch (e){ pic = "http://fn.daum-img.net/image/estate/2008/dummy/dummyissueimg.gif"; }
		var html = '<a href="'+_dataset.url+'" class="black"><img src="'+_dataset.pic+'" width="64" height="43" class="thumbImg fl_le" ></a><div class="title"><img src="http://fn.daum-img.net/image/estate/2008/maemulSise/icoIssueTitle.gif" alt="ÀÌ½´" ><a href="'+_dataset.url+'" class="black"><strong>'+title+'</strong></a></div>';

		document.write( html );
	},
	getDebateList : function( mode ){
		var _len = 30; if( mode == "newsView" ) _len = 23;
		this.list( this.dataset.debate, {len:_len, mode:mode} );
	},
	getNewsList : function( mode ){
		var _len = 30; if( mode == "newsView" ) _len = 23;
		this.list( this.dataset.news, {len:_len, mode:mode } );
	},
	getDebateIssue : function( mode ){
		var _len = 34; if( mode == "newsView" ) _len = 17;
		this.issue( this.dataset.issue.debate, {len:_len} );
	},
	getNewsIssue : function( mode ){
		var _len = 34; if( mode == "newsView" ) _len = 17;
		this.issue( this.dataset.joinsIssue[0], {len:_len} );
	},
	getTechList : function( mode ){
		var _len = 30; if( mode == "newsView" ) _len = 23;
		this.list( this.dataset.tech, {len:_len} );
	},
	getCounselList : function( mode ){
		var _len = 30; 
		this.list( this.dataset.qna, {len:_len} ); // qna·Î º¯°æ¿¹Á¤
	},
	getNoticeList : function( mode ){
		this.list( this.dataset.notice, {len:30} );
	},
	getQuizDate : function(){
		var date = "0¿ù 0ÀÏ";
		try{ date = Number( this.dataset.quiz.date.substr(4,2) ) +"¿ù " +  Number( this.dataset.quiz.date.substr(6,2) ) + "ÀÏ"; } catch (e) {}
		document.write( date );
	},
	getQuizText : function(){ document.write( UI.length( this.dataset.quiz.text, 95, ".." ) ); },
	getQuizUrl : function(){ return this.dataset.quiz.url ; },
	getJoinsIssue : function(){ 
		var html = '';
		for ( var i in this.dataset.joinsIssue ){
			var obj = this.dataset.joinsIssue[i];
			
			var regExp = /nKey=([0-9]+)/;
			regExp.exec(obj.url);
			var nKey = RegExp.$1;
		
			html += '<li id="joinsIssue_hot_'+nKey+'" class="sub"><a href="'+obj.url+'" title="'+obj.title+'">'+UI.length( obj.title, 16, ".." )+'</a></li>';
		}
		document.write( html );
	}
};


function getExtendTargetLink( areacode ){
	var tempAreacode = areacode;
	switch( areacode ){
		case "2900100": tempAreacode = "2410314"; break; // °í¾ç½Ã
		case "2900110": tempAreacode = "2420010"; break; // ºÎÃµ½Ã
		case "2900120": tempAreacode = "2425020"; break; // ¾È»ê½Ã
		case "2900130": tempAreacode = "2430010"; break; // ¾È¾ç½Ã
		case "2900140": tempAreacode = "2440040"; break; // ¼ö¿ø½Ã
		case "2900150": tempAreacode = "2446711"; break; // ¿ëÀÎ½Ã
		case "2900160": tempAreacode = "2461140"; break; // ¼º³²½Ã
	}
	return tempAreacode;
}

function getExtendArea( areacode ){
	var tempAreacode = areacode;
	switch( areacode.toString() ){
		// °í¾ç½Ã
		case "2410314": case "2411310": case "2412010": tempAreacode = "2900100"; break;
		// ºÎÃµ½Ã
		case "2420010": case "2421150": case "2422040": tempAreacode = "2900110"; break;
		// ¾È»ê½Ã
		case "2425020": case "2426040": tempAreacode = "2900120"; break;
		// ¾È¾ç½Ã
		case "2430010": case "2431050": tempAreacode = "2900130"; break;
		// ¼ö¿ø½Ã
		case "2440040": case "2440050": case "2441100": case "2442280": tempAreacode = "2900140"; break;
		// ¿ëÀÎ½Ã
		case "2446711": case "2448110": case "2449010": tempAreacode = "2900150"; break;
		// ¼º³²½Ã
		case "2461140": case "2462080": case "2463010": tempAreacode = "2900160"; break;
	}
	return tempAreacode;
}

function openTaxCalc(asset){
	var url = "";
	var vAction = "";
	
	switch(asset) {
		// ¾çµµ¼¼
		case "YD": vAction = "/calc/Calc_EtcTax_YD.asp?sType=dCalc&CalcType=C02&Assets=1"; break;
		// »ó¼Ó¼¼
		case "SS": vAction = "/calc/Calc_EtcTax_SS.ASP?sType=dCalc"; break;
		// Áõ¿©¼¼
		case "JY": vAction = "/calc/Calc_EtcTax_JY.ASP?sType=dCalc"; break;
		// Á¾ÇÕºÎµ¿»ê¼¼
		case "JB": vAction = "/calc/Calc_EtcTax_JB.ASP?sType=dCalc"; break;
		// Ãëµæ¼¼/µî·Ï¼¼
		case "CD": vAction = "/calc/BasicInfor.asp?SiteKey=daum&Pwd=mots-daum-20060901&sType=dCalc"; break;
		// Áß°³¼ö¼ö·á ¿äÀ²Ç¥
		case "TABLE": vAction = "/calc/RecommTable.asp?SiteKey=daum&Pwd=mots-daum-20060901&sType=dCalc"; break;
	}

	if(vAction != ""){
		url = "http://realestate.daum.net/sts";
		//url = "http://daum.stscenter.co.kr/B2B_Maemul";
		var frmMots = document.getElementById("frmMots")
		if( !frmMots ){
			frmMots = $C("form");
			frmMots.method = "post";
			document.body.appendChild( frmMots );
		}
		frmMots.action= url + vAction;
		var Win = window.open('','wMots' ,'width=680,height=550,scrollbars=yes,status=yes')
		frmMots.target = 'wMots';
		frmMots.submit();
		Win.focus();
	} else return;
}

// Äá³ª¹° ¸Ê¿¡¼­ ½Éº¼ Å¬¸¯½Ã PV Áý°è¿ë ´õ¹ÌÆÄÀÏ È£Ãâ from CongnamulMap.js > upup function
// ¸Å¹°/½Ã¼¼, ºÎµ¿»ê °Ë»ö¿¡ »ç¿ë
function callSymbolClickIframe(){
	// create click-log iframe 
	var clicklogFrame = UI.$("iframeSymbolPV");
	// ¾øÀ¸¸é ±â³É »ý¼º
	if( clicklogFrame == null ){
		clicklogFrame = $C("IFRAME");
		clicklogFrame.style.display = "none";
		clicklogFrame.id = "iframeSymbolPV";
		clicklogFrame.title = "Äá³ª¹° ¸Ê ½Éº¼ PVÁý°è¿ë iframe";
		document.body.appendChild( clicklogFrame );
	}
	clicklogFrame.src = "http://realestate.daum.net/danjiinfoDummy4Congnamul.daum";
	
}

//################################################## TO±¤°í ¹× È®Àå¹è³Ê±¤°í ####################################################

function hideAD(){
	var adElem = top.ad;
	adElem.style.display="none";
}

//############### °øÁö»çÇ× ¿î¿µ
function MenuBanner(){
	return '<a href="http://board3.finance.daum.net/gaia/do/estate/totalDanji/list?bbsId=danji&viewObj=68:69:70&pageIndex=1&nil_profile=estatetop&nil_tab=adtext1" target="new">¾ËÄá´ÞÄá ¿ì¸® µ¿³× Çàº¹ÇÑ ÀÌ¾ß±â!</a>';
} 

// ASP ÆäÀÌÁö ³» ±¤°í¿µ¿ª
function getAdASP(){
	var sid = null;
	var url = top.location.href;

	if( url.indexOf( "news.realestate.daum.net/" ) > -1 ){ sid = "00873"; } 
	else if( url.indexOf( "realestate.daum.net/mortgage/" ) > -1 ){ sid = "00875"; } 
	else if( url.indexOf( "auction.realestate.daum.net" ) > -1 ){ sid = "00874"; } 
	else if( url.indexOf( "bunyang.realestate.daum.net" ) > -1 ){ sid = "00870"; } 
	else { sid = "00874"; }// °æ¸Å°¡ ¸»½éÀÌ¶ó -_-;;

	if( sid != null  ){
		var rand = Math.random().toString(); 
		var ordval = rand.substring(2,rand.length); 
		var clintAgent = navigator.userAgent;
		document.writeln("<iframe src=\"http://amsv2.daum.net/cgi-bin/adcgi?corpid=46&secid="+sid+"&type=cpm&tag=iframe&mkvid=1&ord=" + ordval + "\" width=250 height=250 border=0 frameborder=0 scrolling=no marginheight=0 marginwidth=0 id=estate_AMS></iframe>");
	}
}

//########################################  ¼­Á¦½ºÆ® ###########################################################################

String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/gi, ""); 
} 
function getCookie(s){
	var tmp=document.cookie.split('; ');
	for (var i=0; i<tmp.length;i++){
		var c_name = tmp[i].split('=');
		if (c_name[0]==s) return c_name[1];
	}
	return false;
}
function setCookie(_name,_value,_day,_domain){
	var expireDate = new Date(Number(new Date())+Number(_day)*86400000);
	var ckText = _name+'='+_value+';expires='+expireDate.toGMTString()+';path=/;';
	if(_domain) ckText += "domain="+_domain+";";
	//alert(document.cookie);
	document.cookie =ckText;
	//document.cookie ="STOCKCODE="+escape("036030")+";domain=stock_dev.daum.net";
}
function getStyle(obj,styleText){
	var temp = styleText.split("-");
	var templen = temp.length;
	if(templen > 1) {
		styleText = 	temp[0];
		for(var n=1; n<templen; ++n) {
			styleText += temp[n].substr(0,1).toUpperCase() + temp[n].substr(1);
		}
	}

	if(obj.currentStyle)
		var css = obj.currentStyle;
	else
		var css = document.defaultView.getComputedStyle(obj, null);
	value = css ? css[styleText] : null;
	return (value == null || value == undefined) ? "" : value;
}
function setStyle(obj,styles){
	var styleArr = styles.split(";");
	var styleCnt = styleArr.length;
	for(var i=0; i<styleCnt; ++i) {
		var styleItem = styleArr[i].split(":");
		styleItem[1] = styleArr[i].substr(styleItem[0].length+1);
		styleItem[0] = styleItem[0].trim();
		switch(styleItem[0]) {
			case 'float' :
				if(obj.style.styleFloat != undefined) 
					obj.style.styleFloat = styleItem[1];
				else 
					obj.style.cssFloat = styleItem[1];
				break;
			default :
				if(styleItem[0].length>0 && styleItem[1].length>0) {
					var temp = styleItem[0].split("-");
					var templen = temp.length;
					if(templen > 1) {
						styleItem[0] = 	temp[0];
						for(var n=1; n<templen; ++n) {
							styleItem[0] += temp[n].substr(0,1).toUpperCase() + temp[n].substr(1);
						}
					}
					obj.style[styleItem[0]] = styleItem[1];	
				}
				break;
		}
	}
}
//event add
function AddEvent(element, name, func){
	if (element.addEventListener) {
		element.addEventListener(name, func, false);
	}
	else if (element.attachEvent) {
		element.attachEvent('on' + name, func);
	}
}
function RemoveEvent(element, name, func){
	if (element.addEventListener) {
		element.removeEventListener(name, func, false);
	}
	else if (element.attachEvent) {
		element.detachEvent('on' + name, func);
	}
}
function StopEvent(event) {
	var e=event || window.event;
	if(e.preventDefault) {e.preventDefault(); e.stopPropagation(); }
	else {e.returnValue = false; e.cancelBubble = true;}
};
/* list over/out */
function highlight(obj, isover, color){
	if(color == undefined) color = "#EFF1FF";
	if(!obj.oldColor) obj.oldColor = getStyle(obj,"background-color");
	obj.style.backgroundColor = (isover) ? color : obj.oldColor;
}
/* javascript call */
function callsrc(id,url,type) {
	var obj = $(id);
	var parent;
	if(obj) {
		parent = obj.parentNode;
		parent.removeChild(obj);
	}
	else {
		parent = document.getElementsByTagName('head')[0];
	}
	
	obj = $C('script');
	var cashTime = new Date() - Date.UTC(2008,5,0);
	if(type && type == "day") cashTime = Math.floor(cashTime/86400000);
	
	var param = (url.indexOf('?')<0) ? '?':'&';
	param += "d="+ cashTime;
 
	obj.src = url + param;
	obj.id = id;
	obj.type = "text/javascript";
	parent.appendChild(obj);
}
//input ÃÊ±â°ª»èÁ¦ & ±âº»style·Î º¯°æ
function resetInputStyle(el) {
	if (!el.isFocus) {
		el.value = "";
		el.style.color = "#333";
		el.style.fontWeight = "normal";
		el.style.fontSize = "12px";
		el.style.fontFamily = "±¼¸²,gulim";
		el.isFocus = true;
		el.focus();
	}
}

/* suggest */
var sug = {}
sug.children = [];
sug.cur = null; //call½Ã ÇöÀç sug.exec °´Ã¼

sug.cookie = {
	name : "estateSuggest",
	domain : ["realestate.daum.net","maemul.realestate.daum.net","neo.realestate.daum.net","danjiboard.realestate.daum.net","news.realestate.daum.net","auction.realestate.daum.net","bunyang.realestate.daum.net","board.realestate.daum.net","qna.finance.daum.net","event.finance.daum.net"]
}

sug.$ = $;
sug.$C = $C; 
sug.setCookie = setCookie; //setCookie(_name,_value,_day,_domain)
sug.getCookie = getCookie; //getCookie(s)
sug.setStyle = setStyle; //setStyle(obj,styles)
sug.addEvent = UI.addEvent; //AddEvent(element, name, func)
sug.stopEvent = UI.stopEvent; //StopEvent(event)
sug.highlight = highlight; //highlight(obj,isOver,color) <- mouseoutÀÏ¶§´Â color°ª ÇÊ¿ä¾øÀ½
sug.resetInputStyle = resetInputStyle; //input¿¡ µé¾îÀÖ´Â text style reset
sug.callsrc = callsrc;
sug.isSuggestOn = (sug.getCookie("estateSuggest")=="off") ? false : true;
sug.on = function() {
	sug.isSuggestOn = true;
	for(var i=0,cnt=sug.children.length;i<cnt;++i) {
		sug.children[i].input.autocomplete = "off";
	}
	sug.close();
	for(var i in this.cookie.domain) sug.setCookie(sug.cookie.name,"on",365,sug.cookie.domain[i]);
}
sug.off = function() {
	sug.isSuggestOn = false;
	for(var i=0,cnt=sug.children.length;i<cnt;++i) {
		sug.children[i].input.autocomplete = "on";
	}
	sug.close();
	for(var i in this.cookie.domain) sug.setCookie(sug.cookie.name,"off",365,sug.cookie.domain[i]);
}
sug.setList = function(data) {
	sug.cur.setList(data);
}
sug.close = function() {
	for(var i=0,cnt=sug.children.length;i<cnt;++i) {
		sug.children[i].closeBox();
	}
}
sug.autoSelect = function() {
	if(sug.cur.listCnt > 0) sug.cur.selectItem();
}
//input validate function (¼­ºñ½º¸¶´Ù °¢°¢ ¼³Á¤)
sug.validate = function(val) {
	//if(val.length == 0 || (!isNaN(val) && val.length < 4)) return false;
	if(val.length == 0) return false;
	return true;
}

//°á°ú°ªÀÌ ¾øÀ»°æ¿ì  (¼­ºñ½º¸¶´Ù °¢°¢ ¼³Á¤)
sug.noResult = function() {
	return '<p style="padding:10px;line-height:18px">ÇØ´ç ´Ü¾î·Î ½ÃÀÛÇÏ´Â Á¤º¸°¡ ¾ø½À´Ï´Ù.</p>';
}
sug.info = function() {
	var html = '<p style="padding:4px 0;font:11px/15px µ¸¿ò,dotum">';
	if(sug.isSuggestOn) html += 'ÇöÀç <b style="color:#5471AA">°Ë»ö¾î ¼­Á¦½ºÆ®</b>¸¦ »ç¿ëÇÏ°í ÀÖ½À´Ï´Ù.';
	else html += '<b style="color:#5471AA">°Ë»ö¾î ¼­Á¦½ºÆ®</b>¸¦ »ç¿ëÇØ º¸¼¼¿ä. <a href="javascript:;" onclick="sug.on()" style="color:#EB6F00;text-decoration:underline">±â´ÉÄÑ±â</a>';
	html += '<br>°Ë»ö¾î ÀÔ·Â½Ã ÀûÇÕÇÑ Å°¿öµå¸¦ Á¦½ÃÇÕ´Ï´Ù.</p>';
	return html;
}
sug.getFooter = function(isInfoShow) {
	var html ='<span style="float:right;text-align:right;padding-right:10px;">' +
						'	<a href="http://blog.daum.net/daumfinance/5594457" target="_blank">¼­Á¦½ºÆ®¶õ?</a>' +
						'	';
	if(isInfoShow) html += '<span style="margin:0 4px">|</span> <a href="javascript:;" onclick="sug.close()">´Ý±â</a>';
	else html += '<a href="javascript:;" onclick="sug.off()">±â´É²ô±â</a>';
	html += '</span>';
	return html;
}
function estateSearch(id) {
	var el = $(id);
	var code = el.code;
	if(code) window.location.href="http://realestate.daum.net/search/total/?query="+encodeURIComponent( code );
	else {
		if(doSearchQ()) document.search.submit();
	}
}
sug.exec = function(inputId,btnId,btnFunc,boxId) {
	sug.children.push(this);
	this.maxHeight = 122;
	this.isInfoShow = false;
	this.isListShow = false;
	this.listCnt = 0;
	this.curIndex = -1;	
	this.timer = null;
	
	this.input = sug.$(inputId);
	this.btn = sug.$(btnId);
	this.btnFunc = btnFunc;
	if(boxId) this.box = sug.$(boxId);
	else {
		this.box = sug.$C('div');
		sug.setStyle(this.box,"top:"+(this.input.offsetTop+this.input.offsetHeight)+"px;left:"+this.input.offsetLeft+"px");
		//document.title = this.input.offsetLeft;
		this.input.offsetParent.style.zIndex=97-sug.children.length*4;
		this.input.offsetParent.appendChild(this.box);
	}
	sug.setStyle(this.box,"display:none;position:absolute;z-index:"+(98-sug.children.length*4)+";text-align:left;width:"+this.input.offsetWidth+"px;");
	this.render();
}
sug.exec.prototype = {
	render : function() {
		this.input.setAttribute("autocomplete","off");
		this.input.maxLength = "100"; //È£È£ Á¾¸ñÀº ±ÛÀÚ°¡ ±æÁö ¾ÊÀ¸´Ï... ¿ì¼± ÀÌ·¸°Ô ÇÏÀÚ... padding-rightÁÖ´Â°Íµµ ¹æ¹ý -ÀÌÇÏ¿µ-
		this.defValue = this.input.value;
		
		var w = this.input.offsetWidth;//this.box.offsetWidth;
	
		this.bk = sug.$C('iframe'); this.bk.frameBorder = 0;
		sug.setStyle(this.bk,"position:absolute;background-color:#fff;width:"+w+"px;top:0;left:0;z-index:"+(99-sug.children.length*4));//height:146px;
		
		this.body = sug.$C('div');
		sug.setStyle(this.body,"position:absolute;width:"+(w-2)+"px;border:1px solid #8C95D6;z-index:"+(100-sug.children.length*4));
		
		this.list = sug.$C('ul'); this.list.className = "scroll";
		sug.setStyle(this.list,"width:"+(w-2)+"px;overflow-y:auto;overflow-x:hidden");
		this.body.appendChild(this.list);
		
		this.footer = sug.$C('div');
		sug.setStyle(this.footer,"float:left;background-color:#F4F6FB;height:14px;padding:7px 0px 3px 0px;font:11px µ¸¿ò,dotum;letter-spacing:-1px;color:#C2CFF0;width:100%;");
		
		this.icon = sug.$C('div');
		sug.setStyle(this.icon,"background-image:url(http://fn.daum-img.net/image/finance/plaza/2008/stock/common/ico_sugest.gif);background-repeat:no-repeat;width:7px;height:4px;position:absolute;top:"+(this.input.offsetTop+9)+"px;left:"+(this.input.offsetLeft+w-16)+"px;cursor:pointer;font-size:0");
		this.input.offsetParent.appendChild(this.icon);
		
		/*this.resortBtn = sug.$C('a'); this.resortBtn.href="javascript:;"; this.resortBtn.innerHTML = '³¡´Ü¾î ´õº¸±â'; sug.setStyle(this.resortBtn,"float:left");
		this.footer.appendChild(this.resortBtn);
		sug.addEvent(this.resortBtn,"click",this.resort.bind(this));*/
		this.footer.innerHTML = sug.getFooter(this.isInfoShow);
		this.body.appendChild(this.footer);
		
		this.box.appendChild(this.bk);
		this.box.appendChild(this.body);
		
		sug.addEvent(this.input,"keydown",this.keyIn.bindAsEventListener(this));
		sug.addEvent(this.input,"focus",this.focusInput.bindAsEventListener(this));
		//sug.addEvent(this.input,"focus",this.resetInputStyle.bindAsEventListener(this));
		sug.addEvent(this.input,"mousedown",this.clickInput.bindAsEventListener(this));
		sug.addEvent(document,"mousedown",this.closeBox.bindAsEventListener(this));
		sug.addEvent(this.icon,"mousedown",this.showInfo.bind(this));
		sug.addEvent(this.icon,"mousedown",sug.stopEvent); 
		sug.addEvent(this.body,"mousedown",sug.stopEvent); 
		sug.addEvent(this.btn,"mousedown",sug.stopEvent); 
		sug.addEvent(this.btn,"click",this.selectItem.bind(this));
	},
	showInfo : function() {
		if(!this.isInfoShow) {
			sug.close();
			this.isInfoShow = true;
			this.iconChange(this.isInfoShow);
			this.footer.innerHTML = sug.getFooter(this.isInfoShow);
			this.setList(null);
		}
		else {
			this.closeInfo();
		}
	},
	closeInfo : function() {
		if(this.isInfoShow) {
			this.isInfoShow = false;
			this.iconChange(this.isInfoShow);
			this.footer.innerHTML = sug.getFooter(this.isInfoShow);
			this.box.style.display = "none";
		}
	},
	keyIn : function(event) { //key control
		if(!sug.isSuggestOn)  return;

		var e=event || window.event;
		if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 229 || e.keyCode == 8 || e.keyCode == 46) { //48~57:¼ýÀÚ, 65~90:¹®ÀÚ, 96~105:¼ýÀÚÅ°ÆÐµå, 229:ÇÑ±Û, 8:¹é½ºÆäÀÌ½º, 46 : delete
			if(!this.timer) {
				this.checkChange.bind(this);
				this.timer = window.setInterval(this.checkChange.bind(this),100);	
			}
		}
		else if(e.keyCode == 38 || e.keyCode == 40) { 
			if(this.listCnt > 0) {
				if(e.keyCode == 38) { //up key
					if(this.curIndex > 0) {
						this.curIndex--;
						var li = this.list.childNodes[this.curIndex];
						//if(li.offsetTop + li.offsetHeight <= this.list.scrollTop) this.list.scrollTop -= li.offsetHeight;
						if(li.offsetTop <= this.list.scrollTop) this.list.scrollTop = li.offsetTop;
					}
					else { //curIndexÀÌ 0ÀÎ °æ¿ì ¹Ú½º¸¦ ´Ý´Â´Ù.
						this.closeBox();
					}
				} 
				else { //down key
					if(this.curIndex < this.listCnt-1) this.curIndex++;
					var li = this.list.childNodes[this.curIndex];
					//if(li.offsetTop >= this.list.offsetHeight + this.list.scrollTop) this.list.scrollTop += li.offsetHeight; //ff¿¡¼­ border°ª ¶§¹®¿¡ °è»êÀÌ ¾È¸Â¾Æ¼­ -3ÇØÁÜ
					if(li.offsetTop +li.offsetHeight >= this.list.offsetHeight + this.list.scrollTop) this.list.scrollTop = (li.offsetTop +li.offsetHeight-this.list.offsetHeight); //ff¿¡¼­ border°ª ¶§¹®¿¡ °è»êÀÌ ¾È¸Â¾Æ¼­ -3ÇØÁÜ
					this.showList(); //´ÝÇôÀÖÀ¸¸é ´Ù½Ã ¿­¾îÁØ´Ù.
				}
				//highlight
				for(var i=0; i<this.listCnt; ++i) this.list.childNodes[i].onmouseout();
				if(this.curIndex >= 0 && this.curIndex < this.listCnt) this.list.childNodes[this.curIndex].onmouseover(); 
			}
		}
		else if(e.keyCode == 13) {//enter key
			this.selectItem();
			return false;
		}
	},
	checkChange : function() { //check input value
		if(this.input.oldValue == this.input.value) return; //º¯È­°¡ ¾øÀ¸¸é ¹«½Ã
		
		this.input.code = ""; //º¯È­°¡ ÀÖÀ¸¸é Áö¿öÁÜ.
		this.input.oldValue = this.input.value; 
		this.getData();
	},
	focusInput : function() { //mousedown½Ã show/hide
		//ÃÊ±â°ª (ex.Á¾¸ñ¸í or ÄÚµå) ÀÏ¶§´Â passÇØ¾ß ÇÏÁö¸¸, °Ë»ö°á°ú°¡ »Ñ·ÁÁø °æ¿ì¿¡´Â????
		if(this.defValue == this.input.value) {
			//this.input.value = "";
			//this.input.isFocus = true;
			//sug.resetInputStyle(this.input);
		}
		sug.cur = this; //focus°¡ °¡¸é sug.cur ¼¼ÆÃ
	},
	clickInput : function() { //mousedown½Ã show/hide
		//ÃÊ±â°ª (ex.Á¾¸ñ¸í or ÄÚµå) ÀÏ¶§´Â passÇØ¾ß ÇÏÁö¸¸, °Ë»ö°á°ú°¡ »Ñ·ÁÁø °æ¿ì¿¡´Â????
		if(!sug.isSuggestOn) return;
		if(this.defValue == this.input.value) return;
		if(!this.isListShow) this.getData(); //ÇÊ¿äÇÒ±î??
		else this.closeList();
	},
	getData : function() {	
		var invalue = this.input.value;
		if(!sug.validate(invalue)) {
			this.removeList();
			return;
		}

		invalue = invalue.replace(/ /gi, "" ); 
		if( isASP() == true || isEUCKR() == true ){
			// euckr
			sug.callsrc('sugJs','http://suggest.finance.daum.net/estate_nsuggest?mod=js&func=sug.setList&q='+invalue)
		} else {
			sug.callsrc('sugJs','http://suggest.finance.daum.net/estate_nsuggest?mod=js&func=sug.setList&encoding=utf_in_out&q='+encodeURIComponent(invalue))
		}
	},
	setList : function(data) {
		sug.cur = this;  //setList ÇØµµ sug.cur ¼¼ÆÃ
		while(this.list.firstChild) this.list.removeChild(this.list.firstChild);
		if(!data) {
			this.showInfoList();
		}
		else {
			var items = data.items;
			var r_items = data.r_items;
			var itemCnt = items.length;
			var r_itemCnt = r_items.length;		
			if(itemCnt + r_itemCnt > 0) {
				this.listCnt = itemCnt + r_itemCnt;	
				var keyVal = data.rq;
				var i, j;
				for(i=0;i<itemCnt;++i) {
					this.makeItemList(i, keyVal, items[i]);
				}
				for(j=0;j<r_itemCnt;++i,++j) {
					this.makeItemList(i, keyVal, r_items[j]);
				}
			}
			else {
				this.listCnt = 0;
				this.makeItemList(0);
			}	
		}	
		this.showList();
		this.list.style.height = "auto";
		var listHeight = this.list.offsetHeight;
		var realHeight = (listHeight > this.maxHeight) ? this.maxHeight : listHeight;
		this.list.style.height = realHeight + "px";
		this.box.style.height = this.bk.style.height = (this.body.offsetHeight) + "px";
		this.curIndex = -1;
		this.list.scrollTop = 0;
	},
	showInfoList : function() { //<li>»ý¼º
		var li = $C('li');
		setStyle(li,"position:static;float:none;line-height:14px;padding:3px 10px 1px;height:auto");
		li.innerHTML = sug.info();
		this.list.appendChild(li);
	},
	makeItemList : function(i, keyVal, itemVal) { //<li>»ý¼º
		var li = $C('li');
		li.idx = i;
		//setStyle(li,"letter-spacing:0;width:100%;height:22px;line-height:22px;overflow:hidden");

		if(!keyVal && !itemVal) {
			setStyle(li,"position:static;float:none;height:auto");
			li.innerHTML = sug.noResult();			
		}
		else {
			//setStyle(li,"position:static;float:none;height:20px;line-height:14px;padding:3px 0 1px 10px;white-space:nowrap;overflow:hidden");
			setStyle(li,"position:static;float:none;line-height:14px;padding:4px 10px 6px;height:auto;cursor:pointer;");
			li.innerHTML = this.formatEstateItemList(li,keyVal,itemVal);		
			li.onmouseover = function() {sug.highlight(this,true,"#efefef")}; 
			li.onmouseout = function() {sug.highlight(this,false)}; 
			li.onmousedown = this.selectItemOne.bind(this,i)
		}
		this.list.appendChild(li);
	},/*
	formatItemList : function(li,keyVal,itemVal) {
		//µ¿ÀÇ¾î µé¾îÀÖ´ÂÁö È®ÀÎ		
		if(itemVal.indexOf("(=")>=0) itemVal.match(/(.*)\(=(.*)\)\(([A-Za-z0-9]{6})\)/);
		else itemVal.match(/(.*)(.*)\(([A-Za-z0-9]{6})\)/);
		li.dataName = RegExp.$1;
		li.dataName1 = RegExp.$2;
		li.dataCode = RegExp.$3;
		
		var html;
		var exp = new RegExp("("+keyVal.replace(/(\(|\))/gi,"\\$1")+")",'gi');
		html = li.dataName.replace(exp,"<span style=\"color:#FF5F00\">$1</span>");
		if(li.dataName1.length > 0) html += "(="+li.dataName1.replace(exp,"<span style=\"color:#FF5F00\">$1</span>")+")";
		html += "<span class=\"num\" style=\"color:#999\"> (" + li.dataCode.replace(exp,"<span style=\"color:#FF5F00\">$1</span>") +")</span>";
		return html;

	},*/
	/*

*/
	formatEstateItemList : function( li, keyVal, itemVal ){
		var itemAry = itemVal.split("|");

		li.dataName = itemVal;//RegExp.$1;
		li.dataName1 = "";
		li.dataCode = itemVal;//RegExp.$3;
		
		var html;
		var exp = new RegExp("("+keyVal.replace(/(\(|\))/gi,"\\$1")+")",'gi');
		html = this.highlightCheck( li.dataName );
		html = this.highlightrCheck( html );
		//html = li.dataName.replace(exp,"<span style=\"color:#FF5F00\">$1</span>");
		//if(li.dataName1.length > 0) html += "(="+li.dataName1.replace(exp,"<span style=\"color:#FF5F00\">$1</span>")+")";
		//html += "<span class=\"num\" style=\"color:#999\"> (" + li.dataCode.replace(exp,"<span style=\"color:#FF5F00\">$1</span>") +")</span>";
		return html;
	},
	highlightCheck : function(str) {
		var revertQuery = this.input.value.replace(/ /gi, "");
		var rtStr = "";
		var _str = str.replace(/ /gi, "");
		var _userKeyword = revertQuery.replace(/ /gi, "");
		_userKeyword = _userKeyword.toLowerCase();
		if(_userKeyword == _str.substring(0, _userKeyword.length)){
			rtStr = "<font color='#eb550c'>";
			for (var i=0,j=0; j<revertQuery.length; i++) {
				if (str.substring(i, i+1)!=" ") j++;
				rtStr += str.substring(i, i+1);
			}
			rtStr += "</font>" + str.substring(i, str.length);
		}else{
			rtStr += str;
		}
		return rtStr;
	},
	highlightrCheck : function (str) {
		var revertQuery = this.input.value.replace(/ /gi, "");
		var rtStr = "";
		var _str = str.replace(/ /gi, "");
		var _userKeyword = revertQuery.replace(/ /gi, "");
		_userKeyword = _userKeyword.toLowerCase();
		if (_userKeyword == _str.substring(_str.length - _userKeyword.length)) {
			for (var i=0,j=0; j<_str.length - _userKeyword.length; i++) {
				if (str.substring(i, i+1)!=" ") j++;
				rtStr += str.substring(i, i+1);
			}
			rtStr += "<font color='#eb550c'>";

			for (var k=i,l=0; l<_userKeyword.length; k++) {
				if (str.substring(k, k+1)!=" ") l++;
				rtStr += str.substring(k, k+1);
			}
			rtStr += "</font>";
		}else{
			rtStr += str;
		}
		return rtStr;
	},
	showList : function() { //show ul & addevent
		if(!this.isListShow) {
			this.box.style.display = "block";
			this.list.style.display = "block";
			//this.footer.style.display = "block";
			
			//this.offBT.style.display = "";
			//this.closeBT.style.display = "none";
			//this.body.style.display = "block";
			//this.bk.style.display = "block";
			this.isListShow = true;
		}
	},
	closeList : function() { //hide ul & removeevent & timer remove
		if(this.timer) {
			window.clearInterval(this.timer);
			this.timer = null; //ÇØÁà¾ßÇÔ
			//this.input.oldValue = "";
			this.input.oldValue = this.input.value;
		}
		this.curIndex = -1;
		if(this.isListShow) {
			//this.bk.style.display = "none";
			//this.list.style.display = "none";
			this.isListShow = false;
		}
	},
	removeList : function() { //remove ul
		this.listCnt = 0;
		this.closeBox();
	},
	closeBox : function() {
		this.box.style.display = "none";
		this.closeInfo();
		this.closeList();
	},
	iconChange : function(isOn) {
		this.icon.style.backgroundPosition=(isOn)?"0 bottom":"0 0";
	},
	selectItem : function() {
		if (!this.isListShow) {
			if (typeof(this.btnFunc) == "function") 
				this.btnFunc();
			return;
		}		
		if(this.curIndex >= 0 && this.curIndex < this.listCnt) { //¼±ÅÃÇ×¸ñÀÌ ÀÖ´Â °æ¿ì
			this.selectItemOne(-1);
		}
		else {
			this.selectItemAuto();
		}
	},
	selectItemOne : function(idx) { //mousedown or enter click½Ã È£Ãâ -> StockInsert & CloseStockList
		if(idx >= 0) this.curIndex = idx;
		var li = this.list.childNodes[this.curIndex];
		this.input.value = li.dataName;
		this.input.code = li.dataCode;
		this.removeList();
		if(typeof(this.btnFunc) == "function") this.btnFunc();
	},
	selectItemAuto : function() { //enter key
		//¾Æ·¡ Ç×¸ñ¿¡ 1°³¸¸ ÀÖÀ¸¸é ¼±ÅÃÇÒÇÊ¿ä¾øÀÌ ¹Ù·Î code°ª ³Ö¾îÁÖ±â
		if(this.listCnt == 1) {
			var li = this.list.firstChild;
			this.input.value = li.dataName;
			this.input.code = li.dataCode;
		}
		else {
		//¾Æ·¡ Ç×¸ñ¿¡¼­ Á¸ÀçÇÏ´Â°Ô ÀÖÀ¸¸é ¼±ÅÃÇÒÇÊ¿ä¾øÀÌ ¹Ù·Î code°ª ³Ö¾îÁÖ±â && ¿ì¼±ÁÖ  ¾Æ´Ñ°Ô 1°³ÀÎÁö Ã¼Å©
			var equalItem = null;
			var noPrefer = [];
			var cnt = this.listCnt;
			for(i=0;i<cnt;++i) {
				var li = this.list.childNodes[i];
				if(this.input.value == li.dataName || this.input.value == li.dataCode) {
					equalItem = li;
					break;
				}
				if(li.dataCode.substring(5)=="0") noPrefer.push(li);
			}
			
			if(equalItem || noPrefer.length == 1) {
				var target = equalItem || noPrefer[0];
				this.input.value = target.dataName;
				this.input.code = target.dataCode;				
			}
		}
		if(this.input.code && this.input.value.length>0) { //¹é½ºÆäÀÌ½º µîÀ¸·Î °ªÀ» ¾ø¿¡´Â °æ¿ì, code°ªÀº ³²¾Æ ÀÖÀ¸¹Ç·Î ÇÔ²² checkÇØÁÜ
			this.removeList();
		}
		if(typeof(this.btnFunc) == "function") this.btnFunc();
	}
}

function isASP(){
	var flag = true;
	var url = location.href;
	// asp ÆäÀÌÁö°¡ ¾Æ´Ñ µµ¸ÞÀÎÀ» ±¸ºÐ
	if( ( url.indexOf( "http://realestate.daum.net/mortgage/" ) == -1 && url.indexOf( "http://realestate.daum.net/" ) == 0 ) 
		|| url.indexOf( "http://maemul.realestate.daum.net/" ) == 0 
		|| url.indexOf( "http://neo.realestate.daum.net/" ) == 0 
		|| url.indexOf( "http://event.finance.daum.net/" ) == 0 
		|| url.indexOf( "http://danjiboard.realestate.daum.net/" ) == 0 
		|| url.indexOf( "http://board.realestate.daum.net/" ) == 0 
		|| url.indexOf( "http://qna.finance.daum.net/" ) == 0 ){
		flag = false;
	} 
	return flag;
}
function isEUCKR(){
	var flag = false;
	var url = location.href;
	/*
	if( url.indexOf("http://qna.finance.daum.net/") == 0 ){
		flag = true;
	}
	*/
}
function goPage( url ){top.location.href = url;}

/*------------ÀÌº¥Æ®¿ë-------------------*/
//UI.addEvent( window, "load", checkIconPoint );
var popupEvent = null;
function checkIconPoint(){
	try
	{
/*
		if( getCookie("estateIcon") == "off" ) { return false; }
		if( UI.$("ICON_DD") != null && iconPoint ){
			var iconDiv = UI.$("ICON_DD");
			iconDiv.className = "ddIcon";
			iconDiv.id = "ICON_DD";

			// ·Î±×ÀÎ ¶Ç´Â ¼³Á¤ÀÌ ¾ÈµÈ°æ¿ì µÕµÕ¾ÆÀÌÄÜ//http://fn.daum-img.net/image/estate/event/20080808/icon_search.gif
			if( iconPoint == 0 ){
				iconDiv.innerHTML = "<img src='http://fn.daum-img.net/image/estate/event/20080808/icon2_1.gif' onclick='popupPromotionInit();'><br><img src='http://fn.daum-img.net/image/estate/event/20080808/icn_close.gif' class='close' onclick='closePromotionIcon();'>";
			} else if( iconPoint == -1 ){
				iconDiv.innerHTML = "<img src='http://fn.daum-img.net/image/estate/event/20080808/icon2_1.gif' onclick='popupPromotion();'><br><img src='http://fn.daum-img.net/image/estate/event/20080808/icn_close.gif' class='close' onclick='closePromotionIcon();'>";
			// ¼³Á¤ÀÌÈÄ´Â ±Ý¾×¾ÆÀÌÄÜ
			} else if( iconPoint > 0 ){
				var url = location.href;
				url = encodeURIComponent( url );
				iconDiv.innerHTML = "<img src='http://fn.daum-img.net/image/estate/event/20080808/icon_"+iconPoint+".gif' onclick='popupPromotion(encodeUrl);'><br><img src='http://fn.daum-img.net/image/estate/event/20080808/icn_close.gif' class='close' onclick='closePromotionIcon();'>";
			}
			if( iconDiv.innerHTML != "" ){
				//var con = UI.$("CONTENTS");
				//con.appendChild( iconDiv );
				var top = parseInt( Math.random()*400 ) +20;
				var left = parseInt( Math.random()*650 ) +10;
				iconDiv.style.left = left+"px";
				iconDiv.style.top = top+"px";
				iconDiv.style.display = "block";
			}
			
		}
*/
	} catch (e)	{
		
	}
}
function closePromotionIcon( type ){
	try
	{
		var obj = UI.$("ICON_DD");
		if( type != "click" &&  confirm( "ÀÌ ÀÌ¹ÌÁö°¡ 24½Ã°£ µ¿¾È ¾È º¸ÀÌ±æ ¿øÇÏ¼¼¿ä?" ) ){
			for(var i in sug.cookie.domain) setCookie("estateIcon","off",1,sug.cookie.domain[i]);
		}
		obj.style.display = "none";	
	} catch (e)	{}
}
function popupPromotion(encodeUrl){
	var link = "http://event.finance.daum.net/getpoint.daum?url="+encodeUrl;
	var name = "estatePromotion";
	try{
		popupEvent.close();	
	}catch (e){}

	var option = { scrollbars:"no",status:"no",width:"650",height:"510" };
	popupEvent = popup( link, name, option );
	popupEvent.focus();
	closePromotionIcon("click");
}
function popupPromotionSetup(){
	try{
		popupEvent.close();	
	}catch (e){}
	var option = { scrollbars:"no",status:"no",width:"650",height:"370" };
	popupEvent = popup("http://event.finance.daum.net/getpoint.daum",name,option);
	popupEvent.focus();
}
function popupPromotionInit(){
	popupPromotionOnStep( 1, 1 );
}
function popupPromotionState(){
	try{
		popupEvent.close();	
	}catch (e){}
	var option = { scrollbars:"no",status:"no",width:"650",height:"370" };
	popupEvent = popup("http://event.finance.daum.net/getpoint.daum",name,option);
	popupEvent.focus();
}
function popupPromotionClick(){
	popupPromotionOnStep( 2, 1 );
}
function popupPromotionBrand(){
	//popupPromotionOnStep( 2, 3 );
	var name = "estatePromotion";
	var option = { scrollbars:"yes",status:"no",width:"667",height:"510" };
	try{
		popupEvent.close();	
	}catch (e){}
	popupEvent = popup("http://event.finance.daum.net/brand.daum",name,option);
	popupEvent.focus();
	closePromotionIcon("click");
}

function popupPromotionOnStep( group, seq ){
	group = group.toString();
	seq = seq.toString();

	var name = "estatePromotion";
	var url = "";
	var option = "";

	switch( group ){
	case "1":
		option = {width:450,height:340,scrollbars:'no',status:"no"};
		switch( seq ){
		case "1":
			url = "popup1_1.html";
			break;
		case "2":
			url = "popup1_2.html";
			break;
		case "3_1":
			url = "popup1_3.html";
			break;
		case "3_2":
			url = "popup1_3_type2.html";
			break;
		case "4_1":
			url = "popup1_4.html";
			break;
		case "4_2":
			url = "popup1_4_type2.html";
			break;
		case "5":
			url = "popup1_5.html";
			break;
		}
		break;
	case "2":
		option = {width:650,height:370,scrollbars:'no',status:"no"};
		switch( seq ){
		case "1":
			url = "popup2_1.html";
			break;
		case "2":
			url = "popup2_2.html";
			break;
		case "3":
			url = "popup2_3.html";
			option.scrollbars = "yes";
			option.width = "667px";
			option.height = "600px";
			break;
		case "4":
			url = "popup2_4.html";
			option.scrollbars = "yes";
			option.width = "667px";
			option.height = "600px";
			break;
		}
		break;
	}
	try{
		popupEvent.close();	
	}catch (e){}
	popupEvent = popup("http://event.finance.daum.net/vm/estate/080903/html/"+url,name,option);
	popupEvent.focus();
	closePromotionIcon("click");

}














// ºÎµ¿»ê 2.0¿ë ¿ìÃø µû¶ó´Ù´Ï´Â ½½¶óÀÌ´õ





UI.WingSlider = function( option ){
	this.options = {
		smooth : false, // ºÎµå·´°Ô ÀÌµ¿
		baseY : 147, // ÃÖ¼Ò ³ôÀÌ
		trgY : 147, // ÀÌµ¿ÇÒ ³ôÀÌ
		checkTime : 500, // ½ºÅ©·ÑÀÌº¥Æ® ¹ß»ý ÈÄ ÇÔ¼ö½ÇÇà°£ ½Ã°£ ( ¹Ð¸®ÃÊ )
		speed : 0.2, // ÀÌµ¿ ½ºÇÇµå ( 0.0 < speed < 1.0 )
		iTime : 100, // ½ºÅ©·Ñ À§Ä¡°¨Áö interval ½Ã°£
		isMoving : false // ÀÌµ¿Áß flag
	}
	Object.extend(this.options, option); // this.options °ªµéÀ» optionº¯¼ö°ª¿¡ º¹»ç(´ëÀÔ)
	
	this.objWing = UI.$("LaySlideWing");
	if ( this.objWing ){
		UI.addEvent( window, "scroll", this.run.bindAsEventListener(this) );
		this.run();
	}
}
UI.WingSlider.prototype = {
	run : function (){
		if ( this.objWing == null ) return false;
		var brow = UI.getBrowser();
		var pageYOffset = document.documentElement.scrollTop;

		this.options.trgY = pageYOffset; // ÃÖÃÊ ¸ñÀûÁö ¼³Á¤
		if ( pageYOffset <= this.options.baseY ){ // ÃÖ¼Ò ³ôÀÌº¸´Ù ÀûÀ¸¸é ±âº»°ª Àû¿ë
			this.objWing.style.top = this.options.baseY + "px";
		} else {
			if ( this.options.smooth == false ) { // ÀÌº¥Æ®¿Í µ¿½Ã¿¡ ÀÌµ¿
				this.objWing.style.top = pageYOffset + "px";
			} else { // ·¹ÀÌ¾î ºÎµå·´°Ô ÀÌµ¿
				if ( this.options.isMoving == false ){ // ÀÌµ¿ÁßÀÌ ¾Æ´Ò¶§¸¸ 1È¸ ½ÇÇà
					setTimeout( this.smoothMove.bind(this), this.options.checkTime );
					this.options.isMoving = true;
				}
			}
		}
		
	},
	smoothMove : function(){
		var posY = this.objWing.offsetTop; // ÇöÀç ³ôÀÌ
		posY += this.options.speed*( this.options.trgY - posY ); // ÀÌµ¿°ª


		if ( posY < this.options.baseY ){ // ±âº»³ôÀÌ °íÁ¤
			posY = this.options.baseY;
		}

		

		this.objWing.style.top = posY +"px"; 
		if ( posY == this.options.trgY ){ // ÀÌµ¿¿Ï·á
			this.options.isMoving = false; 
		} else { // ¿Ï·á°¡ ¾Æ´Ï¸é Àç±ÍÈ£Ãâ
			setTimeout( this.smoothMove.bind(this), this.options.itime );
		}
	}
}

//<script type="text/javascript">renderWingSlider();</script>

// ÃÖ±Ù°Ë»ö / ÆòÇü°è»ê±â ½ºÅ©·Ñ ½½¶óÀÌ´õ
var pCalcForm = null; // °è»ê±â Àü¿ª
function renderWingSlider(){
	var layout = '\
	<h3>ÃÖ±Ù°Ë»ö ¸Å¹°(½Ã¼¼) / ÆòÇü °è»ê±â</h3>\
	<div id="LaySlideWing">\
		<div id="RecentBox">\
			<div class="slideBox boxT"></div>\
			<div class="slideBox boxM"><div id="RSAreaT_MS"></div></div>\
			<div class="slideBox boxB"></div>\
		</div>\
		<div id="CalcBox">\
			<div class="slideBox boxT calcTop"><div class="icoCalc fs_small fw_b">ÆòÇü°è»ê±â</div></div>\
			<div class="slideBox boxM">\
				<form name="PyeongCalcForm" id="PyeongCalcForm" action="" onsubmit="pCalcForm.calculate();return false;">\
					<input type="text" value="" id="PCalcM" size="7" class="fs_small" maxlength="20" onfocus="pCalcForm.setFocus(this);"> <span id="PCalcUnit">§³</span>\
					<input type="submit" id="PCalcButton" class="typeBtn" value="< °è»êÇÏ±â >" onclick="return gLink(null, \'RTES\', \'1\', \'1\');">\
					<input type="text" value="" id="PCalcP" size="7" class="fs_small" maxlength="15" onfocus="pCalcForm.setFocus(this);"> <span id="PCalcUnit">Æò</span>\
				</form>\
			</div>\
			<div class="slideBox boxB"></div>\
		</div>\
	</div>';

	document.write( layout );

	new UI.WingSlider( {smooth:true,baseY:200,trgY:100} );
};



