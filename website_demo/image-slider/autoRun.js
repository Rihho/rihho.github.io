window.onload = function() {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var status = document.getElementsByTagName('li');
	var index = 1; //下方指示器索引值
	var timer;

	var imgs = list.getElementsByTagName('img');
	var oWidth = imgs[0].offsetWidth; //图片宽度
	var totalWidth = oWidth * status.length; //总宽度
	prev.onclick = function() {
		if (index == 1) {
			index = 5;
		} else {
			index--;
		}
		change(oWidth);
		showStatus();
	};
	next.onclick = function() {
		if (index == 5) {
			index = 1;
		} else {
			index++;
		}
		change(-oWidth);
		showStatus();
	};

	play();
	container.onmouseover = function() {
		stop();
	};
	container.onmouseout = function() {
		play();
	};

	for (var i = 0; i < status.length; i++) {
		status[i].onclick = function() {
			if (this.className == 'on') {
				return;
			}
			var oIndex = this.id;
			var offset = -oWidth * (oIndex - index);

			change(offset);
			index = oIndex;
			showStatus();
		};
	}

	function change(offset) {
		var newLeft = list.offsetLeft + offset + 'px'; //动画结束的位置
		var maxWidth = totalWidth - oWidth; //允许移动的最大距离
		if (parseInt(newLeft) > 0) {
			$(list).animate({
				'left': -maxWidth
			}, 300);
		} else if (parseInt(newLeft) < -maxWidth) {
			// list.style.left = 0 + 'px';
			$(list).animate({
				'left': 0
			}, 300);
		} else {
			var left = parseInt(newLeft);
			if (offset > 0) {
				offset = '+=' + offset;
			} else {
				offset = '-=' + Math.abs(offset);
			}
			$(list).animate({
				'left': offset
			}, 300);
		}
	}

	function play() {
		clearInterval(timer);
		timer = setInterval("next.onclick()", 3000);
	}

	function stop() {
		clearInterval(timer);
	}


	function showStatus() {
		for (var i = 0; i < status.length; i++) {
			if (status[i].className === 'on') {
				status[i].className = '';
				break;
			}
		}
		status[index - 1].className = 'on';
	}
};