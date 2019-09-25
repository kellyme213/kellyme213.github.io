var fishes = [];
var numFishes = 10;
var latestGame = null; // copy of the meta-game data
var canvas = document.getElementById("maincanvas");



function main()
{
    generateFishes();
    
    canvas.addEventListener("mousedown", clickFunction);
    setInterval(globalUpdate, 16);
    setInterval(function() {animateBoatState(); animateOceanState()}, 500);
    fetchNewText();
}

function generatePointInLake()
{
    var point = {};
    point.x = (Math.random() * 1800) + 1400;
    point.y = (Math.random() * 500) + 1300;
    return point;
}

function generateFishes()
{
    for (var x = 0; x < numFishes; x++)
    {
        var newFish = {};
        newFish.startPoint = generatePointInLake();
        newFish.endPoint = generatePointInLake();
        newFish.currentPoint = {};
        newFish.interpolationStep = 1.0 / (Math.random() * 1000 + 250);
        newFish.currentInterpolation = 0.0;
        newFish.visible = (Math.random() > 0.5);
        newFish.gifState = Math.floor(3.0 * Math.random());
        var yx = (newFish.endPoint.y - newFish.startPoint.y) / (newFish.endPoint.x - newFish.startPoint.x);
        newFish.angle = Math.atan2((newFish.endPoint.y - newFish.startPoint.y), (newFish.endPoint.x - newFish.startPoint.x));
        fishes.push(newFish);
    }
}

var fishFramesBetween = 10;
var fishCounter = 0;
function updateFish(fish)
{
    fish.currentInterpolation += fish.interpolationStep;
    if (fish.currentInterpolation >= 1.0)
    {
        fish.startPoint.x = fish.endPoint.x;
        fish.startPoint.y = fish.endPoint.y;
        var newEndPoint = generatePointInLake();
        fish.endPoint.x = newEndPoint.x;
        fish.endPoint.y = newEndPoint.y;
        fish.interpolationStep = 1.0 / (Math.random() * 1000 + 250);
        fish.currentInterpolation = 0.0;
        fish.visible = !fish.visible;
        var yx = (fish.endPoint.y - fish.startPoint.y) / (fish.endPoint.x - fish.startPoint.x);
        fish.angle = Math.atan2((fish.endPoint.y - fish.startPoint.y), (fish.endPoint.x - fish.startPoint.x));
    }
    
    fish.currentPoint.x = ((1.0 - fish.currentInterpolation) * fish.startPoint.x +
                            fish.currentInterpolation * fish.endPoint.x);
    fish.currentPoint.y = ((1.0 - fish.currentInterpolation) * fish.startPoint.y +
                            fish.currentInterpolation * fish.endPoint.y);
    
    if (fishCounter >= fishFramesBetween)
    {
        fish.gifState = (fish.gifState + 1) % 3;
    }
}

function globalUpdate()
{
    fishCounter++;
    for (var x = 0; x < numFishes; x++)
    {
        updateFish(fishes[x]);
    }
    if (fishCounter >= fishFramesBetween)
    {
        fishCounter = 0;
    }
    
    renderCanvas();
}

function clickFunction()
{
    var rect = canvas.getBoundingClientRect();
    var svgx = rect.x;
    var svgy = rect.y;
    
    var point = {};
    point.x = Number(window.event.clientX - svgx) * (CANVAS_WIDTH / rect.width);
    point.y = Number(window.event.clientY - svgy) * (CANVAS_HEIGHT / rect.height);

    var fishCaughtThisTime = 0;
    for (var x = 0; x < numFishes; x++)
    {
        if (fishes[x].visible && pointInFish(point, fishes[x]))
        {
            fishes[x].visible = false;
            fishCaughtThisTime++;
        }
    }
    if (fishCaughtThisTime > 0) {
        notifyFishCaught(fishCaughtThisTime);
    }
}

function notifyFishCaught(number)
{
    // console.log("Caught "+ number);
    // console.log("FISH!!");
    var data = { type: "FROM_PAGE", message: "Caught a fish!", number: number };
    window.postMessage(data, "*");
}

window.addEventListener('message', (event) => {
    // console.log(`Received message: ${event.data}`);
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type === "FROM_PAGE")) {
        if (event.data.message && (event.data.message === "Are you the fishing game?")) {
            var data = { type: "FROM_PAGE", message: "I'm the fishing game!" };
            window.postMessage(data, "*");
        }
        else if (event.data.message === "setGame"){
            // overwrite the game stored on this script
            latestGame = event.data.data;
        }
        else if (event.data.message === "getGame"){
            // tell them what your copy of the game is
            var data = { type: "FROM_PAGE", message: "setGame", data: latestGame };
            event.source.postMessage(data, "*"); // should only send it to who asked
        }
        else if (event.data.message === "nextFishermanLine") {
            //sayLine(event.data.data);
            var text = event.data.data.line;
            var t1 = event.data.data.timeToNextStory;
            var t2 = event.data.data.timeForEachLine;
            ingestText(text, t2, t1);
        }
        // else {
        //     console.log("Fishing Game script received unknown message: " + event.data.message);
        // }
    }
});

function requestNextLine() {
    var data = { type: "FROM_PAGE", message: "requestNextFishermanLine" };
    window.postMessage(data, "*");
}

function sayLine(lineData) {
    console.log("Saying line \"" + lineData.line + "\"");
}


function pointInFish(point, fish)
{
    var fishX = Number(fish.currentPoint.x);
    var fishY = Number(fish.currentPoint.y);
    var fishW = fishX + FISH_WIDTH;
    var fishH = fishY + FISH_HEIGHT;
    return ((fishX < point.x) && (point.x < fishW) && (fishY < point.y) && (point.y < fishH));
}
