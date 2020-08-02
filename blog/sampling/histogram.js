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


function generateErrorHistogramForFunction(func, start, end, pdf, cdf, exactArea, numSamples)
{
	var numBuckets = 50;
	var numIterations = 1000;

	var maxBucketValue = 0;
	var buckets = Array(numBuckets);
	var minDiff = 10;
	var maxDiff = -10;
	buckets.fill(0);
	for (var x = 0; x < numIterations; x++)
	{
		var approximateArea = sampleFunction(func, start, end, numSamples, pdf, cdf);
		var diff = exactArea - approximateArea;

		minDiff = Math.min(minDiff, diff);
		maxDiff = Math.max(maxDiff, diff);

		var bucket = Math.floor(0.5 * ((diff / 0.25) + 1.0) * numBuckets);

		if (bucket < 0 || bucket >= numBuckets)
		{
			continue;
		}

		buckets[bucket]++;
		maxBucketValue = Math.max(buckets[bucket], maxBucketValue);
	}	

	minDiff = truncate(minDiff, 5);
	maxDiff = truncate(maxDiff, 5);

	var histogram = {buckets: buckets, maxBucketValue: maxBucketValue, minDiff: minDiff, maxDiff: maxDiff};
	return histogram;
}






