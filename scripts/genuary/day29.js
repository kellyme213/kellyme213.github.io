function day29(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(255);
    }
    
    p.draw = function () {
        p.strokeWeight(1);
        for (var n = 0; n < 11; n++) {
            if (p.random(2) < 1) {
                p.stroke(255, 0, 255);
            } else {
                p.stroke(255, 255, 0);
            }
            p.line(100 * n + p.random(-20, 20), 0, 100 * n + p.random(-20, 20), 1000);
        }
        
        for (var n = 0; n < 11; n++) {
            if (p.random(2) < 1) {
                p.stroke(255, 0, 255);
            } else {
                p.stroke(255, 255, 0);
            }
            p.line(0, 100 * n + p.random(-20, 20), 1000, 100 * n + p.random(-20, 20));
        }
        
        for (var n = 0; n < 10; n++) {
            for (var m = 0; m < 10; m++) {
                p.strokeWeight(2);
                if (p.random(5) < 1) {
                    //p.noFill();
                    if (p.random(2) < 1) {
                        p.fill(255, 0, 255);
                        p.stroke(255, 255, 0);
                    } else {
                        p.fill(255, 255, 0);
                        p.stroke(255, 0, 255);
                    }
                    
                    p.circle(100 * n + 50 + p.random(-30, 30),
                             100 * m + 50 + p.random(-30, 30), 20);
                }
            }
        }

        
    }
}
