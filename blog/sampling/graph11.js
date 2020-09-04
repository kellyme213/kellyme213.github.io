var ctx11 = document.getElementById("canvas11").getContext("2d");
var radio11a = document.getElementById("radio11a");
var radio11b = document.getElementById("radio11b");

var graph11 = createGraphObject(0, 1.0, 0, 1.0, 4, 4, 100, 100, 800, 800, graphFunction11);

radio11a.onclick = function()
{
	updateGraph11();
}

radio11b.onclick = function()
{
	updateGraph11();
}

function updateGraph11()
{
	ctx11.clearRect(0, 0, 1000, 1000);
	ctx11.strokeStyle = "black";
	ctx11.fillStyle = "black";
	ctx11.lineWidth = 5;
	drawGraphLines(ctx11, graph11);
	ctx11.lineWidth = 5;

	var area = 0;
	if (radio11a.checked)
	{
		ctx11.strokeStyle = "rgb(255, 0, 0)";
		ctx11.fillStyle = "rgba(255, 0, 0, 0.7)";
		for (var x = 0; x < 12; x++)
		{
			drawRectangle(ctx11, graph11, x / 12, graphFunction11(x / 12), 1.0 / 12);
			area += graphFunction11(x / 12) * (1.0 / 12);
		}
		updateGraph11Labels(text1);
	}
	else
	{
		var xVal = 0;
		for (var x = 0; x < 12; x++)
		{
			if (x < 4)
			{
				ctx11.strokeStyle = "rgb(50, 0, 200)";
				ctx11.fillStyle = "rgba(50, 0, 200, 0.7)";
				drawRectangle(ctx11, graph11, xVal, graphFunction11(xVal), 1.0 / 8);
				area += graphFunction11(xVal) * (1.0 / 8);
				xVal += 1.0 / 8;
			}
			else
			{
				ctx11.strokeStyle = "rgb(50, 200, 0)";
				ctx11.fillStyle = "rgba(50, 200, 0, 0.7)";
				drawRectangle(ctx11, graph11, xVal, graphFunction11(xVal), 1.0 / 16);
				area += graphFunction11(xVal) * (1.0 / 16);
				xVal += 1.0 / 16;
			}
		}
		updateGraph11Labels(text2);
	}

	ctx11.strokeStyle = "black";
	drawLineNoCached(ctx11, graph11, 0, 1);

}



function updateGraph11Labels(val1)
{
	document.getElementById("label11a").innerHTML = val1;
}



