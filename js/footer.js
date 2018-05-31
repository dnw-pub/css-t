<!--
function danawa_intro_popup(page)
{
    var url = '';
    switch (page) {
        case 1 : url = 'http://www.danawa.com/info/agreement.html';			break;
        case 2 : url = 'http://www.danawa.com/info/helprule_private.html';	break;
        case 3 : url = 'http://www.danawa.com/info/liability.html';			break;
		case 4 : url = 'http://www.danawa.com/info/boyspro.html';			break;
    } // end switch
    var opt = 'width=930,height=700,scrollbars=yes';
    var danawa_intro = window.open(url, 'danawa_intro', opt);
    danawa_intro.focus();
} // end func danawa_intro_popup
//-->
