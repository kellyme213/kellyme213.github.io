generateA("Resume", "resume.html", "resumeBar");
generateA("Course Work", "coursework.html", "courseworkBar");
generateA("GitHub", "https://www.github.com/kellyme213", "githubBar");
//generateA("Short Films", "film.html", "filmBar");
generateP("Graphics");
generateA("Balloon Simulation", "balloon.html", "balloonBar");
generateA("Ray Tracer", "raytracer.html", "raytracerBar");
generateA("Plasma Ball", "plasmaball.html", "plasmaballBar");
//generateA("Fun With Shaders", "shader.html", "shaderBar");
generateP("Tools");
generateA("PyMEL Cherry Blossoms", "blossom.html", "blossomBar");
generateP("3D Art");
generateA("3D Modeling", "modeling.html", "modelingBar");
generateA("Lighting", "lighting.html", "lightingBar");
generateP("Games");
generateA("OXIO", "oxio.html", "oxioBar");
generateA("Connect the Shapes!", "shapes.html", "shapesBar");
generateA("Duality", "duality.html", "dualityBar");
//generateA("The Dungeon", "dungeon.html", "dungeonBar");
//generateImage();

function generateA(name, link, id)
{
    var a = document.createElement("A");
    a.appendChild(document.createTextNode(name));
    a.id = id;
    a.href = link;
    document.getElementById("sidebar").appendChild(a);
}

function generateP(name)
{
    var p = document.createElement("P");
    p.appendChild(document.createTextNode(name));
    document.getElementById("sidebar").appendChild(p);
}

function generateImage()
{
    var a = document.createElement("A");
    a.className = "barImg";
    a.href = "index.html";
    var img = document.createElement("IMG");
    img.src = "pictures/logo-white.png";
    a.appendChild(img);
    document.getElementById("sidebar").appendChild(a);
}
