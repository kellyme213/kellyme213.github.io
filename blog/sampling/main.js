

window.onload = function() {

	initializeContext(ctx1, graph1);
	updateGraph1();


	initializeContext(ctx2, graph2);
	updateGraph2();


	initializeContext(ctx3, graph3);


	initializeContext(ctx4, graph4);
	updateGraph4();


	initializeContext(ctx5, graph5);
	check5a.checked = true;
	check5b.checked = true;
	ctx5.d2.x = -50;
	updateGraph5();


	initializeContext(ctx6, graph6);
	radio6a.checked = true;
	updateGraph6();


	initializeContext(ctx7, graph7);
	radio7a.checked = true;
	updateGraph7();


	initializeContext(ctx8, graph8);
	updateGraph8();


	initializeContext(ctx9, graph9);
	radio9a.checked = true;
	check9a.checked = true;
	updateGraph9();
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

