function calculateArea(graphObj, start, end)
{
	var sum = 0;
	for (var n = 0; n < 1000; n++)
	{
		var x = lerp(start, end, n / 1000.0);
		var y = graphObj.graphFunc(x);
		sum += y / 1000;
	}
	graphObj.area = sum * (end - start);
}

function approximateIntegral(func, start, end, numRectangles)
{
	var sum = 0;
	for (var n = 0; n < numRectangles; n++)
	{
		var x = lerp(start, end, n / numRectangles);
		var y = func(x);
		sum += y / numRectangles;
	}
	return sum * (end - start);
}

function integrate(graphObj)
{
	var sum = 0;
	for (var n = 0; n < graphObj.graphPoints.length; n++)
	{
		sum += graphObj.graphPoints[n].y * graphObj.rectWidths[n];
	}

	console.log(graphObj.area - sum);
}

function lerp(a, b, t)
{
	return a + (b - a) * t;
}

function unlerp(a, b, c)
{
	return (c - a) / (b - a);
}

function randomNumbers(n)
{
	var cdf = generateCdf(pdf4);
	var array = [];
	for (var x = 0; x < n; x++)
	{
		array.push(generateRandomNumber(cdf));
	}
	array.sort();
	return array;
}