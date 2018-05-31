<!--
var slideMenuSwitch =
{
	obj					: null,
	chkbox				: null,
	slideType			: 'OFF',	// 슬라이드 기능 : (OFF:꺼짐, ON:자동 따라다님, 'USER':체크박스 형식으로 쿠키 형식...)

	stmnLEFT			: 1,	// 왼쪽 여백 (메뉴가 왼쪽에서 stmnLEFT 픽셀 떨어진 곳에 보여집니다)
	stmnGAP1			: 0,	// 위쪽 여백 (메뉴가 위에서 stmnGAP1 픽셀 떨어진 곳에 보여집니다)
	stmnGAP2			: 0,	// 스크롤시 브라우저 위쪽과 떨어지는 거리
	stmnBASE			: 200,	// 스크롤 시작위치 
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
		//document.cookie = name + "=" + escape( value ) + "; path=/; domain=yourdomain.com; expires=" + eDate.toGMTString() + ";" // 도메인까지 추가시
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
				// 따라다니는 (슬라이딩) 기능
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