define(function(){
	function Num(){
    	this.num=$("#buy").val()
    }
    Num.prototype.init=function(){
    	var that=this;
    	$("#reduce").click(function(){
    		that.operation("top")
    	})
    	$("#plus").click(function(){
    		that.operation("bottom")
    	})
    }
    Num.prototype.operation=function(direction){
    	if(direction=="top"){
    		this.num++;
          $("#buy").val(this.num)
    	}

	   	if(direction=="bottom"){
    			 	
	    	  if(this.num <= 1){
	    	  	 this.num =1
    			  return false;  			
	  		  }else{
	  		  	  this.num--;  	  		  	 
	  		  }
	  		   $("#buy").val(this.num);
	    }
    }
     return new Num() 
})
