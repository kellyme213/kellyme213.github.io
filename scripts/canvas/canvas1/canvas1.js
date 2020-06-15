setInterval(draw1, 50);

function draw1()
{
	var ctx = document.getElementById("canvas1").getContext("2d");
	var numLines = 20;

	ctx.fillStyle = "black";

	for (var x = 0; x < 10; x++)
	{
		var a1 = rand() * 1.0;
		var a2 = rand() * 1.0;
		var a3 = rand() * 0.2;
		var a4 = rand() * 0.2;

		ctx.fillRect(canvasWidth * a1, canvasWidth * a2, canvasWidth * a3, canvasWidth * a4);
	}

	var a5 = 2 * randHalf();
	var a6 = 2 * randHalf();
	var a7 = 2 * randHalf();
	var a8 = 2 * randHalf();

	var gradient = ctx.createLinearGradient(canvasWidth * a5, canvasWidth * a6, canvasWidth * a7, canvasWidth * a8);
	gradient.addColorStop("0", "blue");
	gradient.addColorStop("0.5" ,"blue");
	gradient.addColorStop("1.0", "red");
	ctx.lineWidth = 2;
	ctx.strokeStyle = gradient;

	var k = (canvasWidth / numLines);

	for (var x = 0; x < numLines; x++)
	{
		var r1 = randHalf() * (2 * k);
		var r2 = randHalf() * (2 * k);
		var r3 = randHalf() * (2 * k);
		var r4 = randHalf() * (2 * k);

		ctx.beginPath();
		ctx.moveTo(0, k * x + r1);
		ctx.lineTo(canvasWidth, k * x + r2);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(k * x + r3, 0);
		ctx.lineTo(k * x + r4, canvasWidth);
		ctx.stroke();
	}

	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.lineWidth = 3;

	for (var x = 0; x < numLines; x++)
	{
		for (var y = 0; y < numLines; y++)
		{
			var r1 = randHalf() * (0.5 * k);
			var r2 = randHalf() * (0.5 * k);
			var r3 = randHalf() * 10;

			ctx.beginPath();
			ctx.arc(k * x + r1, k * y + r2, 5 + r3, 0, 6.28);
			ctx.stroke();
		}
	}
}