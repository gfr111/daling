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
    			this.num--;   	
	    	  if($("#buy").val() == 1){
    			  return false;  			
	  		  }else{
	  		  	  $("#buy").val(this.num);
	  		  }
	    }
    }
     return new Num() 
})
