function day3(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(20);
    }
    function draw2(x, y, t, b) {
        p.fill(255, 200, 20);
        if (b) {
            p.fill(255, 0, 20);
        }
        p.square(x, y, 50);
        p.square(x + 50 - p.lerp(50, 0, t), y + p.lerp(50, 0, t), 50);
        p.square(x + 100, y, 50);
        p.square(x + 100, y + 50, 50);
        p.square(x + 100, y + 200, 50);
        p.square(x, y + 100, 50);
        p.square(x + 50, y + 100, 50);
        p.square(x + 100, y + 100, 50);
        p.fill(255, 200 * t, 20);
        if (b) {
            p.fill(255, 200 * (1.0 - t), 20);
        }
        p.square(x + 0 - p.lerp(50, 0, t), y + 150, 50);
        p.fill(235 * t + 20, 180 * t + 20, 20);
        if (b) {
            p.fill(235 * t + 20, 0 * t + 20, 20);
        }
        p.square(x, y + 200, 50);
        p.square(x + 50, y + 200, 50);
    }
    p.draw = function () {
        p.background(20);
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 5; y++) {
                var c = Math.min(Math.max(Math.sin(0.05 * p.frameCount), -0.8), 0.8)
                var t = (1.0 + (c / 0.8)) * 0.5;
                var a = 1.0 * (y % 2);
                draw2(0 + 150 * x, 0 + 250 * y, t, ((x + a) % 2));
            }
        }
    }
}
