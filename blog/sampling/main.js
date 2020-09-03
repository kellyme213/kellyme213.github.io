

window.onload = function() {

	initializeContext(ctx1, graph1);
	updateGraph1();


	initializeContext(ctx2, graph2);
	updateGraph2();


	initializeContext(ctx3, graph3);
	ctx3.clearRect(0, 0, 1000, 1000);
	ctx3.strokeStyle = "black";
	ctx3.fillStyle = "black";
	ctx3.d2.x = -70;
	drawGraphLines(ctx3, graph3);


	initializeContext(ctx4, graph4);
	radio4b.checked = true;
	check4b.checked = true;
	updateGraph4();


	initializeContext(ctx5, graph5);
	check5a.checked = true;
	check5b.checked = true;
	ctx5.d2.x = -50;
	ctx5.d4.x = 50;
	ctx5.d4.y = -20;
	updateGraph5();


	initializeContext(ctx6, graph6);
	radio6a.checked = true;
	updateGraph6();


	initializeContext(ctx7, graph7);
	radio7a.checked = true;
	updateGraph7();


	initializeContext(ctx8, graph8);
	ctx8.d4.y = -20;
	ctx8.d4.x = 20;
	check8a.checked = true;
	check8b.checked = true;
	check8c.checked = true;
	updateGraph8();


	initializeContext(ctx9, graph9);
	radio9a.checked = true;
	check9a.checked = true;
	updateGraph9();

	initializeContext(ctx10, graph10);
	check10a.checked = true;
	check10b.checked = true;
	check10c.checked = true;
	check10d.checked = true;
	updateGraph10();


	initializeContext(ctx11, graph11);
	radio11a.checked = true;
	updateGraph11();

	//console.log(generatePercentGraph(graphFunction7, 0, 10, 18.11364, uniformPdf, uniformCdf));
	//console.log(generatePercentGraph(graphFunction4, 0, 3, 11.793940, pdf5, cdf5));
};


function initializeContext(ctx, graph)
{
	ctx.font = '50px Montserrat';
	ctx.canvasHeight = 1000;
	ctx.d1 = {x: 0, y: 0};
	ctx.d2 = {x: 0, y: 0};
	ctx.d3 = {x: 0, y: 0};
	ctx.d4 = {x: 0, y: 0};
	drawGraphLines(ctx, graph);
	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";

}

