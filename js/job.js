var job = {},
	phbox = $("#somedialog"),
	url = window.location.href;
    job.page; //页码
if($("#pullDown").length>0){
    //初始化绑定iScroll控件 
    var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', loaded, false);
}
//初始化职位列表
job.init = function init() {
    zwAjax(parseInt($("#page").val()));
}
//下拉刷新
function pullDownAction() {
    $("#thelist").html("");
    pullUpAction(1);
}
//上拉加载下一页
function pullUpAction(page) {
    if (page != 1) {
        job.page = parseInt($("#page").val())+1;
    } else {
        job.page = page;
    }
    zwAjax(job.page);
}
//获取职位数据
function zwAjax(page){
    var parentPosition = $("#ParentPosition").val();
    var searchName = $("#SearchName").val();
    //加载职位
    $.ajax({
        //url: "/Recruitment/RListData",
        url: "js/Recruitment.json",
        data: { Page: page, ParentPosition: parentPosition, SearchName: searchName },
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result.Data.length <= 0) {
                alert("没有更多数据");
            }else{
                $("#page").val(parseInt(result.PageIndex));
            }
            $.each(result.Data, function (k, p) {
                var option = '<li><a href="/Recruitment/Detail?Id=' + p.RecruitmentId + '">'
                + '<div class="img-box"><img src="' + p.Logo + '"><div class="star-bg"><div class="star-hr" style="width: ' + p.Score * 20 + '%;"></div></div></div>'
                + '<h2>' + p.RecruitmentName + '</h2>'
                + '<p><i class="time"></i>' + formatTime(p.JobBeginDate, "yyyy-MM-dd") + '~' + formatTime(p.JobEndDate, "yyyy-MM-dd") + '(' + p.DayWorkHours + '小时/天)</p>'
                + '<p><i class="num"></i>招聘人数(' + p.Numbers + ')/已成功报名(' + p.PassNumber + ')</p>'
                + '<p><span class="w-red">' + p.HoursSalary + '元/小时</span></p>'
                + '<div class="baoming">'
                if (p.Status == 7) {//已报满
                    +'<img src="/Content/img/yibaoming.fw.png">'
                } else if (p.Status == 9) {//已结束
                    +'<img src="/Content/img/jieshu.fw.png">'
                }
                +'</div></a></li>';
                $("#thelist").append(option);
            });
            myScroll.refresh();
        }
    });
}


//报名申请
job.signUp = function (resId) {
    jConfirm("确定要申请报名这份工作吗？", "温馨提示", function (r) {
        if (r) {
            $.ajax({
                url: "/Recruitment/Registration",
                type: "Post",
                data: { RecruitmentId: resId },
                dataType: "json",
                success: function (result) {
                    if (result.Success) {//报名成功
                        alert(result.Msg);
                    } else {
                        if (result.Data =='101') {
                            location.href = "/Home/Login";
                        } else {
                            alert(result.Msg);
                        }
                    }
                }
            });
        }
    });
}
//电话咨询
job.phone = function () {
    phbox.addClass("dialog--open");
}
job.phone.close = function () {
    phbox.removeClass("dialog--open");
}
//收藏企业
job.followOn = function (companyId) {
    $.ajax({
        url: "/MyCollection/CollectionHandler",
        type: "Post",
        data: { CompanyId: companyId },
        dataType: "json",
        success: function (result) {
            if (result.Success) {//已登录，收藏成功
                //查看收藏结果的数据
                if (result.Data == "1") {
                    $("#on_follow").hide();
                    $("#off_follow").show();
                } else {
                    $("#off_follow").hide();
                    $("#on_follow").show();
                }
                alert(result.Msg);
            } else {//错误
                //登录失效的错误
                if (result.Data == "101") {
                    $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                        location.href = '/Home/Login';
                    }
                    });
                } else {
                    alert(result.Msg);
                }
            }
        }
    });

}
//取消收藏企业
job.followOff = function (resId) {
    alert("取消");
    $.ajax({
        url: "",
        type: "get",
        data: { 'resId': resId },
        dataType: "json",
        success: function (result) {
            if (result.status == 0) {//已登录，取消收藏
                $("#off_follow").hide();
                $("#on_follow").show();
            } else {//错误
                alert(result.msg);
            }
        }
    });
}
//企业地址地图
job.comap = function (zbX, zbY) {
    window.location.href = "/Home/Comap?x=" + zbX + "&y=" + zbY;
}
