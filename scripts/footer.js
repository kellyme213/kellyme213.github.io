generateA("GitHub", "https://github.com/kellyme213/");
//generateA("LinkedIn", "https://www.linkedin.com/in/kellyme213/");
generateA("Resume", "resume.html");
generateA("Course Work", "coursework.html");


function generateA(name, link)
{
    var a = document.createElement("A");
    a.appendChild(document.createTextNode(name));
    a.href = link;
    document.getElementsByClassName("linkBox")[0].appendChild(a);
}