function day5(p) {
    p.setup = function () {
        p.createCanvas(1000, 1000);
        p.background(20, 20, 40);
        for (var x = 0; x < 200; x++) {
            var r = p.random(2000);
            snowflakes.push({x: (r > 1000) ? r - 1000 : 0, y: (r > 1000) ? 0 : r, s: p.random(3, 7)});
        }
    }
    
    var snowflakes = [];
    
    function drawTree(x, y) {
        p.strokeWeight(10);
        p.stroke(100, 30, 0);
        p.line(x, y, x, y + 120);
        p.stroke(0, 150, 0);
        p.strokeWeight(5);
        for (var n = 0; n < 5; n++) {
            p.line(x, y + 20 * n, x + 40 * Math.sin(-0.33 * Math.PI), y + 20 * n + (40 * Math.cos(-0.33 * Math.PI)))
            p.line(x, y + 20 * n, x - 40 * Math.sin(-0.33 * Math.PI), y + 20 * n + (40 * Math.cos(-0.33 * Math.PI)))

        }
    }
        
    p.draw = function () {
        p.background(20, 20, 40);
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 8; x++) {
                drawTree(500 + 100 * x * Math.sin(0.66 * Math.PI), 1200 + 100 * x * Math.cos(0.66 * Math.PI) - y * 150);
                drawTree(500 + 100 * x * Math.sin(1.32 * Math.PI), 1200 + 100 * x * Math.cos(1.32 * Math.PI) - y * 150);
            }
        }
        
        p.strokeWeight(5);
        p.stroke(255, 255, 230);
        for (var x = 0; x < snowflakes.length; x++) {
            p.point(snowflakes[x].x, snowflakes[x].y);
            snowflakes[x].x += snowflakes[x].s * Math.sin(0.66 * Math.PI);
            snowflakes[x].y += snowflakes[x].s * Math.cos(0.33 * Math.PI);
            if (snowflakes[x].x > 1000 || snowflakes[x].x < 0 || snowflakes[y].y > 1000 || snowflakes[x].y < 0) {
                var r = p.random(2000);
                snowflakes[x] = ({x: (r > 1000) ? r - 1000 : 0, y: (r > 1000) ? 0 : r, s: p.random(3, 7)});
            }
        }
        
    }
}
