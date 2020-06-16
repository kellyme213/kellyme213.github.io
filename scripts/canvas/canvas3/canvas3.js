setInterval(draw3, 150);

function draw3()
{
	var ctx = document.getElementById("canvas3").getContext("2d");
	ctx.fillStyle = "rgb(245, 245, 255)";
	ctx.fillRect(0, 0, canvasWidth, canvasWidth);


	for (var x = 0; x < 4; x++)
	{
		for (var y = 0; y < 4; y++)
		{
			var x1 = x + 1;
			var y1 = y;
			var a = 1.0;

			if (x % 2 == 0)
			{
				y1 += 1;
				a += 3.14;
				x1 -= 1;
			}
			renderArc((x1) / 4.0 * canvasWidth, (y1) / 4.0 * canvasWidth, canvasWidth / 4, a, ctx);

		}
	}

	renderLine(0, 0, canvasWidth, 0, 20, ctx);
	renderLine(canvasWidth, 0, canvasWidth, canvasWidth, 20, ctx);
	renderLine(canvasWidth, canvasWidth, 0, canvasWidth, 20, ctx);
	renderLine(0, canvasWidth, 0, 0, 20, ctx);

	ctx.strokeStyle = "rgb(0, 0, 240)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.moveTo(canvasWidth / 2 - 30 + randHalf() * 2, canvasWidth / 4 + 60);
	ctx.lineTo(canvasWidth / 2 - 25 + randHalf() * 2, canvasWidth / 4 + 90);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(canvasWidth / 2 + 15 + randHalf() * 2, canvasWidth / 4 + 60);
	ctx.lineTo(canvasWidth / 2 + 10 + randHalf() * 2, canvasWidth / 4 + 100);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(canvasWidth / 2 + randHalf() * 2 , 
			canvasWidth / 4 + 100  + randHalf() * 2, 
			50, 
			0.0 + randHalf() * 0.1, 
			2.7 + randHalf() * 0.1);
	ctx.stroke();


}

function renderLine(x1, y1, x2, y2, iters, ctx)
{
	for (var i = 0; i < 3; i++)
	{
		ctx.strokeStyle = "rgb(" + (200 * rand() + 55) + ", 0, 200)";
		ctx.lineWidth = 1;
		for (var n = 0; n < iters + 1; n++)
		{
			let x = blend(x1, x2, n / iters);
			let y = blend(y1, y2, n / iters);

			let d = randHalf() * 50;

			if (n == 0)
			{
				ctx.beginPath();
				ctx.moveTo(x - d, y + d);
			}
			else
			{
				ctx.lineTo(x - d, y + d);
			}
		}

		ctx.stroke();
	}
}



function renderArc(px, py, radius, offsetAngle, ctx)
{
	for (var x = 0; x < 5; x++)
	{
		ctx.strokeStyle = "rgb(0, 255, " + (200 * rand() + 55) + ")";
		ctx.lineWidth = 3;
		var t = 0;
		var r = radius;

		for (var n = 0; t < 1.57; n++)
		{
			t += Math.sqrt(rand());
			r = (randHalf() * 0.01 + 1.0) * radius;
			if (n == 0)
			{
				ctx.beginPath();
				ctx.moveTo(Math.cos(t + offsetAngle) * r + px, Math.sin(t + offsetAngle) * r + py);
			}
			else
			{						
				ctx.lineTo(Math.cos(t + offsetAngle) * r + px, Math.sin(t + offsetAngle) * r + py);
			}
		}

		ctx.stroke();
	}
}








