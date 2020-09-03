

var ctx5 = document.getElementById("canvas5").getContext("2d");
var check5a = document.getElementById("check5a");
var check5b = document.getElementById("check5b");
var slider5 = document.getElementById("slider5"); 
//0.1
var graph5 = createGraphObject(0, 200, 0, 1.0, 2, 6, 100, 100, 800, 800, undefined);

slider5.oninput = function() 
{
	updateGraph5();
}

check5a.onclick = function()
{
	updateGraph5();
}

check5b.onclick = function()
{
	updateGraph5();
}

function updateGraph5()
{
	//graph5.yMax = slider5.value;
	ctx5.clearRect(0, 0, 1000, 1000);
	ctx5.strokeStyle = "black";
	ctx5.fillStyle = "black";
	ctx5.lineWidth = 5;
	drawGraphLines(ctx5, graph5);
	ctx5.lineWidth = 5;

	if (check5a.checked)
	{
		ctx5.strokeStyle = "rgb(255, 0, 0)";
		graph5.graphPoints = constant1;
		//drawLineCached(ctx5, graph5);
	}

	if (check5b.checked)
	{
		ctx5.strokeStyle = "rgb(50, 0, 200)";
		graph5.graphPoints = pConstant1;
		drawLineCached(ctx5, graph5);
	}
}