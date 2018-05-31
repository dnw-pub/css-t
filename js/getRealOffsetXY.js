<!--
	/*
	 * ID를 가진 객체의 페이지 상 실제 x,y좌표값 구하기
	 */
	function getDocRealOffsetTop(o)	{return o ? o.offsetTop		+ getDocRealOffsetTop(o.offsetParent)	: 0;}
	function getDocRealOffsetLeft(o){return o ? o.offsetLeft	+ getDocRealOffsetLeft(o.offsetParent)	: 0;}

	//오브젝트 위치 가져오기 이종범 추가
	function getRealTopPosition(obj)
	{
		return obj ? obj.offsetTop + getRealTopPosition(obj.offsetParent) : 0;
	}

	function getRealLeftPosition(obj)
	{
		return obj ? obj.offsetLeft + getRealLeftPosition(obj.offsetParent) : 0;
	}
//-->