function day20(p) {
    
    
    function generateLevels() {
        levels = [];
        levels.push([{x: 500 + (p.random(50) - 25), y: 900, w: 800 - p.random(50), dw: 0 }]);
        
        for (var n = 0; n < 20; n++) {
            for (var m = 0; m < levels[n].length; m++) {
                var r = levels[n][m];
                var level = [];
                if (p.random(5) < 1) {
                    level.push({
                        x: r.x + 0.33 * r.w,
                        y: r.y - 50,
                        w: (r.w) * 0.33,
                        dw: 0
                    });
                    level.push({
                        x: r.x - 0.33 * r.w,
                        y: r.y - 50,
                        w: (r.w) * 0.33,
                        dw: 0
                    });

                } else {
                    level.push({
                        x: r.x + (p.random(50) - 25),
                        y: r.y - 50,
                        w: r.w + (p.random(50) - 25),
                        dw: 0
                    });
                }
                levels.push(level);
            }
        }

    }
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.rectMode(p.CENTER);
        p.stroke(0);
        p.strokeWeight(5);
        generateLevels();
    }

    
    var levels = [];
    var wait = 0;
        
    p.draw = function () {
        p.background(230, 210, 220);
        var increment = true;
        p.fill(145);
        for (var n = 0; n < levels.length; n++) {
            for (var m = 0; m < levels[n].length; m++) {
                if (levels[n][m].dw > 25) {
                    p.rect(levels[n][m].x, levels[n][m].y, levels[n][m].dw, 50, 25);
                }
                if (levels[n][m].dw <= levels[n][m].w && increment) {
                    increment = false;
                    levels[n][m].dw += 20;
                }
                
                
//                var a = Math.min(5, Math.floor(levels[n][m].w / 100));
//                for (var s = 0; s < a; s++) {
//                    p.circle(levels[n][m].x + s * Math.floor(levels[n][m].w / a) - levels[n][m].w * (0.375),
//                             levels[n][m].y, 25);
//                }
//
            }
        }
        
        if (increment) {
            wait += 1;
        }
        
        if (wait >= 120) {
            generateLevels();
            wait = 0;
        }
    }
}
