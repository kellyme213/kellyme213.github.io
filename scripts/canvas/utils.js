
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

function randRange(x, y)
{
	return blend(x, y, rand());
}

function drawShape(x, y, t, s, n, ctx)
{
	for (var m = 0; m < n + 1; m++)
	{
		let a = m / n * 6.28
		if (m == 0)
		{
			ctx.beginPath();
			ctx.moveTo(x + 2.0 * s * Math.cos(t + a), y + 2.0 * s * Math.sin(t + a))
		}
		else
		{
			ctx.lineTo(x + 2.0 * s * Math.cos(t + a), y + 2.0 * s * Math.sin(t + a));
		}
	}
	ctx.stroke();
}

function getTime()
{
	return (new Date()).valueOf();
}

let canvasWidth = 1000;