window.onresize = function () {
    const grid = document.getElementById("canvasContainer");
    const gridComputedStyle = window.getComputedStyle(grid);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    var topLeft = document.getElementById("");
    var numCanvases = document.getElementsByClassName("p5Canvas").length;
    
    for (var x = 0; x < numCanvases; x++) {
        var canvas = document.getElementById()
    }
    
    console.log(gridColumnCount, numCanvases);
}


new p5(day1, 'container0');
new p5(day2, 'container1');
new p5(day3, 'container2');
new p5(day4, 'container3');
new p5(day5, 'container4');
new p5(day6, 'container5');
new p5(day7, 'container6');
new p5(day8, 'container7');



