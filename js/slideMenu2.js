<!--
var SlideMenu = new Object();
SlideMenu.Slide = function(sInstName,x,y,yy) {
	this.sName	= sInstName;
	this.obj	= null;
	this.nX		= x;	// ���� x(����)��ǥ (�޴��� ���ʿ��� nX �ȼ� ������ ���� �������ϴ�)
	this.nY		= y;	// ���� y(����)��ǥ (�޴��� ������ nY �ȼ� ������ ���� �������ϴ�)
	this.nYY	= yy;	// ��ũ�ѽ� ������ ���ʰ� �������� �Ÿ�
	this.nZ		= 200;	// ��ũ�� ������ġ
	this.nActiveSpeed	= 200;
	this.nScrollSpeed	= 10;
	this.nTimer			= null;
}

SlideMenu.Slide.prototype = 
{
	RefreshStaticMenu : function ()	{
		var stmnStartPoint, stmnEndPoint, stmnRefreshTimer,stmnScrollAmount;

		stmnStartPoint	= parseInt(this.obj.style.top, 10);
		stmnEndPoint	= this.GetTopValue() + this.nYY;
		
		if (stmnEndPoint < this.nY) stmnEndPoint = this.nY;

		stmnRefreshTimer = this.nActiveSpeed;

		if ( stmnStartPoint != stmnEndPoint )
		{
			stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
			this.obj.style.top = parseInt(this.obj.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount ) + 'px';
			stmnRefreshTimer = this.nScrollSpeed;
		}

		this.nTimer = setTimeout (this.sName+".RefreshStaticMenu();", stmnRefreshTimer);
	},

	GetTopValue : function () {
		var nTop = 0;
		
		if (typeof(window.pageYOffset) == 'number')
			nTop = parseInt(window.pageYOffset);
		else if (document.body && document.body.scrollTop)
			nTop = parseInt(document.body.scrollTop);
		else if (document.documentElement && document.documentElement.scrollTop)
			nTop = parseInt(document.documentElement.scrollTop);

		return nTop;
	},

	Start : function (obj) {
		this.obj = obj;
		this.obj.style.left = this.nX + 'px';
		this.obj.style.top	= this.GetTopValue() + this.nZ  + 'px';
		this.RefreshStaticMenu();
	}
}
/*
����
	var slide = new SlideMenu.Slide("slide",935,100,20);
	slide.Start("���̾�ID");
*/
//-->
