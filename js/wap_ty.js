$(function(){
	if($(".go-left").length>0){
		$(".go-left").click(function(){
			window.history.back();
		})
	}
	//返回顶部
	var gotop='<a href="javascript:;" class="gotop" id="gotop"></a>';
	$("body").prepend(gotop);
	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			$('#gotop').fadeIn(400)
		} else {
			$('#gotop').fadeOut(200)
		}
	});
	$('#gotop').click(function() {
		$('html,body').animate({
			scrollTop: '0px'
		},
		200)
	})
	/* ajax全局配置 */
	$.ajaxSetup({
		beforeSend : function() {
			loading.show();
		},
		complete : function() {
			loading.hide();
		}
	});
})
//loading
var loading={
    dom: '<div class="loadingbox"><div class="loadecenter"><div class="loadrgb"><div class="loader"></div><p>加载中...</p></div></div></div>',
	show:function(){
		$('body').append(loading.dom);
	},
	hide:function(){
		$('.loadingbox').remove();
	}
}
//透明提示框
function alert(str){
	$.jGrowl(str, { life:1000});
}
//获取地址栏值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//时间转换
var formatTime = function(time, format){ 
	var t = new Date(time * 1000); 
	var tf = function(i){return (i < 10 ? '0' : '') + i}; 
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){ 
		switch(a){ 
		case 'yyyy': 
			return tf(t.getFullYear()); 
			break; 
		case 'MM': 
			return tf(t.getMonth() + 1); 
			break; 
		case 'mm': 
			return tf(t.getMinutes()); 
			break; 
		case 'dd': 
			return tf(t.getDate()); 
			break; 
		case 'HH': 
			return tf(t.getHours()); 
			break; 
		case 'ss': 
			return tf(t.getSeconds()); 
			break; 
		}; 
	}); 
} 
/**
 * 初始化iScroll控件
 */

function loaded() {
	wHeight= window.innerHeight;
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', 
		useTransition: false, 
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function (evt) {
			//console.log("this.y:"+this.y,"this.maxScrollY:"+this.maxScrollY);

			if (this.y > 15 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				this.minScrollY = 0;
			} else if (this.y <15 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} 
			if(document.getElementById("thelist").offsetHeight>=wHeight){
				pullUpEl.style.display="block"
				if (this.y > (this.maxScrollY + 15) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
				}
				else if (this.y < (this.maxScrollY - 15) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					this.maxScrollY = this.maxScrollY;
				}
			}
			 
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
				pullDownAction();
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();
			}
		}
	});
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}