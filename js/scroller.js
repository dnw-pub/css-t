<!--
var boom_scrollerheight = 110;
var boom_total_area = 0;
var boom_scroll_interval;

var boom_scrollspeed = 5;
var boom_waitingtime = 3000;
var s_tmp = 0;
var tmp;

var boom_scroll_act = true;
var scroll_direction = 'down';

function boom_startscroll()
{
	for (i in scroll_contents) {
		boom_insert_area(boom_total_area, boom_total_area++);
	}
	if (boom_total_area > 1) {
		boom_scroll_interval = setInterval("boom_scroll_down()", boom_waitingtime);
	}
}

function boom_scroll_down()
{
	if (boom_total_area > 1) {
		if (boom_scroll_act) {
			if (scroll_direction != 'down') {
				boom_arrange_area('down');
			}
			for (i = 0; i < boom_total_area; i++) {
				tmp = document.getElementById('boom_scroll_area'+i).style;
				tmp.top = parseInt(tmp.top) - boom_scrollspeed;
				if (parseInt(tmp.top) <= -boom_scrollerheight) {
					tmp.top = boom_scrollerheight * (boom_total_area - 1);
				}
			}
			if ((s_tmp += boom_scrollspeed) >= boom_scrollerheight) {
				clearInterval(boom_scroll_interval);
				s_tmp = 0;
				boom_scroll_interval = setInterval("boom_scroll_down()", boom_waitingtime);
				return;
			}
		}
		clearInterval(boom_scroll_interval);
		boom_scroll_interval = setInterval("boom_scroll_down()", 1);
	} else {
		clearInterval(boom_scroll_interval);
	}
}

function boom_scroll_up()
{
	if (boom_total_area > 1) {
		if (boom_scroll_act) {
			if (scroll_direction != 'up') {
				boom_arrange_area('up');
			}
			for (i = 0; i < boom_total_area; i++) {
				tmp = document.getElementById('boom_scroll_area'+i).style;
				tmp.top = parseInt(tmp.top) + boom_scrollspeed;
				if (parseInt(tmp.top) >= boom_scrollerheight) {
					tmp.top = -boom_scrollerheight * (boom_total_area - 1);
				}
			}
			if ((s_tmp -= boom_scrollspeed) <= -boom_scrollerheight) {
				clearInterval(boom_scroll_interval);
				s_tmp = 0;
				boom_scroll_interval = setInterval("boom_scroll_up()", boom_waitingtime);
				return;
			}
		}
		clearInterval(boom_scroll_interval);
		boom_scroll_interval = setInterval("boom_scroll_up()", 1);
	} else {
		clearInterval(boom_scroll_interval);
	}
}

function boom_insert_area(idx, n)
{
	document.writeln('<div style="top: ' + (boom_scrollerheight * n) + 'px;" id="boom_scroll_area' + n + '" class="scroll_member">');
	document.writeln(scroll_contents[idx]);
	document.writeln('</div>');
}

function boom_arrange_area(dir)
{
	if (dir == 'up') {
		for (i = 0; i < boom_total_area; i++) {
			tmp = document.getElementById('boom_scroll_area' + i).style;
			if (parseInt(tmp.top) >= boom_scrollerheight) {
				tmp.top = parseInt(tmp.top) - (boom_scrollerheight * boom_total_area);
			}
		}
	} else if (dir == 'down') {
		for (i = 0; i < boom_total_area; i++) {
			tmp = document.getElementById('boom_scroll_area' + i).style;
			if (parseInt(tmp.top) <= -boom_scrollerheight) {
				tmp.top = parseInt(tmp.top) + (boom_scrollerheight * boom_total_area);
			}
		}
	}
	scroll_direction = dir;
}
-->
