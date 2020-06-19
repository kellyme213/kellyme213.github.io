setInterval(draw4, 150);

var size1 = 0;
var backColor = 0;
var t = 0.1;

function draw4()
{
	var ctx = document.getElementById("canvas4").getContext("2d");
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 10;

	let N = 8;

	for (var x = 0; x < N; x++)
	{
		for (var y = 0; y < N; y++)
		{
			if (backColor == 0)
			{
				let r = rand() * 50;
				ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
			}
			else
			{
				ctx.fillStyle = "rgb(255, " + Math.floor(rand() * 50 + 205) + ", 0)";
			}

			drawTri((x + 0.5) / N * canvasWidth, (y + 0.5) / N * canvasWidth, 400, 0, ctx, 0, 0);
		}
	}


	for (var x = 0; x < N; x++)
	{
		for (var y = 0; y < N; y++)
		{
			if (backColor == 1)
			{
				let r = rand() * 50;
				ctx.fillStyle = "rgb(" + r + ", " + r + ", " + r + ")";
			}
			else
			{
				ctx.fillStyle = "rgb(255, " + Math.floor(rand() * 50 + 205) + ", 0)";
			}

			let x1 = (x + 0.5 + (2.0 * randHalf())) / N * canvasWidth;
			let y1 = (y + 0.5 + (2.0 * randHalf())) / N * canvasWidth;
			drawTri(x1, y1, size1, 0, ctx, 1, backColor);
		}
	}

	size1 += 2.0 + t;
	t += 0.15;
	if (size1 >= 500)
	{
		size1 = 0;
		if (backColor == 0)
		{
			backColor = 1;
		}
		else
		{
			backColor = 0;
		}
		t = 0;
	}
}

function drawTri(x, y, s, t, ctx, b, b1)
{
	var xx = 0;
	var yy = 0;
	for (var n = 0; n < 6; n++)
	{
		let a = n / 3 * 6.28;

		let r1 = randHalf() * 0.5;
		let r2 = randHalf() * 2.0;

		let x1 = x + r2 * s * Math.cos(t + a + r1);
		let y1 = y + r2 * s * Math.sin(t + a + r1);
		if (n == 0)
		{
			ctx.beginPath();
			ctx.moveTo(x1, y1);
		}
		else
		{
			ctx.lineTo(x1, y1);
		}

		xx += x1;
		yy += y1;
	}
	ctx.fill();

	if (0)//b)
	{
		if (b1)
		{
			ctx.fillStyle = "red";
		}
		else
		{
			ctx.fillStyle = "blue";
		}
		ctx.beginPath();
		ctx.arc(xx / 6, yy / 6, 2, 0, 6.28);
		ctx.fill();
	}

}