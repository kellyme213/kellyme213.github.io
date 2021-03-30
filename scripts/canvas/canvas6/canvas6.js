
var lilyPads = [];
var NUM_LILY_PADS = 10;

var pondLines = [];
generateLilyPads();
setInterval(draw6, 16);

function canPlace(x, y)
{
	for (var n = 0; n < lilyPads.length; n++)
	{
		var dx = x - lilyPads[n].x;
		var dy = y - lilyPads[n].y;
		var d = Math.sqrt(dx * dx + dy * dy);
		if (d < 20)
		{
			return false;
		}
	}
	return true;
}

function generateLilyPads()
{
	for (var x = 0; x < NUM_LILY_PADS; x++)
	{
		var o = {};
		for (var n = 0; n < 100; n++)
		{
			o.x = Math.random() * 100;
			o.y = Math.random() * 100;
			if (canPlace(o.x, o.y))
			{
				break;
			}
		}
		var v = Math.random() * 6.28;
		var d = (Math.random() * 4 + 1) * 0.02;
		o.vx = d * Math.cos(v);
		o.vy = d * Math.sin(v);
		o.a = Math.random() * 6.28;
		o.f = Math.random() * (6.28 - 2.0);

		var r = Math.random();

		if (r < 0.2)
		{
			o.c = "rgba(0, 255, 100, 0.0)";
		}
		else if (r < 0.4)
		{
			o.c = "rgb(255, 240, 50)";
		}
		else if (r < 0.8)
		{
			o.c = "rgb(255, 150, 200)";
		}
		else
		{
			o.c = "rgb(255, 255, 200)";
		}


		r = Math.random();

		if (r < 0.2)
		{
			o.lc = "rgb(100, 235, 100)";
		}
		else if (r < 0.4)
		{
			o.lc = "rgb(100, 240, 70)";
		}
		else if (r < 0.8)
		{
			o.lc = "rgb(90, 210, 100)";
		}
		else
		{
			o.lc = "rgb(90, 255, 90)";
		}

		lilyPads.push(o);
	}
}

function createNewLily(n)
{
	for (var i = 0; i < 100; i++)
	{
		var a = Math.random() * 6.28;
		lilyPads[n].x = Math.cos(a) * 75 + 50;
		lilyPads[n].y = Math.sin(a) * 75 + 50;
		if (canPlace(lilyPads[n].x, lilyPads[n].y))
		{
			break;
		}
	}

	var nx = randHalf() * 30 + 50;
	var ny = randHalf() * 30 + 50;

	lilyPads[n].vx = 0.001 * (nx - lilyPads[n].x);
	lilyPads[n].vy = 0.001 * (ny - lilyPads[n].y);
}

function updateLilyVelocity(n, i, j)
{
	var at = Math.atan2(lilyPads[n].y - j, lilyPads[n].x - i);
	createNewPondLine(lilyPads[n].x, lilyPads[n].y, at);
	lilyPads[n].vx *= -1;
	lilyPads[n].vy *= -1;
	lilyPads[n].x += lilyPads[n].vx;
	lilyPads[n].y += lilyPads[n].vy;

	lilyPads[n].vx += randHalf() * 4 * 0.02;
	//lilyPads[n].vy += randHalf() * 2 * 0.02;

	var l = (1.0 / 0.03) * Math.sqrt(lilyPads[n].vx * lilyPads[n].vx + lilyPads[n].vy * lilyPads[n].vy);

	lilyPads[n].vx /= l;
	lilyPads[n].vy /= l;
}

function updateLilyPads()
{
	for (var x = 0; x < NUM_LILY_PADS; x++)
	{
		lilyPads[x].x += lilyPads[x].vx;
		lilyPads[x].y += lilyPads[x].vy;
		lilyPads[x].a += 0.01;
	}

	for (var x = 0; x < NUM_LILY_PADS; x++)
	{
		for (var y = x + 1; y < NUM_LILY_PADS; y++)
		{
			var dx = lilyPads[x].x - lilyPads[y].x;
			var dy = lilyPads[x].y - lilyPads[y].y;
			var d = Math.sqrt(dx * dx + dy * dy);
			if (d < 20 && d > 19)
			{
				var ix = lilyPads[x].x;
				var jx = lilyPads[x].y; 
				var iy = lilyPads[y].x;
				var jy = lilyPads[y].y; 

				updateLilyVelocity(x, iy, jy);
				updateLilyVelocity(y, ix, jx);
			}
		}
	}

	for (var x = 0; x < NUM_LILY_PADS; x++)
	{
		if (lilyPads[x].x < -15 || lilyPads[x].x > 115 || lilyPads[x].y < -15 || lilyPads[x].y > 115)
		{
			createNewLily(x);
		}
	}
}

function createNewPondLine(x, y, b)
{
	var o = {};
	o.x = x;
	o.y = y;
	o.r = 10;
	o.a = 1.0;
	o.b = b;
	pondLines.push(o);
}

function updatePondLines()
{
	for (var x = 0; x < pondLines.length; x++)
	{
		pondLines[x].r += 0.1;
		if (pondLines[x].r > 15)
		{
			pondLines[x].a -= 0.03;

			if (pondLines[x].a < 0)
			{
				pondLines.splice(x, 1);
				x--;
			}
		}
	}
}

function drawPondLines(ctx)
{
	ctx.lineWidth = 1;
	for (var x = 0; x < pondLines.length; x++)
	{
		ctx.strokeStyle = "rgba(255, 255, 255, " + pondLines[x].a + ")";
		ctx.beginPath();
		var p = 0.05 * (pondLines[x].r);
		var p2 = pondLines[x].b + 3.14;
		ctx.arc(pondLines[x].x, pondLines[x].y, pondLines[x].r, 0 + p + p2, 6.28 - p + p2,  false);
		ctx.stroke();
	}
}

function drawLilyPads(ctx)
{
	for (var x = 0; x < NUM_LILY_PADS; x++)
	{
		var l = lilyPads[x];
		//ctx.fillStyle = "rgb(0, 255, 100)";
		ctx.fillStyle = lilyPads[x].lc;
		for (var n = 0; n < 10; n++)
		{
			ctx.beginPath();
			ctx.arc(l.x, l.y, 10, l.a + 0.3, 6.28 + l.a - 0.3, false);
			ctx.lineTo(l.x, l.y);
			ctx.closePath();
			ctx.fill();
		}

		ctx.fillStyle = l.c;
		for (var n = 0; n < 10; n++)
		{
			ctx.beginPath();
			ctx.arc(l.x + 5 * Math.cos(l.a + 0.6 + l.f), l.y + 5 * Math.sin(l.a + 0.6 + l.f), 2, 0, 6.28, false);
			ctx.closePath();
			ctx.fill();
		}

	}
}

function draw6() 
{
	var ctx = document.getElementById("canvas6").getContext("2d");
	//ctx.imageSmoothingEnabled = false;
	ctx.fillStyle = "rgb(20, 180, 255)";
	ctx.fillRect(0, 0, 100, 100);
	updatePondLines();
	drawPondLines(ctx);
	updateLilyPads();
	drawLilyPads(ctx);
}
