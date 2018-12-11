
let Tendril = function()
{
    this.tendrilLength = 20;
    this.numRandomRepsPerItr = 2;
    this.startVertices = [];
    this.endVertices = [];
    var dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        this.endVertices.push(vec4((x + 1) / this.tendrilLength, dy, 0.0, 1.0));
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.03 * (0.5 - Math.random());
        }
    }
    
    dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        this.startVertices.push(vec4((x + 1) / this.tendrilLength, dy, 0.0, 1.0));
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.03 * (0.5 - Math.random());
        }
    }
    this.animationTime = 2.0 * Math.pow(Math.random(), 2) * 1000.0;
    this.startingTime = Date.now();
    
    this.startAngle = 0.0;
    this.endAngle = 6.28 * Math.random();
    
    this.endDirection = this.getRandomDirection();
    this.calculateAxis();
    
    this.angleAnimationTime = 10.0 * angle(this.startDirection, this.endDirection) * Math.sqrt(Math.random()) * 1000.0;
    this.startAngleTime = Date.now();
}

Tendril.prototype.shouldUpdate = function()
{
    return (Date.now() - this.startingTime) > this.animationTime;
}

//delay blend value depending on position in array for effect
Tendril.prototype.getBlendValue = function(x)
{
    return ((Date.now() - this.startingTime) / this.animationTime).clamp(0.0, 1.0);
}

Tendril.prototype.getAngleBlendValue = function(x)
{
    return (Date.now() - this.startAngleTime) / this.angleAnimationTime;
}

Tendril.prototype.shouldUpdateAngle = function()
{
    return (Date.now() - this.startAngleTime) > this.angleAnimationTime;
}

Tendril.prototype.updateAngle = function()
{
    this.startAngle = this.endAngle;
    this.endAngle += 3.14 * (Math.random() - 0.5);
    this.angleAnimationTime = 10.0 * angle(this.startDirection, this.endDirection) * Math.sqrt(Math.random()) * 1000.0;
    this.startAngleTime = Date.now();
    this.calculateAxis();
}

Tendril.prototype.updateTendrilVertices = function()
{
    this.startVertices = this.endVertices.slice();
    this.endVertices = [];
    var dy = 0.0;
    for (var x = 0; x < this.tendrilLength; x++)
    {
        this.endVertices.push(vec4((x + 1) / this.tendrilLength, dy, 0.0, 1.0));
        for (var y = 0; y < this.numRandomRepsPerItr; y++)
        {
            dy += 0.03 * (0.5 - Math.random());
        }
    }
    this.startingTime = Date.now();
    this.animationTime = 2.0 * Math.pow(Math.random(), 2) * 1000.0;
}

Tendril.prototype.getRandomDirection = function()
{
    var x = Math.random() - 0.5;
    var y = Math.random() - 0.5;
    var z = Math.random() - 0.5;
    var v = normalize(vec3(x, y, z));
    return v;
}

Tendril.prototype.calculateAxis = function()
{
    this.startDirection = this.endDirection;
    this.endDirection = this.getRandomDirection();
}
