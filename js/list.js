$(function(){
	$("#select").on("click",function(){
		//console.log($("#list1"))
		$("#list1").toggle();
		$(".select").toggle();
		$("#more").toggle();
	})
	$("#more").on("click",function(){
		//console.log($("#list1"))
		$("#list1").toggle();
		$("#list2").toggle();
		$("#select").toggle();
	})
	$(".price").on("click",function(){
		//console.log($("#list1"))
		$(".price_more").toggle();
		$(".price_select").toggle();
	})
	$(".select button").click(function(){
		console.log(1)
		$(".select").hide()
		$("#list1").show()
	})
	$(".price_select button").click(function(){
		console.log(1)
		$(".price_select").hide()
		$(".price_more").show()
	})	
	

$(function(){
	//加载头部文件
	$("#warn").load("http://10.9.171.107:8888/daling/html/header.html .warn_inner",function(){
		 hoverOn($("#warn"),$("a"),"#e34755");
		 //下载APP
		 $("#loading").hover(function(){
		   	 $(this).children("div").stop().fadeIn(500)
		   },function(){
		    	$(this).children("div").stop().fadeOut(500)
		   })
	})
	$("#top").load("http://10.9.171.107:8888/daling/html/header.html .top_inner",function(){
		//搜索框一栏
           hoverOn($(".list"),$("a"),"#e34755");
	})
	$("#nav").load("http://10.9.171.107:8888/daling/html/header.html .nav_inner",function(){
		    //导航条部分
		$(".types").hover(function(){
			$(".down").css({
				display:"none"
			})
			$(".up").css({
				display:"block"
			})
		},function(){
			$(".down").css({
				display:"block"
			})
			$(".up").css({
				display:"none"
			})
		})
       //导航条的变色
      hoverOn($(".nav"),$("a"),"#cccccc")
    //左侧二级菜单
       	 	$(".goodslist").find("dl").on("mouseover",function(){
		       //	console.log($(".goodslist").find("dl").length)
		       	     $(this).children($("div")).show()	
		       	     $(this).css({
		       	     	background:"#fff",
		       	     	borderLeft:"1px solid #000",
		       	     	borderBottom:"1px solid #000",
		       	     	borderTop:"1px solid #000",
		       	     })
		       })
		        $(".goodslist").find("dl").on("mouseout",function(){
		       	     $(".inner").hide()
		       	      $(this).css({
		       	     	background:"",
		       	     	borderLeft:"",
		       	     	borderBottom:"",
		       	     	borderTop:""
		       	     })
		       })      
     // $("dl").find("a").
      hoverOn($("dl"),$("a"),"#e34755");
	})
	//封装一个鼠标移入移除改变颜色的函数
	function hoverOn(father,son,color){
		father.find(son).hover(function(){
         		$(this).css({
         			color:color
         		})       		
         	},function(){
         		$(this).css({
         			color:""
         		})
         	})
	} 
   $("#footer").load("http://10.9.171.107:8888/daling/html/footer.html .footer_inner",function(){
   	 hoverOn($(".b_list"),$("a"),"#664996")
   })

$("#rightButon").load("http://10.9.171.107:8888/daling/html/footer.html .rightButon_inner",function(){
   	//console.log($(".right_shop"))
   	     $(".rightButon_shop,.p1,.p2").hover(function(){
   	    	
   	    	$(this).css({
   	    		background:"#e34755",
   	    		color:"#fff"
   	    	})
   	    },function(){
   	    	$(this).css({
   	    		background:"",
   	    		color:"#fff"
   	    	})
   	    })
   	    $(".rightButon_shop").click(function(){
   	    	$(".inside_shop,.inside").toggle()  	    	
   	    })
   	     $(".p1").click(function(){
   	    	$(".inside_money,.inside").toggle()
   	    })
   	      $(".p2").click(function(){
   	    	$(".inside_like,.inside").toggle()
   	    })
   	      $(".clear").click(function(){
   	      	$(".inside").hide()
   	      })
       	  $(document).scroll(function(){    	  	
		       if($(this).scrollTop() >= 650){
		       	$(".p4").stop().show(500)
		       }else{
		       		$(".p4").stop().hide(500)
		       }	       
	      })
       	  $(".p4").on("click",function(){
       	  	 $("html,body").animate({scrollTop:0},500)
       	  })
     //调用换一换功能
//       var change=new Change();
//           change.load()
            

           new Pagination()
   })
})

})
	
