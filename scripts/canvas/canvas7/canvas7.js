setInterval(draw7, 100);

//draw7();

function renderCircle(ctx, x, y, r)
{
	ctx.beginPath();
	for (var n = 0; n < 100; n++)
	{
		var r1 = Math.random() * 6.28;
		var px = Math.cos(r1) * r + x;
		var py = Math.sin(r1) * r + y;

		if (n == 0)
		{
			ctx.moveTo(px, py);
		}
		else
		{
			ctx.lineTo(px, py);
		}
	}
	ctx.stroke();
}

function renderPolygon(ctx, points, closed)
{
	var dists = [];
	var dist = 0;

	if (closed)
	{
		points.push(points[0]);
	}
	for (var x = 0; x < points.length - 1; x++)
	{
		var dx = points[x].x - points[x+1].x;
		var dy = points[x].y - points[x+1].y;
		var d = Math.sqrt(dx * dx + dy * dy);
		dists.push(dist);
		dist += d;
	}
	dists.push(dist);

	ctx.beginPath();
	for (var n = 0; n < 100; n++)
	{
		var r = Math.random() * dist;
		for (var i = 0; i < dists.length - 1; i++)
		{
			if (dists[i] <= r && dists[i + 1] >= r)
			{
				var b = (r - dists[i]) / (dists[i + 1] - dists[i]);
				var nx = blend(points[i].x, points[i + 1].x, b);
				var ny = blend(points[i].y, points[i + 1].y, b);

				if (n == 0)
				{
					ctx.moveTo(nx, ny);
				}
				else
				{
					ctx.lineTo(nx, ny);
				}
				break;
			}
		}
	}
	ctx.stroke();


}

function draw7() 
{
	var ctx = document.getElementById("canvas7").getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1000, 1000);

	ctx.lineWidth = 4;
	ctx.strokeStyle = "white";
	renderCircle(ctx, 500, 500, 200);
	ctx.strokeStyle = "red";
	var p = [{x: 50, y: 50}, {x: 50, y: 950}, {x: 950, y: 950}, {x: 950, y: 50}];
	renderPolygon(ctx, p, true);




}
