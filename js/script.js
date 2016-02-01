$(document).ready(function () {
    var pathName = window.location.pathname;
    if (pathName == "/thanhtoan/hoanthanh") {
        var textCopyAll = "";
        $("#tableCards tbody tr").each(function () {
            if (typeof $(this).find("td:eq(0)").find("input[type=hidden]:eq(0)").val() != "undefined") {
                var data = $(this).find("td:eq(0)").find("input[type=hidden]:eq(0)").val();
                textCopyAll += data + "\r\n";
                $(this).find("td:eq(3) a").attr("data-clipboard-text", data);
                var client = new ZeroClipboard($(this).find("td:eq(3) a"));

                client.on("ready", function (readyEvent) {
                    client.on("aftercopy", function (event) {
                        Common.openPopup("Đã copy thành công", "", "2000", "");
                    });
                });
            }
        });

        //copyAll
        $("#copyAll").attr("data-clipboard-text", textCopyAll);
        var client = new ZeroClipboard($("#copyAll"));

        client.on("ready", function (readyEvent) {
            client.on("aftercopy", function (event) {
                Common.openPopup("Đã copy thành công", "", "2000", "");
            });
        });
    }
    else if(pathName == "/thongtin/banggia.html"){
        $("#menuPrice").find("li:eq(0)").click();
    }
});

function clickPrice(table, element){
    $("#menuPrice li").each(function(){
        $(this).find("a").removeClass("current");
    });
    $("#mobile").css("display", "none");
    $("#game").css("display", "none");
    $("#zingxu").css("display", "none");
    
    $(element).find("a").addClass("current");
    $(table).css("display", "table");
}

function chooseCard(element, isChooseCard, isDescrese) {
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    var discount = Number($(element).closest("tr").find("td:eq(4)").find("input[type=hidden]:eq(0)").val());

    if (isNaN(quantity)) {
        quantity = 0;
    }
    else{
        quantity = Number(quantity);
        if(quantity !== parseInt(quantity, 10)){
            quantity = 0;
        }
    }

    if (isChooseCard == 1) {
        if (quantity == 0) {
            quantity = 1;
            $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
        }
        else {
            quantity = 0;
        }
    }
    else if (isDescrese == 1) {
        if (quantity > 1) {
            quantity = quantity - 1;
        }
        else {
            quantity = 0;
        }
    }

    if (quantity < 1) {
        $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(0);
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").removeClass("sel");
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").find("span[class=\"sprt icoselcard\"]").remove();
        $(element).closest("tr").find("td:eq(4)").find("label").text(0);
    }
    else {
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").addClass("sel");
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").append("<span class=\"sprt icoselcard\"></span>");
    }

    $(element).closest("tr").find("td:eq(4)").find("label").text(Common.formatNumber(discount * quantity, 0, ",", "."));
    calTotalAmount();
}

function decreaseQuantity(element) {
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    if (isNaN(quantity) || Number(quantity) < 1) {
        quantity = 0;
    }
    else {
        quantity = Number(quantity) - 1;
    }
    $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
    chooseCard(element, 0, 0);
}

function increaseQuantity(element) {
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    if (isNaN(quantity)) {
        quantity = 0;
    }
    else if (Number(quantity) > 999) {
        quantity = 999;
    }
    else {
        quantity = Number(quantity) + 1;
    }
    $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
    chooseCard(element, 0, 0);
}

function calTotalAmount() {
    var totalAmount = 0;
    $("#tableSaleCard tr").each(function () {
        var amount = Number($(this).find("td:eq(4)").find("label").text().replace(/\./g, ""));
        totalAmount += amount;
    });
    $("#totalAmount").text(Common.formatNumber(totalAmount, 0, ",", "."));
}

function calTotalAmountZX() {
    var infoZx = $("#pricezx").val().split("|");
    $("#totalAmount").text(Common.formatNumber(infoZx[0], 0, ",", "."));
}

function chooseBank(element) {
    $("#listBank li").each(function () {
        $(this).removeClass("sel");
        $(this).find("span[class=\"sprt icoselcard\"]").remove();
    });

    $(element).addClass("sel");
    $(element).find("a").append("<span class=\"sprt icoselcard\"></span>");
    var bankCode = $(element).attr("data-bank");

    var totalAmount = Number($("#totalAmount").text().replace(/\./g, ""));
    var fee = totalAmount * 0.01 + 1500;
    if (bankCode == "123PCC") {
        fee = totalAmount * 0.03 + 3000;
    }

    $("#fee").html(Common.formatNumber(fee, 0, ",", ".") + "<em> VNĐ</em>");
}

