<?php
	require("./conn.php");
	$db='jd';
	$tb="userInfo";
	if(!mysql_select_db($db)){
		echo "select database failed";
		exit();
	}	
	$userName=$_POST["userName"];
	$sql="select name from $tb where name='$userName';";
	$res=mysql_query($sql);
	if(mysql_num_rows($res)==0){
		echo "1";
		exit();
	}else{
		echo "0";
		exit();
	}
?>