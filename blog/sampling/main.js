




var ctx1 = document.getElementById("canvas1").getContext("2d");
var slider1 = document.getElementById("slider1");
var graph1 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction1);


var ctx2 = document.getElementById("canvas2").getContext("2d");
var slider2 = document.getElementById("slider2");
var button2 = document.getElementById("button2");
var check2 = document.getElementById("check2");
var graph2 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction2);


var ctx3 = document.getElementById("canvas3").getContext("2d");
var slider3 = document.getElementById("slider3");
var button3 = document.getElementById("button3");
var graph3 = createGraphObject(-0.25, 0.25, 0, 1, 4, 2, 80, 100, 800, 800, undefined);


var ctx4 = document.getElementById("canvas4").getContext("2d");
var slider4 = document.getElementById("slider4");
var button4 = document.getElementById("button4");
var check4 = document.getElementById("check4");
var graph4 = createGraphObject(0, 3, 0, 9, 2, 6, 100, 100, 800, 800, graphFunction4);

var ctx5 = document.getElementById("canvas5").getContext("2d");
var graph5 = createGraphObject(0, 500, 0, 0.1, 2, 6, 100, 100, 800, 800, undefined);


window.onload = function() {



	ctx1.font = '50px Montserrat';
	ctx1.canvasHeight = 1000;
	drawGraphLines(ctx1, graph1);
	ctx1.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx1.lineWidth = 5;
	ctx1.strokeStyle = "red";
	drawIntegralRectangles(ctx1, graph1, 10, 0, 1);
	ctx1.strokeStyle = "black";
	ctx1.fillStyle = "black";
	drawLineNoCached(ctx1, graph1, 0, 1);
	updateGraph1Labels(0.855, 0.145, 10);


	ctx2.font = '50px Montserrat';
	ctx2.canvasHeight = 1000;
	drawGraphLines(ctx2, graph2);
	ctx2.lineWidth = 5;
	ctx2.strokeStyle = "black";
	ctx2.fillStyle = "black";
	drawLineNoCached(ctx2, graph2, 0, 1);
	updateGraph2();

	ctx3.font = '50px Montserrat';
	ctx3.canvasHeight = 1000;
	drawGraphLines(ctx3, graph3);
	ctx3.lineWidth = 5;
	ctx3.strokeStyle = "black";
	ctx3.fillStyle = "black";
	//updateGraph3();


	initializeContext(ctx4, graph4);
	drawLineNoCached(ctx4, graph4, 0, 3);


	ctx5.font = '50px Montserrat';
	ctx5.canvasHeight = 1000;
	drawGraphLines(ctx5, graph5);
	ctx5.lineWidth = 5;
	ctx5.strokeStyle = "red";
	graph5.graphPoints = constant3;
	drawLineCached(ctx5, graph5);
	ctx5.strokeStyle = "blue";
	graph5.graphPoints = constant4;
	drawLineCached(ctx5, graph5);

	//console.log(generateVarianceForRiemannSum(graphFunction4, 0, 3, 11.793940));
	//console.log(generateVarianceForSampling(graphFunction4, 0, 3, 11.793940, pdf4, cdf4));
};


function initializeContext(ctx, graph)
{
	ctx.font = '50px Montserrat';
	ctx.canvasHeight = 1000;
	drawGraphLines(ctx, graph);
	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
}

slider1.oninput = function()
{
	var numRectangles = Math.floor(this.value);

	ctx1.clearRect(0, 0, 1000, 1000);
	ctx1.strokeStyle = "black";
	ctx1.fillStyle = "black";

	drawGraphLines(ctx1, graph1);

	ctx1.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx1.lineWidth = 5;
	ctx1.strokeStyle = "red";
	drawIntegralRectangles(ctx1, graph1, numRectangles, 0, 1);
		
	ctx1.strokeStyle = "black";
	drawLineNoCached(ctx1, graph1, 0, 1);

	var approximateArea = riemannSum(graph1.graphFunc, 0, 1, numRectangles);
	approximateArea = truncate(approximateArea, 5);

	var diff = 1.0 - approximateArea;
	diff = truncate(diff, 5);

	updateGraph1Labels(approximateArea, diff, numRectangles);
}

function updateGraph1Labels(val1, val2, val3)
{
	document.getElementById("label1a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label1b").innerHTML = "Difference: " + val2;
	document.getElementById("label1c").innerHTML = "Number of Rectangles: " + val3;
}


slider2.oninput = function() 
{
	updateGraph2();
}

button2.onclick = function()
{
	updateGraph2();
}

check2.onclick = function()
{
	updateGraph2();
}

