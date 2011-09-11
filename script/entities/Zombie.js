function Zombie() {
    this.xa = 3;
    this.ya = 3;
    this.width = 12;
    this.height = 12;
    this.animTime = 0;
    this.frame = 0;
    this.state = this.states.returning;
};
Zombie.prototype = new Entity;
Zombie.constructor = Zombie;
Zombie.prototype.states = {
    rand: 0,
    watch: 1,
    returning: 2,
    attack: 3,
    walkTo: 4
};
Zombie.prototype.switchState = function(newState, data) {
    this.frame = 0;
    this.lastState = this.state;
    this.lastData = this.stateData;
    this.state = newState;
    this.stateData = data;
};

Zombie.prototype.tick = function() {
    switch(this.state) {
        case this.states.rand:
            var blnMove = this.move();
            if(!blnMove || (this.xa === 0 && this.ya === 0) || (Math.random() < 0.01)){
                this.rand();
            };
            if(Math.random()<0.01){
                this.switchState(this.states.attack);
            }
            break;

        case this.states.watch:
            if(Math.random()<0.01){
                this.switchState(this.states.attack);
            }
            break;
        case this.states.returning:
            if(this.frame === 0) {
                // Path find the tv...
                break;
            }
            // Follow path
            if(1 == 1) {
                this.switchState(this.states.walkTo, {x: 10, y: 10});
            }

            break;
        case this.states.attack:
            var blnMove = this.move();
            if(!blnMove || (this.xa === 0 && this.ya === 0) || (Math.random() < 0.1)){
                this.attack();
            };
            if(Math.random()<0.01){
                this.switchState(this.states.watch);
            }

            break;
        case this.states.walkTo:
            if(this.frame === 0) {
                console.log(this.stateData);
            }
            this.switchState(this.states.watch)
            break;
    }
    this.frame++;
};

Zombie.prototype.attack = function() {
    var px = this.level.player.x,
        py = this.level.player.y;
    var dx = this.x - px,
        dy = this.y - py,
        hyp = Math.sqrt(dx*dx + dy*dy);

    // Normalise
    if(hyp !== 0) {
        dx /= hyp;
        dy /= hyp;
    }

    this.xa = -Math.floor(dx * 4);
    this.ya = -Math.floor(dy * 4);
};
Zombie.prototype.rand = function() {
    this.xa = Math.floor(Math.random()*8) - 4;
    this.ya = Math.floor(Math.random()*8) - 4;
};
Zombie.prototype.render = function(board) {
    Art.player.draw(board.ctx, this.x, this.y - 18, (Math.floor(this.frame/2)% 2) + 2);
};

Zombie.prototype.collide = function(e) {
    if(e instanceof Player) {
        e.hurt(this, 1)
    }
}
