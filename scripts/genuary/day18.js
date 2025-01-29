function day18(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.angleMode(p.DEGREES);
        
        for (var n = 0; n < 20; n++) {
            var y = p.random(1000);
            var x = p.random(-50, 0);
            var s = p.random(3, 10);
            winds.push({x: x, y: y, s: s, c: []});
        }
    }
    
    
    var winds = [];
    
    p.draw = function () {
        p.background(30, 20, 110);
        
        p.stroke(255);
        p.strokeWeight(2);
        p.noFill();
        for (var n = 0; n < winds.length; n++) {
            var wind = winds[n];
            for (var x = 0; x < 100; x++) {
                p.line(wind.x - (5 * x),
                       wind.y + 5 * Math.sin(0.05 * (wind.x - (5 * x))),
                       wind.x - (5 * (x - 1)),
                       wind.y + 5 * Math.sin(0.05 * (wind.x - (5 * (x - 1)))));
            }
            winds[n].x += winds[n].s;
            
            if (p.random(25) < 1) {
                var c = {};
                var r = p.random(50);
                c.x = wind.x;
                c.y = wind.y - r;
                c.r = r;
                c.t = 0;
                winds[n].c.push(c);
            }
            
            for (var m = 0; m < winds[n].c.length; m++) {
                var c = winds[n].c[m];
                if (c.t > 360 + 150) {
                    continue;
                }
                p.arc(c.x, c.y, c.r, c.r, 360 - Math.min(360, c.t), 360 - Math.max(0, c.t - 150));
                winds[n].c[m].t += 2 * winds[n].s;
            }
            
            if (winds[n].x > 1500) {
                var y = p.random(1000);
                var x = p.random(-50, 0);
                var s = p.random(3, 10);
                winds[n] = {x: x, y: y, s: s, c: []};

            }
        }

    }
}
