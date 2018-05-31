/**
 * noImage()
 *
 * @param	element		image element
 * @param	int			image width
 * @param	int			image height
 * @return	void
 */
function noImage(img, size)
{
	var args = noImage.arguments;
	switch (size)
	{
		case 55 :
			var altImg = 'http://img.danawa.com/new/openmarket/common/noimg_55.gif';
		break;
		case 90 :
			var altImg = 'http://img.danawa.com/new/openmarket/common/noimg_90.gif';
		break;
		case 130 :
			var altImg = 'http://img.danawa.com/new/openmarket/common/noimg_130.gif';
		break;
		case 300 :
			var altImg = 'http://img.danawa.com/new/openmarket/common/noimg_300.gif';
		break;
	}

	if (args[0].src == altImg) {
		args[0].onerror = null;
	} else {
		var imgWidth = args[1] ? args[1] : size;
		var imgHeight = args[2] ? args[2] : size;
		args[0].src = altImg;
		args[0].width = imgWidth;
		args[0].height = imgHeight;
	}
} 