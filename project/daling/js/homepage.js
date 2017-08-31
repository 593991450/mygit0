

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
//			addData(data);
			//进入详情页
//			intoDetail(data);
			
		},
		error:function(){
			console.log("error");
		}
	});
	
	
	//动态添加数据函数
	//<li>
	//	<a href="#" class="new-img">
	//		<div class="todayNew-img">
	//			<!--<img src="images/FA163E0BD2F9H73G0BM8Q3W5H2H.jpg"/>-->
	//		</div>
	//		<div class="bgoption"></div>
	//		<div class="option">
	//			加入购物车
	//			<span class="ico-get-cart"></span>
	//		</div>
	//	</a>
	//	<div class="data">
	//		<p class="price">
	//			<span class="now-price"><!--￥100--></span>
	//			<span class="old-price"><!--￥120--></span>
	//			<span class="collect"><!--99人收藏--></span>
	//		</p>
	//		<p class="title">
	//			<span class="discount"><!--2折 /--></span>
	//			<a href="#">
	//				<!--[美国 · “真爱永恒”的承诺] JLO詹妮弗.洛佩兹故我香水(100ml)-->
	//			</a>
	//		</p>
	//	</div>
	//</li>
	
	
//	<li>
//		<a href="#">
//			<div class="allsaygood-img">
//				<img src="images/14917984251549.jpg"/>
//			</div>
//			<div class="sign"></div>
//			<div class="bgoption"></div>
//			<!--<div class="option">
//				加入购物车
//				<span class="ico-get-cart"></span>
//			</div>-->
//		</a>
//		<div class="data">
//			<p class="price">
//				<span class="now-price">￥100</span>
//				<span class="old-price">￥120</span>
//			</p>
//			<a href="#">
//				<p class="title">
//					[ · 没有它等着晒黑吧] RECIPE 莱斯璧水晶防晒喷雾(SPF30/PA+++/150ml)
//				</p>
//			</a>
//			<a href="#" class="comment">
//				<div class="face"></div>
//				<div class="comment-text">
//					<p>“挺不错的，主要是方便”</p>
//					共有26295条评论 好评率98%
//				</div>
//			</a>
//		</div>
//	</li>
	
	
	function addData(data){
		var arr = data; 
		//今日最新动态添加
		if(!arr.content){  
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
//		{
//			"id" : 111,
//			"img" : "images/allSayGood-00.jpg",
//			"name" : "[没有它等着晒黑吧] RECIPE 莱斯壁水晶 防晒喷雾（SPF3/PA++/155ml）",
//			"nowPrice" : 69,
//			"oldPrice" : 159,
//			"unit" : "￥",
//			"collect" : 77,
//			"discount" : 2, 
//			"face" : "images/allSayGood-face-01.jpg",
//			"content" :"挺不错的，主要是方便",
//			"observor" : 26295,
//			"sayGooder" : 98,
//			"endTime": "2018-08-25 01:01:10"
//		},
//		else if(arr.content){
//			for(var i = 0;i < arr.length;i++){
//				var src = arr[i].img; 
//				var nowPrice = arr[i].nowPrice;
//				var oldPrice = arr[i].oldPrice;
//				var content = arr[i].content;
//				var observor = arr[i].observor;
//				var sayGooder = arr[i].sayGooder;
//				
//				$("<img src=" + src + ">").appendTo($(".todayNew ul li").eq(i).find(".todayNew-img"));
//				$(".todayNew ul li").eq(i).find(".data .price .now-price").html("￥" + nowPrice);
//				$(".todayNew ul li").eq(i).find(".data .price .old-price").html("￥" + oldPrice);
//				$(".todayNew ul li").eq(i).find(".data .price .collect").html(collect + "人收藏");
//				$(".todayNew ul li").eq(i).find(".data .title .discount").html(discount + "折");
//				$(".todayNew ul li").eq(i).find(".data .title a").html(goodsName);
//			}
//		}
		else{
			alert("没有商品")
		}
	}
	
	
	
	//点击商品进入商品详情页
	//事件委托
	function intoDetail(data){
		
		var arr = data;
		//列表1
		$(".todayNew .todayNew-list1 li .new-img").click(function(){
			//下标
			var index = $(this).parent().index();
			//获取点击当前商品的id
			var id = data[index].id;
			//跳转页面
			location.href = "goodsDetail.html?id=" + id;
//			window.open("goodsDetail.html?id=" + id)
			
			
		})
		//列表2
		$(".todayNew .todayNew-list2 li .new-img").click(function(){
			//下标
			var index = $(this).parent().index();
			//获取点击当前商品的id
			var id = data[index + 4].id;
			location.href = "goodsDetail.html?id=" + id;
//			window.open("goodsDetail.html?id=" + id)
			
		})
		
	}  
	
})
