




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
var check5a = document.getElementById("check5a");
var check5b = document.getElementById("check5b");
var slider5 = document.getElementById("slider5");
var graph5 = createGraphObject(0, 500, 0, 0.1, 2, 6, 150, 100, 800, 800, undefined);

var ctx6 = document.getElementById("canvas6").getContext("2d");
var radio6a = document.getElementById("radio6a");
var radio6b = document.getElementById("radio6b");
var button6 = document.getElementById("button6");
var graph6 = createGraphObject(0, 1.0, 0, 1.0, 10, 10, 100, 100, 800, 800, undefined);


var ctx7 = document.getElementById("canvas7").getContext("2d");
var radio7a = document.getElementById("radio7a");
var radio7b = document.getElementById("radio7b");
var radio7c = document.getElementById("radio7c");
var slider7 = document.getElementById("slider7");
var button7 = document.getElementById("button7");
var graph7 = createGraphObject(0, 10, 0, 10, 10, 10, 100, 100, 800, 800, graphFunction7);

var ctx8 = document.getElementById("canvas8").getContext("2d");
var graph8 = createGraphObject(0, 50, 0, 200, 2, 6, 120, 100, 800, 800, undefined);


var ctx9 = document.getElementById("canvas9").getContext("2d");
var radio9a = document.getElementById("radio9a");
var radio9b = document.getElementById("radio9b");
var radio9c = document.getElementById("radio9c");
var check9a = document.getElementById("check9a");
var check9b = document.getElementById("check9b");
var check9c = document.getElementById("check9c");
var slider9 = document.getElementById("slider9");
var graph9 = createGraphObject(0, 1, 0, 1, 10, 10, 100, 100, 800, 800, undefined);


window.onload = function() {


	initializeContext(ctx1, graph1);
	ctx1.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx1.strokeStyle = "red";
	drawIntegralRectangles(ctx1, graph1, 10, 0, 1);
	ctx1.strokeStyle = "black";
	ctx1.fillStyle = "black";
	drawLineNoCached(ctx1, graph1, 0, 1);
	updateGraph1Labels(0.855, 0.145, 10);


	initializeContext(ctx2, graph2);
	drawLineNoCached(ctx2, graph2, 0, 1);
	updateGraph2();


	initializeContext(ctx3, graph3);
	//updateGraph3();


	initializeContext(ctx4, graph4);
	drawLineNoCached(ctx4, graph4, 0, 3);


	initializeContext(ctx5, graph5);
	check5a.checked = true;
	check5b.checked = true;
	ctx5.d2.x = -50;
	updateGraph5();

	initializeContext(ctx6, graph6);
	radio6a.checked = true;
	updateGraph6();

	initializeContext(ctx7, graph7);
	radio7a.checked = true;
	updateGraph7();

	//var n = 10000;
	//console.log(riemannSum(graphFunction7, 0, 10, n));
	//console.log(sampleFunctionStratified(graphFunction7, 0, 10, n, 10));
	//console.log(generateVarianceForRiemannSum(graphFunction4, 0, 3, 11.793940));
	//console.log(generateVarianceForSampling(graphFunction4, 0, 3, 11.793940, pdf4, cdf4));


	//console.log(generateVarianceForRiemannSum(graphFunction7, 0, 10, 18.11364));
	//console.log(generateVarianceForSampling(graphFunction7, 0, 10, 18.11364, uniformPdf, uniformCdf));
	//console.log(generateVarianceForStratified(graphFunction7, 0, 10, 18.11364));

	initializeContext(ctx8, graph8);
	ctx8.lineWidth = 3;
	ctx8.strokeStyle = "red";
	graph8.graphPoints = constant5;
	drawLineCached(ctx8, graph8);
	ctx8.strokeStyle = "blue";
	graph8.graphPoints = constant6;
	drawLineCached(ctx8, graph8);
	ctx8.strokeStyle = "green";
	graph8.graphPoints = constant7;
	drawLineCached(ctx8, graph8);



	initializeContext(ctx9, graph9);
	radio9a.checked = true;
	check9a.checked = true;
	//check9b.checked = true;
	//check9c.checked = true;
	updateGraph9();


};


