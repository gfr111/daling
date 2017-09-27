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
         new GetCookie()
   })
   //从cookie中读取数据，填写进页面
    class GetCookie{
       constructor(){
       	  this.load();
    	  //this.num=("#ppp").val()
       }
      load(){
	    var that=this;
	    $.ajax("http://10.9.171.107:8888/daling/data/list.json")
	    	.then(function(res){
	    		that.res=res
	    		//console.log(res)
	    		//that.init()
	    		that.howMany();
	    		that.showCar();
	    	},function(){
	    		//console.log("拼接失败")
	    	})
	    }  
     howMany(){
    	if($.cookie("goods")){
    		var aCookie = JSON.parse($.cookie("goods"));
			var res = 0;
			var price=0;
    		//console.log(aCookie)
    		for(var i=0;i<aCookie.length;i++){
    			res+=aCookie[i].num;
    			var a=parseInt(this.res[aCookie[i].id].span1)
			    		//	console.log(a)
			    price+=aCookie[i].num*a
    		}
    		        $(".num").html(res);   		        
					$("#number").html(res)
					$("#all_price").html("￥"+price)
					if(res>0){
    		        	$(".inside_shop_list").show()
    		        	$(".inside_shop_content").hide()
						$(".all").show()
					}else{
						$(".all").hide()
						$(".inside_shop_list").hide()
    		        	$(".inside_shop_content").show()
					}
$(".all p").children("span").eq(0).html(res);
					return res;
    	}
    }
      showCar(){
    	var that=this;
				if($.cookie("goods")){
					var aCookie = JSON.parse($.cookie("goods"));
					//console.log(this.res[aCookie[2].id].id)
					var html = "";
					for(var i = 0 ; i < aCookie.length ; i++){
					html +=
							`<li class="clearfix"><img src="${this.res[aCookie[i].id].img}" />
		      	   		<div><p>${this.res[aCookie[i].id].span4}</p>
		      	   			<p><span>数量:</span>${aCookie[i].num}<span>价格:</span>${this.res[aCookie[i].id].span1}<span id="${aCookie[i].id}" class="delet">删除</span></p>
		      	   		</div>
		      	   		</li>
							`
					}
					//console.log(html)
					 $(".inside_shop_list ul").html(html)        
				}
				   $(".inside_shop_list").on("click",".delet",function(){
         	      	 // console.log(this)
         	      	 that.dele(this)
         	      })
			}
      dele(obj){
	     	  //console.log($(obj))
	     	  //获取当前点击的元素的id
	     	  var id= $(obj).attr("id")
	     	  console.log(id)
	     	  var cookie=$.cookie("goods");
	     	  //转化成对象
	     	  var aCookie=JSON.parse(cookie);
	     	  //console.log(cookie);
	     	  //在转化后的对象数组中找到当前id所属的对象
	     	  for(var i=0;i<aCookie.length;i++){
	     	  	if(aCookie[i].id==id){
	     	  	    aCookie.splice(i,1);
	     	  	    //console.log(aCookie);
	     	  	    break;
	     	  	}
	     	  }
	     	  //将删除后的cookie再次转化成字符串，填写进cookie
	     	  cookie=JSON.stringify(aCookie);
	     	  $.cookie("goods",cookie,{
	     	  	path:"/daling"
	     	  });
	     	  //删除后再次调用两个函数，及时更新购物车信息
	     	  this.howMany();
	     	  this.showCar();	     	   	
     }
     
  }
    

})
