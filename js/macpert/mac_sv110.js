// Script Version [2014.07.23]
//-------------------------------------------------------------------//
var mac30_sv = "11.5";

// 1. Server properties
var mac30_server_domain = "mctech.mac20.com";
var mac30_visit_server_url = "rawdataVisit.do";
var mac30_conv_server_url = "rawdataConv.do"; 

//2.Site Encryption Key 
var mac30_site_id = "tlF9k4yoYr8";

//3.Site id for Unique key
var mac30_site_id_unique_key = "50000";  

//4. Sub domain 
var mac30_subdomain_enable = "Y";
var mac30_subdomain_url = ".danawa.com";

//5. Cookie Expire Date 
var mac30_cookie_expire_date = "30";

//6. AD DELI(mac key parameter)
var mac30_ad_url_delimeter = "mac_ad_key";

//7. Cookie Name
var mac30_other_value_cookie_name = "_m_OV"  + mac30_site_id ; 
var mac30_visit_cookie_name = "_m_VI" + mac30_site_id ;

//-------------------------------------------------------------------//


// Constant
var  MAC_VISITOR_ORDINAL = 0 ;
var  MAC_BEFORE_KEY_ID_ORDINAL = 1 ;
var  MAC_CURRENT_KEY_ID_ORDINAL = 2 ;
var  MAC_LAST_AD_VISIT_ORDINAL = 3;


// Create Unique Key
var mac30_generatedUniqKey = new mac30_getUniqKey();
mac30_generatedUniqKey.setType('');
mac30_generatedUniqKey.setStr(12);

function mac30_getParameter(name)
{
	var paraName = name + "=";
	var URL = "" + self.document.location.href;

	if(URL.indexOf(paraName)!=-1)
	{
		var x=URL.indexOf(paraName)+paraName.length;
		var y=URL.substr(x).indexOf("&");
		if(y!=-1) return URL.substring(x,x+y);
		else return URL.substr(x);
	}
	return "";
}

// Get Unique Key
function mac30_getUniqKey() {

	this.str = '';
	this.pattern = /^[a-zA-Z0-9]+$/;

	this.setStr = function(n) {
		if(!/^[0-9]+$/.test(n)) n = 0x10;
		this.str = '';

		for(var i=0; i<n; i++) {
			this.rndchar();
		}
	}

	this.setType = function(s) {
		switch(s) {
			case '1' : this.pattern = /^[0-9]+$/; break;
			case 'A' : this.pattern = /^[A-Z]+$/; break;
			case 'a' : this.pattern = /^[a-z]+$/; break;
			case 'A1' : this.pattern = /^[A-Z0-9]+$/; break;
			case 'a1' : this.pattern = /^[a-z0-9]+$/; break;
			default : this.pattern = /^[a-zA-Z0-9]+$/; break;
		}
	}

	this.getStr = function() {
		return this.str;
	}

	this.rndchar = function() {
		var rnd = Math.round(Math.random() * 1000);

		if(!this.pattern.test(String.fromCharCode(rnd))) {
			this.rndchar();
		} else {
			this.str += String.fromCharCode(rnd);
		}
	 }
}

// Get Unique ID
function mac30_getUniqID(dcnt)
{
	var un=(new Date().getTime()).toFixed();

	if(un.length>=dcnt){
		var diff = un.length - dcnt;
		un = un.substring(0,un.length-diff);
	}else{

		while(un.length<dcnt){
			var ran_dig = Math.floor(Math.random()*9);
			un=""+un+ran_dig+"";
		}
	}

	return un;
}


// 현재 시간을 구한다
function mac30_nowTime()
{
	return un=(new Date().getTime()).toFixed();
}


// encodeURI 함수 실행되지 않으면 로직으로 실행됨
function mac30_escapeStr(str)
{
	var str, ch;
	var bEncURI = "N";
	eval("try{bEncURI=encodeURI('O');}catch(_e){ }" );
	if( bEncURI == "O" ) str=encodeURI(str);
	else str = escape(str);
	str=str.split("+").join("%2B");
	str=str.split("/").join("%2F");
	str=str.split("&").join("%26");
	str=str.split("?").join("%3F");
	str=str.split(":").join("%3A");
	str=str.split("#").join("%23");
	return str;
}

// Cookie Set
function mac30_setCookie(name, value, expire)
{
	var today=new Date();
	today.setDate(today.getDate()+parseInt(expire));
	
	if (expire == 0)
	{
		if (mac30_subdomain_enable == "Y") document.cookie=name+"="+escape(value)+";path=/;domain=" + mac30_subdomain_url + ";";
		else document.cookie=name+"="+escape(value)+";path=/;";
	}
	else
	{
		if (mac30_subdomain_enable == "Y") document.cookie=name+"="+escape(value)+";path=/;expires="+today.toGMTString()+";domain=" + mac30_subdomain_url + ";";
		else document.cookie=name+"="+escape(value)+";path=/;expires="+today.toGMTString()+";";
	}
}

