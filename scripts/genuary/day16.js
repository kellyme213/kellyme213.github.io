function day16(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.colorMode(p.HSB);
        p.background(0, 0, 100);
    }

    var h = 0;//p.random(0, 360);
    
    p.draw = function () {
        h = (0.5 * p.frameCount) % 360;
        
        p.strokeWeight(3);
        for (var n = 0; n < 5; n++) {
            p.stroke(h + p.random(-10, 10), 80, 80);
            p.line(200 * n + p.random(-50, 50) + 50, 0, 200 * n + p.random(-50, 50) + 50, 1000);
        }
        
        for (var n = 2; n < 9; n++) {
            p.stroke(h + 90 + p.random(-10, 10), 50, 100);
            p.line(0, 200 * n + p.random(-20, 20) + 50,
                   2000, 200 * n + p.random(-20, 20) - 2000);
        }
        
        for (var n = -1; n < 5; n++) {
            for (var m = 0; m < 5; m++) {
                p.noStroke();
                p.fill(h + 150 + p.random(-10, 10), 100, 60 + p.random(-20, 20));
                p.circle(200 * m + 150 + p.random(-10, 10),
                         200 * n + 100 + 50 * m + p.random(-30, 30),
                         40 + p.random(-10, 10));
                
            }
        }

        
    }
}
