function integratePdf(pdf)
{
	let numIterations = 1000;
	var sum = 0;
	for (var n = 0; n < numIterations; n++)
	{
		var p = pdf(n / numIterations) / numIterations;
		sum += p;
	}
	return sum;
}

//generates a number with the distribution of the pdf that created the cdf
//passed into this function
function generateRandomNumber(cdf)
{
	var x = Math.random();
	return evaluateInvertedCdf(cdf, x);
}

function generateRandomNumbers(cdf, numSamples, sorted)
{
	var randoms = [];
	for (var n = 0; n < numSamples; n++)
	{
		randoms.push(generateRandomNumber(cdf));
	}

	if (sorted)
	{
		randoms.sort();
	}

	return randoms;
}


function pdf1(x)
{
	return 1.5 * Math.sqrt(x);
}

function pdf2(x)
{
	return 1;
}

function pdf3(x) 
{
	return 3 * x * x;
}

function pdf5(x)
{
	if (x < 0.2 || x > 0.8) 
	{
		return 2.5;
	}
	return 0.0;
}

function uniformPdf(x)
{
	return 1;
}

var uniformCdf = generateCdf(uniformPdf);

function pdf4(x)
{
	return 2 * x;
}

var cdf4 = generateCdf(pdf4);


function generateCdf(pdf)
{
	var numIterations = 1000;
	var cdf = {};
	cdf.points = [];
	var sum = 0;
	for (var n = 0; n < numIterations; n++)
	{
		var x = n / numIterations;
		var y = pdf(x) / (numIterations);
		sum += y;
		var p = {x: x, y: sum};
		cdf.points.push(p);
	}

	if (Math.abs(1.0 - sum) > 0.001)
	{
		console.log("PDF---\n" + pdf.toString() + "\n---is not normalized. It has an area of " + sum.toString() + ".");
	}

	return cdf;
}

function invert(px0, py0, px1, py1, x)
{
	let l = unlerp(py0, py1, x);
	return lerp(px0, px1, l);
}

function evaluateInvertedCdf(cdf, x)
{
	if (x < cdf.points[0].y)
	{	
		return invert(0.0, 0.0, cdf.points[0].x, cdf.points[0].y, x);
	}

	for (var n = 0; n < cdf.points.length - 1; n++)
	{
		if (cdf.points[n].y <= x && cdf.points[n + 1].y > x)
		{
			return invert(cdf.points[n].x, cdf.points[n].y, cdf.points[n + 1].x, cdf.points[n + 1].y, x);
		}
	}

	let l = cdf.points.length - 1;
	return invert(cdf.points[l].x, cdf.points[l].y, 1.0, 1.0, x);
}






