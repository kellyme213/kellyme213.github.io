function day28(p) {
    

    var letters = [];
    var colors = [
                  p.color(0, 0, 80),
                  p.color(0, 0, 240),
                  p.color(40, 40, 80),
                  p.color(200, 200, 255),
                  p.color(80, 100, 240),
                  ];
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        
        for (var n = 0; n < 200; n++) {
            letters.push({
                y: p.random(-200, 1200),
                x: p.random(-50, 1050),
                c: Math.floor(p.random(colors.length)),
                s: p.random(50, 250),
                d: p.random(3, 8),
                
            });
        }
        
    }
    
    p.draw = function () {
        p.background(0, 0, 30);
        
        for (var n = 0; n < letters.length; n++) {
            p.noStroke();
            p.fill(colors[letters[n].c]);
            p.textSize(letters[n].s);
            p.text('X', letters[n].x, letters[n].y);
            letters[n].y += letters[n].d;
            
            if (letters[n].y > 1300) {
                letters[n].y = -200;
            }
        }
    }
}
