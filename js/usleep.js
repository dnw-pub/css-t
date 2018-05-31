<!--
	// 그냥 n millis 동안 멈추기
	function JSUsleep(numberMillis)
	{
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime) return;
		}
	}
	
	// 모달창 띄우면서 n millis 동안 멈추기
	function JSUsleepWithModal(numberMillis) {
		var dialogScript = 'window.setTimeout('
						 + ' function () { window.close(); }, '
						 + numberMillis + ');';
		var result = 
					// IE
					window.showModalDialog(
							'javascript:document.writeln(' +
							'"<script>' +
							dialogScript +
							'<' + '/script>잠시만 기다려 주세요")');
					// NN
					/* openDialog(
						'javascript:document.writeln(' +
						'"<script>' +
						dialogScript +
						'<' + '/script>잠시만 기다려 주세요"', 'pauseDialog', 'modal=1,width=10,height=10');
					*/
	}
	/*
	function start() {
		alert('1');
		pause(2000);
		alert('2');
		pauseWithModal(2000);
		alert('3');
	}
	window.onload=start
	*/
//-->