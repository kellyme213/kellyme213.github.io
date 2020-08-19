var ctx8 = document.getElementById("canvas8").getContext("2d");
var check8a = document.getElementById("check8a");
var check8b = document.getElementById("check8b");
var check8c = document.getElementById("check8c");
var slider8 = document.getElementById("slider8");
var graph8 = createGraphObject(0, 50, 0, 200, 2, 6, 120, 100, 800, 800, undefined);


check8a.onclick = function()
{
	updateGraph8();
}

check8b.onclick = function()
{
	updateGraph8();
}

check8c.onclick = function()
{
	updateGraph8();
}

slider8.oninput = function() 
{
	updateGraph8();
}

function updateGraph8()
{
	//graph8.yMax = slider8.value;
	ctx8.clearRect(0, 0, 1000, 1000);
	ctx8.strokeStyle = "black";
	ctx8.fillStyle = "black";
	ctx8.lineWidth = 5;
	drawGraphLines(ctx8, graph8);
	ctx8.lineWidth = 5;

	if (check8a.checked)
	{
		ctx8.strokeStyle = "red";
		graph8.graphPoints = constant5;
		drawLineCached(ctx8, graph8);
	}

	if (check8b.checked)
	{
		ctx8.strokeStyle = "blue";
		graph8.graphPoints = constant6;
		drawLineCached(ctx8, graph8);
	}

	if (check8c.checked)
	{
		ctx8.strokeStyle = "green";
		graph8.graphPoints = constant7;
		drawLineCached(ctx8, graph8);
	}
}