var ctx4 = document.getElementById("canvas4").getContext("2d");
var slider4 = document.getElementById("slider4");
var button4 = document.getElementById("button4");
var check4 = document.getElementById("check4");
var check4a = document.getElementById("check4a");
var check4b = document.getElementById("check4b");
var radio4a = document.getElementById("radio4a");
var radio4b = document.getElementById("radio4b");
var radio4c = document.getElementById("radio4c");
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

check4a.onclick = function()
{
	updateGraph4();
}

check4b.onclick = function()
{
	updateGraph4();
}

radio4a.onclick = function()
{
	updateGraph4();
}

radio4b.onclick = function()
{
	updateGraph4();
}

radio4c.onclick = function()
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

	graph4.graphFunc = graphFunction4;

	var pdf = uniformPdf;
	var cdf = uniformCdf;

	if (radio4a.checked)
	{
		pdf = uniformPdf;
		cdf = uniformCdf;
	}
	if (radio4b.checked)
	{
		pdf = pdf4;
		cdf = cdf4;
	}
	if (radio4c.checked)
	{
		pdf = pdf5;
		cdf = cdf5;
	}



	ctx4.lineWidth = 5;
	var approximateArea = drawIntegralRectanglesSampled(
		ctx4, 
		graph4, 
		numRectangles, 
		0, 
		3, 
		pdf, 
		cdf, 
		flag,
		colorFunction2);

	if (check4b.checked)
	{
		ctx4.strokeStyle = "black";
		ctx4.fillStyle = "black";
		ctx4.lineWidth = 5;
		drawLineNoCached(ctx4, graph4, 0, 3);
	}

	if (check4a.checked)
	{
		ctx4.strokeStyle = "blue";
		ctx4.fillStyle = "blue";
		ctx4.lineWidth = 5;
		graph4.graphFunc = pdf;
		graph4.xMax = 1;
		drawLineNoCached(ctx4, graph4, 0, 1);
		graph4.xMax = 3;
	}


	approximateArea = truncate(approximateArea, 5);

	var diff = 11.793940 - approximateArea;
	diff = truncate(diff, 5);

	updateGraph4Labels(approximateArea, diff, numRectangles);

	var r = riemannSum(graph4.graphFunc, 0, 3, numRectangles);
	//console.log(11.793940 - r);
}

function updateGraph4Labels(val1, val2, val3)
{
	document.getElementById("label4a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label4b").innerHTML = "Difference: " + val2;
	document.getElementById("label4c").innerHTML = "Number of Rectangles: " + val3;
}