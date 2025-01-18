function day10(p) {
    let TAU = 2 * p.PI;
    let ZERO = TAU - TAU;
    let ONE = Math.floor(TAU / TAU);
    let TWO = ONE + ONE;
    let FIVE = ONE + TWO + TWO;
    let ONE_HALF = ONE / TWO;
    let ONE_QUARTER = ONE_HALF * ONE_HALF;
    let HUNDRED = FIVE * FIVE * TWO * TWO;
    let FIVE_HUNDRED = HUNDRED * FIVE;
    let THOUSAND = HUNDRED * FIVE * TWO;
    
    let TWENTY_FIVE = FIVE * FIVE;
    let ONE_TWENTY_FIVE = TWENTY_FIVE * FIVE;

    // im lazy so i dont want to make constants for these :P
    let colors = [p.color(210, 135, 160),
                  p.color(125, 110, 160),
                  p.color(60, 90, 210)];
    
    var circles = [];
    var frameStart = ZERO;
    var len = ZERO;
    
    p.setup = function () {
        p.createCanvas(THOUSAND, THOUSAND);
        p.background(colors[TWO]);
        drawCircle(ZERO, FIVE_HUNDRED, FIVE_HUNDRED, THOUSAND);
    }
    
    function drawCircle(level, x, y, d) {
        circles.push({level: level, x: x, y: y, d: d});
        if (level == FIVE) {
            return;
        }
        let r1 = p.random(TAU);
        drawCircle(level + ONE,
                   x + ONE_QUARTER * d * Math.cos(r1),
                   y + ONE_QUARTER * d * Math.sin(r1),
                   ONE_HALF * d);
        drawCircle(level + ONE,
                   x + ONE_QUARTER * d * Math.cos(r1 + ONE_HALF * TAU),
                   y + ONE_QUARTER * d * Math.sin(r1 + ONE_HALF * TAU),
                   ONE_HALF * d);
    }
            
    p.draw = function () {
        if ((p.frameCount - frameStart) * ONE_QUARTER < circles.length) {
            len += ONE_QUARTER;
        } else {
            len -= ONE;
        }
        
        if (len < ZERO) {
            circles = [];
            drawCircle(ZERO, FIVE_HUNDRED, FIVE_HUNDRED, THOUSAND);
            frameStart = p.frameCount;
            return;
        }
        
        for (var x = ZERO; x < Math.floor(len); x++) {
            let c = circles[x];
            p.fill(colors[c.level % colors.length]);
            p.circle(c.x, c.y, c.d);
        }
        
    }
}
