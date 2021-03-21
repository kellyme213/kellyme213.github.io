function setup() {
  	createCanvas(400, 400);
  	noLoop();
}



function foo(x1, y1, x2, y2, x, y) {

	var minX = Math.min(Math.abs(x1 - x), Math.abs(x2 - x));
	var minY = Math.min(Math.abs(y1 - y), Math.abs(y2 - y));

}

function blur2(x1, y1, x2, y2, col) {

for (var y = y1; y < y2; y++) {
	for (var x = x1; x < x2; x++) {
			var r = Math.random();
			if (r > 0.5) {
				let loc = (x + (y*800)) * 4;
				pixels[loc + 0] = mix(pixels[loc + 0], red(col),   0.5); 
				pixels[loc + 1] = mix(pixels[loc + 1], green(col), 0.5); 
				pixels[loc + 2] = mix(pixels[loc + 2], blue(col),  0.5); 
			}
		}
	}

}

function mix(a, b, c) {
	return Math.floor((1.0 - c) * a + c * b);
}



function rand(x, y)
{
	return Math.floor(Math.random() * (y - x) + x);
}

function drawRect()
{
	var d = 5;	
	var w = rand(d * 2, 600);
	var h = rand(d * 2, 600);
	var x = rand(0, 800 - w);
	var y = rand(0, 800 - h);
	var r = rand(0, 255);
	var g = rand(0, 255);
	var b = rand(0, 255);

	var col = color(r, g, b);

		loadPixels();

	blur2(x,         y,         x + d,     y + h - d, col);
	blur2(x + d,     y,         x + w,     y + d,     col);
    blur2(x,         y + h - d, x + w - d, y + h,     col);
    blur2(x + w - d, y + d,     x + w    , y + h,     col);
		updatePixels();

	noStroke();
    fill(col);
    rect((x + d) / 2, (y + d) / 2, w / 2 - d, h / 2 - d);



}

function draw() {
	background(0);

	//fill(255, 0, 0);

	for (var x = 0; x < 10; x++) {
		drawRect();
	}






}