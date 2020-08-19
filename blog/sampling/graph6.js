var ctx6 = document.getElementById("canvas6").getContext("2d");
var radio6a = document.getElementById("radio6a");
var radio6b = document.getElementById("radio6b");
var button6 = document.getElementById("button6");
var slider6 = document.getElementById("slider6");
var graph6 = createGraphObject(0, 1.0, 0, 1.0, 10, 10, 100, 100, 800, 800, undefined);

button6.onclick = function()
{
	updateGraph6();
}

slider6.oninput = function() 
{
	console.log(this.value);
	updateGraph6();
}

radio6a.onclick = function()
{
	updateGraph6();
}

radio6b.onclick = function()
{
	updateGraph6();
}

function updateGraph6()
{
	ctx6.clearRect(0, 0, 1000, 1000);
	ctx6.strokeStyle = "black";
	ctx6.fillStyle = "black";
	ctx6.lineWidth = 5;
	drawGraphLines(ctx6, graph6);

	ctx6.strokeStyle = "rgb(255, 0, 0)";
	ctx6.fillStyle = "rgba(255, 0, 0, 0.6)";

	var numSamples = Math.floor(slider6.value);

	if (radio6a.checked)
	{
		graph6.graphPoints = generateStratifiedPoints(numSamples, 10);
	}
	else
	{	
	 	graph6.graphPoints = generateRandomPoints(numSamples);
	}

	drawPoints(ctx6, graph6);


	updateGraph6Labels(graph6.graphPoints.length);
}

function updateGraph6Labels(val1)
{
	document.getElementById("label6a").innerHTML = "Number of samples: " + val1;
}




