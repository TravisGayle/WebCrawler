// in javascrip})M;at file for index.html

//	https://www.kirupa.com/html5/making_http_requests_js.htm

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		Hunt();
		httpGetAsync("http://student03.cse.nd.edu:9001/get", callback);
	});

	function Hunt(){

		var url = document.getElementById('url1');
		var maxPage = document.getElementById('maxPage1');
		if( isNaN(maxPage.value)){
			alert("ERROR: " + maxPage.value + " is not a number!");
		}
		graphMe(url.value);
	}

	function httpGetAsync(url, callback)	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();

		xhr.onreadystatechange = function()	{
			if (xhr.readyState == 4 && xhr.status == 200){
				callback(xhr.responseText);
			}
		}
	}
	function callback(text){
		document.getElementById("Bottom").innerHTML = text;
	}
})
