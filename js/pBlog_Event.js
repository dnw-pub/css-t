	function pBlogEvent(id,time)
	{
		var url = '/event/prod_bc_xml.php';
		var param = 'tempid='+id+'&'+time;

		var pBlogEvent = new Ajax.Request(
			url,
			{
				method : 'get',
				parameters:param,
				onComplete : showPBlogEvent
			}
		);
	}

	function showPBlogEvent(resp)
	{
		$('LAY_ProdBlog_Event').innerHTML = resp.responseText;
	}

	function open_ctg()
	{
		var load_iframe							= $('LAY_ProdBlog_Event');
		var load_iframeLeft						= load_iframe.offsetLeft;
		var load_iframeBottom					= load_iframe.offsetTop;
		$("LAY_SHOW_PROD").style.left			= load_iframeLeft - 85;
		$("LAY_SHOW_PROD").style.top			= load_iframeBottom + 147;
		$("LAY_SHOW_PROD").style.display		= "block";
		$("LAY_SHOW_PROD").style.visibility		= "visible";
	}
	function close_ctg()
	{
		$("LAY_SHOW_PROD").style.visibility="hidden";
		$("LAY_SHOW_PROD").style.display="none";
	}
