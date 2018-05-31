<!--
/*
 * Scroller Argument
 * sName		: ������ �ν��Ͻ���. ��ü�� ���� ������� ���ڰ��� �ݵ�� ���ƾ� ��. ex) var Instance = new GlobalScroll.Scroller("Instance",....);
 * sParentID	: �Ѹ� �� ������ �ѷ��� ���� ���� ���̾��
 * aItem		: �Ѹ� �� ������ �迭 ����Ʈ
 * nHei			: ����
 * nViewCnt		: ������ ����
 * nSpeed		: �Ѹ� �ӵ� (�ݵ�� nHei ������ ������ �������� 0�� �Ǿ� ��.)
 * nWaitTime	: �Ѹ��Ǳ��� �����ִ� �ð�
 */

var GlobalScroll = new Object();
GlobalScroll.Scroller = function(sName,sParentID,aItem, nHei, nViewCnt, nSpeed, nWaitTime) {
	this.nHeight	= nHei;
	this.nTotHei	= 0;
	this.nViewCnt	= nViewCnt;
	this.nInterval	= 0;
	this.nSpeed		= nSpeed;
	this.nWaitTime	= nWaitTime;
	this.nTmpSpeed	= 0;
	this.bStop		= false;
	this.oTmp;
	this.aItem		= aItem;
	this.nItemCnt	= 0;
	this.sName		= sName;
	this.sDivLayID	= "LAY_"+sName+"_Item";
	this.sDivLayID_P= sParentID;
}
GlobalScroll.Scroller.prototype = {
	Start : function() {
		if( this.nHeight < this.nSpeed)			this.nSpeed = this.nHeight;
		if((this.nHeight % this.nSpeed) != 0)	this.nSpeed = 1;

		this.Draw();
		this.nTotHei = this.aItem.length;
		if (this.nTotHei > 1) this.nInterval = setInterval(this.sName + ".Down();", this.nWaitTime);
	},

	Down : function () {
		if (this.nTotHei > 1) {
			if (!this.bStop) {
				for (i = 0; i<this.nTotHei; i++) {
					this.oTmp = document.getElementById(this.sDivLayID + i);
					this.oTmp.style.top = parseInt(this.oTmp.style.top) - this.nSpeed + 'px';
					if (parseInt(this.oTmp.style.top) <= -this.nHeight) this.oTmp.style.top = this.nHeight * (this.nTotHei - 1) + 'px';
				}
				if ((this.nTmpSpeed += this.nSpeed) >= this.nHeight) {
					clearInterval(this.nInterval);
					this.nTmpSpeed = 0;
					this.nInterval = setInterval(this.sName + ".Down()", this.nWaitTime);
					return;
				}
			}
			clearInterval(this.nInterval);
			this.nInterval = setInterval(this.sName + ".Down()", 1);
		}
		else clearInterval(this.nInterval);
	},

	Up : function () {
		if (this.nTotHei > 1) {
			if (!this.bStop) {
				for (i = 0; i<this.nTotHei; i++) {
					this.oTmp = document.getElementById(this.sDivLayID + i);
					this.oTmp.style.top = parseInt(this.oTmp.style.top) + this.nSpeed + 'px';
					if (parseInt(this.oTmp.style.top) > this.nHeight * (this.nTotHei - 1)) this.oTmp.style.top = 0;
				}
				if ((this.nTmpSpeed -= this.nSpeed) <= this.nHeight) {
					clearInterval(this.nInterval);
					this.nTmpSpeed = 0;
					this.nInterval = setInterval(this.sName + ".Up()", this.nWaitTime);
					return;
				}
			}
			clearInterval(this.nInterval);
			this.nInterval = setInterval(this.sName + ".Up()", 1);
		}
		else clearInterval(this.nInterval);
	},

	Draw : function () {
		var sHTML = "";
		sHTML += '<div id="LAY_'+this.sName+'_Parent" style="width:100%; height:'+(this.nHeight * this.nViewCnt)+'px; position:relative; overflow:hidden;" OnMouseOver="'+this.sName+'.bStop=true; " OnMouseOut="'+this.sName+'.bStop=false;">';
		for (var i=0; i<this.aItem.length; i++) {
			sHTML	+= '<div style="position: absolute; top:'+(this.nHeight * i) + 'px; width:100%; height:'+this.nHeight+'px;" id="' + this.sDivLayID + i + '">' + this.aItem[i] + '</div>';
		}
		sHTML += '</div>';

		document.getElementById(this.sDivLayID_P).innerHTML = sHTML;
	}
}
//-->