// Cookie Get
function mac30_getCookie(name)
{
	var cookieName=name+"=";
	var x=0;
	while(x<=document.cookie.length)
	{
		var y=(x+cookieName.length);
		if(document.cookie.substring(x,y)==cookieName)
		{
			if((endOfCookie=document.cookie.indexOf(";",y))==-1) endOfCookie=document.cookie.length;
			return unescape(document.cookie.substring(y,endOfCookie));
		}
		x=document.cookie.indexOf(" ",x)+1;
		if(x == 0) break;
	}
	return "";
}


// -- 유입 측정 -- //
function mac30_visitSend(){

	try{

		var NOW_CKID = mac30_getParameter(mac30_ad_url_delimeter);		
		
		if(NOW_CKID==null || NOW_CKID==""){
			return;
		}else{

			mac30_generatedUniqKey = mac30_generatedUniqKey.getStr();
			if(mac30_generatedUniqKey==null || mac30_generatedUniqKey==""){
				mac30_generatedUniqKey = mac30_getUniqID(30);
				if(NOW_CKID!=null && NOW_CKID!=""){
					mac30_generatedUniqKey = mac30_generatedUniqKey.substring(0, mac30_generatedUniqKey.length-NOW_CKID.length)+""+NOW_CKID;
				}
			}else{
				mac30_generatedUniqKey = (new Date().getTime()).toFixed()+""+mac30_generatedUniqKey;
				if(NOW_CKID!=null && NOW_CKID!=""){
					mac30_generatedUniqKey = mac30_generatedUniqKey.substring(0, mac30_generatedUniqKey.length-NOW_CKID.length)+""+NOW_CKID;
				}
			}
			
			var BKID = mac30_getCookieArrayValue( MAC_CURRENT_KEY_ID_ORDINAL );
			
			visit_func(NOW_CKID, BKID);		
		}
	}catch(e){}
}

// -- 유입 처리 함수 -- //
function visit_func(CKID, BKID)
{
	VI = mac30_generatedUniqKey;	

	var VT = mac30_getCookieArrayValue(MAC_VISITOR_ORDINAL);
	
	if(VT == "undefined" || VT=="" || !VT) VT = VI;

	mac30_setCookie(mac30_visit_cookie_name, VI, 0);

	var mac30_value_array=new Array();		
	mac30_value_array[MAC_VISITOR_ORDINAL] = VT;
	mac30_value_array[MAC_CURRENT_KEY_ID_ORDINAL] = CKID;
	mac30_value_array[MAC_BEFORE_KEY_ID_ORDINAL] = BKID;
	mac30_value_array[MAC_LAST_AD_VISIT_ORDINAL] = mac30_nowTime();
	
	mac30_setCookie(mac30_other_value_cookie_name, mac30_value_array, mac30_cookie_expire_date);
	
	var RP = self.document.referrer;
	if (RP == "undefined"){
		RP = "";
	}else if (!RP){
		RP = "";
	}

	var CP = self.document.location.href;
	if (CP.substr(0,4) == "file"){
		CP = "";
	}else if (!CP){
		CP = "";
	}
	
	var prtc = CP.indexOf("https") != -1?"https://":"http://";
	var ReturnUrl = prtc + mac30_server_domain +"/"+ mac30_visit_server_url + "?SITEID=" + mac30_escapeStr(mac30_site_id) + "&VISITID=" + VI;
	ReturnUrl += "&VISITORID=" + VT + "&RP=" + mac30_escapeStr(RP) + "&CP=" + mac30_escapeStr(CP) + "&CKID="+CKID+"&BKID="+BKID;
	ReturnUrl += "&SV=" +mac30_sv+ "&COOKIEDIV=Y";			

	var mac30_IMG = new Image;
	mac30_IMG.src = ReturnUrl;
	
}
// -- 유입 측정 end -- //


//-- 쿠키 배열 값 가져오기 --//
function mac30_getCookieArrayValue(ordinal){
	var cookieValue = mac30_getCookie(mac30_other_value_cookie_name);
 	var items  =  cookieValue.split(',');
	
	if ( (typeof items[ordinal]) == "undefined"  ){	
		return "";
	}else{		
		return items[ordinal];
	}
}

