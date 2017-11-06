<?php
	require("./conn.php");
	$db='jd';

	if(!mysql_select_db($db)){
		echo "select database failed";
		exit();
	}	
	$userName=$_GET["userName"];
	$pwd=$_GET["pwd"];
	$phone=$_GET["phone"];
	$sql="insert into userInfo(name,pwd,tel) values($userName,$pwd,$phone);";
	$res=mysql_query($sql);
	echo "<script>location.replace('../index.html?userName='+$userName);</script>";
?>