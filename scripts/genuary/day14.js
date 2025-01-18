function day14(p) {
    
    var points = [];
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.angleMode(p.DEGREES);
        for (var n = 0; n < 5; n++) {
            let a = p.random(360);
            let r = p.random(5, 15);
            points.push({
                x: p.random(1000),
                y: p.random(1000),
                dx: r * Math.cos(a),
                dy: r * Math.sin(a),
            });
        }
    }
    

    p.draw = function () {
        p.background(0);
        p.noStroke();
        p.fill(255);
        for (var x = 0; x < 25; x++) {
            for (var y = 0; y < 25; y++) {
                p.push();
                let dx = 40 * x + 20;
                let dy = 40 * y + 20;
                p.translate(dx, dy);
                
                let minDist = 10000;
                for (var n = 0; n < points.length; n++) {
                    let dist = Math.sqrt(Math.pow(points[n].x - dx, 2) +
                                         Math.pow(points[n].y - dy, 2));
                    minDist = Math.min(minDist, dist);
                }
                
                
                let d = minDist * 0.06;
                p.rotate(Math.min(d * 2, 45));
                p.square(-0.5 * d, -0.5 * d, d);
                p.pop();
            }
        }
        
        for (var n = 0; n < points.length; n++) {
            let newX = points[n].x + points[n].dx;
            let newY = points[n].y + points[n].dy;
            if (newX > 1000 || newX < 0 || newY > 1000 || newY < 0) {
                let a = p.random(360);
                let r = p.random(5, 15);
                points[n].dx = r * Math.cos(a);
                points[n].dy = r * Math.sin(a);
            } else {
                points[n].x = newX;
                points[n].y = newY;
            }
        }
        
    }
}
