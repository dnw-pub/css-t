<!--
var slideMenuSwitch =
{
	obj					: null,
	chkbox				: null,
	slideType			: 'OFF',	// �����̵� ��� : (OFF:����, ON:�ڵ� ����ٴ�, 'USER':üũ�ڽ� �������� ��Ű ����...)

	stmnLEFT			: 1,	// ���� ���� (�޴��� ���ʿ��� stmnLEFT �ȼ� ������ ���� �������ϴ�)
	stmnGAP1			: 0,	// ���� ���� (�޴��� ������ stmnGAP1 �ȼ� ������ ���� �������ϴ�)
	stmnGAP2			: 0,	// ��ũ�ѽ� ������ ���ʰ� �������� �Ÿ�
	stmnBASE			: 200,	// ��ũ�� ������ġ 
	stmnActivateSpeed	: 200,
	stmnScrollSpeed		: 10,

	stmnTimer			: null,

	ReadCookie			: function (name)
	{
		var label = name + "=";
		var labelLen = label.length;
		var cLen = document.cookie.length;
		var i = 0;

		while (i < cLen)
		{
			var j = i + labelLen;
			
			if (document.cookie.substring(i, j) == label)
			{
				var cEnd = document.cookie.indexOf(";", j);
				if (cEnd == -1) cEnd = document.cookie.length;
				
				return unescape(document.cookie.substring(j, cEnd));
			}
			i++;
		}
		return '';
	},

	SaveCookie : function (name, value, expire)
	{
		var eDate = new Date();
		eDate.setDate(eDate.getDate() + expire);
		document.cookie = name + "=" + value + "; expires=" +  eDate.toGMTString()+ "; path=/";
		//document.cookie = name + "=" + escape( value ) + "; path=/; domain=yourdomain.com; expires=" + eDate.toGMTString() + ";" // �����α��� �߰���
	},

	RefreshStaticMenu : function ()
	{
		var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;

		stmnStartPoint	= parseInt(document.getElementById(this.obj).style.top, 10);
		stmnEndPoint	= document.body.scrollTop + this.stmnGAP2;
		
		if (stmnEndPoint < this.stmnGAP1) stmnEndPoint = this.stmnGAP1;

		stmnRefreshTimer = this.stmnActivateSpeed;

		if ( stmnStartPoint != stmnEndPoint )
		{
			stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
			document.getElementById(this.obj).style.top = parseInt(document.getElementById(this.obj).style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount );
			stmnRefreshTimer = this.stmnScrollSpeed;
		}

		this.stmnTimer = setTimeout ("slideMenuSwitch.RefreshStaticMenu();", stmnRefreshTimer);
	},

	ToggleAnimate : function ()
	{
		if (this.chkbox && document.getElementById(this.chkbox).checked)
		{
			this.RefreshStaticMenu();
			this.SaveCookie(this.chkbox, "true", 300);
		}
		else
		{
			clearTimeout(this.stmnTimer);
			document.getElementById(this.obj).style.top = this.stmnGAP1;
			this.SaveCookie(this.chkbox, "false", 300);
		}
	},

	InitializeStaticMenu : function (obj)
	{
		this.obj		= obj;
		//this.chkbox		= chkbox;
		//this.slideType	= slideOnOff;

		document.getElementById(obj).style.left = this.stmnLEFT;

		if(this.slideType == 'ON')
		{
			document.getElementById(obj).style.top = document.body.scrollTop + this.stmnBASE;
			this.RefreshStaticMenu();
		}
		else if (this.slideType == 'OFF')
		{
			document.getElementById(obj).style.top = document.body.scrollTop + this.stmnGAP1;
		}
		else
		{
			if(this.chkbox)
			{
				// ����ٴϴ� (�����̵�) ���
				if (this.ReadCookie(this.chkbox) == "false")
				{
					document.getElementById(this.chkbox).checked = false;
					document.getElementById(obj).style.top = document.body.scrollTop + this.stmnGAP1;
				}
				else
				{
					document.getElementById(this.chkbox).checked = true;
					document.getElementById(obj).style.top = document.body.scrollTop + this.stmnBASE;
					this.RefreshStaticMenu();
				}
			}
			else
			{
				this.slideType = 'OFF';
				document.getElementById(obj).style.top = document.body.scrollTop + this.stmnGAP1;
			}
		}
	}
}
//-->