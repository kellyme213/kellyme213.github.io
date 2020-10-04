var ctx10 = document.getElementById("canvas10").getContext("2d");
var check10a = document.getElementById("check10a");
var check10b = document.getElementById("check10b");
var check10c = document.getElementById("check10c");
var check10d = document.getElementById("check10d");
var radio10a = document.getElementById("radio10a");
var radio10b = document.getElementById("radio10b");
//100 0.5
var graph10 = createGraphObject(0, 200, 0, 1.0, 2, 10, 100, 100, 800, 800, undefined);

check10a.onclick = function()
{
	updateGraph10();
}

check10b.onclick = function()
{
	updateGraph10();
}

check10c.onclick = function()
{
	updateGraph10();
}

check10d.onclick = function()
{
	updateGraph10();
}

radio10a.onclick = function()
{
	updateGraph10();
}

radio10b.onclick = function()
{
	updateGraph10();
}

function updateGraph10()
{
	ctx10.clearRect(0, 0, 1000, 1000);
	ctx10.strokeStyle = "black";
	ctx10.fillStyle = "black";
	ctx10.lineWidth = 5;


	if (radio10a.checked)
	{
		graph10.yMax = 3.0;
		drawGraphLines(ctx10, graph10);
		ctx10.lineWidth = 5;
		if (check10a.checked)
		{
			ctx10.strokeStyle = "red";
			graph10.graphPoints = constant11;
			drawLineCached(ctx10, graph10);
		}

		if (check10b.checked)
		{
			ctx10.strokeStyle = "rgb(50, 0, 200)";
			graph10.graphPoints = constant8;
			drawLineCached(ctx10, graph10);
		}

		if (check10c.checked)
		{
			ctx10.strokeStyle = "rgb(50, 200, 0)";
			graph10.graphPoints = constant9;
			drawLineCached(ctx10, graph10);
		}

		if (check10d.checked)
		{
			ctx10.strokeStyle = "rgb(200, 200, 50)";
			graph10.graphPoints = constant10;
			drawLineCached(ctx10, graph10);
		}
	}
	else if (radio10b.checked)
	{
		graph10.yMax = 1.0;
		drawGraphLines(ctx10, graph10);
		ctx10.lineWidth = 5;
		if (check10b.checked)
		{
			ctx10.strokeStyle = "rgb(50, 0, 200)";
			graph10.graphPoints = pConstant4;
			drawLineCached(ctx10, graph10);
		}

		if (check10c.checked)
		{
			ctx10.strokeStyle = "rgb(50, 200, 0)";
			graph10.graphPoints = pConstant6;
			drawLineCached(ctx10, graph10);
		}

		if (check10d.checked)
		{
			ctx10.strokeStyle = "rgb(250, 220, 10)";
			graph10.graphPoints = pConstant5;
			drawLineCached(ctx10, graph10);
		}
	}



}