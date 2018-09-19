
var gl;
var points;
var xAngle = 0.0;
var yAngle = 0.0;
var zAngle = 0.0;
var vertices;
var xAngleAddr;
var yAngleAddr;
var zAngleAddr;

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
    
    document.getElementById("x-slider").onchange = function(event) {
        xAngle = event.target.value;
        render(vertices.length);
    };
    
    document.getElementById("y-slider").onchange = function(event) {
        yAngle = event.target.value;
        render(vertices.length);
    };
    
    document.getElementById("z-slider").onchange = function(event) {
        zAngle = event.target.value;
        render(vertices.length);
        console.log(zAngle);
    };
    
    xAngleAddr = gl.getUniformLocation(program, "x_angle");
    yAngleAddr = gl.getUniformLocation(program, "y_angle");
    zAngleAddr = gl.getUniformLocation(program, "z_angle");

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render(vertices.length);
};


function render(numPoints) {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1f(xAngleAddr, xAngle);
    gl.uniform1f(yAngleAddr, yAngle);
    gl.uniform1f(zAngleAddr, zAngle);
    gl.drawArrays(gl.TRIANGLES, 0, numPoints);
}
