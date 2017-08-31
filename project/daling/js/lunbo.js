

//轮播图
$(function(){
	
	$.ajax({
		type:"get",
		url:"json/lunbo.json",
		async:true,
		success : function(arr){
			for(var i = 0; i < arr.length;i++){
				//添加节点
				//添加大图
				$("<li><a href='#'></a></li>").css({background : "url(" + arr[i].img + ")",backgroundSize:"cover"})
											.appendTo($(".banner-lb"));
				
				//添加小图
				$("<li><img src=" + arr[i].img + "></li>").appendTo($(".banner-lb2"));
			}
			$(".banner-lb li").first().show().siblings().hide();
			$(".banner-lb2 li").first().addClass("active");
			lunbo();
		}  
	});
	
	//轮播(透明度)
	function lunbo(){
		//即将显示下一张图的下标
		var index = 0
		//图片的长度
		var size = $(".banner-lb li").size();
		
		//开始轮播
		var timerLB = setInterval(function(){
			index++;
			move();
		},10000) 
		
		
		//move
		function move(){
			if(index == size){
				index = 0;
			}
			$(".banner-lb li").stop().eq(index).fadeIn(3000).siblings().stop().fadeOut(3000);
			$(".banner-lb2 li").eq(index).addClass("active").siblings().removeClass("active");
		}
		
		//轮播图鼠标事件
		//大图
		$(".banner-lb").on({
			"mouseenter" : function(){
				clearInterval(timerLB);
			},
			"mouseleave" : function(){
				timerLB = setInterval(function(){
					index++;
					move();
				},10000)
			}
		});
		
		//小图
		$(".banner-lb2 li").on({
			"mouseenter" : function(){
				index = $(this).index();
				move();
				clearInterval(timerLB);
			},
			"mouseleave" : function(){
				timerLB = setInterval(function(){
					index++;
					move();
				},10000)
			}
		})
		
	}
	
})
