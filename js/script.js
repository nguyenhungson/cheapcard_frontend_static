$(document).ready(function(){
    
});

function chooseCard(element, isChooseCard, isDescrese){
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    var discount = Number($(element).closest("tr").find("td:eq(4)").find("input[type=hidden]:eq(0)").val());
    
    if(isNaN(quantity)){
        quantity = 0;
    }
    
    if(isChooseCard == 1){
        if(quantity == 0){
            quantity = 1;
            $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
        }
        else{
            quantity = 0;
        }
    }
    else if(isDescrese == 1){
        if(quantity > 1){
            quantity = quantity - 1;
        }
        else{
            quantity = 0;
        }
    }
    
    if(quantity < 1){
        $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(0);
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").attr("class", "imgcard");
        $(element).closest("tr").find("td:eq(0)").find("span[class=\"sprt icoselcard\"]").remove();
        $(element).closest("tr").find("td:eq(4)").find("label").text(0);
    }
    else{
        $(element).closest("tr").find("td:eq(0)").find("a:eq(0)").attr("class", "imgcard sel");
        $(element).closest("tr").find("td:eq(0)").append("<span class=\"sprt icoselcard\"></span>");
    }
    
    $(element).closest("tr").find("td:eq(4)").find("label").text(Common.formatNumber(discount * quantity, 0, ",", "."));
    calTotalAmount();
}

function decreaseQuantity(element){
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    if(isNaN(quantity) || Number(quantity) < 1){
        quantity = 0;
    }
    else{
        quantity = Number(quantity) - 1;
    }
    $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
    chooseCard(element, 0, 0);
}

function increaseQuantity(element){
    var quantity = $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val();
    if(isNaN(quantity)){
        quantity = 0;
    }
    else if(Number(quantity) > 999){
        quantity = 999;
    }
    else{
        quantity = Number(quantity) + 1;
    }
    $(element).closest("tr").find("td:eq(2)").find("input[type=text]").val(quantity);
    chooseCard(element, 0, 0);
}

function calTotalAmount(){
    var totalAmount = 0;
    $("#tableSaleCard tr").each(function(){
        var amount = Number($(this).find("td:eq(4)").find("label").text().replace(/\./g,""));
        totalAmount += amount;
    });
    $("#totalAmount").text(Common.formatNumber(totalAmount, 0, ",", "."));
}

function calTotalAmountZX(){
    var priceDiscount = $("#zxPrice").val();
    var quantity = $("#quantity").val();
    $("#totalAmount").text(Common.formatNumber((100 - priceDiscount) * quantity, 0, ",", "."));
}

function chooseBank(element){
    $("#listBank li").each(function(){
        $(this).removeClass("sel");
        $(this).find("span[class=\"sprt icoselcard\"]").remove();
    });
    
    $(element).addClass("sel");
    $(element).find("a").append("<span class=\"sprt icoselcard\"></span>");
}

function acceptChooseCard(){
    var listCard = "";
    $("#tableSaleCard tr").each(function(index){
        var cardId = $(this).find("td:eq(0)").find("input[type=hidden]").val();
        if(typeof(cardId) != "undefined"){
            var quantity = $(this).closest("tr").find("td:eq(2)").find("input[type=text]").val();
            listCard += cardId + "-" + quantity + ",";
        }
    });
    
    $.ajax({
        url:"/banthe/choose_card",
        type: "post",
        data: {
            listCard: listCard
        },
        success: function(result){
            if(result == ""){
                alert("Dữ liệu không hợp lệ. Vui lòng thử lại");
                window.location.href = window.location.pathname;
            }
            else{
                window.location.href = result;
            }
        }
    });
}

function acceptTopupGame(){
    $.ajax({
        url:"/naptiengame/accept_topup",
        type: "post",
        data: {
            accountName: $("#accountName").val(),
            quantity: $("#quantity").val()
        },
        success: function(result){
            if(result == ""){
                alert("Dữ liệu không hợp lệ. Vui lòng thử lại");
                window.location.href = window.location.pathname;
            }
            else{
                window.location.href = result;
            }
        }
    });
}

function acceptPayment(){
    $.ajax({
        url:"/thanhtoan/accept_payment",
        type: "post",
        data: {
            data: window.location.search,
            bank: $("#listBank li[class=sel]").attr("data-bank")
        },
        success: function(result){
            if(result == ""){
                alert("Dữ liệu không hợp lệ. Vui lòng thử lại");
                window.location.href = "/";
            }
            else{
                window.location.href = result;
            }
            console.log(result);
        }
    });
}