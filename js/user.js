var user = {};
//登录方法
user.login = function () {
    var uname = $('#username').val(), 	//用户名、手机
		upassword = $('#password').val(); //密码
    if (!uname) {
        alert("请输入手机号或用户名");
        return false;
    } else if (!upassword) {
        alert("密码不能为空");
        return false;
    }
    $.ajax({
        url: "/Home/SubLogin",
        data: { loginStr: uname, loginPass: upassword },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                window.location.href = '/User/Index';
            } else {
                alert(result.Msg);
            }
        }
    })
}
//注册方法
user.register = function () {
    var uname = $('#username').val(), 		//用户名
		phone = $("#phone").val(), 		//手机
		code = $("#code").val(), 			//验证码
		upassword = $('#password').val(), 	//密码
		upassword_a = $('#password_a').val(); //确认密码
    if (!uname) {
        alert("请输入用户名");
        return false;
    } else if (!phone) {
        alert("请输入手机");
        return false;
    } else if (!code) {
        alert("请输入验证码");
        return false;
    } else if (!upassword) {
        alert("请输入密码");
        return false;
    } else if (upassword != upassword_a) {
        alert("两次密码不一样");
        return false;
    }
    $.ajax({
        url: "/Home/SubRegister",
        data: { loginName: uname, mobile: phone, code: code, loginPassword: upassword },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/Home/Login";
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })
}
//修改登录密码
user.editpassword = function () {
    var oldp = $('#oldpassword').val(), //原密码
		newp = $('#newpassword').val(), //新密码
		p_a = $('#password_a').val();
    if (!oldp) {
        alert("请输入原密码");
    } else if (!newp) {
        alert("请输入新密码");
        return false;
    } else if (newp != p_a) {
        alert("两次密码不一样");
        return false;
    }
    $.ajax({
        url: "/UserSafe/SubLoginPassword",
        data: { original: oldp, loginpass: newp },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success == true) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/User/UserSet";
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })
}
//支付密码
user.paypassword = function () {

    var code = $('#code').val(), 	//验证码
		passw = $('#password').val(), //支付密码
        original = $("#originalpassword").val();
    p_a = $('#password_a').val();
    if (!code) {
        alert("请输入验证码");
    } else if (!passw) {
        alert("请输入支付密码");
        return false;
    } else if (passw != p_a) {
        alert("两次密码不一样");
        return false;
    }
    if (!original) {
        alert("原密码不能为空");
        return false;
    }
    $.ajax({
        url: "/UserSafe/SubSafePassword",
        data: { code: code, original: original, safepass: passw },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/User/UserSet";
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })
}
//忘记密码
user.forget = function () {
    var mobile = $("#Mobile").val(), 		//手机
		code = $("#code").val(), 			//验证码
		loginPassword = $('#LoginPassword').val(), 	//密码
		upassword_a = $('#password_a').val(); //确认密码
    if (!mobile) {
        alert("请输入手机");
        return false;
    } else if (!code) {
        alert("请输入验证码");
        return false;
    } else if (!loginPassword) {
        alert("请输入密码");
        return false;
    } else if (loginPassword != upassword_a) {
        alert("两次密码不一样");
        return false;
    }
    $.ajax({
        url: "/UserSafe/SubForgetPassword",
        data: { Mobile: mobile, Code: code, LoginPassword: loginPassword },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/Home/Login";
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })

}
//发送验证码
user.sendcode = {
    //发送验证码
    send: function () {
        var phone = $("#phone").val();
        if (!phone || phone.length != 11) {
            alert('手机号格式不正确');
            return false;
        }
        $.ajax({
            url: "/Home/SendRegCode",
            data: { mobile: phone },
            dataType: 'json',
            type: 'post',
            success: function (result) {
                if (result.Success) {
                    alert(result.Msg);
                    user.sendcode.countdown();
                } else {
                    alert(result.Msg);
                }
            }
        })
    },
    sendforget: function () {
        var mobile = $("#Mobile").val();
        if (!mobile || mobile.length != 11) {
            alert('手机号格式不正确');
            return false;
        }
        $.ajax({
            url: "/UserSafe/SendForget",
            data: { mobile: mobile },
            dataType: 'json',
            type: 'post',
            success: function (result) {
                if (result.Success) {
                    alert(result.Msg);
                    user.sendcode.countdown();
                } else {
                    alert(result.Msg);
                }
            }
        })
    },

    //无需手机号码，发送验证码，设置支付密码
    nop_send: function () {
        $.ajax({
            url: "/UserSafe/SendSafeCode",
            data: "",
            dataType: 'json',
            type: 'post',
            success: function (result) {
                if (result.Success == true) {
                    alert(result.Msg);
                    user.sendcode.countdown();
                } else {
                    alert(result.Msg);
                }
            }
        })
    },
    //倒计时
    countdown: function () {
        var $send_btn = $("#send_code"),
			time = 60;
        $send_btn.attr("disabled", "disabled").addClass("disabled").html("重新发送（60）"); ;
        var timer = setInterval(function () {
            time--;
            if (time > 0) {
                $send_btn.html("重新发送（" + time + "）");
            } else {
                clearInterval(timer);
                $send_btn.removeAttr("disabled", "disabled").removeClass("disabled").html("发送验证码");
                return;
            }
        }, 1000)
    }
}










