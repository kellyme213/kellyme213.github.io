function generateHistogramForCdf(cdf)
{
	var numBuckets = 100;
	var numSamples = 100000;


	var maxBucketValue = 0;

	var buckets = Array(numBuckets);
	buckets.fill(0);
	for (var x = 0; x < numSamples; x++)
	{
		var r = generateRandomNumber(cdf);
		var bucket = Math.floor(r * numBuckets);
		buckets[bucket]++;
		maxBucketValue = Math.max(buckets[bucket], maxBucketValue);
	}	

	var histogram = {buckets: buckets, maxBucketValue: maxBucketValue};
	return histogram;
}


function generateErrorHistogramForFunction(func, start, end, pdf, cdf, exactArea, numSamples, numIterations)
{
	var numBuckets = 50;

	var maxBucketValue = 0;
	var buckets = Array(numBuckets);
	var minDiff = 10;
	var maxDiff = -10;
	buckets.fill(0);

	var rSum = riemannSum(func, start, end, numSamples);
	var rDiff = Math.abs(exactArea - rSum);
	var errorBuckets = Array(numBuckets);
	errorBuckets.fill(0);
	var samplesWithinError = 0;
	var variance = 0;

	for (var x = 0; x < numIterations; x++)
	{
		var approximateArea = sampleFunction(func, start, end, numSamples, pdf, cdf);
		var diff = exactArea - approximateArea;

		variance += (1.0 / numIterations) * diff * diff;

		minDiff = Math.min(minDiff, diff);
		maxDiff = Math.max(maxDiff, diff);

		var bucket = Math.floor(0.5 * ((diff / 0.25) + 1.0) * numBuckets);

		if (bucket < 0 || bucket >= numBuckets)
		{
			continue;
		}

		buckets[bucket]++;
		maxBucketValue = Math.max(buckets[bucket], maxBucketValue);


		if (Math.abs(diff) < rDiff)
		{
			errorBuckets[bucket]++;
			samplesWithinError++;
		}
	}	

	minDiff = truncate(minDiff, 5);
	maxDiff = truncate(maxDiff, 5);

	var histogram = {
		buckets: buckets, 
		maxBucketValue: maxBucketValue, 
		minDiff: minDiff, 
		maxDiff: maxDiff, 
		errorBuckets: errorBuckets,
		percent: samplesWithinError / numSamples,
		variance: variance
	};
	return histogram;
}


function generateVarianceGraph(func, start, end, pdf, cdf, exactArea, numSamples)
{
	var points = [];
	for (var n = 10; n <= numSamples; n += 10)
	{
		var histogram = generateErrorHistogramForFunction(func, start, end, pdf, cdf, exactArea, n, 500);
		var p = {x: n, y: 1.0 / histogram.variance};
		points.push(p);
	}
	return points;
}





