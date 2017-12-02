/*
 * 首页－内嵌页面－弹窗
 * 
 * -因为要进行数据操作，弹窗的类似操作没有进行合并。
 * -打开新页面的操作进行了合并
 * 
 * 带有支付集成的部分没进行操作，代码复制进去了。仅供参考。－castapp
 * 
 * 
 * 
 */

//弹窗的id-全局
var ele_tcid;//触发遮罩和窗口的element
var mask_show = false;//遮罩状态

//关闭按钮关闭弹窗
mui.each(dj.className("txt-close"),function(data){//遍历弹窗中的关闭按钮
	dj.click(dj.className("txt-close")[data],function(){//增加点击事件
		closeMaskBtn(mask_show,data);//关闭所在弹窗
	})
})

//提示登录弹窗
dj.click(dj.id("inner-backdrop"),function(){
	dj.id("inner-backdrop").style.display = "none";
})

//提示登录弹窗－登陆弹窗
dj.click(dj.id("tc_mr_dl"),function(){
	ele_tcid = dj.id("tc_mr_dl");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})

//登陆弹窗
dj.click(dj.id("tc_btn_yhdl"),function(){
	ele_tcid = dj.id("tc_btn_yhdl");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})

//注册
dj.click(dj.id("zc"),function(){
	dj.id("inner-backdrop").style.display = "none";
	setTimeout(function(){
		ele_tcid = dj.id("zc");//被点击的id
		mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
	},20)
})
//登陆》注册
dj.click(dj.id("zc2"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	setTimeout(function(){
		ele_tcid = dj.id("zc2");//被点击的id
		mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
	},20)
})
//用户注册提交按钮
dj.click(dj.id("yhzc_sub"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	//切换登录的模块 
	dj.id("tc_btn_yhdl").style.display = "none";//隐藏未登录
	dj.className("login-already")[0].style.display="block";//打开已登录
})

//用户登录提交按钮
dj.click(dj.id("yhdl_sub"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	//切换登录的模块 
	dj.id("tc_btn_yhdl").style.display = "none";//隐藏未登录
	dj.className("login-already")[0].style.display="block";//打开已登录
})

var turn_on = true;//设置开关
//验证码
dj.click(dj.id("yzm"),function(){
	var code = dj.getIdCode();//获取验证码
	/**
	 * 发送短信 集成服务版
	 * 请先登录 http://www.castapp.cn 创建应用 获得appid,appkey
	 * code           验证码
	 * target_phone   对方手机号码
	 * appid          在创建应用后得到的appid
	 * appkey         在创建应用后得到的appkey
	 * sms_templates  短信模版
	 * package_name   App包名
	 * 
	 */
	 
	//	dongyi.sendIdCode({
	//	    code:'9998',
	//	    target_phone:'13800138000',
	//	    appid:'你申请appid',
	//	    appkey:'你申请appkey',
	//	    sms_templates:'sms_tmpl_1',
	//	    callback:function(state){
	//	        if(state == true){
	//	                dongyi.prompt('发送成功');
	//	            }else{
	//	                dongyi.prompt('发送失败');
	//	            }
	//	    }
	//	});	
	var timer = null;
	if(turn_on){
		turn_on = false;
		var time = 15;
		dj.id("hqyzm").innerHTML = time + "s后重试"; 
		dj.id("yzm").className = "yzm active";
		timer = setInterval(function(){
			time--;
			dj.id("hqyzm").innerHTML = time + "s后重试";
			if(time==0){
				clearInterval(timer);
				time = 30;
				dj.id("yzm").className = "yzm";
				dj.id("hqyzm").innerHTML = "获取验证码";
				turn_on = true;
			}
		},1000);	
	}
})

//暂停加粉
dj.click(dj.id("tc_btn_wxts"),function(){
	ele_tcid = dj.id("tc_btn_wxts");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})

//开启加粉
dj.click(dj.id("tc_wxts_jh"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	dj.id("login_already_zt").style.display = "none";//隐藏“已暂停”
})

//签到
dj.click(dj.id("tc_btn_qdsjjl"),function(){
	ele_tcid = dj.id("tc_btn_qdsjjl");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})

//签到太累？－开通会员
dj.click(dj.id("tc_qdtl"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	setTimeout(function(){
		ele_tcid = dj.id("tc_qdtl");//被点击的id
		mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
	},20)
})


//加粉失败
dj.click(dj.id("jf"),function(){
	ele_tcid = dj.id("jf");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})


//我要开通vip
dj.click(dj.id("kthy"),function(){
	closeMyMask(ele_tcid,mask_show);//关闭弹窗
	setTimeout(function(){
		ele_tcid = dj.id("tc_qdtl");//被点击的id
		mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
	},20)
})

