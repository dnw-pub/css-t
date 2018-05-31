function _slr_log(cmpnyc)
{
	var lay = document.getElementById("LAY_SLRLOG");
	var id = _slr_getCookie('dpalja_id');
	var c1 = _slr_getParameter("cate1", self.document.location.search);
	var c2 = _slr_getParameter("cate2", self.document.location.search);
	var c3 = _slr_getParameter("cate3", self.document.location.search);
	if (c3=="undefined") c3="";
	var c4 = _slr_getParameter("cate4", self.document.location.search);
	if (c4=="undefined") c4="";
	var pc = _slr_getParameter("pcode", self.document.location.search);
	var cc = cmpnyc;
	var pdr = _slr_escape(parent.document.referrer);
	var dr = _slr_escape(document.referrer);
	var _slr_code_base = "/external_partner/slrclub/logProcess.php";
	_slr_code_param = "?id="+id+"&c1="+c1+"&c2="+c2+"&c3="+c3+"&c4="+c4+"&pc="+pc+"&cc="+cc+"&pdr="+pdr+"&dr="+dr;
	lay.innerHTML = '<img src=\"'+_slr_code_base+_slr_code_param+'\" height=\"0\" width=\"0\">';

	document.write(_slr_code_base+_slr_code_param);
}

function _slr_getParameter(name, urlType)
{
	var paraName=name+"=";
	var	URL = ""+urlType;
	var tURL="";

	eval("try{ tURL=top.document.location.search; }catch(_e){}");
	URL=URL+"&"+tURL;
	if (URL.indexOf(paraName)!=-1) {
		var x=URL.indexOf(paraName)+paraName.length;
		var y=URL.substr(x).indexOf("&");
		if(y!=-1) return URL.substring(x,x+y);
		else return URL.substr(x);
	}
	return "";
}

function _slr_getCookie(name)
{
	var cookieName=name+"=";
	var x=0;
	while (x<=document.cookie.length) {
		var y=(x+cookieName.length);
		if (document.cookie.substring(x,y)==cookieName) {
			if((endOfCookie=document.cookie.indexOf(";",y))==-1) endOfCookie=document.cookie.length;
			return unescape(document.cookie.substring(y,endOfCookie));
		}
		x=document.cookie.indexOf(" ",x)+1;
		if (x == 0) break;
	}
	return "";
}

function _slr_escape(_str)
{
	var str, ch;
	var bEncURI = "N";
	eval("try{bEncURI=encodeURI('Y');}catch(_e){ }" );
	if( bEncURI == "Y" ) str=encodeURI(_str);
	else str = escape(_str);
	str=str.split("+").join("%2B");
	str=str.split("/").join("%2F");
	str=str.split("&").join("%26");
	str=str.split("?").join("%3F");
	str=str.split(":").join("%3A");
	str=str.split("#").join("%23");
	return str;
}