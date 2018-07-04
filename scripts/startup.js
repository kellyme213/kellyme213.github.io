console.log(navigator.userAgent);

if ((navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1) || navigator.userAgent.indexOf("Edge") != -1)
{
    var style = document.createElement("style");
    style.innerHTML = ".projectBox, .textbox {background-color: rgba(0, 0, 0, 0);}\
    .htmlinsert p, .htmlinsert a, .projectP, .textbox p {color: white}\
    .projectBox, .textbox {-webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);}";
    document.head.appendChild(style);
}
