$(document).on('click', '#list > li', function(event) {
	event.preventDefault();
	var index = $(this).index();
	changeTags(index);
	jumpTo(index);
});
$(document).scroll(function(event) {
	var scrollTop = $(document).scrollTop();
	$("#backTop").each(function() {
		if (scrollTop > 200) {
		$("#backTop").css('display', 'block');
		} else {
			$("#backTop").css('display', 'none');
		}
	});
	if ($("body").is(':animated')) {	//当不在动画中，即非点击造成的滑动时才进行操作
		return;
	}	$("section").each(function() {
		var secTop = $(this).offset().top;
		var index = $(this).index();
		if (scrollTop > secTop - 250) {
			changeTags(index);
		} else {
			return false;
		}
	});
});
$(document).on('click', '#backTop', function(event) {
	event.preventDefault();
	$("body").stop();
	$("body").animate({scrollTop: 0}, 800, 'easeInOutCubic');
	changeTags(0);
	$("#backTop").css('display', 'none');
});

function jumpTo(index) {
	var tags = $("section");
	$("body").stop();
	$("body").animate({
		scrollTop: $(tags[index]).offset().top
	}, 800, 'easeInOutCubic');
}

function changeTags(index) {
	var list = $("#list > li");
	list.removeClass();
	$(list[index]).addClass('selected');
}