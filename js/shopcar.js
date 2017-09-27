$(function(){
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
	    		that.showCar();
	    		that.howMany();
	    		that.init();
	    	},function(){
	    		//console.log("拼接失败")
	    	})        
	    }
            init(){
            	    var that=this;
      	            var  value=$(".ppp").val()
      	            //绑定左右的按钮添加或者减少商品
                    $(".shopcarList").on("click","#jia",function(){ 	      			
		         	      	value++;   
		         	      	that.remove(this,value)
		           }) 
		            $(".shopcarList").on("click","#jian",function(){
		            	    //console.log(value)
                             if(value <= 1){
                             	value=1;
                              return false;
                             }else{
                             	value--;
                             }
                            that.remove(this,value)
		           }) 
      }
     howMany(){
     	var that=this;
    	if($.cookie("goods")){
    		var aCookie = JSON.parse($.cookie("goods"));
			var res = 0;
			 var price=0
    		//console.log(aCookie)
    		for(var i=0;i<aCookie.length;i++){
    			res+=aCookie[i].num;
    			//console.log(this.res[aCookie[i].id].span1)
    			//计算侧边栏的价格
    			var a=parseInt(this.res[aCookie[i].id].span1)
    			//console.log(a)
    			//每一项的价格总和
    			  price+=aCookie[i].num*a
    		}
    		//数量
    		       $(".num").html(res);	
					$("#number").html(res)
                      //console.log(this.num)   		       
    		       //购物车添加物品后样式的切换
    		        if(res>0){
    		        	$(".shop_bg").hide()
    		        }else{
    		        	$(".shp_bg").show()
    		        }
    		      $("#allprice").html(price)
    		      $("#bottomprice").html(price)
					return res;
    	}
    }
      showCar(){
      	var that=this;
      	 if($.cookie("goods")){
      	 	var aCookie = JSON.parse($.cookie("goods"));
      	 	//console.log(aCookie)
      	 	var html="";
    		//console.log(aCookie)
    		for(var i=0;i<aCookie.length;i++){
    			html+=`<ul class="clearfix">
	           		<li>
	           			<input type="checkbox" />
	           		</li>
	           		<li>
	           			<a href="##">
	           				<dl>
	           				<dt><img src="${this.res[aCookie[i].id].img}"  /></dt>
	           				<dd><span>${this.res[aCookie[i].id].span4}</span></dd>
	           			</dl>
	           			</a>
	           		</li>
	                 <li>￥${this.res[aCookie[i].id].span1}</li>
	                 <li>
	                 	<a href="##" id="jian" data_id="${aCookie[i].id}">-</a>
	                 	<input type="text" value="${aCookie[i].num}"  class="ppp"/>
	                 	<a href="##" id="jia" dataid="${aCookie[i].id}">+</a>
	                 </li>
	                 <li>￥${this.res[aCookie[i].id].span1*aCookie[i].num}</li>
	                 <li id="${aCookie[i].id}"  class="rem">删除</li>
	           	</ul>`
    		 }
    		  $(".shopcarList").html(html) 
     
    	   }		      	
                     $(".shopcarList").on("click",".rem",function(){
		         	      	 // console.log(this)
		         	      	 that.dele(this)
		          })  
       }
      remove(obj,value){ 
      	//从cookie中读取数据
      	    if($.cookie("goods")){
      	    	//获取相应的属性
      	    	  var id1= $(obj).attr("dataid")
	      	       console.log(id1)
	      	      var id2= $(obj).attr("data_id")
	              console.log(id2)
	              //接受传进来的参数value
	      	      var value=value;
	      	    // console.log(value)
	      	         //获取cookie并转化
      	    	     var cookie=$.cookie("goods");
			     	  //转化成对象
			     	  var aCookie=JSON.parse(cookie);
			     	  //遍历得到的cookie对象，从cookie中找寻与当前按钮的临时id相对应的一项，修改cookie值		     	
			     	  for(var i=0;i<aCookie.length;i++){
			     	  	if(aCookie[i].id==id1){ //加按钮
			     	  		 aCookie[i].num=value;
			     	  	}
			     	  	if(aCookie[i].id==id2){ //减按钮
			     	  		aCookie[i].num=value;
			     	  	}
			     	  }
			     	   //将修改后的cookie再次转化为字符串，存进cookie中
			    cookie=JSON.stringify(aCookie);
			    $.cookie("goods",cookie,{
	     	  	   path:"/daling"
	     	   });
	     	   this.showCar();
	     	   this.howMany();
      	    }
      	    
	     	  
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
    
     
    new GetCookie()
    $(document).scroll(function(){
    	//console.log($(this).scrollTop(),$(".count").offset().top)
    	if($(this).scrollTop()<$(".count").offset().top-700){
    		$(".shop_bottom").show()
    	}else{
    		$(".shop_bottom").hide()
    	}
    })
      
})
