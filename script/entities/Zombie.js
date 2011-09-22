function Zombie() {
    this.xa = 3;
    this.ya = 3;
    this.width = 12;
    this.height = 12;
    this.animFrame = 0;
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
    this.animFrame = 0;
};

Zombie.prototype.tick = function() {
    
    switch(this.state) {
        case this.states.rand:
            var blnMove = this.move();
            blnMove && this.animFrame++;
            if(!blnMove || (this.xa === 0 && this.ya === 0) || (Math.random() < 0.01)){
                this.rand();
            };
            /*
            if(Math.random()<0.01){
                            this.switchState(this.states.attack);
                        }*/
            
            break;

        case this.states.watch:
            var player = this.level.player,
                distance = this.getDistance(player);
            if(distance < 70){
                if(player.getBlock().getLight()) {
                    this.switchState(this.states.attack);
                }
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
            !this.frame && this.attack();
            
            var blnMove = this.move();
            blnMove && this.animFrame++;
            if(!blnMove || (this.xa === 0 && this.ya === 0) || (this.animFrame % 10 === 2)){
                if(!this.attack()) {
                    this.switchState(this.states.watch);
                }
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
    var player = this.level.player,
        dx = this.x - player.x,
        dy = this.y - player.y,
        dist = Math.sqrt(dx * dx + dy * dy);

    // Player escaped.
    if(this.animFrame > 100 && dist > 80) {
        return false;
    }
    
    // Normalise
    if(dist !== 0) {
        dx /= dist;
        dy /= dist;
    }

    this.xa = -Math.floor(dx * 4);
    this.ya = -Math.floor(dy * 4);
    return true;
};
Zombie.prototype.rand = function() {
    this.xa = Math.floor(Math.random()*8) - 4;
    this.ya = Math.floor(Math.random()*8) - 4;
};
Zombie.prototype.render = function(board) {    
    Art.player.draw(board.ctx, this.x, this.y - 18, (Math.floor(this.animFrame/2)% 2) + 2);

};
Zombie.prototype.renderLight = function(light) {
//    Renderer.drawLightCirc(light.ctx, this.x + 10, this.y +0, 4);
    if(this.state !== this.states.attack) return;
    var ctx = light.ctx;
    Art.player.draw(ctx, this.x, this.y - 18, (Math.floor(this.animFrame/2)% 2) + 2);
};

Zombie.prototype.collide = function(e) {
    if(e instanceof Player) {
        e.hurt(this, 1)
    }
}
