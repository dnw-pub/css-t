<?php
require_once 'com/danawa/settings/GlobalPathConst.php';
Header("content-type: application/x-javascript");

ob_start();

$sFile = GLOBAL_GENFILES_PATH.'/JS/market/MIDGAME.js';
$fp = fopen($sFile, "r") or die("<!-- ���Ͽ��⿡ �����Ͽ����ϴ� -->");
while(!feof($fp)){
	$buffer .= fread($fp,1024);
}
echo $buffer;
fclose($fp);

ob_end_flush();
