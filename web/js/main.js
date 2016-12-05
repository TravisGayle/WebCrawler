// Main javascript file for index.html

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		Hunt();
	});

	function Hunt(){

		var url = document.getElementById('url1');

		if( url.value){
			alert("The following url was entered: " + url.value);
		}else{
			alert("Error: No URL entered");
		}

	}

});
