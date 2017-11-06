$(function(){
    $("#orderLink").click(function(){
        $("#orderLink").addClass("selected");
        $("#recordLink").removeClass("selected");
        $("#lotteryLink").removeClass("selected");
        $("#orderContent").show();
        $("#recordContent").hide();
        $("#lotteryContent").hide();
    });
    $("#recordLink").click(function(){
        $("#orderLink").removeClass("selected");
        $("#recordLink").addClass("selected");
        $("#lotteryLink").removeClass("selected");
        $("#orderContent").hide();
        $("#recordContent").show();
        $("#lotteryContent").hide();
    });
    $("#lotteryLink").click(function(){
        $("#orderLink").removeClass("selected");
        $("#recordLink").removeClass("selected");
        $("#lotteryLink").addClass("selected");
        $("#orderContent").hide();
        $("#recordContent").hide();
        $("#lotteryContent").show();
    });
    $.get("./php/userCenter.php",function(data){
        var tb=$("table");
        $.each(data,function(index,domele){
            var tr='<tr class="t2"><td colspan="6">订单号：'+domele.order_num+'<a href="#">'+domele.shop_name+'</a></td> </tr>'+
                    '<tr class="t3"><td><div><img src="'+domele.product_img+'"/></div></td><td>'+domele.user_name+'</td><td>'+domele.price+'<br/>'+domele.payment_mode+'</td><td>'+domele.submit_time+'</td><td>已完成</td><td><a href="#">查看</a>|<a href="#">删除</a><br/><a href="#">评价晒单</a><br/><a href="#">还要买</a></td></tr>';
            tb.append(tr);
            console.log(data);
        })
    },"json")
});
