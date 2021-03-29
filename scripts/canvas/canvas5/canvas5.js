var backgroundCircles = [];
var NUM_CIRCLES = 10;

var lines = [];
var NUM_LINES = 30;

var stars = [];
var NUM_STARS = 40;

createLines();
createBackgroundCircles();
createStars();
setInterval(draw5, 16);


function createBackgroundCircles()
{
	backgroundCircles = [];
	for (var x = 0; x < NUM_CIRCLES; x++)
	{
		var o = {};
		o.x = (Math.random()) * 1000;
		o.y = (Math.random()) * 1000;
		o.r = (Math.random() + 2.0) * 90;
		var b = (Math.random() - 0.5) * 100 + 50;
		o.fillStyle = "10, 10, " + b;
	
		backgroundCircles.push(o);

	}
}

function createStars()
{
	for (var x = 0; x < NUM_STARS; x++)
	{
		var o = {};
		o.x = (Math.random()) * 1000;
		o.y = (Math.random()) * 1000;
		o.r = (Math.random() + 2.0) * 1;
		var b = (Math.random() * 20) + 235;
		o.fillStyle = b + ", " + b + " , 10";
		stars.push(o);
	}
}

function modifyLine(l)
{
	var n = Math.random() * 1000;
	l.x = n + 1000;
	l.y = n - 1000;
	l.v = Math.random() * 10 + 10;
	l.w = Math.random() * 2 + 2;
	return l;
}

function createLines()
{
	for (var x = 0; x < NUM_LINES; x++)
	{
		var o = {};
		o = modifyLine(o);
		lines.push(o);
	}
}

function updateLines(ctx)
{
	ctx.strokeStyle = "rgb(255, 255, 235)";
	for (var x = 0; x < NUM_LINES; x++)
	{
		lines[x].x -= lines[x].v;
		lines[x].y += lines[x].v;
		ctx.lineWidth = lines[x].w;

		var l = 60 + Math.random() * (4 * lines[x].v);
		ctx.beginPath();
		ctx.moveTo(lines[x].x, lines[x].y);
		ctx.lineTo(lines[x].x + l, lines[x].y - l);
		ctx.stroke();

		if (lines[x].x < -50)
		{
			lines[x] = modifyLine(lines[x]);
		}
	}
}



function draw5()
{
	var ctx = document.getElementById("canvas5").getContext("2d");
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 10;

	ctx.fillStyle = "rgb(10, 10, 30)";
	ctx.fillRect(0, 0, 1000, 1000);



	for (var x = 0; x < NUM_STARS; x++)
	{
		var o = stars[x];

		if (Math.random() > 0.8)
		{
			var b = (Math.random() * 50) + 205;
			if (Math.random() > 0.7)
			{
				o.r = (Math.random() * 4.0 + 1.0);
			}
			o.fillStyle = b + ", " + b + " , 10";
		}

		drawCircle(ctx, o.fillStyle, o.x, o.y, o.r);
	}

	for (var x = 0; x < NUM_CIRCLES; x++)
	{
		var o = backgroundCircles[x];
		drawCircle(ctx, o.fillStyle, o.x, o.y, o.r);
	}

	updateLines(ctx);


}

function drawCircle(ctx, f, x, y, r)
{
    var radgrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    radgrad.addColorStop(0.0, "rgba(" + f + ", 0.8)");
    radgrad.addColorStop(0.7, "rgba(" + f + ", 0.3)");
    radgrad.addColorStop(1.0, "rgba(" + f + ", 0.0)");
    ctx.fillStyle = radgrad;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 6.28, false);
	ctx.fill();
}

















