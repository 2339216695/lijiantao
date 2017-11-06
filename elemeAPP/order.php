<?php
    header("Content-type:application/json");
//变量的声明
    $db="kaifanla";
    $tb1="kf_dish";
    $tb2="kf_order";
    @$user_name = $_POST['user'];    //接收人姓名
    @$sex = $_POST['sex'];    //性别
    @$phone = $_POST['tel'];//联系电话
    @$addr = $_POST['addr'];  //收货地址
    $order_time = time()*1000;  //以毫秒为单位的当前系统时间
    $dish_name=$_POST["dish"];
//    链接数据库
    $conn=@mysql_connect(localhost,eleme,123);
    if(!$conn){
        echo "can't connect mysql";
        exit();
    }
    if(!mysql_select_db($db)){
        echo "select ".$db." failed";
        exit();
    }
    mysql_query("set names utf8");
//    插入新数据
    $did=mysql_query("select did from $tb1 where name='$dish_name';");
    while($did_did=mysql_fetch_row($did)){
         mysql_query("insert into $tb2(phone,user_name,sex,order_time,addr,did) values('$phone','$user_name','$sex','$order_time','$addr','$did_did[0]')");
         $data=mysql_query("select oid from $tb2 where user_name='$user_name' and order_time='$order_time'");
         while($data_data=mysql_fetch_row($data)){
            echo $data_data[0];
         }
    };
?>