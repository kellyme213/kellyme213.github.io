function day27(p) {
    

    p.setup = function () {
        p.createCanvas(1000, 1000);
    }

    function drawLines(points) {
        for (var n = 0; n < points.length - 1; n++) {
            p.line(points[n].x, points[n].y,
                   points[n+1].x, points[n+1].y);
        }
        p.line(points[points.length-1].x, points[points.length-1].y,
               points[0].x, points[0].y);
    }
    
    function lerp(a, b, t) {
        return {
            x: a.x * t + (1.0 - t) * b.x,
            y: a.y * t + (1.0 - t) * b.y
        };
    }
    
    function draw(points, r) {
        for (var m = 0; m < 5; m++) {
            if (m % 2 == 0) {
                p.stroke(20);
            } else {
                p.stroke(255, 0, 0);
            }
            drawLines(points);
            
            var newPoints = [];
            for (var n = 0; n < points.length - 1; n++) {
                newPoints.push(lerp(points[n], points[n+1], r));
            }
            newPoints.push(lerp(points[points.length-1], points[0], r));
            points = newPoints;
        }
    }
    
    var r = 0.5;
    var d = 0.01;
    
    p.draw = function () {
        p.background(230);
        p.stroke(20);
        p.strokeWeight(5);
        
        r += d;
        if (r > 2.0) {
            d = -0.01;
        }
        if (r < -2.0) {
            d = 0.01;
        }
        
        //var r = 2 * Math.sin(0.01 * p.frameCount);
        
        var points = [
                      {x: 250, y: 250},
                      {x: 250, y: 750},
                      {x: 750, y: 750},
                      {x: 750, y: 250}
                      ];
        draw(points, r);
        
        var points2 = [
                      {x: 0, y: 250},
                      {x: 0, y: 750},
                      {x: 500, y: 750},
                      {x: 500, y: 250}
                      ];
        draw(points2, r);
        
        var points3 = [
                      {x: 500, y: 250},
                      {x: 500, y: 750},
                      {x: 1000, y: 750},
                      {x: 1000, y: 250}
                      ];
        draw(points3, r);

        var points4 = [
                      {y: 0, x: 250},
                      {y: 0, x: 750},
                      {y: 500, x: 750},
                      {y: 500, x: 250}
                      ];
        draw(points4, r);
        
        var points5 = [
                      {y: 500, x: 250},
                      {y: 500, x: 750},
                      {y: 1000, x: 750},
                      {y: 1000, x: 250}
                      ];
        draw(points5, r);

    }
}
