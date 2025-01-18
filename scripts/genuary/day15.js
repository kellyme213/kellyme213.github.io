function day15(p) {
    
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(0);
        for (var n = 0; n < 5000; n++) {
            let r1 = Math.floor(p.random(colors.length));
            let r2 = p.random(6.28);
            let r3 = p.random(0.05) - 0.025;
            let r4 = p.random(10) - 5;
            p.stroke(colors[r1].r, colors[r1].g, colors[r1].b);
            p.line(500 + (450 + r4) * Math.cos(r2), 500 + (450 + r4) * Math.sin(r2),
                   500 + 425 * Math.cos(r2 + r3), 500 + 425 * Math.sin(r2 + r3));
        }
        
        
        for (var n = 0; n < 150; n++) {
            let r2 = p.random(6.28);
            clouds.push({r: r2, d: p.random(250, 350), r2: p.random(30, 60)});
        }


    }
    
    var clouds = [];
    
    var colors = [
                  {r: 160, g: 235, b: 250},
                  {r: 120, g: 125, b: 130},
                  {r: 40, g: 60, b: 250},
                  {r: 20, g: 25, b: 50},
                  ];
    

    p.draw = function () {
        p.noStroke();
        p.fill(colors[2].r, colors[2].g, colors[2].b);
        p.circle(500, 500, 850);
        p.fill(colors[0].r, colors[0].g, colors[0].b);
        p.circle(500, 500, 830);
        p.fill(250, 250, 160);
        p.circle(500, 500, 200);
        p.stroke(20, 25, 50);
        p.strokeWeight(10);
        p.line(470, 450, 470, 500);
        p.line(530, 450, 530, 500);
        p.arc(500, 500, 120, 120, 0 + 0.5, 3.14 - 0.5);
        
        p.noStroke();
        for (var n = 0; n < clouds.length; n++) {
            p.fill(255);
            let r = clouds[n].r;
            let d = clouds[n].d;
            let r2 = clouds[n].r2;

            p.circle(500 + d * Math.cos(r + 0.005 * p.frameCount),
                     500 + d * Math.sin(r + 0.005 * p.frameCount), r2);
        }
        
    }
}
