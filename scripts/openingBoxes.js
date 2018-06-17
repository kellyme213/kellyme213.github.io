
var oxioInsert = '\
<p>\
<i>OXIO</i> is a puzzle game currently in development for iOS and macOS and is set for release in fall 2018 (hopefully). \
In <i>OXIO</i>, the player moves the center of mass of a group of blocks to the goal. This is \
accomplished by changing the mass of the blocks and moving the blocks around the screen. \
</p>\
\
<ul class = "imagelist">\
<img src = "pictures/oxio/oxio1.gif" alt = "OXIO" style = "width: 25%"/>\
<img src = "pictures/oxio/oxio2.gif" alt = "OXIO" style = "width: 25%"/>\
<img src = "pictures/oxio/oxio3.gif" alt = "OXIO" style = "width: 25%"/>\
<img src = "pictures/oxio/oxio4.gif" alt = "OXIO" style = "width: 25%"/>\
</ul>\
\
<p>\
To speed up game development, I programmed a real-time level editor in the macOS version \
of the game.\
</p>\
\
<img src = "pictures/oxio/oxio5.gif" alt = "OXIO" style = "width: 50%"/>\
\
<p>\
A demo version of <i>OXIO</i> earned me a ticket to Apple\'s  Worldwide Developers Conference in 2017 and 2018.\
</p>\
\
<div class = "links">\
<a href = "https://github.com/kellyme213/OXIO" target = "_blank"> Source Code </a>\
</div>\
\
<div class = "links">\
<a href = "downloads/other/OXIOmac.zip" target = "_blank" download> Download demo for macOS </a>\
</div>\
';

var rayInsert = '\
<p>\
Following an online tutorial, I programmed a ray tracer in Swift for macOS. The tutorial \
only rendered spheres, so I extended my ray tracer to render cones, cylinders, planes, and \
polygons. Additionally, I implemented lighting to allow for more complex renders. \
</p>\
\
<img src = "pictures/raytracer/raytracer1.png" alt = "render1" style = "width: 95%;"/>\
<img src = "pictures/raytracer/raytracer2.png" alt = "render2" style = "width: 95%;"/>\
<img src = "pictures/raytracer/raytracer3.png" alt = "render3" style = "width: 95%;"/>\
<img src = "pictures/raytracer/raytracer4.png" alt = "render4" style = "width: 95%;"/>\
<img src = "pictures/raytracer/raytracer5.png" alt = "render5" style = "width: 95%;"/>\
<img src = "pictures/raytracer/raytracer6.png" alt = "render6" style = "width: 95%;"/>\
\
<div class = "links">\
<a href = "https://github.com/kellyme213/RayTracers" target = "_blank"> Source Code </a>\
</div>\
';

var shapesInsert = '\
<p>\
<i>Connect the Shapes!</i> is a cross between a match-three game and connect the dots. \
Shapes are cleared from the board when they are linked together with shapes of the same \
type. If a shape is surrounded by a box of the same color, the player get a bonus. \
<i> Connect the Shapes! </i> is available on the App Store.\
</p>\
\
<ul class = "imagelist">\
<img src = "pictures/shapes/shapes1.gif" alt = "shapes" style = "width: 20%"/>\
</ul>\
\
<p>\
A demo version of <i>Connect the Shapes!</i> earned me a ticket to Apple\'s 2016 \
Worldwide Developers Conference.\
</p>\
\
<div class = "links">\
<a href = "https://github.com/kellyme213/ConnectTheShapes" target = "_blank"> Source Code </a>\
</div>\
\
<div class = "links">\
<a href = "https://itunes.apple.com/us/app/id1121069737" target = "_blank"> View on the App Store </a>\
</div>\
';

var dungeonInsert = '\
<p>\
<i>The Dungeon</i> is a top-down adventure game developed in Java. The player moves around \
the world with the arrow keys and attacks/interacts with objects by pressing the space bar. \
The game engine uses a very primitive animation system that I wrote myself. \
</p>\
\
<ul class = "imagelist">\
<img src = "pictures/dungeon/dungeon1.gif" alt = "dungeon" style = "width: 40%;"/>\
<img src = "pictures/dungeon/dungeon2.gif" alt = "dungeon" style = "width: 40%;"/>\
</ul>\
\
<div class = "links">\
<a href = "https://github.com/kellyme213/TheDungeon" target = "_blank"> Source Code </a>\
</div>\
\
<p>\
After a few months, I rewrote the game engine to include other features, like multithreading, \
movable objects, and a level editor.\
</p>\
\
<ul class = "imagelist">\
<img src = "pictures/dungeon/dungeon3.gif" alt = "dungeon" style = "width: 40%;"/>\
<img src = "pictures/dungeon/dungeon4.gif" alt = "dungeon" style = "width: 40%;"/>\
<img src = "pictures/dungeon/dungeon5.gif" alt = "dungeon" style = "width: 40%;"/>\
</ul>\
\
<div class = "links">\
<a href = "https://github.com/kellyme213/DungeonGame" target = "_blank"> Source Code </a>\
</div>\
';



var oxioOpen = false;
function openBoxOxio()
{
    if (oxioOpen)
    {
        closeBox("oxio", 17);
    }
    else
    {
        openBox("oxio", 145, oxioInsert);
    }
    
    oxioOpen = !oxioOpen;
}

var rayOpen = false;
function openBoxRay()
{
    if (rayOpen)
    {
        closeBox("ray", 17);
    }
    else
    {
        openBox("ray", 250, rayInsert);
    }
    
    rayOpen = !rayOpen;
}

var shapesOpen = false;
function openBoxShapes()
{
    if (shapesOpen)
    {
        closeBox("shapes", 17);
    }
    else
    {
        openBox("shapes", 77, shapesInsert);
    }
    
    shapesOpen = !shapesOpen;
}

var dungeonOpen = false;
function openBoxDungeon()
{
    if (dungeonOpen)
    {
        closeBox("dungeon", 17);
    }
    else
    {
        openBox("dungeon", 136, dungeonInsert);
    }
    
    dungeonOpen = !dungeonOpen;
}

function openBox(name, endingWidth, insert)
{
    var box = document.getElementById(name + "box");
    box.style.height = endingWidth + "vw";
    document.getElementById(name + "inside").innerHTML = insert;
    return;
    
    var h = 17;
    var id = setInterval(frame, 5);
    function frame() {
        if (h >= endingWidth) {
            box.style.height = endingWidth + "vw";
            clearInterval(id);
        } else {
            h += 2;
            box.style.height = h + "vw";
            console.log(box.style.height);
        }
    }
}

function closeBox(name, endingWidth)
{
    document.getElementById(name + "box").style.height = endingWidth + "vw";
    document.getElementById(name + "inside").innerHTML = "";
}

