<!--
var SlideMenu = new Object();
SlideMenu.Slide = function(sInstName,x,y,yy) {
	this.sName	= sInstName;
	this.obj	= null;
	this.nX		= x;	// 시작 x(왼쪽)좌표 (메뉴가 왼쪽에서 nX 픽셀 떨어진 곳에 보여집니다)
	this.nY		= y;	// 시작 y(위쪽)좌표 (메뉴가 위에서 nY 픽셀 떨어진 곳에 보여집니다)
	this.nYY	= yy;	// 스크롤시 브라우저 위쪽과 떨어지는 거리
	this.nZ		= 200;	// 스크롤 시작위치
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