<!--
var goPositionPageTop = {
	topButton : function () 
	{
		var Lay = document.getElementById("LAY_GoPositionTop");
		var l = 950;
		var t = document.body.clientHeight + document.body.scrollTop-35;

		Lay.style.top = t+'px';
		Lay.style.left = l+'px';
		Lay.style.display = 'block';
	},
	
	moveButton : function () 
	{
		setInterval('goPositionPageTop.topButton()',20);
	},		

	go : function () 
	{
		var x = document.body.scrollLeft;
		var y = document.body.scrollTop;
		var step = 10;

		while ( (x != 0) || (y != 0) )
		{
			scroll(x,y);
			step += (step * step / 300);
			x -= step;
			y -= step;
			if(x<0) x=0;
			if(y<0) y=0;
		}
		scroll(0,0);
	}
}
var oldLoadHandlerGoTop = window.onload;
window.onload = new Function('{if (oldLoadHandlerGoTop != null) oldLoadHandlerGoTop(); goPositionPageTop.moveButton();}');
//-->