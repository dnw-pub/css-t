<!--
try {
	var iframeTool = {
		obj : null,
		wid : 0,
		hei : 0,
		maxWidth : 0,
		maxHeight: 0,

		init : function (iframeObj)
		{
			this.wid = 0;
			this.hei = 0;
			this.obj = iframeObj;

			
			if(document.all)	// ie
			{
				if(iframeObj.contentWindow)
				{
					var iobj = iframeObj.contentWindow.document.body;
				}
				else
				{
					var iobj = iframeObj.document.body;
				}
			
				this.hei = iobj.scrollHeight + (iobj.offsetHeight - iobj.clientHeight);
				this.wid = iobj.scrollWidth + (iobj.offsetWidth - iobj.clientWidth);
			}		
			//if(document.getElementById && !document.all) // !ie
			else
			{
				if(iframeObj.contentWindow)
				{
					var iobj = iframeObj.contentDocument.body;
				}
				else
				{
					var iobj = iframeObj.body;
				}
				this.hei = iobj.offsetHeight;
				this.wid = iobj.offsetWidth;
			}
			
			
			this.hei = (this.maxHeight < this.hei && this.maxHeight > 0 ) ? this.maxHeight : this.hei;
			this.wid = (this.maxWidth < this.wid  && this.maxWidth  > 0 ) ? this.maxWidth  : this.wid;
		},

		resize : function ()
		{
			if(arguments.length > 0) this.init(arguments[0]);

			if(arguments.length == 1) {
				this.obj.style.width	= this.wid + 'px';
				this.obj.style.height	= this.hei + 'px';
			}
			else if(arguments.length == 2) {
					 if (arguments[1] == 1)	this.obj.style.width	= this.wid + 'px';
				else if (arguments[1] == 2)	this.obj.style.height	= this.hei + 'px';
			}
		}
	};
}catch(e){}
//-->
