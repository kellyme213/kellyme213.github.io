function day6(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        for (var n = 0; n < 40; n++) {
            sunLines.push({d: p.random(100, 250), y: p.random(400, 600)});
        }
        for (var n = 0; n < 10; n++) {
            waves.push({r: p.random(120, 150), a: p.random(p.PI), b: p.random(1, 2)});
        }
    }
    
    var sunLines = [];
    var waves = [];
    
    p.draw = function () {
        p.background(240, 200, 70);
        p.fill(255, 170, 20);
        p.noStroke();
        
        let yellow = p.color(255, 170, 20);
        let blue = p.color(70, 110, 150);
        for (var n = 0; n < 20; n++) {
            p.fill(p.lerpColor(yellow, blue, 1.0 - (n / 20.0)));
            p.arc(500, 400, 1300 - 50 * n, 1300 - 50 * n, p.PI, 0);
        }

        p.fill(255, 120, 20);
        p.arc(500, 400, 300, 300, p.PI, 0);
        
        p.fill(20, 20, 80);
        p.rect(0, 400, 1000, 600);

        p.fill(180, 160, 120);
        p.rect(0, 800, 1000, 200);

        p.fill(20, 20, 80);
        p.arc(500, 800, 1000, 200, 0, p.PI);

        
        p.stroke(200, 140, 40);
        p.stroke(255, 120, 20);
        p.strokeWeight(5);
        
        for (var n = 0; n < sunLines.length; n++) {
            p.line(500 - 0.5 * sunLines[n].d, sunLines[n].y,
                   500 + 0.5 * sunLines[n].d, sunLines[n].y);
            if (p.random(10) < 1){
                sunLines[n].d = p.random(100, 250);
                sunLines[n].y = p.random(400, 600);
            }
        }
        
//        p.stroke(255);
//        p.noFill();
//        for (var n = 0; n < waves.length; n++) {
//            p.arc(500, 800, waves[n].r * 5, waves[n].r, waves[n].a, waves[n].a + waves[n].b);
//            waves[n].r += 0.5;
//            if (waves[n].r > 200) {
//                waves[n] = {r: p.random(120, 150), a: p.random(p.PI * 0.5), b: p.random(2)};
//
//            }
//        }
        
    }
}
