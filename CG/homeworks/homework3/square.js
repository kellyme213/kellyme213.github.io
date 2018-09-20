
var gl;
var points;
var xAngle = 0.0;
var yAngle = 0.0;
var zAngle = 0.0;
var vertices;
var xAngleAddr;
var yAngleAddr;
var zAngleAddr;
var matrixAddr;
var rotationMatrix;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    // Vertices
    
    vertices = spaceshipData;

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    document.getElementById("x-slider").oninput = function(event) {
        xAngle = event.target.value;
        render(vertices.length);
    };
    
    document.getElementById("y-slider").oninput = function(event) {
        yAngle = event.target.value;
        render(vertices.length);
    };
    
    document.getElementById("z-slider").oninput = function(event) {
        zAngle = event.target.value;
        render(vertices.length);
    };
    
    matrixAddr = gl.getUniformLocation(program, "rotationMatrix")
    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render(vertices.length);
};


function render(numPoints) {
    var c1 = Math.cos(xAngle);
    var c2 = Math.cos(yAngle);
    var c3 = Math.cos(zAngle);
    var s1 = Math.sin(xAngle);
    var s2 = Math.sin(yAngle);
    var s3 = Math.sin(zAngle);
    
    rotationMatrix = [
        c2 * c3,                  -s2,      c2 * s3,                0,
        -s1 * s3 + c1 * c3 * s2,  c1 * c2,  c1 * s2 * s3 - c3 * s1, 0,
        c3 * s1 * s2 - c1 * s3,   c2 * s1,  c1 * c3 + s1 * s2 * s3, 0,
        0,                        0,        0,                      1
    ];
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniformMatrix4fv(matrixAddr, false, rotationMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, numPoints);
}
