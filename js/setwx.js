var woniuImg = "http://m.iwoniu.net/Content/img/logo_1.jpg";
var woniuTitle = "窝牛-兼职网";
var woniuDesc = "简单、靠谱、高效的大学生兼职平台";
var thishref = window.location.href;

wx.ready(function() {
		wx.config({
			debug : false,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : 'wxc2222cb33a6b1d4d', // 必填，公众号的唯一标识
			timestamp : '', // 必填，生成签名的时间戳
			nonceStr : '', // 必填，生成签名的随机串
			signature : '',// 必填，签名，见附录1
			jsApiList : [ "'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','getNetworkType','openLocation','getLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','scanQRCode','chooseWXPay','openProductSpecificView','addCard','chooseCard','openCard'" ]
		});
		//分享到朋友圈
		wx.onMenuShareTimeline({
			title : woniuTitle, // 分享标题
			link : thishref, // 分享链接
			imgUrl : woniuImg, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//分享给朋友
		wx.onMenuShareAppMessage({
			title : woniuTitle, // 分享标题
			desc : woniuDesc, // 分享描述
			link : thishref, // 分享链接
			imgUrl : woniuImg, // 分享图标
			type : '', // 分享类型,music、video或link，不填默认为link
			dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
			success : function() {
				// 用户确认分享后执行的回调函数
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//分享给qq
		wx.onMenuShareQQ({
			title : woniuTitle, // 分享标题
			desc : woniuDesc, // 分享描述
			link : thishref, // 分享链接
			imgUrl : woniuImg, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		//分享给腾讯微博
		wx.onMenuShareWeibo({
			title : woniuTitle, // 分享标题
			desc : woniuDesc, // 分享描述
			link : thishref, // 分享链接
			imgUrl : woniuImg, // 分享图标
			success : function() {
				// 用户确认分享后执行的回调函数
			},
			cancel : function() {
				// 用户取消分享后执行的回调函数
			}
		});
		
	});
