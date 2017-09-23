define(function(){
	class Pagination{
		constructor(){	
//			if(!Pagination.res){
//               this.load();
//          }else{
//              this.init();
//          }
		}
		load(){
			var that=this;
			//加载数据
	$.ajax({
		url:"http://10.9.171.107:8888/daling/data/pagina.php",
		data:{data:"list"},
		dataType:"json"
	}).then(function(res){
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
			   items_per_page:10, //一页显示多少条;
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
		for(var i=this.index*10;i<(this.index+1)*10;i++){
			if(i<Pagination.res.length){
				html+=`<li class="clearfix">
	                    		    			<div class="face">
	                    		    				<img src="${Pagination.res[i].img}"  />
	                    		    				<p>${Pagination.res[i].name}</p>
	                    		    			</div>
	                    		    		    <div class="putime">
	                    		    		    	<div class="putime_top">
	                    		    		    		<span>${Pagination.res[i].time}</span>
	                    		    		    		<span>评分：<span><i class="iconfont">&#xe70e;</i><i class="iconfont">&#xe70e;</i><i class="iconfont">&#xe70e;</i><i class="iconfont">&#xe70e;</i><i class="iconfont">&#xe70e;</i></span></span>
	                    		    		    	</div>
	                    		    		    	<div class="putime_bottom">
	    <p>${Pagination.res[i].p}</p>                		    		    		
	                    		    		    	</div>
	                    		    		    </div>
	                    		    		</li>`
			}
		}
		$("#common").html(html);
	}
	}
	return new Pagination()
	
})
