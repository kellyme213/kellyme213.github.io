var ctx8 = document.getElementById("canvas8").getContext("2d");
var check8a = document.getElementById("check8a");
var check8b = document.getElementById("check8b");
var check8c = document.getElementById("check8c");
var slider8 = document.getElementById("slider8");
var radio8a = document.getElementById("radio8a");
var radio8b = document.getElementById("radio8b");
//50 200
var graph8 = createGraphObject(0, 200, 0, 1.0, 2, 10, 100, 100, 800, 800, undefined);


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

radio8a.onclick = function()
{
	updateGraph8();
}

radio8b.onclick = function()
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

	if (radio8a.checked)
	{
		graph8.yMax = 100;
		drawGraphLines(ctx8, graph8);
		ctx8.lineWidth = 5;
		if (check8a.checked)
		{
			ctx8.strokeStyle = "rgb(255, 0, 0)";
			graph8.graphPoints = constant5;
			drawLineCached(ctx8, graph8);
		}

		if (check8b.checked)
		{
			ctx8.strokeStyle = "rgb(50, 0, 200)";
			graph8.graphPoints = constant6;
			drawLineCached(ctx8, graph8);
		}

		if (check8c.checked)
		{
			ctx8.strokeStyle = "rgb(50, 200, 0)";
			graph8.graphPoints = constant7;
			drawLineCached(ctx8, graph8);
		}
	}
	else if (radio8b.checked)
	{
		graph8.yMax = 1.0;
		drawGraphLines(ctx8, graph8);
		ctx8.lineWidth = 5;
		if (check8b.checked)
		{
			ctx8.strokeStyle = "rgb(50, 0, 200)";
			graph8.graphPoints = pConstant2;
			drawLineCached(ctx8, graph8);
		}

		if (check8c.checked)
		{
			ctx8.strokeStyle = "rgb(50, 200, 0)";
			graph8.graphPoints = pConstant3;
			drawLineCached(ctx8, graph8);
		}
	}


}