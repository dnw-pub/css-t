/**
 * ��  ġ: www.danawa.com:~/js/common/cms.js
 * ��  ��: CMS ���� �Լ�
 * ��  ��: 
 * �ۼ���: ��ȣ��
 * �ۼ���: 2006-08-29
 *
 * ���� ������: 2006-08-29
 */

/**
 * CMS ��� ���� ����
 *
 * @param integer ������ ��ȣ
 * @param integer �� ������ ��
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
