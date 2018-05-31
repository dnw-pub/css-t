<!--
/*
 * Scroller Argument
 * sName		: 생성할 인스턴트명. 객체를 받을 변수명과 인자값이 반드시 같아야 함. ex) var Instance = new GlobalScroll.Scroller("Instance",....);
 * sParentID	: 롤링 될 값들이 뿌려질 제일 상위 레이어명
 * aItem		: 롤링 될 값들의 배열 리스트
 * nHei			: 높이
 * nViewCnt		: 보여줄 갯수
 * nSpeed		: 롤링 속도 (반드시 nHei 값으로 나누어 나머지가 0이 되야 함.)
 * nWaitTime	: 롤링되기전 멈춰있는 시간
 */

var GlobalScroll2 = new Object();
GlobalScroll2.Scroller = function(sName,sParentID,aItem, nWid, nViewCnt, nSpeed, nWaitTime) {
	//this.nHeight	= nHei;
	this.nWidth		= nWid;
	//this.nTotHei	= 0;
	this.nTotWid	= 0;
	this.nViewCnt	= nViewCnt;
	this.nInterval	= 0;
	this.nSpeed		= nSpeed;
	this.nWaitTime	= nWaitTime;
	this.nTmpSpeed	= 0;
	this.bStop		= true;
	this.oTmp;
	this.aItem		= aItem;
	this.nItemCnt	= 0;
	this.sName		= sName;
	this.sDivLayID	= "LAY_"+sName+"_Item";
	this.sDivLayID_P= sParentID;
	this.sScrollArrow = 'left';
}
GlobalScroll2.Scroller.prototype = {
	Start : function() {
		if( this.nWidth < this.nSpeed)			this.nSpeed = this.nWidth;
		if((this.nWidth % this.nSpeed) != 0)	this.nSpeed = 1;

		this.Draw();
		this.nTotWid = this.aItem.length;
		if (this.nTotWid > 1) this.nInterval = setInterval(this.sName + ".Left();", this.nWaitTime);
	},

	Left : function () {
		if (this.nTotWid > 1) {
			if (this.bStop) {
				if (this.sScrollArrow != 'down') this.Redraw('left');

				for (i = 0; i<this.nTotWid; i++) {
					this.oTmp = document.getElementById(this.sDivLayID + i);
					this.oTmp.style.left = parseInt(this.oTmp.style.left) - this.nSpeed + 'px';
					if (parseInt(this.oTmp.style.left) <= -this.nWidth) this.oTmp.style.left = this.nWidth * (this.nTotWid - 1);
				}
				if ((this.nTmpSpeed += this.nSpeed) >= this.nWidth) {
					clearInterval(this.nInterval);
					this.nTmpSpeed = 0;
					this.nInterval = setInterval(this.sName + ".Left()", this.nWaitTime);
					return;
				}
			}
			clearInterval(this.nInterval);
			this.nInterval = setInterval(this.sName + ".Left()", 1);
		}
		else clearInterval(this.nInterval);
	},

	Right : function () {
		if (this.nTotWid > 1) {
			if (this.bStop) {
				if (this.sScrollArrow != 'up') this.Redraw('right');
				
				for (i = 0; i<this.nTotWid; i++) {
					this.oTmp = document.getElementById(this.sDivLayID + i);
					this.oTmp.style.left = parseInt(this.oTmp.style.left) + this.nSpeed + 'px';
					if (parseInt(this.oTmp.style.left) >= this.nWidth) this.oTmp.style.left = -this.nWidth * (this.nTotWid - 1);
				}
				if ((this.nTmpSpeed -= this.nSpeed) <= -this.nWidth) {
					clearInterval(this.nInterval);
					this.nTmpSpeed = 0;
					this.nInterval = setInterval(this.sName + ".Right()", this.nWaitTime);
					return;
				}
			}
			clearInterval(this.nInterval);
			this.nInterval = setInterval(this.sName + ".Right()", 1);
		}
		else clearInterval(this.nInterval);
	},

	Draw : function () {
		var sHTML = "";
		sHTML += '<div id="LAY_'+this.sName+'_Parent" style="width:'+parseInt(this.nWidth*this.nViewCnt)+'px; height:100%; position:relative; overflow:hidden;" OnMouseOver="'+this.sName+'.bStop=false; " OnMouseOut="'+this.sName+'.bStop=true;">';
		for (var i=0; i<this.aItem.length; i++) {
			sHTML	+= '<span style="position: absolute; left:'+(this.nWidth * i) + 'px; width:'+this.nWidth+'px; height:100%; overflow:hidden;" id="' + this.sDivLayID + i + '">' + this.aItem[i] + '</span>';
		}
		sHTML += '</div>';
		document.getElementById(this.sDivLayID_P).innerHTML = sHTML;
	},

	Redraw : function (dir) {
		if (dir == 'right') {
			for (var i = 0; i < this.nTotWid; i++) {
				this.oTmp = document.getElementById(this.sDivLayID + i);
				if (parseInt(this.oTmp.style.left) >= this.nWidth) {
					this.oTmp.style.left = parseInt(this.oTmp.style.left) - (this.nWidth * this.nTotWid) + 'px';
				}
			}
		} else if (dir == 'left') {
			for (var i = 0; i < this.nTotWid; i++) {
				this.oTmp = document.getElementById(this.sDivLayID + i);
				if (parseInt(this.oTmp.style.left) <= -this.nWidth) {
					this.oTmp.style.left = parseInt(this.oTmp.style.left) + (this.nWidth * this.nTotWid) + 'px';
				}
			}
		}
		this.sScrollArrow = dir;
	}
}
//-->
