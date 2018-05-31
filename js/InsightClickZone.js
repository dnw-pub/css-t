var _L=_las,_d=_las.d,_n=_las.n,_w=_las.w,_m=_las.m;  
var _IFRMCZ =  _d.getElementsByTagName('iframe'); 
var _CZ_IMG_INSIGHT = _las.cIi();   
function getScrollPos() {
    var pos = new Object;
    pos.x=0;
    pos.y=0;  
	if( _d.body && ( _d.body.scrollLeft || _d.body.scrollTop) ) { 
		pos.x = _d.body.scrollLeft; 
		pos.y = _d.body.scrollTop ; 
	}else if( _d.documentElement && (_d.documentElement.scrollLeft || _d.documentElement.scrollTop ) ) { 
		pos.x = _d.documentElement.scrollLeft; 
		pos.y = _d.documentElement.scrollTop; 
	}  
    return pos;
}
function getParentPos(el) { 
	var pos = new Object();
	pos.x = 0;
	pos.y = 0; 
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {  
        pos.x += el.offsetLeft - el.scrollLeft;
        pos.y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
    }
    return pos;
}  
function _cz_mouseClick_Insight(e) {   
/* Get clientX & clientY */
    var ax = 0,ay = 0;
    if(!e) e=_w.event;
    ax=e.clientX;
    ay=e.clientY; 
/* Get scrollLeft & scrollTop */
	var debug = "";
    var pos;   
    if(e.currentTarget && e.currentTarget.frameElement){
/* Point at frame FireFox & Chrom & IE9 ~ */
        pos=getParentPos(e.currentTarget.frameElement); 
    }else{
		var targ = null;
		if( e.srcElement ){    targ = e.srcElement; }
		else if ( e.target ){	targ = e.target;		}   
		var eFrm = null;  
		for(var j=0;j<_IFRMCZ.length;j++){  
			try{  _w.frames[j].location.hostname;  }catch(err){ continue; }   
			if( targ.ownerDocument && 
				targ.ownerDocument.parentWindow &&
				targ.ownerDocument.parentWindow.window == _w.frames[j].window ){ 
				eFrm = _IFRMCZ[j]; 
				break;
			}   
		}   
/* Point at frame ~ IE8 */
		if( eFrm ){ 
			pos=getParentPos(eFrm); 
/* Point at top */  
		}else{
			pos=getScrollPos(); 
		} 
    }  
    if(pos){ ax+=pos.x; ay+=pos.y; }  
    var rx,px,ww;
    /**
    if(typeof(_w.innerWidth)=="number"){ ww=_w.innerWidth; }
    else if(_d.documentElement&&(_d.documentElement.clientWidth||_d.documentElement.clientHeight)){ ww=_d.documentElement.clientWidth; }
    else if(_d.body&&(_d.body.clientWidth||_d.body.clientHeight)){ ww=_d.body.clientWidth; }
    else { ww=0; }
    **/
    var ww=Math.max(
	Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)
	,Math.max(document.body.offsetWidth,document.documentElement.offsetWidth)
	,Math.max(document.body.clientWidth,document.documentElement.clientWidth)
	); 
    rx=Math.round(ax-ww/2);
    px=Math.round(ax/ww*100);
	_CZ_IMG_INSIGHT.src=_scC+"&czno="+_CZN+"&ax="+ax+"&ay="+ay+"&rx="+rx+"&px="+px+"&ww="+ww;  
}   
function addEventListenerToFrame( targetFrameIdx ){  
	var _FS = "",_DOCF="",_CKZS;  
	if( _IFRMCZ.length > 0 ){  
		try{  _w.frames[targetFrameIdx].location.hostname;  }catch(err){ return; }   
		var _fW = _w.frames[targetFrameIdx].window;
		var _fD=_fW.document;
	    if(_fW.addEventListener) _fW.addEventListener("mousedown",_cz_mouseClick_Insight,false);
		else { _fD.attachEvent("onmousedown",_cz_mouseClick_Insight);}  
	}   
}
/* ################## IFRAME SCRIPT INSERT AREA  ###################*/
if( _IFRMCZ.length > 0 ){ 
		if(_w.addEventListener){	_w.addEventListener("load",function(){  	for(var i=0; i < _IFRMCZ.length; i++) {		 addEventListenerToFrame(i);	}  },false);	}
		else{								_w.attachEvent("onload",function(){		for(var i=0; i < _IFRMCZ.length; i++) {		 addEventListenerToFrame(i);	}	});		} 
} 
/* ################### ADD EVENT ###################*/
if(_w.addEventListener)	_d.addEventListener('mousedown',_cz_mouseClick_Insight,false);
else _d.attachEvent('onmousedown',_cz_mouseClick_Insight); 
