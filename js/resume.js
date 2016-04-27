var resume = {}
$(function () {
    //加载已选职位
    if ($("#zhiwei").val()) {
        resume.zhiweibox.default_($("#zhiwei").val());
    }
    //选择省加载市
    $("#ProvinceCode").change(function () {
        var parent = $(this).val();
        if (parent != "0") {
            $("#CityCode option:gt(0)").remove();
            resume.region.loadRegion(parent, 2, $("#CityCode"));
            //设置默认
            resume.region.regionDefault($("#CityCode"));
            resume.region.regionDefault($("#CountyCode"));
        }
    });
    //选择市加载区
    $("#CityCode").change(function () {
        if (parent != "0") {
            var parent = $(this).val();
            $("#CountyCode option:gt(0)").remove();
            resume.region.loadRegion(parent, 3, $("#CountyCode"));
            resume.region.regionDefault($("#CountyCode"));
        }
    });
})
//省市区相关
resume.region = {
    loadRegion: function (parent, level, next) {
        $.ajax({
            url: "/Resume/GetRegion",
            dataType: 'json',
            type: 'get',
            data: { parent: parent, level: level },
            success: function (result) {
                var shtml = '<option value="0">请选择</option>';
                $.each(result, function (i, item) {
                    shtml += "<option value='" + item.RegionCode + "'>" + item.RegionName + "</option>";
                });
                $(next).html(shtml);
            }
        });
    },
    regionDefault: function (obj) {
        $(obj).html('<option value="0">请选择</option>');
    }

}
//职位列表框
resume.zhiweibox = {
    //职位框
    $zhiweibox: $("#somedialog"),
    show: function () {
        resume.zhiweibox.$zhiweibox.addClass("dialog--open");
        //加载职位列表
        resume.zhiweibox.list();
    },
    hide: function () {
        resume.zhiweibox.$zhiweibox.removeClass("dialog--open");
        //关闭清楚子元素
        $("#zhiweilist").children().remove();
    },
    //职位列表
    list: function () {
        var zwlist = '';
        $.ajax({
            url: "/Resume/GetPosition",
            dataType: 'json',
            type: 'get',
            success: function (result) {
                $.each(result, function (i, item) {
                    zwlist += '<li onclick="resume.zhiweibox.select_(this,' + item.PositionId + ')">' + item.PositionName + '</li>';
                });
                $("#zhiweilist").html(zwlist);
            }
        });
    },
    //职位选择
    select_: function (obj, id) {
        var val = $(obj).html(),
			schoolid = id;
        $("#zhiweiname").html(val);
        $("#zhiwei").val(schoolid);
        resume.zhiweibox.hide();
    },
    //加载已选职位
    default_: function (id) {
        $.ajax({
            url: "/Resume/GetPosition",
            dataType: 'json',
            type: 'get',
            success: function (result) {
                $.each(result, function (i, item) {
                    if (item.PositionId == id) {
                        $("#zhiweiname").html(item.PositionName);
                    }
                });
            }
        });
    }
}
//保存
resume.save = function () {
    var rename = $("#rename").val(), 		//简历名称
		workPosition = $("#zhiwei").val(), 		//职位id
		salaryId = $("#ExpectedSalaryId").val(), 		//薪资
		provinceCode = $("#ProvinceCode").val(), //省份
		cityCode = $("#CityCode").val(), 		//城市
		countyCode = $("#CountyCode").val(), 	//地区
		introduction = $("#Introduction").val(); //评价
    if (!rename) {
        alert("简历名称不为空");
        return false;
    } else if (!zhiwei) {
        alert("职位不为空");
        return false;
    } else if (!provinceCode) {
        alert("省份不为空");
        return false;
    } else if (!cityCode) {
        alert("城市不为空");
        return false;
    } else if (!countyCode) {
        alert("地区不为空");
        return false;
    } else if (!introduction) {
        alert("自我评价不为空");
        return false;
    }
    $.ajax({
        url: "/Resume/SubResume",
        data: {
            ResumeName: rename,
            WorkPosition: workPosition,
            SalaryId: salaryId,
            ProvinceCode: provinceCode,
            CityCode: cityCode,
            CountyCode: countyCode,
            Introduction: introduction
        },
        dataType: 'json',
        type: 'post',
        success: function (result) {
            if (result.Success) {
                $.jGrowl(result.Msg, { life: 1000, beforeClose: function (e, m) {
                    location.href = '/User/Index';
                }
                });
            } else {
                alert(result.Msg);
            }
        }
    })
}
