var ctx4 = document.getElementById("canvas4").getContext("2d");
var slider4 = document.getElementById("slider4");
var button4 = document.getElementById("button4");
var check4 = document.getElementById("check4");
var graph4 = createGraphObject(0, 3, 0, 9, 2, 6, 100, 100, 800, 800, graphFunction4);

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