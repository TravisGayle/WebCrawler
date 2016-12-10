// in javascrip})M;at file for index.html

//	https://www.kirupa.com/html5/making_http_requests_js.htm

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		Hunt();
	});
		
});

function Hunt(){
	var url = document.getElementById('url1');
	var maxPage = document.getElementById('maxPage1');
	if( isNaN(maxPage.value)){
		alert("ERROR: " + maxPage.value + " is not a number!");
	}
	httpGetAsync(
			"http://student00.cse.nd.edu:9003/post",
			url.value, 
			maxPage.value
			);		
	//graphMe(url.value);
}

function httpGetAsync(url, wikipage, maxPages){
	var xhr = new XMLHttpRequest();
	var response = [];
	var data;
	response.push(wikipage + ' ' +  maxPages);
	xhr.open("POST", url, true);
	xhr.send(response.join('\n'));
	xhr.onreadystatechange = function()	{
		if (xhr.readyState == 4 && xhr.status == 200){
			data = JSON.parse(xhr.responseText);
			callback(data);
			console.log(data);
			adjList_to_nodeEdge(data);
		}
	}
}

function callback(text){
	document.getElementById("Bottom").innerHTML = text;
}
	
function adjList_to_nodeEdge(data){
	var graphData = {
		nodes: [],
		edges: []
	}
	
	
	for(var key in data){
		if (!data.hasOwnProperty(key)){
			continue;
		}
		console.log(key);
		graphData['nodes'].push({ 
			id: key,
			label: "heey",
			x: Math.random(),
			y: Math.random(),
			color: '#00FFFF',
			size: 2
		  });
		//edges
		for(var i; i < data[key].length; i++){
			graphData['edges'].push({
				id: 'e'+i,
				source: key,
				target: data[key][i],
				color: 'lightgreen',
				type: 'arrow'
			  });
			console.log(data);
		}
	}
	s = new sigma({
		graph: graphData,
		container: 'mynetwork',
		setting: {
			defaultNodeColor: '#00FFFF'
		}
	});
}


