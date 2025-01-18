function day12(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(255, 255, 235);
        
        for (var n = 0; n < 4; n++) {
            layers.push(p.random(6));
        }
    }
    
    var layers = [];
    var count = 0;
    
    function drawLayer(count, d) {
        
        if (count == layers.length) {
            return;
        }
        
        for (var n = 0; n < 3; n++) {
            p.push();
            p.translate(d * Math.cos(0.66 * n * p.PI),
                        d * Math.sin(0.66 * n * p.PI));
            p.rotate(0.005 * p.frameCount);
            p.triangle(d * Math.cos(0), d * Math.sin(0),
                       d * Math.cos(0.66 * p.PI), d * Math.sin(0.66 * p.PI),
                       d * Math.cos(1.32 * p.PI), d * Math.sin(1.32 * p.PI));
            drawLayer(count + 1, d / layers[count]);
            p.pop();
        }
        
    }
    
    
                
    p.draw = function () {
        p.background(255, 255, 235);
        p.noFill();
        p.push();
        p.translate(500, 500);
        let d = 500;
        p.rotate(0.005 * p.frameCount);
        p.triangle(d * Math.cos(0), d * Math.sin(0),
                   d * Math.cos(0.66 * p.PI), d * Math.sin(0.66 * p.PI),
                   d * Math.cos(1.32 * p.PI), d * Math.sin(1.32 * p.PI));
        drawLayer(0, d / layers[0]);
        p.pop();
        
        count += 0.005;
        if (count > 0.66 * p.PI) {
            count = 0;
            for (var n = 0; n < 4; n++) {
                layers[n] = p.random(6);
            }
        }
    }
}
