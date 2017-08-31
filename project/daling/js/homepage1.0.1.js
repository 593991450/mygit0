

//商品详情
//动态创建
//今日上新

$(function(){
	
	//今日最新
	$.ajax({
		type:"get",
		url:"json/todayNew-goods-01.json",
		async:true,  
		success:function(data){
			//添加商品
			addData(data);
			//进入详情页
			intoDetail(data);
			//商品飞
			fly1();
			
		},
		error:function(){
			console.log("error");
		}
	}); 
	
	
	//大家都说好
	$.ajax({
		type:"get",
		url:"json/allSayGood-goods.json",
		async:true,  
		success:function(data){
			//添加商品
			addData(data);
			//进入详情页
			intoDetail(data);
			
		},
		error:function(){
			console.log("error");
		}
	});
	
	//新品黑马
	$.ajax({
		type:"get",
		url:"json/newBlack-goods.json",
		async:true,  
		success:function(data){
			//添加商品
			addData(data);
			//进入详情页
			intoDetail(data);
		},
		error:function(){
			console.log("error");
		}
	});
	
	
	
	//今日特惠
	//今日特惠列表1
	$.ajax({
		type:"get",
		url:"json/todayDiscount-goods-01.json",
		async:true,  
		success:function(data){
			//添加商品
			discountAddData(data);
			//进入详情页
			intoDetail(data);
		},
		error:function(){
			console.log("error");
		}
	});
	
	//今日特惠列表2
	$.ajax({
		type:"get",
		url:"json/todayDiscount-goods-02.json",
		async:true,  
		success:function(data){
			//添加商品
			discountAddData(data);
			//进入详情页
			intoDetail(data);
		},
		error:function(){
			console.log("error");
		}
	});
	
	
	//动态添加数据函数
	//今日最新/大家都说好/新品黑马动态添加数据
	function addData(data){
		var arr = data; 
		//今日最新动态添加
		if(!arr[0].content && !arr[0].recommed){  
			for(var i = 0;i < arr.length;i++){
				var src = arr[i].img;   
				var nowPrice = arr[i].nowPrice;
				var oldPrice = arr[i].oldPrice;
				var collect = arr[i].collect;
				var discount = arr[i].discount;
				var goodsName = arr[i].name;
				
				$("<img src=" + src + ">").appendTo($(".todayNew ul li").eq(i).find(".todayNew-img"));
				$(".todayNew ul li").eq(i).find(".data .price .now-price").html("￥" + nowPrice);
				$(".todayNew ul li").eq(i).find(".data .price .old-price").html("￥" + oldPrice);
				$(".todayNew ul li").eq(i).find(".data .price .collect").html(collect + "人收藏");
				$(".todayNew ul li").eq(i).find(".data .title .discount").html(discount + "折");
				$(".todayNew ul li").eq(i).find(".data .title a").html(goodsName);
			}
		}
		//大家都说好动态添加
		else if(arr[0].content){
			
			for(var i = 0;i < arr.length;i++){
				var src = arr[i].img; 
				var nowPrice = arr[i].nowPrice;
				var oldPrice = arr[i].oldPrice;
				var goodsName = arr[i].name;
				var content = arr[i].content;
				var face = arr[i].face;
				var observor = arr[i].observor;
				var sayGooder = arr[i].sayGooder;
				//添加数据
				$("<img src=" + src + ">").appendTo($(".allsaygood-list2 li").eq(i).find(".allsaygood-img"));
				$(".allsaygood-list2 li").eq(i).find(".data .price .now-price").html("￥" + nowPrice);
				$(".allsaygood-list2 li").eq(i).find(".data .price .old-price").html("￥" + oldPrice);
				$(".allsaygood-list2 li").eq(i).find(".data .title").html(goodsName);
				$(".allsaygood-list2 li").eq(i).find(".data .face").css({background:"url("+face+")",backgroundSize:"cover"});
				$(".allsaygood-list2 li").eq(i).find(".data .comment-text p").html(content);
				$(".allsaygood-list2 li").eq(i).find(".data .comment-text .observor").html(observor);
				$(".allsaygood-list2 li").eq(i).find(".data .comment-text .sayGooder").html(sayGooder);
				
			}
		}
		//新品黑马动态添加
		else if(arr[0].recommed){
			for(var i = 0;i < arr.length;i++){
				var src = arr[i].img; 
				var nowPrice = arr[i].nowPrice;
				var oldPrice = arr[i].oldPrice;
				var goodsName = arr[i].name;
				var recommed = arr[i].recommed; 
				
				//添加数据
				$("<img src=" + src + ">").appendTo($(".newBlack-list2 li").eq(i).find(".newBlack-img"));
				$(".newBlack-list2 li").eq(i).find(".data .price .now-price").html("￥" + nowPrice);
				$(".newBlack-list2 li").eq(i).find(".data .price .old-price").html("￥" + oldPrice);
				$(".newBlack-list2 li").eq(i).find(".data .title").html(goodsName);
				$(".newBlack-list2 li").eq(i).find(".data .comment-text").html(" “推荐理由： "+recommed+" ” ");
			}
		}
		else{
			alert("没有商品")
		}
	}
	
	//今日特惠动态添加数据到页面中
	function discountAddData(data){
		var arr = data;
		if(arr[0].id == 150){  
			for(var i = 0;i < arr.length;i++){
				
				var src = arr[i].img; 
				var nowPrice = arr[i].nowPrice;
				var oldPrice = arr[i].oldPrice;
				var discount = arr[i].discount;
				var goodsName = arr[i].name; 
				var buyer = arr[i].buyer;
				
				var li =$("<li></li>").appendTo( $(".todayDiscount .todayDiscount-list1-wrap ul") ) ;
				li.html(
					"<a href='javascript:;' class='todayDiscount-a'>" +
						"<div class='todayDiscount-img'>" +
							"<img src=" + src + "/>" +
						"</div>" +
						"<div class='bgoption'></div>" +
						//<!--<div class="option">
						//	加入购物车
						//	<span class="ico-get-cart"></span>
						//</div>-->
					"</a>" +
					"<div class='data clear'>" +
						"<p class='title'>" +
							"<span class='discount'>" + discount + "/</span>" +
							"<a href='#'>" +
								goodsName +
							"</a>" +
						"</p>" +
						"<p class='price'>" +
							"<span class='now-price'>￥" + nowPrice + "</span>" +
							"<span class='old-price'>￥" + oldPrice + "</span>" +
						"</p>" +
						"<p class='buyNow'>" +
							"<a href='javascript:;' class='buy'>立即抢购</a>" +
							"<span class='allBuy'>" + buyer +"人已购买</span>" +
						"</p>" +
					"</div>"
				);
			}
		}
		if(arr[0].id == 180){
			for(var i = 0;i < arr.length;i++){
				var src = arr[i].img; 
				var nowPrice = arr[i].nowPrice;
				var oldPrice = arr[i].oldPrice;
				var discount = arr[i].discount;
				var goodsName = arr[i].name; 
				var buyer = arr[i].buyer;
				
				var li =$("<li></li>").appendTo( $(".todayDiscount .todayDiscount-list2-wrap ul") ) ;
				li.html(
					"<a href='javascript:;' class='todayDiscount-a'>" +
						"<div class='todayDiscount-img'>" +
							"<img src=" + src + "/>" +
						"</div>" +
						"<div class='bgoption'></div>" +
						//<!--<div class="option">
						//	加入购物车
						//	<span class="ico-get-cart"></span>
						//</div>-->
					"</a>" +
					"<div class='data clear'>" +
						"<p class='title'>" +
							"<span class='discount'>" + discount + "/</span>" +
							"<a href='#'>" +
								goodsName +
							"</a>" +
						"</p>" +
						"<p class='price'>" +
							"<span class='now-price'>￥" + nowPrice + "</span>" +
							"<span class='old-price'>￥" + oldPrice + "</span>" +
						"</p>" +
						"<p class='buyNow'>" +
							"<a href='javascript:;' class='buy'>加入购物车</a>" +
						"</p>" +
					"</div>"
				);
			}
		}
	}
	
	
	//点击商品进入商品详情页
	//事件委托
	function intoDetail(data){
		
		var arr = data;
		
		//今日上新
		if(arr[0].id == 101){
			//列表1
			$(".todayNew .todayNew-list1 li .new-img").click(function(){
				//下标
				var index = $(this).parent().index();
				//获取点击当前商品的id
				var id = data[index].id; 
				//跳转页面
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			});
			//列表2
			$(".todayNew .todayNew-list2 li .new-img").click(function(){
				//下标
				var index = $(this).parent().index();
				//获取点击当前商品的id
				var id = data[index + 4].id;
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			})	;
		}
		
		//大家都说好
		else if(arr[0].id == 110){
			$(".allsaygood-list2 li .allsaygood-img").click(function(){
				//下标
				var index = $(this).parent().parent().index();
				//获取点击当前商品的id
				var id = data[index].id;
				//跳转页面
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			});
		}
		
		//新品黑马
		else if(arr[0].id == 120){
			$(".newBlack-list2 li .newBlack-img").click(function(){
				//下标
				var index = $(this).parent().parent().index();
				//获取点击当前商品的id
				var id = data[index].id;
				//跳转页面
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			});
		}
		
		//今日特惠
		//列表1
		if(arr[0].id == 150){
			$(".todayDiscount-wrap .todayDiscount-list1-wrap ul li").click(function(){
				//下标
				var index = $(this).index();
				//获取点击当前商品的id
				var id = data[index].id;
				//跳转页面
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			});
		}
		//列表2
		else if(arr[0].id == 180){
			$(".todayDiscount-wrap .todayDiscount-list2-wrap ul li").click(function(){
				//下标
				var index = $(this).index();
				//获取点击当前商品的id
				var id = data[index].id;
				console.log(id);
				//跳转页面
				location.href = "goodsDetail.html?id=" + id;
				//window.open("goodsDetail.html?id=" + id);
			});
		}
		
	}  
	
	
	
	//点击登录、注册进入登录页面
	
	$(".header-inner .right .login,.header-inner .right .register").click(function(){
		
		location.href = "_login.html";
		
	})
	
	//用户名显示
	//用户名隐藏
	
	//全部分类显示隐藏
	$(".nav a:first").on({
		"mouseenter" : function(){
			$(".nav-inner .subnav").css("display","block");
		},
		"mouseleave" : function(){
			$(".nav-inner .subnav").css("display","none");
		}
	});
	
	$(".subnav").on({
		"mouseenter" : function(){
			$(".nav-inner .subnav").css("display","block");
		},
		"mouseleave" : function(){
			$(".nav-inner .subnav").css("display","none");
		}
	});
	
	
	//点击侧栏进入购物车界面
	intoMyCart();
	
	//进入页面显示当前购物车的数量
	showGoodsCount();
	
	
	
	//加入购物车动画
	
	function fly1(){
		//加入购物车点击事件
		$("#main .option").click(function(e){
			//阻止事件冒泡
			e.stopPropagation();
			
			
			$("#sidebar .cartToast").first().show().animate({width: '120px'}, 200).fadeOut(1000);
			
			var parent = $(this).parents("ul").attr("class");
			var index = $(this).parents("li").index();
			//获取父级json
			getJson(parent,index);
			//刷新侧栏购物车数量
			showGoodsCount();			
			
		})
	}
	
	//获取当前点击的json数据
	function getJson(parent,index){
		var json = "";
		
		//判断父级
		//今日上新列表1
		if(parent == "todayNew-list1 clear"){
			json = "json/todayNew-goods-01.json";
			$.ajax({
				type:"get",
				url:json,
				async:true,
				success : function(arr){
					addCookie(arr[index]);
				}
			});
		}
		//今日上新列表2
		if(parent == "todayNew-list2 clear"){
			json = "json/todayNew-goods-01.json";
			$.ajax({
				type:"get",
				url:json,
				async:true,
				success : function(arr){
					addCookie(arr[index + 4]);
				}
			});
		}
		
	}
	
	
	//添加cookie
	function addCookie(goods){
		var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : []; 
		//如果相同，则商品数量加1；
		var flag = false;
		for(var i = 0;i < arr.length;i++){
			if(arr[i].id == goods.id){
				arr[i].num++;
				flag = true;
				break;
			}
		}
		//如果不同，则添加到cookie
		if(flag == false){
			goods.num = 1;
			goods.ischecked = true;
			arr.push(goods);
		}
		
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
//		console.log($.cookie("cart"));  
	}
	
	

	
	
	
})
