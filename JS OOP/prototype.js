function Vehical (speed){
    this.speed = speed;
    //this.prototype ={}
}

Vehical.prototype.getSpeed = function(){
    return this.speed;
}

function Bike(){
    Vehical.call(this,arguments);
    this.wheelCount =2;
    //Bike.prototype ={}
}

Bike.prototype = Object.create(Vehical.prototype);
var bike = new Bike(100) //{wheelCounts:2, speed:100}
console.log(bike.getSpeed());
