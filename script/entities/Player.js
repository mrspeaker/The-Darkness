function Player(){
    this.health = 5;
    this.score = 0;
    this.speed = 5;
    this.fireTime = 0;
    this.animTime = 0;
    this.itemUseTime = 0;
    this.width = 18;
    this.height = 12;
    this.items = [];
}
Player.prototype = new Entity;
Player.constructor = Player;
Player.prototype.ticka = function(input) {
    var keys = input.keys,
        right = keys[Input.RIGHT]  == "newpress" ? c.RIGHT : c.NONE,
        left = right ? c.NONE : keys[Input.LEFT]  == "newpress" ? c.LEFT : c.NONE,
        up = keys[Input.UP]  == "newpress" ? c.UP : c.NONE,
        down = up ? c.NONE : keys[Input.DOWN]  == "newpress" ? c.DOWN : c.NONE,
        space = keys[Input.SPACE]  == "newpress",
        zkey = keys[Input.Z] == "newpress",
        
        blocked = false;

    this.xa = right ? this.speed : left ? -this.speed : 0;
    this.ya = down ? this.speed : up ? -this.speed : 0;
    this.dir = right | left | up | down;

    //if(this.dir){
        blocked = !(this.move());
        !blocked && this.animTime++;

        if(space && blocked) {
            var xOff = right ? 1 : left ? -1 : 0,
                yOff = up ? -1 : down ? 1 : 0;
            this.activate(
                this.level.getBlock(
                    this.xTile + xOff,
                    this.yTile + yOff));

        }
    //}

    // do fire
    if((--this.fireTime <= 0) && zkey) {
        this.fireTime = 30;
        this.level.fire();
    }

    // use current block
    !blocked && space && this.activate();

    if(this.itemUseTime > 0) this.itemUseTime--;
};
Player.prototype.gotLoot = function(e) {
    this.score += 100;
}

Player.prototype.activate = function(block) {
    if(this.itemUseTime > 0) {
        return;
    }
    this.itemUseTime = 5;

    block = block || this.level.getBlock(this.xTile, this.yTile);
    return block.use();
};
Player.prototype.collide = function(e) {};
Player.prototype.render = function(board) {
    Art.player.draw(board.ctx, this.x, this.y - 18, Math.floor(this.animTime/2) % 2);
};

Player.prototype.renderLight = function(light) {
    var ctx = light.ctx,
        flux = Math.floor((Math.cos(this.level.frame / 2) * 2)) + 2;
    Screen.drawLightCirc(ctx, this.x + 10, this.y +0, 30 + flux);
}
Player.prototype.hurt = function(e, ammount) {
    this.health -= ammount;
    if(this.health === 0) {
        this.level.game.reset();
    }
}