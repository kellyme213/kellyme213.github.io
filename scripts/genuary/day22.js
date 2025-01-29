function day22(p) {
    
    let c = 20;
    let weights = [];
    let spin = [];

    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(40, 20, 60);
        for (var n = 0; n < c; n++) {
            if (n % 2 == 0) {
                weights.push(1);
            } else {
                weights.push(-1);
            }
            spin.push(0);
        }
    }

    
    
    p.draw = function () {
        
        let c1 = p.color(240, 20, 90, 150);
        let c2 = p.color(130, 0, 240, 150);

        p.noStroke();
        p.arc(500, 500, 200, 200, 0, 1, p.PIE);
        
        for (var m = 0; m < c; m++) {
            let b = 10 + (c - m);
            if (p.random(1000) < 1) {
                weights[m] *= -1;
            }
            spin[m] += 0.005 * weights[m];
            for (var n = 0; n < b; n++) {
                var d = spin[m];
                p.fill(p.lerpColor(c1, c2, n / b));
                p.arc(500, 500, 1000 - 50 * m, 1000 - 50 * m,
                      d + 6.28 * n / b,
                      d + 6.28 * (n + 1) / b);
            }
        }
        

    }
}
