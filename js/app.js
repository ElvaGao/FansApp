/*
 * 1.初始化
 * 2.下拉刷新
 * 3.重写back方法
 * 4.切换遮罩和弹窗
 * 5.点击遮罩关闭弹窗
 * 6.关闭按钮关闭弹窗
 * 7.双击回到顶部
 * 8.加载子页面
 * 9.打开新页面
 * 10.三个子页面的弹窗: cash_inner  friends_inner income_inner
 * 11.分享相关设置
 * 
 * 2016－8－25
 * 
 */


/*
 * 初始化
 */
dj.init();


/*
 * 下拉刷新
 */
dj.refreshLoad('pullrefresh',function(clearLoad){
	setTimeout(function(){
		clearLoad();//刷新操作
	},1000)
},function(dataState){
	return false;
})


/*
 * 重写back方法
 */
mui.back = function() {
	var current = plus.webview.currentWebview();
	plus.webview.close(current);
}


/*
 * 函数：切换遮罩和弹窗
 */
function toggleMask(ele_tcid,mask_show){
	var tcId = ele_tcid.getAttribute("data-href");//获取弹窗的id
	dj.id(tcId).style.display="block";//显示弹窗
	mask_show = true;
	dj.showMask(function(){//显示遮罩层
		mask_show = false;
		dj.id(tcId).style.display="none";//遮罩回调函数,关闭遮罩和弹窗
	});//遮罩
	return mask_show;
}


/*
 * 函数：点击遮罩关闭弹窗
 */
function closeMyMask(ele_tcid,mask_show){
	var backdrop = dj.className("mui-backdrop")[0];//遮罩
	if(mask_show){//遮罩是否打开 
		backdrop.parentNode === document.body && document.body.removeChild(backdrop);//关闭遮罩
	}
	var tcId = ele_tcid.getAttribute("data-href");//获取弹窗的id－上一次点击记录在ele_tcid中 
	dj.id(tcId).style.display="none";//隐藏弹窗
}

/*
 * 关闭按钮关闭弹窗
 */
function closeMaskBtn(mask_show,index){
	if(!index){
		index = 0;
	}
	var backdrop = dj.className("mui-backdrop")[0];//遮罩 
	if(mask_show){//遮罩是否打开 
		backdrop.parentNode === document.body && document.body.removeChild(backdrop);//关闭遮罩
	}
	dj.className("login-tips")[index].style.display="none";//关闭所在的弹窗
}


/*
 * 双击回到顶部
 */
function headerTap(){
	mui.init({
		gestureConfig:{
			doubletap:true
		}
	});
	var contentWebview = null;
	document.querySelector('header').addEventListener('doubletap',function () {//双击回到顶部
		if(contentWebview==null){
			contentWebview = plus.webview.currentWebview().children()[0];
		}
		contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
	});
}
/*
 *加载子页面
 */
function subPagesLoad(id){
	mui.init({
		subpages:[{
			url: id+".html",
			id: id,
			styles:{
				top: '44px',
				bottom: '0px'
			}
		}]
	});
}


/*
 *打开新页面
 */
function openWindowNew(name){
	mui.openWindow({
		url: name+".html",
		id: name,
		createNew: true
	})
}


/*
 * 三个子页面: cash_inner  friends_inner income_inner
 */
function tcOpen(mask_show){//奖励细节弹窗
	dj.id("tc_jlxq").style.display = "block";//显示弹窗
	mask_show = true;
	dj.showMask(function(){//显示遮罩层
		mask_show = false;
		dj.id("tc_jlxq").style.display="none";//遮罩回调函数,关闭遮罩和弹窗
	});//遮罩
	return mask_show;
}




/*
 * 分享相关设置
 */
var shares=null,bhref=false;
var Intent=null,File=null,Uri=null,main=null;
// H5 plus事件处理
function plusReady(){
	updateSerivces();
	if(plus.os.name=="Android"){
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
/**
 * 更新分享服务
 */
function updateSerivces(){
	plus.share.getServices( function(s){
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		plus.nativeUI.alert( "获取分享服务列表失败");
	} );
}
/**
   * 分享操作
   * @param {String} id
   */
function shareAction(id,ex,msg) {
	var s=null;
	if(!id||!(s=shares[id])){
		plus.nativeUI.alert( "无效的分享服务！" );
		return;
	}
	if ( s.authenticated ) {
		plus.nativeUI.toast( "已授权" );
		shareMessage(s,ex,msg);
	} else {
		plus.nativeUI.toast( "未授权" );
		s.authorize( function(){
				shareMessage(s,ex,msg);
			},function(e){
			plus.nativeUI.alert( "认证授权失败");
		});
	}
}
/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
function shareMessage(s,ex,msg){
	s.send( msg, function(){
		plus.nativeUI.alert( "分享到\""+s.description+"\"成功！ " );
	}, function(e){
		plus.nativeUI.alert( "分享到\""+s.description+"\"失败: ");
	} );
}
// 分享链接
function shareHref(msg){
	bhref=true;
	var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"qq"}],
	bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"},{title:"分享到QQ"}];
	plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
		function(e){
			var i=e.index;
			if(i>0){
				shareAction(ids[i-1].id,ids[i-1].ex,msg);
			}
		}
	);
}

//调用安卓手机的系统分享
function share(shareTip,shareText){
    var Context = plus.android.importClass("android.content.Intent");//导入Java类对象
    var Main = plus.android.runtimeMainActivity();//获取应用主Activity
    var shareIntent=new Context(Context.ACTION_SEND);//将类Context的这个行为(Action)ACTION_SEND，赋给shareIntent
    //plus.android.invoke(shareIntent,"setType","text/plain");//***两种写法一样
    //plus.android.invoke(shareIntent,"putExtra",Context.EXTRA_TEXT,shareText);//***两种写法一样
    shareIntent.setType("text/plain"); //设置分享类型
    shareIntent.putExtra(Context.EXTRA_TEXT, shareText);//设置分享文本
    //shareIntent.setPackage('com.tencent.mm',); //指定分享的包名
    Main.startActivity(Context.createChooser(shareIntent,shareTip));//***以上两种写法是一样的
}