slider3.oninput = function()
{
	updateGraph3Labels("", "", Math.floor(slider3.value));
}

button3.onclick = function()
{
	updateGraph3();
}

slider4.oninput = function() 
{
	updateGraph4();
}

button4.onclick = function()
{
	updateGraph4();
}

check4.onclick = function()
{
	updateGraph4();
}

function updateGraph2()
{
	var numRectangles = Math.floor(slider2.value);
	var flag = check2.checked;

	ctx2.clearRect(0, 0, 1000, 1000);
	ctx2.strokeStyle = "black";
	ctx2.fillStyle = "black";

	drawGraphLines(ctx2, graph2);



	ctx2.lineWidth = 5;
	var approximateArea = drawIntegralRectanglesSampled(
		ctx2, 
		graph2, 
		numRectangles, 
		0, 
		1, 
		uniformPdf, 
		uniformCdf, 
		flag,
		colorFunction2);

	ctx2.strokeStyle = "black";
	drawLineNoCached(ctx2, graph2, 0, 1);

	approximateArea = truncate(approximateArea, 5);

	var diff = 1.0 - approximateArea;
	diff = truncate(diff, 5);

	updateGraph2Labels(approximateArea, diff, numRectangles);
}

function updateGraph2Labels(val1, val2, val3)
{
	document.getElementById("label2a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label2b").innerHTML = "Difference: " + val2;
	document.getElementById("label2c").innerHTML = "Number of Rectangles: " + val3;
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
	updateGraph3Labels(histogram.minDiff, histogram.maxDiff, numSamples);
	//console.log(histogram.percent, 1.0 / (histogram.variance));

	ctx3.strokeStyle = "black";
	ctx3.fillStyle = "black";

	ctx3.lineWidth = 5;
	graph3.graphFunc = gaussianDistribution(Math.sqrt(histogram.variance));
	graph3.yMax = (graph3.graphFunc(0));
	drawLineNoCached(ctx3, graph3, -0.25, 0.25);
	graph3.yMax = 1.0;

/*
	graph3.yMax = numSamples;
	graph3.xMin = 0;
	graph3.xMax = numSamples;
	
	graph3.graphPoints = generateVarianceGraph(graphFunction1, 0, 1, uniformPdf, uniformCdf, 1.0, numSamples);
	drawLineCached(ctx3, graph3);

	graph3.yMax = 1.0;
	graph3.xMin = -0.25;
	graph3.xMax = 0.25;

	var s = 0;
	for (var x = 0; x < graph3.graphPoints.length; x++)
	{
		var t = graph3.graphPoints[x].x / graph3.graphPoints[x].y;
		s += t;
	}

	s = s / graph3.graphPoints.length;
	console.log("acg " + s, 1.0 / s);
	*/

	//var h = generateErrorHistogramForFunction(graphFunction1, 0, 1, uniformPdf, uniformCdf, 1.0, 10000);
	//var v = 1.0 / h.variance;
	//console.log(v / 10000, 10000 / v);

}

function updateGraph3Labels(val1, val2, val3)
{
	document.getElementById("label3a").innerHTML = "Smallest Difference: " + val1;
	document.getElementById("label3b").innerHTML = "Largest Difference: " + val2;
	document.getElementById("label3c").innerHTML = "Samples Per Approximation: " + val3;
}



function updateGraph4()
{
	var numRectangles = Math.floor(slider4.value);
	var flag = check4.checked;

	ctx4.clearRect(0, 0, 1000, 1000);
	ctx4.strokeStyle = "black";
	ctx4.fillStyle = "black";

	drawGraphLines(ctx4, graph4);



	ctx4.lineWidth = 5;
	var approximateArea = drawIntegralRectanglesSampled(
		ctx4, 
		graph4, 
		numRectangles, 
		0, 
		3, 
		pdf4, 
		cdf4, 
		flag,
		colorFunction2);


	ctx4.strokeStyle = "black";
	ctx4.fillStyle = "black";
	ctx4.lineWidth = 5;
	drawLineNoCached(ctx4, graph4, 0, 3);

	approximateArea = truncate(approximateArea, 5);

	var diff = 11.793940 - approximateArea;
	diff = truncate(diff, 5);

	updateGraph4Labels(approximateArea, diff, numRectangles);

	var r = riemannSum(graph4.graphFunc, 0, 3, numRectangles);
	console.log(11.793940 - r);
}

function updateGraph4Labels(val1, val2, val3)
{
	document.getElementById("label4a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label4b").innerHTML = "Difference: " + val2;
	document.getElementById("label4c").innerHTML = "Number of Rectangles: " + val3;
}


