<?php
	require("./conn.php");
	$db="jd";
	if(!mysql_select_db($db)){
		echo "can't select database ".$db;
	}
	$sql="select order_num,shop_name,product_img,user_name,price,payment_mode,submit_time from jd_products,jd_orders,jd_order_product_detail where jd_order_product_detail.order_id=jd_orders.order_id and jd_order_product_detail.product_id=jd_products.product_id and user_name='aaa';";
	$res=mysql_query($sql);
	$arr=array();
	while($result=mysql_fetch_assoc($res)){
		array_push($arr,$result);
	}
	$j=json_encode($arr);

	echo $j;
?>