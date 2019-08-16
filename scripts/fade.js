var n1 = 80.0;
var n2 = 200.0;

window.onscroll = function()
{
    var boxes = document.getElementsByClassName("projectBox");
    
    for (var x = 0; x < boxes.length; x++)
    {
        var box = boxes[x];
        
        var diff = -(box.offsetTop - window.pageYOffset - window.innerHeight + n1);
        
        var fade = diff / n2;
        
        if (fade > 1.0)
        {
            fade = 1.0;
        }
        if (fade < 0.0)
        {
            fade = 0.0;
        }
        
        box.style.opacity = fade;
    }
}
