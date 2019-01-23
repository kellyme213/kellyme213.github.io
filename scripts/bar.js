generateA("Resume", "resume.html", "resumeBar");
generateA("Course Work", "coursework.html", "courseworkBar");
generateA("GitHub", "https://www.github.com/kellyme213", "githubBar");
generateP("3D Art");
generateA("3D Modeling", "modeling.html", "modelingBar");
generateA("Lighting", "lighting.html", "lightingBar");
generateP("Graphics Projects");
generateA("Ray Tracer", "raytracer.html", "raytracerBar");
generateA("Plasma Ball", "plasmaball.html", "plasmaballBar");
generateA("PyMEL Cherry Blossoms", "blossom.html", "blossomBar");
generateP("Games");
generateA("OXIO", "oxio.html", "oxioBar");
generateA("Connect the Shapes!", "shapes.html", "shapesBar");
generateA("The Dungeon", "dungeon.html", "dungeonBar");
//generateP("Short Films");
//generateA("Films", "film.html", "filmBar");

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
