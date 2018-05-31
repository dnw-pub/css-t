<!--
/*
	20070605	Julio
	한줄텍스트를 순차적으로 보여준다.
	메인화면 핫트렌드에

	JS : 
	var metrix = new Array();
	metrix[0] = "텍스트1";
	metrix[1] = "텍스트2";

	showBox = new showTextBox('showBox', aScrollMainEventContents);
	showBox.style = 'event_scroll_member';

	HTML : 
	<div id="LAY_EventListParent" onmouseover="showBox.flag=false;" onmouseout="showBox.flag=true;">
	<script>showBox.action();
	</div>
*/

function propertyOfobject(o) 
{ 
  var i=1; 
  if(typeof o != 'undefined') { 
    for(var property in o) { 
      document.writeln('<p>'+i+', '+property+' <=> '+o[property]+'</p>'); 
      i++; 
    } 
  } 
} 

showTextBox = function() {
    name = arguments[0] ? arguments[0] : null;
    arrange = arguments[1] ? arguments[1] : null;
    this.init(name, arrange);
}
showTextBox.prototype.init = function(name, arrange) 
{
	//	object 객체 이름
    this.className = name;
	//	javascript 변수( 배열에 존재하는 텍스트 출력 );
    this.arrange = arrange;
	//	arrange 배열의 총개수
	this.cnt = 0;
	//	해당 텍스트 높이 : 사용하지 않는다.
    this.height = 18;
	//	setInterval 메소드 호출시 하용하는 timer 값
    this.timer;
	//	setInterval 호출주기
    this.gap = 2000;
	//	반복되는 값
    this.i = 0;
	//	action flag
    this.flag = true;
	//	getElementById
    this.obj;
}
/*
	main method
	XXX.action(); 을 호출해줘야 작동한다.
*/
showTextBox.prototype.action = function()
{  
	this.cnt = this.arrange.length;
    for(var i=0; i<this.cnt; i++) this.echo(i);
    if (this.cnt>0) this.timer = window.setInterval( this.className + ".view_show();", this.gap );
}
/*
	text를 div로만들어주는 method
*/
showTextBox.prototype.echo = function(i)
{
    var display;
     if (i == 0) {
         display = '';
     }else{
         display = 'none';
     }

    document.write('<div style="top:0px;display:'+display+';" id="' + this.className + i + '" class="'+this.style+'">');
    document.write(this.arrange[i]);
    document.write('</div>');
}
/*
	텍스트를 순차적으로 보여주기위한 재귀함수
*/
showTextBox.prototype.view_show = function()
{
    if (this.cnt>0)
    {
        if (this.flag)
        {
            for(var z=0; z<this.cnt;z++)
            {
				var getId = this.className + z;
				var obj = document.getElementById(getId);

                var view;
                if (this.i == z){
                    view = '';
                }else{
                    view = 'none';
                }
				obj.style.display = view;
            }

            this.i++;
            if (this.i > this.cnt-1)
            {
                this.i = 0;
                if (this.timer) window.clearInterval(this.timer);
                this.timer = window.setInterval( this.className + ".view_show();", this.gap );
				return;
            }
        }

        if (this.timer) window.clearInterval(this.timer);
        this.timer = window.setInterval( this.className + ".view_show();", this.gap );
    }
    else{
        if (this.timer) window.clearInterval(this.timer);
    }
}
-->