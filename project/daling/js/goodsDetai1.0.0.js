
//商品详情页
$(function(){
	
	//放大镜
	fdj();
	
	//放大镜函数
	function fdj(){
		var scal = $(".goods-bigImg").width() / $(".goods-smallImg").width(); 
		$(".goods-smallImg").on({
			//鼠标移入
			"mouseenter" : function(){
				$(".goods-smallArea").show();
				$(".goods-bigArea").show();
			},
			//鼠标移动
			"mousemove" : function(e){
				var x = e.pageX - $(".goods-smallImg").offset().left - $(".goods-smallArea").width()*0.5;
				var y = e.pageY - $(".goods-smallImg").offset().top - $(".goods-smallArea").height()*0.5;
				//临界值
				if(x < 0){
					x = 0;
				}
				else if(x > $(".goods-smallImg").width() - $(".goods-smallArea").width()){
					x = $(".goods-smallImg").width() - $(".goods-smallArea").width();
				}
				if(y < 0){
					y = 0;
				}
				else if(y > $(".goods-smallImg").height() - $(".goods-smallArea").width()){
					y = $(".goods-smallImg").width() - $(".goods-smallArea").width();
				}
				$(".goods-smallArea").css({left:x,top:y});
				$(".goods-bigImg").css({left:-x*scal,top:-y*scal});
			},
			"mouseleave" : function(){
				$(".goods-smallArea").hide();
				$(".goods-bigArea").hide();
			}  
			
		});
		
	};
	
	
	
	
	//动态更改页面信息
	//获取当前路径
	var params = location.search.substring(1);
	//console.log(params);
	var goodsId = getParams(params,"id");
	//console.log(goodsId);

	//获取相应参数的值  ?goodsId=102&name=zhangsan
	function getParams(params,key){
		var arr = params.split("&");
		for(var i = 0;i < arr.length;i++){
			var obj = arr[i];
			var arr1 = obj.split("=");
			if(arr1[0] == key){
				return arr1[1];
			}
		}
		return "";
		
	}

	//获取商品json
	$.ajax({
		type:"get",
		url:"json/todayNew-goods-01.json",
		async:true,
		success:function(arr){
			//遍历arr
			for(var i = 0;i < arr.length;i++){
				if(arr[i].id == goodsId){
					var goods = arr[i];
					//添加信息到页面
					toPage(goods);
					//添加到购物车
					addCart(goods);
					break;
					
				}
			}
			//加入购物车，商品飞
			//fly1();
			
			
			
		}  
	});
		
	//添加到页面的函数
	function toPage(goods){
		//标题
		$(".main-nav .goods-name").html(goods.name);
		//商品图片
		$(".goods .goods-smallImg img").first().attr("src",goods.img);
		$(".goods .goods-bigArea img").first().attr("src",goods.img);
		//商品名称
		$(".goods .goods-detail .goods-detail-tab .name").first().html(goods.name);
		//商品价格
		$(".goods .goods-detail .goods-detail-tab .now-price").first().html( "￥" + goods.nowPrice);
		$(".goods .goods-detail .goods-detail-tab .old-price").first().html( "￥" + goods.oldPrice);
		$(".goods .goods-detail .goods-detail-tab .discount").first().html(goods.discount + "折");
		//商品收藏人
		$(".goods .goods-detail .goods-detail-tab .collect").first().html(goods.collect + "人收藏");
		
	}
	
	
	
	//增加、减少商品
	
	var buyCount = 1;
	//减少
	$(".goods .goods-detail .goods-detail-tab .sub").click(function(){
		buyCount--;
		if(buyCount <= 0){
			buyCount = 0;
		}
		$(".goods .goods-detail .goods-detail-tab .buyCount").val(buyCount);
	});
	//增加
	$(".goods .goods-detail .goods-detail-tab .add").click(function(){
		buyCount++;
		$(".goods .goods-detail .goods-detail-tab .buyCount").val(buyCount);
	});
	
	
	
	//加入购物车
	//商品飞
	/*
	function fly1(){  
		$(".goods .goods-detail .goods-detail-tab .intoCart").click(function(e){
			
//			console.log("加入购物车");
			//结束的位置
			var endOffset = $(".sidebar-list1 .cart").offset();
			var img = $(".goods .goods-smallImg img").first().attr("src");
//			console.log(img);
			var flyer = $("<img class='u-flyer' scr=" + img + ">");

			flyer.fly({
				//开始的位置
				start : {
					left : e.clientX,
					top : e.clienty
				},
				//结束的位置  
				end : {
					left : endOffset.left,
					top : endOffset.top,
					width : 0,
					height : 0,
				},
				//结束后
				onEnd : function(){
					console.log("加入购物车成功！");
				}
			});
			console.log(flyer);
			
		});
	}
	*/
	
	
	//添加到购物车
	function addCart(goods){
		$(".goods .goods-detail .goods-detail-tab .intoCart").click(function(){
			var goodsId = goods.id;
			var goodsName = goods.name
			var goodsImg = goods.img;
			var goodsPrice = goods.nowPrice;
			var goodsCount = $(".goods .goods-detail .goods-detail-tab .buyCount").val();
			
//			console.log(goodsName);
//			console.log(goodsImg);
//			console.log(goodsPrice);
//			console.log(goodsCount);
			
//			//添加cookie
			var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
			//如果相同，则商品数量加1；
			var flag = false;
			for(var i = 0;i < arr.length;i++){
				if(arr[i].id == goodsId){
					arr[i].num++;
					flag = true;
					break;
				}
			}
			//如果不同，则添加到cookie
			if(flag == false){
				goods.num = goodsCount;
				goods.ischecked = true;
				arr.push(goods);
			}
			
			$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
			console.log($.cookie("cart"));  
			
		})  
	} 
	
})  
