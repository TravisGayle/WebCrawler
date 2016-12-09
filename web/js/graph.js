
var Origin;

function graphMe(Origin, graphString){
	
    var DOTstring = 'dinetwork {1 -> 2 -> 3; 2 -- 4; 2 -> 1 }';
	var parsedData = vis.network.convertDot(DOTstring);

var nodes = new vis.DataSet([
	{id: 1, label: Origin},
	{id: 2, label: 'Brent.com'},
	{id: 3, label: 'Luke.com'},
	{id: 4, label: 'Travis.com'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
	{from: 1, to: 3},
	{from: 1, to: 2},
	{from: 2, to: 4},
	{from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('mynetwork');

  // provide the data in the vis format
  var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
  }

  var options = parsedData.options;

// you can extend the options like a normal JSON variable:
options.nodes = {
  color: 'yellow'
}


  // initialize your network!
  var network = new vis.Network(container, data, options);

}
