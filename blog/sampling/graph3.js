


var ctx3 = document.getElementById("canvas3").getContext("2d");
var slider3 = document.getElementById("slider3");
var button3 = document.getElementById("button3");
var graph3 = createGraphObject(-0.25, 0.25, 0, 1, 4, 2, 100, 100, 800, 800, undefined);


slider3.oninput = function()
{
	updateGraph3Labels("", "", Math.floor(slider3.value), "");
}

button3.onclick = function()
{
	updateGraph3();
}

function updateGraph3()
{
	var numSamples = Math.floor(slider3.value);
	ctx3.clearRect(0, 0, 1000, 1000);
	ctx3.strokeStyle = "black";
	ctx3.fillStyle = "black";

	drawGraphLines(ctx3, graph3);

	ctx3.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx3.strokeStyle = "rgb(255, 0, 0)";
	var histogram = generateErrorHistogramForFunction(
		graphFunction1, 
		0, 
		1, 
		uniformPdf, 
		uniformCdf, 
		1.0, 
		numSamples, 
		500);
	drawHistogram(ctx3, graph3, histogram);
	updateGraph3Labels(histogram.minDiff, histogram.maxDiff, numSamples, truncate(histogram.variance, 5));
	//console.log(histogram.percent, 1.0 / (histogram.variance));

	ctx3.strokeStyle = "black";
	ctx3.fillStyle = "black";

	ctx3.lineWidth = 5;
	graph3.graphFunc = gaussianDistribution(Math.sqrt(histogram.variance));
	graph3.yMax = (graph3.graphFunc(0));
	drawLineNoCached(ctx3, graph3, -0.25, 0.25);
	graph3.yMax = 1.0;
}

function updateGraph3Labels(val1, val2, val3, val4)
{
	document.getElementById("label3a").innerHTML = "Minimum: " + val1;
	document.getElementById("label3b").innerHTML = "Maximum: " + val2;
	document.getElementById("label3c").innerHTML = "Samples Per Approximation: " + val3;
	document.getElementById("label3d").innerHTML = "Variance: " + val4;
}


