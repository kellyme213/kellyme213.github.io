generateP("Graphics");
generateA("Balloon Simulation", "balloon.html", "balloonBar");
generateA("GPU Photon Mapping", "photonmapping.html", "photonmappingBar");
generateA("Plasma Ball", "plasmaball.html", "plasmaballBar");

generateP("Games");
generateA("Pandora's Box", "escaperoom.html", "escaperoomBar");
generateA("The Lonely Fisherman", "fisherman.html", "fishermanBar");
generateA("OXIO", "oxio.html", "oxioBar");

generateP("Tools");
generateA("AR Camera Layout Tool", "arcamera.html", "arCameraBar");
generateA("Procedural Snowman", "snowman.html", "snowmanBar");

generateP("3D Art");
generateA("3D Modeling", "modeling.html", "modelingBar");
generateA("Lighting", "lighting.html", "lightingBar");
//generateImage();

function generateA(name, link, id, section)
{
    var a = document.createElement("A");
    a.appendChild(document.createTextNode(name));
    a.id = id;
    a.href = link;
    //a.style = "display: none";
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
