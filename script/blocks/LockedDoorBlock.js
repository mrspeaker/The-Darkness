function LockedDoorBlock(dir) {
    this.dir = dir;
}
LockedDoorBlock.prototype = new Block;
LockedDoorBlock.constructor = LockedDoorBlock;
LockedDoorBlock.prototype.blocksMotion = true;
LockedDoorBlock.prototype.use = function(e) {
    this.count = 10;
    this.blocksMotion = false;
}
LockedDoorBlock.prototype.tick = function() {
    if(this.count <= 0) {
        return;
    }

    if(--this.count === 0) {
        this.blocksMotion = true;
    }
}
LockedDoorBlock.prototype.render = function(board) {
    if(!this.blocksMotion){
        return
    }
    var xTile = this.dir === "0" ? 3 : 0,
        yTile = this.dir === "0" ? 0 : 1;
    
    
    Art.drawTile(board.ctx, Art.tiles, xTile, yTile, this.x * this.level.blockWidth, (this.y * this.level.blockHeight) -10);
};
