generateA("About", "/about.html");
generateA("GitHub", "https://github.com/kellyme213/");
generateA("Resume", "/resume.html");
//generateA("LinkedIn", "https://www.linkedin.com/in/kellyme213/");


function generateA(name, link)
{
    var a = document.createElement("A");
    a.appendChild(document.createTextNode(name));
    a.href = link;
    document.getElementsByClassName("linkBox")[0].appendChild(a);
}