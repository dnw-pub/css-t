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

SlideMenu.Slide.prototype = {
	RefreshStaticMenu : function ()	{
		var stmnStartPoint, stmnEndPoint, stmnRefreshTimer,stmnScrollAmount;

		stmnStartPoint	= parseInt(this.obj.style.top, 10);
		stmnEndPoint	= (parent.parent.document.body.scrollTop + this.nYY) - (this.obj.offsetHeight + 200);
		
		if (stmnEndPoint < this.nY) stmnEndPoint = this.nY;

		stmnRefreshTimer = this.nActiveSpeed;

		if ( stmnStartPoint != stmnEndPoint )
		{
			stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 10 );
			this.obj.style.top = parseInt(this.obj.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount );
			stmnRefreshTimer = this.nScrollSpeed;
		}

		this.nTimer = setTimeout (this.sName+".RefreshStaticMenu();", stmnRefreshTimer);
		//alert(this.nTimer);
	},

	Start : function (obj) {
		this.obj = obj;
		this.obj.style.left = this.nX;
		this.obj.style.top	= parent.parent.document.body.scrollTop + this.nZ;
		this.RefreshStaticMenu();
	}
}
//-->