function Change(){
       	 this.index=0
       }
     //加载数据
     Change.prototype.load=function(){
       	var that=this;
       	 $.ajax("http://10.9.171.107:8888/daling/data/list.json")
       	 .then(function(res){
      		 that.res=res;
      		 that.changeLi();
      		 that.init();
      		 that.howMany();
      		 that.showCar();
      	  
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
     //初始化
      Change.prototype.init=function(){
      	 var that=this;  
	      	$("#new").on("click",".shopcar1",function(){  
	      		 that.storage(this.id);
	      		 that.howMany();
	      		 that.showCar();
	      		 $(".rightButon_shop").on("click",function(){
					 that.showCar($(this));										
				})
	      	})
      }
      //向页面添加商品信息
       Change.prototype.changeLi=function(){     	
      	     var html=""
      		for(var i=this.index*4;i<this.index*4+4;i++){
      			if(i<this.res.length){
      				html+=`<li>
	    	      		<a href="##"><img src="${this.res[i].img}"  /></a>
	    	      		<div id="data">
	    	      			<p class="list_p1">
	    	      			<span class="money">￥</span>
	    	      			<span class="new_price">${this.res[i].span1}</span>
	    	      			<s>${this.res[i].span2}</s>
	    	      			<span class="like">${this.res[i].span5}</span>
	    	      		</p>
	    	      		<p class="list_p2">
	    	      			<span>${this.res[i].span3}</span>
	    	      			<span>${this.res[i].span4}</span>
	    	      		</p>
	    	      		</div>
	    	      		<div class="shopcar1" id="${this.res[i].id}">
	    	      			<a href="##">
	    	      				加入购物车<i class="iconfont">&#xe601;</i>
	    	      			</a>
	    	      		</div>
	    	      	</li>`
      			}
      			
      		}
      		$("#new").html(html);
      }
       //添加cookie
         Change.prototype.storage=function(id){
         	if(!$.cookie("goods")){
         		$.cookie("goods",'[{"id":'+id+',"num":1}]')
         	}else{
         		var cookie=$.cookie("goods");
         		var cookieArr = JSON.parse(cookie);
				var same = false;
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
					//变成字符串 => 存进cookie;
					cookie = JSON.stringify(cookieArr);
					$.cookie("goods",cookie);
				}
                            	
         	        //this.del(obj);
         	}
         //显示的商品数
        Change.prototype.howMany=function(){ 
          	if($.cookie("goods")){
					var aCookie = JSON.parse($.cookie("goods"));
					var res = 0;
					var price=0;
					for(var i = 0 ; i < aCookie.length ; i++){
						  res += aCookie[i].num;
						  var a=parseInt(this.res[aCookie[i].id].span1)
    			          // console.log(a)
    			          price+=aCookie[i].num*a
				    }				
					$(".num").html(res);
					$("#number").html(res);	
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
          Change.prototype.showCar=function(){   
           	var that=this;
  		 	  if($.cookie("goods")){
				var aCookie = JSON.parse($.cookie("goods"));
				var html = "";
				for(var i = 0 ; i < aCookie.length ; i++){
			//console.log(this.res[aCookie[i].id].span1)
					html += `<li class="clearfix"><img src="${this.res[aCookie[i].id].img}" />
		      	   		<div><p>${this.res[aCookie[i].id].span4}</p>
		      	   			<p><span>数量:</span>${aCookie[i].num}<span>价格:</span>￥${this.res[aCookie[i].id].span1}<span id="${aCookie[i].id}" class="delet">删除</span></p>
		      	   		</div>
		      	   		</li>`
					  }
          		 $(".inside_shop_list ul").html(html)         
				}	
				 //console.log($(".inside_shop_list")) 
         	      $(".inside_shop_list").on("click",".delet",function(){
         	      	 // console.log(this)
         	      	 that.del(this)
         	      })
          }
     Change.prototype.del=function(obj){
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
     	  $.cookie("goods",cookie);
     	  //删除后再次调用两个函数，及时更新购物车信息
     	  this.howMany();
     	  this.showCar();
     	  
     } 
