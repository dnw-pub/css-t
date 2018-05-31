/**
 * 위  치: www.danawa.com:~/js/common/cms.js
 * 내  용: CMS 관련 함수
 * 참  고: 
 * 작성자: 배호열
 * 작성일: 2006-08-29
 *
 * 최종 수정일: 2006-08-29
 */

/**
 * CMS 기사 내용 보기
 *
 * @param integer 페이지 번호
 * @param integer 총 페이지 수
 * @access public
 */
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
