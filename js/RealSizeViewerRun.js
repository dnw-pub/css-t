
		//***************************************************************
		//* RunRealSize(sid,pcode)  : RealSize Viewer를 실행
		//***************************************************************
		//  ㅁ 파라메터
		//     rsetcode : 리얼사이즈로 등록된 제품코드로 크기비교일 경우 ,로 구분 (type:string)
		//
		//     예)
		//       - 실제크기보기 : 상품코드가 PD_0001 인 제품 실제크기보기 호출시
		//         RunRealSize(14,'PD_0001') 로 호출하면 됨. (앞에 14는 서비스코드인 가전다나와, 6-디카다나와, 5-피씨다나와)
		//
		//       - 실제크기비교 보기 : 상품코드 PD_0001 인 제품과 상품코드 PD_0002 인 두개의 제품을 크기비교로 호출할 경우
		//         RunRealSize(14,'PD_0001,PD_0002')로 호출하면 됨.
		//***************************************************************
	
		function RunRealSize(sid,pcode) {
			
			if(pcode == "" || pcode == null) {
				alert("실제크기보기를 위한 해당 제품코드가 없습니다.");
				return false;
			}

			var win_domain = 'http://img.danawa.com/rsi';        //리얼사이즈가 장착된 서버의 도메인 또는 IP
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
				alert('차단된 팝업을 허용해 주세요.');
			}
		}