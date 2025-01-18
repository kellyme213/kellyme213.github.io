function day8(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.angleMode(p.DEGREES);
        p.textFont('Courier New Bold');
    }
        
    p.draw = function () {
        p.background(20, 20, 40);
        
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 12; y++) {
                p.push();
                p.translate(100 * x + 50, 100 * y + 50 * (x % 2) - 50);
                
                p.textSize(80);
                p.stroke(130, 160, 50);
                p.fill(130, 160, 50);
                p.push();
                p.rotate(0 + 0.5 * p.frameCount + 60 * (x % 6));
                p.textAlign(p.CENTER, p.TOP);
                p.text('1', 0, -10);
                p.pop();
                
                
                p.stroke(200, 150, 60);
                p.fill(200, 150, 60);
                p.textSize(40);
                p.textAlign(p.CENTER);
                p.circle(0, 0, 20, 20);
                for (var n = 0; n < 6; n++) {
                    p.stroke(100, 30, 140);
                    p.fill(100, 30, 140);
                    p.push();
                    //p.translate(500, 500);
                    p.rotate(60 * (n) + 30 + 0.5 * p.frameCount + 60 * (x % 6));
                    p.translate(0, -20);
                    p.text('0', 0, 0);
                    p.pop();
                }
                p.pop();
            }
        }
    }
}
