 function ieEmGet(arrayKey,	arrayValue,	Value)
 {
	count =	arrayKey.length;
	for(i=0;i<count;i++)
	{
		if(arrayKey[i]==Value)
		{
			return arrayValue[i];
			break;
		}
	}
}

function ieEmbed()
{
	var key		= new Array();
	var	value 	= new Array();
	var	contents;
	var	embed_type;
	var	error_check=0;
	var	i, j;
	var	count;
	var	data;
	var	temp;

	if(ieEmbed.arguments.length==1)
	{
		contents = ieEmbed.arguments[0];
	}
	else
	{
		for(i=0;i<ieEmbed.arguments.length;i++)
		{
			temp = ieEmbed.arguments[i].replace(/"|'/g,"");
			data = temp.split('=');
			key[i] = data[0];
			value[i] = data[1];
			count =	data.length;

			for(j=2;j<count;j++) value[i] += '=' + data[j];
		}

		contents='';
		srcdata	= ieEmGet(key,value,'src');

		if(/\.(swf)$/.test(srcdata)) {
			embed_type = 1;
		} else if(/\.(mov|avi|wma|wmv)$/.test(srcdata))	{
			embed_type = 2;
		}

		var	classid	= ieEmGet(key,value,'classid');
		var	codebase = ieEmGet(key,value,'codebase');

		if(embed_type==1) {
			classid	= 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
			codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.c-ab#version=6,0,29,0';
		} else if(embed_type==2) {
			classid	= 'clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95';
			codebase = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.c-ab#Version=6,4,5,715';
		}

		if(classid && codebase)	{
			contents +=	'<object';
			if(classid)	{
				contents +=	' classid="' + classid + '"';
			}
			if(codebase) {
				contents +=	' codebase="' +	codebase + '"';
			}
			count =	key.length;
			for(i=0;i<count;i++) {
				if(value[i]!='') {
					if(key[i]!='src') {
						if(key[i] != 'name')
							contents +=	' '	+ key[i] + '="'	+ value[i] + '"';
					}
				}
			}
			contents +=	'>';
			for(i=0;i<count;i++) {
				if(value[i]!='') {
					if(embed_type==1 &&	key[i]=='src') {
						contents +=	'<param	name="movie" value="' +	value[i] + '" />';
					} else {
						if(key[i] != 'name' && key[i] != 'id')
							contents +=	'<param	name="'	+ key[i] + '" value="' + value[i] +	'" />';
					}
				}
			}
		}
		count =	key.length;
		contents +=	'<embed';
		for(i=0;i<count;i++) {
			if(value[i]!='') {
				if(key[i] != 'id')
					contents +=	' '	+ key[i] + '="'	+ value[i] + '"';
			}
		}
		contents +=	'>';
		contents +=	'</embed>';
		if(classid && codebase)	{
			contents +=	'</object>';
		}
	}
	alert(contents);
	document.write(contents);
}

/* 사용법 */
//<script language="javascript">
//ieEmbed("src=http://img.danawa.com/shop/flash/<?=$sImageTitle?>.swf","width=477","height=218","wmode=transparent");
//</script>
// wmode=transparent ==> 레이어 밑에 보이게 하는 파라미터, 이걸 빼면 레이어 위에 보이게 됨
