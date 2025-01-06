function day4(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(20);
    }
    
    var blackFrames = [0, 0, 0, 0, 0, 0, 0];
    
    p.draw = function () {
        var colors = [
            {r: 255, g: 20, b: 20},
            {r: 130, g: 20, b: 255},
            {r: 255, g: 255, b: 0},
            {r: 20, g: 200, b: 0},
            {r: 0, g: 200, b: 255},
            {r: 230, g: 160, b: 0},
        ];
        for (var x = 0; x < 5; x++) {
            p.textSize(30);
            var r = colors[Math.floor(p.random(colors.length))];
            var d = p.random(0, 360);
            p.fill(r.r, r.g, r.b);
            p.text('BLACK', p.random(0, 1000), p.random(0, 1000));
        }
        
        for (var x = 0; x < blackFrames.length; x++) {
            if (blackFrames[x] > p.frameCount) {
                p.textSize(300);
                p.fill(20);
                p.text('BLACK', 0, ((x + 1) * 1000 / blackFrames.length));
            }
        }
        
        if (p.random(50) < 1) {
            var x = Math.floor(p.random(blackFrames.length));
            blackFrames[x] = p.frameCount + 100;
            //        noStroke();
            //        fill(20);
            //        square(Math.floor(random(5)) * 200, Math.floor(random(5)) * 200, 200);
            //        textSize(250);
            //        fill(20);
            //        text('BLACK', random(0,500), random(0, 1000));
        }
    }
}
