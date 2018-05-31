<!--
var AJAX =
{
	XmlHttp: null,
	create: function()
	{
		if(window.ActiveXObject)	// IE 5+...
		{
			try
			{
				AJAX.XmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					AJAX.XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e)
				{
					alert("This browser does not support XmlHttp objects");
				}
			}
		}
		else
		{
			try
			{
				AJAX.XmlHttp = new XMLHttpRequest();
				if (AJAX.XmlHttp.overrideMimeType)
				{
					AJAX.XmlHttp.overrideMimeType('text/xml'); // See note below about this line
				}
			}
			catch (e)
			{
				alert("This browser does not support XmlHttp objects");
			}
		}
	}
}

AJAX.openXML = function (method, url, async, uname, pswd)
{
	if (AJAX.XmlHttp != null)
	{
		if (uname == undefined)
		{
			AJAX.XmlHttp.open(method, url, async, uname, pswd);
		}
		else
		{
			AJAX.XmlHttp.open(method, url, async);
		}
		
		AJAX.XmlHttp.onreadystatechange = function ()
		{
			if (AJAX.XmlHttp.readyState == 4)
			{
				if (AJAX.XmlHttp.status == 200)
				{ // 200 은 HTTP에서 성공 i.e) 404 : not found
					AJAX.statusSuccessHandler(AJAX.XmlHttp.responseXML);
				}
				else
				{
					AJAX.statusErrorHandler();
					alert('Error while loading!');
				}
			}
		}
	}
	else
	{
		alert ("need to create xmlhttp object");
	}
}

AJAX.openText = function (method, url, async, uname, pswd)
{
	if (AJAX.XmlHttp != null)
	{
		if (uname == undefined)
		{
			AJAX.XmlHttp.open(method, url, async, uname, pswd);
		}
		else
		{
			AJAX.XmlHttp.open(method, url, async);
		}
		
		AJAX.XmlHttp.onreadystatechange = function ()
		{
			if (AJAX.XmlHttp.readyState == 4)
			{
				//AJAX.statusSuccessHandler(AJAX.XmlHttp.responseText);
				//alert(AJAX.XmlHttp.status);
				if (AJAX.XmlHttp.status == 200)
				{
					// 200 은 HTTP에서 성공 i.e) 404 : not found
					AJAX.statusSuccessHandler(AJAX.XmlHttp.responseText);
				}
				else
				{
					AJAX.statusErrorHandler();
					alert('Error while loading! (' + AJAX.XmlHttp.statusText+')');
				}
			}
		}
	}
	else
	{
		alert ("need to create xmlhttp object");
	}
}

AJAX.send = function (content)
{
	if (content == undefined)	AJAX.XmlHttp.send(null);
	else						AJAX.XmlHttp.send(content);
}

AJAX.setOnReadyStateChange = function (funcname)
{
	if (AJAX.XmlHttp)
	{
		AJAX.XmlHttp.onreadystatechange = funcname;
	}
	else
	{
		alert ("need to create xmlhttp object");
	}
}

// status 200 일 때 처리 함수
AJAX.statusSuccessHandler = function (data)
{
	alert(data);
}

AJAX.setStatusSuccessHandler = function (funcname)
{
	AJAX.statusSuccessHandler = funcname;
}

// status 200 일 때 기본 처리 함수
// setStatusSuccessHandler() 로 대체 가능
AJAX.statusErrorHandler = function (status)
{
	AJAX.rtnText = AJAX.XmlHttp.responseText;
}

AJAX.setStatusSuccessHandler = function (funcname)
{
	AJAX.statusSuccessHandler = funcname
}

AJAX.setStatusErrorHandler = function (funcname)
{
	AJAX.statusErrorHandler = funcname
}

AJAX.setRequestHeader = function (label, value)
{
	AJAX.XmlHttp.setRequestHeader(label, value);
}

//*** 사용법 
//AJAX.create();
//AJAX.openText('GET','jsontest.php', true);
//AJAX.setStatusSuccessHandler(proc);
//AJAX.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//AJAX.send("test=테스트");
//
//function proc(abc)
//{
//	document.getElementById('test').innerHTML = abc;
//}
//-->