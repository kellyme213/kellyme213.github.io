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

function riemannSum(func, start, end, numRectangles)
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

function sampleFunction(func, start, end, numSamples, pdf, cdf)
{
	var sum = 0;
	for (var n = 0; n < numSamples; n++)
	{
		var r = generateRandomNumber(cdf);
		var x = lerp(start, end, r);
		sum += func(x) / pdf(r);
	}

	return sum * (end - start) / numSamples;
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

function truncate(val, digits)
{
	var x = Math.pow(10, digits);
	return Math.floor(val * x) / x;
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




function generateVarianceForRiemannSum(func, start, end, expectedArea)
{
	var points = [];

	for (var n = 10; n <= 500; n+=10)
	{
		var approximatedArea = riemannSum(func, start, end, n);
		var variance = approximatedArea - expectedArea;
		variance = variance * variance;
		points.push({x: n, y: truncate(variance, 5)});
	}

	return points;
}


function generateVarianceForSampling(func, start, end, expectedArea, pdf, cdf)
{
	var points = [];

	for (var n = 10; n <= 500; n+=10)
	{
		var histogram = generateErrorHistogramForFunction(
			func, 
			start, 
			end, 
			pdf, 
			cdf, 
			expectedArea, 
			n, 
			500);

		points.push({x: n, y: histogram.variance});
	}

	return points;
}







