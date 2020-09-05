
var ctx1 = document.getElementById("canvas1").getContext("2d");
var slider1 = document.getElementById("slider1");
var graph1 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction1);


slider1.oninput = function()
{
	updateGraph1();
}

function updateGraph1()
{
	var numRectangles = Math.floor(slider1.value);

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
	document.getElementById("label1b").innerHTML = "Error: " + val2;
	document.getElementById("label1c").innerHTML = "Number of Rectangles: " + val3;
}