function day24(p) {
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
    }

    
    p.draw = function () {
        p.background(240, 160, 60, 10);
        
        p.strokeWeight(10);
        p.noFill();
        
        for (var n = 0; n < 6; n++) {
            p.stroke(255, 60, 40);
            var dx = (300 + 100 * (n % 2)) * Math.cos(0.33 * Math.PI * n + 0.01 * p.frameCount);
            var dy = (300 + 100 * (n % 2)) * Math.sin(0.33 * Math.PI * n + 0.01 * p.frameCount);
            p.circle(500 + dx, 500 + dy, 200);
            for (var m = 0; m < 12; m++) {
                p.stroke(245, 200, 70);
                var dx2 = (-50 + 200 * (m % 2)) * Math.cos(0.16 * Math.PI * m + 0.02 * p.frameCount);
                var dy2 = (-50 + 200 * (m % 2)) * Math.sin(0.16 * Math.PI * m + 0.02 * p.frameCount);

                p.circle(500 + dx + dx2, 500 + dy + dy2, 20);

            }
        }
    }
}
