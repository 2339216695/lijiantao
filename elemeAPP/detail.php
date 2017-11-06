<?php
    header("Content-type:application/json");
    $db="kaifanla";
    $tb1="kf_dish";
    $tb2="kf_order";
    $name=$_REQUEST["data_name"];
    $conn=@mysql_connect(localhost,eleme,123);
    if(!$conn){
        echo "connect to mysql failed.";
        exit();
    };
    if(!mysql_select_db($db)){
        echo "can't select to".$db;
        exit();
    };
    mysql_query("set names utf8");
    $res=mysql_query("select name,img_lg,material,detail from $tb1 where name='$name';");
 $arr=array();
    while($result=mysql_fetch_row($res)){
        array_push($arr,$result);
    }
    $result_1=json_encode($arr);
    echo $result_1;
?>