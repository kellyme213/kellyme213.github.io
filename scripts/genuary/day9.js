function day9(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.angleMode(p.DEGREES);
    }
        
    p.draw = function () {
        p.background(20, 20, 100);
        
        p.strokeWeight(3);
        p.stroke(255, 0, 0);
        for (var x = 0; x < 7; x++) {
            for (var y = 0; y < 20; y++) {
                p.line (200 * x + 50 - y * 20, y * 50, 200 * x + 50 + 40 - y * 20, y * 50 + 60);
                p.line (200 * x + 50 + 50 - y * 20, y * 50, 200 * x + 50 + 40 - 50 - y * 20, y * 50 + 60);
            }
        }
        
        
        p.fill(0, 255, 0);
        p.noStroke();
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                var a = 150 * x + 50;
                var b = 150 * y + 50;
                //p.circle(a, b, 20, 20);
                
                var n = ((y * 5 + x) % 4);
                
                if (n == 0) {
                    p.quad(a - 10, b, a - 30, b + 10, a - 50, b, a - 30, b - 10);
                } else if (n == 1) {
                    p.quad(a + 10, b, a + 30, b + 10, a + 50, b, a + 30, b - 10);
                } else if (n == 2) {
                    p.quad(a, b - 10, a + 10, b - 30, a, b - 50, a - 10, b - 30);
                } else {
                    p.quad(a, b + 10, a + 10, b + 30, a, b + 50, a - 10, b + 30);
                }
            }
        }
        
        p.stroke(255, 255, 0);
        p.strokeWeight(5);
        p.noFill();
        for (var x = 0; x < 6; x++) {
            for (var y = 0; y < 11; y++) {
                p.arc(200 * x - 50 * (y % 2), 100 * y , 200, 100, 2 * p.frameCount, 2 * p.frameCount + 90);
            }
        }
        
        
    }
}
