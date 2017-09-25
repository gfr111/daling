$(function(){
	//活动banner图
	$("#play span").click(function(){
		$("#play").hide()
	})

	//轮播图功能
	   $('.banner_inner').banner({
	   	  imgs:$(".pic ul li"),
	   	  items:$(".pic_span").children(),
	   	  left:$("#left"),
	   	  right:$("#right")
	   })
//换一换功能
     function Change(){
       	this.index=0
       	this.load()
      // 	console.log(1)
       }
      Change.prototype.load=function(){
       	var that=this
       	//console.log(1)
       	 $.ajax({
      	    url:"http://10.9.171.107:8888/daling/data/change.php",
      	    dataType:"json"
      	}).then(function(res){
      		 that.res=res;
      		// that.init()
      		 that.changeLi() 
      		$("#change").click(function(){
	      	 	if(that.index==Math.floor(that.res.length/4)-1){
					that.index=0;
				}else{
					that.index++
				}
	      	    that.changeLi();
      	  })
      	}) 
      }
//    Change.prototype.init=function(){
//    	var that=this;
//    	
//    }
       Change.prototype.changeLi=function(){     	
      	     var html=""
      		for(var i=this.index*4;i<this.index*4+4;i++){
      			if(i<this.res.length){
      				html+=`<li>
	    	      		<a href="##"><img src="${this.res[i].img}"  /></a>
	    	      		<div id="data">
	    	      			<p class="list_p1">
	    	      			<span class="money">${this.res[i].money}</span>
	    	      			<span class="new_price">${this.res[i].new_price}</span>
	    	      			<s>${this.res[i].s}</s>
	    	      			<span class="like">${this.res[i].like}</span>
	    	      		</p>
	    	      		<p class="list_p2">
	    	      			<span>${this.res[i].zhe}</span>
	    	      			<span>${this.res[i].span}</span>
	    	      		</p>
	    	      		</div>
	    	      		<div class="shopcar1">
	    	      			<a href="##">
	    	      				加入购物车<i class="iconfont">&#xe601;</i>
	    	      			</a>
	    	      		</div>
	    	      	</li>`
      			}
      			
      		}
      		$("#new").html(html);
      }
      new Change()
           
      //下方选项卡
      $.get("http://10.9.171.107:8888/daling/data/index.php",{data:"0"},function(res,status,defer){
				//利用回调函数的返回值将数据插入页面中
			       	$(".good-list1").html(res)
       })
      $(".goodtitle ul").find("li").on("click",function(){
      	  //console.log($(this).index())    	 
      	  	$(this).css({
       		background:"#e14958"
       	    })
      	  	$(this).siblings().css({
      	  		background:""
      	  	})
	       	$(this).children("a").css({
	       		color:"#fff"
	       	})
	       	$(this).siblings().children("a").css({
      	  		color:""
      	  	})
	       	
          //上传相应的数据，
      	 $.get("http://10.9.171.107:8888/daling/data/index.php",{data:$(this).index()},function(res,status,defer){
				//利用回调函数的返回值将数据插入页面中
			       	$(".good-list1").html(res)
       })
      })    
      //买了又买功能
     //鼠标移入最外层的dl,先让第一个dd的class改变在进行其他的运动
     //console.log($(".buyAgain").find("dl").children("div"))
     $(".buyAgain").find("dl").mouseenter(function(){
        // console.log(1)
        //在每个dd上运动的时候
        $(this).children("dd").eq(0).removeClass("list_second")
     	  .addClass("list_first")
		     $(this).find("dd").hover(function(){
		     	$(this).removeClass("list_first")
		     	$(this)
		     	.addClass("list_second")
		     },function(){
		     	$(this).removeClass("list_second")
		     	.addClass("list_first")   	
		     })
     })
    $(".buyAgain").find("dl").mouseleave(function(){
     	  $(this).children("dd").eq(0).removeClass("list_first")
     	  .addClass("list_second")
     })
    //闪购倒计时
    function  ResTime(){
        var date = new Date();  // 当前时间
        var hour = date.getHours();  // 获取时
        var min = date.getMinutes();  // 获取分
        var s = date.getSeconds();  // 获取秒
        var resH = 23-hour;
        var resM = 59-min;
        var resS = 60-s;
        resH = resH<10 ? "0"+resH : resH;
        resM = resM<10 ? "0"+resM : resM;
        resS = resS<10 ? "0"+resS : resS;       
        $("#hours").html(resH);
		 $("#minutes").html(resM);
		$("#seconds").html(resS);
	}
    setInterval(function(){
    	ResTime()
    },1000)
})
