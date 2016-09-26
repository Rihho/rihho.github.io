var Window_width;
var Window_height;
var Radius;
var Margin_top;
var Margin_left;
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600000);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5","#09c","#a6c","#93c","#9c0","#690","#fb3","#f80","#f44"];

window.onload = function () {
	Window_width = document.documentElement.clientWidth -20;
	Window_height = document.documentElement.clientHeight -20;
	Margin_left = Math.round(Window_width/10);
	Radius = Math.round(Window_width*4/5/108)-1;
	Margin_top = Math.round(Window_height/5);

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	canvas.width = Window_width;
	canvas.height = Window_height;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	setInterval(
		function () {
			render(context);
			update();
		},50);
};

function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	// var ret = endTime.getTime() - curTime.getTime();
	// ret = Math.round(ret/1000);

	// return ret >= 0?ret:0;
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
	return ret;
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600)/60);
	var curSeconds = curShowTimeSeconds%60;

	if (nextSeconds != curSeconds) {
		if (parseInt(curHours/10) != parseInt(nextHours/10)) {
			addBalls(Margin_left+0, Margin_top, parseInt(curHours/10));
		}
		if (parseInt(curHours%10) != parseInt(nextHours%10)) {
			addBalls(Margin_left+15*(Radius+1), Margin_top, parseInt(curHours%10));
		}

		if (parseInt(curMinutes/10) != parseInt(nextMinutes/10)) {
			addBalls(Margin_left+39*(Radius+1), Margin_top, parseInt(curMinutes/10));
		}
		if (parseInt(curMinutes%10) != parseInt(nextMinutes%10)) {
			addBalls(Margin_left+54*(Radius+1), Margin_top, parseInt(curMinutes%10));
		}

		if (parseInt(curSeconds/10) != parseInt(nextSeconds/10)) {
			addBalls(Margin_left+78*(Radius+1), Margin_top, parseInt(curSeconds/10));
		}
		if (parseInt(curSeconds%10) != parseInt(nextSeconds%10)) {
			addBalls(Margin_left+93*(Radius+1), Margin_top, parseInt(curSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].vy += balls[i].g;
		balls[i].y += balls[i].vy;

		if (balls[i].y >= Window_height - Radius) {
			balls[i].y = Window_height - Radius;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}

	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + Radius > 0 && balls[i].x - Radius < Window_width) {}
			balls[cnt++] = balls[i];
	}
	while (balls.length > cnt) {
		balls.pop();
	}
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] ==1) {
				var aBall = {
					x: x+j*2*(Radius+1)+(Radius+1),
					y: y+i*2*(Radius+1)+(Radius+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy: -5,
					color: colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}

function render(cxt) {
	cxt.clearRect(0,0,Window_width, Window_height);//刷新页面

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours * 3600)/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(Margin_left, Margin_top, parseInt(hours/10), cxt);
	renderDigit(Margin_left+15*(Radius+1), Margin_top, parseInt(hours%10), cxt);
	renderDigit(Margin_left+30*(Radius+1), Margin_top, 10, cxt);
	renderDigit(Margin_left+39*(Radius+1), Margin_top, parseInt(minutes/10), cxt);
	renderDigit(Margin_left+54*(Radius+1), Margin_top, parseInt(minutes%10), cxt);
	renderDigit(Margin_left+69*(Radius+1), Margin_top, 10, cxt);
	renderDigit(Margin_left+78*(Radius+1), Margin_top, parseInt(seconds/10), cxt);
	renderDigit(Margin_left+93*(Radius+1), Margin_top, parseInt(seconds%10), cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, Radius, 0, 2*Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}

}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j=0; j<digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+j*2*(Radius+1)+(Radius+1), y+i*2*(Radius+1)+(Radius+1), Radius, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}