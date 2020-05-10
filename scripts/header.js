generateArtHeader();
generateToolsHeader();
generateGamesHeader();
generateGraphicsHeader();

function createHeaderSection(name)
{
	var header = document.createElement("DIV");
	header.className = "headerSection";
	var p = document.createElement("P");
	p.appendChild(document.createTextNode(name));
	header.appendChild(p);
	return header;
}

function createLink(name, link, id)
{
	var a = document.createElement("A");
    a.appendChild(document.createTextNode(name));
    a.id = id;
    a.href = link;
    return a;
}

function generateGraphicsHeader()
{
	var section = createHeaderSection("Graphics");
	var sectionContent = document.createElement("DIV");
	sectionContent.className = "headerContent";
	sectionContent.appendChild(createLink("Balloon Simulation", "balloon.html", "balloonBar"));
	sectionContent.appendChild(createLink("GPU Photon Mapping", "photonmapping.html", "photonmappingBar"));
	sectionContent.appendChild(createLink("Plasma Ball", "plasmaball.html", "plasmaballBar"));
	section.appendChild(sectionContent);

	document.getElementById("header").prepend(section);
}


function generateGamesHeader()
{
	var section = createHeaderSection("Games");
	var sectionContent = document.createElement("DIV");
	sectionContent.className = "headerContent";
	sectionContent.appendChild(createLink("Pandora's Box", "escaperoom.html", "escaperoomBar"));
	sectionContent.appendChild(createLink("The Lonely Fisherman", "fisherman.html", "fishermanBar"));
	sectionContent.appendChild(createLink("OXIO", "oxio.html", "oxioBar"));
	section.appendChild(sectionContent);

	document.getElementById("header").prepend(section);
}

function generateToolsHeader()
{
	var section = createHeaderSection("Tools");
	var sectionContent = document.createElement("DIV");
	sectionContent.className = "headerContent";
	sectionContent.appendChild(createLink("AR Camera Layout Tool", "arcamera.html", "arCameraBar"));
	sectionContent.appendChild(createLink("Procedural Snowman", "snowman.html", "snowmanBar"));
	section.appendChild(sectionContent);

	document.getElementById("header").prepend(section);
}

function generateArtHeader()
{
	var section = createHeaderSection("Art");
	var sectionContent = document.createElement("DIV");
	sectionContent.className = "headerContent";
	sectionContent.appendChild(createLink("3D Modeling", "modeling.html", "modelingBar"));
	sectionContent.appendChild(createLink("Lighting", "lighting.html", "lightingBar"));
	section.appendChild(sectionContent);

	document.getElementById("header").prepend(section);
}












