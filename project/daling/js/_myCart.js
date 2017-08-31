
//我的购物车
$(function(){
	
	refeshCookie();
	function refeshCookie(){
		//获取cookie
		var arr = $.cookie("cart");
		if(arr){
			
			arr = JSON.parse(arr);
			
			//添加商品前删除所有的商品
			$(".cart .cart-list").remove();
			//总价
			var totalPrice = 0;
			var totalSave = 0;
			//添加商品
			if(arr.length > 0){
				for(var i = 0;i < arr.length;i++){
					var obj = arr[i];
					var div = $("<div class='cart-list clear'></div>").appendTo($(".cart"));
					div.html(
						"<ul>" +
							"<li class='td-tdCheck'>" +
								"<input type='checkbox' class='checkGoods'>" +
							"</li>" +
							"<li class='td-tdGoods'>" +
								"<a href='javascript:;' class='goods-img'>"+
									"<img src=" + obj.img + "/>"+
								"</a>" +  
								"<a href='javascript' class='goods-name'>" +
									obj.name +
								"</a>" +
							"</li>" + 
							"<li class='td-tdPrice'>￥" + obj.nowPrice + "</li>" +
							"<li class='td-tdCount'>" +
								"<input type='button' class='sub' value='-'/>" +
								"<input type='text' class='txt' value=" + obj.num + ">" +
								"<input type='button' class='add' value='+'/>" +
							"</li>" +
							"<li class='td-tdTotal'>￥" + (obj.nowPrice * obj.num) + "</li>" +
							"<li class='td-tdHandle'><a href='javascript:;'>删除</a></li>" +
						"</ul>"
					) 
					if(obj.ischecked == true){
						//选中状态
						$(".cart .checkGoods").eq(i).prop("checked",true);
						//总价计算
						totalPrice += obj.nowPrice * obj.num;
						totalSave += (obj.oldPrice - obj.nowPrice) * obj.num;
					}
					else{
						$(".cart .checkGoods").eq(i).removeProp("checked");  
					}
				}
				//显示总价
				
				$(".total-box .total-count").html(totalPrice);
				$(".total-box .total-save").html(totalSave);
			}
			//没有商品
			else{
				$(".total-box .total-count").html(0);
				$(".total-box .total-save").html(0);
			}
		}
	};
	
	//+
	//事件委托
	$(".cart").on("click",".add",function(){
		var index = $(this).index(".cart .add");
		//获取cookie
		var arr = JSON.parse($.cookie("cart"));
		//数量加1
		arr[index].num++;
		//存到cookie
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		//根据cookie刷新页面
		refeshCookie();
	});
	
	//-
	//事件委托
	$(".cart").on("click",".sub",function(){
		var index = $(this).index(".cart .sub");
		//获取cookie
		var arr = JSON.parse($.cookie("cart"));
		//数量加1
		arr[index].num--;
		//临界值
		if(arr[index].num <= 1){
			arr[index].num = 1;
		}
		//存到cookie
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		//根据cookie刷新页面
		refeshCookie();
	});
	
	
	//删除
	//事件委托
	$(".cart").on("click",".td-tdHandle a",function(){
		var index = $(this).index(".cart .td-tdHandle a");
		//修改cookie
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index,1);
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		
		refeshCookie();
		
	});
	  
	
	//勾选
	$(".cart").on("click",".checkGoods",function(){
		var index = $(this).index(".cart .checkGoods");
//		console.log(index);
		//修改cookie
		var arr = JSON.parse($.cookie("cart"));
		arr[index].ischecked = !arr[index].ischecked;
//		console.log(arr[index].ischecked);
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		
		isCheckAll();
		refeshCookie();    
		
	});
	
	//全选
	$(".main .checkAll").click(function(){
		var is = $(this).prop("checked");
		console.log(is);
		$(this).parents(".main").find(".checkAll").prop("checked",is);
		
		var arr = JSON.parse($.cookie("cart"));
		for(var i = 0;i < arr.length;i++){
			if($(this).prop("checked") == true){
				arr[i].ischecked = true;
			}
			else{
				arr[i].ischecked = false;
			}
		}
		$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
		refeshCookie();
	});
	
	
	//判断是否全选
	isCheckAll();
	function isCheckAll(){
		//防止“cart”为undefined
		if(!$.cookie("cart")){
			return;
		}
		var arr =JSON.parse( $.cookie("cart") );
		var sum = 0;
		for(var i = 0;i < arr.length;i++){
			sum += arr[i].ischecked;
		}
		if(sum!=0 && sum==arr.length){
			$(".main .checkAll").prop("checked",true);
		}
		else{
			$(".main .checkAll").prop("checked",false);
		}
	};
	
	//删除选中
	$(".deleteSelect").click(function(){
		var arr = JSON.parse( $.cookie("cart") );
		var arr2 = [];
		for(var i = 0;i < arr.length;i++){
			if(!arr[i].ischecked){
				arr2.push(arr[i]);
			}
		}
		$.cookie("cart",JSON.stringify(arr2),{expires:30,path:"/"});
		isCheckAll();
		refeshCookie();
	});
	
})
