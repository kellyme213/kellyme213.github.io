function day13(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
    }
    
    function drawTriangle(x, y, d, a) {
        p.triangle(x + d * Math.cos(0.00 * Math.PI + a),
                   y + d * Math.sin(0.00 * Math.PI + a),
                   x + d * Math.cos(0.67 * Math.PI + a),
                   y + d * Math.sin(0.67 * Math.PI + a),
                   x + d * Math.cos(1.33 * Math.PI + a),
                   y + d * Math.sin(1.33 * Math.PI + a));
    }
                
    p.draw = function () {
        p.background(125, 80, 50);
        p.noFill();
        p.stroke(255, 0, 0);
        p.strokeWeight(3);
        
        for (var x = -5; x < 20; x++) {
            for (var y = -5; y < 20; y++) {
                if ((y % 2) == 0) {
                    continue;
                }
                drawTriangle(100 * y - 200 * Math.sin(0.005 * p.frameCount) - 100 * x,
                             200 + 100 * x + 200 * Math.sin(0.005 * p.frameCount),
                             50, 0.01 * p.frameCount);
            }
        }
        
        p.stroke(255, 255, 0);
        for (var x = -5; x < 20; x++) {
            for (var y = -10; y < 20; y++) {
                if ((y % 2) == 0) {
                    continue;
                }
                drawTriangle(100 * y - 200 * Math.sin(0.005 * p.frameCount) + 100 * x,
                             200 + 100 * x - 200 * Math.sin(0.005 * p.frameCount),
                             50, -0.01 * p.frameCount);
            }
        }
        
    }
}
