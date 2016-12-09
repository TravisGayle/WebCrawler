// in javascrip})M;at file for index.html

//	https://www.kirupa.com/html5/making_http_requests_js.htm

$(document).ready(function()
{
	//Put code here

	$("#urlButton").click(function() {
		Hunt();
		httpGetAsync("http://student00.cse.nd.edu:9001");		
	});

	function Hunt()
	{

		var url = document.getElementById('url1');

		// if( url.value){
		// 	alert("The following url was entered: " + url.value);
		// }else{
		// 	alert("Error: No URL entered");
		// }
		
		graphMe(url.value);
	}

	function httpGetAsync(url)
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();

		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4 && xhr.status == 200)
			{
				alert(xhr.responseText);
				//callback(xhr.responseText);
				//used to be second argument
			}
		}

	}
})
