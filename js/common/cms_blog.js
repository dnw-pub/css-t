/**
 * 위  치: www.danawa.com:~/js/common/cms.js
 * 내  용: CMS 관련 함수
 * 참  고: 
 * 작성자: 배호열
 * 작성일: 2006-08-29
 *
 *
 * 내  용: CMS 관련 함수-blog 에서 사용할수 있도록 수정
 * 참  고: 
 * 작성자: 김수연
 * 작성일: 2007-06-04
 *
 *
 * 최종 수정일: 2007-06-04
 */

/**
 * CMS 기사 내용 보기
 *
 * @param integer 페이지 번호
 * @param integer 총 페이지 수
 * @access public
 */

// xGetElementById, Copyright 2001-2005 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xGetElementById(e)
{
  if(typeof(e)!='string') return e;
  if(document.getElementById) e=document.getElementById(e);
  else if(document.all) e=document.all[e];
  else e=null;
  return e;
}

function cmsViewContents(nPage, nTotalPage)
{
	var oContents;

	for (var i = 1; i <= nTotalPage; i++) {
		oContents = xGetElementById('divArticleContents' + i);
		if (nPage != i) {
			oContents.style.display = 'none';
		} else {
			oContents.style.display = 'block';
		}
	}
}
