<!--
var scrollerwidth	= 420;
var scrollerheight	= 134;

var scrollpixel = 5;
var scrollspeed = 4000;	// 4 sec
var waitingtime = 0;

var k1 = k2 = 2;	// (next) stand-by key of contents array

function new_prod_play_screen_move()
{
	if (new_prod_play.style.pixelTop > 0 && new_prod_play.style.pixelTop <= scrollpixel) {
		new_prod_play.style.pixelTop = 0;
		setTimeout('new_prod_play_screen_move()', scrollspeed);
		setTimeout('new_prod_ready_screen_move()', scrollspeed);
		return;
	}
	if (new_prod_play.style.pixelTop >= new_prod_play.offsetHeight * -1) {
		new_prod_play.style.pixelTop -= scrollpixel;
		setTimeout('new_prod_play_screen_move()', waitingtime);
	} else {
		new_prod_play.style.pixelTop = scrollerheight;
		new_prod_play.innerHTML = new_products[k1];
		if (k1 == new_products.length - 1) {
			k1 = 0;
		} else {
			k1++;
		}
	}
} // end func new_prod_play_screen_move

function best_prod_play_screen_move()
{
	if (best_prod_play.style.pixelTop > 0 && best_prod_play.style.pixelTop <= scrollpixel) {
		best_prod_play.style.pixelTop = 0;
		setTimeout('best_prod_play_screen_move()', scrollspeed);
		setTimeout('best_prod_ready_screen_move()', scrollspeed);
		return;
	}
	if (best_prod_play.style.pixelTop >= best_prod_play.offsetHeight * -1) {
		best_prod_play.style.pixelTop -= scrollpixel;
		setTimeout('best_prod_play_screen_move()', waitingtime);
	} else {
		best_prod_play.style.pixelTop = scrollerheight;
		best_prod_play.innerHTML = best_products[k2];
		if (k2 == best_products.length - 1) {
			k2 = 0;
		} else {
			k2++;
		}
	}
} // end func best_prod_play_screen_move

function new_prod_ready_screen_move()
{
	if (new_prod_ready.style.pixelTop > 0 && new_prod_ready.style.pixelTop <= scrollpixel) {
		new_prod_ready.style.pixelTop = 0;
		setTimeout('new_prod_ready_screen_move()', scrollspeed);
		setTimeout('new_prod_play_screen_move()', scrollspeed);
		return;
	}
	if (new_prod_ready.style.pixelTop >= new_prod_ready.offsetHeight * -1) {
		new_prod_ready.style.pixelTop -= scrollpixel;
		setTimeout('new_prod_ready_screen_move()', waitingtime);
	} else {
		new_prod_ready.style.pixelTop = scrollerheight;
		new_prod_ready.innerHTML = new_products[k1];
		if (k1 == new_products.length - 1) {
			k1 = 0;
		} else {
			k1++;
		}
	}
} // end func new_prod_ready_screen_move

function best_prod_ready_screen_move()
{
	if (best_prod_ready.style.pixelTop > 0 && best_prod_ready.style.pixelTop <= scrollpixel) {
		best_prod_ready.style.pixelTop = 0;
		setTimeout('best_prod_ready_screen_move()', scrollspeed);
		setTimeout('best_prod_play_screen_move()', scrollspeed);
		return;
	}
	if (best_prod_ready.style.pixelTop >= best_prod_ready.offsetHeight * -1) {
		best_prod_ready.style.pixelTop -= scrollpixel;
		setTimeout('best_prod_ready_screen_move()', waitingtime);
	} else {
		best_prod_ready.style.pixelTop = scrollerheight;
		best_prod_ready.innerHTML = best_products[k2];
		if (k2 == best_products.length - 1) {
			k2 = 0;
		} else {
			k2++;
		}
	}
} // end func best_prod_ready_screen_move

function startscroll()
{
	if (document.all) {
		new_prod_play_screen_move();
		new_prod_ready.style.top = scrollerheight;
		new_prod_ready.style.visibility = 'visible';
		best_prod_play_screen_move();
		best_prod_ready.style.top = scrollerheight;
		best_prod_ready.style.visibility = 'visible';
	} // end if
} // end func startscroll

//window.onload = startscroll;
-->
