<!--
var nScrollerHeightMainEvent = 18;
var nTotalAreaMainEvent = 0;
var nScrollIntervalMainEvent;
var nScrollSpeedMainEvent = 2;
var nWaitingTimeMainEvent = 2000;
var nTempSpeedMainEvent = 0;
var oTempMainEvent;
var bScrollActMainEvent = true;

function startScroll_MainEvent()
{
	for (var i=0; i<aScrollMainEventContents.length; i++)
	{
		insertContents_MainEvent(i);
		nTotalAreaMainEvent = i+1;
	}

	if (nTotalAreaMainEvent > 1) nScrollIntervalMainEvent = setInterval("scrollDown_MainEvent()", nWaitingTimeMainEvent);
}

function scrollDown_MainEvent()
{
	if (nTotalAreaMainEvent > 1)
	{
		if (bScrollActMainEvent)
		{			
			for (i = 0; i<nTotalAreaMainEvent; i++)
			{
				oTempMainEvent = document.getElementById('LAY_EventListChild'+i);				
				oTempMainEvent.style.top = parseInt(oTempMainEvent.style.top) - nScrollSpeedMainEvent + 'px';
				
				if (parseInt(oTempMainEvent.style.top) <= -nScrollerHeightMainEvent) oTempMainEvent.style.top = nScrollerHeightMainEvent * (nTotalAreaMainEvent - 1);
			}

			if ((nTempSpeedMainEvent += nScrollSpeedMainEvent) >= nScrollerHeightMainEvent)
			{
				clearInterval(nScrollIntervalMainEvent);
				nTempSpeedMainEvent = 0;
				nScrollIntervalMainEvent = setInterval("scrollDown_MainEvent()", nWaitingTimeMainEvent);
				return;
			}
		}
		clearInterval(nScrollIntervalMainEvent);
		nScrollIntervalMainEvent = setInterval("scrollDown_MainEvent()", 1);
	}
	else clearInterval(nScrollIntervalMainEvent);
}



function insertContents_MainEvent(nIdx)
{
	document.write('<div style="top:'+(nScrollerHeightMainEvent*nIdx) + 'px;" id="LAY_EventListChild'+nIdx+'" class="event_scroll_member">');
	document.write(aScrollMainEventContents[nIdx]);
	document.write('</div>');
}
-->
