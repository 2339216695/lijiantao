<?php
    header("Content-type:application/json");
//变量的声明
    $db="kaifanla";
    $tb1="kf_dish";
    $tb2="kf_order";
    $del_num=$_REQUEST["del_num"];
//链接数据库
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
//数据的操作
    if($del_num!=0){
        mysql_query("delete from $tb2 where oid='$del_num'");
    }
    $res=mysql_query("select oid,img_sm,order_time,user_name from $tb1,$tb2 where $tb1.did=$tb2.did;");
    $arr=array();
    while($result=mysql_fetch_assoc($res)){
        array_push($arr,$result);
    }
    $result_1=json_encode($arr);
    echo $result_1;
?>
