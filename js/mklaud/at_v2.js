var mklaud = (function() {
		
	var root = this;
	var getDomainList;
	var getDomainName;
	var visitType ;
	var mobileNum;
	if(location.protocol == "https:"){
		adUrl = "https://at.mklaud.com";
	}else{
		adUrl = "http://at.mklaud.com";
	}
	var mkCategory1 = mk_category1;
	var mkCategory2 = mk_category2;
	var mkTag = mk_tag;
	var mkCurLocation = window.location;
	
	var initModule = function() {
		// refferer
		//visitType = getVisitType();
		
		// parameter
		try {
		    if (typeof(parent) != "undefined") {
		
		        if (typeof(parent.parent) == "undefined") {
		            mkCurLocation = parent.window.location;
		        }
		        else {
		            mkCurLocation = parent.parent.window.location;
		        }
		        if (mkCurLocation == "") {
		            mkCurLocation = window.location;
		        }
		    }
		} catch (e) {
		    mkCurLocation = window.location;
		}
		
		// Call Log		
		callLog();
	};

	var callLog = function() {
		// Check Mobile				
		mobileNum = isMobile();

		var randNum = getRandom();
		var url = adUrl+"/at/at_log_v2.php?min=_chcjswo_"+ randNum +"_dlalsdyd_";
		url += "&mobile=" + mobileNum;
		url += "&ref=" + encodeURIComponent(document.referrer);	
		url += "&q=" + encodeURIComponent(window.location.search.substring(1));
		url += "&mk_category1="+ mkCategory1;
		url += "&mk_category2="+ mkCategory2;
		url += "&mk_tag="+ mkTag;

		if (window.location.hostname.toLowerCase().indexOf("mklaud.com") !== -1) {
			url += "&adItemCategory="+ adItemCategory;
		}
			
		var b = document.body;
		var c = document.createElement("div");
		c.setAttribute("id", "mklaudDiv");
		c.style.display = "none";
		b.appendChild(c);            
		
		var p = document.createElement('img');
		p.setAttribute("id", "mklaudFrame");
		p.setAttribute("alt", "");
		p.width = p.height = '0';
		p.style.display = 'none';
		p.src = url;
		c.appendChild(p);
	};

	/*
	var getVisitType = function() {	
		var visitType;
		var ref = document.referrer;
		var ref_domain;
		var domainList = getDomainList();		
			
		var element = document.createElement('a');
		element.href = ref;
		var ref_host = element.hostname;	
		
		var ref_domain = getDomainName(domainList, ref_host);
		var this_domain = getDomainName(domainList, window.location.hostname);
	
		if (ref == '')  {
			// manual : Direct access through typing 
			visitType = "manual"; 
		}	
		else if (ref_domain.toLowerCase().indexOf("mklaud.com") !== -1) {
			// click : Ad click
			visitType = "click";
		}
		else if (ref_domain == this_domain) {
			// Same site access
			visitType = "self";		
		}
		else if (ref_domain != this_domain) {
			// other : Another access
			visitType = "other";	
		}
		else {		
			visitType = "none";								
		}
	
		return visitType;
	};
	*/

	var getDomainList = function () {
		var domainList = new Array();
		domainList.push(".co.kr");
		domainList.push(".pe.kr");
		domainList.push(".re.kr");
		domainList.push(".ne.kr");
		domainList.push(".kr");
		domainList.push(".tv");
		domainList.push(".me");
		domainList.push(".cc");
		domainList.push(".com");
		domainList.push(".net");
		domainList.push(".org");
		domainList.push(".biz");
		domainList.push(".info");
		domainList.push(".name");
		domainList.push(".tel");
		
		return domainList;
	};

	var getDomainName = function (domainList, hostName) {	
		var domain = hostName;
		for(var i=0; i < domainList.length; i++) {
			
			var last_index = hostName.lastIndexOf(domainList[i]);
			
			if (hostName.substring(last_index) == domainList[i]) {
				var subdomain_index = hostName.lastIndexOf('.', last_index-1);
		                  
				domain = hostName.substr(subdomain_index+1);
				//alert(domain);        
			}
		}

		return domain;	
	};
	
	var getRandom = function () {
		var d = new Date();
		var sec = d.getSeconds();	
		var num = sec + "" + Math.floor(Math.random() * 100);
		
		return num; 
	};

	var isMobile = function () {	
		var mobileNum = 0;
		var mpiaAgent = navigator.userAgent.toLowerCase();
		var mobilePhones = new Array('iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile');
		for(var i=0;i<mobilePhones.length;i++){
			if(mpiaAgent.indexOf(mobilePhones[i]) != -1){
				if(mobilePhones[i] == 'iphone'){
					mobileNum = "1";
				}else if(mobilePhones[i] == 'android'){
					mobileNum = "2";
				}else if(mobilePhones[i] == 'blackberry'){
					mobileNum = "3";
				}else{
					mobileNum = "4";
				}
			}	
		}
		
		return mobileNum;
	};
	
	return {
        init : initModule
    };
})();

mklaud.init();