// -- 전환 측정 -- //
function mac30_convSend(mCN,mCK,mCA,mCDN,mCDE,mCDC,mCDT,mETC1 ){
	
	//Local Variable
	var CN = mCN;
	var CK = mCK;
	var CA = mCA;
	var CDN = mCDN;
	var CDE = mCDE;
	var CDC = mCDC;
	var CDT = mCDT;
	var ETC1 = mETC1;
	
	try{		
		var VT = mac30_getCookieArrayValue(MAC_VISITOR_ORDINAL);		
		
		if(VT == "undefined" || VT=="" || !VT){
			return;			
		}

		var CKID = "";
		var BKID = "";
		var LAST_AD_VISIT_DIFF = 0;

		if ((typeof CN) != "undefined" && CN.length != 0 && CN!="" && CN!=null) {

			var VI = mac30_getCookie(mac30_visit_cookie_name);
		
			if(VI == null || VI==""){
				
				// -----  재방문  ----- //
				try{
					mac30_generatedUniqKey = mac30_generatedUniqKey.getStr();
				}catch(e){				
					mac30_generatedUniqKey = new mac30_getUniqKey().getStr();
				}
				
				if(mac30_generatedUniqKey==null || mac30_generatedUniqKey==""){				
					mac30_generatedUniqKey = mac30_getUniqID(30);
				}else{
					mac30_generatedUniqKey = (new Date().getTime()).toFixed()+""+mac30_generatedUniqKey;				
				}
		
				VI = mac30_generatedUniqKey;

				CKID = "";
				BKID = mac30_getCookieArrayValue( MAC_CURRENT_KEY_ID_ORDINAL );
				
				var lavdTmp = mac30_getCookieArrayValue( MAC_LAST_AD_VISIT_ORDINAL );
				
				if(lavdTmp!=null && lavdTmp!=""){
					LAST_AD_VISIT_DIFF = Math.round((mac30_nowTime() - lavdTmp)/1000);
				}
				
				if(CKID=="" && BKID==""){
					return;
				}

			}else{
			
				// ----- 광고 방문 ----- //
				CKID = mac30_getCookieArrayValue(MAC_CURRENT_KEY_ID_ORDINAL );
				BKID = mac30_getCookieArrayValue( MAC_BEFORE_KEY_ID_ORDINAL  );

				if(CKID=="" && BKID==""){
					return;
				}
			
			}

			var RP = self.document.referrer;
			if (RP == "undefined"){
				RP = "";
			}else if (!RP){
				RP = "";
			}

			var CP = self.document.location.href;
			if (CP.substr(0,4) == "file"){
				CP = "";
			}else if (!CP){
				CP = "";
			}
			
			var prtc = CP.indexOf("https") != -1?"https://":"http://";
			var ReturnUrl = prtc + mac30_server_domain +"/"+ mac30_conv_server_url + "?SITEID=" + mac30_escapeStr(mac30_site_id) + "&VISITID=" + VI;
			ReturnUrl += "&VISITORID=" + VT + "&RP=" + mac30_escapeStr(RP) + "&CP=" + mac30_escapeStr(CP) + "&CKID="+CKID+"&BKID="+BKID;
			ReturnUrl += "&SV=" +mac30_sv+ "&COOKIEDIV=Y&LAST_AD_VISIT_DIFF="+LAST_AD_VISIT_DIFF;		
			
			if ((typeof CN) != "undefined" && CN.length != 0) {ReturnUrl += "&CN=" + mac30_escapeStr(CN);}
			if ((typeof CK) != "undefined" && CK.length != 0) {ReturnUrl += "&CK=" + CK;}
			if ((typeof CA) != "undefined" && CA.length != 0) {ReturnUrl += "&CA=" + CA;}
			
			if ((typeof CDN) != "undefined" && CDN.length != 0) {ReturnUrl += "&CDN=" + mac30_escapeStr(CDN);}
			if ((typeof CDT) != "undefined" && CDT.length != 0) {ReturnUrl += "&CDT=" + mac30_escapeStr(CDT);}
			
			if ((typeof CDE) != "undefined" && CDE.length != 0) {ReturnUrl += "&CDE=" + CDE;}
			if ((typeof CDC) != "undefined" && CDC.length != 0) {ReturnUrl += "&CDC=" + CDC;}			
			if ((typeof ETC1) != "undefined" && ETC1.length != 0) {ReturnUrl += "&ETC1=" + ETC1;}
			if ((typeof ETC2) != "undefined" && ETC2.length != 0) {ReturnUrl += "&ETC2=" + ETC2;}
			if ((typeof ETC3) != "undefined" && ETC3.length != 0) {ReturnUrl += "&ETC3=" + ETC3;}
			if ((typeof CANCELDIV) != "undefined" && CANCELDIV.length != 0) {ReturnUrl += "&CANCELDIV=" + CANCELDIV;}
			
			var mac30_IMG = new Image();
			mac30_IMG.src = ReturnUrl;
			
		}

	}catch(e){}

}
// -- 전환 측정 end-- //


function mac30_sendInfo(){
	// Parameter에 mac_ad_key가 있다면 유입 정보 데이터 전송
	mac30_visitSend();
	
	// CN 값이 있다면 데이터 전송
	if ((typeof CN) != "undefined" && CN.length != 0 && CN!="" && CN!=null) {			
		mac30_convSend(CN,CK,CA,CDN,CDE,CDC,CDT,ETC1);			
	}
}

function mac30_conv_buy(mCA, mCDN, mCDT){
	var mCN = "E0gSvXgThWM=";	
	mac30_convSend(mCN,'',mCA,mCDN,1,mCA,mCDT,'');	
}

mac30_sendInfo();