function acceptChooseCard() {
    var listCard = "";
    var totalQuantity = 0;
    $("#tableSaleCard tr").each(function (index) {
        var cardId = $(this).find("td:eq(0)").find("input[type=hidden]").val();
        if (typeof (cardId) != "undefined") {
            var quantity = $(this).closest("tr").find("td:eq(2)").find("input[type=text]").val();
            listCard += cardId + "-" + quantity + ",";
            totalQuantity += Number(quantity);
        }
    });

    if (totalQuantity > 0) {
        $.ajax({
            url: "/banthe/choose_card",
            type: "post",
            data: {
                listCard: listCard
            },
            success: function (result) {
                if (result == "") {
                    Common.openPopup("Dữ liệu không hợp lệ. Vui lòng thử lại", "", "5000", "/");
                }
                else {
                    window.location.href = result;
                }
            }
        });
    }
    else {
        openPopup("Vui lòng chọn loại thẻ cần mua", "");
    }
}

function acceptTopupGame() {
    var accountName = $("#accountName").val();
    var infoZx = $("#pricezx").val().split("|");
    if (accountName.trim() == "") {
        openPopup("Vui lòng nhập tên tài khoản");
    }
    else {
        $.ajax({
            url: "/naptiengame/accept_topup",
            type: "post",
            data: {
                accountName: $("#accountName").val(),
                id: infoZx[1],
                amount: infoZx[0]
            },
            success: function (result) {
                if (result == "") {
                    alert("Dữ liệu không hợp lệ. Vui lòng thử lại");
                    window.location.href = window.location.pathname;
                }
                else {
                    window.location.href = result;
                }
            }
        });
    }
}

function acceptPayment() {
    var selBank = $("#listBank li[class=sel]").attr("data-bank");
    var strError = "";
    if (typeof selBank == "undefined") {
        strError = "Vui lòng chọn ngân hàng cần thanh toán";
    }

    if (strError == "") {
        $.ajax({
            url: "/thanhtoan/accept_payment",
            type: "post",
            data: {
                data: window.location.search,
                bank: $("#listBank li[class=sel]").attr("data-bank")
            },
            success: function (result) {
                var jsonResult;
                try
                {
                    jsonResult = $.parseJSON(result);
                }
                catch (err)
                {
                    Common.openPopup("Dữ liệu không hợp lệ.<br>Quý khách vui lòng thử lại sau", "", "10000", "/");
                    return false;
                }
                
                var strInfo = "";
                var data = jsonResult.data;
                if(jsonResult.code == 1){
                    if(data.url != ""){
                        window.location.href = data.url;
                    }
                    else{
                        strInfo = "Dữ liệu không hợp lệ.<br>Quý khách vui lòng thử lại sau";
                    }
                }
                else if(jsonResult.code == -3004){
                    var lstOFS = data.lstOFS;
                    if(lstOFS.length > 0){
                        strInfo = "Loại thẻ này đã hết hoặc không đủ để bán:";
                        $(lstOFS).each(function(index, item){
                                strInfo += "<br>- Thẻ " + item.esaleSupplierCode + " " + Common.formatNumber(item.unitPrice, 0, ",", ".") + " VNĐ";
                        });
                    }
                    else{
                        strInfo = "Dữ liệu không hợp lệ.<br>Quý khách vui lòng thử lại sau";
                    }
                }
                else if(jsonResult.code == -4000){
                    strInfo = "Ngân hàng này hiện đang bảo trì<br>Quý khách vui lòng thử lại sau hoặc chọn ngân hàng khác";
                }
                else{
                    strInfo = "Dữ liệu không hợp lệ.<br>Quý khách vui lòng thử lại sau";
                }
                
                if(strInfo != ""){
                    var redirect = "/";
                    if(jsonResult.code == -4000){
                        redirect = "";
                    }
                    Common.openPopup(strInfo, "400px", "10000", redirect);
                }
            }
        });
    }
    else {
        openPopup(strError, "");
    }
}

function openPopup(content, width) {
    if (width == "") {
        width = "350px";
    }

    $("#boxPopup").removeAttr("style");
    $("#popup_title").html("Thông báo");
    $("#popup_content").html(content);
    $("#boxPopup").css("width", width);
    $("#formPopup").css("display", "block");
    $("#formPopup").css("z-index", "100");
}

function closePopup() {
    $("#formPopup").css("display", "none");
}

function backChoose() {
    window.history.go(-1);
}

function getListPrice(supplier) {
    $("#tablePriceList tr").each(function (index, item) {
        if (index == 0) {
            return true;
        }

        if ($(this).attr("data-type") == supplier) {
            $(this).css("display", "table-row");
        }
        else {
            $(this).css("display", "none");
        }
    });

    $("#tablePriceList tr:eq(0) ul li").each(function () {
        if ($(this).attr("data-type") == supplier) {
            $(this).find("a").addClass("current");
        }
        else {
            $(this).find("a").removeClass("current");
        }
    });
}

function exportExcelCard() {
    var textCopyAll = "";
    $("#tableCards tbody tr").each(function () {
        if (typeof $(this).find("td:eq(0)").find("input[type=hidden]:eq(1)").val() != "undefined") {
            var data = $(this).find("td:eq(0)").find("input[type=hidden]:eq(1)").val();
            textCopyAll += data + "-";
        }
    });
    
    $("#formExportExcel input[type=hidden]").val(textCopyAll);
    $("#formExportExcel").submit();
}