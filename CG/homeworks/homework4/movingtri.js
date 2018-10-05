"use strict";

var canvas;
var gl;

var maxNumVertices  = 200;
var index = 0;

var cindex = 0;

var colors = [

    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0)   // cyan
];
var t;
var numPolygons = 0;
var numIndices = [];
numIndices[0] = 0;
var start = [0];

var numTriangles = 0;
var vertices = [];
var vertColors = [];
var depth1 = 0;
var depth2 = 0;
var depth3 = 0;
var color1;
var color2;
var color3;
var points = [vec2(0.0, 0.0), vec2(0.0, 0.0), vec2(0.0, 0.0)];
var pointLocation = 0;
var velocities = [];
var axes = [];
var thetas = [];

var bufferId;
var cBufferId;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    
    
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    var vPos = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPos, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPos );
    
    cBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    

    var a = document.getElementById("addtributton")
    a.addEventListener("click", function() {
    //create vertices at specified points and depths
    var verts = [vec4(points[0][0], points[0][1], depth1, 1.0),
                 vec4(points[1][0], points[1][1], depth2, 1.0),
                 vec4(points[2][0], points[2][1], depth3, 1.0)];
    vertices.push(verts[0]);
    vertices.push(verts[1]);
    vertices.push(verts[2]);
    //create specified colors
    var col = [vec4(colors[color1][0], colors[color1][1], colors[color1][2], colors[color1][3]),
               vec4(colors[color2][0], colors[color2][1], colors[color2][2], colors[color2][3]),
               vec4(colors[color3][0], colors[color3][1], colors[color3][2], colors[color3][3])];
    vertColors.push(col[0]);
    vertColors.push(col[1]);
    vertColors.push(col[2]);

    //generate random velocity and axis of rotation
    var k = 0.01;
    velocities.push(vec2(k * (2 * Math.random() - 1), k * (2 * Math.random() - 1)));
    velocities.push(vec2(k * (2 * Math.random() - 1), k * (2 * Math.random() - 1)));
    velocities.push(vec2(k * (2 * Math.random() - 1), k * (2 * Math.random() - 1)));
    thetas.push(0.0);
    var d1 = (2 * Math.random() - 1);
    var d2 = (2 * Math.random() - 1);
    var d3 = (2 * Math.random() - 1);
    var mag = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
                       axes.push(vec4(d1 / mag, d2 / mag, d3 / mag));
                       //gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    //gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    //gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    //gl.bufferSubData(gl.ARRAY_BUFFER, 48*numTriangles, flatten(col));
    numTriangles++;
    render();

    });
    
    document.getElementById("slider1").oninput = function(event) {
        depth1 = parseFloat(event.target.value);
    };
    
    document.getElementById("slider2").oninput = function(event) {
        depth2 = parseFloat(event.target.value);
    };
    
    document.getElementById("slider3").oninput = function(event) {
        depth3 = parseFloat(event.target.value);
    };
    
    document.getElementById("menu1").addEventListener("click", function() {
        color1 = document.getElementById("menu1").selectedIndex;
    });
    
    document.getElementById("menu2").addEventListener("click", function() {
        color2 = document.getElementById("menu2").selectedIndex;
    });
    
    document.getElementById("menu3").addEventListener("click", function() {
        color3 = document.getElementById("menu3").selectedIndex;
    });

    canvas.addEventListener("mousedown", function(event){
        t  = vec2(2*event.clientX/canvas.width-1,
           2*(canvas.height-event.clientY)/canvas.height-1);
        points[pointLocation] = t;
        pointLocation = (pointLocation + 1) % 3;
    } );


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.enable(gl.DEPTH_TEST);


    
    setInterval(render, 10);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    if (numTriangles <= 0)
    {
        return;
    }
    for (var j = 0; j < vertices.length; j++)
    {
        var newVel = vec4(vertices[j][0] + 0,
                          vertices[j][1] + 0,
                          vertices[j][2],
                          vertices[j][3]);
        
        
        //rotation matrix
        var c = Math.cos(0.001);//thetas[Math.floor(j / 3)]);
        var s = Math.cos(0.001);//thetas[Math.floor(j / 3)]);
        thetas[Math.floor(j / 3)] = (thetas[Math.floor(j / 3)] + 0.001) % 6.28;
        var ux = axes[Math.floor(j / 3)][0];
        var uy = axes[Math.floor(j / 3)][1];
        var uz = axes[Math.floor(j / 3)][2];
        var a00 = c + ux * ux * (1 - c);
        var a01 = ux * uy * (1 - c) - uz * s;
        var a02 = ux * uz * (1 - c) + uy * s;
        var a10 = uy * ux * (1 - c) + uz * s;
        var a11 = c + uy * uy * (1 - c);
        var a12 = uy * uz * (1 - c) - ux * s;
        var a20 = uz * ux * (1 - c) - uy * s;
        var a21 = uz * uy * (1 - c) + ux * s;
        var a22 = c + ux * ux * (1 - c);
        var newNew = vec4(0, 0, 0, 1);
        newNew[0] = a00 * newVel[0] + a01 * newVel[1] + a02 * newVel[2];
        newNew[1] = a10 * newVel[0] + a11 * newVel[1] + a12 * newVel[2];
        newNew[2] = a20 * newVel[0] + a21 * newVel[1] + a22 * newVel[2];

        //newVel[0] = newNew[0];
        //newVel[1] = newNew[1];
        //newVel[2] = newNew[2];
        
        
        //calculate new position by adding velocity vector
        newVel = vec4(vertices[j][0] + velocities[j][0],
                          vertices[j][1] + velocities[j][1],
                          vertices[j][2],
                          vertices[j][3]);
        
        
        //if going to be out of bounds, reverse velocity and change vertex color
        if (newVel[0] > 1 || newVel[0] < -1 || newVel[1] > 1 || newVel[1] < -1)
        {
            velocities[j][0] *= -1;
            velocities[j][1] *= -1;
            vertColors[j][0] = 1 - vertColors[j][0];
            vertColors[j][1] = 1 - vertColors[j][1];
            vertColors[j][2] = 1 - vertColors[j][2];
        }
        
        //set updated position
        newVel = vec4(vertices[j][0] + velocities[j][0],
                      vertices[j][1] + velocities[j][1],
                      vertices[j][2],
                      vertices[j][3]);
        
        vertices[j] = newVel;
    }
    //bing buffers and draw
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertColors));
    gl.drawArrays(gl.TRIANGLES, 0, 3 * numTriangles);
}
