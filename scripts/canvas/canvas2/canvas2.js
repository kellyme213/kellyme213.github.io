let numStates = 10;
var states = [];

for (var x = 0; x < numStates; x++)
{
	states.push({});
	generateState(10, states[x]);
}

setInterval(draw2, 50);

function draw2()
{
	var ctx = document.getElementById("canvas2").getContext("2d");
	let canvasWidth = 1000;
	ctx.fillRect(0, 0, canvasWidth, canvasWidth);
	ctx.fillStyle = "rgb(25, 25, 25)";
	ctx.lineWidth = 2;

	let currTime = (new Date()).valueOf();

	for (var m = 0; m < numStates; m++)
	{
		var state1 = states[m];
		ctx.strokeStyle = state1.color;
		let currDone = 1.0 - Math.min((state1.end - currTime) / (state1.end - state1.start), 1.0);

		var start = 0;
		if (currDone > 1.0 + state1.waitTime)
		{
			start = Math.floor((currDone - (1.0 + state1.waitTime)) * state1.numIters);
		}
		for (var n = start; n < Math.floor((currDone) * state1.numIters); n++)
		{
			ctx.lineWidth = state1.w[n];
			let percent = 1.0 - ((n + currDone) / state1.numIters);

			let x = blend(state1.x1, state1.x2, percent);
			let y = blend(state1.y1, state1.y2, percent);

			let t = blend(state1.t1, state1.t2, percent) + state1.t[n];
			let s = blend(state1.s1, state1.s2, percent) + state1.s[n];

			drawShape(x, y, t, s, state1.sides, ctx);
		}

		if (start >= state1.numIters)
		{
			generateState(state1.numIters, state1);
		}
	}
}

function generateState(numIters, state)
{
	state.x1 = rand() * canvasWidth;
	state.x2 = rand() * canvasWidth;
	state.y1 = rand() * canvasWidth;
	state.y2 = rand() * canvasWidth;

	if (rand() > 0.2)
	{
		state.x2 = state.x1;
		state.y2 = state.y1;
	}

	state.t1 = rand() * 6.28
	state.t2 = rand() * 6.28

	state.s1 = rand() * 50
	state.s2 = rand() * 50

	var a1 = [];
	var a2 = [];
	var a3 = [];
	for (var x = 0; x < numIters; x++)
	{
		a1.push(randHalf() * 10);
		a2.push(randHalf() * 0.5);
		a3.push(1 + randHalf() * 2.0);
	}

	state.s = a1;
	state.t = a2;
	state.w = a3;

	state.start = (new Date()).valueOf() + rand() * 2000;
	state.end = state.start + 800 + rand() * 300;
	state.waitTime = rand() * 2.0 + 0.5;
	state.numIters = Math.round(numIters + randHalf() * 4);

	if (state.numIters <= 1)
	{
		state.numIters = 2;
	}

	let b = Math.floor(128 * rand() + 128);

	state.sides = Math.floor(rand() * 4 + 2);

	if (state.sides == 5)
	{
		state.sides = 6;
	}

	state.color = "rgba(255, " + b + ", 100, 1.0)";
}