//<![CDATA[
function HotTextMove_Action()
{
	if (HotCnt>0)
	{
		if (HotFlag)
		{
			HotObj.innerHTML = hotTrandRange[HotGlobalI];
			HotGlobalI++;
			if (HotGlobalI > HotCnt - 1)
			{
				HotGlobalI = 0;
				if (HotTimer) window.clearInterval(HotTimer);
				HotTimer = window.setInterval( 'HotTextMove_Action();', HotGap );
			}
		}   // end if :(HotFlag)

		if (HotTimer) window.clearInterval(HotTimer);
		HotTimer = window.setInterval( 'HotTextMove_Action();', HotGap );

	}   // end if :(HotCnt>0)
	else {
		if (HotTimer) window.clearInterval(HotTimer);
	}
}

function HotTextMove_Main(arrange)
{
	document.getElementById( 'LAY_hotTrend' ).innerHTML = hotTrandRange[HotGlobalI];
	HotCnt = arrange.length;
	if (HotCnt>0) HotTimer = window.setInterval( 'HotTextMove_Action();', HotGap );
}
//]]>