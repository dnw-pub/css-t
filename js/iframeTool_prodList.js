<!--
try {
	var iframeTool_prodList = {
		obj : null,
		wid : 0,
		hei : 0,
		maxWidth : 0,
		maxHeight: 0,

		init : function (body)
		{
			this.wid = 0;
			this.hei = 0;
			this.obj = body;

			
			if(document.all)	// ie
			{

				var iobj = body;
			
				this.hei = iobj.scrollHeight + (iobj.offsetHeight - iobj.clientHeight);
				this.wid = iobj.scrollWidth + (iobj.offsetWidth - iobj.clientWidth);
			}		
			else
			{
				var iobj = body;
				this.hei = iobj.scrollHeight;
				this.wid = iobj.scrollWidth;			
			}
			

			this.hei = (this.maxHeight < this.hei && this.maxHeight > 0 ) ? this.maxHeight : this.hei;
			this.wid = (this.maxWidth < this.wid  && this.maxWidth  > 0 ) ? this.maxWidth  : this.wid;
		},

		resize : function ()
		{
			if(arguments.length > 0) this.init(arguments[0],arguments[1]);

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
