var pickupable = function() {
    this.pickedUp = false;

    this.isPickedUp = function() {
        return this.pickedUp;
    };
    
    this.pickUp = function(e) {
        this.pickedUp = true;
        e.pickedUp && e.pickedUp(this);
    };
    return this;
};

var carryable = function(onCarry, onDrop) {
    this.carriedBy = null;
    this.carry = function(e) {
        if(e.carrying) {
            return;
        }
        onCarry && onCarry.call(this, e);
        this.carriedBy = e;
        e.carrying = this;
    }
    this.drop = function() {
        onDrop && onDrop.call(this, this.carriedBy);
        this.carriedBy.carrying = null;
        this.carriedBy = null;
        
    }
    this.carryTick = function(xOff, yOff) {
        if(this.carriedBy) {
            this.x = this.carriedBy.x + xOff;
            this.y = this.carriedBy.y + yOff;
        }
    }
    return this;
}