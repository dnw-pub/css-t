/*****
* 상단, 최하단으로 가기 버튼 출력
* Arg[0] : Instance 명, 반드시 변수명과 인스턴스명은 같아야 한다.
* Arg[1] : 브라우져 Left로부터의 마진값(0보다 작을때 왼쪽으로 부터 상대좌표, 0또는 0보다 클때 절대 좌표값)
* Arg[2] : 브라우져 제일 아래쪽으로부터의 마진값

*** 사용법 **
var goTopNBottom = new obj_Top_OR_Bottom_DNA_Button.Init("goTopNBottom",0,0);
goTopNBottom.Write();
*** 사용법 **/

var obj_Top_OR_Bottom_DNA_Button = new Object();

obj_Top_OR_Bottom_DNA_Button.Init = function (sInstName, nLeftMargin, nBottomMargin) {
	this.nHoffset	= nLeftMargin;	// 오른쪽으로 부터의 간격
	this.nVoffset	= Math.abs(nBottomMargin);	// 밑으로 부터의 간격
	this.sName		= sInstName;

	this.ieNOTopera	= document.all&&navigator.userAgent.indexOf("Opera")==-1;
	this.nIeYMargin	= document.all ? 0 : 17;

	this.Write();
	this.oLay = document.all ? eval("document.all.LAY_goDanawaTopBottom_"+this.sName) : document.getElementById ? document.getElementById("LAY_goDanawaTopBottom_"+this.sName) : eval("document.LAY_goDanawaTopBottom_"+this.sName);

	setInterval(this.sName+".Position()",10);
}

obj_Top_OR_Bottom_DNA_Button.Init.prototype = {
	Position : function() {
		
		if(this.nHoffset > 0) {
			var nX		= this.nHoffset;
			var nWid	= 0;
		}
		else {
			var nX		= document.all ? document.body.scrollLeft	: pageXOffset - 34;
			var nWid	= this.ieNOTopera	? document.body.clientWidth + this.nIeYMargin :  window.innerWidth + this.nIeYMargin;
		}

		var nY		= document.all	? document.body.scrollTop	: pageYOffset;
		var nHei	= this.ieNOTopera	? document.body.clientHeight : window.innerHeight - this.nIeYMargin;


		if(this.nHoffset > 0)	this.oLay.style.left	= parseInt(nX);
		else					this.oLay.style.left	= parseInt(nX) + parseInt(nWid) - parseInt(this.nHoffset) - parseInt(this.oLay.offsetWidth);

		this.oLay.style.top		= parseInt(nY) + parseInt(nHei) - parseInt(this.nVoffset) - parseInt(this.oLay.offsetHeight);

		/*
		else if (document.layers) {
			this.oLay.left	= nX + nWid - this.nHoffset - this.oLay.offsetWidth;
			this.oLay.top	= nY + nHei - this.nVoffset - this.oLay.offsetHeight;
		}
		*/
		
		// 버튼 위치
		/*
		var nX		= document.all	? document.body.scrollLeft	: pageXOffset - 34;
		var nY		= document.all	? document.body.scrollTop	: pageYOffset;

		var nWid	= this.ieNOTopera	? document.body.clientWidth + this.nIeYMargin :  window.innerWidth + this.nIeYMargin;
		var nHei	= this.ieNOTopera	? document.body.clientHeight : window.innerHeight - this.nIeYMargin;

		if (document.all || document.getElementById) {
			this.oLay.style.left	= parseInt(nX) + parseInt(nWid) - parseInt(this.nHoffset) - parseInt(this.oLay.offsetWidth);
			this.oLay.style.top		= parseInt(nY) + parseInt(nHei) - parseInt(this.nVoffset) - parseInt(this.oLay.offsetHeight);
		}
		else if (document.layers) {
			this.oLay.left	= nX + nWid - this.nHoffset - this.oLay.offsetWidth;
			this.oLay.top	= nY + nHei - this.nVoffset - this.oLay.offsetHeight;
		}
		*/
	},

	Write	: function () {
		document.writeln('<div id="LAY_goDanawaTopBottom_'+this.sName+'" style="position:absolute; left:5px; visibility:visible; z-index:1;">');
		document.writeln('<table width="65" height="40" border="0" cellpadding="0" cellspacing="0">');
		document.writeln('<tr><td align="center"><a onClick="goTopNBottom.Top()" style="cursor:pointer;" alt="위로"><img src="http://img.danawa.com/new/common/quick_top.gif" border="0"></a></td></tr>');
		document.writeln('<tr><td align="center"><a onClick="goTopNBottom.Bottom()" style="cursor:pointer;" alt="아래로"><img src="http://img.danawa.com/new/common/quick_down.gif" border="0"></td></tr>');
		document.writeln('</table>');
		document.writeln('</div>');
	},

	Top		: function () {
		var x = document.body.scrollLeft;
		var y = document.body.scrollTop;
		var step = 10;

		while ((x != 0) || (y != 0)) {
			window.scroll (x, y);
			step += (step * step / 300);
			x -= step;
			y -= step;
			if (x < 0) x = 0;
			if (y < 0) y = 0;
		}
		window.scroll (0, 0);
	},

	Bottom	: function () {
		var x = document.body.scrollLeft;
		var y = document.body.scrollTop;
		var step = 10;

		while ((y < document.body.scrollHeight)) {
			step += (step * step / 300);

			x -= step;
			y += step;

			window.scroll (x, y);
			if (y >= document.body.scrollHeight) y = document.body.scrollHeight;
		}
		window.scroll (0, document.body.scrollHeight);
	}
}

