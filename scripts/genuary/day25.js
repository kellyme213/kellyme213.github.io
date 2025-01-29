function day25(p) {
    
    var p1 = {};
    var p2 = {};
    var t = 0;
    
    var stars = [];
    
    function int(t) {
        return {
            x: p2.x * t + (1.0 - t) * p1.x,
            y: p2.y * t + (1.0 - t) * p1.y
        };
    }
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        
        for (var x = 0; x < 50; x++) {
            stars.push({
                x: p.random(1000),
                y: p.random(1000)
            });
        }
        
        let r1 = Math.floor(p.random(stars.length));
        let r2 = Math.floor(p.random(stars.length));
        p1 = stars[r1];
        p2 = stars[r2];
    }

    
    p.draw = function () {
        p.background(0, 0, 40, 10);
        
        p.stroke(255, 255, 128, 255);
        p.fill(255, 255, 128, 255);
        p.strokeWeight(5);
        let i = int(t);
        p.line(p1.x, p1.y, i.x, i.y);
        t += 0.05;
        if (t > 1.0) {
            p.line(p1.x, p1.y, p2.x, p2.y);
            p.circle(p2.x, p2.y, 20);
            let r1 = Math.floor(p.random(stars.length));
            p1 = p2;
            p2 = stars[r1];
            t = 0;
        }
        
        for (var n = 0; n < stars.length; n++) {
            p.circle(stars[n].x, stars[n].y, 2);
        }
    }
}
