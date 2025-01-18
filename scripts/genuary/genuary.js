function applyRoundBorders() {
    const grid = document.getElementById("canvasContainer");
    const gridComputedStyle = window.getComputedStyle(grid);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    var numCanvases = document.getElementsByClassName("p5Canvas").length;

    for (var n = 0; n < numCanvases; n++) {
        var container = document.getElementById("container" + n);
        container.style.removeProperty("border-top-left-radius");
        container.style.removeProperty("border-top-right-radius");
        container.style.removeProperty("border-bottom-left-radius");
        container.style.removeProperty("border-bottom-right-radius");
    }
    
    var s = numCanvases - (numCanvases % gridColumnCount);
    console.log(s);
    document.getElementById("container0").style["border-top-left-radius"] = "20px";
    document.getElementById("container" + (numCanvases - 1)).style["border-bottom-right-radius"] = "20px";
    if (gridColumnCount == 1) {
        document.getElementById("container" + (numCanvases - 1)).style["border-bottom-left-radius"] = "20px";
    }
    document.getElementById("container" + s).style["border-bottom-left-radius"] = "20px";
    if ((numCanvases % gridColumnCount) != 0 && (s != 0)) {
        document.getElementById("container" + (s - 1)).style["border-bottom-right-radius"] = "20px";
    }
    if (gridColumnCount == numCanvases) {
        document.getElementById("container0").style["border-bottom-right-radius"] = "20px";
    }
    document.getElementById("container" + (gridColumnCount - 1)).style["border-top-right-radius"] = "20px";
}

window.onresize = applyRoundBorders;


new p5(day1, 'container0');
new p5(day2, 'container1');
new p5(day3, 'container2');
new p5(day4, 'container3');
new p5(day5, 'container4');
new p5(day6, 'container5');
//new p5(day7, 'container6');
new p5(day8, 'container7');
new p5(day9, 'container8');
new p5(day10, 'container9');
new p5(day11, 'container10');
new p5(day12, 'container11');
new p5(day13, 'container12');
new p5(day14, 'container13');
new p5(day15, 'container14');
new p5(day16, 'container15');
new p5(day17, 'container16');
new p5(day18, 'container17');
new p5(day19, 'container18');

window.onload = function() {
    applyRoundBorders();
}
