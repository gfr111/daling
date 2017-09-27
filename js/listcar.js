//分页显示
	class Pagination{
		constructor(){
				if(!Pagination.res){
	             this.load();           
	              //console.log(1)
	          }else{
	              this.init();
	          }
		}
		load(){
			var that=this;
			//加载数据
	$.ajax("http://10.9.171.107:8888/daling/data/list.json").then(function(res){
		 that.res=res;
		 //console.log(that.res)
		  that.init()
		  that.howMany()
		  that.showCar()
	    },function(res){
		  //console.log(2)
	    })
	 }
	init(){
		//使用分页插件
		var that=this;
	  $(".pagination").pagination(this.res.length,{
			   items_per_page:40, //一页显示多少条;
			    prev_text:"上一页",
			    next_text:"下一页",
                prev_show_always:false,
			    next_show_always:false,
                callback:function(index){
                    that.index = index; //当前显示的页数;
                    that.rendringPag();
                }
		})
	  //点击添加购物车
	    $(".search_list ul").on("click",".shopcar2",function(){
	    	//console.log(this.id)
	    	 that.storage(this.id);
	    	 that.howMany();
	    	 that.showCar();
	    })
	}
	rendringPag(){
		var html="";
	   //console.log(Pagination.res.length)
		 $(".total").html(this.res.length)
		for(var i=this.index*40;i<(this.index+1)*40;i++){
			if(i<this.res.length){
				html+=`<li>
	         			<a href="http://10.9.171.107:8888/daling/html/detail.html">
	         				<img src="${this.res[i].img}"  />
	         			</a>
	         			<div>
	         				<p class="data">
	         					<span>￥</span>
	         					<span>${this.res[i].span1}</span>
	         					<s>${this.res[i].span2}</s>
	         				</p>
	         				<p class="intro">
	         					<a href="##">
	         						<span>${this.res[i].span3}</span>
                                    <span>${this.res[i].span4}</span>
	         					</a>                                              
	         				</p>
	         				<p class="detail">
	         					<span>${this.res[i].span5}</span>
	         					<span>|</span>
	         					<span>${this.res[i].span6}</span>
	         				</p>
	         		</div>
	         			<div class="shopcar2" id="${this.res[i].id}">
	    	      			<a href="##">
	    	      				加入购物车<i class="iconfont">&#xe601;</i>
	    	      			</a>
	    	      		</div>
	         		</li>`
			}
			
		}
		//console.log(html)
		$(".search_list ul").html(html);
	  }
	storage(id){
		//console.log(id);
		if(!$.cookie("goods")){
			   $.cookie("goods",'[{"id":'+id+',"num":1}]',{
			   	path:"/daling"
			   });
		 }else{
			var cookie=$.cookie("goods");
			var cookieArr=JSON.parse(cookie);
			var same=false;
			//console.log(cookieArr)
			for(var i=0;i<cookieArr.length;i++){
				 if(cookieArr[i].id == id){ //存在当前的商品;
							cookieArr[i].num++;
							same = true;
							break;
						}
			}
			if(same == false){
						var obj = {
							id:id,
							num:1
						};
						cookieArr.push(obj);
				}
			       cookie = JSON.stringify(cookieArr);
					$.cookie("goods",cookie,{
						 	path:"/daling"
					});
		}
}
	howMany(){
				if($.cookie("goods")){
					//console.log(this.res)
					var aCookie = JSON.parse($.cookie("goods"));
					var res = 0;
					var price=0;
					for(var i = 0 ; i < aCookie.length ; i++){
						res += aCookie[i].num;
					var a=parseInt(this.res[aCookie[i].id].span1)
			    			//console.log(a)
			    	    price+=aCookie[i].num*a
					}	
					$(".num").html(res);	
					$("#number").html(res)
					$("#all_price").html("￥"+price)
					//console.log(res)
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
         	      	  //console.log(this)
         	      	  that.dele(this)
         	      })
			}
    dele(obj){
	     	  //console.log($(obj))
	     	  //获取当前点击的元素的id
	     	  var id= $(obj).attr("id")
	     	  //console.log(id)
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

