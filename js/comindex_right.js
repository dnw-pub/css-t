function _popup(x,y,Namestr){
      //¿øµµ¿ì ¿ÀÇÂ 
      controlWindow=window.open( "",Namestr, "toolbar=auto,location=no,directories=no,status=0,menubar=no,scrollbars=yes,top=50,left=50,resizable=yes,width="+x+",height="+y);
}
function _popup1(x,y,Namestr){
      //¿øµµ¿ì ¿ÀÇÂ 
      controlWindow=window.open( "",Namestr, "toolbar=auto,location=no,directories=no,status=0,menubar=yes,scrollbars=yes,top=50,left=50,resizable=yes,width="+x+",height="+y);
}
 
function na_open_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
  toolbar_str = toolbar ? 'yes' : 'no'; 
  menubar_str = menubar ? 'yes' : 'no'; 
  statusbar_str = statusbar ? 'yes' : 'no'; 
  scrollbar_str = scrollbar ? 'yes' : 'no'; 
  resizable_str = resizable ? 'yes' : 'no'; 
  window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

function right(e)
{
    if (navigator.appName == 'Netscape' && (e.which == 3 || e.which == 2))
        return false;
    else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3))  
        return false;
    return true;
}

if (document.layers) window.captureEvents(Event.MOUSEDOWN);
window.onmousedown=right;
document.onmousedown=right;
