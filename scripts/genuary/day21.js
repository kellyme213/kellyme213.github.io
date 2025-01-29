function day21(p) {
    
    
    var circles = [];
    
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }

    var C = 2;
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        
        for (var n = 0; n < 40; n++) {
            var a = p.random(6.28);
            circles.push({
                x: p.random(1000),
                y: p.random(1000),
                r: 20,
                dx: C * Math.cos(a),
                dy: C * Math.sin(a),
                red: (n % 2) == 0
            });
        }
    }

    
    p.draw = function () {
        p.background(245, 245, 200, 50);
        //p.noStroke();
        
        
        var newCircles = [];
        for (var n = 0; n < circles.length; n++) {
            for (var m = n; m < circles.length; m++) {
                if (m == n) {
                    continue;
                }
                
                if (circles[n].r <= 0 || circles[m].r <= 0) {
                    continue;
                }
                
                var xx = circles[n].x - circles[m].x;
                var yy = circles[n].y - circles[m].y;
                var d = Math.sqrt(xx * xx + yy * yy) - (circles[n].r + circles[m].r);
                if (d <= 0) {
                    
                    if (circles[n].red == circles[m].red) {
                        circles[n].r += circles[m].r;
                        circles[m].r = 0;
                    } else {
                        for (var nn = 0; nn < circles[n].r / 20; nn++) {
                            var a = p.random(6.28);
                            newCircles.push({
                                x: clamp(circles[n].x + p.random(2 * circles[n].r) - circles[n].r, 20, 980),
                                y: clamp(circles[n].y + p.random(2 * circles[n].r) - circles[n].r, 20, 980),
                                r: 20,
                                dx: C * Math.cos(a),
                                dy: C * Math.sin(a),
                                red: circles[n].red
                            });
                        }
                        for (var mm = 0; mm < circles[m].r / 20; mm++) {
                            var a = p.random(6.28);
                            newCircles.push({
                                x: clamp(circles[m].x + p.random(2 * circles[m].r) - circles[m].r, 20, 980),
                                y: clamp(circles[m].y + p.random(2 * circles[m].r) - circles[m].r, 20, 980),
                                r: 20,
                                dx: C * Math.cos(a),
                                dy: C * Math.sin(a),
                                red: circles[m].red
                            });
                        }
                        circles[n].r = 0;
                        circles[m].r = 0;

                    }
                    
                }
            }
        }
        
        circles = circles.filter((c) => c.r > 0);
        for (var n = 0; n < newCircles.length; n++) {
            circles.push(newCircles[n]);
        }

        
        for (var n = 0; n < circles.length; n++) {
            let c = circles[n];
            if (c.red) {
                p.fill(255, 80, 80, 128);
            } else {
                p.fill(80, 255, 80, 128);
            }
            
            p.circle(c.x, c.y, 2 * c.r);
            if (c.x + c.dx <= 0 || c.x + c.dx >= 1000 ||
                c.y + c.dy <= 0 || c.y + c.dy >= 1000) {
                var a = p.random(6.28);
                circles[n].dx = Math.cos(a);
                circles[n].dy = Math.sin(a);
            } else {
                circles[n].x += circles[n].dx;
                circles[n].y += circles[n].dy;
            }
        }
        
        
        
    }
}
