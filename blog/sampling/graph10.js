var ctx10 = document.getElementById("canvas10").getContext("2d");
var check10a = document.getElementById("check10a");
var check10b = document.getElementById("check10b");
var check10c = document.getElementById("check10c");
var check10d = document.getElementById("check10d");
//100 0.5
var graph10 = createGraphObject(0, 100, 0, 1.0, 2, 10, 100, 100, 800, 800, undefined);

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

function updateGraph10()
{
	ctx10.clearRect(0, 0, 1000, 1000);
	ctx10.strokeStyle = "black";
	ctx10.fillStyle = "black";
	ctx10.lineWidth = 5;
	drawGraphLines(ctx10, graph10);
	ctx10.lineWidth = 5;

	if (check10a.checked)
	{
		ctx10.strokeStyle = "red";
		graph10.graphPoints = constant11;
		//drawLineCached(ctx10, graph10);
	}

	if (check10b.checked)
	{
		ctx10.strokeStyle = "blue";
		graph10.graphPoints = pConstant4;
		//graph10.graphPoints = constant8;
		drawLineCached(ctx10, graph10);
	}

	if (check10c.checked)
	{
		ctx10.strokeStyle = "green";
		graph10.graphPoints = pConstant6;
		//graph10.graphPoints = constant9;
		drawLineCached(ctx10, graph10);
	}

	if (check10d.checked)
	{
		ctx10.strokeStyle = "black";
		graph10.graphPoints = pConstant5;
		//graph10.graphPoints = constant10;
		drawLineCached(ctx10, graph10);
	}
}