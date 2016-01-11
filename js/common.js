Common = {
    staticUrl: "http://staticv4_dev.zing.vn",
    processingHTML: '<div id="BxProcessing" class="bxprocessing" style="height:{{height}}px;">Hệ thống đang xử lý <span class="icoloading"></span></div>',
    timeoutId: 0,
    actionPopup: "",
    captchaGetToken: "https://captcha2.zing.vn/captcha2/gettoken?publicKey=cbbf4f46c7d044309fb9bc99715fd3a4",
    clickButton: function (e, stt) {
        if (e.keyCode === 13) {
            switch (stt) {
                case 1:
                    $("#btnLogin").click();
                    break;
                case 2:
                    $("#btnRegister").click();
                    break;
                case 3:
                    $("#btnSubmitSaleZX").click();
                    break;
                case 4:
                    $("#btnSubmitSaleCard").click();
                    break;
                case 5:
                    $("#btnTopupMobileSubmit").click();
                    break;
                case 6:
                    $("#btnSubmitChuyenKhoan").click();
                    break;
                case 7:
                    $("#btnSubmitTienMat").click();
                    break;
                case 8:
                    $("#btnSubmitTrucTuyen").click();
                    break;
                case 9:
                    $("#btnEmployeeAction").click();
                    break;
                case 10:
                    $("#btnAddAgency").click();
                    break;
                case 11:
                    $("#btnTransferConfirm").click();
                    break;
                case 12:
                    $("#btnChangePassword").click();
                    break;
                case 13:
                    $("#btnCreateSMS").click();
                    break;
                case 14:
                    $("#btnCreatePassword").click();
                    break;
                case 15:
                    $("#btnSubmitTransferStep1").click();
                    break;
                case 16:
                    $("#btnAuthenLogin").click();
                    break;
            }
        }
    },
    checkPhoneNumber: function (control) {
        /*
         * >0: hợp lệ
         * -1: ko hợp lệ
         * -2: ko nhập sdt
         * -3: ko phải mạng Mobile, Vina, Viettel
         */

        var arr_10 = [["096", "097", "098"], ["091", "094"], ["090", "093"]];
        var arr_11 = [["0162", "0163", "0164", "0165", "0166", "0167", "0168", "0169"], ["0123", "0124", "0125", "0127", "0129"], ["0120", "0121", "0122", "0126", "0128"]];

        var phoneNumber = $(control).val().replace(/\s/g, '');
        var arrPrefix = "";
        var prefixNumber = "";

        if ($.trim(phoneNumber) == "") {
            return -2;
        }

        if (isNaN(phoneNumber)) {
            return -1;
        }

        if (phoneNumber.length == 10) {
            prefixNumber = phoneNumber.substring(0, 3);
            arrPrefix = arr_10;
        }
        else if (phoneNumber.length == 11) {
            prefixNumber = phoneNumber.substring(0, 4);
            arrPrefix = arr_11;
        }
        else {
            return -1;
        }

        if (prefixNumber != "") {
            var numberOfNetwork = arr_10.length;
            for (var i = 0; i < numberOfNetwork; i++) {
                if ($.inArray(prefixNumber, arrPrefix[i]) > -1) {
                    return i;
                }
            }
        }

        return -3;
    },
    getNetworkByPhoneNumber: function (control) {
        /*
         * >0: hợp lệ
         * -1: ko hợp lệ
         * -2: ko nhập sdt
         */

        var arr_10 = [["096", "097", "098"], ["091", "094"], ["090", "093"], ["092"], ["099"]];
        var arr_11 = [["0162", "0163", "0164", "0165", "0166", "0167", "0168", "0169"], ["0123", "0124", "0125", "0127", "0129"], ["0120", "0121", "0122", "0126", "0128"], ["0186", "0188"], ["0199"]];
        //var arr_10 = [["091", "094"],["090", "093"],["092"],["099"]];
        //var arr_11 = [["0123", "0124", "0125", "0127", "0129"],["0120", "0121", "0122", "0126", "0128"],["0186", "0188"],["0199"]];

        var phoneNumber = $(control).val();
        var arrPrefix = "";
        var prefixNumber = "";

        if ($.trim(phoneNumber) == "") {
            return -2;
        }

        if (isNaN(phoneNumber)) {
            return -1;
        }

        if (phoneNumber.length == 10) {
            prefixNumber = phoneNumber.substring(0, 3);
            arrPrefix = arr_10;
        }
        else if (phoneNumber.length == 11) {
            prefixNumber = phoneNumber.substring(0, 4);
            arrPrefix = arr_11;
        }

        if (prefixNumber != "") {
            var numberOfNetwork = arr_10.length;
            for (var i = 0; i < numberOfNetwork; i++) {
                if ($.inArray(prefixNumber, arrPrefix[i]) > -1) {
                    return i;
                }
            }
        }

        return -1;
    },
    showNetworkByIndex: function (index) {
        var arrNetwork = [["viettel", "viettel"], ["vina", "vinaphone"], ["mobi", "mobifone"], ["vietnamobile", "vietnamobile"], ["gmobile", "gmobile"]];
        return arrNetwork[index];
    },
    showPhoneNumberError: function (controlValue) {
        var checkPhone = Common.checkPhoneNumber(controlValue);
        var strError = "";
        if (checkPhone == -1) {
            strError = "Số điện thoại không hợp lệ";
        }
        else if (checkPhone == -2) {
            strError = "Vui lòng nhập số điện thoại";
        }
        else if (checkPhone < 0) {
            if (checkPhone == -3) {
                strError = "Chỉ hỗ mạng Mobifone, VinaPhone, Viettel"
            }
            else {
                strError = "Vui lòng nhập số điện thoại";
            }
        }

        return strError;
    },
    refreshCaptcha: function () {
        $.ajax({
            type: "get",
            url: Common.captchaGetToken,
            crossDomain: true,
            dataType: 'jsonp',
            success: function (result) {
                $.ajax({
                    type: "post",
                    url: "/common/getCaptcha.html",
                    data: {
                        token: result.token
                    },
                    success: function (result) {
                        if (result == "-55555") {
                            window.location.href = "/";
                        }
                        else {
                            var arrResult = result.split("###");
                            $("#imgCaptcha").attr("src", arrResult[1]);
                            $("#captchaToken").val(arrResult[0]);
                        }
                    }
                });
            }
        });
    },
    refreshCaptchaSupport: function () {
        $.ajax({
            type: "post",
            url: "/common/getCaptcha.html",
            success: function (result) {
                if (result == "-55555") {
                    window.location.href = "/";
                }
                else {
                    var arrResult = result.split("###");
                    $("#subImgCaptcha").attr("src", arrResult[1]);
                    $("#supCaptchaToken").val(arrResult[0]);
                }
            }
        });
    },
    initInputText: function (controlError) {
        $("#td" + controlError).attr("class", "");
        $("#labelError" + controlError).attr("class", "");
        $("#infoError" + controlError).css("height", "auto");
        $("#infoError" + controlError).css("font-size", "9pt");
        $("#infoError" + controlError).css("display", "none");
    },
    errorInputText: function (controlError, strError) {
        $("#td" + controlError).addClass("error");
        $("#infoError" + controlError).css("display", "block");
        $("#infoError" + controlError).html("<span class='leftarr_err'></span>" + strError);
        $("#labelError" + controlError).addClass("errorinput");
    },
    successInputText: function (controlError) {
        $("#td" + controlError).addClass("success");
        $("#labelError" + controlError).addClass("successinput");
    },
    checkCaptcha: function () {
        var captcha = $("#captchaValue").val();
        var strError = "";
        $("#tdCaptcha").attr("class", "");
        $("#labelErrorCaptcha").attr("class", "");
        $("#infoErrorCaptcha").css("display", "none");

        if (captcha == "") {
            strError = "Vui lòng nhập mã kiểm tra";
        }
        else if (captcha.length != 6) {
            strError = "Mã kiểm tra không hợp lệ";
        }

        if (strError != "") {
            Common.errorInputText("Captcha", strError);
        }
        else {
            $("#tdCaptcha").addClass("success");
            $("#labelErrorCaptcha").addClass("successinput");
        }

        return strError;
    },
    checkPasswordInput: function (authenType, typeId) {
        var authenValue = $("#txtPassword").val();
        var strError = "";
        $("#infoErrorPassword").css("display", "none");
        $("#tdPassword").removeClass("error");
        $("#infoErrorPassword").css("width", "320px");
        $("#infoErrorPassword").css("height", "auto");
        $("#infoErrorPassword").html("");

        if (typeId == 1) {
            if (authenValue == "") {
                strError = "Vui lòng nhập mật khẩu " + authenType;
            }
            else if (authenValue.length != 6) {
                strError = "Mật khẩu " + authenType + " không hợp lệ";
            }

            if (strError != "") {
                Common.errorInputText("Password", strError);
            }
        }

        return strError;
    },
    showErrorShortTextBox: function (controlError, strError) {
        $("#td" + controlError).addClass("error");
        $("#infoError" + controlError).html("<span class='leftarr_err'></span>" + strError);
        $("#infoError" + controlError).css("display", "block");
    },
    sendSMS: function () {
        $.ajax({
            url: "/common/sendsms.html",
            async: false,
            type: "POST",
            data: {
                action: "sendSMS"
            },
            success: function (result) {
                var data = "";
                result = Number(result);

                switch (result) {
                    case -1:
                        window.location.href = "/logout/index.html";
                        break;
                    case 1:
                        data = "Hệ thống đã gửi ODP thành công.";
                        break;
                    case 2:
                        data = "Hệ thống đã gửi OTP thành công.";
                        break;
                    case 1600:
                        data = "Số tiền vượt quá định mức trong ngày<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết."
                        break;
                    case -1600:
                        data = "Số tiền vượt quá định mức trong ngày<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết."
                        break;
                    case 2000:
                        data = "Gói cước SMS đã hết hạn sử dụng<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết.";
                        break;
                    case -2000:
                        data = "Gói cước SMS đã hết hạn sử dụng<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                        break;
                    case 2001:
                        data = "Mật khẩu ODP trong ngày đã được gửi";
                        break;
                    case 2002:
                        data = "Không đủ tiền để gửi OTP<br>Vui lòng nạp thêm tiền để thực hiện";
                        break;
                    case -2002:
                        data = "Không đủ tiền để gửi OTP<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết";
                        break;
                    case 2003:
                        data = "Mật khẩu OTP đã được gửi và vẫn trong thời gian sử dụng.<br>Quý khách vui lòng kiểm tra lại tin nhắn hoặc thực hiện gửi tin nhắn lại sau 5 phút";
                        break;
                    case -55555:
                        window.location.href = "/";
                        break;
                    default:
                        data = "Hệ thống gửi tin nhắn đang bị lỗi<br>Vui lòng thực hiện lại sau.";
                        break;
                }

                Common.openPopup(data, "400px", "", "");
            }
        });
    },
    checkInputAuthen: function () {
        $("#showSecurityInfo").css("display", "none");
        $("#infoErrorAuthenType").css("display", "none");

        var authen_type = Number($("#authenType").val());
        var data = "";
        if (authen_type == 0) {
            $("#infoErrorAuthenType").css("display", "block");
            $("#showSecurityInfo").html("");
            return false;
        }
        else if (authen_type == 1 || authen_type == 2 || authen_type == 3) {
            var strErr = ["bán hàng", "ODP", "OTP"];
            if ($("#txtPassword").val() == "") {
                data = "Vui lòng nhập mật khẩu " + strErr[authen_type - 1];
            }
        }
        else if (authen_type == 4) {
            if (isNaN($("#OTPMatrixSerial").text())) {
                data = "Bạn chưa có thẻ ma trận xác thực.<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết";
            }
            else if ($("#posVal1").val() == "") {
                var p1 = $("#pos1").text();
                data = "Vui lòng nhập giá trị thẻ xác thực trên vị trí <b>" + p1 + "</b>";
            }
            else if ($("#posVal2").val() == "") {
                var p2 = $("#pos2").text();
                data = "Vui lòng nhập giá trị thẻ xác thực trên vị trí <b>" + p2 + "</b>";
            }
            else if ($("#pinCode").val() == "") {
                data = "Vui lòng nhập mã pin.";
            }
        }

        if ($("#isCaptcha").val() == 1 && data == "") {
            if ($("#captchaValue").val() == "") {
                data = "Vui lòng nhập mã xác thực";
            }
        }

        return data;
    },
    checkAuthenSecurity: function (success) {
        $("#validateErrorBox").css("display", "none");
        var password = "";
        var strInfo = "";
        var authenType = $("#authenType").val();

        var normalPassword = typeof ($("#txtPassword").val()) !== "undefined" ? $("#txtPassword").val() : "";
        if (authenType == 1) {
            password = MD5(normalPassword);
        }
        else if (authenType == 2 || authenType == 3) {
            password = MD5(normalPassword.toUpperCase());
        }

        var posVal1 = typeof ($("#posVal1").val()) !== "undefined" ? $("#posVal1").val().toUpperCase() : "";
        var posVal2 = typeof ($("#posVal2").val()) !== "undefined" ? $("#posVal2").val().toUpperCase() : "";
        var pos1 = typeof ($("#pos1").text()) !== "undefined" ? $("#pos1").text().toUpperCase() : "";
        var pos2 = typeof ($("#pos2").text()) !== "undefined" ? $("#pos2").text().toUpperCase() : "";
        var isReportPage = "";

        $.ajax({
            url: "/common/check_security.html",
            type: "POST",
            data: {
                sVerifyCode: $("#captchaValue").val(),
                token: $("#captchaToken").val(),
                password: password,
                authenType: authenType,
                pos1: pos1,
                posVal1: posVal1,
                pos2: pos2,
                posVal2: posVal2,
                matrixPin: $("#pinCode").val(),
                matrixCode: $("#OTPMatrixEncrypt").val(),
                isReport: isReportPage
            },
            success: function (rs) {
                if (rs == "-1") {
                    window.location.href = "/logout/index.html";
                    return;
                }
                else if (rs == "-101") {
                    strInfo = "Sai mật khẩu bán hàng";
                }
                else if (rs == "-102") {
                    strInfo = "Sai mật khẩu ODP";
                }
                else if (rs == "-103") {
                    strInfo = "Sai mật khẩu OTP";
                }
                else if (rs == "-104") {
                    strInfo = "Sai mật khẩu ma trận xác thực. Vui lòng thử lại.";
                }
                else if (rs == "-105") {
                    strInfo = "Mã xác thực ma trận không hợp lệ<br>Vui lòng thực hiện xác thực lại.";
                    var pathInfo = window.location.pathname;
                    Common.openPopup(strInfo, "", "5000", pathInfo);
                    return;
                }
                else if (rs == "-106") {
                    strInfo = "Mã pin không hợp lệ. Vui lòng thử lại.";
                }
                else if (rs == "-107") {
                    strInfo = "Thẻ ma trận xác thực đã hết hạn<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (rs == "-108") {
                    strInfo = "Thẻ ma trận xác thực đã hết hạn<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết.";
                }
                else if (rs == "-109") {
                    strInfo = "Bạn đã nhập sai mật khẩu quá 3 lần<br>Vui lòng nhập mật khẩu và mã xác thực";
                    Common.showCaptcha();
                }
                else if (rs == "-110") {
                    strInfo = "Sai mã xác thực";
                }
                else if (rs == "-111") {
                    strInfo = "Chưa có thẻ ma trận xác thực<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (rs == "-112") {
                    strInfo = "Chưa có thẻ ma trận xác thực<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết.";
                }
                else if (rs == "-55555") {
                    window.location.href = "/";
                }

                Common.refreshCaptcha();
                success(strInfo);
            }
        });
    },
    showCaptcha: function () {
        var renderCaptcha = "<div class='form_login'>"
                + "<span class='left'>Mã xác thực</span>"
                + "<span class='right'>"
                + "<span class='codebox'><img src='' id='imgCaptcha'></span>"
                + "<a href='javascript:;' class='captcha_security' onclick='Common.refreshCaptcha();'></a>"
                + "<input type='hidden' id='captchaToken' value='' />"
                + "</span>"
                + "</div>"
                + "<div class='form_login'>"
                + "<span class='left'>Nhập mã xác thực <span class='txtred'>*</span></span>"
                + "<span class='right'>"
                + "<input class='textinput phonenum' type='text' id='captchaValue' maxlength='6' />"
                + "<span class='' id='labelErrorCaptcha'></span>"
                + "<p class='errbox' id='infoErrorCaptcha'></p>"
                + "</span></div>"
                + "<input type='hidden' id='isCaptcha' value='1' />";

        $("#boxCaptcha").css("display", "block");
        $("#boxCaptcha").append(renderCaptcha);
        Common.refreshCaptcha();
    },
    formatNumber: function (number, decimals, dec_point, thousands_sep) {
        var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point == undefined ? "," : dec_point;
        var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    checkIsNumberInput: function (obj, event, maxLength) {
        var k;
        if (navigator.appName == "Netscape")
            k = event.which;
        else
            k = event.keyCode;
        if (k == 37 || k == 39 || k == 9 || k == 36 || k == 46)//left right tab home delete
            return;
        //var value = obj.value;
        var value = Common.convertcheck(obj);
        if (value != "" && !isNaN(value)) {
            var txt1 = Common.formatNumber(value, 0, ",", ".");
            if (txt1.length > maxLength) {
                txt1 = txt1.substring(0, maxLength + 1).replace(/\./g, "");
                txt1 = Common.formatNumber(txt1, 0, ",", ".");
            }
            obj.value = txt1;
            return;
        } else {
            obj.value = '';
            return;
        }
    },
    convertcheck: function (obj) {
        var tmp;
        var value = '';
        var total = obj.value;
        if (total == 0)
            return total;
        total = total.split('.');
        for (tmp in total) {
            value = value + total[tmp];
        }
        value = parseInt(value);
        return value;
    },
    loadFieldSecurity: function () {
        $("#boxTextSecurity").css("display", "none");
        $("#boxOTPMatrix").css("display", "none");
        $("#boxCaptcha").css("display", "none");
        $("#OTPMatrixExample").css("display", "none");
        $("#OTPMatrixResetCard").css("display", "none");
        $("#sendSMS").css("display", "none");
        $("#validateErrorBox").css("display", "none");
        $("#boxODPGuide").css("display", "none");

        var authenType = Number($("#authenOptionSecurity").val());

        $("#authenType option").each(function () {
            $(this).attr("disabled", "disabled");
        });

        var authenChoose;
        switch (authenType) {
            case 1:
                $("#authenType option[name='0']").removeAttr("selected");
                $("#authenType option[name='MKBH']").removeAttr("disabled");
                $("#authenType option[name='MKBH']").attr("selected", "selected");
                authenChoose = 1;
                break;
            case 2:
                $("#authenType option[name='0']").removeAttr("selected");
                $("#authenType option[name='OTP']").removeAttr("disabled");
                $("#authenType option[name='OTP']").attr("selected", "selected");
                authenChoose = 3;
                break;
            case 3:
                $("#authenType option[name='0']").removeAttr("selected");
                $("#authenType option[name='ODP']").removeAttr("disabled");
                $("#authenType option[name='ODP']").attr("selected", "selected");
                authenChoose = 2;
                break;
            case 4:
                $("#authenType option[name='0']").removeAttr("selected");
                $("#authenType option[name='Matrix']").removeAttr("disabled");
                $("#authenType option[name='Matrix']").attr("selected", "selected");
                authenChoose = 4;
                break;
            case 5:
                $("#authenType option[name='0']").removeAttr("disabled");
                $("#authenType option[name='OTP']").removeAttr("disabled");
                $("#authenType option[name='Matrix']").removeAttr("disabled");
                authenChoose = 3;
                break;
            case 6:
                $("#authenType option[name='0']").removeAttr("disabled");
                $("#authenType option[name='ODP']").removeAttr("disabled");
                $("#authenType option[name='Matrix']").removeAttr("disabled");
                authenChoose = 2;
                break;
        }

        if ($("#isCaptcha").val() == "1") {
            $("#boxCaptcha").css("display", "block");
        }

        if ($("#isChoiceAuthen").val() == "0") {
            $("#authenType").val(authenChoose);
            $("#isChoiceAuthen").val("1");
        }
        else {
            authenChoose = Number($("#authenType").val());
        }

        if (authenChoose == 4) {
            $("#boxOTPMatrix").css("display", "block");
            $("#OTPMatrixExample").css("display", "inline");
            $("#OTPMatrixResetCard").css("display", "inline");
        }
        else if (authenChoose < 4 && authenChoose != 0) {
            $("#boxTextSecurity").css("display", "block");
            $("#txtPassword").attr("maxlength", "6");
            switch (authenChoose) {
                case 1:
                    $("#labelShowType").html("Mật khẩu bán hàng <span class=\"txtred\">*</span>");
                    $("#txtPassword").removeAttr("maxlength");
                    break;
                case 2:
                    $("#labelShowType").html("Mật khẩu ODP <span class=\"txtred\">*</span>");
                    $("#sendSMS").css("display", "inline");
                    $("#sendSMS").html("Gửi mật khẩu ODP");
                    $("#boxODPGuide").css("display", "block");
                    break;
                case 3:
                    $("#labelShowType").html("Mật khẩu OTP <span class=\"txtred\">*</span>");
                    $("#sendSMS").css("display", "inline");
                    $("#sendSMS").html("Gửi mật khẩu OTP");
                    break;
            }
        }
    },
    ToggleSupport: function () {
        if ($("#boxFloatSupport").css("display") == "block") {
            $("#boxFloatSupport").css("display", "none");
            $("#iconSupportRight").css("display", "block");
            $("#iconGoToSale").removeAttr("style");
        }
        else {
            $("#boxFloatSupport").css("display", "block");
            $("#iconSupportRight").css("display", "none");
            $("#iconGoToSale").css("margin-top", "-322px");
            $("#iconGoToSale").css("right", "0px");
            $("#iconGoToSale").css("position", "absolute");
        }
    },
    checkAllowInputNumber: function (control, event) {
        var k;
        if (navigator.appName == "Netscape")
            k = event.which;
        else
            k = event.keyCode;
        if (k == 37 || k == 39 || k == 9 || k == 36 || k == 46)//left right tab home delete
            return;
        //var value = obj.value;
        var value = $(control).val();
        if (value != "" && !isNaN(value)) {
            $(control).val(value);
            return;
        } else {
            $(control).val("");
            return;
        }
    },
    closeInfication: function () {
        $("#popupNewsInfo").fadeOut(200);
        var cookieUser = cookie.get("cookieIdV3");
        cookie.set("closePopup", cookieUser, {
            path: "/"
        });
    },
    moveNextFieldOTPMatrix: function (control) {
        if ($(control).val().length == 2) {
            if (control == "#posVal1") {
                $("#posVal2").focus();
            }
            else if (control == "#posVal2") {
                $("#pinCode").focus();
            }
        }
    },
    openPopup: function (content, width, timeout, controlFocusClose) {
        if (width == "") {
            width = "350px";
        }
        if (timeout == "") {
            timeout = "3000";
        }
        $("#boxPopup").removeClass("topup_ie7");
        $("#boxPopup").attr("class", "popup_center pu_small");
        $("#boxPopup").removeAttr("style");
        $("#popup_title").html("Thông báo");
        $("#popup_content").html(content);
        $("#boxPopup").css("width", width);
        $("#boxPopup").css("max-height", "800px");
        Common.footerPopupHide();
        $("#popup_footer").css("display", "block");
        $("#formPopup").css("display", "block");
        $("#formPopup").css("z-index", "100");

        timeout = Number(timeout);
        Common.actionPopup = controlFocusClose;
        timeoutId = setTimeout(function () {
            Common.closePopup();
        }, timeout);
    },
    closePopup: function () {
        $("#formPopup").css("display", "none");
        if (typeof Common.actionPopup != "undefined") {
            var arrSplit = Common.actionPopup.split("$");
            var arrAction = [];
            if (arrSplit.length > 3) {
                arrAction[0] = arrSplit[0];
                arrAction[1] = arrSplit[1];
                var strTemp = arrSplit[2];
                for (var i = 3; i < arrSplit.length; i++) {
                    strTemp += "$" + arrSplit[i];
                }
                arrAction[2] = strTemp;
            }
            else {
                arrAction = arrSplit;
            }

            if (arrAction.length == 3) {
                var functionAction = arrAction[0];
                var pageAction = arrAction[1];
                var actionAfter = arrAction[2];
                renderLeft(functionAction, function () {
                    renderHTML(functionAction, pageAction, function () {
                        var numberFunction = actionAfter.split("|");
                        for (var i = 0; i < numberFunction.length; i++) {
                            eval(numberFunction[i]);
                        }
                    });
                });
            }
            else if (Common.actionPopup.indexOf("/") > -1) {
                window.location.href = Common.actionPopup;
            }
            else if (Common.actionPopup.match("click()") != null) {
                var controlId = Common.actionPopup.replace("click()", "");
                $(controlId).click();
            }
            else {
                $(Common.actionPopup).select();
            }

            Common.actionPopup = undefined;
        }
        clearTimeout(timeoutId);
    },
    openConfirmPopup: function (message, action) {
        Common.footerPopupHide();
        $("#popup_title").html("Xác nhận");
        $("#popup_content").html(message);
        $("#confirm_footer").css("display", "block");
        $("#confirmSubmit").attr("onclick", "Common.actionConfirm('" + action + "');")
        $("#formPopup").css("display", "block");
        $("#boxPopup").removeAttr("style");
        $("#boxPopup").attr("class", "popup_center esalepopup pu_med");

        timeoutId = setTimeout(function () {
            Common.closePopup("");
        }, 200000);
    },
    openBillingPopup: function (content, width, timeout, controlFocusClose) {
        if (width == "") {
            width = "350px";
        }
        if (timeout == "") {
            timeout = "3000";
        }
        $("#boxPopup").removeClass("topup_ie7");
        $("#boxPopup").attr("class", "popup_center pu_small");
        $("#boxPopup").removeAttr("style");
        $("#popup_title").html("Thông báo");
        $("#popup_content").html(content);
        $("#boxPopup").css("width", width);
        $("#boxPopup").css("max-height", "800px");
        Common.footerPopupHide();
        $("#billing_footer").css("display", "block");
        $("#formPopup").css("display", "block");
        $("#formPopup").css("z-index", "100");

        timeout = Number(timeout);
        Common.actionPopup = controlFocusClose;
        timeoutId = setTimeout(function () {
            Common.closePopup();
        }, timeout);
    },
    openBillingSuccessPopup: function (content, width, timeout, controlFocusClose) {
        if (width == "") {
            width = "350px";
        }
        if (timeout == "") {
            timeout = "3000";
        }
        $("#boxPopup").removeClass("topup_ie7");
        $("#boxPopup").attr("class", "popup_center pu_small");
        $("#boxPopup").removeAttr("style");
        $("#popup_title").html("Thông báo");
        $("#popup_content").html(content);
        $("#boxPopup").css("width", width);
        $("#boxPopup").css("max-height", "800px");
        Common.footerPopupHide();
        $("#billing_success_footer").css("display", "block");
        $("#formPopup").css("display", "block");
        $("#formPopup").css("z-index", "100");

        timeout = Number(timeout);
        Common.actionPopup = controlFocusClose;
        timeoutId = setTimeout(function () {
            Common.closePopup();
        }, timeout);
    },
    actionConfirm: function (action) {
        if (action.substr(0, 1) == "/") {
            window.location.href = action;
        }
        else {
            eval(action);
        }
    },
    footerPopupHide: function () {
        $("#confirm_footer").css("display", "none");
        $("#support_footer").css("display", "none");
        $("#popup_footer").css("display", "none");
        $("#login_footer").css("display", "none");
        $("#billing_footer").css("display", "none");
        $("#billing_success_footer").css("display", "none");
        $("#contract_footer").css("display", "none");
    },
    number2string: function (number) {
        var arrNumber = number.split(".");
        var blockSize = arrNumber.length;
        var strResult = "";
        var arrString = ["", " nghìn ", " triệu ", " tỷ "];
        var countTemp = 0;

        for (var i = blockSize - 1; i >= 0; i--) {
            var strTemp = Common.readThreeBlock(arrNumber[i]);
            if (strTemp != "") {
                strResult = strTemp + arrString[countTemp] + strResult;
            }
            countTemp++;
        }

        return strResult.charAt(0).toUpperCase() + strResult.slice(1);
    },
    readThreeBlock: function (strNumber) {
        var arrNumberString = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"];
        var strResult = "";
        var number = Number(strNumber);

        if (strNumber.length == 1) {
            strResult += arrNumberString[number];
        }
        else if (strNumber.length == 2) {
            var number_1 = parseInt(number / 10);
            var number_2 = parseInt(number % 10);

            strResult += number_1 == 1 ? "mười" : arrNumberString[number_1] + " mươi";
            if (number_2 == 1) {
                strResult += number_1 == 1 ? " một" : " mốt";
            }
            else if (number_2 == 5) {
                strResult += " lăm";
            }
            else if (number_2 > 1) {
                strResult += " " + arrNumberString[number_2];
            }
        }
        else if (strNumber.length == 3 && number > 0) {
            var number_1 = parseInt(number / 100);
            var number_2 = parseInt((number % 100) / 10);
            var number_3 = parseInt((number % 100) % 10);

            strResult = arrNumberString[number_1] + " trăm";
            if (number_2 > 0) {
                strResult += number_2 == 1 ? " mười" : " " + arrNumberString[number_2] + " mươi";
            }
            else if (number_2 == 0 && number_3 > 0) {
                strResult += " lẻ ";
            }

            if (number_3 == 1) {
                strResult += number_2 > 1 ? " mốt" : " một";
            }
            else if (number_3 == 5) {
                if (number_2 == 0) {
                    strResult += " năm";
                }
                else {
                    strResult += " lăm";
                }
            }
            else if (number_3 > 1) {
                strResult += " " + arrNumberString[number_3];
            }
        }

        return strResult;
    },
    checkBalance: function (saleType, listObject, success) {
        $.ajax({
            url: "/common/checkbalance.html",
            type: "post",
            data: {
                saleType: saleType,
                listObject: listObject
            },
            success: function (result) {
                result = Number(result);
                var commonErr = "";
                if ((result === -4 && (saleType != "zingxu")) || result === -5) {
                    commonErr = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng nhấn <a href='/naptien/trangchu.html'>vào đây</a> để nạp thêm tiền.";
                }
                else if ((result === 4 && (saleType != "zingxu")) || result === 5) {
                    commonErr = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (result === -4 && saleType == "zingxu") {
                    commonErr = "<span>Số tiền và số ZingXu không đủ để thực hiện giao dịch</span>.<br>Vui lòng nhấn <a href='/naptien/trangchu.html'>vào đây</a> để nạp thêm tiền.";
                }
                else if (result === 4 && saleType == "zingxu") {
                    commonErr = "<span>Số tiền và số ZingXu không đủ để thực hiện giao dịch</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (result === -1) {
                    commonErr = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng nhấn <a href='/naptien/trangchu.html'>vào đây</a> để nạp thêm tiền.";
                }
                else if (result === 1) {
                    commonErr = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (result === -2) {
                    commonErr = "<span>Số tiền giao dịch vượt quá định mức trong ngày</span>.<br>Vui lòng liên hệ Thanh Sơn để biết thêm chi tiết.";
                }
                else if (result === 2) {
                    commonErr = "<span>Số tiền giao dịch vượt quá định mức trong ngày</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (result === 3) {
                    commonErr = "<span>Số tiền giao dịch vượt quá định mức của đại lý</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
                }
                else if (result === -55555) {
                    window.length.href = "/";
                }

                success(commonErr);
            }
        });
    },
    showCalendar: function (controlId) {
        $(controlId).focus();
    },
    tooltipShowError: function (tooltipId, strError) {
        $(tooltipId).css("display", "inline-block");
        $(tooltipId).find(".arrowtip").css("background-position", "-136px -79px");
        $(tooltipId).find(".tooltip").css("background", "#ea7070");
        $(tooltipId).find(".tooltip").html(strError);
    },
    tooltipShowGuide: function (tooltipId, strGuide) {
        $(tooltipId).css("display", "inline-block");
        $(tooltipId).find(".arrowtip").css("background-position", "-400px -288px");
        $(tooltipId).find(".tooltip").css("background", "#333");
        $(tooltipId).find(".tooltip").html(strGuide);
    },
    hideToolTip: function (tooltipId) {
        $(tooltipId).css("display", "none");
    },
    updateBalanceAjax: function () {
        $.ajax({
            url: "/common/getbalance.html",
            method: "post",
            success: function (result) {
                if (result == "-55555") {
                    window.location.href = "/";
                }
                else {
                    var arrBalance = result.split("$");
                    $("#totalAmountTop").html(arrBalance[0] + " VNĐ");
                    $("#zingxuAmountTop").html(arrBalance[1] + " ZX");
                    $("#transferAmountTop").html(arrBalance[2] + " VNĐ");
                }
            }
        });
    },
    openPopupSendCardSMS: function (cardInfoJson) {
        $("#boxPopup").attr("class", "popup_center pu_large popup_send_sms_center");
        $("#boxPopup").removeAttr("style");
        $("#popup_title").html("Gửi mã thẻ qua SMS");

        var htmlContent = "<div class=\"alert danger\" id=\"boxSMSError\" style=\"display:none\"><em class=\"sprt ico16 icodanger\"></em><span id=\"smsContentError\"></span>.</div>"
                + "<p class=\"fontmid2\">Mời bạn lựa chọn mã thẻ và số điện thoại gửi</p>"
                + "<i class=\"fontsmall\">Chỉ hỗ trợ mạng Mobifone, Vinaphone, Viettel<br><b>Miễn phí tin nhắn đầu tiên / 1 thẻ. </b>Từ tin nhắn thứ 2 cước phí: <b>500VNĐ</b> / 1 thẻ / 1 tin nhắn</i>"
                + "<div class=\"table_outer_sendsms\"><table id=\"tableCardSendSMS\" width=\"100%\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class=\"report_listdetail marbt20\">"
                + "<tbody><tr><th scope=\"col\" class=\"txtcenter\">&nbsp;</th><th scope=\"col\" class=\"txtcenter\">Serial thẻ</th><th scope=\"col\" class=\"status_col_sendsms txtcenter\">Trạng Thái</th></tr>";

        var jsonObj = $.parseJSON(cardInfoJson);
        var arrList = jsonObj.listcard;
        if (arrList.length == 0) {
            Common.openPopup("Không tìm thấy thẻ cần gửi SMS", "", "200000", "");
        }
        else {
            for (var i = 0; i < arrList.length; i++) {
                var className = "";
                if (i % 2 == 1) {
                    className = " class=\"odd\"";
                }

                var checkSend = $.ajax({
                    url: "/common/checksendcardsms.html",
                    type: "post",
                    async: false,
                    data: {
                        orderNo: arrList[i].transactionNo,
                        serials: arrList[i].serial
                    }
                });

                if (checkSend.responseText == "-55555") {
                    window.location.href = "/";
                }
                var jsonResult = $.parseJSON(checkSend.responseText);

                var status = "Chưa gửi";
                if (jsonResult[0].localStatus == "1") {
                    var dateSend = moment(jsonResult[0].localSentDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                    status = "<span style=\"color:red\" class=\"txtcenter\">Đã gửi cho số điện thoại <b>" + jsonResult[0].localPhoneNumber + "</b><br>vào lúc <b>" + dateSend + "</b></span>";
                }

                htmlContent += "<tr" + className + ">"
                        + "<td class=\"txtcenter\"><input type=\"checkbox\" id=\"" + arrList[i].serial + "_" + arrList[i].transactionNo + "\" /></td>"
                        + "<td class=\"txtcenter\">" + arrList[i].supplierName + " " + arrList[i].supplierCardName + "<br><b>" + arrList[i].serial + "</b></td>"
                        + "<td id=\"status_" + arrList[i].serial + "_" + arrList[i].transactionNo + "\" class=\"txtcenter\">" + status + "</td></tr>";
            }
            htmlContent += "</tbody></table></div>"
                    + "<p>Nhập số ĐT nhận mã thẻ <input class=\"textinput phonenum marlt\" id=\"phoneNumberSendSMS\" type=\"text\" onkeyup=\"Common.checkAllowInputNumber('#phoneNumberSendSMS', event);\">"
                    + "<a class=\"btn01 marlt\" href=\"javascript:;\" onclick=\"Common.sendCardSMS();\">Gửi</a></p>";

            Common.footerPopupHide();
            $("#popup_content").html(htmlContent);
            $("#tableCardSendSMS th:eq(0)").css("width", "40px");
            $("#tableCardSendSMS th:eq(1)").css("width", "240px");
            $("#boxPopup").css("width", "550px");
            $("#boxPopup").addClass("popup_sendsms_ie7");

            $("#popup_footer").css("display", "block");
            $("#formPopup").css("display", "block");

            timeoutId = setTimeout(function () {
                Common.closePopup("");
            }, 200000);
        }
    },
    openPopupSupport: function () {
        $("#boxPopup").attr("class", "esalepopup pu_large popup_send_sms_center");
        $("#boxPopup").addClass("popup_support_ie7");
        $("#boxPopup").removeAttr("style");
        $("#boxPopup").css("width", "510px");
        $("#popup_title").html("Gửi câu hỏi");
        var htmlContent = "<form action=\"/common/sendsupport.html\" method=\"post\" enctype=\"multipart/form-data\" id=\"formSupport\">"
                + "<p class=\"txtgrtfaq\">Xin chào! Chúng tôi luôn sẵn sàng hỗ trợ bạn:</p>"
                + "<div class=\"rowfaq\"> <span class=\"ltfaq\">Mã số đại lý <span class=\"txtmoney\">(*)</span></span>"
                + "<input class=\"textinput inputfaq\" type=\"text\" id=\"supAccCode\" name=\"supAccCode\" maxlength=\"10\" onclick=\"Common.hideSupportError('#supAccountError')\">"
                + "<p class=\"errbox support_error\" id=\"supAccountError\"><span class=\"toparr_err\"></span>Mã số đại lý không hợp lệ</p></div>"
                + "<div class=\"rowfaq\"> <span class=\"ltfaq\">Địa chỉ </span>"
                + "<input class=\"textinput inputfaq\" type=\"text\" name=\"supAddress\">"
                + "</div>"
                + "<div class=\"rowfaq\"> <span class=\"ltfaq\">Điện thoại <span class=\"txtmoney\">(*)</span></span>"
                + "<input class=\"textinput inputfaq\" type=\"text\" id=\"supPhoneNumber\" name=\"supPhoneNumber\" onclick=\"Common.hideSupportError('#supPhoneNumberError')\">"
                + "<p class=\"errbox support_error\" id=\"supPhoneNumberError\"><span class=\"toparr_err\"></span>Số điện thoại không hợp lệ</p>"
                + "</div>"
                + "<div class=\"rowfaq\"> <span class=\"ltfaq\">Nội dung <span class=\"txtmoney\">(*)</span></span>"
                + "<textarea class=\"textareafaq\" cols=\"\" rows=\"\" placeholder=\"\" id=\"subContent\" name=\"subContent\" onclick=\"Common.hideSupportError('#supContentError')\"></textarea>"
                + "<p class=\"errbox support_error\" id=\"supContentError\"><span class=\"toparr_err\"></span>Vui lòng nhập nội dung</p>"
                + "</div>"
                + "<div class=\"rowfaq\"><span class=\"ltfaq file\">Tải lên CMND <p class=\"txtupcmnd\">bản chụp hoặc scan </p></span>"
                + "<input class=\"upfile\" type=\"file\" name=\"imgFileUpload\" multiple></div>"
                + "<div class=\"rowfaq\"><span class=\"ltfaq file\">Mã xác thực </span>"
                + "<span class=\"codebox\"><img src=\"\" id=\"subImgCaptcha\"></span>"
                + "<a href=\"javascript:;\" class=\"captcha_security captcha_support\" onclick=\"Common.refreshCaptchaSupport();\"></a>"
                + "<input type=\"hidden\" id=\"supCaptchaToken\" value=\"\"></div>"
                + "<div class=\"rowfaq\"><span class=\"ltfaq file\">Nhập mã xác thực <span class=\"txtmoney\">(*)</span></span>"
                + "<input class=\"textinput inputfaq\" maxlength='6' type=\"text\" name=\"supCaptchaValue\" id=\"supCaptchaValue\" onclick=\"Common.hideSupportError('#supCaptchaError')\">"
                + "<p class=\"errbox support_error\" id=\"supCaptchaError\"><span class=\"toparr_err\"></span>Mã xác thực không hợp lệ</p></div>"
                + "</form>";
        $("#popup_content").html(htmlContent);

        Common.footerPopupHide();
        $("#support_footer").css("display", "block");
        $("#formPopup").css("display", "block");
        Common.refreshCaptchaSupport();

        timeoutId = setTimeout(function () {
            Common.closePopup("");
        }, 200000);
    },
    uploadFormSupport: function () {
        Common.showPageProcessing();
        var accountCode = $("#supAccCode").val();
        var content = $("#subContent").val();
        var supCaptchaValue = $("#supCaptchaValue").val();
        var isError = 0;

        if (accountCode.length != 10 || accountCode.charAt(0) != '9') {
            $("#supAccountError").css("display", "block");
            isError = 1;
        }

        if (Common.getNetworkByPhoneNumber("#supPhoneNumber") < 0) {
            $("#supPhoneNumberError").css("display", "block");
            isError = 1;
        }

        if (content == "") {
            $("#supContentError").css("display", "block");
            isError = 1;
        }

        if (supCaptchaValue.length != 6 || supCaptchaValue == "") {
            $("#supCaptchaError").css("display", "block");
            isError = 1;
        }

        if (isError == 0) {
            $.ajax({
                url: "/common/checkcaptcha.html",
                type: "post",
                data: {
                    value: supCaptchaValue,
                    token: $("#supCaptchaToken").val()
                },
                success: function (result) {
                    Common.hidePageProcessing();
                    if (result == "1") {
                        $("#formSupport").submit();
                    }
                    else if (result == "-55555") {
                        window.location.href = "/";
                    }
                    else {
                        $("#supCaptchaError").css("display", "block");
                    }
                }
            });
        }
        else {
            Common.hidePageProcessing();
        }
    },
    hideSupportError: function (errorControl) {
        $(errorControl).css("display", "none");
    },
    openPopupVisaTerm: function () {
        $("#boxPopup").attr("class", "esalepopup pu_large popup_send_sms_center");
        $("#boxPopup").removeAttr("style");
        $("#boxPopup").css("width", "500px");
        $("#popup_title").html("Quy định khi dùng thẻ Visa-Master nạp tiền trên Esale");

        var strContent = '<div style="width: 100%;line-height: 26px;" class="theinstyle">'
                + '<p class="policy_content">'
                + '<b>1.</b> Loại thẻ được chấp nhận: là những <b>thẻ tín dụng (Credit)</b> hoặc <b>thẻ ghi nợ (Debit)</b> có nhãn hiệu <b>Visa</b> hoặc <b>Master</b> in trên thẻ, theo quy định của tổ chức thẻ quốc tế Visa và Master (<u>đối với thẻ Debit thì số dư phải &gt;= số tiền nạp + phí tiện ích</u>).</p><p class="policy_content">'
                + '<b>2.</b> Giá trị đơn hàng tối thiểu <b>50.000 VNĐ</b>.</p><p class="policy_content">'
                + '<b>3.</b> Một tài khoản có thể được nạp từ một hoặc nhiều thẻ quốc tế nhưng tối đa chỉ <b>10.000.000 VNĐ/3 ngày</b>.</p><p class="policy_content">'
                + '<b>4.</b> Phí tiện ích: <b>2,2%</b> trên số tiền nạp.</p><p class="policy_content">'
                + '<b>5.</b> Đại lý và chủ thẻ quốc tế tự chịu trách nhiệm với rủi ro từ việc sử dụng thẻ quốc tế thanh toán tiền mua hàng. Trường hợp phát sinh tranh chấp, tùy từng trường hợp, <b>Esale có quyền tạm khóa</b> hoặc áp dụng biện pháp ký quỹ với tài khoản của đại lý để đảm bảo việc giải quyết tranh chấp.</p><p class="policy_content">'
                + '<b>6.</b> Đại lý và chủ thẻ quốc tế sẽ không được hoàn tiền từ <b>Esale</b> khi giao dịch được xác định là đã thành công (tức là <b>Esale</b> đã ghi nhận số tiền nạp trên tài khoản điện tử của đại lý).</p><p class="policy_content">'
                + '<b>7.</b> Việc chủ thẻ đồng ý nhấn vào nút <u>Nạp tiền</u> đồng nghĩa với việc chủ thẻ đã chấp nhận những rủi ro và quy định được công bố. <b>Esale</b> được loại trừ mọi trách nhiệm có liên quan đến bất kỳ tranh chấp nào giữa chủ thẻ và chủ tài khoản.</p></div>';

        $("#popup_content").html(strContent);

        Common.footerPopupHide();
        $("#popup_footer").css("display", "block");
        $("#formPopup").css("display", "block");

        timeoutId = setTimeout(function () {
            Common.closePopup("");
        }, 200000);
    },
    openPopupRequireConstract: function (typeContract) {
        var cookieIsShow = cookie.get("show_contract");
        var pathInfo = window.location.pathname;
        if (typeof cookieIsShow == "undefined" || cookieIsShow == "0" || pathInfo == "/register/info.html") {
            cookie.set("show_contract", "1", {
                path: "/",
                domain: ".zing.vn"
            });

            $("#boxPopup").attr("class", "esalepopup pu_large popup_send_sms_center");
            $("#boxPopup").removeAttr("style");
            $("#boxPopup").css("width", "700px");
            
            $("#popup_content").css("max-height", "500px");
            
            $("#popup_title").html("Hợp đồng điện tử Esale");
            var fileName = "ESALE_AGREEMENT.png";
            if(typeContract == "ThoaThuan"){
                $("#popup_title").html("Thỏa thuận sử dụng Esale");
                fileName = "ESALE_DIEUKHOAN.png";
            }
            else{
                if(pathInfo == "/daily"){
                    $("#popup_content").css("max-height", "480px");
                }
            }

            var strContent = '<div style="width: 100%;line-height: 26px;" class="theinstyle">'
                    + '<p class="policy_content">'
                    + '<img src="' + $("#commonStaticURL").val() + '/images/' + fileName + '" width="100%" />'
                    + '</p></div>';

            $("#popup_content").html(strContent);
            $("#popup_content").css("overflow-y", "auto");

            Common.footerPopupHide();
            if(pathInfo == "/register/info.html"){
                $("#popup_footer").css("display", "block");
            }
            $("#contract_footer").css("display", "block");
            $("#formPopup").css("display", "block");
            $("#closePopup").css("display", "none");

            timeoutId = setTimeout(function () {
                Common.closePopup();
            }, 3600000);
        }
    },
    approveContract: function () {
        $.ajax({
            url: "/common/approvecontract.html",
            type: "post",
            success: function (result) {
                Common.closePopup();
                if (result == 1) {
                    Common.openPopup("Cám ơn quý đại lý đã ký hợp đồng điện tử thành công", "500", "5000", "/daily");
                }
                else {
                    Common.openPopup("Có lỗi xảy ra, vui lòng thử lại sau", "", "5000", "/daily");
                }
            }
        });
    },
    noAgreeContract: function () {
        Common.closePopup();
        var html = "Chúng tôi rất tiếc không thể tiếp tục hỗ trợ và phục vụ quý khách do quý khách đã KHÔNG ĐỒNG Ý với các điều khoản yêu cầu sử dụng từ hệ thống Esale.<br>Vui lòng liên hệ <b>1900.545.436</b> để được hỗ trợ.";
        Common.openPopup(html, "600", "10000", "/");
    },
    sendCardSMS: function () {
        /*
         * >0: hợp lệ
         * -1: ko hợp lệ
         * -2: ko nhập sdt
         * -3: ko phải mạng Mobile, Vina, Viettel
         */
        $("#boxSMSError").css("display", "none");

        var checkPhone = Number(Common.checkPhoneNumber("#phoneNumberSendSMS"));
        var strError = "";

        var isCheckCard = 0;
        $("#tableCardSendSMS input[type=checkbox]").each(function () {
            if ($(this).is(":checked") == true) {
                isCheckCard = 1;
            }
        });

        if (isCheckCard === 0) {
            strError = "Vui lòng chọn thẻ cần gửi SMS";
        }
        else if (checkPhone == -2) {
            strError = "Vui lòng nhập số điện thoại cần gửi SMS";
        }
        else if (checkPhone == -3) {
            strError = "Chỉ hỗ trợ mạng Mobifone, Vinaphone và Viettel";
        }
        else if (checkPhone < 0) {
            strError = "Số điện thoại không hợp lệ";
        }

        if (strError != "") {
            $("#boxSMSError").css("display", "block");
            $("#smsContentError").html(strError);
            return;
        }

        $("#tableCardSendSMS input[type=checkbox]").each(function () {
            if ($(this).is(":checked")) {
                var arrId = $(this).attr("id").split("_");
                $.ajax({
                    url: "/common/sendcardsms.html",
                    type: "post",
                    async: false,
                    data: {
                        orderNo: arrId[1],
                        serials: arrId[0],
                        phoneNumber: $("#phoneNumberSendSMS").val()
                    },
                    success: function (result) {
                        if (result == "-55555") {
                            window.location.href = "/";
                        }
                        else {
                            var jsonResult;
                            try
                            {
                                jsonResult = $.parseJSON(result);
                            }
                            catch (err)
                            {
                                window.location.href = "/daily";
                                return false;
                            }
                            var status = "KHÔNG gửi được cho số điện thoại " + jsonResult[0].localPhoneNumber;
                            if (typeof jsonResult == "object" && jsonResult[0].localStatus == "1") {
                                var dateSend = moment(jsonResult[0].localSentDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");

                                status = "<span style=\"color:red\">Đã gửi cho số điện thoại <b>" + jsonResult[0].localPhoneNumber + "</b><br>vào lúc <b>" + dateSend + "</b></span>";
                                Common.getMoneyBalance(function (result) {
                                    var arrBalance = result.split("$");
                                    $("#masterTotalAmount").html(arrBalance[0]);
                                    $("#masterZXBalance").html(arrBalance[1]);
                                    $("#masterTransferByDay").html(arrBalance[2]);
                                });
                            }
                            $("#status_" + arrId[0] + "_" + arrId[1]).html(status);
                        }
                    }
                });
            }
        });

        $("#tableCardSendSMS input[type=checkbox]").each(function () {
            $(this).prop("checked", false);
        });
        $("#phoneNumberSendSMS").val("");
    },
    resetSecurity: function () {
        $("#txtPassword").val("");
        $("#captchaValue").val("");
        $("#infoErrorAuthenType").css("display", "none");
        $("#infoErrorPassword").css("display", "none");
        $("#infoErrorCaptcha").css("display", "none");
        $("#posVal1").val("");
        $("#posVal2").val("");
        $("#pinCode").val("");
    },
    getAgencyByCode: function (agencyCode, typeGet, success) {
        var result = $.ajax({
            type: "POST",
            url: "/common/getagencybycode.html",
            dataType: "json",
            data: {
                agencyCode: agencyCode,
                typeGet: typeGet
            },
            success: function (result) {
                if (result == "-55555") {
                    window.location.href = "/";
                }
                else {
                    success(result);
                }
            }
        });

        return result.responseText;
    },
    getMoneyBalance: function (success) {
        $.ajax({
            type: "POST",
            url: "/common/getbalance.html",
            success: function (result) {
                if (result.indexOf("/common/accounterror") > -1) {
                    window.location.href = result;
                }
                else if (result == "-55555") {
                    window.location.href = "/";
                }
                else {
                    success(result);
                }
            }
        });
    },
    getMoneyBalanceByAgencyCode: function (agencyCode, success) {
        $.ajax({
            type: "POST",
            url: "/common/getmoneybalancebyagencycode.html",
            async: false,
            dataType: "json",
            data: {
                agencyCode: agencyCode
            },
            success: function (result) {
                if (result == "-55555") {
                    window.location.href = "/";
                }
                else {
                    success(result);
                }
            }
        });
    },
    searchNews: function () {
        var titleSearch = $("#txtSearch").val().replace(/\./g, " ");
        window.location.href = "/tintuc/danhsach.1." + titleSearch + ".html";
    },
    validateDate: function (fromDate, toDate) {
        var errorCode = 0, message = "Ngày tháng năm hợp lệ.";

        var fromDateArr = fromDate.split("/"),
                toDateArr = toDate.split("/");
        var regExDate = /(?:0[1-9]|[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|[1-9]|1[0-2])\/(?:19|20\d{2})/;
        if (!regExDate.test(fromDate)) {
            errorCode = -101;
            message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
        }
        else if (!regExDate.test(toDate)) {
            errorCode = -102;
            message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
        }
        else {
            var fromDay, fromMonth, fromYear, toDay, toMonth, toYear;
            try {
                fromDay = parseInt(fromDateArr[0]);
                fromMonth = parseInt(fromDateArr[1]);
                fromYear = parseInt(fromDateArr[2]);
            } catch (e) {
                errorCode = -101;
                message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                return {errorCode: errorCode, message: message};
            }

            try {
                toDay = parseInt(toDateArr[0]);
                toMonth = parseInt(toDateArr[1]);
                toYear = parseInt(toDateArr[2]);
            } catch (e) {
                errorCode = -102;
                message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                return {errorCode: errorCode, message: message};
            }

            if ((fromMonth == 2 && ((fromYear % 400 == 0) || ((fromYear % 4 == 0) && (fromYear % 100 != 0))) && fromDay > 29)) {
                if (fromMonth == 2 && fromDay > 29) {
                    errorCode = -101;
                    message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                    return {errorCode: errorCode, message: message};
                }
            }
            else {
                if (fromMonth == 2 && fromDay > 28) {
                    errorCode = -101;
                    message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                    return {errorCode: errorCode, message: message};
                }
            }

            if (((toYear % 400 == 0) || ((toYear % 4 == 0) && (toYear % 100 != 0)))) {
                if (toMonth == 2 && toDay > 29) {
                    errorCode = -102;
                    message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                    return {errorCode: errorCode, message: message};
                }
            }
            else {
                if (toMonth == 2 && toDay > 28) {
                    errorCode = -102;
                    message = "Bạn phải nhập theo định dạng: ngày/tháng/năm.";
                    return {errorCode: errorCode, message: message};
                }
            }

            if ((new Date(fromYear, fromMonth, fromDay)).getTime() > (new Date(toYear, toMonth, toDay)).getTime()) {
                errorCode = -11;
                message = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc.";
            }

            if (errorCode == 0) {
                var currentDate = new Date();
                if ((currentDate.getFullYear() == fromYear) && (((currentDate.getMonth() + 1 - fromMonth == 3) && (currentDate.getDate() <= fromDay)) || (currentDate.getMonth() + 1 - fromMonth < 3))) {
                    errorCode = 0;
                }
                else if ((currentDate.getFullYear() - fromYear == 1) && (((currentDate.getMonth() + 1 - (fromMonth - 12) == 3) && (currentDate.getDate() <= fromDay)) || (currentDate.getMonth() + 1 - (fromMonth - 12) < 3))) {
                    errorCode = 0;
                }
                else {
                    errorCode = -12;
                    message = "Vui lòng liên hệ Thanh Sơn nếu thời gian thống kê lớn hơn 3 tháng.";
                }
            }
        }
        return {errorCode: errorCode, message: message};
    },
    showPageProcessing: function () {
        var htmlReplace = Common.processingHTML.replace("{{height}}", $(".rightctn .contsale").outerHeight(true) - 200);
        $("#BxProcessing").remove();
        $(".innerbody .contsale").append(htmlReplace);
    },
    hidePageProcessing: function () {
        $("#BxProcessing").remove();
    },
    showOTPMatrixReset: function () {
        var htmlContent = '<p>Vui lòng liên hệ Thanh Sơn để cấp lại thẻ ma trận xác thực.</p>'
                + '<b><u>Số điện thoại:</u></b><br>'
                + '<span style="margin-left:15px">Hà Nội: (04) 3773 6951</span><br>'
                + '<span style="margin-left:15px">TP.HCM: (08) 6264 5102</span><br>';
        Common.openPopup(htmlContent, "400px", "5000", "");
        $("#popup_content").css("line-height", "25px");
    },
    showResetOTPPinCode: function (accountCode) {
        var htmlContent = '<p class="" align="center"></p>'
                + '<p style="font-size:13px; padding:10px; text-align:center;">Đổi mã pin ma trận xác thực bằng cách nhắn tin tới đầu số 6069.<br>'
                + 'Cú pháp: <span style="font-weight:bolder; color:#60830F">PIN</span> '
                + '<img src="' + $("#commonStaticURL").val() + 'images/icon/space3.gif" width="15" height="6"> '
                + '<span style="font-weight:bolder; color:#60830F">' + accountCode + '</span> '
                + '<img src="' + $("#commonStaticURL").val() + 'images/icon/space3.gif" width="15" height="6"> '
                + '<span style="font-weight:bolder; color:#60830F">[Mã PIN Mới]</span> '
                + '<span style="font-weight:bolder" class="BlueText">gửi 6069</span></p>'
                + '<p style="margin-left: 30px;">Cước phí: <b>500đ/tin nhắn</b></p>'
                + '<p style="margin-left: 30px;"><i>(Chỉ hỗ trợ mạng MobiFone, Vinaphone, Viettel)</i></p>'
                + '<p style="margin-left: 30px;"><b><u>Lưu ý:</u> <span style="color:red">Mã PIN mới phải từ 4 đến 6 chữ số</span></b></p>';
        Common.openPopup(htmlContent, "500px", "100000", "");
        $("#popup_content").css("line-height", "25px");
    },
    showResendODP: function (accountName) {
        var htmlContent = '<p class="" align="center"></p>'
                + '<p style="font-size:13px; padding:10px; text-align:center;">Lấy lại mật khẩu ODP bằng cách nhắn tin tới đầu số 6069.<br>'
                + 'Cú pháp: <span style="font-weight:bolder" class="BlueText">ODP</span>'
                + '<img src="' + $("#commonStaticURL").val() + 'images/icon/space3.gif" width="15" height="6">'
                + '<span style="color:#60830F;font-weight:bolder;">' + accountName + '</span> '
                + '<span style="font-weight:bolder" class="BlueText">gửi 6069</span></p>'
                + '<p style="margin-left: 30px;">Cước phí: <b>500đ/tin nhắn</b></p>'
                + '<p style="margin-left: 30px;"><i>(Chỉ hỗ trợ mạng MobiFone, Vinaphone, Viettel)</i></p>';
        Common.openPopup(htmlContent, "400px", "100000", "");
        $("#popup_content").css("line-height", "25px");
    },
    overOTPMatrixGuide: function () {
        $("#otpMatrixGuide").fadeIn(200);
        $("#OTPMatrixExample").css("text-decoration", "none");
    },
    outOTPMatrixGuide: function () {
        $("#otpMatrixGuide").fadeOut(200);
    },
    openSecurityValidate: function () {
        var pathInfo = window.location.pathname;
        if (pathInfo == "/") {
            var isLogin = $("#isLogin").val();
            var isAgency = $("#isAgency").val();
            var isValidate = $("#isValidate").val();
            var authenOption = $("#authenOptionSecurity").val();
            if (isLogin == "1" && isAgency == "1" && isValidate == "0") {
                if (authenOption == "-1") {
                    window.location.href = "/matkhau/taomatkhau.html";
                }
                else {
                    $("#formValidate").css("display", "block");
                }
            }
            else {
                window.location.href = "/daily";
            }
        }
        else {
            var isValidate = $("#isValidateSecurity").val();
            if (isValidate == "0") {
                var authenOption = $("#authenOptionSecurity").val();
                if (authenOption == "-1") {
                    window.location.href = "/matkhau/taomatkhau.html";
                }
                else {
                    $("#formValidate").css("display", "block");
                }
            }
        }
    },
    skipValidate: function () {
        cookie.remove("HomeAction");
        cookie.remove("HomeActionTop");
        window.location.href = "/daily";
    },
    closeValidateForm: function () {
        window.location.href = "/daily";
    },
    goToLastActionSale: function () {
        var actionSale = $("#actionSale").val();
        cookie.set("HomeAction", actionSale, {
            path: "/"
        });

        cookie.set("HomeActionTop", "top-sale", {
            path: "/"
        });
    },
    checkVoucher: function (controlTotalAmount, typeSale) {
        $("#voucherInfo").css("color", "red");

        $("#voucherInfo").html("");
        var voucherCode = $("#voucherCode").val().trim();
        var zxBalance = Number($("#masterZXBalance").text().replace(/\./g, ""));
        var zxSale = (typeof $("#zxAmount").val() != "undefined" && $("#zxAmount").val() != "") ? Number($("#zxAmount").val().replace(/\./g, "")) : -1;

        if (voucherCode != "") {
            $.ajax({
                url: "/common/checkvoucher.html",
                type: "post",
                data: {
                    voucherCode: voucherCode
                },
                success: function (result) {
                    if (result == "-55555") {
                        window.location.href = "/dangxuat";
                    }
                    else {
                        try
                        {
                            var jResult = $.parseJSON(result);
                            var strError = "";
                            var isApllyVoucher = 0;
                            if (zxBalance >= zxSale && zxSale != -1) {
                                $("#voucherInfo").html("Mã giảm giá không được sử dụng nếu Số dư ZingXu >= Số ZingXu bán");
                            }
                            else if (jResult.code == 1) {
                                $("#voucherInfo").html("Thành công");
                                $("#voucherInfo").css("color", "blue");
                                isApllyVoucher = 1;
                            }
                            else if (jResult.code == -2002) {
                                strError = "Mã giảm giá đã hết thời gian sử dụng";
                            }
                            else if (jResult.code == -2003) {
                                strError = "Mã giảm giá này đã được sử dụng";
                            }
                            else if (jResult.code == -3000) {
                                strError = "Mã giảm giá này đã được kiểm tra";
                            }
                            else {
                                strError = "Mã giảm giá không hợp lệ";
                            }

                            if (strError == "") {
                                if (isApllyVoucher == 1) {
                                    var discountAmount = jResult.value;
                                    $("#discountPrice").val(discountAmount);
                                    var totalAmount = Number($("#orgTotal").val());

                                    var totalDiscount = 0;
                                    if (typeSale == "salecard") {
                                        totalDiscount = calDiscountAmountCard();
                                    }
                                    else {
                                        totalDiscount = calDiscountAmountZX('checkPromotion');
                                    }

                                    var valueShowTotal = (totalAmount - discountAmount) < 0 ? 0 : (totalAmount - discountAmount);
                                    var showTotal = Common.formatNumber(valueShowTotal, 0, ",", ".");
                                    $(controlTotalAmount).html(showTotal);

                                    if (totalDiscount < 0) {
                                        $("#voucherInfo").html("Số tiền dư " + Common.formatNumber(Math.abs(totalDiscount), 0, ",", ".") + " VNĐ của mã giảm giá không được hoàn trả lại, mỗi mã giảm giá chỉ áp dụng cho 1 giao dịch thành công");
                                        $("#voucherInfo").css("color", "red");
                                    }
                                }
                            }
                            else {
                                Common.openPopup(strError, "", "5000", "#voucherCode");
                            }
                        }
                        catch (err)
                        {
                            window.location.href = "/daily";
                            return false;
                        }
                    }
                }
            });
        } else {
            Common.openPopup("Nhập mã giảm giá", "", "5000", "#voucherCode");
        }
    },
    checkBalanceSaleZXCard: function (typeAction) {
        var totalBalance = Number($("#masterTotalAmount").text().replace(/\./g, ""));
        var total;
        if (typeAction == 'salezx') {
            total = calDiscountAmountZX('checkPromotion');
        }
        else {
            total = calDiscountAmountCard();
        }

        if (total > totalBalance) {
            var strError;
            if ($("#isEmployee").val() == "0") {
                strError = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng <a href=\"javascript:;\" onclick=\"redirectFunction('top-recharge');\">click vào đây</a> để nạp thêm tiền vào tài khoản.";
            } else {
                strError = "<span>Số tiền không đủ để thực hiện giao dịch</span>.<br>Vui lòng liên hệ chủ đại lý để biết thêm chi tiết.";
            }
            Common.openPopup(strError, "400px", "", "");
            return false;
        }

        return true;
    },
    changeVoucherText: function (type) {
        $("#discountPrice").val(0);
        $("#voucherInfo").html("");
        if (type == "salezx") {
            $("#zxAmount").keyup();
        }
        else {
            var totalAmount = 0;
            if ($("#table_choose tr").length > 1) {
                $("#table_choose tr").each(function (index) {
                    if (index > 0) {
                        totalAmount += Number($(this).find("td:eq(2) .rowtotalamount").text().replace(/\./g, ""));
                    }
                });
            }
            var strTotalAmount = Common.formatNumber(totalAmount, 0, ",", ".");
            $("#total_amount").html(strTotalAmount);
            $("#orgTotal").val(totalAmount);
        }
    }
};