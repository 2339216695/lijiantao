<?php
	require("./conn.php");
	$db="jd";
	$tb="userInfo";
	$userName=$_POST["userName"];
	$userPwd=$_POST["userPwd"];
	if(!mysql_select_db($db)){
		echo "can't select ".$db;
		exit();
	}
	$sql="select name,pwd from $tb where name=$userName and pwd=$userPwd;";
	$res=mysql_query($sql);
	if(mysql_num_rows($res)==1){
		echo "0";
	}else{
		echo "1";
	}
?>