function initializeContext(ctx, graph)
{
	ctx.font = '50px Montserrat';
	ctx.canvasHeight = 1000;
	ctx.d1 = {x: 0, y: 0};
	ctx.d2 = {x: 0, y: 0};
	ctx.d3 = {x: 0, y: 0};
	ctx.d4 = {x: 0, y: 0};
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

slider5.oninput = function() 
{
	updateGraph5();
}

check5a.onclick = function()
{
	updateGraph5();
}

check5b.onclick = function()
{
	updateGraph5();
}

button6.onclick = function()
{
	updateGraph6();
}

slider6.oninput = function() 
{
	updateGraph6();
}

radio6a.onclick = function()
{
	updateGraph6();
}

radio6b.onclick = function()
{
	updateGraph6();
}

slider7.oninput = function() 
{
	updateGraph7();
}

radio7a.onclick = function()
{
	updateGraph7();
}

radio7b.onclick = function()
{
	updateGraph7();
}

radio7c.onclick = function()
{
	updateGraph7();
}

check7.onclick = function()
{
	updateGraph7();
}

button7.onclick = function()
{
	updateGraph7();
}



radio9a.onclick = function()
{
	updateGraph9();
}

radio9b.onclick = function()
{
	updateGraph9();
}

radio9c.onclick = function()
{
	updateGraph9();
}

check9a.onclick = function()
{
	updateGraph9();
}

check9b.onclick = function()
{
	updateGraph9();
}

check9c.onclick = function()
{
	updateGraph9();
}

slider9.oninput = function() 
{
	updateGraph9();
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


function updateGraph5()
{
	graph5.yMax = slider5.value;
	ctx5.clearRect(0, 0, 1000, 1000);
	ctx5.strokeStyle = "black";
	ctx5.fillStyle = "black";
	ctx5.lineWidth = 5;
	drawGraphLines(ctx5, graph5);

	if (check5a.checked)
	{
		ctx5.lineWidth = 5;
		ctx5.strokeStyle = "red";
		graph5.graphPoints = constant1;
		drawLineCached(ctx5, graph5);
	}

	if (check5b.checked)
	{
		ctx5.lineWidth = 5;
		ctx5.strokeStyle = "blue";
		graph5.graphPoints = constant2;
		drawLineCached(ctx5, graph5);
	}
}

function updateGraph6()
{
	ctx6.clearRect(0, 0, 1000, 1000);
	ctx6.strokeStyle = "black";
	ctx6.fillStyle = "black";
	ctx6.lineWidth = 5;
	drawGraphLines(ctx6, graph6);

	ctx6.strokeStyle = "rgb(255, 0, 0)";
	ctx6.fillStyle = "rgba(255, 0, 0, 0.6)";

	var numSamples = Math.floor(slider6.value);

	if (radio6a.checked)
	{
		graph6.graphPoints = generateStratifiedPoints(numSamples, 10);
	}
	else
	{	
	 	graph6.graphPoints = generateRandomPoints(numSamples);
	}

	drawPoints(ctx6, graph6);


	// var variance = 0;

	// for (var n = 0; n < graph6.graphPoints.length; n++)
	// {
	// 	var p = graph6.graphPoints[n];
	// 	variance += Math.sqrt(Math.pow(0.5 - p.x, 2) + Math.pow(0.5 - p.y, 2));
	// }

	// variance /= graph6.graphPoints.length;

	// console.log(variance);



	updateGraph6Labels(graph6.graphPoints.length);
}

function updateGraph6Labels(val1)
{
	document.getElementById("label6a").innerHTML = "Number of samples: " + val1;
}


function updateGraph7()
{
	ctx7.clearRect(0, 0, 1000, 1000);
	ctx7.strokeStyle = "black";
	ctx7.fillStyle = "black";
	ctx7.lineWidth = 5;
	drawGraphLines(ctx7, graph7);


	var numRectangles = Math.floor(slider7.value);
	var flag = check7.checked;
	ctx7.strokeStyle = "black";
	ctx7.fillStyle = "black";
	ctx7.lineWidth = 2;
	drawLineNoCached(ctx7, graph7, 0, 10);

	var numSamples = numRectangles;
	var approximateArea = 0;

	if (radio7a.checked)
	{
		ctx7.lineWidth = 5;
		approximateArea = drawIntegralRectanglesStratified(
			ctx7, 
			graph7, 
			numRectangles, 
			0, 
			10, 
			10, 
			flag,
			colorFunction2);

		numSamples = Math.floor(numRectangles / 10) * 10;
	}
	else if (radio7b.checked)
	{
		ctx7.lineWidth = 5;
		approximateArea = drawIntegralRectanglesSampled(
			ctx7, 
			graph7, 
			numRectangles, 
			0, 
			10, 
			uniformPdf, 
			uniformCdf, 
			flag,
			colorFunction2);
	}
	else
	{
		ctx7.strokeStyle = "rgb(255, 0, 0)";
		ctx7.fillStyle = "rgba(255, 0, 0, 0.7)";
		drawIntegralRectangles(ctx7, graph7, numRectangles, 0, 10);
		
		approximateArea = riemannSum(graph7.graphFunc, 0, 10, numRectangles);
	}

	var exactArea = 18.11364;
	var diff = approximateArea - exactArea;

	approximateArea = truncate(approximateArea, 5);
	diff = truncate(diff, 5);



	updateGraph7Labels(approximateArea, diff, numSamples);
}

function updateGraph7Labels(val1, val2, val3)
{
	document.getElementById("label7a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label7b").innerHTML = "Difference: " + val2;
	document.getElementById("label7c").innerHTML = "Number of samples: " + val3;
}




function updateGraph9()
{
	ctx9.clearRect(0, 0, 1000, 1000);

	var pdf;
	var cdf;
	if (radio9a.checked)
	{
		pdf = uniformPdf;
		cdf = uniformCdf;
		graph9.yMax = 1;
	}
	else if (radio9b.checked)
	{
		pdf = pdf4;
		cdf = cdf4;
		graph9.yMax = 2;
	}
	else if (radio9c.checked)
	{
		pdf = pdf5;
		cdf = cdf5;
		graph9.yMax = 2.5;
	}

	if (check9b.checked || check9c.checked)
	{
		graph9.yMax = 1;
	}

	ctx9.strokeStyle = "black";
	ctx9.fillStyle = "black";
	drawGraphLines(ctx9, graph9);

	ctx9.lineWidth = 5;

	if (check9a.checked)
	{
		ctx9.strokeStyle = "red";
		graph9.graphFunc = pdf;
		drawLineNoCached(ctx9, graph9, 0, 1);
	}

	if (check9b.checked)
	{
		ctx9.strokeStyle = "blue";
		graph9.graphPoints = cdf.points;
		drawLineCached(ctx9, graph9);
	}

	var numPoints = Math.floor(slider9.value);
	if (check9c.checked)
	{

		for (var n = 1; n <= numPoints; n++)
		{
			var y = lerp(0, 1, n / numPoints);
			var r = lerp(255, 0, n / numPoints);
			var b = lerp(0, 255, n / numPoints);

			ctx9.strokeStyle = "rgb(" + r + ", 0, " + b + ")";
			ctx9.fillStyle = "rgba(" + r + ", 0, " + b + ", 1.0)";

			drawPoint(ctx9, graph9, 0, y, 10);

			var x = evaluateInvertedCdf(cdf, y);

			drawPoint(ctx9, graph9, x, 0, 10);

			ctx9.strokeStyle = "rgba(" + r + ", 0, " + b + ", 1.0)";
			ctx9.lineWidth = 3;
			var points = [];
			points.push({x: x, y: 0});
			points.push({x: x, y: y});
			points.push({x: 0, y: y});
			graph9.graphPoints = points;
			drawLineCached(ctx9, graph9);
		}
	}

	updateGraph9Labels(numPoints);
}

function updateGraph9Labels(val1)
{
	document.getElementById("label9a").innerHTML = "Number of Points: " + val1;
}










