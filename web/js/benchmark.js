var Timer = function() {
	this.startDate = undefined;
};

Timer.prototype.start = function() {
	this.startDate = new Date();
}
	
Timer.prototype.end = function() {
	var endDate  = new Date();
	return endDate.getTime() - this.startDate.getTime();
}


$(document).ready(function(){
	var maxGraphSize = 10000000;
	var numConnections = 15;
	var repeats = 5;
	var timer = new Timer();
	for (var repeat = 0; repeat < repeats; repeat++) {
		for (var graphSize = 100; graphSize < maxGraphSize; graphSize *= 10) {
			//Generate a graph
			var adjList = {};
			for (var i = 0; i < graphSize; i++) {
				//Add random connections for the node
				adjList[i] = [];
				for (var num = 0; num < numConnections; num++) {
					adjList[i].push(Math.floor(Math.random() * graphSize));
				}
			}

			//Run Dijkstras and time
			timer.start();
			dijkstras(adjList, 0, graphSize);
			var time = timer.end();
			$('#results').append('<p>Graph Size: ' + graphSize + '  Time: ' + time + ' ms</p>');
		}
	}
});

