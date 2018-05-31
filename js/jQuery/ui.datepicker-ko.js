/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {clearText: '�����', clearStatus: '',
		closeText: '�ݱ�', closeStatus: '',
		prevText: '������', prevStatus: '',
		nextText: '������', nextStatus: '',
		currentText: '����', currentStatus: '',
		monthNames: ['1��(JAN)','2��(FEB)','3��(MAR)','4��(APR)','5��(MAY)','6��(JUN)',
			'7��(JUL)','8��(AUG)','9��(SEP)','10��(OCT)','11��(NOV)','12��(DEC)'],
		monthNamesShort: ['1��(JAN)','2��(FEB)','3��(MAR)','4��(APR)','5��(MAY)','6��(JUN)',
			'7��(JUL)','8��(AUG)','9��(SEP)','10��(OCT)','11��(NOV)','12��(DEC)'],
		monthStatus: '', yearStatus: '',
		weekHeader: 'Wk', weekStatus: '',
		dayNames: ['��','��','ȭ','��','��','��','��'],
		dayNamesShort: ['��','��','ȭ','��','��','��','��'],
		dayNamesMin: ['��','��','ȭ','��','��','��','��'],
		dayStatus: 'DD', dateStatus: 'D, M d',
		dateFormat: 'yy-mm-dd', firstDay: 0, 
		initStatus: '', isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});