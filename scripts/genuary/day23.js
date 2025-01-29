function day23(p) {
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
        for (var n = 0; n < 11; n++) {
            colors.push((n % 2) === 0);
        }
    }

    var colors = [];
    var count = 0;
    
    p.draw = function () {
        p.background(40);
        p.fill(0);
        p.strokeWeight(3);
        
        var line = [];
        line.push({x: 0, y: 0});
        for (var x = 0; x < 50; x++) {
            var l = {};
            var end = line[line.length - 1];
            l.x = end.x + 50;
            l.y = end.y + (((x % 2) === 0) ? -20 : 20);
            line.push(l);
        }
        
        
        for (var n = 0; n < colors.length; n++) {
            for (var x = 0; x < line.length - 1; x++) {
                let dx = -300 + 200 * Math.sin(p.frameCount * 0.02 + ((n + 2) % 2) * 3.14);
                let dy = 0 + 100 * n;
                if (colors[n]) {
                    p.fill(40);
                    p.stroke(210, 200, 80);
                } else {
//                    p.fill(60, 120, 230);
//                    p.stroke(60, 120, 230);
                    p.fill(210, 200, 80);
                    p.stroke(40);
                }
                p.quad(dx + line[x].x + 50, dy + line[x].y + 50,
                       dx + line[x + 1].x + 50, dy + line[x + 1].y + 50,
                       dx + line[x + 1].x - 50, dy + line[x + 1].y - 50,
                       dx + line[x].x - 50, dy + line[x].y - 50,);
            }
        }
        
//        if (p.frameCount % 50 == 0) {
//            colors[count] = !colors[count];
//            count = (count + 1) % colors.length;
//        }
    }
}
