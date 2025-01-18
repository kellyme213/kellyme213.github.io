function day17(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        
        for (var n = 0; n < 10; n++) {
            var x = p.random(1000);
            var y = p.random(1000);
            var r = p.random(200, 400);
            var a = p.random(6.28);
            bigCircles.push({x: x, y: y, r: r, a: a});
        }
        
        for (var n = 0; n < 20; n++) {
            var x = p.random(1000);
            var y = p.random(1000);
            var r = p.random(5, 10);
            var a = p.random(6.28);
            smallCircles.push({x: x, y: y, r: r, a: a});
        }
        p.background(0);

    }
    
    var smallCircles = [];
    var bigCircles = [];

    p.draw = function () {
        p.strokeWeight(1);
        p.stroke(255);
        p.fill(230, 70, 150);
        
        var s = 0.05 * p.frameCount;
        
        for (var n = 0; n < smallCircles.length; n++) {
            var c = smallCircles[n];
            p.arc(c.x, c.y, 60, 60, s, s + p.PI + p.QUARTER_PI, p.OPEN);
            c.x += c.r * Math.cos(c.a);
            c.y += c.r * Math.sin(c.a);
            smallCircles[n] = c;
            
            if (p.random(100) < 1) {
                var x = p.random(1000);
                var y = p.random(1000);
                var r = p.random(5, 10);
                var a = p.random(6.28);
                smallCircles[n] = {x: x, y: y, r: r, a: a};
            }
        }
        
        p.fill(50, 100, 50);
        for (var n = 0; n < bigCircles.length; n++) {
            var c = bigCircles[n];
            p.arc(c.x + c.r * Math.cos(c.a),
                  c.y + c.r * Math.sin(c.a), 100, 100, 0, p.PI + p.HALF_PI);
            p.arc(c.x + c.r * Math.cos(c.a),
                  c.y + c.r * Math.sin(c.a), 150, 100, p.PI + p.HALF_PI, 2 * p.PI + 0.5 * p.QUARTER_PI);
            c.a += 0.02;
            bigCircles[n] = c;
            if (p.random(100) < 1) {
                var x = p.random(1000);
                var y = p.random(1000);
                var r = p.random(200, 400);
                var a = p.random(6.28);
                bigCircles[n] = {x: x, y: y, r: r, a: a};
            }
        }
    }
}
