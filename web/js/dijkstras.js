function dijkstras(adjList, start, end) {
	"use strict";
	
	//Initizlize distance and previous lists
	var dist = {}, prev = {};
	for (var key in adjList) {
		dist[key] = Number.MAX_SAFE_INTEGER;
		prev[key] = undefined;
	}

	//Find paths, note distance between nodes is always assumed to be 1
	var toVisit = [];
	var marked = {};
	toVisit.push(start);
	dist[start] = 0;

	while (toVisit.length != 0) {
		var cur = toVisit.pop();
		marked[cur] = true;
		for (var node = 0; node < adjList[cur].length; node++) {
			if (!(adjList[cur][node] in marked)) {
				if (dist[cur] + 1 < dist[adjList[cur][node]]) {
					toVisit.push(adjList[cur][node])
					dist[adjList[cur][node]] = dist[cur] + 1;
					prev[adjList[cur][node]] = cur;
				}
			}
		}
	}
	
	//Return shortest path
	var path = [end];
	var cur = prev[end];
	while (cur != undefined) {
		path.unshift(cur);
		cur = prev[cur];
	}
	return path;
}



 
