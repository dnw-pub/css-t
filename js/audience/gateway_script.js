// AudienceScience Async Data Collection Tag 
try {	
	function asi_getASIParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
    function DM_prepClient(csid, client) {
		client.DM_addEncToLoc("asi_category",  asi_getASIParameterByName('cate').trim().substring(0,2));
    }
}
finally {
	// nothing
}

(function() {
var csid = "F09828";
var bpid = "danawa_kr";
var e = document.createElement("script");
var s = document.getElementsByTagName("script")[0];
e.src = "//js.revsci.net/gateway/gw.js?auto=t&csid=" + csid + "&bpid=" + bpid;
e.async = true;
s.parentNode.insertBefore(e, s);
})();
// End AudienceScience Data Collection Tag