//window.onscroll = function(){makeSticky()};
//window.onscroll = function(){addBlur()};
window.onscroll = function()
{
    if (window.pageYOffset / window.innerHeight > 1.1) {
        document.getElementById("svgCircle").style.display = 'none';
    } else {
        document.getElementById("svgCircle").style.display = 'block';
    }
};

var numSteps = 400;
var speed = 50;
var xPoints = [];
var yPoints = [];
var radii = [];
var opac = [];
var dx = [];
var dy = [];
var dr = [];
var dop = [];
var numCircles = 30;
var drawLines = false;
var bannerNum = 2;

for (var n = 0; n < numCircles; n++)
{
    xPoints[n] = Math.round(Math.random() * window.innerWidth);
    yPoints[n] = Math.round(Math.random() * window.innerHeight);
    var px = Math.round(Math.random() * window.innerWidth);
    var py = Math.round(Math.random() * window.innerHeight);
    
    dx[n] = (px - xPoints[n]) / numSteps;
    dy[n] = (py - yPoints[n]) / numSteps;
}

var htmlInsert = "";

for (var n = 0; n < numCircles; n++)
{
    var circleInsert = "<circle id = \"cir" + (n) + "\" ";
    var radius = Math.round(Math.random() * 50);
    radii[n] = radius;
    dr[n] = (Math.round(Math.random() * 50) - radii[n]) / numSteps;
    circleInsert += "cx = \"" + xPoints[n] + "\" cy = \"" + yPoints[n] + "\" r = \"" + radii[n];
    circleInsert += "\"> </circle>\n";
    htmlInsert += circleInsert;
    if (drawLines)
    {
        var lineInsert = "<line id = \"line" + n + "\" x1 = \"" + xPoints[n % numCircles] + "\" y1 = \"" + yPoints[n % numCircles] + "\" x2 = \"" + xPoints[(n + 1) % numCircles] + "\" y2 = \"" + yPoints[(n + 1) % numCircles] + "\"/>\n"
        htmlInsert += lineInsert;
    }
}

document.getElementById("svgCircle").innerHTML += htmlInsert;

for (var n = 0; n < numCircles; n++)
{
    var opacity = Math.sqrt(Math.random());
    opac[n] = opacity;
    document.getElementById("cir" + n).style.fillOpacity = opacity;
    dop[n] = (Math.sqrt(Math.random()) - opacity) / numSteps;
}

window.setInterval(moveRandom, speed);
window.setInterval(newPoints, numSteps * speed);


function moveRandom()
{
    for (var n = 0; n < numCircles; n++)
    {
        xPoints[n] += dx[n];
        yPoints[n] += dy[n];
        radii[n] += dr[n];
        opac[n] += dop[n];
        var circle = document.getElementById("cir" + n);
        circle.setAttribute("cx", xPoints[n]);
        circle.setAttribute("cy", yPoints[n]);
        circle.setAttribute("r", radii[n]);
        circle.setAttribute("fill-opacity", opac[n]);
        
        if (drawLines)
        {
            var line = document.getElementById("line" + n);
            line.setAttribute("x1", xPoints[n % numCircles]);
            line.setAttribute("y1", yPoints[n % numCircles]);
            line.setAttribute("x2", xPoints[(n + 1) % numCircles]);
            line.setAttribute("y2", yPoints[(n + 1) % numCircles]);
        }
    }
}

function newPoints()
{
    for (var n = 0; n < numCircles; n++)
    {
        var px = Math.round(Math.random() * window.innerWidth);
        var py = Math.round(Math.random() * window.innerHeight);
        
        dx[n] = (px - xPoints[n]) / numSteps;
        dy[n] = (py - yPoints[n]) / numSteps;
        dr[n] = (Math.round(Math.random() * 50) - radii[n]) / numSteps;
        dop[n] = (Math.sqrt(Math.random()) - opac[n]) / numSteps;
    }
}

function addBlur()
{
    var blurAmount = 3;
    var temp = document.getElementById("svgCircle");
    
    var percent = blurAmount * window.pageYOffset / window.innerHeight;
    
    if (percent > blurAmount)
    {
        percent = blurAmount;
    }
    if (percent < 0)
    {
        percent = 0;
    }
    
    temp.style.filter = "blur(" + percent + "px)";
}

function makeSticky()
{
    for (var x = 0; x < bannerNum; x++)
    {
        document.getElementById("banner" + x).classList.remove("sticky");
    }
    
    for (var x = bannerNum - 1; x >= 0; x--)
    {
        var header = document.getElementById("banner" + x);
        if (window.pageYOffset >= header.offsetTop)
        {
            header.classList.add("sticky");
            for (var y = x - 1; y >= 0; y--)
            {
                document.getElementById("banner" + y).classList.remove("sticky");
            }
            return;
        }
        else
        {
            header.classList.remove("sticky");
        }
    }
}
