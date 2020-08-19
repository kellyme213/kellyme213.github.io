
var ctx9 = document.getElementById("canvas9").getContext("2d");
var radio9a = document.getElementById("radio9a");
var radio9b = document.getElementById("radio9b");
var radio9c = document.getElementById("radio9c");
var check9a = document.getElementById("check9a");
var check9b = document.getElementById("check9b");
var check9c = document.getElementById("check9c");
var slider9 = document.getElementById("slider9");
var graph9 = createGraphObject(0, 1, 0, 1, 10, 10, 100, 100, 800, 800, undefined);


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