//会员充值
dj.click(dj.id("tc_btn_hycz"),function(){
	ele_tcid = dj.id("tc_btn_hycz");//被点击的id
	mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
})

//选择会员充值等级
var eleCz = dj.className("tc_hycz_div");
mui.each(eleCz,function(data){
	dj.click(eleCz[data],function(){
		closeMyMask(ele_tcid,mask_show);//关闭弹窗
		setTimeout(function(){
			ele_tcid = eleCz[data];//被点击的元素
			mask_show = toggleMask(ele_tcid,mask_show);//切换遮罩和弹窗
		},20)
	})
})

//支付按钮
dj.click(dj.id("tc_zffs_zfb"),function(){//支付宝
	alert("支付宝支付");
	closeMyMask(ele_tcid,mask_show)
	/**
	 * 支付 东翌集成服务版
	 * 请先登录 东翌(http://wenda.dongyixueyuan.com) 创建应用 获得appid,appkey
	 * name    商品名称 *注 最好前面是商品名称，后面是订单编号 如 东翌学院001，东翌学院为名称，001为订单号，此订单号作为对账或者记录使用
	 * appid   在东翌创建应用后得到的appid
	 * appkey  在东翌创建应用后得到的appkey
	 * type    支付类型 alipay 支付宝 wxpay 微信 （目前仅支持支付宝）
	 * money   金额
	 * succFn  支付成功回调函数
	 * errFn   支付失败回调函数
	 * 
	 */
 
	//	dongyi.pay({
	//	    name:'东翌学院订单001',
	//	    appid:'2015121811401165771',
	//	    appkey:'fxqzigynp9bteh830s5a',
	//	    type:'alipay',
	//	    money:0.3,
	//	    succFn:function(){
	//	        alert('成功了');
	//	    }
	//	});
	
	
	/*
	 * 非集成服务版 可自己申请支付宝移动版接口
	 * url    请求地址
	 * type   支付类型 alipay 支付宝 wxpay 微信 （目前仅支持支付宝）
	 * money  金额
	 * succFn 支付成功回调函数
	 * errFn  支付失败回调函数
	 * 
	 */
 
	//	dongyi.pay({
	//	    url:'http://peipao.dongyixueyuan.com/alipay.php',
	//	    type:'alipay',
	//	    money:0.3,
	//	    succFn:function(){
	//	        alert('支付成功');
	//	    },
	//	    errFn:function(err){
	//	        alert('支付失败');
	//	    }
	//	});					
})
dj.click(dj.id("tc_zffs_wx"),function(){//微信
	alert("微信支付");
	closeMyMask(ele_tcid,mask_show);
})




/*
 * 选择性别和地区
 */
var sexLoc = ['男','女','其他','不限'];
dj.click(dj.id("sex_loc"),function(){//
	dj.combinationSelect(3,cityData3,function(loc){//地区
		if(loc){
			dj.combinationSelect(1,sexLoc,function(sex){//性别
				console.log(sex);//控制台打印性别	
			});
			console.log(loc);//控制台打印地区
		}
	})
})


/*
 * 
 * 分享功能
 * 
 * 
 */
//立即邀请好友
dj.click(dj.id("shre_yq"),function(){
	var msg={content:"我萌吗？"};            	//content 内容
		msg.href="http://www.dcloud23345.io/";				//链接地址
		msg.title="我萌吗？";									//链接描述
	if(!mui.os.android){
		shareHref(msg);//ios分享manifest.json 内设置分享平台的key－ios无法调用系统分享
	}else{
		share('分享到...',msg.href,function(){})//调用－安卓调用系统分享;
	}
})

/*
 * 邀请好友
 */
dj.click(dj.id("share_yqhy"),function(){
	var msg={content:"我萌吗？"};            	//content 内容
		msg.href="http://www.dcloud23345.io/";				//链接地址
		msg.title="我萌吗？";									//链接描述
	if(!mui.os.android){
		shareHref(msg);//ios分享manifest.json 内设置分享平台的key－ios无法调用系统分享
	}else{
		share('分享到...',msg.href,function(){})//调用－安卓调用系统分享;
	}
})


/*
 * 打开新页面：使用说明－收入明细－收入明细－邀请纪录－支付宝提现
 */
var arr = ["sysm","shouru","yu_e","intive_jilu","alipay_cash"];
var arr_page = ["introductions","income","income","friends","cash"];
mui.each(arr,function(data){
	dj.click(dj.id(arr[data]),function(){
		var id = arr_page[data];
		openWindowNew(id);//打开新页面
	})
})