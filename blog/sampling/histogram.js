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