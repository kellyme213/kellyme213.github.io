function day2(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(20);
    }
    
    var squareArray = [];
    
    p.draw = function () {
        
        for (var x = 0; x < squareArray.length; x++) {
            var obj = squareArray[x];
            if (obj.frameCount == p.frameCount) {
                
                p.noStroke();
                p.fill(obj.r, obj.g, obj.b);
                p.rect(obj.x, obj.y, obj.w, obj.w, 20);
                
                squareArray = squareArray.filter(function(item){
                    return item !== obj
                });
                x--;
            }
        }
        
        if (p.random(3) <= 1) {
            var x1 = p.random(50, 950);
            var y1 = p.random(50, 950);
            //        var isPurple = (Math.round(random(3)) == 1);
            for (var x = 0; x < p.random(3, 7); x++) {
                var obj = {};
                obj.frameCount = p.frameCount + 10 * x;
                r = p.lerp(255, 50, (x / 5));
                b = 50;
                //            if (isPurple) {
                //                b = lerp(255, 50, (x / 5));
                //            }
                obj.r = r;
                obj.g = 0;
                obj.b = b;
                //fill(r, 0, 0);
                w = p.lerp(200, 25, x / 5);
                obj.w = w;
                //rect(500 - w * 0.5, 500 - w * 0.5, w, w, 20);
                obj.x = x1 - w * 0.5;
                obj.y = y1 - w * 0.5;
                squareArray.push(obj);
                
            }
        }
        
        //    noStroke();
        //    for (var x = 0; x < 5; x++) {
        //        r = lerp(255, 50, (x / 5));
        //        fill(r, 0, 0);
        //        w = lerp(200, 25, x / 5);
        //        rect(500 - w * 0.5, 500 - w * 0.5, w, w, 20);
        //    }
    }
}
