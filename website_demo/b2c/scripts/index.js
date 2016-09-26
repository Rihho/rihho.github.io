//搜索框文字效果
$(function() {
	$("#inputSearch").focus(function() {
		$(this).addClass('focus');
		if($(this).val() == this.defaultValue) {
			$(this).val("");
		}
	}).blur(function() {
		$(this).removeClass('focus');
		if($(this).val() === "") {
			$(this).val(this.defaultValue);
		}
	}).keyup(function(e) {
		if (e.which == 13) {
			alert("搜索功能尚在测试中！");
		}
	});
});

//导航条弹出功能
$(function() {
	$("#nav li").hover(function() {
		$(this).find('.jnNav').show();
	}, function() {
		$(this).find('.jnNav').hide();
	});
})

//热销高亮动画
$(function() {
	$(".jnCatainfo .promoted").append('<s class="hot"></s>')
})

//主屏轮播图
$(function() {
	var $imgrolls = $("#jnImageroll div a");
	$imgrolls.css('opacity', '0.7');
	var len = $imgrolls.length;
	var index = 0;
	var adTimer = null;
	$imgrolls.mouseover(function() {
		index = $imgrolls.index(this);
		showImg(index);
	}).eq(0).mouseover();
	$("#jnImageroll").hover(function() {
		if (adTimer) {
			clearInterval(adTimer)
		}
	}, function() {
		adTimer = setInterval(function() {
			showImg(index);
			index ++;
			if (index == len) {index = 0}
		}, 3000);
	}).trigger('mouseleave');
})
function showImg(index) {
	var $rollobj = $("#jnImageroll");
	var $rolllist = $rollobj.find('div a');
	var newhref = $rolllist.eq(index).attr('href');
	$("#JS_imgWrap").attr('href', 'newhref')
					.find('img').eq(index).stop(true, true).fadeIn()
					.siblings().fadeOut();
	$rolllist.removeClass('chos').css('opacity', '0.7')
			.eq(index).addClass("chos").css('opacity', '1.0');
}

//最新动态链接提示
$(function() {
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(m) {
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>"+ this.myTitle + "</div>";
		$("body").append(tooltip);
		$("#tooltip")
				.css({
					"top": (m.pageY+y) + 'px',
					"left": (m.pageX+x) + 'px'
				}).show('fast');
	}).mouseout(function() {
		this.title = this.myTitle;
		$("#tooltip").remove();			
	}).mousemove(function(m) {
		$("#tooltip")
				.css({
					"top": (m.pageY+y) + 'px',
					"left": (m.pageX+x) + 'px'
					});
	});
})

//品牌活动横向滚动
$(function() {
	$("#jnBrandTab li a").click(function() {
		$(this).parent().addClass('chos')
				.siblings().removeClass('chos');
		var idx = $("#jnBrandTab li a").index(this);
		showBrandList(idx);
		return false;
	}).eq(0).click();
})
function showBrandList(index) {
	var $rollobj = $("#jnBrandList");
	var rollWidth = $rollobj.find('li').outerWidth();
	rollWidth = rollWidth * 4;
	$rollobj.stop(true , false).animate({left : -rollWidth*index}, 1000);
}