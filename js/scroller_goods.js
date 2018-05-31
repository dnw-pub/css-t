<!--
var scrollerheight_goods = 150;
var total_area_b_goods = 0;
var scroll_interval_goods;

var scrollspeed_goods = 5;
var waitingtime_goods = 3000;
var s_tmp_goods = 0;
var tmp_goods;

var scroll_goods_act = true;
var scroll_direction = 'down';

function startscroll_goods()
{
	for (i in scroll_contents) {
		insert_area_b(total_area_b_goods, total_area_b_goods++);
	}
	if (total_area_b_goods > 1) {
		scroll_interval_goods = setInterval("scroll_down_goods()", waitingtime_goods);
	}
}

function scroll_down_goods()
{
	if (total_area_b_goods > 1) {
		if (scroll_goods_act) {
			if (scroll_direction != 'down') {
				arrange_area('down');
			}
			for (i = 0; i < total_area_b_goods; i++) {
				tmp_goods = document.getElementById('scroll_area'+i).style;
				tmp_goods.top = parseInt(tmp_goods.top) - scrollspeed_goods;
				if (parseInt(tmp_goods.top) <= -scrollerheight_goods) {
					tmp_goods.top = scrollerheight_goods * (total_area_b_goods - 1);
				}
			}
			if ((s_tmp_goods += scrollspeed_goods) >= scrollerheight_goods) {
				clearInterval(scroll_interval_goods);
				s_tmp_goods = 0;
				scroll_interval_goods = setInterval("scroll_down_goods()", waitingtime_goods);
				return;
			}
		}
		clearInterval(scroll_interval_goods);
		scroll_interval_goods = setInterval("scroll_down_goods()", 1);
	} else {
		clearInterval(scroll_interval_goods);
	}
}

function scroll_up_goods()
{
	if (total_area_b_goods > 1) {
		if (scroll_goods_act) {
			if (scroll_direction != 'up') {
				arrange_area('up');
			}
			for (i = 0; i < total_area_b_goods; i++) {
				tmp_goods = document.getElementById('scroll_area'+i).style;
				tmp_goods.top = parseInt(tmp_goods.top) + scrollspeed_goods;
				if (parseInt(tmp_goods.top) >= scrollerheight_goods) {
					tmp_goods.top = -scrollerheight_goods * (total_area_b_goods - 1);
				}
			}
			if ((s_tmp_goods -= scrollspeed_goods) <= -scrollerheight_goods) {
				clearInterval(scroll_interval_goods);
				s_tmp_goods = 0;
				scroll_interval_goods = setInterval("scroll_up_goods()", waitingtime_goods);
				return;
			}
		}
		clearInterval(scroll_interval_goods);
		scroll_interval_goods = setInterval("scroll_up_goods()", 1);
	} else {
		clearInterval(scroll_interval_goods);
	}
}

function insert_area_b(idx, n)
{
	document.writeln('<div style="top: ' + (scrollerheight_goods * n) + 'px;" id="scroll_area' + n + '" class="scroll_member">');
	document.writeln(scroll_contents[idx]);
	document.writeln('</div>');
}

function arrange_area(dir)
{
	if (dir == 'up') {
		for (i = 0; i < total_area_b_goods; i++) {
			tmp_goods = document.getElementById('scroll_area' + i).style;
			if (parseInt(tmp_goods.top) >= scrollerheight_goods) {
				tmp_goods.top = parseInt(tmp_goods.top) - (scrollerheight_goods * total_area_b_goods);
			}
		}
	} else if (dir == 'down') {
		for (i = 0; i < total_area_b_goods; i++) {
			tmp_goods = document.getElementById('scroll_area' + i).style;
			if (parseInt(tmp_goods.top) <= -scrollerheight_goods) {
				tmp_goods.top = parseInt(tmp_goods.top) + (scrollerheight_goods * total_area_b_goods);
			}
		}
	}
	scroll_direction = dir;
}
-->
