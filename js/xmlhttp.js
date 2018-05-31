<!--
function getXMLHTTP()
{
	var xmlhttp = false;

	if(window.ActiveXObject)	// IE 5+...
	{
		try
		{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				xmlhttp = false;
			}
		}
	}
	else
	{
		try
		{
			xmlhttp = new XMLHttpRequest();
			if (xmlhttp.overrideMimeType)
			{
                xmlhttp.overrideMimeType('text/xml');
                // See note below about this line
            }

		}
		catch (e)
		{
			xmlhttp = false;
		}
	}

	return xmlhttp;
}
//-->

/*
function sndReq(obj, url)
{
	var responseDATA;

	xmlhttp = getXMLHTTP();
	if(xmlhttp)
	{
		xmlhttp.open('get', url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState==4)
			{
				responseDATA = xmlhttp.responseText;
			}
		}
		xmlhttp.send("AA");

		if(responseDATA)
		{
			processDATA(obj, responseDATA);
		}
	}
	else
	{
		xmlhttp.abort();
	}
}

function processDATA(obj, str)
{
	document.getElementById(obj).innerHTML = str;
}
*/