$(function(){
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
	}$("#footer").load("http://10.9.171.107:8888/daling/html/footer.html .footer_inner",function(){
   	 hoverOn($(".b_list"),$("a"),"#664996")
  })	
     //console.log(1)
     $(".chioce").find("a").click(function(){
     	//添加class样式
     	$(this).addClass("bottomLine")
     	//去掉其兄弟元素的样式
     	$(this).siblings().removeClass("bottomLine")
     	//让下面的form跟上面的按钮相对应，利用上面按钮的下边实现下方form的切换
     	$(".registry").find("form").eq($(this).index()).show()
      $(".registry").find("form").eq($(this).index()).siblings().hide()
     		//$(this).siblings().hide()
     })
     function randomNum(){
      	var str="0123456789qwertyuiopasdfghjklzxcvbnm";
      	var num="";
      	for(var i=0;i<4;i++){    		
      		 num+=str[Math.round(Math.random()*(str.length-1))]
      	}
        	return num;
     }
     //console.log(randomNum())
         $(".check").html(randomNum())
     $(".check").click(function(){
     	  $(".check").html(randomNum())

     })
        $("form p").find("input").focus(function(){
        	//console.log(1)
        	$(this).css({
        		border:"1px solid #94d469"
        	})
        	$(this).prev("span").css({
        		border:"1px solid #94d469"
        	}).children("i").css({
        		color:"#94d469"
        	})
        })
        $("form p").find("input").blur(function(){
        	//console.log(1)s
        	$(this).css({
        		border:""
        	})
        	$(this).prev("span").css({
        		border:""
        	}).children("i").css({
        		color:""
        	})
        })
       //表单验证部分
      //登录验证
        //声明一个空数组，每次判断结束向数组里添加一个元素
        var arr1=[false,false,false]
        //手机号验证
       $(".phone").blur(function(){
        	var sPhone=$(".phone").val()
        	console.log(sPhone)
		 	 var regPhone = /^1[5378]\d{9}$/
		  if(regPhone.test(sPhone)){
		    $(this).parent().next("span").html("输入正确").
		 	 css({
		 		color:"#ccc"	 		
		 	})	
		 	arr1[0]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确的手机号码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 	arr1[0]=false;
		  }				
        })
         //密码验证
        $(".pass").blur(function(){
        	var sPassword=$(".pass").val();
        	var regPass=/^[^\\*\u4e00-\u9fa5]{3,20}$/
         if(regPass.test(sPassword)){
		   $(this).parent().next("span").html("格式正确").
		 	 css({
		 		color:"#ccc"	 		
		 	 })	
		 	arr1[1]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确格式的密码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 		arr1[1]=false;;
		  }	
        })
        //验证码验证
        $(".checkNum").blur(function(){
        	var scheckNum=$(".checkNum").val()
		  if(scheckNum == $(".check").html()){
		      $(this).parent().next("span").html("输入正确").
		 	 css({
		 		color:"#ccc"	 		
		 	 })	
		 	arr1[2]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确的验证码")
		 	.css({
		 		color:"red"	 		
		 	})	
		    arr1[2]=false;;
		  }
		  console.log(scheckNum)
		  console.log($(".check").html())
        })
              
      //注册验证
        //手机验证码
        var arr=[false,false,false,false]
        $(".phoneNum").blur(function(){
         var scheckNum=$(".phoneNum").val()
         var regNum=/^[0-9]{4}$/;
		  if(regNum.test(scheckNum)){
		      $(this).parent().next("span").html("输入正确")
		 	 .css({
		 		color:"#ccc"	 		
		 	 })	
		 	arr[0]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确的验证码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 	arr[0]=false;
		  }		
        })
        //密码验证
        $("#password").blur(function(){
        	var sPassword=$("#password").val();
        	var regPass=/^[^\\*\u4e00-\u9fa5]{3,20}$/
         if(regPass.test(sPassword)){
		   $(this).parent().next("span").html("格式正确").
		 	 css({
		 		color:"#ccc"	 		
		 	 })	
		 	arr[1]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确格式的密码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 	arr[1]=false;
		  }	
        })
        //登录页面的页面验证码验证，不能与上方的共用一个
        $(".checkNum1").blur(function(){
        	var scheckNum=$(".checkNum1").val()
		  if(scheckNum == $(".check").html()){
		      $(this).parent().next("span").html("输入正确").
		 	 css({
		 		color:"#ccc"	 		
		 	 })	
		 	arr[2]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确的验证码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 	arr[2]=false;
		  }
		  console.log(scheckNum)
		  console.log($(".check").html())
        })
       //注册的手机号验证，与上面相似
        $(".phone1").blur(function(){
        	var sPhone=$(".phone1").val()
        	console.log(sPhone)
		 	 var regPhone = /^1[5378]\d{9}$/
		  if(regPhone.test(sPhone)){
		    $(this).parent().next("span").html("输入正确").
		 	 css({
		 		color:"#ccc"	 		
		 	})	
		 	arr[3]=true;
		  }else{			 
		 	 $(this).parent().next("span").html("输入正确的手机号码")
		 	.css({
		 		color:"red"	 		
		 	})	
		 	arr[3]=false;
		  }				
        })
        //点击登录的判断
        $("#put1").click(function(){  
        	console.log($(".phone").val())
        	console.log($(".pass").val())
        	console.log(arr1)
        		if(arr1.indexOf(false) !== -1){
	        	       new Toast({
							width:300,
							height:200,
							text:"您的输入有误，请重新输入"
					   }) 
        		}else{
        			$.ajax({
        				type:"POST",
        				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
        				data:{
        					status:"login",
        					userID:$(".phone").val(),
        					password:$(".pass").val()
        				},
        				success:function(res){
        					switch(res){
        						case "0" : new Toast({
										width:300,
										height:200,
							            text:"用户不存在,请注册"
					   });
						break;
						
						case "2": new Toast({
										width:300,
										height:200,
							            text:"用户名和密码不符!!"
					   });
						break;

						default:new Toast({
										width:300,
										height:200,
							            text:"登陆成功,我们稍微将为您跳转到购物页面!!"
					     });
        					}

        				}
        			});
        		}

        })
        //点击注册的判断
        $("#put2").click(function(){  
        	console.log(arr)
        	//console.log(arr[1])
        		if(arr.indexOf(false) !== -1){
	        	       new Toast({
							width:300,
							height:200,
							text:"您的输入有误，请重新输入"
					   }) 
        		}else{
        			$.ajax({
        				type:"POST",
        				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
        				data:{
        					status:"register",
        					userID:$(".phone1").val(),
        					password:$("#password").val()
        				},
        			success:function(res){
        					switch(res){
        						case "0" : new Toast({
										width:300,
										height:200,
							            text:"用户名重复，请重新输入"
					   });
						break;
						
						case "2": new Toast({
										width:300,
										height:200,
							            text:"抱歉，服务器出错了!!"
					   });
						break;
						
						case "1": new Toast({
										width:300,
										height:200,
							            text:"注册成功，祝您购物愉快!!"
					   });
						break;						
        				}
        			}
        		});
        	}

        })
        //弹出窗插件         
			function Toast(json){
				if(!json){
					this.width = 300;
					this.height = 200;
				}else{
					this.width=json.width;
					this.height=json.height;
				}
				if(!json.text){
					this.text="";
				}else{
					this.text=json.text;
				}
				if(Toast.div){
					this.show()
				}else{
					this.init()
				}
			}
			Toast.prototype.init=function(){
				Toast.div=$("<div>");
				Toast.div.addClass("toast")
				Toast.div.html(this.text)
				$("body").append(Toast.div)
				Toast.div.show(1000)
				if(!Toast.timer){
					Toast.timer=setInterval(function(){
					 Toast.div.hide(1000);
					 Toast.timer=null;
				},3000)
			  }
			}
			
		  Toast.prototype.show=function(){
		  	Toast.div.show(1000);
		  		Toast.div.html(this.text)
		  	if(!Toast.timer){
					Toast.timer=setInterval(function(){
					 Toast.div.hide(1000);
					 Toast.timer=null;
				},3000)
			  }		  	
		  }
})
