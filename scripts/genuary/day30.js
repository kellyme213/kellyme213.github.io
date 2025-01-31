function day30(p) {
    
    
    var points = [];
    
    var connections = [];
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        
        for (var n = 0; n < 50; n++) {
            var d = p.random(3, 6);
            if (p.random(2) < 1) {
                d = -d;
            }
            points.push({
                r: Math.floor(p.random(9) + 1) * 50,
                t: p.random(6.28),
                d: d
            });
        }
        
        for (var n = 0; n < 40; n++) {
            connections.push({
                a: Math.floor(p.random(points.length)),
                b: Math.floor(p.random(points.length)),
                t: 0,
                d: p.random(5)
            });
        }
    }
    
    function l(a, b, t) {
        return a * t + (1.0 - t) * b;
    }
    
    p.draw = function () {
        p.background(0);

        for (var n = 0; n < 10; n++) {
            p.strokeWeight(2);
            p.stroke(255);
            p.noFill();
            p.circle(500, 500, n * 100);
        }
        
        for (var n = 0; n < connections.length; n++) {
            let c = connections[n];
            p.strokeWeight(2);
            p.noFill();
            p.stroke(255, 0, 0);
            let ax = 500 + points[c.a].r * Math.cos(points[c.a].t);
            let ay = 500 + points[c.a].r * Math.sin(points[c.a].t);
            let bx = 500 + points[c.b].r * Math.cos(points[c.b].t);
            let by = 500 + points[c.b].r * Math.sin(points[c.b].t);

            p.line(ax, ay, l(bx, ax, c.t), l(by, ay, c.t));
            
            connections[n].t += 0.001 * connections[n].d;
            if (connections[n].t > 1.0) {
                connections[n] = {
                    a: Math.floor(p.random(points.length)),
                    b: Math.floor(p.random(points.length)),
                    t: 0,
                    d: p.random(5),
                };
            }
        }
        
        for (var n = 0; n < points.length; n++) {
            p.noStroke();
            let point = points[n];
            p.fill(120, 245, 75);
            p.circle(point.r * Math.cos(point.t) + 500,
                     point.r * Math.sin(point.t) + 500, 20);
            points[n].t += points[n].d * 0.0005;
        }


    }
}
