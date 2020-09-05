
var ctx2 = document.getElementById("canvas2").getContext("2d");
var slider2 = document.getElementById("slider2");
var button2 = document.getElementById("button2");
var check2 = document.getElementById("check2");
var graph2 = createGraphObject(0, 1, 0, 3, 2, 6, 100, 100, 800, 800, graphFunction2);

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

	var r = truncate(1.0 - truncate(riemannSum(graphFunction1, 0, 1, numRectangles), 5), 5);

	updateGraph2Labels(approximateArea, diff, numRectangles, r);
}

function updateGraph2Labels(val1, val2, val3, val4)
{
	document.getElementById("label2a").innerHTML = "Approximated Area: " + val1;
	document.getElementById("label2b").innerHTML = "Error: " + val2;
	document.getElementById("label2c").innerHTML = "Number of Samples: " + val3;
	document.getElementById("label2d").innerHTML = "Riemann Sum Error: " + val4;
}


