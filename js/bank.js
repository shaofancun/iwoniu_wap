var bank = {};
//删除银行卡
bank.del = function (bankCardId) {
    jConfirm("确定要删除银行卡？", "温馨提示", function (r) {
        if (r) {
            $.ajax({
                url: "/Balance/BankCardDelete",
                type: "Post",
                data: { BankCardId: bankCardId },
                dataType: "json",
                success: function (result) {
                    if (result.Success) {//删除成功
                        $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                            location.reload();
                        }
                        });
                    } else {//错误
                        alert(result.Msg);
                    }
                }
            });
        }
    });
}
//添加银行卡
bank.add = function () {
    var bankId = $("#BankId").val(), 		//银行卡ID
		bankCardNumber = $("#BankCardNumber").val(), 		//银行卡号	
		realName = $("#RealName").val(); 	//持卡人
    if (!bankCardNumber) {
        alert("银行卡号不能为空");
        return false;
    } else if (!realName) {
        alert("持卡人姓名不能为空");
        return false;
    }
    $.ajax({
        url: "/Balance/SubBankCardAdd",
        data: { BankId: bankId, BankCardNumber: bankCardNumber, RealName: realName },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    window.location.href = "/Balance/BankCardList";
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })
}
//确认提现
bank.sure = function () {
    var bankid = $("#bankid").val(), 		//银行卡ID
		money = $("#money").val(), 		//提现金额
		zfpassword = $("#password").val(); //支付密码
    if (!money) {
        alert("提现金额不能为空");
        return false;
    } else if (!zfpassword) {
        alert("密码不能为空");
        return false;
    }
    $.ajax({
        url: "",
        data: { bankid: bankid, money: money, zfpassword: zfpassword },
        dataType: 'json',
        type: 'get',
        success: function (result) {
            if (result.status == 0) {
                alert("提现成功");
            } else {
                alert(result.msg);
            }
        }
    })
}
