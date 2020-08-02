



var obj = createGraphObject(0, 1, 0, 10, 5, 2, 100, 400, 1000, 500, pdf2);
cacheGraphPoints(obj, 50, 0, 1);
calculateArea(obj, 0, 1);
//integrate(obj);
var c = document.getElementById("canvas0").getContext("2d");

//console.log("pdf " + integratePdf(pdf3));

var cdf1 = generateCdf(pdf1);
var histo = generateHistogramForCdf(cdf1);






var ctx1 = document.getElementById("canvas1").getContext("2d");
var slider1 = document.getElementById("slider1");
var graph1 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction1);


var ctx2 = document.getElementById("canvas2").getContext("2d");
var slider2 = document.getElementById("slider2");
var button2 = document.getElementById("button2");
var check2 = document.getElementById("check2");
var graph2 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction2);


window.onload = function() {
	c.font = '50px Montserrat';
	c.canvasHeight = 1000;
	drawGraphLines(c, obj);
	//drawLine(c, obj);
	//drawPoints(c, obj);
	drawHistogram(c, obj, histo);
	//drawRectangles(c, obj, true);



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

};

slider1.oninput = function()
{
	var numRectangles = Math.floor(this.value);

	ctx1.clearRect(0, 0, 1000, 1000);
	ctx1.strokeStyle = "black";
	ctx1.fillStyle = "black";

	drawGraphLines(ctx1, graph1);

	ctx1.lineWidth = 5;
	drawLineNoCached(ctx1, graph1, 0, 1);

	ctx1.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx1.lineWidth = 5;
	ctx1.strokeStyle = "red";
	drawIntegralRectangles(ctx1, graph1, numRectangles, 0, 1);

	var approximateArea = approximateIntegral(graph1.graphFunc, 0, 1, numRectangles);
	approximateArea = Math.floor(approximateArea * 10000) / 10000;

	var diff = 1.0 - approximateArea;
	diff = Math.floor(diff * 10000) / 10000;

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

function updateGraph2()
{
	var numRectangles = Math.floor(slider2.value);
	var flag = check2.checked;

	ctx2.clearRect(0, 0, 1000, 1000);
	ctx2.strokeStyle = "black";
	ctx2.fillStyle = "black";

	drawGraphLines(ctx2, graph2);

	ctx2.lineWidth = 5;
	drawLineNoCached(ctx2, graph2, 0, 1);

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

	approximateArea = Math.floor(approximateArea * 10000) / 10000;

	var diff = 1.0 - approximateArea;
	diff = Math.floor(diff * 10000) / 10000;

	updateGraph2Labels(approximateArea, diff, numRectangles);
}

function updateGraph2Labels(val1, val2, val3)
{
	document.getElementById("label2a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label2b").innerHTML = "Difference: " + val2;
	document.getElementById("label2c").innerHTML = "Number of Rectangles: " + val3;
}






