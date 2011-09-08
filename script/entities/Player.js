function Player(){
    this.health = 20;
    this.speed = 5;
    this.fireTime = 0;
    this.animTime = 0;
    this.itemUseTime = 0;
    this.width = 12;
    this.height = 12;
}
Player.prototype = new Entity;
Player.constructor = Player;
Player.prototype.ticka = function(input) {
    var keys = input.keys;
    
    var right = keys[Input.RIGHT]  == "newpress",
        left = keys[Input.LEFT]  == "newpress",
        up = keys[Input.UP]  == "newpress",
        down = keys[Input.DOWN]  == "newpress",
        space = keys[Input.SPACE]  == "newpress",
        zkey = keys[Input.Z] == "newpress";

    this.xa = right ? this.speed : left ? -this.speed : 0;//this.xa;
    this.ya = down ? this.speed : up ? -this.speed : 0;//this.ya;
    
    if(up || down || left || right){
        if(right) {
            this.dir = up ? c.UP_RIGHT : down ? c.DOWN_RIGHT : c.RIGHT;
        }
        else if(left) {
            this.dir = up ? c.UP_LEFT : down ? c.DOWN_LEFT : c.LEFT;
        }
        else if(up) {
            this.dir = c.UP;
        }
        else {
            this.dir = c.DOWN;
        }
    }


    if(this.xa !== 0 || this.ya !== 0){
        var oldxa = this.xa,
            oldya = this.ya,
            xTile = 0,
            yTile = 0;

        if(this.move()) {
            this.animTime++;
        }
        else {
            if(space) {
                if(oldxa !== 0){
                    xTile = oldxa < 0 ? -1 : 1;
                }
                if(oldya !== 0){
                    yTile = oldya < 0 ? -1 : 1;
                }
                this.level.getBlock(
                    this.xTile + xTile, 
                    this.yTile + yTile).use(this);
            }
        }
    }
    
    if((--this.fireTime <= 0) && zkey) {
        this.fireTime = 30;
        this.level.fire();
    }
    
    if(this.itemUseTime > 0) this.itemUseTime--;
    if(this.itemUseTime < 1 && space) {
        this.activate();
    }
};

Player.prototype.activate = function() {
    // For each block im facing
    //// Get block
    //// call blcok .use.
    this.itemUseTime = 10;
    var block = this.level.getBlock(this.xTile, this.yTile);
    if(block.use()){
        return;
    }
};
Player.prototype.collide = function(e) {
    
};
Player.prototype.render = function(board) {
    Art.player.draw(board.ctx, this.x, this.y - 18, Math.floor(this.animTime/2)% 2);
};

Player.prototype.renderLight = function(light) {
    var ctx = light.ctx,
        flux = Math.floor((Math.cos(this.level.frame / 2) * 2)) + 2;
    Screen.drawLightCirc(ctx, this.x + 10, this.y + 10, 40 + flux);
}