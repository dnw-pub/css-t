<?php
//header("HTTP/1.0 200 OK");
//header('Content-type: text/json; charset=utf-8');
//header('Content-type: text/html; charset=utf-8');
header("content-type: application/x-javascript; charset=euc-kr");
/*
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Pragma: no-cache");
*/

require_once 'com/danawa/settings/gnb/GnbPathConst.php';
//print_r($_ENV);

$nMenuType	= (!(int)$_GET['nMenuType'])	? 1 : (int)$_GET['nMenuType'];
$nMenuGroup	= (!(int)$_GET['nMenuGroup'])	? 0 : (int)$_GET['nMenuGroup'];
$nMenuMode	= (int)$_GET['nMenuMode'];	// 999값으로 들어오면 테스트 모드


if($nMenuMode == 999) {
	$filename_tail_test = '_TEST';
} else {
	$filename_tail_test = '';
}


if(!$_GET['sDataType'] || $_GET['sDataType'] == '')
	$sDataType = 'json';
else
	$sDataType = $_GET['sDataType'];


$php_data_path	= GNB_CACHE_PATH.DIRECTORY_SEPARATOR.'PHP';
$file_name		= "danawaMenu_{$nMenuType}_{$nMenuGroup}{$filename_tail_test}_utf8.php";

if(is_file($php_data_path.DIRECTORY_SEPARATOR.$file_name)) {}
else {
	$nMenuGroup = 0;
	$file_name		= "danawaMenu_{$nMenuType}_{$nMenuGroup}{$filename_tail_test}_utf8.php";
}

include $php_data_path.DIRECTORY_SEPARATOR.$file_name;
$data = $danawaMenu[$nMenuType][$nMenuGroup];

switch (strtolower($sDataType)) {
	case 'xml'	: break;
	case 'json'	:
	default		:
		echo $_GET['jsoncallbackmenu'].'('.json_encode($data).');';
		//echo json_encode($data);
		break;
}

//if($mode == 'encode') echo json_encode($data);
//else echo $data;

exit;
?>