

var obj = createGraphObject(0, 10, 0, 50, 5, 2, 100, 400, 500, 500, graphFunction1);
cacheGraphPoints(obj, 10, 0, 10);
var c = document.getElementById("canvas1").getContext("2d");

window.onload = function() {
	c.font = '50px Montserrat';
	c.canvasHeight = 1000;
	drawGraphLines(c, obj);
};


function cacheGraphPoints(graphObj, numPoints, start, end)
{
	var graphPoints = [];
	var rectWidths = [];

	for (var n = 0; n < numPoints; n++)
	{
		var x = lerp(start, end, n / numPoints);
		var y = graphObj.graphFunc(x);

		graphPoints.push({x: x, y: y});
		rectWidths.push((end - start) / numPoints);
	}

	graphObj.graphPoints = graphPoints;
	graphObj.rectWidths = rectWidths;
}


function graphFunction1(x)
{
	return - x * x + 40;
}



function createGraphObject(xMin, xMax, yMin, yMax, xStep, yStep, graphX, graphY, graphWidth, graphHeight, graphFunc)
{
	var graph = {};
	graph.xMin = xMin;
	graph.xMax = xMax;
	graph.yMin = yMin;
	graph.yMax = yMax;
	graph.xStep = xStep;
	graph.yStep = yStep;
	graph.graphX = graphX;
	graph.graphY = graphY;
	graph.graphWidth = graphWidth;
	graph.graphHeight = graphHeight;
	graph.graphFunc = graphFunc;

	return graph;
}

function lerp(a, b, t)
{
	return a + (b - a) * t;
}

function unlerp(a, b, c)
{
	return (c - a) / (b - a);
}

function moveTo(ctx, graphObj, x, y)
{
	var tx = unlerp(graphObj.xMin, graphObj.xMax, x);
	var ty = unlerp(graphObj.yMin, graphObj.yMax, y);
	ctx.moveTo(tx * graphObj.graphWidth + graphObj.graphX, 
				ctx.canvasHeight - (ty * graphObj.graphHeight + graphObj.graphY));
}

function lineTo(ctx, graphObj, x, y)
{
	var tx = unlerp(graphObj.xMin, graphObj.xMax, x);
	var ty = unlerp(graphObj.yMin, graphObj.yMax, y);
	ctx.lineTo(tx * graphObj.graphWidth + graphObj.graphX, 
				ctx.canvasHeight - (ty * graphObj.graphHeight + graphObj.graphY));
}

function drawGraphLines(ctx, graphObj)
{
	ctx.strokeStyle = "black";
	ctx.lineWidth = 5;

	ctx.beginPath();
	moveTo(ctx, graphObj, graphObj.xMin, graphObj.yMin);
	lineTo(ctx, graphObj, graphObj.xMax, graphObj.yMin);
	ctx.stroke();

	ctx.beginPath();
	moveTo(ctx, graphObj, graphObj.xMin, graphObj.yMin);
	lineTo(ctx, graphObj, graphObj.xMin, graphObj.yMax);
	ctx.stroke();

	ctx.lineWidth = 1;

	for (var x = 0; x < graphObj.xStep; x++)
	{
		var l = lerp(graphObj.xMin, graphObj.xMax, (x / graphObj.xStep));
		ctx.beginPath();
		moveTo(ctx, graphObj, l, graphObj.yMin);
		lineTo(ctx, graphObj, l, graphObj.yMax);
		ctx.stroke();
	}

	for (var y = 0; y < graphObj.yStep; y++)
	{
		var l = lerp(graphObj.yMin, graphObj.yMax, (y / graphObj.yStep));
		ctx.beginPath();
		moveTo(ctx, graphObj, graphObj.xMin, l);
		lineTo(ctx, graphObj, graphObj.xMax, l);
		ctx.stroke();
	}

	ctx.textAlign = "left";
	ctx.fillText(
		graphObj.xMin.toString(), 
		graphObj.graphX, 
		ctx.canvasHeight - graphObj.graphY + 50);

	ctx.fillText(
		graphObj.xMax.toString(), 
		graphObj.graphX + graphObj.graphWidth, 
		ctx.canvasHeight - graphObj.graphY + 50);


	ctx.textAlign = "right";
	ctx.fillText(
		graphObj.yMin.toString(), 
		graphObj.graphX - 15, 
		ctx.canvasHeight - graphObj.graphY);

	ctx.fillText(
		graphObj.yMax.toString(), 
		graphObj.graphX - 15, 
		ctx.canvasHeight - graphObj.graphY - graphObj.graphHeight);

	drawPoints(ctx, graphObj);
}

function drawRectangle(ctx, graphObj, x, y, w)
{
	ctx.fillStyle = "rgb(255, 100, 100)";
	ctx.lineWidth = 5;
	ctx.strokeStyle = "red";
	ctx.beginPath();
	moveTo(ctx, graphObj, x, y);
	lineTo(ctx, graphObj, x + w, y);
	lineTo(ctx, graphObj, x + w, 0);
	lineTo(ctx, graphObj, x, 0);
	lineTo(ctx, graphObj, x, y);
	ctx.fill();
	ctx.stroke();
}

function drawPoints(ctx, graphObj)
{
	ctx.fillStyle = "red";
	console.log(graphObj.graphPoints);
	for (var n = 0; n < graphObj.graphPoints.length; n++)
	{
		drawRectangle(ctx, graphObj, graphObj.graphPoints[n].x, graphObj.graphPoints[n].y, graphObj.rectWidths[n]);
		drawPoint(ctx, graphObj, graphObj.graphPoints[n].x, graphObj.graphPoints[n].y, 10);
	}
}

function drawPoint(ctx, graphObj, x, y, r)
{
	var tx = unlerp(graphObj.xMin, graphObj.xMax, x);
	var ty = unlerp(graphObj.yMin, graphObj.yMax, y);
	ctx.beginPath();
	ctx.arc(tx * graphObj.graphWidth + graphObj.graphX, 
				ctx.canvasHeight - (ty * graphObj.graphHeight + graphObj.graphY),
				r,
				0,
				6.28);
	ctx.fill();
}













