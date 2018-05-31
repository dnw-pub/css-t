var scrollerwidth = 472;
var total_area_b = 0;
var scroll_interval;

var scrollspeed = 2;
var waitingtime = 3000;
var s_tmp = 0;
var tmp;

var scroll_act = true;
var scroll_direction = 'left';

function startscroll()
{
	for (i in scroll_contents) {
		insert_area_b(total_area_b, total_area_b++);
	}
	if (total_area_b > 1) {
		scroll_interval = setInterval("scroll_left()", waitingtime);
	}
}

function scroll_left()
{
	if (total_area_b > 1) {
		if (scroll_act) {
			if (scroll_direction != 'left') {
				arrange_area('left');
			}
			for (i = 0; i < total_area_b; i++) {
				tmp = document.getElementById('scroll_area'+i).style;
				tmp.left = parseInt(tmp.left) - scrollspeed;
				if (parseInt(tmp.left) <= -scrollerwidth) {
					tmp.left = scrollerwidth * (total_area_b - 1);
				}
			}
			if ((s_tmp += scrollspeed) >= (scrollerwidth/4)) {
				clearInterval(scroll_interval);
				s_tmp = 0;
				scroll_interval = setInterval("scroll_left()", waitingtime);
				return;
			}
		}
		clearInterval(scroll_interval);
		scroll_interval = setInterval("scroll_left()", 1);
	} else {
		clearInterval(scroll_interval);
	}
}

function scroll_right()
{
	if (total_area_b > 1) {
		if (scroll_act) {
			if (scroll_direction != 'right') {
				arrange_area('right');
			}
			for (i = 0; i < total_area_b; i++) {
				tmp = document.getElementById('scroll_area'+i).style;
				tmp.left = parseInt(tmp.left) + scrollspeed;
				if (parseInt(tmp.left) >= scrollerwidth) {
					tmp.left = -scrollerwidth * (total_area_b - 1);
				}
			}
			if ((s_tmp -= scrollspeed) <= -(scrollerwidth/4)) {
				clearInterval(scroll_interval);
				s_tmp = 0;
				scroll_interval = setInterval("scroll_right()", waitingtime);
				return;
			}
		}
		clearInterval(scroll_interval);
		scroll_interval = setInterval("scroll_right()", 1);
	} else {
		clearInterval(scroll_interval);
	}
}


function insert_area_b(idx, n)
{
	document.writeln('<div style="left: ' + (scrollerwidth * n) + 'px;" id="scroll_area' + n + '" class="scroll_member">');
	document.writeln(scroll_contents[idx]);
	document.writeln('</div>');
}

function arrange_area(dir)
{
	if (dir == 'right') {
		for (i = 0; i < total_area_b; i++) {
			tmp = document.getElementById('scroll_area' + i).style;
			if (parseInt(tmp.left) >= scrollerwidth) {
				tmp.left = parseInt(tmp.left) - (scrollerwidth * total_area_b);
			}
		}
	} else if (dir == 'left') {
		for (i = 0; i < total_area_b; i++) {
			tmp = document.getElementById('scroll_area' + i).style;
			if (parseInt(tmp.left) <= -scrollerwidth) {
				tmp.left = parseInt(tmp.left) + (scrollerwidth * total_area_b);
			}
		}
	}
	scroll_direction = dir;
}