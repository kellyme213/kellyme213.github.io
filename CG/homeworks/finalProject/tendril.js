
let Tendril = function()
{
    this.tendrilLength = 20;
    this.numRandomRepsPerItr = 1;
    this.startVertices = [];
    this.endVertices = [];
    var dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.05 * (0.5 - Math.random());
        }
        this.endVertices.push(vec4((this.tendrilLength / 2 - x) / this.tendrilLength, dy, 0.0, 1.0));
    }
    
    dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.05 * (0.5 - Math.random());
        }
        this.startVertices.push(vec4((this.tendrilLength / 2 - x) / this.tendrilLength, dy, 0.0, 1.0));
    }
    this.animationTime = 3.0 * 1000.0;
    this.startingTime = Date.now();
}

Tendril.prototype.shouldUpdate = function()
{
    return (Date.now() - this.startingTime) > this.animationTime;
}

//delay blend value depending on position in array for effect
Tendril.prototype.getBlendValue = function(x)
{
    return (Date.now() - this.startingTime) / this.animationTime;
}

Tendril.prototype.updateTendrilVertices = function()
{
    this.startVertices = this.endVertices.slice();
    this.endVertices = [];
    var dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.05 * (0.5 - Math.random());
        }
        this.endVertices.push(vec4((this.tendrilLength / 2 - x) / this.tendrilLength, dy, 0.0, 1.0));
    }
    this.startingTime = Date.now();
}

