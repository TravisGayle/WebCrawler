function dijkstras(adjList) {
	"use strict";

	//Initizlize distance and previous lists
	var dist = {}, prev = {};
	for (var key in adjList) {
		dist[key] = Number.MAX_SAFE_INTEGER;
		prev[key] = undefined;
	}

	var toVisit = []
	toVisit.pu
}



///////////////////////////////////////////////////
// Min Priority queue class
//////////////////////////////////////////////////

var MinQueue = function() {
	this.nodes = [];
	this.len = 0;
}

MinQueue.prototype.insert = function(val) {
	this.len += 1;
	this.nodes.push(val);
	this.heapifyUp();
}

MinQueue.prototype.size = function() {
	return this.len;
}

MinQueue.prototype.pop = function() {
	if (this.size == 0) {
		console.log('Error: attempting to pop from a heap of size 0');
		return "";
	}
	var topNode = this.nodes[0];
	this.nodes[0] = this.nodes.pop();
	this.len -= 1;
	this._heapifyDown();
	return topNode;
}

MinQueue.prototype._heapifyUp = function() {
	var cur = this.len;
	var prnt = this._parentOf(cur);
	while ((prnt > 0) && (this.nodes[cur] < this.nodes[prnt])) {
		this._swap(cur, prnt);
		cur = prnt;
		prnt = this._parentOf(cur);
	}
}

MinQueue.prototype._heapifyDown = function() {
	var cur = 0;
	var left = this._leftChildOf(cur);
	var right = this._rightChildOf(cur);
	while ((right > 0 || left > 0) && (this.nodes[cur] > this.nodes[right] || this.nodes[cur > this.nodes[left]]) {

	}
}

MinQueue.prototype._rightChildOf = function(nodeIndex) {
	var child = 2*nodeIndex + 1;	
	if (child >= this.len) {
		return -1;
	} else {
		return child;
	}	
}

MinQueue.prototype._leftChildOf = function(nodeIndex) {
	var child = 2*nodeIndex + 2;
	if (child >= this.len) {
		return -1;
	} else {
		return child;
	}
}

MinQueue.prototype._parentOf = function(nodeIndex) {
	return Math.floor((nodeIndex - 1) / 2);
}

MinQueue.prototype._swap(index1, index2) {
	var tmp = this.nodes[index1];
	this.nodes[index1] = this.nodes[index2];
	this.nodes[index2] = tmp;
}
