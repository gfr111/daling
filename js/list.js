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
	
	//分页显示
	class Pagination{
		constructor(){
			if(!Pagination.res){
                 this.load();
            }else{
                this.init();
            }
		}
		load(){
			var that=this;
			//加载数据
	$.ajax("http://10.9.171.107:8888/daling/data/list.json").then(function(res){
		 Pagination.res=res;
		 that.init()
	    },function(res){
		  //console.log(2)
	    })
	 }
	init(){
		//使用分页插件
		var that=this;
		$(".pagination").pagination(Pagination.res.length,{
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
	 }
	rendringPag(){
		var html="";
	   //console.log(Pagination.res.length)
		 $(".total").html(Pagination.res.length)
		for(var i=this.index*40;i<(this.index+1)*40;i++){
			if(i<Pagination.res.length){
				html+=`<li>
	         			<a href="##">
	         				<img src="${Pagination.res[i].img}"  />
	         			</a>
	         			<div>
	         				<p class="data">
	         					<span>￥</span>
	         					<span>${Pagination.res[i].span1}</span>
	         					<s>${Pagination.res[i].span2}</s>
	         				</p>
	         				<p class="intro">
	         					<a href="##">
	         						<span>${Pagination.res[i].span3}</span>
                                    <span>${Pagination.res[i].span4}</span>
	         					</a>                                              
	         				</p>
	         				<p class="detail">
	         					<span>${Pagination.res[i].span5}</span>
	         					<span>|</span>
	         					<span>${Pagination.res[i].span6}</span>
	         				</p>
	         			</div>
	         			<div class="shopcar2">
	    	      			<a href="##">
	    	      				加入购物车<i class="iconfont">&#xe601;</i>
	    	      			</a>
	    	      		</div>
	         		</li>`
			}
		}
		$(".search_list ul").html(html);
	}
	}
	new Pagination()
	
})
