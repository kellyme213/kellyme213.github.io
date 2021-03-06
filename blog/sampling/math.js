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

function sampleFunctionStratified(func, start, end, numSamples, numSubdivisions)
{
	var sum = 0;
	var randoms = generateStratifiedNumbers(numSamples, numSubdivisions);
	for (var n = 0; n < randoms.length; n++)
	{
		var x = lerp(start, end, randoms[n]);
		sum += func(x);
	}

	return sum * (end - start) / randoms.length;
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


	for (var n = 1; n < 10; n++)
	{
		var approximatedArea = riemannSum(func, start, end, n);
		var variance = approximatedArea - expectedArea;
		variance = variance * variance;
		points.push({x: n, y: truncate(variance, 5)});
	}

	return points;

	for (var n = 10; n <= 200; n+=10)
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

	for (var n = 1; n < 10; n++)
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

	for (var n = 10; n <= 200; n+=10)
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

function generateVarianceForStratified(func, start, end, expectedArea)
{
	var points = [];

	for (var n = 1; n <= 9; n+=1)
	{
		var numIterations = 500;
		var variance = 0;
		for (var m = 0; m < numIterations; m++)
		{
			var approximatedArea = sampleFunctionStratified(func, start, end, n, 10);
			var diff = expectedArea - approximatedArea;
			variance += (1.0 / numIterations) * diff * diff;
		}
		points.push({x: n, y: truncate(variance, 5)});
	}

	return points;
}



function generateRandomPoints(numPoints)
{
	var points = [];

	for (var n = 0; n < numPoints; n++)
	{
		var p = {x: Math.random(), y: Math.random()};
		points.push(p);
	}

	return points;
}

function generateStratifiedPoints(numPoints, numSubdivisions)
{
	var pointsPerBlock = Math.floor(numPoints / (numSubdivisions * numSubdivisions));
	var points = [];

	for (var n = 0; n < numSubdivisions; n++)
	{
		for (var m = 0; m < numSubdivisions; m++)
		{
			for (var o = 0; o < pointsPerBlock; o++)
			{
				var p = {x: (n + Math.random()) / numSubdivisions, y: (m + Math.random()) / numSubdivisions};
				points.push(p);
			}
		}
	}

	return points;
}

function generateStratifiedNumbers(numPoints, numSubdivisions)
{
	var pointsPerBlock = Math.floor(numPoints / (numSubdivisions));
 	var points = [];

	for (var n = 0; n < numSubdivisions; n++)
	{
		for (var m = 0; m < pointsPerBlock; m++)
		{
			points.push((n + Math.random()) / numSubdivisions);
		}
	}

	return points;
}


function generatePercentGraphPoint(func, start, end, expectedArea, pdf, cdf, numSamples, numIterations)
{
	var riemannError = Math.abs(riemannSum(func, start, end, numSamples) - expectedArea);
	var numSmaller = 0;
	for (var y = 0; y < numIterations; y++)
	{
		var randomError = Math.abs(sampleFunction(func, start, end, numSamples, pdf, cdf) - expectedArea);
		//var randomError = Math.abs(sampleFunctionStratified(func, start, end, numSamples, 10) - expectedArea);
		if (randomError <= riemannError)
		{
			numSmaller++;
		}
	}
	return {x: numSamples, y: truncate(numSmaller / numIterations, 5)};
}

function generatePercentGraph(func, start, end, expectedArea, pdf, cdf)
{
	var points = [];

	var numIterations = 500;
	for (var x = 1; x < 10; x++)
	{	
		var p = generatePercentGraphPoint(func, start, end, expectedArea, pdf, cdf, x, numIterations);
		points.push(p);
	}

	for (var x = 10; x <= 200; x+=10)
	{
		var p = generatePercentGraphPoint(func, start, end, expectedArea, pdf, cdf, x, numIterations);
		points.push(p);
	}
	
	return points;
}











