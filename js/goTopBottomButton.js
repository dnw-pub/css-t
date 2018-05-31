/*****
* ���, ���ϴ����� ���� ��ư ���
* Arg[0] : Instance ��, �ݵ�� ������� �ν��Ͻ����� ���ƾ� �Ѵ�.
* Arg[1] : ������ Left�κ����� ������(0���� ������ �������� ���� �����ǥ, 0�Ǵ� 0���� Ŭ�� ���� ��ǥ��)
* Arg[2] : ������ ���� �Ʒ������κ����� ������

*** ���� **
var goTopNBottom = new obj_Top_OR_Bottom_DNA_Button.Init("goTopNBottom",0,0);
goTopNBottom.Write();
*** ���� **/

var obj_Top_OR_Bottom_DNA_Button = new Object();

obj_Top_OR_Bottom_DNA_Button.Init = function (sInstName, nLeftMargin, nBottomMargin) {
	this.nHoffset	= nLeftMargin;	// ���������� ������ ����
	this.nVoffset	= Math.abs(nBottomMargin);	// ������ ������ ����
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
		
		// ��ư ��ġ
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
		document.writeln('<tr><td align="center"><a onClick="goTopNBottom.Top()" style="cursor:pointer;" alt="����"><img src="http://img.danawa.com/new/common/quick_top.gif" border="0"></a></td></tr>');
		document.writeln('<tr><td align="center"><a onClick="goTopNBottom.Bottom()" style="cursor:pointer;" alt="�Ʒ���"><img src="http://img.danawa.com/new/common/quick_down.gif" border="0"></td></tr>');
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

