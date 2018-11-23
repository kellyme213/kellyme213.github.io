
var gl;
var canvas;
var program;
var points;
var tendrils = [];
var blendBufferID;
var startBufferID;
var endBufferID;
var blendPointer;
var startPointer;
var endPointer;
var numTendrilPoints = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    tendrils.push(new Tendril());
    tendrils.push(new Tendril());

    
    initializeData();
    updateBlendValues();
    updateLoop();
    
    // Vertices
    /*
    var vertices = [
        vec2(0.0, 0.1),
        vec2(0.0, 0.2),
        vec2(0.0, 0.3),
        vec2(0.0, 0.4),
        vec2(0.0, 0.5),
        vec2(0.0, 0.6),
        vec2(0.0, 0.7),
        vec2(0.0, 0.8),
    ];
    
    var directions = [];
    for (var i = 0; i < vertices.length; i++)
    {
        directions.push(i % 2);
    }
     */
    //
    //  Configure WebGL
    //

    

    /*
    // Load the data into the GPU
    
    var dbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, dbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(directions), gl.STATIC_DRAW );
    var dirPoint = gl.getAttribLocation( program, "dir" );
    gl.vertexAttribPointer( dirPoint, 1, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( dirPoint );
    
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render(vertices.length);
    */
};

function initializeData()
{
    initializeGLParameters();
    initialTendrilBufferLoad();
}

function initialTendrilBufferLoad()
{
    var startVertices = [];
    var endVertices = [];
    
    for (var x = 0; x < tendrils.length; x++)
    {
        startVertices = startVertices.concat(tendrils[x].startVertices);
        endVertices = endVertices.concat(tendrils[x].endVertices);
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, startBufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(startVertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(startPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(startPointer);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, endBufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(endVertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(endPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(endPointer);
}

function initializeGLParameters()
{
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    startBufferID = gl.createBuffer();
    startPointer = gl.getAttribLocation(program, "startV");
    
    endBufferID = gl.createBuffer();
    endPointer = gl.getAttribLocation(program, "endV");
    
    blendBufferID = gl.createBuffer();
    blendPointer = gl.getAttribLocation(program, "blendValue");
    
    for (var x = 0; x < tendrils.length; x++)
    {
        numTendrilPoints += tendrils[x].tendrilLength;
    }
}

function updateBlendValues()
{
    var blendArray = [];
    for (var x = 0; x < tendrils.length; x++)
    {
        for (var y = 0; y < tendrils[x].tendrilLength; y++)
        {
            blendArray.push(tendrils[x].getBlendValue(y));
        }
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, blendBufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(blendArray), gl.STATIC_DRAW);
    gl.vertexAttribPointer(blendPointer, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(blendPointer);
}

function updateTendrilData(index)
{
    tendrils[index].updateTendrilVertices();
    //initialTendrilBufferLoad();
    //console.log(tendrils[index].getBlendValue());
    
    var bytesPerFloat = 4;
    var floatsPerPoint = 4;
    var pointsPerTendril = tendrils[index].tendrilLength;
    var offset = bytesPerFloat * floatsPerPoint * pointsPerTendril * index;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, startBufferID);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, flatten(tendrils[index].startVertices));
    gl.vertexAttribPointer(startPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(startPointer);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, endBufferID);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, flatten(tendrils[index].endVertices));
    gl.vertexAttribPointer(endPointer, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(endPointer);
}

function updateOldTendrils()
{
    for (var x = 0; x < tendrils.length; x++)
    {
        if (tendrils[x].shouldUpdate())
        {
            updateTendrilData(x);
        }
    }
}


function updateLoop()
{
    updateOldTendrils();
    updateBlendValues();
    renderTendrils();
    requestAnimationFrame(updateLoop);
}


function renderTendrils() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (var x = 0; x < tendrils.length; x++)
    {
        gl.drawArrays(gl.LINE_STRIP, tendrils[x].tendrilLength * x, tendrils[x].tendrilLength);
    }
}
