<!--
	// �׳� n millis ���� ���߱�
	function JSUsleep(numberMillis)
	{
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		
		while (true) {
			now = new Date();
			if (now.getTime() > exitTime) return;
		}
	}
	
	// ���â ���鼭 n millis ���� ���߱�
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
							'<' + '/script>��ø� ��ٷ� �ּ���")');
					// NN
					/* openDialog(
						'javascript:document.writeln(' +
						'"<script>' +
						dialogScript +
						'<' + '/script>��ø� ��ٷ� �ּ���"', 'pauseDialog', 'modal=1,width=10,height=10');
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