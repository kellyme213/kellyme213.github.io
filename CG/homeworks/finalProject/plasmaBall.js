
var gl;
var canvas;
var tendrilProgram;
var sphereProgram;
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

var sphereVertexBufferID;
var sphereVertexPointer;

var rotationAngleXLocation;
var rotationAngleYLocation;
var tendrilColorLocation;
var sphereScaleLocation;
var sphereDirectionsLocation;
var sphereTendrilVertLocation;
var sphereRotationAngleXLocation;
var sphereRotationAngleYLocation;

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
    
    
    tendrilR = 0.4;
    tendrilG = 0.4;
    tendrilB = 1.0;
    gl.uniform3fv(tendrilColorLocation, flatten([tendrilR, tendrilG, tendrilB]));
    /*
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
    */
    
    updateLoop();
    
    
};

//not used at the moment
function inputFunction(event)
{
    //window.alert(event.keyCode);
    var key = event.keyCode;
    if (key == 37)
    {
        rotationAngleX = (rotationAngleX + 0.05) % 6.28;
        gl.useProgram(tendrilProgram);
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
        gl.useProgram(sphereProgram);
        gl.uniform1f(sphereRotationAngleXLocation, rotationAngleX);
    }
    if (key == 39)
    {
        rotationAngleX = (rotationAngleX - 0.05) % 6.28;
        gl.useProgram(tendrilProgram);
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
        gl.useProgram(sphereProgram);
        gl.uniform1f(sphereRotationAngleXLocation, rotationAngleX);
    }
    if (key == 38)
    {
        rotationAngleY = (rotationAngleY + 0.05) % 6.28;
        gl.useProgram(tendrilProgram);
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
        gl.useProgram(sphereProgram);
        gl.uniform1f(sphereRotationAngleYLocation, rotationAngleY);
    }
    if (key == 40)
    {
        rotationAngleY = (rotationAngleY - 0.05) % 6.28;
        gl.useProgram(tendrilProgram);
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
        gl.useProgram(sphereProgram);
        gl.uniform1f(sphereRotationAngleYLocation, rotationAngleY);
    }
    if (key == 32)
    {
        rotationAngleY = 0.0;
        rotationAngleX = 0.0;
        gl.useProgram(tendrilProgram);
        gl.uniform1f(rotationAngleXLocation, rotationAngleX);
        gl.uniform1f(rotationAngleYLocation, rotationAngleY);
        gl.useProgram(sphereProgram);
        gl.uniform1f(sphereRotationAngleXLocation, rotationAngleX);
        gl.uniform1f(sphereRotationAngleYLocation, rotationAngleY);
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
    generateSphere();
}

function initialTendrilBufferLoad()
{
    gl.useProgram(tendrilProgram);
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

//doesnt work :(
function setUpBuffer(bufferID, bufferPointer, program, variableName)
{
    bufferID = gl.createBuffer();
    bufferPointer = gl.getAttribLocation(program, variableName);
}


function initializeGLParameters()
{
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.useProgram(tendrilProgram);
    tendrilProgram = initShaders(gl, "tendril-vertex-shader", "tendril-fragment-shader");
    
    
    //setUpBuffer(startVertexBufferID, startVertexPointer, tendrilProgram, "startV");
    
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
    
    
    
    sphereProgram = initShaders(gl, "sphere-vertex-shader", "sphere-fragment-shader");
    gl.useProgram(sphereProgram);
    
    
    sphereVertexBufferID = gl.createBuffer();
    sphereVertexPointer = gl.getAttribLocation(sphereProgram, "vPos");
    sphereScaleLocation = gl.getUniformLocation(sphereProgram, "scale");
    sphereDirectionsLocation = gl.getUniformLocation(sphereProgram, "directions");
    sphereTendrilVertLocation = gl.getUniformLocation(sphereProgram, "tendrilVerts");
    sphereRotationAngleXLocation = gl.getUniformLocation(sphereProgram, "rotationAngleX");
    sphereRotationAngleYLocation = gl.getUniformLocation(sphereProgram, "rotationAngleY");
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    //gl.disable(gl.CULL_FACE);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    //window.alert(gl.getParameter(gl.CULL_FACE));
    
}

function updateBlendValues()
{
    var blendArray = [];
    var angleArray = [];
    for (var x = 0; x < tendrils.length; x++)
    {
        for (var y = 0; y < tendrils[x].tendrilLength; y++)
        {
            blendArray.push(tendrils[x].getBlendValue(y + 1));
            angleArray.push(tendrils[x].getAngleBlendValue(y + 1));
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
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    
    
    
    
    gl.useProgram(tendrilProgram);
    initialTendrilBufferLoad();
    if (toggleUpdate)
    {
        updateOldTendrils();
    }
    if (toggleBlend)
    {
        updateBlendValues();
    }
    renderTendrils();
    
    
    gl.useProgram(sphereProgram);
    putDataInBuffer(sphereVertexBufferID, sphereVertices, sphereVertexPointer, 3);
    passInDirectionsToSphere();
    //console.log(flatten(sphereVertices));
    renderSphere();
    
    requestAnimationFrame(updateLoop);
}

function passInDirectionsToSphere()
{
    var directionsArray = [];
    var vertexArray = [];
    for (var x = 0; x < tendrils.length; x++)
    {
        var blend = tendrils[x].getAngleBlendValue(tendrils[x].tendrilLength);
        var newX = (tendrils[x].startDirection[0] * (1.0 - blend)) + (tendrils[x].endDirection[0] * (blend));
        var newY = (tendrils[x].startDirection[1] * (1.0 - blend)) + (tendrils[x].endDirection[1] * (blend));
        var newZ = (tendrils[x].startDirection[2] * (1.0 - blend)) + (tendrils[x].endDirection[2] * (blend));
        directionsArray.push([newX, newY, newZ]);
        
        blend = tendrils[x].getBlendValue(0);
        
        var newDir = mix(tendrils[x].startVertices[tendrils[x].tendrilLength - 1], tendrils[x].endVertices[tendrils[x].tendrilLength - 1], blend);
        newDir[3] = 1.0;
        vertexArray.push([newDir[0], newDir[1], newDir[2]]);
    }
    //console.log(vertexArray);
    
    gl.uniform3fv(sphereDirectionsLocation, flatten(directionsArray));
    gl.uniform3fv(sphereTendrilVertLocation, flatten(vertexArray));
    //console.log(flatten(vertexArray).length);

}

function renderSphere()
{
    gl.uniform1f(sphereScaleLocation, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, sphereVertices.length);
    //gl.uniform1f(sphereScaleLocation, 0.1);
    //gl.drawArrays(gl.TRIANGLES, 0, sphereVertices.length);
    //window.alert(sphereVertices.length);
}

function renderTendrils() {
    //gl.clear(gl.COLOR_BUFFER_BIT);
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


function generateSphere()
{
    var x = vec3(1.0, 0.0, 0.0);
    var y = vec3(0.0, 1.0, 0.0);
    var z = vec3(0.0, 0.0, 1.0);

    subdivide(x, y, z, 5);
    
    var len = sphereVertices.length;
    for (var i = 0; i < len; i++)
    {
        var v = sphereVertices[i];
        sphereVertices.push([-v[0], v[1], v[2]]);
    }
    
    len = sphereVertices.length;
    for (var i = 0; i < len; i++)
    {
        var v = sphereVertices[i];
        sphereVertices.push([v[0], -v[1], v[2]]);
    }
    
    len = sphereVertices.length;
    for (var i = 0; i < len; i++)
    {
        var v = sphereVertices[i];
        sphereVertices.push([v[0], v[1], -v[2]]);
    }
}

//code used from ANGEL 7th edition chapter 7
//reflectingSpheres.js
//https://wrf.ecse.rpi.edu/Teaching/graphics/SEVENTH_EDITION/CODE/07/reflectingSphere.js
function subdivide(a, b, c, count) {
    if ( count > 0 ) {
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);
        
        ab = normalize(ab);
        ac = normalize(ac);
        bc = normalize(bc);

        subdivide( a, ab, ac, count - 1 );
        subdivide( ab, b, bc, count - 1 );
        subdivide( bc, c, ac, count - 1 );
        subdivide( ab, bc, ac, count - 1 );
    }
    else {
        sphereVertices.push(vec3(a[0], a[1], a[2]));
        sphereVertices.push(vec3(b[0], b[1], b[2]));
        sphereVertices.push(vec3(c[0], c[1], c[2]));
    }
}

//0, z, -y
//acos(a[0])
