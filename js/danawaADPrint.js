<!--
var DanawaADPosition =
{
	list : [],
	printAD : function ()
	{
		var len = this.list.length;
		
		for(var i=0; i<len; i++)
		{
			var adLAY = document.getElementById('LAY_AD_' + this.list[i]);
			var adTBL = document.getElementById('TBL_AD_' + this.list[i]);

			adTBL.style.visibility	= 'hidden';
			adLAY.style.visibility	= 'hidden';

			adLAY.style.position	= "relative";
			adTBL.style.position	= "absolute";

			adLAY.style.width		= adTBL.offsetWidth + "px";
			adLAY.style.height		= adTBL.offsetHeight + "px";

			adTBL.style.top			= this.getRealOffsetTop(adLAY) + "px";// adLAY.offsetTop;
			// 중앙정렬관련하여 상대적 좌표를 요하기 때문 offset으로 다시 교체 Edit By Lee Jong Bum 2009/01/09 
			adTBL.style.left		= adLAY.offsetLeft + "px";// this.getRealOffsetLeft(adLAY); 

			if(adTBL.offsetHeight == 0)
			{
				adTBL.style.visibility	= 'hidden';
				adLAY.style.visibility	= 'hidden';
				adTBL.style.display		= 'none';
				adLAY.style.display		= 'none';
			}
			else
			{
				adLAY.style.visibility	= 'visible';
				adTBL.style.visibility	= 'visible';
			}
		}
	},

	getRealOffsetTop : function (obj)
	{
		return obj ? obj.offsetTop + this.getRealOffsetTop(obj.offsetParent) : 0;
	},

	getRealOffsetLeft : function (obj)
	{
		return obj ? obj.offsetLeft + this.getRealOffsetLeft(obj.offsetParent) : 0;
	}
}
//-->
