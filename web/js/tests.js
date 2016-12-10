$(document).ready(function(){
	"use strict";
	
//////////////////////////////////////////////////
// Test parameters and inputs
/////////////////////////////////////////////////
	
	var input1 = {
		a: ['b'],
		b: ['d', 'e'],
		c: [],
		d: ['b', 'g', 'h', 'i', 'j'],
		e: ['c', 'f', 'd'],
		f: [],
		g: ['e'],
		h: ['i'],
		i: ['a'],
		j: ['h']
	};

	var input2 = {
		a: ['i', 'f'],
		b: ['i'],
		c: ['d', 'g'],
		d: ['a', 'h'],
		e: ['i'],
		f: ['e', 'i'],
		g: ['b'],
		h: ['d'],
		i: ['c', 'g']
	};

	var output1 = ['a','b','d','j'];
	var output2 = ['j', 'h', 'i', 'a', 'b', 'e', 'f'];
	var output3 = ['f', 'i', 'g'];
	var output4 = ['h', 'd', 'a', 'i'];
	var maxTime = 500; //This is in milliseconds

////////////////////////////////////////////////////////
// Timer class and functions
////////////////////////////////////////////////////////

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

	// Functions
	function testTime(time, testId) {
		if (time < maxTime) {
			$(testId).append('<p>Time test passed!</p>');
		} else {
			$(testId).append('<p>Time test failed</p>');
		}
	}

	function testOutput(input, output, testId) {
		var timer = new Timer();
		timer.start();
		var result = dijkstras(input, output[0], output[output.length - 1]);
		var time = timer.end();
		if (arrayIsEqual(result, output)) {
			$(testId).append('<p>Output test passed!</p>');
		} else {
			$(testId).append('<p>Ouput test failed</p>');
		}
		return time;
	}

	function arrayIsEqual(ar1, ar2) {
		if (ar1.length != ar2.length) {
			return false;
		}
		for (var i = 0; i < ar1.length; i++) {
			if (ar1[i] != ar2[i]) {
				return false;
			}
		}
		return true;
	}

////////////////////////////////////////////////////////////////////////
// Main execution
///////////////////////////////////////////////////////////////////////

	var time;
	time = testOutput(input1, output1, '#test1');
	testTime(time, '#test1');
	time = testOutput(input1, output2, '#test2');
	testTime(time, '#test2');
	time = testOutput(input2, output3, '#test3');
	testTime(time, '#test3');
	time = testOutput(input2, output4, '#test4');
	testTime(time, '#test4');
});

