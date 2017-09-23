define(["../module/op","../module/Magnifier","../module/nextPag","../module/pagination"],function(opera,mirror,pag,fanye){ 
		opera.init();
		mirror.init();
		pag.load();
        fanye.load();
           

})
$(function(){
			//消费者告知书的显示与隐藏
	$(".share").children("div").eq(2).hover(function(){
		$(this).removeClass("warn_more").addClass("warn_more2");
		$(".note").show()
		$("#span_icon").removeClass("span_icon1").addClass("span_icon2");
	},function(){
		$(this).removeClass("warn_more2").addClass("warn_more");
		$(".note").hide()
		$("#span_icon").removeClass("span_icon2").addClass("span_icon1");
	})
	//滚动条滚动时tag2的隐藏与显示
	$(document).scroll(function(){
		//console.log($(".info1").offset().top-20)
		if($(this).scrollTop() >= $(".info1").offset().top-20){	
			$(".tag2").show()
		}else{
			$(".tag2").hide()
		}	

	})
	$(".tag ul").children("li").click(function(){
		$(".tag ul").children("li").removeClass("current");
		$(this).addClass("current")
	})
  //楼梯的简单效果
	$(".tag2 ul").children("li").click(function(){
		$(".tag2 ul").children("li").removeClass("current");
		$(this).addClass("current")
	})
	$(".mess").click(function(){
     console.log(1)
      $("html,body").animate({scrollTop:$(".info1").offset().top-20},500)
	})
	$(".dis").click(function(){
		$("html,body").animate({scrollTop:$(".data_discuss").offset().top+10},500)
	})
	$(".afterBuy").click(function(){
		$("html,body").animate({scrollTop:$(".balaa").offset().top},500)
	})
	//单选按钮的选中
	$('input[name="box"]').click(function(){
	 $('input[name="box"]').next("span").css({
			color:""
		})
		$(this).next("span").css({
			color:"#E14958"
		})
	})
})