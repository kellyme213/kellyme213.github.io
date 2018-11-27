
var gl;
var canvas;
var program;
var points;
var tendrils = [];

var blendVertexBufferID;
var blendVertexPointer;

var startVertexBufferID;
var startVertexPointer;

var endVertexBufferID;
var endVertexPointer;

var angleBufferID;
var anglePointer;

var startDirectionBufferID;
var startDirectionPointer;

var endDirectionBufferID;
var endDirectionPointer;

var blendAngleBufferID;
var blendAnglePointer;

var tendrilColorBlendBufferID;
var tendrilColorBlendPointer;

var numTendrilPoints = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    for (var x = 0; x < 100; x++)
    {
        tendrils.push(new Tendril());
    }
    
    initializeData();
    updateBlendValues();
    updateLoop();
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
    var colorBlendArray = [];
    
    for (var x = 0; x < tendrils.length; x++)
    {
        for (var y = 0; y < tendrils[x].tendrilLength; y++)
        {
            if (y == 0)
            {
                colorBlendArray.push(0.5);
            }
            else
            {
                colorBlendArray.push(1.0);
            }
        }
        startVertices = startVertices.concat(tendrils[x].startVertices);
        endVertices = endVertices.concat(tendrils[x].endVertices);
    }

    putDataInBuffer(tendrilColorBlendBufferID, colorBlendArray, tendrilColorBlendPointer, 1);
    putDataInBuffer(startVertexBufferID, startVertices, startVertexPointer, 4);
    putDataInBuffer(endVertexBufferID, endVertices, endVertexPointer, 4);
    
    
    var startDirections = [];
    var endDirections = [];
    for (var x = 0; x < tendrils.length; x++)
    {
        for (var y = 0; y < tendrils[x].tendrilLength; y++)
        {
            startDirections.push(tendrils[x].startDirection);
            endDirections.push(tendrils[x].endDirection);
        }
    }
    
    putDataInBuffer(startDirectionBufferID, startDirections, startDirectionPointer, 3);
    putDataInBuffer(endDirectionBufferID, endDirections, endDirectionPointer, 3);
}

function initializeGLParameters()
{
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    startVertexBufferID = gl.createBuffer();
    startVertexPointer = gl.getAttribLocation(program, "startV");
    
    endVertexBufferID = gl.createBuffer();
    endVertexPointer = gl.getAttribLocation(program, "endV");
    
    blendVertexBufferID = gl.createBuffer();
    blendVertexPointer = gl.getAttribLocation(program, "vertexBlendVal");
    
    startDirectionBufferID = gl.createBuffer();
    startDirectionPointer = gl.getAttribLocation(program, "startDirection");
    
    endDirectionBufferID = gl.createBuffer();
    endDirectionPointer = gl.getAttribLocation(program, "endDirection");
    
    blendAngleBufferID = gl.createBuffer();
    blendAnglePointer = gl.getAttribLocation(program, "angleBlendVal");
    
    tendrilColorBlendBufferID = gl.createBuffer();
    tendrilColorBlendPointer = gl.getAttribLocation(program, "tendrilColorBlend");
    
    for (var x = 0; x < tendrils.length; x++)
    {
        numTendrilPoints += tendrils[x].tendrilLength;
    }
}

function updateBlendValues()
{
    var blendArray = [];
    var angleArray = [];
    for (var x = 0; x < tendrils.length; x++)
    {
        for (var y = 0; y < tendrils[x].tendrilLength; y++)
        {
            blendArray.push(tendrils[x].getBlendValue(y));
            angleArray.push(tendrils[x].getAngleBlendValue(y));
        }
    }
    
    putDataInBuffer(blendVertexBufferID, blendArray, blendVertexPointer, 1);
    putDataInBuffer(blendAngleBufferID, angleArray, blendAnglePointer, 1);
}

function updateTendrilData(index)
{
    tendrils[index].updateTendrilVertices();
    
    var bytesPerFloat = 4;
    var floatsPerPoint = 4;
    var pointsPerTendril = tendrils[index].tendrilLength;
    var offset = bytesPerFloat * floatsPerPoint * pointsPerTendril * index;
    
    putSubDataInBuffer(startVertexBufferID, tendrils[index].startVertices, startVertexPointer, 4, offset);
    putSubDataInBuffer(endVertexBufferID, tendrils[index].endVertices, endVertexPointer, 4, offset);
}

function updateAngleData(index)
{
    tendrils[index].updateAngle();
    
    var bytesPerFloat = 4;
    var floatsPerPoint = 3;
    var pointsPerTendril = tendrils[index].tendrilLength;
    var offset = bytesPerFloat * floatsPerPoint * pointsPerTendril * index;
    
    var startDirections = [];
    var endDirections = [];
    for (var y = 0; y < tendrils[index].tendrilLength; y++)
    {
        startDirections.push(tendrils[index].startDirection);
        endDirections.push(tendrils[index].endDirection);
    }
    
    putSubDataInBuffer(startDirectionBufferID, startDirections, startDirectionPointer, 3, offset);
    putSubDataInBuffer(endDirectionBufferID, endDirections, endDirectionPointer, 3, offset);
}

function updateOldTendrils()
{
    for (var x = 0; x < tendrils.length; x++)
    {
        if (tendrils[x].shouldUpdate())
        {
            updateTendrilData(x);
        }
        if (tendrils[x].shouldUpdateAngle())
        {
            updateAngleData(x);
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

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

function angle(v1, v2)
{
    return Math.acos(v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]);
}

function putDataInBuffer(bufferID, data, bufferPointer, length)
{
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(bufferPointer, length, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bufferPointer);
}

function putSubDataInBuffer(bufferID, data, bufferPointer, length, offset)
{
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, flatten(data));
    gl.vertexAttribPointer(bufferPointer, length, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(bufferPointer);
}

//0, z, -y
//acos(a[0])
