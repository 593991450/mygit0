

//登录、注册页面
$(function(){
	
	//进入页面刷新验证码
	$(".login-tab .captcha-btn").val(changeCode());
	$(".register-tab .captcha-btn").val(changeCode());
	
	
	//切换登录/注册
	$(".main .login-box .select .login").find("i").css({"display":"block"});
	$(".main .login-box .select a").click(function(){
		
		var index = $(this).index();
		$(this).find("i:first").show().parent().siblings().find("i:first").hide();
		//登录表
		if(index == 0){
			$(".login-list-wraper .login-tab").show();
			$(".login-list-wraper .register-tab").hide();
		}
		else if(index == 1){
			$(".login-list-wraper .login-tab").hide();
			$(".login-list-wraper .register-tab").show();
		}
		
		//更换验证码
		$(".login-tab .captcha-btn").val(changeCode());
		$(".register-tab .captcha-btn").val(changeCode());
		
	});
	
	
	//注册
	//用户名
	var userFlag = false;
	$(".register-tab .user").keyup(function(){
		var reg = /^[a-zA-Z]\w{3,11}$/;
		var user = $(".register-tab .user").val();
		if(reg.test(user) == true){
			
			$(".toast").html("用户名合法");
			userFlag = true;
		}
		else {
			$(".toast").html("用户名为数字字母下划线, 且第一个不能为数字, 长度为4~12位")
		}
		
	});
	
	//密码
	var pwdFlag = false;
	$(".register-tab .pwd").keyup(function(){
		var reg = /^.{4,10}$/;
		var pwd = $(".register-tab .pwd").val();
		if(reg.test(pwd) == true){
			
			$(".toast").html("密码合法");
			pwdFlag = true;
		}
		else {
			$(".toast").html("密码长度为8~20位")
		}
	});
	
	//确认密码
	var confirmPwdFlag = false;
	$(".register-tab .confirmpwd").keyup(function(){
		var pwd = $(".register-tab .pwd").val();
		var confirmPwd = $(".register-tab .confirmpwd").val();
		if(pwd == confirmPwd){
			
			$(".toast").html("重复密码正确");
			confirmPwdFlag = true;
		}
		else {
			$(".toast").html("两次输入的密码不一致")
		}
	});
	
	//验证码
	//更换验证码
	var codeFlag = false;
	$(".register-tab .captcha-btn").click(function(){
		$(".register-tab .captcha-btn").val(changeCode());
	});
	//输入验证码
	$(".register-tab .code").keyup(function(){
		var code = $(".register-tab .code").val();
		var captcha = $(".register-tab .captcha-btn").val();
		if(code == captcha){
			$(".toast").html("输入验证码正确");
			codeFlag = true;
		}
		else{
			$(".toast").html("验证码错误");
		}
	});
	
	
	//阅读框点击
	$(".register-tab .readCheck").click(function(){
		var isRead = $(".register-tab .readCheck").prop("checked");
		if(userFlag==true && pwdFlag==true && confirmPwdFlag == true && codeFlag == true && isRead == true){
			
			$(".register-tab .register-btn").css({"background":"#e14958"});
			
		}	
	});
	
	
	//点击注册
	$(".register-tab .register-btn").click(function(){
		var isRead = $(".register-tab .readCheck").prop("checked");
		
		if(!userFlag){
			$(".toast").html("用户名为数字字母下划线, 且第一个不能为数字, 长度为4~12位");
		}
		else if(!pwdFlag){
			$(".toast").html("密码长度为8~20位");
		}
		else if(!confirmPwdFlag){
			$(".toast").html("两次输入的密码不一致");
		}
		else if(!codeFlag){
			$(".toast").html("输入的验证码不正确");
		}
		
		if(userFlag==true && pwdFlag==true && confirmPwdFlag == true && codeFlag == true && isRead == true){
				
			$.ajax({
				type:"post",
				url:"http://127.0.0.1/study/project/daling/php/register.php",
				data:"username=" + $(".register-tab .user").val() + "&password=" + $(".register-tab .pwd").val(),
				async:true,
				success:function(data){
					console.log(data);
					var obj = JSON.parse(data);
					if(obj.status == 1){
						$(".toast").html("注册成功");
						$(".register-tab .user").val("");
						$(".register-tab .pwd").val("");
						$(".register-tab .confirmpwd").val("");
						$(".register-tab .code").val("");
					}
					else if(obj.status == 0){
						$(".toast").html("用户名已存在");
					}
					
				}
			});
				
		}	
		
	});
	
	
	
	//登录
	
	$(".login-tab .login-btn").click(function(){
		var username = $(".login-tab .user").val();
		var pwd = $(".login-tab .pwd").val();
		var code = $(".login-tab .code").val();
		var captcha = $(".login-tab .captcha-btn").val();
		
		if(username == ""){
			$(".toast").html("用户名不能为空");
		}
		else if(!code == captcha){
			$(".toast").html("验证码不正确");
		}
		else{
			$.ajax({
				type:"post",
				url:"http://127.0.0.1/study/project/daling/php/login.php",
				async:true,
				data:"username=" + username + "&password=" + pwd,
				success:function(data){
					var obj = JSON.parse(data);
					if(obj.status == 1){
						$(".toast").html("登录成功");	
						location.href = "darling1.0.1.html";
					}
					else{
						$(".toast").html("用户名或密码错误!");	
					}
					
				}
			});	
		}
	});	
	
	
	
	//验证码更换函数
	function changeCode(){
		var str = "";
		for(var i = 0;i < 4;i++){
			str += parseInt(Math.random() * 10);
		}
		return str;
	}
	
})
