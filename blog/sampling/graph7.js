

var ctx7 = document.getElementById("canvas7").getContext("2d");
var radio7a = document.getElementById("radio7a");
var radio7b = document.getElementById("radio7b");
var radio7c = document.getElementById("radio7c");
var slider7 = document.getElementById("slider7");
var button7 = document.getElementById("button7");
var graph7 = createGraphObject(0, 10, 0, 10, 10, 10, 100, 100, 800, 800, graphFunction7);

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
