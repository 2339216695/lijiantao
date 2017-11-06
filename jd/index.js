$(function(){
	var url=location.search;
	var userName=url.split('=')[1];
	$("#name").html(userName);
})