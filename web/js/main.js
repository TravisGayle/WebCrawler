// in javascrip})M;at file for index.html

//	https://www.kirupa.com/html5/making_http_requests_js.htm

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		$('mynetwork').remove();
		Hunt();
	});
		
});

function Hunt(){
	var url = document.getElementById('url1');
	var maxPage = document.getElementById('maxPage1');
	var maxLinks = document.getElementById('maxLinks1');
	if( isNaN(maxPage.value)){
		alert("ERROR: " + maxPage.value + " is not a number!");
	}
	httpGetAsync(
			"http://student00.cse.nd.edu:9001/post",
			url.value, 
			maxPage.value,
			maxLinks.value
			);		
	//graphMe(url.value);
}

function httpGetAsync(url, wikipage, maxPages, maxLinks){
	var xhr = new XMLHttpRequest();
	var response = [];
	var data;
	response.push(wikipage + ' ' +  maxPages+ ' ' + maxLinks);
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
	console.log(data);
	for(var key in data){
		//if (!data.hasOwnProperty(key)){
	//		continue;
	//	}
       var page = key.split('/');
		console.log(key);
		graphData['nodes'].push({ 
			id: key,
			label: page[page.length -1],
			x: Math.random(),
			y: Math.random(),
			color: '#00FFFF',
			size: 2
		  });
		//edges
		console.log(data, key);
		for(var i=0; i < data[key].length; i++){
			graphData['edges'].push({
				id: key+i,
				source: key,
				target: data[key][i],
				color: 'lightgreen',
				type: 'arrow'
			  });
			console.log("heeey");
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
// input:  https://en.wikipedia.org/wiki/Food
// output: Food
//function(


