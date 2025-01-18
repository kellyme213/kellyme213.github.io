function day7(p) {
    var img;

    p.preload = function () {
        img = p.loadImage('day7.png');
    }
    
    p.setup = function () {
        p.createCanvas(1000, 1000);
    }
        
    p.draw = function () {
        p.image(img, 0, 0, 1000, 1000);
    }
}
