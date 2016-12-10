// Main controller file for index.html

$(document).ready(function(){
	//Put code here

	$("#urlButton").click(function() {
		$('mynetwork').remove();
        	flusher();
		hunt();
	});
		
});


function flusher(){
	var div = document.getElementById('mynetwork');
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}
}

function hunt(){
	var postUrl = "http://student03.cse.nd.edu:9001/post";
	var url = document.getElementById('url1');
	var maxPage = document.getElementById('maxPage1');
	var maxLinks = document.getElementById('maxLinks1');
	if( isNaN(maxPage.value)){
		alert("ERROR: " + maxPage.value + " is not a number!");
	}
	httpGetAsync(postUrl, url.value, maxPage.value, maxLinks.value);		
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
			adjList_to_nodeEdge(wikipage, data);
		}
	}
}

	
function adjList_to_nodeEdge(urlStart, data){
	var graphData = {
		nodes: [],
		edges: []
	}
	var daStart = urlStart;
	var daEnd;
	for(var key in data){
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

	// Configure and start no-overlap display
	var listener = s.configNoverlap(config);
	s.startNoverlap();

	//Bind clicks
	s.bind('clickNode', function(e){
		var nodeId = e.data.node.id;
		if (adjList_to_nodeEdge.start == undefined) {
			adjList_to_nodeEdge.start = nodeId;	
		} else if (adjList_to_nodeEdge.end == undefined){
			var shortPath = dijkstras(data, adjList_to_nodeEdge.start, nodeId);
			s.graph.nodes().forEach(function(n){
				for(var i=0; i<shortPath.length; i++){
					if(shortPath[i] == n.id){
						n.size = 5;
						n.color = 'red';
					}
				}
			});
		} else {
			adjList_to_nodeEdge.start = nodeId;
			s.graph.nodes().forEach(function(n){
				n.color = '#00FFFF';
				n.size = 2;
			});

		}
	});
}



