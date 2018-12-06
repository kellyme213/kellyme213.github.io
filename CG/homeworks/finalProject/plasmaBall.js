
var gl;
var canvas;
var tendrilProgram;
var ballProgram;
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

var rotationAngleXLocation;
var rotationAngleYLocation;
var tendrilColorLocation;

var numTendrilPoints = 0;
var rotationAngleX = 0.0;
var rotationAngleY = 0.0;

var toggleBlend = true;
var toggleUpdate = true;

var numTendrils = 100;
var tendrilR = 0.4;
var tendrilG = 0.4;
var tendrilB = 1.0;
var sphereVertices = [];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    for (var x = 0; x < numTendrils; x++)
    {
        tendrils.push(new Tendril());
    }

    
    initializeData();
    updateBlendValues();
    
    
    document.addEventListener('keydown', inputFunction, false);
    document.getElementById("r-slider").oninput = function(event)
    {
        tendrilR = event.target.value;
        gl.uniform3fv(tendrilColorLocation, flatten([tendrilR, tendrilG, tendrilB]));
    }
    
    document.getElementById("g-slider").oninput = function(event)
    {
        tendrilG = event.target.value;
        gl.uniform3fv(tendrilColorLocation, flatten([tendrilR, tendrilG, tendrilB]));
    }
    
    document.getElementById("b-slider").oninput = function(event)
    {
        tendrilB = event.target.value;
        gl.uniform3fv(tendrilColorLocation, flatten([tendrilR, tendrilG, tendrilB]));
    }
    
    updateLoop();
    
    
};

function inputFunction(event)
{
    //window.alert(event.keyCode);
    var key = event.keyCode;
    
    if (key == 37)
    {
        rotationAngleX = (rotationAngleX + 0.05) % 6.28;
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
    }
    if (key == 39)
    {
        rotationAngleX = (rotationAngleX - 0.05) % 6.28;
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
    }
    if (key == 38)
    {
        rotationAngleY = (rotationAngleY + 0.05) % 6.28;
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
    }
    if (key == 40)
    {
        rotationAngleY = (rotationAngleY - 0.05) % 6.28;
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
    }
    if (key == 32)
    {
        rotationAngleY = 0.0;
        rotationAngleX = 0.0;
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
    }
    if (key == 49)
    {
        toggleBlend = !toggleBlend;
    }
    if (key == 50)
    {
        toggleUpdate = !toggleUpdate;
    }
    
    
    document.getElementById("xAngleP").innerHTML = "X angle - " + rotationAngleX;
    document.getElementById("yAngleP").innerHTML = "Y angle - " + rotationAngleY;
    document.getElementById("numTendrilP").innerHTML = "Number of Tendrils - " + numTendrils;
    document.getElementById("updateP").innerHTML = "Tendril update - " + toggleUpdate;
    document.getElementById("blendP").innerHTML = "Blend update - " + toggleBlend;

}

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
    
    gl.uniform3fv(tendrilColorLocation, flatten([tendrilR, tendrilG, tendrilB]));

}

function initializeGLParameters()
{
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    tendrilProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(tendrilProgram);
    
    startVertexBufferID = gl.createBuffer();
    startVertexPointer = gl.getAttribLocation(tendrilProgram, "startV");
    
    endVertexBufferID = gl.createBuffer();
    endVertexPointer = gl.getAttribLocation(tendrilProgram, "endV");
    
    blendVertexBufferID = gl.createBuffer();
    blendVertexPointer = gl.getAttribLocation(tendrilProgram, "vertexBlendVal");
    
    startDirectionBufferID = gl.createBuffer();
    startDirectionPointer = gl.getAttribLocation(tendrilProgram, "startDirection");
    
    endDirectionBufferID = gl.createBuffer();
    endDirectionPointer = gl.getAttribLocation(tendrilProgram, "endDirection");
    
    blendAngleBufferID = gl.createBuffer();
    blendAnglePointer = gl.getAttribLocation(tendrilProgram, "angleBlendVal");
    
    tendrilColorBlendBufferID = gl.createBuffer();
    tendrilColorBlendPointer = gl.getAttribLocation(tendrilProgram, "tendrilColorBlend");
    
    rotationAngleXLocation = gl.getUniformLocation(tendrilProgram, "rotationAngleX");
    rotationAngleYLocation = gl.getUniformLocation(tendrilProgram, "rotationAngleY");
    tendrilColorLocation = gl.getUniformLocation(tendrilProgram, "tendrilCol");
    
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
    if (toggleUpdate)
    {
        updateOldTendrils();
    }
    if (toggleBlend)
    {
        updateBlendValues();
    }
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


//based on an algorithm you showed us in class.
//used to approximate a sphere via subdividing a pyramid.
function subdivide(p1, p2, p3, level)
{
    if (level <= 0)
    {
        sphereVertices.push(p1);
        sphereVertices.push(p2);
        sphereVertices.push(p3);
        return;
    }
    var p4 = [(p1[0] + p2[0] + p3[0]) / 3.0,
               (p1[1] + p2[1] + p3[1]) / 3.0,
               (p1[2] + p2[2] + p3[2]) / 3.0];
    subdivide(p1, p4, p3, level - 1.0);
    subdivide(p1, p2, p4, level - 1.0);
    subdivide(p4, p2, p3, level - 1.0);
}

//0, z, -y
//acos(a[0])
