<?php
	header("Content-Type: text/html; charset=utf8");
	$host="10.221.2.4";
	$user='jd';
	$pwd="123";
	$conn=@mysql_connect($host,$user,$pwd);
	if(!$conn){
		echo "connect mysql failed";
		exit();
	}
	mysql_query("set names utf8");
?>