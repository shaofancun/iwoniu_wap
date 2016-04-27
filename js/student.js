$(function () {
    //图片上传
    $(document).on('change', "input[type='file']", function (e) {
        stu.uploadimg(this, e);
    });

})
var stu = {}
//学校搜索框
stu.schoolbox = {
    //学校搜索框
    $schoolbox: $("#somedialog"),
    //学校列表
    $schoollist: $("#schoollist"),
    show: function () {
        stu.schoolbox.$schoolbox.addClass("dialog--open");
    },
    hide: function () {
        stu.schoolbox.$schoolbox.removeClass("dialog--open");
        //关闭清楚子元素
        stu.schoolbox.$schoollist.children().remove();
    },
    //搜索学校
    saerch: function () {
        var schoolname = $("#school").val(),
        //list_array需要ajax获取
			list_array;
        $.ajax({
            url: "/CommonData/School",
            data: { SchoolName: schoolname },
            dataType: 'json',
            type: 'get',
            success: function (result) {
                list_array = result;
                $.each(list_array, function (idx, item) {
                    var option = '<li onclick="stu.schoolbox.select_(this,' + item.Id + ')">' + item.SchoolName + '</li>';
                    $("#schoollist").append(option);
                });
            }
        });
    },
    //选择学校
    select_: function (obj, id) {
        var val = $(obj).html(),
			schoolid = id;
        $("#schoolname").html(val);
        $("#schoolid").val(schoolid);
        stu.schoolbox.hide();
    }
}
//上传图片
stu.uploadimg = function (obj, event) {
    var element = event.target,
		files = element.files,
		imgurl;
    if (files) {
        var file = files[0];
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("图片不能大于10M");
            return false;
        }
    }
    var reader = new FileReader();
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
        imgurl = e.target.result;
        var img = element.nextElementSibling;
        if (img.className == "idimg") {
            $('.idimg').attr('src', imgurl).show();
        } else {
            $('.stuimg').attr('src', imgurl).show();
        }
    };
}
//提交信息
stu.verify = function () {
    var realname = $("#realname").val(), 		//真实姓名
		idcard = $("#idcard").val(), 			//身份证号
		idstu = $("#idstu").val(), 			//学号
		schoolid = $("#schoolid").val(), 		//学校ID
		time = $("#time").val(), 				//入学年份
		idimg = $(".idimg").attr("src"), 		//身份证照	
		stuimg = $(".stuimg").attr("src"); 	//学生证照
    if (!realname) {
        alert("真实姓名不能为空");
        return false;
    } else if (!idcard) {
        alert("身份证号不能为空");
        return false;
    } else if (!idstu) {
        alert("学号不能为空");
        return false;
    } else if (!schoolid) {
        alert("请选择学校");
        return false;
    } else if (!time) {
        alert("入学时间不能为空");
        return false;
    } else if (!idimg) {
        alert("身份证照不能为空");
        return false;
    } else if (!stuimg) {
        alert("学生证照不能为空");
        return false;
    }
    $.ajax({
        url: "/UserSafe/SubSudentAuth",
        data: {
            RealName: realname,
            IdCardNumber: idcard,
            StudentNo: idstu,
            SchoolId: schoolid,
            EntranceTime: time,
            Image1: idimg,
            Image2: stuimg
        },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/Home/Index";
                } 
                });
            } else {
                alert(result.Msg);
            }
        }
    });
}
