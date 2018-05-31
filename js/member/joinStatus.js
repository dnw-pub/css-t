;(function($){
	$.danawaMemberJoinStatusDisplay = function(joinStatus) {
		var now = new Date();
		var uniqParam = "p"+now.getMilliseconds()+now.getTime();
		$.ajax({
			type 	: "post",
			url 	: "/globalData/memberJoin/joinStatus.ajax.php?"+uniqParam+"=1",
			data 	: {
						joinStatus	: joinStatus,
						returnUrl	: location.href
					},
			cache 	: false,
			//timeout : 1000,
			success : function (data, textStatus){
						$("#layerMemberJoinInfomation").html(data);
					}
		});
	}
})(jQuery);