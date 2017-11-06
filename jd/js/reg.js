$(document).ready(function(){
    //用户名的正则表达式判定
    $("#input1").focus(function(){
        $("#box1").css("color","#ccc").html("不能为空，6~10个字符以内的字母、数字的组合")
    }).blur(chkUser);
    function chkUser(){
        var reg=/^[\w]{6,10}$/;
        if($("#input1").val()==""||$("#input1").val()==null){
            $("#box1").css("color","red").html("不能为空");
            return false;
        }else if(!reg.test($("#input1").val())){
            $("#box1").css("color","red").html("输入错误");
            return false;
        }else{
            var data={"userName":$("#input1").val()};
            $("#box1").load("./php/checkUser.php",data,function(info){
                if(info==1){
                    $("#box1").css("color","green").html("用户可用");
                }else{
                    $("#box1").css("color","red").html("用户不可用");
                }
            });
            if( $("#box1").html()=="用户可用"){
                return true;
            }else{
                return false;
            }
        }
    }
    //密码的正则表达式判定
    $("#input2").focus(function(){
        $("#box2").css("color","#ccc").html("不能为空，6~20个字符以内的数字");
    }).blur(chkPwd);
    function chkPwd(){
        var reg=/^\d{6,20}$/;
        if($("#input2").val()==""||$("#input2").val()==null){
            $("#box2").css("color","red").html("不能为空");
            return false;
        }else if(!reg.test($("#input2").val())){
            $("#box2").css("color","red").html("输入错误");
            return false;
        }else{
            $("#box2").css("color","green").html("输入正确");
            return true;
        }
    }
    //重新输入密码的正则表达式判定
    $("#input3").focus(function(){
        $("#box3").css("color","#ccc").html("请再次输入密码");
    }).blur(chkPwd2);
    function chkPwd2(){
        if($("#input3").val()==""||$("#input3").val()==null){
            $("#box3").css("color","red").html("不能为空");
            return false;
        }else if($("#input3").val()!=$("#input2").val()){
            $("#box3").css("color","red").html("两次密码不相同");
            return false;
        }else{
            $("#box3").css("color","green").html("输入正确");
            return true;
        }
    }
    //手机号码的正则表达式判定
    $("#input4").focus(function(){
        $("#box4").css("color","#ccc").html("请输入手机号");
    }).blur(chkPhone);
    function chkPhone(){
        var reg=/^1[35678]\d{9}$/;
        if($("#input4").val()==""||$("#input4").val()==null){
            $("#box4").css("color","red").html("不能为空");
            return false;
        }else if(!reg.test($("#input4").val())){
            $("#box4").css("color","red").html("输入错误");
            return false;
        }else{
            $("#box4").css("color","green").html("输入正确");
            return true;
        }
    }
    //判定用户名、手机号码与密码是否符合要求，符合就提交至数据库，否则刷新页面
    function chk(){
        if(chkUser()&&chkPwd()&&chkPwd2()&&chkPhone()){
            return true;
        }else{
            return false;
        }
    }
    $("#btn").click(function(){
        if(!chk()){
            document.location.reload();
        }else{
           $("form").submit();
        }
    })
});