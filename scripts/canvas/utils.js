
function randHalf()
{
	return Math.random() - 0.5;
}

function rand()
{
	return Math.random();
}

function blend(x, y, a)
{
	return (1.0 - a) * x + a * y;
}

let canvasWidth = 1000;