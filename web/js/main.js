// in javascrip})M;at file for index.html

//	https://www.kirupa.com/html5/making_http_requests_js.htm

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		$('mynetwork').remove();
        flusher();
		Hunt();
	});
		
});


function flusher(){
	var div = document.getElementById('mynetwork');
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}
}

function Hunt(){
	var postUrl = "http://student03.cse.nd.edu:9001/post";
	var url = document.getElementById('url1');
	var maxPage = document.getElementById('maxPage1');
	var maxLinks = document.getElementById('maxLinks1');
	if( isNaN(maxPage.value)){
		alert("ERROR: " + maxPage.value + " is not a number!");
	}
	httpGetAsync(
			postUrl,
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
			//callback(data);
			adjList_to_nodeEdge(wikipage, data);
		}
	}
}
/*
function callback(text){
	document.getElementById("Bottom").innerHTML = text;
}
*/

	
function adjList_to_nodeEdge(urlStart, data){
	var graphData = {
		nodes: [],
		edges: []
	}
	var daStart = urlStart;
	var daEnd;
	for(var key in data){
		//if (!data.hasOwnProperty(key)){
	//		continue;
	//	}
      	var page = key.split('/');
	
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
			daEnd = data[key][i];
		}
	}
	var s = new sigma({
		graph: graphData,
		container: 'mynetwork',
		setting: {
			defaultNodeColor: '#00FFFF'
		}
	});


	var config = {
		nodeMargin: .1,
		scaleNodes: .5,
		gridSize: 75,
		easing: 'quadraticInOut',
		duration: 10000
	};

	// Configure the algorithm
	var listener = s.configNoverlap(config);
	
	// Start the algorithm:
	s.startNoverlap();

	s.bind('clickNode', function(e){
		var nodeId = e.data.node.id;
		
	
	var shortPath = dijkstras(data, daStart, daEnd);
	s.graph.nodes().forEach(function(n){
		for(var i=0; i<shortPath.length; i++){
			if(shortPath[i] == n.id){
				n.size = 4;
				n.color = 'red';
			}
		}
	});
}



