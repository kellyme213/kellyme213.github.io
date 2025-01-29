function day19(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(0);
        
        for (var n = 0; n < 200; n++) {
            var c = {};
            var r1 = p.random(6.28);
            c.x = 500 + 700 * Math.sin(r1);
            c.y = 500 + 700 * Math.cos(r1);
            var r = p.random(6.28);
            c.dx = -Math.sin(r1 + p.random(2) - 1);
            c.dy = -Math.cos(r1 + p.random(2) - 1);
            var r2 = Math.floor(p.random(3));
            c.r = 0;
            c.g = 0;
            c.b = 0;
            if (r2 == 0) {
                c.r = 255;
            } else if (r2 == 1) {
                c.g = 255;
            } else {
                c.b = 255;
            }
            circles.push(c);
        }
    }
    
    var circles = [];
    
    p.draw = function () {
        
        p.noStroke();
        for (var n = 0; n < circles.length; n++) {
            var c = circles[n];
            p.fill(c.r, c.g, c.b, 128);
            p.circle(c.x, c.y, 300);
            circles[n].x += circles[n].dx;
            circles[n].y += circles[n].dy;
            
            if (p.random(500) < 1) {
                var c = {};
                var r1 = p.random(6.28);
                c.x = 500 + 700 * Math.sin(r1);
                c.y = 500 + 700 * Math.cos(r1);
                var r = p.random(6.28);
                c.dx = -Math.sin(r1 + p.random(2) - 1);
                c.dy = -Math.cos(r1 + p.random(2) - 1);
                var r2 = Math.floor(p.random(3));
                c.r = 0;
                c.g = 0;
                c.b = 0;
                if (r2 == 0) {
                    c.r = 255;
                } else if (r2 == 1) {
                    c.g = 255;
                } else {
                    c.b = 255;
                }
                circles[n] = c;
            }
        }
    }
}
