<?php
header("Content-Type: application/x-javascript; charset=euc-kr");

require_once "/home/danawa/blog/lib/SITE_VAR.php";		// $_aSiteC πËø≠

$nSiteCode	= $_GET['nSiteCode'];
$nCateCode1	= $_GET['nCateCode1'];
$nCateCode2	= $_GET['nCateCode2'];
$nCateCode3	= $_GET['nCateCode3'];
$nCateCode4	= $_GET['nCateCode4'];
$nProdCode	= $_GET['nProdCode'];

if($_GET['sName'])
{
	$sSendName	= trim($_GET['sName']);
}
else if($nSiteCode > 0)
{
	$sSendName	= $_aSiteC[$nSiteCode];
}

$nX			= $_GET['nLeft'];
$nY			= $_GET['nTop'];
?>
function QnAPopOpen() {
	var sQnAWindowUrl = "http://bbs.danawa.com/QnA/QnA_write.php?nSiteC=<?=$nSiteCode?>&nCateC1=<?=$nCateCode1?>&nCateC2=<?=$nCateCode2?>&nCateC3=<?=$nCateCode3?>&nCateC4=<?=$nCateCode4?>&nProdC=<?=$nProdCode?>";
	var opt = "width=550, height=640";
	var oQnAWindow = window.open(sQnAWindowUrl,"winQnA",opt);
	oQnAWindow.focus();
}
<?php if($nX != '' || $nY != '') {?>
document.writeln('<div style="position:absolute; left:<?=$nX?>px; top:<?=$nY?>px;">');
<?php }?>
document.writeln('<table width="65" border="0" cellspacing="0" cellpadding="0">');
document.writeln('<tr><td><img src="http://img.danawa.com/new/kdanawa/icon/img/top.gif" width="65" height="28"></td></tr>');
<?php if($sSendName != '') {?>
document.writeln('<tr><td align="center" background="http://img.danawa.com/new/kdanawa/icon/img/bg.gif" style="color: #ff3600; font-size: 11px; padding-top: 8px; font-weight:bold; line-height:12px; LETTER-SPACING: -1px;"><?=$sSendName?></td></tr>');
document.writeln('<tr><td height="39" align="center" valign="top" background="http://img.danawa.com/new/kdanawa/icon/img/bottom_1.gif" style="color:#666666; font-size:11px; line-height: 150%; font-family:µ∏øÚ;">¥Î«— ±√±›¡ı <a href="javascript:QnAPopOpen()"><img src="http://img.danawa.com/new/kdanawa/icon/img/btn.gif" width="53" height="14" border="0"></a></td></tr>');
<?php } else {?>
document.writeln('<tr><td align="center" background="http://img.danawa.com/new/kdanawa/icon/img/bg.gif" height="10"></td></tr>');
document.writeln('<tr><td  height="39" align="center" valign="top" background="http://img.danawa.com/new/kdanawa/icon/img/bottom_1.gif" style="color:#666666; font-size:11px; line-height: 150%; font-family:µ∏øÚ;"><a href="javascript:QnAPopOpen()"><img src="http://img.danawa.com/new/kdanawa/icon/img/btn_1.gif" width="53" height="25" border="0"></a></td></tr>');
<?php }?>
document.writeln('</table>');
<?php if($nX != '' || $nY != '') {?>
document.writeln('</div>');
<?php }?>
