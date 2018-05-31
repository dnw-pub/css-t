<!--
/*
 * Scroller Argument
 * sName		: ������ �ν���Ʈ��. ��ü�� ���� ������� ���ڰ��� �ݵ�� ���ƾ� ��. ex) var Instance = new GlobalScroll.Scroller("Instance",....);
 * sParentID	: �Ѹ� �� ������ �ѷ��� ���� ���� ���̾��
 * aItem		: �Ѹ� �� ������ �迭 ����Ʈ
 * nWid			: ���� ����
 * nViewCnt		: ������ ����
 * nSpeed		: �Ѹ� �ӵ� (�ݵ�� nHei ������ ������ �������� 0�� �Ǿ� ��.)
 * nWaitTime	: �Ѹ��Ǳ��� �����ִ� �ð�
 */

var GlobalScroll2 = new Object();
GlobalScroll2.Scroller = function(sName,sParentID,aItem, nWid, nViewCnt, nSpeed, nWaitTime) {
	this.nWidth		= nWid;
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
				if (this.sScrollArrow != 'left') {
					this.sScrollArrow = 'left';
					this.Redraw('left');
				}

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
				if (this.sScrollArrow != 'right') {
					this.sScrollArrow = 'right';
					this.Redraw('right');
				}

				for (i=(this.nTotWid-1); i>=0; i--) {
					this.oTmp = document.getElementById(this.sDivLayID + i);

					this.oTmp.style.left = parseInt(this.oTmp.style.left) + this.nSpeed + 'px';

					if (parseInt(this.oTmp.style.left) >= (this.nWidth * this.nViewCnt)) {
						this.oTmp.style.left = -(this.nWidth*(this.nTotWid-this.nViewCnt));
					}
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
		sHTML += '<div id="LAY_'+this.sName+'_Parent" style="width:100%; height:100%; position:relative; overflow:hidden;" OnMouseOver="'+this.sName+'.bStop=false; " OnMouseOut="'+this.sName+'.bStop=true;">';
		for (var i=0; i<this.aItem.length; i++) {
			sHTML	+= '<span style="position: absolute; left:'+(this.nWidth * i) + 'px; width:'+this.nWidth+'px; height:100%; overflow:hidden;" id="' + this.sDivLayID + i + '">' + this.aItem[i] + '</span>';
		}
		sHTML += '</div>';
		document.getElementById(this.sDivLayID_P).innerHTML = sHTML;
	},

	Redraw : function (dir) {
		if (dir == 'right') {
			for (i = 0; i<this.nTotWid; i++) {
				this.oTmp = document.getElementById(this.sDivLayID + i);
				if (parseInt(this.oTmp.style.left) >= 0 && parseInt(this.oTmp.style.left) < this.nWidth) {
					var tmpI = i;
					break;
				}
			}
			var tmpK = this.nViewCnt+tmpI % this.nTotWid;

			var nSeq = 1;

			for(i=(this.nTotWid-this.nViewCnt-1); i>=0; i--) {
				var tmpN = (tmpK+i)%this.nTotWid;

				this.oTmp = document.getElementById(this.sDivLayID + tmpN);
				if(nSeq == 1) {
					var nMargin = parseInt(document.getElementById(this.sDivLayID+tmpI).style.left);;
				}
				this.oTmp.style.left = -((nSeq*this.nWidth) - nMargin) + "px";
				nSeq++;
			}
		}
		else if (dir == 'left') {
			for (i = 0; i<this.nTotWid; i++) {
				this.oTmp = document.getElementById(this.sDivLayID + i);
				if (parseInt(this.oTmp.style.left) >= 0 && parseInt(this.oTmp.style.left) < this.nWidth) {
					var tmpI = i;
					break;
				}
			}
			var tmpK = this.nViewCnt+tmpI % this.nTotWid;

			for(i=0; i<(this.nTotWid-this.nViewCnt-1); i++) {
				var tmpN = (tmpK+i)%this.nTotWid;
				this.oTmp = document.getElementById(this.sDivLayID + tmpN);
				if(i == 0) {
					var nMargin = parseInt(document.getElementById(this.sDivLayID+tmpI).style.left);
				}
				this.oTmp.style.left = (this.nWidth*this.nViewCnt)+(i*this.nWidth + nMargin) + "px";
			}
		}
		this.sScrollArrow = dir;
	}
}
//-->
