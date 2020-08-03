
var RAND = false;


function cacheGraphPoints(graphObj, numPoints, start, end)
{
	var graphPoints = [];
	var rectWidths = [];

	//var rands = randomNumbers(numPoints);
	for (var n = 0; n < numPoints; n++)
	{
		var x = lerp(start, end, n / numPoints);
		if (RAND)
		{
			x = lerp(start, end, rands[n]);
		}
		var y = graphObj.graphFunc(x);

		graphPoints.push({x: x, y: y});
		rectWidths.push((end - start) / numPoints);
	}

	graphObj.graphPoints = graphPoints;
	graphObj.rectWidths = rectWidths;
}


function graphFunction1(x)
{
	return 3 * x * x;
}

function graphFunction2(x)
{
	return 3 * x * x;
}

function graphFunction4(x)
{
	return 2 * x * (1.0 + 0.2 * Math.cos(x * x * 100));
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
}

function drawLine(ctx, graphObj, useCachedPoints, start, end)
{
	if (ctx.canvasHeight === undefined)
	{
		console.log("canvasHeight not set.");
	}

	var numPoints = 100;
	if (useCachedPoints)
	{
		numPoints = graphObj.graphPoints.length;
	}

	ctx.beginPath();
	for (var n = 0; n < numPoints; n++)
	{
		var x = 0;
		var y = 0;

		if (useCachedPoints)
		{
			x = graphObj.graphPoints[n].x;
			y = graphObj.graphPoints[n].y;
		}
		else
		{
			x = lerp(start, end, n / numPoints);
			y = graphObj.graphFunc(x);
		}
		if (n == 0)
		{
			moveTo(ctx, graphObj, x, y);
		}
		else
		{
			lineTo(ctx, graphObj, x, y);
		}
	}

	ctx.stroke();
}

function drawLineNoCached(ctx, graphObj, start, end)
{
	drawLine(ctx, graphObj, false, start, end);
}

function drawLineCached(ctx, graphObj)
{
	drawLine(ctx, graphObj, true, 0, 0);
}

function drawRectangle(ctx, graphObj, x, y, w)
{
	ctx.beginPath();
	moveTo(ctx, graphObj, x, y);
	lineTo(ctx, graphObj, x + w, y);
	lineTo(ctx, graphObj, x + w, 0);
	lineTo(ctx, graphObj, x, 0);
	lineTo(ctx, graphObj, x, y);
	ctx.fill();
	ctx.stroke();
}

function drawRectangles(ctx, graphObj, flag)
{
	if (ctx.canvasHeight === undefined)
	{
		console.log("canvasHeight not set.");
	}
	
	if (flag)
	{
		var xVal = graphObj.graphPoints[0].x;
		for (var n = 0; n < graphObj.graphPoints.length; n++)
		{
			drawRectangle(
				ctx, 
				graphObj, 
				xVal, 
				graphObj.graphPoints[n].y, 
				graphObj.rectWidths[n]);
			xVal += graphObj.rectWidths[n];
		}
	}
	else
	{
		for (var n = 0; n < graphObj.graphPoints.length; n++)
		{
			drawRectangle(
				ctx,
				graphObj, 
				graphObj.graphPoints[n].x, 
				graphObj.graphPoints[n].y, 
				graphObj.rectWidths[n]);
		}
	}
}

function drawIntegralRectangles(ctx, graphObj, numRectangles, start, end)
{
	if (ctx.canvasHeight === undefined)
	{
		console.log("canvasHeight not set.");
	}
	
	for (var n = 0; n < numRectangles; n++)
	{
		drawRectangle(
			ctx, 
			graphObj, 
			n / numRectangles, 
			graphObj.graphFunc(lerp(start, end, n / numRectangles)), 
			1.0 / numRectangles);
	}
}

function drawIntegralRectanglesSampled(ctx, graphObj, numRectangles, start, end, pdf, cdf, flag, colorFunction)
{
	var randoms = generateRandomNumbers(cdf, numRectangles, flag);
	var sum = 0;

	var xVal = 0;

	for (var n = 0; n < numRectangles; n++)
	{
		var x = lerp(start, end, randoms[n]);
		var y = graphObj.graphFunc(x);
		var p = pdf(randoms[n]);
		var w = (1.0 / numRectangles) * (1.0 / p) * (end - start);

		colorFunction(ctx, x, y, p, flag);
		if (flag)
		{
			drawRectangle(ctx, graphObj, xVal, y, w);
			xVal += w;
		}
		else
		{
			drawRectangle(ctx, graphObj, x, y, w);
		}
		sum += y * w;
	}

	return sum;
}

function colorFunction2(ctx, x, y, pdf, flag)
{
	if (!flag)
	{
		ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
	}
	else
	{
		ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
	}
	ctx.strokeStyle = "rgb(255, 0, 0)";
}

function colorFunction22(ctx, x, y, pdf, flag)
{
	var p = (Math.min(pdf / 4.0, 1.0));
	var r = lerp(255, 150, p);
	var b = lerp(0, 255, p);

	if (!flag)
	{
		ctx.fillStyle = "rgba(" + r + ", 0, " + b + ", 0.3)";
	}
	else
	{
		ctx.fillStyle = "rgba(" + r + ", 0, " + b + ", 0.7)";
	}
	ctx.strokeStyle = "rgb(" + r + ", 0, " + b + ")";
}

function drawPoints(ctx, graphObj)
{
	for (var n = 0; n < graphObj.graphPoints.length; n++)
	{
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

function drawHistogram(ctx, graphObj, histogram)
{
	var currentYMax = graphObj.yMax;
	var currentXMax = graphObj.xMax;
	var currentXMin = graphObj.xMin;

	graphObj.yMax = histogram.maxBucketValue;
	graphObj.xMax = 1.0;
	graphObj.xMin = 0.0;

	for (var n = 0; n < histogram.buckets.length; n++)
	{
		drawRectangle(
			ctx, 
			graphObj, 
			n / histogram.buckets.length, 
			histogram.buckets[n], 
			1.0 / histogram.buckets.length);
	}

	graphObj.yMax = currentYMax;
	graphObj.xMax = currentXMax;
	graphObj.xMin = currentXMin;
}













