function day1(p) {
    count = 0;
    p.setup = function () {
        p.createCanvas(500, 500);
    }
    
    function clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
        
    p.draw = function () {
        count += 1;
        p.background(20);
        
        p.strokeWeight(1);
        p.noFill();
        p.stroke(200);
        for (var x = 0; x < 80; x++) {
            var diff = (Math.sin(count * 0.1) * 5) + clamp(Math.tan(count * 0.05 + 50 * x) * 20, -50, 50);
            p.line(150 + diff, 0 + 8 * x, 150 - diff, 0 + 8 * x);
        }
        for (var x = 0; x < 80; x++) {
            var diff = (Math.sin(count * 0.1) * 5) + clamp(Math.tan(count * 0.05 + 50 * x) * 20, -50, 50);
            p.line(350 + diff, 500 - 8 * x, 350 - diff, 500 - 8 * x);
        }
        
        p.stroke(200, 0, 0);
        for (var x = 0; x < 80; x++) {
            var diff = (Math.sin(count * 0.1) * 5) + clamp(Math.tan(count * 0.05 + 50 * x) * 20, -50, 50);
            p.line(500 - 8 * x, 350 + diff, 500 - 8 * x, 350 - diff);
        }
        
        for (var x = 0; x < 80; x++) {
            var diff = (Math.sin(count * 0.1) * 5) + clamp(Math.tan(count * 0.05 + 50 * x) * 20, -50, 50);
            p.line(0 + 8 * x, 150 + diff, 0 + 8 * x, 150 - diff);
        }
        
        
    }
}
