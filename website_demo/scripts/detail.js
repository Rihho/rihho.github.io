//图片放大镜
$(function() {
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens: true,
		preloadImages: false,
		alwaysOn: false,
		zoomWidth: 340,
		zoomHeight: 340,
		xOffset: 10,
		yOffset: 0,
		position: 'right'
	});
});

//单击小图切大图
$(function() {
	$("#jnProitem ul.imgList li a").bind('click', function() {
		var imgSrc = $(this).find('img').attr('src');
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);	//提取文件名后缀
		imgSrc = imgSrc.substring(0,i); //提取文件名本体
		var imgSrc_big = imgSrc + "_big" + unit; //合并加上_big部分后的文件名
		$("#thickImg").attr('href', imgSrc_big);
	});
});

//产品属性选项卡
$(function() {
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function() {
		$(this).addClass('selected')
				.siblings().removeClass('selected');
		var index = $div_li.index(this);
		$("div.tab_box > div").eq(index).show()
								.siblings().hide();
	});
});

//产品颜色切换
$(function() {
	$(".color_change ul li img").click(function() {
		$(this).addClass('hover')
				.parent().siblings().find('img').removeClass('hover');
		var imgSrc = $(this).attr('src');
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
		var imgSrc_big = imgSrc + "_one_big" + unit;
		var imgSrc_small = imgSrc + "_one_small" + unit;
		$("#bigImg").attr('src', imgSrc_small);  //主页面产品换色
		$("#thickImg").attr('href', imgSrc_big);	//弹出窗口产品换色
		var alt = $(this).attr('alt');
		$(".color_change strong").text(alt);	//文字行：颜色 改变
		var newImgSrc = imgSrc.replace("images/pro_img/", "");	//删除文件名中的路径部分
		$("#jnProitem .imgList li").hide(); //隐藏中间三张小图
		$("#jnProitem .imgList").find('.imgList_' + newImgSrc).show(); //替换为含有当前颜色字段的图片

		$("#jnProitem .imgList").find('.imgList_' + newImgSrc).eq(0).find('a').click();
	});
});

//尺寸选择文字切换
$(function() {
	$(".pro_size li").click(function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parent('ul').siblings('strong').text($(this).text());
	});
});

//总价计算
$(function() {
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function() {
		var num = $(this).val();
		var amount = num * price;
		$span.text( amount );
	}).change();
});

//评分系统
$(function() {
	$("ul.rating li a").click(function() {
		var title = $(this).attr('title');
		alert("您为此商品的评分是：" + title);
		var cl = $(this).parent().attr('class');
		$(this).parent().parent().removeClass().addClass('rating ' + cl + "star");
		$(this).blur();
		return false;
	});
});