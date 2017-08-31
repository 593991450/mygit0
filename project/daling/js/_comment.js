
//达令公共js代码

//侧栏显示商品数量
function showGoodsCount(){
	
	var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
	if(arr){
		//侧栏
		$(".sidebar-cart .myCart-sum").html(arr.length);
		//顶栏
		$(".top-inner .cart .myCart-sum").html(arr.length);
	}
	else{
		$(".sidebar-cart .myCart-sum").html(0);
	}
}

function intoMyCart(){
	//侧栏
	$("#sidebar .sidebar-cart").click(function(){
			
		window.open("_myCart.html");
		
	});
	//顶栏
	$(".top-inner .cart a:first").click(function(){
		
		window.open("_myCart.html");
		
	})
	
}
