/**
 * ��  ġ: www.danawa.com:~/js/common/cms.js
 * ��  ��: CMS ���� �Լ�
 * ��  ��: 
 * �ۼ���: ��ȣ��
 * �ۼ���: 2006-08-29
 *
 *
 * ��  ��: CMS ���� �Լ�-blog ���� ����Ҽ� �ֵ��� ����
 * ��  ��: 
 * �ۼ���: �����
 * �ۼ���: 2007-06-04
 *
 *
 * ���� ������: 2007-06-04
 */

/**
 * CMS ��� ���� ����
 *
 * @param integer ������ ��ȣ
 * @param integer �� ������ ��
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
