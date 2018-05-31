<?php
header("Content-Type: application/x-javascript; charset=euc-kr");

require_once "/home/danawa/blog/lib/SITE_VAR.php";		// $_aSiteC 배열

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
document.writeln('<div id="cateDarg" style="position:absolute; left:<?=$nX?>px; top:<?=$nY?>px;">');
<?php } else {?>
document.writeln('<div id="cateDarg">');
<?php } ?>
<?php if($sSendName) {?>
document.writeln('<p class="dargCate"><strong><?=$sSendName?></strong>에 대한 궁금증</p>');
<?php } else { /*?>
document.writeln('<p class="dargCate">무엇이든<br/>물어보세요!!</p>');
<?php */} ?>
document.writeln('<p class="dargBtn">');
document.writeln('<a href="javascript:QnAPopOpen()"><img src="http://img.danawa.com/new/main_new/img/btn_dargwrite.gif" alt="질문하기" /></a>');
<?php if($sSendName) {?>
document.writeln('<a href="http://search.danawa.com/dsearch.php?nSiteCode=0&k1=<?=urlencode($sSendName)?>&tab=article&more=3" target="_top"><img src="http://img.danawa.com/new/main_new/img/btn_dargsearch.gif" alt="검색하기" /></a>');
<?php }?>
document.writeln('</p>');
document.writeln('</div>');