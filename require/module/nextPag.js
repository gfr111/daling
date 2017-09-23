define(function(){
	function nextPag(){
	    this.index=0;
	}
	nextPag.prototype.load=function(){
		var that=this;
		$.ajax({		
			url:"http://10.9.171.107:8888/daling/data/detail.php",	
			data:{data:"list"},
			dataType:"json"
		}).then(function(res){
			that.res=res;
			that.init()
		},function(res){
			console.log("error")
		})
	}
	nextPag.prototype.init=function(){
		var that=this;
		$("#prev").click(function(){
			that.changeIndex("prev")
		})
		$("#next").click(function(){
			that.changeIndex("next")
		})
		this.rendringPage();
	}
	nextPag.prototype.changeIndex=function(direction){
		var pagNum=Math.ceil(this.res.length/2);
		if(direction=="prev"){
				if(this.index==0){
					this.index=pagNum-1;
				}else{
					this.index--
				}
			}
			if(direction=="next"){
				if(this.index==pagNum-1){
					this.index=0;
				}else{
					this.index++
				}
			}
			this.rendringPage();
	}
	nextPag.prototype.rendringPage=function(){
		var html="";
		for(var i=this.index*2;i<(this.index+1)*2;i++){
			html+=`<li>
                    		<a href="##">
                    			<img src="${this.res[i].img}" />   
                    			<p>
                    				<span>${this.res[i].span1}</span>
                    				<s>${this.res[i].span2}</s>
                    			</p>
                    			<p>${this.res[i].p}</p>
                    		</a>
                    	</li>`
		}
		$(".listt").html(html);
	}
	
	return new nextPag()
})
