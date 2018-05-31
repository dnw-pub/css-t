
		//***************************************************************
		//* RunRealSize(sid,pcode)  : RealSize Viewer�� ����
		//***************************************************************
		//  �� �Ķ����
		//     rsetcode : ���������� ��ϵ� ��ǰ�ڵ�� ũ����� ��� ,�� ���� (type:string)
		//
		//     ��)
		//       - ����ũ�⺸�� : ��ǰ�ڵ尡 PD_0001 �� ��ǰ ����ũ�⺸�� ȣ���
		//         RunRealSize(14,'PD_0001') �� ȣ���ϸ� ��. (�տ� 14�� �����ڵ��� �����ٳ���, 6-��ī�ٳ���, 5-�Ǿ��ٳ���)
		//
		//       - ����ũ��� ���� : ��ǰ�ڵ� PD_0001 �� ��ǰ�� ��ǰ�ڵ� PD_0002 �� �ΰ��� ��ǰ�� ũ��񱳷� ȣ���� ���
		//         RunRealSize(14,'PD_0001,PD_0002')�� ȣ���ϸ� ��.
		//***************************************************************
	
		function RunRealSize(sid,pcode) {
			
			if(pcode == "" || pcode == null) {
				alert("����ũ�⺸�⸦ ���� �ش� ��ǰ�ڵ尡 �����ϴ�.");
				return false;
			}

			var win_domain = 'http://img.danawa.com/rsi';        //�������� ������ ������ ������ �Ǵ� IP
			var win_url =  win_domain + '/RealSize/Applications/RSIViewerRun.htm';
			var winPopWidth = 330;
			var winPopHeight = 210;
			var winLeft = (screen.width - winPopWidth) / 2 ;
			var winTop = (screen.height - winPopHeight) / 2 ;
			
			win_url +=  '?sid=' + sid ;

			var ary_setcode = pcode.split(',');
			for(var i=1 ; i<=ary_setcode.length ; i++){
				win_url +=  '&pcode' + i + '=' + escape(ary_setcode[i-1]) ;
			}
			
			var win_name = 'winRealSize' ;
			var win_prop = 'width=' + winPopWidth + ',height=' + winPopHeight + ',top=' + winTop + ',left=' + winLeft + ',toobar=0,scrollbars=0,menubar=0,status=0,directories=0' ;
			
			var winObjPopup = window.open(win_url, win_name , win_prop) ;
			if(winObjPopup == null) {
				alert('���ܵ� �˾��� ����� �ּ���.');
			}
		}