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

			adLAY.style.width		= adTBL.offsetWidth;
			adLAY.style.height		= adTBL.offsetHeight;

			adTBL.style.top			= this.getRealOffsetTop(adLAY);// adLAY.offsetTop;
			adTBL.style.left		= this.getRealOffsetLeft(adLAY); //adLAY.offsetLeft;

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
