<!--
/*
	20070605	Julio
	�����ؽ�Ʈ�� ���������� �����ش�.
	����ȭ�� ��Ʈ���忡

	JS : 
	var metrix = new Array();
	metrix[0] = "�ؽ�Ʈ1";
	metrix[1] = "�ؽ�Ʈ2";

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
	//	object ��ü �̸�
    this.className = name;
	//	javascript ����( �迭�� �����ϴ� �ؽ�Ʈ ��� );
    this.arrange = arrange;
	//	arrange �迭�� �Ѱ���
	this.cnt = 0;
	//	�ش� �ؽ�Ʈ ���� : ������� �ʴ´�.
    this.height = 18;
	//	setInterval �޼ҵ� ȣ��� �Ͽ��ϴ� timer ��
    this.timer;
	//	setInterval ȣ���ֱ�
    this.gap = 2000;
	//	�ݺ��Ǵ� ��
    this.i = 0;
	//	action flag
    this.flag = true;
	//	getElementById
    this.obj;
}
/*
	main method
	XXX.action(); �� ȣ������� �۵��Ѵ�.
*/
showTextBox.prototype.action = function()
{  
	this.cnt = this.arrange.length;
    for(var i=0; i<this.cnt; i++) this.echo(i);
    if (this.cnt>0) this.timer = window.setInterval( this.className + ".view_show();", this.gap );
}
/*
	text�� div�θ�����ִ� method
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
	�ؽ�Ʈ�� ���������� �����ֱ����� ����Լ�
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