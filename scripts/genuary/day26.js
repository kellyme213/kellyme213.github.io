function day26(p) {
    
    function diamond(x, y, w, h) {
        p.quad(x + 0.5 * w, y,
               x, y + 0.5 * h,
               x - 0.5 * w, y,
               x, y - 0.5 * h);
    }

    p.setup = function () {
        p.createCanvas(1000, 1000);
        
    }

    
    p.draw = function () {
        p.background(0, 0, 40, 10);
        p.stroke(0, 255, 0);
        p.strokeWeight(5);
        p.noFill();
        
        for (var m = 0; m < 10; m++) {
            for (var n = 0; n < 10; n++) {
                if ((n + (m % 2)) % 2 == 0) {
                    p.stroke(0, 255, 0, 50);
                    
                } else {
                    p.stroke(255, 80, 255, 50);
                }
                diamond(500 - 50 * n, 50 + 100 * m,
                        50 + 10 * (n + 6 * Math.sin(0.075 * p.frameCount)),
                        50 - 10 * (n + 6 * Math.sin(0.075 * p.frameCount)));
                diamond(500 + 50 * n, 50 + 100 * m,
                        50 + 10 * (n + 6 * Math.sin(0.075 * p.frameCount)),
                        50 - 10 * (n + 6 * Math.sin(0.075 * p.frameCount)));
            }
        }
    }
}
