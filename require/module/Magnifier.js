define(function(){
   class Magnifier{
   	constructor(){ 		
   	}
   	init(){
   		var that=this;
   		$(".pic").hover(function(){
   			$("#small").show();
   			$("#big").show()
   		},function(){
   			$("#small").hide()
   			$("#big").hide()
   		})
   		$(".pic").mousemove(function(){
   			that.move()
   		})
   		this.click()
   	}
   	move(event){
   		//console.log(1)
   		var evt=event||window.event;
   		 var left=evt.offsetX-$("#small").width()/2;
   		 var top=evt.offsetY-$("#small").height()/2;  	 
   		 //console.log(left)
   		 if(left<0){
   		 	left=0
   		 }
   		 if(left>$(".pic").width()-$("#small").width()){
   		 	left=$(".pic").width()-$("#small").width()
   		 }
   		 if(top<0){
   		 	top=0
   		 }
   		 console.log()
   		 if(top>$(".pic").height()-$("#small").height()){
   		 	top=$(".pic").height()-$("#small").height()
   		 }
   		 $("#small").css({
   		 	left:left,
   		 	top:top,
   		 })
   		 //console.log($("#small")[0])
   		  $("#small")[0].style.backgroundPosition = -left+"px "+ -top+"px";
   		  var sDistanceX=$(".pic").width()-$("#small").width();
   		  var sDistanceY=$(".pic").height()-$("#small").height();
   		  var propX=left/sDistanceX;
   		  var propY=top/sDistanceY;
   		 
   		  var bDistabceX = 800 - $("#big").width();
   		  var bDistanceY = 800 - $("#big").height();
   		 //为了让大图不占位，设为显示的背景图，让背景图随着移动改变
   		  $("#big")[0].style.backgroundPosition = -bDistabceX*propX +"px "+ -bDistanceY*propY+"px"; 
   	 }
   	click(){
   			$("#btn").children("img").click(function(){
				//console.log($("#pic")[0].src)			
					$("#pic")[0].src=$(this)[0].src
		            $("#big")[0].style.background="url("+$(this)[0].src+")"
  	               $("#small")[0].style.backgroundImage="url("+$(this)[0].src+")"
			})
   	}
   
   }
    
   return new Magnifier();
})