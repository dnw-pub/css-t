<!--
	/*
	 * ID�� ���� ��ü�� ������ �� ���� x,y��ǥ�� ���ϱ�
	 */
	function getDocRealOffsetTop(o)	{return o ? o.offsetTop		+ getDocRealOffsetTop(o.offsetParent)	: 0;}
	function getDocRealOffsetLeft(o){return o ? o.offsetLeft	+ getDocRealOffsetLeft(o.offsetParent)	: 0;}

	//������Ʈ ��ġ �������� ������ �߰�
	function getRealTopPosition(obj)
	{
		return obj ? obj.offsetTop + getRealTopPosition(obj.offsetParent) : 0;
	}

	function getRealLeftPosition(obj)
	{
		return obj ? obj.offsetLeft + getRealLeftPosition(obj.offsetParent) : 0;
	}
//-->